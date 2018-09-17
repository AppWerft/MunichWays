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

$.prototype.getNearestRoute = function(coords) {
	var allRoutes = [];
	this.routes.forEach(function(route) {

		if (route.points.length) {
			var dists = [];
			const turf = require('org.turf');
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
				id : route.id
			});
		}
	});
	allRoutes.sort(function(a, b) {
		return a.distance - b.distance;
	});
	return allRoutes.shift();
};

$.prototype.addAllToMap = function(map) {
	var that = this;
	this.routes.forEach(function(route) {
		that.Routes[route.id] = TiMap.createRoute({
			points : route.points,
			color : route.color,
			width : 10
		});
		map.addRoute(that.Routes[route.id]);
	});
};

$.prototype.selectRoute = function(id) {
	if (this.activeRoute)
		this.Routes[this.activeRoute].width = 10;
	this.activeRoute = id;
	console.log(id);
	this.Routes[id] && this.Routes[id].setWidth(30);
};

module.exports = $;
