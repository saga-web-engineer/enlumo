import { z } from "zod";

export const inviteCodeSchema = z.object({
  code: z.string({ required_error: "招待コードを入力してください" })
})
