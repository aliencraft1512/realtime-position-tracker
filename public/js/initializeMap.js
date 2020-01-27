"use strict";

const currentUserName = prompt("Your name ?", "Anonymous") || "Anonymous";
let currentUserLocation = [];
const markers = [];
const currentUserCoordinatesElement = document.getElementById("coordinates");
const mymap = L.map("mapid").setView([0, 0], 13);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    accessToken:
      "pk.eyJ1IjoicmVocmUiLCJhIjoiY2s1dzc5bnh0MDN3MzNvbmVibmhxb2dlNiJ9.iBYJTrGdyWvzU84CzQik_g"
  }
).addTo(mymap);

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    setInitialMarkerAndCoordinates,
    () => alert("Failed to get current position"),
    {
      enableHighAccuracy: true
    }
  );
  // navigator.geolocation.watchPosition(updatePosition);
} else {
  alert("Geolocation tracking is not available in your browser.");
}

function setInitialMarkerAndCoordinates(position) {
  currentUserLocation = [position.coords.latitude, position.coords.longitude];

  const currentUserCoordinates = document.createTextNode(
    `Lat:${currentUserLocation[0]}, lng:${currentUserLocation[1]}`
  );
  currentUserCoordinatesElement.appendChild(currentUserCoordinates);

  L.marker(currentUserLocation)
    .addTo(mymap)
    .bindPopup(currentUserName)
    .openPopup();

  markers.push({
    markerId: `${currentUserName}${Date.now()}`,
    username: currentUserName,
    coordinates: [position.coords.latitude, position.coords.longitude]
  });

  mymap.setView(currentUserLocation, 13);
}
