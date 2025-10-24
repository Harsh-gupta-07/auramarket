import React from "react";

export default function Hero() {
  return (
    <div
      className="relative min-h-[80vh] md:min-h-screen bg-gray-100 overflow-hidden bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/hero.jpeg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/60 z-0"></div>
      <div className="relative container mx-auto px-6 md:px-10 py-16 flex flex-col md:flex-row items-center justify-center md:justify-start text-center md:text-left">
        <div className="max-w-2xl space-y-6 z-10">
          <p className="text-pink-500 font-semibold text-base sm:text-lg tracking-wide">
            Discover Everything
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight text-black">
            Shop Smart,
            <br className="hidden sm:block" />
            Live Better.
          </h1>

          <p className="text-lg sm:text-xl text-gray-800 max-w-lg mx-auto md:mx-0">
            From fashion to electronics, home essentials to gifts — explore everything you need, all in one place.
          </p>

          <div className="flex justify-center md:justify-start">
            <button className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
