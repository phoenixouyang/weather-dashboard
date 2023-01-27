var APIKey = '414f5aad5297b46db7645b948ad4cafc';
var inputBox = document.getElementById("city-input");
var searchBtn = document.getElementById("search-btn");
var todayCity = document.getElementById("today-city");
var todayTemp = document.getElementById("today-temp");
var todayWind = document.getElementById("today-wind");
var todayHumidity = document.getElementById("today-humidity");

function getApi() {
    city = inputBox.value
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + APIKey;

    fetch(requestUrl)
        .then (function (response) {
            return response.json();
        })
        .then (function (data){
            var coordLat = data.coord.lat;
            var coordLon = data.coord.lon;
            
            var requestURLDays = "https://api.openweathermap.org/data/2.5/forecast?lat=" + coordLat + "&lon=" + coordLon +"&units=metric&appid=" + APIKey;
            
            fetch(requestURLDays)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data)
                        todayCity.textContent = data.city.name + " (" + data.list[0].dt_txt + ")";
                        todayTemp.textContent = "Temperature: " + data.list[0].main.temp + " C"

                    })
            // todayCity.textContent = data.name;
            // todayTemp.textContent = "Temperature: " + data.main.temp + " C";
            // todayWind.textContent = "Wind: " + data.wind.speed + "mph";
            // todayHumidity.textContent = "Humidity: " + data.main.humidity + "%";
        })
};

searchBtn.addEventListener("click", getApi)