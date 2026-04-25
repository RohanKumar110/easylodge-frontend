import { useState } from "react";
import axiosInstance from "../axios-instance";

function useMutation(url, method) {
  const [mutateState, setMutateState] = useState({
    data: null,
    isLoading: false,
    error: null,
  });

  async function mutate(payload, callback) {
    setMutateState({
      data: null,
      isLoading: true,
      error: null,
    });

    try {
      const res = await axiosInstance({
        url: url,
        method: method,
        data: payload,
      });

      setMutateState((prev) => ({ ...prev, data: res.data }));

      if (
        callback &&
        callback.onSuccess &&
        typeof callback.onSuccess === "function"
      ) {
        callback.onSuccess(res);
      }
    } catch (e) {
      setMutateState((prev) => ({ ...prev, error: e }));
      if (
        callback &&
        callback.onError &&
        typeof callback.onError === "function"
      ) {
        callback.onError(err);
      }
    } finally {
      setMutateState((prev) => ({ ...prev, isLoading: false }));
    }

    return {
      ...mutateState,
      mutate,
    };
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return queryState;
}

export default useMutation;
