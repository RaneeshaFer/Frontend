// src/pages/Logout.jsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the authentication token
    localStorage.removeItem('token');

    // Show a logout success message
    toast.success("Logged out successfully");

    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  }, [navigate]);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="text-center text-gray-700 text-xl">
        Logging you out...
      </div>
    </div>
  );
}
