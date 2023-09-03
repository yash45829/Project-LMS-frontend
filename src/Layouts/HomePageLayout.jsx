import Footer from "../Components/Footer/Footer";
import {FiMenu}  from 'react-icons/fi';
import { Link } from "react-router-dom";
function HomePageLayout({ children }) {
  // "tailwindCSS.includeLanguages": {
  //   "javascript": "javascript",
  //   "html": "HTML"
  // },
  // "editor.quickSuggestions": {
  //   "strings": true
  // }
  return (
    <div className="h-[100vh] bg-gradient-to-r from-violet-200 to-pink-200  ">

     <div className="drawer">
    <input id="my-drawer" type="checkbox" className="drawer-toggle" />

    <div className="drawer-content absolute ">
      {/* Page content here */}
      <label htmlFor="my-drawer" className="btn bg-transparent hover:bg-transparent border-none p-2"><FiMenu size={'25px'} /> </label>
    </div> 
    <div className="drawer-side z-50">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-40 min-h-full bg-base-200 text-base-content ">
        {/* Sidebar content here */}
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/about">About Us</Link></li>
        
      </ul>
    </div>
  </div>



  <div>
    {children}
  </div>
  <Footer />
  </div>
  
  );
}
export default HomePageLayout;