
import { useState } from 'react';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} overflow-hidden bg-gray-100 flex flex-col h-full`}>
      <div className="h-15 bg-gray-300 flex items-center justify-center">
      </div>
      
      <button onClick={() => setCollapsed(!collapsed)} className="mt-auto p-4 w-full text-left hover:bg-gray-200 flex items-center gap-2">
        <span className="text-lg">{collapsed ? '»' : '«'}</span>
        {!collapsed && <span>Collapse</span>}
      </button>
    </div>
  )
}