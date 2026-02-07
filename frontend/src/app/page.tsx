import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import { Hero } from "@/components/home/hero";
import { Navbar } from "@/components/home/navbar";
import { OurServices } from "@/components/home/our-services";
import { PagesOverview } from "@/components/pages-overview";
import { UserSession } from "@/components/user-session";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Navbar session={session} />
      <Hero session={session} />
      <OurServices />
      {/* <UserSession />
      <PagesOverview /> */}
    </>
  )
}
