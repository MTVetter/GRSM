/* Main JavaScript sheet for Great Smokey Mountains by Michael Vetter*/

//Set up the initial location of the map
var initialLocation = [35.606144, -83.590687];

//Set up the initial zoom of the map
var initialZoom = 10;

//create the map
var map = L.map("map",{zoomControl: false}).setView(initialLocation, initialZoom);

//Add the home button with the zoom in and zoom out buttons
var zoomHome = L.Control.zoomHome();
zoomHome.addTo(map);


//Add ESRI base tilelayer
var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
}).addTo(map);

//Create a highlight for the trails
var highlightLine = {
    weight: 5,
    color: "#3B555C",
    fillOpacity: 0.6
}

//Reset the line color for the trails
var resetLine = {
    weight: 2,
    color: "#D2691E"
}

//Function to highlight the feature
function highlightFeature(evt){
    var feature = evt.target;
    feature.setStyle(highlightLine);
}

//Function to reset the highlight
function reset(evt){
    var feature = evt.target;
    feature.setStyle(resetLine);
}


//Adding the trails to the map
var trails = L.geoJson(null, {
    style: function (feature){
        return {color: "#D2691E", weight: 2};
    },
    onEachFeature: function (feature, layer){
        var popupText = "Trail Name: " +feature.properties.trailname;
        layer.bindPopup(popupText);
        layer.on({
            mouseover: highlightFeature,
            mouseout: reset
        });
    }
}).addTo(map);
//Create the SQL query
var query = "SELECT * FROM grsm_trails";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(query, null, {format: "geojson"}).done(function(data){
    trails.addData(data);
});

//Add the park boundary
var boundary = L.geoJson(null,{
    style: function (feature){
        return {color: "#708090", weight: 1.5};
    }
}).addTo(map);
//Create the SQL query
var boundaryQuery = "SELECT * FROM grsm_boundary";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(boundaryQuery, null, {format: "geojson"}).done(function(data){
    boundary.addData(data);
});

//Restroom icon
var restroomIcon = L.icon({
    iconUrl: "img/restroom.png",
    iconSize: [20,20]
});

//Add the retroom locations
var restrooms = L.geoJson(null,{
    pointToLayer: function(feature, latlng){
        return L.marker(latlng, {
            icon: restroomIcon
        });
    },
    onEachFeature: function (feature, layer){
        var popupText = "Location Name: " +feature.properties.loc_name +
        "<br>Near Trail: " +feature.properties.neartrail +
        "<br>Near Road: " +feature.properties.nearroad;
        layer.bindPopup(popupText);
    }
});
//Create the SQL query
var restroomQuery = "SELECT * FROM grsm_restrooms";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(restroomQuery, null, {format: "geojson"}).done(function(data){
    restrooms.addData(data);
});

//Park Rangers icon
var rangerIcon = L.icon({
    iconUrl: "img/ranger_station.png",
    iconSize: [20,20]
});

//Add the park ranger locations
var rangerStation = L.geoJson(null,{
    pointToLayer: function(feature, latlng){
        return L.marker(latlng, {
            icon: rangerIcon
        });
    },
    onEachFeature: function (feature, layer){
        var popupText = "Location Name: " +feature.properties.loc_name +
        "<br>On Trail: " +feature.properties.trail +
        "<br>On Road: " +feature.properties.road;
        layer.bindPopup(popupText);
    }
});
//Create the SQL query
var rangerQuery = "SELECT * FROM grsm_ranger_stations";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(rangerQuery, null, {format: "geojson"}).done(function(data){
    rangerStation.addData(data);
});

//Picnic icon
var picnicIcon = L.icon({
    iconUrl: "img/picnic.png",
    iconSize: [20,20]
});

//Add the picnic areas
var picnic = L.geoJson(null,{
    pointToLayer: function(feature, latlng){
        return L.marker(latlng, {
            icon: picnicIcon
        });
    },
    onEachFeature: function (feature, layer){
        var popupText = "Location Name: " +feature.properties.loc_name +
        "<br>Near Trail: " +feature.properties.neartrail +
        "<br>Near Road: " +feature.properties.nearroad;
        layer.bindPopup(popupText);
    }
});
//Create the SQL query
var picnicQuery = "SELECT * FROM grsm_picnic";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(picnicQuery, null, {format: "geojson"}).done(function(data){
    picnic.addData(data);
});

//Backcountry Campsites icon
var hikerHorseCampIcon = L.icon({
    iconUrl: "img/hikerhorseCamp.png",
    iconSize: [30,30]
});

//Add the park boundary
var hhCamp = L.geoJson(null,{
    pointToLayer: function(feature, latlng){
        return L.marker(latlng, {
            icon: hikerHorseCampIcon
        });
    },
    onEachFeature: function (feature, layer){
        var popupText = "Location Name: " +feature.properties.label +
        "<br>On Trail: " +feature.properties.trail +
        "<br>Capacity: " +feature.properties.capacity +
        "<br>Campsite Access Restriction: " +feature.properties.camp_restr +
        "<br>Bear Cables: " +feature.properties.bearcables +
        "<br>Elevation (feet): " +feature.properties.elev_ft +
        "<br>Elevation (meters): " +feature.properties.elev_m; 
        layer.bindPopup(popupText);
    }
});
//Create the SQL query
var hhCampQuery = "SELECT * FROM grsm_backcountry_campsites WHERE ruleid = 'Hiker and Horse'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(hhCampQuery, null, {format: "geojson"}).done(function(data){
    hhCamp.addData(data);
});

//Backcountry Campsites icon
var hikerCampIcon = L.icon({
    iconUrl: "img/campsite.png",
    iconSize: [30,30]
});

//Add the park boundary
var camp = L.geoJson(null,{
    pointToLayer: function(feature, latlng){
        return L.marker(latlng, {
            icon: hikerCampIcon
        });
    },
    onEachFeature: function (feature, layer){
        var popupText = "Location Name: " +feature.properties.label +
        "<br>On Trail: " +feature.properties.trail +
        "<br>Capacity: " +feature.properties.capacity +
        "<br>Campsite Access Restriction: " +feature.properties.camp_restr +
        "<br>Bear Cables: " +feature.properties.bearcables +
        "<br>Elevation (feet): " +feature.properties.elev_ft +
        "<br>Elevation (meters): " +feature.properties.elev_m; 
        layer.bindPopup(popupText);
    }
});
//Create the SQL query
var CampQuery = "SELECT * FROM grsm_backcountry_campsites WHERE ruleid = 'Hiker Only'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(CampQuery, null, {format: "geojson"}).done(function(data){
    camp.addData(data);
});

//Backcountry Campsites icon
var waterCampIcon = L.icon({
    iconUrl: "img/wCamp.png",
    iconSize: [30,30]
});

//Add the park boundary
var wCamp = L.geoJson(null,{
    pointToLayer: function(feature, latlng){
        return L.marker(latlng, {
            icon: waterCampIcon
        });
    },
    onEachFeature: function (feature, layer){
        var popupText = "Location Name: " +feature.properties.label +
        "<br>On Trail: " +feature.properties.trail +
        "<br>Capacity: " +feature.properties.capacity +
        "<br>Campsite Access Restriction: " +feature.properties.camp_restr +
        "<br>Bear Cables: " +feature.properties.bearcables +
        "<br>Elevation (feet): " +feature.properties.elev_ft +
        "<br>Elevation (meters): " +feature.properties.elev_m; 
        layer.bindPopup(popupText);
    }
});
//Create the SQL query
var wCampQuery = "SELECT * FROM grsm_backcountry_campsites WHERE ruleid = 'Water-access Only'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(wCampQuery, null, {format: "geojson"}).done(function(data){
    wCamp.addData(data);
});

//Create a baseLayers group
var baseLayers = {
    "Trails": trails,
    "Restrooms": restrooms,
    "Ranger Stations": rangerStation,
    "Picnic Areas": picnic,
    "Horse and Hiker Campsites": hhCamp,
    "Hiker Only Campsite": camp,
    "Water-access Only Campsite": wCamp
};
//Add the base maps to the map so the user can decide
L.control.layers(null, baseLayers).addTo(map);