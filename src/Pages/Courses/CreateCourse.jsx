import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createNewCourse } from "../../Redux/slice/courseSlice";
import HomePageLayout from "../../Layouts/HomePageLayout";

function CreateCourse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // USER INPUT INITIAL STATES
  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: "",
    previewImage: "",
  });

  // INPUT HANDLER
  function userInputHandler(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  // COURSE THUMBNAIL HANDLER
  function courseImageHandler(e) {
    e.preventDefault();
    // console.log(e.target.files[0]);
    const image = e.target.files[0];

  
    if (image) {
   setUserInput((prevUserInput) => {
    return {
      ...prevUserInput,
      thumbnail: image,
    };
  });
  console.log(userInput)
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);
      fileReader.addEventListener("load", function () {
        setUserInput((prevUserInput) => {
          return {
            ...prevUserInput,
            previewImage: this.result,
          };
        });
      });
      // console.log(image)
    }
  }

  // ON SUBMIT HANDLER
  function onSubmit(e) {
    e.preventDefault();

    if (
      !userInput.title ||
      !userInput.category ||
      !userInput.description ||
      !userInput.createdBy
    ) {
      toast.error("All fields are required");
      return;
    }
    console.log("userinput" , userInput)
    const response = dispatch(createNewCourse(userInput));
    if (response?.payload?.success) {
      toast("course created successfully");
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: "",
        previewImage: "",
      });
      // navigate("/courses");
    }
  }

  return (
    <HomePageLayout>
      <div className="min-h-[100vh] flex justify-center items-center">
        <form
          className="w-1/2 shadow-2xl bg-opacity-100 px-2 bg-pink-200 rounded-2xl"
          onSubmit={onSubmit}
        >
          <h1 className="text-center text-3xl font-semibold ">Create Course</h1>

          <div className="grid grid-cols-2 gap-x-4 px-2 py-8 ">
            <div className="px-2 flex flex-col justify-center  gap-y-4 ">
              <div className=" my-10  ">
                {/* thumbnail  */}
                <label
                  htmlFor="image"
                  className="  text-shadow font-semibold rounded-lg bg-gray-300 drop-shadow-sm    cursor-pointer "
                >
                  {userInput.previewImage ? (
                    <img
                      src={userInput.previewImage}
                      alt="img"
                      srcSet={userInput.previewImage}
                      className="w-44 h-28 rounded-lg mx-auto "
                    />
                  ) : (
                    "Upload course image"
                  )}
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className=" hidden h-72"
                  accept=".png , .jpg ,.svg , .jpeg"
                  onChange={courseImageHandler}
                />
              </div>

              {/* name input  */}
              <div className="flex flex-col w-full my-1 py-1">
                <label htmlFor="title" className="text-[16px]  font-semibold">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Enter your title.."
                  id="title"
                  className="rounded-md w-full focus:outline-0   px-2 py-0.5 text-black focus:drop-shadow-xl "
                  value={userInput.title}
                  onChange={userInputHandler}
                />
              </div>
            </div>
            <div className="px-2 flex flex-col  gap-y-6 ">
              {/* category  */}
              <div className="flex flex-col w-full">
                <label htmlFor="category" className="text-[16px] font-semibold">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  required
                  placeholder="Enter your category.."
                  id="category"
                  className="rounded-md w-full focus:outline-0 px-2 py-0.5 text-black focus:drop-shadow-xl "
                  value={userInput.category}
                  onChange={userInputHandler}
                />
              </div>
              {/* created by  */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="createdBy"
                  className="text-[16px] font-semibold"
                >
                  Instructor
                </label>
                <input
                  type="text"
                  name="createdBy"
                  required
                  placeholder="Enter your instructor.."
                  id="createdBy"
                  className="rounded-md w-full focus:outline-0 px-2 py-0.5 text-black focus:drop-shadow-xl "
                  value={userInput.createdBy}
                  onChange={userInputHandler}
                />
              </div>
              {/* description  */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="description"
                  className="text-[16px] font-semibold"
                >
                  Description
                </label>
                <textarea
                  
                  name="description"
                  required
                  placeholder="Enter your name.."
                  id="description"
                  className="rounded-md w-full focus:outline-0 resize-none h-20  px-2 py-0.5 text-black focus:drop-shadow-xl "
                  value={userInput.description}
                  onChange={userInputHandler}
                />
              </div>
            </div>
          </div>
          <button
            className="text-center w-full  text-xl my-2 text-white py-1 mx-auto bg-green-500 cursor-pointer hover:bg-green-700 rounded-2xl font-semibold "
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </HomePageLayout>
  );
}

export default CreateCourse;
