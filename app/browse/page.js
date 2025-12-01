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
  const keyword = searchParams.get('keyword') || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(Number(page));
  const PAGE_SIZE = 15
  const [filters, setFilters] = useState({
    categories: [],
    sort: "",
    priceRange: { min: "", max: "" },
    rating: [],
    keyword: keyword
  });

  async function fetchProducts(page = 1, currentFilters = filters) {
    setLoading(true);
    try {
      const raw = await getProducts(page, currentFilters);
      setProducts(raw);
      setCurrentPage(page);
      setLoading(false);
    } catch (err) {
      setProducts({ success: false, message: err.message });
      setLoading(false);
    }
  }

  useEffect(() => {
    const newKeyword = searchParams.get('keyword') || "";
    const newFilters = { ...filters, keyword: newKeyword };
    setFilters(newFilters);
    fetchProducts(1, newFilters);
  }, [searchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchProducts(1, newFilters);
  };

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
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="flex-1 p-8 bg-white ml-64">
        {loading ? (
          <div className="w-full h-[70vh] flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.success === true && products.data.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold">No products found</h3>
                  <p>Try adjusting your filters or search query.</p>
                </div>
              ) : (
                products.success === true &&
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
                            {item.averageRating ? item.averageRating.toFixed(1) : "0.0"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
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
