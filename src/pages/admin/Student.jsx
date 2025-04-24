import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FormatDate } from './date';
import { CgAdd } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import studentDetails from './studentDetails';
import { RiEdit2Line } from "react-icons/ri";



export default function Student() {
    const[student,setStudent]=useState([]);
    const navigate=useNavigate();

    useEffect(()=>{
        const fetchStudent=async()=>{
            try{
                const res=await axios.get("http://localhost:3000/api/student/");
                console.log(res.data);
                setStudent(res.data);
                console.log(student);
            }catch(error){
                toast.error(error.message);
            }
        }
        fetchStudent()
    },[student])
        
    

  return (
    
    <div>
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
    <h2 class="text-xl font-semibold text-gray-700 mb-4">Student Data</h2>
    <table class="w-full border-collapse border border-gray-300">
  <thead>
    <tr class="bg-gray-200">
      <th class="border border-gray-300 px-4 py-2">Student ID</th>
      <th class="border border-gray-300 px-4 py-2">Name</th>
      <th class="border border-gray-300 px-4 py-2">Age</th>
      <th class="border border-gray-300 px-4 py-2">Date of Birth</th>
      <th class="border border-gray-300 px-4 py-2">Action</th> {/* new column header */}
    </tr>
  </thead>
  <tbody>
    {student.map((s) => (
      <tr key={s.sid} class="bg-white hover:bg-gray-100">
        <td class="border border-gray-300 px-4 py-2">{s.sid}</td>
        <td class="border border-gray-300 px-4 py-2">{s.sname}</td>
        <td class={`border border-gray-300 px-4 py-2 ${s.age >= 23 ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {s.age}
        </td>
        <td class="border border-gray-300 px-4 py-2">{FormatDate(new Date(s.dob))}</td>
        <td class="border border-gray-300 px-4 py-2 text-center">
          <button onClick={() => handleEdit(s.sid)} className="text-black-600 hover:text-blue-800">
            <RiEdit2Line size={20} />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    
    <button className='absolute right-5 bottom-5' onClick={()=>{navigate('studentDetails')}}><CgAdd className='text-6xl'/></button>

    </div>
</div>
  )
}