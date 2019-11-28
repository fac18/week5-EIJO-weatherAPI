// const data = require('./data');
const fs = require("fs");
const path = require("path");
const apis = require("./api.js");
const env = require("dotenv").config();
// const config = require("./config");
const tflKey = process.env.TFL_KEY;
const tflAppID = process.env.TFL_APP_ID;
// const url = require("url");

// const search = term => {
//   if (term === "") {
//     return [];
//   }
// };

const handleHome = (request, response) => {
  const filePath = path.join(__dirname, "..", "public", "index.html"); //asynchronous way
  fs.readFile(filePath, (error, file) => {
    // gives you a cb, either an error or the file
    if (error) {
      console.log(error);
      response.writeHead(500, {
        "Content-Type": "text/html"
      }); // 500 server-side error
      response.end("<h1>Sorry we had a problem at our end</h1>");
    } else {
      response.writeHead(200, {
        "Content-Type": "text/html"
      }); //so the server can expect a HTML file coming in
      response.end(file);
    }
  });
};

const handleInput = (request, response, endpoint) => {
  // const newsKey = process.env.DB_APIKEYNEWS;
  // const countryCode = endpoint.split("?")[1];
  const city = endpoint.split("q=")[1];
  // console.log("originLocation in handleInput:", originLocation);
  // let transportUrl = `https://transportapi.com/v3/uk/public/journey/from/${originLocation}/to/HeathrowAirport.json?app_id=${tflAppID}&app_key=${tflKey}`;
  const weatherKey = process.env.WEATHER_KEY; // fetch key from config file
  // console.log("weatherKey:", weatherKey);
  const weatherUrl = `https://api.openweathermap.org/data/2.5/find?units=metric&appid=${weatherKey}&q=${city}`;

  apis.weatherRequest(weatherUrl, (err, data) => {
    if (err) {
      console.error(err);
      response.writeHead(400, { "Content-Type": "text/html" });
      // response.write("404");
      response.end();
    } else {
      // response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(data));
      //if we want to access the description of the weather use this .body.list[0].weather[0].description on the frontend
    }
  });
};

const handlePublic = (request, response, endpoint) => {
  // PASS THE URL
  const extension = endpoint.split(".")[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/js",
    ico: "image/x-icon",
    svg: "image/svg+xml",
    jpeg: "image/jpeg"
  };
  const filePath = path.join(__dirname, "..", endpoint);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(404, {
        "Content-Type": "text/html"
      });
      response.end("<h1>404 not found </h1>");
    } else {
      response.writeHead(200, {
        "Content-Type": extensionType[extension]
      });
      response.end(file);
    }
  });
};

//Handle the weather Data
// const handleData = (request, response, endpoint) => {
// let urlObject = url.parse(endpoint);
// let searchTerm = urlObject.query.split("=")[1];
// let result = search(decodeURI(searchTerm));
// response.writeHead(200, { "Content-Type": "application/json" });
// response.end(JSON.stringify(result));
// }

module.exports = {
  handleHome,
  handlePublic,
  handleInput
  // handleData,
  // search
};
