import { AvatarFallback } from '@radix-ui/react-avatar';
import { UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { FC } from 'react';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Logo } from '@/app/components/Logo';
import { Wrapper } from '@/app/components/Wrapper';
import { ThemeToggle } from '@/app/components/theme/ThemeToggle';
import { auth, signOut } from '@/app/lib/auth';
import prisma from '@/app/lib/db';

export const Header: FC = async () => {
  const session = await auth();

  return (
    <header className="sticky py-4 top-0 border-b backdrop-blur bg-background/50">
      <Wrapper className="flex justify-between items-center">
        <h1>
          <Link href="/">
            <Logo width={100} height={23} />
          </Link>
        </h1>
        <div className="flex items-center gap-4">
          {session?.user && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="grid place-items-center">
                  <AvatarImage src={session.user.image || undefined} />
                  <AvatarFallback>
                    <UserCircle2 />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <form
                    className="w-full"
                    action={async () => {
                      'use server';
                      await signOut();
                    }}
                  >
                    {/* DropdownMenuItemのスタイルを適用させるために普通のbuttonタグを使用 */}
                    <button className="w-full cursor-default">ログアウト</button>
                  </form>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className="w-full flex justify-center items-center" href="/invite">
                    友達招待
                  </Link>
                </DropdownMenuItem>
                {
                  // 抹消ボタンは最終的に削除する
                  process.env.NODE_ENV === 'development' && (
                    <DropdownMenuItem>
                      <form
                        className="w-full"
                        action={async () => {
                          'use server';
                          await prisma.user.delete({
                            where: {
                              id: session.user.id,
                            },
                          });
                          redirect('/');
                        }}
                      >
                        {/* DropdownMenuItemのスタイルを適用させるために普通のbuttonタグを使用 */}
                        <button className="w-full text-red-500 font-bold cursor-default">
                          抹消
                        </button>
                      </form>
                    </DropdownMenuItem>
                  )
                }
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <ThemeToggle />
        </div>
      </Wrapper>
    </header>
  );
};
