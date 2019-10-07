const LDF = Ti.Platform.displayCaps.logicalDensityFactor;
const turf = require('org.turf');
const URLs = ["https://www.munichways.com/App/radlvorrangnetz.geojson", "https://www.munichways.com/App/gesamtnetz.geojson"];

function getFeatures(url, cb) {
	console.log(url);
	const $ = Ti.Network.createHTTPClient({
		onload : function() {
			const json = JSON.parse(this.responseText);
			if (json.type == "FeatureCollection") {
				cb(json.features);
			}
		}
	});
	$.open('GET', url);
	$.send();
}

var $ = function() {
	this.routes = [];
	this.Routes = {};
	this.activeRoute = null;
	var that = this;
	URLs.forEach(function(item, iindex) {

	});

};

$.prototype.getNearestRoute = function(coords, cb) {
	var allRoutes = [];

	this.routes.forEach(function(route) {
		if (route.points.length) {
			var dists = [];

			point = turf.point([coords.latitude, coords.longitude]),
			line = turf.lineString(route.points.map(function(p) {
				return [p.latitude, p.longitude];
			})),
			snapped = turf.nearestPointOnLine(line, point, {
				units : 'meters'
			});
			allRoutes.push({
				distance : snapped.properties.dist,
				point : snapped.geometry.coordinates,
				bearing : turf.bearing(point, snapped.geometry.coordinates),
				name : route.meta.name,
				description : route.meta.description,
				id : route.id
			});
		}
	});
	allRoutes.sort(function(a, b) {
		return a.distance - b.distance;
	});
	var route = allRoutes.shift();
	getPath(coords.latitude + ',' + coords.longitude, route.point[0] + ',' + route.point[1], cb);
	return route;
};

const getColor = function(c) {
	switch (c) {
	case "schwarz" :
		return 'black';
	case "grün" :
		return '#27b403';
	case "gelb" :
		return '#fbba00';
	case "rot" :
		return '#ff6600';
	default:
		return "#6699cc";
	}
};

$.prototype.getPolylines = function(Map, url, cb) {
	var Polylines = [];
	getFeatures(url, function(features) {
		features.forEach(function(feature) {
			if (feature.type == "Feature" && feature.geometry) {
				switch (feature.geometry.type) {
				case "LineString":
					Polylines.push(Map.createPolyline({
						points : feature.geometry.coordinates,
						color : getColor(feature.properties.farbe),
						width : 5 * LDF,
						description : feature.properties.description ? feature.properties.description.replace(/(<([^>]+)>)/ig, "") : '',
						name : feature.properties.name,
						soll : feature.properties.soll,
						ist : feature.properties.ist
					}));
					break;
				case "MultiLineString":
					feature.geometry.coordinates.forEach(function(coords) {
						Polylines.push(Map.createPolyline({
							points : coords,
							color : getColor(feature.properties.farbe),
							width : 5 * LDF,
							description : feature.properties.description
						}));
					});
					break;
				}
			}
		});
		cb(Polylines);
	});

};

$.prototype.selectRoute = function(id) {
	if (this.activeRoute)
		this.Routes[this.activeRoute].width = LDF * 2;
	this.activeRoute = id;
	this.Routes[id] && this.Routes[id].setWidth(LDF * 8);
};

module.exports = $;
