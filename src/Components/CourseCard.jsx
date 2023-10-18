import {useNavigate} from 'react-router-dom';
function CourseCard({data}){
  console.log(data)
  const navigate = useNavigate();
    return(
        
        <div  className="h-fit w-72  z-20 font-poppins bg-purple-300 rounded-xl hover:translate-2">
        <img src={data.thumbnail.secure_url} className="h-44 w-72  rounded-lg" alt="image" />
        <div className="px-2">
        <h1 className="text-2xl font-semibold py-1 px-1 text-left ">{data.title}
        </h1>
        <p className="text-xl  py-2 px-1 text-left ">{data.description}
        </p>
        <div>
          <p className="text-xl  px-1">Category : <span className="font-semibold text-orange-500">{data.category}</span></p>
        </div>
        <div>
          <p className="text-xl  px-1">Trainer : <span className="font-semibold text-orange-500">{data.createdBy}</span></p>
        </div>
        </div>
        <button onClick={()=> navigate("/course/description" , {state : data})} className="text-center mt-2 shadow-white rounded-bl-lg rounded-br-lg -z-20 w-full text-xl font-semibold bg-gradient-to-r from-pink-300 to-pink-500  py-1  ">
           Explore Now
        </button>
        </div>
        
    )
}

export default CourseCard;

