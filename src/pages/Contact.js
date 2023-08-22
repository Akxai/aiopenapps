import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const Contact = () => {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const form = useRef();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    description: "",
  });

  const handleInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleShow = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const isFormValid = [...formData.entries()].every(
      ([name, value]) => value.trim() !== ""
    );

    if (isFormValid) {
      setSubmitted(true);
      setShow(true);

      emailjs
        .sendForm(
          "service_64zrjxk",
          "template_hbtns1a",
          form.current,
          "7CwVdhzNdg55HbkG_"
        )
        .then((result) => {
          console.log(result.text);
          form.current.reset();
        })
        .catch((error) => {
          console.log(error.text);
        });
    } else {
      setSubmitted(true);
      setShow(false);
    }

    const newData = {
      ...inputs,
      order: 0,
    };
    try {
      addDoc(collection(db, "contact"), newData);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  return (
    <div className="mt-32 mb-16 lg:px-[20%] md:px-[20%] px-[3%]">
      <p className="text-center my-4 font-mont text-white font-semibold text-[30px] md:text-[40px] lg:text-[40px] mt-6">
        Contact Us
      </p>
      <form ref={form} onSubmit={handleShow} className="w-full">
        <div className="bg-[#7364F4] py-7 px-4 lg:px-[5%] md:px-[5%] flex flex-col space-y-5 rounded-xl font-mont">
          <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-4">
            <div className="w-full flex flex-col space-y-1 lg:w-1/2">
              <label
                for="name"
                className="text-white lg:text-[20px] md:text-[20px] text-[16px] font-semibold"
              >
                Name
              </label>
              <input
                id="name"
                className="w-full rounded-lg py-4 px-2 outline-none"
                type="text"
                name="name"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-full flex flex-col space-y-1 lg:w-1/2">
              <label
                for="email"
                className="text-white lg:text-[20px] md:text-[20px] text-[16px] font-semibold"
              >
                Email
              </label>
              <input
                id="email"
                className="w-full rounded-lg py-4 px-2 outline-none"
                type="email"
                name="email"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <label
              for="message"
              className="text-white lg:text-[20px] md:text-[20px] text-[16px] font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              id="message"
              className="w-full rounded-lg py-4 px-2 outline-none resize-none"
              rows="8"
              name="message"
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex justify-end items-center lg:w-auto w-full">
              {submitted && show && (
                <div className="w-full">
                  <p className="text-white text-[16px] text-center font-mont font-semibold">
                    Thank you for contacting us!
                  </p>
                </div>
              )}
            </div>
            <div className="mt-3 lg:mt-0">
              <button
                type="submit"
                className="w-full lg:w-auto flex justify-center lg:justify-end lg:text-[18px] md:text-[18px] text-[16px] font-semibold bg-white px-8 py-3 rounded-xl shadow-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contact;
