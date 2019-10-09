module.exports = function onCalendarClick() {
	var $ = Ti.UI.createWindow({

	});
	$.add(Ti.UI.createScrollView({
		scrollType : "vertical",
		backgroundColor : 'white',
		layout : "vertical"
	}));
	$.addEventListener('open', function(e) {
		abx.statusbarColor = '#334866';
		abx.subtitle = "Bewertungskriterien der Radwege";
		abx.backgroundColor = '#6699cc';
		var activity = e.source.getActivity();
		activity.actionBar.displayHomeAsUp = true;
		activity.actionBar.onHomeIconItemSelected = function() {
			e.source.close();
		};
	});
	$.open();
	$.children[0].add(Ti.UI.createImageView({
		top : 0,
		width : Ti.UI.FILL,
		height : "auto",
		image : "https://www.munichways.com/wp-content/uploads/2019/07/Bewertung-gr%C3%BCn.jpg"
	}));
	
	$.children[0].add(Ti.UI.createLabel({
		top : 10,
		color : "#27b403",
		left : 10,
		right : 10,
		font : {
			fontSize : 20,
			fontWeight: "bold"
		},
		text : "Gemütlich und komfortabel, Radweg ist breit, sicher, guter Untergrund"
	}));
	$.children[0].add(Ti.UI.createLabel({
		top : 10,
		color : "#333",
		left : 10,
		right : 10,
		font : {
			fontSize : 20
		},
		text : "Würdest du deinen 12 jährigen Sohn oder deine 80 jährige Oma dort fahren lassen? Ist der Radweg ausreichend breit (mindestens 2,30 Meter) und der Untergrund eben?\n\nWenn beide Fragen mit Ja beantwortet werden können, ist die Strecke grün, sonst mindestens gelb."
	}));
	$.children[0].add(Ti.UI.createImageView({
		top : 10,
		width : Ti.UI.FILL,
		height : "auto",
		image : "https://www.munichways.com/wp-content/uploads/2019/07/Bewertung-gelb.jpg"
	}));
	
	
	$.children[0].add(Ti.UI.createLabel({
		top : 10,
		color : "#fbba00",
		left : 10,
		right : 10,
		font : {
			fontSize : 20,
			fontWeight: "bold"
		},
		text : "Durchschnittlich, Radweg ist verbesserungswürdig"
	}));
	$.children[0].add(Ti.UI.createLabel({
		top : 10,
		color : "#333",
		left : 10,
		right : 10,
		font : {
			fontSize : 20
		},
		text : "Ist der Radweg mit kleineren Einschränkungen akzeptabel?\n\nBeispiele: Der Radweg ist sicher aber der Untergrund ist uneben. Der Radweg ist breit und eben aber verläuft ungeschützt auf der Fahrbahn."
	}));
	$.children[0].add(Ti.UI.createImageView({
		top : 10,
		width : Ti.UI.FILL,
		height : "auto",
		image : "https://www.munichways.com/wp-content/uploads/2019/07/Bewertung-rot.jpg"
	}));
	
	$.children[0].add(Ti.UI.createLabel({
		top : 10,
		color : "#ff6600",
		left : 10,
		right : 10,
		font : {
			fontSize : 20,
			fontWeight: "bold"
		},
		text : "Stressig, Radweg ist sehr schmal, nicht sicher"
	}));
	$.children[0].add(Ti.UI.createLabel({
		top : 10,
		color : "#333",
		left : 10,
		right : 10,
		font : {
			fontSize : 20
		},
		text : "Gibt es starke Einschränkung bezüglich Sicherheit und Komfort.\n\nBeispiele: Der Radweg ist zu schmal, liegt an einer stark befahrenen Straße, der Untergrund ist stark beschädigt. Kein Radweg bei viel Pkw-Verkehr."
	}));
	
	$.children[0].add(Ti.UI.createImageView({
		top : 10,
		width : Ti.UI.FILL,
		height : "auto",
		image : "https://www.munichways.com/wp-content/uploads/2019/07/Bewertung-schwarz.jpg"
	}));
	$.children[0].add(Ti.UI.createLabel({
		top : 10,
		color : "#333",
		left : 10,
		right : 10,
		font : {
			fontSize : 20,fontWeight:"bold"
		},
		text : "Lücke, kein Radweg auf stark befahrenen Straßen, Lücke im Netz, Brücke im Bau."
	}));
$.children[0].add(Ti.UI.createLabel({
		top : 10,
		color : "#333",
		left : 10,
		right : 10,
		font : {
			fontSize : 20
		},
		text : "Die RadlVorrangStrecke ist unterbrochen, es fehlen Radwege auf stark befahrenen Straßen."
	}));	


};
