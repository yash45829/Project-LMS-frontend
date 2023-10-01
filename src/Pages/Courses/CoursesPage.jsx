import CourseCard from "../../Components/CourseCard";
import HomePageLayout from "../../Layouts/HomePageLayout";
function CoursesPage(){


   return(
    <HomePageLayout>
         <div className="h-[100%] min-h-[90vh] p-10 flex flex-col  my-8">
            <h1 className="text-4xl my-4 font-bold ">
               All Courses teached by 
               <span className="mx-2 text-orange-400">Industry Experts</span>
            </h1>
            <div className="my-2">
               <CourseCard/>
            </div>

         </div>

    </HomePageLayout>
   )
}
export default CoursesPage;