const apiKey = 'a3d2e88707a036df6223a568f38547e4';

document.getElementById("search-btn").addEventListener("click", getWeather);

function getWeather() {
  const city = document.getElementById("city-input").value.trim();
  if (city === "") return alert("Silakan masukkan nama kota!");

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.cod === "404") {
        alert("Kota tidak ditemukan. Silakan masukkan nama kota yang valid.");
        return;
      }
      displayWeather(data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      alert("Gagal mengambil data cuaca.");
    });
}

function displayWeather(data) {
  const weatherResult = document.getElementById("weather-result");

  const cityName = data.name;
  const temperature = data.main.temp;
  const weather = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  weatherResult.innerHTML = `
    <div class="weather-item"><strong>Kota:</strong> ${cityName}</div>
    <div class="weather-item"><strong>Suhu:</strong> ${temperature}°C</div>
    <div class="weather-item"><strong>Cuaca:</strong> ${weather}</div>
    <div class="weather-item"><strong>Kelembapan:</strong> ${humidity}%</div>
    <div class="weather-item"><strong>Kecepatan Angin:</strong> ${windSpeed} m/s</div>
  `;
}
