import Image from 'next/image';
import type { FC } from 'react';

interface Props {
  width: number;
  height: number;
  addClass?: string;
}

export const Logo: FC<Props> = ({ width, height, addClass }) => {
  return (
    <Image src="/img/logo2.svg" alt="Relumo" width={width} height={height} className={addClass} />
  );
};
