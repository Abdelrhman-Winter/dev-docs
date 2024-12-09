import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const UnAuthUser = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-bold text-transparent bg-gradient-to-r from-[#4E65FF] to-[#92EFFD] bg-clip-text
  bg-200% bg-start transition-background-position duration-500 ease-in-out
  hover:bg-end hover:drop-shadow-[0_4px_15px_rgba(116,79,168,0.75)] mb-4"
        >
          Error you are not Winter
        </h1>
        <Link href="/" className=" text-white ">
          Go back to{" "}
          <span className=" underline decoration-[#4E65FF]">Code page</span> and
          never try again
        </Link>
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
};
export default UnAuthUser;
