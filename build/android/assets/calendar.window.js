module.exports=function onCalendarClick(){
var $=Ti.UI.createWindow({
backgroundColor:"rgb(51, 153, 255)"});

$.addEventListener("open",function(e){
abx.backgroundColor="rgb(51, 153, 255)",
abx.subtitle="Veranstaltungen in M\xFCnchen",
abx.statusbarColor="rgb(26, 77, 127)";
var activity=e.source.getActivity();
activity.actionBar.displayHomeAsUp=!0,
activity.actionBar.onHomeIconItemSelected=function(){
e.source.close();
};
}),

$.open(),
$.add(Ti.UI.createTableView({
data:require("control/calendar")().map(function(event){
const $=Ti.UI.createTableViewRow({
height:Ti.UI.SIZE,
backgroundColor:"white"});



























































return $.add(Ti.UI.createImageView({top:5,left:0,width:120,height:"auto",image:event.image})),$.add(Ti.UI.createView({top:0,left:130,right:10,height:Ti.UI.SIZE,layout:"vertical"})),$.children[1].add(Ti.UI.createLabel({top:0,height:Ti.UI.SIZE,text:event.summary,textAlign:"left",width:Ti.UI.FILL,color:"gray",font:{fontSize:22,fontWeight:"bold"}})),$.children[1].add(Ti.UI.createLabel({top:0,height:Ti.UI.SIZE,textAlign:"left",width:Ti.UI.FILL,color:"black",text:event.description})),$.children[1].add(Ti.UI.createLabel({top:0,height:Ti.UI.SIZE,textAlign:"left",width:Ti.UI.FILL,color:"black",text:event.location,font:{fontStyle:"italic"}})),$.add(Ti.UI.createLabel({bottom:5,height:Ti.UI.SIZE,textAlign:"left",width:Ti.UI.FILL,color:"rgb(51, 153, 255)",left:5,font:{fontSize:10},text:event.start})),$;
})}));


};