'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getFormProps, getTextareaProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { useActionState, useState, type FC } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import { ThreadPostButton } from '@/app/threads/[threadId]/components/ThreadPostButton';
import { threadConversationSchema } from '@/app/threads/[threadId]/schema';
import { sendMessage } from '../actions';

export const ThreadPostDialog: FC<{ threadId: string }> = ({ threadId }) => {
  const [open, setOpen] = useState(false);
  const [lastResult, action, isPending] = useActionState(
    async (_prev: unknown, action: FormData) => {
      await sendMessage(_prev, action);
      setOpen(false);
      return null;
    },
    null
  );

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: threadConversationSchema });
    },

    constraint: getZodConstraint(threadConversationSchema),

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <ThreadPostButton />
      </DialogTrigger>
      <DialogContent
        className="w-[90%] md:py-10 md:gap-6"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>投稿内容</DialogTitle>
        </DialogHeader>
        <form {...getFormProps(form)} action={action}>
          <Textarea
            {...getTextareaProps(fields.post)}
            key={fields.post.key}
            className="min-h-[160px] max-h-[300px] resize-none [field-sizing:content]"
          />
          <p className="text-sm text-red-500">{fields.post.errors}</p>
          <p className="text-sm text-muted-foreground">140文字以内</p>
          <input type="hidden" name="threadId" value={threadId} />
          <Button
            className={cn(
              { 'cursor-not-allowed': !form.valid || isPending },
              'block w-[min(100%,320px)] mt-4 mx-auto py-3 md:text-lg md:py-4 md:mt-6 !h-auto text-foreground'
            )}
            disabled={!form.valid || isPending}
          >
            投稿する
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
