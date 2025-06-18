import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";

export function TerminalDemo() {
  return (
    <Terminal>
      <TypingAnimation>&gt; bunx --bun shadcn@latest init</TypingAnimation>

      <AnimatedSpan delay={1500} className="text-green-500">
        <span>✔ Preflight checks.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={2000} className="text-green-500">
        <span>✔ Verifying framework. Found Next.js.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={2500} className="text-green-500">
        <span>✔ Validating context.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={3000} className="text-green-500">
        <span>✔ Installing dependencies</span>
      </AnimatedSpan>

      <AnimatedSpan delay={3500} className="text-green-500">
        <span>✔ Writing components.json.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={4000} className="text-green-500">
        <span>✔ Checking registry.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={4500} className="text-green-500">
        <span>✔ Updating tailwind.config.ts</span>
      </AnimatedSpan>

      <AnimatedSpan delay={5000} className="text-green-500">
        <span>✔ Updating app/globals.css</span>
      </AnimatedSpan>

      <AnimatedSpan delay={5500} className="text-green-500">
        <span>✔ Installing dependencies.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={6000} className="text-blue-500">
        <span>ℹ Updated 1 file:</span>
        <span className="pl-2">- lib/utils.ts</span>
      </AnimatedSpan>

      <TypingAnimation delay={6500} className="text-muted-foreground">
        Success! Project initialization completed.
      </TypingAnimation>

      <TypingAnimation delay={7000} className="text-muted-foreground">
        You may now add components.
      </TypingAnimation>

      {/* Simulate Authly CLI initialization */}
      <TypingAnimation delay={8000}>&gt; npx authly init</TypingAnimation>

      <AnimatedSpan delay={9500} className="text-green-500">
        <span>✔ Detecting Next.js project.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={10000} className="text-green-500">
        <span>✔ Adding Authly authentication provider.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={10500} className="text-green-500">
        <span>✔ Updating .env.local with Authly keys.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={11000} className="text-green-500">
        <span>✔ Creating /authly directory and config files.</span>
      </AnimatedSpan>

      <AnimatedSpan delay={11500} className="text-green-500">
        <span>✔ Updating app/layout.tsx with Authly provider.</span>
      </AnimatedSpan>
      <AnimatedSpan delay={12000} className="text-green-500">
        <span>✔ Authly CLI initialization complete.</span>
      </AnimatedSpan>
      <TypingAnimation delay={12500} className="text-muted-foreground">
        Run your Next.js app to see Authly in action!
      </TypingAnimation>
    </Terminal>
  );
}
