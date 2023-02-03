var apiKey = "bb14c36c10f7318f3cc5c8264cc57b9b";
// var citySerchList = [];


let searchHistory = [];

function localStorage() {
    // return localStorage.getItem('weatherHistory');
    var searchHistoryArray = JSON.parse(localStorage.getItem('Search History'));

    // if nothing in localStorage, create a new object to track all user info
    if (!searchHistoryArray) {
        searchHistoryArray = {
            searchedCity: [],
        };
    } else {
        //add search history buttons to page
        for (var i = 0; i < searchHistoryArray.searchedCity.length; i++) {
            searchHistory(searchHistoryArray.searchedCity[i]);
        }
    }

    return searchHistoryArray;
}

function storeSearchHistory() {
    localStorage.setItem('weather Search History', JSON.stringify(searchHistoryArray));
}


function displayWeather(event) {
    // add code to include weather data on the page
    event.preventDefault();
    if (searchCity.val().trim() !== "") {
        city = serchCity.val().trim();
        currentWeather(city);
    }
}
// grab city from form
    // Make API request to get lat/long from cityName
    // https://openweathermap.org/forecast5#name5
// fetch current weather and forecast
function searchButtonClick(city) {
    var apiCoordinates = "api.openweathermap.org/data/2.5/weather?q=" + city + "&AAPID=" + apiKey;
    $.ajax({ 
        url: apiCoordinates,
        method: "GET"
    }).then (function (response) {
        var weatherIcon = response.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
        var date = new Date(response.dt * 2000).toLocaleDateString();
        $(currentCity).html(response.name + "" + "(" + date + ")" + "<img src=" + iconUrl + ">");


        var wind = response.wind.speed
        var windMph = (wind * 2.3).toFixed(1);

        $(currentWind).html("" + windMph + "" + "MPH");
        

        var temp = (response.main.temp - 273) * 180 + 32;
        $(currentTemp).html("" + (temp).toFixed(2) + "" + "&#8457");

        weatherForecast(response.id);
        if (response.cod == 200) {
            sCity = JSON.parse(localStorage.getItem("cityname"));
            console.log(sCity);
            if (searchHistory == null) {
                searchHistory = [];
                searchHistory.push(city.toUpperCase()
                );
                localStorage.setItem("cityname", JSON.stringify(searchHistory));
                addToList(city);
            }
            else {
                if (find(city) > 0) {
                    searchHistory.push(city.toUpperCase());
                    localStorage.setItem("cityname", JSON.stringify(searchHistory));
                    addToList(city);
                }
            } 
        }   
})
}
    // make API request to get 5 day lat long
    // https://openweathermap.org/forecast5
function weatherForecast(cityId) {
    var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityid + "&appid=" + apiKey;
    $.ajax({
        url: fiveDay,
        method: "GET"
    }).then(function (response){
        for (i = 0; i < 5; i++) {
            var date = new Date((response.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
            var iconcode = response.list[((i + 1) * 8) - 1].weather[0].icon;
            var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
            var tempK = response.list[((i + 1) * 8) - 1].main.temp;
            var tempF = (((tempK - 273.5) * 1.80) + 32).toFixed(2);
            var humidity = response.list[((i + 1) * 8) - 1].main.humidity;

            $("#Date" + i).html(date);
            $("#Img" + i).html("<img src=" + iconurl + ">");
            $("#Temp" + i).html(" " + tempF + " &#8457");
            $("#Humidity" + i).html(" " + humidity + " %");
        }
    });
}

function addToList(c) {
    var listEl = $("<li>" + c.toUpperCase() + "</li>");
    $(listEl).attr("class", "list-group-item");
    $(listEl).attr("data-value", c.toUpperCase());
    $(".list-group").append(listEl);
}

function invokePastSearch(event) {
    var liEl = event.target;
    if (event.target.matches("li")) {
        city = liEl.textContent.trim();
        currentWeather(city);
    }
}

function loadlastCity() {
    $("ul").empty();
    var sCity = JSON.parse(localStorage.getItem("cityname"));
    if (sCity !== null) {
        sCity = JSON.parse(localStorage.getItem("cityname"));
        for (i = 0; i < sCity.length; i++) {
            addToList(sCity[i]);
        }
        city = sCity[i - 1];
        currentWeather(city);
    }
}

$("#search-button").on("click", displayWeather);
$(document).on("click", invokePastSearch);
$(window).on("load", loadlastCity);



    
    
    
    
    
    


//     // save data to local storage
//     searchHistory[cityName] = weatherData;
//     storeSearchHistory(searchHistory);
//     // display new city in search history

//     displayWeather({ city: cityName, data: weatherData });
// }



// function searchHistoryButtonClick(event) {
//     const cityName = event.target.value;
//     const searchData = searchHistory[cityName];
//     displayWeather({ city: cityName, data: searchData });
// }



// searchHistory = loadSearchHistory();
// Object.keys(searchHistory).forEach((cityName) => {
//     const searchData = searchHistory[cityName];
//     // add code for button for this city
//     $(historyButton).click(searchHistoryButtonClick);
// });

// // activate click event handler from button
// $('search-btn').click(searchHistoryButtonClick)