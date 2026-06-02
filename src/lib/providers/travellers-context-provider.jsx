import { createContext, useContext, useEffect, useState } from "react";
import useQuery from "../hooks/useQuery";
import API_CONFIG from "@/config/api.config";

const TravellerContext = createContext(null);

function TravellerContextProvider({ children }) {
  const [travellers, setTravellers] = useState([]);

  const { data, isLoading, refetchQuery, error } = useQuery(
    API_CONFIG.TRAVELLER.GET_TRAVELLERS
  );

  useEffect(() => {
    if (!isLoading && data) {
      setTravellers(data);
    }
  }, [isLoading, data]);

  function refetchGuests() {
    return refetchQuery();
  }

  return (
    <TravellerContext.Provider
      value={{ isLoading, error, travellers, setTravellers, refetchGuests }}>
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
