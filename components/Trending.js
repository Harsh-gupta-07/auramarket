import React from 'react';

export default function Trending() {
  return (
    <div className="min-h-screen bg-white py-8 px-16">
      <div className="">
        <h1 className="text-2xl font-bold mb-8">Trending Now</h1>
        
        <div className="relative mb-6 group cursor-pointer overflow-hidden rounded-sm">
          <img 
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=600&fit=crop"
            alt="React Presto"
            className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
            <div className="absolute left-12 top-1/2 -translate-y-1/2 text-white">
              <h2 className="text-6xl font-bold mb-4 tracking-tight">REACT PRESTO</h2>
              <p className="text-xl mb-6 max-w-md">With React foam for the most comfortable Presto ever.</p>
              <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </div>
        
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="relative group cursor-pointer overflow-hidden rounded-sm">
            <img 
              src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=600&fit=crop"
              alt="Air Max Dia"
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
              <div className="absolute left-8 bottom-8 text-white">
                <h3 className="text-3xl font-bold">Summer Must-Haves: Air Max Dia</h3>
              </div>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="relative group cursor-pointer overflow-hidden rounded-sm">
            <img 
              src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=600&fit=crop"
              alt="Air Jordan 11"
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
              <div className="absolute left-8 bottom-8 text-white">
                <h3 className="text-3xl font-bold">Air Jordan 11 Retro Low LE</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}