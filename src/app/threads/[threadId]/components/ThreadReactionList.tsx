import type { FC } from 'react';
import { ThreadReactionButton } from './ThreadReactionButton';

export const reactionList = [
  {
    name: 'love',
    emoji: '😍'
  },
  {
    name: 'angry',
    emoji: '🤬'
  },
  {
    name: 'horror',
    emoji: '😱'
  },
  {
    name: 'smile',
    emoji: '🥹'
  },
]

interface Props {
  postId: string;
}

export const ThreadReactionList: FC<Props> = async ({ postId }) => {

  return (
    <>
      <div className='flex gap-4 mt-4'>
        {
          reactionList.map(reaction => (
            <ThreadReactionButton postId={postId} name={reaction.name} key={reaction.name}>
              {reaction.emoji}
            </ThreadReactionButton>
          ))
        }
      </div>
    </>
  )
}
