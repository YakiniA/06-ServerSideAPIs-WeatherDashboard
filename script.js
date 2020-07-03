var value = "";
var weatherDetails = $(".weather-details");
var cityDetails = $(".cityDetails");
var temperature = $(".temperature");
var humidity = $(".humidity");
var windSpeed = $(".wind-speed");
var uvIndex = $(".uvIndex");
var APIKey="5a9ba99aa270a73fe708b6e2422c838d";
// var setErrorDisplay = false;

function WeatherDashboard() {
 
    $(document).ready(function () {
    
     
        $("#submitBtn").on("click", function(event){
            
            event.preventDefault();
            console.log("Got the click");
            value = $(this).siblings("input").val().trim();
            console.log(value);
            displayWeatherDetails(value);
            saveToLocalStorage(value);
        });
    });
}

function saveToLocalStorage(value){
        var searchHistory;
        var div;
       
        if(localStorage.getItem("searchHistory")){
            searchHistory =  JSON.parse(localStorage.getItem("searchHistory"));
            if(searchHistory.length>6){
                localStorage.removeItem('searchHistory');
            }
        }else{
            searchHistory = [];
        }
       if((value!=null ) && (value!="" )){  
     
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?&q=" +value +"&appid=" +APIKey;
       
            $.ajax({
             url: queryURL,
             method: "GET",
            }).then (function(response) {    
              console.log(response);
              if(response.cod == "200"){
                searchHistory.push(value);
                localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
              }
            });
        }
}

    $("#sampleSearch button").on( "click", function(event) {
        event.preventDefault();
        value =$(this).html().toString();
        console.log("Value" +value);
        $('input').val('');
        displayWeatherDetails(value);
        saveToLocalStorage(value);
    });

    let getDate = function(days){
        var currentDay = moment().format(); 
        return (moment(currentDay).add(days, 'days').format('MM/DD/YYYY')); 
        
    }
    function displayWeatherDetails(value){
      $("#errorDisplay").empty();
     
        var icon;
        var lat;
        var long;
     
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" +"&q=" +value +"&appid=" + APIKey +"&units=metric";
       
         $.ajax({
          url: queryURL,
          method: "GET",
         success: function(response) {    

          console.log(JSON.stringify(response));  
          console.log(response);
          icon = response.list[0].weather[0].icon;
          long = response.city.coord.lon;
          lat = response.city.coord.lat;
         
          var iconimg = "https://openweathermap.org/img/w/" + icon + ".png";
          cityDetails.append($(".city").text(response.city.name).append(getDate(0)));
          cityDetails.append($("#icon").attr("src",iconimg));
          temperature.text("Temperature : " +response.list[0].main.temp+ "°C");
          humidity.text("Humidity : " +response.list[0].main.humidity + "%");
          windSpeed.text("Wind Speed : " +response.list[0].wind.speed );

          var queryURL1 = "https://api.openweathermap.org/data/2.5/uvi?&appid=" + APIKey+ "&lat="+lat+ "&lon=" +long;

          $.ajax({
                url: queryURL1,
                method: "GET",
           success:function(response1) {  
                console.log(JSON.stringify(response1));
                uvIndex.text("UV Index : ");
                var uvIndexValue = $("<span>").attr("style" , "background-color: red").text(response1.value);
                uvIndex.append(uvIndexValue);
            }
         });

         weatherDetails.append(cityDetails);
         weatherDetails.append(temperature);
         weatherDetails.append(humidity);
         weatherDetails.append(windSpeed);
         weatherDetails.append(uvIndex);
         $(".FivedayForecast").empty();
    for(var i=1; i<=5; i++){
    
       var forecast5day = function(i) {
       return  ('<div>' +
        '<p class="date">' + getDate(i) + '</p>' +  
        `<img src="https://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png" alt=${response.list[i].weather[0].description} width='50' height='50'>` +
        `<p class="temperature">Temperature: ${response.list[i].main.temp}&nbsp;°C</p>` +
        `<p class="humidity">Humidity: ${response.list[i].main.humidity}&nbsp;%"</p>` +
        '</div>');
        }
       
          $(".FivedayForecast").append(forecast5day(i)); 
        }
},error: function () {
    if ($("#search input").val() === ""){
      $("#errorDisplay").attr("style" , "background-color: red; width:250px;").html("Please enter/select a city"); 
     
    }else{
      $("#errorDisplay").attr("style" , "background-color: red; width:250px;").html("No data available for that city. Sorry!!");
     
    }
    
  }
});
}

WeatherDashboard();
var historyCities = JSON.parse(localStorage.getItem("searchHistory"));
var cityName = "South Jordan";
if(historyCities!=null){
var lastCityName = historyCities[historyCities.length-1];
displayWeatherDetails(lastCityName);
}else{

displayWeatherDetails(cityName);
saveToLocalStorage(cityName);
}


