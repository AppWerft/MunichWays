const abx = require('com.alcoapps.actionbarextras');

module.exports = function(event) {
	const $ = event.source;
	const onMenuItem1click = function(e) {
		e.source.checked = !e.source.checked;
		$.toggleMunichWays(e.source.checked);
	};
	const onMenuItem2click = function(e) {
		e.source.checked = !e.source.checked;
		$.toggleOpenPT(e.source.checked);
	};
	const onMenuItem3click = function(e) {
		e.source.checked = !e.source.checked;
		$.toggleLHM(e.source.checked);
	};
	const onMenuItem4click = function(e) {
		require("colorlegende.dialog")();
		
	};
	$.activity.onCreateOptionsMenu = function(e) {
		abx.backgroundColor = '#6699cc';
		abx.subtitle = "Mit dem Rad sicher und gemütlich durch München auf breiten Radwegen";
		abx.statusbarColor = '#6699cc';
		var menu = e.menu;
		const menuItem0 = menu.add({
			title : 'Web',
			icon : '/images/web.png',
			showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM | Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW
		});

		const menuItem1 = menu.add({
			title : 'Gesamt-Radlnetz',
			checkable : true,
			checked : true
		});

		const menuItem2 = menu.add({
			title : 'ÖPNV',
			checkable : true,
			checked : false
		});
		const menuItem3 = menu.add({
			title : 'Hauptrouten LHM',
			checkable : true,
			checked : false
		});
		const menuItem4 = menu.add({
			title : 'Farberklärung',
		});
		menuItem0.addEventListener('click', require('/web.window'));
		menuItem1.addEventListener('click', onMenuItem1click);
		menuItem2.addEventListener('click', onMenuItem2click);
		menuItem3.addEventListener('click', onMenuItem3click);
		menuItem4.addEventListener('click', onMenuItem4click);

		require('libs/checkPermissions')(['ACCESS_FINE_LOCATION'], {
			onOK : function(e) {
				$.geolocation = true;
				return;
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
	Ti.Gesture.addEventListener("orientationchange", function(orientationchangeEvent) {
		const actionBar = $.activity.actionBar;
		if (actionBar) {
			if ([Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT].indexOf(orientationchangeEvent.orientation) > -1) {
				actionBar.hide();
			} else {
				actionBar.show();
			}
		}
	});
};
