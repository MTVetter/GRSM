/* Main JavaScript sheet for Great Smokey Mountains by Michael Vetter*/

//Set up the initial location of the map
var initialLocation = [35.606144, -83.590687];

//Set up the initial zoom of the map
var initialZoom = 8;

//create the map
var map = L.map("map",{zoomControl: false}).setView(initialLocation, initialZoom);

//Add the home button with the zoom in and zoom out buttons
var zoomHome = L.Control.zoomHome();
zoomHome.addTo(map);

//add CartoDB base tilelayer
var CartoDB_Positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.jpg', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd'
}).addTo(map);

//Add ESRI base tilelayer
var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

//Create the base maps
var baseLayers = {
    "Grayscale": CartoDB_Positron,
    "Imagery": esri
};

//Add the base maps to the map so the user can decide
L.control.layers(baseLayers).addTo(map);

var sqlQuery = "SELECT * FROM grsm_boundary";

var cartoDBUserName = "brbadger";

$.getJSON("https://" + cartoDBUserName+ ".carto.com/api/v2/sql?format=GeoJSON&q="+sqlQuery).addTo(map);