let ipAddressElem = document.getElementById('ipAddress');
let addressElem = document.getElementById('address');
let timezoneElem = document.getElementById('timezone');
let ispProviderElem = document.getElementById('ispProvider');


/*var mymap = L.map('map').setView([51.505, -0.09], 20);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiamRlbm5laHkiLCJhIjoiY2toOWRzd3Q4MTRxcTJ4bnp5cG5naDRzdSJ9.j35dVO1T0md4X0YIbp2Ilg'
}).addTo(mymap);

var blackIcon = L.icon({
    iconUrl: '../images/icon-location.svg',
    shadowUrl: '../images/icon-location.svg',

    iconSize:     [33, 90],
    shadowSize:   [50, 64], 
    
});


let arrayOfLatLngs = [51.505, -0.09]





L.marker(mymap.getCenter(), {icon: blackIcon}).addTo(mymap);

(async function fetchDefaultInfoIpify() {
let apiResponse = await fetch('https://geo.ipify.org/api/v1?apiKey=at_KOKeqxdXZ9m8bjMRT56XCWfWNJ74S')
let apiResponseJson = await apiResponse.json()
console.log(apiResponseJson)
ipAddressElem.textContent = apiResponseJson.ip
addressElem.textContent = `${apiResponseJson.location.city}, ${apiResponseJson.location.country}`
timezoneElem.textContent = `UTC${apiResponseJson.location.timezone}`
ispProviderElem.textContent = apiResponseJson.isp
})();

*/






