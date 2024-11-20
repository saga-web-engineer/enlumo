import { redirect } from "next/navigation"
import { auth } from "../lib/auth"
import prisma from "../lib/db"

export default async function Threads() {
  const session = await auth()

  if (!session?.user.isLicense) redirect("/")

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      isLicense: true,
    },

  })

  if (!user || !user.isLicense) redirect("/")

  return (
    <div>スレッド一覧！！！！</div>
  )
}