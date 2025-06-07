import axios from 'axios';
import React, {useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditAppointment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cid, setCid] = useState(location.state.cid);
  const [adate, setAdate] = useState(location.state.adate);
  const [details, setDetails] = useState(location.state.details);
  const [customer,setCustomer ] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/customer`)
      .then(res => setCustomer(res.data))
      .catch(err => toast.error("Failed to load customers"));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/appointment/${location.state.aid}`,
        { cid, adate, details },
        {headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}});
      toast.success(result.data);
      navigate('/admin/appointments');
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Edit Appointment</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Customer Dropdown */}
          <div>
          <label className="block text-gray-600 mb-1">Select Customer</label>
          <select
            value={cid}
            onChange={(e) => setCid(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select a customer --</option>
            {customer.map((c) => (
              <option key={c.cid} value={c.cid}>
                {c.cname} (ID: {c.cid})
              </option>
            ))}
          </select>
        </div>

        {/* Appointment Date */}
        <div>
          <label className="block text-gray-600 mb-1">Appointment Date</label>
          <input
            id="adate"
            name="adate"
            value={new Date(adate).toISOString().split('T')[0]}
            onChange={(e) => setAdate(e.target.value)}
            type="date"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Details */}
        <div>
          <label className="block text-gray-600 mb-1">Details</label>
          <textarea
            id="details"
            name="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
            rows={3}
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
