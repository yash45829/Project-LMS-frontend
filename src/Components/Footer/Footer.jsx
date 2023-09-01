import {BsLinkedin , BsInstagram , BsTwitter , BsFacebook} from 'react-icons/bs';


function Footer (){
   const currentDate = new Date();

   const year = currentDate.getFullYear();
 
    return(
        <>
        <div className='bg-slate-800  flex place-items-center h-12 justify-around relative bottom-0 mx-0'>
            <div className='font-semibold text-white'>
               Copyright {year}  |  All rights reserved.
            </div>
            <div className='flex space-x-8 text-2xl'>
                 <a className='bg-purple-200 p-1 rounded-xl shadow-black '>
                    <BsFacebook />
                 </a>
                 <a className='bg-purple-200 p-1 rounded-xl shadow-black '>
                    <BsLinkedin />
                 </a>
                 <a className='bg-purple-200 p-1 rounded-xl shadow-black '>
                    <BsInstagram />
                 </a>
                 <a className='bg-purple-200 p-1 rounded-xl shadow-black '>
                    <BsTwitter />
                 </a>
          
            </div>
        </div>
        </>
    );
}
export default Footer;