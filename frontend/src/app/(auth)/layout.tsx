export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen min-h-140 flex items-center justify-center">
      {children}
    </div>
  );
};
