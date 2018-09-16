









var XMLTools=function(inputXml){
'string'==typeof inputXml&&(
this.doc=Ti.XML.parseString(inputXml).documentElement),

'object'==typeof inputXml&&(
this.doc=inputXml.documentElement);

};

XMLTools.prototype.getDocument=function(){
return this.doc;
};
var addToObject=function(obj,key,value){
if(null==obj[key])
obj[key]=value;else
if(!(obj[key]instanceof Array)){
var tmp=obj[key],
arr=[tmp,value];
obj[key]=arr;
}else
obj[key].push(value);

return obj;
},
traverseTree=function(node){
var textOnly=!0,
part={};
if(node.hasChildNodes()){
for(var
ch,ch_index=0;ch_index<node.childNodes.length;ch_index++)
if(ch=node.childNodes.item(ch_index),'#text'!=ch.nodeName||''!=ch.textContent.replace(/\n/g,'').replace(/ /g,''))
if(3===ch.nodeType||ch.nodeType===ch.CDATA_SECTION_NODE){
if(1===node.childNodes.length&&!node.hasAttributes())
return ch.textContent;

part.text=ch.textContent;

}else
part=addToObject(part,ch.tagName,traverseTree(ch));


textOnly=!1;
}
if(node.hasAttributes()){
for(var
att,att_index=0;att_index<node.attributes.length;att_index++)att=node.attributes.item(att_index),

part[att.nodeName]=att.nodeValue;

textOnly=!1;
}
return part;
};
XMLTools.prototype.toObject=function(){return(
null==this.doc?
null:(

this.obj=traverseTree(this.doc),
this.obj));
},

XMLTools.prototype.toJSON=function(){return(
null==this.doc?
null:(

null==this.obj&&(
this.obj=traverseTree(this.doc)),

JSON.stringify(this.obj)));
},

module.exports=XMLTools;