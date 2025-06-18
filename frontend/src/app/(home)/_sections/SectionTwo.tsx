import React from "react";
import { ScriptCopyBtn } from "@/components/magicui/script-copy-btn";

const SectionTwo = () => {
  const customCommandMap = {
    npm: "npm create next-app@latest",
    yarn: "yarn create next-app@latest",
    pnpm: "pnpm create next-app@latest",
    bun: "bun create next-app@latest",
  };
  return (
    <section className="flex min-h-screen w-full flex-col items-start justify-start">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Get Started with Authly</h2>
        <ScriptCopyBtn
          showMultiplePackageOptions={true}
          codeLanguage="shell"
          lightTheme="nord"
          darkTheme="vitesse-dark"
          commandMap={customCommandMap}
        />
      </div>
    </section>
  );
};

export default SectionTwo;
