import dayjs from 'dayjs';
import { AtSign, CalendarDays, Frown, UserRound } from 'lucide-react';
import type { FC } from 'react';

import prisma from '@/app/lib/db';
import { ThreadPostPagination } from '@/app/threads/[threadId]/components/ThreadPostPagination';
import { SHOW_PAGES } from '@/app/utils/siteSettings';

interface Props {
  threadId: string;
  currentPage: number; // 現在のページ番号
  postsPerPage: number; // 1ページの投稿表示数
}

export const ThreadConversationList: FC<Props> = async ({
  threadId,
  currentPage,
  postsPerPage,
}) => {
  const totalPosts = await prisma.post.count({
    where: { threadId },
  });

  const posts = await prisma.post.findMany({
    where: {
      threadId: threadId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
    },
    skip: (currentPage - 1) * postsPerPage,
    take: postsPerPage,
  });

  return (
    <>
      <ol className="mt-6">
        {posts.length === 0 ? (
          <li className="flex items-center gap-2">
            投稿がありません
            <Frown size={'1em'} />
            {'< ﾋﾟｴﾝ'}
          </li>
        ) : (
          posts.map((post, index) => (
            <li className="border-t last-of-type:border-b p-4 pt-2" key={post.id}>
              <div className="grid gap-1">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    #{totalPosts - (currentPage - 1) * postsPerPage - index}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays size={'1em'} />
                    {dayjs(post.createdAt).format('YYYY-MM-DD HH:mm')}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UserRound size={'1rem'} />
                  {post.user.name}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AtSign size={'1rem'} />
                  *****{post.user.id.slice(-10)}
                </div>
                <div className="mt-4">
                  <pre className="whitespace-pre-wrap break-all text-lg">{post.content}</pre>
                </div>
              </div>
            </li>
          ))
        )}
      </ol>
      <div className="mt-10">
        <ThreadPostPagination
          threadId={threadId}
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          totalPosts={totalPosts}
          showPages={SHOW_PAGES}
        />
      </div>
    </>
  );
};
