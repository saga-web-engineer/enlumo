
import { redirect } from "next/navigation";
import { auth } from "../lib/auth";
import { SettingForm } from "./component/SettingForm";
import prisma from "../lib/db";

export default async function Setting() {
  const session = await auth();

  if (!session?.user.isLicense) redirect("/");

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: { name: true, bio: true },
  })

  const { name, bio } = user || {}

  return (
    <SettingForm defaultValue={{ name, bio }} />
  )
} 