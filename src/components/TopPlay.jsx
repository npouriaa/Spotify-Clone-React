import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import "swiper/css";
import "swiper/css/free-mode";
import useAxios from "./CustomHooks/useAxios";
import Loader from "./Loader";
import Error from './Error'

const TopChartCard = ({
  song,
  i,
  activeSong,
  isPlaying,
  handlePauseClick,
  handlePlayClick,
}) => {
  return (
    <div className="w-full flex flex-row items-center hover:bg-[#1A1A1A] p-4 rounded-lg cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{i + 1}</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-16 h-16 lg:w-20 rounded-lg "
          src={song?.images?.coverart}
          alt={song?.title}
        />
        <div className="flex overflow-hidden flex-1 flex-col justify-center mx-3">
          <Link to={`/songs/${song.key}`}>
            <div className="overflow-hidden w-40">
              <p
                className={`text-md font-bold text-white ${
                  song?.title.length > 21 ? "animate-custom" : ""
                }`}
              >
                {song?.title}
              </p>
            </div>
          </Link>
          <Link to={`/artists/${song.artists[0].adamid}`}>
            <p className="text-sm mt-1 text-gray-400 ">{song?.subtitle}</p>
          </Link>
        </div>
      </div>
      <PlayPause
        activeSong={activeSong}
        song={song}
        isPlaying={isPlaying}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, loading, error } = useAxios("charts/track");
  const topPlays = data?.tracks.slice(0, 7);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
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
      <div className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[400px] max-w-full flex flex-col">
        <div className="w-full flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white text-lg lg:text-xl font-bold">
              Top Charts
            </h2>
            <Link to="/top-charts">
              <p className="text-gray-300 text-base cursor-pointer">see more</p>
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-1">
            {topPlays?.map((song, i) => (
              <TopChartCard
                key={song.key}
                activeSong={activeSong}
                isPlaying={isPlaying}
                song={song}
                i={i}
                handlePauseClick={handlePauseClick}
                handlePlayClick={() => handlePlayClick(song, i)}
              />
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col mt-8">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-white text-lg lg:text-xl font-bold">
              Top Artists
            </h2>
            <Link to="/top-artists">
              <p className="text-gray-300 text-base cursor-pointer">see more</p>
            </Link>
          </div>
          <Swiper
            slidesPerView="auto"
            spaceBetween={15}
            freeMode
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode]}
            className="mt-4 mb-20"
          >
            {topPlays?.map((song, i) => (
              <SwiperSlide
                key={song?.key}
                style={{ width: "16%", height: "auto" }}
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link to={`/artists/${song?.artists[0].adamid}`}>
                  <img
                    className="rounded-full w-full object-cover"
                    src={song?.images.background}
                    alt="name"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
  );
};

export default TopPlay;
