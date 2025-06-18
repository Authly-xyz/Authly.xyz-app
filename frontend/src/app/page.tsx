import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <section>
      <h1>Welcome to the Home Page</h1>
      <Link href="/about">Go to About Page</Link>
      <Button>Click Me</Button>
    </section>
  );
}
