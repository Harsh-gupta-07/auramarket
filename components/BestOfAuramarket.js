import React from 'react';

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
      badge: 'Extra 20% off',
      badgeColor: 'text-teal-600',
      name: 'Nike Court Vision Low Next Nature',
      category: "Men's Shoes",
      colors: '4 Colour',
      price: '$98.30',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80'
    },
    {
      id: 3,
      badge: 'Extra 10% off',
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
      
      <div className="flex flex-row justify-between gap-8 w-full">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer flex-1 max-w-sm">
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
            
              <div className="w-100 h-70 flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full overflow-hidden object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-base pr-2">{product.name}</h3>
                <span className="font-semibold text-base whitespace-nowrap">{product.price}</span>
              </div>
              <p className="text-gray-500 text-sm">{product.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}