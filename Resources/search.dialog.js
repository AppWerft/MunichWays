module.exports = function() {
	const androidView = Ti.UI.createTableView({
		height : 240,
		top : 0,
		left : 10,
		right : 10,
		search : Ti.UI.createSearchBar({
			top : 0,
			hintText : "Ort in München",
			height : 45,
			left : 10,
			right : 10
		}),
		data : []
	});
	androidView.search.addEventListener("return",function(){
		Ti.Geolocation.forwardGeocoder("München " +androidView.search.value,function(e){
			console.log(e.displayAddress);
		});
	});	
	
	const $ = Ti.UI.createAlertDialog({
		androidView : androidView,
		title : "Suche",
		message : "Das ist noch nicht implementiert. Hier kann später nach Plätzen in München gesucht werden.",
		ok : 'Ok',
	});

	$.show();
};
