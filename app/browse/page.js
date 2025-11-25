"use client";
import FilterSidebar from "@/components/FilterSidebar";
import { getProducts } from "@/utills/getProducts";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading products...</div>}>
      <BrowseContent />
    </Suspense>
  );
}

function BrowseContent() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 1;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(Number(page));
  const PAGE_SIZE = 10;

  async function fetchProducts(page = 1) {
    setLoading(true);
    try {
      const raw = await getProducts(page);
      setProducts({ success: true, data: raw.data });
      setCurrentPage(page);
      setLoading(false);
    } catch (err) {
      setProducts({ success: false, message: err.message });
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (products.success === false) {
    return (
      <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-4">
        <div className="text-5xl">😕</div>
        <h2 className="text-xl font-semibold text-gray-700">
          Failed to load products
        </h2>
        <p className="text-gray-500">{products.message}</p>
        <button className="btn btn-outline" onClick={() => fetchProducts()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex pt-18">
      <div className="w-64 bg-white fixed left-0 top-18 h-screen overflow-y-auto">
        <FilterSidebar />
      </div>

      <div className="flex-1 p-8 bg-white ml-64">
        {loading ? (
          <div className="w-full h-[70vh] flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.success === true &&
                products.data.map((item, i) => (
                  <Link
                    href={`/products/${item.id}`}
                    key={i}
                    className="card bg-white shadow-sm hover:shadow-2xl transition border rounded-xl cursor-pointer"
                  >
                    <figure className="px-4 pt-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="rounded-xl h-48 object-contain"
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

                      <p className="text-sm text-gray-500">{item.mainCategory}</p>
                    </div>
                  </Link>
                ))}
            </div>

            {products.success === true && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  className="btn btn-outline"
                  disabled={currentPage === 1}
                  onClick={() => fetchProducts(Math.max(currentPage - 1, 1))}
                >
                  Previous
                </button>
                <span className="font-semibold">
                  Page {currentPage}
                </span>
                <button
                  className="btn btn-outline"
                  disabled={
                    products.data.length < PAGE_SIZE
                  }
                  onClick={() => fetchProducts(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
