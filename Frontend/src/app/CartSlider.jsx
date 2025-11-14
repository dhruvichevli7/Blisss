import { useState } from "react";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import SOB from "@/assets/images/SOB.png";
import { GoTag } from "react-icons/go";
import { LockClosedIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

function CartSlider({ isOpen, onClose }) {
  const [quantity, setQuantity] = useState(3);
  const [showPromo, setShowPromo] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");

  const pricePerItem = 140;
  const subtotal = pricePerItem * quantity;
  const finalTotal = subtotal - discount; // ✅ Only show reduced total


  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const increase = () => setQuantity((q) => q + 1);

  const applyPromo = () => {
    // Example: Promo code "PROMO10" gives 10% off
    if (promoCode.trim().toUpperCase() === "PROMO10") {
      setDiscount(subtotal * 0.1);
      setError("");
    } else {
      setDiscount(0);
      setError("Promo code isn't valid.");
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-[26rem] px-4 font-fahkwang bg-main shadow-xl transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 mt-3">
          <h2 className="text-lg ">Cart ({quantity} items)</h2>
          <button onClick={onClose}>
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="border-b-[1px] border-black my-2"></div>

        <div className="p-4 space-y-4">
          <div className="flex justify-between">
            <div className="flex gap-5">
              <img src={SOB} alt="Sex on the Beach" className="w-20 h-28" />
              <div className="flex flex-col gap-3">
                <h3 className="text-base">Sex on the beach</h3>
                <span className="text-sm">₹{pricePerItem.toFixed(2)}</span>
                <div className="flex items-center border border-black px-4 py-1 space-x-4 w-24">
                  <button onClick={decrease} disabled={quantity === 1}>
                    -
                  </button>
                  <span>{quantity}</span>
                  <button onClick={increase}>+</button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10 items-end">
              <button className="">
                <TrashIcon className="w-5 h-5 text-gray-500" />
              </button>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 w-[95%] p-4 py-6 border-t">
          <div className="border-b-[1px] border-[#0003] my-6"></div>

          <div className="flex flex-col gap-4 text-brown mb-4">
            <div className="flex gap-2 items-center cursor-pointer"
            onClick={() => setShowPromo((prev) => !prev)}>
              <GoTag className="-scale-x-100" />
              <span>Enter a promo code</span>
            </div>

            {showPromo && (
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g.,SAVE50"
                      className={`border border-black bg-transparent w-64 px-2 py-2 text-sm ${
                        error ? "border-red-500" : "border-gray-400"
                      }`}
                    />
                    <button
                      onClick={applyPromo}
                      className="bg-brown text-main px-3 py-1 text-sm"
                    >
                      Apply
                    </button>
                  </div>
                  {error && (
                    <span className="text-red-500 text-sm">{error}</span>
                  )}
                </div>
              )}
          </div>

          <div className="border-b-[1px] border-[#0003] my-6"></div>

          <div className="flex justify-between mb-3 text-xl">
            <span>Estimated   </span>
            <span>₹{finalTotal.toFixed(2)}</span>
          </div>

          <span className="text-sm">
            Taxes and shipping are calculated at checkout.
          </span>
          <button className="w-full py-3 bg-brown text-main font-light hover:underline my-3 hover:bg-opacity-75">
            Checkout
          </button>
          <Link to="/CartPage" className="block text-center py-3 bg-transparent text-brown border border-brown font-light hover:underline">
            View Cart
          </Link>
          <div className="flex flex-row justify-center text-sm mt-3">
            <LockClosedIcon className="w-5 h-4" />
            <span>Secure Chekout</span>
          </div>
        </div>
      </div>
    </>
  );
}
export default CartSlider;
