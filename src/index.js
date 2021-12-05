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
  let sunsetValue = document.querySelector("#svalue");
  let city = `${response.data.name}`;
  let country = `${response.data.sys.country}`;
  let temp = Math.round(`${response.data.main.temp}`);
  let icon = `${response.data.weather[0].icon}`;
  let wind = Math.round(`${response.data.wind.speed}`);
  let humidity = Math.round(`${response.data.main.humidity}`);
  let sunset = `${response.data.sys.sunset}`;

  cityName.innerHTML = `${city}`;
  tempValue.innerHTML = `${temp}`;
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  countryName.innerHTML = `\xa0` + regionNames.of(`${country}`);
  todayIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  windValue.innerHTML = " " + `${wind}mph`;
  humidityValue.innerHTML = " " + `${humidity}`;

  let unix_timestamp = `${sunset}`;
  let date = new Date(unix_timestamp * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let formattedSunset = hours + ":" + minutes.substr(-2) + `${ampm}`;

  sunsetValue.innerHTML = " " + `${formattedSunset}`;
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

function convertToFa(event) {
  event.preventDefault();
  let temp = document.querySelector("#today-temp");
  temp.innerHTML = Math.round((Math.round(`${temp.innerHTML}`) * 9) / 5 + 32);
  faLink.classList.add("disabled-link");
  celLink.classList.remove("disabled-link");
}

let faLink = document.querySelector("#fahrenheit");
faLink.addEventListener("click", convertToFa);

function convertToCel(event) {
  event.preventDefault();
  let temp = document.querySelector("#today-temp");
  temp.innerHTML = Math.round((Math.round(`${temp.innerHTML}`) - 32) * (5 / 9));
  celLink.classList.add("disabled-link");
  faLink.classList.remove("disabled-link");
}

let celLink = document.querySelector("#celcius");
celLink.addEventListener("click", convertToCel);
