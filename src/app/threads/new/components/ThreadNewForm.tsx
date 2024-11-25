'use client';

import { getFormProps, getInputProps, getTextareaProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { useActionState, type FC } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import { createThread } from '@/app/threads/new/actions';
import { ThreadsNewSchema } from '@/app/threads/new/schema';

export const ThreadNewForm: FC = () => {
  const [lastResult, action, isPending] = useActionState(createThread, null);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ThreadsNewSchema });
    },

    constraint: getZodConstraint(ThreadsNewSchema),

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <form action={action} {...getFormProps(form)}>
      <div>
        <Label htmlFor="title">タイトル</Label>
        <Input {...getInputProps(fields.title, { type: 'text' })} key={fields.title.key} />
      </div>
      <div>
        <label htmlFor="bio">スレッドの説明</label>
        <Textarea {...getTextareaProps(fields.bio)} key={fields.bio.key} />
      </div>
      <Button
        className={cn({ 'cursor-not-allowed': !form.valid || isPending })}
        disabled={!form.valid || isPending}
      >
        スレッドを作成する
      </Button>
    </form>
  );
};
