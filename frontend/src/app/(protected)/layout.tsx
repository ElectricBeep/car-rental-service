import RoleProvider from "@/providers/role-provider";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <RoleProvider>
        {children}
      </RoleProvider>
    </div>
  );
}