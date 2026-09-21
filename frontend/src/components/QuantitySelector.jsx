import React from 'react';
import { Minus, Plus } from 'lucide-react';

const QuantitySelector = ({ quantity, onIncrease, onDecrease, max = 10 }) => {
  return (
    <div className="flex items-center w-fit border border-border rounded-lg bg-white">
      <button 
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:hover:text-muted-foreground transition-colors"
      >
        <Minus className="w-4 h-4" />
      </button>
      
      <div className="w-12 h-10 flex items-center justify-center font-medium text-foreground border-x border-border">
        {quantity}
      </div>
      
      <button 
        onClick={onIncrease}
        disabled={quantity >= max}
        className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:hover:text-muted-foreground transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default QuantitySelector;
