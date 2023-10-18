import { useState } from "react";
import HomePageLayout from "../../Layouts/HomePageLayout";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, userProfile } from "../../Redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const userData = useSelector((state) => state?.auth?.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    name: "",
    avatar: null,
    previewImage: "",
  });

  function inputHandler(e) {
    const { name, value } = e.target;
    setInputData((inputData) => {
      return {
        ...inputData,
        [name]: value,
      };
    });
  }

  // image input handler
  function getImage(event) {
    event.preventDefault();
    const uploadImage = event.target.files[0];

    if (uploadImage) {
      setInputData((inputData) => {
        return {
          ...inputData,
          avatar: uploadImage,
        };
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setInputData((inputData) => {
          return {
            ...inputData,
            previewImage: this.result,
          };
        });
      });
    }
  }

  async function onEdit(e) {
    e.preventDefault();
    const formData = new FormData();
        if (inputData.name) {
      formData.append("firstname", inputData.name);
    }
    if (inputData.avatar) {
      formData.append("avatar", inputData.avatar);
    }
    // formData.forEach((value, key) => {
    //   
    // });
    const newData = [userData._id, formData];

    await dispatch(updateProfile(newData));

    await dispatch(userProfile());

    navigate("/user/profile");
  }

  return (
    <HomePageLayout>
      <div className="h-[94vh]  flex flex-col justify-center  items-center">
        <form
          noValidate
          onSubmit={onEdit}
          className="flex flex-col w-72 rounded-md text-white
                       bg-slate-600 justify-center gap-y-2 items-start px-4 drop-shadow shadow-xl pb-2"
        >
          <h1 className="w-full text-center  font-semibold my-2">
            Edit Profile
          </h1>
          <label htmlFor="image_upload" className="w-fit mx-auto ">
            {inputData.previewImage !== "" ? (
              <img
                src={inputData.previewImage}
                alt="img"
                srcSet=""
                className="w-20 h-20 rounded-full mx-auto "
              />
            ) : userData.avatar.secure_url !== "" ? (
              <img
                src={userData.avatar.secure_url}
                alt="img"
                srcSet=""
                className="w-20 h-20 rounded-full mx-auto "
              />
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
          {/* name input  */}
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="text-[16px]">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder={userData.firstname}
              id="name"
              // value={inputData.name}
              className="rounded-md w-full focus:outline-0 px-2 py-0.5 text-black focus:drop-shadow-2xl "
              onChange={inputHandler}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-[16px]">
              Email
            </label>
            <input
              type="email"
              name="email"
              disabled
              autoComplete="off"
              id="email"
              value={userData.email}
              className="rounded-md w-full px-2 py-0.5 text-white focus:outline-0 focus:drop-shadow-lg"
              //   onChange={inputHandler}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 rounded-lg my-2 py-0.5 text-align-center px-4 text-white text-xl hover:bg-opacity-90"
          >
            Save
          </button>
        </form>
      </div>
    </HomePageLayout>
  );
}

export default EditProfile;
