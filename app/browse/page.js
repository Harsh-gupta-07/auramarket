import FilterSidebar from '@/components/FilterSidebar'
import ProductCard from '@/components/ProductCard'
import React from 'react'

function page() {
  const products = [
    {
      id: 1,
      badge: 'Best Seller',
      badgeColor: 'badge-error',
      name: "Nike Air Force 1 Mid '07",
      category: "Men's Shoes",
      colors: '6 Colour',
      price: '$98.30',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80'
    },
    {
      id: 2,
      badge: 'Extra 20% off',
      badgeColor: 'badge-success',
      name: "Nike Court Vision Low Next Nature",
      category: "Men's Shoes",
      colors: '4 Colour',
      price: '$98.30',
      image: 'https://images.unsplash.com/photo-1606813902913-0d3bdb97f31f?w=600&q=80'
    },
    {
      id: 3,
      badge: 'Sustainable Materials',
      badgeColor: 'badge-accent',
      name: "Nike Air Force 1 PLATFORM",
      category: "Men's Shoes",
      colors: '1 Colour',
      price: '$98.30',
      image: 'https://images.unsplash.com/photo-1589187155478-0e553dd09f79?w=600&q=80'
    }
  ]

  return (
    <div className="min-h-screen bg-white px-8 py-10 flex flex-col lg:flex-row gap-10">
      <main className='flec flex-row'>
        <FilterSidebar />

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default page