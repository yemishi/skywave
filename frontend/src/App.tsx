import { useState } from "react";
import { IoMdRefreshCircle } from "react-icons/io";
import SearchBar from "./components/searchBar/SearchBar";
import UseQuery from "./components/useQuery/useQuery";
import Temp from "./components/ui/Temp";
import AnimatedDiv from "./components/ui/AnimatedDIv";

const App = () => {
  const [location, setLocation] = useState("");
  const { refetch, data, isLoading } = UseQuery({ location });
  const refreshBeforeLg =
    "lg:before:absolute lg:before:bg-purple-800 lg:before:h-full  lg:before:w-1 lg:before:left-0 lg:before:top-[2px] lg:before:rounded-l-lg ";
  return (
    <div className="h-screen w-full flex flex-col items-center gap-5 backdrop-blur-sm p-4 overflow-x-hidden">
      <SearchBar
        error={data?.error ? data.message : ""}
        refetch={refetch}
        location={location}
        setLocation={setLocation}
      />
      {isLoading && (
        <div className="absolute z-10 w-full h-full top-0 left-0 bg-black bg-opacity-45 flex items-center justify-center">
          <img
            src="/icons/02d.svg"
            className="animate-bounce size-40"
            alt="sunny icon"
          />
        </div>
      )}
      {data && !data.error && (
        <div className="w-full h-full flex justify-around flex-col gap-10 mt-16 z-10">
          <Temp {...data} />

          <div
            className="w-full h-full max-w-7xl ml-auto mr-auto gap-2 grid grid-rows-[100px_1fr_270px] md:grid-rows-[170px_1fr_400px] lg:grid-cols-[1fr_0_2fr] 
          lg:grid-rows-[130px_300px_1fr] lg:p-8 lg:gap-5"
          >
            <AnimatedDiv className="lg:row-span-2 lg:row-start-1 lg:col-start-1 flex flex-col gap-3">
              <h2 className="lg:text-2xl font-bold text-xl">
                🎶 Groove to This Moment 🎵
              </h2>

              <iframe
                src={`https://open.spotify.com/embed/track/${data.track}`}
                className="w-full h-full lg:h-[200px]"
              />
            </AnimatedDiv>

            <AnimatedDiv
              onClick={refetch}
              className={`self-center ml-auto mr-auto rounded-full lg:row-start-2 lg:shadow-md lg:shadow-purple-800 lg:col-start-1 lg:p-3 
              lg:px-5 lg:relative  lg:rounded-lg lg:bg-sky-700 cursor-pointer ${refreshBeforeLg}`}
            >
              <IoMdRefreshCircle className="size-14 md:size-16 hover:rotate-180 duration-150 lg:hidden" />
              <span className="text-xl font-bold font-montserrat hover:scale-95 hidden lg:block duration-150 active:scale-90">
                Refresh
              </span>
            </AnimatedDiv>

            <AnimatedDiv className=" lg:col-start-3 lg:row-start-1 lg:row-span-3 flex flex-col gap-3">
              <h2 className="lg:text-3xl font-bold text-xl">
                🎧 Tune in to Your Weather Playlist 🌤️🎵
              </h2>
              <iframe
                src={`https://open.spotify.com/embed/playlist/${data.playlist}`}
                className="w-full h-full"
              />
            </AnimatedDiv>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
