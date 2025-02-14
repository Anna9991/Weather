import React from "react";
import { WeatherContainerStyled } from "../styles/WeatherContainer.styled";
import { CityContainerStyled } from "../styles/CityContainer.styled";
import { useWeather } from "../hooks/useWeather.hook";


export function WeatherContainer() {
  const { error, city, weather } = useWeather();

  function getWeatherCondition() {
    if (!weather) {
      return "default";
    }

    const condition = weather.weather[0].description.toLowerCase();
    if (condition.includes("rain")) {
      return "rainy";
    }
    if (condition.includes("cloud")) {
      return "cloudy";
    }
    if (condition.includes("clear")) {
      console.log(weather.weather[0].icon.includes("d") ? "sunny" : "clear-night")
      return weather.weather[0].icon.includes("d") ? "sunny" : "clear-night";
    }
    if (condition.includes("snow")) {
      return "snowy";
    }
    if (condition.includes("mist") || condition.includes("fog")) {
      return "fog";
    }
    if (condition.includes("cloud")) {
      return "cloud";
    }
    return "default";
  }

  return (
    <WeatherContainerStyled $condition={getWeatherCondition()}>
      <CityContainerStyled>
        <h1>Weather in {city}</h1>
        {error && <p>{error}</p>}
        {weather ? (
          <>
            <img 
              src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} 
              alt="weather icon"
            />
            <h2>{Math.round(weather.main.temp)}°C</h2>
            <p>Description: {weather.weather[0].description}</p>
            <p>Wind: {Math.round(weather.wind.speed)} m/s</p>
          </>) : 
          ( !error && <p>Loading...</p>)}
      </CityContainerStyled>
    </WeatherContainerStyled>
  );
}