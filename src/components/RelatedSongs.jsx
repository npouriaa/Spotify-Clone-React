import useAxios from "./CustomHooks/useAxios";
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
    loading,
    error,
  } = useAxios("artists/get-top-songs", { id: artistId }, artistId);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <h1 className="font-bold mt-2 text-2xl text-white">Related Songs : </h1>
      <div className="mt-6 w-full flex flex-col">
        {!artistId ? (
          data?.tracks ? (
            data.tracks.map((song, i) => (
              <SongBar
                key={`${song.key}-${artistId}`}
                song={song}
                i={i}
                activeSong={activeSong}
                isPlaying={isPlaying}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
              />
            ))
          ) : (
            <p className="text-white">sorry , no related songs found</p>
          )
        ) : (
          artistRelatedSongsData?.data?.map((song, i) => (
            <SongBar
              artistId={artistId}
              key={`${song.key} - ${artistId}`}
              song={song}
              i={i}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RelatedSongs;
