"use server"

import { z } from "zod"
import { settingSchema } from "./schema"
import prisma from "../lib/db"
import { auth } from "../lib/auth"
import { revalidatePath } from "next/cache"

export const updateUser = async (_prevState: z.infer<typeof settingSchema> | null, formData: FormData) => {
  const session = await auth()
  const currentUser = session?.user;

  if (!currentUser) return null

  const rawData = {
    name: formData.get("name"),
    bio: formData.get("bio")
  }

  const data = settingSchema.parse(rawData)

  await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      name: data.name,
      bio: data.bio,
    },
  })

  revalidatePath("/setting")

  return data
}