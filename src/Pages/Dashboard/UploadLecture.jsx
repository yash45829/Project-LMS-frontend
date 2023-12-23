import { useLocation, useNavigate } from "react-router-dom";
import HomePageLayout from "../../Layouts/HomePageLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addCourseLectures } from "../../Redux/slice/lectureSlice";

function UploadLecture() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const course = useLocation().state;

  const [lectureData, setLectureData] = useState({
    course_id: course._id,
    title: "",
    description: "",
    video: undefined,
    src: "",
  });

  function onChangehandler(e) {
    const { name, value } = e.target;
    setLectureData({
      ...lectureData,
      [name]: value,
    });
  }

  function onFileChange(e) {
    const video = e.target.files[0];
    const src = window.URL.createObjectURL(video);
    console.log(video);
    console.log(src);

    setLectureData({
      ...lectureData,
      video: video,
      src: src,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!lectureData.title || !lectureData.description || !lectureData.video) {
      toast("all fields are to be filled");
      return;
    }

    const res = await dispatch(addCourseLectures(lectureData));
    console.log(res);
    if (res?.payload?.success) {
      setLectureData({
        ...lectureData,
        course_id: course._id,
        title: "",
        description: "",
        video: undefined,
        src: "",
      });
      toast.success("lecture added");
    }
  }
  return (
    <HomePageLayout>
      <div className="h-[100vh] w-full flex items-center justify-center gap-2">
        <div>
          <header className="relative w-96 font-semibold my-2">
            <AiOutlineArrowLeft
              className="absolute top-1 left-2 cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-center">Add New Lectures</h1>
          </header>
          <form
            onSubmit={onFormSubmit}
            className="flex flex-col items-center justify-center w-96 gap-y-4"
          >
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter lecture title"
              onChange={onChangehandler}
              value={lectureData.title}
              className="w-full px-2 py-1 rounded bg-gray-200 text-black border-none focus:outline-none focus:shadow-xl"
            />
            <textarea
              name="description"
              id="description"
              placeholder="Enter lecture description"
              onChange={onChangehandler}
              value={lectureData.description}
              className="resize-none h-28   focus:shadow-xl w-full px-2 py-1 rounded bg-gray-200 focus:outline-none "
            ></textarea>
            <div className="w-full ">
              {lectureData.video ? (
                <video
                  src={lectureData?.src}
                  disablePictureInPicture
                  muted
                  controls
                  controlsList="nodownload"
                  className="h-48 w-full rounded "
                />
              ) : (
                <div className="h-28 text-center  w-full bg-gray-200 rounded">
                  <label htmlFor="video" className="cursor-pointer">
                    Choose lecture file
                  </label>
                  <input
                    type="file"
                    name="video"
                    id="video"
                    className=" hidden "
                    onChange={onFileChange}
                    accept="video/mp4 video/*"
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-green-400 rounded-lg px-6 py-2 text-xl "
            >
              Add lecture
            </button>
          </form>
        </div>
      </div>
    </HomePageLayout>
  );
}
export default UploadLecture;
