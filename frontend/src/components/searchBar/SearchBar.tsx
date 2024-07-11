import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import suggests from "./suggestionsCitys";

export default function SearchBar({
  location,
  refetch,
  setLocation,
  error,
}: {
  refetch: () => void;
  location: string;
  setLocation: React.Dispatch<string>;
  error: string;
}) {
  const [inputValue, setInputValue] = useState(location);

  const refetchData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) return;
    setLocation(inputValue);
    setTimeout(() => {
      refetch();
    }, 0);
  };
  const border =
    "border border-t-0 border-white border-opacity-50 focus:border-opacity-75 ";

  const filteredSuggestions = inputValue
    ? suggests.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(inputValue.toLowerCase())
      )
    : suggests;
  return (
    <div
      className={`flex flex-col w-3/4 max-w-[550px] self-center h-2/4 font-semibold md:text-lg lg:text-xl  absolute ${
        location ? "top-5" : " top-2/3 -translate-y-2/3 lg:top-2/4 lg:-translate-y-2/4"
      } duration-150 `}
    >
      <form onSubmit={refetchData}>
        <div className="flex relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="A good place"
            className={`w-full h-full outline-none bg-white bg-opacity-40 hover:bg-opacity-35 rounded-md pr-8 duration-150 ${border} ${
              location ? "p-2 md:p-3" : "p-3 md:p-4 rounded-b-none border-b-0"
            }`}
          />
          <button type="submit">
            <FaMagnifyingGlass
              className={`absolute right-2 top-2/4 -translate-y-2/4 size-5 text-white ${
                location
                  ? "hover:text-emerald-300 active:scale-90 duration-150"
                  : "opacity-50"
              }`}
            />
          </button>
        </div>
        {error && (
          <span className="self-center text-center text-red-400 mt-2">
            {error}
          </span>
        )}

        {!location && (
          <ul
            className={`flex flex-col  bg-white bg-opacity-40 max-h-[201px] md:max-h-[310px] lg:max-h-[420px]  overflow-y-scroll  rounded-b-md ${border}`}
          >
            {filteredSuggestions.map((e, i) => {
              return (
                <li
                  className=" w-full h-full p-2 lg:p-3 text-left hover:backdrop-brightness-90 cursor-pointer"
                  onClick={() => {
                    setLocation(e), setInputValue(e);
                    setTimeout(() => {
                      refetch();
                    }, 0);
                  }}
                  key={`${e}${i}`}
                >
                  {e}
                </li>
              );
            })}
          </ul>
        )}
      </form>
    </div>
  );
}
