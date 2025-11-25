"use client"

import { distinctCategories } from "@/utills/sidebarFunctions";
import { useEffect, useState } from "react";

export default function FilterSidebar() {
  const [loading, setLoading]=useState(true)
  const [categories, setCategories] = useState([])
  async function fetch_cat(params) {
    try{
      const data = await distinctCategories()
      setCategories(data)
      console.log(data)
      setLoading(false)
    }catch(err){
      setCategories({sucess:false, message:err.message})
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetch_cat()
  },[])

  return (
    <div className="w-64 p-6  bg-white min-h-screen">
      {/* COLLAPSIBLE SECTIONS */}
      {/* Categories */}
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
                <input type="checkbox" className="checkbox checkbox-xs checkbox-neutral" /> {cat}
              </label>
            ))
          ) : (
            <p className="text-xs text-red-500">No categories found</p>
          )}
        </div>
      </div>

      <div className="divider divider-neutral"></div>

      {/* Gender */}
      <div className="collapse bg-white">
        <input type="checkbox" />
        <div className="collapse-title p-0">
          <div className="flex justify-between items-center font-semibold">
            <span>Gender</span>
            <svg className="w-4 h-4 transition-transform collapse-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div className="collapse-content">
          <label className="flex items-center gap-2 py-1">
            <input type="checkbox" className="checkbox checkbox-neutral checkbox-sm" /> Men
          </label>
          <label className="flex items-center gap-2 py-1">
            <input type="checkbox" className="checkbox checkbox-sm" /> Women
          </label>
          <label className="flex items-center gap-2 py-1">
            <input type="checkbox" className="checkbox checkbox-sm" /> Unisex
          </label>
        </div>
      </div>

      <div className="divider divider-neutral "></div>

      {/* Kids */}
      <div className="collapse bg-white">
        <input type="checkbox" />
        <div className="collapse-title p-0">
          <div className="flex justify-between items-center font-semibold">
            <span>Kids</span>
            <svg className="w-4 h-4 transition-transform collapse-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div className="collapse-content">
          <label className="flex items-center gap-2 py-1">
            <input type="checkbox" className="checkbox checkbox-sm" /> Boys
          </label>
          <label className="flex items-center gap-2 py-1">
            <input type="checkbox" className="checkbox checkbox-sm" /> Girls
          </label>
        </div>
      </div>

      <div className="divider divider-neutral"></div>

      {/* Price */}
      <div className="collapse bg-white">
        <input type="checkbox" />
        <div className="collapse-title p-0">
          <div className="flex justify-between items-center font-semibold">
            <span>Shop By Price</span>
            <svg className="w-4 h-4 transition-transform collapse-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div className="collapse-content">
          {["$25 - $50", "$50 - $100", "$100 - $150", "Over $150"].map((label) => (
            <label key={label} className="flex items-center gap-2 py-1">
              <input type="checkbox" className="checkbox checkbox-sm" /> {label}
            </label>
          ))}
        </div>
      </div>

      <div className="divider divider-neutral"></div>

      {/* Shoe Height */}
      <div className="collapse bg-white">
        <input type="checkbox" />
        <div className="collapse-title p-0">
          <div className="flex justify-between items-center font-semibold">
            <span>Shoe Height</span>
            <svg className="w-4 h-4 transition-transform collapse-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div className="collapse-content">
          {["Low", "Mid", "High"].map((label) => (
            <label key={label} className="flex items-center gap-2 py-1">
              <input type="checkbox" className="checkbox checkbox-sm" /> {label}
            </label>
          ))}
        </div>
      </div>

      <div className="divider divider-neutral"></div>

      {/* Sports */}
      <div className="collapse bg-white">
        <input type="checkbox" />
        <div className="collapse-title p-0">
          <div className="flex justify-between items-center font-semibold">
            <span>Sports</span>
            <svg className="w-4 h-4 transition-transform collapse-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div className="collapse-content">
          {["Lifestyle", "Skateboarding", "Dance"].map((label) => (
            <label key={label} className="flex items-center gap-2 py-1">
              <input type="checkbox" className="checkbox checkbox-sm" /> {label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}