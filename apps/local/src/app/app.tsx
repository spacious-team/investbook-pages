import { AppLoader, Toaster } from '@investbook-pages/common-ui';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useActuatorHealth } from './hooks/queries/useActuatorHealth';
import { useAccountsAllStats } from './hooks/queries/useAccountsAllStats';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { AnalyticsPage } from './pages/AnalyticsPage/AnalyticsPage';
import { AppOfflinePage } from './pages/AppOfflinePage/AppOfflinePage';
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
  const {
    isPending: isHealthPending,
    isError: isHealthError,
    refetch,
  } = useActuatorHealth();
  const { isPending: isStatsPending } = useAccountsAllStats({
    enabled: !isHealthPending && !isHealthError,
  });

  if (isHealthPending) {
    return <AppLoader />;
  }

  if (isHealthError) {
    return <AppOfflinePage onRetry={refetch} />;
  }

  return (
    <>
      <RouterProvider router={router} />
      {isStatsPending && <AppLoader />}
      <Toaster position="bottom-left" />
    </>
  );
}
