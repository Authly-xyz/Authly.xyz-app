import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to the Home Page</h1>
      <Link href="/about">Go to About Page</Link>
    </main>
  );
}
