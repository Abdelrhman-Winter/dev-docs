import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { parseCookies } from "nookies";

const SECRET = process.env.SECRET || "default_secret"; // Secure secret key
const AUTH_PASSWORD = process.env.NEXT_PUBLIC_AUTH_PASSWORD;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle POST method for password authentication
  if (req.method === "POST") {
    const { password } = req.body;

    if (password === AUTH_PASSWORD) {
      // Generate the token and set it in a cookie
      const token = jwt.sign({ authorized: true }, SECRET, { expiresIn: "1h" });
      res.setHeader(
        "Set-Cookie",
        `auth=${token}; HttpOnly; Path=/; Max-Age=3600; Secure`
      );
      return res.status(200).json({ message: "Authenticated" });
    }

    return res.status(401).json({ message: "Invalid password" });
  }

  // Handle GET method for checking authentication status
  if (req.method === "GET") {
    const cookies = parseCookies({ req });
    const token = cookies.auth;

    // Verify the token using JWT
    try {
      if (token) {
        jwt.verify(token, SECRET); // Verify the JWT token
        return res.status(200).json({ authenticated: true });
      }
      return res.status(200).json({ authenticated: false });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res.status(200).json({ authenticated: false });
    }
  }

  // If the method is not POST or GET, return Method Not Allowed
  return res.status(405).json({ message: "Method not allowed" });
}
