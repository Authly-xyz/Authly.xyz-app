"use client";

import React from "react";
import { Logo } from "./Logo";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex w-full items-center justify-between py-3",
        isScrolled && "bg-transparent backdrop-blur-md",
        // isScrolled && "bg-black/50 backdrop-blur-md",
      )}
    >
      {/* Logo */}
      <Logo classname="text-2xl" />
      {/* Navigation Links */}
      <nav className="flex items-center space-x-6">
        <a
          href="/"
          className="hover:text-muted-foreground text-lg font-semibold"
        >
          Home
        </a>
        <a
          href="/product"
          className="hover:text-muted-foreground text-lg font-semibold"
        >
          Product
        </a>
        <a
          href="/docs"
          className="hover:text-muted-foreground text-lg font-semibold"
        >
          Documentation
        </a>
        <a
          href="/pricing"
          className="hover:text-muted-foreground text-lg font-semibold"
        >
          Pricing
        </a>
      </nav>
      {/* Auth Links */}
      <div className="flex items-center justify-center space-x-4">
        <Link
          href={"/register"}
          className={buttonVariants({ variant: "default" })}
        >
          Register
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
