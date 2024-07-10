import { useState } from "react";
import { IoMdRefreshCircle } from "react-icons/io";
import SearchBar from "./components/searchBar/SearchBar";
import UseQuery from "./components/useQuery/useQuery";
import Temp from "./components/ui/Temp";
import AnimatedDiv from "./components/ui/AnimatedDIv";

const App = () => {
  const [location, setLocation] = useState("");
  const { refetch, data } = UseQuery({ location });
  return (
    <div className="h-screen w-full flex flex-col items-center gap-5 backdrop-blur-sm p-4 overflow-x-hidden">
      <SearchBar
        error={data?.error ? data.message : ""}
        refetch={refetch}
        location={location}
        setLocation={setLocation}
      />
      {data && !data.error && (
        <div className="w-full h-full flex justify-around flex-col gap-5">
          <Temp {...data} />

          <div
            className="w-full h-full max-w-7xl ml-auto mr-auto gap-2 grid grid-rows-[90px_1fr_170px] md:grid-rows-[170px_1fr_400px] lg:grid-cols-[1fr_0_2fr] 
          lg:grid-rows-[100px_300px_1fr] lg:p-8 lg:gap-5"
          >
            <AnimatedDiv className="lg:h-[200px] lg:row-span-2 lg:row-start-1 lg:col-start-1">
              <iframe
                src={`https://open.spotify.com/embed/track/${data.track}`}
                className="w-full h-full"
              />
            </AnimatedDiv>

            <AnimatedDiv
              onClick={refetch}
              className="self-center bg-black ml-auto mr-auto rounded-full lg:row-start-2 lg:col-start-1 lg:p-3 
              lg:rounded-lg lg:bg-emerald-700 lg:border cursor-pointer"
            >
              <IoMdRefreshCircle className="size-14 md:size-16 hover:rotate-180 duration-150 lg:hidden" />
              <span className="text-xl font-mono font-semibold hover:scale-95 hidden lg:block duration-150 active:scale-90">
                refresh
              </span>
            </AnimatedDiv>

            <AnimatedDiv className=" lg:col-start-3 lg:row-start-1 lg:row-span-3">
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
