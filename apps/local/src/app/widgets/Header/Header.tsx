import { SidebarTrigger } from '@investbook-pages/common-ui';
import { useTranslation } from '@investbook-pages/products';
import { useLocation } from 'react-router-dom';
import { StatsMobileGrid, StatsRow } from './StatsStrip';
import { UserMenu } from './UserMenu';

export function Header() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const pageTitles: Record<string, string> = {
    '/': t('pageTitles.portfolio'),
    '/portfolio': t('pageTitles.portfolio'),
    '/analytics': t('pageTitles.analytics'),
    '/taxes': t('pageTitles.taxes'),
    '/upload': t('pageTitles.upload'),
    '/forms': t('pageTitles.forms'),
  };

  const title = pageTitles[pathname] ?? '';

  return (
    <header className="w-full bg-primary text-primary-foreground px-6">
      {/* ── Row 1: title · [stats on lg] · user menu ── */}
      <div className="flex items-center gap-3 py-4">
        <SidebarTrigger className="md:hidden text-primary-foreground hover:bg-primary-foreground/10 active:bg-primary-foreground/20" />
        <h1 className="text-xl font-bold shrink-0">{title}</h1>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-1">
            <StatsRow />
          </div>
          <UserMenu />
        </div>
      </div>

      {/* ── Row 2: stats strip — medium screens only ── */}
      <div className="hidden md:flex lg:hidden items-center gap-1 pb-4 pt-1 border-t border-primary-foreground/20">
        <StatsRow />
      </div>

      {/* ── Row 2: stats 2×2 grid — mobile only ── */}
      <StatsMobileGrid />
    </header>
  );
}
