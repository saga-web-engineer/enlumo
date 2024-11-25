import dayjs from 'dayjs';
import { CalendarDays, Frown, MessageCircle, UserRound } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';

import prisma from '@/app/lib/db';
import { ThreadPagination } from '@/app/threads/components/ThreadPagination';
import { SHOW_PAGES } from '@/app/utils/siteSettings';

interface Props {
  currentPage: number; // 現在のページ番号
  threadsPerPage: number; // 1ページのスレッド表示数
}

export const ThreadList: FC<Props> = async ({ currentPage, threadsPerPage }) => {
  const threads = await prisma.thread.findMany({
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
      user: true,
    },
    skip: (currentPage - 1) * threadsPerPage,
    take: threadsPerPage,
  });

  const totalThreads = await prisma.thread.count();

  return (
    <>
      <ul className="mt-6">
        {totalThreads === 0 ? (
          <li className="flex items-center gap-2">
            スレッドがありません
            <Frown size={'1em'} />
            {'< ﾋﾟｴﾝ'}
          </li>
        ) : (
          threads.map((thread) => (
            <li key={thread.id} className="border-t last:border-b">
              <Link
                className="grid gap-2 p-4 hover:bg-muted transition-colors"
                href={`/threads/${thread.id}`}
              >
                <h2 className="font-bold text-lg">{thread.title}</h2>
                <p className="text-sm">{thread.bio}</p>
                <p className="flex items-center gap-2 text-sm">
                  <UserRound size={'1rem'} />
                  {thread.user.name}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <p className="flex items-center gap-2">
                    <MessageCircle size={'1em'} />
                    {thread._count.posts}
                  </p>
                  <p className="flex items-center gap-2">
                    <CalendarDays size={'1em'} />
                    {dayjs(thread.createdAt).format('YYYY-MM-DD HH:mm')}
                  </p>
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
      <div className="mt-10">
        <ThreadPagination
          currentPage={currentPage}
          threadsPerPage={threadsPerPage}
          totalThreads={totalThreads}
          showPages={SHOW_PAGES}
        />
      </div>
    </>
  );
};