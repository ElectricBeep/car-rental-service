export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen min-h-140 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,#f5f3ff_0%,#ddd6fe_40%,#8b5cf6_100%)] dark:bg-[radial-gradient(ellipse_at_center,#1e1b4b_0%,#4c1d95_60%,#7c3aed_100%)]">
      {children}
    </div>
  );
};
