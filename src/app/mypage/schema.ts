import { z } from 'zod';

export const settingSchema = z.object({
  name: z
    .string({ required_error: '名前を入力してください' })
    .max(30, '30文字以内で入力してください'),
});
