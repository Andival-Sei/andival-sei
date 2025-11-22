import NextLink from 'next/link';
import { type ComponentProps } from 'react';
import { cn } from '@/src/shared/lib/utils';

export interface LinkProps extends ComponentProps<typeof NextLink> {
  variant?: 'default' | 'underline';
}

export function Link({ className, variant = 'default', ...props }: LinkProps) {
  return (
    <NextLink
      className={cn(
        'font-medium transition-colors hover:text-foreground/80',
        {
          'underline-offset-4 hover:underline': variant === 'underline',
        },
        className
      )}
      {...props}
    />
  );
}

