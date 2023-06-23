import "./weather.css";

export default function Weather ({cityname, weatherIcon, temp_celsius, temp_max, temp_min, description, isFahrenheit}){
  const maxminTemp = (min, max) => {
    if (max && min) {
      return (
        <h3>
          <span className="px-4 temperature">{min}&deg;</span>
          <span className="px-4 temperature">{max}&deg;</span>
        </h3>
      );
    }
    return null;
  };

 

  function convertTemp() {
    const temperatureElements = document.querySelectorAll('.temperature');
    const convertButton = document.querySelector('.convertBtn')

    temperatureElements.forEach(temperature => {
        const temperatureValue = parseFloat(temperature.textContent);

        if (isFahrenheit) {
            const celsiusValue = (temperatureValue - 32) * (5 / 9);
            temperature.textContent = celsiusValue.toFixed(0)+ '°';
            convertButton.textContent = 'Convert to Fahrenheit';
        } else {
            const fahrenheitValue = temperatureValue * (9 / 5) + 32;
            temperature.textContent = fahrenheitValue.toFixed(0) + '°';
            convertButton.textContent = 'Convert to Celsius';
        }
    });

    isFahrenheit = !isFahrenheit;
}

  return (
    <div className="container text-light">
      <div className="Card">
        <h1 className="text-white py-3">{cityname}</h1>
        <h5 className="py-4">
          <i className={`wi ${weatherIcon}`} />
          
        </h5>

        {/* Get Celsius */}
        {temp_celsius && <h1 className="py-2 temperature">{temp_celsius}&deg;</h1>}

        {/* show max and min temp */}
        {maxminTemp(temp_min, temp_max)}

        {/* Weather description */}
        <h4 className="py-3">
          {description.charAt(0).toUpperCase() + description.slice(1)}
        </h4>
      </div>

      {cityname && <button className="convertBtn" onClick={convertTemp}>Convert to Fahrenheit</button>}
    </div>
  );
};


