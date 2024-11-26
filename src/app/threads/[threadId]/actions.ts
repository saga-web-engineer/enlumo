'use server';

import { parseWithZod } from '@conform-to/zod';

import { auth } from '@/app/lib/auth';
import prisma from '@/app/lib/db';
import { threadConversationSchema } from '@/app/threads/[threadId]/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const sendMessage = async (_prevState: unknown, formData: FormData) => {
  const session = await auth();
  const currentUser = session?.user;

  if (!currentUser?.id) return null;

  const submission = parseWithZod(formData, {
    schema: threadConversationSchema,
  });

  if (submission.status !== 'success') return submission.reply();

  await prisma.post.create({
    data: {
      content: submission.value.post,
      userId: currentUser.id,
      threadId: submission.value.threadId,
    },
  });

  revalidatePath(`/threads/${submission.value.threadId}`);
  redirect(`/threads/${submission.value.threadId}`);
};
