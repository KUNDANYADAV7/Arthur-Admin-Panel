
import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import config from "@/config";
import toast from "react-hot-toast";

// Blog Interface
export interface Blog {
  _id: string;
  title: string;
  content: string;
  slug: string;
  photo?: string;
  createdAt?: string;
  updatedAt?: string;
  // [key: string]: any; // For any other fields
}

// Context Type
interface BlogContextType {
  allblogs: Blog[];
  loading: boolean;
  getBlogById: (slug: string) => Promise<Blog | null>;
}

// Context Default
const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Provider Props
interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [allblogs, setAllBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch All Blogs
  const fetchAllBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${config.apiUrl}/api/blogs/all-blogs`, {
        withCredentials: true,
      });
      setAllBlogs(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };


  // Get Single Blog
  const getBlogById = async (slug: string): Promise<Blog | null> => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${config.apiUrl}/api/blogs/single-blogs/slug/${slug}`,
        { withCredentials: true }
      );

      if (response.status !== 200) throw new Error("Failed to fetch blog");
      return response.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        allblogs,
        loading,
        getBlogById,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

// Hook
export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};
