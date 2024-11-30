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

interface Thread {
  title: string;
  id: string;
  bio: string;
  userName: string;
  latestDate: string;
  postCount: number;
  // pcre: string;
  // tcre: string;
}

export const ThreadList: FC<Props> = async ({ currentPage, threadsPerPage }) => {
  const threads = await prisma.$queryRaw<Thread[]>`
    -- SELECT
    --   t.id,
    --   t.title,
    --   t.bio,
    --   MAX(p."createdAt")as pcre,
    --   t."createdAt" as tcre,
    --   COALESCE(MAX(p."createdAt"), t."createdAt") AS latestDate,
    --   COUNT(p.id) AS postCount,
    --   u.name AS userName
    -- FROM
    --   "Thread" t
    -- LEFT JOIN
    --   "Post" p ON t.id = p."threadId"
    -- LEFT JOIN
    --   "User" u ON t."userId" = u.id
    -- GROUP BY
    --   t.id, t.title, t.bio, t."createdAt", u."name"
    -- ORDER BY
    --   latestDate DESC;
    SELECT
      t.id,
      t.title,
      t.bio,
      COALESCE(MAX(p."createdAt"), t."createdAt") AS latestDate,
      COUNT(p.id) AS postCount,
      u.name AS userName
    FROM
      "Thread" t
    LEFT JOIN
      "Post" p ON t.id = p."threadId"
    LEFT JOIN
      "User" u ON t."userId" = u.id
    GROUP BY
      t.id, t.title, t.bio, t."createdAt", u.name
    ORDER BY
      latestDate DESC;
  `;

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
                <p className="text-sm text-muted-foreground">{thread.bio}</p>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UserRound size={'1rem'} />
                  {thread.userName}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <MessageCircle size={'1em'} />
                    {thread.postCount}
                  </p>
                  <p className="flex items-center gap-2">
                    <CalendarDays size={'1em'} />
                    {dayjs(thread.latestDate).format('YYYY-MM-DD HH:mm')}
                    {/* {typeof thread.latestDate} */}
                    {/* {JSON.stringify(thread.pcre)}
                    {JSON.stringify(thread.tcre)} */}
                    {/* {thread.tcre} */}
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
