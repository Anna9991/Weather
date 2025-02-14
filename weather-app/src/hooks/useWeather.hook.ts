import { useState, useEffect } from "react";


const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const DEFAULT_CITY: string = "Helsinki";


interface WeatherData {
  name: string; // city
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}


export function useWeather() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        () => {
          fetchWeatherDefaultCity();
        }
      );
    }
    else {
      fetchWeatherDefaultCity();
    }
  }, []);

  async function fetchWeather(latitude: number, longitude: number) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=en`);
      const data: WeatherData = await response.json();
      setCity(data.name);
      setWeather(data);
    }
    catch (error) {
      setError("Sorry! We can get information about weather...");
    }
  };

  async function fetchWeatherDefaultCity() {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${DEFAULT_CITY}&appid=${API_KEY}&units=metric&lang=en`);
      const data: WeatherData = await response.json();
      setCity(DEFAULT_CITY);
      setWeather(data);
    }
    catch (error) {
      setError("Sorry! We can get information about weather...");
    }
  };

  return {
    error,
    city,
    weather
  };
}