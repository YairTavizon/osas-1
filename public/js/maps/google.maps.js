var markers = [];

function initMap() {
  var lat = 20.097993;
  var lng =  -98.766636;
  var center = {lat: lat, lng: lng };
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: center,
      scrollwheel: true
  });


  map.addListener('click', function(e) {
    deleteMarkers()
    addMarker(e.latLng, map);
  });

  petitionGeolocation(map, new google.maps.InfoWindow);
}

//Make petition for know your current position
function petitionGeolocation(map, infoWindow){
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('¡Aqui estas!');
      infoWindow.open(map);
      map.setCenter(pos);
      addMarker(pos, map);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

//Handler when petion is rejected
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

//Add a new marker at position
function addMarker(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  map.panTo(latLng);
  if(!isFunction(latLng.lat))
    document.getElementsByClassName('mapsHolder')[0].value= "(" + latLng.lat  + ", " + latLng.lng + ")";
  else
    document.getElementsByClassName('mapsHolder')[0].value=latLng;
  markers.push(marker);
}

function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  document.getElementsByClassName('mapsHolder')[0].value='';
  markers = [];
}