import { useEffect, useState } from "react";
import axiosInstance from "../axios-instance";

function useQuery(url, options = {}) {
  const [queryState, setQueryState] = useState({
    data: null,
    isLoading: false,
    error: null,
  });

  async function fetchData() {
    setQueryState({
      data: null,
      isLoading: true,
      error: null,
    });

    try {
      const res = await axiosInstance.get(url, options);
      setQueryState((prev) => ({ ...prev, data: res.data }));
    } catch (e) {
      setQueryState((prev) => ({ ...prev, error: e }));
    } finally {
      setQueryState((prev) => ({ ...prev, isLoading: false }));
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return { ...queryState };
}

export default useQuery;
