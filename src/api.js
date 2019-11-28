"use strict";
const http = require("http");
const https = require("https");

// const weatherKey = config.WEATHER_KEY; // fetch key from config file
// const url = `http://api.openweathermap.org/data/2.5/weather?appid=${weatherKey}&q=`;
//
// const myRequest = (url, cb) => {
//   http
//     .get(url, response => {
//       let data = "";
//       response.on("data", chunk => {
//         data += chunk;
//       });
//       response.on("end", () => {
//         const body = JSON.parse(data);
//         console.log(body);
//         const statusCode = response.statusCode;
//         cb(null, { statusCode, body });
//       });
//     })
//     .on("error", err => cb(err));
// };

const transportRequest = (url, cb) => {
  const protocol = url.includes("https") ? https : http;

  protocol
    .get(url, response => {
      let data = "";
      response.on("data", chunk => {
        data += chunk;
      });
      response.on("end", () => {
        const body = JSON.parse(data);
        console.log(
          "consoled in transport request in api.js",
          body.identification.from_options
        );

        const statusCode = response.statusCode;
        console.log("StatusCode:", statusCode);
        cb(null, { statusCode, body });
      });
    })
    .on("error", err => cb(err));
};

module.exports = {
  transportRequest
};
