import Footer from "../Components/Footer/Footer";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logOutAccount } from "../Redux/slice/authSlice";
function HomePageLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  function logoutHandler(e) {
    e.preventDefault();
    const response = dispatch(logOutAccount());
    if (response?.payload?.success){
      navigate("/");
    }

  }
  return (
    <div className=" h-full bg-gradient-to-r from-violet-200 to-pink-200  ">
      {/* drawer  */}
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content absolute ">
          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            className="btn bg-transparent hover:bg-transparent border-none p-2"
          >
            <FiMenu size={"25px"} />
          </label>
        </div>
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-40 min-h-full bg-base-200 text-base-content ">
            {/* Sidebar content here */}
            <li>
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn && role == "admin" && (
              <li>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              </li>
            )}
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}
            {isLoggedIn ? ( <li>
               <button onClick={logoutHandler}>LogOut</button>
             </li>): (
              <div>
               <li>
               <Link to="/login" >LogIn</Link>
             </li>
              <li>
                <Link to="/signup" >SignUp</Link>
              </li>
              </div>
            )}
          </ul>
        </div>
      </div>
      {/* drawer end s */}

      <div>{children}</div>
      <div className="relative  my-0 left-0 bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}
export default HomePageLayout;
