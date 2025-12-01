import React from 'react'
import { FaTrash, FaHeart } from "react-icons/fa";

function Favourites({ favorites }) {
  // console.log(favorites);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {(!favorites || favorites.length === 0) ? (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FaHeart className="text-3xl text-gray-400" />
          </div>
          <h3 className="text-lg font-bold mb-2">No Favourites Yet</h3>
          <p className="text-gray-500 mb-6 max-w-xs">
            Save items you love to your favourites to revisit them later.
          </p>
          <a href="/browse" className="btn btn-primary">
            Start Shopping
          </a>
        </div>
      ) : (
        favorites.map((item) => (
          <div key={item.id} className="card card-compact bg-white hover:shadow-lg transition-shadow duration-200 group overflow-hidden border border-gray-100">
            <figure className="relative bg-white aspect-square overflow-hidden">
              <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover mix-blend-multiply hover:scale-105 transition-transform duration-300" />
              {item.tag && (
                <div className={`absolute top-2 left-2 badge ${item.tagColor} border-none text-xs font-semibold py-2`}>
                  {item.tag}
                </div>
              )}
              <button className="absolute top-2 right-2 btn btn-circle btn-xs btn-ghost bg-white/50 hover:bg-white text-black">
                <FaHeart />
              </button>
            </figure>
            <div className="card-body p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-sm mb-0.5 truncate max-w-[120px]">{item.product.name}</h3>
                  <p className="text-gray-500 text-[10px] mb-0.5">{item.product.category}</p>
                  <p className="text-gray-400 text-[10px]">{item.product.colors}</p>
                </div>
                <p className="font-bold text-sm text-right text-primary">${item.product.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Favourites;