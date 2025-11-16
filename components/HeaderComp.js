"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
    }
  }, []);

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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-40"
          >
            <li>
              <Link href="/" className="btn btn-ghost textarea-md">Home</Link>
            </li>
            <li>
              <Link href="/browse" className="btn btn-ghost textarea-md">Browse</Link>
            </li>
            <li>
              <Link href="/" className="btn btn-ghost textarea-md">Contact</Link>
            </li>
          </ul>
        </div>
        <Link href="/">
          <div className="btn btn-ghost text-xl font-semibold">AuraMarket</div>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 rounded">
          <li>
            <Link href="/" className="btn btn-ghost">Home</Link>
          </li>
          <li>
            <Link href="/browse" className="btn btn-ghost">Browse</Link>
          </li>
          <li>
            <Link href="/" className="btn btn-ghost">Contact</Link>
          </li>
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
            <span className="badge badge-xs indicator-item bg-red-500 text-white">
              3
            </span>
          </div>
        </button>
        {userToken ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-white hover:border-none hover:shadow-none active:bg-white">
              <div className="w-10 rounded-full">
                <Image
                  src="/profile.svg"
                  alt="Profile"
                  width={40}
                  height={40}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-white rounded-box z-[1] w-40 p-2 shadow"
            >
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                  className="btn btn-ghost"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/signin" className="btn btn-ghost">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
