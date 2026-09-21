import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, CreditCard, Banknote, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import api from '../services/api';

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'card' // 'card', 'upi', 'cod'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (cart.length === 0 && !success) {
      navigate('/cart');
    }
  }, [cart, navigate, success]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(s => s + 1);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const orderItems = cart.map(item => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price
      }));

      const response = await api.post('/api/orders', { items: orderItems });
      
      clearCart();
      setOrderNumber(response.data.id);
      setSuccess(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading fullScreen message="Processing your order..." />;

  if (success) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-[70vh] flex items-center justify-center">
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-border text-center max-w-lg shadow-xl shadow-primary/5">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-foreground">Order Placed Successfully!</h2>
          <p className="text-muted-foreground mb-2">Thank you for your purchase, {formData.firstName}.</p>
          <p className="text-sm font-medium mb-8 bg-secondary py-2 px-4 rounded-lg inline-block">
            Order Number: <span className="text-primary">{orderNumber}</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/orders')}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors"
            >
              View Orders
            </button>
            <button 
              onClick={() => navigate('/products')}
              className="px-6 py-3 bg-white text-foreground font-semibold rounded-xl border border-border hover:bg-secondary transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {/* Steps Indicator */}
      <div className="flex items-center mb-10 max-w-2xl mx-auto">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>1</div>
        <div className={`flex-1 h-1 mx-2 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-secondary'}`}></div>
        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>2</div>
        <div className={`flex-1 h-1 mx-2 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-secondary'}`}></div>
        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>3</div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Form */}
        <div className="lg:w-2/3">
          
          {/* Step 1: Contact & Shipping */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="bg-white rounded-2xl border border-border p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="block text-sm font-medium mb-1.5">First Name</label>
                  <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-border bg-secondary focus:ring-2 focus:ring-primary/20 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Last Name</label>
                  <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-border bg-secondary focus:ring-2 focus:ring-primary/20 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-border bg-secondary focus:ring-2 focus:ring-primary/20 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Phone Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-border bg-secondary focus:ring-2 focus:ring-primary/20 focus:outline-none" />
                </div>
              </div>

              <h2 className="text-xl font-bold mb-6 pt-6 border-t border-border">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1.5">Street Address</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-border bg-secondary focus:ring-2 focus:ring-primary/20 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">City</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-border bg-secondary focus:ring-2 focus:ring-primary/20 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">ZIP Code</label>
                  <input required type="text" name="zip" value={formData.zip} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-border bg-secondary focus:ring-2 focus:ring-primary/20 focus:outline-none" />
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all">
                  Continue to Delivery <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Delivery Method */}
          {step === 2 && (
            <form onSubmit={handleNextStep} className="bg-white rounded-2xl border border-border p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6">Delivery Method</h2>
              
              <div className="space-y-4 mb-8">
                <label className="flex items-start gap-4 p-4 border-2 border-primary bg-primary/5 rounded-xl cursor-pointer">
                  <input type="radio" name="delivery" defaultChecked className="mt-1 w-4 h-4 text-primary focus:ring-primary" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-foreground">Standard Delivery</span>
                      <span className="font-bold text-foreground">Free</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Delivery in 3-5 business days</p>
                  </div>
                </label>
                
                <label className="flex items-start gap-4 p-4 border-2 border-border hover:border-primary/50 bg-white rounded-xl cursor-pointer transition-colors opacity-60">
                  <input type="radio" name="delivery" disabled className="mt-1 w-4 h-4 text-primary focus:ring-primary" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-foreground">Express Delivery</span>
                      <span className="font-bold text-foreground">$15.00</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Delivery in 1-2 business days (Currently unavailable)</p>
                  </div>
                </label>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-border">
                <button type="button" onClick={() => setStep(1)} className="px-6 py-4 text-muted-foreground hover:text-foreground font-medium transition-colors">
                  Back
                </button>
                <button type="submit" className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all">
                  Continue to Payment <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <form onSubmit={handlePlaceOrder} className="bg-white rounded-2xl border border-border p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6">Payment Method</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <label className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                  <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} className="sr-only" />
                  <CreditCard className={`w-8 h-8 mb-3 ${formData.paymentMethod === 'card' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`font-semibold ${formData.paymentMethod === 'card' ? 'text-primary' : 'text-foreground'}`}>Credit Card</span>
                </label>
                
                <label className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                  <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} className="sr-only" />
                  <Banknote className={`w-8 h-8 mb-3 ${formData.paymentMethod === 'cod' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`font-semibold ${formData.paymentMethod === 'cod' ? 'text-primary' : 'text-foreground'}`}>Cash on Delivery</span>
                </label>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="space-y-4 mb-8 animate-in slide-in-from-top-2">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Card Number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 rounded-xl border border-border bg-secondary focus:ring-2 focus:ring-primary/20 focus:outline-none font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" className="w-full p-3 rounded-xl border border-border bg-secondary focus:ring-2 focus:ring-primary/20 focus:outline-none font-mono" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">CVV</label>
                      <input type="text" placeholder="123" className="w-full p-3 rounded-xl border border-border bg-secondary focus:ring-2 focus:ring-primary/20 focus:outline-none font-mono" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Name on Card</label>
                    <input type="text" placeholder="JOHN DOE" className="w-full p-3 rounded-xl border border-border bg-secondary focus:ring-2 focus:ring-primary/20 focus:outline-none" />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 text-sm text-muted-foreground bg-green-50 text-green-700 p-4 rounded-xl mb-8">
                <ShieldCheck className="w-5 h-5" />
                <span>Your payment information is encrypted and secure. Mock checkout only.</span>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-border">
                <button type="button" onClick={() => setStep(2)} className="px-6 py-4 text-muted-foreground hover:text-foreground font-medium transition-colors">
                  Back
                </button>
                <button type="submit" className="px-8 py-4 bg-foreground text-background font-semibold rounded-xl flex items-center gap-2 hover:bg-foreground/90 transition-all shadow-lg">
                  Place Order
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Right: Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-secondary/30 rounded-2xl border border-border p-6 lg:p-8 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="max-h-60 overflow-y-auto mb-6 pr-2 divide-y divide-border">
              {cart.map(item => (
                <div key={item.id} className="py-3 flex items-center gap-3">
                  <div className="w-16 h-16 shrink-0 bg-secondary rounded-lg overflow-hidden border border-border">
                    <img src={item.imageUrl || item.image || "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=600"} alt={item.name} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=600"; }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-semibold text-sm">
                    ${(Number(item.price || 0) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 text-sm mb-6 pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${cart.reduce((t, i) => t + (Number(i.price || 0) * i.quantity), 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
            </div>
            
            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
