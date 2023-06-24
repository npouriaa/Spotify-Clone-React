import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
  inDetailsHeader,
}) => {
  return isPlaying && activeSong?.key === song?.key ? (
    <FaPauseCircle
      size={inDetailsHeader ? 50 : 30}
      className={`z-10 cursor-pointer text-[#1FDF64] ${
        inDetailsHeader ? "xl:mt-4 mt-10 " : ""
      }`}
      onClick={handlePause}
    />
  ) : (
    <FaPlayCircle
      size={inDetailsHeader ? 50 : 30}
      className={`z-10 cursor-pointer text-[#1FDF64] ${
        inDetailsHeader ? "xl:mt-4 mt-10 " : ""
      }`}
      onClick={handlePlay}
    />
  );
};

export default PlayPause;
