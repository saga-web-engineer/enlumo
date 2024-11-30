import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { FC } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';

interface Props {
  threadId: string;
  currentPage: number;
  postsPerPage: number;
  totalPosts: number;
  showPages: number;
}

export const ThreadPostPagination: FC<Props> = ({
  threadId,
  currentPage,
  postsPerPage,
  totalPosts,
  showPages,
}) => {
  const pageEnd = Math.ceil(totalPosts / postsPerPage);

  const showPageStart = currentPage - (showPages - 1) / 2; // 表示するページネーションの左端（０、負含む）
  const showPageEnd = currentPage + (showPages - 1) / 2; // 表示するページネーションの右端（MAXを超えた場合もカウント）

  //表示するページネーションを格納した配列の生成
  const showPageArr: number[] = [];
  for (let page = showPageStart; page <= showPageEnd; page++) {
    if (page < 1 || page > pageEnd) continue;
    showPageArr.push(page);
  }

  return (
    <>
      {totalPosts > postsPerPage && (
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink
                  href={`/threads/${threadId}?page=${currentPage - 1}`}
                  aria-label="前のページへ"
                >
                  <ChevronLeft />
                </PaginationLink>
              </PaginationItem>
            )}
            {showPageStart > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {showPageArr.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href={`/threads/${threadId}?page=${page}`}
                  isActive={page === currentPage}
                  aria-disabled={page === currentPage}
                  className="aria-disabled:pointer-events-none"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            {showPageEnd < pageEnd && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {currentPage < pageEnd && (
              <PaginationItem>
                <PaginationLink
                  href={`/threads/${threadId}?page=${currentPage + 1}`}
                  aria-label="次のページへ"
                >
                  <ChevronRight />
                </PaginationLink>
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};
