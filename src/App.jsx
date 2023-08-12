import { useSelector } from "react-redux";
import { Searchbar, Sidebar, MusicPlayer, TopPlay } from "./components";
import { useEffect, useRef } from "react";
import Routers from "./components/Routers/Routers";

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
              <Routers />
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
