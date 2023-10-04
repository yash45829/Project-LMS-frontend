import { Link } from "react-router-dom";

function DeniedPage() {
  return (
    <main className="bg-gray-400 h-[100vh] flex flex-col justify-center items-center">
      <div className="my-4">
        <h1 className="text-9xl font-extrabold text-white font-sans drop-shadow-lg shadow-red-900 ">
          403
        </h1>
        <div className=" absolute translate-x-14 -translate-y-16 -rotate-12 bg-black text-white px-1">
          Access Denied
        </div>
      </div>
      <Link to={"/"}>
        <button className="text-blue-800 hover:text-blue-950 border py-1 px-2 hover:border-black ">
          Back to Home
        </button>
      </Link>
    </main>
  );
}

export default DeniedPage;
