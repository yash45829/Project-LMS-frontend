import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../Components/CourseCard";
import HomePageLayout from "../../Layouts/HomePageLayout";
import {getAllCourses} from "../../Redux/slice/courseSlice";
import { useEffect } from "react";
function CoursesPage(){
  const dispatch = useDispatch();

 async function courseList (){
  await dispatch(getAllCourses());
 }   
 const { courseData} = useSelector((state) => state.course);
useEffect(()=>{
    courseList();
}, [])


   return(
    <HomePageLayout>
         <div className="h-[100%] min-h-[90vh] p-10 flex flex-col  my-8">
            <h1 className="text-4xl my-4 font-bold ">
               All Courses teached by 
               <span className="mx-2 text-orange-400">Industry Experts</span>
            </h1>
            <div className="my-2 flex flex-wrap gap-8 justify-start items-start">
               {courseData.map(course=>
               <CourseCard  data = {course} />
               )}
            </div>

         </div>

    </HomePageLayout>
   )
}
export default CoursesPage;