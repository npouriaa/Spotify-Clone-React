import { Link } from "react-router-dom";

const DetailsHeader = ({
  artistId,
  songData,
  artistData,
}) => {

  const artist = artistData?.data[0]?.attributes;

  return (
    <div className="xl:mt-4 mt-10 sm:h-48 xl:h-28 relative w-3/4 flex flex-col">
      <div className="mb-10">
        <div className="absolute inset-0 flex items-center">
          <img
            className="w-28 xl:h-28 object-contain"
            src={
              artistId
                ? artist?.artwork?.url
                    .replace("{w}", "500")
                    .replace("{h}", "500")
                : songData?.images?.coverart
            }
            alt="art"
          />
          <div className="ml-5">
            <p className="text-white w-40 lg:w-56 font-bold text-sm">
              {artistId ? artist?.name : songData?.title}
            </p>
            {!artistId && (
              <Link to={`/artists/${songData?.artists[0].adamid}`}>
                <p className="text-sm text-gray-400 mt-2">
                  {songData?.subtitle}
                </p>
              </Link>
            )}
            <p className="text-sm text-gray-400 mt-2">
              {artistId ? artist?.genreNames[0] : songData?.genres?.primary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
