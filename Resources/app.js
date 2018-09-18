const TiMap = require('ti.map'),
    STACHUS = [48.14, 11.5652],
    abx = require('com.alcoapps.actionbarextras'),
    RouteModule = require('/control/routes');
var t = new Date().getTime();
function Log(foo) {
	if ( typeof foo == 'object')
		foo = JSON.stringify(foo);
	console.log((new Date().getTime() - t) + '   ' + foo);
	t = new Date().getTime();
}

(function() {
	var $ = Ti.UI.createWindow({
		exitOnClose : true
	});

	$.mapView = TiMap.createView({
		userLocationButton : false,
		userLocation : false, //Ti.Geolocation.locationServicesEnabled ? true : false,
		region : {
			latitude : STACHUS[0],
			longitude : STACHUS[1],
			longitudeDelta : 0.05,
			latitudeDelta : 0.05
		},
		mapType : TiMap.NORMAL_TYPE,
		mapToolbarEnabled : false,
		style : Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "data", "mapstyle.json").read().getText(),
		routes : {},
		lifecycleContainer : $,
		enableZoomControls : false
	});
	Log($.mapView.region);

	$.hintView = require('hintview')();
	Log('map');
	$.add($.mapView);
	Log('hint');
	$.add($.hintView);

	$.onLocationChanged = function(e) {
		var coords = e.coords;
		if (!coords) {
			return;
		}
		const R = 0.05;
		if (coords.latitude > 53.0) {// Mock in HH to Stachus
			coords.latitude = STACHUS[0] + Math.random() * R - R / 2;
			coords.longitude = STACHUS[1] + Math.random() * R - R / 2;
		}
		$.radPin.latitude = coords.latitude;
		$.radPin.longitude = coords.longitude;

		$.mapView.setLocation({
			animate : true,
			latitudeDelta : $.mapView.getRegion().latitudeDelta,
			longitudeDelta : $.mapView.getRegion().longitudeDelta,
			latitude : coords.latitude,
			longitude : coords.longitude
		});
		var nearestRoute = Routes.getNearestRoute(coords);
		$.hintView.disableDetails();
		$.hintView.hintText.setText(nearestRoute.name + ' (' + Math.round(nearestRoute.distance) + 'm)');
		if (nearestRoute.distance < 500) {
			$.hintView.showHint();
		} else
			$.hintView.hideHint();
		Routes.selectRoute(nearestRoute.id);
		if (nearestRoute.description != null) {
			$.hintView.enableDetails(nearestRoute.description);
		} else {
			$.hintView.disableDetails();

		}
	};

	var Routes = new RouteModule();
	Routes.addAllToMap($.mapView);

	$.addEventListener('open', require('onOpen'));

	$.radPin = TiMap.createAnnotation({
		image : '/images/rad.png',
		latitude : STACHUS[0],
		longitude : STACHUS[1]
	});

	$.mapView.addEventListener('complete', function() {
		require('control/calendar')();
		$.mapView.addAnnotation($.radPin);
	});
	$.open();

})();

