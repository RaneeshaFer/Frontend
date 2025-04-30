import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Customer from './Customer'
import Items from './Items'
import Orders from './Orders'
import Appoinments from './Appoinments'
import Student from './Student'
import { ToastContainer } from 'react-toastify'
import StudentDetails from './studentDetails'
import EditStudent from './editStudent'

export default function AdminPage() {
  return (
    <div className='w-full h-screen flex'>
      <ToastContainer/>
        <div className='w-[300px] h-full bg-blue-500 relative'>
            <div className='absolute top-20 left-10 p-5 flex flex-col gap-8 '>
            <Link to="/admin/dashboard" className='p-5 hover:bg-white rounded-2xl'>Dashboard</Link>
            <Link to="/admin/student" className='p-5 hover:bg-white rounded-2xl'>Student</Link>
            <Link to="/admin/items" className='p-5 hover:bg-white rounded-2xl'>Items</Link>
            <Link to="/admin/orders" className='p-5 hover:bg-white rounded-2xl'>Orders</Link>
            <Link to="/admin/appoinments"className='p-5 hover:bg-white rounded-2xl'>Appoinments</Link>

           
          
        </div>
        
        </div>
        <div className='w-[calc(100%-300px)] h-full bg-green-500'>
          <Routes path="/*">

          <Route path='/student/studentDetails' element={<StudentDetails/>}/>
          <Route path='/items' element={<Items/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/appoinments' element={<Appoinments/>}/>
          <Route path='/student' element={<Student/>}/>
          <Route path='/student/editStudent' element={<EditStudent/>}/>
          
          
          </Routes>
          
          
        </div>
    </div>
    
  )
}

