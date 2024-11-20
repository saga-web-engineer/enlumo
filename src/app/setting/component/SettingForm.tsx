"use client"

import { useActionState } from "react"
import { updateUser } from "../actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type props = {
  defaultValue?: {
    name?: string | null
    bio?: string | null
  }
}

export const SettingForm = ({ defaultValue }: props) => {
  const [, action, isPending] = useActionState(updateUser, null)
  return (
    <form action={action}>
      <div className="grid grid-cols-[20%,80%]">
        <Label htmlFor="name">名前</Label>
        <div>
          <Input id="name" name="name" required maxLength={30} defaultValue={defaultValue?.name || ""} />
          <p className="text-sm text-muted-foreground">30文字以内</p>
        </div>
      </div>
      <div className="grid grid-cols-[20%,80%]">
        <Label htmlFor="bio">自己紹介</Label>
        <div>
          <Textarea id="bio" name="bio" maxLength={200} defaultValue={defaultValue?.bio || ""} />
          <p className="text-sm text-muted-foreground">200文字以内</p>
        </div>
      </div>

      <Button disabled={isPending}>登録</Button>
    </form>
  )
}