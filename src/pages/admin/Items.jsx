import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CgAdd } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';

export default function Item() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/item');
        setItems(res.data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchItems();
  }, []);

  function handleDelete(itemid) {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios.delete(`${import.meta.env.VITE_BASE_URL}/api/item/${itemid}`, {headers: { Authorization: "Bearer " + localStorage.getItem('token') }}).then((res) => {
        toast.success(res.data.msg);
        setItems(items.filter((item) => item.itemid !== itemid));
      }).catch((error) => {
        toast.error(error.message);
      })
    }
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-gray-700">Items</h2>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-green-500 to-green-700 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Item ID</th>
                <th class="py-3 px-6 text-left">Image</th>
                <th className="py-3 px-6 text-left">Item Name</th>
                <th className="py-3 px-6 text-left">Price (Rs.)</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {items.map((item) => (
                <tr key={item.itemid} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{item.itemid}</td>
                  <td class="py-3 px-6"><img src={item.image} alt="" class="w-12 h-14  object-cover"/></td>
                  <td className="py-3 px-6">{item.iname}</td>
                  <td className={`py-3 px-6 ${item.price > 1000 ? 'bg-red-200' : 'bg-green-200'}`}>
                    Rs. {item.price}
                  </td>
                  <td className="py-3 px-6 text-left flex items-center ">
                    <FaEdit className="text-blue-600 hover:text-blue-800 cursor-pointer"onClick={() => navigate('/admin/items/editItem', { state: item })}/>
                    <FaRegTrashAlt className="text-red-500 hover:text-red-700 cursor-pointer ml-4" onClick={() => handleDelete(item.itemid)}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="absolute right-5 bottom-5" onClick={() => navigate('itemDetails')}> <CgAdd className="text-6xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
