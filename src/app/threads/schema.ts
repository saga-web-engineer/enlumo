import { z } from 'zod';

export const ThreadsNewSchema = z.object({
  title: z
    .string({ required_error: 'スレッドのタイトルを入力してください' })
    .min(1)
    .max(30, '30文字以内で入力してください'),
  bio: z
    .string({ required_error: 'スレッドの説明を入力してください' })
    .min(1)
    .max(140, '140字以内で入力してください'),
});
