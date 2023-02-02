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

function displayWeather(weatherData) {
    // add code to include weather data on the page
    event.preventDefault();
    if (searchCity.val().trim() !== "") {
        city = serchCity.val().trim();
        currentWeather(city);
    }
}

function searchHistoryButtonClick(event) {
    const cityName = event.target.value;
    const searchData = searchHistory[cityName];
    displayWeather({ city: cityName, data: searchData });
}

async function searchButtonClick() {
    cityName = $('input').val();
    // grab city from form
    // Make API request to get lat/long from cityName
    // https://openweathermap.org/forecast5#name5
    // make API request to get 5 day lat long
    // https://openweathermap.org/forecast5
    weatherData = await fetch( );

    // save data to local storage
    searchHistory[cityName] = weatherData;
    storeSearchHistory(searchHistory);
    // display new city in search history

    displayWeather({ city: cityName, data: weatherData });
}

searchHistory = loadSearchHistory();
Object.keys(searchHistory).forEach((cityName) => {
    const searchData = searchHistory[cityName];
    // add code for button for this city
    $(historyButton).click(searchHistoryButtonClick);
});

// activate click event handler from button
$('search-btn').click(searchHistoryButton)