import express from "express";
import {
  generateArticle,
  generateBlogTitle,
  generateImage,
  removeImageBackground,
  removeImageObject,
  reviewResume,
} from "../controllers/aiController.js";
import upload from "../middlewares/multer.js";

const aiRouter = express.Router();

aiRouter.post("/generate-article", generateArticle);
aiRouter.post("/generate-blog-title", generateBlogTitle);
aiRouter.post("/generate-image", generateImage);

aiRouter.post(
  "/remove-image-background",
  upload.single("image"),
  removeImageBackground,
);

aiRouter.post(
  "/remove-image-object",
  upload.single("image"),
  removeImageObject,
);

aiRouter.post("/review-resume", upload.single("resume"), reviewResume);

export default aiRouter;
