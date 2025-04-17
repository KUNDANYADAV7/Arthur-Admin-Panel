import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import config from "../config";

// 1. Define the shape of a single offer
export interface Offer {
  _id: string;
  title: string;
  description: string;
  photo: string;
  discount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  validFrom: string;
  validUntil: string

  // add other properties as needed
}

// 2. Define the shape of the context value
interface OfferContextType {
  allOffers: Offer[];
  loading: boolean;
  getOfferById: (id: string) => Promise<Offer | null>;
}

// 3. Create context with default empty value
export const OfferContext = createContext<OfferContextType | undefined>(undefined);

// 4. Define provider props
interface OfferProviderProps {
  children: ReactNode;
}

export const OfferProvider: React.FC<OfferProviderProps> = ({ children }) => {
  const [allOffers, setAllOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch all active offers
  const fetchAllOffers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<Offer[]>(
        `${config.apiUrl}/api/offers/all-offers`,
        { withCredentials: true }
      );
      setAllOffers(data);
    } catch (error) {
      // console.error("Failed to load offers", error);
    } finally {
      setLoading(false);
    }
  };

  // Get single offer
  const getOfferById = async (id: string): Promise<Offer | null> => {
    setLoading(true);
    try {
      const response = await axios.get<Offer>(
        `${config.apiUrl}/api/offers/single-offer/${id}`,
        { withCredentials: true }
      );
      if (response.status !== 200) throw new Error("Failed to fetch offer");
      return response.data;
    } catch (error) {
      // console.error("Error fetching offer:", error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOffers();
  }, []);

  return (
    <OfferContext.Provider value={{ allOffers, loading, getOfferById }}>
      {children}
    </OfferContext.Provider>
  );
};

// 5. Create a custom hook to use the context
export const useOffer = (): OfferContextType => {
  const context = useContext(OfferContext);
  if (!context) {
    throw new Error("useOffer must be used within an OfferProvider");
  }
  return context;
};
