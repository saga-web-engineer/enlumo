import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { type FC, useState, useTransition } from 'react';
import { getPostByPostNumber } from '../actions';

interface Props {
  threadId: string;
  replyNumber: number;
}

export const ThreadContentDialog: FC<Props> = ({ threadId, replyNumber }) => {
  const [text, setText] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <Dialog
      onOpenChange={() => {
        startTransition(async () => {
          const result = await getPostByPostNumber(threadId, replyNumber);
          if (!result) return;
          setText(result);
        });
      }}
    >
      <DialogTrigger className="text-blue-500">
        {'>> '}
        {replyNumber}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          {'>> '}
          {replyNumber} の投稿
        </DialogTitle>
        {pending ? (
          <p className="text-muted-foreground">読み込み中...</p>
        ) : !text ? (
          <p className="text-red-500">投稿が存在しません</p>
        ) : (
          <pre className="whitespace-pre-wrap break-all text-base">{text}</pre>
        )}
      </DialogContent>
    </Dialog>
  );
};
