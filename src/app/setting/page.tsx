import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { HeadingPage } from '@/app/components/heading/HeadingPage';
import { LayoutPadding } from '@/app/components/layout/LayoutPadding';
import { auth } from '@/app/lib/auth';
import prisma from '@/app/lib/db';
import { SettingForm } from '@/app/setting/component/SettingForm';
import { metadata as defaultMetadata } from '@/app/utils/metadata';
import { SITE_NAME, SITE_URL } from '@/app/utils/siteSettings';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: `設定 | ${SITE_NAME}`,
  description: 'Relumoのユーザー情報を設定できます。',
  openGraph: {
    ...defaultMetadata.openGraph,
    url: `${SITE_URL}/setting`,
  },
};

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

  return (
    <LayoutPadding>
      <HeadingPage>設定</HeadingPage>
      <SettingForm defaultValue={{ name, bio }} />
    </LayoutPadding>
  );
}
