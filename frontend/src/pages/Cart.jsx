import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import EmptyState from '../components/EmptyState';

const Cart = () => {
  const { cart, subtotal, discount, shipping, total } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-20 min-h-[70vh] flex items-center justify-center">
        <EmptyState 
          title="Your cart is waiting for something awesome."
          description="Looks like you haven't added anything to your cart yet. Explore our products and find something you'll love."
          actionText="Start Shopping"
          actionLink="/products"
          icon={ShoppingBag}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items List */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl border border-border p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl font-bold mb-6 pb-4 border-b border-border">
              {cart.length} {cart.length === 1 ? 'Item' : 'Items'} in your cart
            </h2>
            <div className="flex flex-col">
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-secondary/30 rounded-2xl border border-border p-6 lg:p-8 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between items-center text-green-600">
                  <span>Discount (10% off &gt; $100)</span>
                  <span className="font-medium">-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
            </div>
            
            <div className="border-t border-border pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold">Total</span>
                <div className="text-right">
                  <span className="text-3xl font-bold">${total.toFixed(2)}</span>
                  <p className="text-xs text-muted-foreground mt-1">Including VAT</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </button>
              
              <Link 
                to="/products"
                className="w-full py-4 bg-white text-foreground font-semibold rounded-xl border border-border hover:bg-secondary transition-colors text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
