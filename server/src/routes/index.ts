import { Router } from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import { requireAuth } from "../middleware/authMiddleware";

const apiRouter = Router()
  .use("/auth", authRouter)
  .use("/user", requireAuth, userRouter);

export default apiRouter;
