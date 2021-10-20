let form = document.querySelector("form");
let searches = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let chooseLocation = e.target["location"].value;
  e.target["location"].value = "";
  // let errorMsg = document.querySelector("#error-message")
  let errorMsg = document.createElement("div");
  // console.log(chooseLocation)
  if (!chooseLocation) {
    errorMsg.textContent = "Please enter a location";
    form.before.add(errorMsg);
  } else {
    errorMsg.textContent = "";
    // console.log(chooseLocation)
    fetch(`https://wttr.in/${chooseLocation}?format=j1`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);

        let dateTime = data.current_condition[0].localObsDateTime;

        // let previousSearch = document.querySelector("#previousSearches")

        // let listItem = document.createElement("li")
        let forecast = document.querySelector("#forecast");
        forecast.innerHTML = `
                <div id ="current-location" class="display"> </div>
                <h2>${data.nearest_area[0].areaName[0].value}</h2>
                <div><strong>${dateTime}<strong><div>
                <br>
                <div><strong>Area: </strong><span id="area">${data.nearest_area[0].areaName[0].value}</span></div>
                <br>
                <div><strong>Region: </strong><span id="region"> ${data.nearest_area[0].region[0].value}</span></div>
                <br>
                <div><strong>Country: </strong><span id="country">${data.nearest_area[0].country[0].value}</span></div>
                <br>
                <div><strong>Currently: </strong><span id="current">Feels like ${data.current_condition[0].FeelsLikeF}°F</span></div>
                
                <br>`;

        let threeDay = document.querySelector("#threeDay");

        threeDay.innerHTML = `
                <div id = "today">
                    <h3>Today</h3>
                    <div><strong>Average Temp: </strong><span>${data.weather[0].avgtempF} °F</span></div>
                    <br>
                    <div><strong>Max Temp: </strong><span> ${data.weather[0].maxtempF} °F</span></div>
                    <br>
                    <div><strong>Min Temp: </strong><span> ${data.weather[0].mintempF} °F</span></div>
                <br>      
                </div>
                <div id ="tomorrow">
                    <h3>Tomorrow</h3>
                    <div><strong>Average Temp:</strong><span> ${data.weather[1].avgtempF}°F</span></div>
                    <br>
                    <div><strong>Max Temp:</strong><span> ${data.weather[1].maxtempF}°F</span></div>
                    <br>
                    <div><strong>Min Temp:</strong><span> ${data.weather[1].mintempF}°F</span></div>
                    <br>          
                 </div>
                 <div id="day-after">
                    <h3>Day After Tomorrow</h3>
                    <div><strong>Average Temp:</strong><span> ${data.weather[2].avgtempF}°F</span></div>
                    <br>
                    <div><strong>Max Temp:</strong><span> ${data.weather[2].maxtempF}°F</span></div>
                    <br>
                    <div><strong>Min Temp:</strong><span> ${data.weather[2].mintempF}°F</span></div>
                    <br>
                 </div>`;

        let anchor = document.createElement("a");
        anchor.setAttribute("href", "#");
        let li = document.createElement("li");
        let span = document.createElement("span");
        span.innerHTML = ` - ${data.current_condition[0].FeelsLikeF}°F`;
        // li.textContent =  ` - ${data.current_condition[0].FeelsLikeF}°F`
        anchor.textContent = chooseLocation;
        li.append(anchor, span);
        let ul = document.querySelector("#history-items");
        ul.append(li);

        let previousSearches = document.querySelector("#history-placeholder");
        if (previousSearches) {
          previousSearches.remove();
        }

        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          console.log(e.target.textContent);
          updateWeather(e.target.textContent);
        });
      });
  }
});

function updateWeather(city) {
  fetch(`https://wttr.in/${city}?format=j1`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let forecast = document.querySelector("#forecast");
      forecast.innerHTML = `
              <div id ="current-location" class="display"> </div>
              <h2>${data.nearest_area[0].areaName[0].value}</h2>
              <div><strong>${data.current_condition[0].localObsDateTime}<strong><div>
              <br>
              <div><strong>Area: </strong><span id="area">${data.nearest_area[0].areaName[0].value}</span></div>
              <br>
              <div><strong>Region: </strong><span id="region"> ${data.nearest_area[0].region[0].value}</span></div>
              <br>
              <div><strong>Country: </strong><span id="country">${data.nearest_area[0].country[0].value}</span></div>
              <br>
              <div><strong>Currently: </strong><span id="current">Feels like ${data.current_condition[0].FeelsLikeF}°F</span></div>
              <br>`;

      let threeDay = document.querySelector("#threeDay");

      threeDay.innerHTML = `
              <div id = "today">
                  <h3>Today</h3>
                  <div><strong>Average Temp: </strong><span>${data.weather[0].avgtempF} °F</span></div>
                  <br>
                  <div><strong>Max Temp: </strong><span> ${data.weather[0].maxtempF} °F</span></div>
                  <br>
                  <div><strong>Min Temp: </strong><span> ${data.weather[0].mintempF} °F</span></div>
              <br>      
              </div>
              <div id ="tomorrow">
                  <h3>Tomorrow</h3>
                  <div><strong>Average Temp:</strong><span> ${data.weather[1].avgtempF}°F</span></div>
                  <br>
                  <div><strong>Max Temp:</strong><span> ${data.weather[1].maxtempF}°F</span></div>
                  <br>
                  <div><strong>Min Temp:</strong><span> ${data.weather[1].mintempF}°F</span></div>
                  <br>          
               </div>
               <div id="day-after">
                  <h3>Day After Tomorrow</h3>
                  <div><strong>Average Temp:</strong><span> ${data.weather[2].avgtempF}°F</span></div>
                  <br>
                  <div><strong>Max Temp:</strong><span> ${data.weather[2].maxtempF}°F</span></div>
                  <br>
                  <div><strong>Min Temp:</strong><span> ${data.weather[2].mintempF}°F</span></div>
                  <br>
               </div>`;
    })
    .catch((err) => {
      throw err;
    });
}

// // First things first - Create a var for form!

// const form = document.querySelector("form");

// // Compartmentalizing "This logic fetches location data..."
// let getWeather = () => {
//   let query = form.city.value;

//   return fetch(`https://wttr.in/${query}?format=j1`)
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       let inputCity = (data.nearest = area[0].areaName[0].value);
//       let region = (data.nearest = area[0].region[0].value);
//       let country = (data.nearest = area[0].country[0].value);
//       let feelsLike = (data.current = condition[0].feelsLikeF);

//       // Forecast

//       let avgTemp = data.weather[0].avgtempF;
//       let maxTemp = data.weather[0].maxtempF;
//       let minTemp = data.weather[0].mintempF;

//       // Tomorrow's Forecast

//       let avgTempTom = data.weather[1].avgtempF;
//       let maxTempTom = data.weather[1].maxtempF;
//       let minTempTom = data.weather[1].mintempF;

//       // Day After (DA) Forecast

//       let avgTempDA = data.weather[2].avgtempF;
//       let maxTempDA = data.weather[2].maxtempF;
//       let minTempDA = data.weather[2].mintempF;

//       let display = document.querySelector(".display");
//     });
// };

// // Add Event Listener to form's "submit"
// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   getWeather().then((data) => {
//     console.log(data);
//   });
// });

// function prevSearches(city, temp) {
//   let ul = document.querySelector(".history ul");
//   let li = document.createElement("li");
//   let a = document.createElement("a");
// }
