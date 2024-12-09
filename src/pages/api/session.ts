// pages/api/session.ts
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parseCookies({ req });
  const authToken = cookies.authToken;

  if (authToken) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(200).json({ authenticated: false });
  }
}
