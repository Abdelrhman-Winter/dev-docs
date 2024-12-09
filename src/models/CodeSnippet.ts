import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICodeSnippet extends Document {
  name: string;
  description: string;
  code: string;
  notes: string[];
  typeOfCode: string;
}

const CodeSnippetSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  notes: { type: [String], default: [] },
  typeOfCode: { type: String, required: true },
});

export default (mongoose.models.CodeSnippet as Model<ICodeSnippet>) ||
  mongoose.model<ICodeSnippet>("CodeSnippet", CodeSnippetSchema);
