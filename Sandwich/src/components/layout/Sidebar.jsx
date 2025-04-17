import { useLocation, Link,useNavigate } from 'react-router-dom';
import { Home, User, PlusCircle, List, LogOut, X } from 'lucide-react';
import { useAuth } from '../../context/AuthProvider';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    // { path: '/', name: 'Home', icon: Home },
    { path: '/', name: 'Profile', icon: User },
    { path: '/create-category', name: 'Create Category', icon: PlusCircle },
    { path: '/all-category', name: 'All Category', icon: List },
    { path: '/create-menu', name: 'Create Sub Category', icon: PlusCircle },
    { path: '/all-menu', name: 'All Sub Category', icon: List },
    { path: '/popular/create', name: 'Create Popular Choice', icon: PlusCircle },
    { path: '/popular', name: 'All Popular Choices', icon: List },
    { path: '/blogs/create', name: 'Create Blog', icon: PlusCircle },
    { path: '/blogs', name: 'All Blogs', icon: List },
    { path: '/offers/create', name: 'Create Offer', icon: PlusCircle },
    { path: '/offers', name: 'All Offers', icon: List },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 text-white bg-[#6b2400] transition-transform duration-300 ease-in-out transform shadow-lg border-r border-gray-200 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`} // Updated for mobile toggle
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="font-semibold text-lg text-white cursor-pointer" onClick={()=>navigate('/')}>Dashboard</h2>
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100 md:hidden"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded transition-colors ${
                  location.pathname === item.path
                    ? 'bg-[#fffbf2] text-black'
                    : 'text-white hover:bg-[#fffbf2] hover:text-black'
                }`}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    onClose(); // Close sidebar on mobile after click
                  }
                }}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded transition-colors text-whitehover:bg-red-50 hover:text-red-600 hover:bg-[#fffbf2]"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
