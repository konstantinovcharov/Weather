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

  const weatherIcon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog"
  };

  const [backgroundImage, setBackgroundImage] = useState(null)


  const get_WeatherIcon = (rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        return weatherIcon.Thunderstorm;
      case rangeId >= 300 && rangeId <= 321:
        return weatherIcon.Drizzle;
      case rangeId >= 500 && rangeId <= 521:
        return weatherIcon.Rain;
      case rangeId >= 600 && rangeId <= 622:
        return weatherIcon.Snow;
      case rangeId >= 701 && rangeId <= 781:
        return weatherIcon.Atmosphere;
      case rangeId === 800:
        return weatherIcon.Clear;
      case rangeId >= 801 && rangeId <= 804:
        return weatherIcon.Clouds;
      default:
        return weatherIcon.Clouds;
    }
  };


  const calCelsius = (temp) => {
    let cell = Math.floor(temp - 273.15);
    return cell;
  };

  const getBackgroundImage = (weatherCondition) => {
    const backgroundImages = {
      Blizzard: "blizzard.min.jpg",
      Clear: "Clear.jpg",
      Clouds: "cloudy-min.jpg",
      Drizzle: "Drizzle-min.jpg",
      Fog: "foggy-min.jpg",
      Rain: "Rain-min.jpg",
      ModerateRain: "Rain-min.jpg",
      Thunderstorm: "Thunderstorm-min.jpg"
    }
  
    return backgroundImages[weatherCondition];
  };

  const getWeather = async (e) => {
    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    if (country && city) {
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
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
        icon: get_WeatherIcon(response.weather[0].id)
      });

      setBackgroundImage(getBackgroundImage(response.weather[0].main));      
      document.body.style.backgroundImage = `url(${getBackgroundImage(response.weather[0].main)})`;     
      

      console.log(response);
    } else {
      setWeather((prevState) => ({
        ...prevState,
        error: true,
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
