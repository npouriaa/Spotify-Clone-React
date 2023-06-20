import { useGetArtistRelatedSongsQuery } from "../redux/services/shazamCore";
import Loader from "./Loader";
import SongBar from "./SongBar";

const RelatedSongs = ({
  activeSong,
  isPlaying,
  data,
  handlePlayClick,
  handlePauseClick,
  artistId,
}) => {
  const {
    data: artistRelatedSongsData,
    isFetching: isFetchingartistRelatedSongs,
    error: errorartistRelatedSongs,
  } = useGetArtistRelatedSongsQuery({ artistId });

  if (isFetchingartistRelatedSongs) {
    return <Loader />;
  }

  if (errorartistRelatedSongs) {
    return <Error />;
  }

  console.log(artistId);

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related Songs : </h1>
      <div className="mt-6 w-full flex flex-col">
        {!artistId
          ? data?.tracks?.map((song, i) => (
              <SongBar
                key={`${song.key} - ${artistId}`}
                song={song}
                i={i}
                activeSong={activeSong}
                isPlaying={isPlaying}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
              />
            ))
          : artistRelatedSongsData?.data.map((song, i) => (
              <SongBar artistId={artistId} key={`${song.key} - ${artistId}`} song={song} i={i} />
            ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
