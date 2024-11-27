'use client';

import { CircleCheckIcon, ClipboardIcon } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Props extends React.ComponentProps<'button'> {
  inviteCode?: string;
}

export const InviteCode: FC<Props> = ({ inviteCode = '' }) => {
  const [isCopied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    setCopied(false);
    await global.navigator.clipboard.writeText(inviteCode);
    setTimeout(() => setCopied(true));
  };

  return (
    <TooltipProvider>
      <Tooltip defaultOpen={false} open={open}>
        <div className="flex items-center gap-2">
          <p className="flex items-center bg-gray-500 md:text-xl w-fit px-2 min-h-9 rounded">
            {inviteCode}
          </p>
          <TooltipTrigger asChild>
            <Button
              onClick={() => !isCopied && handleClick()}
              onMouseOver={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              className="size-9 rounded-full"
            >
              {isCopied ? (
                <CircleCheckIcon className="size-full" />
              ) : (
                <ClipboardIcon className="size-full" />
              )}
            </Button>
          </TooltipTrigger>
        </div>
        {open && <TooltipContent>{isCopied ? 'コピーしました' : 'コピー'}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};
