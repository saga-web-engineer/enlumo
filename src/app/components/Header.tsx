import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

import { Wrapper } from '@/app/components/Wrapper';

export const Header: FC = () => {
  return (
    <header className="sticky py-4 top-0">
      <Wrapper>
        <h1>
          <Link href="/">
            <Image src="/logo.svg" alt="Enlumo" width={240} height={49} />
          </Link>
        </h1>
      </Wrapper>
    </header>
  );
};
