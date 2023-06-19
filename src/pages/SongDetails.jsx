import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { songid } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [songData, setSongData] = useState(undefined);

  const options = {
    method: "GET",
    url: "https://shazam.p.rapidapi.com/songs/get-details",
    params: {
      key: songid,
      locale: "en-US",
    },
    headers: {
      "X-RapidAPI-Key": "5de83059abmshef6fcc6665ffe65p1835e5jsne137aeecb548",
      "X-RapidAPI-Host": "shazam.p.rapidapi.com",
    },
  };
  const get = async () => {
    setLoading(true);
    try {
      const response = await axios.request(options);
      setSongData(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    get();
  }, [songid]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId='' songData={songData} />
      <div className="mb-10 mt-14">
        <h2 className="text-white text-3xl font-bold">Lyrics :</h2>
        <div className="mt-5 text-gray-400">
          {songData?.sections[1].type === "LYRICS"
            ? songData?.sections[1].text.map((line, i) => <p key={i}>{line}</p>)
            : "Sorry , no lyrics found"}
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
