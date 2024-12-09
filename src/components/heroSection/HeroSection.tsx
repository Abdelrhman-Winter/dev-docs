import Image from "next/image";
import React from "react";
import Meteors from "../ui/meteors";
import BoxReveal from "../ui/box-reveal";

export default function HeroSection() {
  return (
    <div className="p-4 sm:p-6 md:p-9 text-center flex flex-col justify-center items-center overflow-hidden relative ">
      <Meteors number={30} />
      <div className="relative hover:bg-end hover:drop-shadow-[0_4px_15px_rgba(116,79,168,0.75)]">
        <Image
          src={"/DevDocWhite.png"}
          alt={"LOGO"}
          width={200}
          height={200}
          priority
          blurDataURL="URL"
          placeholder="blur"
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-gradient-to-r from-[#4E65FF] to-[#92EFFD] bg-clip-text
  bg-200% bg-start transition-background-position duration-500 ease-in-out
"
        />
        {/* Top-left circle */}
        <div className="absolute top-[20px] left-[-10px] w-[45px] h-[45px] bg-white rounded-full animate-fade-circle "></div>
        {/* Bottom-right circle */}
        <div className="absolute bottom-[20px] right-[16px] w-[25px] h-[25px] bg-white rounded-full animate-fade-circle"></div>
      </div>

      <h1
        className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-bold text-transparent bg-gradient-to-r from-[#4E65FF] to-[#92EFFD] bg-clip-text
  bg-200% bg-start transition-background-position duration-500 ease-in-out
  hover:bg-end hover:drop-shadow-[0_4px_15px_rgba(116,79,168,0.75)]"
      >
        DevDocs
      </h1>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <p className=" text-white mt-5 text-xl">
          Explore and share a{" "}
          <span className=" underline decoration-[#4E65FF]">
            growing library++
          </span>{" "}
          of reusable{" "}
          <span className=" underline decoration-[#92EFFD]">
            code ; snippets
          </span>{" "}
          and <span className=" underline decoration-[#92EFFD]">functions</span>{" "}
          , complete with detailed descriptions and practical notes for
          efficient development.
        </p>
      </BoxReveal>
    </div>
  );
}
