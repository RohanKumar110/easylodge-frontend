import { useEffect, useState } from "react";
import axiosInstance from "../axios-instance";

function useQuery(url, options = {}) {
  const optionsKey = JSON.stringify(options);

  const [queryState, setQueryState] = useState({
    data: null,
    isLoading: false,
    error: null,
  });

  async function fetchData() {
    setQueryState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const res = await axiosInstance.get(url, options);

      setQueryState({
        data: res.data,
        isLoading: false,
        error: null,
      });
    } catch (e) {
      setQueryState({
        data: null,
        isLoading: false,
        error: e,
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, [url, optionsKey]);

  return { refetchQuery: fetchData, ...queryState };
}

export default useQuery;
