import React from "react";
import { FaFacebook, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa6";
import { RiTwitterLine } from "react-icons/ri";

const Footer = () => {
  return (
    <div>
      <footer
        className="bg-linear-to-t from-[#170A00] via-[#0F0700] to-[#170A00]
       px-8 py-12"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <div className="text-3xl font-bold text-orange-500 mb-6">
              pizzashop
            </div>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-orange-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-orange-400">
                  Menu
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-orange-400">
                  Events
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-orange-400">
                  About us
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center mb-8 md:mb-0">
            <p className="text-2xl font-bold text-white">+7 831 333-05-33</p>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-3xl hover:text-orange-400">
              <FaInstagram />
            </a>
            <a href="#" className="text-3xl hover:text-orange-400">
              <RiTwitterLine />
            </a>
            <a href="#" className="text-3xl hover:text-orange-400">
              <FaFacebook />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
