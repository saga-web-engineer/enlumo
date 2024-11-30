'use client';

import { getFormProps, getInputProps, getTextareaProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { FC, useActionState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

import { updateUser } from '@/app/setting/actions';
import { settingSchema } from '@/app/setting/schema';

interface Props {
  defaultValue?: {
    name?: string | null;
    bio?: string | null;
  };
}

export const SettingForm: FC<Props> = ({ defaultValue }) => {
  const [lastResult, action, isPending] = useActionState(
    async (prev: unknown, action: FormData) => {
      try {
        const result = await updateUser(prev, action);

        toast.success('設定を更新しました');

        return result;
      } catch (error) {
        toast.error('設定の更新に失敗しました');
        console.log(error);
      }
    },
    null
  );
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: settingSchema });
    },

    defaultValue,

    constraint: getZodConstraint(settingSchema),

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <form action={action} {...getFormProps(form)} className="mt-6 grid gap-4">
      <div>
        <Label className="text-base leading-relaxed" htmlFor="name">
          名前
        </Label>
        <Input
          {...getInputProps(fields.name, { type: 'text' })}
          key={fields.name.key}
          defaultValue={fields.name.initialValue}
        />
        <p className="text-sm text-red-500">{fields.name.errors}</p>
        <p className="text-sm text-muted-foreground">30文字以内</p>
      </div>
      <div>
        <Label className="text-base leading-relaxed" htmlFor="bio">
          自己紹介
        </Label>
        <Textarea
          {...getTextareaProps(fields.bio)}
          key={fields.bio.key}
          defaultValue={fields.bio.initialValue}
          className="min-h-[160px] max-h-[300px] resize-none [field-sizing:content]"
        />
        <p className="text-sm text-red-500">{fields.bio.errors}</p>
        <p className="text-sm text-muted-foreground">140文字以内</p>
      </div>
      <Button
        className={cn(
          { 'cursor-not-allowed': !form.valid || isPending },
          'w-[min(100%,320px)] mt-4 mx-auto py-3 md:text-lg md:py-4 md:mt-6 !h-auto text-foreground'
        )}
        disabled={!form.valid || isPending}
      >
        登録
      </Button>
    </form>
  );
};
