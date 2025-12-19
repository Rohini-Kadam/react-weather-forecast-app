// forecast.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import apikeys from "./apikeys";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast(props) {

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const [error, setError] = useState("");

  const search = (city) => {
  if (!city) {
    setError({ message: "Please enter city" });
    return;
  }

  axios
    .get(`${apikeys.base}weather?q=${city}&units=metric&APPID=${apikeys.key}`)
    .then((response) => {
      setWeather(response.data);
      setError("");
      setQuery("");
    })
    .catch(() => {
      setWeather("");
      setError({ message: "City not found" });
    });
};

  function checkTime(i){
if(i<10){
  i = "0" + i;
}
return i;
  }

   const defaults = {
    color: "white",
    size: 110,
    animate: true,
  };


  useEffect(() => {
    search("Patna");
  }, []);

  return (
    <div className="forcast">
      <div className="forcast-icon">
        <ReactAnimatedWeather
        icon={props.icon}
        color={defaults.color}
        size={defaults.size}
        animate={defaults.animate} />
      </div>

      <div className="today-weather">
       <h3>{props.weather}</h3>
         <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Search any city..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />

        <div className="img-box">
           <img 
           src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
        onClick={() => search(query)}
          />
           </div>
      </div>
         <ul>
          {typeof weather.main != "undefined" ? (
            <div>
              {" "}
              <li className="cityHead">
                 <p>
                  {weather.name}, {weather.sys.country}
                 </p>
                 <img
                 className="temp"
                 src={`https://openweathermap.org/img/wn/${weather.weather[0]. 
                  icon}.png`}
                 />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°C ({weather.weather[0].main})
                </span>
              </li>

              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>

              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </li>

              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} m/s
                </span>
              </li>

            </div>
          ) :(
            <li>
              {error.query} {error.message}
            </li>
          )}
         </ul>
    </div>
    </div>
  );
}

export default Forecast;
