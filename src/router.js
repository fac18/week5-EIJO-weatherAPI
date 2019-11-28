const handlers = require("./handlers.js");
const apis = require("./api");
const env = require('dotenv').config();

let city = "London"; //comment out
const tflKey = process.env.TFL_KEY;
const tflAppID = process.env.TFL_APP_ID;
const transportUrl = `https://transportapi.com/v3/uk/public/journey/from/london/to/liverpool.json?app_id=${tflAppID}&app_key=${tflKey}`;

const weatherKey = process.env.WEATHER_KEY; // fetch key from config file
const weatherUrl = `https://api.openweathermap.org/data/2.5/find?units=metric&appid=${weatherKey}&q=${city}`;

const router = (request, response) => {
  const endpoint = request.url;

  if (endpoint === "/") {
    handlers.handleHome(request, response);

    // maybe need to handleInput????????
  } else if (endpoint.includes("public")) {
    handlers.handlePublic(request, response, endpoint); // PASS THE URL
  } else if (endpoint.includes("search")) {
    apis.weatherRequest(weatherUrl);
    apis.transportRequest(transportUrl);
    console.log("hello this is at the endpoint search");
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end("unknown uri");
  }
};
module.exports = router;
