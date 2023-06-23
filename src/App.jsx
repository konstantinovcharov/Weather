import { useState } from 'react';
import './App.css';
import Form from "./components/form";
import Weather from "./components/weather";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";

const Api_Key = "214d6c547f73c737ca58bf19a465d50f";

const App = () => {
  const [weather, setWeather] = useState({
    city: undefined,
    country: undefined,
    icon: undefined,
    main: undefined,
    celsius: undefined,
    temp_max: null,
    temp_min: null,
    description: "",
    error: false
  });

  const [weatherIcon, setWeatherIcon] = useState({
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog"
  });

  const getWeatherIcon = (icons, rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        return icons.Thunderstorm;
      case rangeId >= 300 && rangeId <= 321:
        return icons.Drizzle;
      case rangeId >= 500 && rangeId <= 521:
        return icons.Rain;
      case rangeId >= 600 && rangeId <= 622:
        return icons.Snow;
      case rangeId >= 701 && rangeId <= 781:
        return icons.Atmosphere;
      case rangeId === 800:
        return icons.Clear;
      case rangeId >= 801 && rangeId <= 804:
        return icons.Clouds;
      default:
        return icons.Clouds;
    }
  };

  const calCelsius = (temp) => {
    let cell = Math.floor(temp - 273.15);
    return cell;
  };

  const getWeather = async (e) => {
    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    if (country && city) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
      );

      const response = await api_call.json();

      setWeather({
        city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        main: response.weather[0].main,
        celsius: calCelsius(response.main.temp),
        temp_max: calCelsius(response.main.temp_max),
        temp_min: calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      });

      setWeatherIcon(prevState => ({
        ...prevState,
        icon: getWeatherIcon(weatherIcon, response.weather[0].id)
      }));

      console.log(response);
    } else {
      setWeather(prevState => ({
        ...prevState,
        error: true
      }));
    }
  };

  return (
    <div className="App">
      <Form loadweather={getWeather} error={weather.error} />
      <Weather
        cityname={weather.city}
        weatherIcon={weather.icon}
        temp_celsius={weather.celsius}
        temp_max={weather.temp_max}
        temp_min={weather.temp_min}
        description={weather.description}
        
      />
    </div>
  );
};

export default App;
