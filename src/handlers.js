const fs = require("fs");
const path = require("path");
const apis = require("./api.js");
const env = require("dotenv").config();
const tflKey = process.env.TFL_KEY;
const tflAppID = process.env.TFL_APP_ID;

const handleHome = (request, response) => {
  const filePath = path.join(__dirname, "..", "public", "index.html"); 
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, {
        "Content-Type": "text/html"
      }); 
      response.end("<h1>Sorry we had a problem at our end</h1>");
    } else {
      response.writeHead(200, {
        "Content-Type": "text/html"
      });
      response.end(file);
    }
  });
};

const handleInput = (request, response, endpoint) => {
  const city = endpoint.split("q=")[1];
  const weatherUrl = `https://api.openweathermap.org/data/2.5/find?units=metric&appid=${weatherKey}&q=${city}`;

  apis.weatherRequest(weatherUrl, (err, data) => {
    if (err) {
      console.error(err);
      response.writeHead(400, { "Content-Type": "text/html" });
      response.end();
    } else {
      response.end(JSON.stringify(data));
    }
  });
};

const handlePublic = (request, response, endpoint) => {
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


module.exports = {
  handleHome,
  handlePublic,
  handleInput
};
