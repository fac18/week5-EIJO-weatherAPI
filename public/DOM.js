const inputValue = document.querySelector(".input-box");
const siteButton = document.getElementById("site-button");
const divTFL = document.querySelector(".tfl-output");

let suggestionsArray = [];
let listPosition = -1;

const changeValue = () => {
  listPosition = -1;
  let searchTerm = inputValue.value;
  let xhr = new XMLHttpRequest();
  let searchUrl = `/search?q=${encodeURIComponent(searchTerm)}`;
  // --change - line;
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      suggestionsArray = JSON.parse(xhr.responseText);
      addSuggestions();
    }
  };
  xhr.open("GET", searchUrl, true);
  xhr.send();
};

inputValue.addEventListener("input", changeValue);

//create li elements for each suggestion
const addSuggestions = () => {
  const UlElement = document.querySelector(".dropdown-box");
  UlElement.textContent = "";
  suggestionsArray.forEach((suggestion, i) => {
    const liElement = document.createElement("li");
    liElement.textContent = suggestion;
    if (i === listPosition) {
      liElement.classList.add("highlighted");
    }
    UlElement.appendChild(liElement);
    liElement.addEventListener("click", chooseSuggestion);
  });
};

// event handler for choosing a suggestion and updating value when clicked
const chooseSuggestion = event => {
  const value = event.currentTarget.textContent;
  inputValue.value = value;
  inputValue.focus();
  changeValue();
};

siteButton.addEventListener("click", () => {
  event.preventDefault();
  console.log("we made a request");
  if (inputValue.value) {
    let searchTerm = inputValue.value;
    let xhr = new XMLHttpRequest();
    let searchUrl = `/search?q=${encodeURIComponent(searchTerm)}`;
    // --change - line;
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log("we made it back mother fuckersssss");
        let originLocation = JSON.parse(xhr.responseText);
        console.log("originLocation:", originLocation);

        var node = document.createElement("div"); // Create a <li> node
        var textnode = document.createTextNode(originLocation); // Create a text node
        node.appendChild(textnode); // Append the text to <li>
        divTFL.appendChild(node); // Append <li> to <ul> with id="myList"
      }
    };
    xhr.open("GET", searchUrl, true);
    xhr.send();
  }
});

//code for keyboard navigation: return key to choose highlighted value from list, or search if already selected, up and down keys to navigate list
inputValue.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    returnKeyPress();
  } else if (event.keyCode === 40) {
    downArrowPress();
  } else if (event.keyCode === 38) {
    upArrowPress();
  }
});

function returnKeyPress() {
  if (document.querySelector(".highlighted")) {
    inputValue.value = document.querySelector(".highlighted").textContent;
    inputValue.focus();
    changeValue();
  } else {
    siteButton.click();
  }
}

function downArrowPress() {
  if (listPosition < suggestionsArray.length - 1) {
    listPosition++;
    addSuggestions();
  } else {
    addSuggestions();
  }
}

function upArrowPress() {
  if (listPosition > 0) {
    listPosition--;
    addSuggestions();
  } else {
    addSuggestions();
  }
}
