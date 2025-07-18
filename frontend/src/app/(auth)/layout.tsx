export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="max-screen flex flex-col items-center justify-center">
      {children}
    </section>
  );
}
