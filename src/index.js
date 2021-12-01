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
  hours = hours ? hours : 12; // the hour '0' should be '12'
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
  let city = `${response.data.name}`;
  let country = `${response.data.sys.country}`;
  let temp = `${response.data.main.temp}`;

  cityName.innerHTML = `${city}`;
  tempValue.innerHTML = Math.round(`${temp}`);
  if (temp > -9 && temp < 10) {
    tempValue.innerHTML = `\xa0` + Math.round(`${temp}`);
  }

  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  countryName.innerHTML = `\xa0` + regionNames.of(`${country}`);
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

//let convertLink = document.querySelector("#conversion");
//if (convertLink.innerHTML === "Convert to Fahrenheit") {
//  convertLink.addEventListener("click", convertToFa);
//}
//if (convertLink.innerHTML === "Convert to Celcius") {
//  convertLink.addEventListener("click", convertToC);
//}

//function convertToC() {
// let temp = document.querySelector("#today-temp");
//  temp.innerHTML =
//   ((Math.round(`${temp.innerHTML.substr(2)}`) - 32) * 5) / 9;
// let convertLink = document.querySelector("#celcius");
// convertLink.innerHTML = "Convert to Fahrenheit";
//}

//function convertToFa() {
//  let temp = document.querySelector("#today-temp");
// temp.innerHTML =
//    (Math.round(`${temp.innerHTML.substr(0, 1)}`) * 9) / 5 + 32;
//  let convertLink = document.querySelector("#fahrenheit");
// convertLink.innerHTML = "Convert to Celcius";
//}
