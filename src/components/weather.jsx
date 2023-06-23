import { useState } from "react";
import "./weather.css";

const Weather = ({
    cityname,
    weatherIcon,
    temp_celsius,
    temp_max,
    temp_min,
    description,
}) => {
    const [isFahrenheit, setIsFahrenheit] = useState(false);

    const toggleTemperature = () => {
        setIsFahrenheit((prevState) => !prevState);
    };

    const convertToFahrenheit = (celsius) => {
        return (celsius * 9) / 5 + 32;
    };

    const renderTemperature = () => {
        if (temp_celsius) {
            const currentTemp = isFahrenheit
                ? convertToFahrenheit(temp_celsius).toFixed(0) + "°F"
                : temp_celsius.toFixed(0) + "°C";
            const minTemp = isFahrenheit
                ? convertToFahrenheit(temp_min).toFixed(0) + "°F"
                : temp_min.toFixed(0) + "°C";
            const maxTemp = isFahrenheit
                ? convertToFahrenheit(temp_max).toFixed(0) + "°F"
                : temp_max.toFixed(0) + "°C";

            return (
                <>
                    <h1 className="py-2">{currentTemp}</h1>

                    <div className="temperature">
                        <h3>
                            <span className="px-4">{minTemp}</span>
                            <span className="px-4">{maxTemp}</span>
                        </h3>
                    </div>

                    <h4 className="py-3">
                        {description.charAt(0).toUpperCase() + description.slice(1)}
                    </h4>
                    
                    <button onClick={toggleTemperature}>
                        Switch to {isFahrenheit ? "Celsius" : "Fahrenheit"}
                    </button>
                </>
            );
        }
        return null;
    };

    return (
        <div className="container text-light">
            <div className="Card">
                <h1 className="text-white py-3">{cityname}</h1>
                <h5 className="py-4">
                    <i className={`wi ${weatherIcon} display-1`} />
                </h5>

                {/* Weather data */}
                {renderTemperature()}
            </div>
        </div>
    );
};

export default Weather;