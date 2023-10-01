
function CourseCard({data}){

    return(
        
        <div className="h-fit w-72 border z-20 border-yellow-600 rounded-xl">
        <img src="" className="h-44 border rounded-lg border-purple-800" alt="image" />
        <p className="text-xl font-semibold py-2 px-1 text-left ">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium, dolores.
        </p>
        <div>
          <p className="text-2xl font-semibold px-1">Category : <span className="font-bold text-orange-400">skills</span></p>
        </div>
        <div>
          <p className="text-2xl font-semibold px-1">Trainer : <span className="font-bold text-orange-400">expert</span></p>
        </div>
        <button className="text-center mt-2 rounded-bl-lg rounded-br-lg -z-20 w-full text-xl font-semibold bg-gradient-to-r from-pink-200 to-pink-400  py-1  ">
           Explore Now
        </button>
        </div>
        
    )
}

export default CourseCard;

