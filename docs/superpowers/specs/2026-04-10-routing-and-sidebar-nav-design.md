# Routing & Sidebar Navigation — Design Spec

**Date:** 2026-04-10
**Branch:** 11-add-routing

## Goal

Add five new stub pages with routes and wire up sidebar navigation with icons in the main layout.

## New Pages (Stubs)

Each page is a minimal functional component matching the `DemoPage` pattern: a `Banner` with the page title, no extra logic.

| Page             | Route        | Component file                          | Banner text                |
| ---------------- | ------------ | --------------------------------------- | -------------------------- |
| Портфель         | `/portfolio` | `pages/PortfolioPage/PortfolioPage.tsx` | `Портфель`                 |
| Аналитика        | `/analytics` | `pages/AnalyticsPage/AnalyticsPage.tsx` | `Аналитика`                |
| Налоги           | `/taxes`     | `pages/TaxesPage/TaxesPage.tsx`         | `Налоги`                   |
| Загрузить отчёты | `/upload`    | `pages/UploadPage/UploadPage.tsx`       | `Загрузить отчёты брокера` |
| Формы            | `/forms`     | `pages/FormsPage/FormsPage.tsx`         | `Формы`                    |

## Routing (`app.tsx`)

All five routes are added as `children` of the existing `/` route (inside `MainLayout`), alongside the existing `index` and `demo` routes.

```tsx
{ path: 'portfolio', element: <PortfolioPage /> },
{ path: 'analytics', element: <AnalyticsPage /> },
{ path: 'taxes',     element: <TaxesPage /> },
{ path: 'upload',    element: <UploadPage /> },
{ path: 'forms',     element: <FormsPage /> },
```

## Sidebar Navigation (`MainLayout.tsx`)

`SidebarContent` receives a navigation list using shadcn sidebar primitives already available in `@investbook-pages/common-ui`:

```
SidebarContent
  SidebarGroup
    SidebarGroupContent
      SidebarMenu
        SidebarMenuItem (×5)
          SidebarMenuButton asChild
            NavLink (react-router-dom)
              <Icon /> + <span>Label</span>
```

`NavLink` provides `isActive` boolean; it is passed to `SidebarMenuButton` via the `data-active` prop for shadcn's built-in active styling.

Icons from `lucide-react` (already a transitive dependency via shadcn):

| Nav item         | Icon                |
| ---------------- | ------------------- |
| Портфель         | `BriefcaseBusiness` |
| Аналитика        | `BarChart3`         |
| Налоги           | `Receipt`           |
| Загрузить отчёты | `Upload`            |
| Формы            | `FileText`          |

Nav items are defined as a static array inside `MainLayout.tsx` — no separate file needed at this scope.

## Out of Scope

- No authentication or guards on routes
- No real content inside stub pages
- No mobile-specific behaviour (desktop-only app)
- `DemoPage` and `MainPage` routes remain unchanged
