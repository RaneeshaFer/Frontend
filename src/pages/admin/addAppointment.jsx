import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddAppointment() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState([]);
  const [cid, setCid] = useState('');
  const [adate, setAdate] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/customer`)
      .then(res => setCustomer(res.data))
      .catch(err => toast.error("Failed to load customers"));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const appointmentsData = {
      cid: cid,
      adate:adate,
      details:details
    };

    const res= await axios.post(`${import.meta.env.VITE_BASE_URL}/api/appointment`, appointmentsData, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then((res) => {
      toast.success(res.data);
      setTimeout(() => {
        navigate('/admin/appointments')},1000)
    })
  }
  
  


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Add Appointment</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
         {/* Customer ID */}
           {/* < div>
              <label className="block text-gray-600 mb-1">Customer ID</label>
              <input
                id="cid"
                name="cid"
                onChange={(e) => {
                  setCid(e.target.value);
                  }}
                
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
                </div> */}
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
       

        {/* Date Input */}
        <div>
          <label className="block text-gray-600 mb-1">Appointment Date</label>
          <input
            type="date"
            value={adate}
            onChange={(e) => setAdate(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Details */}
        <div>
          <label className="block text-gray-600 mb-1">Details</label>
          <textarea
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
