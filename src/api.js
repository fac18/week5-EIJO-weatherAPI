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
        let resObj = {};
        const body = JSON.parse(data);
        const statusCode = response.statusCode;
        const weatherIconCode = body.list[0].weather[0].icon;
        resObj.weather = body.list[0].weather[0];
        resObj.weatherIcon = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
        resObj.statusCode = statusCode;
        console.log("StatusCode:", statusCode);
        cb(null, resObj);
      });

    })
    .on("error", err => cb(err));
};

module.exports = {
  weatherRequest
};
