export interface CodeSnippet {
  _id?: string; // Make _id optional
  name: string;
  description: string;
  code: string;
  notes: string[];
  typeOfCode: string;
  createdAt: Date;
}

export interface CodeSnippetInput {
  _id: string;
  name: string;
  description: string;
  code: string;
  notes?: string[];
  typeOfCode: string;
}
