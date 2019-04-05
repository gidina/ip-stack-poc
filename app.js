var axios = require('axios');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  const searchIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const ipStackBaseUrl = "http://api.ipstack.com/";
  const ipStackApiKey = "4ed052760ba165cd398f723a01df2360";

  let ipStackUrlRequest = `${ipStackBaseUrl}${searchIp}?access_key=${ipStackApiKey}`;

  if (process.env.NODE_ENV === 'development') {
    ipStackUrlRequest = `${ipStackBaseUrl}check?access_key=${ipStackApiKey}`;
  }

  axios.get(ipStackUrlRequest)
  .then(ipInfo => res.json(ipInfo.data.country_code))
  .catch(error => { res.send("Error message: ", error.message); console.log(error) });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// ES6
// import axios from 'axios';
// import express from 'express';
// const app = express();

// const getLocalization = async (url) => {
//   try {
//     return await axios.get(url);
//   } catch (error) {
//     console.error(error);
//   }
// };

// app.get('/', function (req, res) {
//   const searchIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//   const ipStackBaseUrl = "http://api.ipstack.com/";
//   const ipStackApiKey = "4ed052760ba165cd398f723a01df2360";

//   let ipStackUrlRequest = `${ipStackBaseUrl}${searchIp}?access_key=${ipStackApiKey}`;

//   if (process.env.NODE_ENV === 'development') {
//     ipStackUrlRequest = `${ipStackBaseUrl}check?access_key=${ipStackApiKey}`;
//   }

//   const ipInfo = await getLocalization(ipStackUrlRequest);
//   res.json(ipInfo.data.country_code);
// });

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });