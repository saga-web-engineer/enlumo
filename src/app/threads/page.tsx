import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { HeadingPage } from '@/app/components/heading/HeadingPage';
import { LayoutPadding } from '@/app/components/layout/LayoutPadding';
import { LoadingMessage } from '@/app/components/loading/LoadingMessage';
import { auth } from '@/app/lib/auth';
import { ThreadCreateButton } from '@/app/threads/components/ThreadCreateButton';
import { ThreadList } from '@/app/threads/components/ThreadList';
import { metadata as defaultMetadata } from '@/app/utils/metadata';
import { SITE_NAME, SITE_URL, THREADS_PER_PAGE } from '@/app/utils/siteSettings';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: `スレッド一覧 | ${SITE_NAME}`,
  description:
    'みんながRelumoで立ててくれたスレッド一覧です。新しくスレッドを立てたり、色んなスレッドを覗いたりして楽しんでください。',
  openGraph: {
    ...defaultMetadata.openGraph,
    url: `${SITE_URL}/threads`,
  },
};

interface Params {
  searchParams: Promise<{ page: string | undefined }>;
}

export default async function Threads({ searchParams }: Params) {
  const session = await auth();
  if (!session?.user.isLicense) redirect('/');

  // クエリパラメーターからページ番号を取得（デフォルトは1）
  const currentPage = parseInt((await searchParams).page || '1', 10);

  return (
    <>
      <ThreadCreateButton />
      <LayoutPadding>
        <HeadingPage>スレッド一覧</HeadingPage>
        <Suspense fallback={<LoadingMessage />}>
          <ThreadList currentPage={currentPage} threadsPerPage={THREADS_PER_PAGE} />
        </Suspense>
      </LayoutPadding>
    </>
  );
}
