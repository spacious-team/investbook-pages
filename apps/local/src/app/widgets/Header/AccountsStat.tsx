import {
  AdaptiveTooltip,
  AdaptiveTooltipContent,
  AdaptiveTooltipTrigger,
} from '@investbook-pages/common-ui';
import { useTranslation } from '@investbook-pages/products';
import { useNavigate } from 'react-router-dom';
import { useAccountsAllStats } from '../../hooks/queries/useAccountsAllStats';

const ACCOUNTS_LIMIT = 3;

export function AccountsStat() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: stats } = useAccountsAllStats();

  const accounts = stats?.data?.accounts ?? [];
  const visibleAccounts = accounts.slice(0, ACCOUNTS_LIMIT);
  const hiddenAccounts = accounts.slice(ACCOUNTS_LIMIT);

  return (
    <div
      className="flex flex-col gap-0.5 rounded px-2 py-1 transition-colors hover:bg-primary-foreground/10 active:bg-primary-foreground/20 cursor-pointer"
      onClick={() => navigate('/portfolio')}
    >
      <span className="text-[10px] uppercase tracking-wide text-primary-foreground/60">
        {t('statsStrip.accounts')}
      </span>
      <div className="flex items-center gap-1.5">
        <span className="text-[13px] font-semibold text-primary-foreground">
          {visibleAccounts.join(' · ')}
        </span>
        {hiddenAccounts.length > 0 && (
          <AdaptiveTooltip>
            <AdaptiveTooltipTrigger asChild>
              <span
                onClick={(e) => e.stopPropagation()}
                className="rounded border border-primary-foreground/30 bg-primary-foreground/20 px-1.5 py-0.5 text-[11px] font-semibold text-primary-foreground"
              >
                +{hiddenAccounts.length}
              </span>
            </AdaptiveTooltipTrigger>
            <AdaptiveTooltipContent>
              {hiddenAccounts.map((account) => (
                <div key={account}>{account}</div>
              ))}
            </AdaptiveTooltipContent>
          </AdaptiveTooltip>
        )}
      </div>
    </div>
  );
}
