import "dotenv/config";
import express from "express";

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
