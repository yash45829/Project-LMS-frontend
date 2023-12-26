import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import {
  getRazorPayId,
  paymentVerify,
  purchaseCourseBundle,
} from "../../Redux/slice/razorPaySlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import HomePageLayout from "../../Layouts/HomePageLayout";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // USER DATA
  const userData = useSelector((state) => state?.auth?.data);
  // PAYMENT DATA STATE
  const [paymentData, setPaymentData] = useState({
    razorpayKey: "",
    subscription_id: "",
  });
  // PAYMENT DETAILS OBJECT
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  // ON CLICK HANDLER
  async function handleSubscription(e) {
    e.preventDefault();
    if (!paymentData.razorpayKey || !paymentData.subscription_id) {
      toast.error("something failed");
      return;
    }
    //  OPTIONS
    // properties bundle for popup window of razor payment gateway
    const options = {
      key: paymentData.razorpayKey,
      subscription_id: paymentData.subscription_id,
      name: "coursify Pvt. Ltd. ",
      description: "Subscription",
      theme: {
        color: "#F37254",
      },
      prefill: {
        email: userData.email,
        name: userData.firstname,
      },
      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id;

        // toast.success("payment successful");
        // PAYMENT VERIFY FROM SERVER SIDE
        const payVerify = await dispatch(paymentVerify(paymentDetails));
    // console.log(payVerify)
        // REDIRECTING TO  PAYMENT SUCCESS OR FAILED PAGE
        payVerify?.payload?.success
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      },
    };
    // WINDOW CONSTRUCTOR
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  // ON LOAD FUNCTION TO LOAD PAYMENT ID AND SUBSCRIPTION ID
  async function load() {
    const payId = await dispatch(getRazorPayId());
    setPaymentData((data) => {
      return {
        ...data,
        razorpayKey: payId?.payload?.key,
      };
    });
    const subscribe_id = await dispatch(purchaseCourseBundle());

    setPaymentData((data) => {
      return {
        ...data,
        subscription_id: subscribe_id?.payload?.subscription_id,
      };
    });
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <HomePageLayout>
      <div className="min-h-[100vh] flex flex-col justify-center items-center ">
        <form
          onSubmit={handleSubscription}
          className="w-1/4 rounded-lg shadow-xl shadow-pink-300"
        >
          <div className="my-2 mx-2 flex flex-col gap-y-4">
            <div className="w-full text-center py-2 text-orange-400 rounded-t-lg text-3xl font-semibold ">
              Subscription Package
            </div>
            <p className="text-xl text-center ">
              This subscription will give you access of all available courses on
              our platform for{" "}
              <span className=" text-orange-500">1 Year Duration</span> . All
              existing and new released courses will also be available.
            </p>
            <h1 className="text-2xl text-orange-500 text-center">
              <BiRupee className="inline text-2xl" /> <span>499/- only</span>{" "}
            </h1>
            <p className="text-center text-xl">
              100% refund on cancellation <br />
              <span className="text-sm"> *Terms & Conditions Apply</span>
            </p>
          </div>
          <button
            type="submit"
            className="py-1 text-center m-0 w-full rounded-b-lg text-2xl font-bold bg-green-500"
          >
            Buy Now
          </button>
        </form>
      </div>
    </HomePageLayout>
  );
}
export default Checkout;
