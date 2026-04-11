import {
  Logo,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@investbook-pages/common-ui';
import { useTranslation } from '@investbook-pages/products';
import {
  BarChart3,
  BriefcaseBusiness,
  FileText,
  Receipt,
  Upload,
} from 'lucide-react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Header from 'widgets/Header/Header';

export default function MainLayout() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const navItems = [
    { to: '/portfolio', label: t('nav.portfolio'), icon: BriefcaseBusiness },
    { to: '/analytics', label: t('nav.analytics'), icon: BarChart3 },
    { to: '/taxes', label: t('nav.taxes'), icon: Receipt },
    { to: '/upload', label: t('nav.upload'), icon: Upload },
    { to: '/forms', label: t('nav.forms'), icon: FileText },
  ];

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <NavLink
            to="/"
            className="flex items-center gap-2 px-2 py-1 text-sidebar-foreground hover:opacity-80 transition-opacity"
          >
            <Logo size={28} className="shrink-0" />
            <span className="font-semibold text-sm truncate group-data-[state=collapsed]:hidden">
              Investbook
            </span>
          </NavLink>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map(({ to, label, icon: Icon }) => (
                  <SidebarMenuItem key={to}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === to}
                      tooltip={label}
                    >
                      <NavLink to={to}>
                        <Icon />
                        <span>{label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarTrigger />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
