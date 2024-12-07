'use client';

import { FC, Suspense, useState, useTransition } from 'react';
import { splitTextWithMention } from '../utils/splitTextWithMention';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getPostByPostNumber } from '../actions';

interface Props {
  threadId: string;
  text: string;
}

export const ThreadConversationContent: FC<Props> = ({ threadId, text }) => {
  const splittedText = splitTextWithMention(text);

  return (
    <pre className="whitespace-pre-wrap break-all text-lg">
      {splittedText.map((part, index) =>
        part.match(/(.*?)(>> \d+)/) ? (
          <ContentDialog key={index} threadId={threadId} part={part} />
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </pre>
  );
};

const ContentDialog = ({ threadId, part }: { threadId: string; part: string }) => {
  const [text, setText] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <Dialog
      onOpenChange={() => {
        startTransition(async () => {
          const result = await getPostByPostNumber(
            threadId,
            Number(part.match(/(.*?>> )(\d+)/)?.[2])
          );
          if (!result) return;
          setText(result);
        });
      }}
    >
      <DialogTrigger className="text-blue-500">{part}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{part}の投稿</DialogTitle>
        <Suspense fallback={<p className="text-muted-foreground">読み込み中...</p>}>
          {pending ? (
            <p className="text-muted-foreground">読み込み中...</p>
          ) : !text ? (
            <p className="text-red-500">投稿が存在しません</p>
          ) : (
            <p>{text}</p>
          )}
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
