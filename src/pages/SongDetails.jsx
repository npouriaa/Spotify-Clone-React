import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import useAxios from "../components/CustomHooks/useAxios";
import PlayPause from "../components/PlayPause";

const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
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
    dispatch(setActiveSong({ song, relatedSongsData, i }));
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
    <div className="flex flex-col mt-4 lg:mt-0">
      <div className="flex items-center">
        <DetailsHeader songData={songDetailsData} />
        {[songDetailsData].map((song, i) => (
          <PlayPause
            handlePause={handlePauseClick}
            song={songDetailsData}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePlay={() => handlePlayClick(song, i)}
            inDetailsHeader={true}
          />
        ))}
      </div>
      <div className="mb-10 mt-14">
        <h2 className="text-white text-2xl font-bold">Lyrics :</h2>
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
      <RelatedSongs data={relatedSongsData} />
    </div>
  );
};

export default SongDetails;
