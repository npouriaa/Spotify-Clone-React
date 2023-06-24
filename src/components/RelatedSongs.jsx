import useAxios from "./CustomHooks/useAxios";
import Loader from "./Loader";
import SongBar from "./SongBar";

const RelatedSongs = ({
  data,
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
      <h1 className="font-bold mt-16 xl:mt-6 text-xl text-white">
        Related Songs :{" "}
      </h1>
      <div className="mt-6 w-full flex flex-col">
        {!artistId ? (
          data?.tracks ? (
            data?.tracks?.map((song, i) => (
              <SongBar key={i} song={song} i={i} />
            ))
          ) : (
            <p className="text-gray-400">Sorry , No related songs found</p>
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
