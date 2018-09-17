module.exports=function(_permissions,_cb,_alert){



























function handleRequest(){
Ti.Android.requestPermissions(permissions,function(_e){
_e.success?
_cb.onOK():

_cb.onError('Error','Permission not granted');
});
}if('android'!=Ti.Platform.osname)return void _cb.onOK();var permissions=(Array.isArray(_permissions)?_permissions:[_permissions]).map(function(perm){return perm.match(/^android\.permission\./)?perm:'android.permission.'+perm}),grantedpermissions=0;if(permissions.forEach(function(perm){Ti.Android.hasPermission(perm)&&grantedpermissions++}),!(grantedpermissions<permissions.length))_cb.onOK();else if(_alert){var dialog=Ti.UI.createAlertDialog({message:_alert.message,ok:L('OK'),title:_alert.title});dialog.show(),dialog.addEventListener('click',handleRequest)}else handleRequest();


};