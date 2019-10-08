module.exports = function() {
	
	const androidView = Ti.UI.createScrollableView({
		height : 320,
		views : [Ti.UI.createImageView({
			image : "assets/standard.png",
			mapstyle : "standard"
		}), Ti.UI.createImageView({
			image : "assets/silver.png",
			mapstyle : "silver"
		}), Ti.UI.createImageView({
			image : "assets/retro.png",
			mapstyle : "retro"
		}), Ti.UI.createImageView({
			image : "assets/dark.png",
			mapstyle : "dark"
		}), Ti.UI.createImageView({
			image : "assets/night.png",
			mapstyle : "night"
		})],
		backgroundColor : 'white'
	});
	const onScrollEnd = function(e) {
		require("control/maptype").setMaptype(e.view.mapstyle);
		Ti.App.fireEvent("mapstyle", {
			style : e.view.mapstyle
		});
	};
	androidView.addEventListener("scrollend", onScrollEnd);
	const $ = Ti.UI.createAlertDialog({
		androidView : androidView,
		title : "Auswahl des Kartenstils",
		message : "Kartenschieben startet die Auswahl.",
		ok : 'Ok',
	});
	$.addEventListener("click", function() {
		androidView.removeEventListener("scrollend", onScrollEnd);
	});
	androidView.views.forEach(function(view, index) {
		if (view.mapstyle == require("control/maptype").getMaptype())
			androidView.scrollToView(index);
	});
	$.show();
};
