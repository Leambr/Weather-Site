const dateDisplay = document.querySelector('.today-date');

// Afficher la date du jour
const today = new Date();
// Format de la date
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
console.log(today.toLocaleDateString(undefined, options));

// Afficher la date dans le HTML
dateDisplay.textContent = today.toLocaleDateString(undefined, options);

// API
const APIkey = '4e2e3dab2a81db680154c7f46987a90f';
let APIresults;

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
        console.log(data);
    })
}

// async function launchAPI() {
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${APIkey}`);

//     const data = response.json(); 
//     return data;
// }

// launchAPI.then(data => {
//     data;
// })