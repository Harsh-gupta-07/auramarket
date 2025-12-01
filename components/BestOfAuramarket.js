"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getTopRatedProducts } from "@/utills/getProducts";

export default function BestOfAuramarket() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopRated() {
      try {
        const res = await getTopRatedProducts();
        if (res.success) {
          setProducts(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch top rated products", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTopRated();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-12 flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 px-16 max-w-7xl mx-auto bg-white min-w-screen">
      <h2 className="text-3xl font-bold mb-8 text-center">Top Rated</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((item) => (
          <Link
            href={`/products/${item.id}`}
            key={item.id}
            className="card bg-white shadow-sm hover:shadow-2xl transition border rounded-xl cursor-pointer"
          >
            <figure className="px-4 pt-4">
              <img
                src={item.image}
                alt={item.name}
                className="rounded-xl h-64 w-full object-contain"
              />
            </figure>

            <div className="card-body">
              <div className="flex flex-row justify-between items-start">
                <h2 className="font-semibold text-lg mr-3">
                  {item.name.length > 20
                    ? item.name.substring(0, 45) + "..."
                    : item.name}
                </h2>
                <p className="font-semibold text-lg text-right whitespace-nowrap">
                  $ {item.price}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <p className="text-sm text-gray-500">{item.mainCategory}</p>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-yellow-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="text-sm font-medium">
                    {item.averageRating
                      ? item.averageRating.toFixed(1)
                      : "0.0"}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}