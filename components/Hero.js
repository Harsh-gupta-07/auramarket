import React from "react";

export default function Hero() {
  return (
    <div
      className="relative min-h-screen bg-gray-100 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/hero.jpeg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/50 z-0"></div>
      <div className="relative container mx-auto px-8 py-12 flex items-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-6 z-10">
            <p className="text-pink-500 font-semibold text-lg tracking-wide">
              Discover Everything
            </p>

            <h1 className="text-6xl lg:text-7xl font-black leading-tight text-black">
              Shop Smart,
              <br />
              Live Better.
            </h1>

            <p className="text-xl text-gray-800 max-w-lg">
              From fashion to electronics, home essentials to gifts — explore everything you need, all in one place.
            </p>

            <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
