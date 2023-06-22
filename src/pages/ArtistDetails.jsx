import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import useAxios from "../components/CustomHooks/useAxios";

const ArtistDetails = () => {
  const dispatch = useDispatch();
  const { id: artistId } = useParams();
  const { data, loading, error } = useAxios(
    "artists/get-details",
    {
      id: artistId,
    },
    artistId
  );

  console.log(data);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={data} />
      <RelatedSongs
        artistId={artistId}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        data={
          data ? Object.values(data?.data[0].relationships.albums.data) : {}
        }
      />
    </div>
  );
};

export default ArtistDetails;
