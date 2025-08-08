import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Users } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Accounts', href: '/accounts' },
    { name: 'About', href: '/about' },
    { name: 'Trading', href: '/trading' },
    { name: 'Platforms', href: '/platforms' },
    { name: 'Tools', href: '/tools' },
    { name: 'News & Education', href: '/education' },
  ];

  return (
    <nav className="bg-forex-dark/95 backdrop-blur-md border-b border-forex-cyan/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-forex-cyan rounded transform rotate-45"></div>
            <span className="text-xl font-bold text-white">
              MEGA FX<br />
              <span className="text-sm">MARKET</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`transition-colors ${
                  currentPage === item.name.toLowerCase().replace(' & ', '-').replace(' ', '-')
                    ? 'text-forex-cyan font-semibold'
                    : 'text-white hover:text-forex-cyan'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login" className="text-white hover:text-forex-cyan transition-colors">
              Sign In
            </Link>
            <Link to="/signup">
              <Button className="forex-btn-primary">Get Started</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-forex-cyan transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-forex-dark-100 rounded-lg mt-2 border border-forex-cyan/20">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    currentPage === item.name.toLowerCase().replace(' & ', '-').replace(' ', '-')
                      ? 'text-forex-cyan bg-forex-cyan/10'
                      : 'text-white hover:text-forex-cyan hover:bg-forex-cyan/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth Links */}
              <div className="border-t border-forex-cyan/20 pt-4 mt-4">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-forex-cyan hover:bg-forex-cyan/5 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <div className="px-3 py-2">
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="forex-btn-primary w-full">Get Started</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
