import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import config from "../config";
import toast from "react-hot-toast";
import OfflineScreen from "../components/OfflineScreen";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Step 1: add loading state

  const [isOffline, setIsOffline] = useState(!navigator.onLine); 

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
  
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
  
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("jwt");
  
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
  
      if (!navigator.onLine) {
        // No internet but token exists => assume user is logged in
        setIsAuthenticated(true);
        return;
      }
  
      const { data } = await axios.get(`${config.apiUrl}/api/users/my-profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
  
      setProfile(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem("jwt");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (formData) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.put(
        `${config.apiUrl}/api/users/update-profile/${profile._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setProfile(data.user);
      toast.success("Profile updated successfully!");
    } catch (error) {
      if (error.response?.data?.message === "Phone number already exists") {
        toast.error("Phone number already exists. Please use a different one.");
      } else {
        toast.error("Failed to update profile");
      }
    }
  };

  const handleLogout = async (navigateTo) => {
    try {
      const { data } = await axios.get(`${config.apiUrl}/api/users/logout`, {
        withCredentials: true,
      });
  
      localStorage.removeItem("jwt");
      setProfile(null);
      setIsAuthenticated(false);
      toast.success(data.message);
  
      if (typeof navigateTo === 'function') {
        navigateTo("/login");
      } else if (typeof navigateTo === 'string' && window.location) {
        // Fallback for string path
        window.location.href = navigateTo;
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };
  

  // Step 3: return loader during loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (isOffline) {
    return <OfflineScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
        handleLogout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
