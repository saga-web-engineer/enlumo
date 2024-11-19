import type { FC } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Wrapper: FC<Props> = ({ children, className }) => {
  return <div className={`mx-auto w-[min(90%,1200px)] ${className}`}>{children}</div>;
};
