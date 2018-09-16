var Map=require('ti.map');
const abx=require('com.alcoapps.actionbarextras');

var $=Ti.UI.createWindow({
exitOnClose:!0});


$.mapView=Map.createView({
userLocation:!1,
region:{
latitude:48.1247925,
longitude:11.5583832,
longitudeDelta:0.05,
latitudeDelta:0.05},

mapType:Map.NORMAL_TYPE,
mapToolbarEnabled:!1,
style:Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'data','mapstyle.json').read().getText(),
routes:{},
lifecycleContainer:$,
enableZoomControls:!1}),

$.add($.mapView);

function onLocationChanged(e){
e.coords&&$.mapView.setLocation({
animate:!0,
latitudeDelta:0.04,
longitudeDelta:0.04,
latitude:e.coords.latitude,
longitude:e.coords.longitude});

}

const routes=[{
file:'A_gelb_rot_schwarz_Vorrangstrecken',
color:'red'},
{
file:'A_grun_Vorrangnetz',
color:'green'},

{
file:'C_Hauptrouten',
color:'orange'},

{
file:'A_Radlring_Altstadt',
color:'#00aa00'},

{
file:'D_grun_Gesamtnetz',
color:'#00aaaa'},

{
file:'D_schwarz_Gesamtnetz',
color:'blue'}];



routes.forEach(function(item){
const GEO=JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'data','geojson',item.file+'.geojson').read().getText());
GEO.features.forEach(function(f){
const points=f.geometry.coordinates.map(function(c){
return{
latitude:c[1],
longitude:c[0]};

});
1<points.length&&
$.mapView.addRoute(Map.createRoute({
points:points,
color:item.color,
width:8}));

});
});

function onCalendarClick(){
var onCalendarload=function(cal){
console.log(cal);
};
require('getCalendar')(onCalendarload);
}

$.activity.onCreateOptionsMenu=function(e){
abx.backgroundColor='rgb(51, 153, 255)',
abx.subtitle='Radlwege in M\xFCnchen',
abx.statusbarColor='rgb(26, 77, 127)';
var menu=e.menu;
menuItem=menu.add({
title:'Kalender',
icon:'/calendar.png',
showAsAction:Ti.Android.SHOW_AS_ACTION_IF_ROOM|Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW}).
addEventListener('click',onCalendarClick),
require('libs/checkPermissions')(['ACCESS_FINE_LOCATION'],{
onOK:function(e){
Ti.Geolocation.accuracy=Ti.Geolocation.ACCURACY_BEST,
Ti.Geolocation.distanceFilter=20,
Ti.Geolocation.preferredProvider=Ti.Geolocation.PROVIDER_GPS,
Ti.Geolocation.addEventListener('location',onLocationChanged),
$.mapView.userLocation=!0;
},
onError:function(){
alert('So, dann funktioniert die App nicht. Schade.');
}}),

$.addEventListener('close',onLocationChanged);
},
$.open();