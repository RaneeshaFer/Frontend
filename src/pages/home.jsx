import Benefits from "../componets/Benefits";
import ICT from "../componets/ICT";
import Image from "../componets/image";
import Navbar from "../componets/navbar";

export default function Home(){
    return(
        <>
        <div>
          <Navbar/>
        </div>
        <div className='w-full h-full'>
          <Image/>
        </div>
        <div className='w-full h-screen flex'>
          <ICT/>
          <Benefits/>
    
        </div>
        </>
    )
}