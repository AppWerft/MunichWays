const abx = require('com.alcoapps.actionbarextras');

module.exports= function(e) {
	const $ = e.source;
	$.activity.onCreateOptionsMenu = function(e) {
		abx.backgroundColor = 'rgb(51, 153, 255)';
		abx.subtitle = "Radlwege in München";
		abx.statusbarColor = 'rgb(26, 77, 127)';
		var menu = e.menu;
		const menuItem1 = menu.add({
			title : 'Web',
			icon : '/images/web.png',
			showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM | Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW
		});
		const menuItem2 = menu.add({
			title : 'Kalender',
			icon : '/images/calendar.png',
			showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM | Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW
		});
		menuItem1.addEventListener('click', require('/web.window'));
		menuItem2.addEventListener('click', require('/calendar.window'));
		require('libs/checkPermissions')(['ACCESS_FINE_LOCATION'], {
			onOK : function(e) {
				$.geolocation=true;
				Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
				Ti.Geolocation.distanceFilter = 20;
				Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
				Ti.Geolocation.addEventListener('location', $.onLocationChanged);
				$.mapView.userLocation = true;
			},
			onError : function() {
				alert('So, im Falle der Verweigerung funktioniert die App nicht. Schade.');
			}
		});
	};
};