import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";

const CountryTracks = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingAround, setLoadingAround] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const getAroundYouSongs = async () => {
    const options = {
      method: "GET",
      url: "https://shazam-core7.p.rapidapi.com/charts/get-top-songs-in-country",
      params: { country_code: `${country}` },
      headers: {
        "X-RapidAPI-Key": "cd739a57e7mshd1618539c11c51dp1ead66jsnf377bd88928f",
        "X-RapidAPI-Host": "shazam-core7.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setData(response.daat);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoadingAround(false);
    }
  };

  const getApi = async () => {
    try {
      const response = await axios.get(
        "https://geo.ipify.org/api/v2/country?apiKey=at_kvuiXV2GSlJElbcJRfV7pWbZfapa9"
      );
      setCountry(response?.data?.location?.country);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApi();
  }, [country]);

  if(loading || loadingAround){
    return <Loader/>
  }

  if(error){

  }

  return <div className=""></div>;
};

export default CountryTracks;
