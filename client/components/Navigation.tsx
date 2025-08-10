import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, BarChart3, Wallet, TrendingUp, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Trading", href: "/trading", icon: TrendingUp },
    { name: "Portfolio", href: "/portfolio", icon: Wallet },
    { name: "Staking", href: "/staking", icon: TrendingUp },
    { name: "Learn", href: "/education", icon: BarChart3 },
    { name: "News", href: "/news", icon: BarChart3 },
  ];

  return (
    <nav className="bg-crypto-dark/95 backdrop-blur-md border-b border-crypto-gold/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-crypto-gold rounded transform rotate-45"></div>
            <span className="text-xl font-bold text-white">
              CRYPTO
              <br />
              <span className="text-sm">FUTURE</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 transition-colors ${
                    currentPage === item.name.toLowerCase()
                      ? "text-crypto-gold font-semibold"
                      : "text-white hover:text-crypto-gold"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center space-x-2 text-white">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Welcome, {user.firstName}</span>
                </div>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="border-crypto-red/20 text-crypto-red hover:bg-crypto-red/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-crypto-gold transition-colors"
                >
                  Sign In
                </Link>
                <Link to="/signup">
                  <Button className="crypto-btn-primary">
                    <Wallet className="w-4 h-4 mr-2" />
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-crypto-gold transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 crypto-glassmorphism rounded-lg mt-2 border border-crypto-gold/20">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      currentPage === item.name.toLowerCase()
                        ? "text-crypto-gold bg-crypto-gold/10"
                        : "text-white hover:text-crypto-gold hover:bg-crypto-gold/5"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              <div className="border-t border-crypto-gold/20 pt-4 mt-4">
                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center space-x-2 px-3 py-2 text-white">
                      <User className="w-4 h-4" />
                      <span className="text-sm">Welcome, {user.firstName}</span>
                    </div>
                    <div className="px-3 py-2">
                      <Button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        variant="outline"
                        className="border-crypto-red/20 text-crypto-red hover:bg-crypto-red/10 w-full"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-crypto-gold hover:bg-crypto-gold/5 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <div className="px-3 py-2">
                      <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                        <Button className="crypto-btn-primary w-full">
                          <Wallet className="w-4 h-4 mr-2" />
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
