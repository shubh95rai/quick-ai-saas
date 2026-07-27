import "dotenv/config";
import express from "express";
import { connectDB } from "./configs/db.js";
import cors from "cors";
import aiRouter from "./routes/aiRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

await connectDB();

const corsOptions = {
  origin: process.env.CLIENT_URL,
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
