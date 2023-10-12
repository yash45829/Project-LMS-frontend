import HomePageLayout from "../../Layouts/HomePageLayout";
import { BsPersonCircle } from "react-icons/bs";

function ProfilePage() {
  const secure_url = false;
  const subscription = true;
  return (
    <HomePageLayout>
      <div className=" min-h-[100vh] flex justify-center items-center font-poppins">
        <div className="shadow-2xl min-h-[200px] w-fit py-4  shadow-blue-900 rounded-lg bg-gradient-to-bl flex flex-col justify-start items-center gap-y-4">
          <div>
            {secure_url == true ? (
              <img src="" alt="" className="" />
            ) : (
              <BsPersonCircle className=" w-24 h-24 " />
            )}
          </div>

          <h1 className="text-xl font-semibold">Yash</h1>
          <div className="grid grid-cols-5 w-full px-2  gap-4">
            <h1 className="  font-semibold col-span-2 ">Email : </h1>
            <span className="font-semibold col-span-3 text-orange-600">
              {" "}
              yash45829@gmail.com
            </span>
          </div>
          <div className="grid grid-cols-5 w-full px-2  gap-4">
            <h1 className="  font-semibold col-span-2 ">Role : </h1>
            <span className="font-semibold col-span-3 text-orange-600">
              {" "}
              User
            </span>
          </div>
          <div className="grid grid-cols-5 w-full px-2  gap-4">
            <h1 className="  font-semibold col-span-2 ">Subscripton : </h1>
            <span className="font-semibold col-span-3  text-orange-600">
              {" "}
              active
            </span>
          </div>
          <div className="grid grid-cols-2  w-full px-2 gap-1">
            <button className="text-center  font-semibold py-1 px-2 bg-orange-400 rounded-sm hover:bg-orange-500 hover:drop-shadow-md">
              Change Password
            </button>
            <button className="text-center  font-semibold py-1 px-2 bg-orange-400 rounded-sm hover:bg-orange-500 hover:drop-shadow-md">
              Edit Profile
            </button>
          </div>
          {subscription == true && (
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
