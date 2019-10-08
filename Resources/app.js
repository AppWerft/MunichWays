const TiMap = require('ti.map'),
    STACHUS = [48.14, 11.5652],
    abx = require('com.alcoapps.actionbarextras'),
    RouteModule = require('/control/geojsonroutes');
var t = new Date().getTime();
const LDF = Ti.Platform.displayCaps.logicalDensityFactor;

const LAYERID = "6ddc01f1@9b6953ac45e3de3050693c3b1a21a83d:1570390392755";
const LHM = "https://cartocdn-gusc-c.global.ssl.fastly.net/usocialmaps/api/v1/map/usocialmaps@" + LAYERID + "/1,2,3,4,5/{z}/{x}/{y}.png";
const OPENPT = "http://openptmap.org/tiles/{z}/{x}/{y}.png";
const GEOJSONENDPOINTS = {
	"vorrangnetz" : {
		"url" : "https://www.munichways.com/App/radlvorrangnetz.geojson",
		"width" : 7,
		"pattern" : {
			"type" : TiMap.POLYLINE_PATTERN_DOTTED,
			"gapLength" : 3
		}
	},
	"gesamtnetz" : {
		"url" : "https://www.munichways.com/App/gesamtnetz.geojson",
		"width" : 4,
		"pattern" : {
			"type" : TiMap.POLYLINE_PATTERN_DASHED,
			"dashLength" : 3,
			"gapLength" : 5
		}
	}
};

var mock = false;
function getStyle(style) {
	return Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "assets/", style + ".json").read().getText();
}

(function() {
	var Overlays = {};
	const $ = Ti.UI.createWindow({
		exitOnClose : true,
		usertracking : false,

	});

	var focused = false;
	$.addEventListener('open', require('onOpen'));
	$.open();
	$.mapView = TiMap.createView({
		userLocationButton : true,
		userLocation : Ti.Geolocation.locationServicesEnabled && Ti.Geolocation.hasLocationPermissions() ? true : false,
		region : {
			latitude : STACHUS[0],
			longitude : STACHUS[1],
			zoom : 11
		},
		mapType : TiMap.NORMAL_TYPE,
		mapToolbarEnabled : false,
		style : getStyle(require("control/maptype").getMaptype()),
		routes : {},
		lifecycleContainer : $,
		enableZoomControls : false
	});
	$.add($.mapView);
	Ti.App.addEventListener("mapstyle", function(e) {
		console.log(e.style);
		$.mapView.style = getStyle(e.style);
	});
	var Routes = new RouteModule();
	Object.keys(GEOJSONENDPOINTS).forEach(function(key) {
		Routes.getPolylines(TiMap, GEOJSONENDPOINTS[key], function(polylines) {
			Overlays[key] = polylines;
			console.log("add " + polylines.length + " polylines (" + key + ")");
			(key == "vorrangnetz") && $.mapView.addPolylines(Overlays.vorrangnetz);
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
	$.onLocationChanged = function(e) {
		var coords = e.coords;
		if (!coords || !focused) {
			return;
		}
		$.mapView.setLocation({
			animate : true,
			latitudeDelta : $.mapView.getRegion().latitudeDelta,
			longitudeDelta : $.mapView.getRegion().longitudeDelta,
			latitude : coords.latitude,
			longitude : coords.longitude
		});
	};

	$.mapView.addEventListener("userLocation", function(e) {
		$.usertracking && $.mapView.setLocation({
			animate : false,
			latitudeDelta : $.mapView.getRegion().latitudeDelta,
			longitudeDelta : $.mapView.getRegion().longitudeDelta,
			latitude : e.latitude,
			longitude : e.longitude
		});
	});
	$.mapView.addEventListener("regionwillchange", function(e) {
		if (e.reason == 2)// userlocation button
			$.usertracking = true;
		if (e.reason == 1)// user triggered panning
			$.usertracking = false;
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
			if (!Overlays.Unfaelle)
				Overlays.Unfaelle = TiMap.createHeatmapOverlay({
					points : require('libs/getUnfallPoints')()
				});
			$.mapView.addHeatmapOverlay(Overlays.Unfaelle);
			break;
		case false:
			if (Overlays.Unfaelle) 
				$.mapView.removeHeatmapOverlay(Overlays.Unfaelle);
				else console.log("no heatmap to delete");
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
	$.toggleGesamtnetz = function(on) {
		if (!Overlays.gesamtnetz) {
			return;
		}
		if (!Array.isArray(Overlays.gesamtnetz)) {
			return;
		}
		switch (on) {
		case true:
			Overlays.gesamtnetz.forEach(function(polyline) {
				$.mapView.addPolyline(polyline);
			});
			break;
		case false:
			Overlays.gesamtnetz.forEach(function(polyline) {
				$.mapView.removePolyline(polyline);
			});
			break;
		}
	};
})();

