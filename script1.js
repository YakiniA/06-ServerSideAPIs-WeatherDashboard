var value = "";
var weatherDetails = $(".weather-details");
var cityDetails = $(".cityDetails");
var temperature = $(".temperature");
var humidity = $(".humidity");
var windSpeed = $(".wind-speed");
var uvIndex = $(".uvIndex");

function WeatherDashboard() {

    $(document).ready(function () {

        $("#submitBtn").on("click", function(event){
            
            event.preventDefault();
            console.log("Got the click");
            value = $(this).siblings("input").val().trim();
            console.log(value);
            displayDetails(value);
            displayWeatherDetails(value);
        });
    });
}

function displayDetails(value){
        var searchHistory;
        var div;
        if(localStorage.getItem("searchHistory")){
            searchHistory =  JSON.parse(localStorage.getItem("searchHistory"));
            if(searchHistory.length>12){
                localStorage.removeItem('searchHistory');
            }
        }else{
            searchHistory = [];
        }
        if((value!=null ) && (value!="" )){  
          
            searchHistory.push(value);
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
            
        }
}

    //     var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    //     if(searchHistory!=null){
    //         for(var values= 0; values<searchHistory.length; values++){
             
    //             if(searchHistory[values]!= searchHistory[values+1]){
    //             var pCityName = $("<p style='margin:16px 0; font-size:18px;'>");
    //             pCityName.text(searchHistory[values]);
    //             $(".searchHistoryCity").append(pCityName);
    //             }
    //         }
    // }

    $("#sampleSearch button").on( "click", function(event) {
        event.preventDefault();
        value =$(this).html().toString();
        console.log("Value" +value);
        displayDetails(value);
        displayWeatherDetails(value);
    });

    function displayWeatherDetails(value){
        // "https://api.openweathermap.org/data/2.5/weather?" +
        // "q=Bujumbura,Burundi&appid=" + APIKey  5a9ba99aa270a73fe708b6e2422c838d;
        var tempF;
        var humidityVal;
        var speed;
        var icon;
        var lat;
        var long;
        var date;
        var uvIndexVal;
        var city;
        var wf = "";
        var APIKey="5a9ba99aa270a73fe708b6e2422c838d";
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +"q=" +value +"&appid=" + APIKey +"&units=5";
       
         $.ajax({
          url: queryURL,
          method: "GET",
          
        }).then(function(response) {    

          console.log(JSON.stringify(response));  
          tempF = Math.round((response.main.temp - 273.15) * 1.80 + 32);
          humidityVal = response.main.humidity;
          speed = response.wind.speed;
          icon = response.weather[0].icon;
          long = response.coord.lon;
          lat = response.coord.lat;
          city = response.name;
 
            var queryURL1 = "https://api.openweathermap.org/data/2.5/uvi?&appid=" + APIKey+ "&lat="+lat+ "&lon=" +long;

            $.ajax({
                url: queryURL1,
                method: "GET"
            }).then(function(response1) {  
                console.log(JSON.stringify(response1));
                date = response1.date;
                uvIndexVal = response1.value;
              
            });

        var iconimg = "http://openweathermap.org/img/w/" + icon + ".png";
    
        cityDetails.append($(".city").text(city).append($(".date").text(moment(date).format("MM/DD/YYYY"))).append($("#icon").attr("src",iconimg)));
        
        temperature.text("Temperature : " +tempF+ "°F");
        humidity.text("Humidity : " +humidityVal + "%");
        windSpeed.text("Wind Speed : " +speed );
         uvIndex.text("UV Index : " +uvIndexVal);

         weatherDetails.append(cityDetails);
         weatherDetails.append(temperature);
         weatherDetails.append(humidity);
         weatherDetails.append(windSpeed);
         weatherDetails.append(uvIndex);

     
        });
    }


WeatherDashboard();
displayDetails(value);



