import { Response, request, NextFunction } from "express";
import { AuthRequest } from "../controllers/UserController.js";
import Jwt from "jsonwebtoken";
import User, { userType } from "../models/user.js";

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> =>{
  let token: string | undefined;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (!token) {
         res.status(401).json({ message: "Not authorized, no token provided" });
      }
   

      const decode = Jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
      };
      const user = await User.findById(decode.id).select("-password").lean();
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      req.user = user as userType;
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
      return;
    }
  } else {
    res.status(401).json({ message: "Not authorized , No token" });
    return;
  }
};
