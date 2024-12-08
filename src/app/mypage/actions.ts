'use server';

import { parseWithZod } from '@conform-to/zod';
import { revalidatePath } from 'next/cache';

import { auth } from '@/app/lib/auth';
import prisma from '@/app/lib/db';
import { settingSchema } from '@/app/mypage/schema';

export const updateUser = async (_prevState: unknown, formData: FormData) => {
  const session = await auth();
  const currentUser = session?.user;

  if (!currentUser) return;

  const submission = parseWithZod(formData, {
    schema: settingSchema,
  });

  if (submission.status !== 'success') return submission.reply();

  await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      name: submission.value.name,
    },
  });

  revalidatePath('/mypage');

  return submission.payload;
};
