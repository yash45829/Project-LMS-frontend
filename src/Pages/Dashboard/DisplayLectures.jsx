import { useLocation, useNavigate } from "react-router-dom";
import HomePageLayout from "../../Layouts/HomePageLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteLecture,
  getCourseLectures,
} from "../../Redux/slice/lectureSlice";

function DisplayLectures() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  // console.log(state);

  const { lectures } = useSelector((state) => state.lecture);
  // console.log(lectures);
  const role = useSelector((state) => state?.auth.role);
  // console.log(role);

  async function delLecture(course_id, lect_id) {
    if (window.confirm("Are you sure you want to delete the lecture ? ")) {
    const data = {
      courseid: course_id,
      lectureid: lect_id,
    };
    await dispatch(deleteLecture(data));
    await dispatch(getCourseLectures(course_id));
  }
  }
  useEffect(() => {
    if (state) {
      (async () => await dispatch(getCourseLectures(state._id)))();
    }
  }, []);

  return (
    <HomePageLayout>
      <div className="h-[100vh] w-full flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold">
          <span className="text-orange-600 font-semibold">Course title : </span>

          {state?.title}
        </h1>
        {lectures && lectures?.length > 0 ? (
          <div className="flex justify-center lg:flex-row items-start flex-col w-[80%] ">
            {/* video play section  */}
            <div className="px-2 py-2 rounded shadow-sm lg:w-3/5 w-full">
              <video
                className="h-auto w-[80%] mx-auto rounded bg-blue-200"
                src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                controls
                disablePictureInPicture
                muted
                controlsList="nodownload"
              ></video>
              <div>Title : {lectures[currentVideo]?.title}</div>
              <div>Descr: {lectures[currentVideo]?.description}</div>
            </div>
            {/* video list section  */}
            <div className="lg:w-2/5 w-full">
              <div>
                {" "}
                {role == "ADMIN" && (
                  <button
                    className="text-right rounded bg-blue-400 px-2 mx-4"
                    onClick={() => {
                      navigate("/course/addlecture", { state: { ...state } });
                    }}
                  >
                    Add lecture
                  </button>
                )}
              </div>
              <div className="py-1">
                {lectures.map((lec, i) => (
                  <div
                    onClick={(e) => {
                      setCurrentVideo(i);
                    }}
                    key={lec?._id}
                    className="bg-blue-300 rounded-sm py-2 px-2 mx-4 hover:cursor-pointer flex justify-start items-center"
                  >
                    <div>{i + 1}</div>
                    <div className="px-2">
                      <video
                        className="h-12 w-16 rounded bg-blue-200"
                        src={lec?.lecture?.secure_url}
                      ></video>
                    </div>
                    <div className="bg-blue-200 rounded-sm w-full px-2 ">
                      <h1 className="font-semibold">{lec?.title}</h1>
                      <p>{lec?.description}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => delLecture(state?._id, lec?._id)}
                        className="bg-red-600 rounded hover:bg-red-700 text-white mx-2 px-2 py-1 font-semibold "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          role == "ADMIN" && (
            <button
              className="text-right rounded bg-blue-400 px-2"
              onClick={() => {
                navigate("/course/addlecture", { state: { ...state } });
              }}
            >
              Add lecture
            </button>
          )
        )}
      </div>
    </HomePageLayout>
  );
}
export default DisplayLectures;
