import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-20 px-4 text-center">
      <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6">
        <ShieldAlert className="w-12 h-12 text-muted-foreground" />
      </div>
      <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
      <h3 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h3>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/"
        className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
