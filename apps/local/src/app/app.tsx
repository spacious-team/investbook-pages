import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import DemoPage from './pages/DemoPage/DemoPage';
import Navbar from 'widgets/Navbar/Navbar';
import Sidebar from 'widgets/Sidebar/Sidebar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'demo',
        element: <DemoPage />,
      },
    ],
  },
]);

function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex flex-col flex-1">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
