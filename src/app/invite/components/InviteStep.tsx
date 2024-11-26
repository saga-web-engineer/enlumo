import type { FC } from 'react';

interface Props {
  num: number;
  title: string;
}

export const InviteStep: FC<Props> = ({ num, title }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="rounded-full text-xl border min-w-10 aspect-square flex items-center justify-center">
        {num}
      </span>
      <h2 className="text-2xl">{title}</h2>
    </div>
  );
};
