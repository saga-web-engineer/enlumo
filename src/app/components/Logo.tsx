import Image from 'next/image';
import type { FC } from 'react';

interface Props {
  width: number;
  height: number;
  className?: string;
}

export const Logo: FC<Props> = ({ width, height, className }) => {
  return (
    <Image src="/img/logo.svg" alt="Relumo" width={width} height={height} className={className} />
  );
};
