import React from 'react';
import { Link } from 'react-router-dom';
import { PackageOpen } from 'lucide-react';

const EmptyState = ({ 
  title = "No items found", 
  description = "We couldn't find what you're looking for.",
  actionText = "Go Home",
  actionLink = "/",
  icon: Icon = PackageOpen
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-8">
        {description}
      </p>
      {actionLink && actionText && (
        <Link 
          to={actionLink}
          className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
