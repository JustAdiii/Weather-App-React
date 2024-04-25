import React, { useEffect, useState } from "react";
import backgroundImage from "./assets/background.jpg";
import Temperature from "./components/Temperature";
import Highlights from "./components/Highlights";

const API_KEY = "0f7a08e48a9f8b9e113d92bb8394ec24";
function App() {
  const [city, setCity] = useState("Berlin");
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric` // Użycie units=metric, aby uzyskać stopnie Celsjusza
        );
        if (!response.ok) {
          throw new Error("Could not get data");
        }
        const data = await response.json();
        setWeatherData({
          ...data,
          main: {
            ...data.main,
            temp: Math.round(data.main.temp), // Zaokrąglanie temperatury do liczby całkowitej
          },
          weather: data.weather,
          wind: data.wind,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [city]);

  const addToFavorites = () => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
      setShowAnimation(true);
      setShowMessage(true);
      setTimeout(() => {
        setShowAnimation(false);
      }, 1000);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
      className="flex justify-center items-start"
    >
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/5 h-1/3 mt-40">
        {weatherData && (
          <Temperature
            setCity={setCity}
            stats={{
              temp: weatherData.main.temp, // Przekazywanie zaokrąglonej temperatury
              condition: weatherData.weather[0].description,
              iconCode: weatherData.weather[0].icon, // Kod ikony
              isDay: true, // Możesz to dostosować w zależności od danych
              location: weatherData.name,
              time: new Date().toLocaleTimeString(),
            }}
            addToFavorites={addToFavorites}
          />
        )}
      </div>
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 h-1/3 mt-40 p-10 grid grid-cols-2 gap-6">
        <h1 className="text-slate-200 text-2xl col-span-2">
          Today's Highlights
        </h1>
        {weatherData && (
          <>
            <Highlights
              stats={{
                title: "Wind Status",
                value: weatherData.wind.speed,
                unit: "km/h",
                direction: weatherData.wind.deg,
              }}
            />
            <Highlights
              stats={{
                title: "Humidity",
                value: weatherData.main.humidity,
                unit: "%",
              }}
            />
            <Highlights
              stats={{
                title: "Visibility",
                value: weatherData.visibility,
                unit: "m",
              }}
            />
            <Highlights
              stats={{
                title: "Air Pressure",
                value: weatherData.main.pressure,
                unit: "hPa",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
