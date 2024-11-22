"use client"

import { useForm } from '@conform-to/react';
import { useActionState } from "react"
import { updateUser } from "../actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { parseWithZod } from '@conform-to/zod';
import { settingSchema } from '../schema';
type props = {
  defaultValue?: {
    name?: string | null
    bio?: string | null
  }
}

export const SettingForm = ({ defaultValue }: props) => {
  const [lastResult, action, isPending] = useActionState(updateUser, null);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: settingSchema })
    },

    defaultValue,

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  })
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="grid grid-cols-[20%,80%]">
        <Label htmlFor="name">名前</Label>
        <div>
          <Input key={fields.name.key} name={fields.name.name} defaultValue={fields.name.initialValue} />
          <p className='text-sm text-red-500'>{fields.name.errors}</p>
          <p className="text-sm text-muted-foreground">30文字以内</p>
        </div>
      </div>
      <div className="grid grid-cols-[20%,80%]">
        <Label htmlFor="bio">自己紹介</Label>
        <div>
          <Textarea key={fields.bio.key} name={fields.bio.name} defaultValue={fields.bio.initialValue} />
          <p className='text-sm text-red-500'>{fields.bio.errors}</p>
          <p className="text-sm text-muted-foreground">200文字以内</p>
        </div>
      </div>

      <Button disabled={isPending}>登録</Button>
    </form>
  )
}