import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import uploadImage from './utils/mediaUploads';

export default function EditCustomer() {
  const navigate = useNavigate();
  const location = useLocation();

  const [image, setImage] = useState(location.state.image)
  const [imageUrl, setImageUrl] = useState(location.state.imageUrl)
  //const [cid, setCid] = useState(location.state.cid);
  const [cname, setCname] = useState(location.state.cname)
  const [address, setAddress] = useState(location.state.address)
  const [dob, setDob] = useState(location.state.dob)
  const [telephone, setTelephone] = useState(location.state.telephone)

  async function handleSubmit(e) {
    e.preventDefault();

    const promises = [];
    for (let i = 0; i < image.length; i++) {
      const promise = uploadImage(image[i]);
      promises.push(promise);
    }
    const imageUrl = await Promise.all(promises);
    setImageUrl(imageUrl);

    try {
      const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/customer/${location.state.cid}`,
        {cname,address,dob,telephone,image: imageUrl[0]},
        {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
      toast.success(result.data);
      navigate('/admin/customer');
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Edit Customer</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Customer Image */}
        <div>
          <label className="block text-gray-600 mb-1">Customer Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files)} />
        </div>
       {/* Customer Name */}
        <div>
        {/*<input type="file" onChange={(e) => setImage(e.target.files)} />*/}
          <label className="block text-gray-600 mb-1">Customer Name</label>
          <input
            id="cname"
            name="cname"
            value={cname}
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
            value={address}
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
            value={telephone}
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
            value={new Date(dob).toISOString().split('T')[0]}
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

