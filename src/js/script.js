const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', searchWeather);

function searchWeather(e) {
  const headerContainer = document.getElementById('headerContainer');
  const cityInput = document.getElementById('cityInput').value;
  const provinceInput = document.getElementById('provinceInput').value;

  headerContainer.style.backgroundImage = "url('http://source.unsplash.com/1920x1080/?" + cityInput + ',' + provinceInput + "')";

  e.preventDefault();
}
