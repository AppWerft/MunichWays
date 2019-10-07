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
	var Overlays = {};
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
		longitude : STACHUS[1],
		rightButton : '/images/streetview.png'
	});
	$.mapView.addEventListener('complete', function() {
		$.mapView.addAnnotation($.dummyPin);
		$._VeloUnfall = TiMap.createTileOverlay({
			debuglevel : 0,
			service : TiMap.TILE_OVERLAY_TYPE_WMS,
			format: "image/png",
			version : "1.3.0",
			url : "http://www.wms.nrw.de/wms/unfallatlas",
			layer : "Beteiligung_Fahrrad_5000_2018",
			style : "default",
			transparent : true,
			crs : "EPSG:4326"

		});
	});
	$.mapView.addEventListener('click', function(e) {
		switch (e.clicksource) {
		case "rightPane":
		case "infoWindow":
			require('/streetview.window')({
				Map : TiMap,
				lat : e.latitude,
				lng : e.longitude,
				subtitle : "Straßenansicht: " + $.dummyPin.title
			});
			break;
		case "polyline":
			$.mapView.deselectAnnotation($.dummyPin);
			$.dummyPin.latitude = e.latitude;
			$.dummyPin.longitude = e.longitude;
			$.dummyPin.title = e.source.name;
			$.dummyPin.subtitle = e.source.description;
			$.mapView.selectAnnotation($.dummyPin);
			break;
		default:
			$.mapView.deselectAnnotation($.dummyPin);

		}

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
		if (!Overlays.OpenPT)
			Overlays.OpenPT = TiMap.createTileOverlay({
				debuglevel : 1,
				service : TiMap.TILE_OVERLAY_TYPE_XYZ,
				name : 'OpenPtMap'
			});
		switch (on) {
		case true:
			$.mapView.addTileOverlay(Overlays.OpenPT);
			break;
		case false:
			$.mapView.removeTileOverlay(Overlays.OpenPT);
			break;
		}
	};
	$.toggleVeloUnfall = function(on) {
		switch (on) {
		case true:
			$._VeloUnfall && $.mapView.addTileOverlay($._VeloUnfall);
			break;
		case false:
			$._VeloUnfall && $.mapView.removeTileOverlay($._VeloUnfall);
			break;
		}
	};
	$.toggleLHM = function(on) {
		if (!Overlays.LHM)
			Overlays.LHM = TiMap.createTileOverlay({
				debuglevel : 2,
				service : TiMap.TILE_OVERLAY_TYPE_XYZ,
				url : LHM
			});
		switch (on) {
		case true:
			$.mapView.addTileOverlay(Overlays.LHM);
			break;
		case false:
			$.mapView.removeTileOverlay(Overlays.LHM);
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

