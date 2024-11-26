import type { FC } from 'react';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const LayoutPadding: FC<Props> = ({ children }) => {
  return <div className="py-6">{children}</div>;
};
