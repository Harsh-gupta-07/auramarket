import React from 'react';
import ProductCard from './ProductCard';

export default function BestOfAuramarket() {
  const products = [
    {
      id: 1,
      badge: 'Best Seller',
      badgeColor: 'text-red-600',
      name: "Nike Air Force 1 Mid '07",
      category: "Men's Shoes",
      colors: '6 Colour',
      price: '$98.30',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80'
    },
    {
      id: 2,
      badge: 'Best Seller',
      badgeColor: 'text-teal-600',
      name: 'Nike Court Vision Low Next Nature',
      category: "Men's Shoes",
      colors: '4 Colour',
      price: '$98.30',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80'
    },
    {
      id: 3,
      badge: 'Best Seller',
      badgeColor: 'text-teal-600',
      name: 'Nike Dunk Low Retro',
      category: "Men's Shoes",
      colors: '6 Colour',
      price: '$98.30',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80'
    }
  ];

  return (
    <div className="py-8 px-16 flex flex-col justify-between items-start bg-white">
      <h1 className="text-3xl font-semibold mb-8 text-left">Best of AuraMarket</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}