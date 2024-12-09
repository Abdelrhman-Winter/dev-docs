import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "default_secret";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.auth;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    jwt.verify(token, SECRET);
    return res.status(200).json({ message: "Session valid" });
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
