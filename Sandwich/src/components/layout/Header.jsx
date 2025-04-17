import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Home, LogOut } from "lucide-react";
import { useAuth } from "./../../context/AuthProvider";

const Header = ({ toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ useNavigate hook
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { handleLogout } = useAuth();

  const handleMobileLogout = () => {
    setShowMobileMenu(false);
    handleLogout(() => navigate("/login")); // ✅ Pass function instead of string
  };

  const handleDesktopLogout = () => {
    handleLogout(() => navigate("/login")); // ✅ Consistent logout handling
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo-placeholder.svg"
            alt="Arthur Sandwich House"
            className="h-10 w-auto"
          />
          <span className="font-poppins text-xl font-bold text-gray-900 hidden sm:inline-block">
            Arthur Sandwich House
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-4">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
                location.pathname === "/"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              to="/menu"
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
                location.pathname === "/menu"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Menu size={18} />
              <span>Menu</span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="ml-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-800 hover:bg-gray-100 transition"
            >
              Dashboard
            </button>

            {/* Desktop Logout */}
            <button
              onClick={handleDesktopLogout}
              className="flex items-center gap-2 text-sm text-gray-800 hover:text-red-600 transition"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline-block">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-200 py-3 px-4 animate-fade-in">
          <nav className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setShowMobileMenu(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              to="/menu"
              onClick={() => setShowMobileMenu(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
            >
              <Menu size={18} />
              <span>Menu</span>
            </Link>
            <button
              onClick={() => {
                setShowMobileMenu(false);
                toggleSidebar();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 text-left"
            >
              Dashboard
            </button>
            <button
              onClick={handleMobileLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 text-left"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
