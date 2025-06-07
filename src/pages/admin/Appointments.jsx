import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CgAdd } from "react-icons/cg";
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/appointment`);
        setAppointments(res.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchAppointments();
  }, []);

  function handleDelete(aid) {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      axios.delete(`${import.meta.env.VITE_BASE_URL}/api/appointment/${aid}`, {headers: {Authorization: "Bearer " + localStorage.getItem('token')}}).then((res) => {
        toast.success(res.data.msg);
        setAppointments(appointments.filter((a) => a.aid !== aid));
      }).catch((error) => {
        toast.error(error.message);
      })
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Appointments</h2>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full shadow-md overflow-x-hidden">
          <thead className="bg-gradient-to-r from-green-500 to-green-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Appointment ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Customer ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Details</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100 text-gray-800">
            {appointments.map((a) => (
              <tr key={a.aid} className="hover:bg-blue-50 transition">
                <td className="px-6 py-4">{a.aid}</td>
                <td className="px-6 py-4">{a.cid}</td>
                <td className="px-6 py-4">{new Date(a.adate).toLocaleDateString()}</td>
                <td className="px-6 py-4">{a.details}</td>
                <td className="px-6 py-4 flex items-center space-x-4">
                  <FaEdit className="text-blue-600 hover:text-blue-800 cursor-pointer" onClick={() => navigate('/admin/appointments/editAppointment', { state: a })}/>
                  <FaRegTrashAlt className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => handleDelete(a.aid)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="absolute right-6 bottom-6"onClick={() => navigate('addAppointment')}><CgAdd className="text-6xl" />
      </button>
    </div>
  );
}
