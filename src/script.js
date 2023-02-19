//1

let small = document.querySelector("small");
let now = new Date();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

small.innerHTML = `${day} ${hours}:${minutes}`;

//2
function displayWeather(response) {
  console.log(response);
  document.querySelector("#search-city").innerHTML = response.data.name;
  document.querySelector("#degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function search(city) {
  let apiKey = "fb1250e0eebcdc69046fdc8c3950c89f";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e8dec81490f528b6b7847357fa83bb2a&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function searchCity() {
  let city = document.querySelector("#search-input").value;

  search(city);
}

let form = document.querySelector("#search");
form.addEventListener("submit", searchCity);

//3

function changeMetricF(event) {
  event.preventDefault();
  let degreesElement = document.querySelector("#degrees");
  let degrees = degreesElement.innerHTML;
  degrees = Number(degrees);
  degreesElement.innerHTML = Math.round((degrees * 9) / 5 + 32);
}

let fahrenhaitLink = document.querySelector("#fahrenheit-link");
fahrenhaitLink.addEventListener("click", changeMetricF);

function changeMetricC(event) {
  event.preventDefault();
  let degreesElement = document.querySelector("#degrees");
  let degrees = degreesElement.innerHTML;
  degrees = Number(degrees);
  degreesElement.innerHTML = Math.round(((degrees - 32) * 5) / 9);
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", changeMetricC);

search("Shanghai");

//geolocation

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);
