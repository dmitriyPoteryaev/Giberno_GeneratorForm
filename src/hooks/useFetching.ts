import { AnyCnameRecord } from "dns";

import { useState } from "react";

const useFetching = (callback: Function): any => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetching = async (...data: any) => {
    try {
      await callback(...data);
    } catch (mesError: any) {
      setError(mesError);
    } finally {
      setIsLoading(false);
    }
  };
  return [fetching, isLoading, error];
};

export default useFetching;
