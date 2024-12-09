"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { RiDeleteBin2Line } from "react-icons/ri";
import { MdOutlinePlaylistAdd } from "react-icons/md";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import ShinyButton from "@/components/ui/shiny-button";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import Particles from "@/components/ui/particles";

const AddSnippet: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    code: "",
    notes: [""],
    typeOfCode: "",
  });

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/session", { method: "GET" });
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      redirect("/unAuthUser");
    }
  }, [isAuthenticated]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    if (e.target.name === "notes") {
      const updatedNotes = [...form.notes];
      updatedNotes[index] = e.target.value;
      setForm({ ...form, notes: updatedNotes });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleAddNote = () => {
    setForm({ ...form, notes: [...form.notes, ""] });
  };

  const handleRemoveNote = (index: number) => {
    const updatedNotes = form.notes.filter((_, i) => i !== index);
    setForm({ ...form, notes: updatedNotes });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/snippets/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("Snippet added!");
      }
    } catch (error) {
      console.error("Error adding snippet:", error);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-[#92EFFD]"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-[#4E65FF] animate-spin"></div>
        </div>
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
          )}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 relative">
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  w-full max-w-lg bg-black p-6 rounded-lg shadow-md relative"
      >
        <Input
          name="name"
          value={form.name}
          onChange={(e) => handleChange(e, -1)}
          placeholder="Name"
          required
          className="mb-4"
        />
        <Textarea
          name="description"
          value={form.description}
          onChange={(e) => handleChange(e, -1)}
          placeholder="Description"
          required
          className="mb-4"
        />
        <Textarea
          name="code"
          value={form.code}
          onChange={(e) => handleChange(e, -1)}
          placeholder="Code"
          required
          className="mb-4"
        />

        {form.notes.map((note, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Textarea
              name="notes"
              value={note}
              onChange={(e) => handleChange(e, index)}
              placeholder={`Note ${index + 1}`}
              className="w-full mb-4"
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleRemoveNote(index)}
              disabled={form.notes.length <= 1}
              className="text-red-500"
            >
              <RiDeleteBin2Line className="w-4" />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={handleAddNote}
          className="mb-4 "
        >
          <MdOutlinePlaylistAdd />
        </Button>

        <Select
          onValueChange={(value) =>
            setForm((prev) => ({ ...prev, typeOfCode: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type of code" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="jsx">JSX</SelectItem>
            <SelectItem value="tsx">TSX</SelectItem>
          </SelectContent>
        </Select>

        <ShinyButton className="mt-4">✨ Add Snippet</ShinyButton>
        <BorderBeam size={250} duration={12} delay={9} />
      </form>
    </div>
  );
};

export default AddSnippet;
