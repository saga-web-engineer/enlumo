"use client"

import type { FC } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";

import { getUserByInviteCode } from "@/app/license/actions"
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { inviteCodeSchema } from '../schema';

export const InviteCodeForm: FC = () => {
  const [lastResult, formAction, isPending] = useActionState(getUserByInviteCode, null)

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
    <form action={formAction} {...getFormProps(form)}>
      <Input {...getInputProps(fields.code, { type: 'text' })} key={fields.code.key} />
      {fields.code.errors && (
        <p className="text-sm text-red-500">{fields.code.errors}</p>
      )}
      <Button disabled={!form.valid || isPending}>招待コードがあるか確認してみる！！！！！！</Button>
    </form>
  )
}