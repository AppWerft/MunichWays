const LDF=Ti.Platform.displayCaps.logicalDensityFactor;

var $=function(){
this.routes=[],
this.Routes={},
this.activeRoute=null;
var that=this;
Log('LDF='+LDF+'    '+Ti.Platform.displayCaps.density),
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

$.prototype.getNearestRoute=function(coords){
var allRoutes=[];


























return Log('START getNearestPoint'),this.routes.forEach(function(route){if(route.points.length){var dists=[];const turf=require('org.turf'),point=turf.point([coords.latitude,coords.longitude]),line=turf.lineString(route.points.map(function(p){return[p.latitude,p.longitude]})),snapped=turf.nearestPointOnLine(line,point,{units:'meters'});allRoutes.push({distance:snapped.properties.dist,point:snapped.geometry.coordinates,bearing:turf.bearing(point,snapped.geometry.coordinates),name:route.meta.name,description:route.meta.description,id:route.id})}}),allRoutes.sort(function(a,b){return a.distance-b.distance}),Log(allRoutes[0]),allRoutes.shift();
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
console.log(id),
this.Routes[id]&&this.Routes[id].setWidth(5*LDF);
},

module.exports=$;