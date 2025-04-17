import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';  

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on window resize (if mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true); 
      } else {
        setSidebarOpen(false);  
      }
    };

    // Set initial state based on window size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">

<div className="sticky top-0 z-50 bg-white shadow-sm md:hidden">
  <button
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className="p-4"
  >
    <span className="text-xl">☰</span>
  </button>
</div>



      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Component */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main
          className={`flex-1 transition-all duration-300 overflow-auto p-4 md:p-6 ${
            sidebarOpen ? 'md:ml-64' : ''
          }`}
        >
          <div className="mx-auto max-w-5xl animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
