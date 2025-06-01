import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Customer from './Customer';
import Items from './Items';
import Orders from './Orders';
import Student from './student';
import StudentDetails from './studentDetails';
import EditStudent from './editStudent';
import CustomerDetails from './customerDetails';
import EditCustomer from './editCustomer';
import AddAppointment from './addAppointment';
import Appointment from './Appointments';
import EditAppointment from './editAppointment';
import ItemDetails from './itemDetails';
import EditItem from './editItem';
import AddOrder from './addOrder';
import EditOrder from './editOrder';
import Dashboard from './dashboard';

export default function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='w-full h-screen flex'>
      <ToastContainer />
      
      {/* Sidebar */}
      <div className='w-[300px] h-full 	bg-blue-300 p-6'>
        <div className='flex flex-col gap-5 mt-10'>
        

          <Link to="/admin/dashboard" className='px-4 py-2 rounded-xl hover:bg-white hover:text-blue-500  font-bold text-blue-700'>Dashboard</Link> 
          <Link to="/admin/student" className='px-4 py-2 rounded-xl hover:bg-white hover:text-blue-500 font-bold text-blue-700'>Student</Link>
          <Link to="/admin/customer" className='px-4 py-2 rounded-xl hover:bg-white hover:text-blue-500 font-bold text-blue-700'>Customer</Link>
          <Link to="/admin/items" className='px-4 py-2 rounded-xl hover:bg-white hover:text-blue-500 font-bold text-blue-700'>Items</Link>
          <Link to="/admin/orders" className='px-4 py-2 rounded-xl hover:bg-white hover:text-blue-500 font-bold text-blue-700'>Orders</Link>
          <Link to="/admin/appointments" className='px-4 py-2 rounded-xl hover:bg-white hover:text-blue-500 font-bold text-blue-700'>Appointments</Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className='mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-white hover:text-blue-500 transition'
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className='w-[calc(100%-300px)] h-full bg-blue-500 overflow-auto'>
        <Routes path="/*">
        <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/student' element={<Student/>} />
          <Route path='/student/studentDetails' element={<StudentDetails />} />
          <Route path='/student/editStudent' element={<EditStudent />} />
          <Route path='/customer' element={<Customer />} />
          <Route path='/customer/customerDetails' element={<CustomerDetails />} />
          <Route path='/customer/editCustomer' element={<EditCustomer />} />
          <Route path='/items' element={<Items />} />
          <Route path='/items/itemDetails' element={<ItemDetails />} />
          <Route path='/items/edititem' element={<EditItem />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/orders/addOrder' element={<AddOrder />} />
          <Route path='/orders/editOrder' element={<EditOrder />} />
          <Route path='/appointments' element={<Appointment />} />
          <Route path='/appointments/addAppointment' element={<AddAppointment />} />
          <Route path='/appointments/editAppointment' element={<EditAppointment />} />
        </Routes>
      </div>
    </div>
  );
}
