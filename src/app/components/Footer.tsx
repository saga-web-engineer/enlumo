import type { FC } from 'react';

import { Wrapper } from '@/app/components/Wrapper';

export const Footer: FC = () => {
  return (
    <footer className="py-4">
      <Wrapper>
        <p className="text-center">
          <small translate="no">&copy; 2024 Kume Yuta</small>
        </p>
      </Wrapper>
    </footer>
  );
};
