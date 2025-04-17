import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import config from "../config";
import toast from "react-hot-toast";
import { useAuth } from "./AuthProvider";

export const MenuContexts = createContext();

export const MenuProviders = ({ children }) => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

        const { isAuthenticated } = useAuth();

  // Fetch All Menus
  const fetchMenus = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${config.apiUrl}/api/menus`, {
        withCredentials: true,
      });
      setMenus(data);
    } catch (error) {
      // toast.error("Failed to load menus");
    } finally {
      setLoading(false);
    }
  };

  // Create Menu
  const createMenu = async (formData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${config.apiUrl}/api/menus/create`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Menu created successfully");
      fetchMenus();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create menu");
    } finally {
      setLoading(false);
    }
  };

  // Update Menu
  const updateMenu = async (id, formData) => {
    try {
      setLoading(true);
      await axios.put(`${config.apiUrl}/api/menus/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Menu updated successfully");
      fetchMenus();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update menu");
    } finally {
      setLoading(false);
    }
  };

  // Delete Menu
  const deleteMenu = async (id) => {
    try {
      const res = await axios.delete(`${config.apiUrl}/api/menus/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message || "Menu deleted successfully");
      setMenus((prev) => prev.filter((menu) => menu._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete menu");
    }
  };

  // Get Menu by ID
  const getMenuById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`${config.apiUrl}/api/menus/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      toast.error("Menu not found");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get Menus by Name Slug
  const getMenusBySlug = async (slug) => {
    setLoading(true);
    try {
      const res = await axios.get(`${config.apiUrl}/api/menus/name/${slug}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      toast.error("No menus found");
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
    fetchMenus();
    }
  }, []);

  return (
    <MenuContexts.Provider
      value={{
        menus,
        loading,
        fetchMenus,
        createMenu,
        updateMenu,
        deleteMenu,
        getMenuById,
        getMenusBySlug,
      }}
    >
      {children}
    </MenuContexts.Provider>
  );
};

export const  useMenus= () => useContext(MenuContexts);
