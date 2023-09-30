import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomePageLayout from "../Layouts/HomePageLayout";
import toast from "react-hot-toast";
import { loginAccount } from "../Redux/slice/authSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // states
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // input handler
  function inputHandler(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  async function onLogin(event) {
    event.preventDefault();

    // FORM VALIDATIONS
    if (!loginData.email || !loginData.password) {
      toast.error("please fill required data");
      return;
    }
   console.log(loginData);
    // dispatch
    const loginFormData = new FormData();
 
    loginFormData.append("email",loginData.email);
    loginFormData.append("password",loginData.password);
  console.log(loginFormData)
    const response = await dispatch(loginAccount(loginData));

    if (response?.payload?.success) navigate("/");
    if (!response?.payload?.success) 
    console.log(response)


    setLoginData({
      email: "",
      password: "",
    });
  }

  return (
    <HomePageLayout>
      <div className="h-[94vh]  flex flex-col justify-center  items-center">
        <form
          noValidate
          onSubmit={onLogin}
          className="flex flex-col w-72 rounded-md text-white
                   bg-slate-600 justify-center gap-y-2 items-start px-4 drop-shadow shadow-xl pb-2"
        >
          <h1 className="w-full text-center  font-semibold my-2">Login Page</h1>

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
            Login
          </button>
          <p className="text-[14px]">
            Doesn't Have an Account ? Signup{" "}
            <Link
              to="/signup"
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
export default LoginPage;
