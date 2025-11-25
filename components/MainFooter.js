import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="footer flex flex-col sm:footer-horizontal sm:flex-row sm:flex-wrap justify-between gap-10 text-base">
          <aside className="sm:w-1/4">
            <p className="text-2xl font-semibold">AuraMarket</p>
            <p className="text-sm mt-2 text-gray-500 leading-relaxed">
              Your one-stop shop for everything you need electronics, fashion,
              and more.
            </p>
          </aside>

          <nav className="sm:w-1/5">
            <h6 className="footer-title">Categories</h6>
            <a className="link link-hover">Electronics</a>
            <a className="link link-hover">Fashion</a>
            <a className="link link-hover">Home & Kitchen</a>
            <a className="link link-hover">Beauty & Health</a>
          </nav>

          <nav className="sm:w-1/5">
            <h6 className="footer-title">Customer Service</h6>
            <a className="link link-hover">Help Center</a>
            <a className="link link-hover">Returns</a>
            <a className="link link-hover">Shipping Info</a>
            <a className="link link-hover">Order Tracking</a>
          </nav>

          <nav className="sm:w-1/5">
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About Us</a>
            <a className="link link-hover">Careers</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Privacy Policy</a>
          </nav>

          <nav className="sm:w-1/5">
            <h6 className="footer-title">Follow Us</h6>
            <div className="flex gap-3">
              <button className="btn btn-ghost btn-circle">
                <Image src="/twitter.svg" width={25} height={25} alt="twitter" />
                
              </button>
              <button className="btn btn-ghost btn-circle">
                <Image src="/linkedin.svg" width={25} height={25} alt="linkedin" />
                
              </button>
              <button className="btn btn-ghost btn-circle">
                <Image src="/insta.svg" width={25} height={25} alt="insta" />
              </button>
            </div>
          </nav>
        </div>

        <div className="text-center border-t border-base-300 mt-10 pt-6 text-sm text-gray-500">
          © 2025 AuraMarket. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
