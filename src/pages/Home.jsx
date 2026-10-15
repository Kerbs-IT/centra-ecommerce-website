import React from "react";
import { products } from "../data/products";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Home() {
  return (
    <>
      <section className="home-hero-section min-h-[calc(100dvh-4rem)] flex-1 w-full flex flex-col items-start justify-center px-8 bg-linear-119 from-orange-400 from-50% to-orange-500 to-50% text-white">
        <div className="home-title text-6xl text-wrap font-bold">
          Welcome to ShopHub
        </div>
        <p className="home-subtitle text-4xl text-wrap">
          Your Everyday Shopping Destination.
        </p>
      </section>
      <section className="product-container mt-3 flex flex-col items-center ">
        <h1 className="product-header text-center font-bold text-4xl mb-5">
          Our Products
        </h1>
        <div className="product-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-7xl px-6 sm:px-6">
                  {products.map((product) => (
                      <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
