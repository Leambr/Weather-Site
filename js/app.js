import APIkey from "./apikey.js"

const dateDisplay = document.querySelector('.today-date');

// Afficher la date du jour
const today = new Date();
// Format de la date
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
console.log(today.toLocaleDateString(undefined, options));

// Afficher la date dans le HTML
dateDisplay.textContent = today.toLocaleDateString(undefined, options);

// API
let APIresults;

const weatherIcon = document.querySelector('#weather-icon');
const weatherIconForecast = document.querySelectorAll('.weather-icon-forecast')
const weather = document.querySelector('.weather-info');
const temperature = document.querySelector('.temperature');
const currentLocation = document.querySelector('.location-api');
const hour = document.querySelectorAll('.hour-name-forecast');
const hourlyTemperature = document.querySelectorAll('.hour-forecast-value');


// Vérifier si le navigateur a la géolocalisation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        // console.log(position);
        // Récupérer la longitude et la latitude de notre position
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        launchAPI(long, lat)
    }, () => {
        // Si on refuse la géolocalisation, c'est ce deuxième argument qui est pris en compte
        alert("L'application ne peut pas fonctionner si vous refuser la géolocalisation.")
    })
}

function launchAPI(long, lat) {
    // On fait une requête à l'API, fetch retourne une promesse
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${APIkey}`)
    // Ensuite nouvelle promesse pour transformer les données récupérées en json
    .then((response) => {
        return response.json();
    })
    // 
    .then((data) => {
        APIresults = data;
        console.log(APIresults);

        weather.innerText = APIresults.current.weather[0].description;
        temperature.innerText = Math.trunc(APIresults.current.temp) + "°";
        currentLocation.innerText = APIresults.timezone;

        // Les heures par tranche de trois avec leurs températures
        let currentHour = new Date().getHours();

        for(let i = 0; i < hour.length; i++) {
            let hourAdded = currentHour -1 + i*3;

            if(hourAdded > 24) {
                hour[i].innerText = (hourAdded - 24) + "h"
            } else if(hourAdded === 24) {
                hour[i].innerText = "00h"
            } else {
                hour[i].innerText = hourAdded + "h"
            }
        }

        // Température par tranche de trois heures
        for(let j = 0; j < hourlyTemperature.length; j++) {
            hourlyTemperature[j].innerText = Math.trunc(APIresults.hourly[j *3].temp) + "°";
            weatherIconForecast[j].src = `icones/animated/${APIresults.hourly[j*3].weather[0].icon}.svg`

        }
        


        // Icone principal dynamique
        weatherIcon.src = `icones/animated/${APIresults.current.weather[0].icon}.svg`

        
            
    })
}
