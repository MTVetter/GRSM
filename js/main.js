/* Main JavaScript sheet for Great Smokey Mountains by Michael Vetter*/

//Set up the initial location of the map
var initialLocation = [35.606144, -83.519687];

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

//Add weather map service
var weather = L.esri.dynamicMapLayer({
    url: 'https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/radar_base_reflectivity/MapServer',
    opacity: 0.7
  }).addTo(map);

//Create cluster groups
var cluster = L.markerClusterGroup();
var blountCluster = L.markerClusterGroup();
var cockeCluster = L.markerClusterGroup();
var haywoodCluster = L.markerClusterGroup();
var sevierCluster = L.markerClusterGroup();
var swainCluster = L.markerClusterGroup();

//Create the features for Blount County
//Add trails
var blountTrails = L.geoJson(null,{
    style: function (feature){
        return {color: "#800000", weight: 2};
    },
    onEachFeature: function (feature, layer){
        var popupText = "Trail Name: " +feature.properties.trailname;
        layer.bindPopup(popupText);
        // layer.on({
        //     mouseover: highlightFeature,
        //     mouseout: reset
        // });
    }
});
//Create the SQL query
var blountTrailQuery = "SELECT * FROM grsm_trails WHERE county = 'Blount'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(blountTrailQuery, null, {format: "geojson"}).done(function(data){
    blountTrails.addData(data);
});

//Add the picnic areas
var blountPicnic = L.geoJson(null,{
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
var blountPicnicQuery = "SELECT * FROM grsm_picnic WHERE county = 'Blount'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(blountPicnicQuery, null, {format: "geojson"}).done(function(data){
    blountPicnic.addData(data);
});

//Add the retroom locations
var blountRestrooms = L.geoJson(null,{
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
var blountRestroomQuery = "SELECT * FROM grsm_restrooms WHERE county = 'Blount'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(blountRestroomQuery, null, {format: "geojson"}).done(function(data){
    blountRestrooms.addData(data);
    blountCluster.addLayer(blountRestrooms);
});

//Add the park ranger locations
var blountRangerStation = L.geoJson(null,{
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
var blountRangerQuery = "SELECT * FROM grsm_ranger_stations WHERE county = 'Blount'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(blountRangerQuery, null, {format: "geojson"}).done(function(data){
    blountRangerStation.addData(data);
});

//Add the park boundary
var blountHHCamp = L.geoJson(null,{
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
var blountHHCampQuery = "SELECT * FROM grsm_backcountry_campsites WHERE ruleid = 'Hiker and Horse' AND county = 'Blount'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(blountHHCampQuery, null, {format: "geojson"}).done(function(data){
    blountHHCamp.addData(data);
});

//Add the park boundary
var blountCamp = L.geoJson(null,{
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
var blountCampQuery = "SELECT * FROM grsm_backcountry_campsites WHERE ruleid = 'Hiker Only' AND county = 'Blount'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(blountCampQuery, null, {format: "geojson"}).done(function(data){
    blountCamp.addData(data);
});

//Add the park boundary
var blountWCamp = L.geoJson(null,{
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
var blountWCampQuery = "SELECT * FROM grsm_backcountry_campsites WHERE ruleid = 'Water-access Only' AND county = 'Blount'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(blountWCampQuery, null, {format: "geojson"}).done(function(data){
    blountWCamp.addData(data);
});

//Create the features for Cocke County
//Add trails
var cockeTrails = L.geoJson(null,{
    style: function (feature){
        return {color: "#800000", weight: 2};
    },
    onEachFeature: function (feature, layer){
        var popupText = "Trail Name: " +feature.properties.trailname;
        layer.bindPopup(popupText);
        // layer.on({
        //     mouseover: highlightFeature,
        //     mouseout: reset
        // });
    }
});
//Create the SQL query
var cockeTrailQuery = "SELECT * FROM grsm_trails WHERE county = 'Cocke'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(cockeTrailQuery, null, {format: "geojson"}).done(function(data){
    cockeTrails.addData(data);
});

//Add the picnic areas
var cockePicnic = L.geoJson(null,{
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
var cockePicnicQuery = "SELECT * FROM grsm_picnic WHERE county = 'Cocke'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(cockePicnicQuery, null, {format: "geojson"}).done(function(data){
    cockePicnic.addData(data);
});

//Add the retroom locations
var cockeRestrooms = L.geoJson(null,{
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
var cockeRestroomQuery = "SELECT * FROM grsm_restrooms WHERE county = 'Cocke'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(cockeRestroomQuery, null, {format: "geojson"}).done(function(data){
    cockeRestrooms.addData(data);
    cockeCluster.addLayer(cockeRestrooms);
});

//Add the park ranger locations
var cockeRangerStation = L.geoJson(null,{
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
var cockeRangerQuery = "SELECT * FROM grsm_ranger_stations WHERE county = 'Cocke'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(cockeRangerQuery, null, {format: "geojson"}).done(function(data){
    cockeRangerStation.addData(data);
});


//Add the park boundary
var cockeHHCamp = L.geoJson(null,{
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
var cockeHHCampQuery = "SELECT * FROM grsm_backcountry_campsites WHERE ruleid = 'Hiker and Horse' AND county = 'Cocke'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(cockeHHCampQuery, null, {format: "geojson"}).done(function(data){
    cockeHHCamp.addData(data);
});


//Add the park boundary
var cockeCamp = L.geoJson(null,{
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
var cockeCampQuery = "SELECT * FROM grsm_backcountry_campsites WHERE ruleid = 'Hiker Only' AND county = 'Cocke'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(cockeCampQuery, null, {format: "geojson"}).done(function(data){
    cockeCamp.addData(data);
});


//Add the park boundary
var cockeWCamp = L.geoJson(null,{
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
var cockeWCampQuery = "SELECT * FROM grsm_backcountry_campsites WHERE ruleid = 'Water-access Only' AND county = 'Cocke'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(cockeWCampQuery, null, {format: "geojson"}).done(function(data){
    cockeWCamp.addData(data);
});

//Create the features for Haywood County
//Add trails
var haywoodTrails = L.geoJson(null,{
    style: function (feature){
        return {color: "#800000", weight: 2};
    },
    onEachFeature: function (feature, layer){
        var popupText = "Trail Name: " +feature.properties.trailname;
        layer.bindPopup(popupText);
        // layer.on({
        //     mouseover: highlightFeature,
        //     mouseout: reset
        // });
    }
});
//Create the SQL query
var haywoodTrailQuery = "SELECT * FROM grsm_trails WHERE county = 'Haywood'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(haywoodTrailQuery, null, {format: "geojson"}).done(function(data){
    haywoodTrails.addData(data);
});


//Add the picnic areas
var haywoodPicnic = L.geoJson(null,{
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
var haywoodPicnicQuery = "SELECT * FROM grsm_picnic WHERE county = 'Haywood'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(haywoodPicnicQuery, null, {format: "geojson"}).done(function(data){
    haywoodPicnic.addData(data);
});

//Add the retroom locations
var haywoodRestrooms = L.geoJson(null,{
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
var haywoodRestroomQuery = "SELECT * FROM grsm_restrooms WHERE county = 'Haywood'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(haywoodRestroomQuery, null, {format: "geojson"}).done(function(data){
    haywoodRestrooms.addData(data);
    haywoodCluster.addLayer(haywoodRestrooms);
});

//Add Ranger Stations
//Add the park ranger locations
var haywoodRangerStation = L.geoJson(null,{
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
var haywoodRangerQuery = "SELECT * FROM grsm_ranger_stations WHERE county = 'Hayood'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(haywoodRangerQuery, null, {format: "geojson"}).done(function(data){
    haywoodRangerStation.addData(data);
});


//Add the park boundary
var haywoodHHCamp = L.geoJson(null,{
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
var haywoodHHCampQuery = "SELECT * FROM grsm_backcountry_campsites WHERE ruleid = 'Hiker and Horse' AND county = 'Haywood'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(haywoodHHCampQuery, null, {format: "geojson"}).done(function(data){
    haywoodHHCamp.addData(data);
});

//Add the park boundary
var haywoodCamp = L.geoJson(null,{
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
var haywoodCampQuery = "SELECT * FROM grsm_backcountry_campsites WHERE ruleid = 'Hiker Only' AND county = 'Haywood'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(haywoodCampQuery, null, {format: "geojson"}).done(function(data){
    haywoodCamp.addData(data);
});

//Add the park boundary
var haywoodWCamp = L.geoJson(null,{
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
var haywoodWCampQuery = "SELECT * FROM grsm_backcountry_campsites WHERE ruleid = 'Water-access Only' AND county = 'Haywood'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(haywoodWCampQuery, null, {format: "geojson"}).done(function(data){
    haywoodWCamp.addData(data);
});

//Create the features for Sevier County
//Add trails
var sevierTrails = L.geoJson(null,{
    style: function (feature){
        return {color: "#800000", weight: 2};
    },
    onEachFeature: function (feature, layer){
        var popupText = "Trail Name: " +feature.properties.trailname;
        layer.bindPopup(popupText);
        // layer.on({
        //     mouseover: highlightFeature,
        //     mouseout: reset
        // });
    }
});
//Create the SQL query
var sevierTrailQuery = "SELECT * FROM grsm_trails WHERE county = 'Sevier'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(sevierTrailQuery, null, {format: "geojson"}).done(function(data){
    sevierTrails.addData(data);
});


//Add the picnic areas
var sevierPicnic = L.geoJson(null,{
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
var sevierPicnicQuery = "SELECT * FROM grsm_picnic WHERE county = 'Sevier'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(sevierPicnicQuery, null, {format: "geojson"}).done(function(data){
    sevierPicnic.addData(data);
});

//Add the retroom locations
var sevierRestrooms = L.geoJson(null,{
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
var sevierRestroomQuery = "SELECT * FROM grsm_restrooms WHERE county = 'Sevier'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(sevierRestroomQuery, null, {format: "geojson"}).done(function(data){
    sevierRestrooms.addData(data);
    sevierCluster.addLayer(sevierRestrooms);
});

//Add Ranger Stations
//Add the park ranger locations
var sevierRangerStation = L.geoJson(null,{
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
var sevierRangerQuery = "SELECT * FROM grsm_ranger_stations WHERE county = 'Sevier'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(sevierRangerQuery, null, {format: "geojson"}).done(function(data){
    sevierRangerStation.addData(data);
});


//Add the park boundary
var sevierHHCamp = L.geoJson(null,{
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
var sevierHHCampQuery = "SELECT * FROM grsm_backcountry_campsites WHERE ruleid = 'Hiker and Horse' AND county = 'Sevier'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(sevierHHCampQuery, null, {format: "geojson"}).done(function(data){
    sevierHHCamp.addData(data);
});

//Add the park boundary
var sevierCamp = L.geoJson(null,{
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
var sevierCampQuery = "SELECT * FROM grsm_backcountry_campsites WHERE ruleid = 'Hiker Only' AND county = 'Sevier'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(sevierCampQuery, null, {format: "geojson"}).done(function(data){
    sevierCamp.addData(data);
});

//Add the park boundary
var sevierWCamp = L.geoJson(null,{
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
var sevierWCampQuery = "SELECT * FROM grsm_backcountry_campsites WHERE ruleid = 'Water-access Only' AND county = 'Sevier'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(sevierWCampQuery, null, {format: "geojson"}).done(function(data){
    sevierWCamp.addData(data);
});

//Create the features for Swain County
//Add trails
var swainTrails = L.geoJson(null,{
    style: function (feature){
        return {color: "#800000", weight: 2};
    },
    onEachFeature: function (feature, layer){
        var popupText = "Trail Name: " +feature.properties.trailname;
        layer.bindPopup(popupText);
        // layer.on({
        //     mouseover: highlightFeature,
        //     mouseout: reset
        // });
    }
});
//Create the SQL query
var swainTrailQuery = "SELECT * FROM grsm_trails WHERE county = 'Swain'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(swainTrailQuery, null, {format: "geojson"}).done(function(data){
    swainTrails.addData(data);
});


//Add the picnic areas
var swainPicnic = L.geoJson(null,{
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
var swainPicnicQuery = "SELECT * FROM grsm_picnic WHERE county = 'Swain'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(swainPicnicQuery, null, {format: "geojson"}).done(function(data){
    swainPicnic.addData(data);
});

//Add the retroom locations
var swainRestrooms = L.geoJson(null,{
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
var swainRestroomQuery = "SELECT * FROM grsm_restrooms WHERE county = 'Swain'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(swainRestroomQuery, null, {format: "geojson"}).done(function(data){
    swainRestrooms.addData(data);
    swainCluster.addLayer(swainRestrooms);
});

//Add Ranger Stations
//Add the park ranger locations
var swainRangerStation = L.geoJson(null,{
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
var swainRangerQuery = "SELECT * FROM grsm_ranger_stations WHERE county = 'Swain'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(swainRangerQuery, null, {format: "geojson"}).done(function(data){
    swainRangerStation.addData(data);
});


//Add the park boundary
var swainHHCamp = L.geoJson(null,{
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
var swainHHCampQuery = "SELECT * FROM grsm_backcountry_campsites WHERE ruleid = 'Hiker and Horse' AND county = 'Swain'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(swainHHCampQuery, null, {format: "geojson"}).done(function(data){
    swainHHCamp.addData(data);
});

//Add the park boundary
var swainCamp = L.geoJson(null,{
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
var swainCampQuery = "SELECT * FROM grsm_backcountry_campsites WHERE ruleid = 'Hiker Only' AND county = 'Swain'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(swainCampQuery, null, {format: "geojson"}).done(function(data){
    swainCamp.addData(data);
});

//Add the park boundary
var swainWCamp = L.geoJson(null,{
    pointToLayer: function(feature, latlng){
        return L.marker(latlng, {
            icon: waterCampIcon
        });
    },
    onEachFeature: function (feature, layer){
        var popupText = "<p>Location Name:</p>" + feature.properties.label +
        "<br><p>On Trail:</p>" +feature.properties.trail +
        "<br>Capacity: " +feature.properties.capacity +
        "<br>Campsite Access Restriction: " +feature.properties.camp_restr +
        "<br>Bear Cables: " +feature.properties.bearcables +
        "<br>Elevation (feet): " +feature.properties.elev_ft +
        "<br>Elevation (meters): " +feature.properties.elev_m; 
        layer.bindPopup(popupText);
    }
});
//Create the SQL query
var swainWCampQuery = "SELECT * FROM grsm_backcountry_campsites WHERE ruleid = 'Water-access Only' AND county = 'Swain'";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(swainWCampQuery, null, {format: "geojson"}).done(function(data){
    swainWCamp.addData(data);
});

//Create a highlight for the trails
var highlightLine = {
    weight: 3,
    color: "yellow",
    fillOpacity: 0.6
}

//Reset the line color for the trails
var resetLine = {
    weight: 2,
    color: "#800000"
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
        return {color: "#800000", weight: 2};
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
var trailQuery = "SELECT * FROM grsm_merged_trails";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(trailQuery, null, {format: "geojson"}).done(function(data){
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
    cluster.addLayer(restrooms);
});


// map.addLayer(cluster);

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

//Icon to represent the reported problem
var problemIcon = L.icon({
    iconUrl: "img/problem.png",
    iconSize: [30,30]
});

//Create the features that the users will enter
var collectedPoints = L.geoJson(null,{
    pointToLayer: function(feature, latlng){
        return L.marker(latlng, {
            icon: problemIcon
        });
    },
    onEachFeature: function (feature, layer){
        var popupText = "Location Name: " +feature.properties.location +
        "<br>Description of Problem: " +feature.properties.description +
        "<br>Date of Problem: " +feature.properties.created_at; 
        layer.bindPopup(popupText);
    }
});
//Create the SQL query
var sqlQuery = "SELECT * FROM grsm_collected_data";
//Get username in order to execute the query
var sql = new cartodb.SQL({user: 'brbadger'});
sql.execute(sqlQuery, null, {format: "geojson"}).done(function(data){
    collectedPoints.addData(data);
});

//Create a baseLayers group
var baseLayers = {
    "Weather": weather,
    "Trails": trails,
    "Restrooms": cluster,
    "Ranger Stations": rangerStation,
    "Picnic Areas": picnic,
    "Horse and Hiker Campsites": hhCamp,
    "Hiker Only Campsite": camp,
    "Water-access Only Campsite": wCamp,
    "Problem Areas": collectedPoints
};
var blountLayers = {
    "Weather": weather,
    "Trails": blountTrails,
    "Restrooms": blountCluster,
    "Ranger Stations": blountRangerStation,
    "Picnic Areas": blountPicnic,
    "Horse and Hiker Campsites": blountHHCamp,
    "Hiker Only Campsite": blountCamp,
    "Water-access Only Campsite": blountWCamp,
    "Problem Areas": collectedPoints
};
var cockeLayers = {
    "Weather": weather,
    "Trails": cockeTrails,
    "Restrooms": cockeCluster,
    "Ranger Stations": cockeRangerStation,
    "Picnic Areas": cockePicnic,
    "Horse and Hiker Campsites": cockeHHCamp,
    "Hiker Only Campsite": cockeCamp,
    "Water-access Only Campsite": cockeWCamp,
    "Problem Areas": collectedPoints
};
var haywoodLayers = {
    "Weather": weather,
    "Trails": haywoodTrails,
    "Restrooms": haywoodCluster,
    "Ranger Stations": haywoodRangerStation,
    "Picnic Areas": haywoodPicnic,
    "Horse and Hiker Campsites": haywoodHHCamp,
    "Hiker Only Campsite": haywoodCamp,
    "Water-access Only Campsite": haywoodWCamp,
    "Problem Areas": collectedPoints
};
var sevierLayers = {
    "Weather": weather,
    "Trails": sevierTrails,
    "Restrooms": sevierCluster,
    "Ranger Stations": sevierRangerStation,
    "Picnic Areas": sevierPicnic,
    "Horse and Hiker Campsites": sevierHHCamp,
    "Hiker Only Campsite": sevierCamp,
    "Water-access Only Campsite": sevierWCamp,
    "Problem Areas": collectedPoints
};
var swainLayers = {
    "Weather": weather,
    "Trails": swainTrails,
    "Restrooms": swainCluster,
    "Ranger Stations": swainRangerStation,
    "Picnic Areas": swainPicnic,
    "Horse and Hiker Campsites": swainHHCamp,
    "Hiker Only Campsite": swainCamp,
    "Water-access Only Campsite": swainWCamp,
    "Problem Areas": collectedPoints
};
//Add the base maps to the map so the user can decide
var initialLayerControl = L.control.layers(null, baseLayers).addTo(map);
var blountLayerControl = L.control.layers(null, blountLayers);
var cockeLayerControl = L.control.layers(null, cockeLayers);
var haywoodLayerControl = L.control.layers(null, haywoodLayers);
var sevierLayerControl = L.control.layers(null, sevierLayers);
var swainLayerControl = L.control.layers(null, swainLayers);

//Add a button to find a user's location and display it on the map
L.control.locate({icon: 'fas fa-map-marker-alt fa-lg'}).addTo(map);

//Create a search window
var searchControl = new L.Control.Search(
    {layer: trails,
    propertyName: 'trailname',
    zoom: 14,
    textErr: 'Trail does not exist',
    textPlaceholder: 'Search for trail...',
    marker: false,
    animate: false});
searchControl.on('search:locationfound', function(e){
    e.layer.setStyle({color: 'yellow', weight: 3});
    if (e.layer._popup)
        e.layer.openPopup();
}).on('search_collapsed', function(e){
    featureLayer.eachLayer(function(layer){
        featureLayer.resetStyle(layer);
    });
});
map.addControl(searchControl);

//Function to remove layers
function removeLayers(){
    if (map.hasLayer(blountTrails) || map.hasLayer(trails)){
        map.removeLayer(blountCamp);
        map.removeLayer(blountHHCamp);
        map.removeLayer(blountPicnic);
        map.removeLayer(blountRangerStation);
        map.removeLayer(blountCluster);
        map.removeLayer(blountTrails);
        map.removeLayer(blountWCamp);
        map.removeLayer(camp);
        map.removeLayer(hhCamp);
        map.removeLayer(picnic);
        map.removeLayer(rangerStation);
        map.removeLayer(cluster);
        map.removeLayer(trails);
        map.removeLayer(wCamp);
        blountLayerControl.remove(map);
        initialLayerControl.remove(map);
    } else if (map.hasLayer(cockeTrails) || map.hasLayer(trails)){
        map.removeLayer(cockeCamp);
        map.removeLayer(cockeHHCamp);
        map.removeLayer(cockePicnic);
        map.removeLayer(cockeRangerStation);
        map.removeLayer(cockeRestrooms);
        map.removeLayer(cockeTrails);
        map.removeLayer(cockeWCamp);
        map.removeLayer(camp);
        map.removeLayer(hhCamp);
        map.removeLayer(picnic);
        map.removeLayer(rangerStation);
        map.removeLayer(restrooms);
        map.removeLayer(trails);
        map.removeLayer(wCamp);
        cockeLayerControl.remove(map);
        initialLayerControl.remove(map);
    } else if (map.hasLayer(haywoodTrails) || map.hasLayer(trails)){
        map.removeLayer(haywoodCamp);
        map.removeLayer(haywoodHHCamp);
        map.removeLayer(haywoodPicnic);
        map.removeLayer(haywoodRangerStation);
        map.removeLayer(haywoodRestrooms);
        map.removeLayer(haywoodTrails);
        map.removeLayer(haywoodWCamp);
        map.removeLayer(camp);
        map.removeLayer(hhCamp);
        map.removeLayer(picnic);
        map.removeLayer(rangerStation);
        map.removeLayer(restrooms);
        map.removeLayer(trails);
        map.removeLayer(wCamp);
        haywoodLayerControl.remove(map);
        initialLayerControl.remove(map);
    } else if (map.hasLayer(sevierTrails) || map.hasLayer(trails)){
        map.removeLayer(sevierCamp);
        map.removeLayer(sevierHHCamp);
        map.removeLayer(sevierPicnic);
        map.removeLayer(sevierRangerStation);
        map.removeLayer(sevierRestrooms);
        map.removeLayer(sevierTrails);
        map.removeLayer(sevierWCamp);
        map.removeLayer(camp);
        map.removeLayer(hhCamp);
        map.removeLayer(picnic);
        map.removeLayer(rangerStation);
        map.removeLayer(restrooms);
        map.removeLayer(trails);
        map.removeLayer(wCamp);
        sevierLayerControl.remove(map);
        initialLayerControl.remove(map);
    } else if (map.hasLayer(swainTrails) || map.hasLayer(trails)){
        map.removeLayer(swainCamp);
        map.removeLayer(swainHHCamp);
        map.removeLayer(swainPicnic);
        map.removeLayer(swainRangerStation);
        map.removeLayer(swainRestrooms);
        map.removeLayer(swainTrails);
        map.removeLayer(swainWCamp);
        map.removeLayer(camp);
        map.removeLayer(hhCamp);
        map.removeLayer(picnic);
        map.removeLayer(rangerStation);
        map.removeLayer(restrooms);
        map.removeLayer(trails);
        map.removeLayer(wCamp);
        swainLayerControl.remove(map);
        initialLayerControl.remove(map);
    }
}

$(".btn-blount").on("click", function(){
    removeLayers();
    blountLayerControl.addTo(map);
    map.addLayer(blountTrails);
});

$(".btn-cocke").on("click", function(){
    removeLayers();
    cockeLayerControl.addTo(map);
    map.addLayer(cockeTrails);
});

$(".btn-haywood").on("click", function(){
    removeLayers();
    haywoodLayerControl.addTo(map);
    map.addLayer(haywoodTrails);
});

$(".btn-sevier").on("click", function(){
    removeLayers();
    sevierLayerControl.addTo(map);
    map.addLayer(sevierTrails);
});

$(".btn-swain").on("click", function(){
    removeLayers();
    swainLayerControl.addTo(map);
    map.addLayer(swainTrails);
});

$(".btn-reset").on("click", function(){
    removeLayers();
    initialLayerControl.addTo(map);
    map.addLayer(trails);
});


//Create a function that will refresh the entered data before putting it on the map
function refresh(){
    // //Icon to represent the reported problem
    // var problemIcon = L.icon({
    //     iconUrl: "img/problem.png",
    //     iconSize: [30,30]
    // });

    // //Create the features that the users will enter
    // var collectedPoints = L.geoJson(null,{
    //     pointToLayer: function(feature, latlng){
    //         return L.marker(latlng, {
    //             icon: problemIcon
    //         });
    //     },
    //     onEachFeature: function (feature, layer){
    //         var popupText = "Location Name: " +feature.properties.location +
    //         "<br>Description of Problem: " +feature.properties.description +
    //         "<br>Date of Problem: " +feature.properties.created_at; 
    //         layer.bindPopup(popupText);
    //     }
    // }).addTo(map);
    // //Create the SQL query
    // var sqlQuery = "SELECT * FROM grsm_collected_data";
    // //Get username in order to execute the query
    // var sql = new cartodb.SQL({user: 'brbadger'});
    // sql.execute(sqlQuery, null, {format: "geojson"}).done(function(data){
    //     collectedPoints.addData(data);
    // });
    if (map.hasLayer(collectedPoints)){
        map.removeLayer(collectedPoints);
    };
    map.addLayer(collectedPoints);
};

//Create the Draw control for the draw tools and toolbox
var drawControl = new L.Control.Draw({
    draw: {
        polygon: false,
        polyine: false,
        rectangle: false,
        circle: false
    },
    edit: false,
    remove: false
});

//Variable to control visiblity of entered data
var controlOnMap = false;

//Variable for the Leaflet.draw features
var drawItems = new L.FeatureGroup();

//Function to start editing
function startEditing(){
    if (controlOnMap == true){
        map.removeControl(drawControl);
        controlOnMap = false;
    }
    map.addControl(drawControl);
    controlOnMap = true;
};

//Function to end editing
function endEditing(){
    map.removeControl(drawControl);
    controlOnMap = false;
    refresh();
};

//Function when feature is drawn on map
map.on("draw:created", function(e){
    var layer = e.layer;
    drawItems.addLayer(layer);
    map.addLayer(drawItems);
    dialog.dialog("open");
});

//Create a jQuery UI dialog box
var dialog = $("#form").dialog({
    autoOpen: false,
    height: 350,
    width: 250,
    modal: true,
    position:{
        my: "center center",
        at: "center center",
        of: "#map"
    },
    buttons:{
        "Submit": setData,
        Cancel: function(){
            dialog.dialog("close");
            map.removeLayer(drawItems);
        }
    },
    close: function (){
        form[0].reset();
        console.log("Dialog has successfully closed");
    }
});

//Function to prevent an empty submission
var form = dialog.find("form").on("submit", function(event){
    event.preventDefault();
});

//Function to enter data into the database
function setData(){
    var enteredUsername = username.value;
    var enteredDescription = description.value;
    var enteredLocation = loc.value;
    var enteredDate = date.value;
    console.log(enteredLocation);
    drawItems.eachLayer(function (layer){
        var postSQL = "INSERT INTO grsm_collected_data (the_geom, location, description, latitude, longitude, created_at, name) VALUES (ST_SetSRID(ST_GeomFromGeoJSON('";
        var a = layer.getLatLng();
        var postSQL2 = '{"type":"Point", "coordinates":[' + a.lng + "," + a.lat + "]}'),4326),'" + enteredLocation + "','" + enteredDescription +"','"+a.lat+"','"+a.lng+"','"+enteredDate+"','"+enteredUsername+"')";
        console.log(postSQL2);
        var pURL = postSQL + postSQL2;
        $.post("https://brbadger.carto.com/api/v2/sql?q=" + pURL + "&api_key=33f541577cddb55c4781b1ed07bd4c9a4a36ed4c")
    });
    map.removeLayer(drawItems);
    drawItems = new L.FeatureGroup();
    console.log("drawItems has been cleared");
    dialog.dialog("close");
};