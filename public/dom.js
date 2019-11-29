const inputValue = document.getElementsByClassName("input-city")[0];
const siteButton = document.getElementById("site-button");
const weatherSection = document.querySelector(".weather-container");

siteButton.addEventListener("click", event => {
  event.preventDefault();
  if (inputValue.value) {
    let searchTerm = inputValue.value;
    let xhr = new XMLHttpRequest();
    let searchUrl = `http://localhost:5000/search?q=${encodeURIComponent(
      searchTerm
    )}`;
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let originLocation = JSON.parse(xhr.responseText);

        var paraWeatherCondition = document.createElement("p");
        var textWeatherCondition = document.createTextNode(`The weather in ${searchTerm} is ${originLocation.weather}`); // Create a text node
        paraWeatherCondition.appendChild(textWeatherCondition);
        weatherSection.appendChild(paraWeatherCondition);
      }
    };
    xhr.open("GET", searchUrl, true);
    xhr.send();
  }
});
