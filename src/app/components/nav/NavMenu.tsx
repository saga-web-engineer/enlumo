'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

import { navList } from '@/app/components/nav/data/navMenu';
import { cn } from '@/lib/utils';

export const NavMenu: FC = () => {
  const pathname = usePathname();

  return (
    <nav className="mt-8">
      <ul className="grid gap-4">
        {navList.map((item) => (
          <li key={item.label}>
            <Link
              className={cn(
                pathname === item.href
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground',
                'w-full flex items-center py-2 px-3 gap-3 transition-colors hover:text-primary sm:gap-5 sm:text-xl'
              )}
              href={item.href}
            >
              <item.icon className="size-4 sm:size-5" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
