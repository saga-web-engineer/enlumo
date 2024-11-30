import type { FC } from 'react';

import { Button } from '@/components/ui/button';
import prisma from '@/app/lib/db';
import { updateReaction } from '@/app/threads/[threadId]/actions';
import { auth } from '@/app/lib/auth';
import { cn } from '@/lib/utils';

interface Props {
  postId: string;
  name: string;
  children: React.ReactNode
}

export const ThreadReactionButton: FC<Props> = async ({ postId, name: reactionName, children }) => {
  const session = await auth();
  const currentUser = session?.user

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      [reactionName]: true
    },
  })

  // 自分がリアクションをしているかどうか
  const reactionState = currentUser && post?.[reactionName]?.some(user => user.id === currentUser.id)

  return (
    <form action={updateReaction}>
      <input type="hidden" name="postId" value={postId} />
      <input type="hidden" name="reactionName" value={reactionName} />
      {/* booleanは渡せないのでStringにする */}
      <input type="hidden" name="state" value={String(!reactionState)} />
      <Button variant="outline" className={cn('rounded-full h-auto px-2 py-0', {
        'bg-primary text-white': reactionState
      })}>
        <span className='text-lg'>{children}</span> {post?.[reactionName].length}
      </Button>
    </form>
  )
}