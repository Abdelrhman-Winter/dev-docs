"use client";
import { useEffect, useState } from "react";
import CodeCard from "@/components/codeCard/CodeCard";
import HeroSection from "@/components/heroSection/HeroSection";
import Particles from "@/components/ui/particles";

export interface CodeSnippet {
  _id: string;
  name: string;
  description: string;
  code: string;
  notes: string[];
  typeOfCode: string;
}

export default function Home() {
  const [codeData, setCodeData] = useState<CodeSnippet[]>([]);

  // Function to fetch code snippets
  const fetchSnippets = async () => {
    try {
      const res = await fetch("/api/snippets");
      const data: CodeSnippet[] = await res.json();
      setCodeData(data); // Update the state with the latest data
    } catch (error) {
      console.error("Error fetching snippets:", error);
    }
  };

  // Fetch snippets on component mount (without polling)
  useEffect(() => {
    fetchSnippets(); // Fetch snippets initially
    console.log("Fetching snippets...");
  }, []); // Empty dependency array ensures it only runs once when the component mounts

  return (
    <div className="h-full min-h-screen">
      <HeroSection />
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />
      <div className="flex flex-col items-center">
        {codeData.length > 0 ? (
          codeData.map((code) => <CodeCard key={code._id} {...code} />)
        ) : (
          <p className="text-white">No code available.</p>
        )}
      </div>
    </div>
  );
}
