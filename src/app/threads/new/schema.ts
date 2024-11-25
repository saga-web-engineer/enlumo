import { z } from 'zod';

export const ThreadsNewSchema = z.object({
  title: z
    .string({ required_error: 'スレッドのタイトルを入力してください' })
    .max(30, '30文字以内で入力してください'),
  bio: z.string().max(140, '140文字以内で入力してください'),
});
