import React from "react";

const Track = ({ activeSong }) => (
  <div className="flex-1 flex w-40 items-center justify-start">
    <div className="hidden sm:block h-16 w-16 mr-4">
      <img
        src={activeSong?.images?.coverart}
        alt="cover art"
        className=""
      />
    </div>
    <div className="xl:w-[250px] flex flex-col gap-1 overflow-hidden">
      <p className={`text-sm text-white font-bold ${activeSong?.title.length > 20 ? 'animate-custom' : ''}`}>
        {activeSong?.title ? activeSong?.title : "No active Song"}
      </p>
      <p className={`text-sm text-gray-300 ${activeSong?.subtitle.length > 20 ? 'animate-custom' : ''}`}>
        {activeSong?.subtitle ? activeSong?.subtitle : "No active Song"}
      </p>
    </div>
  </div>
);

export default Track;
