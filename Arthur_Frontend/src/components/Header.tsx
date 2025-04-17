import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/images/1.png"
            alt="Pesto's Logo"
            className="h-10 md:h-12 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
          {[
            { path: "/", label: "Home" },
            { path: "/menu", label: "Menu" },
            { path: "/about", label: "About" },
            { path: "/contact", label: "Contact" },
            { path: "/blog", label: "Blog"}
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`font-medium hover:text-[#f03327] transition-colors ${
                location.pathname === path ? "text-[#f03327]" : "text-[#3ab34c]"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-[#3ab34c]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-6 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {[
              { path: "/", label: "Home" },
              { path: "/menu", label: "Menu" },
              { path: "/about", label: "About" },
              { path: "/contact", label: "Contact" },
              { path: "/blog", label: "Blog"}
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`font-medium text-lg hover:text-[#f03327] transition-colors ${
                  location.pathname === path ? "text-[#f03327]" : "text-[#3ab34c]"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
