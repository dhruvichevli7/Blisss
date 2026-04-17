import { useEffect, useState } from "react";
import {useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
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

function ProductDetails() {
  const { id } = useParams();
  const productId = Number(id);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [productIds, setProductIds] = useState([]);
  const [Quantity, setQuantity] = useState(1);

  const [selectedImage, setSelectedImage] = useState(0);
  const [isModelOpen, setIsModelOpen] = useState(false);

  // 🔹 For custom cursor
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  const [isZoomed, setIsZoomed] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [didDrag, setDidDrag] = useState(false);

  const [isNutritionOpen, setIsNutritionOpen] = useState(false);

  const handleAddToCart = () => {
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

  // 🔥 Convert image filename → actual image
  const actualImage = imageMap[product.images[0]];

  const existingItem = existingCart.find(
    (item) => item._id === product.productId
  );

  if (existingItem) {
    existingItem.quantity += Quantity; // use selected quantity
  } else {
    existingCart.push({
      _id: product.productId,
      name: product.name,
      price: product.price,
      images: [actualImage],
      quantity: Quantity,
    });
  }

  localStorage.setItem("cart", JSON.stringify(existingCart));

  console.log("CART 👉", existingCart);

  alert("Added to cart ✅");
};

  //Fecth product details
  useEffect(() => {
    let cancelled = false;
    async function fecthProduct() {
      try{
        const res = await axios.get(`https://blisss-ptkv.onrender.com/api/products/${productId}`);
        if(!cancelled) setProduct(res.data);
      }catch (err) {
        console.error("Error fetching product details:", err);
        if(!cancelled) setProduct(null);
      }
    }
    if(!isNaN(productId)) fecthProduct();
    return () => { cancelled = true; };
  },[productId]);

  //Fetch all product for prev & next
  useEffect(() => {
    let cancelled = false;
    async function fetchIds() {
      try{
        const res = await axios.get("https://blisss-ptkv.onrender.com/api/products");
        if(cancelled) return;
        //extract prodct id and sort ascending
        const ids = res.data
        .map((p) => Number(p.productId))
        .filter((n) => !Number.isNaN(n))
        .sort((a, b) =>a - b );
        setProductIds(ids); 
      }catch (err){
        console.error("Error fetching product list:",err);
        if(!cancelled) setProductIds([]);
      }
    }
    fetchIds();
    return () => { cancelled = true; };
  }, []);

  const decrease = () => {
    setQuantity((p) => (p > 1 ? p - 1 : 1));
  };

  const increase = () => {
    setQuantity((p) => p + 1);
  };

  // Prev / Next logic using the productIds array (safe even if IDs are non-consecutive)
  const currentIndex = productIds.indexOf(productId);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex !== -1 && currentIndex < productIds.length - 1;
  const prevId = hasPrev ? productIds[currentIndex - 1] : null;
  const nextId = hasNext ? productIds[currentIndex + 1] : null;

  const goPrev = (e) => {
    e?.preventDefault();
    if (hasPrev && prevId != null) navigate(`/Products/${prevId}`);
  };

  const goNext = (e) => {
    e?.preventDefault();
    if (hasNext && nextId != null) navigate(`/Products/${nextId}`);
  };

  if(!product) {
    return (
      <div className="text-center py-20 text-2xl font-light">
        Loading product...
      </div>
    );
  }

  const Images = product.images.map(
    (img) => `/src/assets/images/${img}`
  );

  const prevImage = () => {
    setSelectedImage((i) => (i === 0 ? Images.length - 1 : i - 1));
    setIsZoomed(false);
  };

  const nextImage = () => {
    setSelectedImage((i) => (i === Images.length - 1 ? 0 : i + 1));
    setIsZoomed(false);
  };

  return (
    <>
      <section className="bg-main font-fahkwang pb-6">
        <div className="flex flex-col w-3/4 mx-auto pt-10">
          <div className="flex justify-between text-[15px] pb-14">
            <span>Home / All Products / 
              <span className="opacity-50"> {product.name} </span>
            </span>

            <div className="hidden md:flex gap-2">
              <button
                onClick={goPrev}
                disabled={!hasPrev}
                className={`flex items-center gap-2 ${
                  !hasPrev ? "opacity-40 cursor-pointer" : "cursor-pointer"
                }`}
                aria-label="Previous product"
              >
              <ChevronLeftIcon className="w-5 h-5 my-auto" />
              <span  className="underline">Prev</span>
              </button>
               <span className="text-sm opacity-60">|</span>
               <button
                onClick={goNext}
                disabled={!hasNext}
                className={`flex items-center gap-2 ${
                  !hasNext ? "opacity-40 cursor-pointer" : "cursor-pointer"
                }`}
                aria-label="Next product"
              >
                <span className="underline">Next</span>
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex flex-col gap-4 md:w-1/2">
              <div
                className="relative w-full h-[400px] md:w-[500px] md:h-[750px] cursor-none"
                onClick={() => setIsModelOpen(true)}
                onMouseMove={(e) =>
                  setCursorPos({ x: e.clientX, y: e.clientY })
                }
                onMouseEnter={() => setShowCursor(true)}
                onMouseLeave={() => setShowCursor(false)}
              >
                <img
                  src={Images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = Images[0];
                  }}
                />

                {/* 🔹 Custom Round Zoom Cursor */}
                {showCursor && (
                  <div
                    className="hidden fixed md:flex items-center justify-center w-9 h-9 rounded-full bg-black bg-opacity-30 pointer-events-none"
                    style={{
                      top: cursorPos.y - 24,
                      left: cursorPos.x - 24,
                    }}
                  >
                    <span className="text-white text-xl font-light">+</span>
                  </div>
                )}
              </div>

              {/* Dots for mobile view */}
              <div className="flex justify-center gap-2 mt-4 md:hidden">
                {Images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-3 h-3 rounded-full ${
                      selectedImage === idx ? "bg-black" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              {/* Thumbnails */}
              <div className="hidden md:flex gap-4">
                {Images.map((img, idx) => (
                  <button
                    type="button"
                    key={idx}
                    className={`w-20 h-28 border cursor-pointer ${
                      selectedImage === idx
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              <p className="hidden md:flex">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col md:w-1/2 mt-6 md:mt-0">
              <h1 className="font-regular text-[1.6rem]">
                {product.name}
              </h1>
              <span className="font-regular text-xl my-6">
                ₹ {product.price}
              </span>
              <span className="font-light text-sm mb-6">
                Quantity*
              </span>
              <div className="flex items-center justify-center md:justify-start w-24 border border-black bg-white px-3 py-[0.18rem] space-x-4 font-extralight mb-6 mx-aut md:mx-0">
                <button
                  type="button"
                  onClick={decrease}
                  disabled={Quantity === 1}
                  className={`text-2xl
                    ${Quantity === 1 ? "text-gray-400" : "text-black"}`}
                >
                  -
                </button>
                <span className="text-base">{Quantity}</span>
                <button type="button" onClick={increase} className="text-xl">
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full md:w-[24rem] h-10 bg-brown text-main font-light hover:underline my-5"
              >
                  Add To Cart
              </button>

              {/* Description */}
              <p className="flex md:hidden mb-6 text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Nutrition & Health */}
              <div className="nutrition-details mt-6 text-[14px]">
                <button
                  className="flex justify-between items-center w-full"
                  type="button"
                  onClick={() => setIsNutritionOpen((prev) => !prev)}
                >
                  <h1>Nutrition and Health</h1>
                  {isNutritionOpen ? (
                    <MinusIcon className="w-5 h-5" />
                  ) : (
                    <PlusIcon className="w-5 h-5" />
                  )}
                </button>

                <AnimatePresence>
                  {isNutritionOpen && (
                    <Motion.div
                      className="mt-4 space-y-1"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p>
                        This product is made with all natural ingredients
                        nothing artificial
                      </p>
                      <br />
                      <p>{ product.nutrition }</p>
                    </Motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Social Icons */}
              <div className="flex mt-8 space-x-4">
                {/* <div className="flex space-x-4"> */}
                  <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[1.44rem] "
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white p-1 rounded-full transition"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white p-1 rounded-full transition"
                  >
                    <FaWhatsapp />
                  </a>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Modal Lightbox Carousel */}
        {isModelOpen && (
          <div className="fixed inset-0 bg-white  flex items-center justify-center z-50">
            {/* Close button */}
            <button
              className="absolute top-5 right-8 text-black"
              onClick={() => setIsModelOpen(false)}
              aria-label="Close"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Left Arrow */}
            {selectedImage > 0 && (
              <button
                className="hidden md:block absolute left-4 md:left-10 text-black"
                onClick={prevImage}
                aria-label="Previous"
              >
                <ChevronLeftIcon className="w-8 h-8 md:w-10 md:h-10" />
              </button>
            )}

            {/* Zoom image */}
            <div
              className="relative cursor-none flex items-center justify-center overflow-hidden max-h-[90vh]"
              onMouseMove={(e) => {
                setCursorPos({ x: e.clientX, y: e.clientY });
                if (isZoomed && isDragging) {
                  const newY = e.clientY - dragStartY;

                  const maxOffset = 150;
                  const clampedY = Math.max(
                    -maxOffset,
                    Math.min(newY, maxOffset)
                  );

                  if (!didDrag && Math.abs(clampedY - offsetY) > 3)
                    setDidDrag(true);
                  setOffsetY(clampedY);
                }
              }}
              onMouseEnter={() => setShowCursor(true)}
              onMouseLeave={() => {
                setShowCursor(false);
                setIsDragging(false);
              }}
              onMouseDown={(e) => {
                if (isZoomed) {
                  setIsDragging(true);
                  setDragStartY(e.clientY - offsetY);
                  setDidDrag(false);
                }
              }}
              onMouseUp={() => setIsDragging(false)}
            >
              {/* Image */}
              <AnimatePresence mode="wait">
                <Motion.img
                  key={selectedImage}
                  src={Images[selectedImage]}
                  alt="Zoomed"
                  onClick={() => {
                    if (didDrag) {
                      setDidDrag(false);
                      return;
                    }
                    setIsZoomed((prev) => {
                      if (prev) setOffsetY(0);
                      return !prev;
                    });
                  }}
                  className={`object-contain transition-transform duration-300 ${
                    selectedImage === 0
                      ? isZoomed
                        ? "max-w-[70%] max-h-[70%]"
                        : "max-w-[50%] max-h-[50%]"
                      : isZoomed
                      ? "max-w-[90%] max-h-[90%]"
                      : "max-w-[90%] max-h-[90%]"
                  }`}
                  style={{
                    transform: isZoomed
                      ? `translateY(${offsetY}px) scale(${
                          selectedImage === 0 ? 1.25 : 1.8
                        })`
                      : "translateY(0px) scale(1)",
                  }}
                  onError={(e) => (e.currentTarget.src = Images[0])}
                  draggable={false}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </AnimatePresence>

              {/* custom cursor */}
              {showCursor && (
                <div
                  className="hidden fixed md:flex items-center justify-center w-9 h-9 rounded-full bg-black bg-opacity-30 pointer-events-none"
                  style={{
                    top: cursorPos.y - 24,
                    left: cursorPos.x - 24,
                  }}
                >
                  <span className="text-white text-xl font-light">
                    {isZoomed ? "−" : "+"}
                  </span>
                </div>
              )}
            </div>

            {/* Right Arrow */}
            {selectedImage < Images.length - 1 && (
              <button
                className="hidden md:block absolute right-10 text-black"
                onClick={nextImage}
                aria-label="Next"
              >
                <ChevronRightIcon className="w-8 h-8 md:w-10 md:h-10" />
              </button>
            )}

            {/* Dots */}
            <div className="absolute bottom-6 flex gap-2">
              {Images.map((_, idx) => (
                <span
                  key={idx}
                  onClick={() => {
                    setSelectedImage(idx);
                    setIsZoomed(false);
                  }}
                  className={`w-2 h-2 rounded-full cursor-pointer ${
                    selectedImage === idx ? "bg-gray-300" : "bg-black"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default ProductDetails;