"use client";

import React, { useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { TbClipboardCopy } from "react-icons/tb";
import { CoolMode } from "@/components/ui/cool-mode";

import { MdDoneAll } from "react-icons/md";
import Image from "next/image";

interface CodeCardProps {
  name: string;
  description: string;
  code: string;
  notes: string[];
  typeOfCode: string;
}

const CodeCard: React.FC<CodeCardProps> = ({
  name,
  description,
  code,
  notes,
  typeOfCode,
}) => {
  const [copyStatus, setCopyStatus] = useState("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus(""), 2000); // Clear status after 2 seconds
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setCopyStatus("Failed to copy!");
    }
  };

  const getTypeIcon = (typeOfCode: string) => {
    const typeIcons: Record<string, string> = {
      javascript: "/icons/js.png",
      typescript: "/icons/ts.png",
      jsx: "/icons/reactjs.png",
      tsx: "/icons/reactTS.png",
    };

    return typeIcons[typeOfCode] || "/icons/ts.png"; // Default icon for unknown types
  };

  const typeIcon = getTypeIcon(typeOfCode);
  return (
    <div className=" rounded-lg p-6 bg-transparent  max-w-full sm:max-w-[700px] w-full mx-auto mb-6">
      <div className=" flex  justify-between ">
        <h2 className="text-lg font-semibold text-white dark:text-gray-100">
          {name}
        </h2>
        <Image
          src={typeIcon}
          alt={"LOGO"}
          width={40}
          height={40}
          priority
          blurDataURL="URL"
          placeholder="blur"
          className=" cursor-pointer mt-10px rounded-full"
        />
      </div>

      <p className="text-gray-300 dark:text-gray-600 mb-4">{description}</p>

      <div className="relative rounded-lg ">
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
          className="rounded-lg text-sm leading-relaxed m-0"
        >
          {code}
        </SyntaxHighlighter>
        <CoolMode>
          <button
            className="absolute top-2 right-2 bg-transparent  text-white dark:text-gray-600 hover: transition px-3 py-1 rounded-md text-xl "
            onClick={handleCopy}
          >
            {copyStatus ? <MdDoneAll /> : <TbClipboardCopy />}
          </button>
        </CoolMode>
      </div>
      <ul className="mt-4 space-y-2 text-gray-400 dark:text-gray-600 text-sm">
        {notes.map((note, index) => (
          <li key={index} className="list-disc list-inside">
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CodeCard;
