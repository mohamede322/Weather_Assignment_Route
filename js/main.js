const baseUrl = `http://api.weatherapi.com/v1`;
const apiKey = `76934a3c99bc4af88b2183839240207`;

const searchInput = document.querySelector("#searchInput");

const currentDayIndex = new Date().getDay();
const currentMonthIndex = new Date().getMonth();
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthsOfYear = [
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

const currentDay = daysOfWeek[currentDayIndex];
const currentMonth = monthsOfYear[currentMonthIndex];

async function getWeather() {
  let inputValue = this.value;
  let url = `${baseUrl}/forecast.json?key=${apiKey}&q=${
    inputValue == null ? "Alexandria" : inputValue
  }&days=3`;
  let res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await res.json();

  displayData(data.forecast.forecastday, data.location);
}

function displayData(data, location) {
  const city = document.querySelector(".city");
  const day = document.querySelector(".day");
  const dayDate = document.querySelector(".day-date");
  const degree = document.querySelector(".degree");
  const weatherImg = document.querySelector(".weather-img");
  const weatherStatus = document.querySelector(".weather-status");

  const nextDay = document.querySelector(".next-day");
  const nextDayImg = document.querySelector(".next-day-img");
  const nextDayDegree = document.querySelector(".nextday-degree");
  const nextDayFeelsLike = document.querySelector(".nextday-feelslike");
  const nextDayWeatherStatus = document.querySelector(
    ".next-day-weather-status"
  );

  const thirdDay = document.querySelector(".third-day");
  const thirdDayImg = document.querySelector(".third-day-img");
  const thirdDayDegree = document.querySelector(".third-day-degree");
  const thirdDayFeelsLike = document.querySelector(".third-day-feelslike");
  const thirdDayWeatherStatus = document.querySelector(
    ".third-day-weather-status"
  );

  city.innerText = location.name;
  day.innerText = currentDay;
  dayDate.innerHTML = `${currentDayIndex} ${currentMonth}`;
  degree.innerHTML = `${data[0].day.maxtemp_c}<sup>o</sup>C`;
  weatherImg.setAttribute("src", data[0].day.condition.icon);
  weatherStatus.innerText = data[0].day.condition.text;

  nextDay.innerText = daysOfWeek[currentDayIndex + 1];
  nextDayImg.setAttribute("src", data[1].day.condition.icon);
  nextDayDegree.innerHTML = `${data[1].day.maxtemp_c}<sup>o</sup>C`;
  nextDayFeelsLike.innerHTML = `${data[1].day.mintemp_c}<sup>o</sup>C`;
  nextDayWeatherStatus.innerText = data[1].day.condition.text;

  thirdDay.innerText = daysOfWeek[currentDayIndex + 2];
  thirdDayImg.setAttribute("src", data[2].day.condition.icon);
  thirdDayDegree.innerHTML = `${data[2].day.maxtemp_c}<sup>o</sup>C`;
  thirdDayFeelsLike.innerHTML = `${data[2].day.mintemp_c}<sup>o</sup>C`;
  thirdDayWeatherStatus.innerText = data[2].day.condition.text;
}
getWeather();
searchInput.addEventListener("keyup", getWeather);
