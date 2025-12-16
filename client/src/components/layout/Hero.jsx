import React from "react";
import heroImg from "../../assets/hero-img.png";
import { FaBoltLightning } from "react-icons/fa6";
const Hero = () => {
  return (
    <section className="relative max-w-7xl px-8 py-16 mx-auto flex flex-col md:flex-row items-center justify-between overflow-hidden text-white">
      <div className="max-w-lg z-10">
        <h1 className="text-6xl font-bold mb-6 flex flex-wrap items-center gap-5">
          The Fastest Pizza
          <FaBoltLightning className="text-orange-500" />
          Delivery
        </h1>
        <p className="text-xl text-gray-300 mb-10">
          We will deliver juicy pizza for your family in 30 minutes. If the
          courier is late - <span className="font-bold">pizza is free!</span>
        </p>
        <div className="flex space-x-6">
          <button className="px-8 py-4 bg-orange-500 rounded-full text-lg font-semibold hover:bg-orange-600 transition">
            To order
          </button>
          <button className="px-8 py-4 border-2 border-orange-500 text-orange-500 rounded-full text-lg font-semibold hover:bg-orange-500 hover:text-white transition">
            Pizza-Menu
          </button>
        </div>
      </div>

      <div className="relative mt-10 md:mt-0">
        <div className="w-96 h-96 md:w-125 bg-orange-600 rounded-4xl overflow-hidden shadow-2xl">
          <img
            src={heroImg}
            alt="Pizza"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
