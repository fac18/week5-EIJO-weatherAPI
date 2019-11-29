const inputValue = document.getElementsByClassName("input-city")[0];
const siteButton = document.getElementById("site-button");
const weatherSection = document.querySelector(".weather-container");

siteButton.addEventListener("click", event => {
  event.preventDefault();
  console.log("we made a request");
  if (inputValue.value) {
    let searchTerm = inputValue.value;
    let xhr = new XMLHttpRequest();
    let searchUrl = `/search?q=${encodeURIComponent(searchTerm)}`;
  
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log("we made it back mother fuckersssss");
        let originLocation = JSON.parse(xhr.responseText);
        console.log("originLocation:", originLocation);
        clearWeather();
        var paraWeatherCondition = document.createElement("p"); 
        var textWeatherCondition = document.createTextNode(`The weather in ${searchTerm} is ${originLocation.weather}`); 
        paraWeatherCondition.appendChild(textWeatherCondition);
        weatherSection.appendChild(paraWeatherCondition); 
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