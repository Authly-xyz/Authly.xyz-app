import React from "react";
import Image from "next/image";
import { ScriptCopyBtn } from "@/components/magicui/script-copy-btn";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { AvatarCircles } from "@/components/magicui/avatar-circles";
import { Marquee } from "@/components/eldoraui/marquee";

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
  const companies = [
    {
      name: "Google",
      url: "https://res.cloudinary.com/eldoraui/image/upload/v1734066341/Google_fav2wl.svg",
    },
    {
      name: "GitHub",
      url: "https://res.cloudinary.com/eldoraui/image/upload/v1734066341/GitHub_honend.svg",
    },
    {
      name: "Amazon",
      url: "https://res.cloudinary.com/eldoraui/image/upload/v1734066178/Amazon_wckqtv.svg",
    },
    {
      name: "Netflix",
      url: "https://res.cloudinary.com/eldoraui/image/upload/v1734066179/Netflix_skrjyn.svg",
    },
    {
      name: "YouTube",
      url: "https://res.cloudinary.com/eldoraui/image/upload/v1734066180/YouTube_wknngk.svg",
    },
    {
      name: "Instagram",
      url: "https://res.cloudinary.com/eldoraui/image/upload/v1734066178/Instagram_mo5ttl.svg",
    },
    {
      name: "Spotify",
      url: "https://res.cloudinary.com/eldoraui/image/upload/v1734066180/Spotify_ocrrnm.svg",
    },
  ];
  return (
    <section className="min-h-screen w-full">
      {/* header */}
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
      {/* companies */}
      <div className="container mx-auto mt-20 px-4 py-12 md:px-8">
        <h3 className="text-center text-sm font-semibold text-gray-500">
          TRUSTED BY LEADING TEAMS
        </h3>
        <div className="relative mt-6">
          <Marquee className="max-w-full [--duration:40s]" pauseOnHover={true}>
            {companies.map((company, idx) => (
              <Image
                key={idx}
                width={112}
                height={40}
                src={company.url}
                className="h-10 w-28 opacity-50 dark:brightness-0 dark:grayscale dark:invert"
                alt={company.name}
              />
            ))}
          </Marquee>
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r"></div>
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 bg-gradient-to-l"></div>
        </div>
      </div>
    </section>
  );
};

export default SectionTwo;
