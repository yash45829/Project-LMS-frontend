import { useState } from "react";
import HomePageLayout from "../Layouts/HomePageLayout";
import axiosInstance from "../Helpers/axiosInstance";
import toast from "react-hot-toast";

function Contactpage() {
  // input initial state
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // input handler
  function onInputHandler(e) {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  }

  // submit button handler
  async function onSubmit(e) {
    e.preventDefault();
    // server api call
    try {
      const res = axiosInstance.post("miscellaneous/contact", inputData);
      toast.promise(res, {
        loading: " in progress",
        success: (res) => {
          return res.data.message;
        },
        error: "error not submit",
      });
      // set input to initial state
      setInputData({
        name: "",
        email: "",
        message: "",
      });
      return (await res).data;
    } catch (error) {
      return error.message;
    }
  }

  return (
    <HomePageLayout>
      <div className="h-[94vh]  flex flex-col justify-center  items-center">
        <form
          noValidate
          onSubmit={onSubmit}
          className="flex flex-col w-72 rounded-md text-white
                   bg-slate-600 justify-center gap-y-2 items-start px-4 drop-shadow shadow-xl pb-2"
        >
          <h1 className="w-full text-center  font-semibold my-2">
            Contact Form
          </h1>
          {/* name  */}
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="text-[16px]">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              autoComplete="off"
              placeholder="Enter your name.."
              id="name"
              value={inputData.name}
              className="rounded-md w-full px-2 py-0.5  text-black focus:outline-0 focus:drop-shadow-lg"
              onChange={onInputHandler}
            />
          </div>
          {/* email  */}
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-[16px]">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter email.."
              id="email"
              value={inputData.email}
              className="rounded-md w-full px-2 py-0.5  text-black focus:outline-0 focus:drop-shadow-lg"
              onChange={onInputHandler}
            />
          </div>
          {/* message  */}
          <div className="flex flex-col w-full">
            <label htmlFor="message" className="text-[16px]">
              Message
            </label>
            <textarea
              name="message"
              required
              placeholder="Enter message.."
              id="message"
              value={inputData.message}
              className="rounded-md w-full  px-2 py-0.5  h-36 resize-none text-black focus:outline-0
              last:focus:drop-shadow-lg"
              onChange={onInputHandler}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 rounded-lg my-2 py-0.5 text-align-center px-4  text-white text-xl hover:bg-opacity-90"
          >
            Submit
          </button>
        </form>
      </div>
    </HomePageLayout>
  );
}

export default Contactpage;
