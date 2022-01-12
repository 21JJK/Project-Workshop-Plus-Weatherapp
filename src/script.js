let now = new Date();

let h2 = document.querySelector("#time");

function formatDate(date) {
  let currentDate = now.getDate();
  let currentHours = now.getHours();
  let currentMinutes = now.getMinutes();
  let currentYear = now.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentMonth = months[now.getMonth()];

  return `${currentDay}, ${currentDate}. ${currentMonth} ${currentYear}, ${currentHours}:${currentMinutes}`;
}

h2.innerHTML = formatDate(now);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function search(city) {
  let apiKey = "4c79603c64bb67feda54171198de3279";
  let openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${openWeatherUrl}q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherByCity);
}

function handleSubmit(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

function displayWeatherByCity(response) {
  console.log(response);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

//function searchCity(cityName) {
//let openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
//let apiKey = "4c79603c64bb67feda54171198de3279";
//let apiUrl = `${openWeatherUrl}q=${cityName}&appid=${apiKey}&units=metric`;

//axios.get(apiUrl).then(cityWeather);
//}

//function cityWeather(response) {
//console.log(response);
//let temperatureForm = document.queryselector("#temperature");
//let temperature = Math.round(response.data.main.temp);

//temperatureForm.innerHTML = `${temperature}`;
//}

function displayWeather(response) {
  let place = response.data.name;
  let placeDiv = document.querySelector("h1");
  placeDiv.innerHTML = `${place}`;
  let temperature = Math.round(response.data.main.temp);
  let weatherDiv = document.querySelector("#temperature");
  weatherDiv.innerHTML = `${temperature}`;
}

function showPosition(position) {
  console.log(position);
  let openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "4c79603c64bb67feda54171198de3279";
  let apiUrl = `${openWeatherUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#button-current-location");
currentLocationButton.addEventListener("click", getCurrentPosition);

//function changeToCelcius(event) {
//event.preventDefault;
//let toFahrenheit = document.querySelector("#temperature");
//toFahrenheit.innerHTML = "17";
//}

//let clickToCelcius = document.querySelector("#celciusLink");
//clickToCelcius.addEventListener("click", changeToCelcius);

//function changeToFahrenheit(event) {
//event.preventDefault;
//let toFahrenheit = document.querySelector("#temperature");
//toFahrenheit.innerHTML = "63";
//}

//let clickToFahrenheit = document.querySelector("#fahrenheitLink");
//clickToFahrenheit.addEventListener("click", changeToFahrenheit);

search("Paris");
