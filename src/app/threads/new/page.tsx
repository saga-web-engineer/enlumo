import { redirect } from 'next/navigation';

import { HeadingPage } from '@/app/components/heading/HeadingPage';
import { LayoutPadding } from '@/app/components/layout/LayoutPadding';
import { auth } from '@/app/lib/auth';
import { ThreadNewForm } from '@/app/threads/new/components/ThreadNewForm';

export default async function ThreadsNew() {
  const session = await auth();

  if (!session?.user.isLicense) redirect('/');

  return (
    <LayoutPadding>
      <HeadingPage>スレッドを新規作成</HeadingPage>
      <ThreadNewForm />
    </LayoutPadding>
  );
}
