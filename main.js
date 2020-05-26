'use strict';

/*send GET request

const searchURL = 'https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid=7eb7224da37b5fb683efc4179f25c979';

function getWeatherData (zipCode, callback) {
    const query = {
        q: `zipCode`,
        api_key: '7eb7224da37b5fb683efc4179f25c979',

    $.getJSON(zipCode, query, callback);

    }
}*/

$(document).ready(function () {
    
    // Get Location 
    navigator.geolocation.getCurrentPosition(success, error);

    function success(pos) {
        const lat = pos.coords.latitude;
        const long = pos.coords.longitude;
        weather(lat, long);
    }

			function error() {
					console.log('There was an error');
			}

    // Call Weather
    function weather(lat, long) {
        const URL = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`;

        $.getJSON(URL, function(data) {
            updateDOM(data);
        });
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
        $('#icon').attr('src', icon);
    }
});