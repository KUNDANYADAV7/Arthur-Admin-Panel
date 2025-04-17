import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import config from "../config";
import toast from "react-hot-toast";
import { useAuth } from "./AuthProvider";

export const PopularChoiceContext = createContext();

export const PopularChoiceProvider = ({ children }) => {
  const [myPopularChoices, setMyPopularChoices] = useState([]);
  const [allPopularChoices, setAllPopularChoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated } = useAuth();

  // Fetch My Popular Choices
  const fetchMyPopularChoices = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) return;

      setLoading(true);
      const { data } = await axios.get(`${config.apiUrl}/api/popularchoice/my`, {
        withCredentials: true,
      });
      setMyPopularChoices(data);
    } catch (error) {
      // toast.error("Failed to fetch your choices");
    } finally {
      setLoading(false);
    }
  };

  // Fetch All Popular Choices
  const fetchAllPopularChoices = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${config.apiUrl}/api/popularchoice/all`, {
        withCredentials: true,
      });
      setAllPopularChoices(data);
    } catch (error) {
      // toast.error("Failed to fetch all choices");
    } finally {
      setLoading(false);
    }
  };

  // Create
  const createPopularChoice = async (formData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${config.apiUrl}/api/popularchoice/create`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Popular choice created");
      fetchMyPopularChoices();
      fetchAllPopularChoices();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create");
    } finally {
      setLoading(false);
    }
  };

  // Update
  const updatePopularChoice = async (id, formData) => {
    try {
      setLoading(true);
      await axios.put(`${config.apiUrl}/api/popularchoice/update/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Updated successfully");
      fetchMyPopularChoices();
      fetchAllPopularChoices();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const deletePopularChoice = async (id) => {
    try {
      const res = await axios.delete(`${config.apiUrl}/api/popularchoice/delete/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message || "Deleted successfully");

      // Optimistic update
      setMyPopularChoices((prev) => prev.filter((item) => item._id !== id));
      setAllPopularChoices((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  };

  const getPopularChoiceById = async (id) => {
    try {
      const res = await axios.get(`${config.apiUrl}/api/popularchoice/${id}`);
      return res.data;
    } catch (error) {
      console.error("Failed to fetch popular choice by ID", error);
    }
  };
  

  useEffect(() => {
    if (isAuthenticated) {
      fetchMyPopularChoices();
      fetchAllPopularChoices();
    }
  }, [isAuthenticated]);

  return (
    <PopularChoiceContext.Provider
      value={{
        myPopularChoices,
        allPopularChoices,
        loading,
        createPopularChoice,
        updatePopularChoice,
        deletePopularChoice,
        fetchAllPopularChoices,
        fetchMyPopularChoices,
        getPopularChoiceById
      }}
    >
      {children}
    </PopularChoiceContext.Provider>
  );
};

export const usePopularChoice = () => useContext(PopularChoiceContext);
