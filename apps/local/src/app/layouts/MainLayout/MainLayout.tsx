import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider } from '@investbook-pages/common-ui';
import { Outlet } from 'react-router-dom';
import Navbar from 'widgets/Navbar/Navbar';

export default function MainLayout() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent />
        <SidebarFooter />
      </Sidebar>
      
      <div className="flex flex-col flex-1">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}