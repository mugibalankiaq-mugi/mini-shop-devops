import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ title, image, itemsCount }) => {
  return (
    <Link 
      to={`/products?category=${encodeURIComponent(title)}`}
      className="group relative h-64 md:h-80 rounded-2xl overflow-hidden flex items-end p-6 bg-secondary block"
    >
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      </div>
      
      <div className="relative z-10 w-full">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <div className="flex items-center justify-between text-white/90">
          <span className="text-sm font-medium">{itemsCount} Products</span>
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
