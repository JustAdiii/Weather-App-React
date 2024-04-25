import React, { useState } from "react";

function Temperature({ setCity, stats, addToFavorites, buttonColor }) {
  const [favoriteMessage, setFavoriteMessage] = useState("");

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleFavoriteClick = () => {
    addToFavorites();
    if (favoriteMessage === "") {
      setFavoriteMessage("Location added to favorites.");
    } else {
      setFavoriteMessage("Location removed from favorites.");
    }
    setTimeout(() => {
      setFavoriteMessage("");
    }, 3000);
  };

  function renderWeatherIcon(iconCode) {
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    return <img src={iconUrl} alt="Weather Icon" />;
  }

  return (
    <div className="flex flex-col align-middle justify-center items-center">
      <div className="flex align-middle justify-center">
        <input
          type="text"
          className="bg-slate-600 border border-slate-500 text-slate-200 placeholder-slate-400 text-md focus:border-slate-400 block w-60 p-2 focus:outline-none"
          placeholder="Enter Your City Name"
          onChange={handleCityChange}
          defaultValue="Berlin"
        />
        <button onClick={handleFavoriteClick} className={`p-2 ${buttonColor}`}>
          {stats.isFavorite ? (
            <svg
              className="h-6 w-6 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 2.172a4.2 4.2 0 0117.656 0 4.2 4.2 0 010 17.656 4.2 4.2 0 01-17.656 0 4.2 4.2 0 010-17.656zm2.12 2.12a1.2 1.2 0 000 1.697L10 12.5l4.708-4.708a1.2 1.2 0 10-1.697-1.697L10 9.106l-3.121-3.12a1.2 1.2 0 00-1.697 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636 10.682 6.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="m-4">
        {stats.iconCode ? renderWeatherIcon(stats.iconCode) : null}
      </div>
      <div className="flex justify-center items-center text-slate-200 mt-8">
        <p className="font-semibold text-[55px] ">
          {stats ? stats.temp : "-"}
          <span className="text-[33px]">°C</span>
        </p>
      </div>
      <div className="flex justify-center text-slate-300 mt-8 text-[25px] ">
        {stats ? stats.condition : "-"}
      </div>
      <div className="flex justify-center text-slate-400 mt-5 text-[15px]">
        Today &#183; {stats ? stats.time : "-"} | {stats ? stats.location : "-"}
      </div>
      {favoriteMessage && (
        <div className="flex justify-center text-slate-100 mt-2">
          {favoriteMessage}
        </div>
      )}
    </div>
  );
}

export default Temperature;
