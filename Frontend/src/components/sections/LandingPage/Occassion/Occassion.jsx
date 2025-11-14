import React, {useEffect, useState, useRef} from 'react';
import BarTender from "../../../../assets/images/Occassion.png";
import { Navigate, useNavigate } from 'react-router-dom';

function Occassion() {

  const buttonRef = useRef(null);
  const[inView, setInView] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        if(entry.isIntersecting){
          setInView(true);
          observer.disconnect();
        }
      },
      {threshold : 0.3}
    );

    if(buttonRef.current){
      observer.observe(buttonRef.current);
    }
    return()=> observer.disconnect();
  }, []);
 
  return (
    <>
      <section className="flex lg:flex-row flex-col w-full bg-cream lg:pb-0 pb-10">
        <div className="flex flex-col lg:w-4/5 w-full text-center lg:my-auto font-fahkwang md:mb-0 my-8">
          <span className="font-medium text-brown md:text-[2.5rem] sm:text-[2rem] text-[1.3rem] mb-3">
            For Every Occasion
          </span>
          <p className="mx-16 text-center md:text-[15px] sm:text-[12px] text-[8px] md:mb-12 mb-6">
            Discover how to enjoy Blisss your way—whether as a refreshing
            ready-to-drink mocktail or a bold DIY cocktail. From low-calorie
            drink recipes to easy cocktail mixers and Instagram-worthy
            garnishes, our Blisss Recipes hub has everything you need to sip,
            mix, and elevate your vibe. Perfect for parties, chill nights, or
            guilt-free solo sipping.
          </p>
          <span className="text-[0.9rem]">Get Yours Now</span>
          <div ref={buttonRef} className="md:w-[20rem] w-[15rem] md:h-[3rem] h-[2rem] mx-auto relative inline-block overflow-hidden mt-3 group">

            <div className={`absolute left-0 top-0 h-full w-full bg-brown z-0 origin-left ${inView ? "scale-x-0 animate-growFromLeft" : "scale-x-0" } `}></div>

            <button 
              className={`relative z-10 md:px-20 px-8 md:py-3 py-2 text-white font-fahkwang font-[300] md:text-sm text-[0.8rem] opacity-0 ${inView ? "animate-fadeIn delay-200" : ""}`}
              onClick={()=>navigate("/Recipes")}
              >
              Know your recipes
            </button>
          </div>
        </div>
        <div className="lg:w-5/12 w-4/5 mx-auto">
          <img src={BarTender} alt="Bar Tender"/>
        </div>
      </section>
    </>
  );
}

export default Occassion;
