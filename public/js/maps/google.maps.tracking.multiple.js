var marker, marker2;
var infoWindowSet, infoWindowSet2;
var intervalo;
var timeUpdate = 1000; //10 segundos 
var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h4 id="firstHeading" class="firstHeading">Estas Aquí</h4>'+
      '</div>'+
      '</div>';
var contentString2 = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h4 id="firstHeading" class="firstHeading">Alquien más</h4>'+
      '</div>'+
      '</div>';
var map;

var panToOnlyOne = true, panToBusOnlyOnce = true;

function initMap() {
  var lat = 20.097993;
  var lng = -98.766636;
  var center = {lat: lat, lng: lng };
  map = new google.maps.Map(document.getElementById('map-tracking'), {
      zoom: 15,
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
      infoWindow.setPosition(pos);      
      infoWindow.setContent(contentString);
      infoWindow.open(map);
      infoWindowSet = infoWindow
*/

      //map.setCenter(pos);
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
  var mark = new google.maps.Marker({
    position: latLng,
    animation: panToOnlyOne ? google.maps.Animation.DROP : google.maps.Animation.BOUNCE,
    map: map,
    icon: 'https://res.cloudinary.com/doppy/image/upload/c_scale,h_40,w_40/v1551677677/doppy/maps/panda.png',
    //label: {text: 'TÚ', color: "red", fontWeight: "bold"},
    title: 'Tú'
  });
  if(panToOnlyOne)
    map.panTo(latLng);
  panToOnlyOne = false
  marker = mark;
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    if(marker)
      marker.setMap(map);
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  marker = null;
}

/** Marker for Vehicule Location */
function setUpdateMarker(pos){

/*
    if(infoWindowSet2){
      //google.maps.event.clearInstanceListeners(infoWindowSet);  // just in case handlers continue to stick around
      infoWindowSet2.close();
      infoWindowSet2 = null;
    }
    let infoWindow = new google.maps.InfoWindow;
    infoWindow.setPosition(pos);      
    infoWindow.setContent(contentString2);
    infoWindow.open(map);
    infoWindowSet2 = infoWindow
*/

    //map.setCenter(pos);
    deleteUpdateMarkers()
    addUpdateMarker(pos, map);
    //Enviar una notificación por Socket.IO
    sendPosition(pos)
}

function addUpdateMarker(latLng, map) {
  var mark = new google.maps.Marker({
    position: latLng,
    map: map,
    animation: panToBusOnlyOnce ? google.maps.Animation.DROP : null,
    icon: 'https://res.cloudinary.com/doppy/image/upload/c_scale,h_40,w_40/v1551677677/doppy/maps/bus.png',
    //label: {text: 'BUS', color: "red"},
    title: 'Alguien Más'
  });
  panToBusOnlyOnce = false;
  //map.panTo(latLng);
  marker2 = mark;
  //marker2.push(mark);
}

function deleteUpdateMarkers() {
  
  if(marker2)
    marker2.setMap(null);
  marker2 = null;
  /*
  if(marker2.length > 0){
    marker2 = [];
  }
  */
}