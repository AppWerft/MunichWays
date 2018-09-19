const LDF = Ti.Platform.displayCaps.logicalDensityFactor;

function getPath(origin, destination, cb) {
	var URL = 'https://maps.googleapis.com/maps/api/directions/json?mode=walking&origin=ORIGIN&destination=DESTINATION&key=AIzaSyCJf_Jg4AZ-KTcvDklMSJRO7ddiZPM6d_s';
	const $ = Ti.Network.createHTTPClient({
		onload : function() {
			const json = JSON.parse(this.responseText);
			if (json.status == "OK") {
				const route = require('libs/polyline').decode(json.routes[0].overview_polyline.points);
				if (cb && typeof cb == 'function') {
					cb({
						points : route.map(function(p) {
							return {
								latitude : p[0],
								longitude : p[1]
							};
						}),
						name : 'path',
						color : '#08000000',
						width : 10
					});
				}
			}
		}
	});
	Log(URL.replace('ORIGIN', origin).replace('DESTINATION', destination));
	$.open('GET', URL.replace('ORIGIN', origin).replace('DESTINATION', destination));
	$.send();
}

var $ = function() {
	this.routes = [];
	this.Routes = {};
	this.activeRoute = null;
	var that = this;
	require('data/routes').forEach(function(item, iindex) {
		const GEO = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "data", "geojson", item.file + ".geojson").read().getText());
		GEO.features.forEach(function(feature, findex) {
			const points = [];
			feature.geometry.coordinates.forEach(function(c) {
				if (c[0] && c[1] != null)
					points.push({
						latitude : parseFloat(c[1]),
						longitude : parseFloat(c[0])
					});
			});
			if (points.length > 2) {
				const route = {
					id : iindex + '_' + findex,
					meta : {
						name : feature.properties.Name.replace('rot_', '').replace('gelb_', '').replace('grün_', '').replace('_', ' '),
						description : feature.properties.description
					},
					points : points,
					color : item.color
				};
				that.routes.push(route);
			}
		});
	});

};

$.prototype.getNearestRoute = function(coords, cb) {
	var allRoutes = [];
	Log('START getNearestPoint');
	this.routes.forEach(function(route) {
		if (route.points.length) {
			var dists = [];
			const turf = require('org.turf'),
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
	Log(allRoutes[0]);
	var route = allRoutes.shift();
	getPath(coords.latitude + ',' + coords.longitude, route.point[0] + ',' + route.point[1], cb);
	return route;
};

$.prototype.addAllToMap = function(map) {
	var that = this;
	this.routes.forEach(function(route) {
		that.Routes[route.id] = TiMap.createRoute({
			points : route.points,
			color : route.color,
			width : LDF * 2
		});
		map && map.addRoute(that.Routes[route.id]);
	});
};

$.prototype.selectRoute = function(id) {
	if (this.activeRoute)
		this.Routes[this.activeRoute].width = LDF * 2;
	this.activeRoute = id;
		this.Routes[id] && this.Routes[id].setWidth(LDF * 5);
};

module.exports = $;
