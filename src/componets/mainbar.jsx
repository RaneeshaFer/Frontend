import { IoIosAddCircleOutline } from "react-icons/io";
export default function Mainbar(){
    return(
        <div className="w-[calc(100%-300px)] h-full bg-green-500 relative">
            
            <div className="border-8 border-[#0045ff] rounded-2xl bg-amber-300 text-center">
            <p className="text-2xl text-red-700">Mainbar</p>
            </div>
            <div className="absolute right-0 bottom-0 text-7xl">
           <button onClick={() => alert("Hello")} className="hover:text-red-500 rounded-full"> 
                <IoIosAddCircleOutline /> 
           </button>
            </div>
            
        </div>
    )
}