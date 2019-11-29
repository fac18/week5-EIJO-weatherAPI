const inputValue = document.getElementsByClassName("input-city")[0];
const siteButton = document.getElementById("site-button");
const weatherSection = document.querySelector(".weather-container");

siteButton.addEventListener("click", event => {
  event.preventDefault();
  console.log("we made a request");
  if (inputValue.value) {
    let searchTerm = inputValue.value;
    let xhr = new XMLHttpRequest();
    let searchUrl = `http://localhost:5000/search?q=${encodeURIComponent(
      searchTerm
    )}`;
    // --change - line;
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log("we made it back mother fuckersssss");
        let originLocation = JSON.parse(xhr.responseText);
        console.log("originLocation:", originLocation);

        var paraWeatherCondition = document.createElement("p"); // Create a <li> node
        var textWeatherCondition = document.createTextNode(`The weather in ${searchTerm} is ${originLocation.weather}`); // Create a text node
        paraWeatherCondition.appendChild(textWeatherCondition); // Append the text to <li>
        weatherSection.appendChild(paraWeatherCondition); // Append <li> to <ul> with id="myList"
      }
    };
    xhr.open("GET", searchUrl, true);
    xhr.send();
  }
});
