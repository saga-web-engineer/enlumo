'use server';

import { redirect } from 'next/navigation';

import { auth, signOut } from '@/app/lib/auth';
import prisma from '@/app/lib/db';

export const deleteAccount = async () => {
  const session = await auth();

  if (!session?.user) throw new Error('ログインしていません。');
  await prisma.user.delete({
    where: {
      id: session?.user.id,
    },
  });
  redirect('/');
};

export const signOutAuth = async () => {
  await signOut();
};
