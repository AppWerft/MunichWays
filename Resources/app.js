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

const LAYERID = "6ddc01f1@9b6953ac45e3de3050693c3b1a21a83d:1570390392755";
const LHM = "https://cartocdn-gusc-c.global.ssl.fastly.net/usocialmaps/api/v1/map/usocialmaps@" + LAYERID + "/1,2,3,4,5/{z}/{x}/{y}.png";
const OPENPT = "http://openptmap.org/tiles/{z}/{x}/{y}.png";

var mock = false;

(function() {

const $ = Ti.UI.createWindow({
		exitOnClose : true,
		geolocation : false,
		_Polylines : []

	});

	var focused = false;
	$.addEventListener('open', require('onOpen'));
	$.open();
	$.mapView = TiMap.createView({
		userLocationButton : true,
		userLocation : Ti.Geolocation.locationServicesEnabled ? true : false,
		region : {
			latitude : STACHUS[0],
			longitude : STACHUS[1],
			zoom : 11
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
	const URLS = ["https://www.munichways.com/App/radlvorrangnetz.geojson", "https://www.munichways.com/App/gesamtnetz.geojson"];
	URLS.forEach(function(url) {
		Routes.getPolylines(TiMap, url, function(polylines) {
			$._Polylines.push(polylines);
			$.mapView.addPolylines(polylines);
		});

	});

	$.dummyPin = TiMap.createAnnotation({
		image : '/images/dummy.png',
		latitude : STACHUS[0],
		longitude : STACHUS[1]
	});
	$.mapView.addEventListener('complete', function() {
		$.mapView.addAnnotation($.dummyPin);
		$._LHM = TiMap.createTileOverlay({
			debuglevel : 2,
			service : TiMap.TILE_OVERLAY_TYPE_XYZ,
			url : LHM
		});
		$._OpenPT = TiMap.createTileOverlay({
			debuglevel : 1	,
			service : TiMap.TILE_OVERLAY_TYPE_XYZ,
			name : 'OpenPtMap'
		});
	});
	$.mapView.addEventListener('click', function(e) {

		$.dummyPin.latitude = e.latitude;
		$.dummyPin.longitude = e.longitude;
		$.dummyPin.title = e.source.name;
		$.dummyPin.subtitle = e.source.description;

		$.mapView.selectAnnotation($.dummyPin);
	});
	$.addEventListener('focus', function() {
		focused = true;
		if ($.geolocation) {

		}

	});
	$.addEventListener('blur', function() {
		focused = false;

	});
	$.toggleOpenPT = function(on) {
		switch (on) {
		case true:
			$._OpenPT && $.mapView.addTileOverlay($._OpenPT);
			break;
		case false:
			$._OpenPT && $.mapView.removeTileOverlay($._OpenPT);
			break;
		}
	};
	$.toggleLHM = function(on) {
		switch (on) {
		case true:
			$._LHM && $.mapView.addTileOverlay($._LHM);
			break;
		case false:
			$._LHM  && $.mapView.removeTileOverlay($._LHM);
			break;
		}
	};
	$.toggleMunichWays = function(on) {
		switch (on) {
		case true:
			$._Polylines.forEach(function(p) {
				$.mapView.addPolylines(p);
			});

			break;
		case false:
			$._Polylines.forEach(function(p) {
				$.mapView.removeAllPolylines();
			});
			break;

		}
	};

})();

