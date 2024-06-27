const myAPIKey = `fe929c8b878144e880e225611231508`
const BaseURL = `http://api.weatherapi.com/v1/forecast.json`
let searchLocation = document.querySelector("#findLocation")

searchLocation.addEventListener("change", function () {
  getWeather(searchLocation.value)
})

searchLocation.addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    getWeather(searchLocation.value)
  }
})



async function getWeather(country) {
  try {
    document.querySelector(".weatherCards").innerHTML = `<div class="lds-dual-ring"></div>`
    let response = await fetch(`${BaseURL}?key=${myAPIKey}&q=${country}&days=7`)
    let finalResponse = await response.json()
    displayWeatherData(finalResponse)
    console.log(finalResponse);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter a valid location or check your internet",
    });
    searchLocation.value = ""
    document.querySelector(".weatherCards").innerHTML = ""
  }
}

function displayWeatherData(data) {
  let dataArray = data.forecast.forecastday
  document.querySelector("#location").innerHTML = data.location.country
  document.querySelector(".todayDate").innerHTML = dataArray[0].date
  document.querySelector(".today-weather").innerHTML = `
            <h1 class="cityName fw-bolder fs-3">${data.location.name}</h1>
            <h2 class="fw-bolder display-4 " id="weatherTemp">${data.current.temp_c}° C<img src="https:${data.current.condition.icon}" width="130px" class="d-inline" alt=""></h2>

            

            <span class="fw-bolder fs-6 pb-3" id="weatherTemp">RealFeel ${data.current.feelslike_c}°</span>
            <p id="weatherCondition" class="fw-semibold fs-5">${data.current.condition.text}</p>
            <div class="d-flex align-items-center gap-3">
                <p>
                    <img src="./images/wind.png" width="30px" alt="">
                    <span id="windSpeed" class="ms-2 fw-semibold">${data.current.wind_dir} ${data.current.wind_kph} Km/h</span>
                </p>
                <p>
                    <img src="./images/humidity.png" width="30px" alt="">
                    <span id="humidity" class="fw-semibold">${data.current.humidity}%</span>
                </p>
`
  let weatherBox = ``
  for (i = 0; i < dataArray.length; i++) {
    const date = new Date(dataArray[i].date)
    const weekDay = date.toLocaleDateString("us-uk", { weekday: "long" })
    weatherBox += `
                <div class="today flex-grow-1 m-2">
                    <div class="innerCard bg-success-subtle rounded-3 py-2 px-4">
                        <p class="weekDay text-center fw-bolder text-black fs-4">${weekDay}</p>
                        <p class="text-center fw-semibold text-dark-emphasis m-0 p-0">${dataArray[i].day.condition.text}</p>
                        <img src="https:${dataArray[i].day.condition.icon}" width="90px" class="m-auto d-block" alt="">
                        <div class="d-flex justify-content-between pt-3">
                            <div class="text-start">
                                <p id="maxTemp" class="temp-type fs-2 m-1">${dataArray[i].day.maxtemp_c}°<span class="opacity-50 fs-6"> Hi</span></p>
                                <p id="minTemp" class="temp-type fs-2 m-1">${dataArray[i].day.mintemp_c}°<span class="opacity-50 fs-6"> Lo</span></p>
                            

                            </div>

                            <div class="ps-5 justify-content-center align-content-center">
                                <p id="avgTemp" class="temp-type fw-bold m-1">Avg Temp:  <span class="fw-light">${dataArray[i].day.avgtemp_c}°</span></p>
                    <p class="today-weather d-flex justify-content-center align-items-center flex-column w-100 m-auto"></p>

                                <p id="avgTemp" class="temp-type fw-bold m-1">Wind: <span class="fw-light">${dataArray[i].day.maxwind_kph}km/h</span></p>
                    <p class="today-weather d-flex justify-content-center align-items-center flex-column w-100 m-auto"></p>
                                
                                <p id="avgTemp" class="temp-type fw-bold m-1">Probability of rain: <span class="fw-light">${dataArray[i].day.daily_chance_of_rain}%</span></p>
                    <p class="today-weather d-flex justify-content-center align-items-center flex-column w-100 m-auto"></p>

                                <p id="avgTemp" class="temp-type fw-bold m-1">Precipitation: <span class="fw-light">${dataArray[i].day.totalprecip_mm}mm</span></p>
                            </div>


                              <div class="text-center m-0 p-0">
                            </div>
                        
                        </div>
                    </div>
                </div>
`
  }
  document.querySelector(".weatherCards").innerHTML = weatherBox;
}


function myCurrentLocation(position) {
  console.log(position);
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude
  let myCurrentPosition = `${latitude},${longitude}`
  getWeather(myCurrentPosition)
}

navigator.geolocation.getCurrentPosition(myCurrentLocation)