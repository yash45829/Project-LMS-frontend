/* eslint-disable react/react-in-jsx-scope */
import { Link } from "react-router-dom";
import HomePageLayout from "../Layouts/HomePageLayout";
// import { AiOutlineArrowRight } from 'react-icons/ai';
function HomePage() {

    return (

        // eslint-disable-next-line react/react-in-jsx-scope
        <>
            <HomePageLayout>
                <div className="h-[94vh]  flex flex-col justify-center items-center ">
                    <h1 className="font-extrabold text-4xl" >Find Out Best

                        <span className="text-amber-600"> Online Courses</span>
                    </h1>
                    <p className="text-center text-xl">We have a large library of courses teached by highly skilled <br /> and qualified faculties at a very affordable price.</p>
                    <Link to={"/courses"}>
                        <button className=" bg-gradient-to-r from-pink-200 to-pink-400  py-2 px-4 
               hover:-translate-y-2 duration-300 hover:drop-shadow-xl ease-in-out text-2xl my-4 rounded  text-white font-semibold">  Explore Courses  </button>
                    </Link>
                </div>
            </HomePageLayout>
        </>
    )
}
export default HomePage;