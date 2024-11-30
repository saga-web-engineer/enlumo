import { Loader2 } from 'lucide-react';
import type { FC } from 'react';

export const LoadingMessage: FC = () => {
  return (
    <div className="mt-4">
      <div className="w-fit mx-auto">
        <Loader2 className="animate-spin text-center" size={40} />
      </div>
      <p className="text-center text-xl mt-2">読み込み中...</p>
    </div>
  );
};
