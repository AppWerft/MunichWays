const MIN = 60,
    MAX = 200;
var Hint = function() {
	$ = Ti.UI.createView({
		height : MIN + MAX,
		layout : 'vertical',
		opacity : 0.96,
		backgroundColor : 'white',
		bottom : -MAX
	});
	$.add(Ti.UI.createView({
		height : MIN,
		backgroundColor : 'rgb(51, 153, 255)',
		top : 0
	}));
	$.add(Ti.UI.createView({
		height : MAX,
		top : 0
	}));
	$.children[0].add(Ti.UI.createLabel({
		left : 3,
		top : 0,
		color : 'black',
		textAlign : 'left',
		width : Ti.UI.FILL,
		text : 'Nächster Radlweg:',
		font : {
			fontSize : 10,
			fontStyle : 'italic'
		}
	}));
	$.hintText = Ti.UI.createLabel({
		color : 'white',
		width : Ti.UI.FILL,
		left : 10,
		right : 10,
		textAlign : 'center',
		font : {
			fontSize : 18,
			fontWeight : 'bold'
		}
	});
	$.arrow = Ti.UI.createLabel({
		top : 0,
		right : 3,
		color : 'white',
		text : '▲'
	});
	$.children[0].add($.arrow);
	$.children[0].add($.hintText);

	var onSwipe = function(e) {
		Log(e.direction);
		if (e.direction == 'up') {
			$.animate({
				bottom : 0
			});
			$.arrow.setText('▼');
		} else {
			$.animate({
				bottom : -MAX
			});
			$.arrow.setText('▲');
		}
		if ( parts = description.match(/src="(.*?)"/)) {
			$.children[1].add(Ti.UI.createImageView({
				image : parts[1],
				height : 'auto',
				width : Ti.UI.FILL,
			}));
		} else {
			$.children[1].add(Ti.UI.createLabel({
				text : description.replace(/<br>/gm, '\n'),
				left : 10,
				reight : 10,
				top : 10,
				font : {
					fontSize : 18
				},
				color : 'black',
				height : Ti.UI.SIZE,
			}));
		}
	};
	var description = null;
	$.enableDetails = function(_description) {
		description = _description;
		$.addEventListener('swipe', onSwipe);
		console.log(description);
		$.arrow.show();
	};
	$.disableDetails = function() {
		$.removeEventListener('swipe', onSwipe);
		if ($.children[1].children[0])
			$.children[1].remove($.children[1].children[0]);
		$.arrow.hide();
		$.animate({
			bottom : -MAX
		});
		$.arrow.setText('▲');
	};
	$.showHint = function() {
		$.show();
	};
	$.hideHint = function() {
		$.hide();
	};
	return $;
};
module.exports = Hint;
