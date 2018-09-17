function getDist(lat1, lng1, lat2, lng2) {
	const R = 6371000;
	var φ1 = parseFloat(lat1).toRadians();
	var φ2 = parseFloat(lat2).toRadians();
	var Δφ = parseFloat(lat1 - lat2).toRadians();
	var Δλ = parseFloat(lng2 - lng1).toRadians();
	var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Extend Number object with method to convert numeric degrees to radians */
if (Number.prototype.toRadians === undefined) {
	Number.prototype.toRadians = function() {
		return this * Math.PI / 180;
	};
}

/** Extend Number object with method to convert radians to numeric (signed) degrees */
if (Number.prototype.toDegrees === undefined) {
	Number.prototype.toDegrees = function() {
		return this * 180 / Math.PI;
	};
}

var $ = function() {
	this.routes = [];
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
						name : feature.properties.Name.replace('rot_', '').replace('gelb_', '').replace('grün_', ''),
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

$.prototype.getNearestRoute = function(coords) {
	var allRoutes = [];
	this.routes.forEach(function(route) {

		if (route.points.length) {
			var dists = [];
			const turf = require('libs/turf');
			var point = turf.point([coords.latitude, coords.longitude]);
			var line = turf.lineString(route.points.map(function(p) {
				return [p.latitude, p.longitude];
			}));
			var distance = turf.pointToLineDistance(point, line, {
				units : 'meters'
			});
			allRoutes.push({
				distance : parseFloat(distance),
				name : route.meta.name,
				description : route.meta.description,
				id : route.meta.id
			});
		}
	});

	allRoutes.sort(function(a, b) {
		return b.distance - a.distance;
	});
	console.log(allRoutes[0].distance + '   ' + allRoutes[1].distance + '   ' + allRoutes[2].distance);
	const nearestRoute = allRoutes[0];
	return allRoutes.shift();
};

$.prototype.addAllToMap = function(map) {

	this.routes.forEach(function(route) {
		map.addRoute(TiMap.createRoute({
			points : route.points,
			color : route.color,
			width : 10
		}));
	});
};

module.exports = $;
