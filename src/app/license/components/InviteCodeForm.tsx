"use client"

import type { FC } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";

import { getUserByInviteCode } from "@/app/license/actions"
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { inviteCodeSchema } from '../schema';

export const InviteCodeForm: FC = () => {
  const [lastResult, formAction, isPending] = useActionState(getUserByInviteCode, null)

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: inviteCodeSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={formAction}>
      <Input name={fields.code.name} key={fields.code.key} />
      {fields.code.errors && (
        <p className="text-sm text-red-500">{fields.code.errors}</p>
      )}
      <Button disabled={!fields.code.value || isPending}>招待コードがあるか確認してみる！！！！！！</Button>
    </form>
  )
}