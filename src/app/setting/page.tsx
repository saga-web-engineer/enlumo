import { redirect } from 'next/navigation';

import { auth } from '@/app/lib/auth';
import prisma from '@/app/lib/db';
import { SettingForm } from '@/app/setting/component/SettingForm';

export default async function Setting() {
  const session = await auth();

  if (!session?.user.isLicense) redirect('/');

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: { name: true, bio: true },
  });

  const { name, bio } = user || {};

  return <SettingForm defaultValue={{ name, bio }} />;
}
