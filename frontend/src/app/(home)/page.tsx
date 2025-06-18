import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { MorphingText } from "@/components/magicui/morphing-text";
import { ScriptCopyBtn } from "@/components/magicui/script-copy-btn";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";

export default function HomePage() {
  const texts = [
    "Welcome to Authly!",
    "Your go-to authentication provider for React apps.",
    "Get started with Authly today!",
    "Experience seamless authentication.",
    "Secure your applications effortlessly.",
  ];
  const customCommandMap = {
    npm: "npm create next-app@latest",
    yarn: "yarn create next-app@latest",
    pnpm: "pnpm create next-app@latest",
    bun: "bun create next-app@latest",
  };
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      {/* animated shiny text */}
      <div
        className={cn(
          "group -mt-20 mb-20 rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>🥳 Introducing To Authly</span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div>
      {/* main content */}
      <div className="flex flex-col items-center gap-4">
        <MorphingText
          texts={texts}
          className="mb-3 text-center text-4xl font-bold md:text-5xl lg:text-6xl"
        />
        <p className="text-muted-foreground text-center text-lg md:text-3xl">
          Your go-to authentication provider for React apps. Pay as you grow.
        </p>
        <p className="text-muted-foreground text-center text-sm md:text-lg">
          Choose the best plan for your business. Change plans whenever you need
          to.
        </p>
        <ScriptCopyBtn
          showMultiplePackageOptions={true}
          codeLanguage="shell"
          lightTheme="nord"
          darkTheme="vitesse-dark"
          commandMap={customCommandMap}
        />
        <Link href="/register">
          <Button size={"lg"}>Get Started</Button>
        </Link>
      </div>
    </section>
  );
}
