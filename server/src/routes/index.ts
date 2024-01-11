import { Request, Response, Router } from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import { requireAuth } from "../middleware/authMiddleware";
import query from "../utils/db";

const apiRouter = Router()
  .use("/auth", authRouter)
  .use("/user", requireAuth, userRouter)
  .get("/awake", async (req: Request, res: Response) => {
    try {
      await query("SELECT * from users");
      return res.status(200).end();
    } catch (e) {
      console.log(e);
      return res.status(500).end();
    }
  });

export default apiRouter;
