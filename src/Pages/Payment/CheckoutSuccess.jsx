import HomePageLayout from "../../Layouts/HomePageLayout";
import { AiFillCheckCircle} from "react-icons/ai";

function CheckoutSuccess (){
   
    return(
        <HomePageLayout>
            <div className="h-[100vh] w-full flex flex-col items-center justify-center">
            <div className="text-center min-w-[300px] rounded-lg text-xl bg-slate-200 shadow-md " >
                <div className="rounded-t-lg bg-green-700 text-white mb-10 py-2 text-xl">Payment Successfull</div>
                <div className="flex flex-col items-center gap-y-4 text-center px-2 my-6">
                    <p className="font-semibold">Welcome to the pro package</p>
                    <p>Now you can enjoy all the courses.</p>
                    <div className="flex justify-center border">
                    <AiFillCheckCircle className="h-9 w-9 text-green-700"/>
                    </div>

                </div>
                <button className="rounded-b-lg bg-green-700 w-full text-white mt-10 py-2 text-xl">Go to Dashboard</button>
            </div>
            </div>
        </HomePageLayout>
    )
    
}

export default CheckoutSuccess;