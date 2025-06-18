import { cn } from "@/lib/utils";
import React from "react";

export const Logo = ({ classname }: { classname: string }) => {
  return (
    <div className="p-2">
      <h1 className={cn("text-md font-bold", classname)}>Authly</h1>
    </div>
  );
};
