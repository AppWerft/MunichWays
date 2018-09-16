const XMLTools = require('libs/xmltools');

module.exports = function(cb) {
	const URL = 'https://www.munichways.com/?plugin=all-in-one-event-calendar&controller=ai1ec_exporter_controller&action=export_events&xml=true';
	const $ = Ti.Network.createHTTPClient({
		onload : function(e) {
			var feed = {};
			try {
				feed = new XMLTools(this.responseXML).toObject();
			} catch(E) {
				console.log(E);
			}
			if (feed.vcalendar)
				cb(feed.vcalendar.vevent);
			else
				console.log('no vcalendar in feed');
		},
		onerror : function(e) {
			console.log(e);
		}
	});
	$.open('GET', URL);
	$.setRequestHeader("Accept", "text/html,text/xml,application/xml");
	$.send();
};
