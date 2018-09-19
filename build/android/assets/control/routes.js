const LDF=Ti.Platform.displayCaps.logicalDensityFactor;

function getPath(origin,destination,cb){
var URL='https://maps.googleapis.com/maps/api/directions/json?mode=walking&origin=ORIGIN&destination=DESTINATION&key=AIzaSyCJf_Jg4AZ-KTcvDklMSJRO7ddiZPM6d_s';
const $=Ti.Network.createHTTPClient({
onload:function(){
const json=JSON.parse(this.responseText);
if('OK'==json.status){
const route=require('libs/polyline').decode(json.routes[0].overview_polyline.points);
cb&&'function'==typeof cb&&
cb({
points:route.map(function(p){
return{
latitude:p[0],
longitude:p[1]};

}),
name:'path',
color:'#08000000',
width:10});


}
}});

Log(URL.replace('ORIGIN',origin).replace('DESTINATION',destination)),
$.open('GET',URL.replace('ORIGIN',origin).replace('DESTINATION',destination)),
$.send();
}

var $=function(){
this.routes=[],
this.Routes={},
this.activeRoute=null;
var that=this;
require('data/routes').forEach(function(item,iindex){
const GEO=JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'data','geojson',item.file+'.geojson').read().getText());
GEO.features.forEach(function(feature,findex){
const points=[];







if(feature.geometry.coordinates.forEach(function(c){c[0]&&null!=c[1]&&points.push({latitude:parseFloat(c[1]),longitude:parseFloat(c[0])})}),2<points.length){
const route={
id:iindex+'_'+findex,
meta:{
name:feature.properties.Name.replace('rot_','').replace('gelb_','').replace('gr\xFCn_','').replace('_',' '),
description:feature.properties.description},

points:points,
color:item.color};

that.routes.push(route);
}
});
});

};

$.prototype.getNearestRoute=function(coords,cb){
var allRoutes=[];
Log('START getNearestPoint'),
this.routes.forEach(function(route){
if(route.points.length){
var dists=[];
const turf=require('org.turf'),
point=turf.point([coords.latitude,coords.longitude]),
line=turf.lineString(route.points.map(function(p){
return[p.latitude,p.longitude];
})),
snapped=turf.nearestPointOnLine(line,point,{
units:'meters'});

allRoutes.push({
distance:snapped.properties.dist,
point:snapped.geometry.coordinates,
bearing:turf.bearing(point,snapped.geometry.coordinates),
name:route.meta.name,
description:route.meta.description,
id:route.id});

}
}),
allRoutes.sort(function(a,b){
return a.distance-b.distance;
}),
Log(allRoutes[0]);
var route=allRoutes.shift();

return getPath(coords.latitude+','+coords.longitude,route.point[0]+','+route.point[1],cb),route;
},

$.prototype.addAllToMap=function(map){
var that=this;
this.routes.forEach(function(route){
that.Routes[route.id]=TiMap.createRoute({
points:route.points,
color:route.color,
width:2*LDF}),

map&&map.addRoute(that.Routes[route.id]);
});
},

$.prototype.selectRoute=function(id){
this.activeRoute&&(
this.Routes[this.activeRoute].width=2*LDF),
this.activeRoute=id,
this.Routes[id]&&this.Routes[id].setWidth(5*LDF);
},

module.exports=$;