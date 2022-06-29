import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
    // setTimeout(() => {
    //   setLoading(false);
    // }, 5000);
    setLoading(false);

    return () => {
      source.cancel();
    };
  }, [url]);

  const reFetchData = async (refetchUrl) => {
    setLoading(true);
    setData(null);
    setError(null);
    try {
      const res = await axios.get(refetchUrl);
      setData(res.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetchData };
};

export default useFetch;
