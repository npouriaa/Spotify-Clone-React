import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, songData, artistData }) => {
  const artist = artistData?.artists[artistId]?.attributes;
  return (
    <div className="mt-4 relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 xl:h-28">
        <div className="absolute inset-0 flex items-center">
          <img
            className="sm:w-48 w-28 sm:h-48 xl:h-28 object-contain shadow-xl shadow-black"
            src={
              artistId
                ? artist.artwork?.url
                    .replace("{w}", "500")
                    .replace("{h}", "500")
                : songData?.images?.coverart
            }
            alt="art"
          />
          <div className="ml-5">
            <p className="text-white font-bold sm:text-xl xl:text-base">
              {artistId ? artist?.name : songData?.title}
            </p>
            {!artistId && (
              <Link to={`/artists/${songData?.artists[0].adamid}`}>
                <p className="text-sm text-gray-400 mt-2">
                  {songData?.subtitle}
                </p>
              </Link>
            )}
            <p className="text-sm text-gray-400 mt-2">{artistId ? artist?.genreNames[0] : songData?.genres.primary}</p>
          </div>
        </div>
      </div>
      <div className="w-full sm:h-48 xl:h-28"></div>
    </div>
  );
};

export default DetailsHeader;
