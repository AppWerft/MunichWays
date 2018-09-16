module.exports=function(cb){
const URL='https://www.munichways.com/?plugin=all-in-one-event-calendar&controller=ai1ec_exporter_controller&action=export_events&xml=true',
$=Ti.Network.createHTTPClient({
onload:function(e){
const json=null,
xml=this.responseText;
console.log(xml);
const XMLTools=require('libs/xmltools');
try{
json=new XMLTools(this.responseText).toJSON(),
console.log(json);
}catch(E){
console.log(E);
}

}});

$.open('GET',URL),
$.setRequestHeader('Accept','text/html,application/xhtml,application/xml'),
$.send();
};