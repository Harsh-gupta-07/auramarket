
"use client"

import { distinctCategories } from "@/utills/sidebarFunctions";
import { useEffect, useState } from "react";

export default function FilterSidebar({ filters, setFilters, onFilterChange }) {
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])

  async function fetch_cat() {
    try {
      const data = await distinctCategories()
      setCategories(data)
      setLoading(false)
    } catch (err) {
      setCategories({ sucess: false, message: err.message })
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch_cat()
  }, [])

  const updateFilters = (newFilters) => {
    setFilters(newFilters)
    if (onFilterChange) {
      onFilterChange(newFilters)
    }
  }

  const handleCategoryChange = (cat) => {
    const newCategories = filters.categories.includes(cat)
      ? filters.categories.filter(c => c !== cat)
      : [...filters.categories, cat]

    const newFilters = { ...filters, categories: newCategories }
    updateFilters(newFilters)
  }

  const handleSortChange = (e) => {
    const newFilters = { ...filters, sort: e.target.value }
    updateFilters(newFilters)
  }

  const handlePriceChange = (e, type) => {
    setFilters(prev => ({
      ...prev,
      priceRange: { ...prev.priceRange, [type]: e.target.value }
    }))
  }

  const applyPriceFilter = () => {
    if (onFilterChange) {
      onFilterChange(filters)
    }
  }

  const handleRatingChange = (star) => {
    const newRating = filters.rating.includes(star)
      ? []
      : [star]

    const newFilters = { ...filters, rating: newRating }
    updateFilters(newFilters)
  }

  return (
    <div className="w-64 p-6 bg-white h-full overflow-y-auto pb-20">
      <div className="collapse bg-white">
        <input type="checkbox" />
        <div className="collapse-title p-0">
          <div className="flex justify-between items-center font-semibold">
            <span>Categories</span>
            <svg className="w-4 h-4 transition-transform collapse-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="collapse-content">
          {loading ? (
            <div className="w-full flex justify-center py-2">
              <span className="loading loading-spinner loading-sm"></span>
            </div>
          ) : categories?.categories?.length ? (
            categories.categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 py-1 text-xs">
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs checkbox-neutral"
                  checked={filters.categories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                /> {cat}
              </label>
            ))
          ) : (
            <p className="text-xs text-red-500">No categories found</p>
          )}
        </div>
      </div>

      <div className="divider divider-neutral"></div>

      <div className="collapse bg-white">
        <input type="checkbox" />
        <div className="collapse-title p-0">
          <div className="flex justify-between items-center font-semibold">
            <span>Sort By</span>
            <svg className="w-4 h-4 transition-transform collapse-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div className="collapse-content">
          <label className="flex items-center gap-2 py-1 cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="newest"
              className="radio radio-sm radio-neutral"
              checked={filters.sort === "newest"}
              onChange={handleSortChange}
            /> Newest
          </label>
          <label className="flex items-center gap-2 py-1 cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="price_asc"
              className="radio radio-sm radio-neutral"
              checked={filters.sort === "price_asc"}
              onChange={handleSortChange}
            /> Price: Low to High
          </label>
          <label className="flex items-center gap-2 py-1 cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="price_desc"
              className="radio radio-sm radio-neutral"
              checked={filters.sort === "price_desc"}
              onChange={handleSortChange}
            /> Price: High to Low
          </label>
          <label className="flex items-center gap-2 py-1 cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="rating"
              className="radio radio-sm radio-neutral"
              checked={filters.sort === "rating"}
              onChange={handleSortChange}
            /> Top Rated
          </label>
        </div>
      </div>

      <div className="divider divider-neutral"></div>

      <div className="collapse bg-white">
        <input type="checkbox" />
        <div className="collapse-title p-0">
          <div className="flex justify-between items-center font-semibold">
            <span>Price Range</span>
            <svg className="w-4 h-4 transition-transform collapse-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div className="collapse-content">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                className="input input-bordered bg-white border-black outline-black input-sm w-full"
                value={filters.priceRange.min || ''}
                onChange={(e) => handlePriceChange(e, 'min')}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                className="input input-bordered bg-white border-black outline-black input-sm w-full"
                value={filters.priceRange.max || ''}
                onChange={(e) => handlePriceChange(e, 'max')}
              />
            </div>
            <button className="btn btn-neutral btn-sm w-full mt-2" onClick={applyPriceFilter}>Apply</button>
          </div>
        </div>
      </div>

      <div className="divider divider-neutral"></div>

      <div className="collapse bg-white">
        <input type="checkbox" />
        <div className="collapse-title p-0">
          <div className="flex justify-between items-center font-semibold">
            <span>Rating</span>
            <svg className="w-4 h-4 transition-transform collapse-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div className="collapse-content">
          {[4, 3, 2, 1].map((star) => (
            <label key={star} className="flex items-center gap-2 py-1 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-neutral"
                checked={filters.rating.includes(star)}
                onChange={() => handleRatingChange(star)}
              />
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < star ? "text-yellow-400 fill-current" : "text-gray-300"} `} viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm">& Up</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}