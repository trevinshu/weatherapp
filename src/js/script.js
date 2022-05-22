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
    if (cityInput === '') {
      headerContainer.style.backgroundImage = "url('http://source.unsplash.com/1920x1080/?landscape')";
      let html = document.getElementById('weatherContainer');
      html.innerHTML = ``;
      resultContainer('cityMsg', '<i class="fa-solid fa-triangle-exclamation"></i>', 'Enter A City');
    } else if (provinceInput === '') {
      headerContainer.style.backgroundImage = "url('http://source.unsplash.com/1920x1080/?landscape')";
      let html = document.getElementById('weatherContainer');
      html.innerHTML = ``;
      resultContainer('countryMsg', '<i class="fa-solid fa-triangle-exclamation"></i>', 'Enter A Country Code');
    } else {
      getWeather(cityInput, provinceInput);
    }
  } catch (error) {
    console.log(error);
  }

  e.preventDefault();
}

//Get Weather From API Function
async function getWeather(city, province) {
  const apiKey = process.env.MY_WEATHER_KEY;

  try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${province}&appid=${apiKey}&units=metric`);
    let data = await response.json();

    let windSpeed = Math.round((data.wind.speed * 18) / 5);
    let html = document.getElementById('weatherContainer');

    const currentDate = new Date().toDateString();

    html.innerHTML = '';
    html.innerHTML = `
    <button id="toggleBtn" class="toggleBtn">°C</button>
    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
    <h1 id="mainTemp">${data.name} ${Math.round(data.main.temp)}°C</h1>
    <p>${currentDate}</p>
    <p>${data.weather[0].description}</p>
    <p id="feelsLike">Feels Like: ${Math.round(data.main.feels_like)}°C</p>
    <p id="maxTemp">Max Temp: ${Math.round(data.main.temp_max)}°C</p>
    <p id="minTemp">Min Temp: ${Math.round(data.main.temp_min)}°C</p>
    <p id="windSpeed">Wind Speed: ${windSpeed} km/h</p>
    <p>Humidity: ${data.main.humidity}%</p>
  `;
    resultContainer('successMsg', '<i class="fa-solid fa-circle-check"></i>', 'Weather Results');

    //Toggle between Celsius & Fahrenheit
    const toggleBtn = document.getElementById('toggleBtn');
    toggleBtn.addEventListener('click', switchUnits);

    function switchUnits(e) {
      e.preventDefault();
      if (toggleBtn.textContent === '°C') {
        toggleBtn.innerHTML = '°F';

        let currentTemp = Math.round(data.main.temp * (9 / 5) + 32);
        let feelsLike = Math.round(data.main.feels_like * (9 / 5) + 32);
        let maxTemp = Math.round(data.main.temp_max * (9 / 5) + 32);
        let minTemp = Math.round(data.main.temp_min * (9 / 5) + 32);
        let windSpeed = Math.round((data.wind.speed * 18) / 5 / 1.609344);

        let mainTemp = document.getElementById('mainTemp');
        mainTemp.innerHTML = `${data.name} ${currentTemp}°F`;

        let feTemp = document.getElementById('feelsLike');
        feTemp.innerHTML = `Feels Like: ${feelsLike}°F`;

        let maTemp = document.getElementById('maxTemp');
        maTemp.innerHTML = `Max Temp: ${maxTemp}°F`;

        let miTemp = document.getElementById('minTemp');
        miTemp.innerHTML = `Min Temp: ${minTemp}°F`;

        let wiSpeed = document.getElementById('windSpeed');
        wiSpeed.innerHTML = `Wind Speed: ${windSpeed} mph`;
      } else {
        toggleBtn.innerHTML = '°C';

        let mainTemp = document.getElementById('mainTemp');
        mainTemp.innerHTML = `${data.name} ${Math.round(data.main.temp)}°C`;

        let feTemp = document.getElementById('feelsLike');
        feTemp.innerHTML = `Feels Like: ${Math.round(data.main.feels_like)}°C`;

        let maTemp = document.getElementById('maxTemp');
        maTemp.innerHTML = `Max Temp: ${Math.round(data.main.temp_max)}°C`;

        let miTemp = document.getElementById('minTemp');
        miTemp.innerHTML = `Min Temp: ${Math.round(data.main.temp_min)}°C`;

        let wiSpeed = document.getElementById('windSpeed');
        let windSpeed = Math.round((data.wind.speed * 18) / 5);
        wiSpeed.innerHTML = `Wind Speed: ${windSpeed} km/h`;
      }
    }
  } catch {
    const headerContainer = document.getElementById('headerContainer');
    headerContainer.style.backgroundImage = "url('http://source.unsplash.com/1920x1080/?landscape')";
    let html = document.getElementById('weatherContainer');
    html.innerHTML = ``;
    resultContainer('noDataMsg', '<i class="fa-solid fa-triangle-exclamation"></i>', 'No Data For The Entered Search Query.');
  }
}

//Notification for Search Result
function resultContainer(className, icon, message) {
  let msgContainer = document.getElementById('msgContainer');

  msgContainer.innerHTML = `
    <p class='alert ${className}'>${icon} ${message}</p>
  `;

  setTimeout(function () {
    let alert = document.querySelector('.alert');
    alert.remove();
  }, 5000);
}
function footerText() {
  let footer = document.getElementById('footerContainer');
  let date = new Date().getFullYear();
  footer.innerHTML = `
  <p>Designed & Developed by Trevin Shu &copy; ${date}</p>
  `;
}

footerText();
