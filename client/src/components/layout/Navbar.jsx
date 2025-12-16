import React, { useState } from "react";
import { RiShoppingBag4Line } from "react-icons/ri";
import { Link } from "react-router";
import CartSidebar from "../CartSidebar";
const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const fetchCartCount = async () => {
    try {
      const res = await api.get("/cart");
      const count =
        res.data.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
      setItemCount(count);
    } catch (err) {
      setItemCount(0);
    }
    useEffect(() => {
      if (cartOpen) {
        fetchCartCount();
      }
    }, [cartOpen]);
  };
  return (
    <>
      <nav className="max-w-7xl px-8 py-6 mx-auto flex justify-between items-center text-white">
        <div className="text-3xl font-bold text-orange-500">pizzashop</div>

        <ul className="hidden md:flex space-x-8 text-lg">
          <li>
            <Link to="/" className="hover:text-orange-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/#menu" className="hover:text-orange-400">
              Menu
            </Link>
          </li>
          <li>
            <Link to="/#events" className="hover:text-orange-400">
              Events
            </Link>
          </li>
          <li>
            <Link to="/#about" className="hover:text-orange-400">
              About us
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          <Link to="/login">
            <button className="px-6 py-3 bg-orange-500 rounded-full hover:bg-orange-600 transition">
              Log in
            </button>
          </Link>
          <div className="text-4xl bg-orange-500 p-3 rounded-full hover:bg-orange-600 transition cursor-pointer relative">
            <RiShoppingBag4Line onClick={() => setCartOpen(true)} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse z-10">
                {itemCount}
              </span>
            )}
          </div>
        </div>
      </nav>
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
