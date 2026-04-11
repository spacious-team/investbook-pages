import {
  Bug,
  Check,
  ChevronLeft,
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
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const pageTitles: Record<string, string> = {
  '/': 'Портфель',
  '/portfolio': 'Портфель',
  '/analytics': 'Аналитика',
  '/taxes': 'Налоги',
  '/upload': 'Загрузить отчёты брокера',
  '/forms': 'Формы',
};

const menuItems = [
  {
    label: 'Обновления',
    icon: RefreshCw,
    href: 'https://github.com/spacious-team/investbook/releases/latest',
  },
  {
    label: 'Документация',
    icon: ExternalLink,
    href: '/user-guide/index.html',
  },
  {
    label: 'Новости',
    icon: Newspaper,
    href: 'https://t.me/investbook_official',
  },
  {
    label: 'Помощь',
    icon: HelpCircle,
    href: 'https://t.me/investbook_official',
  },
  {
    label: 'Багрепорт',
    icon: Bug,
    href: 'https://github.com/spacious-team/investbook/issues/new?labels=bug&template=bug_report.md',
  },
  {
    label: 'Оставить отзыв',
    icon: Star,
    href: 'https://otzovik.com/reviews/investbook-prilozhenie_investora_i_treydera/',
  },
  {
    label: 'Связаться',
    icon: Mail,
    href: 'mailto:spacious-team@ya.ru',
  },
] as const;

const itemClass =
  'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-left cursor-pointer outline-none transition-colors hover:bg-accent hover:text-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0';

const panelClass =
  'min-w-44 rounded-md border bg-popover p-1 text-popover-foreground shadow-md';

export default function Header() {
  const { pathname } = useLocation();
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

  return (
    <header className="w-full bg-primary text-primary-foreground py-4 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{title}</h1>

        {/* Hover menu — CSS-based to avoid flicker */}
        <div className="relative group/menu">
          <button className="flex items-center rounded-md p-1 hover:bg-primary-foreground/10 transition-colors cursor-pointer outline-none">
            <CircleUser className="size-6" />
          </button>

          {/* pt-1 creates a seamless bridge between button and panel */}
          <div className="absolute right-0 top-full pt-1 invisible opacity-0 group-hover/menu:visible group-hover/menu:opacity-100 transition-[opacity,visibility] duration-100 z-50">
            <div className={panelClass}>
              {menuItems.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('/') ? '_self' : '_blank'}
                  rel="noreferrer"
                  className={itemClass}
                >
                  <Icon />
                  {label}
                </a>
              ))}

              {/* Theme submenu */}
              <div className="relative group/theme">
                <button className={itemClass}>
                  <SunMoon />
                  Тема
                  <ChevronLeft className="ml-auto" />
                </button>

                {/* pl-1 bridges the gap to the submenu panel */}
                <div className="absolute right-full top-0 pr-1 z-50 invisible opacity-0 group-hover/theme:visible group-hover/theme:opacity-100 transition-[opacity,visibility] duration-100">
                  <div className={panelClass}>
                    <button
                      className={itemClass}
                      onClick={() => applyTheme(false)}
                    >
                      <Sun />
                      Светлая
                      {!isDark && <Check className="ml-auto" />}
                    </button>
                    <button
                      className={itemClass}
                      onClick={() => applyTheme(true)}
                    >
                      <Moon />
                      Темная
                      {isDark && <Check className="ml-auto" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="-mx-1 my-1 h-px bg-border" />
              <button
                className={itemClass}
                onClick={() => console.log('logout')}
              >
                <LogOut />
                Выход
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
