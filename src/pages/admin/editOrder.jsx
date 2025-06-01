import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditOrder() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cid, setCid] = useState(location.state.cid);
  const [itemid, setItemid] = useState(location.state.itemid);
  const [orderdate, setOrderdate] = useState(location.state.orderdate);
  const [customer, setCustomers] = useState([]);
  const [items, setItems] = useState([]);

  // Load customers and items for dropdowns
  useEffect(() => {
    axios.get('http://localhost:3000/api/customer')
      .then(res => setCustomers(res.data))
      .catch(() => toast.error("Failed to load customers"));

    axios.get('http://localhost:3000/api/item')
      .then(res => setItems(res.data))
      .catch(() => toast.error("Failed to load items"));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await axios.put(
        `http://localhost:3000/api/order/${location.state.oid}`,
        { cid, itemid, orderdate },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
      );
      toast.success(result.data);
      navigate('/admin/orders');
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Edit Order</h2>

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
            value={itemid}
            onChange={(e) => setItemid(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">-- Select an item --</option>
            {items.map((i) => (
              <option key={i.itemid} value={i.itemid}>
                {i.iname} (ID: {i.itemid})
              </option>
            ))}
          </select>
        </div>

        {/* Order Date */}
        <div>
          <label className="block text-gray-600 mb-1">Order Date</label>
          <input
            id="orderdate"
            name="orderdate"
            value={new Date(orderdate).toISOString().split('T')[0]}
            onChange={(e) => setOrderdate(e.target.value)}
            type="date"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
