import { Request, Response, Router } from "express";
import query from "../utils/db";
import hashPassword from "../utils/hashPassword";
import { User } from "../types/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
  .post("/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const userFind = await query("SELECT * from users where email = ?", [
        email,
      ]);

      if (Array.isArray(userFind)) {
        if (userFind.length === 0) {
          return res.status(401).json("User does not exist");
        }
        const user = userFind[0] as User;

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(401).json("Incorrect password");
        }

        const payload = {
          id: user.id,
          email: user.email,
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
  .get("/refresh", (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        return res.status(401).json("No refresh token provided");
      }

      jwt.verify(
        refreshToken,
        process.env.JWT_SECRET!,
        (err: any, decoded: any) => {
          if (err) return res.status(401).json("Invalid refresh token");

          delete decoded.iat;
          delete decoded.exp;

          const accessToken = generateAccessToken(decoded);
          return res.json(accessToken);
        }
      );
    } catch (e) {
      console.log(e);
      return res.status(500);
    }
  });

export default authRouter;
