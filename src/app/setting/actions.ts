"use server"

import { settingSchema } from "./schema"
import prisma from "../lib/db"
import { auth } from "../lib/auth"
import { parseWithZod } from '@conform-to/zod';
import { revalidatePath } from "next/cache"

export const updateUser = async (_prevState: unknown, formData: FormData) => {
  const session = await auth()
  const currentUser = session?.user;

  if (!currentUser) return null

  const submission = parseWithZod(formData, {
    schema: settingSchema,
  });

  if (submission.status !== "success") return submission.reply();

  await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      name: submission.value.name,
      bio: submission.value.bio,
    },
  })

  revalidatePath("/setting")

  return submission.payload;
}