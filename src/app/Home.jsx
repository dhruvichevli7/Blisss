import Banner from "../components/sections/LandingPage/Banner/Banner";
import Toppicks from "../components/sections/LandingPage/TopPicks/Toppicks";
import Navbar from "../components/sections/Navbar/Navbar";
import Occassion from "../components/sections/LandingPage/Occassion";
import OurStory from "../components/sections/LandingPage/OurStory";
import Footer from "../components/sections/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Toppicks />
      <Occassion />
      <OurStory />
      <Footer/>
    </>
  );
}

export default Home;
