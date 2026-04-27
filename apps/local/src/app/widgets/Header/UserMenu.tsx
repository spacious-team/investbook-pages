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
} from '@investbook-pages/common-ui';
import { useTranslation } from '@investbook-pages/products';
import { useState } from 'react';

export function UserMenu() {
  const { t } = useTranslation();

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

  return (
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
}
