const TiMap = require('ti.map'),
    STACHUS = [48.14, 11.5652],
    abx = require('com.alcoapps.actionbarextras'),
    RouteModule = require('/control/geojsonroutes');
var t = new Date().getTime();
function Log(foo) {
	if ( typeof foo == 'object')
		foo = JSON.stringify(foo);
	console.log((new Date().getTime() - t) + '   ' + foo);
	t = new Date().getTime();
}

var mock = false;

(function() {

	var $ = Ti.UI.createWindow({
		exitOnClose : true,
		geolocation : false
	});
	var focused = false;

	$.mapView = TiMap.createView({
		userLocationButton : true,
		userLocation : false, //Ti.Geolocation.locationServicesEnabled ? true : false,
		region : {
			latitude : STACHUS[0],
			longitude : STACHUS[1],
			zoom : 10
		},
		mapType : TiMap.NORMAL_TYPE,
		mapToolbarEnabled : false,
		style : Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "data", "mapstyle.json").read().getText(),
		routes : {},
		lifecycleContainer : $,
		enableZoomControls : false
	});
	//$.hintView = require('hintview')();
	$.add($.mapView);
	//$.add($.hintView);

	var Routes = new RouteModule();
	const URLS = ["https://www.munichways.com/App/radlvorrangnetz.geojson", "https://www.munichways.com/App/gesamtnetz.geojson"]
	URLS.forEach(function(url) {
		Routes.getPolylines(TiMap, url, function(polylines) {
			$.mapView.addPolylines(polylines);
		});

	});

	$.addEventListener('open', require('onOpen'));

	$.radPin = TiMap.createAnnotation({
		image : '/images/rad.png',
		latitude : STACHUS[0],
		longitude : STACHUS[1]
	});

	$.mapView.addEventListener('complete', function() {
		$.mapView.addAnnotation($.radPin);
	});
	$.addEventListener('focus', function() {
		focused = true;
		if ($.geolocation) {

		}

	});
	$.addEventListener('blur', function() {
		focused = false;

	});

	$.open();
})();

