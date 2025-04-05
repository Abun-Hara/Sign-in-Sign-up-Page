let API_KEY = "e0f171361220a8c2bf52425476bc1109"; // Replace with your actual API key

document
  .getElementById("searchIcon")
  .addEventListener("click", async function () {
    const cityName = document.getElementById("cityName").value;
    const APIURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${API_KEY}`;

    try {
      const response = await fetch(APIURL);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      console.log(data);

      document.querySelector(".temprature").textContent = `${Math.round(
        data.main.temp
      )}°C`;
      document.querySelector(
        ".cityWeather"
      ).textContent = `${data.name}-${data.weather[0].description} `;
      document.querySelector(".wind").textContent = `${Math.round(
        data.wind.speed
      )} km/h`;
      document.querySelector(
        ".humidity"
      ).textContent = `${data.main.humidity}%`;
      document.getElementById(
        "weatherIcon"
      ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    } catch (error) {
      alert(error.message);
    }
  });
