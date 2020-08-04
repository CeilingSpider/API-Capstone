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

        $.getJSON(URL, updateDOM);
    }

  console.log(weather)
          
    // Temp responses that will appear below the desc

    function buildMessageforUser(maxTemp) {

        if (maxTemp < 32) return "brrrrr";
        
        if (maxTemp < 50) return "not a great day to swim";
        
        if (maxTemp < 72) return "nice weather, eh?";

        if (maxTemp < 85) return "getting a bit warm";

        return "it's hot outside";
        

    }


    // Update Dom
    function updateDOM(data) {
        let city = data.name;
        let temp = Math.round(data.main.temp_max * (9/5) + 32);
        let desc = data.weather[0].description;
        let icon = data.weather[0].icon;

        $('#city').html(city);
        $('#temp').html(temp);
        $('#desc').html(desc);
        const message = buildMessageforUser(temp);
        $(`#response`).text(message);
        $('#icon').attr('src', icon);
    }


});