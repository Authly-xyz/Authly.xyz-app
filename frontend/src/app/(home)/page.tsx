import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center text-4xl font-bold md:text-5xl">
          Welcome to Authly!
        </h1>
        <p className="text-muted-foreground text-center text-lg md:text-3xl">
          Your go-to authentication provider for React apps. Pay as you grow.
        </p>
        <p className="text-muted-foreground text-center text-sm md:text-lg">
          Choose the best plan for your business. Change plans whenever you need
          to.
        </p>
        <Link href="/register">
          <Button size={"lg"}>Get Started</Button>
        </Link>
      </div>
    </section>
  );
}
