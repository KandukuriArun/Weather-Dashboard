const API_KEY = "70088e3426040089876f1b0b58b87de5";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const condition = document.getElementById("condition");
const weatherBox = document.getElementById("weather");
const errorMsg = document.getElementById("error");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value.trim();

  if (city === "") {
    errorMsg.textContent = "Please enter a city name";
    return;
  }

  try {
    errorMsg.textContent = "";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    cityName.textContent = data.name;
    temp.textContent = data.main.temp;
    humidity.textContent = data.main.humidity;
    wind.textContent = data.wind.speed;
    condition.textContent = data.weather[0].description;

    weatherBox.classList.remove("hidden");
  } catch (error) {
    weatherBox.classList.add("hidden");
    errorMsg.textContent = error.message;
  }
}
