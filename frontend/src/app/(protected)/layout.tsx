import RoleProvider from "@/providers/role-provider";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import { Navbar } from "@/components/dashboard/navbar";
import { Sidebar } from "@/components/dashboard/sidebar";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-full">
      <RoleProvider>
        <Navbar session={session} />
        <div className="flex">
          <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
            <Sidebar />
          </div>
          <main className="md:pl-80">
            {children}
          </main>
        </div>
      </RoleProvider>
    </div>
  );
}