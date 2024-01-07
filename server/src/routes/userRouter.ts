import { Response, Router } from "express";
import { UserRequest } from "../types/user";
import hashPassword from "../utils/hashPassword";
import query from "../utils/db";

const userRouter = Router().post(
  "/changepassword",
  async (req: UserRequest, res: Response) => {
    try {
      if (!req.user) return res.status(401);

      const { password: newPassword } = req.body;
      if (!newPassword) return res.status(400);

      const hashedNewPassword = await hashPassword(newPassword);

      await query("UPDATE users SET password = ? WHERE id = ?", [
        hashedNewPassword,
        req.user.id,
      ]);

      return res.status(200).end();
    } catch (e) {
      return res.status(500).end();
    }
  }
);

export default userRouter;
