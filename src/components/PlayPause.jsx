import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) =>
  isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle size={30} className="text-[#1FDF64]" onClick={handlePause} />
  ) : (
    <FaPlayCircle size={30} className="text-[#1FDF64]" onClick={handlePlay} />
  );

export default PlayPause;
