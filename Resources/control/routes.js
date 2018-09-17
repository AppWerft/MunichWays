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
		GEO.features.forEach(function(f, findex) {
			const points = f.geometry.coordinates.map(function(c) {
				return {
					latitude : c[1],
					longitude : c[0]
				};
			});
			if (points.length > 1)
				that.routes.push({
					points : points,
					id : iindex + '_' + findex,
					meta : {
						name : f.properties.Name,
						description : f.properties.description
					},
					color : item.color
				});
		});
	});

};

$.prototype.getNearestRoute = function(coords) {
	var allRoutes = [];
	this.routes.forEach(function(route) {
		if (route.points.length) {
			var dists = [];
			
			var dists = route.points.map(function(p) {
				return getDist(coords.latitude, coords.longitude, p.latitude, p.longitude);
			});
			allRoutes.push({
				dist : Math.min.apply(null, dists),
				route : route
			});
		}
	});
	allRoutes.sort(function(a, b) {
		return a.dist < b.dist;
	});
	const nearestRoute = {
		name : allRoutes[0].route.meta.name,
		description : allRoutes[0].route.meta.description,
		dist : allRoutes[0].dist
	};
	console.log(allRoutes[0].dist + '   '+ allRoutes[1].dist)
	return nearestRoute;

};

$.prototype.addAllToMap = function(map) {
	this.routes.forEach(function(route) {
		map.addRoute(Map.createRoute({
			points : route.points,
			color : route.color,
			width : 8
		}));
	});
};

module.exports = $;
