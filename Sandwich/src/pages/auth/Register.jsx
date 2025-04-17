import axios from "axios";
import React, { useState } from 'react';
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider'
import config from "../../config";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Register = () => {
  const { setIsAuthenticated, setProfile } = useAuth();
  const navigateTo = useNavigate();
    const [loading, setLoading] = useState(false); 

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
  
    const { firstName, lastName, email, mobile, password } = formData;
  
    const formPayload = new FormData();
    formPayload.append("firstName", firstName);
    formPayload.append("lastName", lastName);
    formPayload.append("email", email);
    formPayload.append("phone", mobile); // backend expects "phone"
    formPayload.append("password", password);
  
    try {
      const { data } = await axios.post(
        `${config.apiUrl}/api/users/register`,
        formPayload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      toast.success(data.message || "User registered successfully");
      setProfile(data.user);
  
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
      });
  
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-2xl rounded-2xl w-full max-w-lg p-6 sm:p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading} 
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading} 
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading} 
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading} 
          />
        </div>

        <div className="relative mb-6">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading} 
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {/* {showPassword ? '🙈' : '👁️'} */}
            {showPassword ? <FaEyeSlash /> : <FaEye />}

          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-[#5a1c00] hover:bg-[#7f2800] text-white font-semibold py-2 rounded transition duration-200"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm mt-5 text-gray-700">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
