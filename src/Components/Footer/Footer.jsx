import { BsLinkedin, BsInstagram, BsTwitter, BsFacebook } from "react-icons/bs";

function Footer() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();

  return (
    <div className="bg-slate-600 my-0 flex  items-center px-2 py-4 flex-col-reverse sm:flex-row justify-between w-full mx-0">
      <div className=" text-white ">
        Copyright {year} | All rights reserved.
      </div>
      <div className="flex space-x-8 text-xl my-2 sm:my-0 ">
        <a className="bg-gradient-to-r from-violet-200 to-pink-200 hover:cursor-pointer p-1 rounded-xl shadow-black ">
          <BsFacebook />
        </a>
        <a className="bg-gradient-to-r from-violet-200 to-pink-200 hover:cursor-pointer p-1 rounded-xl shadow-black ">
          <BsLinkedin />
        </a>
        <a className="bg-gradient-to-r from-violet-200 to-pink-200 hover:cursor-pointer p-1 rounded-xl shadow-black ">
          <BsInstagram />
        </a>
        <a className="bg-gradient-to-r from-violet-200 to-pink-200 hover:cursor-pointer p-1 rounded-xl shadow-black ">
          <BsTwitter />
        </a>
      </div>
    </div>
  );
}
export default Footer;
