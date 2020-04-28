const url = "https://www.trackcorona.live/api/countries";

var map;
var markers = [];
var infoWindow;
var isActive = false;

async function initMap() {

    try {
        var indonesia = {
            lat: -0.789275,
            lng: 113.921327,
        }
    
        map = new google.maps.Map(
            document.getElementById('map'), {
                center: indonesia,
                zoom: 4,
                mapTypeId: 'roadmap',
        });
    
        // var marker = new google.maps.Marker({
        //     position: indonesia,
        //     map: map,
        // });

        const { data : {data} } = await axios.get(url);
        console.log(data);
        
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
        // console.log(location + '\n' + confirmed + '\n' + recovered  + '\n' + dead  + '\n' + lastUpdate);
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
    
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
    });
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);  
    });
    markers.push(marker);
}
