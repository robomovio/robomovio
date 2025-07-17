//MEMBER MAP
const marker_size = [190, 250]; // Original size of the marker image
const marker_resize_factor = 4; // Resized size of the marker image (scale down by this factor)
// Initialize the map and set its view
const map = L.map('map', { center: [49.005, 12.12], zoom: 12, maxBounds: [[-90, -180], [90, 180]], maxBoundsViscosity: 0.8, zoomControl: true, attributionControl: false });

// Add the base map layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add markers to the map
const markers = [
    {
        lat: 49.0001171,
        lng: 12.1041891,
        title: "MINT-Labs",
        popup: "<h2>MINT-Labs: </h2><p>Our main meeting point</p>",
        icon: L.divIcon({
            html: "<i class='fa fa-map-marker fa-3x' style='color: red;'></i>",
            iconSize: [30, 42],
            className: "custom-fa-icon"
        })
    },
    {
        lat: 49.00844192504883,
        lng: 12.14494800567627,
        title: "Continental / Aumovio",
        popup: "<h2>Continental / Aumovio: </h2><p>Our secondary meeting point</p>",
        icon: L.divIcon({
            html: "<i class='fa fa-map-marker fa-3x' style='color: red;'></i>",
            iconSize: [30, 42],
            className: "custom-fa-icon"
        })
    }
];

markers.forEach((marker) => {
    L.marker([marker.lat, marker.lng], { icon: marker.icon })
        .addTo(map)
        .bindPopup(marker.popup)
        .bindTooltip(marker.title);
});