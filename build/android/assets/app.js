const TiMap=require('ti.map'),
abx=require('com.alcoapps.actionbarextras'),
RouteModule=require('/control/routes');

var $=Ti.UI.createWindow({
exitOnClose:!0});


$.mapView=TiMap.createView({
userLocation:!1,
region:{
latitude:48.14,
longitude:11.5652,
longitudeDelta:0.05,
latitudeDelta:0.05},

mapType:TiMap.NORMAL_TYPE,
mapToolbarEnabled:!1,
style:Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'data','mapstyle.json').read().getText(),
routes:{},
lifecycleContainer:$,
enableZoomControls:!1}),

$.add($.mapView);

function onLocationChanged(e){
var coords=e.coords;
if(coords){


const R=0.02;
53<coords.latitude&&(
coords.latitude=48.134+Math.random()*R-R/2,
coords.longitude=11.5652+Math.random()*R-R/2),

$.mapView.setLocation({
animate:!0,
latitudeDelta:$.mapView.getRegion().latitudeDelta,
longitudeDelta:$.mapView.getRegion().longitudeDelta,
latitude:coords.latitude,
longitude:coords.longitude});

var nearestRoute=Routes.getNearestRoute(coords);
$.hintText.setText(nearestRoute.name+' ('+Math.round(nearestRoute.distance)+'m)'),
1e3<nearestRoute.distance?
$.hintView.animate({
bottom:-100}):


$.hintView.animate({
bottom:0})}

}

var Routes=new RouteModule;
Routes.addAllToMap($.mapView),
$.hintView=Ti.UI.createView({
height:50,
backgroundColor:'rgb(51, 153, 255)',
bottom:-100}),

$.hintView.add(Ti.UI.createLabel({

left:0,top:5,color:'black',
textAlign:'left',
eidth:Ti.UI.FILL,
text:'N\xE4chster Radlweg:',
font:{
fontSize:10}})),


$.hintText=Ti.UI.createLabel({
color:'white',
font:{
fontSize:20,
fontWeight:'bold'}}),


$.hintView.add($.hintText),
$.add($.hintView),

$.activity.onCreateOptionsMenu=function(e){
abx.backgroundColor='rgb(51, 153, 255)',
abx.subtitle='Radlwege in M\xFCnchen',
abx.statusbarColor='rgb(26, 77, 127)';
var menu=e.menu;
const menuItem=menu.add({
title:'Kalender',
icon:'/calendar.png',
showAsAction:Ti.Android.SHOW_AS_ACTION_IF_ROOM|Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW});

menuItem.addEventListener('click',require('/calendar.window')),
require('libs/checkPermissions')(['ACCESS_FINE_LOCATION'],{
onOK:function(e){
Ti.Geolocation.accuracy=Ti.Geolocation.ACCURACY_BEST,
Ti.Geolocation.distanceFilter=20,
Ti.Geolocation.preferredProvider=Ti.Geolocation.PROVIDER_GPS,
Ti.Geolocation.addEventListener('location',onLocationChanged),
$.mapView.userLocation=!0;
},
onError:function(){
alert('So, im Falle der Verweigerung funktioniert die App nicht. Schade.');
}}),

$.addEventListener('close',onLocationChanged),
require('control/calendar')();
},
$.open();