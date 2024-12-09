"use client";

import { useState, useEffect } from "react";
import { hasCookie, setCookie } from "cookies-next"; // npm install cookies-next

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Importing the eye icons
import { redirect } from "next/navigation";
import ShinyButton from "../ui/shiny-button";

const PasswordDialog: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility

  useEffect(() => {
    // Check for the authentication cookie
    if (hasCookie("authToken")) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password
    if (password === process.env.NEXT_PUBLIC_AUTH_PASSWORD) {
      // Set authentication cookie
      setCookie("authToken", true, { maxAge: 60 * 60 * 24 }); // Valid for 1 day

      // Update state and redirect
      setIsAuthenticated(true);
      redirect("/new-code");
    } else {
      setError("Incorrect password.");
    }
  };

  if (isAuthenticated) {
    return (
      <Link href="/new-code">
        <ShinyButton>✨ New Code</ShinyButton>
      </Link>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <button className="bg-gradient-to-r from-[#4E65FF] to-[#92EFFD] bg-[size:200%] bg-start transition-background-position duration-400 ease-in-out py-[.375rem] px-[1.25rem] text-white border-black border rounded-xl hover:bg-end">
          Add
        </button> */}

        <ShinyButton>✨ login</ShinyButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Password</DialogTitle>
          <DialogDescription>
            Please enter your password to access the add code functionality.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"} // Toggle input type based on visibility
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="border p-2 w-full"
              required
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)} // Toggle visibility
              className="absolute top-[14px] right-2 text-gray-500"
            >
              {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}{" "}
              {/* Show the appropriate icon */}
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <DialogFooter>
            {/* <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Submit
            </button> */}
            <ShinyButton>✨ Submit</ShinyButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordDialog;
