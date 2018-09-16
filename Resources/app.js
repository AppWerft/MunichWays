var Map = require('ti.map');
const abx = require('com.alcoapps.actionbarextras');

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

const routes = [{
	file : 'A_gelb_rot_schwarz_Vorrangstrecken',
	color : 'red'
}, {
	file : 'A_grun_Vorrangnetz',
	color : 'green'

}, {
	file : 'C_Hauptrouten',
	color : 'orange'

}, {
	file : 'A_Radlring_Altstadt',
	color : '#00aa00'

}, {
	file : 'D_grun_Gesamtnetz',
	color : '#00aaaa'

}, {
	file : 'D_schwarz_Gesamtnetz',
	color : 'blue'

}];

routes.forEach(function(item) {
	const GEO = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "data", "geojson", item.file + ".geojson").read().getText());

	GEO.features.forEach(function(f) {
		const points = f.geometry.coordinates.map(function(c) {
			return {
				latitude : c[1],
				longitude : c[0]
			};
		});
		if (points.length > 1)
			$.mapView.addRoute(Map.createRoute({
				points : points,
				color : item.color,
				width : 8
			}));
	});
});

$.activity.onCreateOptionsMenu = function(e) {
	abx.backgroundColor = 'rgb(51, 153, 255)';
	abx.subtitle = "Radlwege in München";
	abx.statusbarColor = 'rgb(26, 77, 127)';
	var menu = e.menu;
	menuItem = menu.add({
		title : 'Kalender',
		icon : '/calendar.png',
		showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM | Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW
	});
};
var onCalendarload = function(cal) {
	console.log(cal);
};
require('getCalendar')(onCalendarload);

$.open();
