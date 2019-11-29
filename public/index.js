const inputValue = document.getElementsByClassName("input-city")[0];
const siteButton = document.getElementById("site-button");
const weatherSection = document.querySelector(".weather-container");

siteButton.addEventListener("click", event => {
  if (inputValue.value === "") {
    alert("Oops! You've forgotten to enter a city");
    inputValue.focus();
  }
  event.preventDefault();
  if (inputValue.value) {
    let searchTerm = inputValue.value;
    let xhr = new XMLHttpRequest();
    let searchUrl = `/search?q=${encodeURIComponent(searchTerm)}`;
  
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let weatherData = JSON.parse(xhr.responseText);
        clearWeather();
        let paraWeatherCondition = document.createElement("p"); 
        let textWeatherCondition = document.createTextNode(`The weather in ${searchTerm} is ${weatherData.weatherTemp}°C, ${weatherData.weather}`); 
        paraWeatherCondition.appendChild(textWeatherCondition);
        weatherSection.appendChild(paraWeatherCondition); 

        let imgWeatherIcon = document.createElement('img');
        imgWeatherIcon.setAttribute('src', `${weatherData.weatherIcon}`);
        weatherSection.appendChild(imgWeatherIcon);
        console.log(imgWeatherIcon);
        inputValue.value = "";

      }
    };
    xhr.open("GET", searchUrl, true);
    xhr.send();
  }
});

const clearWeather = () => {
  while (weatherSection.firstChild) {
    weatherSection.removeChild(weatherSection.firstChild);
  }
};