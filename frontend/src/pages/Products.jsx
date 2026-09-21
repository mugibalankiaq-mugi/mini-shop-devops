import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Filter, X, Search as SearchIcon } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import api from '../services/api';
import { cn } from '../utils/utils';

const CATEGORIES = ["All", "Electronics", "Fashion", "Home & Living", "Accessories"];
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest Arrivals' }
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // URL Params
  const categoryParam = searchParams.get('category') || 'All';
  const searchParam = searchParams.get('search') || '';
  
  // State
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [category, setCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState(200000);

  // Sync params to state
  useEffect(() => {
    window.scrollTo(0, 0);
    setCategory(searchParams.get('category') || 'All');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let url = '/api/products';
        const params = new URLSearchParams();
        if (searchParam) {
          params.append('search', searchParam);
        }
        if (categoryParam !== 'All') {
          params.append('category', categoryParam);
        }
        
        if (params.toString()) {
          url += '?' + params.toString();
        }

        const response = await api.get(url);
        setProducts(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [categoryParam, searchParam]);

  // Update URL params
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    const newParams = new URLSearchParams(searchParams);
    if (newCategory === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', newCategory);
    }
    setSearchParams(newParams);
    setIsFilterOpen(false); // Close mobile filters on selection
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery.trim() === '') {
      newParams.delete('search');
    } else {
      newParams.set('search', searchQuery);
    }
    setSearchParams(newParams);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    setSearchParams(newParams);
  };

  // Filter and sort products (Client-side for price and sort since API doesn't support it yet)
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Price
    result = result.filter(p => Number(p.price || 0) <= priceRange);

    // Sort
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
        break;
      case 'price_desc':
        result.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
        break;
      case 'newest':
        // Assuming newer createdAt
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'featured':
      default:
        break;
    }

    return result;
  }, [products, priceRange, sortBy]);


  const FilterSidebar = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Categories</h3>
        <ul className="space-y-2">
          {CATEGORIES.map(cat => (
            <li key={cat}>
              <button
                onClick={() => handleCategoryChange(cat)}
                className={cn(
                  "text-sm hover:text-primary transition-colors text-left w-full flex items-center justify-between",
                  category === cat ? "text-primary font-medium" : "text-muted-foreground"
                )}
              >
                <span>{cat}</span>
                {category === cat && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-foreground mb-4 flex justify-between items-center">
          <span>Max Price</span>
          <span className="text-sm font-normal text-muted-foreground">${priceRange}</span>
        </h3>
        <input 
          type="range" 
          min="0" 
          max="200000" 
          step="500"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>$0</span>
          <span>$200000+</span>
        </div>
      </div>

      <button 
        onClick={() => {
          setCategory('All');
          setSearchQuery('');
          setPriceRange(200000);
          setSearchParams(new URLSearchParams());
        }}
        className="w-full py-2 bg-secondary text-foreground text-sm font-medium rounded-lg hover:bg-secondary/80 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );


  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row gap-8">
      
      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold">Products</h1>
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg font-medium text-sm"
        >
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* Sidebar (Desktop) */}
      <aside className="hidden md:block w-64 shrink-0">
        <FilterSidebar />
      </aside>

      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden animate-in slide-in-from-bottom flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-xl font-bold">Filters</h2>
            <button onClick={() => setIsFilterOpen(false)} className="p-2 text-muted-foreground">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4 flex-grow overflow-y-auto">
            <FilterSidebar />
          </div>
          <div className="p-4 border-t border-border">
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          
          <div className="w-full sm:w-auto hidden md:block">
            <h1 className="text-2xl font-bold">
              {category !== 'All' ? category : 'All Products'}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Showing {filteredProducts.length} results
            </p>
          </div>

          <div className="flex w-full sm:w-auto items-center gap-4">
            {/* Search within page */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <SearchIcon className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={handleClearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Sort */}
            <div className="shrink-0 relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 bg-white border border-border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Active Search Term Indicator */}
        {searchParam && (
          <div className="mb-6 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Search results for:</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-full">
              "{searchParam}"
              <button onClick={handleClearSearch} className="hover:text-destructive"><X className="w-3.5 h-3.5" /></button>
            </span>
          </div>
        )}

        {error ? (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
        ) : isLoading ? (
          <div className="flex justify-center py-20">Loading...</div>
        ) : (
          <ProductGrid 
            products={filteredProducts} 
            emptyTitle="No products found"
            emptyDescription="Try adjusting your filters or search criteria."
          />
        )}

      </div>
    </div>
  );
};

export default Products;
