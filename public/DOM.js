const inputValue = document.getElementsByClassName("input-city")[0];
const siteButton = document.getElementById("site-button");
const divTFL = document.querySelector(".tfl-output");
console.log(siteButton);
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

        var node = document.createElement("div"); // Create a <li> node
        var textnode = document.createTextNode(originLocation.weather); // Create a text node
        node.appendChild(textnode); // Append the text to <li>
        divTFL.appendChild(node); // Append <li> to <ul> with id="myList"
      }
    };
    xhr.open("GET", searchUrl, true);
    xhr.send();
  }
});
