import { cn } from '../utils';

export interface BannerProps {
  text: string;
  className?: string;
}

export function Banner({ text, className }: BannerProps) {
  return (
    <h2 className={cn('text-2xl font-semibold tracking-tight', className)}>
      {text}
    </h2>
  );
}

export default Banner;
