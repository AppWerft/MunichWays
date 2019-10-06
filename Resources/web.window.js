module.exports = function onCalendarClick() {
	var $ = Ti.UI.createWindow({
		backgroundColor : 'rgb(51, 153, 255)'
	});
	$.addEventListener('open', function(e) {
		abx.backgroundColor = 'rgb(51, 153, 255)';
		abx.subtitle = "Die Webseite";
		abx.statusbarColor = 'rgb(26, 77, 127)';
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
