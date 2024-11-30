'use server';

import { parseWithZod } from '@conform-to/zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '@/app/lib/auth';
import prisma from '@/app/lib/db';
import { ThreadsNewSchema } from '@/app/threads/schema';

export const createThread = async (_prevState: unknown, formData: FormData) => {
  const session = await auth();
  const currentUser = session?.user;

  if (!currentUser?.id) return;

  const submission = parseWithZod(formData, {
    schema: ThreadsNewSchema,
  });

  if (submission.status !== 'success') return submission.reply();

  const { id } = await prisma.thread.create({
    data: {
      userId: currentUser.id,
      title: submission.value.title,
      bio: submission.value.bio,
    },
  });

  revalidatePath('/threads');
  redirect(`/threads/${id}`);
};
