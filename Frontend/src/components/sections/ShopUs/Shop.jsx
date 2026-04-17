import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthModal from "../../common/AuthModal";
import {
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import SOB from "@/assets/images/SOB.png";
import SOBHover from "@/assets/images/SOB_hover.png";
import Mojito from "@/assets/images/Mojito.png";
import MojitoHover from "@/assets/images/Mojito_hover.png";
import Pinacolada from "@/assets/images/Pinacolada.png";
import PinacoladaHover from "@/assets/images/Pinacolada_hover.png";
import Cosmopolitan from "@/assets/images/Cosmopolitan.png";
import CosmopolitanHover from "@/assets/images/Cosmopolitan_hover.png";
import Irish from "@/assets/images/Irishcoffee.png";
import IrishHover from "@/assets/images/Irishcoffee_hover.png";
import Sangria from "@/assets/images/Sangria.png";
import SangriaHover from "@/assets/images/Sangria_hover.png";

const imageMap = {
  "SOB.png": SOB,
  "SOB_hover.png": SOBHover,
  "Mojito.png": Mojito,
  "Mojito_hover.png": MojitoHover,
  "Pinacolada.png": Pinacolada,
  "Pinacolada_hover.png": PinacoladaHover,
  "Cosmopolitan.png": Cosmopolitan,
  "Cosmopolitan_hover.png": CosmopolitanHover,
  "Irishcoffee.png": Irish,
  "Irishcoffee_hover.png": IrishHover,
  "Sangria.png": Sangria,
  "Sangria_hover.png": SangriaHover,
};

function Shop() {
  const [products, setProducts] = useState([]);
  const [showPrice, setShowPrice] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [isHovered, setIsHovered] = useState(null);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Recommended");
  const [isFilterOpen, setIsFilterOpen] = useState(false); // mobile filter drawer

  const ABS_MIN = 0;
  const ABS_MAX = 500;

  //Fetch product from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://blisss-ptkv.onrender.com/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const sortOptions = [
    "Recommended",
    "Newest",
    "Price (low to high)",
    "Price (high to low)",
    "Name A-Z",
    "Name Z-A",
  ];

  // Sorting Logic
  const getSortedProducts = () => {
    let sorted = [...products];

    switch (selectedSort) {
      case "Price (low to high)":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Price (high to low)":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "Name A-Z":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Name Z-A":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return sorted;
  };

  const visibleProducts = getSortedProducts().filter(
    (item) => item.price >= minPrice && item.price <= maxPrice,
  );

  const handleAddToCart = (product) => {
    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // 🔥 get real image from imageMap
  const actualImage = imageMap[product.images[0]];

    // Check if product already exists
    const existingItem = existingCart.find(
      (item) => item._id === product.productId,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({
        _id: product.productId, // important
        name: product.name,
        price: product.price,
        images: [actualImage],
        quantity: 1,
      });
    }

    // Save back
    localStorage.setItem("cart", JSON.stringify(existingCart));

    console.log("CART 👉", existingCart);

    alert("Added to cart ✅");
  };

  return (
    <section className="bg-main font-fahkwang">
      {/* Breadcrumbs */}
      <div className="flex py-6 mb-6 text-base w-[95%] mx-auto">
        <span>Home</span>
        <ChevronRightIcon className="w-4 h-4 my-auto mx-2" />
        <span>All Products</span>
      </div>

      <div className="flex w-[95%] mx-auto gap-12">
        {/* LEFT FILTER - desktop only */}
        <div className="hidden lg:flex flex-col">
          <div className="flex mb-2">
            <div className="flex flex-col">
              <span className="text-xl mb-4">Filter By</span>
              <div className="border-b-[0.4px] border-gray-400 w-48"></div>

              <div className="flex justify-between my-4">
                <span className="text-[17px]">Price</span>
                {showPrice ? (
                  <MinusIcon
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => setShowPrice(false)}
                  />
                ) : (
                  <PlusIcon
                    className="w-4 h-4 my-auto cursor-pointer"
                    onClick={() => setShowPrice(true)}
                  />
                )}
              </div>

              {showPrice && (
                <div>
                  <div className="relative h-6 price-range-wrapper">
                    <div className="price-range-track" />
                    <input
                      type="range"
                      min={ABS_MIN}
                      max={ABS_MAX}
                      value={minPrice}
                      onChange={(e) =>
                        setMinPrice(
                          Math.min(Number(e.target.value), maxPrice - 1),
                        )
                      }
                      className="price-range-input"
                    />
                    <input
                      type="range"
                      min={ABS_MIN}
                      max={ABS_MAX}
                      value={maxPrice}
                      onChange={(e) =>
                        setMaxPrice(
                          Math.max(Number(e.target.value), minPrice + 1),
                        )
                      }
                      className="price-range-input"
                    />
                  </div>
                  <div className="flex justify-between text-[17px] my-3">
                    <span>₹{minPrice}</span>
                    <span>₹{maxPrice}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="border-b-[0.4px] border-gray-400 w-48" />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col">
          {/* MOBILE FILTER BUTTON */}
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <span>{visibleProducts.length} products</span>
            <button
              className="underline underline-offset-2"
              onClick={() => setIsFilterOpen(true)}
            >
              Filter & Sort
            </button>
          </div>

          {/* Sort by - Desktop */}
          <div className="hidden lg:flex justify-between">
            <span>{visibleProducts.length} Products</span>
            <div className="relative inline-block">
              <div
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-1 cursor-pointer select-none"
              >
                <span>Sort by: {selectedSort}</span>
                {isSortOpen ? (
                  <ChevronUpIcon className="w-4 h-4" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4" />
                )}
              </div>

              {isSortOpen && (
                <ul className="absolute right-0 mt-2 w-56 bg-main border border-gray-300 shadow-md z-10 py-4">
                  {sortOptions.map((option) => (
                    <li
                      key={option}
                      onClick={() => {
                        setSelectedSort(option);
                        setIsSortOpen(false);
                      }}
                      className={`px-4 py-2 hover:bg-[#C2BAB2]/30 cursor-pointer ${
                        option === selectedSort
                          ? "bg-[#C2BAB2]/60 font-medium"
                          : ""
                      }`}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-8 gap-x-6 *:gap-y10">
            {visibleProducts.map((item, index) => {
              const img = imageMap[item.images[0]];
              const hoverImg = imageMap[item.images[1]];

              return (
                <div
                  key={item.productId}
                  className="flex flex-col xl:text-base text-xl h-full "
                >
                  <div className="flex flex-col flex-1 ">
                    <Link to={`/Products/${item.productId}`}>
                      <img
                        src={isHovered === index ? hoverImg : img}
                        alt={item.name}
                        className=" w-full sm:h-[350px] mb-4 cursor-pointer object-cover"
                        onMouseEnter={() => setIsHovered(index)}
                        onMouseLeave={() => setIsHovered(null)}
                      />
                    </Link>
                    <Link to={`/Products/${item.productId}`}>
                      <span className="mt-4">{item.name}</span>
                    </Link>
                    <span className="xl:mt-1 xl:mb-2 my-3">₹ {item.price}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full h-10 bg-brown text-main font-light hover:underline mt-auto"
                  >
                    Add To Cart
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isFilterOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute top-0 right-0 h-full w-[80%] max-w-sm bg-main shadow-xl transform transition-transform duration-300 ease-in-out ${
            isFilterOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-start p-4 border-b border-gray-300">
            <div>
              <h2 className="text-xl font-medium">Filter & Sort</h2>
              <span className="text-sm text-gray-600">
                ({visibleProducts.length} products)
              </span>
            </div>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-lg font-bold"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Sort By */}
            <div className="mb-6">
              <span className="text-[17px] font-medium block mb-2">
                Sort by:
              </span>
              <ul className="space-y-2">
                {sortOptions.map((option) => (
                  <li key={option} className="flex items-center gap-2">
                    <input
                      type="radio"
                      id={option}
                      name="sort"
                      value={option}
                      checked={selectedSort === option}
                      onChange={() => setSelectedSort(option)}
                      className="accent-brown"
                    />
                    <label htmlFor={option}>{option}</label>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="my-4 border-gray-300" />

            {/* Price Accordion */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[17px] font-medium">
                  Price (₹{ABS_MIN} - ₹{ABS_MAX})
                </span>
                {showPrice ? (
                  <MinusIcon
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => setShowPrice(false)}
                  />
                ) : (
                  <PlusIcon
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => setShowPrice(true)}
                  />
                )}
              </div>
              {showPrice && (
                <div>
                  <div className="relative h-6 price-range-wrapper">
                    <div className="price-range-track" />
                    <input
                      type="range"
                      min={ABS_MIN}
                      max={ABS_MAX}
                      value={minPrice}
                      onChange={(e) =>
                        setMinPrice(
                          Math.min(Number(e.target.value), maxPrice - 1),
                        )
                      }
                      className="price-range-input"
                    />
                    <input
                      type="range"
                      min={ABS_MIN}
                      max={ABS_MAX}
                      value={maxPrice}
                      onChange={(e) =>
                        setMaxPrice(
                          Math.max(Number(e.target.value), minPrice + 1),
                        )
                      }
                      className="price-range-input"
                    />
                  </div>
                  <div className="flex justify-between text-[17px] my-3">
                    <span>₹{minPrice}</span>
                    <span>₹{maxPrice}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex gap-4 p-4 border-t border-gray-300">
            <button
              className="flex-1 border border-gray-400 py-2 text-gray-500 disabled:opacity-50"
              disabled={minPrice === ABS_MIN && maxPrice === ABS_MAX}
              onClick={() => {
                setMinPrice(ABS_MIN);
                setMaxPrice(ABS_MAX);
              }}
            >
              Clear Filters
            </button>
            <button
              className="flex-1 bg-black text-white py-2"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Shop;
