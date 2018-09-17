function getDist(lat1,lng1,lat2,lng2){var _Mathsqrt=






Math.sqrt,_Mathcos=Math.cos,_Mathsin=Math.sin;const R=6371000;var φ1=parseFloat(lat1).toRadians(),φ2=parseFloat(lat2).toRadians(),Δφ=parseFloat(lat1-lat2).toRadians(),Δλ=parseFloat(lng2-lng1).toRadians(),a=_Mathsin(Δφ/2)*_Mathsin(Δφ/2)+_Mathcos(φ1)*_Mathcos(φ2)*_Mathsin(Δλ/2)*_Mathsin(Δλ/2);return 2*R*Math.atan2(_Mathsqrt(a),_Mathsqrt(1-a));
}


Number.prototype.toRadians===void 0&&(
Number.prototype.toRadians=function(){
return this*Math.PI/180;
}),



Number.prototype.toDegrees===void 0&&(
Number.prototype.toDegrees=function(){
return 180*this/Math.PI;
});


var $=function(){
this.routes=[];
var that=this;
require("data/routes").forEach(function(item,iindex){
const GEO=JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,"data","geojson",item.file+".geojson").read().getText());
GEO.features.forEach(function(feature,findex){
const points=[];







if(feature.geometry.coordinates.forEach(function(c){c[0]&&null!=c[1]&&points.push({latitude:parseFloat(c[1]),longitude:parseFloat(c[0])})}),2<points.length){
const route={
id:iindex+"_"+findex,
meta:{
name:feature.properties.Name.replace("rot_","").replace("gelb_","").replace("gr\xFCn_",""),
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
this.routes.forEach(function(route){

if(route.points.length){
var dists=[];
const turf=require("libs/turf");
var point=turf.point([coords.latitude,coords.longitude]),
line=turf.lineString(route.points.map(function(p){
return[p.latitude,p.longitude];
})),
distance=turf.pointToLineDistance(point,line,{
units:"meters"});

allRoutes.push({
distance:parseFloat(distance),
name:route.meta.name,
description:route.meta.description,
id:route.meta.id});

}
}),

allRoutes.sort(function(a,b){
return b.distance-a.distance;
}),
console.log(allRoutes[0].distance+"   "+allRoutes[1].distance+"   "+allRoutes[2].distance);
const nearestRoute=allRoutes[0];
return allRoutes.shift();
},

$.prototype.addAllToMap=function(map){

this.routes.forEach(function(route){
map.addRoute(TiMap.createRoute({
points:route.points,
color:route.color,
width:10}));

});
},

module.exports=$;