document.addEventListener("DOMContentLoaded", function () {
  const map = L.map("map").setView([coordinates[1], coordinates[0]], 11);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  L.marker([coordinates[1], coordinates[0]])
    .addTo(map)
    .bindPopup("Exact location will be provided after booking")
    .openPopup();
});
// console.log(coordinates);
