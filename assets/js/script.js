var apiKey = "bb14c36c10f7318f3cc5c8264cc57b9b";

// global variables

var searchButton = $("#search-button");
var searchCity = $("#user-input");
var temp = $("#temperature");
var currentCity = $("#current-city");
var currentHumidity = $("#humidity");
var currentWind = $("#wind-speed");

var city = " ";

var citySearch = [];


// function to handle city search form submit
let displayWeather = function(event) {
    event.preventDefault();
    if (searchCity.val().trim() !== "") {
        city = searchCity.val().trim();
        currentWeather(city);
    }
}

// load cities from local storage and create history buttons

let loadSearchHistory = function() {
    $("ul").empty();
    var citySearch = JSON.parse(localStorage.getItem("cityname"));
    if (citySearch !== null) {
        citySearch = JSON.parse(localStorage.getItem("cityname"));
        for (i = 0; i < citySearch.length; i++) {
            addList(citySearch[i]);
        }
        city = citySearch[i - 1];
        currentWeather(city);

        
    }
}

// Current forecast
let currentWeather = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey + "&units=imperial";
    $.ajax({
        url: apiUrl,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        var weathericon = response.weather[0].icon;
        var iconurl = "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
        var date = new Date(response.dt * 1000).toLocaleDateString();
        $(currentCity).html(response.name + " " + "(" + date + ")" + "<img src=" + iconurl + ">");
        var tempmain = response.main.temp;

        $(temp).html(" " + (tempmain).toFixed(2) + " &#8457");
        $(currentHumidity).html(" " + response.main.humidity +  "%");
        var ws = response.wind.speed;
        $(currentWind).html(" " + ws +" " +  "MPH");

        forecast(response.id);
        if (response.cod == 200) {
            citySearch = JSON.parse(localStorage.getItem("cityname"));
            console.log(citySearch);

            if (citySearch == null) {
                citySearch = [];
                citySearch.push(city.toUpperCase()                );
                localStorage.setItem("cityname", JSON.stringify(citySearch));
                addList(city);
            }
            else {

                if (find(city) > 0) {
                    // citySearch.push(city.toUpperCase());
                    localStorage.setItem("cityname", JSON.stringify(citySearch));
                    addList(city);
                }
            }
        }
    });
}

// Five Day forecast
let forecast = function(cityid) {
    var fiveUrl = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityid + "&appid=" + apiKey + "&units=imperial";
    $.ajax({
        url: fiveUrl,
        method: "GET"
    }).then(function (response) {
        for (i = 0; i < 6; i++) {
            var date = new Date((response.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
            var iconcode = response.list[((i + 1) * 8) - 1].weather[0].icon;
            var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
            var tempforecast = response.list[((i + 1) * 8) - 1].main.temp;

            var humidity = response.list[((i + 1) * 8) - 1].main.humidity;
            var wndspd = response.list[((i + 1) * 8) - 1].wind.speed;
            

            $("#Date" + i).html(date);
            $("#Img" + i).html("<img src=" + iconurl + ">");
            $("#Temp" + i).html(" " + tempforecast + " &#8457");
            $("#Humidity" + i).html(" " + humidity + "%");
            $("#Wind" + i).html(" " + wndspd + " MPH");
            
        }
    });
}

let addList = function(c) {
    var listEl = $("<li>" + c.toUpperCase() + "</li>");
    $(listEl).attr("class", "list-group-item");
    $(listEl).attr("data-value", c.toUpperCase());
    $(".list-group").append(listEl);
}

let pastSearch = function(event) {
    var liEl = event.target;
    if (event.target.matches("li")) {
        city = liEl.textContent.trim();
        currentWeather(city);
    }
}


$("#search-button").on("click", displayWeather);
$(document).on("click", pastSearch);
$(window).on("load", loadSearchHistory);
