var $ = function() {
	console.log('Init routes');
	this.routes = [];
	var that = this;
	require('data/routes').forEach(function(item,iindex) {
		const GEO = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "data", "geojson", item.file + ".geojson").read().getText());
		GEO.features.forEach(function(f,findex) {
			const points = f.geometry.coordinates.map(function(c) {
				return {
					latitude : c[1],
					longitude : c[0]
				};
			});
			if (points.length > 1)
				that.routes.push({
					points : points,
					id: iindex + '_'+ findex,
					meta : {
						name: f.properties.Name,
						description: f.properties.description
					},
					color : item.color
				});

		});
	});

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