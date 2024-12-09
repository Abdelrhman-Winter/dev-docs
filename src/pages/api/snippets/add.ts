import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import CodeSnippet, { ICodeSnippet } from "@/models/CodeSnippet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case "POST":
      try {
        const { name, description, code, notes, typeOfCode } = req.body;
        const snippet: ICodeSnippet = await CodeSnippet.create({
          name,
          description,
          code,
          notes,
          typeOfCode,
        });
        res.status(201).json(snippet);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        res.status(500).json({ message: "Error creating snippet" });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
