import React from "react";

const Seekbar = ({ value, min, max, onInput }) => {
  const getTime = (time) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  return (
    <div className=" fixed bottom-4 flex flex-row items-center">
      <p className="text-white text-xs">
        {value === 0 ? "0:00" : getTime(value)}
      </p>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className=" cursor-pointer accent-[#1FDF64] w-24 md:w-56 2xl:w-[450px] h-1 mx-4 2xl:mx-6 rounded-lg"
      />
      <p className="text-white  text-xs">{max === 0 ? "0:00" : getTime(max)}</p>
    </div>
  );
};

export default Seekbar;
