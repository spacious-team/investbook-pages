import * as React from 'react';
import { cn } from './utils';

export interface TypographyH1Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function TypographyH1({
  children,
  className,
  ...props
}: TypographyH1Props) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export interface BannerProps {
  text: string;
  className?: string;
}

export function Banner({ text, className }: BannerProps) {
  return (
    <TypographyH1
      className={cn('text-2xl font-semibold tracking-tight', className)}
    >
      {text}
    </TypographyH1>
  );
}
