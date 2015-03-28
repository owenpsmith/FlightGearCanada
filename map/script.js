
var locations = [];
var markers   = [];
var markerIcons = new Map();

var authorIcon;
var userIcon;
var airportIcon;
var enhancedIcon;
var sceneryIcon;

var map;

function initMap()
{
	var mapOut = document.getElementById('map');

    // create map
	var mapOptions =
    {
	  center: new google.maps.LatLng(58.0809443, -97.3183594),
	  zoom: 4
	};

    map = new google.maps.Map(mapOut, mapOptions);

    // initialize marker icons
    markerIcons.set("developer",       new google.maps.MarkerImage("markers/developer.png"));
    markerIcons.set("user",            new google.maps.MarkerImage("markers/user.png")     );
    markerIcons.set("enhancedAirport", new google.maps.MarkerImage("markers/enhancedAirport.png")  );
    markerIcons.set("favoriteAirport", new google.maps.MarkerImage("markers/favoriteAirport.png") );
    markerIcons.set("enhancedScenery", new google.maps.MarkerImage("markers/enhancedScenery.png")  );

    // add markers top map
	$.each(locations, function(key, thisLocation)
	{
        var marker = new google.maps.Marker(
        {
            position: new google.maps.LatLng(thisLocation.lat, thisLocation.lon),
            map: map,
            title: thisLocation.name,
            icon: markerIcons.get(thisLocation.marker)
        });

        markers.push(marker);
    });

    $('#map').show();
    $('#legendContainer').show();
}

var dataLoadedCallback = function()
{
	// initialize map
    initMap();
};


function loadLocations(dataLoadedCallback)
{
	// load aircraft data
	$.getJSON( "locations.json", function(locationData)
	{
		locations = locationData.locations;

		dataLoadedCallback();
	});
}



$(document).ready( function()
{
	$('#noJS').hide();


	// load marker data
    loadLocations(dataLoadedCallback);
});

