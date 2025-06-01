import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import uploadImage from './utils/mediaUploads';

export default function CustomerDetails() {
    const navigate = useNavigate();
    const [image, setImage] = useState('');
      const [imageUrl, setImageUrl] = useState('');
      //const [cid, setCid] = useState('');
      const [cname, setCname] = useState('');
      const [address, setAddress] = useState('');
      const [dob, setDob] = useState('');
      const [telephone, setTelephone] = useState(0);
    
      async function handleSubmit(e) {
        e.preventDefault();
    
        const promises = [];
        for (let i = 0; i < image.length; i++) {
          const promise = uploadImage(image[i]);
          promises.push(promise);
        }
    
        const imageUrl = await Promise.all(promises);
        setImageUrl(imageUrl);
    
        const customerData = {
          //cid: cid,
          cname: cname,
          address: address,
          dob: dob,
          telephone: telephone,
          image: imageUrl
        }
    
       const res= await axios.post('http://localhost:3000/api/customer', customerData, {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
        .then((res) => {
          toast.success(res.data);
          setTimeout(() => {
            navigate('/admin/customer'),1000})
        })
      }
    
      return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Add Customer</h2>
    
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Customer ID */}
            {/*<div>
              <label className="block text-gray-600 mb-1">Customer ID</label>
              <input
                id="cid"
                name="cid"
                onChange={(e) => setCid(e.target.value)}
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          {/* Item Image */}
        <div>
          <label className="block text-gray-600 mb-1">Customer Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files)} />
        </div>
            {/* Customer Name */}
            <div>
            {/*<input type='file' onChange={(e)=>{setImage(e.target.files)}}/>*/}
              <label className="block text-gray-600 mb-1">Customer Name</label>
              <input
                id="cname"
                name="cname"
                onChange={(e) => setCname(e.target.value)}
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            {/* Address */}
            <div>
              <label className="block text-gray-600 mb-1">Address</label>
              <input
                id="address"
                name="address"
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            {/* Telephone */}
            <div>
              <label className="block text-gray-600 mb-1">Telephone No</label>
              <input
                id="telephone"
                name="telephone"
                onChange={(e) => setTelephone(e.target.value)}
                type="tel"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            {/* Date of Birth */}
            <div>
              <label className="block text-gray-600 mb-1">Date of Birth</label>
              <input
                id="dob"
                name="dob"
                onChange={(e) => setDob(e.target.value)}
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
      );
    }
    

