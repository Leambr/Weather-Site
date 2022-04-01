const dateDisplay = document.querySelector('.today-date');

// Afficher la date du jour
const today = new Date();
// Format de la date
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
console.log(today.toLocaleDateString(undefined, options));

// Afficher la date dans le HTML
dateDisplay.textContent = today.toLocaleDateString(undefined, options);