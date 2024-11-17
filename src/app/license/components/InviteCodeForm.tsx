"use client"

import type { FC } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";

import { getUserByInviteCode } from "@/app/license/actions"

export const InviteCodeForm: FC = () => {
  const [error, formAction, isPending] = useActionState(getUserByInviteCode, null)

  return (
    <form action={formAction}>
      <Input name="code" />
      {error === "error" && (
        <p className="text-sm text-red-500">そんなわけわからないID存在しません</p>
      )}
      <Button disabled={isPending}>招待コードがあるか確認してみる！！！！！！</Button>
    </form>
  )
}