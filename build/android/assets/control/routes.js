var $=function(){
this.routes=[];
var that=this;
require("data/routes").forEach(function(item){
const GEO=JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,"data","geojson",item.file+".geojson").read().getText());
GEO.features.forEach(function(f){
const points=f.geometry.coordinates.map(function(c){
return{
latitude:c[1],
longitude:c[0]};

});
1<points.length&&
that.routes.push({
points:points,
color:item.color});


});
});

};

$.prototype.addAllToMap=function(map){
this.routes.forEach(function(route){
map.addRoute(Map.createRoute({
points:route.points,
color:route.color,
width:8}));

});
},

module.exports=$;