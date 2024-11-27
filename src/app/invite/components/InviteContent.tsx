import type { FC } from 'react';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const InviteContent: FC<Props> = ({ children }) => {
  return <div className="mt-6 pl-14 leading-loose">{children}</div>;
};
