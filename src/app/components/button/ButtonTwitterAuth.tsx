'use client';

import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import type { FC } from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';

export const ButtonTwitterAuth: FC = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button className="w-full h-auto py-4 sm:text-xl" variant="outline" disabled>
          <Loader2 className="size-4 mr-2 animate-spin" />
          ログイン中
        </Button>
      ) : (
        <Button className="w-full h-auto py-4 sm:text-xl" variant="outline">
          <Image
            className="w-4 sm:w-5"
            src="/img/Twitter.svg"
            alt="Twitterロゴ"
            width={20}
            height={20}
          />
          Twitter（X）でログイン
        </Button>
      )}
    </>
  );
};
