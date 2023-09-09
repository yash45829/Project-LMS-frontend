import HomePageLayout from "../Layouts/HomePageLayout.jsx";
import aboutMainImage from "../assets/Images/aboutMainImage.png";
// import apj from "../assets/Images/apj.png";
// import { ideals } from "../Constants/slidesConstants.js";
import { ideals } from "../Constants/slidesConstants.js";
import billGates from "../assets/Images/billGates.png";
import einstein from "../assets/Images/einstein.png";
import nelsonMandela from "../assets/Images/nelsonMandela.png";
import steveJobs from "../assets/Images/steveJobs.png";
// import { apj , billGates, einstein, nelsonMandela , steveJobs} from '../assets/Images'
function AboutUs() {
  return (
    <HomePageLayout>
      <div className="h-[100%] p-10 flex flex-col  my-8">
        <div className="flex ">
          <section className="w-1/2">
            <h1 className="font-extrabold text-4xl">We provide best content at affordable price.</h1>
            <p className="  my-2 text-start text-xl">
              Welcome to our Learning Management System (LMS) project! We are a
              dedicated team of passionate educators, technologists, and
              innovators who are committed to revolutionizing the way people
              learn and grow. Our journey began with a shared vision to make
              education accessible, engaging, and effective for learners of all
              ages and backgrounds. <br />
               With years of experience in the education
              industry, we understand the evolving needs of both students and
              instructors. Our LMS project is the result of countless hours of
              research, development, and collaboration to create a platform that
              empowers educators to deliver inspiring content and learners to
              embark on a transformative educational journey. At the heart of
              our project is a deep belief in the power of education to
              transform lives. <br />
               We are driven by the idea that learning should be
              a lifelong pursuit, and our LMS is designed to facilitate this
              journey. Whether you are a teacher looking for a dynamic way to
              engage your students or a student seeking a flexible and
              interactive learning experience, our LMS has been crafted with you
              in mind. We are committed to fostering a community of lifelong
              learners and supporting educators in their mission to inspire and
              educate.  Our LMS project is more than just a platform; it's a hub
              of knowledge, innovation, and collaboration. We invite you to join
              us on this exciting journey as we strive to redefine education in
              the digital age. Together, we can unlock the full potential of
              learning and empower individuals to achieve their dreams. Thank
              you for being a part of our LMS project!
            </p>
          </section>
          <div>
            <img className="" src={aboutMainImage} />
          </div>
        </div>
    
    {/* slider here  */}


{/*     
    <div className="carousel w-full my-10 ">
    
    <div  id="slide1" className="carousel-item relative border w-full mx-auto ">
    <div className="flex flex-col justify-center items-center gap-2">
    <img src={apj} className=" mx-auto rounded-full  drop-shadow-lg shadow-black
     border-black w-1/2 " />
     <h1>APJ Abdul Kalam</h1>
     <p></p>
    </div>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">     
      <a href="#slide4" className="btn btn-circle bg-transparent">❮</a> 
      <a href="#slide2" className="btn btn-circle bg-transparent">❯</a>
    </div>

</div>
 


    </div> */}

<div className="carousel my-20 w-1/2 mx-auto">
 { 
  ideals.map((ideal,i) => (
    <div id={`slide${i+1}`} className="carousel-item relative w-full">
    <div className="place-items-center text-center mx-auto gap-2 w-full">
    <img src={ideal.image} className=" shadow-md rounded-full w-[40vh] h-[40vh] m-auto" />
    <h1 className="font-semibold text-2xl">APJ Abdul Kalam</h1>
    <p className=" text-xl">{ideal.desc}</p>
    </div>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href={(i+1) == 1 ? `#slide${ideals.length}`: `#slide${i}` } className="btn btn-circle bg-transparent">❮</a> 
      <a href={(i+1) == ideals.length ? `#slide1` : `#slide${i+2}` } className="btn btn-circle bg-transparent">❯</a>
    </div>
  </div> 
  )
  )
 }

  

 
</div>

  </div>

    </HomePageLayout>
  );
}
export default AboutUs;
