"use strict";
const http = require("http");
const https = require("https");

const weatherRequest = (url, cb) => {
  const protocol = url.includes("https") ? https : http;
  protocol
    .get(url, response => {
      let data = "";
      response.on("data", chunk => {
        data += chunk;
      });
      response.on("end", () => {
        const body = JSON.parse(data);
        // console.log('Whole body weather: ', body)
        let weatherCondition = body.list[0].weather[0].description;
        let weatherIconCode = body.list[0].weather[0].icon;
        let weatherIcon = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`

        const statusCode = response.statusCode;
        console.log("StatusCode:", statusCode);
        // cb(null, { statusCode, body });
      });
    })
    .on("error", err => cb(err));
};

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
  transportRequest,
  weatherRequest
  // uncomment line below to export bonus solution
  // ,myBonusRequest
};
