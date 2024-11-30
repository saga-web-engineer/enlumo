'use client';

import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import type { FC } from 'react';
import { useActionState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { getUserByInviteCode } from '@/app/license/actions';
import { inviteCodeSchema } from '@/app/license/schema';

export const InviteCodeForm: FC = () => {
  const [lastResult, formAction, isPending] = useActionState(getUserByInviteCode, null);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: inviteCodeSchema });
    },

    constraint: getZodConstraint(inviteCodeSchema),

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <form action={formAction} {...getFormProps(form)} className="mt-6">
      <Input {...getInputProps(fields.inviteCode, { type: 'text' })} key={fields.inviteCode.key} />
      <p className="text-sm text-red-500">{fields.inviteCode.errors}</p>
      <Button
        className={cn({ 'cursor-not-allowed': !form.valid || isPending }, 'mt-6')}
        disabled={!form.valid || isPending}
      >
        招待コードを送信
      </Button>
    </form>
  );
};
