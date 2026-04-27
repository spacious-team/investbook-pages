import { AppLoader } from '@investbook-pages/common-ui';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useAccountsAllStats } from './hooks/queries/useAccountsAllStats';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { AnalyticsPage } from './pages/AnalyticsPage/AnalyticsPage';
import { FormsPage } from './pages/FormsPage/FormsPage';
import { PortfolioPage } from './pages/PortfolioPage/PortfolioPage';
import { TaxesPage } from './pages/TaxesPage/TaxesPage';
import { UploadPage } from './pages/UploadPage/UploadPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <PortfolioPage />,
      },
      {
        path: 'portfolio',
        element: <PortfolioPage />,
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />,
      },
      {
        path: 'taxes',
        element: <TaxesPage />,
      },
      {
        path: 'upload',
        element: <UploadPage />,
      },
      {
        path: 'forms',
        element: <FormsPage />,
      },
    ],
  },
]);

export function App() {
  const { isPending } = useAccountsAllStats();

  return (
    <>
      <RouterProvider router={router} />
      {isPending && <AppLoader />}
    </>
  );
}
