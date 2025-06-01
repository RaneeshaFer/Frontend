import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import uploadImage from './utils/mediaUploads';


export default function EditStudent() {
  const navigate=useNavigate()
  const location=useLocation()
 //console.log(location)
  // const[sid,setSid]=useState('');
  const[image,setImage]=useState(location.state.image)
  const[imageUrl,setImageUrl]=useState(location.state.imageUrl)
  const[sname,setSname]=useState(location.state.sname)
  const[age,setAge]=useState(location.state.age)
  const[dob,setDob]=useState(location.state.dob)

  async function handleSubmit(e){
    e.preventDefault();
      const promises=[];
      for(let i=0;i<image.length;i++){
        const promise=uploadImage(image[i]);
        promises.push(promise);
      }
      const imageUrl=await Promise.all(promises);
      setImageUrl(imageUrl)
    try {
      const result=axios.put(`http://localhost:3000/api/student/${location.state.sid}`,
      {sname,age,dob,image: imageUrl[0]},
      {headers:{Authorization:"Bearer "+localStorage.getItem('token')}});
      
      toast.success(result.data)
      navigate('/admin/student')
        
      }catch(error){
   toast.error(error.message)
    }
   

  }
   return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Student Form</h2>
          
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
           {/* <input type='file' onChange={(e)=>{setImage(e.target.files)}}/>*/}
              <label className="block text-gray-600 mb-1" >Student Name</label>
              <input
                id="sname"
                name="sname"
                onChange={(e) => {
                  setSname(e.target.value);
                }}
                value={sname}
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
                value={age}
                type="number"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            {/* Date of Birth */}
            <div>
              <label className="block text-gray-600 mb-1" >Date of Birth</label>
              <input
              type="date"
                id="dob"
                name="dob"
                onChange={(e) => {
                  setDob(e.target.value);
                }}
                value={new Date(dob).toISOString().split('T')[0]}
                
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
