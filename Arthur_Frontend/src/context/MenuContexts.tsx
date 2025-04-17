import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import config from "../config";
import toast from "react-hot-toast";

// Define MenuItem type
export interface MenuItem {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  onSale: boolean;
  image: string;
  saleDescription?: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Define context shape
interface MenuContextProps {
  menus: MenuItem[];
  loading: boolean;
  fetchMenus: () => Promise<void>;
  getMenuById: (id: string) => Promise<MenuItem | null>;
  getMenusByCategory: (category: string) => Promise<MenuItem[]>;
}

// Create context with default empty value
export const MenuContexts = createContext<MenuContextProps | undefined>(
  undefined
);

// Provider props type
interface ProviderProps {
  children: ReactNode;
}

// Context Provider
export const MenuProviders: React.FC<ProviderProps> = ({ children }) => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [subcat,setSubcat] = useState<MenuItem[]>([]);


  console.log("menus",menus);

  // Fetch all menus
  const fetchMenus = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<MenuItem[]>(
        `${config.apiUrl}/api/menus`,
        { withCredentials: true }
      );
      setMenus(data);
    } catch (error) {
      toast.error("Failed to load menus");
    } finally {
      setLoading(false);
    }
  };

  // Get menu by ID
  const getMenuById = async (id: string): Promise<MenuItem | null> => {
    setLoading(true);
    try {
      const { data } = await axios.get<MenuItem>(
        `${config.apiUrl}/api/menus/${id}`,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      toast.error("Menu not found");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Get menus by category
  const getMenusByCategory = async (category: string): Promise<MenuItem[]> => {
    setLoading(true);
    try {
      const { data } = await axios.get<MenuItem[]>(
        `${config.apiUrl}/api/menus/by-category/${category}`,
        { withCredentials: true }
      );
      setSubcat(data);
    } catch (error) {
      // toast.error("Failed to fetch category items");
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  return (
    <MenuContexts.Provider
      value={{ menus, loading, fetchMenus, getMenuById, getMenusByCategory }}
    >
      {children}
    </MenuContexts.Provider>
  );
};

// Custom hook to access the context
export const useMenus = (): MenuContextProps => {
  const context = useContext(MenuContexts);
  if (!context) {
    throw new Error("useMenus must be used within a MenuProviders");
  }
  return context;
};
