import {
  Bug,
  CircleUser,
  ExternalLink,
  HelpCircle,
  LogOut,
  Mail,
  Moon,
  Newspaper,
  RefreshCw,
  Star,
  Sun,
  SunMoon,
} from 'lucide-react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  SidebarTrigger,
  AdaptiveTooltip,
  AdaptiveTooltipContent,
  AdaptiveTooltipTrigger,
} from '@investbook-pages/common-ui';
import {
  useTranslation,
  getAccountsAllStats,
} from '@investbook-pages/products';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ACCOUNTS_LIMIT = 3;

function useAccountsAllStats() {
  return useQuery({
    queryKey: ['accountsAllStats'],
    queryFn: () => getAccountsAllStats({ throwOnError: true }),
    staleTime: Infinity,
  });
}

function formatCurrency(value: number | undefined): string | undefined {
  if (value === null || value === undefined) return undefined;

  return value.toLocaleString('ru-RU') + '\u00a0₽';
}

// ─── Stat building blocks ─────────────────────────────────────────────────────

function StatDivider() {
  return <div className="h-7 w-px shrink-0 bg-primary-foreground/20 mx-1" />;
}

interface StatLinkProps {
  label: string;
  value?: string | number;
}

function StatLink({ label, value }: StatLinkProps) {
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

function AccountsStat() {
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
          {visibleAccounts.join('\u00a0·\u00a0')}
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

// ─── Stats layouts ────────────────────────────────────────────────────────────

function StatsRow() {
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

function StatsMobileGrid() {
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

// ─── Header ───────────────────────────────────────────────────────────────────

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

  const menuItems = [
    {
      label: t('header.menu.updates'),
      icon: RefreshCw,
      href: 'https://github.com/spacious-team/investbook/releases/latest',
    },
    {
      label: t('header.menu.docs'),
      icon: ExternalLink,
      href: '/user-guide/index.html',
    },
    {
      label: t('header.menu.news'),
      icon: Newspaper,
      href: 'https://t.me/investbook_official',
    },
    {
      label: t('header.menu.help'),
      icon: HelpCircle,
      href: 'https://t.me/investbook_official',
    },
    {
      label: t('header.menu.bugreport'),
      icon: Bug,
      href: 'https://github.com/spacious-team/investbook/issues/new?labels=bug&template=bug_report.md',
    },
    {
      label: t('header.menu.feedback'),
      icon: Star,
      href: 'https://otzovik.com/reviews/investbook-prilozhenie_investora_i_treydera/',
    },
    {
      label: t('header.menu.contact'),
      icon: Mail,
      href: 'mailto:spacious-team@ya.ru',
    },
  ];

  const title = pageTitles[pathname] ?? '';

  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark'),
  );

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    setIsDark(dark);
  };

  const userMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-primary-foreground hover:bg-primary-foreground/10 dark:hover:bg-primary-foreground/10 active:bg-primary-foreground/20 dark:active:bg-primary-foreground/20"
        >
          <CircleUser className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        {menuItems.map(({ label, icon: Icon, href }) => (
          <DropdownMenuItem key={label} asChild>
            <a
              href={href}
              target={href.startsWith('/') ? '_self' : '_blank'}
              rel="noreferrer"
            >
              <Icon />
              {label}
            </a>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <SunMoon className="size-4" />
            {t('header.theme')}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={isDark ? 'dark' : 'light'}
              onValueChange={(v) => applyTheme(v === 'dark')}
            >
              <DropdownMenuRadioItem value="light">
                <Sun />
                {t('header.themeLight')}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark">
                <Moon />
                {t('header.themeDark')}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => console.log('logout')}>
          <LogOut />
          {t('header.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="w-full bg-primary text-primary-foreground px-6">
      {/* ── Row 1: title · [stats on lg] · user menu ── */}
      <div className="flex items-center gap-3 py-4">
        <SidebarTrigger className="md:hidden text-primary-foreground hover:bg-primary-foreground/10 active:bg-primary-foreground/20" />
        <h1 className="text-xl font-bold shrink-0">{title}</h1>

        {/* Right side: stats (lg only) + user menu */}
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-1">
            <StatsRow />
          </div>
          {userMenu}
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
