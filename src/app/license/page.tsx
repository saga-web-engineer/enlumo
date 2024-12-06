import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { HeadingPage } from '@/app/components/heading/HeadingPage';
import { LayoutPadding } from '@/app/components/layout/LayoutPadding';
import { auth, signOut } from '@/app/lib/auth';
import { InviteCodeForm } from '@/app/license/components/InviteCodeForm';
import { SignOutButton } from '@/app/license/components/SignOutButton';
import { metadata as defaultMetadata } from '@/app/utils/metadata';
import { SITE_NAME, SITE_URL } from '@/app/utils/siteSettings';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: `招待コード入力 | ${SITE_NAME}`,
  description:
    'Relumoへアクセスするには招待コードの入力が必要です。招待コードが無い方はお友達にもらって入力してください。',
  openGraph: {
    ...defaultMetadata.openGraph,
    url: `${SITE_URL}/license`,
  },
};

export default async function License() {
  const session = await auth();

  // 招待コード入力済みのログインユーザーはスレッド一覧ページへリダイレクト
  if (session?.user.isLicense) redirect('/threads');

  // 未ログインユーザーはTOPへリダイレクト
  if (!session) redirect('/');

  return (
    <LayoutPadding>
      <HeadingPage>招待コード入力</HeadingPage>
      <p className="pt-6">お友達にもらった招待コードを入力してね！</p>
      <InviteCodeForm />
      <form
        className="w-fit mx-auto mt-6"
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <SignOutButton />
      </form>
    </LayoutPadding>
  );
}
