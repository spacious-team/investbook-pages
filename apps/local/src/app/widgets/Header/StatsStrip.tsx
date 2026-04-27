import { useTranslation } from '@investbook-pages/products';
import { AccountsStat } from './AccountsStat';
import { StatDivider, StatLink } from './StatLink';
import { formatCurrency } from '@investbook-pages/products';
import { useAccountsAllStats } from '../../hooks/queries/useAccountsAllStats';

export function StatsRow() {
  const { t } = useTranslation();
  const { data: stats } = useAccountsAllStats();

  return (
    <>
      <StatLink
        label={t('statsStrip.assets')}
        value={formatCurrency(stats?.data?.assetsValue)}
      />
      <StatDivider />
      <StatLink
        label={t('statsStrip.transactions')}
        value={stats?.data?.totalTransactions}
      />
      <StatDivider />
      <AccountsStat />
      <StatDivider />
      <StatLink
        label={t('statsStrip.cash')}
        value={formatCurrency(stats?.data?.cashBalance)}
      />
    </>
  );
}

export function StatsMobileGrid() {
  const { t } = useTranslation();
  const { data: stats } = useAccountsAllStats();

  return (
    <div className="md:hidden grid grid-cols-2 gap-x-2 gap-y-1 pb-4 pt-1 border-t border-primary-foreground/20">
      <StatLink
        label={t('statsStrip.assets')}
        value={formatCurrency(stats?.data?.assetsValue)}
      />
      <StatLink
        label={t('statsStrip.transactions')}
        value={stats?.data?.totalTransactions}
      />
      <AccountsStat />
      <StatLink
        label={t('statsStrip.cash')}
        value={formatCurrency(stats?.data?.cashBalance)}
      />
    </div>
  );
}
