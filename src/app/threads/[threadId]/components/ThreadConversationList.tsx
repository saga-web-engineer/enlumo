import dayjs from 'dayjs';
import { CalendarDays, Frown, UserRound } from 'lucide-react';
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
            スレッドが存在しません
            <Frown size={'1em'} />
            {'< ﾋﾟｴﾝ'}
          </li>
        ) : (
          posts.map((post, index) => (
            <li className="border-t last-of-type:border-b p-4" key={post.id}>
              <div>{totalPosts - (currentPage - 1) * postsPerPage - index}</div>
              <div className="grid gap-2 pt-2">
                <p>{post.content}</p>
                <p className="flex items-center gap-2 text-sm">
                  <UserRound size={'1rem'} />
                  {post.user.name}
                </p>
                <p className="flex items-center gap-2">
                  <CalendarDays size={'1em'} />
                  {dayjs(post.createdAt).format('YYYY-MM-DD HH:mm')}
                </p>
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
