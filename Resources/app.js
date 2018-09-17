const Map = require('ti.map'),
    abx = require('com.alcoapps.actionbarextras');
    RouteModule =require('/control/routes');

var $ = Ti.UI.createWindow({
	exitOnClose : true
});

$.mapView = Map.createView({
	userLocation : false, //Ti.Geolocation.locationServicesEnabled ? true : false,
	region : {
		latitude : 48.1247925,
		longitude : 11.5583832,
		longitudeDelta : 0.05,
		latitudeDelta : 0.05
	},
	mapType : Map.NORMAL_TYPE,
	mapToolbarEnabled : false,
	style : Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "data", "mapstyle.json").read().getText(),
	routes : {},
	lifecycleContainer : $,
	enableZoomControls : false
});
$.add($.mapView);

function onLocationChanged(e) {
	if(!coords) return;
	var coords = e.coords;
	const R = 0.05;
	if(coords.latitude>53.0) { // Mock in HH to Stachus
		coords.latitude= 48.1490796 + Math.random()*R-R/2;
		coords.longitude= 11.4587669+ Math.random()*R-R/2;
	}
	const region = $.mapView.getRegion();
	$.mapView.setLocation({
		animate : true,
		latitudeDelta : region.latitudeDelta,
		longitudeDelta : region.longitudeDelta,
		latitude : coords.latitude,
		longitude : coords.longitude
	});
}


var Routes = new RouteModule();
Routes.addAllToMap($.mapView); 


$.activity.onCreateOptionsMenu = function(e) {
	abx.backgroundColor = 'rgb(51, 153, 255)';
	abx.subtitle = "Radlwege in München";
	abx.statusbarColor = 'rgb(26, 77, 127)';
	var menu = e.menu;
	const menuItem = menu.add({
		title : 'Kalender',
		icon : '/calendar.png',
		showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM | Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW
	});
	menuItem.addEventListener('click', require('/calendar.window'));
	require('libs/checkPermissions')(['ACCESS_FINE_LOCATION'], {
		onOK : function(e) {
			Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
			Ti.Geolocation.distanceFilter = 20;
			Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
			Ti.Geolocation.addEventListener('location', onLocationChanged);
			$.mapView.userLocation = true;
		},
		onError : function() {
			alert('So, im Falle der Verweigerung funktioniert die App nicht. Schade.');
		}
	});
	$.addEventListener('close', onLocationChanged);
	require('control/calendar')();
};
$.open();
