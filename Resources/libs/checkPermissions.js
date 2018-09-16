module.exports = function(_permissions, _cb, _alert) {
	if (Ti.Platform.osname != 'android') {
		_cb.onOK();
		return;
	}
	var permissions = (Array.isArray(_permissions) ? _permissions : [_permissions]).map(function(perm) {
		return (perm.match(/^android\.permission\./)) ? perm : 'android.permission.' + perm;
	});
	var grantedpermissions = 0;
	permissions.forEach(function(perm) {
		
		if (Ti.Android.hasPermission(perm))
			grantedpermissions++;

	});
	if (grantedpermissions < permissions.length) {
		if (_alert) {
			var dialog = Ti.UI.createAlertDialog({
				message : _alert.message,
				ok : L('OK'),
				title : _alert.title
			});
			dialog.show();
			dialog.addEventListener("click",handleRequest);
		} else
			handleRequest();
	} else
		_cb.onOK();
	function handleRequest() {
		Ti.Android.requestPermissions(permissions, function(_e) {
			if (_e.success)
				_cb.onOK();
			else
				_cb.onError("Error","Permission not granted");
		});
	}

	return;
};
