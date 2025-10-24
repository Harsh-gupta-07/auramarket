import React from "react";

function ProductCard({product}) {
  return (
    <div
      key={product.id}
      className="card bg-white  hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <figure className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        {product.badge == undefined ? (
          ""
        ) : (
          <div className="absolute top-3 left-3">
            <span
              className={`badge badge-md bg-white ${product.badgeColor? product.badgeColor: "text-red-600"} font-medium`}
            >
              {product.badge}
            </span>
          </div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-between">
          {product.name}
          <span className="text-base font-semibold">{product.price}</span>
        </h2>
        <p className="text-gray-500 text-sm">{product.category}</p>
      </div>
    </div>
  );
}

export default ProductCard;
