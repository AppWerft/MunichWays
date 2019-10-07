module.exports = function() {
	const view = Ti.UI.createView({
		height : 320,
		layout : 'vertical',
		backgroundColor : 'white'
	});
	view.add(Ti.UI.createLabel({
		text : "Gemütlich und komfortabel, Radweg ist breit, sicher, eben	",
		top : 0,
		textAlign:'left',
		width: Ti.UI.FILL,
		height : 32,
		left:10,
		color : "#27b403",
		font : {
			fontWeight : 'bold',
			fontSize : 14
		}
	}));
	view.add(Ti.UI.createLabel({
		text : "Durchschnittlich, Radweg ist verbesserungswürdig",
		top : 0,
		left:10,
		textAlign:'left',
		width: Ti.UI.FILL,
		height : 32,
		color : "#fbba00",
		font : {
			fontWeight : 'bold',
			fontSize : 14
		}
	}));
	view.add(Ti.UI.createLabel({
		text : "Stressig, Radweg ist sehr schmal, nicht sicher",
		top : 0,
		left:10,
		height : 32,
		textAlign:'left',
		width: Ti.UI.FILL,	
		color : "#ff6600",
		font : {
			fontWeight : 'bold',
			fontSize : 14
		}
	}));
	view.add(Ti.UI.createLabel({
		text : "Lücke, kein Radweg, Lücke im Netz, im Bau",
		top : 0,
		left:10,
		height : 32,
		textAlign:'left',
		width: Ti.UI.FILL,	
		color : "black",
		font : {
			fontWeight : 'bold',
			fontSize : 14
		}
	}));
	const $ = Ti.UI.createAlertDialog({
		androidView : view,
		ok : 'Ok',
	});

	$.show();

};
