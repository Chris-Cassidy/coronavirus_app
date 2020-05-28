const url = "https://corona.lmao.ninja/v2/countries";
const dailyDataUrl = "https://covid19.mathdro.id/api/daily";

window.onload = () => {
    getCountryData();
}

var map;
var infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 38, lng: -97},
        zoom: 4,
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

    infoWindow = new google.maps.InfoWindow();
}

const getCountryData = () => {
    fetch(url)
    .then((response) => {
        return response.json();
    }).then((data) => {
        showDataOnMap(data);
        showDataInTable(data);
        // showDataInChart();
    });
}

const showDataOnMap = (data) => {
    var string = numeral(1000).format('0,0');
    
    data.map((country) => {
        let countryCenter = {
            lat: country.countryInfo.lat, 
            lng: country.countryInfo.long,
        }

        var countryCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: countryCenter,
            radius: country.casesPerOneMillion * 15
        });
        
        // var html = `
        //     <div class="info-container">
        //         <div class="info-flag" style="background-image: url(${country.countryInfo.flag});">
        //         </div>
        //         <div class="info-name">                
        //             ${country.country}
        //         </div>
        //         <div class="info-confirmed">
        //             Total : ${country.cases}
        //         </div>
        //         <div class="info-recovered">
        //             Recovered : ${country.recovered}
        //         </div>
        //         <div class="info-deaths">
        //             Deaths : ${country.deaths}
        //         </div>
        //     </div>
        // `;
        var date = new Date(country.updated).toDateString();

        var html = `
            <div class="country-window-container">
                <div class="row d-flex align-items-center">
                    <div class="col-8">
                        <h2>${country.country}</h2>
                        ${date}                
                    </div>    
                    <div class="col-4">
                        <div class="info-flag" style="background-image: url(${country.countryInfo.flag});"></div>
                    </div>                
                </div>
                <hr>
                <div class="row m-2">
                    <div class="col-6 d-flex align-items-center p-0">
                        <div id="infected" class="circle">
                            <i class="fas fa-virus"></i>
                        </div>
                        <span class="info-title">Infected</span>
                    </div>
                    <div class="col-6 d-flex align-items-center p-0">
                        <span class="info-content">${formatNumber(country.cases)}</span>
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
                        <span class="info-content">${formatNumber(country.recovered)}</span>
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
                        <span class="info-content">${formatNumber(country.deaths)}</span>
                    </div>
                </div>
            </div>
        `;

        var infoWindow = new google.maps.InfoWindow({
            content: html,
            position: countryCircle.center,
        });

        google.maps.event.addListener(countryCircle, 'mouseover', function() {
            infoWindow.open(map);
        });

        google.maps.event.addListener(countryCircle, 'mouseout', function() {
            infoWindow.close();
        });
    });

}

const showDataInTable = (data) => {
    var html = '';
    data.forEach((country) => {
        html += `
            <tr>
                <td>${country.country}</td>
                <td>${formatNumber(country.cases)}</td>
                <td>${formatNumber(country.recovered)}</td>
                <td>${formatNumber(country.deaths)}</td>
            </tr>
        `;
    })

    document.getElementById('table-data').innerHTML = html;
}

const showDataInChart = () => {

    fetch(dailyDataUrl)
    .then((response) => {
        return response.json();
    }).then((data) => {
        
        const chartData = data.map((data) => ({
            confirmed : data.confirmed.total,
            deaths : data.deaths.total,
            date : data.reportDate,
        }));

        let ctx = document.getElementById('corona-chart').getContext('2d');

        let coronaChart = new Chart(ctx, {
            type : 'line',
            data : {
                labels : chartData.map((data) => data.date),
                datasets : [{
                    data : chartData.map((data) => data.confirmed),
                    label : 'Infected',
                    borderColor : '#3333ff',
                    borderWidth : 2,
                    pointRadius : 1,
                    
                }, {
                    data : chartData.map((data) => data.deaths),
                    label : 'Deaths',
                    borderColor : 'rgb(204, 51, 0)',
                    backgroundColor : 'rgba(255, 0, 0, 0, 2.5)',
                    borderWidth : 2,
                    pointRadius : 1,
                }],
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            maxTicksLimit: 10
                        },
                        offset: false,
                    }]
                },
                title : {
                    display : true,
                    text : 'Coronavirus Daily Cases Line Chart',
                    fontSize : 25,
                },
                hover : {
                    mode : 'nearest'  ,
                    intersect : true,
                }
            }
        });
    });
}

function formatNumber(number) {
    return numeral(number).format('0,0');
} 
// const url = "https://corona.lmao.ninja/v2/countries";

// var map;
// var markers = [];
// var infoWindow;

// async function initMap() {

//     try {
//         var indonesia = {
//             lat: -5,
//             lng: 120,
//         }
    
//         map = new google.maps.Map(
//             document.getElementById('map'), {
//                 center: indonesia,
//                 zoom: 5,
//                 mapTypeId: 'roadmap',
//                 styles: [
//                     {
//                     "elementType": "geometry",
//                     "stylers": [
//                         {
//                         "color": "#1d2c4d"
//                         }
//                     ]
//                     },
//                     {
//                     "elementType": "labels.text.fill",
//                     "stylers": [
//                         {
//                         "color": "#8ec3b9"
//                         }
//                     ]
//                     },
//                     {
//                     "elementType": "labels.text.stroke",
//                     "stylers": [
//                         {
//                         "color": "#1a3646"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "administrative.country",
//                     "elementType": "geometry.stroke",
//                     "stylers": [
//                         {
//                         "color": "#4b6878"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "administrative.land_parcel",
//                     "elementType": "labels.text.fill",
//                     "stylers": [
//                         {
//                         "color": "#64779e"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "administrative.province",
//                     "elementType": "geometry.stroke",
//                     "stylers": [
//                         {
//                         "color": "#4b6878"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "landscape.man_made",
//                     "elementType": "geometry.stroke",
//                     "stylers": [
//                         {
//                         "color": "#334e87"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "landscape.natural",
//                     "elementType": "geometry",
//                     "stylers": [
//                         {
//                         "color": "#023e58"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "poi",
//                     "elementType": "geometry",
//                     "stylers": [
//                         {
//                         "color": "#283d6a"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "poi",
//                     "elementType": "labels.text.fill",
//                     "stylers": [
//                         {
//                         "color": "#6f9ba5"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "poi",
//                     "elementType": "labels.text.stroke",
//                     "stylers": [
//                         {
//                         "color": "#1d2c4d"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "poi.park",
//                     "elementType": "geometry.fill",
//                     "stylers": [
//                         {
//                         "color": "#023e58"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "poi.park",
//                     "elementType": "labels.text.fill",
//                     "stylers": [
//                         {
//                         "color": "#3C7680"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "road",
//                     "elementType": "geometry",
//                     "stylers": [
//                         {
//                         "color": "#304a7d"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "road",
//                     "elementType": "labels.text.fill",
//                     "stylers": [
//                         {
//                         "color": "#98a5be"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "road",
//                     "elementType": "labels.text.stroke",
//                     "stylers": [
//                         {
//                         "color": "#1d2c4d"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "road.highway",
//                     "elementType": "geometry",
//                     "stylers": [
//                         {
//                         "color": "#2c6675"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "road.highway",
//                     "elementType": "geometry.stroke",
//                     "stylers": [
//                         {
//                         "color": "#255763"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "road.highway",
//                     "elementType": "labels.text.fill",
//                     "stylers": [
//                         {
//                         "color": "#b0d5ce"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "road.highway",
//                     "elementType": "labels.text.stroke",
//                     "stylers": [
//                         {
//                         "color": "#023e58"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "transit",
//                     "elementType": "labels.text.fill",
//                     "stylers": [
//                         {
//                         "color": "#98a5be"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "transit",
//                     "elementType": "labels.text.stroke",
//                     "stylers": [
//                         {
//                         "color": "#1d2c4d"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "transit.line",
//                     "elementType": "geometry.fill",
//                     "stylers": [
//                         {
//                         "color": "#283d6a"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "transit.station",
//                     "elementType": "geometry",
//                     "stylers": [
//                         {
//                         "color": "#3a4762"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "water",
//                     "elementType": "geometry",
//                     "stylers": [
//                         {
//                         "color": "#0e1626"
//                         }
//                     ]
//                     },
//                     {
//                     "featureType": "water",
//                     "elementType": "labels.text.fill",
//                     "stylers": [
//                         {
//                         "color": "#4e6d70"
//                         }
//                     ]
//                     }
//                 ]
//         });
  
//         const { data } = await axios.get(url);
                
//         infoWindow = new google.maps.InfoWindow();

//         showCountriesMarkers(data);
//     } catch (error) {
//         console.log(error);
//     }
// }

// function showCountriesMarkers(data) {
//     var bounds = new google.maps.LatLngBounds();

//     for(var i = 0; i < data.length; i++) {
//         var latlng = new google.maps.LatLng(
//             data[i]['countryInfo']['lat'],
//             data[i]['countryInfo']['long'],
//         );
//         var location = data[i]['country'];
//         var confirmed = data[i]['cases'];
//         var recovered = data[i]['recovered'];
//         var dead = data[i]['deaths'];
//         var lastUpdate = new Date(data[i]['updated']).toDateString();
//         bounds.extend(latlng);
//         createMarker(latlng, location, confirmed, recovered, dead, lastUpdate);
//     }
// }

// function createMarker(latlng, location, confirmed, recovered, dead, lastUpdate) {
//     var html = `
//         <div class="country-window-container">
//             <h2>${location}</h2>
//             ${lastUpdate}
//             <hr>
//             <div class="row m-2">
//                 <div class="col-6 d-flex align-items-center p-0">
//                     <div id="infected" class="circle">
//                         <i class="fas fa-virus"></i>
//                     </div>
//                     <span class="info-title">Infected</span>
//                 </div>
//                 <div class="col-6 d-flex align-items-center p-0">
//                     <span class="info-content">${confirmed}</span>
//                 </div>
//             </div>
            
//             <div class="row m-2">
//                 <div class="col-6 d-flex align-items-center p-0">
//                     <div id="recovered" class="circle">
//                         <i class="fas fa-briefcase-medical"></i>    
//                     </div>
//                     <span class="info-title">Recovered</span>
//                 </div>
//                 <div class="col-6 d-flex align-items-center p-0">
//                     <span class="info-content">${recovered}</span>
//                 </div>
//             </div>

//             <div class="row m-2">
//                 <div class="col-6 d-flex align-items-center p-0">
//                     <div id="death" class="circle">
//                         <i class="fas fa-skull-crossbones"></i>
//                     </div>
//                     <span class="info-title">Death</span>
//                 </div>
//                 <div class="col-6 d-flex align-items-center p-0">
//                     <span class="info-content">${dead}</span>
//                 </div>
//             </div>
//         </div>
//     `;
    
//     var markerIcon = "http://maps.google.com/mapfiles/kml/paddle/wht-circle.png";

//     var marker = new google.maps.Marker({
//         map: map,
//         position: latlng,
//         icon: markerIcon,
//     });

//     google.maps.event.addListener(marker, 'click', function() {
//         infoWindow.setContent(html);
//         infoWindow.open(map, marker);  
//     });

//     // google.maps.event.addListener(marker, 'mouseout', function() {
//     //     // infoWindow.setContent(html);
//     //     // infoWindow.open(map, marker);  
//     //     infoWindow.close();
//     // });

//     markers.push(marker);
// }

