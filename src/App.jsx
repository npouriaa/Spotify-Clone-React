import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from "./components";
import {
  ArtistDetails,
  TopArtists,
  AroundYou,
  Discover,
  Search,
  SongDetails,
  TopCharts,
} from "./pages";
import { useEffect, useRef } from "react";

const App = () => {
  const divRef = useRef(null);

  useEffect(() => {
    divRef?.current?.scrollIntoView({ behavior: "smooth" });
  });

  const { activeSong } = useSelector((state) => state.player);
  return (
    <div ref={divRef} className="container flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className=" bg-[#121212] w-full md:pr-64 absolute">
          <Searchbar />
          <div className="px-6 mt-20 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col">
            <div className="flex-1 h-fit pb-40">
              <Routes>
                <Route path="/" element={<Discover />} />
                <Route path="/top-artists" element={<TopArtists />} />
                <Route path="/top-charts" element={<TopCharts />} />
                <Route path="/around-you" element={<AroundYou />} />
                <Route path="/artists/:id" element={<ArtistDetails />} />
                <Route path="/songs/:songid" element={<SongDetails />} />
                <Route path="/search/:searchTerm" element={<Search />} />
              </Routes>
            </div>
            <div className="xl:sticky relative top-0 h-fit">
              <TopPlay />
            </div>
          </div>
        </div>
      </div>

      {activeSong?.title && <MusicPlayer />}
    </div>
  );
};

export default App;
