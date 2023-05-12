const express = require("express");
const cors = require ("cors");
const axios = require("axios");
require("dotenv").config();
const PORT = 8080;
const app = express();
app.use(cors());

const data = require("./weather.json");

app.get("/", (request, response) => {
 response.status(200).json("You are looking at the root route.");
});

app.get("/weather", async (resquest, response) => {
const { lat, lon, searchQuery } = request.query;


const forecasts = [];
try{
 const API = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${searchQuery}`;
 const res = await axios.get(API);

 res.data.data.forEach((day) => {
 const fc = {  date: day.valid_date, description: day.weather.description };
 forecasts.push(fc);
 });
 
 response.status(200).json(forecasts);
} catch (error) {
 console.log(error);
 response.status(404).json("Location not Found");
}
});

app.listen(PORT, () => console.log('App is running on PORT ${PORT}'));