var APIKey = '414f5aad5297b46db7645b948ad4cafc';
var inputBox = document.getElementById("city-input");
var searchBtn = document.getElementById("search-btn");
var todayCity = document.getElementById("today-city");
var todayIcon = document.getElementById("today-icon")
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
                        var currentCity = data.city.name;
                        var currentDate = (data.list[0].dt_txt).substring(0,10);
                        var currentTemp = data.list[0].main.temp;
                        var currentWind = data.list[0].wind.speed;
                        var currentHumidity = data.list[0].main.humidity;

                        todayCity.textContent = currentCity + " (" + currentDate + ")";
                        todayTemp.textContent = "Temperature: " + currentTemp + "°C";
                        todayWind.textContent = "Wind: " + currentWind + "mph";
                        todayHumidity.textContent = "Humidity: " + currentHumidity + "%";
                        todayIcon.setAttribute("class", "fa-solid fa-cloud");


                    })
        })
};

searchBtn.addEventListener("click", getApi)