import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import uploadImage from './utils/mediaUploads';

export default function ItemDetails() {
  const navigate = useNavigate()
  const [image, setImage] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [iname, setIname] = useState('')
  const [price, setPrice] = useState(0)

  async function handleSubmit(e) {
    e.preventDefault();
    const promises = [];
    for (let i = 0; i < image.length;i++) {
      const promise = uploadImage(image[i]);
      promises.push(promise);
    }
    const imageUrl = await Promise.all(promises);
    setImageUrl(imageUrl)
    const itemData = {
      iname: iname,
      price: price,
      image: imageUrl
    };

    await axios.post('http://localhost:3000/api/item', itemData, {
      headers: { Authorization: "Bearer " + localStorage.getItem('token') }
    }).then((res)=>{
      
        toast.success(res.data)
        setTimeout(()=>{
          navigate('/admin/items'),1000})
      })
    }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Add Item</h2>
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Item Image */}
        <div>
          <label className="block text-gray-600 mb-1">Item Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files)} />
        </div>

        {/* Item Name */}
        <div>
          <label className="block text-gray-600 mb-1">Item Name</label>
          <input
            id="iname"
            name="iname"
            onChange={(e) => setIname(e.target.value)}
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-600 mb-1">Price (Rs.)</label>
          <input
            id="price"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            type="number"
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
