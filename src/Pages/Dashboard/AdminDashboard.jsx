import HomePageLayout from "../../Layouts/HomePageLayout";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userStat } from "../../Redux/slice/statSlice";
import { getPaymentRecord } from "../../Redux/slice/razorPaySlice";
import { deleteCourse, getAllCourses } from "../../Redux/slice/courseSlice";
import { Bar, Pie } from "react-chartjs-2";
import { IoMdPlayCircle } from "react-icons/io";
import { FaTrash, FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";

ChartJs.register(
  CategoryScale,
  BarElement,
  ArcElement,
  Legend,
  Title,
  Tooltip,
  LinearScale
);
function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allUserCount, subscribedUsers } = useSelector(
    (state) => state?.stats
  );
  const { allPayments, finalMonths, monthlySalesRecord } = useSelector(
    (state) => state?.razorpay
  );
  const { courseData } = useSelector((state) => state?.course);
  // console.log(courseData);

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    datasets: [
      {
        label: "User Details",
        data: [allUserCount, subscribedUsers],
        backgroundColor: ["yellow", "green"],
        borderWidth: 1,
        borderColor: ["yellow", "green"],
      },
    ],
  };
  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    fontColor: "white",
    datasets: [
      {
        label: "SalesPerMonth",
        data: finalMonths,
        backgroundColor: ["green"],
        borderWidth: 2,
        borderColor: ["white"],
      },
    ],
  };
  async function onDelete(courseid) {
    if (window.confirm("Are you sure you want to delete the course ? ")) {
      const res = await dispatch(deleteCourse(courseid));
      if (res?.payload?.success) {
        await dispatch(getAllCourses());
      }
    }
  }
  useEffect(() => {
    (async () => {
      await dispatch(userStat());
      await dispatch(getPaymentRecord());
      await dispatch(getAllCourses());
    })();
  }, []);

  return (
    <HomePageLayout>
      <div className="min-h-[94vh] w-full py-2 ">
        <h1 className="text-center text-orange-500 text-4xl font-bold my-4">
          Admin Dashboard
        </h1>
        {/* visual chart  */}
        <div className="grid grid-cols-2 gap-4 mx-4 my-2 ">
          <div className=" flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold text-center my-2 shadow-md px-2 rounded ">
              User Data
            </h1>
            <div className="w-72 h-72 m-auto ">
              <Pie data={userData} />
            </div>
            <div className="w-full flex justify-around gap-x-4 items-center h-auto">
              <div className="flex justify-around items-center gap-x-4 drop-shadow-md rounded-md px-4 py-2">
                <span className="text-3xl  ">{allUserCount}</span>
                <FaUsers className="h-16 w-16 text-orange-500" />
              </div>

              <div className="flex justify-around items-center gap-x-4 drop-shadow-md rounded-md px-4 py-2">
                <span>{subscribedUsers}</span>
                <FaUsers className="h-16 w-16 text-green-500" />
              </div>
            </div>
          </div>
          <div className=" flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold text-center my-2 shadow-md px-2 rounded">
              Sales Data
            </h1>
            <div className="w-[90%] h-auto  m-auto ">
              <Bar data={salesData} />
            </div>
            <div className="w-full flex justify-around gap-x-4 items-center h-auto">
              <div className="flex justify-around items-center gap-x-4 drop-shadow-md rounded-md px-4 py-2">
                <span>{allPayments?.count}</span>
                <FcSalesPerformance className="h-16 w-16 text-green-500" />
              </div>

              <div className="flex justify-around items-center gap-x-4 drop-shadow-md rounded-md px-4 py-2">
                <span>{allPayments?.count * 499}</span>
                <GiMoneyStack className="h-16 w-16 text-green-500" />
              </div>
            </div>
          </div>
        </div>
        {/* course review section  */}
        <div className="w-[90%] h-[90%] flex flex-col justify-center mx-auto my-24 items-center rounded-md drop-shadow-md ">
          <div className="flex w-full justify-between px-2 py-2">
            <h1 className="text-2xl font-semibold shadow-md px-2 rounded ">
              Course Review
            </h1>
            <button className="px-2 py-1 text-2xl font-semibold bg-orange-400  rounded-md mx-2 hover:bg-orange-600  transition-all ease-in-out duration-75 ">
              Add Courses
            </button>
          </div>
          <table className="table w-full text-base">
            <thead>
              <tr className="text-base">
                <th>Sr No.</th>
                <th>Title</th>
                <th>Category</th>
                <th>Instructor</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courseData?.map((course, id) => {
                return (
                  <tr
                    key={course._id}
                    className=" my-16 gap-4 py-8 border-none  bg-opacity-60 bg-blue-100 rounded-lg hover:bg-amber-500 "
                  >
                    <td>{id + 1}</td>
                    <td>
                      <textarea
                        readOnly
                        className="resize-none whitespace-nowrap  focus:outline-none bg-transparent"
                        value={course.title}
                      ></textarea>
                    </td>
                    <td>{course.category}</td>
                    <td>{course.createdBy}</td>
                    <td>
                      <textarea
                        className="resize-none overflow-auto focus:outline-none bg-transparent"
                        rows={2}
                        value={course.description}
                        readOnly
                      ></textarea>
                    </td>
                    <td className="flex justify-between items-center w-full ">
                      <div
                        onClick={() => {
                          navigate("/course/lectures", { state: course });
                        }}
                        className="bg-yellow-500 px-4 py-2 rounded-lg text-2xl hover:cursor-pointer"
                      >
                        <IoMdPlayCircle />
                      </div>

                      <div
                        onClick={() => onDelete(course?._id)}
                        className="bg-red-500 px-4 py-2 rounded-lg text-2xl hover:cursor-pointer"
                      >
                        <FaTrash />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </HomePageLayout>
  );
}

export default AdminDashboard;
