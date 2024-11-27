import Image from 'next/image';
import { redirect } from 'next/navigation';

import { HeadingPage } from '@/app/components/heading/HeadingPage';
import { LayoutPadding } from '@/app/components/layout/LayoutPadding';
import { InviteStep } from '@/app/invite/components/InviteStep';
import { auth } from '@/app/lib/auth';
import prisma from '@/app/lib/db';
import { SITE_URL } from '@/app/utils/siteSettings';
import { InviteCode } from './components/InviteCode';
import { InviteContent } from './components/InviteContent';

export default async function Invite() {
  const session = await auth();
  if (!session?.user.isLicense) redirect('/');

  const { inviteCode } =
    (await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: { inviteCode: true },
    })) || {};

  return (
    <LayoutPadding>
      <HeadingPage>友達招待</HeadingPage>
      <ol className="mt-6 grid gap-12">
        <li>
          <InviteStep num={1} title="サイトにアクセスしてアカウントを作成" />
          <InviteContent>
            <p>
              お友達を招待するにはブラウザでRelumoサイト （{SITE_URL}）
              に直接アクセスするか下記QRコードを読み取ってもらってね！
            </p>
            <p>アカウントの作成にはGoogleまたはTwitter（X）のアカウントが必要だよ！</p>
            <p>RelumoサイトのURLやQRコードは不特定多数が見れる場所に掲載しないでね！</p>
            <Image
              src="/img/qr.png"
              alt={`Relumoサイト${SITE_URL}のQRコード`}
              width={450}
              height={450}
              loading="eager"
              className="mt-6"
            />
          </InviteContent>
        </li>
        <li>
          <InviteStep num={2} title="招待コードを送る" />
          <InviteContent>
            <p>下記のコードがあなたの招待コードだよ！お友達に教えてあげてね！</p>
            <p>アカウント作成後に招待コードの入力を求められるので招待コードを入力してもらおう！</p>
            <p>URLやQRと同様に不特定多数が見れる場所には掲載しないでね！</p>
            <h3 className="mt-4">あなたの招待コード</h3>
            <InviteCode inviteCode={inviteCode} />
          </InviteContent>
        </li>
        <li>
          <InviteStep num={3} title="Relumoを楽しむ" />
          <InviteContent>
            <p>招待コードを入力し終えたらRelumoが使えるようになるよ！</p>
            <p>
              スレッドを立てたり投稿したり、みんなの投稿にリアクションをつけたり...お友達と自由に楽しんでね！
            </p>
          </InviteContent>
        </li>
      </ol>
    </LayoutPadding>
  );
}
