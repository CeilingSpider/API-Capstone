'use strict';

$(document).ready(function () {
    
    // Get Location *
    

    const success = function(pos) {
        const lat = pos.coords.latitude;
        const long = pos.coords.longitude;
        weather(lat, long);
    }

			function error() {
					console.log('There was an error');
			}
    navigator.geolocation.getCurrentPosition(success, error);


        // Call Weather
    function weather(lat, long) {
        const URL = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`;

        $.getJSON(URL, function(data) {
            
            updateDOM(data);
        });
    }

    // Temp responses that will appear below the desc

    function buildMessageforUser(maxTemp) {

        if (maxTemp < 0) return "Bundle up!";
        
        if (maxTemp < 9) return "Don't forget a jacket!";
        
        if (maxTemp < 19) return "You might not need that jacket today!";

        if (maxTemp < 29) return "Stay hydrated!";

        return "Maybe just stay inside today...";
        

    }


    // Update Dom
    function updateDOM(data) {
        let city = data.name;
        let temp = Math.round(data.main.temp_max);
        let desc = data.weather[0].description;
        let icon = data.weather[0].icon;

        $('#city').html(city);
        $('#temp').html(temp);
        $('#desc').html(desc);
        const message = buildMessageforUser();
        $(`#response`).text(message);
        $('#icon').attr('src', icon);
    }


});