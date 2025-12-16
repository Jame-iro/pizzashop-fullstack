import React from "react";
import aboutPizzaImg from "../../assets/about-pizza.png";
import pizzaSmall1 from "../../assets/pizza-small-1.png";
import pizzaSmall2 from "../../assets/pizza-small-2.png";
import pizzaSmall3 from "../../assets/pizza-small-3.png";
const AboutSection = () => {
  return (
    <section className="px-8 py-20" id="about">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-5xl font-bold mb-8 text-white">About us</h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            In just a couple of years, we have opened 6 outlets in different
            cities: Kazan, Chelyabinsk, Ufa, Samara, Izhevsk, and in the future
            we plan to develop the network in other major cities of Russia.
          </p>

          <div className="flex flex-wrap gap-6 mb-6 justify-center md:justify-start">
            <img
              src={pizzaSmall1}
              alt="Pizza"
              className="w-32 h-32 rounded-full object-cover shadow-xl"
            />
            <img
              src={pizzaSmall2}
              alt="Pizza"
              className="w-32 h-32 rounded-full object-cover shadow-xl"
            />
            <img
              src={pizzaSmall3}
              alt="Pizza"
              className="w-32 h-32 rounded-full object-cover shadow-xl"
            />
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">
            The kitchen of each point is at least: 400-500 sq. m. meters,
            hundreds of employees, smoothly performing work in order to receive
            / prepare / form / deliver customer orders on time.
          </p>
        </div>

        <div className="relative flex justify-center">
          <div className="w-96 h-96 md:w-125 md:h-125 overflow-hidden shadow-xl">
            <img
              src={aboutPizzaImg}
              alt="Our Pizza"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
