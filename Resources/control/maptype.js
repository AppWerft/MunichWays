exports.setMaptype= function(type) {
	Ti.App.Properties.setString("MP",type);	
};

exports.getMaptype= function() {
	return Ti.App.Properties.getString("MP","retro");	
};
