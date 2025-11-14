import Logo from "../../../assets/icons/logo.png";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { BiCopyright } from "react-icons/bi";

function Footer() {
  return (
    <>
      <footer className="bg-cream">
        <div
          className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-0 gap-14 justify-between p-16 font-fahkwang"
          data-aos="fade"
          data-aos-delay="300"
          data-aos-duration="3000"
        >
          <div className="logo  order-1">
            <img src={Logo} alt="Blisss Logo" className="w-32 h-12" />
          </div>

          <div className="flex flex-col order-3 lg:order-2">
            <span>123-456-7890</span>
            <span>info@mysite.com</span>
            <span className="my-4 ">India</span>

            <div className="border-b-[1px] border-black mt-4 mb-8 w-[12rem]"></div>

            <div className="flex space-x-4">
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
                <FaInstagram className="" />
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white p-1 rounded-full transition"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div className="flex flex-col lg:order-3 order-2">
            <h3 className="mb-5 text-xl font-medium">Privacy Policy</h3>
            <span>
              Terms & conditions
            </span>
          </div>

          <div className="flex flex-col order-4">
            <span className="mb-6 text-xl font-medium">
              Stay Connected with BLISSS
            </span>
            <form className="form">
              <div className="flex flex-col">
                <label htmlFor="email" className="text-brown mb-3">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-transparent"
                />
              </div>
              <div className="border-b-[1px] border-black mt-4 mb-8 sm:w-[20rem] w-[18rem]"></div>
              <div className="my-6 flex flex-row">
                <input
                  type="checkbox"
                  name=""
                  className="w-4 h-4 my-auto cursor-pointer bg-transparent border border-black rounded-none focus:ring-0 checked-border-black appearance-none checked:after:content-['✔'] checked:after:text-black checked:after:text-xs checked:after:block checked:after:text-center"
                />
                <label htmlFor="" className="ml-3">
                  Yes, subscribe me to your <br /> newsletter. *
                </label>
              </div>
              <input
                type="submit"
                value="Subscribe"
                className="sm:w-[20rem] w-[12rem] h-10 cursor-pointer bg-brown text-white font-light text-[0.93rem] hover:bg-transparent hover:border hover:border-brown hover:text-brown "
              />
            </form>
          </div>
        </div>

        <div
          className="flex space-x-1 items-center sm:p-16 pb-4 font-fahkwang font-normal text-[0.83rem]"
          data-aos="fade"
          data-aos-delay="300"
          data-aos-duration="3000"
        >
          <BiCopyright className="text-[0.8rem] opacity-60" />
          <span>2035 by Blisss. Powered and secured by</span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
