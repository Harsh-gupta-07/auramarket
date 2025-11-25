"use client";

import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";

const PRODUCT_DATA = {
  "nike-air-max-90-se": {
    name: "Nike Air Max 90 SE",
    category: "Women's Shoes",
    price: "$140",
    colorway: "Dark Team Red/Pure Platinum/Pink Oxford",
    style: "HM9451-600",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&w=1600&q=80",
    highlights: [
      "Padded collar",
      "Foam midsole",
      "Visible Max Air unit for lightweight cushioning",
      "Classic waffle outsole for traction",
    ],
    shipping: [
      "Free standard shipping and free 60-day returns for Nike Members.",
      "Choose expedited shipping at checkout for faster delivery.",
    ],
    reviews: {
      average: 3.6,
      total: 10,
    },
  },
};

function ProductPage() {
  const params = useParams();
  const idParam = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const product = useMemo(() => {
    return PRODUCT_DATA[idParam?.toLowerCase?.()] ?? PRODUCT_DATA["nike-air-max-90-se"];
  }, [idParam]);

  const [openSection, setOpenSection] = useState("details");
  const rating = product.reviews.average;
  const ratingInputName = `rating-readonly-${product.style ?? "default"}`;

  return (
    <main className="min-h-screen bg-white px-4 py-10 text-[#161616] pt-22 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row">
        <section className="flex flex-1 justify-center self-start rounded-[32px] bg-white p-6 lg:sticky lg:top-10">
          <img
            src={product.image}
            alt={product.name}
            className="h-[420px] w-[420px] max-w-full object-contain"
          />
        </section>

        {/* Details column */}
        <section className="flex w-full max-w-xl flex-col gap-6">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              <span className="text-yellow-500">★</span> Highly Rated
            </span>
            <span className="text-neutral-500">{product.category}</span>
          </div>

          <div>
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <p className="mt-2 text-2xl">{product.price}</p>
          </div>


          <div className="flex flex-col gap-3 md:flex-row">
            <button className=" cursor-pointer flex-1 rounded-full bg-black py-4 text-center text-lg font-semibold text-white transition hover:-translate-y-0.5 hover:bg-neutral-900">
              Add to Bag
            </button>
            <button className="cursor-pointer rounded-full border border-neutral-300 bg-white px-8 py-4 text-lg font-semibold transition hover:border-black">
              ♡ Favorite
            </button>
          </div>

          <div className="space-y-3 rounded-3xl bg-white p-6">
            {["details", "shipping", "reviews"].map((section) => {
              const isOpen = openSection === section;
              const labelMap = {
                details: "Product Details",
                shipping: "Shipping & Returns",
                reviews: `Reviews (${product.reviews.total})`,
              };
              return (
                <div key={section} className="border-b last:border-none">
                  <button
                    className="flex w-full items-center justify-between py-4 text-left text-base font-semibold"
                    onClick={() =>
                      setOpenSection((prev) =>
                        prev === section ? "" : section
                      )
                    }
                  >
                    {labelMap[section]}
                    <span className="text-xl">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pb-5 text-sm font-medium text-neutral-600">
                      {section === "details" && (
                        <ul className="list-disc space-y-1 pl-5">
                          {product.highlights.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                          <li>Shown: {product.colorway}</li>
                          <li>Style: {product.style}</li>
                        </ul>
                      )}
                      {section === "shipping" && (
                        <ul className="list-disc space-y-1 pl-5">
                          {product.shipping.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                      {section === "reviews" && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="rating rating-lg rating-half">
                              {Array.from({ length: 10 }).map((_, index) => (
                                <input
                                  key={index}
                                  type="radio"
                                  name={ratingInputName}
                                  className={`mask mask-star-2 bg-yellow-400 ${
                                    index % 2 === 0
                                      ? "mask-half-1"
                                      : "mask-half-2"
                                  }`}
                                  checked={Math.round(rating * 2) === index + 1}
                                  readOnly
                                />
                              ))}
                            </div>
                            <p className="text-lg font-semibold">
                              {rating.toFixed(1)}
                            </p>
                          </div>
                          <p className="text-sm text-neutral-500">
                            Based on {product.reviews.total} reviews
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductPage;