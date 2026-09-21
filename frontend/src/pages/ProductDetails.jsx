import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';
import QuantitySelector from '../components/QuantitySelector';
import Loading from '../components/Loading';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Loading fullScreen />;
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button onClick={() => navigate('/products')} className="text-primary hover:underline">
          Back to products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast({
      title: "Added to Cart",
      description: `${quantity}x ${product.name} added to your cart.`,
      type: "success"
    });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
      
      {/* Breadcrumb / Back */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 w-fit"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Left: Image */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-secondary border border-border">
            <img 
              src={product.imageUrl || product.image || "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=600"} 
              alt={product.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=600";
              }}
            />
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1.5 rounded-lg shadow-sm">
                -{product.discount}% OFF
              </span>
            )}
          </div>
          {/* Thumbnails placeholder */}
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <button key={i} className={`aspect-square rounded-xl overflow-hidden border-2 ${i === 1 ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'} transition-all`}>
                <img src={product.imageUrl || product.image || "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=600"} alt="Thumbnail" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&q=80&w=600"; }} />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-wider text-primary uppercase mb-2">
            {product.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`} />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground underline cursor-pointer">{product.reviewCount} Reviews</span>
          </div>

          <div className="flex items-end gap-3 mb-8">
            <span className="text-4xl font-bold text-foreground">
              ${Number(product.price || 0).toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through mb-1">
                ${Number(product.originalPrice || 0).toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-6 mb-10">
            <div>
              <p className="font-medium text-foreground mb-3 flex items-center justify-between">
                <span>Quantity</span>
                <span className="text-sm text-muted-foreground font-normal">
                  {product.stock > 0 ? `${product.stock} items available` : 'Out of stock'}
                </span>
              </p>
              <QuantitySelector 
                quantity={quantity} 
                onIncrease={() => setQuantity(q => q + 1)} 
                onDecrease={() => setQuantity(q => q - 1)} 
                max={product.stock}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 py-4 flex items-center justify-center gap-2 bg-secondary text-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-colors disabled:opacity-50"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 disabled:opacity-50"
              >
                Buy Now
              </button>
              <button 
                className="w-14 h-14 shrink-0 flex items-center justify-center border border-border rounded-xl text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors"
                onClick={() => addToast({title: "Wishlist", description: "Added to wishlist.", type: "info"})}
              >
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="border-t border-border pt-8 space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Truck className="w-5 h-5 text-primary" />
              <span>Free worldwide shipping on all orders over $50</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span>100% Secure payment with 30-day money back guarantee</span>
            </div>
          </div>

        </div>
      </div>

      {/* Product Specifications */}
      <div className="mt-20">
        <h3 className="text-2xl font-bold mb-6">Specifications</h3>
        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          <ul className="divide-y divide-border">
            {product.specifications?.map((spec, index) => {
              const [key, value] = spec.split(':');
              return (
                <li key={index} className="flex p-4 hover:bg-secondary/30 transition-colors">
                  <span className="w-1/3 md:w-1/4 font-medium text-foreground">{key}</span>
                  <span className="w-2/3 md:w-3/4 text-muted-foreground">{value}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
