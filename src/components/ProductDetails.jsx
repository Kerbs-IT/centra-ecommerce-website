import { products } from "@/data/products";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "./ui/toast";
import { CartContext } from "@/context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = products.find((data) => data.id === Number(id));
  const { addToCart } = useContext(CartContext);

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="w-3/4 mx-auto block text-left  mt-4 text-blue-600 font-bold hover:underline"
      >
        ← Back
      </button>
      <section className="grid grid-cols-2 mx-auto mt-4 bg-white p-5 w-3/4 min-h-96">
        <img src={item.image} alt="" className="object-contain h-full w-full" />
        <div className="product-details flex flex-col">
          <h1 className="product-name font-bold text-3xl mb-2">
            {item.name ?? "< item-name >"}
          </h1>
          <h3 className="text-wrap text-lg mb-2">
            {item.description ?? "< item-description >"}
          </h3>
          <h3 className="item-price font-bold text-xl">$ {item.price}</h3>
          <div className="buttons flex flex-wrap w-full justify-end gap-1 ">
            <button
              onClick={() => addToCart(item)}
              className=" self-end hover:cursor-pointer bg-red-500 p-2 rounded text-white font-bold"
            >
              Add to Cart
            </button>
            <button onClick={() => navigate(`/checkout?buyNow=${item.id}`)} className=" self-end hover:cursor-pointer bg-orange-500 p-2 rounded text-white font-bold">
              Checkout
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
