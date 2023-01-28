var APIKey = '414f5aad5297b46db7645b948ad4cafc';
var inputBox = document.getElementById("city-input");
var searchBtn = document.getElementById("search-btn");
var todayCity = document.getElementById("today-city");
var todayIcon = document.getElementById("today-icon")
var todayTemp = document.getElementById("today-temp");
var todayWind = document.getElementById("today-wind");
var todayHumidity = document.getElementById("today-humidity");
var fiveDayContainer = document.getElementById("five-day-display");

function getApi() {
    todayIcon.className = '';
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
                        var currentDate = (data.list[4].dt_txt).substring(0,10);
                        var currentTemp = data.list[4].main.temp;
                        var currentWind = data.list[4].wind.speed;
                        var currentHumidity = data.list[4].main.humidity;
                        var currentIcon = data.list[4].weather[0].icon;

                        todayCity.textContent = currentCity + " (" + currentDate + ")";
                        todayTemp.textContent = "Temperature: " + currentTemp + "°C";
                        todayWind.textContent = "Wind: " + currentWind + "mph";
                        todayHumidity.textContent = "Humidity: " + currentHumidity + "%";
                        todayIcon.setAttribute("src","http://openweathermap.org/img/wn/" + currentIcon + "@2x.png");

                        for (var i=12; i < data.list.length; i += 8) {
                            var j = (i-12)/8;
                            var loopDate = (data.list[i].dt_txt).substring(0,10);
                            var loopTemp = data.list[i].main.temp;
                            var loopWind = data.list[i].wind.speed;
                            var loopHumidity = data.list[i].main.humidity;
                            var loopIcon = data.list[i].weather[0].icon;

                            fiveDayContainer.children[j].children[0].textContent = loopDate;
                            fiveDayContainer.children[j].children[1].textContent = "Temp: " + loopTemp + "°C";
                            fiveDayContainer.children[j].children[2].textContent = "Wind: " + loopWind + "mph";
                            fiveDayContainer.children[j].children[3].textContent = "Humidity: " + loopHumidity + "%"
                        }
                    })
        })
};

searchBtn.addEventListener("click", getApi)