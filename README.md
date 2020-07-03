## 06 Server-Side APIs: Weather Dashboard

This assignment focuses on using Server side API for displaying Weather Dashboard. Third-party APIs gives the flexibilty to access their data and functionality by making requests. Building a weather dashboard with dynamically updated HTML and CSS. This application is made responsive using media queries. 

Server-side API used: [OpenWeather API](https://openweathermap.org/api) 

## Application

* When the user searches for a city, it should present with current and future weather conditions of that place so that they can plan their trip accordingly.
* The user can see various details like city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index.
* The color for uvIndex that indicates whether the conditions are favorable, moderate, or severe.
* The user should also see the 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity.
* When user clicks on cities, they should see the weather forecast.
* When the weather dashboard is clicked, the user sees the last searched city forecast.

## Implementation

* The files are index.html, script.js, style.css.
* Mostly, the code is written in script.js as this is a dynamically updated webpage.
* Moment.js library is used for getting the current date and well as adding upcoming dates.
* When the user enters the URL, the user sees the last searched city forecast. If there is no data on localStorage then predefined city value is shown.
* When user enters a city name/ clicks the available cities they will be presented with data.
* When the user clicks search button without entering text, then "Please enter/select a city" is shown.
* When the user enters a wrong city name by mistake, then "No data available for that city" meassge is shown. The entered text won't be saved in search history on local storage.

#### Screenshots

<p style ="text-align:center;">
<img src="Assets/CodeQuizHomePage.jpg" width="300" alt= "HomePage" height="350"/>
<img src="Assets/CodeQuizQuesAns.jpg"  width="300" alt="Ques and Ans page" height="350"/>
<img src="Assets/CodeQuizResultsPage.jpg" width="300" alt="Show Results Page" height="350"/>
<img src="Assets/CodeQuizDisplayHighscores.jpg"  width="300" alt="Display Highscores Page" height="350"/>
<img src="Assets/CodeQuizAlertDisplay.jpg"  width="300" alt="Alert Display Page" height="350"/>
</p>

Here's the link to my developed Website : [Web API-CodeQuiz](https://yakinia.github.io/04-WebAPIs-CodeQuiz)

##### References

StackOverflow-Timer : [Timer](https://stackoverflow.com/questions/58964755/subtract-time-from-timer-if-answer-is-wrong-creating-a-quiz-javascript)<br/>
StackOverflow-DynamicElements: [DynamicElements](https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript)<br/>