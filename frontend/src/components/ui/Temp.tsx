import { AnimatePresence } from "framer-motion";
import { ResponseType } from "../../types";
import AnimatedDiv from "./AnimatedDIv";

export default function Temp({
  description,
  temp,
  temp_max,
  temp_min,
  country,
  name,
  track,
  icon,
}: ResponseType) {
  const formattedTemp = (temp: number) => `${Math.floor(temp)}`;
  return (
    <AnimatePresence mode="wait">
      <AnimatedDiv
        toRight
        key={track}
        className="flex flex-col items-center lg:items-end lg:grid self-center rounded-3xl text-center font-montserrat lg:font-lato gap-2
         lg:grid-areas-tempLayoutLg"
      >
        <img
          src={`/src/icons/${icon}.svg`}
          className="w-44 grid-in-icon hidden lg:block"
          alt="weather icon"
        />
        <span className="text-white row-span- grid-in-desc lg:text-6xl lg:ml-6 first-letter:uppercase">
          {description}
        </span>
        <span className="text-7xl after:content-['°C'] after:font-semibold after:absolute after:text-xl grid-in-temp lg:text-6xl">
          {formattedTemp(temp)}
        </span>

        <span className="flex self-center gap-4 lg:font-semibold grid-in-tempHL lg:text-xl lg:ml-1 mb-auto">
          <span>H {formattedTemp(temp_max)}°</span>
          <span>L {formattedTemp(temp_min)}°</span>
        </span>

        <span className="text-white lg:grid-area-location lg:hidden">
          {name} - {country}
        </span>
      </AnimatedDiv>
    </AnimatePresence>
  );
}
