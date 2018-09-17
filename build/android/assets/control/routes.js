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
GEO.features.forEach(function(f,findex){
const points=f.geometry.coordinates.map(function(c){
return{
latitude:c[1],
longitude:c[0]};

});
1<points.length&&
that.routes.push({
points:points,
id:iindex+"_"+findex,
meta:{
name:f.properties.Name,
description:f.properties.description},

color:item.color});

});
});

};

$.prototype.getNearestRoute=function(coords){
var allRoutes=[];
this.routes.forEach(function(route){
if(route.points.length){
var dists=[],

dists=route.points.map(function(p){
return getDist(coords.latitude,coords.longitude,p.latitude,p.longitude);
});
allRoutes.push({
dist:Math.min.apply(null,dists),
route:route});

}
}),
allRoutes.sort(function(a,b){
return a.dist<b.dist;
});
const nearestRoute={
name:allRoutes[0].route.meta.name,
description:allRoutes[0].route.meta.description,
dist:allRoutes[0].dist};

return nearestRoute;

},

$.prototype.addAllToMap=function(map){
this.routes.forEach(function(route){
map.addRoute(Map.createRoute({
points:route.points,
color:route.color,
width:8}));

});
},

module.exports=$;