import React from 'react';
import { Twitter, Facebook, Instagram } from 'lucide-react';

export default function NikeFooter() {
  return (
    <footer className="bg-black text-gray-400 py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Nike Logo */}
          <div className="flex items-start">
            <p className='text-white text-2xl'>AuraMarket</p>
          </div>

          {/* Featured */}
          <div>
            <h3 className="text-white font-medium mb-4">Featured</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">Air Force 1</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Huarache</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Air Max 90</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Air Max 95</a></li>
            </ul>
          </div>

          {/* Shoes */}
          <div>
            <h3 className="text-white font-medium mb-4">Categories</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Electronics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Fashion</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Home & Kitchen</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Beauty & Health</a></li>
            </ul>
          </div>

          {/* Clothing */}
          <div>
            <h3 className="text-white font-medium mb-4">Clothing</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">All Clothing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hoodies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Jeans</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shirts & Tops</a></li>
            </ul>
          </div>

          {/* Kids' */}
          <div>
            <h3 className="text-white font-medium mb-4">Electronics</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">Smartphone</a></li>
              <li><a href="#" className="hover:text-white transition-colors">TV</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Fridge</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Washing Machine</a></li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-end gap-3 mt-12">
          <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
            <Twitter className="w-5 h-5 text-white" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
            <Facebook className="w-5 h-5 text-white" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
            <Instagram className="w-5 h-5 text-white" />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-6 border-t border-gray-800 text-sm">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>India</span>
            </div>
            <span>© 2025 AuraMarket, Inc. All Rights Reserved</span>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Guides</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Sale</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">AuraMarket Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}