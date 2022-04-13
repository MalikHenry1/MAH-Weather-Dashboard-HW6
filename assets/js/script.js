var APIKey = '39c716ddd65d2671121d6392dabc3168';



function getInfo() {
   
    var cityName = document.getElementById('cityName');
    var previousSearches = JSON.parse(localStorage.getItem("previous-searches")) || [];
    cityName.textContent = 'Cities Searched: ';
    for(var i=0; i<previousSearches.length; i++){
        console.log(previousSearches[i]);
        var searchBtn = document.createElement('button');
        searchBtn.textContent = previousSearches[i];
        cityName.append(searchBtn);

    }
}

function saveInfo() {
    var newName = document.getElementById('cityWanted').value;
    var previousSearches = JSON.parse(localStorage.getItem("previous-searches")) || [];
    previousSearches.push(newName);
    localStorage.setItem('previous-searches', JSON.stringify(previousSearches));

}


function getWeather () {
    var newName = document.getElementById('cityWanted').value;
    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+newName+"&appid=" + APIKey)
.then(response => response.json())
.then(data => {
  
    for (var i = 0; i < data.list.length; i++) {
        var day = data.list[i];
        if (day.dt_txt.endsWith("12:00:00")) {
            document.getElementById('forecastContainer').append(day.dt_txt);
         }
      }
    
})

}



var today = new Date();
var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday'];

function checkDay(day){
    if(day +today.getDay()>6){
        return day + today.getDay()-7;
    }
    else {
        return day + today.getDay();
    }
}



document.getElementById('searchCity').addEventListener('click', function() {
    saveInfo();
    getInfo();
    getWeather();
})

getInfo();