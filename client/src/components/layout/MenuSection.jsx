import React from "react";
import { useState } from "react";
import pizzaImg from "../../assets/pizza.png";
import popularPizzaTitleBg from "../../assets/popular-pizza-title-bg.png";
import { Navigate } from "react-router";
import { toast } from "react-toastify";
import api from "../../services/api";
import { FaStar } from "react-icons/fa6";
const MenuSection = ({ categories = [], products = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const addToCart = async (productId) => {
    try {
      await api.post("/cart/add", { product_id: productId, quantity: 1 });
      toast.success("Added to cart!");
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Please login to add items to cart");
        Navigate("/login");
      } else {
        toast.error("Failed to add to cart");
      }
    }
  };
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category?.id === selectedCategory);

  const popularProducts = products.filter((p) => p.is_popular);

  return (
    <section className="px-8 py-16" id="menu">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-12 text-white">
          Menu
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-8 py-4 rounded-full text-lg font-semibold transition ${
              selectedCategory === "all"
                ? "bg-orange-500 text-white"
                : "bg-[#210A01] text-gray-300 hover:bg-orange-600"
            }`}
          >
            Show All
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-8 py-4 rounded-full text-lg font-semibold transition ${
                selectedCategory === category.id
                  ? "bg-orange-500 text-white"
                  : "bg-[#210A01] text-gray-300 hover:bg-orange-600"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-400 col-span-full">
              No pizzas in this category yet.
            </p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className=" rounded-3xl overflow-hidden shadow-2xl hover:shadow-orange-500/20 transition transform hover:-translate-y-2 bg-[#210A01]"
              >
                <div className="relative h-64">
                  <img
                    src={product.image_url || pizzaImg}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {product.ingredients ||
                      product.description ||
                      "Delicious pizza with fresh ingredients"}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-3xl font-bold text-white">
                      ${product.price}
                    </span>
                    <span className="text-yellow-300 text-lg flex items-center gap-2">
                      <FaStar /> {product.rating || "9.0"}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product.id)}
                    className="w-full py-3 bg-orange-500 rounded-full font-semibold hover:bg-orange-600 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {popularProducts.length > 0 && (
          <>
            <div className="relative h-96 md:h-125 overflow-hidden rounded-3xl mx-8 my-20 shadow-2xl">
              <img
                src={popularPizzaTitleBg}
                alt="popularPizzaTitleBg"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative h-full flex items-center justify-center">
                <h2 className="text-5xl md:text-7xl font-bold text-white tracking-wider uppercase">
                  Most Popular Pizza
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {popularProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#210A01] rounded-3xl overflow-hidden shadow-2xl hover:shadow-orange-400/50 transition transform hover:scale-105"
                >
                  <div className="relative h-64">
                    <img
                      src={product.image_url || pizzaImg}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <span className="absolute top-4 left-4 bg-yellow-500 text-black px-4 py-2 rounded-full font-bold">
                      POPULAR
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-200 text-sm mb-4 line-clamp-2">
                      {product.ingredients || "Customer favorite!"}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-3xl font-bold text-white">
                        ${product.price}
                      </span>
                      <span className="text-yellow-300 text-lg flex items-center gap-2">
                        <FaStar /> {product.rating || "9.0"}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product.id)}
                      className="w-full py-3 bg-orange-500 rounded-full font-semibold hover:bg-orange-600 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
