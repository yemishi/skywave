import { AnimatePresence } from "framer-motion";
import { WeatherInfoType } from "../../types";
import AnimatedDiv from "./AnimatedDIv";

export default function Temp({
  description,
  temp,
  temp_max,
  temp_min,
  country,
  name,
  key,
  icon,
}: WeatherInfoType & { key: string }) {
  const formattedTemp = (temp: number) => `${Math.floor(temp)}`;
  return (
    <AnimatePresence mode="wait">
      <div key={key} className="flex flex-col items-center">
        <AnimatedDiv
          toRight
          className="flex flex-col items-center lg:items-end lg:grid self-center rounded-3xl text-center font-montserrat lg:font-lato gap-2
         lg:grid-areas-tempLayoutLg"
        >
          <img
            src={`/icons/${icon}.svg`}
            className="w-44 grid-in-icon hidden lg:block"
            alt="weather icon"
          />
          <h1 className="text-white text-lg grid-in-desc lg:text-6xl lg:ml-6 first-letter:uppercase">
            {description}
          </h1>

          <span className="text-7xl after:content-['°C'] after:font-semibold after:absolute after:text-xl grid-in-temp lg:text-6xl">
            {formattedTemp(temp)}
          </span>

          <div className="flex self-center gap-4 lg:font-semibold grid-in-tempHL lg:text-xl lg:ml-1 mb-auto">
            <span>H {formattedTemp(temp_max)}°</span>
            <span>L {formattedTemp(temp_min)}°</span>
          </div>
        </AnimatedDiv>

        <AnimatedDiv>
          <span className="text-white font-semibold text-lg lg:grid-area-location lg:fixed lg:top-5 lg:left-5 lg:font-bold lg:text-xl">
            {name} - {country}
          </span>
        </AnimatedDiv>
      </div>
    </AnimatePresence>
  );
}
