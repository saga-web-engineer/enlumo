import { PrismaAdapter } from '@auth/prisma-adapter';
import Google from 'next-auth/providers/google';
import Twitter from 'next-auth/providers/twitter';
import NextAuth from "next-auth"

import prisma from '@/app/lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google, Twitter],
});
