"use client"
import React, { useState } from 'react';
import Image from 'next/image';


export default function FilterSidebar() {
  const [openSections, setOpenSections] = useState({
    gender: true,
    kids: true,
    price: true,
    height: false,
    sports: true
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="w-80 bg-white p-6 min-h-screen">

      {/* Gender Section */}
      <div className="mb-6">
        <button 
          onClick={() => toggleSection('gender')}
          className="flex justify-between items-center w-full font-semibold text-lg mb-4"
        >
          Price
          {openSections.gender ? <Image src="/ChevronUp.svg" alt='arrow-up' width={20} height={20}/> : <Image src="/ChevronDown.svg" alt='arrow-up' width={20} height={20}/>}
        </button>
        
        {openSections.gender && (
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-neutral" />
              <span>&#60;$100</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-neutral" />
              <span>&#60;$250</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-neutral" />
              <span>&#60;$500</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-neutral" />
              <span>
                greater than $500</span>
            </label>
            <div>
              
            </div>
          </div>
        )}
      </div>

      <div className="divider my-6"></div>

      {/* Kids Section */}
      <div className="mb-6">
        <button 
          onClick={() => toggleSection('kids')}
          className="flex justify-between items-center w-full font-semibold text-lg mb-4"
        >
          Kids
          {openSections.kids ? <Image src="/ChevronUp.svg" alt='arrow-up' width={20} height={20}/> : <Image src="/ChevronDown.svg" alt='arrow-up' width={20} height={20}/>}
        </button>
        
        {openSections.kids && (
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-neutral" />
              <span>Boys</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-neutral" />
              <span>Girls</span>
            </label>
          </div>
        )}
      </div>

      <div className="divider my-6"></div>

      {/* Shop By Price Section */}
      <div className="mb-6">
        <button 
          onClick={() => toggleSection('price')}
          className="flex justify-between items-center w-full font-semibold text-lg mb-4"
        >
          Shop By Price
          {openSections.price ? <Image src="/ChevronUp.svg" alt='arrow-up' width={20} height={20}/> : <Image src="/ChevronDown.svg" alt='arrow-up' width={20} height={20}/>}
        </button>
        
        {openSections.price && (
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-neutral" />
              <span>$25 - $50</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-neutral" />
              <span>$50 - $100</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-neutral" />
              <span>$100 - $150</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-neutral" />
              <span>Over $150</span>
            </label>
          </div>
        )}
      </div>

      <div className="divider my-6"></div>

      {/* Shoe Height Section */}
      <div className="mb-6">
        <button 
          onClick={() => toggleSection('height')}
          className="flex justify-between items-center w-full font-semibold text-lg mb-4"
        >
          Shoe Height
          {openSections.height ? <Image src="/ChevronUp.svg" alt='arrow-up' width={20} height={20}/> : <Image src="/ChevronDown.svg" alt='arrow-up' width={20} height={20}/>}
        </button>
      </div>

      <div className="divider my-6"></div>

      {/* Sports Section */}
      <div className="mb-6">
        <button 
          onClick={() => toggleSection('sports')}
          className="flex justify-between items-center w-full font-semibold text-lg mb-4"
        >
          Sports
          {openSections.sports ? <Image src="/ChevronUp.svg" alt='arrow-up' width={20} height={20}/> : <Image src="/ChevronDown.svg" alt='arrow-up' width={20} height={20}/>}
        </button>
        
        {openSections.sports && (
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-neutral" />
              <span>Lifestyle</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-neutral" />
              <span>Skateboarding</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-neutral" />
              <span>Dance</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}