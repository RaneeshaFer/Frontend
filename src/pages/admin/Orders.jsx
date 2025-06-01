import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CgAdd } from "react-icons/cg";
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';

export default function Order() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/order');
        setOrders(res.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchOrders();
  }, []);

  function handleDelete(oid) {
    if (window.confirm("Are you sure you want to delete this order?")) {
      axios.delete(`http://localhost:3000/api/order/${oid}`, {headers: { Authorization: "Bearer " + localStorage.getItem('token') }}).then((res) => {
        toast.success(res.data.msg);
        setOrders(orders.filter((o) => o.oid !== oid));
      }).catch((error) => {
        toast.error(error.message);
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-gray-700">Orders</h2>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-green-500 to-green-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Customer ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Item ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Order Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100 text-gray-800">
            {orders.map((o) => (
              <tr key={o.oid} className="hover:bg-green-50 transition">
                <td className="px-6 py-3">{o.oid}</td>
                <td className="px-6 py-3">{o.cid}</td>
                <td className="px-6 py-3">{o.itemid}</td>
                <td className="px-6 py-3">{new Date(o.orderdate).toLocaleDateString()}</td>
                <td className="px-6 py-3 flex items-center space-x-4">
                  <FaEdit className="text-blue-600 hover:text-blue-800 cursor-pointer" onClick={() => navigate('/admin/orders/editOrder', { state: o })} />
                  <FaRegTrashAlt className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => handleDelete(o.oid)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="absolute right-6 bottom-6" onClick={() => navigate('addOrder')}><CgAdd className="text-6xl t" />
      </button>
    </div>
  );
}
