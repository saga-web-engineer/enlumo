import type { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

export const Wrapper: FC<Props> = ({ children }) => {
  return <div className="mx-auto w-[min(90%,1200px)]">{children}</div>;
};
