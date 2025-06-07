import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FormatDate } from './date'; 
import { CgAdd } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';

export default function Customer() {
    const [customer, setCustomer] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/customer`);
                setCustomer(res.data);
            } catch (error) {
                toast.error(error.message);
            }
        };
        fetchCustomer();
    }, []);
    function handleDelete(cid){
      if(window.confirm("Are you sure you want to delete this customer?")){
        axios.delete(`${import.meta.env.VITE_BASE_URL}/api/customer/${cid}`,{headers:{Authorization:"Bearer "+localStorage.getItem('token')}}).then((res)=>{
          toast.success(res.data.msg);
          setCustomer(customer.filter((c)=>c.cid!==cid));
        }).catch((error)=>{
          toast.error(error.message);
        })
      }
    } 
    return (
        <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-gray-700">Customer Details</h2>
            <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gradient-to-r from-green-500 to-green-700 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Customer ID</th>
                            <th className="py-3 px-6 text-left">Image</th>
                            <th className="py-3 px-6 text-left">Customer Name</th>
                            <th className="py-3 px-6 text-left">Address</th>
                            <th className="py-3 px-6 text-left">DOB</th>
                            <th className="py-3 px-6 text-left">Telephone No</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {customer.map((c) => (
                            <tr key={c.cid} className="border-b hover:bg-gray-100">
                                <td className="py-4 px-6">{c.cid}</td>
                                <td className="py-4 px-6"><img src={c.image} alt="" className="w-12 h-12 rounded-full" /></td>
                                <td className="py-4 px-6">{c.cname}</td>
                                <td className="py-4 px-6">{c.address}</td>
                                <td className="py-4 px-6">{FormatDate(new Date(c.dob))}</td>
                                <td className="py-4 px-6">{c.telephone}</td>
                                <th className="py-4 px-6 flex">
                                <FaEdit className='text-blue-600 hover:text-blue-800 cursor-pointer' onClick={()=>navigate('/admin/customer/editCustomer',{state:c})}/>
                                <FaRegTrashAlt className='text-red-500 hover:text-red-700 cursor-pointer ml-4' onClick={()=>handleDelete(c.cid)}/>
                                </th>   
                                    
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="absolute right-5 bottom-5" onClick={()=>{navigate('customerDetails')}}><CgAdd className='text-6xl'/></button>
                
            </div>
        </div>
    )
}

