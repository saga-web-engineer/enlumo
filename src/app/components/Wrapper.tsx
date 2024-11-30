import type { FC } from 'react';

import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Wrapper: FC<Props> = ({ children, className }) => {
  return <div className={cn('mx-auto w-[min(90%,1200px)]', className)}>{children}</div>;
};
