import Story from "../../../../assets/images/OurStory.png";

function OurStory() {
  return (
    <>
      <section className="bg-main flex w-full lg:flex-row flex-col-reverse">
        <div className="lg:w-1/2 w-full">
          <img src={Story} alt="Our Story" />
        </div>
        <div className="flex flex-col lg:w-1/2 mx-10 font-fahkwang lg:ml-14">
          <h1 className="font-regular text-[42px] lg:my-10 my-4">Our Story</h1>
          
          <div className="mission text-justify">
            <span className="text-[19px] font-medium">Our Mission</span>
            <p className="text-[15px] mt-3">
              The idea came to life when we realized that the world didn’t need
              another sugary soda or a bland, wellness drink. What it needed was
              a ready-to-drink mocktail — vibrant, flavorful, and made with real
              ingredients — that could be enjoyed on its own or effortlessly
              spiked into a cocktail. With Blisss, you’re in control of your
              experience.
              <br />
              Every can is crafted with plant-based ingredients, no added sugar,
              and absolutely no preservatives. It’s our promise to you: luxury
              without compromise. From sun-drenched beach days to late-night
              laughs with friends, Blisss was made for moments that matter. Our
              first flavors, brings a zesty and fruity escape, embodying
              everything we stand for — fun, freedom, and flavor.
            </p>
            <br />
            <p className="text-[15px]">
              Visually, Blisss is inspired by retro cocktail culture with a
              fresh, minimal twist. Our bold color palette and sleek design
              reflect our mission: to be bold, feel good, and live fully.
            </p>
          </div>

          <div className="vision lg:my-16 my-6">
            <span className="text-[19px] font-medium">Our Vision</span>
            <p className="text-[15px] mt-5">
              To redefine the global drinking culture by making Blisss the go-to
              choice for modern, health-conscious consumers seeking joy,
              connection, and choice — one sip at a time.
            </p>
          </div>

          <div className="team mb-6">
            <span className="text-[19px] font-medium">Meet Our Team</span>
            <p className="text-[15px] mt-3">
              Our team of mixologists and beverage experts are dedicated to
              creating unique and enticing mocktail flavors that redefine the
              art of mixology.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default OurStory;
