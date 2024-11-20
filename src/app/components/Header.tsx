import Link from 'next/link';
import type { FC } from 'react';

import { Logo } from '@/app/components/Logo';
import { Wrapper } from '@/app/components/Wrapper';
import { ThemeToggle } from '@/app/components/theme/ThemeToggle';

export const Header: FC = () => {
  return (
    <header className="sticky py-4 top-0 border-b backdrop-blur bg-background/50">
      <Wrapper className="flex justify-between items-center">
        <h1>
          <Link href="/">
            <Logo width={100} height={23} />
          </Link>
        </h1>
        <ThemeToggle />
      </Wrapper>
    </header>
  );
};
