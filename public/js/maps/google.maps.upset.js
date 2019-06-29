var markers = [];

function initMap() {
  var center = {lat: lat, lng: lng };
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: center,
      scrollwheel: true
  });

  petitionGeolocation(map, new google.maps.InfoWindow, center);
}

//Make petition for know your current position
function petitionGeolocation(map, infoWindow, pos){
  infoWindow.setPosition(pos);
  infoWindow.setContent(titulo);
  infoWindow.open(map);
  map.setCenter(pos);
  addMarker(pos, map);
}

//Add a new marker at position
function addMarker(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  map.panTo(latLng);
  markers.push(marker);
}