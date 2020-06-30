
function WeatherDashboard() {

    $(document).ready(function () {

        $(".submitBtn").on("click", function(event){
            
            event.preventDefault();
            console.log("Got the click");
            var value = $(this).siblings("input").val().trim();
            console.log(value);
            displayDetails(value)
          
        });
});
}

function displayDetails(value){
var searchHistory;
var div;
if(localStorage.getItem("searchHistory")){
    searchHistory =  JSON.parse(localStorage.getItem("searchHistory"));
   
}else{
    searchHistory = [];
}
  if((value!=null ) && (value!="" )){   
    searchHistory.push(value);
  
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    
}

var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));

div = $("<div>").text(searchHistory);

 $(".searchHistoryCity").append(div);
}

WeatherDashboard();
displayDetails();