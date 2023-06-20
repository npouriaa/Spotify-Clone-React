import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";

const TopCharts = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingAround, setLoadingAround] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [errorAround, setErrorAround] = useState("");

  const getAroundYouSongs = async () => {
    const options = {
      method: "GET",
      url: "https://shazam8.p.rapidapi.com/track/top/country",
      params: { country_code: `${country}`, limit: "4" },
      headers: {
        "X-RapidAPI-Key": "cd739a57e7mshd1618539c11c51dp1ead66jsnf377bd88928f",
        "X-RapidAPI-Host": "shazam8.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
      setErrorAround(error);
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
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApi();
    getAroundYouSongs();
  }, [country]);

  if (loading || loadingAround) {
    return <Loader />;
  }

  if (error || errorAround) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You : {country}
      </h2>
      <div className="flex flex-wrap sm:justify-start xl:justify-center gap-8">
        {data?.tracks.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            i={i}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
