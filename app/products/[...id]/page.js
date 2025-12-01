"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProduct } from "@/utills/getSpecifyProduct";
import {
  addToFavourites,
  removeFromFavourites,
  checkFavouriteStatus,
} from "@/utills/favourites";
import { addToCart } from "@/utills/cart";
import Image from "next/image";

function ProductPage() {
  const params = useParams();
  const idParam = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: "" });
  const [openSection, setOpenSection] = useState("description");
  const [isFavourite, setIsFavourite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [toast, setToast] = useState({ type: "", message: "" });

  useEffect(() => {
    async function loadProduct() {
      setStatus({ loading: true, error: "" });
      try {
        const raw = await fetchProduct(idParam);
        if (raw?.success && raw?.product) {
          setProduct(raw.product);
          setStatus({ loading: false, error: "" });
        } else {
          setProduct(null);
          setStatus({
            loading: false,
            error: raw?.message || "Product information unavailable.",
          });
        }
      } catch (err) {
        setProduct(null);
        setStatus({
          loading: false,
          error: err.message || "Unable to load product.",
        });
      }
    }

    if (idParam) {
      loadProduct();
    } else {
      setStatus({ loading: false, error: "Invalid product id." });
    }
  }, [idParam]);

  useEffect(() => {
    async function checkFav() {
      if (product?.id) {
        setFavLoading(true);
        const res = await checkFavouriteStatus(product.id);
        if (res.success) {
          setIsFavourite(res.isFavourite);
        }
        setFavLoading(false);
      }
    }
    if (product) {
      checkFav();
    }
  }, [product]);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast({ type: "", message: "" }), 3000);
  };

  const handleToggleFavourite = async () => {
    if (!product?.id || favLoading) return;

    setFavLoading(true);
    if (isFavourite) {
      const res = await removeFromFavourites(product.id);
      if (res.success) {
        setIsFavourite(false);
        showToast("success", "Removed from favourites");
      } else {
        showToast("error", res.message);
      }
    } else {
      const res = await addToFavourites(product.id);
      if (res.success) {
        setIsFavourite(true);
        showToast("success", "Added to favourites");
      } else {
        showToast("error", res.message);
      }
    }
    setFavLoading(false);
  };

  const handleAddToCart = async () => {
    if (!product?.id || cartLoading) return;

    setCartLoading(true);
    const res = await addToCart(product.id, 1);
    if (res.success) {
      showToast("success", "Added to cart");
    } else {
      showToast("error", res.message);
    }
    setCartLoading(false);
  };

  const rating = product?.averageRating ?? 0;
  const ratingInputName = useMemo(
    () => `rating-${product?.id ?? "unknown"}`,
    [product?.id]
  );

  const primaryImage = product?.images?.[0]?.hiRes;
  const formattedPrice =
    typeof product?.price === "number"
      ? `$${product.price.toFixed(2)}`
      : product?.price ?? "--";

  const accordionSections = [
    {
      key: "description",
      label: "Description",
      render: () =>
        product.description.length ? (
          <ul className="list-disc space-y-1 pl-5">
            {product.description.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No description available.</p>
        ),
    },
    {
      key: "features",
      label: "Key Features",
      render: () =>
        product.features.length ? (
          <ul className="list-disc space-y-1 pl-5">
            {product.features.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No feature list available.</p>
        ),
    },
    {
      key: "specifications",
      label: "Specifications",
      render: () =>
        product.details.data ? (
          <dl className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
            {Object.entries(product.details.data).map(([label, value]) => {
              if (typeof value === "object" && value !== null) {
                return Object.entries(value).map(([subLabel, subValue]) => (
                  <div key={`${label}-${subLabel}`}>
                    <dt className="font-semibold text-neutral-800">
                      {label} - {subLabel}
                    </dt>
                    <dd className="text-neutral-600">{subValue}</dd>
                  </div>
                ));
              }
              return (
                <div key={label}>
                  <dt className="font-semibold text-neutral-800">{label}</dt>
                  <dd className="text-neutral-600">{value}</dd>
                </div>
              );
            })}
          </dl>
        ) : (
          <p>No specifications listed.</p>
        ),
    },
  ];

  if (status.loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-[#161616]">
        <p className="text-lg font-semibold">Loading product...</p>
      </main>
    );
  }

  if (status.error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-[#161616]">
        <p className="text-lg font-semibold text-red-600">{status.error}</p>
      </main>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10 text-[#161616] pt-22 md:px-10 relative">
      <div className="toast toast-top toast-end z-50">
        {toast.message && (
          <div
            className={`alert ${toast.type === "error" ? "alert-error" : "alert-success"
              } text-white`}
          >
            <span>{toast.message}</span>
          </div>
        )}
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row">
        <section className="flex flex-1 justify-center self-start rounded-[32px] bg-white p-6 lg:sticky lg:top-10">
          <img
            src={primaryImage}
            alt={product.title}
            className="h-[420px] w-[420px] max-w-full object-contain"
          />
        </section>

        <section className="flex w-full max-w-xl flex-col gap-6">
          <div className="flex flex-col gap-2 text-sm font-semibold">
            <span className="inline-flex items-center gap-1 self-start rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              <span className="text-yellow-500">★</span> Verified Listing
            </span>
            <span className="text-neutral-500">{product.mainCategory}</span>
          </div>

          <div>
            <h1 className="text-3xl font-semibold">{product.title}</h1>
            <p className="mt-2 text-2xl">{formattedPrice}</p>
          </div>

          <div className="flex items-center gap-4 rounded-3xl bg-neutral-50 p-4">
            <div className="rating rating-lg rating-half">
              {Array.from({ length: 10 }).map((_, index) => (
                <input
                  key={index}
                  type="radio"
                  name={ratingInputName}
                  className={`mask mask-star-2 bg-yellow-400 ${index % 2 === 0 ? "mask-half-1" : "mask-half-2"
                    }`}
                  checked={Math.round(rating * 2) === index + 1}
                  readOnly
                />
              ))}
            </div>
            <div>
              <p className="text-lg font-semibold">
                {rating.toFixed(1)} / 5.0
              </p>
              <p className="text-sm text-neutral-500">
                {product.ratingNumber ?? 0} ratings
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <button
              onClick={handleAddToCart}
              disabled={cartLoading}
              className=" cursor-pointer flex-1 rounded-full bg-black py-4 text-center text-lg font-semibold text-white transition hover:-translate-y-0.5 hover:bg-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {cartLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Add to Bag"
              )}
            </button>
            <button
              onClick={handleToggleFavourite}
              disabled={favLoading}
              className={`disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer rounded-full border border-neutral-300 px-8 py-4 text-lg font-semibold transition hover:border-black flex items-center justify-center gap-2 
                ${isFavourite
                  ? "bg-red-50 text-red-600 border-red-200"
                  : "bg-white"
                }`}
            >
              {favLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : isFavourite ? (
                <Image src="/red-heart.svg" alt="" width={24} height={24} />
              ) : (
                <Image src="/black-heart.svg" alt="" width={24} height={24} />
              )}
            </button>
          </div>

          <div className="space-y-3 rounded-3xl bg-white p-6">
            {accordionSections.map(({ key, label, render }) => {
              const isOpen = openSection === key;
              return (
                <div key={key} className="border-b last:border-none">
                  <button
                    className="flex w-full items-center justify-between py-4 text-left text-base font-semibold"
                    onClick={() =>
                      setOpenSection((prev) => (prev === key ? "" : key))
                    }
                  >
                    {label}
                    <span className="text-xl">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="pb-5 text-sm font-medium text-neutral-600">
                      {render()}
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

