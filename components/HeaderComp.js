"use client"
import React, { useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

function Header() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="navbar bg-white shadow-md px-6">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a>Home</a></li>
            <li><a>Browse</a></li>
            <li><a>Contact</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl font-semibold">AuraMarket</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a>Home</a></li>
          <li><a>Browse</a></li>
          <li><a>Contact</a></li>
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {showSearch ? (
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full max-w-xs bg-white border-black"
            onBlur={() => setShowSearch(false)}
            autoFocus
          />
        ) : (
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setShowSearch(true)}
          >
            <FaSearch className="text-lg" />
          </button>
        )}
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <FaShoppingCart className="text-lg" />
            <span className="badge badge-xs indicator-item bg-red-500 text-white">3</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Header;
