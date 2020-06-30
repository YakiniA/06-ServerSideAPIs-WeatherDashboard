var value = "";
function WeatherDashboard() {

    $(document).ready(function () {

        $(".submitBtn").on("click", function(event){
            
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

        var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
        if(searchHistory!=null){
            for(var values= 0; values<searchHistory.length; values++){
             
                if(value!= searchHistory[values]){
                var pCityName = $("<p style='margin:16px 0; font-size:18px;'>");
                pCityName.text(searchHistory[values]);
                $(".searchHistoryCity").append(pCityName);
                }
            }
    }

    function displayWeatherDetails(value){
        // "https://api.openweathermap.org/data/2.5/weather?" +
        // "q=Bujumbura,Burundi&appid=" + APIKey  5a9ba99aa270a73fe708b6e2422c838d;
        var tempF;
        var humidity;
        var speed;
        var icon;
        var lat;
        var long;
        var APIKey="5a9ba99aa270a73fe708b6e2422c838d";
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +"q=" +value +"&appid=" + APIKey;
       
         $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {    

           
          console.log(JSON.stringify(response));  
          tempF = (response.main.temp - 273.15) * 1.80 + 32;
          humidity = response.main.humidity;
          speed = response.wind.speed;
        //   console.log("Speed" +speed);
          icon = response.weather[0].icon;
          long = response.coord.lon;
          lat = response.coord.lat;
                   
            var queryURL1 = "https://api.openweathermap.org/data/2.5/uvi?&appid=" + APIKey+ "&lat="+lat+ "&lon=" +long;

            $.ajax({
                url: queryURL1,
                method: "GET"
            }).then(function(response) {  
                console.log(JSON.stringify(response));
                var date = response.date_iso;
                var uvIndex = response.value;
        
            });
          
      });

      console.log(speed);
      console.log(humidity);
      console.log(tempF);
      console.log(lat);
      console.log(long);
     
    }

WeatherDashboard();
displayDetails(value);



