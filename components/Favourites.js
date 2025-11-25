import React from 'react'
import { FaTrash, FaHeart } from "react-icons/fa";

function Favourites() {
      const favorites = [
    {
      id: 1,
      name: "Nike Dunk Low Retro SE",
      category: "Men's Shoes",
      colors: "6 Colour",
      price: 98.30,
      tag: "Extra 20% off",
      tagColor: "badge-accent", // Adjust based on theme
      image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
      id: 2,
      name: "Nike Air Max 90 SE",
      category: "Men's Shoes",
      colors: "1 Colour",
      price: 98.30,
      tag: "Best Seller",
      tagColor: "badge-warning",
      image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
      id: 3,
      name: "Nike Legend Essential 3 Next Nature",
      category: "Men's Training Shoes",
      colors: "4 Colour",
      price: 98.30,
      tag: "Extra 10% off",
      tagColor: "badge-accent",
      image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item) => (
              <div key={item.id} className="card bg-white hover:shadow-lg transition-shadow duration-200 group">
                <figure className="relative bg-white aspect-square">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                  {item.tag && (
                    <div className={`absolute top-3 left-3 badge ${item.tagColor} border-none text-xs font-semibold py-3`}>
                      {item.tag}
                    </div>
                  )}
                  <button className="absolute top-3 right-3 btn btn-circle btn-sm btn-ghost bg-white/50 hover:bg-white text-black">
                    <FaHeart />
                  </button>
                </figure>
                <div className="card-body p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-sm mb-1">{item.name}</h3>
                      <p className="text-gray-500 text-xs mb-1">{item.category}</p>
                      <p className="text-gray-400 text-xs">{item.colors}</p>
                    </div>
                    <p className="font-bold text-sm">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
  )
}

export default Favourites