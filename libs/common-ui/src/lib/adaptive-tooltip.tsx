import {
  ComponentProps,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import { cn } from './utils';

const AdaptiveTooltipContext = createContext<{ isHover: boolean }>({
  isHover: true,
});

function useHoverCapable() {
  const mq = useMemo(
    () =>
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(hover: hover)')
        : null,
    [],
  );

  const [isHover, setIsHover] = useState(() => mq?.matches ?? true);

  useEffect(() => {
    if (!mq) return;
    const handler = (e: MediaQueryListEvent) => setIsHover(e.matches);
    mq.addEventListener('change', handler);

    return () => mq.removeEventListener('change', handler);
  }, [mq]);

  return isHover;
}

interface AdaptiveTooltipProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

function AdaptiveTooltip({ children, ...props }: AdaptiveTooltipProps) {
  const isHover = useHoverCapable();

  return (
    <AdaptiveTooltipContext.Provider value={{ isHover }}>
      {isHover ? (
        <Tooltip {...props}>{children}</Tooltip>
      ) : (
        <Popover {...props}>{children}</Popover>
      )}
    </AdaptiveTooltipContext.Provider>
  );
}

function AdaptiveTooltipTrigger({
  ...props
}: ComponentProps<typeof TooltipTrigger>) {
  const { isHover } = useContext(AdaptiveTooltipContext);

  if (isHover) {
    return <TooltipTrigger {...props} />;
  }

  return <PopoverTrigger {...props} />;
}

interface AdaptiveTooltipContentProps {
  children?: ReactNode;
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
}

function AdaptiveTooltipContent({
  className,
  children,
  ...props
}: AdaptiveTooltipContentProps) {
  const { isHover } = useContext(AdaptiveTooltipContext);

  if (isHover) {
    return (
      <TooltipContent className={className} {...props}>
        {children}
      </TooltipContent>
    );
  }

  return (
    <PopoverContent
      className={cn(
        'w-auto px-3 py-1.5 text-xs bg-foreground text-background rounded-md',
        className,
      )}
      {...props}
    >
      {children}
    </PopoverContent>
  );
}

export { AdaptiveTooltip, AdaptiveTooltipTrigger, AdaptiveTooltipContent };
