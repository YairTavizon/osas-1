var markers = [];
var infoWindowSet;
var intervalo;
var timeUpdate = 1000; //10 segundos 
var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h4 id="firstHeading" class="firstHeading">Estas Aquí</h4>'+
      '</div>'+
      '</div>';

function initMap() {
  var lat = 20.097993;
  var lng = -98.766636;
  var center = {lat: lat, lng: lng };
  var map = new google.maps.Map(document.getElementById('map-tracking'), {
      zoom: 18,
      center: center,
      scrollwheel: true
  });

  petitionGeolocation(map, new google.maps.InfoWindow)

  
  intervalo = setInterval(() => {
    petitionGeolocation(map, new google.maps.InfoWindow)}, 
    timeUpdate); //clearInterval(intervalo); 
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
/*
      if(infoWindowSet){
        //google.maps.event.clearInstanceListeners(infoWindowSet);  // just in case handlers continue to stick around
        infoWindowSet.close();
        infoWindowSet = null; 
      }
      infoWindowSet = infoWindow
      infoWindow.setPosition(pos);      
      infoWindow.setContent(contentString);
      infoWindow.open(map);
*/
      map.setCenter(pos);
      deleteMarkers()
      addMarker(pos, map);
      //Enviar una notificación por Socket.IO
      sendPosition(pos)
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
    map: map,
    icon: 'https://res.cloudinary.com/doppy/image/upload/c_scale,h_40,w_40/v1551677677/doppy/maps/bus.png',
    title: 'Condutor'
  });
  map.panTo(latLng);
  markers.push(marker);
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
  markers = [];
}