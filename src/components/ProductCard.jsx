import React from "react";

import { Link } from "react-router-dom";
function ProductCard({product}) {


  return (
    <>
      
        <div
          
          className="bg-white rounded shadow p-4 flex flex-col flex-1/5 sm:flex-1"
        >
          <img
            src={product.image}
            alt="product"
            className="h-48 object-contain mb-3 inline-block hover:scale-120 transition duration-500 ease-in-out"
          />
          <h3 className="font-bold">{product.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
          <p className="mt-auto pt-3 font-bold text-2xl mb-1">${product.price}</p>

          <div className="product-link flex flex-wrap gap-2 justify-end items-center w-full">
            <Link to={`/product/${product.id}`}  className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-2 rounded font-bold text-c">
              View Details
            </Link>
            <button className="bg-red-600 hover:bg-red-500 text-white py-2 px-3 rounded font-bold">
              Add to Cart
            </button>
          </div>
        </div>
    
    </>
  );
}


export default ProductCard;