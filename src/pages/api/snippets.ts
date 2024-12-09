import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import CodeSnippet, { ICodeSnippet } from "@/models/CodeSnippet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const snippets: ICodeSnippet[] = await CodeSnippet.find({});
        res.status(200).json(snippets);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        res.status(500).json({ message: "Error fetching snippets" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
