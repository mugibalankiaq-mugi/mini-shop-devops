import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, RefreshCw, HeadphonesIcon } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import api from '../services/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/products');
        setFeaturedProducts(response.data.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch featured products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative bg-secondary/50 pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-bl-full mix-blend-multiply filter blur-3xl opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-100/30 rounded-tr-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left mt-8 md:mt-0">
            <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
              New Collection
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              Shop Smarter. <br />
              <span className="text-primary">Live Better.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg mx-auto md:mx-0">
              Discover products you'll love, curated for your everyday life. Premium quality, accessible prices, and fast delivery.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Link 
                to="/products" 
                className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 w-full sm:w-auto text-center"
              >
                Shop Now
              </Link>
              <Link 
                to="/products" 
                className="px-8 py-4 bg-white text-foreground font-semibold rounded-xl hover:bg-secondary border border-border transition-all w-full sm:w-auto text-center"
              >
                Explore Products
              </Link>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] md:aspect-square lg:aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200" 
                alt="Happy shopper" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Shop by Category</h2>
              <p className="text-muted-foreground">Find exactly what you're looking for</p>
            </div>
            <Link to="/products" className="hidden sm:flex items-center gap-2 text-primary font-medium hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard 
              title="Electronics" 
              image="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=600"
              itemsCount={4}
            />
            <CategoryCard 
              title="Fashion" 
              image="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600"
              itemsCount={4}
            />
            <CategoryCard 
              title="Home & Living" 
              image="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600"
              itemsCount={4}
            />
            <CategoryCard 
              title="Accessories" 
              image="https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=600"
              itemsCount={4}
            />
          </div>
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Trending Now</h2>
              <p className="text-muted-foreground">Our most popular products this week</p>
            </div>
            <Link to="/products" className="hidden sm:flex items-center gap-2 text-primary font-medium hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Promotional Banner */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-foreground text-background">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1600" 
                alt="Sale Banner" 
                className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
              />
            </div>
            <div className="relative z-10 px-8 py-16 md:py-24 md:px-16 flex flex-col items-start max-w-2xl">
              <span className="bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                Weekend Sale
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Up to 40% off selected products</h2>
              <p className="text-lg text-white/80 mb-8">
                Don't miss out on our biggest sale of the season. Limited time offer on top-rated electronics and fashion.
              </p>
              <Link 
                to="/products" 
                className="px-8 py-4 bg-white text-foreground font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                Shop Deals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Divi Shopping? */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Divi Shopping?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We provide the best shopping experience for our customers with top-notch services.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground text-sm">Free shipping on orders over $50. Delivered in 2-3 business days.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
              <p className="text-muted-foreground text-sm">Multiple safe payment methods with end-to-end encryption.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
              <p className="text-muted-foreground text-sm">30-day hassle-free return policy if you're not completely satisfied.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <HeadphonesIcon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
              <p className="text-muted-foreground text-sm">Our dedicated support team is always here to help you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Newsletter */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Stay in the loop</h2>
          <p className="text-muted-foreground mb-10 text-lg">
            Subscribe to our newsletter to get updates on our latest offers, new arrivals and exciting promotions.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-6 py-4 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
            <button 
              type="submit"
              className="px-8 py-4 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default Home;
