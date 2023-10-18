import { useSelector } from "react-redux";
import HomePageLayout from "../../Layouts/HomePageLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";

function ProfilePage() {
    const userData = useSelector(state => state?.auth?.data);
    const navigate = useNavigate();
    
console.log(userData)
//   const secure_url = false;
  // const subscription = false;

  
  return (
    <HomePageLayout>
      <div className=" min-h-[100vh] flex justify-center items-center font-poppins">
        <div className="shadow-2xl min-h-[200px] w-fit py-4  shadow-blue-900 rounded-2xl bg-gradient-to-bl flex flex-col justify-start items-center gap-y-4">
          <div>
            {userData.avatar.secure_url !== "" ? (
              <img src={userData.avatar.secure_url} alt="" className="w-28 h-28 rounded-full" />
            ) : (
              <BsPersonCircle className=" w-24 h-24 " />
            )}
          </div>

          <h1 className="text-xl font-semibold">{userData.firstname}</h1>
          <div className="grid grid-cols-5 w-full px-2  gap-4">
            <h1 className="  font-semibold col-span-2 ">Email : </h1>
            <span className="font-semibold col-span-3 text-orange-600">
              {" "}
              { userData.email}
            </span>
          </div>
          <div className="grid grid-cols-5 w-full px-2  gap-4">
            <h1 className="  font-semibold col-span-2 ">Role : </h1>
            <span className="font-semibold col-span-3 text-orange-600">
              {" "}
              {userData.role}
            </span>
          </div>
          <div className="grid grid-cols-5 w-full px-2  gap-4">
            <h1 className="  font-semibold col-span-2 ">Subscripton : </h1>
            <span className="font-semibold col-span-3  text-orange-600">
              {" "}
              {userData.subscription == "active" ? 'active' : 'inactive'}
            </span>
          </div>
          <div className="grid grid-cols-2  w-full px-2 gap-1">
            <button className="text-center  font-semibold py-1 px-2 bg-orange-400 rounded-sm hover:bg-orange-500 hover:drop-shadow-md">
              Change Password
            </button>
            <Link to="/user/edit">
            <button  className="text-center w-full  font-semibold py-1 px-2 bg-orange-400 rounded-sm hover:bg-orange-500 hover:drop-shadow-md">
              Edit Profile
            </button>
            </Link>
          </div>
          {userData.subscription == "active" && (
            <button
              className="text-center  font-semibold text-white py-1 
            px-2 bg-red-600 rounded-sm hover:bg-red-700 hover:drop-shadow-md"
            >
              {" "}
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomePageLayout>
  );
}

export default ProfilePage;
