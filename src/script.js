let ipAddressElem = document.getElementById('ipAddress');
let addressElem = document.getElementById('address');
let timezoneElem = document.getElementById('timezone');
let ispProviderElem = document.getElementById('ispProvider');
let submitButton = document.getElementById('submitButton');
let inputField = document.getElementById('inputField');


/*
(async function fetchDefaultInfoIpify() {
let apiResponse = await fetch('https://geo.ipify.org/api/v1?apiKey=at_KOKeqxdXZ9m8bjMRT56XCWfWNJ74S')
let apiResponseJson = await apiResponse.json()
console.log(apiResponseJson)
ipAddressElem.textContent = apiResponseJson.ip
addressElem.textContent = `${apiResponseJson.location.city}, ${apiResponseJson.location.country}`
timezoneElem.textContent = `UTC${apiResponseJson.location.timezone}`
ispProviderElem.textContent = apiResponseJson.isp


var mymap = L.map('map').setView([apiResponseJson.location.lat, apiResponseJson.location.lng], 16);

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
    iconSize:     [33, 90],
});




L.marker([apiResponseJson.location.lat, apiResponseJson.location.lng], {icon: blackIcon}).addTo(mymap);

})();*/

inputField.addEventListener("keyup", () => {
console.log(inputField.value.length);
const ipRegex = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/g;
const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/g;

let ipMatch = inputField.value.match(ipRegex);
let domainMatch = inputField.value.match(domainRegex);

if (ipMatch !== null) {
if (ipMatch.length > 0)  {
console.log('VALID INPUT')
console.log(inputField.value)
 inputField.classList.remove('invalidInput')
 inputField.classList.add('validInput')
}
}
else if (domainMatch !== null) {
if (domainMatch.length > 0) {
console.log('VALID INPUT')
console.log(inputField.value)
 inputField.classList.remove('invalidInput')
 inputField.classList.add('validInput')
}
}

else {
    inputField.classList.remove('validInput')
    inputField.classList.add('invalidInput')
    console.log('INVALID input')
}
})

submitButton.addEventListener('click', (e) => {

const ipRegex = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/g;
const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/g;

let ipMatch = inputField.value.match(ipRegex);
let domainMatch = inputField.value.match(domainRegex);

if (ipMatch !== null) {
if (ipMatch.length > 0)  {
console.log('Working')


let apiIpResponse = async () => {
let response = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_KOKeqxdXZ9m8bjMRT56XCWfWNJ74S&ipAddress=${inputField.value}`);
let data = response.json();
return data;
}

apiIpResponse().then((data) => {
    console.log(data)
    ipAddressElem.textContent = data.ip
    addressElem.textContent = `${data.location.city}, ${data.location.country}`
    timezoneElem.textContent = `UTC${data.location.timezone}`
    ispProviderElem.textContent = data.isp
}).catch((e) => {
    alert(e)
})
//console.log(inputField.value)

}
}

else if (domainMatch !== null) {
if (domainMatch.length > 0) {
console.log('Working')
console.log(inputField.value)
}
}

else {
    e.preventDefault()
    console.log('Invalid input')
}


})






