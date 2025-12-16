import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import MenuSection from "../components/layout/MenuSection";
import api from "../services/api";
import EventSection from "../components/layout/EventSection";
import AboutSection from "../components/layout/AboutSection";
import Footer from "../components/layout/Footer";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes, eventRes] = await Promise.all([
          api.get("/categories"),
          api.get("/products"),
          api.get("/events"),
        ]);
        setCategories(catRes.data);
        setProducts(prodRes.data);
        setEvents(eventRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-center py-20 text-2xl">
        Loading delicious pizzas...
      </div>
    );
  return (
    <>
      <Navbar />
      <Hero />
      <MenuSection categories={categories} products={products} />
      <EventSection events={events} />
      <AboutSection />
      <Footer />
    </>
  );
};

export default HomePage;
