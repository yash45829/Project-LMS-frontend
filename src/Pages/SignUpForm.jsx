import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomePageLayout from "../Layouts/HomePageLayout";
import { BsPersonCircle } from "react-icons/bs";
// import {AiOutlineUpload} from "react-icons/ai";
function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    avatar: "",
  });

  function inputHandler(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function getImage (event){
    event.preventDefault();

    const uploadImage = event.target.files[0];

    if(uploadImage){
        setFormData(
            {
                ...formData,
                avatar : uploadImage
            }
        );

        const fileReader = new FileReader();

        fileReader.readAsDataURL(uploadImage);
        fileReader.addEventListener("load", function(){
            setPreviewImage(this.result)
        })
    }
  }
  return (
    <HomePageLayout>
      <div className="h-[94vh]  flex flex-col justify-center  items-center">
        <form
          className="flex flex-col w-78 rounded-md bg-gradient-to-r
                   bg-zinc-700 justify-center gap-y-2 items-start px-4 drop-shadow shadow-xl pb-2"
        >
          <h1 className="w-full text-center text-xl font-semibold my-2">
            SignUp Here
          </h1>
          <label htmlFor="image_upload" className="w-fit mx-auto ">
            {previewImage ? (
              <img src={previewImage} alt="img" srcSet={previewImage} className="w-20 h-20 rounded-full mx-auto "/>
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
           <div className="flex flex-col w-full">
          <label htmlFor="fullname" className="text-[18px]">
            Name
          </label>
          <input
            type="text"
            name="fullname"
            required
            placeholder="Enter your name.."
            id="fullname"
            className="rounded-md w-full focus:outline-0 px-2 py-1  focus:drop-shadow-lg"
            onChange={inputHandler}
          />
</div>
<div className="flex flex-col w-full">

          <label htmlFor="email" className="text-[18px]">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            autoComplete="off"
            placeholder="Enter your email.."
            id="email"
            className="rounded-md w-full px-2 py-1 focus:outline-0 focus:drop-shadow-lg"
            onChange={inputHandler}
          />
          </div>
           <div className="flex flex-col w-full">

          <label htmlFor="password" className="text-[18px]">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            placeholder="Enter password.."
            id="password"
            className="rounded-md w-full px-2 py-1 focus:outline-0 focus:drop-shadow-lg"
            onChange={inputHandler}
          />
</div>
          <button
            type="submit"
            className="w-full bg-green-600 rounded-lg my-2 py-1 px-4 text-white text-xl hover:bg-opacity-90"
          >
            Submit
          </button>
          <p>
           Already Have an Account ? Login{" "}
            <Link
              to="/login"
              className="
                 text-bborder-l-blue-800 link "
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
