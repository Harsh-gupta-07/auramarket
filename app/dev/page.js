"use client";
import React, { useState } from "react";

export default function DoubleRangeSlider() {
  const [min, setMin] = useState(20);
  const [max, setMax] = useState(80);

  return (
    <div className="w-full max-w-xs mx-auto">
      <h2 className="font-semibold mb-3">Price Range</h2>

      <div className="relative h-6">
        {/* Slider Track */}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-200 rounded-full -translate-y-1/2"></div>

        {/* Active Range Highlight */}
        <div
          className="absolute top-1/2 h-2 bg-primary rounded-full -translate-y-1/2"
          style={{
            left: `${min}%`,
            right: `${100 - max}%`,
          }}
        ></div>

        {/* Min Range Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={min}
          onChange={(e) => setMin(Math.min(Number(e.target.value), max - 1))}
          className="range range-primary absolute top-0 left-0 w-full pointer-events-none"
          style={{ pointerEvents: "auto" }}
        />

        {/* Max Range Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={max}
          onChange={(e) => setMax(Math.max(Number(e.target.value), min + 1))}
          className="range range-primary absolute top-0 left-0 w-full pointer-events-none"
          style={{ pointerEvents: "auto" }}
        />
      </div>

      <div className="flex justify-between mt-3 text-sm font-medium">
        <span>${min}</span>
        <span>${max}</span>
      </div>
    </div>
  );
}