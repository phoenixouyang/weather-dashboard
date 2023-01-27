var APIKey = '414f5aad5297b46db7645b948ad4cafc';
var cityInput = document.getElementById("city-input");
var searchBtn = document.getElementById("search-btn");

function getApi() {
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + "toronto" + "&appid=" + APIKey;

    fetch(requestUrl)
        .then (function (response) {
            console.log(response.json());
        })
};

getApi();