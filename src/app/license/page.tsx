import { redirect } from "next/navigation";

import { InviteCodeForm } from "@/app/license/components/InviteCodeForm"
import { auth } from "@/app/lib/auth"

export default async function License() {
  const session = await auth();
  if (!session) redirect("/")

  return <InviteCodeForm />
}