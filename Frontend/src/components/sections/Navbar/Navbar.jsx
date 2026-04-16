"use client";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../../assets/icons/logo.png";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import CartSlider from "../../../app/CartSlider";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
    setCartCount(total);
  };

  // 3. Effect to sync count on mount and via events
  useEffect(() => {
    // Initial load
    updateCartCount();

    // Listen for custom events (triggered by other components)
    window.addEventListener("cartUpdated", updateCartCount);
    // Listen for storage changes (triggered by other tabs)
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const navLinkClasses = (extra = "") => ({ isActive }) =>
  `${extra} hover:text-brown transition-colors ${
    isActive ? "text-brown font-semibold" : "text-black"
  }`;


  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isCartOpen]);

  const handleCartClick = () => {
    if (isDesktop) {
      setIsCartOpen(true);
    } else {
      navigate("/CartPage");
    }
  };

  return (
    <>
      {/* Navbar */}

      <nav className="fixed top-0 left-0 flex justify-between items-center px-6 md:px-20 w-full h-16 bg-main z-50">
        {/* Logo */}
        <div className="my-auto">
          <img
            src={Logo}
            alt="Blisss"
            className="w-20 h-7"
            data-aos="fade"
            data-aos-delay="1000"
            data-aos-duration="3000"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-16">
          <ul className="flex gap-8 font-fahkwang font-regular text-base">
            <li>
              <NavLink to="/" className={navLinkClasses()}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/ShopUs" className={navLinkClasses()}>Shop</NavLink>
            </li>
            <li>
              <NavLink to="/Recipes" className={navLinkClasses()}>Recipes</NavLink>
            </li>
            <li>
              <NavLink to="/AboutUs" className={navLinkClasses()}>About Us</NavLink>
            </li>
            <li>
              <NavLink to="/ContactUs" className={navLinkClasses()}>Contact Us</NavLink>
            </li>
          </ul>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={handleCartClick} 
          >
            <ShoppingCartIcon className="w-6 h-6" />
            <span>{cartCount}</span>
          </div>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="flex items-center gap-4 md:hidden ">
          {/* Cart Icon (always visible on mobile) */}
          <button 
            onClick={handleCartClick} 
           className={`flex items-center gap-1 transition-opacity duration-300 ${
              isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <ShoppingCartIcon className="w-6 h-6 text-black" />
            <span>{cartCount}</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-7 h-7 relative z-50" // z-50 ensures it's above other elements
          >
            <Bars3Icon
              className={`absolute w-7 h-7 text-black transition-all duration-300 ease-in-out ${
                isOpen
                  ? "opacity-0 rotate-90 scale-50"
                  : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <XMarkIcon
              className={`absolute w-7 h-7 text-black transition-all duration-300 ease-in-out ${
                isOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-50"
              }`}
            />
          </button>
          {/* <button
            onClick={() => setIsOpen(true)}
            className={`${isOpen ? "hidden" : "block"}`}
          >
            <Bars3Icon className="w-7 h-7 text-black" />
          </button> */}
        </div>
      </nav>

      {/* Fullscreen Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-main z-30 transform transition-transform duration-700 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* <div className="flex justify-between items-center px-6 h-16 border-b border-gray-200">
          <img src={Logo} alt="Blisss" className="w-20 h-7" />
          <button onClick={() => setIsOpen(false)}>
            <XMarkIcon className="w-7 h-7 text-black" />
          </button>
        </div> */}

        <ul className="flex flex-col items-left text-center justify-center pl-10 pt-20 gap-8 font-fahkwang font-medium text-xl">  
          <li>
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={navLinkClasses("block w-11/12 border-b border-black/60 pb-4")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ShopUs"
              onClick={() => setIsOpen(false)}
              className={navLinkClasses("block w-11/12 border-b border-black/60 pb-4")}
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Recipes"
              onClick={() => setIsOpen(false)}
              className={navLinkClasses("block w-11/12 border-b border-black/60 pb-4")}
            >
              Recipes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/AboutUs"
              onClick={() => setIsOpen(false)}
              className={navLinkClasses("block w-11/12 border-b border-black/60 pb-4")}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ContactUs"
              onClick={() => setIsOpen(false)}
              className={navLinkClasses("block w-11/12 border-b border-black/60 pb-4")}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>

      {isCartOpen && isDesktop && (
        <div
          className="fixed inset-0 bg-[#0000004d] z-40"
          onClick={() => setIsCartOpen(false)} // click outside closes cart
        />
      )}

      {/* Cart Sidebar */}
      {isDesktop && (
        <CartSlider isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}
    </>
  );
}

export default Navbar;
