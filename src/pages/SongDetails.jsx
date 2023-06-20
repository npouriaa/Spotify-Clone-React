import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGetRelatedSongsQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { songid } = useParams();
  const [errorf, setErrorf] = useState("");
  const [loading, setLoading] = useState(false);
  const [songData, setSongData] = useState(undefined);
  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetRelatedSongsQuery({ songid });

  const options = {
    method: "GET",
    url: "https://shazam.p.rapidapi.com/songs/get-details",
    params: {
      key: songid,
      locale: "en-US",
    },
    headers: {
      "X-RapidAPI-Key": "cd739a57e7mshd1618539c11c51dp1ead66jsnf377bd88928f",
      "X-RapidAPI-Host": "shazam.p.rapidapi.com",
    },
  };
  const get = async () => {
    setLoading(true);
    try {
      const response = await axios.request(options);
      setSongData(response.data);
    } catch (error) {
      setErrorf(error);
      console.error(error);
    }
    setLoading(false);
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  useEffect(() => {
    get();
  }, [songid]);
  console.log(data);

  if (loading || isFetchingRelatedSongs) {
    return <Loader />;
  }

  if (error || errorf) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />
      <div className="mb-10 mt-14">
        <h2 className="text-white text-3xl font-bold">Lyrics :</h2>
        <div className="mt-5 text-gray-400">
          {songData?.sections[1].type === "LYRICS"
            ? songData?.sections[1].text.map((line, i) => <p key={i}>{line}</p>)
            : "Sorry , no lyrics found"}
        </div>
      </div>
      <RelatedSongs
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default SongDetails;
