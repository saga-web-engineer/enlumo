import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { HeadingPage } from '@/app/components/heading/HeadingPage';
import { LayoutPadding } from '@/app/components/layout/LayoutPadding';
import { LoadingMessage } from '@/app/components/loading/LoadingMessage';
import { auth } from '@/app/lib/auth';
import prisma from '@/app/lib/db';
import { ThreadConversationList } from '@/app/threads/[threadId]/components/ThreadConversationList';
import { ThreadPostDialog } from '@/app/threads/[threadId]/components/ThreadPostDialog';
import { POSTS_PER_PAGE } from '@/app/utils/siteSettings';

interface Params {
  params: Promise<{ threadId: string }>;
  searchParams: Promise<{ page: string | undefined }>;
}

export default async function ThreadConversation({ params, searchParams }: Params) {
  const threadId = (await params).threadId;
  const session = await auth();
  if (!session?.user.isLicense) redirect('/');

  const { title, bio } =
    (await prisma.thread.findUnique({
      where: {
        id: threadId,
      },
    })) || {};

  // クエリパラメーターからページ番号を取得（デフォルトは1）
  const currentPage = parseInt((await searchParams).page || '1', 10);

  return (
    <LayoutPadding>
      <HeadingPage>{title}</HeadingPage>
      <p className="text-muted-foreground mt-4">{bio}</p>
      <Suspense fallback={<LoadingMessage />}>
        <ThreadConversationList
          threadId={threadId}
          currentPage={currentPage}
          postsPerPage={POSTS_PER_PAGE}
        />
      </Suspense>
      <ThreadPostDialog threadId={threadId} />
    </LayoutPadding>
  );
}
