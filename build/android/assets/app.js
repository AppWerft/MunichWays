const TiMap=require("ti.map"),
STACHUS=[48.14,11.5652],
abx=require("com.alcoapps.actionbarextras"),
RouteModule=require("/control/geojsonroutes");global.RouteModule =RouteModule,global.abx =abx,global.STACHUS =STACHUS,global.TiMap =TiMap;
var t=new Date().getTime();global.t =t;
function Log(foo){
"object"==typeof foo&&(
foo=JSON.stringify(foo)),
console.log(new Date().getTime()-t+"   "+foo),
t=new Date().getTime();
}global.Log =Log;

var mock=!1;global.mock =!1,

function(){var

$=Ti.UI.createWindow({
exitOnClose:!0,
geolocation:!1}),

focused=!1;

$.mapView=TiMap.createView({
userLocationButton:!0,
userLocation:!!Ti.Geolocation.locationServicesEnabled,
region:{
latitude:STACHUS[0],
longitude:STACHUS[1],
zoom:11},

mapType:TiMap.NORMAL_TYPE,
mapToolbarEnabled:!1,
style:Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,"data","mapstyle.json").read().getText(),
routes:{},
lifecycleContainer:$,
enableZoomControls:!1}),


$.add($.mapView);


var Routes=new RouteModule;
const URLS=["https://www.munichways.com/App/radlvorrangnetz.geojson","https://www.munichways.com/App/gesamtnetz.geojson"];
URLS.forEach(function(url){
Routes.getPolylines(TiMap,url,function(polylines){
$.mapView.addPolylines(polylines);
});

}),

$.addEventListener("open",require("onOpen")),

$.radPin=TiMap.createAnnotation({
image:"/images/rad.png",
latitude:STACHUS[0],
visible:!!Ti.Geolocation.locationServicesEnabled,
longitude:STACHUS[1]}),


$.dummyPin=TiMap.createAnnotation({
image:"/images/dummy.png",
latitude:STACHUS[0],

longitude:STACHUS[1]}),

$.mapView.addEventListener("complete",function(){
$.mapView.addAnnotation($.radPin),
$.mapView.addAnnotation($.dummyPin);
}),
$.mapView.addEventListener("click",function(e){

$.dummyPin.latitude=e.latitude,
$.dummyPin.longitude=e.longitude,
$.dummyPin.title=e.source.name,
$.dummyPin.subtitle=e.source.description,

$.mapView.selectAnnotation($.dummyPin);
}),
$.addEventListener("focus",function(){
focused=!0,
$.geolocation;



}),
$.addEventListener("blur",function(){
focused=!1;

}),

$.open();
}();