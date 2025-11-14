import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner1 from "../../../../assets/images/Banner1.png";
import Banner2 from "../../../../assets/images/Banner2.png";

function Banner() {

  const navigate = useNavigate();
  const storiesRef = useRef(null);
  const shopRef = useRef(null);

  const [storiesInView, setStoriesInView] = useState(false);
  const [shopInView, setShopInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === storiesRef.current && entry.isIntersecting) {
            setTimeout(() => {
              setStoriesInView(true);
            }, 2000);
          }
          if (entry.target === shopRef.current && entry.isIntersecting) {
            setTimeout(() => {
              setShopInView(true);
            }, 2000);
          }
        });
      },
      { threshold: 0.4 }
    );

    if (storiesRef.current) observer.observe(storiesRef.current);
    if (shopRef.current) observer.observe(shopRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="bg-main ">
        <div className="h-60 flex justify-center text-center items-center">
          <span className="font-fahkwang font-regular lg:text-[2.50rem] md:text-[2.25rem] text-[1.8rem] leading-snug">
            Sip and Indulge in Our Exquisite
            <br className="hidden md:block" />
            Mocktail Collection
          </span>
        </div>

        <div className="flex flex-col md:flex-row w-full">
          {/* Banner1 */}
          <div className="relative w-full md:w-1/2">
            <img src={Banner1} alt="Banner Image" className="w-full"/>
            <div
              ref={storiesRef}
              onClick={() => {navigate("/AboutUs")}}
              className="absolute bottom-14 w-[63%] h-11 left-0 overflow-hidden cursor-pointer"
            >
              <div
                className={`absolute inset-0 bg-[#e9e2cf] origin-left z-0 transform ${
                  storiesInView ? "animate-growFromLeft" : "scale-x-0"
                }`}
              ></div>
              <div
                className={`relative z-10 pl-10 pt-[0.5rem] h-full transition-opacity duration-700 delay-200 ${
                  storiesInView ? "opacity-100" : "opacity-0"
                } hover:bg-black hover:text-white`}
              >
                <span className="text-base font-fahkwang font-regular">
                  Know Our Stories
                </span>
              </div>
            </div>
          </div>

          {/* Banner2 */}
          <div className="relative w-full md:w-1/2">
            <img src={Banner2} alt="Banner Image" className="w-full" />
            <div
              ref={shopRef}
              onClick={() => navigate("/ShopUs")}
              className="absolute bottom-14 w-[63%] h-11 left-0 overflow-hidden cursor-pointer"
            >
              <div
                className={`absolute inset-0 bg-[#e9e2cf] origin-left z-0 transform ${
                  shopInView ? "animate-growFromLeft" : "scale-x-0"
                }`}
              ></div>
              <div
                className={`relative z-10 pl-10 pt-[0.5rem] h-full transition-opacity duration-700 delay-200 ${
                  shopInView ? "opacity-100" : "opacity-0"
                } hover:bg-black hover:text-white`}
              >
                <span className="text-base font-fahkwang font-regular">
                  Shop Now
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;
