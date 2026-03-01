import { Outlet } from 'react-router-dom';
import Navbar from 'widgets/Navbar/Navbar';
import Sidebar from 'widgets/Sidebar/Sidebar';

export default function MainLayout() {
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