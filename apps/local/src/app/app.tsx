import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PortfolioPage from './pages/PortfolioPage/PortfolioPage';
import AnalyticsPage from './pages/AnalyticsPage/AnalyticsPage';
import TaxesPage from './pages/TaxesPage/TaxesPage';
import UploadPage from './pages/UploadPage/UploadPage';
import FormsPage from './pages/FormsPage/FormsPage';
import MainLayout from './layouts/MainLayout/MainLayout';

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
  return <RouterProvider router={router} />;
}

export default App;
