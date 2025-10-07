import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="h-20 w-full px-15 py-4 rounded-2xl flex flex-row justify-between">
      <div className="flex justify-between items-center">
        <p className="text-xl">AuraMarket</p>
      </div>
      <div className=" flex justify-between items-center">
        <ul className="list-none flex flex-row gap-5">
            <li>Home</li>
            <li>Browse</li>
            <li>Contact</li>
        </ul>
      </div>

      <div className=" flex justify-between items-center">
        <ul className="list-none flex flex-row gap-5 ">
            <li>Search</li>
            <li>My Cart</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;

// /* Navbar */

// width: 1440px;
// height: 80px;

// /* Light/100 */
// background: #FFFFFF;

// /* Inside auto layout */
// flex: none;
// order: 0;
// align-self: stretch;
// flex-grow: 0;
// z-index: 0;
