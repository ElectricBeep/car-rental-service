import { Navbar } from '@/components/home/navbar'
import { PagesOverview } from '@/components/pages-overview'
import { UserSession } from '@/components/user-session'

export default function Home() {
  return (
    <>
      <Navbar />
      <UserSession />
      <PagesOverview />
    </>
  )
}
