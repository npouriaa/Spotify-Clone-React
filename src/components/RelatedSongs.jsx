import SongBar from "./SongBar";

const RelatedSongs = ({
  activeSong,
  isPlaying,
  data,
  handlePlayClick,
  handlePauseClick,
  artistId,
}) => {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related Songs : </h1>
      <div className="mt-6 w-full flex flex-col">
        {data?.tracks.map((song, i) => (
          <SongBar
            key={`${song.key} - ${artistId}`}
            song={song}
            i={i}
            activeSong={activeSong}
            isPlaying={isPlaying}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
