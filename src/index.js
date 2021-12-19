function date(today) {
  let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let date = today.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let month = months[today.getMonth()];
  let hours = today.getHours();
  let minutes = today.getMinutes();

  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let currentDay = `${month}/${date}`;
  let currentTime = `${hours}:${minutes}${ampm}`;

  let todayDate = document.querySelector("#today-date");
  todayDate.innerHTML = `${currentDay}`;

  let todayTime = document.querySelector("#today-time");
  todayTime.innerHTML = `${currentTime}`;
}

let today = new Date();

date(today);

navigator.geolocation.getCurrentPosition(showPosition);

let searchForm = document.querySelector("#search-widget");
searchForm.addEventListener("submit", searchEngine);

function searchEngine(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let searchValue = `${searchInput.value}`;

  let cel = `units=metric`;
  let apiKey = `d61c5244a5a570810637d907016c62d7`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&${cel}&appID=${apiKey}`;

  axios.get(`${apiUrl}`).then(displayCity);
}

function displayCity(response) {
  let cityName = document.querySelector("#city");
  let countryName = document.querySelector("#country");
  let tempValue = document.querySelector("#today-temp");
  let todayIcon = document.querySelector("#today-icon");
  let humidityValue = document.querySelector("#hvalue");
  let windValue = document.querySelector("#wvalue");
  let descriptionValue = document.querySelector("#today-description");
  let city = `${response.data.name}`;
  let country = `${response.data.sys.country}`;
  let temp = Math.round(`${response.data.main.temp}`);
  let icon = `${response.data.weather[0].icon}`;
  let wind = Math.round(`${response.data.wind.speed}`);
  let humidity = Math.round(`${response.data.main.humidity}`);
  let description = `${response.data.weather[0].description}`;

  cityName.innerHTML = `${city}`;
  tempValue.innerHTML = `${temp}`;
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  countryName.innerHTML = `\xa0` + regionNames.of(`${country}`);
  todayIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  windValue.innerHTML = " " + `${wind} mps`;
  humidityValue.innerHTML = " " + `${humidity}%`;
  descriptionValue.innerHTML = `${description}`;

  let searchField = document.querySelector("#search-input");
  searchField.value = "";
  searchField.placeholder = "Where are you today?";

  forecastLocation(response.data.coord);
}

displayForecastDefault();

function displayForecastDefault() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row row-6">
   <div class="col-md-12">
   <div class="card-deck" style="width:40rem">`;
  forecastElement.innerHTML = forecastHTML;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="card">
          <div class="card-header">${day}
          </div>
          <div class="card-body">
          <h5 class="card-title">00° 00°</h5>
          <img
          class="img-fluid icon"
          src="https://openweathermap.org/img/wn/10d@2x.png"
          />
          </div>
        </div>`;
    forecastElement.innerHTML = forecastHTML + `</div></div></div>`;
  });
}

function forecastLocation(coordinates) {
  let apiKey = `d61c5244a5a570810637d907016c62d7`;
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecastReal);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecastReal(response) {
  let forecastData = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row row-6">
   <div class="col-md-12">
   <div class="card-deck" style="width:40rem">`;
  forecastElement.innerHTML = forecastHTML;

  forecastData.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="card">
          <div class="card-header">${formatDay(forecastDay.dt)}
          </div>
          <div class="card-body">
          <h5 class="card-title">
          <strong class="temp-max">${Math.round(forecastDay.temp.max)}°</strong>
          <span class="temp-min">${Math.round(forecastDay.temp.min)}°</span>
          </h5>
          <img
          class="img-fluid icon"
          src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          />
          </div>
        </div>`;
      forecastElement.innerHTML = forecastHTML + `</div></div></div>`;
    }
  });
}

function currentPosition() {
  document.querySelector("#search-input").value = "";
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentPosition);

function showPosition(position) {
  let latitude = `${position.coords.latitude}`;
  let longitude = `${position.coords.longitude}`;
  let unit = "units=metric";
  let apiKey = "d61c5244a5a570810637d907016c62d7";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&${unit}&appID=${apiKey}`;

  axios.get(`${apiURL}`).then(displayCity);
}
