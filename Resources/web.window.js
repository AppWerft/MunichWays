module.exports = function onCalendarClick() {
	var $ = Ti.UI.createWindow({
		backgroundColor : '#6699cc'
	});
	$.addEventListener('open', function(e) {
		abx.backgroundColor = '#6699cc';
		abx.subtitle = "Die Webseite";
		abx.statusbarColor = '#6699cc';
		var activity = e.source.getActivity();
		activity.actionBar.displayHomeAsUp = true;
		activity.actionBar.onHomeIconItemSelected = function() {
			e.source.close();
		};
	});
	$.open();
	$.add(Ti.UI.createWebView({
		url:'https://munichways.com/',
		enableZoomControls:false
	}));

};
