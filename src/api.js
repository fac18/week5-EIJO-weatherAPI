"use strict";
const http = require("http");
const config = require("./config");
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

// const tflKey = config.TFL_KEY;
// const tflAppID = config.TFL_APP_ID;
// // const transportUrl = `https://transportapi.com/v3/uk/public/journey/from/london/to/liverpool.json?app_id=${tflAppID}&app_key=${tflKey}`;

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
        console.log(body.identification.to_options[1]);

        const statusCode = response.statusCode;
        console.log("StatusCode:", statusCode);
        // cb(null, { statusCode, body });
      });
    })
    .on("error", err => cb(err));
};
// console.log(transportRequest(transportUrl));
// uncomment below for bonus https solution
// const https = require("https");
// const myBonusRequest = (url, cb) => {
//   const protocol = url.includes("https") ? https : http;
//   protocol
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
  // myRequest,
  // url,
  transportRequest
  // uncomment line below to export bonus solution
  // ,myBonusRequest
};
