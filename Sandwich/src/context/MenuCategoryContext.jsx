// MenuCategoryContext.js
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import config from "../config";
import toast from "react-hot-toast";
import { useAuth } from "./AuthProvider";

export const MenuCategoryContext = createContext();

export const MenuCategoryProvider = ({ children }) => {
  const [myCategories, setMyCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);

        const { isAuthenticated } = useAuth();

  // Fetch Categories
  const fetchMyCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${config.apiUrl}/api/menucategory/my-menu-categories`, {
        withCredentials: true,
      });
      setMyCategories(data);
    } catch (error) {
      // toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  // Fetch All Categories
  const fetchAllCategories = async () => {
    try {
      const { data } = await axios.get(`${config.apiUrl}/api/menucategory/all-menu-categories`, {
        withCredentials: true,
      });
      setAllCategories(data);
    } catch (error) {}
  };

  // Create Category
  const createCategory = async (formData) => {
    try {
      setLoading(true);
      let response = await axios.post(`${config.apiUrl}/api/menucategory/create`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        fetchMyCategories();
        fetchAllCategories();
        toast.success("Category created successfully");
        return true; // ✅ success
      } else {
        toast.error("Failed to create category");
        return false; // ❌ failure
      }


    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  // Update Category
  const updateCategory = async (id, formData) => {
    try {
      setLoading(true);
      let response = await axios.put(`${config.apiUrl}/api/menucategory/update/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.status === 200) {
        fetchMyCategories();
        fetchAllCategories();
        toast.success("Category updated successfully");
        return true; // ✅ success
      } else {
        toast.error("Failed to updated category");
        return false; // ❌ failure
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  // Delete Category
  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`${config.apiUrl}/api/menucategory/delete/${id}`, {
        withCredentials: true,
      });

      toast.success(res.data.message || "Category deleted successfully");

      setMyCategories((prev) => prev.filter((cat) => cat._id !== id));
      setAllCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete category");
    }
  };

  // Get Single Category
  const getCategoryById = async (id) => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/menucategory/single-menu-category/${id}`, {
        withCredentials: true,
      });

      if (response.status !== 200) throw new Error("Failed to fetch category");
      return response.data;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
    fetchMyCategories();
    fetchAllCategories();
    }
  }, [isAuthenticated]);

  return (
    <MenuCategoryContext.Provider
      value={{
        myCategories,
        allCategories,
        loading,
        createCategory,
        updateCategory,
        getCategoryById,
        deleteCategory,
      }}
    >
      {children}
    </MenuCategoryContext.Provider>
  );
};

export const useMenuCategory = () => useContext(MenuCategoryContext);
