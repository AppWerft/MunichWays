const Moment = require('libs/moment'),
    CALENDAR = 'CALENDAR_FEED';

module.exports = function(cb) {
	const URL = 'https://www.munichways.com/?plugin=all-in-one-event-calendar&controller=ai1ec_exporter_controller&action=export_events&xml=true';
	console.log('Start Calendarfetching');
	const $ = Ti.Network.createHTTPClient({
		onload : function(e) {
			var data = [];
			var events = this.responseXML.getElementsByTagName("vevent");
			for (var i = 0; i < events.length; i++) {
				const image = events.item(i).getElementsByTagName("x-wp-images-url").item(0).textContent.split(',')[1].split(';')[1];
				data.push({
					image : image,
					start : Moment(events.item(i).getElementsByTagName("dtstart").item(0).textContent).format('LLL'),
					end : events.item(i).getElementsByTagName("dtend").item(0).textContent.trim(),
					description : events.item(i).getElementsByTagName("description").item(0).textContent.replace('\n\n','\n').trim(),
					location : events.item(i).getElementsByTagName("location").item(0).textContent.trim(),
					summary : events.item(i).getElementsByTagName("summary").item(0).textContent.trim(),
				});
			}
			console.log(data);
			Ti.UI.createNotification({
				message : data.length + " Termine geladen"
			}).show();
			Ti.App.Properties.setString(CALENDAR, JSON.stringify(data));
			cb && cb(data);
		},
		onerror : function(e) {
			console.log(e);
		}
	});
	$.open('GET', URL);
	$.setRequestHeader("Accept", "text/html,text/xml,application/xml");
	$.send();
	var events =[];
	try {
		events = JSON.parse(Ti.App.Properties.getString(CALENDAR, '[]'));
	} catch(e) {
		console.log(e);
	}
	return events;
};
