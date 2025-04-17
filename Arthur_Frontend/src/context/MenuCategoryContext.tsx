import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import config from "../config";

// Menu Category type
interface MenuCategory {
  _id: string;
  title: string;
  photo?: string;
}

// Subcategory type
interface MenuSubCategory {
  _id: string;
  title: string;
  photo?: string;
  categoryId?: string;
}

// Context type
interface MenuCategoryContextType {
  allCategories: MenuCategory[];
  subCategories: MenuSubCategory[];
  loading: boolean;
  getCategoryById: (id: string) => Promise<MenuCategory | null>;
  fetchSubCategoriesByTitle: (title: string) => Promise<void>;
}

const MenuCategoryContext = createContext<MenuCategoryContextType | undefined>(
  undefined
);

interface MenuCategoryProviderProps {
  children: ReactNode;
}

export const MenuCategoryProvider: React.FC<MenuCategoryProviderProps> = ({
  children,
}) => {
  const [allCategories, setAllCategories] = useState<MenuCategory[]>([]);
  const [subCategories, setSubCategories] = useState<MenuSubCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch All Categories
  const fetchAllCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<MenuCategory[]>(
        `${config.apiUrl}/api/menucategory/all-menu-categories`,
        { withCredentials: true }
      );
      setAllCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get Single Category
  const getCategoryById = async (id: string): Promise<MenuCategory | null> => {
    try {
      const response = await axios.get<MenuCategory>(
        `${config.apiUrl}/api/menucategory/single-menu-category/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching category by ID:", error);
      return null;
    }
  };

  // 🆕 Fetch Subcategories by Title
  const fetchSubCategoriesByTitle = async (title: string): Promise<void> => {
    try {
      const { data } = await axios.get<MenuSubCategory[]>(
        `${config.apiUrl}/api/menucategory/by-title/${title}`,
        { withCredentials: true }
      );
      setSubCategories(data);
    } catch (error) {
      console.error("Error fetching subcategories by title:", error);
      setSubCategories([]); // Clear on error
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <MenuCategoryContext.Provider
      value={{
        allCategories,
        subCategories,
        loading,
        getCategoryById,
        fetchSubCategoriesByTitle,
      }}
    >
      {children}
    </MenuCategoryContext.Provider>
  );
};

export const useMenuCategory = (): MenuCategoryContextType => {
  const context = useContext(MenuCategoryContext);
  if (!context) {
    throw new Error("useMenuCategory must be used within a MenuCategoryProvider");
  }
  return context;
};
