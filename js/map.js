const url = "https://www.trackcorona.live/api/countries";

var map;
var markers = [];
var infoWindow;

async function initMap() {

    try {
        var indonesia = {
            lat: -0.789275,
            lng: 113.921327,
        }
    
        map = new google.maps.Map(
            document.getElementById('map'), {
                center: indonesia,
                zoom: 5,
                mapTypeId: 'roadmap',
                styles: [
                    {
                    "elementType": "geometry",
                    "stylers": [
                        {
                        "color": "#1d2c4d"
                        }
                    ]
                    },
                    {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                        "color": "#8ec3b9"
                        }
                    ]
                    },
                    {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                        "color": "#1a3646"
                        }
                    ]
                    },
                    {
                    "featureType": "administrative.country",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                        "color": "#4b6878"
                        }
                    ]
                    },
                    {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                        "color": "#64779e"
                        }
                    ]
                    },
                    {
                    "featureType": "administrative.province",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                        "color": "#4b6878"
                        }
                    ]
                    },
                    {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                        "color": "#334e87"
                        }
                    ]
                    },
                    {
                    "featureType": "landscape.natural",
                    "elementType": "geometry",
                    "stylers": [
                        {
                        "color": "#023e58"
                        }
                    ]
                    },
                    {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                        "color": "#283d6a"
                        }
                    ]
                    },
                    {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                        "color": "#6f9ba5"
                        }
                    ]
                    },
                    {
                    "featureType": "poi",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                        "color": "#1d2c4d"
                        }
                    ]
                    },
                    {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                        "color": "#023e58"
                        }
                    ]
                    },
                    {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                        "color": "#3C7680"
                        }
                    ]
                    },
                    {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                        "color": "#304a7d"
                        }
                    ]
                    },
                    {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                        "color": "#98a5be"
                        }
                    ]
                    },
                    {
                    "featureType": "road",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                        "color": "#1d2c4d"
                        }
                    ]
                    },
                    {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                        "color": "#2c6675"
                        }
                    ]
                    },
                    {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                        "color": "#255763"
                        }
                    ]
                    },
                    {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                        "color": "#b0d5ce"
                        }
                    ]
                    },
                    {
                    "featureType": "road.highway",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                        "color": "#023e58"
                        }
                    ]
                    },
                    {
                    "featureType": "transit",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                        "color": "#98a5be"
                        }
                    ]
                    },
                    {
                    "featureType": "transit",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                        "color": "#1d2c4d"
                        }
                    ]
                    },
                    {
                    "featureType": "transit.line",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                        "color": "#283d6a"
                        }
                    ]
                    },
                    {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                        {
                        "color": "#3a4762"
                        }
                    ]
                    },
                    {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                        "color": "#0e1626"
                        }
                    ]
                    },
                    {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                        "color": "#4e6d70"
                        }
                    ]
                    }
                ]
        });
  
        const { data : {data} } = await axios.get(url);
                
        infoWindow = new google.maps.InfoWindow();

        showCountriesMarkers(data);
    } catch (error) {
        console.log(error);
    }
}

function showCountriesMarkers(datas) {
    var bounds = new google.maps.LatLngBounds();

    for(var [index, data] of datas.entries()){
        var latlng = new google.maps.LatLng(
            data.latitude,
            data.longitude,
        );
        
        var location = data.location;
        var confirmed = data.confirmed;
        var recovered = data.recovered;
        var dead = data.dead;
        var lastUpdate = new Date(data.updated).toDateString();
        bounds.extend(latlng);
        createMarker(latlng, location, confirmed, recovered, dead, lastUpdate);
    }
}

function createMarker(latlng, location, confirmed, recovered, dead, lastUpdate) {
    var html = `
        <div class="country-window-container">
            <h2>${location}</h2>
            ${lastUpdate}
            <hr>
            <div class="row m-2">
                <div class="col-6 d-flex align-items-center p-0">
                    <div id="infected" class="circle">
                        <i class="fas fa-virus"></i>
                    </div>
                    <span class="info-title">Infected</span>
                </div>
                <div class="col-6 d-flex align-items-center p-0">
                    <span class="info-content">${confirmed}</span>
                </div>
            </div>
            
            <div class="row m-2">
                <div class="col-6 d-flex align-items-center p-0">
                    <div id="recovered" class="circle">
                        <i class="fas fa-briefcase-medical"></i>    
                    </div>
                    <span class="info-title">Recovered</span>
                </div>
                <div class="col-6 d-flex align-items-center p-0">
                    <span class="info-content">${recovered}</span>
                </div>
            </div>

            <div class="row m-2">
                <div class="col-6 d-flex align-items-center p-0">
                    <div id="death" class="circle">
                        <i class="fas fa-skull-crossbones"></i>
                    </div>
                    <span class="info-title">Death</span>
                </div>
                <div class="col-6 d-flex align-items-center p-0">
                    <span class="info-content">${dead}</span>
                </div>
            </div>
        </div>
    `;
    
    var markerIcon = "http://maps.google.com/mapfiles/kml/paddle/wht-circle.png";

    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        icon: markerIcon,
    });

    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);  
    });

    markers.push(marker);
}
