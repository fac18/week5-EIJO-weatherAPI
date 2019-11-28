const handlers = require("./handlers.js");
const config = require("./config.json");
const apis = require("./api");

const tflKey = config.TFL_KEY;
const tflAppID = config.TFL_APP_ID;
const transportUrl = `https://transportapi.com/v3/uk/public/journey/from/london/to/liverpool.json?app_id=${tflAppID}&app_key=${tflKey}`;

const weatherKey = config.WEATHER_KEY; // fetch key from config file
const weatherUrl = `https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&appid=${weatherKey}`;
let city = "London";

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
