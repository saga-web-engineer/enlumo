"use server"

import { auth } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { inviteCodeSchema } from "@/app/license/type";
import { redirect } from "next/navigation";

export const getUserByInviteCode = async (_prevState: string | null, formData: FormData) => {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  const code = formData.get('code');

  const parsedCode = inviteCodeSchema.parse(code)

  try {
    const parent = await prisma.user.findUnique({
      where: {
        inviteCode: parsedCode
      }
    })

    if (!parent) {
      return "error"
    }

    await prisma.user.update({
      where: {
        id: session.user?.id
      },
      data: {
        isLicense: true
      }
    })

  } catch (error) {
    console.log(error)
    return "error"
  }

  redirect("/threads")
}