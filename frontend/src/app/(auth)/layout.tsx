export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="container mx-auto flex min-h-screen max-w-[1400px] flex-col items-center justify-center px-2">
      {children}
    </section>
  );
}
