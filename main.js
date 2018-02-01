$(document).ready(function(){
	var celsius = false;
	var apiData;


	function displayTemp(fahrenheit, celsius){
		//string temp
		var textTemp;

		if (celsius) {
			textTemp = Math.round((fahrenheit - 32) * (5/9)) + '&deg; C';
		}else {
			textTemp = Math.round(fahrenheit) + '&deg; F';
		}

		return textTemp;
	}

	function renderHTML(data,C){
		var currentWeather = data.weather[0].description;
		var currentTemp = displayTemp(data.main.temp,C);
		var icon = data.weather[0].icon;

		$('#currentWeather').html(currentWeather);
		$('#currentTemp').html(currentTemp);

		var appIcon = 'http://openweathermap.org/img/w/'+icon+'.png';
		$('#currentWeather').prepend('<img src=' + appIcon + '>');
	}

	function getCord(){
		$.ajax({
			url: 'https://freegeoip.net/json/',
			jsonp: 'jsonp',// The name of the callback parameter, as specified by the YQL service
			timeout:3000,
			success: function(response){
				$('#country').html(response.country_name);
				$('#city').html(response.city);
				$('#latitude').html(response.latitude);
				$('#longitude').html(response.longitude);
				// i want this be synchronous so make more ajax call to openWeatherMap

				$.ajax({
					url: 'http://api.openweathermap.org/data/2.5/weather?lat='+response.latitude+'&lon='+response.longitude+'&units=imperial&appid=c68915ac8895f7be4a4d6c5062c83354',
					success: function(response){
						apiData = response;
						console.log(apiData);
						renderHTML(apiData,celsius);

						$('#toggle').click(function(){
							celsius = !celsius;
							renderHTML(apiData,celsius);
						});
					}
				});
			},        
			error : function (xmlHttpRequest, textStatus, errorThrown) {
	            alert("not ok " + errorThrown);
	             if(textStatus==='timeout')
	              console.log("request timed out");
        	}
		});
	}

	getCord();
	console.log(apiData);
});

