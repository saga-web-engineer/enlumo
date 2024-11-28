import type { FC } from 'react';

import { auth } from '@/app/lib/auth';
import prisma from '@/app/lib/db';

export const UserName: FC = async () => {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
    select: { name: true },
  });

  const { name } = user || {};
  return <p className="text-left break-all sm:text-xl">{name}</p>;
};
