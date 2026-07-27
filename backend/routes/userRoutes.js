import express from "express";
import {
  getCreations,
  getPublishedCreations,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/get-creations", getCreations);
userRouter.get("/get-published-creations", getPublishedCreations);

export default userRouter;
