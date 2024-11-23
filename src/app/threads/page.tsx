import { redirect } from "next/navigation"
import { auth } from "../lib/auth"

export default async function Threads() {
  const session = await auth()

  if (!session?.user.isLicense) redirect("/")

  return (
    <div>スレッド一覧！！！！</div>
  )
}