import { sql } from "../configs/db.js";

export const getCreations = async (req, res) => {
  try {
    const creations = await sql`
      SELECT * FROM creations ORDER BY created_at DESC`;

    res.status(200).json({
      creations,
    });
  } catch (error) {
    console.log("Error in getCreations controller:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getPublishedCreations = async (req, res) => {
  try {
    const creations = await sql`
      SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;

    res.status(200).json({
      creations,
    });
  } catch (error) {
    console.log("Error in getPublishedCreations controller:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};
