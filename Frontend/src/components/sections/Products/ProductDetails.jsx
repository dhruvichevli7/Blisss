import { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import SOB1 from "@/assets/images/SOB.png";
import SOB2 from "@/assets/images/SOB_hover.png";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Images = [SOB1, SOB2];

function ProductDetails() {
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

  const decrease = () => {
    setQuantity((p) => (p > 1 ? p - 1 : 1));
  };

  const increase = () => {
    setQuantity((p) => p + 1);
  };

  useEffect(() => {
    Images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = isModelOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModelOpen]);

  useEffect(() => {
    if (!isModelOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && selectedImage > 0) {
        prevImage();
      } else if (e.key === "ArrowRight" && selectedImage < Images.length - 1) {
        nextImage();
      } else if (e.key === "Escape") {
        setIsModelOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModelOpen, selectedImage]);

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
            <span>Home / All Products / Sex on the beach</span>
            <div className="hidden md:flex gap-2">
              <ChevronLeftIcon className="w-5 h-5 my-auto" />
              <span>Prev | Next</span>
              <ChevronRightIcon className="w-5 h-5 my-auto" />
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
                  alt="Sex On The Beach"
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
                {Images.map((_, idx) => (
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
                Zesty, fruity, and unapologetically fun — this tropical escape
                blends sun-ripened peach, tangy orange, and a splash of
                cranberry. Whether you’re sipping solo or stirring it up, it’s
                the taste of summer in every can.
              </p>
            </div>

            <div className="flex flex-col md:w-1/2 mt-6 md:mt-0">
              <h1 className="font-regular text-[1.6rem]">
                Sex on the beach
              </h1>
              <span className="font-regular text-xl my-6">
                ₹140.00
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
              <button className="w-full md:w-[24rem] h-10 bg-brown text-main font-light hover:underline my-5">
                Add To Cart
              </button>

              {/* Description */}
              <p className="flex md:hidden mb-6 text-sm leading-relaxed">
                Zesty, fruity, and unapologetically fun — this tropical escape
                blends sun-ripened peach, tangy orange, and a splash of
                cranberry. Whether you’re sipping solo or stirring it up, it’s
                the taste of summer in every can.
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
                      <p>No Added Sugar</p>
                      <p>Naturally Sweetened</p>
                      <p>Made with Real Juice (Reconstituted)</p>
                      <p>No Artificial Sweeteners</p>
                      <p>No Preservatives Added</p>
                      <p>No Artificial Colors or Flavors</p>
                      <p>Plant-Based / Vegan Friendly</p>
                      <p>Clean Label</p>
                      <p>Fat Free</p>
                      <p>Low Calorie</p>
                      <p>Hydrating</p>
                      <p>Rich in Vitamin C</p>
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