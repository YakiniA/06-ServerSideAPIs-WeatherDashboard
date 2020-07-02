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
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?" +"&q=" +value +"&appid=" + APIKey +"&units=metric";
       
         $.ajax({
          url: queryURL,
          method: "GET",
         success: function(response) {    

          console.log(JSON.stringify(response));  
          console.log(response);
          icon = response.list[0].weather[0].icon;
          long = response.city.coord.lon;
          lat = response.city.coord.lat;
         
          var iconimg = "http://openweathermap.org/img/w/" + icon + ".png";
          cityDetails.append($(".city").text(response.city.name).append(getDate(0)).append($("#icon").attr("src",iconimg)));
          temperature.text("Temperature : " +response.list[0].main.temp+ "°C");
          humidity.text("Humidity : " +response.list[0].main.humidity + "%");
          windSpeed.text("Wind Speed : " +response.list[0].wind.speed );

          var queryURL1 = "https://api.openweathermap.org/data/2.5/uvi?&appid=" + APIKey+ "&lat="+lat+ "&lon=" +long;

          $.ajax({
                url: queryURL1,
                method: "GET",
           success:function(response1) {  
                console.log(JSON.stringify(response1));
                uvIndex.text("UV Index : " +response1.value);
           }
         });

         weatherDetails.append(cityDetails);
         weatherDetails.append(temperature);
         weatherDetails.append(humidity);
         weatherDetails.append(windSpeed);
         weatherDetails.append(uvIndex);

    for(var i=1; i<=39; i++){
    //  if(list[i].dt_txt === getDate(i)){
       var forecast5day = function(i) {
       return  ('<div>' +
        '<p class="date">' + getDate(i) + '</p>' +  
        `<img src="https://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png" alt=${response.list[i].weather[0].description} width='50' height='50'>` +
        `<p class="temperature">Temperature: ${response.list[i].main.temp}&nbsp;°F</p>` +
        `<p class="humidity">Humidity: ${response.list[i].main.humidity}&nbsp;%"</p>` +
        '</div>');

            // return( $("<p>");
            // wf += getDate(i);    
            // wf += $("<br/><br/>");
            // wf += $("<img src='https:openweathermap.org/img/w/" + response.weather[i].icon + ".png'>"); 
            // wf += $("<br/><br/>");
            // wf += $("Temperature :" + Math.round((response.main[i].temp - 273.15) * 1.80 + 32) + "°F"); 
            // wf += $("<br/><br/>");
            // wf += $("Humidity : " +response.main[i].humidity);
            // wf += $("</p>");
          }
        // }
          console.log(wf);
        //  var iconImag =  ${response.list[i].weather[0].icon};
          $(".FivedayForecast").append(forecast5day(i)); 
        }
}
});
}


WeatherDashboard();
displayDetails(value);



