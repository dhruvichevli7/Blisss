import { useState } from "react";
import SOB from "@/assets/images/SOB.png";
import { TrashIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { GoTag } from "react-icons/go";
import { LockClosedIcon } from "@heroicons/react/16/solid";

function Cart() {
  const [Quantity, setQuantity] = useState(1);
  const [showPromo, setShowPromo] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");

  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState("");

  const pricePerItem = 140;
  const subtotal = pricePerItem * Quantity;
  const total = subtotal - discount;

  const decrease = () => {
    setQuantity((p) => (p > 1 ? p - 1 : 1));
  };

  const increase = () => {
    setQuantity((p) => p + 1);
  };

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
      <section className="bg-main font-fahkwang pt-16 pb-10 px-4 sm:px-8">
        <div className="flex flex-col md:flex-row m-auto w-full md:w-2/3 gap-10 md:gap-16">
          {/* Left part  */}
          <div className="flex flex-col w-full md:w-3/5">
            <span className="text-xl sm:text-2xl mb-2">My Cart</span>

            <div className="border-b-[1px] border-[#0003] my-6"></div>

            <div className="flex flex-row justify-between items-start flex-wrap sm:flex-nowrap gap-4 sm:gap-8">
              <img
                src={SOB}
                alt="Sex On The Beach"
                className="h-32 w-[100px] object-cover"
              />
              <div className="flex flex-col gap-3 text-[16px] flex-grow min-w-[120px]">
                <h3>Sex on the beach</h3>
                <span>₹{pricePerItem.toFixed(2)}</span>
              </div>
              <div className="flex items-center w-20 h-7 border border-black px-3 space-x-2 font-extralight mb-6">
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
              <div className="flex items-center justify-between sm:justify-start gap-2">
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <button className="flex">
                <TrashIcon className="w-6 h-5 text-[#0009] stroke-[1.2]"/>
              </button>
            </div>

            <div className="border-b-[1px] border-[#0003] my-6"></div>

            <div className="flex flex-col gap-4 text-brown mb-4">
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => setShowPromo((prev) => !prev)}
              >
                <GoTag className="-scale-x-100" />
                <span>Enter a promo code</span>
              </div>

              {showPromo && (
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g.,SAVE50"
                      className={`border border-black bg-transparent w-full sm:w-64 px-2 py-2 text-sm ${
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

            <div className="flex flex-col gap-4 text-brown">
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => setShowNote((prev) => !prev)}
              >
                <DocumentIcon className="w-4" />
                <span>Add a note</span>
              </div>

              {showNote && (
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g., Leave outside the front door"
                  className="border border-black bg-transparent px-2 py-2 text-main w-full sm:w-96 h-24 placeholder-black focus:outline-none focus:ring-0 caret-black"
                  />
              )}
            </div>
          </div>

          {/* Right Part */}
          <div className="flex flex-col w-full md:w-2/5 mt-8 md:mt-0">
            <span className="text-lg sm:text-xl">Order Summary</span>
            <div className="border-b-[1px] border-[#0003] my-6"></div>
            <div className="flex flex-col gap-3 text-base">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-black-600">
                  <span>Discount</span>
                  <div className="flex flex-row gap-5">
                    <span>-</span>
                    <span>₹{discount.toFixed(2)}</span>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>Free</span>
              </div>
              <span className="text-sm text-gray-700">Gujarat,India</span>
              <div className="border-b-[1px] border-[#0003] my-3"></div>
              <div className="flex justify-between text-xl">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button className="h-10 bg-brown text-main font-light hover:underline my-6">
              Checkout
            </button>

            <div className="flex flex-row justify-center items-center gap-1 text-sm">
              <LockClosedIcon className="w-5 h-4" />
              <span>Secure Chekout</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;