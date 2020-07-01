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

    let getDate = function(days){
        var currentDay = moment().format(); 
        return (moment(currentDay).add(days, 'days').format('MM/DD/YYYY')); 
        
    }
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
        var lat;
        var dateISO;
        var wf = "";
        var APIKey="5a9ba99aa270a73fe708b6e2422c838d";
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +"q=" +value +"&appid=" + APIKey +"&units=5";
       
         $.ajax({
          url: queryURL,
          method: "GET",
          
        }).then(function(response) {    

          console.log(JSON.stringify(response));  
          icon = response.weather[0].icon;
          long = response.coord.lon;
          lat = response.coord.lat;
          city = response.name;
          var iconimg = "http://openweathermap.org/img/w/" + icon + ".png";
          cityDetails.append($(".city").text(city).append(getDate(0)).append($("#icon").attr("src",iconimg)));
          temperature.text("Temperature : " +Math.round((response.main.temp - 273.15) * 1.80 + 32)+ "°F");
          humidity.text("Humidity : " +response.main.humidity + "%");
          windSpeed.text("Wind Speed : " +response.wind.speed );

        
            // console.log('Received data:', response) // For testing
            // var wf = "";
            // // moment().add(1, 'days').calendar();       // Tomorrow at 2:12 PM
            // // moment().add(3, 'days').calendar();    
            // $.each(response, function(index, val) {
            //   wf += "<p>" // Opening paragraph tag
            //   wf += moment().add(index, 'days').calendar();     
            //   wf += "<br/><br/>";
            //   wf += "<img src='https://openweathermap.org/img/w/" + val.weather[index].icon + ".png'>" // Icon
            //   wf += "<br/><br/>";
            //   wf += "Temperature :" + Math.round((val.main.temp - 273.15) * 1.80 + 32) + "°F" // Temperature
            //   wf += "<br/><br/>";
            //   wf += "Humidity : " +val.main.humidity;
            //   wf += "</p>" // Closing paragraph tag
            //   console.log("index" +index);
            //   console.log("Main Temp: " +val.main.temp);
            //   console.log("Weather Description" +val.weather[0].description);
            // });
            // console.log(wf);
            // $("FivedayForecast").html(wf);
             
 
            var queryURL1 = "https://api.openweathermap.org/data/2.5/uvi?&appid=" + APIKey+ "&lat="+lat+ "&lon=" +long;

            $.ajax({
                url: queryURL1,
                method: "GET"
            }).then(function(response1) {  
                console.log(JSON.stringify(response1));
                uvIndexVal = response1.value;
                uvIndex.text("UV Index : " +uvIndexVal);
              
            });

         weatherDetails.append(cityDetails);
         weatherDetails.append(temperature);
         weatherDetails.append(humidity);
         weatherDetails.append(windSpeed);
         weatherDetails.append(uvIndex);
  
        });
    }


WeatherDashboard();
displayDetails(value);



