import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, Clock, Truck, CheckCircle2, XCircle, Search } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import api from '../services/api';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.items.some(item => item.productName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmed': return <CheckCircle2 className="w-4 h-4" />;
      case 'Processing': return <Clock className="w-4 h-4" />;
      case 'Shipped': return <Truck className="w-4 h-4" />;
      case 'Delivered': return <Package className="w-4 h-4" />;
      case 'Cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Processing': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Shipped': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Delivered': return 'bg-green-50 text-green-700 border-green-200';
      case 'Cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-20 min-h-[70vh] flex items-center justify-center">
        <EmptyState 
          title="No orders found"
          description="You haven't placed any orders yet."
          actionText="Start Shopping"
          actionLink="/products"
          icon={Package}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Order History</h1>
        
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-secondary/30 rounded-2xl border border-border">
            <p className="text-muted-foreground">No orders match your search.</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl border border-border overflow-hidden">
              {/* Order Header */}
              <div className="bg-secondary/30 p-4 sm:p-6 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                  <div>
                    <p className="text-muted-foreground font-medium mb-1">Order Placed</p>
                    <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium mb-1">Total Amount</p>
                    <p className="font-semibold">${Number(order.totalAmount).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium mb-1">Order Number</p>
                    <p className="font-semibold">{order.id}</p>
                  </div>
                </div>
                
                <div className="shrink-0 flex items-center gap-4">
                  <span className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)} {order.status}
                  </span>
                  <button className="text-sm font-medium text-primary hover:underline bg-white px-3 py-1.5 rounded-lg border border-border shadow-sm">
                    View Invoice
                  </button>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 sm:p-6 space-y-6">
                {order.items.map((item, index) => (
                  <div key={`${order.id}-${item.id}-${index}`} className="flex gap-4 sm:gap-6">
                    <Link to={`/products/${item.productId}`} className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-secondary rounded-lg overflow-hidden border border-border flex items-center justify-center">
                      <Package className="w-10 h-10 text-muted-foreground opacity-50" />
                    </Link>
                    <div className="flex-1 flex flex-col justify-center">
                      <Link to={`/products/${item.productId}`} className="font-semibold text-base sm:text-lg hover:text-primary transition-colors line-clamp-2">
                        {item.productName}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">Qty: {item.quantity}</p>
                      <p className="font-medium mt-2">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className="hidden sm:flex flex-col justify-center shrink-0 w-32 space-y-2">
                      <button className="w-full py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
                        Buy Again
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Mobile Buy Again */}
              <div className="p-4 bg-secondary/10 border-t border-border sm:hidden">
                <button className="w-full py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
                  Buy All Again
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
