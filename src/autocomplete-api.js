let siteArray = [];

const changeValue = () => {
  let searchTerm = siteBox.value;
  console.log("this is searchterm", searchTerm);
  let xhr = new XMLHttpRequest();

  let searchUrl = `/search?q=${searchTerm}`;
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      //populate suggestionsArray with parsed JSON response
      siteArray = JSON.parse(xhr.responseText);
      //fill DOM with li elements created from suggestionsArray
      populateDropDown();
    }
  };

  xhr.open("GET", searchUrl, true);
  xhr.send();
};

const populateDropDown = () => {
  let dropDownInfo = document.querySelector(".dropdown-box");
  dropDownInfo.textContent = "";
  siteArray.forEach(site => {
    let liElement = document.createElement("li");
    liElement.classList.add("site-item");
    let matchingText = document.createElement("span");
    matchingText.classList.add("matching-text");
    matchingText.textContent = site.slice(0, siteBox.value.length);
    let remainingText = document.createElement("span");
    remainingText.classList.add("remaining-text");
    remainingText.textContent = site.slice(siteBox.value.length);
    liElement.appendChild(matchingText);
    liElement.appendChild(remainingText);
    dropDownInfo.appendChild(liElement);
    liElement.addEventListener("click", chooseOption);
  });
};

siteBox.addEventListener("input", changeValue);

var i = -1;

siteBox.addEventListener("keydown", function(e) {
  if (e.keyCode === 40 && siteArray[i] !== siteArray[siteArray.length - 1]) {
    e.preventDefault();
    i++;
    siteBox.value = siteArray[i];
  }

  if (e.keyCode === 38 && siteArray[i] !== siteArray[0]) {
    e.preventDefault();
    i--;
    siteBox.value = siteArray[i];
  }
});
