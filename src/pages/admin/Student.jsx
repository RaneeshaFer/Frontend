import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { FormatDate } from './date';
import { CgAdd } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';


export default function Student() {
    const[student,setStudent]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchStudent=async()=>{
            try{
                const res=await axios.get('http://localhost:3000/api/student');
                console.log(res.data);
                setStudent(res.data);
                console.log(student);
            }catch(error){
                toast.error(error.message);

            }
        }
        fetchStudent()

    },[]);
    function handleDelete(sid){
      if(window.confirm("Are you sure you want to delete this student?")){
        axios.delete(`http://localhost:3000/api/student/${sid}`,{headers:{Authorization:"Bearer "+localStorage.getItem('token')}}).then((res)=>{
          toast.success(res.data.msg);
          setStudent(student.filter((s)=>s.sid!==sid));
        }).catch((error)=>{
          toast.error(error.message);
        })
      }
    } 
  return (
    
    <div>
    <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold mb-4 text-gray-700">Student Details</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead class="bg-gradient-to-r from-green-500 to-green-700 text-white">
            <tr>
                <th class="py-3 px-6 text-left">Student ID</th>
                <th class="py-3 px-6 text-left">Images</th>
                <th class="py-3 px-6 text-left">Name</th>
                <th class="py-3 px-6 text-left">Age</th>
                <th class="py-3 px-6 text-left">Date of Birth</th>
                <th class="py-3 px-6 text-left">Actions</th>
                </tr>
        </thead>
        <tbody class="text-gray-700">
            {student.map((s)=>(
            <tr key={s.sid} class="border-b hover:bg-gray-100">
                <td class="py-3 px-6">{s.sid}</td>
                <td class="py-3 px-6"><img src={s.image} alt="" class="w-12 h-12 rounded-full"/></td>
                <td class="py-3 px-6">{s.sname}</td>
                <td class={`py-3 px-6 ${s.age>22 ? 'bg-green-200' : 'bg-red-200'}`}>{s.age}</td>
                <td class="py-3 px-6">{FormatDate(new Date(s.dob))}</td>
                <th class="py-3 px-6 text-left flex">
                 <FaEdit className='text-blue-600 hover:text-blue-800 cursor-pointer' onClick={()=>navigate('/admin/student/editStudent',{state:s})}/>
                <FaRegTrashAlt className='text-red-500 hover:text-red-700 cursor-pointer ml-4' onClick={()=>handleDelete(s.sid)}/></th>
            </tr>
            ))}
          
        </tbody>
    </table>
    <button className="absolute right-5 bottom-5" onClick={()=>{navigate('studentDetails')}}><CgAdd className='text-6xl'/></button>
    </div>
</div>
  </div>
  )
}
