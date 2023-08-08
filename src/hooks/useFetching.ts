import { useState } from "react";

const useFetching = (callback: Function): [Function, boolean, string] => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetching = (...data: any) => {
    callback(...data)
      .catch((mesError: any) => {
        setError(mesError);
      })
      .finally(() => setIsLoading(false));
  };
  return [fetching, isLoading, error];
};

export default useFetching;
