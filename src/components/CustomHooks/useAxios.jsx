import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = (url, cParams, dependency) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const options = {
    method: "GET",
    url: `https://shazam.p.rapidapi.com/${url}`,
    params: cParams,
    headers: {
      "X-RapidAPI-Key": "6042030023msh33b7e8581423f38p1b3cd7jsn81b81f32eb90",
      "X-RapidAPI-Host": "shazam.p.rapidapi.com",
    },
  };

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [dependency]);

  return { data, loading, error };
};

export default useAxios;
