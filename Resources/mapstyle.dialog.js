const Animation = require("ti.scrollable.animation");
function getImageView(mapstyle) {
	return Ti.UI.createImageView({
		image : "assets/" + mapstyle + ".png",
		mapstyle : mapstyle
	});
}

module.exports = function() {
	const androidView = Ti.UI.createScrollableView({
		height : 320,
		views : ["standard", "silver", "extra1", "retro", "dark", "night", "standard", "silver", "extra1", "retro", "dark", "night", "standard", "silver", "extra1", "retro", "dark", "night"].map(getImageView),
		backgroundColor : 'transparent'
	});
	Animation.setAnimation(androidView, Animation.CUBE_OUT);
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
