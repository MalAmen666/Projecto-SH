var map;
function init()
{
map = new GMaps({
div: '#map',
lat: -12.043333,
lng: -77.028333

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
        title: 'New marker'
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

}
window.onload = init;
