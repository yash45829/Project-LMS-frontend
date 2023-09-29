import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomePageLayout from "../Layouts/HomePageLayout";
import { BsPersonCircle } from "react-icons/bs";
import toast from "react-hot-toast";
import { createAccount } from "../Redux/slice/authSlice";
// import { Tooltip } from "react-tooltip";
// import {AiOutlineUpload} from "react-icons/ai";

function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // states
  const [previewImage, setPreviewImage] = useState("");
  const [signUpFormData, setSignUpFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    avatar: "",
  });

  // input handler
  function inputHandler(e) {
    const { name, value } = e.target;
    setSignUpFormData({
      ...signUpFormData,
      [name]: value,
    });
  }

  // image input handler
  function getImage(event) {
    event.preventDefault();

    const uploadImage = event.target.files[0];

    if (uploadImage) {
      setSignUpFormData({
        ...signUpFormData,
        avatar: uploadImage,
      });

      const fileReader = new FileReader();

      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  async function createNewAccount(event) {
    event.preventDefault();

    // FORM VALIDATIONS
    if (
      !signUpFormData.fullname ||
      !signUpFormData.email ||
      !signUpFormData.password
    ) {
      toast.error("please fill all required data.");
      return;
    }

    if (signUpFormData.fullname.length < 5) {
      toast.error("name should be atleast of 5 characters.");
      return;
    }

    if (
      !signUpFormData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("enter valid email.");
      return;
    }

    if (
      !signUpFormData.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ) {
      toast.error(
        "password should be of atleast 8 characters long and contain atleast one number and one special character"
      );
      return;
    }

    //  CREATING FORM DATA TO SEND TO BACKEND SERVER
    const formData = new FormData();
    formData.append("firstname", signUpFormData.fullname);
    formData.append("email", signUpFormData.email);
    formData.append("password", signUpFormData.password);
    formData.append("avatar", signUpFormData.avatar);

    // dispatch
    const response = await dispatch(createAccount(formData));

    if (response?.payload?.success) navigate("/");

    setSignUpFormData({
      fullname: "",
      email: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");
  }

  return (
    <HomePageLayout>
      <div className="h-[94vh]  flex flex-col justify-center  items-center">
        <form
          noValidate
          onSubmit={createNewAccount}
          className="flex flex-col w-72 rounded-md text-white
                   bg-slate-600 justify-center gap-y-2 items-start px-4 drop-shadow shadow-xl pb-2"
        >
          <h1 className="w-full text-center  font-semibold my-2">
            SignUp Here
          </h1>
          <label
            htmlFor="image_upload"
            className="w-fit mx-auto "
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="img"
                srcSet={previewImage}
                className="w-20 h-20 rounded-full mx-auto "
              />
            ) : (
              <BsPersonCircle className="w-16 h-16 mx-auto cursor-pointer" />
            )}
          </label>
          <input
            type="file"
            name="image_upload"
            id="image_upload"
            className="hidden cursor-pointer"
            accept=".png , .jpg ,.svg , .jpeg"
            onChange={getImage}
          />
          {/* name input  */}
          <div className="flex flex-col w-full">
            <label htmlFor="fullname" className="text-[16px]">
              Name
            </label>
            <input
              type="text"
              name="fullname"
              required
              placeholder="Enter your name.."
              id="fullname"
              className="rounded-md w-full focus:outline-0 px-2 py-0.5 text-black focus:drop-shadow-2xl "
              onChange={inputHandler}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-[16px]">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              autoComplete="off"
              placeholder="Enter your email.."
              id="email"
              className="rounded-md w-full px-2 py-0.5  text-black focus:outline-0 focus:drop-shadow-lg"
              onChange={inputHandler}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="password" className="text-[16px]">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter password.."
              id="password"
              className="rounded-md w-full px-2 py-0.5  text-black focus:outline-0 focus:drop-shadow-lg"
              onChange={inputHandler}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 rounded-lg my-2 py-0.5 text-align-center px-4 text-white text-xl hover:bg-opacity-90"
          >
            Submit
          </button>
          <p className="text-[14px]">
            Already Have an Account ? Login{" "}
            <Link
              to="/login"
              className="
                 text-bborder-l-blue-800 link link-accent "
            >
              Here
            </Link>
          </p>
        </form>
      </div>
    </HomePageLayout>
  );
}
export default SignUpForm;
