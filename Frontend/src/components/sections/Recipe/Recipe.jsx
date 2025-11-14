import Banner from "../../../assets/images/RecipeBAnner.png";
import Berry from "../../../assets/images/BerryMint.png";
import Sunset from "../../../assets/images/Sunset.png";
import Coconut from "../../../assets/images/Coconut.png";
import Coffee from "../../../assets/images/Coffee.png";

function Recipe() {
  return (
    <>
      <section>
        <div className="srelative">
          <img
            src={Banner}
            alt="Banner Image"
            className="w-full h-[10rem] xs:h-[15rem] md:h-[28rem] object-cover"
          />
          <div className="hidden md:flex flex-col lg:w-2/3 md:w-3/4 px-10 lg:px-24 pt-12 md:absolute bg-main md:top-56 left-1/2 -translate-x-1/2 font-fahkwang border-b border-black">
            <span className="text-3xl md:text-5xl text-brown mb-8">
              Sip It Your Way: Blisss <br />
              Recipes
            </span>
            <p className="text-sm md:text-base mb-12">
              From instant chill to cocktail thrill—explore easy, exciting ways
              to mix, mash, and garnish your Blisss. Whether you're keeping it
              clean or kicking it up, our ready-to-drink mocktails are your base
              for bold creations.
            </p>
          </div>
        </div>
        {/* Separate Text for small screens */}
        <div className="flex flex-col md:hidden bg-main xs:px-20 px-6 py-10 font-fahkwang border-b border-black">
          <span className="text-3xl text-brown mb-6">
            Sip It Your Way: Blisss <br /> Recipes
          </span>
          <p className="text-base">
            From instant chill to cocktail thrill—explore easy, exciting ways to
            mix, mash, and garnish your Blisss. Whether you're keeping it clean
            or kicking it up, our ready-to-drink mocktails are your base for
            bold creations.
          </p>
        </div>

        <div className="bg-main h-10 md:h-20"></div>
      </section>

      {/* Berry Mojit */}
      <section className="bg-main">
        <div className="flex flex-col xl:flex-row items-center justify-evenly gap-14 mx-auto xl:py-20 pb-20 w-9/12 xl:w-3/5 border-b-[1px] border-black">
          <img
            src={Berry}
            alt="Berry Mint Mojito"
            className="w-[300px] xl:w-[378px] mx-auto"
          />
          <div className="flex flex-col font-fahkwang text-left">
            <span className="text-3xl text-left mb-5">Berry Mint Mojito</span>
            <span className="my-6">
              Ingredients: 1/2 can Blisss Mojito, Fresh Blueberries /
              Raspberries, Crushed Ice, Fresh Mint Leaves
            </span>
            <p>
              Muddle a handful of mint leaves and <br /> blueberries/raspberries
              in a glass. Fill the glass with crushed ice, pour in the Blisss
              Mojito, and stir gently. Garnish with a sprig of mint and a few
              whole blueberries.
            </p>
          </div>
        </div>
      </section>

      {/* Sunset Spritzer */}
      <section className="bg-main">
        <div className="flex flex-col-reverse xl:flex-row items-center justify-evenly gap-14 mx-auto py-20 w-9/12 xl:w-3/5 border-b-[1px] border-black">
          <div className="flex flex-col font-fahkwang">
            <span className="text-3xl text-left mb-10">Sunset Spritzer</span>
            <span className="my-6">
              Ingredients: 1 can Blisss Sex on the Beach, Soda Water, Orange
              Slice, Maraschino Cherry
            </span>
            <p>
              Fill a glass with ice. Pour in the Blisss Sex on the Beach and top
              with a splash of soda water. Stir gently. Garnish with an orange
              slice and a cherry.
            </p>
          </div>
          <img
            src={Sunset}
            alt="Sunset Spritzer"
            className="w-[300px] xl:w-[378px] mx-auto"
          />
        </div>
      </section>

      {/* Coconut Float */}
      <section className="bg-main ">
        <div className="flex flex-col xl:flex-row items-center justify-evenly gap-14 mx-auto py-20 w-9/12 xl:w-3/5 border-b-[1px] border-black">
          <img
            src={Coconut}
            alt="Creamy Coconut Float"
            className="w-[300px] xl:w-[378px] mx-auto"
          />
          <div className="flex flex-col font-fahkwang">
            <span className="text-3xl text-left mb-10">
              Creamy Coconut Float
            </span>
            <span className="my-6">
              Ingredients: 1 can Blisss Piña Colada, Splash of Coconut Milk,
              Vanilla Ice Cream
            </span>
            <p>
              Pour Blisss Piña Colada into a glass. Add a splash of coconut milk
              and a scoop of vanilla ice cream. Serve immediately with a spoon
              and straw.
            </p>
          </div>
        </div>
      </section>

      {/* Coffee Affogato */}
      <section className="bg-main pb-10">
        <div className="flex flex-col-reverse xl:flex-row items-center justify-evenly gap-14 mx-auto py-20 w-9/12 xl:w-3/5 border-b-[1px] border-black">
          <div className="flex flex-col font-fahkwang">
            <span className="text-3xl text-left mb-10">Coffee Affogato</span>
            <span className="my-6">
              Ingredients: 1/2 can Blisss Irish Coffee, Vanilla Ice Cream
            </span>
            <p>
              Scoop vanilla ice cream into a bowl or glass. Pour chilled Blisss
              Irish Coffee over the top. Serve immediately as a dessert.
            </p>
          </div>
          <img
            src={Coffee}
            alt="Coffee Affogato"
            className="w-[300px] xl:w-[378px] mx-auto"
          />
        </div>
      </section>
    </>
  );
}

export default Recipe;
