import { Plus } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';

import { Button } from '@/components/ui/button';

export const ThreadCreateButton: FC = () => {
  return (
    <Button
      className="fixed right-4 bottom-[calc(env(safe-area-inset-bottom)+1rem)] p-0 rounded-full size-[60px]"
      asChild
    >
      <Link href="/threads/new/">
        <Plus className="!size-7 text-white" />
      </Link>
    </Button>
  );
};
