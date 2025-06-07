import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import uploadImage from './utils/mediaUploads';


export default function StudentDetails() {
  const navigate=useNavigate();
  const[image,setImage]=useState('');
  const[imageUrl,setImageUrl]=useState('')
    // const[sid,setSid]=useState('');
  const[sname,setSname]=useState('');
  const[age,setAge]=useState(0);
  const[dob,setDob]=useState('');

  async function handleSubmit(e){
    
    e.preventDefault();
    const promises=[];
    for(let i=0;i<image.length;i++){
      const promise=uploadImage(image[i]);
      promises.push(promise);
    }
    const imageUrl=await Promise.all(promises);
    setImageUrl(imageUrl)
    const stData={
      // sid:sid,
      sname:sname,
      age:age,
      dob:dob,
      image:imageUrl
    }
    
    const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/student`,stData,{
      headers:{Authorization:"Bearer "+localStorage.getItem('token')}
    }).then((res)=>{
      
      toast.success(res.data)
      setTimeout(()=>{
        navigate('/admin/student'),1000})
    })
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Add Student</h2>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Student Image */}
        <div>
          <label className="block text-gray-600 mb-1">Student Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files)} />
        </div>
            {/* Student ID */}
            {/* <div>
              <label className="block text-gray-600 mb-1">Student ID</label>
              <input
                id="sid"
                name="sid"
                onChange={(e) => {
                  setSid(e.target.value);
                  }}
                
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}
      
            {/* Student Name */}
            <div>
              {/*<input type='file' onChange={(e)=>{setImage(e.target.files)}}/>*/}
              <label className="block text-gray-600 mb-1" >Student Name</label>
              <input
                id="sname"
                name="sname"
                onChange={(e) => {
                  setSname(e.target.value);
                }}
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            {/* Age */}
            <div>
              <label className="block text-gray-600 mb-1" >Age</label>
              <input
                id="age"
                name="age"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                type="number"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            {/* Date of Birth */}
            <div>
              <label className="block text-gray-600 mb-1" >Date of Birth</label>
              <input
                id="dob"
                name="dob"
                onChange={(e) => {
                  setDob(e.target.value);
                }}
                type="date"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
  )
}
