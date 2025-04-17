import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import config from '../../config';
import toast from 'react-hot-toast';
import axios from 'axios';

const generateCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();
  const navigate = useNavigate(); // Use navigate to redirect

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [inputCaptcha, setInputCaptcha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission (login)
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (inputCaptcha !== captcha) {
      setError('Captcha does not match');
      setCaptcha(generateCaptcha());
      return;
    }

    setError('');
    setLoading(true); // Start loading state

    try {
      const { data } = await axios.post(
        `${config.apiUrl}/api/users/login`,
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // Check if the token exists in the response to ensure successful login
      if (data.token) {
        localStorage.setItem("jwt", data.token); // Store JWT token in localStorage
        setProfile(data.user || {}); // Set user profile data
        setIsAuthenticated(true); // Set authentication state to true

        toast.success(data.message || "Login successful");

        // Reset form fields
        setEmail('');
        setPassword('');

        // Redirect to home page after successful login
        navigate('/');
      } else {
        throw new Error("Login failed. No token received.");
      }
    } catch (error) {
      if (!isAuthenticated) {
        toast.error(error.response?.data?.message || "Invalid credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center text-[#5a1c00] mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email input */}
          <div>
            <label className="block text-sm font-medium text-[#5a1c00]">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password input */}
          <div>
            <label className="block text-sm font-medium text-[#5a1c00]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {/* Captcha input */}
          <div>
            <label className="block text-sm font-medium text-[#5a1c00] mb-1">Enter Captcha</label>
            <div className="flex items-center justify-between gap-3">
              <div className="bg-gray-200 text-lg font-mono px-4 py-2  tracking-widest">{captcha}</div>
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
                onClick={() => setCaptcha(generateCaptcha())}
              >
                Refresh
              </button>
            </div>
            <input
              type="text"
              className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputCaptcha}
              onChange={(e) => setInputCaptcha(e.target.value)}
              required
            />
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-[#5a1c00] hover:bg-[#7f2800] text-white rounded py-2 transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Add the Register and Forgot Password Links */}
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
          <p>
            Forgot your password?{' '}
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Reset it
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
