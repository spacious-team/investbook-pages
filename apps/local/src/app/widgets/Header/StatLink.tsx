import { Link } from 'react-router-dom';

export function StatDivider() {
  return <div className="h-7 w-px shrink-0 bg-primary-foreground/20 mx-1" />;
}

interface StatLinkProps {
  label: string;
  value?: string | number;
}

export function StatLink({ label, value }: StatLinkProps) {
  return (
    <Link
      to="/portfolio"
      className="flex flex-col gap-0.5 rounded px-2 py-1 transition-colors hover:bg-primary-foreground/10 active:bg-primary-foreground/20"
    >
      <span className="text-[10px] uppercase tracking-wide text-primary-foreground/60">
        {label}
      </span>
      <span className="text-[13px] font-semibold text-primary-foreground">
        {value !== null && value !== undefined ? String(value) : '—'}
      </span>
    </Link>
  );
}
