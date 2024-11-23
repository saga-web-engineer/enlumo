import { redirect } from "next/navigation";

import { InviteCodeForm } from "@/app/license/components/InviteCodeForm"
import { auth } from "@/app/lib/auth"

export default async function License() {
  const session = await auth();

  // 招待コード入力済みのログインユーザーはスレッド一覧ページへリダイレクト
  if (session?.user.isLicense) redirect("/threads");

  // 未ログインユーザーはTOPへリダイレクト
  if (!session) redirect("/")

  return <InviteCodeForm />
}