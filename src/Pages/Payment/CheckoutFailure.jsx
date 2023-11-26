import HomePageLayout from "../../Layouts/HomePageLayout";
import { AiFillCloseCircle} from "react-icons/ai";

function CheckoutFailure (){
   
    return(
        <HomePageLayout>
            <div className="h-[100vh] w-full flex flex-col items-center justify-center">
            <div className="text-center min-w-[300px] rounded-lg text-xl bg-slate-200 shadow-md " >
                <div className="rounded-t-lg bg-red-700 text-white mb-10 py-2 text-xl">Payment Failed</div>
                <div className="flex flex-col items-center gap-y-4 text-center px-2 my-6">
                    <p className="font-semibold">Something went wrong</p>
                    <p>Please try again.</p>
                    <div className="flex justify-center border">
                    <AiFillCloseCircle className="h-9 w-9 text-red-700"/>
                    </div>

                </div>
                <button className="rounded-b-lg bg-red-700 w-full text-white mt-10 py-2 text-xl">Go to Courses</button>
            </div>
            </div>
        </HomePageLayout>
    )
    
    
}

export default CheckoutFailure;