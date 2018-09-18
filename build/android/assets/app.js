const TiMap=require('ti.map'),
STACHUS=[48.14,11.5652],
abx=require('com.alcoapps.actionbarextras'),
RouteModule=require('/control/routes');
Compass=require('ti.compassview');
var t=new Date().getTime();
function Log(foo){
'object'==typeof foo&&(
foo=JSON.stringify(foo)),
console.log(new Date().getTime()-t+'   '+foo),
t=new Date().getTime();
}

(function(){
var $=Ti.UI.createWindow({
exitOnClose:!0});


$.mapView=TiMap.createView({
userLocationButton:!1,
userLocation:!1,
region:{
latitude:STACHUS[0],
longitude:STACHUS[1],
longitudeDelta:0.05,
latitudeDelta:0.05},

mapType:TiMap.NORMAL_TYPE,
mapToolbarEnabled:!1,
style:Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'data','mapstyle.json').read().getText(),
routes:{},
lifecycleContainer:$,
enableZoomControls:!1}),

Log($.mapView.region),

$.hintView=require('hintview')(),
Log('map'),
$.add($.mapView),
Log('hint'),
$.add($.hintView),

$.onLocationChanged=function(e){
var coords=e.coords;
if(coords){


const R=0.05;
53<coords.latitude&&(
coords.latitude=STACHUS[0]+Math.random()*R-R/2,
coords.longitude=STACHUS[1]+Math.random()*R-R/2),

$.radPin.latitude=coords.latitude,
$.radPin.longitude=coords.longitude,
$.compassView&&$.compassView.hide(),
$.compassView&&(
$.remove($.compassView),
$.compassView=null),

$.mapView.setLocation({
animate:!0,
latitudeDelta:$.mapView.getRegion().latitudeDelta,
longitudeDelta:$.mapView.getRegion().longitudeDelta,
latitude:coords.latitude,
longitude:coords.longitude});

var nearestRoute=Routes.getNearestRoute(coords);
$.hintView.disableDetails(),
$.hintView.hintText.setText(nearestRoute.name+' ('+Math.round(nearestRoute.distance)+'m)'),
1e3>nearestRoute.distance?(
$.compassView=Compass.createView({
offset:nearestRoute.bearing+90,
type:Compass.TYPE_COMPASS,
image:'/assets/arrow.png',
width:50,
top:5,
left:5,
height:50,
touchEnabled:!1,
opacity:0.5,
duration:200}),

$.compassView.start(),
$.add($.compassView),
$.hintView.showHint(),
$.compassView?(
Log('setting offset to '+nearestRoute.bearing),
$.compassView.setOffset(nearestRoute.bearing+90)):


Log('no compassView!! '+nearestRoute.bearing)):(

$.hintView.hideHint(),
$.compassView&&$.compassView.setOffset(0)),


Routes.selectRoute(nearestRoute.id),
null==nearestRoute.description?


$.hintView.disableDetails():$.hintView.enableDetails(nearestRoute.description)}



};

var Routes=new RouteModule;
Routes.addAllToMap($.mapView),

$.addEventListener('open',require('onOpen')),

$.radPin=TiMap.createAnnotation({
image:'/images/rad.png',
latitude:STACHUS[0],
longitude:STACHUS[1]}),


$.mapView.addEventListener('complete',function(){
require('control/calendar')(),
$.mapView.addAnnotation($.radPin);

}),
$.open();

})();