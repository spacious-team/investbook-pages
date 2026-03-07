import { TypographyH1 } from '../Typography/Typography';
import { cn } from '../utils';

export interface BannerProps {
  text: string;
  className?: string;
}

export function Banner({ text, className }: BannerProps) {
  return (
    <TypographyH1 className={cn('text-2xl font-semibold tracking-tight', className)}>
      {text}
    </TypographyH1>
  );
}

export default Banner;
