import { FaMagnifyingGlass } from "react-icons/fa6";

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
  const refetchData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!location) return;
    refetch();
  };
  return (
    <form
      onSubmit={refetchData}
      className="flex flex-col w-3/4 max-w-[350px] self-center font-semibold md:text-lg"
    >
      <div className="flex relative">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="A good place"
          className="w-full h-full outline-none bg-white bg-opacity-40 hover:bg-opacity-35 rounded-md border border-t-0 border-white
         border-opacity-50 focus:border-opacity-75 p-2 pr-8 md:p-3 duration-150"
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
    </form>
  );
}
