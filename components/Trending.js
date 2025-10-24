import React from 'react';

export default function Trending() {
  return (
    <div className="min-h-screen bg-white py-8 px-6 sm:px-10 lg:px-16">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center md:text-left">Trending Now</h1>

        {/* Main Featured Image */}
        <div className="relative mb-6 group cursor-pointer overflow-hidden rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=600&fit=crop"
            alt="React Presto"
            className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center justify-center md:justify-start">
            <div className="px-6 sm:px-10 md:pl-12 text-center md:text-left text-white max-w-lg">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                REACT PRESTO
              </h2>
              <p className="text-base sm:text-lg mb-6">
                With React foam for the most comfortable Presto ever.
              </p>
              <button className="bg-white text-black px-5 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="relative group cursor-pointer overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=600&fit=crop"
              alt="Air Max Dia"
              className="w-full h-[280px] sm:h-[350px] lg:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
              <div className="p-6 sm:p-8 text-white">
                <h3 className="text-2xl sm:text-3xl font-bold">Summer Must-Haves: Air Max Dia</h3>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative group cursor-pointer overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=600&fit=crop"
              alt="Air Jordan 11"
              className="w-full h-[280px] sm:h-[350px] lg:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
              <div className="p-6 sm:p-8 text-white">
                <h3 className="text-2xl sm:text-3xl font-bold">Air Jordan 11 Retro Low LE</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}