var value = "";
var weatherDetails = $(".weather-details");
var cityDetails = $(".cityDetails");
var temperature = $(".temperature");
var humidity = $(".humidity");
var windSpeed = $(".wind-speed");
var uvIndex = $(".uvIndex");
var APIKey = "5a9ba99aa270a73fe708b6e2422c838d";

function WeatherDashboard() {

  $(document).ready(function () {

    // By entering city and submit,calls display Weather details and saves to local storage
    $("#submitBtn").on("click", function (event) {

      event.preventDefault();
      value = $(this).siblings("input").val().trim();
      displayWeatherDetails(value);
      saveToLocalStorage(value);
    });
  });
}

// If entered city not null and also if entered city is Valid, saves to local storage
function saveToLocalStorage(value) {
  var searchHistory;

  if (localStorage.getItem("searchHistory")) {
    searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (searchHistory.length > 6) {
      localStorage.removeItem('searchHistory');
    }
  } else {
    searchHistory = [];
  }
  if ((value != null) && (value != "")) {
    //  This AJAX Call to check whether entered city is valid or not
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?&q=" + value + "&appid=" + APIKey;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      
      if (response.cod == "200") {
        searchHistory.push(value);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      }
    });
  }
}

// On clicking the cities available,calls the displayWeatherDetails and saveToLocalStorage functions
$("#sampleSearch button").on("click", function (event) {
  event.preventDefault();
  value = $(this).html().toString();
  $('input').val('');
  displayWeatherDetails(value);
  saveToLocalStorage(value);
});

let getDate = function (days) {
  var currentDay = moment().format();
  return (moment(currentDay).add(days, 'days').format('MM/DD/YYYY'));
}

// This function used to display weather data to the user
function displayWeatherDetails(value) {
  $("#errorDisplay").empty();

  var icon;
  var lat;
  var long;

  var queryURL = "http://api.openweathermap.org/data/2.5/forecast?" + "&q=" + value + "&appid=" + APIKey + "&units=metric";

  $.ajax({
    url: queryURL,
    method: "GET",
    success: function (response) {

      icon = response.list[0].weather[0].icon;
      long = response.city.coord.lon;
      lat = response.city.coord.lat;

      var iconimg = "http://openweathermap.org/img/w/" + icon + ".png";
      cityDetails.append($(".city").text(response.city.name).append(getDate(0)));
      cityDetails.append($("#icon").attr("src", iconimg));
      temperature.text("Temperature : " + response.list[0].main.temp + "°C");
      humidity.text("Humidity : " + response.list[0].main.humidity + "%");
      windSpeed.text("Wind Speed : " + Math.round(response.list[0].wind.speed * 2.236936) + "MPH");

      var queryURL1 = "http://api.openweathermap.org/data/2.5/uvi?&appid=" + APIKey + "&lat=" + lat + "&lon=" + long;

      $.ajax({
        url: queryURL1,
        method: "GET",
        success: function (response1) {

          var uvIndexValue;
          var respUVIndex = response1.value;
          uvIndex.text("UV Index : ");
          if (respUVIndex < 5) {
            uvIndexValue = $("<span>").attr("style", "background-color: yellow").text(response1.value);
          } else if ((respUVIndex < 8) && (respUVIndex > 5)) {
            uvIndexValue = $("<span>").attr("style", "background-color: orange").text(response1.value);
          } else if (respUVIndex > 8) {
            uvIndexValue = $("<span>").attr("style", "background-color: red").text(response1.value);

          }
          uvIndex.append(uvIndexValue);
        }
      });

      weatherDetails.append(cityDetails);
      weatherDetails.append(temperature);
      weatherDetails.append(humidity);
      weatherDetails.append(windSpeed);
      weatherDetails.append(uvIndex);
      $(".FivedayForecast").empty();

      // Referred this 5 day forecast functionality from 
      // https://github.com/ninjagirl2018/WeatherDashboard/blob/master/js/script.js
      for (var i = 1; i <= 5; i++) {

        var forecast5day = function (i) {
          return ('<div>' +
            '<p class="date">' + getDate(i) + '</p>' +
            `<img src="http://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png" alt=${response.list[i].weather[0].description} width='50' height='50'>` +
            `<p class="temperature">Temperature: ${response.list[i].main.temp}&nbsp;°C</p>` +
            `<p class="humidity">Humidity: ${response.list[i].main.humidity}&nbsp;%"</p>` +
            '</div>');
        }

        $(".FivedayForecast").append(forecast5day(i));
      }
    }, error: function () {
      if ($("#search input").val() === "") {
        $("#errorDisplay").attr("style", "background-color: red; width:250px;").html("Please enter/select a city");

      } else {
        $("#errorDisplay").attr("style", "background-color: red; width:250px;").html("No data available for that city. Sorry!!");

      }
    }
  });
}

WeatherDashboard();
var historyCities = JSON.parse(localStorage.getItem("searchHistory"));
var cityName = "South Jordan";
// If local storage don't have any cities, then pass the cityName as "South Jordan"
if (historyCities != null) {
  var lastCityName = historyCities[historyCities.length - 1];
  displayWeatherDetails(lastCityName);
} else {

  displayWeatherDetails(cityName);
  saveToLocalStorage(cityName);
}


