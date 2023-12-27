import { Request, Response, Router } from "express";
import query from "../utils/db";
import hashPassword from "../utils/hashPassword";
import { User } from "../types/user";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";

const authRouter = Router()
  .post("/signup", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(400).json("No email provided");
      }

      if (!password) {
        return res.status(400).json("No password provided");
      }

      const userIsExist = await query("SELECT * from users WHERE email = ?", [
        email,
      ]);

      if (Array.isArray(userIsExist) && userIsExist.length != 0) {
        return res.status(409).json("User already exist");
      }

      const hashedPassword = await hashPassword(password);
      await query("INSERT INTO users (email, password) VALUES (?, ?)", [
        email,
        hashedPassword,
      ]);

      const results = await query("SELECT * from users WHERE email = ?", [
        email,
      ]);
      if (Array.isArray(results)) {
        const user = results[0] as User;

        const payload = {
          id: user.id,
          email,
          role: user.role,
        };

        const refreshToken = generateRefreshToken(payload);
        const accessToken = generateAccessToken(payload);

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          expires: expirationDate,
        });

        return res.json({
          accessToken,
          payload,
        });
      }

      return res.status(500);
    } catch (e) {
      console.log(e);
      return res.status(500);
    }
  })
  .post("/login")
  .get("/refresh");

export default authRouter;
