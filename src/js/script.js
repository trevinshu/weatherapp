require('dotenv').config();
import 'regenerator-runtime/runtime';

const searchBtn = document.getElementById('searchBtn');

//Search Button Event Listener
searchBtn.addEventListener('click', searchWeather);

//Search Weather Function
function searchWeather(e) {
  const headerContainer = document.getElementById('headerContainer');
  const cityInput = document.getElementById('cityInput').value;
  const provinceInput = document.getElementById('provinceInput').value;

  headerContainer.style.backgroundImage = "url('http://source.unsplash.com/1920x1080/?" + cityInput + ',' + provinceInput + "')";

  try {
    getWeather(cityInput, provinceInput);
  } catch (error) {
    console.log(error);
  }

  e.preventDefault();
}

//Get Weather From API Function
async function getWeather(city, province) {
  const apiKey = process.env.MY_API_KEY;

  let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${province}&appid=${apiKey}&units=metric`);
  let data = await response.json();

  let windSpeed = Math.round((data.wind.speed * 18) / 5);

  let html = document.getElementById('weatherContainer');
  html.innerHTML = '';
  html.innerHTML = `
    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
    <h1>${data.name} ${Math.round(data.main.temp)}°C</h1>
    <p>${data.weather[0].description}</p>
    <p>Feels Like: ${Math.round(data.main.feels_like)}°C</p>
    <p>Max Temp: ${Math.round(data.main.temp_max)}°C</p>
    <p>Min Temp: ${Math.round(data.main.temp_min)}°C</p>
    <p>Wind Speed: ${windSpeed} km/h</p>
    <p>Humidity: ${data.main.humidity}%</p>
  `;

  let weatherContainer = document.getElementById('weatherContainer');

  weatherContainer.appendChild(html);
}
