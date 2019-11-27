"use strict";
const http = require("http");
const https = require("https");
const queryString = require("./router.js");
const config = ("./config.json");


const weatherKey = config.WEATHER_KEY; // fetch key from config file

console.log(weatherKey);

const url = `api.openweathermap.org/data/2.5/weather? ${queryString} ${weatherKey}`;
const myRequest = (url, cb) => {
  const protocol = url.includes("https") ? https : http;
  protocol.get(url, response => {
      let data = "";
      response.on("data", chunk => {
        data += chunk;
      });
      response.on("end", () => {
        const body = JSON.parse();
        console.log(body);
        const statusCode = response.statusCode;
        cb(null, { statusCode, body });
      });
    })
    .on("error", err => cb(err));
};
// uncomment below for bonus https solution
// 
//     .get(url, response => {
//       let data = "";
//       response.on("data", chunk => {
//         data += chunk;
//       });
//       response.on("end", () => {
//         const body = JSON.parse(data);
//         const statusCode = response.statusCode;
//         cb(null, { statusCode, body });
//       });
//     })
//     .on("error", err => cb(err));
// };
module.exports = {
  myRequest
  // uncomment line below to export bonus solution
  // ,myBonusRequest
};