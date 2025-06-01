import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddOrder() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState([]);
  const [items, setItem] = useState([]);
  const [cid, setCid] = useState('');
  const [orderdate, setOrderdate] = useState('');
  const [itemid, setItemid] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/customer')
      .then(res => setCustomer(res.data))
      .catch(err => toast.error("Failed to load customers"));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/api/item')
      .then(res => setItem(res.data))
      .catch(err => toast.error("Failed to load items"));
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();

    const orderData = {
      cid: cid,
      orderdate: orderdate,
      itemid: itemid
    };

    
        const res= await axios.post('http://localhost:3000/api/order', orderData, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
          }).then((res) => {
            toast.success(res.data);
            setTimeout(() => {
              navigate('/admin/orders')},1000)
          })
        }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Add Order</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Customer Dropdown */}
        <div>
          <label className="block text-gray-600 mb-1">Select Customer</label>
          <select
            value={cid}
            onChange={(e) => setCid(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">-- Select a customer --</option>
            {customer.map((c) => (
              <option key={c.cid} value={c.cid}>
                {c.cname} (ID: {c.cid})
              </option>
            ))}
          </select>
        </div>
        {/* Item Dropdown */}
        <div>
          <label className="block text-gray-600 mb-1">Select Item</label>
          <select
            type="text"
            value={itemid}
            onChange={(e) => setItemid(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">-- Select an item --</option>
            {items.map((item) => (
              <option key={item.itemid} value={item.itemid}>
                {item.iname} (ID: {item.itemid})
              </option>
            ))}
          </select>
        </div>

        {/* Order Date */}
        <div>
          <label className="block text-gray-600 mb-1">Order Date</label>
          <input
            type="date"
            value={orderdate}
            onChange={(e) => setOrderdate(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          
        </div>

         {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
