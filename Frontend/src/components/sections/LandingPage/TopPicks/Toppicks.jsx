import React, {useState} from "react";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
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

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={isHovered ? product.hoverImage : product.image}
        alt={product.name}
        className="w-[350px] h-[380px] transition-all duration-300 object-cover"
      />
      <div className="flex flex-col font-fahkwang font-regular md:text-[1.1rem] text-[1.3rem] mt-4">
        <span className="mb-1">{product.name}</span>
        <span>₹{product.price}</span>
      </div>
    </div>
  );
};

function Toppicks() {
  const products = [
    // { 
    //   name: "Sex on the beach", 
    //   price: 140.0, 
    //   image: SOB,
    //   hoverImage: SOBHover, 
    // },
    { 
      name: "Mojito", 
      price: 140.0, 
      image: Mojito,
      hoverImage: MojitoHover,
    },
    // { 
    //   name: "Pinacolada", 
    //   price: 140.0, 
    //   image: Pinacolada,
    //   hoverImage: PinacoladaHover, 
    // },
    { 
      name: "Cosmopolitan", 
      price: 140.0, 
      image: Cosmopolitan,
      hoverImage: CosmopolitanHover, 
    },
    // { 
    //   name: "Irish coffee", 
    //   price: 140.0, 
    //   image: Irish,
    //   hoverImage: IrishHover, 
    // },
    {
      name: "Sangria", 
      price: 140.0, 
      image: Sangria,
      hoverImage: SangriaHover, 
    },
  ];

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute left-0 -translate-x-full top-1/2 -translate-y-1/2 z-50 cursor-pointer"
      onClick={onClick}
    >
      <ChevronLeftIcon className="h-6 w-6 text-black font-regular" />
    </div>
  );

  const NextArrow = ({ onClick }) => (
    <div
      className="absolute right-0 translate-x-full top-1/2 -translate-y-1/2 z-50 cursor-pointer"
      onClick={onClick}
    >
      <ChevronRightIcon className="h-6 w-6 text-black" />
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className="my-14 w-[92%] mx-auto">
        <h1 className="text-[2.8rem] font-fahkwang font-normal">Top Picks</h1>

        <div className="relative px-4 sm:px-6 lg-px-8">
          {/* Slider */}
          <Slider {...settings}>
            {products.map((product, index) =>(

              <div
                key={index}
                className="flex mt-14 mx-auto justify-between px-4 cursor-pointer"
              >
                 <ProductCard product={product} />
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
}

export default Toppicks;
