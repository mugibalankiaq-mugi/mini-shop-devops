import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import QuantitySelector from './QuantitySelector';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 py-6 border-b border-border">
      <Link to={`/products/${item.id}`} className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-secondary rounded-xl overflow-hidden block">
        <img 
          src={item.imageUrl || item.image || "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=600"} 
          alt={item.name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=600";
          }}
        />
      </Link>
      
      <div className="flex-grow flex flex-col w-full">
        <div className="flex justify-between items-start gap-4 mb-2">
          <div>
            <Link to={`/products/${item.id}`} className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2">
              {item.name}
            </Link>
            <p className="text-sm text-muted-foreground mt-1">{item.category}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-bold text-lg">${(Number(item.price || 0) * item.quantity).toFixed(2)}</p>
            {item.quantity > 1 && (
              <p className="text-xs text-muted-foreground mt-1">${Number(item.price || 0).toFixed(2)} each</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4">
          <QuantitySelector 
            quantity={item.quantity} 
            onIncrease={() => increaseQuantity(item.id)}
            onDecrease={() => decreaseQuantity(item.id)}
            max={item.stock}
          />
          
          <button 
            onClick={() => removeFromCart(item.id)}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-destructive transition-colors p-2"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
