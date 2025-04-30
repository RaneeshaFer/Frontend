import { useState } from 'react';
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function Login(){
    const navigate=useNavigate();
    const[email,setEmail]=useState('');
    const[pw,setPw]=useState('');
    const [loading,setLoading ]=useState(false);
    function handleSubmit(e){
        setLoading(true)
        e.preventDefault();
        axios.post('http://localhost:3000/api/user/login',{
            email:email,
            password:pw
        }).then((res)=>{
            console.log(res.data);
            const user=res.data.user;
            localStorage.setItem('token',res.data.token);
            if(user.role==="Admin"){
               navigate('/admin/dashboard');
                toast.success("Login Successfull");
                setLoading(false)
            }else{
                navigate('/');
                toast.error("Login error");
                setLoading(false)
            }
                
    })
}

            //localStorage.setItem('token',res.data.token);
            //console.log(res);

        
    
    return(
        <div className="w-full h-screen flex justify-center items-center bg-image">
            <div className="w-[350px] h-[400px]  rounded-3xl backdrop-blur-lg backdropbg-opacity-30 flex flex-col p-5 justify-center items-center">
                <div className='flex flex-col text-xl items-center'>
            <form>
              <h1>Login Screen</h1>
              <input type="text" placeholder="Enter email" onChange={e=>setEmail(e.target.value)} name="email" className='m-5 border border-white w-[300px] p-3 rounded-2xl'/>
              <input type="password" placeholder="Enter password"onChange={e=>setPw(e.target.value)}name="pw" className='m-5 border border-white w-[300px] p-3 rounded-2xl'/>
              <button onClick={handleSubmit}className='m-5 bg-blue-500 w-[300px] p-3 rounded-2xl text-white hover:bg-white hover:text-blue-500'>{loading?<span className="loading loading-bars loading-xs"></span>:"Submit"}</button>
              </form>
              </div>
            </div>
        </div>
    )
}