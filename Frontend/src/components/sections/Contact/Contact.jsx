import ContactBanner from "../../../assets/images/ContactBanner.png";

function Contact() {
  
  const socialLinks = [
    { name: "Instagram", url: "https://instagram.com/yourhandle" },
    { name: "Whatsapp", url: "https://chat.whatsapp.com/your-community-id" },
  ];

  return (
    <>
      <section className="bg-cream lg:py-10 font-fahkwang">
        <div className="flex lg:flex-row lg:w-[88%] w-full flex-col-reverse bg-main mx-auto mb-10 overflow-hidden">
          <img
            src={ContactBanner}
            alt="Image"
            className="lg:w-[410px] w-full lg:h-[346px] h-auto object-cover"
          />
          <div className="flex flex-col justify-center font-fahkwang px-6 lg:px-28 py-8 lg:py-12 text-left">
            <span className="text-[40px] lg:text-[56px] text-brown mb-6 lg:mb-10">Say Hello</span>
            <p className="text-base lg:w-3/4 mx-auto lg:mx-0">
              This is your Contact section paragraph. Encourage your reader to
              reach out with any questions, comments or to take a different
              action specific to your site. You can also click on the contact
              form to customize the fields.
            </p>
          </div>
        </div>

        {/* Address and form */}
        <div className="flex flex-col lg:flex-row bg-main lg:w-[88%] w-full mx-auto justify-between lg:justify-evenly p-6 lg:p-10 gap-10">
          <div className="flex flex-col text-[20px] lg:text-[26px] leading-[1.8] text-left">
            <div className="flex flex-col font-fahkwangs">
              <span>
                Plot No. 1064, Road No.86,  <br /> Sachin GIDC, Surat. <br /> 394230
              </span>
            </div>
            <div className="flex flex-col font-fahkwang py-8 lg:py-12 items-start">
              <div className="border-black border-b-[0.2px] w-16 mb-8 lg:mb-14"></div>
              {/* <span>
                Phone <br /> 123-456-7890 <br />
              </span> */}
              <span className="mt-4">
                Email <br /> blisssworld9@gmail.com
              </span>
            </div>
          </div>

          {/* Form */}
          <form className="flex flex-col text-sm font-light gap-5 w-full lg:w-[50%]">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="form flex flex-col w-full sm:w-1/2">
                <label htmlFor="fname">First Name</label>
                <input
                  type="text"
                  name="fname"
                  className="bg-transparent border-[1px] border-black h-9 mt-2 hover:border-2 px-2"
                />
              </div>

              <div className="form flex flex-col w-full sm:w-1/2">
                <label htmlFor="lname">Last Name</label>
                <input
                  type="text"
                  name="lname"
                  className="bg-transparent border-[1px] border-black h-9 mt-2 hover:border-2 px-2"
                />
              </div>
            </div>

            <div className="form flex flex-col">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                name="email"
                className="bg-transparent border-[1px] border-black h-9 mt-2 hover:border-2 px-2"
              />
            </div>

            <div className="form flex flex-col">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id=""
                rows="4"
                className="bg-transparent border-[1px] border-black mt-2 hover:border-2 px-2 py-2"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-brown text-white h-9 hover:bg-transparent hover:border-[1px] hover:border-brown hover:text-brown transition-all duration-300"
            >
              Send
            </button>
          </form>
        </div>

        {/* map */}
        <div className="w-full h-72 md:h-full overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.5293837630543!2d72.8422465751451!3d21.17111918051406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e3145437eeb%3A0x59f78486eed7054!2s86%2C%20Rd%20No%208%2C%20Udhana%20GIDC%2C%20Udhna%20Udhyog%20Nagar%2C%20Udhana%2C%20Surat%2C%20Gujarat%20394210!5e0!3m2!1sen!2sin!4v1776412489087!5m2!1sen!2sin"
            className="lg:w-[88%] w-full h-80 mx-auto my-12"
            data-aos="fade"
            data-aos-delay="300"
            data-aos-duration="3000"
          ></iframe>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:mt-0 mt-10 bg-main lg:w-[88%] w-full lg:h-32 h-auto mx-auto text-2xl cursor-pointer">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="m-auto py-4 w-full h-full flex items-center justify-center hover:text-brown transition-colors duration-300"
            >
              {social.name}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

export default Contact;
