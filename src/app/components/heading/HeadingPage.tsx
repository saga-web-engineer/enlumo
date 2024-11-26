import type { FC } from 'react';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const HeadingPage: FC<Props> = ({ children }) => {
  return <h1 className="text-2xl">{children}</h1>;
};
