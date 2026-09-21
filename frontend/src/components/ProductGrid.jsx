import React from 'react';
import ProductCard from './ProductCard';
import EmptyState from './EmptyState';

const ProductGrid = ({ products, emptyTitle, emptyDescription }) => {
  if (!products || products.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} actionText={null} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
