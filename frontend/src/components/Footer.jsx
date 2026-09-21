import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Share2, Link as LinkIcon, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-primary p-2 rounded-lg group-hover:bg-primary/90 transition-colors">
                <ShoppingBag className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">Divi Shopping</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Discover products you'll love, curated for your everyday life. Premium quality, accessible prices.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Share2 className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><LinkIcon className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">Products</Link></li>
              <li><Link to="/products?category=Electronics" className="text-sm text-muted-foreground hover:text-primary transition-colors">Electronics</Link></li>
              <li><Link to="/products?category=Fashion" className="text-sm text-muted-foreground hover:text-primary transition-colors">Fashion</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Customer Service</h4>
            <ul className="space-y-2.5">
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Returns & Refunds</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shipping Info</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Us</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>123 Commerce Avenue</li>
              <li>Tech District, CA 90210</li>
              <li className="pt-2">support@divishopping.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Divi Shopping. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
