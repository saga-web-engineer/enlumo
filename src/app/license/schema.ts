import { z } from 'zod';

export const inviteCodeSchema = z.object({
  inviteCode: z.string({ required_error: '招待コードを入力してください' }),
});
