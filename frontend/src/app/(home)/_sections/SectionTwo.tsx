import React from "react";
import { ScriptCopyBtn } from "@/components/magicui/script-copy-btn";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { AvatarCircles } from "@/components/magicui/avatar-circles";

const SectionTwo = () => {
  const customCommandMap = {
    npm: "npm create next-app@latest",
    yarn: "yarn create next-app@latest",
    pnpm: "pnpm create next-app@latest",
    bun: "bun create next-app@latest",
  };
  const avatars = [
    {
      imageUrl: "https://avatars.githubusercontent.com/u/16860528",
      profileUrl: "https://github.com/dillionverma",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/20110627",
      profileUrl: "https://github.com/tomonarifeehan",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/106103625",
      profileUrl: "https://github.com/BankkRoll",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59228569",
      profileUrl: "https://github.com/safethecode",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59442788",
      profileUrl: "https://github.com/sanjay-mali",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/89768406",
      profileUrl: "https://github.com/itsarghyadas",
    },
  ];
  return (
    <section className="min-h-screen w-full">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 md:flex-row md:justify-between md:gap-20">
        {/* code snippet */}
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
        {/* trusted */}
        <div className="ml-auto flex flex-col gap-4">
          <div className="flex items-start gap-5">
            <h2 className="text-3xl font-bold">Trusted by Developers</h2>
            <AvatarCircles numPeople={99} avatarUrls={avatars} />
          </div>
          <p className="text-muted-foreground text-lg">
            Authly is trusted by developers around the world for its ease of use
            and powerful features.
          </p>
          <div className="text-md flex items-center gap-5">
            <div className="flex flex-col gap-2">
              <span>
                <NumberTicker value={100000} />
              </span>
              <span>developers</span>
            </div>
            <div className="h-[20px] w-[2px] bg-gray-300 dark:bg-gray-600" />
            <div className="flex flex-col gap-2">
              <span>
                <NumberTicker value={5000} />
              </span>
              <span>companies</span>
            </div>
            <div className="h-[20px] w-[2px] bg-gray-300 dark:bg-gray-600" />
            <div className="flex flex-col gap-2">
              <span>
                <NumberTicker value={1000000} />
              </span>
              <span>monthly active users</span>
            </div>
            <div className="h-[20px] w-[2px] bg-gray-300 dark:bg-gray-600" />
            <div className="flex flex-col gap-2">
              <span>
                <NumberTicker value={1000000} />
              </span>
              <span>customers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTwo;
