import logoUrl from './logo.png';
import { cn } from './utils';

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className, size = 32 }: LogoProps) {
  return (
    <img
      src={logoUrl}
      alt="Investbook logo"
      width={size}
      height={size}
      className={cn('shrink-0 rounded-full object-cover', className)}
    />
  );
}
