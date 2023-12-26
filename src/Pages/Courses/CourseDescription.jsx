import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import HomePageLayout from "../../Layouts/HomePageLayout";
import { userProfile } from "../../Redux/slice/authSlice";
import { useEffect } from "react";

function CourseDescription() {
  const navigate = useNavigate();
  const { state } = useLocation();
  // const userData = useSelector((state) => state?.auth?.data);

  const dispatch = useDispatch();

  async function profile() {
    await dispatch(userProfile());
  }
  const userData = useSelector((state) => state?.auth?.data);
  // console.log(userData);
  useEffect(() => {
    profile();
  }, []);

  return (
    <HomePageLayout>
      <div className="min-h-[100vh] flex flex-col justify-center  items-center">
        <div className="flex lg:flex-row flex-col-reverse gap-y-4 my-2 w-2/3 bg-purple-200 rounded-lg font-semibold lg:gap-x-8 py-2 px-4">
          <div className="flex flex-col gap-y-3 text-xl">
            <h1 className="text-3xl text-orange-400 font-semibold ">
              {state?.title}
            </h1>
            <div>
              <p className="">Description : </p>{" "}
              <span className="text-orange-600"> {state?.description}</span>
            </div>
            <h1>
              Category :{" "}
              <span className="text-orange-600">{state.category}</span>
            </h1>
            <h1>
              Mentor :{" "}
              <span className="text-orange-600">{state.createdBy}</span>
            </h1>
            <h1>
              No of Lectures :{" "}
              <span className="text-orange-600">{state.noOfLectures}</span>
            </h1>

            {userData.role == "ADMIN" ||
            userData.subscription.status == "active" ? (
              <button
                onClick={() => {
                  navigate("/course/lectures", { state: state });
                }}
                className="w-full  rounded-lg py-1 px-2 font-semibold text-xl text-white bg-green-600 hover:bg-green-700"
              >
                Watch lecture
              </button>
            ) : (
              <button
                onClick={() => navigate("/checkout")}
                className="w-full  rounded-lg py-1 px-2 font-semibold text-xl text-white bg-green-600 hover:bg-green-700"
              >
                buy course
              </button>
            )}
          </div>
          <div className="h-full">
            <img
              className="h-full w-full rounded-md"
              src={state?.thumbnail?.secure_url}
              alt=""
            />
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="  rounded-lg py-1 px-2 border my-1 hover:bg-purple-200 font-semibold border-purple-700 "
        >
          {" "}
          Back to Courses{" "}
        </button>
      </div>
    </HomePageLayout>
  );
}

export default CourseDescription;
