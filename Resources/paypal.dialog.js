module.exports = function() {
	const androidView = Ti.UI.createScrollView({
		scrollType: "vertical",
		layout : "vertical"		
	});
	androidView.add(Ti.UI.createLabel({
		top : 10,
		color : "#333",
		left : 10,
		right : 10,
		font : {
			fontSize : 16,
			fontWeight : "bold",
			fontFamily : "Cairo-Regular"
		},
		text : "Damit unsere Freunde und Bekannten unsere Arbeit finanziell unterstützen können, haben wir den gemeinnützigen Verein R(ad)evolution e.V. gegründet. Mit Eurer Spende können wir noch mehr Ideen für attrakiven Radverkehr in München umsetzen."
	}));		
	androidView.add(Ti.UI.createLabel({
		top : 10,
		color : "#6699cc",
		left : 10,
		right : 10,
		font : {
			fontSize : 16,
			fontWeight : "bold",
			fontFamily : "Cairo-Regular"
		},
		text : "Für jeden kleinen und großen Beitrag bedanken wir uns ganz herzlich."
	}));
	androidView.add(Ti.UI.createLabel({
		top : 10,
		color : "#333",
		left : 10,
		right : 10,
		font : {
			fontSize : 26,
			fontWeight : "bold",
			fontFamily : "Cairo-Bold"
		},
		text : "Spende per Überweisung"
	}));
	androidView.add(Ti.UI.createLabel({
		top : 10,
		color : "#333",
		left : 10,
		right : 10,
		font : {
			fontSize : 16,
			fontWeight : "bold",
			fontFamily : "Cairo-Regular"
		},
		text : "Für jeden kleinen und großen Beitrag bedanken wir uns ganz herzlich."
	}));
	
	androidView.add(Ti.UI.createLabel({
		top : 10,
		color : "#333",
		left : 10,
		right : 10,
		font : {
			fontSize : 19,
			fontWeight : "bold",
			fontFamily : "Cairo-SemiBold"
		},
		text : "R(ad)Evolution e.V.\nIBAN: DE08 4306 0967 8231 4942 00\nGLS Bank"
	}));
	androidView.add(Ti.UI.createLabel({
		top : 10,
		color : "#000000",
		left : 10,
		right : 10,
		font : {
			fontSize : 11,
			fontFamily : "Cairo-ExtraLight"
		},
		text : "Spenden sind steuerlich absetzbar. Bei Beträgen über 200 Euro pro Jahr stellen wir Euch i.d.R: innerhalb eines Monats eine Spendenbescheinigung aus. Schreibt hierzu bitte Eure Adresse in den Betreff der Überweisung oder sendet uns Eure Kontaktdaten per Email (mail@munichways.com) zu. Bis zur Grenze von 200 Euro jährlich ist die Vorlage des Kontoauszugs beim Finanzamt ausreichend (§ 50 Abs. 2 Nr. 2 Buchst. b EStDV)."
	}));
	const $ = Ti.UI.createAlertDialog({
		androidView : androidView,
		
		ok : 'Ok',
	});

	$.show();
};
