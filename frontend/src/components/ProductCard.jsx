import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    addToast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      type: "success"
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToast({
      title: "Added to Wishlist",
      description: `${product.name} has been saved for later.`,
      type: "info"
    });
  };

  return (
    <Link 
      to={`/products/${product.id}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img 
          src={product.imageUrl || product.image || "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=600"} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=600";
          }}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.discount > 0 && (
            <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-md shadow-sm">
              -{product.discount}%
            </span>
          )}
          {product.id > 12 && (
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-md shadow-sm">
              NEW
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-muted-foreground hover:text-destructive hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Quick Add Button (Desktop) */}
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-11/12 bg-white/90 backdrop-blur-sm text-foreground font-medium py-2.5 rounded-xl shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center gap-2 hidden md:flex"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <span className="text-xs font-medium text-primary mb-2 tracking-wider uppercase">
          {product.category}
        </span>
        <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1.5 mb-4">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">
                ${Number(product.price || 0).toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${Number(product.originalPrice || 0).toFixed(2)}
                </span>
              )}
            </div>
          </div>
          
          {/* Mobile Add to Cart */}
          <button 
            onClick={handleAddToCart}
            className="md:hidden p-2.5 bg-primary text-primary-foreground rounded-xl shadow-sm hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
