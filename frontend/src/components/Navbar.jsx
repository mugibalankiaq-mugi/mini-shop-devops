import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, LogOut, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { cn } from '../utils/utils';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-border transition-all">
      <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg group-hover:bg-primary/90 transition-colors">
            <ShoppingBag className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground hidden sm:block">Divi Shopping</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Products</Link>
          <Link to="/products?category=Electronics" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Categories</Link>
          {user && <Link to="/orders" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Orders</Link>}
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <form onSubmit={handleSearch} className="w-full relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-secondary rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          
          <Link to="/cart" className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
          <div className="relative hidden md:block">
            {user ? (
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-secondary transition-colors focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </button>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-2">
                <User className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
            )}

            {isProfileDropdownOpen && user && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border py-2 py-1 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-secondary transition-colors" onClick={() => setIsProfileDropdownOpen(false)}>Profile</Link>
                <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-secondary transition-colors" onClick={() => setIsProfileDropdownOpen(false)}>Orders</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-red-50 transition-colors flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-border shadow-lg animate-in slide-in-from-top-2">
          <div className="p-4 space-y-4">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
            </form>
            
            <div className="flex flex-col space-y-2">
              <Link to="/" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-secondary" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/products" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-secondary" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
              <Link to="/products?category=Electronics" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-secondary" onClick={() => setIsMobileMenuOpen(false)}>Categories</Link>
            </div>

            <div className="pt-4 border-t border-border">
              {user ? (
                <div className="space-y-2">
                  <div className="px-4 py-2 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-secondary rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-secondary rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Orders</Link>
                  <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-red-50 rounded-lg flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="w-4 h-4" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
