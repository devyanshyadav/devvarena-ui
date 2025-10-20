import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { TbSmartHome } from "react-icons/tb";
import { ThemeToggle } from "../theme-toggle";
const Menu = () => {
  return (
    <div className="flex w-fit rounded-full items-center justify-end self-end  bg-secondary">
      <Button
        variant="ghost"
        size="icon"
        asChild
        className="flex w-10 h-10 rounded-full"
      >
        <Link href="/">
          <TbSmartHome className="size-5" />
          <span className="sr-only">Home</span>
        </Link>
      </Button>
      {/* GitHub Link */}
      <Button
        variant="ghost"
        size="icon"
        asChild
        className="flex w-10 h-10 rounded-full"
      >
        <Link
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="size-5" />
          <span className="sr-only">GitHub</span>
        </Link>
      </Button>

      {/* Theme Toggle */}
      <ThemeToggle />
    </div>
  );
};

export default Menu;
