import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import useAxios from "../components/CustomHooks/useAxios";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { songid } = useParams();
  const {
    data: relatedSongsData,
    isFetching: isFetchingRelatedSongs,
    error: relatedSongsError,
  } = useAxios("songs/list-recommendations", { key: songid }, songid);

  const {
    data: songDetailsData,
    isFetching: isFetchingSongDetails,
    error: errorSongDetails,
  } = useAxios("songs/get-details", { key: songid }, songid);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const hasPersianChars = (text) => {
    const persianRegex = /[\u0600-\u06FF]/;
    return persianRegex.test(text);
  };

  if (isFetchingSongDetails || isFetchingRelatedSongs) {
    return <Loader />;
  }

  if (relatedSongsError || errorSongDetails) {
    return <Error />;
  }

  return (
    <div className="flex flex-col mt-20 lg:mt-0">
      <DetailsHeader songData={songDetailsData} />
      <div className="mb-10 mt-14">
        <h2 className="text-white text-3xl font-bold">Lyrics :</h2>
        <div className="mt-5 text-gray-400">
          {songDetailsData?.sections[1].type === "LYRICS"
            ? songDetailsData?.sections[1].text.map((line, i) =>
                !hasPersianChars(line) ? (
                  <p key={i}>{line}</p>
                ) : (
                  <p className="persian-font" key={i}>
                    {line}
                  </p>
                )
              )
            : "Sorry , No lyrics found"}
        </div>
      </div>
      <RelatedSongs
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        data={relatedSongsData}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default SongDetails;
