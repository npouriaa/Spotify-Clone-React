import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = (url, cParams, dependency) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const options = {
    method: "GET",
    url: `https://shazam.p.rapidapi.com/${url}`,
    params: cParams,
    headers: {
      "X-RapidAPI-Key": "5ea2e1d844msh1cfce842e7192dep12cd96jsn75764fde1511",
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
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [dependency]);

  return { data, loading, error };
};

export default useAxios;
