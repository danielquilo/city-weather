import './App.css';
import axios from "axios";
import { useState } from "react";


function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState({});
  const [map, setMap] = useState("");
  const [apiError, setApiError] = useState("");
  const [weather, setWeather] = useState([]);
  const [darkTheme, SetDarkTheme] = useState (true);


function handleChange(event) {
  setSearchQuery(event.target.value);
}

async function getLocation() {
  try {
    // https://eu1.locationiq.com/v1/search?key=YOUR_ACCESS_TOKEN&q=SEARCH_STRING&format=json
    const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;
    const res = await axios.get(API);
    const newLocation = res.data[0];
    setLocation(newLocation);
    getMap(newLocation);
    getWeather(newLocation);
    setApiError("");
  } catch (error) {
    console.log(error);
    setApiError(error.message);
    setLocation({});
    setWeather([]);
    setMap("");
  }
}

async function getMap(newLocation) {
  const API = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${newLocation.lat},${newLocation.lon}&zoom=11`;
  setMap(API);
}

async function getWeather(newLocation) {
  try {
    const API = `http://localhost:8080/weather?searchQuery=${searchQuery}&lat=${newLocation.lat}&lon=${newLocation.lon}`;
    const res = await axios.get(API);
    console.log(res.data);
    setWeather(res.data);
  } catch (error) {
    console.log(error);
    setWeather([]);
  }
}

  return (
    <div className="App">
    <h1>City Explorer </h1>
    <input onChnage={handleChange} placeholder="Place Name" />
    <button onClick={getLocation}>Explore</button>
    <p>{apiError}</p>
    <h2>{location.display_name}</h2>
    {map && <img scr={map} alt="map" />}
    {weather.map((day, index) => {
      return (
        <p key={index}>
        {day.date} - {day.description}
        </p>
      );
    })}
      </div>
  );
}

export default App;
