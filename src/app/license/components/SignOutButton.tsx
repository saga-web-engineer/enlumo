'use client';

import { Loader2, LogOut } from 'lucide-react';
import type { FC } from 'react';
import { useFormStatus } from 'react-dom';

export const SignOutButton: FC = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <button
          className="flex items-center gap-3 text-red-800 py-2 px-3 sm:gap-5 sm:text-xl"
          disabled
        >
          <Loader2 className="size-4 sm:size-5 animate-spin" />
          ログアウト処理中
        </button>
      ) : (
        <button className="flex items-center gap-3 text-red-800 py-2 px-3 transition-colors hover:text-red-500 sm:gap-5 sm:text-xl">
          <LogOut className="size-4 sm:size-5" />
          ログアウト
        </button>
      )}
    </>
  );
};
