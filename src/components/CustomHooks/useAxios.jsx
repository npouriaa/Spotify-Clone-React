import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = (url, cParams , dependency) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    const options = {
      method: "GET",
      url: `https://shazam.p.rapidapi.com/${url}`,
      params: cParams,
      headers: {
        "X-RapidAPI-Key": "0d8112b4cdmshf2fb8297ca27afbp1b352ajsn5b79f73763cb",
        "X-RapidAPI-Host": "shazam.p.rapidapi.com",
      },
    };

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [dependency]);

  return { data, loading, error };
};

export default useAxios;
