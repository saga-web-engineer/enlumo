import { Button } from '@/components/ui/button';
import type { FC } from 'react';

import { signIn } from '@/app/lib/auth';

export const ButtonGoogleAuth: FC = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signIn();
      }}
    >
      <Button>Googleアカウントでログインa</Button>
    </form>
  );
};
