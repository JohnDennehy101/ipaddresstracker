// DOM Elements for ip info elements, input field and submit button
let ipAddressElem = document.getElementById("ipAddress");
let addressElem = document.getElementById("address");
let timezoneElem = document.getElementById("timezone");
let ispProviderElem = document.getElementById("ispProvider");
let submitButton = document.getElementById("submitButton");
let inputField = document.getElementById("inputField");

// Async IIFE to fetch the current IP info for the user on browser load
(async function fetchDefaultInfoIpify() {
  let apiResponse = await fetch(
    "https://geo.ipify.org/api/v1?apiKey=at_KOKeqxdXZ9m8bjMRT56XCWfWNJ74S"
  );
  let apiResponseJson = await apiResponse.json();
  console.log(apiResponseJson);
  ipAddressElem.textContent = apiResponseJson.ip;
  addressElem.textContent = `${apiResponseJson.location.city}, ${apiResponseJson.location.country}`;
  timezoneElem.textContent = `UTC${apiResponseJson.location.timezone}`;
  ispProviderElem.textContent = apiResponseJson.isp;

  //Setting map based on coordinates from API response from IPify
  var mymap = L.map("map").setView(
    [apiResponseJson.location.lat, apiResponseJson.location.lng],
    16
  );

  // Adding mapbox tile to Leaflet map
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiamRlbm5laHkiLCJhIjoiY2toOWRzd3Q4MTRxcTJ4bnp5cG5naDRzdSJ9.j35dVO1T0md4X0YIbp2Ilg",
    }
  ).addTo(mymap);

  // Custom icon for map
  var blackIcon = L.icon({
    iconUrl: "../images/icon-location.svg",
    iconSize: [33, 90],
  });

  // Adding marker to map
  L.marker([apiResponseJson.location.lat, apiResponseJson.location.lng], {
    icon: blackIcon,
  }).addTo(mymap);
})();

/*
 Keyup event for input field (if no match for IP address or domain regex is found, red border is applied).
 If match found in regex, green border is applied to input field
 */

inputField.addEventListener("keyup", () => {
  console.log(inputField.value.length);
  const ipRegex = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/g;
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/g;

  let ipMatch = inputField.value.match(ipRegex);
  let domainMatch = inputField.value.match(domainRegex);

  if (ipMatch !== null) {
    if (ipMatch.length > 0) {
      console.log("VALID INPUT");
      console.log(inputField.value);
      inputField.classList.remove("invalidInput");
      inputField.classList.add("validInput");
    }
  } else if (domainMatch !== null) {
    if (domainMatch.length > 0) {
      console.log("VALID INPUT");
      console.log(inputField.value);
      inputField.classList.remove("invalidInput");
      inputField.classList.add("validInput");
    }
  } else {
    inputField.classList.remove("validInput");
    inputField.classList.add("invalidInput");
    console.log("INVALID input");
  }
});


/*
Event listener on submit button (if no match for ip address or domain regex, no api call is made).
If regex match found for ip address, ip address is passed to API call for ipify.
If regex match found for domain, domain is passed to API call for ipify.
Async function used for api call.
Result of a Promise is then used to populate page with updated info from API (and re-render the map to the updated coordinates).
*/

submitButton.addEventListener("click", (e) => {
  const ipRegex = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/g;
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/g;

  let ipMatch = inputField.value.match(ipRegex);
  let domainMatch = inputField.value.match(domainRegex);

  if (ipMatch !== null) {
    if (ipMatch.length > 0) {
      console.log("Working");

      let apiIpResponse = async () => {
        let response = await fetch(
          `https://geo.ipify.org/api/v1?apiKey=at_KOKeqxdXZ9m8bjMRT56XCWfWNJ74S&ipAddress=${inputField.value}`
        );
        let data = response.json();
        return data;
      };

      apiIpResponse()
        .then((data) => {
          console.log(data);
          ipAddressElem.textContent = data.ip;
          addressElem.textContent = `${data.location.city}, ${data.location.country}`;
          timezoneElem.textContent = `UTC${data.location.timezone}`;
          ispProviderElem.textContent = data.isp;
          var container = L.DomUtil.get("map");

          if (container != null) {
            container._leaflet_id = null;
          }

          var mymap = L.map("map").setView(
            [data.location.lat, data.location.lng],
            16
          );

          L.tileLayer(
            "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
            {
              attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
              maxZoom: 18,
              id: "mapbox/streets-v11",
              tileSize: 512,
              zoomOffset: -1,
              accessToken:
                "pk.eyJ1IjoiamRlbm5laHkiLCJhIjoiY2toOWRzd3Q4MTRxcTJ4bnp5cG5naDRzdSJ9.j35dVO1T0md4X0YIbp2Ilg",
            }
          ).addTo(mymap);

          var blackIcon = L.icon({
            iconUrl: "../images/icon-location.svg",
            iconSize: [33, 90],
          });
          L.marker([data.location.lat, data.location.lng], {
            icon: blackIcon,
          }).addTo(mymap);
        })
        .catch((e) => {
          alert(e);
        });
      
    }
  } else if (domainMatch !== null) {
    if (domainMatch.length > 0) {
      console.log("Working");
      let apiDomainResponse = async () => {
        let response = await fetch(
          `https://geo.ipify.org/api/v1?apiKey=at_KOKeqxdXZ9m8bjMRT56XCWfWNJ74S&domain=${inputField.value}`
        );
        let data = response.json();
        return data;
      };
      apiDomainResponse()
        .then((data) => {
          console.log(data);
          ipAddressElem.textContent = data.ip;
          addressElem.textContent = `${data.location.city}, ${data.location.country}`;
          timezoneElem.textContent = `UTC${data.location.timezone}`;
          ispProviderElem.textContent = data.isp;

          var container = L.DomUtil.get("map");

          if (container != null) {
            container._leaflet_id = null;
          }

          var mymap = L.map("map").setView(
            [data.location.lat, data.location.lng],
            16
          );

          L.tileLayer(
            "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
            {
              attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
              maxZoom: 18,
              id: "mapbox/streets-v11",
              tileSize: 512,
              zoomOffset: -1,
              accessToken:
                "pk.eyJ1IjoiamRlbm5laHkiLCJhIjoiY2toOWRzd3Q4MTRxcTJ4bnp5cG5naDRzdSJ9.j35dVO1T0md4X0YIbp2Ilg",
            }
          ).addTo(mymap);

          var blackIcon = L.icon({
            iconUrl: "../images/icon-location.svg",
            iconSize: [33, 90],
          });

          L.marker([data.location.lat, data.location.lng], {
            icon: blackIcon,
          }).addTo(mymap);
        })
        .catch((e) => {
          alert(e);
        });

      console.log(inputField.value);
    }
  } else {
    e.preventDefault();
    console.log("Invalid input");
  }
});
