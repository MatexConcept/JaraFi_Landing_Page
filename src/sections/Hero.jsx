import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { images } from "../constants";
import toast from "react-hot-toast";
import axios from "axios";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [success, setSuccess] = useState("");
  const [existingEmails, setExistingEmails] = useState([]);
  const sheetdbapi = import.meta.env.VITE_SHEET_DB;

  console.log(import.meta.env.VITE_SHEET_DB)

  const handleOpenModal = () => {
    window.document.body.classList.add("overflow-hidden");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    window.document.body.classList.remove("overflow-hidden");

    setIsModalOpen(false);
    setSubmitError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData(e.target);
    const name = formData.get("fullName");
    const email = formData.get("email");

  

    try {


      const firstResponse = await axios.post("https://jarafibackend.vercel.app/waitlist/join", {fullname:name, email}, {withCredentials: true})

      console.log({firstResponse})
      
      

      if (firstResponse.status === 201) {

        const response = await fetch(`https://sheetdb.io/api/v1/${sheetdbapi}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: [
              {
                name: name,
                email: email,
              },
            ],
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        handleCloseModal();
        setSuccess("You have been added to wait list successfully");
        toast.success("Thanks for joining our wait list we'll keep you updated");
      } 
     
    } catch (error) {
      console.error("Error:", error);
      toast.error(`${error.response.data.message}`);
      setSubmitError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-linen ">
      <div className="max-container min-h-16 pt-28  max-sm:pt-16 flex max-md:flex-col items-start justify-between gap-x-10 max-md:gap-y-9">
        <div className="flex flex-col  w-full max-sm:px-3.5 pl-4">
          <div className="max-md:space-y-4 space-y-10 flex flex-col">
            <h1 className="max-sm:text-3xl text-primary text-4xl font-bold font-MerriweatherSans">
              One App For All Your Crypto Needs.
            </h1>
            <p className="text-xl font-normal text-primary font-montserrat">
              Send crypto to anyone through their phone number.
            </p>
          </div>
          {success ? (
            <p className="text-base mt-2 italic text-green-600">{success}</p>
          ) : (
            <button
              onClick={handleOpenModal}
              className="self-start mt-24 max-md:mt-10 h-11 max-sm:w-full text-center border border-primary transition-all duration-500 hover:bg-whitesmoke rounded-lg text-primary text-base max-sm:text-center font-montserrat font-normal items-center py-3 px-7 ">
              Join waitlist here
            </button>
          )}
        </div>

        <div className="w-full ">
          <img
            className="max-md:hidden w-full h-auto object-cover"
            src={images.heroDesktop}
            alt="hero"
          />
          <img
            className="max-md:block hidden w-full h-auto object-cover"
            src={images.heroMobile}
            alt="hero"
          />
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      </div>
    </section>
  );
};

export default Hero;
