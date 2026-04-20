import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@investbook-pages/common-ui';
import { useTranslation } from '@investbook-pages/products';
import { Link } from 'react-router-dom';

const mockStats = {
  assets: 145_328,
  transactions: 16,
  accounts: ['demo', 'demo-gold', 'demo-us', 'demo-eur', 'demo-usd'],
  cash: 24_928,
};

const ACCOUNTS_LIMIT = 3;

function formatCurrency(value: number): string {
  return value.toLocaleString('ru-RU') + '\u00a0₽';
}

function Divider() {
  return <div className="mx-1 h-7 w-px bg-border" />;
}

function StatItem({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <Link
      to="/portfolio"
      className="flex flex-col gap-0.5 rounded px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className={`text-[13px] font-semibold ${className ?? ''}`}>
        {value}
      </span>
    </Link>
  );
}

export default function PortfolioStatsStrip() {
  const { t } = useTranslation();
  const { assets, transactions, accounts, cash } = mockStats;

  const visibleAccounts = accounts.slice(0, ACCOUNTS_LIMIT);
  const hiddenAccounts = accounts.slice(ACCOUNTS_LIMIT);

  return (
    <div className="flex items-center gap-1 border-b border-border bg-stats-strip px-6 py-1.5">
      <StatItem
        label={t('statsStrip.assets')}
        value={formatCurrency(assets)}
        className="text-primary"
      />

      <Divider />

      <StatItem
        label={t('statsStrip.transactions')}
        value={String(transactions)}
      />

      <Divider />

      <Link
        to="/portfolio"
        className="flex flex-col gap-0.5 rounded px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
          {t('statsStrip.accounts')}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] font-semibold">
            {visibleAccounts.join('\u00a0·\u00a0')}
          </span>
          {hiddenAccounts.length > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  onClick={(e) => e.preventDefault()}
                  className="cursor-default rounded border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[11px] font-semibold text-primary"
                >
                  +{hiddenAccounts.length}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {hiddenAccounts.map((account) => (
                  <div key={account}>{account}</div>
                ))}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </Link>

      <Divider />

      <StatItem label={t('statsStrip.cash')} value={formatCurrency(cash)} />
    </div>
  );
}
