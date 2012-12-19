var map;
var markersArray = [];

function init(position)
{

map = new GMaps({
div: '#map',
lat: -12.043333,
lng: -77.028333,
click: function(e) {
	//alert('click');
	markersArray.push(map.addMarker({
		lat: e.latLng.lat(),
		lng: e.latLng.lng()
	}));
}
});

$('#geocoding_form').submit(function(e){
e.preventDefault();
	GMaps.geocode({
		address: $('#address').val().trim(),
		callback: function(results, status){
		if(status=='OK'){
		var latlng = results[0].geometry.location;
		map.setCenter(latlng.lat(), latlng.lng());
		map.addMarker({
		lat: latlng.lat(),
		lng: latlng.lng()
		});
	}
		}
	});
}); 

map.setContextMenu({
  control: 'map',
  options: [{
    title: 'Add marker',
    name: 'add_marker',
    action: function(e) {
      this.addMarker({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        title: 'New marker',
	raiseOnDrag: true 
      });
    }
  }, {
    title: 'Center here',
    name: 'center_here',
    action: function(e) {
      this.setCenter(e.latLng.lat(), e.latLng.lng());
    }
  }]
});
//
//geolocalização
GMaps.geolocate({
  success: function(position) {
    map.setCenter(position.coords.latitude, position.coords.longitude);
    map.addMarker({
		lat: position.coords.latitude, 
		lng: position.coords.longitude
		});
  },
  error: function(error) {
    alert('Geolocation failed: '+error.message);
  },
  not_supported: function() {
    alert("Your browser does not support geolocation");
  },
  always: function() {
	map.setZoom(8);
  }
});

infoWindow = new google.maps.InfoWindow({});
map.loadFromKML({
  url: 'http://firms.modaps.eosdis.nasa.gov/active_fire/kml/Europe_24h.kml',
  suppressInfoWindows: true,
  events: {
    click: function(point){
      infoWindow.setContent(point.featureData.infoWindowHtml);
      infoWindow.setPosition(point.latLng);
      infoWindow.open(map.map);
    }
  }
});

map.addControl({
  position: 'top_right',
  content: 'Onde estou?',
  style: {
    margin: '5px',
    padding: '1px 6px',
    border: 'solid 1px #717B87',
    background: '#fff'
  },
  events: {
    click: function(){
     	geolocate(); 
    }
  }
});
}

window.onload = init;
/*[38.726367,-9.149737]
 * [38.712572,-9.138322]
 * */
function calcRoute() {

var originLat = markersArray[0].getPosition().lat();
var originLng = markersArray[0].getPosition().lng();

var destLat = markersArray[1].getPosition().lat();
var destLng = markersArray[1].getPosition().lng();

map.drawRoute({
  origin:[originLat, originLng],
  destination:[destLat, destLng],
  travelMode: 'driving',
  strokeColor: '#131540',
  strokeOpacity: 0.6,
  strokeWeight: 6
});

map.travelRoute({
  origin:[38.726367,-9.149737], 
  destination:[38.712572,-9.138322], 
  travelMode: 'driving',
  step: function(e) {
    $('#instructions').append('<li>'+e.instructions+'</li>');
    $('#instructions li:eq(' + e.step_number + ')').delay(450 * e.step_number).fadeIn(200, function() {
      map.drawPolyline({
        path: e.path,
        strokeColor: '#131540',
        strokeOpacity: 0.6,
        strokeWeight: 6
      });  
    });
  }
});
    
}

function showMarkers(){
var lang = markersArray[0].getPosition().lat();
	alert(lang);
}

function geolocate() {

GMaps.geolocate({
  success: function(position) {
    map.setCenter(position.coords.latitude, position.coords.longitude);
    markersArray[0] = map.addMarker({
		lat: position.coords.latitude, 
		lng: position.coords.longitude
		});
  },
  error: function(error) {
    alert('Geolocation failed: '+error.message);
  },
  not_supported: function() {
    alert("Your browser does not support geolocation");
  },
  always: function() {
	map.setZoom(8);
  }
});
}

function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
    this.markersArray = new Array();
  
}

function showFireDepartment(){
	map.loadFromKML({
  url: 'https://dl.dropbox.com/u/4430993/bombeiros2.kml',
  suppressInfoWindows: false,
  events: {
    click: function(point){
      infoWindow.setContent(point.featureData.infoWindowHtml);
      infoWindow.setPosition(point.latLng);
      infoWindow.open(map.map);
    }
  }
});
}

function showHospital(){
	map.loadFromKML({
  url: 'https://dl.dropbox.com/u/4430993/hospitais.kml',
  suppressInfoWindows: false,
  events: {
    click: function(point){
      infoWindow.setContent(point.featureData.infoWindowHtml);
      infoWindow.setPosition(point.latLng);
      infoWindow.open(map.map);
    }
  }
});
}
