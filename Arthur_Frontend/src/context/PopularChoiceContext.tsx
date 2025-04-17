import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import config from "../config";

// Type definitions
export interface PopularChoice {
  _id: string;
  title: string;
  photo: string;
  // Add any additional fields returned from the API
}

interface PopularChoiceContextType {
  myPopularChoices: PopularChoice[];
  allPopularChoices: PopularChoice[];
  loading: boolean;
  fetchMyPopularChoices: () => Promise<void>;
  fetchAllPopularChoices: () => Promise<void>;
  getPopularChoiceById: (id: string) => Promise<PopularChoice | undefined>;
}

interface PopularChoiceProviderProps {
  children: ReactNode;
}

// Create context with default value
export const PopularChoiceContext = createContext<PopularChoiceContextType | undefined>(undefined);

// Provider component
export const PopularChoiceProvider: React.FC<PopularChoiceProviderProps> = ({ children }) => {
  const [myPopularChoices, setMyPopularChoices] = useState<PopularChoice[]>([]);
  const [allPopularChoices, setAllPopularChoices] = useState<PopularChoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch My Popular Choices
  const fetchMyPopularChoices = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) return;

      setLoading(true);
      const { data } = await axios.get(`${config.apiUrl}/api/popularchoice/my`, {
        withCredentials: true,
      });
      setMyPopularChoices(data);
    } catch (error) {
      console.error("Failed to fetch your choices", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch All Popular Choices
  const fetchAllPopularChoices = async (): Promise<void> => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${config.apiUrl}/api/popularchoice/all`, {
        withCredentials: true,
      });
      setAllPopularChoices(data);
    } catch (error) {
      console.error("Failed to fetch all choices", error);
    } finally {
      setLoading(false);
    }
  };

  const getPopularChoiceById = async (id: string): Promise<PopularChoice | undefined> => {
    try {
      const { data } = await axios.get(`${config.apiUrl}/api/popularchoice/${id}`);
      return data;
    } catch (error) {
      console.error("Failed to fetch popular choice by ID", error);
      return undefined;
    }
  };

  useEffect(() => {
    fetchMyPopularChoices();
    fetchAllPopularChoices();
  }, []);

  return (
    <PopularChoiceContext.Provider
      value={{
        myPopularChoices,
        allPopularChoices,
        loading,
        fetchMyPopularChoices,
        fetchAllPopularChoices,
        getPopularChoiceById,
      }}
    >
      {children}
    </PopularChoiceContext.Provider>
  );
};

// Custom hook to use the context
export const usePopularChoice = (): PopularChoiceContextType => {
  const context = useContext(PopularChoiceContext);
  if (!context) {
    throw new Error("usePopularChoice must be used within a PopularChoiceProvider");
  }
  return context;
};
