import React from "react";
import { Logo } from "./Logo";

const Header = () => {
  return (
    <header className="flex w-full items-center justify-between">
      {/* Logo */}
      <Logo classname="text-2xl" />
    </header>
  );
};

export default Header;
