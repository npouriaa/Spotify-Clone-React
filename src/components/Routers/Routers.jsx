import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  AroundYou,
  ArtistDetails,
  Discover,
  Search,
  SongDetails,
  TopArtists,
  TopCharts,
} from "../../pages";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Discover />} />
      <Route path="/top-artists" element={<TopArtists />} />
      <Route path="/top-charts" element={<TopCharts />} />
      <Route path="/around-you" element={<AroundYou />} />
      <Route path="/artists/:id" element={<ArtistDetails />} />
      <Route path="/songs/:songid" element={<SongDetails />} />
      <Route path="/search/:searchTerm" element={<Search />} />
    </Routes>
  );
};

export default Routers;
