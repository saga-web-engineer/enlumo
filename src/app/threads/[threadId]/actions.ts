'use server';

import { parseWithZod } from '@conform-to/zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '@/app/lib/auth';
import prisma from '@/app/lib/db';
import { threadConversationSchema, updateReactionSchema } from '@/app/threads/[threadId]/schema';

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

export const updateReaction = async (formData: FormData) => {
  const session = await auth();
  if (!session?.user) throw new Error('ログインしていません');

  const submission = parseWithZod(formData, {
    schema: updateReactionSchema,
  });

  if (submission.status !== 'success') return;

  const post = await prisma.post.update({
    where: {
      id: submission.value.postId,
    },
    data: {
      // FormDataに渡されたstateがtrueの場合、リアクションに自分を追加する
      // FormDataに渡されたstateがfalseの場合、リアクションから自分を削除する
      [submission.value.reactionName]: {
        [submission.value.state ? 'connect' : 'disconnect']: {
          id: session.user.id,
        },
      },
    },
  });

  revalidatePath(`/threads/${post.threadId}`);
};

export const getPostByPostNumber = async (threadId: string, number: number) => {
  const post = await prisma.post.findFirst({
    where: {
      threadId,
    },
    orderBy: {
      createdAt: 'asc',
    },
    skip: number - 1,
    take: 1,
  });

  if (!post) new Error('そんな投稿ございません');

  return post?.content;
};
