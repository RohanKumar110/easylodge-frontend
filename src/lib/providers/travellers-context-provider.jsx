import { createContext, useContext, useEffect, useState } from "react";
import useQuery from "../hooks/useQuery";
import API_CONFIG from "@/config/api.config";

const TravellerContext = createContext(null);

function TravellerContextProvider({ children }) {
  const [travellers, setTravellers] = useState([]);

  const { data, isLoading, error } = useQuery(API_CONFIG.GUESTS.CREATE_GUESTS);

  useEffect(() => {
    if (!isLoading && data) {
      setTravellers(data);
    }
  }, [isLoading, data]);

  return (
    <TravellerContext.Provider
      value={{ isLoading, error, travellers, setTravellers }}>
      {children}
    </TravellerContext.Provider>
  );
}

function useTravellerContext() {
  const context = useContext(TravellerContext);
  if (!context) {
    throw new Error(
      "useTravellerContext must be used within the TravellerContextProvider"
    );
  }
  return context;
}

export { useTravellerContext };
export default TravellerContextProvider;
