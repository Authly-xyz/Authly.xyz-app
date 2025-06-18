import Header from "@/components/Header";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="max-screen flex flex-col items-center justify-center">
      <Header />
      {children}
    </section>
  );
}
