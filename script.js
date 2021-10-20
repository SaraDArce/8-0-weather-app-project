// First things first - Create a var for form!

const form = document.querySelector("form");

// Compartmentalizing "This logic fetches location data..."
let getWeather = () => {
  let query = form.city.value;

  return fetch(`https://wttr.in/${query}?format=j1`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let inputCity = (data.nearest = area[0].areaName[0].value);
      let region = (data.nearest = area[0].region[0].value);
      let country = (data.nearest = area[0].country[0].value);
      let feelsLike = (data.current = condition[0].feelsLikeF);

      // Forecast

      let avgTemp = data.weather[0].avgtempF;
      let maxTemp = data.weather[0].maxtempF;
      let minTemp = data.weather[0].mintempF;

      // Tomorrow's Forecast

      let avgTempTom = data.weather[1].avgtempF;
      let maxTempTom = data.weather[1].maxtempF;
      let minTempTom = data.weather[1].mintempF;

      // Day After (DA) Forecast

      let avgTempDA = data.weather[2].avgtempF;
      let maxTempDA = data.weather[2].maxtempF;
      let minTempDA = data.weather[2].mintempF;

      let display = document.querySelector(".display");
    });
};

// Add Event Listener to form's "submit"
form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather().then((data) => {
    console.log(data);
  });
});

function prevSearches(city, temp) {
  let ul = document.querySelector(".history ul");
  let li = document.createElement("li");
  let a = document.createElement("a");
}
