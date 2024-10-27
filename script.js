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
// Ambil tombol dan elemen body
const toggleButton = document.getElementById("toggle-mode");
const body = document.body;
const app = document.getElementById("app");
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

toggleButton.addEventListener("click", () => {
  if (body.classList.contains("dark-mode")) {
    body.classList.add("light-mode-animate");
    setTimeout(() => {
      body.classList.remove("light-mode-animate");
    }, 1000);
    
    // Hapus kelas dark-mode untuk kembali ke mode terang
    body.classList.remove("dark-mode");
    app.classList.remove("dark-mode");
    cityInput.classList.remove("dark-mode");
    searchBtn.classList.remove("dark-mode");
    document.querySelectorAll(".weather-item").forEach(item => {
      item.classList.remove("dark-mode");
    });
    
    // Ubah ikon dan teks tombol
    toggleButton.innerHTML = "🌙 Mode Malam";
  } else {
    body.classList.add("dark-mode-animate");
    setTimeout(() => {
      body.classList.remove("dark-mode-animate");
    }, 1000);

    // Tambah kelas dark-mode untuk mode malam
    body.classList.add("dark-mode");
    app.classList.add("dark-mode");
    cityInput.classList.add("dark-mode");
    searchBtn.classList.add("dark-mode");
    document.querySelectorAll(".weather-item").forEach(item => {
      item.classList.add("dark-mode");
    });

    // Ubah ikon dan teks tombol
    toggleButton.innerHTML = "☀️ Mode Terang";
  }
});
