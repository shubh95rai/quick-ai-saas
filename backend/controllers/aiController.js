import OpenAI from "openai";
import { sql } from "../configs/db.js";
import axios from "axios";
import cloudinary from "../configs/cloudinary.js";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const lengthToTokens = {
  800: 3000, // Short (500-800 words)
  1200: 4500, // Medium (800-1200 words)
  1600: 6000, // Long (1200+ words)
};

export const generateArticle = async (req, res) => {
  try {
    const { prompt, length } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    if (!length) {
      return res.status(400).json({
        message: "Length is required",
      });
    }

    const maxTokens = lengthToTokens[length] || length * 3;

    const response = await AI.chat.completions.create({
      model: "gemini-3.6-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: maxTokens,
      extra_body: {
        google: {
          thinking_config: { thinking_level: "low" },
        },
      },
    });

    const content = response.choices[0].message.content;

    // console.log("response:::", response);

    await sql`INSERT INTO creations (prompt, content, type) 
    VALUES (${prompt}, ${content}, 'article')`;

    res.status(200).json({
      content,
      message: "Article generated successfully",
    });
  } catch (error) {
    console.log("Error in generateArticle controller:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-3.6-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
      extra_body: {
        google: {
          thinking_config: { thinking_level: "minimal" },
        },
      },
    });

    const content = response.choices[0].message.content;

    // console.log("response:::", response);

    await sql`INSERT INTO creations (prompt, content, type) 
    VALUES (${prompt}, ${content}, 'blog-title')`;

    res.status(200).json({
      content,
      message: "Blog title generated successfully",
    });
  } catch (error) {
    console.log("Error in generateBlogTitle controller:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { prompt, publish } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer", // The response type is set to arraybuffer (binary data) to get  cos clipdrop returns png file
      },
    );

    // Converting the arraybuffer to Buffer then to base64 string

    // DATA URI - To tell browsers that this Base64 string is an image
    const base64Image = `data:image/png;base64,${Buffer.from(data, "binary").toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image, {
      folder: "quick-ai-saas/generated-images",
    });

    await sql`INSERT INTO creations (prompt, content, type, publish)
    VALUES (${prompt}, ${secure_url}, 'image', ${publish ?? false})`;

    res.status(200).json({
      content: secure_url,
      message: "Image generated successfully",
    });
  } catch (error) {
    console.log("Error in generateImage controller:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const removeImageBackground = async (req, res) => {
  try {
    const image = req.file;

    if (!image) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      folder: "quick-ai-saas/removed-image-background",
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await sql`INSERT INTO creations (prompt, content, type)
    VALUES ('Remove image background', ${secure_url}, 'image')`;

    res.status(200).json({
      content: secure_url,
      message: "Image background removed successfully",
    });
  } catch (error) {
    console.log("Error in removeImageBackground controller:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const image = req.file;
    const { object } = req.body;

    if (!image) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    if (!object) {
      return res.status(400).json({
        message: "Object is required",
      });
    }

    const { public_id } = await cloudinary.uploader.upload(image.path, {
      folder: "quick-ai-saas/removed-image-object",
    });

    const imageUrl = cloudinary.url(public_id, {
      transformation: [
        {
          effect: `gen_remove:${object}`,
        },
      ],
      resource_type: "image",
    });

    await sql`INSERT INTO creations (prompt, content, type)
    VALUES ('Remove image object', ${imageUrl}, 'image')`;

    res.status(200).json({
      content: imageUrl,
      message: "Image object removed successfully",
    });
  } catch (error) {
    console.log("Error in removeImageObject controller:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const reviewResume = async (req, res) => {
  try {
    const resume = req.file;

    if (!resume) {
      return res.status(400).json({
        message: "Resume is required",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        message: "Resume size should be less than 5MB",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement, Resume Content:\n\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-3.6-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 3000,
      extra_body: {
        google: {
          thinking_config: { thinking_level: "low" },
        },
      },
    });

    const content = response.choices[0].message.content;

    // console.log("response:::", response);

    await sql`INSERT INTO creations (prompt, content, type)
    VALUES ('Review resume', ${content}, 'review-resume')`;

    res.status(200).json({
      content: content,
      message: "Resume reviewed successfully",
    });
  } catch (error) {
    console.log("Error in reviewResume controller:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};
