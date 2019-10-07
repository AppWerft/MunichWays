module.exports = function(opts) {
	var $ = Ti.UI.createWindow({
		backgroundColor: '#6699cc'
	});
	$.addEventListener('open', function(e) {
		abx.backgroundColor = '#6699cc';
		abx.subtitle = opts.subtitle;
		abx.statusbarColor = '#6699cc';
		var activity = e.source.getActivity();
		activity.actionBar.displayHomeAsUp = true;
		activity.actionBar.onHomeIconItemSelected = function() {
			e.source.close();
		};
	});
	$.open();
	$.add(opts.Map.createStreetViewPanorama({
		backgroundColor: '#6699cc',
		position : {
			latitude : opts.lat,
			longitude : opts.lng
		}
	}));
};
