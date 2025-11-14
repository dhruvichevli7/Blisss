import About1 from "../../../assets/images/About1.png";
import About2 from "../../../assets/images/About2.png";

function About() {
  return (
    <>
      <section className="bg-main">
        <div className="flex flex-col font-fahkwang items-center py-20 text-center">
          <span className="hidden md:block md:text-xl text-lg">
            Elevate Your Beverage Experience with Blisss
          </span>
          <h2 className="text-[40px] md:text-[56px] text-brown mb-2">
            Welcome to Blisss
          </h2>
          <span className="block md:hidden text-lg mt-3 leading-snug">
            Elevate Your Beverage <br /> Experience with Blisss
          </span>
          <span className="text-2xl mt-10">Our Story</span>
        </div>

        <div className="md:border-[1px] border-t-[1px] border-black">
          <div className="flex flex-col md:flex-row md:border-b-2 border-black">
            <img
              src={About1}
              alt="Crafting Exquisite Beverages"
              className="w-full md:w-1/2 md:border-r-[1px] border-b-[1px] border-black object-cover"
            />
            <div className="flex flex-col bg-main px-6 md:px-16 lg:px-28 py-10 m-auto items-center font-fahkwang text-center">
              <span className="text-[28px] md:text-[38px] text-brown mb-6 md:mb-8">
                Crafting Exquisite Beverages
              </span>
              <p className="text-base leading-relaxed">
                To craft bold, feel-good, ready-to-drink mocktails that bring
                people together through flavor, flexibility, and freedom —
                whether enjoyed alcohol-free or spiked. Blisss exists to elevate
                every occasion with clean ingredients, luxurious taste, and
                uncompromising fun.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col bg-main w-full md:w-1/2 px-6 md:px-16 lg:px-28 py-10 m-auto items-center font-fahkwang text-center order-2 md:order-1">
              <span className="text-[28px] md:text-[38px] text-brown mb-6 md:mb-8">
                Our Commitment to Excellence
              </span>
              <p className="text-base leading-relaxed">
                At Blisss, we believe that indulgence should never come at the
                expense of quality or wellness. Every can we craft is a
                reflection of our unwavering dedication to clean, plant-based
                ingredients, with no added sugar, no preservatives, and no
                compromises. Whether enjoyed as a ready-to-drink mocktail or
                elevated with a spirit of your choice, Blisss is designed to
                deliver a luxurious flavor experience that suits every mood and
                moment. We’ve reimagined the cocktail culture to be more
                inclusive, effortless, and guilt-free — for drinkers and
                non-drinkers alike.
              </p>
            </div>
            <img
              src={About2}
              alt="Image"
              className="w-full md:w-1/2 md:border-l-[1px] border-b-[1px] border-black object-cover order-1 md:order-2"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
