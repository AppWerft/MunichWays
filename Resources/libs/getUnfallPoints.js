module.exports = function() {
	const csv = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "data/radleunfaelle2018.csv").read().getText();
	const lines = csv.split("\n");
	const Convert = require("libs/utm2webmercator");
	var list = [];
	lines.forEach(function(line) {
		const ll = line.split(" ");
		var res = Convert("32", ll[0], ll[1]);
		if (res)
			list.push([res.longitude,res.latitude]);
	});
	return list;
};
