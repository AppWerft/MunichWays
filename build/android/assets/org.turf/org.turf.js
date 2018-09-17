(function(f){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=f();else if("function"==typeof define&&define.amd)define([],f);else{var g;g="undefined"==typeof window?"undefined"==typeof global?"undefined"==typeof self?this:self:global:window,(g.org||(g.org={})).turf=f()}})(function(){var define,module,exports;return function e(t,n,r){function o(i,u){if(!n[i]){if(!t[i]){var a="function"==typeof require&&require;if(!u&&a)return 2===a.length?a(i,!0):a(i);if(s&&2===s.length)return s(i,!0);if(s)return s(i);var f=new Error("Cannot find module '"+i+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[i]={exports:{}};t[i][0].call(l.exports,function(e){var n=t[i][1][e];return o(n?n:e)},l,l.exports,e,t,n,r)}return n[i].exports}var i=Array.prototype.slice;Function.prototype.bind||Object.defineProperty(Function.prototype,"bind",{enumerable:!1,configurable:!0,writable:!0,value:function(e){function r(){return t.apply(this instanceof r&&e?this:e,n.concat(i.call(arguments)))}if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var t=this,n=i.call(arguments,1);return r.prototype=Object.create(t.prototype),r.prototype.contructor=r,r}});for(var s="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(require,module,exports){

module.exports=function(){return this}(),

module.exports.location={};

},{}],2:[function(require,module,exports){
(function(setTimeout){








































function noop(){}var process=module.exports={};process.nextTick=function nextTick(fn){setTimeout(fn,0)},process.title="titanium",process.titanium=!0,process.env={},process.argv=[],process.binding=function(name){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(dir){throw new Error("process.chdir is not supported")},process.stdout={},process.stderr={},process.stdout.write=function(msg){Ti.API.info(msg)},process.stderr.write=function(msg){Ti.API.error(msg)},["addEventListener","removeEventListener","removeListener","hasEventListener","fireEvent","emit","on","off"].forEach(function(name){process[name]=noop});

}).call(this,require("--timers--").setTimeout);
},{"--timers--":3}],3:[function(require,module,exports){
(function(global){








function clearInterval(intervalId){
try{
return global.clearInterval(intervalId);
}
catch(e){

return;
}
}

function clearTimeout(timeoutId){
try{
return global.clearTimeout(timeoutId);
}
catch(e){

return;
}
}

function setInterval(func,delay){

for(var args=[],i=2,l=arguments.length;i<l;++i)
args[i-2]=arguments[i];


return global.setInterval(function(){
func.apply(this,args);
},+delay);
}

function setTimeout(func,delay){

for(var args=[],i=2,l=arguments.length;i<l;++i)
args[i-2]=arguments[i];


return global.setTimeout(function(){
func.apply(this,args);
},+delay);
}module.exports.clearInterval=clearInterval,module.exports.clearTimeout=clearTimeout,module.exports.setInterval=setInterval,module.exports.setTimeout=setTimeout;

}).call(this,require("--global--"));
},{"--global--":1}],4:[function(require,module,exports){




















































































function replacer(key,value){return(
util.isUndefined(value)?
""+value:

util.isNumber(value)&&!isFinite(value)?
value.toString():

util.isFunction(value)||util.isRegExp(value)?
value.toString():

value);
}

function truncate(s,n){return(
util.isString(s)?
s.length<n?s:s.slice(0,n):

s);

}

function getMessage(self){
return truncate(JSON.stringify(self.actual,replacer),128)+" "+
self.operator+" "+
truncate(JSON.stringify(self.expected,replacer),128);
}












function fail(actual,expected,message,operator,stackStartFunction){
throw new assert.AssertionError({
message:message,
actual:actual,
expected:expected,
operator:operator,
stackStartFunction:stackStartFunction});

}











function ok(value,message){
value||fail(value,!0,message,"==",assert.ok);
}




























function _deepEqual(actual,expected){

if(actual===expected)
return!0;

if(util.isBuffer(actual)&&util.isBuffer(expected)){
if(actual.length!=expected.length)return!1;

for(var i=0;i<actual.length;i++)
if(actual[i]!==expected[i])return!1;


return!0;



}return util.isDate(actual)&&util.isDate(expected)?
actual.getTime()===expected.getTime():




util.isRegExp(actual)&&util.isRegExp(expected)?
actual.source===expected.source&&
actual.global===expected.global&&
actual.multiline===expected.multiline&&
actual.lastIndex===expected.lastIndex&&
actual.ignoreCase===expected.ignoreCase:



util.isObject(actual)||util.isObject(expected)?









objEquiv(actual,expected):actual==expected;

}

function isArguments(object){
return"[object Arguments]"==Object.prototype.toString.call(object);
}

function objEquiv(a,b){
if(util.isNullOrUndefined(a)||util.isNullOrUndefined(b))
return!1;

if(a.prototype!==b.prototype)return!1;

if(util.isPrimitive(a)||util.isPrimitive(b))
return a===b;

var aIsArgs=isArguments(a),
bIsArgs=isArguments(b);
if(aIsArgs&&!bIsArgs||!aIsArgs&&bIsArgs)
return!1;
if(aIsArgs)


return a=pSlice.call(a),b=pSlice.call(b),_deepEqual(a,b);

var ka=objectKeys(a),
kb=objectKeys(b),
key,i;


if(ka.length!=kb.length)
return!1;




for(ka.sort(),kb.sort(),i=ka.length-1;0<=i;i--)
if(ka[i]!=kb[i])
return!1;



for(i=ka.length-1;0<=i;i--)

if(key=ka[i],!_deepEqual(a[key],b[key]))return!1;

return!0;
}




























function expectedException(actual,expected){
if(!actual||!expected)
return!1;return(


"[object RegExp]"==Object.prototype.toString.call(expected)?
expected.test(actual):!!(
actual instanceof expected)||!(

!0!==expected.call({},actual)));




}

function _throws(shouldThrow,block,expected,message){
var actual;

util.isString(expected)&&(
message=expected,
expected=null);


try{
block();
}catch(e){
actual=e;
}












if(message=(expected&&expected.name?" ("+expected.name+").":".")+(message?" "+message:"."),shouldThrow&&!actual&&fail(actual,expected,"Missing expected exception"+message),!shouldThrow&&expectedException(actual,expected)&&fail(actual,expected,"Got unwanted exception"+message),shouldThrow&&actual&&expected&&
!expectedException(actual,expected)||!shouldThrow&&actual)
throw actual;

}var util=require("util/"),pSlice=Array.prototype.slice,hasOwn=Object.prototype.hasOwnProperty,assert=module.exports=ok;assert.AssertionError=function AssertionError(options){this.name="AssertionError",this.actual=options.actual,this.expected=options.expected,this.operator=options.operator,options.message?(this.message=options.message,this.generatedMessage=!1):(this.message=getMessage(this),this.generatedMessage=!0);var stackStartFunction=options.stackStartFunction||fail;if(Error.captureStackTrace)Error.captureStackTrace(this,stackStartFunction);else{var err=new Error;if(err.stack){var out=err.stack,fn_name=stackStartFunction.name,idx=out.indexOf("\n"+fn_name);if(0<=idx){var next_line=out.indexOf("\n",idx+1);out=out.substring(next_line+1)}this.stack=out}}},util.inherits(assert.AssertionError,Error),assert.fail=fail,assert.ok=ok,assert.equal=function equal(actual,expected,message){actual!=expected&&fail(actual,expected,message,"==",assert.equal)},assert.notEqual=function notEqual(actual,expected,message){actual==expected&&fail(actual,expected,message,"!=",assert.notEqual)},assert.deepEqual=function deepEqual(actual,expected,message){_deepEqual(actual,expected)||fail(actual,expected,message,"deepEqual",assert.deepEqual)},assert.notDeepEqual=function notDeepEqual(actual,expected,message){_deepEqual(actual,expected)&&fail(actual,expected,message,"notDeepEqual",assert.notDeepEqual)},assert.strictEqual=function strictEqual(actual,expected,message){actual!==expected&&fail(actual,expected,message,"===",assert.strictEqual)},assert.notStrictEqual=function notStrictEqual(actual,expected,message){actual===expected&&fail(actual,expected,message,"!==",assert.notStrictEqual)},




assert.throws=function(block,error,message){
_throws.apply(this,[!0].concat(pSlice.call(arguments)));
},


assert.doesNotThrow=function(block,message){
_throws.apply(this,[!1].concat(pSlice.call(arguments)));
},

assert.ifError=function(err){if(err)throw err};

var objectKeys=Object.keys||function(obj){
var keys=[];
for(var key in obj)
hasOwn.call(obj,key)&&keys.push(key);

return keys;
};

},{"util/":9}],5:[function(require,module,exports){


function now(){
return new Date().getTime();
}module.exports=now;

},{}],6:[function(require,module,exports){
var util=require("util"),
now=require("date-now"),

_console={},
times={},

functions=[["log","info"],["info","info"],["warn","warn"],["error","error"]];






functions.forEach(function(tuple){
_console[tuple[0]]=function(){
Ti.API[tuple[1]](util.format.apply(util,arguments));
};
}),

_console.time=function(label){
times[label]=now();
},

_console.timeEnd=function(label){
var time=times[label];
if(!time)
throw new Error("No such label: "+label);


var duration=now()-time;
_console.log(label+": "+duration+"ms");
},

_console.trace=function(){
var err=new Error;
err.name="Trace",
err.message=util.format.apply(null,arguments),
_console.error(err.stack);
},

_console.dir=function(object){
_console.log(util.inspect(object)+"\n");
},

_console.assert=function(expression){
if(!expression){
var arr=Array.prototype.slice.call(arguments,1);
require("assert").ok(!1,util.format.apply(null,arr));
}
},

module.exports=_console;

},{assert:4,"date-now":5,util:9}],7:[function(require,module,exports){


module.exports="function"==typeof Object.create?function inherits(ctor,superCtor){
ctor.super_=superCtor,
ctor.prototype=Object.create(superCtor.prototype,{
constructor:{
value:ctor,
enumerable:!1,
writable:!0,
configurable:!0}});


}:


function inherits(ctor,superCtor){
ctor.super_=superCtor;
var TempCtor=function(){};
TempCtor.prototype=superCtor.prototype,
ctor.prototype=new TempCtor,
ctor.prototype.constructor=ctor;
};


},{}],8:[function(require,module,exports){
module.exports=function isBuffer(arg){
return arg&&"object"==typeof arg&&
"function"==typeof arg.copy&&
"function"==typeof arg.fill&&
"function"==typeof arg.readUInt8;
};
},{}],9:[function(require,module,exports){
(function(process,global,console){




























































































































function inspect(obj,opts){

var ctx={
seen:[],
stylize:stylizeNoColor};

















return 3<=arguments.length&&(ctx.depth=arguments[2]),4<=arguments.length&&(ctx.colors=arguments[3]),isBoolean(opts)?ctx.showHidden=opts:opts&&exports._extend(ctx,opts),isUndefined(ctx.showHidden)&&(ctx.showHidden=!1),isUndefined(ctx.depth)&&(ctx.depth=2),isUndefined(ctx.colors)&&(ctx.colors=!1),isUndefined(ctx.customInspect)&&(ctx.customInspect=!0),ctx.colors&&(ctx.stylize=stylizeWithColor),formatValue(ctx,obj,ctx.depth);
}


































function stylizeWithColor(str,styleType){
var style=inspect.styles[styleType];return(

style?
"\x1B["+inspect.colors[style][0]+"m"+str+
"\x1B["+inspect.colors[style][1]+"m":

str);

}


function stylizeNoColor(str,styleType){
return str;
}


function arrayToHash(array){
var hash={};





return array.forEach(function(val,idx){hash[val]=!0}),hash;
}


function formatValue(ctx,value,recurseTimes){


if(ctx.customInspect&&
value&&
isFunction(value.inspect)&&

value.inspect!==exports.inspect&&

!(value.constructor&&value.constructor.prototype===value)){
var ret=value.inspect(recurseTimes,ctx);



return isString(ret)||(ret=formatValue(ctx,ret,recurseTimes)),ret;
}


var primitive=formatPrimitive(ctx,value);
if(primitive)
return primitive;



var keys=Object.keys(value),
visibleKeys=arrayToHash(keys);







if(ctx.showHidden&&(keys=Object.getOwnPropertyNames(value)),isError(value)&&(
0<=keys.indexOf("message")||0<=keys.indexOf("description")))
return formatError(value);



if(0===keys.length){
if(isFunction(value)){
var name=value.name?": "+value.name:"";
return ctx.stylize("[Function"+name+"]","special");
}
if(isRegExp(value))
return ctx.stylize(RegExp.prototype.toString.call(value),"regexp");

if(isDate(value))
return ctx.stylize(Date.prototype.toString.call(value),"date");

if(isError(value))
return formatError(value);

}

var base="",array=!1,braces=["{","}"];








if(isArray(value)&&(array=!0,braces=["[","]"]),isFunction(value)){
var n=value.name?": "+value.name:"";
base=" [Function"+n+"]";
}
















if(isRegExp(value)&&(base=" "+RegExp.prototype.toString.call(value)),isDate(value)&&(base=" "+Date.prototype.toUTCString.call(value)),isError(value)&&(base=" "+formatError(value)),0===keys.length&&(!array||0==value.length))
return braces[0]+base+braces[1];


if(0>recurseTimes)return(
isRegExp(value)?
ctx.stylize(RegExp.prototype.toString.call(value),"regexp"):

ctx.stylize("[Object]","special"));



ctx.seen.push(value);

var output;










return output=array?formatArray(ctx,value,recurseTimes,visibleKeys,keys):keys.map(function(key){return formatProperty(ctx,value,recurseTimes,visibleKeys,key,array)}),ctx.seen.pop(),reduceToSingleString(output,base,braces);
}


function formatPrimitive(ctx,value){
if(isUndefined(value))
return ctx.stylize("undefined","undefined");
if(isString(value)){
var simple="'"+JSON.stringify(value).replace(/^"|"$/g,"").
replace(/'/g,"\\'").
replace(/\\"/g,"\"")+"'";
return ctx.stylize(simple,"string");
}return(
isNumber(value)?
ctx.stylize(""+value,"number"):
isBoolean(value)?
ctx.stylize(""+value,"boolean"):

isNull(value)?
ctx.stylize("null","null"):void 0);
}


function formatError(value){
return"["+Error.prototype.toString.call(value)+"]";
}


function formatArray(ctx,value,recurseTimes,visibleKeys,keys){

for(var output=[],i=0,l=value.length;i<l;++i)
hasOwnProperty(value,i+"")?
output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,
i+"",!0)):

output.push("");








return keys.forEach(function(key){key.match(/^\d+$/)||output.push(formatProperty(ctx,value,recurseTimes,visibleKeys,key,!0))}),output;
}


function formatProperty(ctx,value,recurseTimes,visibleKeys,key,array){
var name,str,desc;





































if(desc=Object.getOwnPropertyDescriptor(value,key)||{value:value[key]},desc.get?desc.set?str=ctx.stylize("[Getter/Setter]","special"):str=ctx.stylize("[Getter]","special"):desc.set&&(str=ctx.stylize("[Setter]","special")),hasOwnProperty(visibleKeys,key)||(name="["+key+"]"),str||(0>ctx.seen.indexOf(desc.value)?(str=isNull(recurseTimes)?formatValue(ctx,desc.value,null):formatValue(ctx,desc.value,recurseTimes-1),-1<str.indexOf("\n")&&(array?str=str.split("\n").map(function(line){return"  "+line}).join("\n").substr(2):str="\n"+str.split("\n").map(function(line){return"   "+line}).join("\n"))):str=ctx.stylize("[Circular]","special")),isUndefined(name)){
if(array&&key.match(/^\d+$/))
return str;

name=JSON.stringify(""+key),
name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(
name=name.substr(1,name.length-2),
name=ctx.stylize(name,"name")):(

name=name.replace(/'/g,"\\'").
replace(/\\"/g,"\"").
replace(/(^"|"$)/g,"'"),
name=ctx.stylize(name,"string"));

}

return name+": "+str;
}


function reduceToSingleString(output,base,braces){
var numLinesEst=0,
length=output.reduce(function(prev,cur){


return numLinesEst++,0<=cur.indexOf("\n")&&numLinesEst++,prev+cur.replace(/\u001b\[\d\d?m/g,"").length+1;
},0);return(

60<length?
braces[0]+(
""===base?"":base+"\n ")+
" "+
output.join(",\n  ")+
" "+
braces[1]:


braces[0]+base+" "+output.join(", ")+" "+braces[1]);
}




function isArray(ar){
return Array.isArray(ar);
}


function isBoolean(arg){
return"boolean"==typeof arg;
}


function isNull(arg){
return null===arg;
}


function isNullOrUndefined(arg){
return null==arg;
}


function isNumber(arg){
return"number"==typeof arg;
}


function isString(arg){
return"string"==typeof arg;
}


function isSymbol(arg){
return"symbol"==typeof arg;
}


function isUndefined(arg){
return void 0===arg;
}


function isRegExp(re){
return isObject(re)&&"[object RegExp]"===objectToString(re);
}


function isObject(arg){
return"object"==typeof arg&&null!==arg;
}


function isDate(d){
return isObject(d)&&"[object Date]"===objectToString(d);
}


function isError(e){
return isObject(e)&&(
"[object Error]"===objectToString(e)||e instanceof Error);
}


function isFunction(arg){
return"function"==typeof arg;
}


function isPrimitive(arg){
return null===arg||
"boolean"==typeof arg||
"number"==typeof arg||
"string"==typeof arg||
"symbol"==typeof arg||
"undefined"==typeof arg;
}




function objectToString(o){
return Object.prototype.toString.call(o);
}


function pad(n){
return 10>n?"0"+n.toString(10):n.toString(10);
}






function timestamp(){
var d=new Date,
time=[pad(d.getHours()),
pad(d.getMinutes()),
pad(d.getSeconds())].join(":");
return[d.getDate(),months[d.getMonth()],time].join(" ");
}



































function hasOwnProperty(obj,prop){
return Object.prototype.hasOwnProperty.call(obj,prop);
}var formatRegExp=/%[sdj%]/g;exports.format=function(f){if(!isString(f)){for(var objects=[],i=0;i<arguments.length;i++)objects.push(inspect(arguments[i]));return objects.join(" ")}for(var i=1,args=arguments,len=args.length,str=(f+"").replace(formatRegExp,function(x){if("%%"===x)return"%";if(i>=len)return x;switch(x){case"%s":return args[i++]+"";case"%d":return+args[i++];case"%j":try{return JSON.stringify(args[i++])}catch(_){return"[Circular]"}default:return x;}}),x=args[i];i<len;x=args[++i])str+=isNull(x)||!isObject(x)?" "+x:" "+inspect(x);return str},exports.deprecate=function(fn,msg){function deprecated(){if(!warned){if(process.throwDeprecation)throw new Error(msg);else process.traceDeprecation?console.trace(msg):console.error(msg);warned=!0}return fn.apply(this,arguments)}if(isUndefined(global.process))return function(){return exports.deprecate(fn,msg).apply(this,arguments)};if(!0===process.noDeprecation)return fn;var warned=!1;return deprecated};var debugs={},debugEnviron;exports.debuglog=function(set){if(isUndefined(debugEnviron)&&(debugEnviron=process.env.NODE_DEBUG||""),set=set.toUpperCase(),!debugs[set])if(new RegExp("\\b"+set+"\\b","i").test(debugEnviron)){var pid=process.pid;debugs[set]=function(){var msg=exports.format.apply(exports,arguments);console.error("%s %d: %s",set,pid,msg)}}else debugs[set]=function(){};return debugs[set]},exports.inspect=inspect,inspect.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},inspect.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},exports.isArray=isArray,exports.isBoolean=isBoolean,exports.isNull=isNull,exports.isNullOrUndefined=isNullOrUndefined,exports.isNumber=isNumber,exports.isString=isString,exports.isSymbol=isSymbol,exports.isUndefined=isUndefined,exports.isRegExp=isRegExp,exports.isObject=isObject,exports.isDate=isDate,exports.isError=isError,exports.isFunction=isFunction,exports.isPrimitive=isPrimitive,exports.isBuffer=require("./support/isBuffer");var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];exports.log=function(){console.log("%s - %s",timestamp(),exports.format.apply(exports,arguments))},exports.inherits=require("inherits"),exports._extend=function(origin,add){if(!add||!isObject(add))return origin;for(var keys=Object.keys(add),i=keys.length;i--;)origin[keys[i]]=add[keys[i]];return origin};

}).call(this,require("--process--"),require("--global--"),require("--console--"));
},{"--console--":6,"--global--":1,"--process--":2,"./support/isBuffer":8,inherits:7}],10:[function(require,module,exports){
(function(console){
(function(global,factory){
"object"==typeof exports&&"undefined"!=typeof module?factory(exports):
"function"==typeof define&&define.amd?define(["exports"],factory):
factory(global.turf={});
})(this,function(exports){"use strict";























































































function feature(geometry,properties,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var bbox=options.bbox,
id=options.id;


if(void 0===geometry)throw new Error("geometry is required");
if(properties&&properties.constructor!==Object)throw new Error("properties must be an Object");
bbox&&validateBBox(bbox),
id&&validateId(id);


var feat={type:"Feature"};




return id&&(feat.id=id),bbox&&(feat.bbox=bbox),feat.properties=properties||{},feat.geometry=geometry,feat;
}



















function geometry(type,coordinates,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var bbox=options.bbox;


if(!type)throw new Error("type is required");
if(!coordinates)throw new Error("coordinates is required");
if(!Array.isArray(coordinates))throw new Error("coordinates must be an Array");
bbox&&validateBBox(bbox);


var geom;
switch(type){
case"Point":geom=point(coordinates).geometry;break;
case"LineString":geom=lineString(coordinates).geometry;break;
case"Polygon":geom=polygon(coordinates).geometry;break;
case"MultiPoint":geom=multiPoint(coordinates).geometry;break;
case"MultiLineString":geom=multiLineString(coordinates).geometry;break;
case"MultiPolygon":geom=multiPolygon(coordinates).geometry;break;
default:throw new Error(type+" is invalid");}


return bbox&&(geom.bbox=bbox),geom;
}
















function point(coordinates,properties,options){
if(!coordinates)throw new Error("coordinates is required");
if(!Array.isArray(coordinates))throw new Error("coordinates must be an Array");
if(2>coordinates.length)throw new Error("coordinates must be at least 2 numbers long");
if(!isNumber(coordinates[0])||!isNumber(coordinates[1]))throw new Error("coordinates must contain numbers");

return feature({
type:"Point",
coordinates:coordinates},
properties,options);
}




















function points(coordinates,properties,options){
if(!coordinates)throw new Error("coordinates is required");
if(!Array.isArray(coordinates))throw new Error("coordinates must be an Array");

return featureCollection(coordinates.map(function(coords){
return point(coords,properties);
}),options);
}
















function polygon(coordinates,properties,options){
if(!coordinates)throw new Error("coordinates is required");

for(var i=0,
ring;i<coordinates.length;i++){
if(ring=coordinates[i],4>ring.length)
throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");

for(var j=0;j<ring[ring.length-1].length;j++){

if(0===i&&0===j&&!isNumber(ring[0][0])||!isNumber(ring[0][1]))throw new Error("coordinates must contain numbers");
if(ring[ring.length-1][j]!==ring[0][j])
throw new Error("First and last Position are not equivalent.");

}
}

return feature({
type:"Polygon",
coordinates:coordinates},
properties,options);
}



















function polygons(coordinates,properties,options){
if(!coordinates)throw new Error("coordinates is required");
if(!Array.isArray(coordinates))throw new Error("coordinates must be an Array");

return featureCollection(coordinates.map(function(coords){
return polygon(coords,properties);
}),options);
}


















function lineString(coordinates,properties,options){
if(!coordinates)throw new Error("coordinates is required");
if(2>coordinates.length)throw new Error("coordinates must be an array of two or more positions");

if(!isNumber(coordinates[0][1])||!isNumber(coordinates[0][1]))throw new Error("coordinates must contain numbers");

return feature({
type:"LineString",
coordinates:coordinates},
properties,options);
}



















function lineStrings(coordinates,properties,options){
if(!coordinates)throw new Error("coordinates is required");
if(!Array.isArray(coordinates))throw new Error("coordinates must be an Array");

return featureCollection(coordinates.map(function(coords){
return lineString(coords,properties);
}),options);
}























function featureCollection(features,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var bbox=options.bbox,
id=options.id;


if(!features)throw new Error("No features passed");
if(!Array.isArray(features))throw new Error("features must be an Array");
bbox&&validateBBox(bbox),
id&&validateId(id);


var fc={type:"FeatureCollection"};



return id&&(fc.id=id),bbox&&(fc.bbox=bbox),fc.features=features,fc;
}


















function multiLineString(coordinates,properties,options){
if(!coordinates)throw new Error("coordinates is required");

return feature({
type:"MultiLineString",
coordinates:coordinates},
properties,options);
}


















function multiPoint(coordinates,properties,options){
if(!coordinates)throw new Error("coordinates is required");

return feature({
type:"MultiPoint",
coordinates:coordinates},
properties,options);
}



















function multiPolygon(coordinates,properties,options){
if(!coordinates)throw new Error("coordinates is required");

return feature({
type:"MultiPolygon",
coordinates:coordinates},
properties,options);
}

























function geometryCollection(geometries,properties,options){
if(!geometries)throw new Error("geometries is required");
if(!Array.isArray(geometries))throw new Error("geometries must be an Array");

return feature({
type:"GeometryCollection",
geometries:geometries},
properties,options);
}














function round(num,precision){
if(num===void 0||null===num||isNaN(num))throw new Error("num is required");
if(precision&&!(0<=precision))throw new Error("precision must be a positive number");
var multiplier=_Mathpow(10,precision||0);
return _Mathround(num*multiplier)/multiplier;
}










function radiansToLength(radians,units){
if(radians===void 0||null===radians)throw new Error("radians is required");

if(units&&"string"!=typeof units)throw new Error("units must be a string");
var factor=factors[units||"kilometers"];
if(!factor)throw new Error(units+" units is invalid");
return radians*factor;
}










function lengthToRadians(distance,units){
if(distance===void 0||null===distance)throw new Error("distance is required");

if(units&&"string"!=typeof units)throw new Error("units must be a string");
var factor=factors[units||"kilometers"];
if(!factor)throw new Error(units+" units is invalid");
return distance/factor;
}










function lengthToDegrees(distance,units){
return radiansToDegrees(lengthToRadians(distance,units));
}









function bearingToAzimuth(bearing){
if(null===bearing||void 0===bearing)throw new Error("bearing is required");

var angle=bearing%360;

return 0>angle&&(angle+=360),angle;
}








function radiansToDegrees(radians){
if(null===radians||radians===void 0)throw new Error("radians is required");

var degrees=radians%(2*_MathPI);
return 180*degrees/_MathPI;
}








function degreesToRadians(degrees){
if(null===degrees||degrees===void 0)throw new Error("degrees is required");

var radians=degrees%360;
return radians*_MathPI/180;
}










function convertLength(length,originalUnit,finalUnit){
if(null===length||length===void 0)throw new Error("length is required");
if(!(0<=length))throw new Error("length must be a positive number");

return radiansToLength(lengthToRadians(length,originalUnit),finalUnit||"kilometers");
}









function convertArea(area,originalUnit,finalUnit){
if(null===area||area===void 0)throw new Error("area is required");
if(!(0<=area))throw new Error("area must be a positive number");

var startFactor=areaFactors[originalUnit||"meters"];
if(!startFactor)throw new Error("invalid original units");

var finalFactor=areaFactors[finalUnit||"kilometers"];
if(!finalFactor)throw new Error("invalid final units");

return area/startFactor*finalFactor;
}












function isNumber(num){
return!isNaN(num)&&null!==num&&!Array.isArray(num);
}












function isObject(input){
return!!input&&input.constructor===Object;
}






















function validateBBox(bbox){
if(!bbox)throw new Error("bbox is required");
if(!Array.isArray(bbox))throw new Error("bbox must be an Array");
if(4!==bbox.length&&6!==bbox.length)throw new Error("bbox must be an Array of 4 or 6 numbers");
bbox.forEach(function(num){
if(!isNumber(num))throw new Error("bbox must only contain numbers");
});
}






















function validateId(id){
if(!id)throw new Error("id is required");
if(-1===["string","number"].indexOf(typeof id))throw new Error("id must be a number or a string");
}


function radians2degrees(){
throw new Error("method has been renamed to `radiansToDegrees`");
}

function degrees2radians(){
throw new Error("method has been renamed to `degreesToRadians`");
}

function distanceToDegrees(){
throw new Error("method has been renamed to `lengthToDegrees`");
}

function distanceToRadians(){
throw new Error("method has been renamed to `lengthToRadians`");
}

function radiansToDistance(){
throw new Error("method has been renamed to `radiansToLength`");
}

function bearingToAngle(){
throw new Error("method has been renamed to `bearingToAzimuth`");
}

function convertDistance(){
throw new Error("method has been renamed to `convertLength`");
}












































































function coordEach(geojson,callback,excludeWrapCoord){

if(null!==geojson)






















for(var wrapShrink=0,coordIndex=0,type=geojson.type,isFeatureCollection="FeatureCollection"===type,isFeature="Feature"===type,stop=isFeatureCollection?geojson.features.length:1,featureIndex=0,j,k,l,geometry$$1,stopG,coords,geometryMaybeCollection,isGeometryCollection;featureIndex<stop;featureIndex++){
geometryMaybeCollection=isFeatureCollection?geojson.features[featureIndex].geometry:
isFeature?geojson.geometry:geojson,
isGeometryCollection=!!geometryMaybeCollection&&"GeometryCollection"===geometryMaybeCollection.type,
stopG=isGeometryCollection?geometryMaybeCollection.geometries.length:1;

for(var geomIndex=0;geomIndex<stopG;geomIndex++){
var multiFeatureIndex=0,
geometryIndex=0;




if(geometry$$1=isGeometryCollection?geometryMaybeCollection.geometries[geomIndex]:geometryMaybeCollection,null!==geometry$$1){
coords=geometry$$1.coordinates;
var geomType=geometry$$1.type;



switch(wrapShrink=excludeWrapCoord&&("Polygon"===geomType||"MultiPolygon"===geomType)?1:0,geomType){
case null:
break;
case"Point":
callback(coords,coordIndex,featureIndex,multiFeatureIndex,geometryIndex),
coordIndex++,
multiFeatureIndex++;
break;
case"LineString":
case"MultiPoint":
for(j=0;j<coords.length;j++)
callback(coords[j],coordIndex,featureIndex,multiFeatureIndex,geometryIndex),
coordIndex++,
"MultiPoint"===geomType&&multiFeatureIndex++;

"LineString"===geomType&&multiFeatureIndex++;
break;
case"Polygon":
case"MultiLineString":
for(j=0;j<coords.length;j++){
for(k=0;k<coords[j].length-wrapShrink;k++)
callback(coords[j][k],coordIndex,featureIndex,multiFeatureIndex,geometryIndex),
coordIndex++;

"MultiLineString"===geomType&&multiFeatureIndex++,
"Polygon"===geomType&&geometryIndex++;
}
"Polygon"===geomType&&multiFeatureIndex++;
break;
case"MultiPolygon":
for(j=0;j<coords.length;j++){

for("MultiPolygon"===geomType&&(geometryIndex=0),k=0;k<coords[j].length;k++){
for(l=0;l<coords[j][k].length-wrapShrink;l++)
callback(coords[j][k][l],coordIndex,featureIndex,multiFeatureIndex,geometryIndex),
coordIndex++;

geometryIndex++;
}
multiFeatureIndex++;
}
break;
case"GeometryCollection":
for(j=0;j<geometry$$1.geometries.length;j++)
coordEach(geometry$$1.geometries[j],callback,excludeWrapCoord);
break;
default:
throw new Error("Unknown Geometry Type");}}

}
}
}



















































function coordReduce(geojson,callback,initialValue,excludeWrapCoord){
var previousValue=initialValue;




return coordEach(geojson,function(currentCoord,coordIndex,featureIndex,multiFeatureIndex,geometryIndex){previousValue=0===coordIndex&&void 0===initialValue?currentCoord:callback(previousValue,currentCoord,coordIndex,featureIndex,multiFeatureIndex,geometryIndex)},excludeWrapCoord),previousValue;
}


























function propEach(geojson,callback){
var i;
switch(geojson.type){
case"FeatureCollection":
for(i=0;i<geojson.features.length;i++)
callback(geojson.features[i].properties,i);

break;
case"Feature":
callback(geojson.properties,0);}


}














































function propReduce(geojson,callback,initialValue){
var previousValue=initialValue;




return propEach(geojson,function(currentProperties,featureIndex){previousValue=0===featureIndex&&void 0===initialValue?currentProperties:callback(previousValue,currentProperties,featureIndex)}),previousValue;
}



























function featureEach(geojson,callback){
if("Feature"===geojson.type)
callback(geojson,0);else
if("FeatureCollection"===geojson.type)
for(var i=0;i<geojson.features.length;i++)
callback(geojson.features[i],i);


}











































function featureReduce(geojson,callback,initialValue){
var previousValue=initialValue;




return featureEach(geojson,function(currentFeature,featureIndex){previousValue=0===featureIndex&&void 0===initialValue?currentFeature:callback(previousValue,currentFeature,featureIndex)}),previousValue;
}
















function coordAll(geojson){
var coords=[];



return coordEach(geojson,function(coord){coords.push(coord)}),coords;
}
































function geomEach(geojson,callback){
var





featureIndex=0,
isFeatureCollection="FeatureCollection"===geojson.type,
isFeature="Feature"===geojson.type,
stop=isFeatureCollection?geojson.features.length:1,i,j,g,geometry$$1,stopG,geometryMaybeCollection,isGeometryCollection,featureProperties,featureBBox,featureId;













for(i=0;i<stop;i++){












for(geometryMaybeCollection=isFeatureCollection?geojson.features[i].geometry:isFeature?geojson.geometry:geojson,featureProperties=isFeatureCollection?geojson.features[i].properties:isFeature?geojson.properties:{},featureBBox=isFeatureCollection?geojson.features[i].bbox:isFeature?geojson.bbox:void 0,featureId=isFeatureCollection?geojson.features[i].id:isFeature?geojson.id:void 0,isGeometryCollection=!!geometryMaybeCollection&&"GeometryCollection"===geometryMaybeCollection.type,stopG=isGeometryCollection?geometryMaybeCollection.geometries.length:1,g=0;g<stopG;g++){




if(geometry$$1=isGeometryCollection?geometryMaybeCollection.geometries[g]:geometryMaybeCollection,null===geometry$$1){
callback(null,featureIndex,featureProperties,featureBBox,featureId);
continue;
}
switch(geometry$$1.type){
case"Point":
case"LineString":
case"MultiPoint":
case"Polygon":
case"MultiLineString":
case"MultiPolygon":{
callback(geometry$$1,featureIndex,featureProperties,featureBBox,featureId);
break;
}
case"GeometryCollection":{
for(j=0;j<geometry$$1.geometries.length;j++)
callback(geometry$$1.geometries[j],featureIndex,featureProperties,featureBBox,featureId);

break;
}
default:
throw new Error("Unknown Geometry Type");}

}

featureIndex++;
}
}

















































function geomReduce(geojson,callback,initialValue){
var previousValue=initialValue;




return geomEach(geojson,function(currentGeometry,featureIndex,featureProperties,featureBBox,featureId){previousValue=0===featureIndex&&void 0===initialValue?currentGeometry:callback(previousValue,currentGeometry,featureIndex,featureProperties,featureBBox,featureId)}),previousValue;
}





























function flattenEach(geojson,callback){
geomEach(geojson,function(geometry$$1,featureIndex,properties,bbox,id){

var type=null===geometry$$1?null:geometry$$1.type;
switch(type){
case null:
case"Point":
case"LineString":
case"Polygon":

return void callback(feature(geometry$$1,properties,{bbox:bbox,id:id}),featureIndex,0);}


var geomType;



"MultiPoint"===type?
geomType="Point":

"MultiLineString"===type?
geomType="LineString":

"MultiPolygon"===type?
geomType="Polygon":void 0;



geometry$$1.coordinates.forEach(function(coordinate,multiFeatureIndex){
var geom={
type:geomType,
coordinates:coordinate};

callback(feature(geom,properties),featureIndex,multiFeatureIndex);
});

});
}













































function flattenReduce(geojson,callback,initialValue){
var previousValue=initialValue;




return flattenEach(geojson,function(currentFeature,featureIndex,multiFeatureIndex){previousValue=0===featureIndex&&0===multiFeatureIndex&&void 0===initialValue?currentFeature:callback(previousValue,currentFeature,featureIndex,multiFeatureIndex)}),previousValue;
}






































function segmentEach(geojson,callback){
flattenEach(geojson,function(feature$$1,featureIndex,multiFeatureIndex){
var segmentIndex=0;


if(feature$$1.geometry){

var type=feature$$1.geometry.type;
"Point"===type||"MultiPoint"===type||


coordReduce(feature$$1,function(previousCoords,currentCoord,coordIndex,featureIndexCoord,mutliPartIndexCoord,geometryIndex){
var currentSegment=lineString([previousCoords,currentCoord],feature$$1.properties);


return callback(currentSegment,featureIndex,multiFeatureIndex,geometryIndex,segmentIndex),segmentIndex++,currentCoord;
})}
});
}






















































function segmentReduce(geojson,callback,initialValue){
var previousValue=initialValue,
started=!1;





return segmentEach(geojson,function(currentSegment,featureIndex,multiFeatureIndex,geometryIndex,segmentIndex){previousValue=!1==started&&void 0===initialValue?currentSegment:callback(previousValue,currentSegment,featureIndex,multiFeatureIndex,geometryIndex,segmentIndex),started=!0}),previousValue;
}































function lineEach(geojson,callback){

if(!geojson)throw new Error("geojson is required");

flattenEach(geojson,function(feature$$1,featureIndex,multiFeatureIndex){
if(null!==feature$$1.geometry){
var type=feature$$1.geometry.type,
coords=feature$$1.geometry.coordinates;
switch(type){
case"LineString":
callback(feature$$1,featureIndex,multiFeatureIndex,0,0);
break;
case"Polygon":
for(var geometryIndex=0;geometryIndex<coords.length;geometryIndex++)
callback(lineString(coords[geometryIndex],feature$$1.properties),featureIndex,multiFeatureIndex,geometryIndex);}}



});
}















































function lineReduce(geojson,callback,initialValue){
var previousValue=initialValue;




return lineEach(geojson,function(currentLine,featureIndex,multiFeatureIndex,geometryIndex){previousValue=0===featureIndex&&void 0===initialValue?currentLine:callback(previousValue,currentLine,featureIndex,multiFeatureIndex,geometryIndex)}),previousValue;
}




































function bbox(geojson){
var BBox=[Infinity,Infinity,-Infinity,-Infinity];






return coordEach(geojson,function(coord){BBox[0]>coord[0]&&(BBox[0]=coord[0]),BBox[1]>coord[1]&&(BBox[1]=coord[1]),BBox[2]<coord[0]&&(BBox[2]=coord[0]),BBox[3]<coord[1]&&(BBox[3]=coord[1])}),BBox;
}













function getCoord(obj){
if(!obj)throw new Error("obj is required");

var coordinates=getCoords(obj);


if(1<coordinates.length&&isNumber(coordinates[0])&&isNumber(coordinates[1]))
return coordinates;

throw new Error("Coordinate is not a valid Point");

}













function getCoords(obj){
if(!obj)throw new Error("obj is required");
var coordinates;














if(obj.length?coordinates=obj:obj.coordinates?coordinates=obj.coordinates:obj.geometry&&obj.geometry.coordinates&&(coordinates=obj.geometry.coordinates),coordinates)

return containsNumber(coordinates),coordinates;

throw new Error("No valid coordinates");
}








function containsNumber(coordinates){
if(1<coordinates.length&&isNumber(coordinates[0])&&isNumber(coordinates[1]))
return!0;


if(Array.isArray(coordinates[0])&&coordinates[0].length)
return containsNumber(coordinates[0]);

throw new Error("coordinates must only contain numbers");
}










function geojsonType(value,type,name){
if(!type||!name)throw new Error("type and name required");

if(!value||value.type!==type)
throw new Error("Invalid input to "+name+": must be a "+type+", given "+value.type);

}











function featureOf(feature$$1,type,name){
if(!feature$$1)throw new Error("No feature passed");
if(!name)throw new Error(".featureOf() requires a name");
if(!feature$$1||"Feature"!==feature$$1.type||!feature$$1.geometry)
throw new Error("Invalid input to "+name+", Feature with geometry required");

if(!feature$$1.geometry||feature$$1.geometry.type!==type)
throw new Error("Invalid input to "+name+": must be a "+type+", given "+feature$$1.geometry.type);

}











function collectionOf(featureCollection$$1,type,name){
if(!featureCollection$$1)throw new Error("No featureCollection passed");
if(!name)throw new Error(".collectionOf() requires a name");
if(!featureCollection$$1||"FeatureCollection"!==featureCollection$$1.type)
throw new Error("Invalid input to "+name+", FeatureCollection required");

for(var i=0,
feature$$1;i<featureCollection$$1.features.length;i++){
if(feature$$1=featureCollection$$1.features[i],!feature$$1||"Feature"!==feature$$1.type||!feature$$1.geometry)
throw new Error("Invalid input to "+name+", Feature with geometry required");

if(!feature$$1.geometry||feature$$1.geometry.type!==type)
throw new Error("Invalid input to "+name+": must be a "+type+", given "+feature$$1.geometry.type);

}
}



















function getGeom(geojson){
if(!geojson)throw new Error("geojson is required");
if(void 0!==geojson.geometry)return geojson.geometry;
if(geojson.coordinates||geojson.geometries)return geojson;
throw new Error("geojson must be a valid Feature or Geometry Object");
}






function getGeomType(){
throw new Error("invariant.getGeomType has been deprecated in v5.0 in favor of invariant.getType");
}



















function getType(geojson,name){
if(!geojson)throw new Error((name||"geojson")+" is required");

if(geojson.geometry&&geojson.geometry.type)return geojson.geometry.type;

if(geojson.type)return geojson.type;
throw new Error((name||"geojson")+" is invalid");
}



































function isoContours(data,threshold,options){

options=options?options:{};



for(var optionKeys=Object.keys(defaultSettings),i=0;i<optionKeys.length;i++){
var key=optionKeys[i],
val=options[key];
val="undefined"!=typeof val&&null!==val?val:defaultSettings[key],

settings[key]=val;
}

settings.verbose&&
console.log("MarchingSquaresJS-isoContours: computing isocontour for "+threshold);

var ret=contourGrid2Paths(computeContourGrid(data,threshold));




return"function"==typeof settings.successCallback&&settings.successCallback(ret),ret;
}













function interpolateX(y,y0,y1){
return(y-y0)/(y1-y0);
}


function computeContourGrid(data,threshold){




for(var rows=data.length-1,cols=data[0].length-1,ContourGrid={rows:rows,cols:cols,cells:[]},j=0;j<rows;++j){
ContourGrid.cells[j]=[];
for(var i=0;i<cols;++i){

var cval=0,

tl=data[j+1][i],
tr=data[j+1][i+1],
br=data[j][i+1],
bl=data[j][i];

if(!(isNaN(tl)||isNaN(tr)||isNaN(br)||isNaN(bl))){


cval|=tl>=threshold?8:0,
cval|=tr>=threshold?4:0,
cval|=br>=threshold?2:0,
cval|=bl>=threshold?1:0;


var flipped=!1;
if(5==cval||10==cval){
var average=(tl+tr+br+bl)/4;
5==cval&&average<threshold?(
cval=10,
flipped=!0):
10==cval&&average<threshold&&(
cval=5,
flipped=!0);

}


if(0!=cval&&15!=cval){
var top,bottom,left,right;
top=bottom=left=right=0.5,

1==cval?(
left=1-interpolateX(threshold,tl,bl),
bottom=1-interpolateX(threshold,br,bl)):
2==cval?(
bottom=interpolateX(threshold,bl,br),
right=1-interpolateX(threshold,tr,br)):
3==cval?(
left=1-interpolateX(threshold,tl,bl),
right=1-interpolateX(threshold,tr,br)):
4==cval?(
top=interpolateX(threshold,tl,tr),
right=interpolateX(threshold,br,tr)):
5==cval?(
top=interpolateX(threshold,tl,tr),
right=interpolateX(threshold,br,tr),
bottom=1-interpolateX(threshold,br,bl),
left=1-interpolateX(threshold,tl,bl)):
6==cval?(
bottom=interpolateX(threshold,bl,br),
top=interpolateX(threshold,tl,tr)):
7==cval?(
left=1-interpolateX(threshold,tl,bl),
top=interpolateX(threshold,tl,tr)):
8==cval?(
left=interpolateX(threshold,bl,tl),
top=1-interpolateX(threshold,tr,tl)):
9==cval?(
bottom=1-interpolateX(threshold,br,bl),
top=1-interpolateX(threshold,tr,tl)):
10==cval?(
top=1-interpolateX(threshold,tr,tl),
right=1-interpolateX(threshold,tr,br),
bottom=interpolateX(threshold,bl,br),
left=interpolateX(threshold,bl,tl)):
11==cval?(
top=1-interpolateX(threshold,tr,tl),
right=1-interpolateX(threshold,tr,br)):
12==cval?(
left=interpolateX(threshold,bl,tl),
right=interpolateX(threshold,br,tr)):
13==cval?(
bottom=1-interpolateX(threshold,br,bl),
right=interpolateX(threshold,br,tr)):
14==cval?(
left=interpolateX(threshold,bl,tl),
bottom=interpolateX(threshold,bl,br)):

console.log("MarchingSquaresJS-isoContours: Illegal cval detected: "+cval),

ContourGrid.cells[j][i]={
cval:cval,
flipped:flipped,
top:top,
right:right,
bottom:bottom,
left:left};

}}

}
}

return ContourGrid;
}

function isSaddle(cell){
return 5===cell.cval||10===cell.cval;
}

function isTrivial(cell){
return 0===cell.cval||15===cell.cval;
}

function clearCell(cell){
isTrivial(cell)||5===cell.cval||10===cell.cval||(
cell.cval=15);

}

function getXY(cell,edge){
if("top"===edge)
return[cell.top,1];return(
"bottom"===edge?
[cell.bottom,0]:
"right"===edge?
[1,cell.right]:
"left"===edge?
[0,cell.left]:void 0);

}

function contourGrid2Paths(grid){
var paths=[],
path_idx=0,
rows=grid.rows,
cols=grid.cols,
epsilon=1e-7;































return grid.cells.forEach(function(g,j){g.forEach(function(gg,i){if("undefined"!=typeof gg&&!isSaddle(gg)&&!isTrivial(gg)){var p=tracePath(grid.cells,j,i),merged=!1;if("mergeable"===p.info)for(var x=p.path[p.path.length-1][0],y=p.path[p.path.length-1][1],k=path_idx-1;0<=k;k--)if(_Mathabs(paths[k][0][0]-x)<=epsilon&&_Mathabs(paths[k][0][1]-y)<=epsilon){for(var l=p.path.length-2;0<=l;--l)paths[k].unshift(p.path[l]);merged=!0;break}merged||(paths[path_idx++]=p.path)}})}),paths;
}





function tracePath(grid,j,i){
var maxj=grid.length,
p=[],
dxContour=[0,0,1,1,0,0,0,0,-1,0,1,1,-1,0,-1,0],
dyContour=[0,-1,0,0,1,1,1,1,0,-1,0,0,0,-1,0,0],

startEdge=["none","left","bottom","left","right","none","bottom","left","top","top","none","top","right","right","bottom","none"],
nextEdge=["none","bottom","right","right","top","top","top","top","left","bottom","right","right","left","bottom","left","none"],


startCell=grid[j][i],
currentCell=grid[j][i],

cval=currentCell.cval,
edge=startEdge[cval],

pt=getXY(currentCell,edge),dx,dy,edge;


p.push([i+pt[0],j+pt[1]]),
edge=nextEdge[cval],
pt=getXY(currentCell,edge),
p.push([i+pt[0],j+pt[1]]),
clearCell(currentCell);for(


var k=i+dxContour[cval],
l=j+dyContour[cval],
prev_cval=cval;

0<=k&&0<=l&&l<maxj&&(k!=i||l!=j)&&(
currentCell=grid[l][k],
"undefined"!=typeof currentCell);){




if(cval=currentCell.cval,0===cval||15===cval)
return{path:p,info:"mergeable"};

edge=nextEdge[cval],
dx=dxContour[cval],
dy=dyContour[cval],(
5===cval||10===cval)&&(

5===cval?
currentCell.flipped?
-1===dyContour[prev_cval]?(
edge="left",
dx=-1,
dy=0):(

edge="right",
dx=1,
dy=0):


-1===dxContour[prev_cval]&&(
edge="bottom",
dx=0,
dy=-1):


10===cval&&(
currentCell.flipped?
-1===dxContour[prev_cval]?(
edge="top",
dx=0,
dy=1):(

edge="bottom",
dx=0,
dy=-1):


1===dyContour[prev_cval]&&(
edge="left",
dx=-1,
dy=0))),




pt=getXY(currentCell,edge),
p.push([k+pt[0],l+pt[1]]),
clearCell(currentCell),
k+=dx,
l+=dy,
prev_cval=cval}


return{path:p,info:"closed"};
}

































function gridToMatrix(grid,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var zProperty=options.zProperty||"elevation",
flip=options.flip,
flags=options.flags;


collectionOf(grid,"Point","input must contain Points");






for(var pointsMatrix=sortPointsByLatLng(grid,flip),matrix=[],r=0;r<pointsMatrix.length;r++){


for(var pointRow=pointsMatrix[r],row=[],c=0,
point$$1;c<pointRow.length;c++)point$$1=pointRow[c],

point$$1.properties[zProperty]?row.push(point$$1.properties[zProperty]):
row.push(0),

!0===flags&&(point$$1.properties.matrixPosition=[r,c]);

matrix.push(row);
}

return matrix;
}









function sortPointsByLatLng(points$$1,flip){
var pointsByLatitude={};


featureEach(points$$1,function(point$$1){
var lat=getCoords(point$$1)[1];
pointsByLatitude[lat]||(pointsByLatitude[lat]=[]),
pointsByLatitude[lat].push(point$$1);
});


var orderedRowsByLatitude=Object.keys(pointsByLatitude).map(function(lat){
var row=pointsByLatitude[lat],
rowOrderedByLongitude=row.sort(function(a,b){
return getCoords(a)[0]-getCoords(b)[0];
});
return rowOrderedByLongitude;
}),


pointMatrix=orderedRowsByLatitude.sort(function(a,b){return(
flip?getCoords(a[0])[1]-getCoords(b[0])[1]:
getCoords(b[0])[1]-getCoords(a[0])[1]);
});

return pointMatrix;
}






























function isolines(pointGrid,breaks,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var zProperty=options.zProperty||"elevation",
commonProperties=options.commonProperties||{},
breaksProperties=options.breaksProperties||[];



if(collectionOf(pointGrid,"Point","Input must contain Points"),!breaks)throw new Error("breaks is required");
if(!Array.isArray(breaks))throw new Error("breaks must be an Array");
if(!isObject(commonProperties))throw new Error("commonProperties must be an Object");
if(!Array.isArray(breaksProperties))throw new Error("breaksProperties must be an Array");


var matrix=gridToMatrix(pointGrid,{zProperty:zProperty,flip:!0}),
createdIsoLines=createIsoLines(matrix,breaks,zProperty,commonProperties,breaksProperties),
scaledIsolines=rescaleIsolines(createdIsoLines,matrix,pointGrid);

return featureCollection(scaledIsolines);
}
















function createIsoLines(matrix,breaks,zProperty,commonProperties,breaksProperties){

for(var results=[],i=1;i<breaks.length;i++){
var threshold=+breaks[i],

properties=Object.assign({},

commonProperties,
breaksProperties[i]);

properties[zProperty]=threshold;
var isoline=multiLineString(isoContours(matrix,threshold),properties);

results.push(isoline);
}
return results;
}










function rescaleIsolines(createdIsoLines,matrix,points$$1){


var gridBbox=bbox(points$$1),
originalWidth=gridBbox[2]-gridBbox[0],
originalHeigth=gridBbox[3]-gridBbox[1],


x0=gridBbox[0],
y0=gridBbox[1],


matrixWidth=matrix[0].length-1,
matrixHeight=matrix.length-1,


scaleX=originalWidth/matrixWidth,
scaleY=originalHeigth/matrixHeight,

resize=function(point$$1){
point$$1[0]=point$$1[0]*scaleX+x0,
point$$1[1]=point$$1[1]*scaleY+y0;
};





return createdIsoLines.forEach(function(isoline){coordEach(isoline,resize)}),createdIsoLines;
}







function partialSort(arr,k,left,right,compare){for(
left=left||0,
right=right||arr.length-1,
compare=compare||defaultCompare;

right>left;){
if(600<right-left){
var n=right-left+1,
m=k-left+1,
z=_Mathlog(n),
s=0.5*_Mathexp(2*z/3),
sd=0.5*_Mathsqrt(z*s*(n-s)/n)*(0>m-n/2?-1:1),
newLeft=_Mathmax(left,_Mathfloor(k-m*s/n+sd)),
newRight=_Mathmin(right,_Mathfloor(k+(n-m)*s/n+sd));
partialSort(arr,k,newLeft,newRight,compare);
}

var t=arr[k],
i=left,
j=right;for(

swap(arr,left,k),
0<compare(arr[right],t)&&swap(arr,left,right);

i<j;){for(
swap(arr,i,j),
i++,
j--;
0>compare(arr[i],t);)i++;for(;
0<compare(arr[j],t);)j--;
}

0===compare(arr[left],t)?swap(arr,left,j):(

j++,
swap(arr,j,right)),


j<=k&&(left=j+1),
k<=j&&(right=j-1);
}
}

function swap(arr,i,j){
var tmp=arr[i];
arr[i]=arr[j],
arr[j]=tmp;
}

function defaultCompare(a,b){
return a<b?-1:a>b?1:0;
}





function rbush(maxEntries,format){return(
this instanceof rbush?void(


this._maxEntries=_Mathmax(4,maxEntries||9),
this._minEntries=_Mathmax(2,_Mathceil(0.4*this._maxEntries)),

format&&
this._initFormat(format),


this.clear()):new rbush(maxEntries,format));
}






















































































































































































































































































































































































































































function findItem(item,items,equalsFn){
if(!equalsFn)return items.indexOf(item);

for(var i=0;i<items.length;i++)
if(equalsFn(item,items[i]))return i;

return-1;
}


function calcBBox(node,toBBox){
distBBox(node,0,node.children.length,toBBox,node);
}


function distBBox(node,k,p,toBBox,destNode){
destNode||(destNode=createNode(null)),
destNode.minX=Infinity,
destNode.minY=Infinity,
destNode.maxX=-Infinity,
destNode.maxY=-Infinity;

for(var i=k,child;i<p;i++)
child=node.children[i],
extend(destNode,node.leaf?toBBox(child):child);


return destNode;
}

function extend(a,b){




return a.minX=_Mathmin(a.minX,b.minX),a.minY=_Mathmin(a.minY,b.minY),a.maxX=_Mathmax(a.maxX,b.maxX),a.maxY=_Mathmax(a.maxY,b.maxY),a;
}

function compareNodeMinX(a,b){return a.minX-b.minX}
function compareNodeMinY(a,b){return a.minY-b.minY}

function bboxArea(a){return(a.maxX-a.minX)*(a.maxY-a.minY)}
function bboxMargin(a){return a.maxX-a.minX+(a.maxY-a.minY)}

function enlargedArea(a,b){
return(_Mathmax(b.maxX,a.maxX)-_Mathmin(b.minX,a.minX))*(
_Mathmax(b.maxY,a.maxY)-_Mathmin(b.minY,a.minY));
}

function intersectionArea(a,b){
var minX=_Mathmax(a.minX,b.minX),
minY=_Mathmax(a.minY,b.minY),
maxX=_Mathmin(a.maxX,b.maxX),
maxY=_Mathmin(a.maxY,b.maxY);

return _Mathmax(0,maxX-minX)*
_Mathmax(0,maxY-minY);
}

function contains(a,b){
return a.minX<=b.minX&&
a.minY<=b.minY&&
b.maxX<=a.maxX&&
b.maxY<=a.maxY;
}

function intersects$1(a,b){
return b.minX<=a.maxX&&
b.minY<=a.maxY&&
b.maxX>=a.minX&&
b.maxY>=a.minY;
}

function createNode(children){
return{
children:children,
height:1,
leaf:!0,
minX:Infinity,
minY:Infinity,
maxX:-Infinity,
maxY:-Infinity};

}




function multiSelect(arr,left,right,n,compare){for(
var stack=[left,right],
mid;

stack.length;)
right=stack.pop(),
left=stack.pop(),

right-left<=n||(

mid=left+_Mathceil((right-left)/n/2)*n,
quickselect(arr,mid,left,right,compare),

stack.push(left,mid,mid,right));

}

function createCommonjsModule(fn,module){
return module={exports:{}},fn(module,module.exports),module.exports;
}





function twoProduct(a,b,result){
var x=a*b,

c=SPLITTER*a,
abig=c-a,
ahi=c-abig,
alo=a-ahi,

d=SPLITTER*b,
bbig=d-b,
bhi=d-bbig,
blo=b-bhi,

err1=x-ahi*bhi,
err2=err1-alo*bhi,
err3=err2-ahi*blo,

y=alo*blo-err3;return(

result?(
result[0]=y,
result[1]=x,
result):


[y,x]);
}




function scalarScalar(a,b){
var x=a+b,
bv=x-a,
av=x-bv,
br=b-bv,
ar=a-av,
y=ar+br;return(
y?
[y,x]:

[x]);
}

function linearExpansionSum(e,f){
var ne=0|e.length,
nf=0|f.length;
if(1==ne&&1==nf)
return scalarScalar(e[0],f[0]);

var n=ne+nf,
g=Array(n),
count=0,
eptr=0,
fptr=0,
abs=_Mathabs,
ei=e[eptr],
ea=abs(ei),
fi=f[fptr],
fa=abs(fi),
a,b;
ea<fa?(
b=ei,
eptr+=1,
eptr<ne&&(
ei=e[eptr],
ea=abs(ei))):(


b=fi,
fptr+=1,
fptr<nf&&(
fi=f[fptr],
fa=abs(fi))),


eptr<ne&&ea<fa||fptr>=nf?(
a=ei,
eptr+=1,
eptr<ne&&(
ei=e[eptr],
ea=abs(ei))):(


a=fi,
fptr+=1,
fptr<nf&&(
fi=f[fptr],
fa=abs(fi)));for(


var x=a+b,
bv=x-a,
y=b-bv,
q0=y,
q1=x,
_x,_bv,_av,_br,_ar;
eptr<ne&&fptr<nf;)
ea<fa?(
a=ei,
eptr+=1,
eptr<ne&&(
ei=e[eptr],
ea=abs(ei))):(


a=fi,
fptr+=1,
fptr<nf&&(
fi=f[fptr],
fa=abs(fi))),


b=q0,
x=a+b,
bv=x-a,
y=b-bv,
y&&(
g[count++]=y),

_x=q1+x,
_bv=_x-q1,
_av=_x-_bv,
_br=x-_bv,
_ar=q1-_av,
q0=_ar+_br,
q1=_x;for(;

eptr<ne;)
a=ei,
b=q0,
x=a+b,
bv=x-a,
y=b-bv,
y&&(
g[count++]=y),

_x=q1+x,
_bv=_x-q1,
_av=_x-_bv,
_br=x-_bv,
_ar=q1-_av,
q0=_ar+_br,
q1=_x,
eptr+=1,
eptr<ne&&(
ei=e[eptr]);for(;


fptr<nf;)
a=fi,
b=q0,
x=a+b,
bv=x-a,
y=b-bv,
y&&(
g[count++]=y),

_x=q1+x,
_bv=_x-q1,
_av=_x-_bv,
_br=x-_bv,
_ar=q1-_av,
q0=_ar+_br,
q1=_x,
fptr+=1,
fptr<nf&&(
fi=f[fptr]);












return q0&&(g[count++]=q0),q1&&(g[count++]=q1),count||(g[count++]=0),g.length=count,g;
}



function fastTwoSum(a,b,result){
var x=a+b,
bv=x-a,
av=x-bv,
br=b-bv,
ar=a-av;return(
result?(
result[0]=ar+br,
result[1]=x,
result):

[ar+br,x]);
}



function scaleLinearExpansion(e,scale){
var n=e.length;
if(1===n){
var ts=twoProduct_1(e[0],scale);return(
ts[0]?
ts:

[ts[1]]);
}
var g=Array(2*n),
q=[0.1,0.1],
t=[0.1,0.1],
count=0;
twoProduct_1(e[0],scale,q),
q[0]&&(
g[count++]=q[0]);

for(var i=1;i<n;++i){
twoProduct_1(e[i],scale,t);
var pq=q[1];
twoSum(pq,t[0],q),
q[0]&&(
g[count++]=q[0]);

var a=t[1],
b=q[1],
x=a+b,
bv=x-a,
y=b-bv;
q[1]=x,
y&&(
g[count++]=y);

}







return q[1]&&(g[count++]=q[1]),0==count&&(g[count++]=0),g.length=count,g;
}




function scalarScalar$1(a,b){
var x=a+b,
bv=x-a,
av=x-bv,
br=b-bv,
ar=a-av,
y=ar+br;return(
y?
[y,x]:

[x]);
}

function robustSubtract(e,f){
var ne=0|e.length,
nf=0|f.length;
if(1==ne&&1==nf)
return scalarScalar$1(e[0],-f[0]);

var n=ne+nf,
g=Array(n),
count=0,
eptr=0,
fptr=0,
abs=_Mathabs,
ei=e[eptr],
ea=abs(ei),
fi=-f[fptr],
fa=abs(fi),
a,b;
ea<fa?(
b=ei,
eptr+=1,
eptr<ne&&(
ei=e[eptr],
ea=abs(ei))):(


b=fi,
fptr+=1,
fptr<nf&&(
fi=-f[fptr],
fa=abs(fi))),


eptr<ne&&ea<fa||fptr>=nf?(
a=ei,
eptr+=1,
eptr<ne&&(
ei=e[eptr],
ea=abs(ei))):(


a=fi,
fptr+=1,
fptr<nf&&(
fi=-f[fptr],
fa=abs(fi)));for(


var x=a+b,
bv=x-a,
y=b-bv,
q0=y,
q1=x,
_x,_bv,_av,_br,_ar;
eptr<ne&&fptr<nf;)
ea<fa?(
a=ei,
eptr+=1,
eptr<ne&&(
ei=e[eptr],
ea=abs(ei))):(


a=fi,
fptr+=1,
fptr<nf&&(
fi=-f[fptr],
fa=abs(fi))),


b=q0,
x=a+b,
bv=x-a,
y=b-bv,
y&&(
g[count++]=y),

_x=q1+x,
_bv=_x-q1,
_av=_x-_bv,
_br=x-_bv,
_ar=q1-_av,
q0=_ar+_br,
q1=_x;for(;

eptr<ne;)
a=ei,
b=q0,
x=a+b,
bv=x-a,
y=b-bv,
y&&(
g[count++]=y),

_x=q1+x,
_bv=_x-q1,
_av=_x-_bv,
_br=x-_bv,
_ar=q1-_av,
q0=_ar+_br,
q1=_x,
eptr+=1,
eptr<ne&&(
ei=e[eptr]);for(;


fptr<nf;)
a=fi,
b=q0,
x=a+b,
bv=x-a,
y=b-bv,
y&&(
g[count++]=y),

_x=q1+x,
_bv=_x-q1,
_av=_x-_bv,
_br=x-_bv,
_ar=q1-_av,
q0=_ar+_br,
q1=_x,
fptr+=1,
fptr<nf&&(
fi=-f[fptr]);












return q0&&(g[count++]=q0),q1&&(g[count++]=q1),count||(g[count++]=0),g.length=count,g;
}































































































































































































function monotoneConvexHull2D(points){
var n=points.length;

if(3>n){

for(var result=Array(n),i=0;i<n;++i)
result[i]=i;return(


2===n&&
points[0][0]===points[1][0]&&
points[0][1]===points[1][1]?[0]:



result);
}



for(var sorted=Array(n),i=0;i<n;++i)
sorted[i]=i;

sorted.sort(function(a,b){
var d=points[a][0]-points[b][0];return(
d?
d:

points[a][1]-points[b][1]);
});





for(var lower=[sorted[0],sorted[1]],upper=[sorted[0],sorted[1]],i=2;i<n;++i){for(
var idx=sorted[i],
p=points[idx],


m=lower.length;
1<m&&


0>=orient$1(points[lower[m-2]],points[lower[m-1]],p);)
m-=1,
lower.pop();for(

lower.push(idx),


m=upper.length;
1<m&&


0<=orient$1(points[upper[m-2]],points[upper[m-1]],p);)
m-=1,
upper.pop();

upper.push(idx);
}




for(var result=Array(upper.length+lower.length-2),ptr=0,i=0,nl=lower.length;i<nl;++i)
result[ptr++]=lower[i];

for(var j=upper.length-2;0<j;--j)
result[ptr++]=upper[j];



return result;
}




function TinyQueue(data,compare){
if(!(this instanceof TinyQueue))return new TinyQueue(data,compare);





if(this.data=data||[],this.length=this.data.length,this.compare=compare||defaultCompare$1,0<this.length)
for(var i=(this.length>>1)-1;0<=i;i--)this._down(i);

}

function defaultCompare$1(a,b){
return a<b?-1:a>b?1:0;
}































































































function concaveman(points,concavity,lengthThreshold){

concavity=_Mathmax(0,void 0===concavity?2:concavity),


lengthThreshold=lengthThreshold||0;









for(var hull=fastConvexHull(points),tree=rbush_1(16,["[0]","[1]","[0]","[1]"]).load(points),queue=[],i=0,last,
p;i<hull.length;i++)p=hull[i],
tree.remove(p),
last=insertNode(p,last),
queue.push(last);



var segTree=rbush_1(16);
for(i=0;i<queue.length;i++)segTree.insert(updateBBox(queue[i]));for(

var sqConcavity=concavity*concavity,
sqLenThreshold=lengthThreshold*lengthThreshold;


queue.length;){
var node=queue.shift(),
a=node.p,
b=node.next.p,


sqLen=getSqDist(a,b);
if(!(sqLen<sqLenThreshold)){

var maxSqLen=sqLen/sqConcavity;


p=findCandidate(tree,node.prev.p,a,b,node.next.next.p,maxSqLen,segTree),


p&&_Mathmin(getSqDist(p,a),getSqDist(p,b))<=maxSqLen&&(

queue.push(node),
queue.push(insertNode(p,node)),


tree.remove(p),
segTree.remove(node),
segTree.insert(updateBBox(node)),
segTree.insert(updateBBox(node.next)))}

}


node=last;
var concave=[];
do
concave.push(node.p),
node=node.next;while(
node!==last);



return concave.push(node.p),concave;
}

function findCandidate(tree,a,b,c,d,maxDist,segTree){for(
var queue=new tinyqueue(null,compareDist),
node=tree.data;



node;){
for(var i=0;i<node.children.length;i++){
var child=node.children[i],

dist=node.leaf?sqSegDist(child,b,c):sqSegBoxDist(b,c,child);
dist>maxDist||

queue.push({
node:child,
dist:dist});

}for(;

queue.length&&!queue.peek().node.children;){
var item=queue.pop(),
p=item.node,



d0=sqSegDist(p,a,b),
d1=sqSegDist(p,c,d);
if(item.dist<d0&&item.dist<d1&&
noIntersections(b,p,segTree)&&
noIntersections(c,p,segTree))return p;
}

node=queue.pop(),
node&&(node=node.node);
}

return null;
}

function compareDist(a,b){
return a.dist-b.dist;
}


function sqSegBoxDist(a,b,bbox){
if(inside(a,bbox)||inside(b,bbox))return 0;
var d1=sqSegSegDist(a[0],a[1],b[0],b[1],bbox.minX,bbox.minY,bbox.maxX,bbox.minY);
if(0===d1)return 0;
var d2=sqSegSegDist(a[0],a[1],b[0],b[1],bbox.minX,bbox.minY,bbox.minX,bbox.maxY);
if(0===d2)return 0;
var d3=sqSegSegDist(a[0],a[1],b[0],b[1],bbox.maxX,bbox.minY,bbox.maxX,bbox.maxY);
if(0===d3)return 0;
var d4=sqSegSegDist(a[0],a[1],b[0],b[1],bbox.minX,bbox.maxY,bbox.maxX,bbox.maxY);return(
0===d4?0:
_Mathmin(d1,d2,d3,d4));
}

function inside(a,bbox){
return a[0]>=bbox.minX&&
a[0]<=bbox.maxX&&
a[1]>=bbox.minY&&
a[1]<=bbox.maxY;
}


function noIntersections(a,b,segTree){






for(var minX=_Mathmin(a[0],b[0]),minY=_Mathmin(a[1],b[1]),maxX=_Mathmax(a[0],b[0]),maxY=_Mathmax(a[1],b[1]),edges=segTree.search({minX:minX,minY:minY,maxX:maxX,maxY:maxY}),i=0;i<edges.length;i++)
if(intersects(edges[i].p,edges[i].next.p,a,b))return!1;

return!0;
}


function intersects(p1,q1,p2,q2){
return p1!==q2&&q1!==p2&&
0<orient(p1,q1,p2)!=0<orient(p1,q1,q2)&&
0<orient(p2,q2,p1)!=0<orient(p2,q2,q1);
}


function updateBBox(node){
var p1=node.p,
p2=node.next.p;




return node.minX=_Mathmin(p1[0],p2[0]),node.minY=_Mathmin(p1[1],p2[1]),node.maxX=_Mathmax(p1[0],p2[0]),node.maxY=_Mathmax(p1[1],p2[1]),node;
}


function fastConvexHull(points){






for(var left=points[0],top=points[0],right=points[0],bottom=points[0],i=0,
p;i<points.length;i++)p=points[i],
p[0]<left[0]&&(left=p),
p[0]>right[0]&&(right=p),
p[1]<top[1]&&(top=p),
p[1]>bottom[1]&&(bottom=p);



var cull=[left,top,right,bottom],
filtered=cull.slice();
for(i=0;i<points.length;i++)
pointInPolygon(points[i],cull)||filtered.push(points[i]);



var indices=monotoneConvexHull2d(filtered),


hull=[];
for(i=0;i<indices.length;i++)hull.push(filtered[indices[i]]);
return hull;
}


function insertNode(p,prev){
var node={
p:p,
prev:null,
next:null,
minX:0,
minY:0,
maxX:0,
maxY:0};












return prev?(node.next=prev.next,node.prev=prev,prev.next.prev=node,prev.next=node):(node.prev=node,node.next=node),node;
}


function getSqDist(p1,p2){

var dx=p1[0]-p2[0],
dy=p1[1]-p2[1];

return dx*dx+dy*dy;
}


function sqSegDist(p,p1,p2){

var x=p1[0],
y=p1[1],
dx=p2[0]-x,
dy=p2[1]-y;

if(0!=dx||0!=dy){

var t=((p[0]-x)*dx+(p[1]-y)*dy)/(dx*dx+dy*dy);

1<t?(
x=p2[0],
y=p2[1]):

0<t&&(
x+=dx*t,
y+=dy*t);

}




return dx=p[0]-x,dy=p[1]-y,dx*dx+dy*dy;
}


function sqSegSegDist(x0,y0,x1,y1,x2,y2,x3,y3){
var ux=x1-x0,
uy=y1-y0,
vx=x3-x2,
vy=y3-y2,
wx=x0-x2,
wy=y0-y2,
a=ux*ux+uy*uy,
b=ux*vx+uy*vy,
c=vx*vx+vy*vy,
d=ux*wx+uy*wy,
e=vx*wx+vy*wy,
D=a*c-b*b,


sD=D,
tD=D,sc,sN,tc,tN;

0==D?(
sN=0,
sD=1,
tN=e,
tD=c):(

sN=b*e-c*d,
tN=a*e-b*d,
0>sN?(
sN=0,
tN=e,
tD=c):
sN>sD&&(
sN=sD,
tN=e+b,
tD=c)),



0>tN?(
tN=0,
0>-d?sN=0:
-d>a?sN=sD:(

sN=-d,
sD=a)):

tN>tD&&(
tN=tD,
0>-d+b?sN=0:
-d+b>a?sN=sD:(

sN=-d+b,
sD=a)),



sc=0===sN?0:sN/sD,
tc=0===tN?0:tN/tD;

var cx=(1-sc)*x0+sc*x1,
cy=(1-sc)*y0+sc*y1,
cx2=(1-tc)*x2+tc*x3,
cy2=(1-tc)*y2+tc*y3,
dx=cx2-cx,
dy=cy2-cy;

return dx*dx+dy*dy;
}






























function convex(geojson,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var concavity=options.concavity||Infinity,
points$$1=[];





if(coordEach(geojson,function(coord){points$$1.push([coord[0],coord[1]])}),!points$$1.length)return null;

var convexHull=concaveman_1(points$$1,concavity);return(


3<convexHull.length?
polygon([convexHull]):

null);
}




























function booleanPointInPolygon(point,polygon,options){


if(options=options||{},"object"!=typeof options)throw new Error("options is invalid");
var ignoreBoundary=options.ignoreBoundary;


if(!point)throw new Error("point is required");
if(!polygon)throw new Error("polygon is required");

var pt=getCoord(point),
polys=getCoords(polygon),
type=polygon.geometry?polygon.geometry.type:polygon.type,
bbox=polygon.bbox;


if(bbox&&!1===inBBox(pt,bbox))return!1;


"Polygon"===type&&(polys=[polys]);

for(var i=0,insidePoly=!1;i<polys.length&&!insidePoly;i++)

if(inRing(pt,polys[i][0],ignoreBoundary)){for(
var inHole=!1,
k=1;

k<polys[i].length&&!inHole;)
inRing(pt,polys[i][k],!ignoreBoundary)&&(
inHole=!0),

k++;

inHole||(insidePoly=!0);
}

return insidePoly;
}










function inRing(pt,ring,ignoreBoundary){
var isInside=!1;
ring[0][0]===ring[ring.length-1][0]&&ring[0][1]===ring[ring.length-1][1]&&(ring=ring.slice(0,ring.length-1));

for(var i=0,j=ring.length-1;i<ring.length;j=i++){
var xi=ring[i][0],yi=ring[i][1],
xj=ring[j][0],yj=ring[j][1],
onBoundary=0==pt[1]*(xi-xj)+yi*(xj-pt[0])+yj*(pt[0]-xi)&&
0>=(xi-pt[0])*(xj-pt[0])&&0>=(yi-pt[1])*(yj-pt[1]);
if(onBoundary)return!ignoreBoundary;
var intersect=yi>pt[1]!=yj>pt[1]&&
pt[0]<(xj-xi)*(pt[1]-yi)/(yj-yi)+xi;
intersect&&(isInside=!isInside);
}
return isInside;
}









function inBBox(pt,bbox){
return bbox[0]<=pt[0]&&
bbox[1]<=pt[1]&&
bbox[2]>=pt[0]&&
bbox[3]>=pt[1];
}




































function pointsWithinPolygon(points$$1,polygons$$1){
var results=[];





return geomEach(polygons$$1,function(polygon$$1){featureEach(points$$1,function(point$$1){booleanPointInPolygon(point$$1,polygon$$1)&&results.push(point$$1)})}),featureCollection(results);
}



































function tin(points$$1,z){
if("FeatureCollection"!==points$$1.type)throw new Error("points must be a FeatureCollection");

var isPointZ=!1;
return featureCollection(triangulate(points$$1.features.map(function(p){
var point$$1={
x:p.geometry.coordinates[0],
y:p.geometry.coordinates[1]};







return z?point$$1.z=p.properties[z]:3===p.geometry.coordinates.length&&(isPointZ=!0,point$$1.z=p.geometry.coordinates[2]),point$$1;
})).map(function(triangle){

var a=[triangle.a.x,triangle.a.y],
b=[triangle.b.x,triangle.b.y],
c=[triangle.c.x,triangle.c.y],
properties={};















return isPointZ?(a.push(triangle.a.z),b.push(triangle.b.z),c.push(triangle.c.z)):properties={a:triangle.a.z,b:triangle.b.z,c:triangle.c.z},polygon([[a,b,c,a]],properties);

}));
}

function Triangle(a,b,c){
this.a=a,
this.b=b,
this.c=c;

var A=b.x-a.x,
B=b.y-a.y,
C=c.x-a.x,
D=c.y-a.y,
E=A*(a.x+b.x)+B*(a.y+b.y),
F=C*(a.x+c.x)+D*(a.y+c.y),
G=2*(A*(c.y-b.y)-B*(c.x-b.x)),
dx,dy;



this.x=(D*E-B*F)/G,
this.y=(A*F-C*E)/G,
dx=this.x-a.x,
dy=this.y-a.y,
this.r=dx*dx+dy*dy;
}

function byX(a,b){
return b.x-a.x;
}

function dedup(edges){
var j=edges.length,
a,b,i,m,n;

outer:for(;
j;)for(
b=edges[--j],
a=edges[--j],
i=j;
i;)


if(n=edges[--i],m=edges[--i],a===m&&b===n||a===n&&b===m){
edges.splice(j,2),
edges.splice(i,2),
j-=2;
continue outer;
}


}

function triangulate(vertices){

if(3>vertices.length)
return[];




vertices.sort(byX);for(

var i=vertices.length-1,
xmin=vertices[i].x,
xmax=vertices[0].x,
ymin=vertices[i].y,
ymax=ymin,
epsilon=1e-12,

a,
b,
c,
A,
B,
G;

i--;)
vertices[i].y<ymin&&(
ymin=vertices[i].y),
vertices[i].y>ymax&&(
ymax=vertices[i].y);










var dx=xmax-xmin,
dy=ymax-ymin,
dmax=dx>dy?dx:dy,
xmid=0.5*(xmax+xmin),
ymid=0.5*(ymax+ymin),
open=[
new Triangle({
x:xmid-20*dmax,
y:ymid-dmax,
__sentinel:!0},
{
x:xmid,
y:ymid+20*dmax,
__sentinel:!0},
{
x:xmid+20*dmax,
y:ymid-dmax,
__sentinel:!0})],


closed=[],
edges=[],
j;for(


i=vertices.length;
i--;){for(



edges.length=0,
j=open.length;
j--;){




if(dx=vertices[i].x-open[j].x,0<dx&&dx*dx>open[j].r){
closed.push(open[j]),
open.splice(j,1);
continue;
}


dy=vertices[i].y-open[j].y,
dx*dx+dy*dy>open[j].r||(



edges.push(
open[j].a,open[j].b,
open[j].b,open[j].c,
open[j].c,open[j].a),

open.splice(j,1));
}for(


dedup(edges),


j=edges.length;
j;)
b=edges[--j],
a=edges[--j],
c=vertices[i],


A=b.x-a.x,
B=b.y-a.y,
G=2*(A*(c.y-b.y)-B*(c.x-b.x)),
_Mathabs(G)>epsilon&&
open.push(new Triangle(a,b,c));


}for(



Array.prototype.push.apply(closed,open),

i=closed.length;
i--;)(
closed[i].a.__sentinel||
closed[i].b.__sentinel||
closed[i].c.__sentinel)&&
closed.splice(i,1);

return closed;
}




























function distance(from,to,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var units=options.units,

coordinates1=getCoord(from),
coordinates2=getCoord(to),
dLat=degreesToRadians(coordinates2[1]-coordinates1[1]),
dLon=degreesToRadians(coordinates2[0]-coordinates1[0]),
lat1=degreesToRadians(coordinates1[1]),
lat2=degreesToRadians(coordinates2[1]),

a=_Mathpow(_Mathsin(dLat/2),2)+
_Mathpow(_Mathsin(dLon/2),2)*_Mathcos(lat1)*_Mathcos(lat2);

return radiansToLength(2*_Mathatan(_Mathsqrt(a),_Mathsqrt(1-a)),units);
}













function clone(geojson){
if(!geojson)throw new Error("geojson is required");

switch(geojson.type){
case"Feature":
return cloneFeature(geojson);
case"FeatureCollection":
return cloneFeatureCollection(geojson);
case"Point":
case"LineString":
case"Polygon":
case"MultiPoint":
case"MultiLineString":
case"MultiPolygon":
case"GeometryCollection":
return cloneGeometry(geojson);
default:
throw new Error("unknown GeoJSON type");}

}








function cloneFeature(geojson){
var cloned={type:"Feature"};














return Object.keys(geojson).forEach(function(key){switch(key){case"type":case"properties":case"geometry":return;default:cloned[key]=geojson[key];}}),cloned.properties=cloneProperties(geojson.properties),cloned.geometry=cloneGeometry(geojson.geometry),cloned;
}








function cloneProperties(properties){
var cloned={};return(
properties?(
Object.keys(properties).forEach(function(key){
var value=properties[key];



cloned[key]="object"==typeof value?null===value?null:
value.length?

value.map(function(item){
return item;
}):


cloneProperties(value):

value;
}),
cloned):cloned);
}








function cloneFeatureCollection(geojson){
var cloned={type:"FeatureCollection"};















return Object.keys(geojson).forEach(function(key){switch(key){case"type":case"features":return;default:cloned[key]=geojson[key];}}),cloned.features=geojson.features.map(function(feature){return cloneFeature(feature)}),cloned;
}








function cloneGeometry(geometry){
var geom={type:geometry.type};return(
geometry.bbox&&(geom.bbox=geometry.bbox),

"GeometryCollection"===geometry.type)?(
geom.geometries=geometry.geometries.map(function(geom){
return cloneGeometry(geom);
}),
geom):(

geom.coordinates=deepSlice(geometry.coordinates),
geom);
}








function deepSlice(coords){return(
"object"==typeof coords[0]?
coords.map(function(coord){
return deepSlice(coord);
}):coords.slice());
}




























function object(topology,o){



function arc(i,points){
points.length&&points.pop();
for(var a=arcs[0>i?~i:i],k=0,n=a.length;k<n;++k)
points.push(transformPoint(a[k],k));

0>i&&reverse(points,n);
}

function point(p){
return transformPoint(p);
}

function line(arcs){

for(var points=[],i=0,n=arcs.length;i<n;++i)arc(arcs[i],points);

return 2>points.length&&points.push(points[0]),points;
}

function ring(arcs){for(
var points=line(arcs);
4>points.length;)points.push(points[0]);
return points;
}

function polygon(arcs){
return arcs.map(ring);
}

function geometry(o){
var type=o.type,coordinates;
switch(type){
case"GeometryCollection":return{type:type,geometries:o.geometries.map(geometry)};
case"Point":coordinates=point(o.coordinates);break;
case"MultiPoint":coordinates=o.coordinates.map(point);break;
case"LineString":coordinates=line(o.arcs);break;
case"MultiLineString":coordinates=o.arcs.map(line);break;
case"Polygon":coordinates=polygon(o.arcs);break;
case"MultiPolygon":coordinates=o.arcs.map(polygon);break;
default:return null;}

return{type:type,coordinates:coordinates};
}var transformPoint=transform(topology.transform),arcs=topology.arcs;

return geometry(o);
}











































































function planarRingArea(ring){for(
var i=-1,n=ring.length,b=ring[n-1],area=0,a;
++i<n;)a=b,b=ring[i],area+=a[0]*b[1]-a[1]*b[0];
return _Mathabs(area);
}





function mergeArcs(topology,objects){






function geometry(o){
switch(o.type){
case"GeometryCollection":o.geometries.forEach(geometry);break;
case"Polygon":extract(o.arcs);break;
case"MultiPolygon":o.arcs.forEach(extract);}

}

function extract(polygon){
polygon.forEach(function(ring){
ring.forEach(function(arc){
(polygonsByArc[arc=0>arc?~arc:arc]||(polygonsByArc[arc]=[])).push(polygon);
});
}),
polygons.push(polygon);
}

function area(ring){
return planarRingArea(object(topology,{type:"Polygon",arcs:[ring]}).coordinates[0]);
}var polygonsByArc={},polygons=[],groups=[];



























return objects.forEach(geometry),polygons.forEach(function(polygon){if(!polygon._){var group=[],neighbors=[polygon];for(polygon._=1,groups.push(group);polygon=neighbors.pop();)group.push(polygon),polygon.forEach(function(ring){ring.forEach(function(arc){polygonsByArc[0>arc?~arc:arc].forEach(function(polygon){polygon._||(polygon._=1,neighbors.push(polygon))})})})}}),polygons.forEach(function(polygon){delete polygon._}),{
type:"MultiPolygon",
arcs:groups.map(function(polygons){
var arcs=[],n;


















if(polygons.forEach(function(polygon){polygon.forEach(function(ring){ring.forEach(function(arc){2>polygonsByArc[0>arc?~arc:arc].length&&arcs.push(arc)})})}),arcs=stitch(topology,arcs),1<(n=arcs.length))
for(var i=1,k=area(arcs[0]),ki,t;i<n;++i)
(ki=area(arcs[i]))>k&&(
t=arcs[0],arcs[0]=arcs[i],arcs[i]=t,k=ki);




return arcs;
})};

}






























































































































































































































































































































































function rotateArray(array,start,end,offset){
reverse$1(array,start,end),
reverse$1(array,start,start+offset),
reverse$1(array,start+offset,end);
}

function reverse$1(array,start,end){
for(var mid=start+(end-- -start>>1),t;start<mid;++start,--end)
t=array[start],array[start]=array[end],array[end]=t;

}




































































































































































































































































































function geomifyObject(input){
return null==input?{type:null}:
("FeatureCollection"===input.type?geomifyFeatureCollection:
"Feature"===input.type?geomifyFeature:
geomifyGeometry)(input);
}

function geomifyFeatureCollection(input){
var output={type:"GeometryCollection",geometries:input.features.map(geomifyFeature)};

return null!=input.bbox&&(output.bbox=input.bbox),output;
}

function geomifyFeature(input){
var output=geomifyGeometry(input.geometry),key;


for(key in null!=input.id&&(output.id=input.id),null!=input.bbox&&(output.bbox=input.bbox),input.properties){output.properties=input.properties;break}
return output;
}

function geomifyGeometry(input){
if(null==input)return{type:null};
var output="GeometryCollection"===input.type?{type:"GeometryCollection",geometries:input.geometries.map(geomifyGeometry)}:
"Point"===input.type||"MultiPoint"===input.type?{type:input.type,coordinates:input.coordinates}:
{type:input.type,arcs:input.coordinates};

return null!=input.bbox&&(output.bbox=input.bbox),output;
}

































































































































function hashArc(arc){
var i=arc[0],j=arc[1],t;

return j<i&&(t=i,i=j,j=t),i+31*j;
}

function equalArc(arcA,arcB){
var ia=arcA[0],ja=arcA[1],
ib=arcB[0],jb=arcB[1],t;


return ja<ia&&(t=ia,ia=ja,ja=t),jb<ib&&(t=ib,ib=jb,jb=t),ia===ib&&ja===jb;
}










function lineDissolve(geojson,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var mutate=options.mutate;


if("FeatureCollection"!==getType(geojson))throw new Error("geojson must be a FeatureCollection");
if(!geojson.features.length)throw new Error("geojson is empty");(


!1===mutate||void 0===mutate)&&(geojson=clone(geojson));

var result=[],
lastLine=lineReduce(geojson,function(previousLine,currentLine){


var merged=mergeLineStrings(previousLine,currentLine);return(


merged?merged:(



result.push(previousLine),
currentLine));

});return(

lastLine&&result.push(lastLine),


result.length?

1===result.length?result[0]:

multiLineString(result.map(function(line){return line.coordinates})):null);
}


function coordId(coord){
return coord[0].toString()+","+coord[1].toString();
}









function mergeLineStrings(a,b){
var coords1=a.geometry.coordinates,
coords2=b.geometry.coordinates,

s1=coordId(coords1[0]),
e1=coordId(coords1[coords1.length-1]),
s2=coordId(coords2[0]),
e2=coordId(coords2[coords2.length-1]),


coords;
if(s1===e2)coords=coords2.concat(coords1.slice(1));else
if(s2===e1)coords=coords1.concat(coords2.slice(1));else
if(s1===s2)coords=coords1.slice(1).reverse().concat(coords2);else
if(e1===e2)coords=coords1.concat(coords2.reverse().slice(1));else
return null;

return lineString(coords);
}









function polygonDissolve(geojson,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var mutate=options.mutate;


if("FeatureCollection"!==getType(geojson))throw new Error("geojson must be a FeatureCollection");
if(!geojson.features.length)throw new Error("geojson is empty");(



!1===mutate||void 0===mutate)&&(geojson=clone(geojson));

var geoms=[];
flattenEach(geojson,function(feature$$1){
geoms.push(feature$$1.geometry);
});
var topo=topology({geoms:geometryCollection(geoms).geometry});
return merge(topo,topo.objects.geoms.geometries);
}











function dissolve(geojson,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var mutate=options.mutate;


if("FeatureCollection"!==getType(geojson))throw new Error("geojson must be a FeatureCollection");
if(!geojson.features.length)throw new Error("geojson is empty");(



!1===mutate||void 0===mutate)&&(geojson=clone(geojson));


var type=getHomogenousType(geojson);
if(!type)throw new Error("geojson must be homogenous");

switch(type){
case"LineString":
return lineDissolve(geojson,options);
case"Polygon":
return polygonDissolve(geojson,options);
default:
throw new Error(type+" is not supported");}

}








function getHomogenousType(geojson){
var types={};
flattenEach(geojson,function(feature$$1){
types[feature$$1.geometry.type]=!0;
});
var keys=Object.keys(types);return(
1===keys.length?keys[0]:
null);
}



























function concave(points$$1,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");


if(!points$$1)throw new Error("points is required");
var maxEdge=options.maxEdge||Infinity;
if(!isNumber(maxEdge))throw new Error("maxEdge is invalid");

var cleaned=removeDuplicates(points$$1),

tinPolys=tin(cleaned);












if(tinPolys.features=tinPolys.features.filter(function(triangle){var pt1=triangle.geometry.coordinates[0][0],pt2=triangle.geometry.coordinates[0][1],pt3=triangle.geometry.coordinates[0][2],dist1=distance(pt1,pt2,options),dist2=distance(pt2,pt3,options),dist3=distance(pt1,pt3,options);return dist1<=maxEdge&&dist2<=maxEdge&&dist3<=maxEdge}),1>tinPolys.features.length)return null;


var dissolved=dissolve(tinPolys,options);






return 1===dissolved.coordinates.length&&(dissolved.coordinates=dissolved.coordinates[0],dissolved.type="Polygon"),feature(dissolved);
}








function removeDuplicates(points$$1){
var cleaned=[],
existing={};









return featureEach(points$$1,function(pt){if(pt.geometry){var key=pt.geometry.coordinates.join("-");existing.hasOwnProperty(key)||(cleaned.push(pt),existing[key]=!0)}}),featureCollection(cleaned);
}































function collect(polygons,points,inProperty,outProperty){
var rtree=rbush_1(6),

treeItems=points.features.map(function(item){
return{
minX:item.geometry.coordinates[0],
minY:item.geometry.coordinates[1],
maxX:item.geometry.coordinates[0],
maxY:item.geometry.coordinates[1],
property:item.properties[inProperty]};

});



















return rtree.load(treeItems),polygons.features.forEach(function(poly){poly.properties||(poly.properties={});var bbox$$1=bbox(poly),potentialPoints=rtree.search({minX:bbox$$1[0],minY:bbox$$1[1],maxX:bbox$$1[2],maxY:bbox$$1[3]}),values=[];potentialPoints.forEach(function(pt){booleanPointInPolygon([pt.minX,pt.minY],poly)&&values.push(pt.property)}),poly.properties[outProperty]=values}),polygons;
}

















function flip(geojson,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var mutate=options.mutate;

if(!geojson)throw new Error("geojson is required");











return(!1===mutate||void 0===mutate)&&(geojson=clone(geojson)),coordEach(geojson,function(coord){var x=coord[0],y=coord[1];coord[0]=y,coord[1]=x}),geojson;
}



















function cleanCoords(geojson,options){

var mutate="object"==typeof options?options.mutate:options;
if(!geojson)throw new Error("geojson is required");
var type=getType(geojson),


newCoords=[];

switch(type){
case"LineString":
newCoords=cleanLine(geojson);
break;
case"MultiLineString":
case"Polygon":
getCoords(geojson).forEach(function(line){
newCoords.push(cleanLine(line));
});
break;
case"MultiPolygon":
getCoords(geojson).forEach(function(polygons$$1){
var polyPoints=[];
polygons$$1.forEach(function(ring){
polyPoints.push(cleanLine(ring));
}),
newCoords.push(polyPoints);
});
break;
case"Point":
return geojson;
case"MultiPoint":
var existing={};
getCoords(geojson).forEach(function(coord){
var key=coord.join("-");
existing.hasOwnProperty(key)||(
newCoords.push(coord),
existing[key]=!0);

});
break;
default:
throw new Error(type+" geometry not supported");}return(



geojson.coordinates?
!0===mutate?(
geojson.coordinates=newCoords,
geojson):

{type:type,coordinates:newCoords}:

!0===mutate?(
geojson.geometry.coordinates=newCoords,
geojson):

feature({type:type,coordinates:newCoords},geojson.properties,geojson.bbox,geojson.id));

}








function cleanLine(line){
var points$$1=getCoords(line);

if(2===points$$1.length&&!equals(points$$1[0],points$$1[1]))return points$$1;

var
newPoints=[],
secondToLast=points$$1.length-1,prevPoint,point$$1,nextPoint;

newPoints.push(points$$1[0]);
for(var i=1;i<secondToLast;i++)
prevPoint=points$$1[i-1],
point$$1=points$$1[i],
nextPoint=points$$1[i+1],

isPointOnLineSegment(prevPoint,nextPoint,point$$1)||
newPoints.push(point$$1);



return newPoints.push(nextPoint),newPoints;
}









function equals(pt1,pt2){
return pt1[0]===pt2[0]&&pt1[1]===pt2[1];
}











function isPointOnLineSegment(start,end,point$$1){
var x=point$$1[0],y=point$$1[1],
startX=start[0],startY=start[1],
endX=end[0],endY=end[1],

dxc=x-startX,
dyc=y-startY,
dxl=endX-startX,
dyl=endY-startY,
cross=dxc*dyl-dyc*dxl;return!(

0!=cross)&&(
_Mathabs(dxl)>=_Mathabs(dyl)?0<dxl?startX<=x&&x<=endX:endX<=x&&x<=startX:
0<dyl?startY<=y&&y<=endY:endY<=y&&y<=startY);
}











function getSqDist$1(p1,p2){

var dx=p1.x-p2.x,
dy=p1.y-p2.y;

return dx*dx+dy*dy;
}


function getSqSegDist(p,p1,p2){

var x=p1.x,
y=p1.y,
dx=p2.x-x,
dy=p2.y-y;

if(0!=dx||0!=dy){

var t=((p.x-x)*dx+(p.y-y)*dy)/(dx*dx+dy*dy);

1<t?(
x=p2.x,
y=p2.y):

0<t&&(
x+=dx*t,
y+=dy*t);

}




return dx=p.x-x,dy=p.y-y,dx*dx+dy*dy;
}



function simplifyRadialDist(points$$1,sqTolerance){





for(var prevPoint=points$$1[0],newPoints=[prevPoint],i=1,len=points$$1.length,point$$1;i<len;i++)
point$$1=points$$1[i],

getSqDist$1(point$$1,prevPoint)>sqTolerance&&(
newPoints.push(point$$1),
prevPoint=point$$1);





return prevPoint!==point$$1&&newPoints.push(point$$1),newPoints;
}

function simplifyDPStep(points$$1,first,last,sqTolerance,simplified){



for(var maxSqDist=sqTolerance,i=first+1,index,
sqDist;i<last;i++)sqDist=getSqSegDist(points$$1[i],points$$1[first],points$$1[last]),

sqDist>maxSqDist&&(
index=i,
maxSqDist=sqDist);



maxSqDist>sqTolerance&&(
1<index-first&&simplifyDPStep(points$$1,first,index,sqTolerance,simplified),
simplified.push(points$$1[index]),
1<last-index&&simplifyDPStep(points$$1,index,last,sqTolerance,simplified));

}


function simplifyDouglasPeucker(points$$1,sqTolerance){
var last=points$$1.length-1,

simplified=[points$$1[0]];



return simplifyDPStep(points$$1,0,last,sqTolerance,simplified),simplified.push(points$$1[last]),simplified;
}


function simplify$2(points$$1,tolerance,highestQuality){

if(2>=points$$1.length)return points$$1;

var sqTolerance=void 0===tolerance?1:tolerance*tolerance;




return points$$1=highestQuality?points$$1:simplifyRadialDist(points$$1,sqTolerance),points$$1=simplifyDouglasPeucker(points$$1,sqTolerance),points$$1;
}









































function simplify(geojson,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var tolerance=void 0===options.tolerance?1:options.tolerance,
highQuality=options.highQuality||!1,
mutate=options.mutate||!1;

if(!geojson)throw new Error("geojson is required");
if(tolerance&&0>tolerance)throw new Error("invalid tolerance");







return!0!==mutate&&(geojson=clone(geojson)),geomEach(geojson,function(geom){simplifyGeom(geom,tolerance,highQuality)}),geojson;
}










function simplifyGeom(geometry$$1,tolerance,highQuality){
var type=geometry$$1.type;


if("Point"===type||"MultiPoint"===type)return geometry$$1;


cleanCoords(geometry$$1,!0);

var coordinates=geometry$$1.coordinates;

















return"LineString"===type?geometry$$1.coordinates=simplifyLine(coordinates,tolerance,highQuality):"MultiLineString"===type?geometry$$1.coordinates=coordinates.map(function(lines){return simplifyLine(lines,tolerance,highQuality)}):"Polygon"===type?geometry$$1.coordinates=simplifyPolygon(coordinates,tolerance,highQuality):"MultiPolygon"===type?geometry$$1.coordinates=coordinates.map(function(rings){return simplifyPolygon(rings,tolerance,highQuality)}):void 0,geometry$$1;
}











function simplifyLine(coordinates,tolerance,highQuality){
return simplify$2(coordinates.map(function(coord){
return{x:coord[0],y:coord[1],z:coord[2]};
}),tolerance,highQuality).map(function(coords){
return coords.z?[coords.x,coords.y,coords.z]:[coords.x,coords.y];
});
}











function simplifyPolygon(coordinates,tolerance,highQuality){
return coordinates.map(function(ring){
var pts=ring.map(function(coord){
return{x:coord[0],y:coord[1]};
});
if(4>pts.length)
throw new Error("invalid polygon");for(

var simpleRing=simplify$2(pts,tolerance,highQuality).map(function(coords){
return[coords.x,coords.y];
});

!checkValidity(simpleRing);)
tolerance-=0.01*tolerance,
simpleRing=simplify$2(pts,tolerance,highQuality).map(function(coords){
return[coords.x,coords.y];
});






return(simpleRing[simpleRing.length-1][0]!==simpleRing[0][0]||simpleRing[simpleRing.length-1][1]!==simpleRing[0][1])&&simpleRing.push(simpleRing[0]),simpleRing;
});
}









function checkValidity(ring){return!(
3>ring.length)&&(

3!==ring.length||ring[2][0]!==ring[0][0]||ring[2][1]!==ring[0][1]);
}



































































































































































function bezier(line,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var resolution=options.resolution||1e4,
sharpness=options.sharpness||0.85;


if(!line)throw new Error("line is required");
if(!isNumber(resolution))throw new Error("resolution must be an number");
if(!isNumber(sharpness))throw new Error("sharpness must be an number");










for(var coords=[],spline=new Spline({points:getGeom(line).coordinates.map(function(pt){return{x:pt[0],y:pt[1]}}),duration:resolution,sharpness:sharpness}),i=0,
pos;i<spline.duration;i+=10)pos=spline.pos(i),
0==_Mathfloor(i/100)%2&&
coords.push([pos.x,pos.y]);



return lineString(coords,line.properties);
}




































function tag(points,polygons,field,outField){











return points=clone(points),polygons=clone(polygons),featureEach(points,function(pt){pt.properties||(pt.properties={}),featureEach(polygons,function(poly){void 0===pt.properties[outField]&&booleanPointInPolygon(pt,poly)&&(pt.properties[outField]=poly.properties[field])})}),points;
}





















function sample(featurecollection,num){
if(!featurecollection)throw new Error("featurecollection is required");
if(null===num||void 0===num)throw new Error("num is required");
if("number"!=typeof num)throw new Error("num must be a number");

var outFC=featureCollection(getRandomSubarray(featurecollection.features,num));
return outFC;
}

function getRandomSubarray(arr,size){for(
var shuffled=arr.slice(0),i=arr.length,min=i-size,temp,index;
i-->min;)
index=_Mathfloor((i+1)*Math.random()),
temp=shuffled[index],
shuffled[index]=shuffled[i],
shuffled[i]=temp;

return shuffled.slice(min);
}















function bboxPolygon(bbox){
validateBBox(bbox);



var west=+bbox[0],
south=+bbox[1],
east=+bbox[2],
north=+bbox[3];

if(6===bbox.length)throw new Error("@turf/bbox-polygon does not support BBox with 6 positions");

var lowLeft=[west,south],
topLeft=[west,north],
topRight=[east,north],
lowRight=[east,south];

return polygon([[
lowLeft,
lowRight,
topRight,
topLeft,
lowLeft]]);

}



















function envelope(geojson){
return bboxPolygon(bbox(geojson));
}















function square(bbox){
var west=bbox[0],
south=bbox[1],
east=bbox[2],
north=bbox[3],

horizontalDistance=distance(bbox.slice(0,2),[east,south]),
verticalDistance=distance(bbox.slice(0,2),[west,north]);
if(horizontalDistance>=verticalDistance){
var verticalMidpoint=(south+north)/2;
return[
west,
verticalMidpoint-(east-west)/2,
east,
verticalMidpoint+(east-west)/2];

}
var horizontalMidpoint=(west+east)/2;
return[
horizontalMidpoint-(north-south)/2,
south,
horizontalMidpoint+(north-south)/2,
north];


}



























function destination(origin,distance,bearing,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var units=options.units,
properties=options.properties,


coordinates1=getCoord(origin),
longitude1=degreesToRadians(coordinates1[0]),
latitude1=degreesToRadians(coordinates1[1]),
bearing_rad=degreesToRadians(bearing),
radians=lengthToRadians(distance,units),


latitude2=_Mathasin(_Mathsin(latitude1)*_Mathcos(radians)+
_Mathcos(latitude1)*_Mathsin(radians)*_Mathcos(bearing_rad)),
longitude2=longitude1+_Mathatan(_Mathsin(bearing_rad)*_Mathsin(radians)*_Mathcos(latitude1),
_Mathcos(radians)-_Mathsin(latitude1)*_Mathsin(latitude2)),
lng=radiansToDegrees(longitude2),
lat=radiansToDegrees(latitude2);

return point([lng,lat],properties);
}





















function circle(center,radius,options){

options=options||{};
var steps=options.steps||64,
properties=options.properties;


if(!center)throw new Error("center is required");
if(!radius)throw new Error("radius is required");
if("object"!=typeof options)throw new Error("options must be an object");
if("number"!=typeof steps)throw new Error("steps must be a number");


steps=steps||64,
properties=properties||center.properties||{};


for(var coordinates=[],i=0;i<steps;i++)
coordinates.push(destination(center,radius,-360*i/steps,options).geometry.coordinates);



return coordinates.push(coordinates[0]),polygon([coordinates],properties);
}


























function bearing(start,end,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var final=options.final;


if(!0===final)return calculateFinalBearing(start,end);

var coordinates1=getCoord(start),
coordinates2=getCoord(end),

lon1=degreesToRadians(coordinates1[0]),
lon2=degreesToRadians(coordinates2[0]),
lat1=degreesToRadians(coordinates1[1]),
lat2=degreesToRadians(coordinates2[1]),
a=_Mathsin(lon2-lon1)*_Mathcos(lat2),
b=_Mathcos(lat1)*_Mathsin(lat2)-
_Mathsin(lat1)*_Mathcos(lat2)*_Mathcos(lon2-lon1);

return radiansToDegrees(_Mathatan(a,b));
}









function calculateFinalBearing(start,end){

var bear=bearing(end,start);

return bear=(bear+180)%360,bear;
}



















function midpoint(point1,point2){
var dist=distance(point1,point2),
heading=bearing(point1,point2),
midpoint=destination(point1,dist/2,heading);

return midpoint;
}























function center(geojson,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var properties=options.properties;


if(!geojson)throw new Error("geojson is required");

var ext=bbox(geojson),
x=(ext[0]+ext[2])/2,
y=(ext[1]+ext[3])/2;
return point([x,y],properties);
}

















function centroid(geojson,properties){
var xSum=0,
ySum=0,
len=0;





return coordEach(geojson,function(coord){xSum+=coord[0],ySum+=coord[1],len++},!0),point([xSum/len,ySum/len],properties);
}
















function centerOfMass(geojson,properties){
switch(getType(geojson)){
case"Point":
return geojson;
case"Polygon":
var coords=[];
coordEach(geojson,function(coord){
coords.push(coord);
});



var centre=centroid(geojson,properties),
translation=centre.geometry.coordinates,
sx=0,
sy=0,
sArea=0,


neutralizedPoints=coords.map(function(point$$1){
return[
point$$1[0]-translation[0],
point$$1[1]-translation[1]];

}),i,pi,pj,xi,xj,yi,yj,a;

for(i=0;i<coords.length-1;i++)

pi=neutralizedPoints[i],
xi=pi[0],
yi=pi[1],


pj=neutralizedPoints[i+1],
xj=pj[0],
yj=pj[1],


a=xi*yj-xj*yi,


sArea+=a,


sx+=(xi+xj)*a,
sy+=(yi+yj)*a;



if(0===sArea)
return centre;


var area=0.5*sArea,
areaFactor=1/(6*area);


return point([
translation[0]+areaFactor*sx,
translation[1]+areaFactor*sy],
properties);

default:

var hull=convex(geojson);return(

hull?centerOfMass(hull,properties):

centroid(geojson,properties));}

}



















function combine(fc){











function addToGroup(feature$$1,key,multi){
multi?


groups[key].coordinates=groups[key].coordinates.concat(feature$$1.geometry.coordinates):groups[key].coordinates.push(feature$$1.geometry.coordinates),

groups[key].properties.push(feature$$1.properties);
}var groups={MultiPoint:{coordinates:[],properties:[]},MultiLineString:{coordinates:[],properties:[]},MultiPolygon:{coordinates:[],properties:[]}},multiMapping=Object.keys(groups).reduce(function(memo,item){return memo[item.replace("Multi","")]=item,memo},{});










return featureEach(fc,function(feature$$1){feature$$1.geometry&&(groups[feature$$1.geometry.type]?addToGroup(feature$$1,feature$$1.geometry.type,!0):multiMapping[feature$$1.geometry.type]&&addToGroup(feature$$1,multiMapping[feature$$1.geometry.type],!1))}),featureCollection(Object.keys(groups).
filter(function(key){
return groups[key].coordinates.length;
}).
sort().
map(function(key){
var geometry$$1={type:key,coordinates:groups[key].coordinates},
properties={collectedProperties:groups[key].properties};
return feature(geometry$$1,properties);
}));
}
















function explode(geojson){
var points$$1=[];











return"FeatureCollection"===geojson.type?featureEach(geojson,function(feature$$1){coordEach(feature$$1,function(coord){points$$1.push(point(coord,feature$$1.properties))})}):coordEach(geojson,function(coord){points$$1.push(point(coord,geojson.properties))}),featureCollection(points$$1);
}




function earcut(data,holeIndices,dim){

dim=dim||2;

var hasHoles=holeIndices&&holeIndices.length,
outerLen=hasHoles?holeIndices[0]*dim:data.length,
outerNode=linkedList(data,0,outerLen,dim,!0),
triangles=[];

if(!outerNode)return triangles;

var minX,minY,maxX,maxY,x,y,invSize;




if(hasHoles&&(outerNode=eliminateHoles(data,holeIndices,outerNode,dim)),data.length>80*dim){
minX=maxX=data[0],
minY=maxY=data[1];

for(var i=dim;i<outerLen;i+=dim)
x=data[i],
y=data[i+1],
x<minX&&(minX=x),
y<minY&&(minY=y),
x>maxX&&(maxX=x),
y>maxY&&(maxY=y);



invSize=_Mathmax(maxX-minX,maxY-minY),
invSize=0===invSize?0:1/invSize;
}



return earcutLinked(outerNode,triangles,dim,minX,minY,invSize),triangles;
}


function linkedList(data,start,end,dim,clockwise){
var i,last;

if(clockwise===0<signedArea(data,start,end,dim))
for(i=start;i<end;i+=dim)last=insertNode$1(i,data[i],data[i+1],last);else

for(i=end-dim;i>=start;i-=dim)last=insertNode$1(i,data[i],data[i+1],last);







return last&&equals$1(last,last.next)&&(removeNode(last),last=last.next),last;
}


function filterPoints(start,end){
if(!start)return start;
end||(end=start);

var p=start,
again;
do


if(again=!1,!p.steiner&&(equals$1(p,p.next)||0===area(p.prev,p,p.next))){


if(removeNode(p),p=end=p.prev,p===p.next)break;
again=!0;

}else
p=p.next;while(

again||p!==end);

return end;
}


function earcutLinked(ear,triangles,dim,minX,minY,invSize,pass){
if(ear){


!pass&&invSize&&indexCurve(ear,minX,minY,invSize);for(

var stop=ear,
prev,next;


ear.prev!==ear.next;){



if(prev=ear.prev,next=ear.next,invSize?isEarHashed(ear,minX,minY,invSize):isEar(ear)){

triangles.push(prev.i/dim),
triangles.push(ear.i/dim),
triangles.push(next.i/dim),

removeNode(ear),


ear=next.next,
stop=next.next;

continue;
}




if(ear=next,ear===stop){

pass?



1===pass?(
ear=cureLocalIntersections(ear,triangles,dim),
earcutLinked(ear,triangles,dim,minX,minY,invSize,2)):


2===pass&&
splitEarcut(ear,triangles,dim,minX,minY,invSize):earcutLinked(filterPoints(ear),triangles,dim,minX,minY,invSize,1);


break;
}
}}
}


function isEar(ear){
var a=ear.prev,
b=ear,
c=ear.next;

if(0<=area(a,b,c))return!1;for(


var p=ear.next.next;

p!==ear.prev;){
if(pointInTriangle(a.x,a.y,b.x,b.y,c.x,c.y,p.x,p.y)&&
0<=area(p.prev,p,p.next))return!1;
p=p.next;
}

return!0;
}

function isEarHashed(ear,minX,minY,invSize){
var a=ear.prev,
b=ear,
c=ear.next;

if(0<=area(a,b,c))return!1;for(


var minTX=a.x<b.x?a.x<c.x?a.x:c.x:b.x<c.x?b.x:c.x,
minTY=a.y<b.y?a.y<c.y?a.y:c.y:b.y<c.y?b.y:c.y,
maxTX=a.x>b.x?a.x>c.x?a.x:c.x:b.x>c.x?b.x:c.x,
maxTY=a.y>b.y?a.y>c.y?a.y:c.y:b.y>c.y?b.y:c.y,


minZ=zOrder(minTX,minTY,minX,minY,invSize),
maxZ=zOrder(maxTX,maxTY,minX,minY,invSize),


p=ear.nextZ;

p&&p.z<=maxZ;){
if(p!==ear.prev&&p!==ear.next&&
pointInTriangle(a.x,a.y,b.x,b.y,c.x,c.y,p.x,p.y)&&
0<=area(p.prev,p,p.next))return!1;
p=p.nextZ;
}for(


p=ear.prevZ;

p&&p.z>=minZ;){
if(p!==ear.prev&&p!==ear.next&&
pointInTriangle(a.x,a.y,b.x,b.y,c.x,c.y,p.x,p.y)&&
0<=area(p.prev,p,p.next))return!1;
p=p.prevZ;
}

return!0;
}


function cureLocalIntersections(start,triangles,dim){
var p=start;
do{
var a=p.prev,
b=p.next.next;

!equals$1(a,b)&&intersects$2(a,p,p.next,b)&&locallyInside(a,b)&&locallyInside(b,a)&&(

triangles.push(a.i/dim),
triangles.push(p.i/dim),
triangles.push(b.i/dim),


removeNode(p),
removeNode(p.next),

p=start=b),

p=p.next;
}while(p!==start);

return p;
}


function splitEarcut(start,triangles,dim,minX,minY,invSize){

var a=start;
do{for(
var b=a.next.next;
b!==a.prev;){
if(a.i!==b.i&&isValidDiagonal(a,b)){

var c=splitPolygon(a,b);








return a=filterPoints(a,a.next),c=filterPoints(c,c.next),earcutLinked(a,triangles,dim,minX,minY,invSize),void earcutLinked(c,triangles,dim,minX,minY,invSize);
}
b=b.next;
}
a=a.next;
}while(a!==start);
}


function eliminateHoles(data,holeIndices,outerNode,dim){
var queue=[],
i,len,start,end,list;

for(i=0,len=holeIndices.length;i<len;i++)
start=holeIndices[i]*dim,
end=i<len-1?holeIndices[i+1]*dim:data.length,
list=linkedList(data,start,end,dim,!1),
list===list.next&&(list.steiner=!0),
queue.push(getLeftmost(list));





for(queue.sort(compareX),i=0;i<queue.length;i++)
eliminateHole(queue[i],outerNode),
outerNode=filterPoints(outerNode,outerNode.next);


return outerNode;
}

function compareX(a,b){
return a.x-b.x;
}


function eliminateHole(hole,outerNode){

if(outerNode=findHoleBridge(hole,outerNode),outerNode){
var b=splitPolygon(outerNode,hole);
filterPoints(b,b.next);
}
}


function findHoleBridge(hole,outerNode){
var p=outerNode,
hx=hole.x,
hy=hole.y,
qx=-Infinity,
m;



do{
if(hy<=p.y&&hy>=p.next.y&&p.next.y!==p.y){
var x=p.x+(hy-p.y)*(p.next.x-p.x)/(p.next.y-p.y);
if(x<=hx&&x>qx){

if(qx=x,x===hx){
if(hy===p.y)return p;
if(hy===p.next.y)return p.next;
}
m=p.x<p.next.x?p:p.next;
}
}
p=p.next;
}while(p!==outerNode);

if(!m)return null;

if(hx===qx)return m.prev;





var stop=m,
mx=m.x,
my=m.y,
tanMin=Infinity,
tan;for(

p=m.next;

p!==stop;)
hx>=p.x&&p.x>=mx&&hx!==p.x&&
pointInTriangle(hy<my?hx:qx,hy,mx,my,hy<my?qx:hx,hy,p.x,p.y)&&(

tan=_Mathabs(hy-p.y)/(hx-p.x),

(tan<tanMin||tan===tanMin&&p.x>m.x)&&locallyInside(p,hole)&&(
m=p,
tanMin=tan)),



p=p.next;


return m;
}


function indexCurve(start,minX,minY,invSize){
var p=start;
do
null===p.z&&(p.z=zOrder(p.x,p.y,minX,minY,invSize)),
p.prevZ=p.prev,
p.nextZ=p.next,
p=p.next;while(
p!==start);

p.prevZ.nextZ=null,
p.prevZ=null,

sortLinked(p);
}



function sortLinked(list){
var
inSize=1,i,p,q,e,tail,numMerges,pSize,qSize;

do{for(
p=list,
list=null,
tail=null,
numMerges=0;

p;){



for(numMerges++,q=p,pSize=0,i=0;i<inSize&&(
pSize++,
q=q.nextZ,!
!q);i++);for(

qSize=inSize;

0<pSize||0<qSize&&q;)

0!==pSize&&(0===qSize||!q||p.z<=q.z)?(
e=p,
p=p.nextZ,
pSize--):(

e=q,
q=q.nextZ,
qSize--),


tail?tail.nextZ=e:
list=e,

e.prevZ=tail,
tail=e;


p=q;
}

tail.nextZ=null,
inSize*=2;

}while(1<numMerges);

return list;
}


function zOrder(x,y,minX,minY,invSize){














return x=32767*(x-minX)*invSize,y=32767*(y-minY)*invSize,x=16711935&(x|x<<8),x=252645135&(x|x<<4),x=858993459&(x|x<<2),x=1431655765&(x|x<<1),y=16711935&(y|y<<8),y=252645135&(y|y<<4),y=858993459&(y|y<<2),y=1431655765&(y|y<<1),x|y<<1;
}


function getLeftmost(start){
var p=start,
leftmost=start;
do
p.x<leftmost.x&&(leftmost=p),
p=p.next;while(
p!==start);

return leftmost;
}


function pointInTriangle(ax,ay,bx,by,cx,cy,px,py){
return 0<=(cx-px)*(ay-py)-(ax-px)*(cy-py)&&
0<=(ax-px)*(by-py)-(bx-px)*(ay-py)&&
0<=(bx-px)*(cy-py)-(cx-px)*(by-py);
}


function isValidDiagonal(a,b){
return a.next.i!==b.i&&a.prev.i!==b.i&&!intersectsPolygon(a,b)&&
locallyInside(a,b)&&locallyInside(b,a)&&middleInside(a,b);
}


function area(p,q,r){
return(q.y-p.y)*(r.x-q.x)-(q.x-p.x)*(r.y-q.y);
}


function equals$1(p1,p2){
return p1.x===p2.x&&p1.y===p2.y;
}


function intersects$2(p1,q1,p2,q2){return(
equals$1(p1,q1)&&equals$1(p2,q2)||
equals$1(p1,q2)&&equals$1(p2,q1)||
0<area(p1,q1,p2)!=0<area(p1,q1,q2)&&
0<area(p2,q2,p1)!=0<area(p2,q2,q1));
}


function intersectsPolygon(a,b){
var p=a;
do{
if(p.i!==a.i&&p.next.i!==a.i&&p.i!==b.i&&p.next.i!==b.i&&
intersects$2(p,p.next,a,b))return!0;
p=p.next;
}while(p!==a);

return!1;
}


function locallyInside(a,b){
return 0>area(a.prev,a,a.next)?
0<=area(a,b,a.next)&&0<=area(a,a.prev,b):
0>area(a,b,a.prev)||0>area(a,a.next,b);
}


function middleInside(a,b){
var p=a,
inside=!1,
px=(a.x+b.x)/2,
py=(a.y+b.y)/2;
do
p.y>py!=p.next.y>py&&p.next.y!==p.y&&
px<(p.next.x-p.x)*(py-p.y)/(p.next.y-p.y)+p.x&&(
inside=!inside),
p=p.next;while(
p!==a);

return inside;
}



function splitPolygon(a,b){
var a2=new Node(a.i,a.x,a.y),
b2=new Node(b.i,b.x,b.y),
an=a.next,
bp=b.prev;













return a.next=b,b.prev=a,a2.next=an,an.prev=a2,b2.next=a2,a2.prev=b2,bp.next=b2,b2.prev=bp,b2;
}


function insertNode$1(i,x,y,last){
var p=new Node(i,x,y);











return last?(p.next=last.next,p.prev=last,last.next.prev=p,last.next=p):(p.prev=p,p.next=p),p;
}

function removeNode(p){
p.next.prev=p.prev,
p.prev.next=p.next,

p.prevZ&&(p.prevZ.nextZ=p.nextZ),
p.nextZ&&(p.nextZ.prevZ=p.prevZ);
}

function Node(i,x,y){

this.i=i,


this.x=x,
this.y=y,


this.prev=null,
this.next=null,


this.z=null,


this.prevZ=null,
this.nextZ=null,


this.steiner=!1;
}






























function signedArea(data,start,end,dim){

for(var sum=0,i=start,j=end-dim;i<end;i+=dim)
sum+=(data[j]-data[i])*(data[i+1]+data[j+1]),
j=i;

return sum;
}



































function tesselate(poly){
if(!poly.geometry||"Polygon"!==poly.geometry.type&&"MultiPolygon"!==poly.geometry.type)
throw new Error("input must be a Polygon or MultiPolygon");


var fc={type:"FeatureCollection",features:[]};









return"Polygon"===poly.geometry.type?fc.features=processPolygon(poly.geometry.coordinates):poly.geometry.coordinates.forEach(function(coordinates){fc.features=fc.features.concat(processPolygon(coordinates))}),fc;
}

function processPolygon(coordinates){
var data=flattenCoords(coordinates),
dim=2,
result=earcut_1(data.vertices,data.holes,dim),

features=[],
vertices=[];

result.forEach(function(vert,i){
var index=result[i];
vertices.push([data.vertices[index*dim],data.vertices[index*dim+1]]);
});

for(var i=0,
coords;i<vertices.length;i+=3)coords=vertices.slice(i,i+3),
coords.push(vertices[i]),
features.push(polygon([coords]));


return features;
}

function flattenCoords(data){




for(var dim=data[0][0].length,result={vertices:[],holes:[],dimensions:dim},holeIndex=0,i=0;i<data.length;i++){
for(var j=0;j<data[i].length;j++)
for(var d=0;d<dim;d++)result.vertices.push(data[i][j][d]);

0<i&&(
holeIndex+=data[i-1].length,
result.holes.push(holeIndex));

}

return result;
}

























function nearestPoint(targetPoint,points){

if(!targetPoint)throw new Error("targetPoint is required");
if(!points)throw new Error("points is required");

var
minDist=Infinity,nearest;










return featureEach(points,function(pt,featureIndex){var distanceToPoint=distance(targetPoint,pt);distanceToPoint<minDist&&(nearest=clone(pt),nearest.properties.featureIndex=featureIndex,nearest.properties.distanceToPoint=distanceToPoint,minDist=distanceToPoint)}),nearest;
}

function quickselect$3(arr,k,left,right,compare){
quickselectStep(arr,k,left||0,right||arr.length-1,compare||defaultCompare$2);
}

function quickselectStep(arr,k,left,right,compare){for(;

right>left;){
if(600<right-left){
var n=right-left+1,
m=k-left+1,
z=_Mathlog(n),
s=0.5*_Mathexp(2*z/3),
sd=0.5*_Mathsqrt(z*s*(n-s)/n)*(0>m-n/2?-1:1),
newLeft=_Mathmax(left,_Mathfloor(k-m*s/n+sd)),
newRight=_Mathmin(right,_Mathfloor(k+(n-m)*s/n+sd));
quickselectStep(arr,k,newLeft,newRight,compare);
}

var t=arr[k],
i=left,
j=right;for(

swap$1(arr,left,k),
0<compare(arr[right],t)&&swap$1(arr,left,right);

i<j;){for(
swap$1(arr,i,j),
i++,
j--;
0>compare(arr[i],t);)i++;for(;
0<compare(arr[j],t);)j--;
}

0===compare(arr[left],t)?swap$1(arr,left,j):(

j++,
swap$1(arr,j,right)),


j<=k&&(left=j+1),
k<=j&&(right=j-1);
}
}

function swap$1(arr,i,j){
var tmp=arr[i];
arr[i]=arr[j],
arr[j]=tmp;
}

function defaultCompare$2(a,b){
return a<b?-1:a>b?1:0;
}

function rbush$4(maxEntries,format){return(
this instanceof rbush$4?void(


this._maxEntries=_Mathmax(4,maxEntries||9),
this._minEntries=_Mathmax(2,_Mathceil(0.4*this._maxEntries)),

format&&
this._initFormat(format),


this.clear()):new rbush$4(maxEntries,format));
}






















































































































































































































































































































































































































































function findItem$1(item,items,equalsFn){
if(!equalsFn)return items.indexOf(item);

for(var i=0;i<items.length;i++)
if(equalsFn(item,items[i]))return i;

return-1;
}


function calcBBox$1(node,toBBox){
distBBox$1(node,0,node.children.length,toBBox,node);
}


function distBBox$1(node,k,p,toBBox,destNode){
destNode||(destNode=createNode$1(null)),
destNode.minX=Infinity,
destNode.minY=Infinity,
destNode.maxX=-Infinity,
destNode.maxY=-Infinity;

for(var i=k,child;i<p;i++)
child=node.children[i],
extend$1(destNode,node.leaf?toBBox(child):child);


return destNode;
}

function extend$1(a,b){




return a.minX=_Mathmin(a.minX,b.minX),a.minY=_Mathmin(a.minY,b.minY),a.maxX=_Mathmax(a.maxX,b.maxX),a.maxY=_Mathmax(a.maxY,b.maxY),a;
}

function compareNodeMinX$1(a,b){return a.minX-b.minX}
function compareNodeMinY$1(a,b){return a.minY-b.minY}

function bboxArea$1(a){return(a.maxX-a.minX)*(a.maxY-a.minY)}
function bboxMargin$1(a){return a.maxX-a.minX+(a.maxY-a.minY)}

function enlargedArea$1(a,b){
return(_Mathmax(b.maxX,a.maxX)-_Mathmin(b.minX,a.minX))*(
_Mathmax(b.maxY,a.maxY)-_Mathmin(b.minY,a.minY));
}

function intersectionArea$1(a,b){
var minX=_Mathmax(a.minX,b.minX),
minY=_Mathmax(a.minY,b.minY),
maxX=_Mathmin(a.maxX,b.maxX),
maxY=_Mathmin(a.maxY,b.maxY);

return _Mathmax(0,maxX-minX)*
_Mathmax(0,maxY-minY);
}

function contains$1(a,b){
return a.minX<=b.minX&&
a.minY<=b.minY&&
b.maxX<=a.maxX&&
b.maxY<=a.maxY;
}

function intersects$4(a,b){
return b.minX<=a.maxX&&
b.minY<=a.maxY&&
b.maxX>=a.minX&&
b.maxY>=a.minY;
}

function createNode$1(children){
return{
children:children,
height:1,
leaf:!0,
minX:Infinity,
minY:Infinity,
maxX:-Infinity,
maxY:-Infinity};

}




function multiSelect$1(arr,left,right,n,compare){for(
var stack=[left,right],
mid;

stack.length;)
right=stack.pop(),
left=stack.pop(),

right-left<=n||(

mid=left+_Mathceil((right-left)/n/2)*n,
quickselect$3(arr,mid,left,right,compare),

stack.push(left,mid,mid,right));

}












function geojsonRbush(maxEntries){
var tree=rbush$4(maxEntries);










































































































































































































































return tree.insert=function(feature){if(Array.isArray(feature)){var bbox=feature;feature=bboxPolygon$2(bbox),feature.bbox=bbox}else feature.bbox=feature.bbox?feature.bbox:turfBBox(feature);return rbush$4.prototype.insert.call(this,feature)},tree.load=function(features){var load=[];return Array.isArray(features)?features.forEach(function(bbox){var feature=bboxPolygon$2(bbox);feature.bbox=bbox,load.push(feature)}):featureEach(features,function(feature){feature.bbox=feature.bbox?feature.bbox:turfBBox(feature),load.push(feature)}),rbush$4.prototype.load.call(this,load)},tree.remove=function(feature){if(Array.isArray(feature)){var bbox=feature;feature=bboxPolygon$2(bbox),feature.bbox=bbox}return rbush$4.prototype.remove.call(this,feature)},tree.clear=function(){return rbush$4.prototype.clear.call(this)},tree.search=function(geojson){var features=rbush$4.prototype.search.call(this,this.toBBox(geojson));return{type:"FeatureCollection",features:features}},tree.collides=function(geojson){return rbush$4.prototype.collides.call(this,this.toBBox(geojson))},tree.all=function(){var features=rbush$4.prototype.all.call(this);return{type:"FeatureCollection",features:features}},tree.toJSON=function(){return rbush$4.prototype.toJSON.call(this)},tree.fromJSON=function(json){return rbush$4.prototype.fromJSON.call(this,json)},tree.toBBox=function(geojson){var bbox;return bbox=geojson.bbox?geojson.bbox:Array.isArray(geojson)&&4===geojson.length?geojson:turfBBox(geojson),{minX:bbox[0],minY:bbox[1],maxX:bbox[2],maxY:bbox[3]}},tree;
}
















function bboxPolygon$2(bbox){
var lowLeft=[bbox[0],bbox[1]],
topLeft=[bbox[0],bbox[3]],
topRight=[bbox[2],bbox[3]],
lowRight=[bbox[2],bbox[1]],
coordinates=[[lowLeft,lowRight,topRight,topLeft,lowLeft]];

return{
type:"Feature",
bbox:bbox,
properties:{},
geometry:{
type:"Polygon",
coordinates:coordinates}};


}
















function turfBBox(geojson){
var bbox=[Infinity,Infinity,-Infinity,-Infinity];






return coordEach(geojson,function(coord){bbox[0]>coord[0]&&(bbox[0]=coord[0]),bbox[1]>coord[1]&&(bbox[1]=coord[1]),bbox[2]<coord[0]&&(bbox[2]=coord[0]),bbox[3]<coord[1]&&(bbox[3]=coord[1])}),bbox;
}














function lineSegment(geojson){
if(!geojson)throw new Error("geojson is required");

var results=[];



return flattenEach(geojson,function(feature$$1){lineSegmentFeature(feature$$1,results)}),featureCollection(results);
}









function lineSegmentFeature(geojson,results){
var coords=[],
geometry$$1=geojson.geometry;
switch(geometry$$1.type){
case"Polygon":
coords=getCoords(geometry$$1);
break;
case"LineString":
coords=[getCoords(geometry$$1)];}

coords.forEach(function(coord){
var segments=createSegments(coord,geojson.properties);
segments.forEach(function(segment){
segment.id=results.length,
results.push(segment);
});
});
}









function createSegments(coords,properties){
var segments=[];






return coords.reduce(function(previousCoords,currentCoords){var segment=lineString([previousCoords,currentCoords],properties);return segment.bbox=bbox$3(previousCoords,currentCoords),segments.push(segment),currentCoords}),segments;
}









function bbox$3(coords1,coords2){
var x1=coords1[0],
y1=coords1[1],
x2=coords2[0],
y2=coords2[1],
west=x1<x2?x1:x2,
south=y1<y2?y1:y2,
east=x1>x2?x1:x2,
north=y1>y2?y1:y2;
return[west,south,east,north];
}
















function lineIntersect(line1,line2){
var unique={},
results=[];





if("LineString"===line1.type&&(line1=feature(line1)),"LineString"===line2.type&&(line2=feature(line2)),"Feature"===line1.type&&
"Feature"===line2.type&&
"LineString"===line1.geometry.type&&
"LineString"===line2.geometry.type&&
2===line1.geometry.coordinates.length&&
2===line2.geometry.coordinates.length){
var intersect=intersects$3(line1,line2);

return intersect&&results.push(intersect),featureCollection(results);
}


var tree=geojsonRbush();














return tree.load(lineSegment(line2)),featureEach(lineSegment(line1),function(segment){featureEach(tree.search(segment),function(match){var intersect=intersects$3(segment,match);if(intersect){var key=getCoords(intersect).join(",");unique[key]||(unique[key]=!0,results.push(intersect))}})}),featureCollection(results);
}









function intersects$3(line1,line2){
var coords1=getCoords(line1),
coords2=getCoords(line2);
if(2!==coords1.length)
throw new Error("<intersects> line1 must only contain 2 coordinates");

if(2!==coords2.length)
throw new Error("<intersects> line2 must only contain 2 coordinates");

var x1=coords1[0][0],
y1=coords1[0][1],
x2=coords1[1][0],
y2=coords1[1][1],
x3=coords2[0][0],
y3=coords2[0][1],
x4=coords2[1][0],
y4=coords2[1][1],
denom=(y4-y3)*(x2-x1)-(x4-x3)*(y2-y1),
numeA=(x4-x3)*(y1-y3)-(y4-y3)*(x1-x3),
numeB=(x2-x1)*(y1-y3)-(y2-y1)*(x1-x3);

if(0==denom)return(
0==numeA&&0==numeB?
null:

null);


var uA=numeA/denom,
uB=numeB/denom;

if(0<=uA&&1>=uA&&0<=uB&&1>=uB){
var x=x1+uA*(x2-x1),
y=y1+uA*(y2-y1);
return point([x,y]);
}
return null;
}



























function nearestPointOnLine(lines,pt,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");


var type=lines.geometry?lines.geometry.type:lines.type;
if("LineString"!==type&&"MultiLineString"!==type)
throw new Error("lines must be LineString or MultiLineString");


var closestPt=point([Infinity,Infinity],{
dist:Infinity}),


length=0;
















































return flattenEach(lines,function(line){for(var coords=getCoords(line),i=0,start;i<coords.length-1;i++){start=point(coords[i]),start.properties.dist=distance(pt,start,options);var stop=point(coords[i+1]);stop.properties.dist=distance(pt,stop,options);var sectionLength=distance(start,stop,options),heightDistance=_Mathmax(start.properties.dist,stop.properties.dist),direction=bearing(start,stop),perpendicularPt1=destination(pt,heightDistance,direction+90,options),perpendicularPt2=destination(pt,heightDistance,direction-90,options),intersect=lineIntersect(lineString([perpendicularPt1.geometry.coordinates,perpendicularPt2.geometry.coordinates]),lineString([start.geometry.coordinates,stop.geometry.coordinates])),intersectPt=null;0<intersect.features.length&&(intersectPt=intersect.features[0],intersectPt.properties.dist=distance(pt,intersectPt,options),intersectPt.properties.location=length+distance(start,intersectPt,options)),start.properties.dist<closestPt.properties.dist&&(closestPt=start,closestPt.properties.index=i,closestPt.properties.location=length),stop.properties.dist<closestPt.properties.dist&&(closestPt=stop,closestPt.properties.index=i+1,closestPt.properties.location=length+sectionLength),intersectPt&&intersectPt.properties.dist<closestPt.properties.dist&&(closestPt=intersectPt,closestPt.properties.index=i),length+=sectionLength}}),closestPt;
}























function rhumbBearing(start,end,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var final=options.final;


if(!start)throw new Error("start point is required");
if(!end)throw new Error("end point is required");

var bear360;

bear360=final?calculateRhumbBearing(getCoord(end),getCoord(start)):
calculateRhumbBearing(getCoord(start),getCoord(end));

var bear180=180<bear360?-(360-bear360):bear360;

return bear180;
}














function calculateRhumbBearing(from,to){




var phi1=degreesToRadians(from[1]),
phi2=degreesToRadians(to[1]),
deltaLambda=degreesToRadians(to[0]-from[0]);

deltaLambda>_MathPI&&(deltaLambda-=2*_MathPI),
deltaLambda<-_MathPI&&(deltaLambda+=2*_MathPI);

var deltaPsi=_Mathlog(_Mathtan(phi2/2+_MathPI/4)/_Mathtan(phi1/2+_MathPI/4)),

theta=_Mathatan(deltaLambda,deltaPsi);

return(radiansToDegrees(theta)+360)%360;
}
























function rhumbDistance(from,to,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var units=options.units;


if(!from)throw new Error("from point is required");
if(!to)throw new Error("to point is required");

var origin=getCoord(from),
destination=getCoord(to);



destination[0]+=180<destination[0]-origin[0]?-360:180<origin[0]-destination[0]?360:0;
var distanceInMeters=calculateRhumbDistance(origin,destination),
distance=convertLength(distanceInMeters,"meters",units);
return distance;
}
















function calculateRhumbDistance(origin,destination,radius){







radius=radius===void 0?earthRadius:+radius;


var R=radius,
phi1=origin[1]*_MathPI/180,
phi2=destination[1]*_MathPI/180,
DeltaPhi=phi2-phi1,
DeltaLambda=_Mathabs(destination[0]-origin[0])*_MathPI/180;

DeltaLambda>_MathPI&&(DeltaLambda-=2*_MathPI);



var DeltaPsi=_Mathlog(_Mathtan(phi2/2+_MathPI/4)/_Mathtan(phi1/2+_MathPI/4)),
q=1e-11<_Mathabs(DeltaPsi)?DeltaPhi/DeltaPsi:_Mathcos(phi1),


delta=_Mathsqrt(DeltaPhi*DeltaPhi+q*q*DeltaLambda*DeltaLambda),
dist=delta*R;

return dist;
}
















function toMercator(geojson,options){
return convert(geojson,"mercator",options);
}
















function toWgs84(geojson,options){
return convert(geojson,"wgs84",options);
}












function convert(geojson,projection,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var mutate=options.mutate;


if(!geojson)throw new Error("geojson is required");















return Array.isArray(geojson)&&isNumber(geojson[0])?geojson="mercator"===projection?convertToMercator(geojson):convertToWgs84(geojson):(!0!==mutate&&(geojson=clone(geojson)),coordEach(geojson,function(coord){var newCoord="mercator"===projection?convertToMercator(coord):convertToWgs84(coord);coord[0]=newCoord[0],coord[1]=newCoord[1]})),geojson;
}









function convertToMercator(lonLat){
var D2R=_MathPI/180,

A=6378137,
MAXEXTENT=20037508.342789244,



adjusted=180>=_Mathabs(lonLat[0])?lonLat[0]:lonLat[0]-360*sign(lonLat[0]),
xy=[
A*adjusted*D2R,
A*_Mathlog(_Mathtan(0.25*_MathPI+0.5*lonLat[1]*D2R))];








return xy[0]>MAXEXTENT&&(xy[0]=MAXEXTENT),xy[0]<-MAXEXTENT&&(xy[0]=-MAXEXTENT),xy[1]>MAXEXTENT&&(xy[1]=MAXEXTENT),xy[1]<-MAXEXTENT&&(xy[1]=-MAXEXTENT),xy;
}









function convertToWgs84(xy){

var R2D=180/_MathPI,
A=6378137;

return[
xy[0]*R2D/A,
(0.5*_MathPI-2*_Mathatan2(_Mathexp(-xy[1]/A)))*R2D];

}








function sign(x){
return 0>x?-1:0<x?1:0;
}






























function pointToLineDistance(pt,line,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");


if(!pt)throw new Error("pt is required");




if(Array.isArray(pt)?pt=point(pt):"Point"===pt.type?pt=feature(pt):featureOf(pt,"Point","point"),!line)throw new Error("line is required");
Array.isArray(line)?line=lineString(line):
"LineString"===line.type?line=feature(line):
featureOf(line,"LineString","line");

var distance$$1=Infinity,
p=pt.geometry.coordinates;






return segmentEach(line,function(segment){var a=segment.geometry.coordinates[0],b=segment.geometry.coordinates[1],d=distanceToSegment(p,a,b,options);distance$$1>d&&(distance$$1=d)}),distance$$1;
}














function distanceToSegment(p,a,b,options){
var mercator=options.mercator,
distanceAP=!0===mercator?euclideanDistance(a,p,options):distance(a,p,options),
azimuthAP=bearingToAzimuth(!0===mercator?rhumbBearing(a,p):bearing(a,p)),
azimuthAB=bearingToAzimuth(!0===mercator?rhumbBearing(a,b):bearing(a,b)),
angleA=_Mathabs(azimuthAP-azimuthAB);











if(90<angleA)return distanceAP;

var azimuthBA=(azimuthAB+180)%360,
azimuthBP=bearingToAzimuth(!0===mercator?rhumbBearing(b,p):bearing(b,p)),
angleB=_Mathabs(azimuthBP-azimuthBA);return(
180<angleB&&(angleB=_Mathabs(angleB-360)),










90<angleB?!0===mercator?euclideanDistance(p,b,options):distance(p,b,options):











!0===mercator?
mercatorPH(a,b,p,options):distanceAP*_Mathsin(degreesToRadians(angleA)));
}












function mercatorPH(a,b,p,options){
var delta=0;(

180<=_Mathabs(a[0])||180<=_Mathabs(b[0])||180<=_Mathabs(p[0]))&&(
delta=0<a[0]||0<b[0]||0<p[0]?-180:180);


var origin=point(p),
A=toMercator([a[0]+delta,a[1]]),
B=toMercator([b[0]+delta,b[1]]),
P=toMercator([p[0]+delta,p[1]]),
h=toWgs84(euclideanIntersection(A,B,P));

0!=delta&&(h[0]-=delta);
var distancePH=rhumbDistance(origin,h,options);
return distancePH;
}
















function euclideanIntersection(a,b,p){
var x1=a[0],y1=a[1],
x2=b[0],y2=b[1],
x3=p[0],y3=p[1],
px=x2-x1,py=y2-y1,
dab=px*px+py*py,
u=((x3-x1)*px+(y3-y1)*py)/dab,
x=x1+u*px,y=y1+u*py;
return[x,y];
}











function euclideanDistance(from,to,options){
var units=options.units,

delta=0;
180<=_Mathabs(from[0])&&(
delta=0<from[0]?-180:180),

180<=_Mathabs(to[0])&&(
delta=0<to[0]?-180:180);

var p1=toMercator([from[0]+delta,from[1]]),
p2=toMercator([to[0]+delta,to[1]]),

sqr=function(n){return n*n},
squareD=sqr(p1[0]-p2[0])+sqr(p1[1]-p2[1]),
d=_Mathsqrt(squareD);
return convertLength(d,"meters",units);
}























function nearestPointToLine(points$$1,line,options){

if(options=options||{},!isObject(options))throw new Error("options is invalid");
var units=options.units,
properties=options.properties||{};


if(!points$$1)throw new Error("points is required");

if(points$$1=normalize(points$$1),!points$$1.features.length)throw new Error("points must contain features");

if(!line)throw new Error("line is required");
if("LineString"!==getType(line))throw new Error("line must be a LineString");

var dist=Infinity,
pt=null;















return featureEach(points$$1,function(point$$1){var d=pointToLineDistance(point$$1,line,{units:units});d<dist&&(dist=d,pt=point$$1)}),pt&&(pt.properties=Object.assign({dist:dist},pt.properties,properties)),pt;
}








function normalize(points$$1){
var features=[],
type=points$$1.geometry?points$$1.geometry.type:points$$1.type;
switch(type){
case"GeometryCollection":



return geomEach(points$$1,function(geom){"Point"===geom.type&&features.push({type:"Feature",properties:{},geometry:geom})}),{type:"FeatureCollection",features:features};
case"FeatureCollection":



return points$$1.features=points$$1.features.filter(function(feature$$1){return"Point"===feature$$1.geometry.type}),points$$1;
default:
throw new Error("points must be a Point Collection");}

}

































function planepoint(point,triangle){

var coord=getCoord(point),
geom=getGeom(triangle),
coords=geom.coordinates,
outer=coords[0];
if(4>outer.length)throw new Error("OuterRing of a Polygon must have 4 or more Positions.");
var properties=triangle.properties||{},
a=properties.a,
b=properties.b,
c=properties.c,


x=coord[0],
y=coord[1],
x1=outer[0][0],
y1=outer[0][1],
z1=a===void 0?outer[0][2]:a,
x2=outer[1][0],
y2=outer[1][1],
z2=b===void 0?outer[1][2]:b,
x3=outer[2][0],
y3=outer[2][1],
z3=c===void 0?outer[2][2]:c,
z=(z3*(x-x1)*(y-y2)+z1*(x-x2)*(y-y3)+z2*(x-x3)*(y-y1)-
z2*(x-x1)*(y-y3)-z3*(x-x2)*(y-y1)-z1*(x-x3)*(y-y2))/(
(x-x1)*(y-y2)+(x-x2)*(y-y3)+(x-x3)*(y-y1)-
(x-x1)*(y-y3)-(x-x2)*(y-y1)-(x-x3)*(y-y2));

return z;
}





















function kinks(featureIn){
var

results={
type:"FeatureCollection",
features:[]},coordinates,feature$$1;






if(feature$$1="Feature"===featureIn.type?featureIn.geometry:featureIn,"LineString"===feature$$1.type)
coordinates=[feature$$1.coordinates];else
if("MultiLineString"===feature$$1.type)
coordinates=feature$$1.coordinates;else
if("MultiPolygon"===feature$$1.type)
coordinates=[].concat.apply([],feature$$1.coordinates);else
if("Polygon"===feature$$1.type)
coordinates=feature$$1.coordinates;else

throw new Error("Input must be a LineString, MultiLineString, Polygon, or MultiPolygon Feature or Geometry");


































return coordinates.forEach(function(line1){coordinates.forEach(function(line2){for(var i=0;i<line1.length-1;i++)for(var k=i;k<line2.length-1;k++){if(line1===line2){if(1===_Mathabs(i-k))continue;if(0===i&&k===line1.length-2&&line1[i][0]===line1[line1.length-1][0]&&line1[i][1]===line1[line1.length-1][1])continue}var intersection=lineIntersects(line1[i][0],line1[i][1],line1[i+1][0],line1[i+1][1],line2[k][0],line2[k][1],line2[k+1][0],line2[k+1][1]);intersection&&results.features.push(point([intersection[0],intersection[1]]))}})}),results;
}



function lineIntersects(line1StartX,line1StartY,line1EndX,line1EndY,line2StartX,line2StartY,line2EndX,line2EndY){

var
result={
x:null,
y:null,
onLine1:!1,
onLine2:!1},denominator,a,b,numerator1,numerator2;return(

denominator=(line2EndY-line2StartY)*(line1EndX-line1StartX)-(line2EndX-line2StartX)*(line1EndY-line1StartY),
0===denominator)?
null!==result.x&&null!==result.y&&
result:(




a=line1StartY-line2StartY,
b=line1StartX-line2StartX,
numerator1=(line2EndX-line2StartX)*a-(line2EndY-line2StartY)*b,
numerator2=(line1EndX-line1StartX)*a-(line1EndY-line1StartY)*b,
a=numerator1/denominator,
b=numerator2/denominator,


result.x=line1StartX+a*(line1EndX-line1StartX),
result.y=line1StartY+a*(line1EndY-line1StartY),


0<=a&&1>=a&&(
result.onLine1=!0),


0<=b&&1>=b&&(
result.onLine2=!0),


result.onLine1&&result.onLine2&&
[result.x,result.y]);



}



























function pointOnFeature(geojson){for(

var fc=normalize$1(geojson),


cent=center(fc),


onSurface=!1,
i=0;
!onSurface&&i<fc.features.length;){
var geom=fc.features[i].geometry,

onLine=!1,x,y,x1,y1,x2,y2,k;
if("Point"===geom.type)
cent.geometry.coordinates[0]===geom.coordinates[0]&&
cent.geometry.coordinates[1]===geom.coordinates[1]&&(
onSurface=!0);else

if("MultiPoint"===geom.type){
var onMultiPoint=!1;for(
k=0;
!onMultiPoint&&k<geom.coordinates.length;)
cent.geometry.coordinates[0]===geom.coordinates[k][0]&&
cent.geometry.coordinates[1]===geom.coordinates[k][1]&&(
onSurface=!0,
onMultiPoint=!0),

k++;

}else if("LineString"===geom.type)for(
k=0;
!onLine&&k<geom.coordinates.length-1;)
x=cent.geometry.coordinates[0],
y=cent.geometry.coordinates[1],
x1=geom.coordinates[k][0],
y1=geom.coordinates[k][1],
x2=geom.coordinates[k+1][0],
y2=geom.coordinates[k+1][1],
pointOnSegment(x,y,x1,y1,x2,y2)&&(
onLine=!0,
onSurface=!0),

k++;else

if("MultiLineString"===geom.type)for(
var j=0;
j<geom.coordinates.length;){
onLine=!1,
k=0;for(
var line=geom.coordinates[j];
!onLine&&k<line.length-1;)
x=cent.geometry.coordinates[0],
y=cent.geometry.coordinates[1],
x1=line[k][0],
y1=line[k][1],
x2=line[k+1][0],
y2=line[k+1][1],
pointOnSegment(x,y,x1,y1,x2,y2)&&(
onLine=!0,
onSurface=!0),

k++;

j++;
}else(
"Polygon"===geom.type||"MultiPolygon"===geom.type)&&
booleanPointInPolygon(cent,geom)&&(
onSurface=!0);


i++;
}
if(onSurface)
return cent;

var vertices=featureCollection([]);
for(i=0;i<fc.features.length;i++)
vertices.features=vertices.features.concat(explode(fc.features[i]).features);


return point(nearestPoint(cent,vertices).geometry.coordinates);

}









function normalize$1(geojson){return(
"FeatureCollection"===geojson.type?





geojson:"Feature"===geojson.type?featureCollection([geojson]):featureCollection([feature(geojson)]));
}

function pointOnSegment(x,y,x1,y1,x2,y2){
var ab=_Mathsqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)),
ap=_Mathsqrt((x-x1)*(x-x1)+(y-y1)*(y-y1)),
pb=_Mathsqrt((x2-x)*(x2-x)+(y2-y)*(y2-y));
return ab===ap+pb;
}
















function area$1(geojson){
return geomReduce(geojson,function(value,geom){
return value+calculateArea(geom);
},0);
}













function calculateArea(geojson){
var area=0,i;
switch(geojson.type){
case"Polygon":
return polygonArea(geojson.coordinates);
case"MultiPolygon":
for(i=0;i<geojson.coordinates.length;i++)
area+=polygonArea(geojson.coordinates[i]);

return area;
case"Point":
case"MultiPoint":
case"LineString":
case"MultiLineString":
return 0;
case"GeometryCollection":
for(i=0;i<geojson.geometries.length;i++)
area+=calculateArea(geojson.geometries[i]);

return area;}

}

function polygonArea(coords){
var area=0;
if(coords&&0<coords.length){
area+=_Mathabs(ringArea(coords[0]));
for(var i=1;i<coords.length;i++)
area-=_Mathabs(ringArea(coords[i]));

}
return area;
}













function ringArea(coords){
var






area=0,
coordsLength=coords.length,p1,p2,p3,lowerIndex,middleIndex,upperIndex,i;

if(2<coordsLength){
for(i=0;i<coordsLength;i++)
i===coordsLength-2?(
lowerIndex=coordsLength-2,
middleIndex=coordsLength-1,
upperIndex=0):
i===coordsLength-1?(
lowerIndex=coordsLength-1,
middleIndex=0,
upperIndex=1):(

lowerIndex=i,
middleIndex=i+1,
upperIndex=i+2),

p1=coords[lowerIndex],
p2=coords[middleIndex],
p3=coords[upperIndex],
area+=(rad(p3[0])-rad(p1[0]))*_Mathsin(rad(p2[1]));


area=area*RADIUS*RADIUS/2;
}

return area;
}

function rad(_){
return _*_MathPI/180;
}



















function along(line,distance$$1,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");


var coords;
if("Feature"===line.type)coords=line.geometry.coordinates;else
if("LineString"===line.type)coords=line.coordinates;else
throw new Error("input must be a LineString Feature or Geometry");
if(!isNumber(distance$$1))throw new Error("distance must be a number");


for(var travelled=0,i=0;i<coords.length&&!(
distance$$1>=travelled&&i===coords.length-1);i++){
if(travelled>=distance$$1){
var overshot=distance$$1-travelled;
if(!overshot)return point(coords[i]);

var direction=bearing(coords[i],coords[i-1])-180,
interpolated=destination(coords[i],overshot,direction,options);
return interpolated;

}
travelled+=distance(coords[i],coords[i+1],options)}


return point(coords[coords.length-1]);
}

















function length(geojson,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");


if(!geojson)throw new Error("geojson is required");


return segmentReduce(geojson,function(previousValue,segment){
var coords=segment.geometry.coordinates;
return previousValue+distance(coords[0],coords[1],options);
},0);
}






























function lineSlice(startPt,stopPt,line){

var coords=getCoords(line);
if("LineString"!==getType(line))throw new Error("line must be a LineString");

var startVertex=nearestPointOnLine(line,startPt),
stopVertex=nearestPointOnLine(line,stopPt),
ends;

ends=startVertex.properties.index<=stopVertex.properties.index?[startVertex,stopVertex]:

[stopVertex,startVertex];


for(var clipCoords=[ends[0].geometry.coordinates],i=ends[0].properties.index+1;i<ends[1].properties.index+1;i++)
clipCoords.push(coords[i]);


return clipCoords.push(ends[1].geometry.coordinates),lineString(clipCoords,line.properties);
}
























function lineSliceAlong(line,startDist,stopDist,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");

var
slice=[],coords;


if("Feature"===line.type)coords=line.geometry.coordinates;else
if("LineString"===line.type)coords=line.coordinates;else
throw new Error("input must be a LineString Feature or Geometry");



for(var travelled=0,i=0,overshot,direction,interpolated;i<coords.length&&!(
startDist>=travelled&&i===coords.length-1);i++){
if(travelled>startDist&&0===slice.length){

if(overshot=startDist-travelled,!overshot)

return slice.push(coords[i]),lineString(slice);

direction=bearing(coords[i],coords[i-1])-180,
interpolated=destination(coords[i],overshot,direction,options),
slice.push(interpolated.geometry.coordinates);
}

if(travelled>=stopDist)return(
overshot=stopDist-travelled,
!overshot)?(
slice.push(coords[i]),
lineString(slice)):(

direction=bearing(coords[i],coords[i-1])-180,
interpolated=destination(coords[i],overshot,direction,options),
slice.push(interpolated.geometry.coordinates),
lineString(slice));






if(travelled>=startDist&&slice.push(coords[i]),i===coords.length-1)
return lineString(slice);


travelled+=distance(coords[i],coords[i+1],options)}

return lineString(coords[coords.length-1]);
}
















function booleanPointOnLine(pt,line,options){

options=options||{};
var ignoreEndVertices=options.ignoreEndVertices;
if(!isObject(options))throw new Error("invalid options");


if(!pt)throw new Error("pt is required");
if(!line)throw new Error("line is required");






for(var ptCoords=getCoord(pt),lineCoords=getCoords(line),i=0,
ignoreBoundary;i<lineCoords.length-1;i++)





if(ignoreBoundary=!1,ignoreEndVertices&&(0===i&&(ignoreBoundary="start"),i===lineCoords.length-2&&(ignoreBoundary="end"),0===i&&i+1===lineCoords.length-1&&(ignoreBoundary="both")),isPointOnLineSegment$1(lineCoords[i],lineCoords[i+1],ptCoords,ignoreBoundary))return!0;

return!1;
}










function isPointOnLineSegment$1(lineSegmentStart,lineSegmentEnd,pt,excludeBoundary){
var x=pt[0],
y=pt[1],
x1=lineSegmentStart[0],
y1=lineSegmentStart[1],
x2=lineSegmentEnd[0],
y2=lineSegmentEnd[1],
dxc=pt[0]-x1,
dyc=pt[1]-y1,
dxl=x2-x1,
dyl=y2-y1,
cross=dxc*dyl-dyc*dxl;
if(0!=cross)
return!1;return(

excludeBoundary?




"start"===excludeBoundary?
_Mathabs(dxl)>=_Mathabs(dyl)?
0<dxl?x1<x&&x<=x2:x2<=x&&x<x1:

0<dyl?y1<y&&y<=y2:y2<=y&&y<y1:
"end"===excludeBoundary?
_Mathabs(dxl)>=_Mathabs(dyl)?
0<dxl?x1<=x&&x<x2:x2<x&&x<=x1:

0<dyl?y1<=y&&y<y2:y2<y&&y<=y1:
"both"===excludeBoundary?
_Mathabs(dxl)>=_Mathabs(dyl)?
0<dxl?x1<x&&x<x2:x2<x&&x<x1:

0<dyl?y1<y&&y<y2:y2<y&&y<y1:void 0:_Mathabs(dxl)>=_Mathabs(dyl)?0<dxl?x1<=x&&x<=x2:x2<=x&&x<=x1:0<dyl?y1<=y&&y<=y2:y2<=y&&y<=y1);

}


















function booleanWithin(feature1,feature2){
var type1=getType(feature1),
type2=getType(feature2),
geom1=getGeom(feature1),
geom2=getGeom(feature2);

switch(type1){
case"Point":
switch(type2){
case"MultiPoint":
return isPointInMultiPoint(geom1,geom2);
case"LineString":
return booleanPointOnLine(geom1,geom2,{ignoreEndVertices:!0});
case"Polygon":
return booleanPointInPolygon(geom1,geom2,{ignoreBoundary:!0});
default:
throw new Error("feature2 "+type2+" geometry not supported");}

case"MultiPoint":
switch(type2){
case"MultiPoint":
return isMultiPointInMultiPoint(geom1,geom2);
case"LineString":
return isMultiPointOnLine(geom1,geom2);
case"Polygon":
return isMultiPointInPoly(geom1,geom2);
default:
throw new Error("feature2 "+type2+" geometry not supported");}

case"LineString":
switch(type2){
case"LineString":
return isLineOnLine(geom1,geom2);
case"Polygon":
return isLineInPoly(geom1,geom2);
default:
throw new Error("feature2 "+type2+" geometry not supported");}

case"Polygon":
switch(type2){
case"Polygon":
return isPolyInPoly(geom1,geom2);
default:
throw new Error("feature2 "+type2+" geometry not supported");}

default:
throw new Error("feature1 "+type1+" geometry not supported");}

}

function isPointInMultiPoint(point,multiPoint){
var
output=!1,i;
for(i=0;i<multiPoint.coordinates.length;i++)
if(compareCoords(multiPoint.coordinates[i],point.coordinates)){
output=!0;
break;
}

return output;
}

function isMultiPointInMultiPoint(multiPoint1,multiPoint2){
for(var i=0,
anyMatch;i<multiPoint1.coordinates.length;i++){anyMatch=!1;
for(var i2=0;i2<multiPoint2.coordinates.length;i2++)
compareCoords(multiPoint1.coordinates[i],multiPoint2.coordinates[i2])&&(
anyMatch=!0);


if(!anyMatch)
return!1;

}
return!0;
}

function isMultiPointOnLine(multiPoint,lineString){


for(var foundInsidePoint=!1,i=0;i<multiPoint.coordinates.length;i++){
if(!booleanPointOnLine(multiPoint.coordinates[i],lineString))
return!1;

foundInsidePoint||(
foundInsidePoint=booleanPointOnLine(multiPoint.coordinates[i],lineString,{ignoreEndVertices:!0}));

}
return foundInsidePoint;
}

function isMultiPointInPoly(multiPoint,polygon){


for(var output=!0,oneInside=!1,i=0,
isInside;i<multiPoint.coordinates.length;i++){
if(isInside=booleanPointInPolygon(multiPoint.coordinates[1],polygon),!isInside){
output=!1;
break;
}

isInside=booleanPointInPolygon(multiPoint.coordinates[1],polygon,{ignoreBoundary:!0});

}
return output&&isInside;
}

function isLineOnLine(lineString1,lineString2){
for(var i=0;i<lineString1.coordinates.length;i++)
if(!booleanPointOnLine(lineString1.coordinates[i],lineString2))
return!1;


return!0;
}

function isLineInPoly(linestring,polygon){
var polyBbox=bbox(polygon),
lineBbox=bbox(linestring);
if(!doBBoxOverlap(polyBbox,lineBbox))
return!1;



for(var foundInsidePoint=!1,i=0;i<linestring.coordinates.length-1;i++){
if(!booleanPointInPolygon(linestring.coordinates[i],polygon))
return!1;




if(foundInsidePoint||(foundInsidePoint=booleanPointInPolygon(linestring.coordinates[i],polygon,{ignoreBoundary:!0})),!foundInsidePoint){
var midpoint=getMidpoint(linestring.coordinates[i],linestring.coordinates[i+1]);
foundInsidePoint=booleanPointInPolygon(midpoint,polygon,{ignoreBoundary:!0});

}
}
return foundInsidePoint;
}










function isPolyInPoly(feature1,feature2){
var poly1Bbox=bbox(feature1),
poly2Bbox=bbox(feature2);
if(!doBBoxOverlap(poly2Bbox,poly1Bbox))
return!1;

for(var i=0;i<feature1.coordinates[0].length;i++)
if(!booleanPointInPolygon(feature1.coordinates[0][i],feature2))
return!1;


return!0;
}

function doBBoxOverlap(bbox1,bbox2){return!(
bbox1[0]>bbox2[0])&&!(
bbox1[2]<bbox2[2])&&!(
bbox1[1]>bbox2[1])&&!(
bbox1[3]<bbox2[3]);

}









function compareCoords(pair1,pair2){
return pair1[0]===pair2[0]&&pair1[1]===pair2[1];
}









function getMidpoint(pair1,pair2){
return[(pair1[0]+pair2[0])/2,(pair1[1]+pair2[1])/2];
}






















function pointGrid(bbox,cellSide,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");

var mask=options.mask,
properties=options.properties,


results=[];


if(null===cellSide||void 0===cellSide)throw new Error("cellSide is required");
if(!isNumber(cellSide))throw new Error("cellSide is invalid");
if(!bbox)throw new Error("bbox is required");
if(!Array.isArray(bbox))throw new Error("bbox must be array");
if(4!==bbox.length)throw new Error("bbox must contain 4 numbers");
if(mask&&-1===["Polygon","MultiPolygon"].indexOf(getType(mask)))throw new Error("options.mask must be a (Multi)Polygon");for(

var west=bbox[0],
south=bbox[1],
east=bbox[2],
north=bbox[3],

xFraction=cellSide/distance([west,south],[east,south],options),
cellWidth=xFraction*(east-west),
yFraction=cellSide/distance([west,south],[west,north],options),
cellHeight=yFraction*(north-south),

bboxWidth=east-west,
bboxHeight=north-south,
columns=_Mathfloor(bboxWidth/cellWidth),
rows=_Mathfloor(bboxHeight/cellHeight),

deltaX=(bboxWidth-columns*cellWidth)/2,
deltaY=(bboxHeight-rows*cellHeight)/2,

currentX=west+deltaX;
currentX<=east;){for(
var currentY=south+deltaY,

cellPt;currentY<=north;)cellPt=point([currentX,currentY],properties),
mask?
booleanWithin(cellPt,mask)&&results.push(cellPt):

results.push(cellPt),

currentY+=cellHeight;

currentX+=cellWidth;
}

return featureCollection(results);
}
























function truncate(geojson,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var precision=options.precision,
coordinates=options.coordinates,
mutate=options.mutate;






if(precision=void 0===precision||null===precision||isNaN(precision)?6:precision,coordinates=void 0===coordinates||null===coordinates||isNaN(coordinates)?3:coordinates,!geojson)throw new Error("<geojson> is required");
if("number"!=typeof precision)throw new Error("<precision> must be a number");
if("number"!=typeof coordinates)throw new Error("<coordinates> must be a number");(


!1===mutate||void 0===mutate)&&(geojson=JSON.parse(JSON.stringify(geojson)));

var factor=_Mathpow(10,precision);





return coordEach(geojson,function(coords){truncateCoords(coords,factor,coordinates)}),geojson;
}










function truncateCoords(coords,factor,coordinates){

coords.length>coordinates&&coords.splice(coordinates,coords.length);


for(var i=0;i<coords.length;i++)
coords[i]=_Mathround(coords[i]*factor)/factor;

return coords;
}



















function flatten(geojson){
if(!geojson)throw new Error("geojson is required");

var results=[];



return flattenEach(geojson,function(feature$$1){results.push(feature$$1)}),featureCollection(results);
}




















function lineChunk(geojson,segmentLength,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var units=options.units,
reverse=options.reverse;


if(!geojson)throw new Error("geojson is required");
if(0>=segmentLength)throw new Error("segmentLength must be greater than 0");


var results=[];










return flattenEach(geojson,function(feature$$1){reverse&&(feature$$1.geometry.coordinates=feature$$1.geometry.coordinates.reverse()),sliceLineSegments(feature$$1,segmentLength,units,function(segment){results.push(segment)})}),featureCollection(results);
}











function sliceLineSegments(line,segmentLength,units,callback){
var lineLength=length(line,{units:units});


if(lineLength<=segmentLength)return callback(line);

var numberOfSegments=lineLength/segmentLength;


_NumberisInteger(numberOfSegments)||(
numberOfSegments=_Mathfloor(numberOfSegments)+1);


for(var i=0,
outline;i<numberOfSegments;i++)outline=lineSliceAlong(line,segmentLength*i,segmentLength*(i+1),{units:units}),
callback(outline,i);

}














































































































function intersect(start0,end0,start1,end1){
if(equalArrays$1(start0,start1)||equalArrays$1(start0,end1)||equalArrays$1(end0,start1)||equalArrays$1(end1,start1))return null;
var x0=start0[0],
y0=start0[1],
x1=end0[0],
y1=end0[1],
x2=start1[0],
y2=start1[1],
x3=end1[0],
y3=end1[1],
denom=(x0-x1)*(y2-y3)-(y0-y1)*(x2-x3);
if(0==denom)return null;
var x4=((x0*y1-y0*x1)*(x2-x3)-(x0-x1)*(x2*y3-y2*x3))/denom,
y4=((x0*y1-y0*x1)*(y2-y3)-(y0-y1)*(x2*y3-y2*x3))/denom;
return[x4,y4];
}


function equalArrays$1(array1,array2){

if(!array1||!array2)
return!1;


if(array1.length!==array2.length)
return!1;

for(var i=0,l=array1.length;i<l;i++)

if(array1[i]instanceof Array&&array2[i]instanceof Array){

if(!equalArrays$1(array1[i],array2[i]))
return!1;}else
if(array1[i]!==array2[i])

return!1;


return!0;
}































































































































































































































































































































function isConvex(pts,righthanded){



if("undefined"==typeof righthanded&&(righthanded=!0),3!=pts.length)throw new Error("This function requires an array of three points [x,y]");
var d=(pts[1][0]-pts[0][0])*(pts[2][1]-pts[0][1])-(pts[1][1]-pts[0][1])*(pts[2][0]-pts[0][0]);
return 0<=d==righthanded;
}


function windingOfRing(ring){



for(var leftVtx=0,i=0;i<ring.length-1;i++)ring[i][0]<ring[leftVtx][0]&&(leftVtx=i);
if(isConvex([ring[(leftVtx-1).modulo(ring.length-1)],ring[leftVtx],ring[(leftVtx+1).modulo(ring.length-1)]],!0))
var winding=1;else

var winding=-1;

return winding;
}


function equalArrays(array1,array2){

if(!array1||!array2)
return!1;


if(array1.length!=array2.length)
return!1;

for(var i=0,l=array1.length;i<l;i++)

if(array1[i]instanceof Array&&array2[i]instanceof Array){

if(!equalArrays(array1[i],array2[i]))
return!1;}else
if(array1[i]!=array2[i])

return!1;


return!0;
}







function isUnique(array){


for(var u={},isUnique=1,i=0,l=array.length;i<l;++i){
if(u.hasOwnProperty(array[i])){
isUnique=0;
break;
}
u[array[i]]=1;
}
return isUnique;
}
















function unkinkPolygon(geojson){
var features=[];






return flattenEach(geojson,function(feature$$1){"Polygon"!==feature$$1.geometry.type||featureEach(simplepolygon(feature$$1),function(poly){features.push(polygon(poly.geometry.coordinates,feature$$1.properties))})}),featureCollection(features);
}






































































































































































































































































function greatCircle(start,end,options){


if(options=options||{},"object"!=typeof options)throw new Error("options is invalid");
var properties=options.properties,
npoints=options.npoints,
offset=options.offset;

start=getCoord(start),
end=getCoord(end),
properties=properties||{},
npoints=npoints||100,
offset=offset||10;

var generator=new GreatCircle({x:start[0],y:start[1]},{x:end[0],y:end[1]},properties),


line=generator.Arc(npoints,{offset:offset});


return line.json();
}

















function lineSplit(line,splitter){
if(!line)throw new Error("line is required");
if(!splitter)throw new Error("splitter is required");

var lineType=getType(line),
splitterType=getType(splitter);

if("LineString"!==lineType)throw new Error("line must be LineString");
if("FeatureCollection"===splitterType)throw new Error("splitter cannot be a FeatureCollection");
if("GeometryCollection"===splitterType)throw new Error("splitter cannot be a GeometryCollection");



var truncatedSplitter=truncate(splitter,{precision:7});return(


"Point"===splitterType?
splitLineWithPoint(line,truncatedSplitter):
"MultiPoint"===splitterType?
splitLineWithPoints(line,truncatedSplitter):
"LineString"===splitterType||
"MultiLineString"===splitterType||
"Polygon"===splitterType||
"MultiPolygon"===splitterType?
splitLineWithPoints(line,lineIntersect(line,truncatedSplitter)):void 0);

}









function splitLineWithPoints(line,splitter){
var results=[],
tree=geojsonRbush();





































return flattenEach(splitter,function(point$$1){if(results.forEach(function(feature$$1,index){feature$$1.id=index}),!results.length)results=splitLineWithPoint(line,point$$1).features,results.forEach(function(feature$$1){feature$$1.bbox||(feature$$1.bbox=square(bbox(feature$$1)))}),tree.load(featureCollection(results));else{var search=tree.search(point$$1);if(search.features.length){var closestLine=findClosestFeature(point$$1,search);results=results.filter(function(feature$$1){return feature$$1.id!==closestLine.id}),tree.remove(closestLine),featureEach(splitLineWithPoint(closestLine,point$$1),function(line){results.push(line),tree.insert(line)})}}}),featureCollection(results);
}









function splitLineWithPoint(line,splitter){
var results=[],


startPoint=getCoords(line)[0],
endPoint=getCoords(line)[line.geometry.coordinates.length-1];
if(pointsEquals(startPoint,getCoord(splitter))||
pointsEquals(endPoint,getCoord(splitter)))return featureCollection([line]);


var tree=geojsonRbush(),
segments=lineSegment(line);
tree.load(segments);


var search=tree.search(splitter);


if(!search.features.length)return featureCollection([line]);


var closestSegment=findClosestFeature(splitter,search),


initialValue=[startPoint],
lastCoords=featureReduce(segments,function(previous,current,index){
var currentCoords=getCoords(current)[1],
splitterCoords=getCoord(splitter);return(


index===closestSegment.id?(
previous.push(splitterCoords),
results.push(lineString(previous)),

pointsEquals(splitterCoords,currentCoords)?[splitterCoords]:
[splitterCoords,currentCoords]):(



previous.push(currentCoords),
previous));

},initialValue);




return 1<lastCoords.length&&results.push(lineString(lastCoords)),featureCollection(results);
}










function findClosestFeature(point$$1,lines){
if(!lines.features.length)throw new Error("lines must contain features");

if(1===lines.features.length)return lines.features[0];

var
closestDistance=Infinity,closestFeature;








return featureEach(lines,function(segment){var pt=nearestPointOnLine(segment,point$$1),dist=pt.properties.dist;dist<closestDistance&&(closestFeature=segment,closestDistance=dist)}),closestFeature;
}









function pointsEquals(pt1,pt2){
return pt1[0]===pt2[0]&&pt1[1]===pt2[1];
}

























function lineArc(center,radius,bearing1,bearing2,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var steps=options.steps,
units=options.units;


if(!center)throw new Error("center is required");
if(!radius)throw new Error("radius is required");
if(void 0===bearing1||null===bearing1)throw new Error("bearing1 is required");
if(void 0===bearing2||null===bearing2)throw new Error("bearing2 is required");
if("object"!=typeof options)throw new Error("options must be an object");


steps=steps||64;

var angle1=convertAngleTo360(bearing1),
angle2=convertAngleTo360(bearing2),
properties=center.properties;


if(angle1===angle2)
return lineString(circle(center,radius,options).geometry.coordinates[0],properties);for(

var arcStartDegree=angle1,
arcEndDegree=angle1<angle2?angle2:angle2+360,

alfa=arcStartDegree,
coordinates=[],
i=0;

alfa<arcEndDegree;)
coordinates.push(destination(center,radius,alfa,units).geometry.coordinates),
i++,
alfa=arcStartDegree+360*i/steps;




return alfa>arcEndDegree&&coordinates.push(destination(center,radius,arcEndDegree,units).geometry.coordinates),lineString(coordinates,properties);
}










function convertAngleTo360(alfa){
var beta=alfa%360;



return 0>beta&&(beta+=360),beta;
}

















function polygonToLine(polygon$$1,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var properties=options.properties,


geom=getType(polygon$$1),
coords=getCoords(polygon$$1);


if(properties=properties||polygon$$1.properties||{},!coords.length)throw new Error("polygon must contain coordinates");

switch(geom){
case"Polygon":
return coordsToLine(coords,properties);
case"MultiPolygon":
var lines=[];



return coords.forEach(function(coord){lines.push(coordsToLine(coord,properties))}),featureCollection(lines);
default:
throw new Error("geom "+geom+" not supported");}

}

function coordsToLine(coords,properties){return(
1<coords.length?multiLineString(coords,properties):
lineString(coords[0],properties));
}



















function lineToPolygon(lines,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var properties=options.properties,
autoComplete=options.autoComplete,
orderCoords=options.orderCoords;


if(!lines)throw new Error("lines is required");


autoComplete=void 0===autoComplete||autoComplete,
orderCoords=void 0===orderCoords||orderCoords;
var type=getType(lines);

switch(type){
case"FeatureCollection":
case"GeometryCollection":
var coords=[],
features=lines.features?lines.features:lines.geometries;



return features.forEach(function(line){coords.push(getCoords(lineStringToPolygon(line,{},autoComplete,orderCoords)))}),multiPolygon(coords,properties);}

return lineStringToPolygon(lines,properties,autoComplete,orderCoords);
}











function lineStringToPolygon(line,properties,autoComplete,orderCoords){
properties=properties||line.properties||{};
var coords=getCoords(line),
type=getType(line);

if(!coords.length)throw new Error("line must contain coordinates");

switch(type){
case"LineString":

return autoComplete&&(coords=autoCompleteCoords(coords)),polygon([coords],properties);
case"MultiLineString":
var multiCoords=[],
largestArea=0;















return coords.forEach(function(coord){if(autoComplete&&(coord=autoCompleteCoords(coord)),orderCoords){var area=calculateArea$1(bbox(lineString(coord)));area>largestArea?(multiCoords.unshift(coord),largestArea=area):multiCoords.push(coord)}else multiCoords.push(coord)}),polygon(multiCoords,properties);
default:
throw new Error("geometry type "+type+" is not supported");}

}








function autoCompleteCoords(coords){
var first=coords[0],
x1=first[0],
y1=first[1],
last=coords[coords.length-1],
x2=last[0],
y2=last[1];



return(x1!==x2||y1!==y2)&&coords.push(first),coords;
}








function calculateArea$1(bbox$$1){
var west=bbox$$1[0],
south=bbox$$1[1],
east=bbox$$1[2],
north=bbox$$1[3];
return _Mathabs(west-east)*_Mathabs(south-north);
}










function lineclip(points,bbox,result){

var len=points.length,
codeA=bitCode(points[0],bbox),
part=[],
i,a,b,codeB,lastCode;



for(result||(result=[]),i=1;i<len;i++){for(
a=points[i-1],
b=points[i],
codeB=lastCode=bitCode(b,bbox);!0;)



if(!(codeA|codeB)){
part.push(a),

codeB===lastCode?






i===len-1&&
part.push(b):(part.push(b),i<len-1&&(result.push(part),part=[]));

break;

}else if(codeA&codeB)
break;else

codeA?(
a=intersect$1(a,b,codeA,bbox),
codeA=bitCode(a,bbox)):(


b=intersect$1(a,b,codeB,bbox),
codeB=bitCode(b,bbox));



codeA=lastCode;
}



return part.length&&result.push(part),result;
}



function polygonclip(points,bbox){

var result,edge,prev,prevInside,i,p,inside;


for(edge=1;8>=edge;edge*=2){




for(result=[],prev=points[points.length-1],prevInside=!(bitCode(prev,bbox)&edge),i=0;i<points.length;i++)
p=points[i],
inside=!(bitCode(p,bbox)&edge),


inside!==prevInside&&result.push(intersect$1(prev,p,edge,bbox)),

inside&&result.push(p),

prev=p,
prevInside=inside;




if(points=result,!points.length)break;
}

return result;
}



function intersect$1(a,b,edge,bbox){
return 8&edge?[a[0]+(b[0]-a[0])*(bbox[3]-a[1])/(b[1]-a[1]),bbox[3]]:
4&edge?[a[0]+(b[0]-a[0])*(bbox[1]-a[1])/(b[1]-a[1]),bbox[1]]:
2&edge?[bbox[2],a[1]+(b[1]-a[1])*(bbox[2]-a[0])/(b[0]-a[0])]:
1&edge?[bbox[0],a[1]+(b[1]-a[1])*(bbox[0]-a[0])/(b[0]-a[0])]:
null;
}








function bitCode(p,bbox){
var code=0;







return p[0]<bbox[0]?code|=1:p[0]>bbox[2]&&(code|=2),p[1]<bbox[1]?code|=4:p[1]>bbox[3]&&(code|=8),code;
}


















function bboxClip(feature$$1,bbox){
var geom=getGeom$1(feature$$1),
coords=getCoords(feature$$1),
properties=feature$$1.properties;

switch(geom){
case"LineString":
case"MultiLineString":
var lines=[];return(
"LineString"===geom&&(coords=[coords]),
coords.forEach(function(line){
lineclip_1(line,bbox,lines);
}),
1===lines.length?lineString(lines[0],properties):
multiLineString(lines,properties));
case"Polygon":
return polygon(clipPolygon(coords,bbox),properties);
case"MultiPolygon":
return multiPolygon(coords.map(function(polygon$$1){
return clipPolygon(polygon$$1,bbox);
}),properties);
default:
throw new Error("geometry "+geom+" not supported");}

}

function clipPolygon(rings,bbox){

for(var outRings=[],i=0,
clipped;i<rings.length;i++)clipped=lineclip_1.polygon(rings[i],bbox),
0<clipped.length&&((
clipped[0][0]!==clipped[clipped.length-1][0]||clipped[0][1]!==clipped[clipped.length-1][1])&&
clipped.push(clipped[0]),

4<=clipped.length&&
outRings.push(clipped));



return outRings;
}

function getGeom$1(feature$$1){
return feature$$1.geometry?feature$$1.geometry.type:feature$$1.type;
}



function isArguments(object){
return"[object Arguments]"===Object.prototype.toString.call(object);
}

function deepEqual(actual,expected,opts){return(
opts||(opts={}),

actual===expected||(


actual instanceof Date&&expected instanceof Date?
actual.getTime()===expected.getTime():



actual&&expected&&("object"==typeof actual||"object"==typeof expected)?









objEquiv(actual,expected,opts):opts.strict?actual===expected:actual===expected));

}

function isUndefinedOrNull(value){
return null===value||value===void 0;
}

function isBuffer(x){return(
x&&"object"==typeof x&&"number"==typeof x.length&&(
"function"!=typeof x.copy||"function"!=typeof x.slice?!1:


0<x.length&&"number"!=typeof x[0]?!1:!0));

}

function objEquiv(a,b,opts){
var i,key;
if(isUndefinedOrNull(a)||isUndefinedOrNull(b))
return!1;

if(a.prototype!==b.prototype)return!1;


if(isArguments(a))return!!
isArguments(b)&&(


a=pSlice.call(a),
b=pSlice.call(b),
deepEqual(a,b,opts));

if(isBuffer(a)){
if(!isBuffer(b))
return!1;

if(a.length!==b.length)return!1;
for(i=0;i<a.length;i++)
if(a[i]!==b[i])return!1;

return!0;
}
try{
var ka=Object.keys(a),
kb=Object.keys(b);
}catch(e){
return!1;
}


if(ka.length!==kb.length)
return!1;




for(ka.sort(),kb.sort(),i=ka.length-1;0<=i;i--)
if(ka[i]!==kb[i])
return!1;



for(i=ka.length-1;0<=i;i--)

if(key=ka[i],!deepEqual(a[key],b[key],opts))return!1;

return typeof a==typeof b;
}



















function lineOverlap(line1,line2,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var tolerance=options.tolerance||0,


features=[],


tree=geojsonRbush();
tree.load(lineSegment(line1));
var overlapSegment;


















































return segmentEach(line2,function(segment){var doesOverlaps=!1;featureEach(tree.search(segment),function(match){if(!1==doesOverlaps){var coordsSegment=getCoords(segment).sort(),coordsMatch=getCoords(match).sort();deepEqual(coordsSegment,coordsMatch)?(doesOverlaps=!0,overlapSegment=overlapSegment?concatSegment(overlapSegment,segment):segment):(0===tolerance?booleanPointOnLine(coordsSegment[0],match)&&booleanPointOnLine(coordsSegment[1],match):nearestPointOnLine(match,coordsSegment[0]).properties.dist<=tolerance&&nearestPointOnLine(match,coordsSegment[1]).properties.dist<=tolerance)?(doesOverlaps=!0,overlapSegment=overlapSegment?concatSegment(overlapSegment,segment):segment):(0===tolerance?booleanPointOnLine(coordsMatch[0],segment)&&booleanPointOnLine(coordsMatch[1],segment):nearestPointOnLine(segment,coordsMatch[0]).properties.dist<=tolerance&&nearestPointOnLine(segment,coordsMatch[1]).properties.dist<=tolerance)&&(overlapSegment?overlapSegment=concatSegment(overlapSegment,match):overlapSegment=match)}}),!1==doesOverlaps&&overlapSegment&&(features.push(overlapSegment),overlapSegment=void 0)}),overlapSegment&&features.push(overlapSegment),featureCollection(features);
}










function concatSegment(line,segment){
var coords=getCoords(segment),
lineCoords=getCoords(line),
start=lineCoords[0],
end=lineCoords[lineCoords.length-1],
geom=line.geometry.coordinates;





return deepEqual(coords[0],start)?geom.unshift(coords[1]):deepEqual(coords[0],end)?geom.push(coords[1]):deepEqual(coords[1],start)?geom.unshift(coords[0]):deepEqual(coords[1],end)&&geom.push(coords[0]),line;
}

























function sector(center,radius,bearing1,bearing2,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");


if(!center)throw new Error("center is required");
if(void 0===bearing1||null===bearing1)throw new Error("bearing1 is required");
if(void 0===bearing2||null===bearing2)throw new Error("bearing2 is required");
if(!radius)throw new Error("radius is required");
if("object"!=typeof options)throw new Error("options must be an object");

if(convertAngleTo360$1(bearing1)===convertAngleTo360$1(bearing2))
return circle(center,radius,options);

var coords=getCoords(center),
arc=lineArc(center,radius,bearing1,bearing2,options),
sliceCoords=[[coords]];





return coordEach(arc,function(currentCoords){sliceCoords[0].push(currentCoords)}),sliceCoords[0].push(coords),polygon(sliceCoords);
}









function convertAngleTo360$1(alfa){
var beta=alfa%360;

return 0>beta&&(beta+=360),beta;
}


























function rhumbDestination(origin,distance,bearing,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var units=options.units,
properties=options.properties;


if(!origin)throw new Error("origin is required");
if(void 0===distance||null===distance)throw new Error("distance is required");
if(void 0===bearing||null===bearing)throw new Error("bearing is required");
if(!(0<=distance))throw new Error("distance must be greater than 0");

var distanceInMeters=convertLength(distance,units,"meters"),
coords=getCoord(origin),
destination=calculateRhumbDestination(coords,distanceInMeters,bearing);




return destination[0]+=180<destination[0]-coords[0]?-360:180<coords[0]-destination[0]?360:0,point(destination,properties);
}













function calculateRhumbDestination(origin,distance,bearing,radius){







radius=radius===void 0?earthRadius:+radius;

var delta=distance/radius,
lambda1=origin[0]*_MathPI/180,
phi1=degreesToRadians(origin[1]),
theta=degreesToRadians(bearing),

DeltaPhi=delta*_Mathcos(theta),
phi2=phi1+DeltaPhi;


_Mathabs(phi2)>_MathPI/2&&(phi2=0<phi2?_MathPI-phi2:-_MathPI-phi2);

var DeltaPsi=_Mathlog(_Mathtan(phi2/2+_MathPI/4)/_Mathtan(phi1/2+_MathPI/4)),
q=1e-11<_Mathabs(DeltaPsi)?DeltaPhi/DeltaPsi:_Mathcos(phi1),

DeltaLambda=delta*_Mathsin(theta)/q,
lambda2=lambda1+DeltaLambda;

return[(180*lambda2/_MathPI+540)%360-180,180*phi2/_MathPI];
}

















function polygonTangents(pt,polygon$$1){
var pointCoords=getCoords(pt),
polyCoords=getCoords(polygon$$1),






type=getType(polygon$$1),rtan,ltan,enext,eprev;
switch(type){
case"Polygon":
rtan=polyCoords[0][0],
ltan=polyCoords[0][0],
eprev=isLeft(polyCoords[0][0],polyCoords[0][polyCoords[0].length-1],pointCoords);
var out=processPolygon$1(polyCoords[0],pointCoords,eprev,enext,rtan,ltan);
rtan=out[0],
ltan=out[1];
break;
case"MultiPolygon":
rtan=polyCoords[0][0][0],
ltan=polyCoords[0][0][0],
eprev=isLeft(polyCoords[0][0][0],polyCoords[0][0][polyCoords[0][0].length-1],pointCoords),
polyCoords.forEach(function(ring){
var out=processPolygon$1(ring[0],pointCoords,eprev,enext,rtan,ltan);
rtan=out[0],
ltan=out[1];
});}


return featureCollection([point(rtan),point(ltan)]);
}

function processPolygon$1(polygonCoords,ptCoords,eprev,enext,rtan,ltan){
for(var i=0;i<polygonCoords.length;i++){
var currentCoords=polygonCoords[i],
nextCoordPair=polygonCoords[i+1];
i===polygonCoords.length-1&&(
nextCoordPair=polygonCoords[0]),

enext=isLeft(currentCoords,nextCoordPair,ptCoords),
0>=eprev&&0<enext?
!isBelow(ptCoords,currentCoords,rtan)&&(
rtan=currentCoords):

0<eprev&&0>=enext&&
!isAbove(ptCoords,currentCoords,ltan)&&(
ltan=currentCoords),


eprev=enext;
}
return[rtan,ltan];
}

function isAbove(point1,point2,point3){
return 0<isLeft(point1,point2,point3);
}

function isBelow(point1,point2,point3){
return 0>isLeft(point1,point2,point3);
}

function isLeft(point1,point2,point3){
return(point2[0]-point1[0])*(point3[1]-point1[1])-(point3[0]-point1[0])*(point2[1]-point1[1]);
}
















function booleanClockwise(line){

if(!line)throw new Error("line is required");
var type=line.geometry?line.geometry.type:line.type;
if(!Array.isArray(line)&&"LineString"!==type)throw new Error("geometry must be a LineString");for(

var ring=getCoords(line),
sum=0,
i=1,
prev,cur;
i<ring.length;)
prev=cur||ring[0],
cur=ring[i],
sum+=(cur[0]-prev[0])*(cur[1]+prev[1]),
i++;

return 0<sum;
}


















function rewind(geojson,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var reverse=options.reverse||!1,
mutate=options.mutate||!1;


if(!geojson)throw new Error("<geojson> is required");
if("boolean"!=typeof reverse)throw new Error("<reverse> must be a boolean");
if("boolean"!=typeof mutate)throw new Error("<mutate> must be a boolean");


!1===mutate&&(geojson=clone(geojson));


var results=[];
switch(geojson.type){
case"GeometryCollection":



return geomEach(geojson,function(geometry$$1){rewindFeature(geometry$$1,reverse)}),geojson;
case"FeatureCollection":





return featureEach(geojson,function(feature$$1){featureEach(rewindFeature(feature$$1,reverse),function(result){results.push(result)})}),featureCollection(results);}


return rewindFeature(geojson,reverse);
}









function rewindFeature(geojson,reverse){
var type="Feature"===geojson.type?geojson.geometry.type:geojson.type;return(



"GeometryCollection"===type?(
geomEach(geojson,function(geometry$$1){
rewindFeature(geometry$$1,reverse);
}),
geojson):
"LineString"===type?(
rewindLineString(getCoords(geojson),reverse),
geojson):
"Polygon"===type?(
rewindPolygon(getCoords(geojson),reverse),
geojson):
"MultiLineString"===type?(
getCoords(geojson).forEach(function(lineCoords){
rewindLineString(lineCoords,reverse);
}),
geojson):
"MultiPolygon"===type?(
getCoords(geojson).forEach(function(lineCoords){
rewindPolygon(lineCoords,reverse);
}),
geojson):
"Point"===type||
"MultiPoint"===type?
geojson:void 0);

}









function rewindLineString(coords,reverse){
booleanClockwise(coords)===reverse&&coords.reverse();
}









function rewindPolygon(coords,reverse){

booleanClockwise(coords[0])!==reverse&&
coords[0].reverse();


for(var i=1;i<coords.length;i++)
booleanClockwise(coords[i])===reverse&&
coords[i].reverse();


}

































function gridToMatrix$1(grid,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var zProperty=options.zProperty||"elevation",
flip=options.flip,
flags=options.flags;


collectionOf(grid,"Point","input must contain Points");






for(var pointsMatrix=sortPointsByLatLng$1(grid,flip),matrix=[],r=0;r<pointsMatrix.length;r++){


for(var pointRow=pointsMatrix[r],row=[],c=0,
point$$1;c<pointRow.length;c++)point$$1=pointRow[c],

point$$1.properties[zProperty]?row.push(point$$1.properties[zProperty]):
row.push(0),

!0===flags&&(point$$1.properties.matrixPosition=[r,c]);

matrix.push(row);
}

return matrix;
}









function sortPointsByLatLng$1(points$$1,flip){
var pointsByLatitude={};


featureEach(points$$1,function(point$$1){
var lat=getCoords(point$$1)[1];
pointsByLatitude[lat]||(pointsByLatitude[lat]=[]),
pointsByLatitude[lat].push(point$$1);
});


var orderedRowsByLatitude=Object.keys(pointsByLatitude).map(function(lat){
var row=pointsByLatitude[lat],
rowOrderedByLongitude=row.sort(function(a,b){
return getCoords(a)[0]-getCoords(b)[0];
});
return rowOrderedByLongitude;
}),


pointMatrix=orderedRowsByLatitude.sort(function(a,b){return(
flip?getCoords(a[0])[1]-getCoords(b[0])[1]:
getCoords(b[0])[1]-getCoords(a[0])[1]);
});

return pointMatrix;
}























function isoBands(data,minV,bandwidth,options){

options=options?options:{};



for(var optionKeys=Object.keys(defaultSettings$1),i=0;i<optionKeys.length;i++){
var key=optionKeys[i],
val=options[key];
val="undefined"!=typeof val&&null!==val?val:defaultSettings$1[key],

settings$1[key]=val;
}

settings$1.verbose&&
console.log("MarchingSquaresJS-isoBands: computing isobands for ["+minV+":"+(minV+bandwidth)+"]");

var grid=computeBandGrid(data,minV,bandwidth),

ret;













return settings$1.polygons?(settings$1.verbose&&console.log("MarchingSquaresJS-isoBands: returning single polygons for each grid cell"),ret=BandGrid2Areas(grid)):(settings$1.verbose&&console.log("MarchingSquaresJS-isoBands: returning polygon paths for entire data grid"),ret=BandGrid2AreaPaths(grid)),"function"==typeof settings$1.successCallback&&settings$1.successCallback(ret),ret;
}




























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































function interpolateX$1(y,y0,y1){
return(y-y0)/(y1-y0);
}

function isArray(myArray){
return-1<myArray.constructor.toString().indexOf("Array");
}







function computeBandGrid(data,minV,bandwidth){






for(var rows=data.length-1,cols=data[0].length-1,BandGrid={rows:rows,cols:cols,cells:[]},maxV=minV+_Mathabs(bandwidth),j=0;j<rows;++j){
BandGrid.cells[j]=[];
for(var i=0;i<cols;++i){

var cval=0,

tl=data[j+1][i],
tr=data[j+1][i+1],
br=data[j][i+1],
bl=data[j][i];

if(!(isNaN(tl)||isNaN(tr)||isNaN(br)||isNaN(bl))){



cval|=tl<minV?0:tl>maxV?128:64,
cval|=tr<minV?0:tr>maxV?32:16,
cval|=br<minV?0:br>maxV?8:4,
cval|=bl<minV?0:bl>maxV?2:1;

var cval_real=+cval,


flipped=0;
if(17==cval||
18==cval||
33==cval||
34==cval||
38==cval||
68==cval||
72==cval||
98==cval||
102==cval||
132==cval||
136==cval||
137==cval||
152==cval||
153==cval)
{
var average=(tl+tr+br+bl)/4;

flipped=average>maxV?2:average<minV?0:1,




34==cval?
1==flipped?
cval=35:
0==flipped&&(
cval=136):

136==cval?
1==flipped?(
cval=35,
flipped=4):
0==flipped&&(
cval=34):




17==cval?
1==flipped?(
cval=155,
flipped=4):
0==flipped&&(
cval=153):

68==cval?
1==flipped?(
cval=103,
flipped=4):
0==flipped&&(
cval=102):

153==cval?
1==flipped&&(
cval=155):
102==cval?
1==flipped&&(
cval=103):



152==cval?
2>flipped&&(
cval=156,
flipped=1):

137==cval?
2>flipped&&(
cval=139,
flipped=1):

98==cval?
2>flipped&&(
cval=99,
flipped=1):

38==cval?
2>flipped&&(
cval=39,
flipped=1):

18==cval?
0<flipped?(
cval=156,
flipped=4):

cval=152:

33==cval?
0<flipped?(
cval=139,
flipped=4):

cval=137:

72==cval?
0<flipped?(
cval=99,
flipped=4):

cval=98:

132==cval&&(
0<flipped?(
cval=39,
flipped=4):

cval=38);


}


if(0!=cval&&170!=cval){
var topleft,topright,bottomleft,bottomright,
righttop,rightbottom,lefttop,leftbottom;

topleft=topright=bottomleft=bottomright=righttop=
rightbottom=lefttop=leftbottom=0.5;

var edges=[];



1==cval?(
bottomleft=1-interpolateX$1(minV,br,bl),
leftbottom=1-interpolateX$1(minV,tl,bl),
edges.push(isoBandEdgeBL[cval])):
169==cval?(
bottomleft=interpolateX$1(maxV,bl,br),
leftbottom=interpolateX$1(maxV,bl,tl),
edges.push(isoBandEdgeBL[cval])):
4==cval?(
rightbottom=1-interpolateX$1(minV,tr,br),
bottomright=interpolateX$1(minV,bl,br),
edges.push(isoBandEdgeRB[cval])):
166==cval?(
rightbottom=interpolateX$1(maxV,br,tr),
bottomright=1-interpolateX$1(maxV,br,bl),
edges.push(isoBandEdgeRB[cval])):
16==cval?(
righttop=interpolateX$1(minV,br,tr),
topright=interpolateX$1(minV,tl,tr),
edges.push(isoBandEdgeRT[cval])):
154==cval?(
righttop=1-interpolateX$1(maxV,tr,br),
topright=1-interpolateX$1(maxV,tr,tl),
edges.push(isoBandEdgeRT[cval])):
64==cval?(
lefttop=interpolateX$1(minV,bl,tl),
topleft=1-interpolateX$1(minV,tr,tl),
edges.push(isoBandEdgeLT[cval])):
106==cval?(
lefttop=1-interpolateX$1(maxV,tl,bl),
topleft=interpolateX$1(maxV,tl,tr),
edges.push(isoBandEdgeLT[cval])):


168==cval?(
bottomright=interpolateX$1(maxV,bl,br),
bottomleft=interpolateX$1(minV,bl,br),
leftbottom=interpolateX$1(minV,bl,tl),
lefttop=interpolateX$1(maxV,bl,tl),
edges.push(isoBandEdgeBR[cval]),
edges.push(isoBandEdgeBL[cval])):
2==cval?(
bottomright=1-interpolateX$1(minV,br,bl),
bottomleft=1-interpolateX$1(maxV,br,bl),
leftbottom=1-interpolateX$1(maxV,tl,bl),
lefttop=1-interpolateX$1(minV,tl,bl),
edges.push(isoBandEdgeBR[cval]),
edges.push(isoBandEdgeBL[cval])):
162==cval?(
righttop=interpolateX$1(maxV,br,tr),
rightbottom=interpolateX$1(minV,br,tr),
bottomright=1-interpolateX$1(minV,br,bl),
bottomleft=1-interpolateX$1(maxV,br,bl),
edges.push(isoBandEdgeBR[cval]),
edges.push(isoBandEdgeBL[cval])):
8==cval?(
righttop=1-interpolateX$1(minV,tr,br),
rightbottom=1-interpolateX$1(maxV,tr,br),
bottomright=interpolateX$1(maxV,bl,br),
bottomleft=interpolateX$1(minV,bl,br),
edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeRB[cval])):
138==cval?(
righttop=1-interpolateX$1(minV,tr,br),
rightbottom=1-interpolateX$1(maxV,tr,br),
topleft=1-interpolateX$1(maxV,tr,tl),
topright=1-interpolateX$1(minV,tr,tl),
edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeRB[cval])):
32==cval?(
righttop=interpolateX$1(maxV,br,tr),
rightbottom=interpolateX$1(minV,br,tr),
topleft=interpolateX$1(minV,tl,tr),
topright=interpolateX$1(maxV,tl,tr),
edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeRB[cval])):
42==cval?(
leftbottom=1-interpolateX$1(maxV,tl,bl),
lefttop=1-interpolateX$1(minV,tl,bl),
topleft=interpolateX$1(minV,tl,tr),
topright=interpolateX$1(maxV,tl,tr),
edges.push(isoBandEdgeLB[cval]),
edges.push(isoBandEdgeLT[cval])):
128==cval&&(
leftbottom=interpolateX$1(minV,bl,tl),
lefttop=interpolateX$1(maxV,bl,tl),
topleft=1-interpolateX$1(maxV,tr,tl),
topright=1-interpolateX$1(minV,tr,tl),
edges.push(isoBandEdgeLB[cval]),
edges.push(isoBandEdgeLT[cval])),



5==cval?(
rightbottom=1-interpolateX$1(minV,tr,br),
leftbottom=1-interpolateX$1(minV,tl,bl),
edges.push(isoBandEdgeRB[cval])):
165==cval?(
rightbottom=interpolateX$1(maxV,br,tr),
leftbottom=interpolateX$1(maxV,bl,tl),
edges.push(isoBandEdgeRB[cval])):
20==cval?(
bottomright=interpolateX$1(minV,bl,br),
topright=interpolateX$1(minV,tl,tr),
edges.push(isoBandEdgeBR[cval])):
150==cval?(
bottomright=1-interpolateX$1(maxV,br,bl),
topright=1-interpolateX$1(maxV,tr,tl),
edges.push(isoBandEdgeBR[cval])):
80==cval?(
righttop=interpolateX$1(minV,br,tr),
lefttop=interpolateX$1(minV,bl,tl),
edges.push(isoBandEdgeRT[cval])):
90==cval?(
righttop=1-interpolateX$1(maxV,tr,br),
lefttop=1-interpolateX$1(maxV,tl,bl),
edges.push(isoBandEdgeRT[cval])):
65==cval?(
bottomleft=1-interpolateX$1(minV,br,bl),
topleft=1-interpolateX$1(minV,tr,tl),
edges.push(isoBandEdgeBL[cval])):
105==cval?(
bottomleft=interpolateX$1(maxV,bl,br),
topleft=interpolateX$1(maxV,tl,tr),
edges.push(isoBandEdgeBL[cval])):
160==cval?(
righttop=interpolateX$1(maxV,br,tr),
rightbottom=interpolateX$1(minV,br,tr),
leftbottom=interpolateX$1(minV,bl,tl),
lefttop=interpolateX$1(maxV,bl,tl),
edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeRB[cval])):
10==cval?(
righttop=1-interpolateX$1(minV,tr,br),
rightbottom=1-interpolateX$1(maxV,tr,br),
leftbottom=1-interpolateX$1(maxV,tl,bl),
lefttop=1-interpolateX$1(minV,tl,bl),
edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeRB[cval])):
130==cval?(
bottomright=1-interpolateX$1(minV,br,bl),
bottomleft=1-interpolateX$1(maxV,br,bl),
topleft=1-interpolateX$1(maxV,tr,tl),
topright=1-interpolateX$1(minV,tr,tl),
edges.push(isoBandEdgeBR[cval]),
edges.push(isoBandEdgeBL[cval])):
40==cval?(
bottomright=interpolateX$1(maxV,bl,br),
bottomleft=interpolateX$1(minV,bl,br),
topleft=interpolateX$1(minV,tl,tr),
topright=interpolateX$1(maxV,tl,tr),
edges.push(isoBandEdgeBR[cval]),
edges.push(isoBandEdgeBL[cval])):



101==cval?(
rightbottom=interpolateX$1(maxV,br,tr),
topleft=interpolateX$1(maxV,tl,tr),
edges.push(isoBandEdgeRB[cval])):
69==cval?(
rightbottom=1-interpolateX$1(minV,tr,br),
topleft=1-interpolateX$1(minV,tr,tl),
edges.push(isoBandEdgeRB[cval])):
149==cval?(
leftbottom=interpolateX$1(maxV,bl,tl),
topright=1-interpolateX$1(maxV,tr,tl),
edges.push(isoBandEdgeLB[cval])):
21==cval?(
leftbottom=1-interpolateX$1(minV,tl,bl),
topright=interpolateX$1(minV,tl,tr),
edges.push(isoBandEdgeLB[cval])):
86==cval?(
bottomright=1-interpolateX$1(maxV,br,bl),
lefttop=1-interpolateX$1(maxV,tl,bl),
edges.push(isoBandEdgeBR[cval])):
84==cval?(
bottomright=interpolateX$1(minV,bl,br),
lefttop=interpolateX$1(minV,bl,tl),
edges.push(isoBandEdgeBR[cval])):
89==cval?(
righttop=1-interpolateX$1(maxV,tr,br),
bottomleft=interpolateX$1(maxV,bl,br),
edges.push(isoBandEdgeBL[cval])):
81==cval?(
righttop=interpolateX$1(minV,br,tr),
bottomleft=1-interpolateX$1(minV,br,bl),
edges.push(isoBandEdgeBL[cval])):
96==cval?(
righttop=interpolateX$1(maxV,br,tr),
rightbottom=interpolateX$1(minV,br,tr),
lefttop=interpolateX$1(minV,bl,tl),
topleft=interpolateX$1(maxV,tl,tr),
edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeRB[cval])):
74==cval?(
righttop=1-interpolateX$1(minV,tr,br),
rightbottom=1-interpolateX$1(maxV,tr,br),
lefttop=1-interpolateX$1(maxV,tl,bl),
topleft=1-interpolateX$1(minV,tr,tl),
edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeRB[cval])):
24==cval?(
righttop=1-interpolateX$1(maxV,tr,br),
bottomright=interpolateX$1(maxV,bl,br),
bottomleft=interpolateX$1(minV,bl,br),
topright=interpolateX$1(minV,tl,tr),
edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeBL[cval])):
146==cval?(
righttop=interpolateX$1(minV,br,tr),
bottomright=1-interpolateX$1(minV,br,bl),
bottomleft=1-interpolateX$1(maxV,br,bl),
topright=1-interpolateX$1(maxV,tr,tl),
edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeBL[cval])):
6==cval?(
rightbottom=1-interpolateX$1(minV,tr,br),
bottomright=1-interpolateX$1(maxV,br,bl),
leftbottom=1-interpolateX$1(maxV,tl,bl),
lefttop=1-interpolateX$1(minV,tl,bl),
edges.push(isoBandEdgeRB[cval]),
edges.push(isoBandEdgeBR[cval])):
164==cval?(
rightbottom=interpolateX$1(maxV,br,tr),
bottomright=interpolateX$1(minV,bl,br),
leftbottom=interpolateX$1(minV,bl,tl),
lefttop=interpolateX$1(maxV,bl,tl),
edges.push(isoBandEdgeRB[cval]),
edges.push(isoBandEdgeBR[cval])):
129==cval?(
bottomleft=1-interpolateX$1(minV,br,bl),
leftbottom=interpolateX$1(maxV,bl,tl),
topleft=1-interpolateX$1(maxV,tr,tl),
topright=1-interpolateX$1(minV,tr,tl),
edges.push(isoBandEdgeBL[cval]),
edges.push(isoBandEdgeLB[cval])):
41==cval?(
bottomleft=interpolateX$1(maxV,bl,br),
leftbottom=1-interpolateX$1(minV,tl,bl),
topleft=interpolateX$1(minV,tl,tr),
topright=interpolateX$1(maxV,tl,tr),
edges.push(isoBandEdgeBL[cval]),
edges.push(isoBandEdgeLB[cval])):
66==cval?(
bottomright=1-interpolateX$1(minV,br,bl),
bottomleft=1-interpolateX$1(maxV,br,bl),
lefttop=1-interpolateX$1(maxV,tl,bl),
topleft=1-interpolateX$1(minV,tr,tl),
edges.push(isoBandEdgeBR[cval]),
edges.push(isoBandEdgeBL[cval])):
104==cval?(
bottomright=interpolateX$1(maxV,bl,br),
bottomleft=interpolateX$1(minV,bl,br),
lefttop=interpolateX$1(minV,bl,tl),
topleft=interpolateX$1(maxV,tl,tr),
edges.push(isoBandEdgeBL[cval]),
edges.push(isoBandEdgeTL[cval])):
144==cval?(
righttop=interpolateX$1(minV,br,tr),
leftbottom=interpolateX$1(minV,bl,tl),
lefttop=interpolateX$1(maxV,bl,tl),
topright=1-interpolateX$1(maxV,tr,tl),
edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeLT[cval])):
26==cval?(
righttop=1-interpolateX$1(maxV,tr,br),
leftbottom=1-interpolateX$1(maxV,tl,bl),
lefttop=1-interpolateX$1(minV,tl,bl),
topright=interpolateX$1(minV,tl,tr),
edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeLT[cval])):
36==cval?(
rightbottom=interpolateX$1(maxV,br,tr),
bottomright=interpolateX$1(minV,bl,br),
topleft=interpolateX$1(minV,tl,tr),
topright=interpolateX$1(maxV,tl,tr),
edges.push(isoBandEdgeRB[cval]),
edges.push(isoBandEdgeBR[cval])):
134==cval?(
rightbottom=1-interpolateX$1(minV,tr,br),
bottomright=1-interpolateX$1(maxV,br,bl),
topleft=1-interpolateX$1(maxV,tr,tl),
topright=1-interpolateX$1(minV,tr,tl),
edges.push(isoBandEdgeRB[cval]),
edges.push(isoBandEdgeBR[cval])):
9==cval?(
righttop=1-interpolateX$1(minV,tr,br),
rightbottom=1-interpolateX$1(maxV,tr,br),
bottomleft=interpolateX$1(maxV,bl,br),
leftbottom=1-interpolateX$1(minV,tl,bl),
edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeRB[cval])):
161==cval?(
righttop=interpolateX$1(maxV,br,tr),
rightbottom=interpolateX$1(minV,br,tr),
bottomleft=1-interpolateX$1(minV,br,bl),
leftbottom=interpolateX$1(maxV,bl,tl),
edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeRB[cval])):



37==cval?(
rightbottom=interpolateX$1(maxV,br,tr),
leftbottom=1-interpolateX$1(minV,tl,bl),
topleft=interpolateX$1(minV,tl,tr),
topright=interpolateX$1(maxV,tl,tr),
edges.push(isoBandEdgeRB[cval]),
edges.push(isoBandEdgeLB[cval])):
133==cval?(
rightbottom=1-interpolateX$1(minV,tr,br),
leftbottom=interpolateX$1(maxV,bl,tl),
topleft=1-interpolateX$1(maxV,tr,tl),
topright=1-interpolateX$1(minV,tr,tl),
edges.push(isoBandEdgeRB[cval]),
edges.push(isoBandEdgeLB[cval])):
148==cval?(
bottomright=interpolateX$1(minV,bl,br),
leftbottom=interpolateX$1(minV,bl,tl),
lefttop=interpolateX$1(maxV,bl,tl),
topright=1-interpolateX$1(maxV,tr,tl),
edges.push(isoBandEdgeBR[cval]),
edges.push(isoBandEdgeLT[cval])):
22==cval?(
bottomright=1-interpolateX$1(maxV,br,bl),
leftbottom=1-interpolateX$1(maxV,tl,bl),
lefttop=1-interpolateX$1(minV,tl,bl),
topright=interpolateX$1(minV,tl,tr),
edges.push(isoBandEdgeBR[cval]),
edges.push(isoBandEdgeLT[cval])):
82==cval?(
righttop=interpolateX$1(minV,br,tr),
bottomright=1-interpolateX$1(minV,br,bl),
bottomleft=1-interpolateX$1(maxV,br,bl),
lefttop=1-interpolateX$1(maxV,tl,bl),
edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeBL[cval])):
88==cval?(
righttop=1-interpolateX$1(maxV,tr,br),
bottomright=interpolateX$1(maxV,bl,br),
bottomleft=interpolateX$1(minV,bl,br),
lefttop=interpolateX$1(minV,bl,tl),
edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeBL[cval])):
73==cval?(
righttop=1-interpolateX$1(minV,tr,br),
rightbottom=1-interpolateX$1(maxV,tr,br),
bottomleft=interpolateX$1(maxV,bl,br),
topleft=1-interpolateX$1(minV,tr,tl),
edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeRB[cval])):
97==cval?(
righttop=interpolateX$1(maxV,br,tr),
rightbottom=interpolateX$1(minV,br,tr),
bottomleft=1-interpolateX$1(minV,br,bl),
topleft=interpolateX$1(maxV,tl,tr),
edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeRB[cval])):
145==cval?(
righttop=interpolateX$1(minV,br,tr),
bottomleft=1-interpolateX$1(minV,br,bl),
leftbottom=interpolateX$1(maxV,bl,tl),
topright=1-interpolateX$1(maxV,tr,tl),
edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeLB[cval])):
25==cval?(
righttop=1-interpolateX$1(maxV,tr,br),
bottomleft=interpolateX$1(maxV,bl,br),
leftbottom=1-interpolateX$1(minV,tl,bl),
topright=interpolateX$1(minV,tl,tr),
edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeLB[cval])):
70==cval?(
rightbottom=1-interpolateX$1(minV,tr,br),
bottomright=1-interpolateX$1(maxV,br,bl),
lefttop=1-interpolateX$1(maxV,tl,bl),
topleft=1-interpolateX$1(minV,tr,tl),
edges.push(isoBandEdgeRB[cval]),
edges.push(isoBandEdgeBR[cval])):
100==cval?(
rightbottom=interpolateX$1(maxV,br,tr),
bottomright=interpolateX$1(minV,bl,br),
lefttop=interpolateX$1(minV,bl,tl),
topleft=interpolateX$1(maxV,tl,tr),
edges.push(isoBandEdgeRB[cval]),
edges.push(isoBandEdgeBR[cval])):



34==cval?(
0==flipped?(
righttop=1-interpolateX$1(minV,tr,br),
rightbottom=1-interpolateX$1(maxV,tr,br),
bottomright=interpolateX$1(maxV,bl,br),
bottomleft=interpolateX$1(minV,bl,br),
leftbottom=interpolateX$1(minV,bl,tl),
lefttop=interpolateX$1(maxV,bl,tl),
topleft=1-interpolateX$1(maxV,tr,tl),
topright=1-interpolateX$1(minV,tr,tl)):(

righttop=interpolateX$1(maxV,br,tr),
rightbottom=interpolateX$1(minV,br,tr),
bottomright=1-interpolateX$1(minV,br,bl),
bottomleft=1-interpolateX$1(maxV,br,bl),
leftbottom=1-interpolateX$1(maxV,tl,bl),
lefttop=1-interpolateX$1(minV,tl,bl),
topleft=interpolateX$1(minV,tl,tr),
topright=interpolateX$1(maxV,tl,tr)),

edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeRB[cval]),
edges.push(isoBandEdgeLB[cval]),
edges.push(isoBandEdgeLT[cval])):
35==cval?(
4==flipped?(
righttop=1-interpolateX$1(minV,tr,br),
rightbottom=1-interpolateX$1(maxV,tr,br),
bottomright=interpolateX$1(maxV,bl,br),
bottomleft=interpolateX$1(minV,bl,br),
leftbottom=interpolateX$1(minV,bl,tl),
lefttop=interpolateX$1(maxV,bl,tl),
topleft=1-interpolateX$1(maxV,tr,tl),
topright=1-interpolateX$1(minV,tr,tl)):(

righttop=interpolateX$1(maxV,br,tr),
rightbottom=interpolateX$1(minV,br,tr),
bottomright=1-interpolateX$1(minV,br,bl),
bottomleft=1-interpolateX$1(maxV,br,bl),
leftbottom=1-interpolateX$1(maxV,tl,bl),
lefttop=1-interpolateX$1(minV,tl,bl),
topleft=interpolateX$1(minV,tl,tr),
topright=interpolateX$1(maxV,tl,tr)),

edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeRB[cval]),
edges.push(isoBandEdgeBL[cval]),
edges.push(isoBandEdgeLT[cval])):
136==cval?(
0==flipped?(
righttop=interpolateX$1(maxV,br,tr),
rightbottom=interpolateX$1(minV,br,tr),
bottomright=1-interpolateX$1(minV,br,bl),
bottomleft=1-interpolateX$1(maxV,br,bl),
leftbottom=1-interpolateX$1(maxV,tl,bl),
lefttop=1-interpolateX$1(minV,tl,bl),
topleft=interpolateX$1(minV,tl,tr),
topright=interpolateX$1(maxV,tl,tr)):(

righttop=1-interpolateX$1(minV,tr,br),
rightbottom=1-interpolateX$1(maxV,tr,br),
bottomright=interpolateX$1(maxV,bl,br),
bottomleft=interpolateX$1(minV,bl,br),
leftbottom=interpolateX$1(minV,bl,tl),
lefttop=interpolateX$1(maxV,bl,tl),
topleft=1-interpolateX$1(maxV,tr,tl),
topright=1-interpolateX$1(minV,tr,tl)),

edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeRB[cval]),
edges.push(isoBandEdgeLB[cval]),
edges.push(isoBandEdgeLT[cval])):



153==cval?(
0==flipped?(
righttop=interpolateX$1(minV,br,tr),
bottomleft=1-interpolateX$1(minV,br,bl),
leftbottom=1-interpolateX$1(minV,tl,bl),
topright=interpolateX$1(minV,tl,tr)):(

righttop=1-interpolateX$1(maxV,tr,br),
bottomleft=interpolateX$1(maxV,bl,br),
leftbottom=interpolateX$1(maxV,bl,tl),
topright=1-interpolateX$1(maxV,tr,tl)),

edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeBL[cval])):
102==cval?(
0==flipped?(
rightbottom=1-interpolateX$1(minV,tr,br),
bottomright=interpolateX$1(minV,bl,br),
lefttop=interpolateX$1(minV,bl,tl),
topleft=1-interpolateX$1(minV,tr,tl)):(

rightbottom=interpolateX$1(maxV,br,tr),
bottomright=1-interpolateX$1(maxV,br,bl),
lefttop=1-interpolateX$1(maxV,tl,bl),
topleft=interpolateX$1(maxV,tl,tr)),

edges.push(isoBandEdgeRB[cval]),
edges.push(isoBandEdgeLT[cval])):
155==cval?(
4==flipped?(
righttop=interpolateX$1(minV,br,tr),
bottomleft=1-interpolateX$1(minV,br,bl),
leftbottom=1-interpolateX$1(minV,tl,bl),
topright=interpolateX$1(minV,tl,tr)):(

righttop=1-interpolateX$1(maxV,tr,br),
bottomleft=interpolateX$1(maxV,bl,br),
leftbottom=interpolateX$1(maxV,bl,tl),
topright=1-interpolateX$1(maxV,tr,tl)),

edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeLB[cval])):
103==cval?(
4==flipped?(
rightbottom=1-interpolateX$1(minV,tr,br),
bottomright=interpolateX$1(minV,bl,br),
lefttop=interpolateX$1(minV,bl,tl),
topleft=1-interpolateX$1(minV,tr,tl)):(

rightbottom=interpolateX$1(maxV,br,tr),
bottomright=1-interpolateX$1(maxV,br,bl),
lefttop=1-interpolateX$1(maxV,tl,bl),
topleft=interpolateX$1(maxV,tl,tr)),

edges.push(isoBandEdgeRB[cval]),
edges.push(isoBandEdgeBR[cval])):



152==cval?(
0==flipped?(
righttop=interpolateX$1(minV,br,tr),
bottomright=1-interpolateX$1(minV,br,bl),
bottomleft=1-interpolateX$1(maxV,br,bl),
leftbottom=1-interpolateX$1(maxV,tl,bl),
lefttop=1-interpolateX$1(minV,tl,bl),
topright=interpolateX$1(minV,tl,tr)):(

righttop=1-interpolateX$1(maxV,tr,br),
bottomright=interpolateX$1(maxV,bl,br),
bottomleft=interpolateX$1(minV,bl,br),
leftbottom=interpolateX$1(minV,bl,tl),
lefttop=interpolateX$1(maxV,bl,tl),
topright=1-interpolateX$1(maxV,tr,tl)),

edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeBR[cval]),
edges.push(isoBandEdgeBL[cval])):
156==cval?(
4==flipped?(
righttop=interpolateX$1(minV,br,tr),
bottomright=1-interpolateX$1(minV,br,bl),
bottomleft=1-interpolateX$1(maxV,br,bl),
leftbottom=1-interpolateX$1(maxV,tl,bl),
lefttop=1-interpolateX$1(minV,tl,bl),
topright=interpolateX$1(minV,tl,tr)):(

righttop=1-interpolateX$1(maxV,tr,br),
bottomright=interpolateX$1(maxV,bl,br),
bottomleft=interpolateX$1(minV,bl,br),
leftbottom=interpolateX$1(minV,bl,tl),
lefttop=interpolateX$1(maxV,bl,tl),
topright=1-interpolateX$1(maxV,tr,tl)),

edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeBL[cval]),
edges.push(isoBandEdgeLT[cval])):
137==cval?(
0==flipped?(
righttop=interpolateX$1(maxV,br,tr),
rightbottom=interpolateX$1(minV,br,tr),
bottomleft=1-interpolateX$1(minV,br,bl),
leftbottom=1-interpolateX$1(minV,tl,bl),
topleft=interpolateX$1(minV,tl,tr),
topright=interpolateX$1(maxV,tl,tr)):(

righttop=1-interpolateX$1(minV,tr,br),
rightbottom=1-interpolateX$1(maxV,tr,br),
bottomleft=interpolateX$1(maxV,bl,br),
leftbottom=interpolateX$1(maxV,bl,tl),
topleft=1-interpolateX$1(maxV,tr,tl),
topright=1-interpolateX$1(minV,tr,tl)),

edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeRB[cval]),
edges.push(isoBandEdgeBL[cval])):
139==cval?(
4==flipped?(
righttop=interpolateX$1(maxV,br,tr),
rightbottom=interpolateX$1(minV,br,tr),
bottomleft=1-interpolateX$1(minV,br,bl),
leftbottom=1-interpolateX$1(minV,tl,bl),
topleft=interpolateX$1(minV,tl,tr),
topright=interpolateX$1(maxV,tl,tr)):(

righttop=1-interpolateX$1(minV,tr,br),
rightbottom=1-interpolateX$1(maxV,tr,br),
bottomleft=interpolateX$1(maxV,bl,br),
leftbottom=interpolateX$1(maxV,bl,tl),
topleft=1-interpolateX$1(maxV,tr,tl),
topright=1-interpolateX$1(minV,tr,tl)),

edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeRB[cval]),
edges.push(isoBandEdgeLB[cval])):
98==cval?(
0==flipped?(
righttop=1-interpolateX$1(minV,tr,br),
rightbottom=1-interpolateX$1(maxV,tr,br),
bottomright=interpolateX$1(maxV,bl,br),
bottomleft=interpolateX$1(minV,bl,br),
lefttop=interpolateX$1(minV,bl,tl),
topleft=1-interpolateX$1(minV,tr,tl)):(

righttop=interpolateX$1(maxV,br,tr),
rightbottom=interpolateX$1(minV,br,tr),
bottomright=1-interpolateX$1(minV,br,bl),
bottomleft=1-interpolateX$1(maxV,br,bl),
lefttop=1-interpolateX$1(maxV,tl,bl),
topleft=interpolateX$1(maxV,tl,tr)),

edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeRB[cval]),
edges.push(isoBandEdgeLT[cval])):
99==cval?(
4==flipped?(
righttop=1-interpolateX$1(minV,tr,br),
rightbottom=1-interpolateX$1(maxV,tr,br),
bottomright=interpolateX$1(maxV,bl,br),
bottomleft=interpolateX$1(minV,bl,br),
lefttop=interpolateX$1(minV,bl,tl),
topleft=1-interpolateX$1(minV,tr,tl)):(

righttop=interpolateX$1(maxV,br,tr),
rightbottom=interpolateX$1(minV,br,tr),
bottomright=1-interpolateX$1(minV,br,bl),
bottomleft=1-interpolateX$1(maxV,br,bl),
lefttop=1-interpolateX$1(maxV,tl,bl),
topleft=interpolateX$1(maxV,tl,tr)),

edges.push(isoBandEdgeRT[cval]),
edges.push(isoBandEdgeRB[cval]),
edges.push(isoBandEdgeBL[cval])):
38==cval?(
0==flipped?(
rightbottom=1-interpolateX$1(minV,tr,br),
bottomright=interpolateX$1(minV,bl,br),
leftbottom=interpolateX$1(minV,bl,tl),
lefttop=interpolateX$1(maxV,bl,tl),
topleft=1-interpolateX$1(maxV,tr,tl),
topright=1-interpolateX$1(minV,tr,tl)):(

rightbottom=interpolateX$1(maxV,br,tr),
bottomright=1-interpolateX$1(maxV,br,bl),
leftbottom=1-interpolateX$1(maxV,tl,bl),
lefttop=1-interpolateX$1(minV,tl,bl),
topleft=interpolateX$1(minV,tl,tr),
topright=interpolateX$1(maxV,tl,tr)),

edges.push(isoBandEdgeRB[cval]),
edges.push(isoBandEdgeLB[cval]),
edges.push(isoBandEdgeLT[cval])):
39==cval?(
4==flipped?(
rightbottom=1-interpolateX$1(minV,tr,br),
bottomright=interpolateX$1(minV,bl,br),
leftbottom=interpolateX$1(minV,bl,tl),
lefttop=interpolateX$1(maxV,bl,tl),
topleft=1-interpolateX$1(maxV,tr,tl),
topright=1-interpolateX$1(minV,tr,tl)):(

rightbottom=interpolateX$1(maxV,br,tr),
bottomright=1-interpolateX$1(maxV,br,bl),
leftbottom=1-interpolateX$1(maxV,tl,bl),
lefttop=1-interpolateX$1(minV,tl,bl),
topleft=interpolateX$1(minV,tl,tr),
topright=interpolateX$1(maxV,tl,tr)),

edges.push(isoBandEdgeRB[cval]),
edges.push(isoBandEdgeBR[cval]),
edges.push(isoBandEdgeLT[cval])):
85==cval&&(
righttop=1,
rightbottom=0,
bottomright=1,
bottomleft=0,
leftbottom=0,
lefttop=1,
topleft=0,
topright=1),(


0>topleft||1<topleft||0>topright||1<topright||0>righttop||1<righttop||0>bottomright||1<bottomright||0>leftbottom||1<leftbottom||0>lefttop||1<lefttop)&&
console.log("MarchingSquaresJS-isoBands: "+cval+" "+cval_real+" "+tl+","+tr+","+br+","+bl+" "+flipped+" "+topleft+" "+topright+" "+righttop+" "+rightbottom+" "+bottomright+" "+bottomleft+" "+leftbottom+" "+lefttop),


BandGrid.cells[j][i]={
cval:cval,
cval_real:cval_real,
flipped:flipped,
topleft:topleft,
topright:topright,
righttop:righttop,
rightbottom:rightbottom,
bottomright:bottomright,
bottomleft:bottomleft,
leftbottom:leftbottom,
lefttop:lefttop,
edges:edges};

}}
}
}

return BandGrid;
}

function BandGrid2AreaPaths(grid){





for(var areas=[],rows=grid.rows,cols=grid.cols,currentPolygon=[],j=0;j<rows;j++)
for(var i=0;i<cols;i++)
if("undefined"!=typeof grid.cells[j][i]&&0<grid.cells[j][i].edges.length){


var cell=grid.cells[j][i],



prev=getStartXY(cell),
next=null,
p=i,
q=j;

null!==prev&&
currentPolygon.push([prev.p[0]+p,prev.p[1]+q]);




do{






if(next=getExitXY(grid.cells[q][p],prev.x,prev.y,prev.o),null!==next)

currentPolygon.push([next.p[0]+p,next.p[1]+q]),
p+=next.x,
q+=next.y,
prev=next;else


break;



if(0>q||q>=rows||0>p||p>=cols||"undefined"==typeof grid.cells[q][p]){






p-=next.x,
q-=next.y;



var missing=traceOutOfGridPath(grid,p,q,next.x,next.y,next.o);
if(null!==missing)
missing.path.forEach(function(pp){

currentPolygon.push(pp);
}),
p=missing.i,
q=missing.j,
prev=missing;else

break;


}
}while("undefined"!=typeof grid.cells[q][p]&&
0<grid.cells[q][p].edges.length);

areas.push(currentPolygon),


currentPolygon=[],
0<grid.cells[j][i].edges.length&&
i--;
}


return areas;
}

function traceOutOfGridPath(grid,i,j,d_x,d_y,d_o){for(
var cell=grid.cells[j][i],
cval=cell.cval_real,
p=i+d_x,
q=j+d_y,
path=[],
closed=!1;

!closed;){

if("undefined"==typeof grid.cells[q]||"undefined"==typeof grid.cells[q][p]){










if(q-=d_y,p-=d_x,cell=grid.cells[q][p],cval=cell.cval_real,-1===d_y){
if(0===d_o){
if(cval&Node3)
path.push([p,q]),
d_x=-1,
d_y=0,
d_o=0;else
if(cval&Node2)
path.push([p+1,q]),
d_x=1,
d_y=0,
d_o=0;else
{
path.push([p+cell.bottomright,q]),
d_x=0,
d_y=1,
d_o=1,
closed=!0;
break;
}}else
if(cval&Node3)
path.push([p,q]),
d_x=-1,
d_y=0,
d_o=0;else
if(cval&Node2){
path.push([p+cell.bottomright,q]),
d_x=0,
d_y=1,
d_o=1,
closed=!0;
break;
}else{
path.push([p+cell.bottomleft,q]),
d_x=0,
d_y=1,
d_o=0,
closed=!0;
break;
}}else
if(1===d_y){

if(0!==d_o)





















cval&Node1?(
path.push([p+1,q+1]),
d_x=1,
d_y=0,
d_o=1):(

path.push([p+1,q+1]),
d_x=1,
d_y=0,
d_o=1);else if(cval&Node1)path.push([p+1,q+1]),d_x=1,d_y=0,d_o=1;else if(!(cval&Node0)){path.push([p+cell.topright,q+1]),d_x=0,d_y=-1,d_o=1,closed=!0;break}else{path.push([p+cell.topleft,q+1]),d_x=0,d_y=-1,d_o=0,closed=!0;break}}else



if(-1===d_x){

if(0===d_o){

if(cval&Node0)
path.push([p,q+1]),
d_x=0,
d_y=1,
d_o=0;else

if(!(cval&Node3)){

path.push([p,q+cell.lefttop]),
d_x=1,
d_y=0,
d_o=1,
closed=!0;
break;
}else{

path.push([p,q+cell.leftbottom]),
d_x=1,
d_y=0,
d_o=0,
closed=!0;
break;
}}else


if(cval&Node0)
path.push([p,q+1]),
d_x=0,
d_y=1,
d_o=0;else

{
console.log("MarchingSquaresJS-isoBands: wtf");
break;
}}else

if(1!==d_x)




































{
console.log("MarchingSquaresJS-isoBands: we came from nowhere!");
break;
}else if(0===d_o){if(cval&Node2)path.push([p+1,q]),d_x=0,d_y=-1,d_o=1;else{path.push([p+1,q+cell.rightbottom]),d_x=-1,d_y=0,d_o=0,closed=!0;break}}else if(cval&Node2)path.push([p+1,q]),d_x=0,d_y=-1,d_o=1;else if(!(cval&Node1)){path.push([p+1,q+cell.rightbottom]),d_x=-1,d_y=0,d_o=0,closed=!0;break}else{path.push([p+1,q+cell.righttop]),d_x=-1,d_y=0,d_o=1;break}}else






if(cell=grid.cells[q][p],cval=cell.cval_real,-1===d_x){
if(0===d_o){

if("undefined"!=typeof grid.cells[q-1]&&"undefined"!=typeof grid.cells[q-1][p])
d_x=0,
d_y=-1,
d_o=1;else
if(cval&Node3)

path.push([p,q]);else
{
path.push([p+cell.bottomright,q]),
d_x=0,
d_y=1,
d_o=1,
closed=!0;

break;
}}else
if(cval&Node0)
console.log("MarchingSquaresJS-isoBands: proceeding in x-direction!");else
{
console.log("MarchingSquaresJS-isoBands: found entry from top at "+p+","+q);
break;
}}else
if(1===d_x){
if(0===d_o){
console.log("MarchingSquaresJS-isoBands: wtf");
break;
}else

if("undefined"!=typeof grid.cells[q+1]&&"undefined"!=typeof grid.cells[q+1][p])
d_x=0,
d_y=1,
d_o=0;else
if(cval&Node1)
path.push([p+1,q+1]),
d_x=1,
d_y=0,
d_o=1;else
{
path.push([p+cell.topleft,q+1]),
d_x=0,
d_y=-1,
d_o=0,
closed=!0;

break;
}}else

if(-1===d_y){
if(1!==d_o)



















{
console.log("MarchingSquaresJS-isoBands: wtf");
break;
}else if("undefined"!=typeof grid.cells[q][p+1])d_x=1,d_y=0,d_o=1;else if(cval&Node2)path.push([p+1,q]),d_x=0,d_y=-1,d_o=1;else{path.push([p+1,q+cell.righttop]),d_x=-1,d_y=0,d_o=1,closed=!0;break}}else
if(1!==d_y)


























{
console.log("MarchingSquaresJS-isoBands: where did we came from???");
break;
}else if(0!==d_o){console.log("MarchingSquaresJS-isoBands: wtf");break}else if("undefined"!=typeof grid.cells[q][p-1])d_x=-1,d_y=0,d_o=0;else if(cval&Node0)path.push([p,q+1]),d_x=0,d_y=1,d_o=0;else{path.push([p,q+cell.leftbottom]),d_x=1,d_y=0,d_o=0,closed=!0;break}







if(p+=d_x,q+=d_y,p===i&&q===j)
break;


}


return{path:path,i:p,j:q,x:d_x,y:d_y,o:d_o};
}

function deleteEdge(cell,edgeIdx){
delete cell.edges[edgeIdx];
for(var k=edgeIdx+1;k<cell.edges.length;k++)
cell.edges[k-1]=cell.edges[k];

cell.edges.pop();
}

function getStartXY(cell){

if(0<cell.edges.length){
var e=cell.edges[cell.edges.length-1],

cval=cell.cval_real;
switch(e){
case 0:return cval&Node1?
{p:[1,cell.righttop],x:-1,y:0,o:1}:

{p:[cell.topleft,1],x:0,y:-1,o:0};

case 1:return cval&Node2?
{p:[cell.topleft,1],x:0,y:-1,o:0}:

{p:[1,cell.rightbottom],x:-1,y:0,o:0};

case 2:return cval&Node2?
{p:[cell.bottomright,0],x:0,y:1,o:1}:

{p:[cell.topleft,1],x:0,y:-1,o:0};

case 3:return cval&Node3?
{p:[cell.topleft,1],x:0,y:-1,o:0}:

{p:[cell.bottomleft,0],x:0,y:1,o:0};

case 4:return cval&Node1?
{p:[1,cell.righttop],x:-1,y:0,o:1}:

{p:[cell.topright,1],x:0,y:-1,o:1};

case 5:return cval&Node2?
{p:[cell.topright,1],x:0,y:-1,o:1}:

{p:[1,cell.rightbottom],x:-1,y:0,o:0};

case 6:return cval&Node2?
{p:[cell.bottomright,0],x:0,y:1,o:1}:

{p:[cell.topright,1],x:0,y:-1,o:1};

case 7:return cval&Node3?
{p:[cell.topright,1],x:0,y:-1,o:1}:

{p:[cell.bottomleft,0],x:0,y:1,o:0};

case 8:return cval&Node2?
{p:[cell.bottomright,0],x:0,y:1,o:1}:

{p:[1,cell.righttop],x:-1,y:0,o:1};

case 9:return cval&Node3?
{p:[1,cell.righttop],x:-1,y:0,o:1}:

{p:[cell.bottomleft,0],x:0,y:1,o:0};

case 10:return cval&Node3?
{p:[0,cell.leftbottom],x:1,y:0,o:0}:

{p:[1,cell.righttop],x:-1,y:0,o:1};

case 11:return cval&Node0?
{p:[1,cell.righttop],x:-1,y:0,o:1}:

{p:[0,cell.lefttop],x:1,y:0,o:1};

case 12:return cval&Node2?
{p:[cell.bottomright,0],x:0,y:1,o:1}:

{p:[1,cell.rightbottom],x:-1,y:0,o:0};

case 13:return cval&Node3?
{p:[1,cell.rightbottom],x:-1,y:0,o:0}:

{p:[cell.bottomleft,0],x:0,y:1,o:0};

case 14:return cval&Node3?
{p:[0,cell.leftbottom],x:1,y:0,o:0}:

{p:[1,cell.rightbottom],x:-1,y:0,o:0};

case 15:return cval&Node0?
{p:[1,cell.rightbottom],x:-1,y:0,o:0}:

{p:[0,cell.lefttop],x:1,y:0,o:1};

case 16:return cval&Node2?
{p:[cell.bottomright,0],x:0,y:1,o:1}:

{p:[0,cell.leftbottom],x:1,y:0,o:0};

case 17:return cval&Node0?
{p:[cell.bottomright,0],x:0,y:1,o:1}:

{p:[0,cell.lefttop],x:1,y:0,o:1};

case 18:return cval&Node3?
{p:[0,cell.leftbottom],x:1,y:0,o:0}:

{p:[cell.bottomleft,0],x:0,y:1,o:0};

case 19:return cval&Node0?
{p:[cell.bottomleft,0],x:0,y:1,o:0}:

{p:[0,cell.lefttop],x:1,y:0,o:1};

case 20:return cval&Node0?
{p:[cell.topleft,1],x:0,y:-1,o:0}:

{p:[0,cell.leftbottom],x:1,y:0,o:0};

case 21:return cval&Node1?
{p:[0,cell.leftbottom],x:1,y:0,o:0}:

{p:[cell.topright,1],x:0,y:-1,o:1};

case 22:return cval&Node0?
{p:[cell.topleft,1],x:0,y:-1,o:0}:

{p:[0,cell.lefttop],x:1,y:0,o:1};

case 23:return cval&Node1?
{p:[0,cell.lefttop],x:1,y:0,o:1}:

{p:[cell.topright,1],x:0,y:-1,o:1};

default:console.log("MarchingSquaresJS-isoBands: edge index out of range!"),
console.log(cell);}


}

return null;
}

function getExitXY(cell,x,y,o){

var cval=cell.cval,e,id_x,d_x,d_y,
d_o;

switch(x){
case-1:
0===o?(e=isoBandEdgeRB[cval],
d_x=isoBandNextXRB[cval],
d_y=isoBandNextYRB[cval],
d_o=isoBandNextORB[cval]):(

e=isoBandEdgeRT[cval],
d_x=isoBandNextXRT[cval],
d_y=isoBandNextYRT[cval],
d_o=isoBandNextORT[cval]);


break;
case 1:
0===o?(e=isoBandEdgeLB[cval],
d_x=isoBandNextXLB[cval],
d_y=isoBandNextYLB[cval],
d_o=isoBandNextOLB[cval]):(

e=isoBandEdgeLT[cval],
d_x=isoBandNextXLT[cval],
d_y=isoBandNextYLT[cval],
d_o=isoBandNextOLT[cval]);


break;
default:switch(y){
case-1:
0===o?(e=isoBandEdgeTL[cval],
d_x=isoBandNextXTL[cval],
d_y=isoBandNextYTL[cval],
d_o=isoBandNextOTL[cval]):(

e=isoBandEdgeTR[cval],
d_x=isoBandNextXTR[cval],
d_y=isoBandNextYTR[cval],
d_o=isoBandNextOTR[cval]);


break;
case 1:
0===o?(e=isoBandEdgeBL[cval],
d_x=isoBandNextXBL[cval],
d_y=isoBandNextYBL[cval],
d_o=isoBandNextOBL[cval]):(

e=isoBandEdgeBR[cval],
d_x=isoBandNextXBR[cval],
d_y=isoBandNextYBR[cval],
d_o=isoBandNextOBR[cval]);


break;
default:}}





if(id_x=cell.edges.indexOf(e),"undefined"!=typeof cell.edges[id_x])
deleteEdge(cell,id_x);else




return null;




switch(cval=cell.cval_real,e){
case 0:cval&Node1?(
x=cell.topleft,
y=1):(

x=1,
y=cell.righttop);

break;
case 1:cval&Node2?(
x=1,
y=cell.rightbottom):(

x=cell.topleft,
y=1);

break;
case 2:cval&Node2?(
x=cell.topleft,
y=1):(

x=cell.bottomright,
y=0);

break;
case 3:cval&Node3?(
x=cell.bottomleft,
y=0):(

x=cell.topleft,
y=1);

break;
case 4:cval&Node1?(
x=cell.topright,
y=1):(

x=1,
y=cell.righttop);

break;
case 5:cval&Node2?(
x=1,
y=cell.rightbottom):(

x=cell.topright,
y=1);

break;
case 6:cval&Node2?(
x=cell.topright,
y=1):(

x=cell.bottomright,
y=0);

break;
case 7:cval&Node3?(
x=cell.bottomleft,
y=0):(

x=cell.topright,
y=1);

break;
case 8:cval&Node2?(
x=1,
y=cell.righttop):(

x=cell.bottomright,
y=0);

break;
case 9:cval&Node3?(
x=cell.bottomleft,
y=0):(

x=1,
y=cell.righttop);

break;
case 10:cval&Node3?(
x=1,
y=cell.righttop):(

x=0,
y=cell.leftbottom);

break;
case 11:cval&Node0?(
x=0,
y=cell.lefttop):(

x=1,
y=cell.righttop);

break;
case 12:cval&Node2?(
x=1,
y=cell.rightbottom):(

x=cell.bottomright,
y=0);

break;
case 13:cval&Node3?(
x=cell.bottomleft,
y=0):(

x=1,
y=cell.rightbottom);

break;
case 14:cval&Node3?(
x=1,
y=cell.rightbottom):(

x=0,
y=cell.leftbottom);

break;
case 15:cval&Node0?(
x=0,
y=cell.lefttop):(

x=1,
y=cell.rightbottom);

break;
case 16:cval&Node2?(
x=0,
y=cell.leftbottom):(

x=cell.bottomright,
y=0);

break;
case 17:cval&Node0?(
x=0,
y=cell.lefttop):(

x=cell.bottomright,
y=0);

break;
case 18:cval&Node3?(
x=cell.bottomleft,
y=0):(

x=0,
y=cell.leftbottom);

break;
case 19:cval&Node0?(
x=0,
y=cell.lefttop):(

x=cell.bottomleft,
y=0);

break;
case 20:cval&Node0?(
x=0,
y=cell.leftbottom):(

x=cell.topleft,
y=1);

break;
case 21:cval&Node1?(
x=cell.topright,
y=1):(

x=0,
y=cell.leftbottom);

break;
case 22:cval&Node0?(
x=0,
y=cell.lefttop):(

x=cell.topleft,
y=1);

break;
case 23:cval&Node1?(
x=cell.topright,
y=1):(

x=0,
y=cell.lefttop);

break;
default:

return console.log("MarchingSquaresJS-isoBands: edge index out of range!"),console.log(cell),null;}









return("undefined"==typeof x||"undefined"==typeof y||"undefined"==typeof d_x||"undefined"==typeof d_y||"undefined"==typeof d_o)&&(console.log("MarchingSquaresJS-isoBands: undefined value!"),console.log(cell),console.log(x+" "+y+" "+d_x+" "+d_y+" "+d_o)),{p:[x,y],x:d_x,y:d_y,o:d_o};
}

function BandGrid2Areas(grid){
var areas=[],
area_idx=0;
































return grid.cells.forEach(function(g,j){g.forEach(function(gg,i){if("undefined"!=typeof gg){var a=polygon_table[gg.cval](gg);"object"==typeof a&&isArray(a)?"object"==typeof a[0]&&isArray(a[0])?"object"==typeof a[0][0]&&isArray(a[0][0])?a.forEach(function(aa){aa.forEach(function(aaa){aaa[0]+=i,aaa[1]+=j}),areas[area_idx++]=aa}):(a.forEach(function(aa){aa[0]+=i,aa[1]+=j}),areas[area_idx++]=a):console.log("MarchingSquaresJS-isoBands: bandcell polygon with malformed coordinates"):console.log("MarchingSquaresJS-isoBands: bandcell polygon with null coordinates")}})}),areas;
}














function isobands(pointGrid,breaks,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var zProperty=options.zProperty||"elevation",
commonProperties=options.commonProperties||{},
breaksProperties=options.breaksProperties||[];



if(collectionOf(pointGrid,"Point","Input must contain Points"),!breaks)throw new Error("breaks is required");
if(!Array.isArray(breaks))throw new Error("breaks is not an Array");
if(!isObject(commonProperties))throw new Error("commonProperties is not an Object");
if(!Array.isArray(breaksProperties))throw new Error("breaksProperties is not an Array");


var matrix=gridToMatrix$1(pointGrid,{zProperty:zProperty,flip:!0}),
contours=createContourLines(matrix,breaks,zProperty);
contours=rescaleContours(contours,matrix,pointGrid);

var multipolygons=contours.map(function(contour,index){
if(breaksProperties[index]&&!isObject(breaksProperties[index]))
throw new Error("Each mappedProperty is required to be an Object");


var contourProperties=Object.assign({},

commonProperties,
breaksProperties[index]);

contourProperties[zProperty]=contour[zProperty];
var multiP=multiPolygon(contour.groupedRings,contourProperties);
return multiP;
});

return featureCollection(multipolygons);
}














function createContourLines(matrix,breaks,property){


for(var contours=[],i=1;i<breaks.length;i++){
var lowerBand=+breaks[i-1],
upperBand=+breaks[i],

isobandsCoords=isoBands(matrix,lowerBand,upperBand-lowerBand),




nestedRings=orderByArea(isobandsCoords),
groupedRings=groupNestedRings(nestedRings),
obj={};
obj.groupedRings=groupedRings,
obj[property]=lowerBand+"-"+upperBand,
contours.push(obj);
}
return contours;
}










function rescaleContours(contours,matrix,points$$1){


var gridBbox=bbox(points$$1),
originalWidth=gridBbox[2]-gridBbox[0],
originalHeigth=gridBbox[3]-gridBbox[1],


x0=gridBbox[0],
y0=gridBbox[1],

matrixWidth=matrix[0].length-1,
matrixHeight=matrix.length-1,

scaleX=originalWidth/matrixWidth,
scaleY=originalHeigth/matrixHeight,

resize=function(point$$1){
point$$1[0]=point$$1[0]*scaleX+x0,
point$$1[1]=point$$1[1]*scaleY+y0;
};









return contours.forEach(function(contour){contour.groupedRings.forEach(function(lineRingSet){lineRingSet.forEach(function(lineRing){lineRing.forEach(resize)})})}),contours;
}












function orderByArea(ringsCoords){
var ringsWithArea=[],
areas=[];
ringsCoords.forEach(function(coords){

var ringArea=area$1(polygon([coords]));

areas.push(ringArea),

ringsWithArea.push({ring:coords,area:ringArea});
}),
areas.sort(function(a,b){
return b-a;
});

var orderedByArea=[];









return areas.forEach(function(area$$1){for(var lr=0;lr<ringsWithArea.length;lr++)if(ringsWithArea[lr].area===area$$1){orderedByArea.push(ringsWithArea[lr].ring),ringsWithArea.splice(lr,1);break}}),orderedByArea;
}










function groupNestedRings(orderedLinearRings){for(

var lrList=orderedLinearRings.map(function(lr){
return{lrCoordinates:lr,grouped:!1};
}),
groupedLinearRingsCoords=[];
!allGrouped(lrList);)
for(var i=0;i<lrList.length;i++)
if(!lrList[i].grouped){

var group=[];
group.push(lrList[i].lrCoordinates),
lrList[i].grouped=!0;


for(var outerMostPoly=polygon([lrList[i].lrCoordinates]),j=i+1;j<lrList.length;j++)
if(!lrList[j].grouped){
var lrPoly=polygon([lrList[j].lrCoordinates]);
isInside(lrPoly,outerMostPoly)&&(
group.push(lrList[j].lrCoordinates),
lrList[j].grouped=!0);

}


groupedLinearRingsCoords.push(group);
}


return groupedLinearRingsCoords;
}







function isInside(testPolygon,targetPolygon){

for(var points$$1=explode(testPolygon),i=0;i<points$$1.features.length;i++)
if(!booleanPointInPolygon(points$$1.features[i],targetPolygon))
return!1;


return!0;
}






function allGrouped(list){
for(var i=0;i<list.length;i++)
if(!1===list[i].grouped)
return!1;


return!0;
}





















function transformRotate(geojson,angle,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var pivot=options.pivot,
mutate=options.mutate;


if(!geojson)throw new Error("geojson is required");
if(void 0===angle||null===angle||isNaN(angle))throw new Error("angle is required");return(


0===angle?geojson:(


pivot||(pivot=centroid(geojson)),(


!1===mutate||void 0===mutate)&&(geojson=clone(geojson)),


coordEach(geojson,function(pointCoords){
var initialAngle=rhumbBearing(pivot,pointCoords),
finalAngle=initialAngle+angle,
distance=rhumbDistance(pivot,pointCoords),
newCoords=getCoords(rhumbDestination(pivot,distance,finalAngle));
pointCoords[0]=newCoords[0],
pointCoords[1]=newCoords[1];
}),
geojson));
}




















function transformScale(geojson,factor,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var origin=options.origin,
mutate=options.mutate;


if(!geojson)throw new Error("geojson required");
if("number"!=typeof factor||0===factor)throw new Error("invalid factor");
var originIsPoint=Array.isArray(origin)||"object"==typeof origin;return(


!0!==mutate&&(geojson=clone(geojson)),


"FeatureCollection"!==geojson.type||originIsPoint?






scale(geojson,factor,origin):(featureEach(geojson,function(feature$$1,index){geojson.features[index]=scale(feature$$1,factor,origin)}),geojson));
}










function scale(feature$$1,factor,origin){

var isPoint="Point"===getType(feature$$1);return(
origin=defineOrigin(feature$$1,origin),


1===factor||isPoint)?feature$$1:(


coordEach(feature$$1,function(coord){
var originalDistance=rhumbDistance(origin,coord),
bearing=rhumbBearing(origin,coord),
newDistance=originalDistance*factor,
newCoord=getCoords(rhumbDestination(origin,newDistance,bearing));
coord[0]=newCoord[0],
coord[1]=newCoord[1],
3===coord.length&&(coord[2]*=factor);
}),

feature$$1);
}









function defineOrigin(geojson,origin){




if((void 0===origin||null===origin)&&(origin="centroid"),Array.isArray(origin)||"object"==typeof origin)return getCoord(origin);


var bbox$$1=geojson.bbox?geojson.bbox:bbox(geojson),
west=bbox$$1[0],
south=bbox$$1[1],
east=bbox$$1[2],
north=bbox$$1[3];

switch(origin){
case"sw":
case"southwest":
case"westsouth":
case"bottomleft":
return point([west,south]);
case"se":
case"southeast":
case"eastsouth":
case"bottomright":
return point([east,south]);
case"nw":
case"northwest":
case"westnorth":
case"topleft":
return point([west,north]);
case"ne":
case"northeast":
case"eastnorth":
case"topright":
return point([east,north]);
case"center":
return center(geojson);
case void 0:
case null:
case"centroid":
return centroid(geojson);
default:
throw new Error("invalid origin");}

}






















function transformTranslate(geojson,distance,direction,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var units=options.units,
zTranslation=options.zTranslation,
mutate=options.mutate;


if(!geojson)throw new Error("geojson is required");
if(void 0===distance||null===distance||isNaN(distance))throw new Error("distance is required");
if(zTranslation&&"number"!=typeof zTranslation&&isNaN(zTranslation))throw new Error("zTranslation is not a number");



if(zTranslation=void 0===zTranslation?0:zTranslation,0===distance&&0===zTranslation)return geojson;

if(void 0===direction||null===direction||isNaN(direction))throw new Error("direction is required");

















return 0>distance&&(distance=-distance,direction=-direction),(!1===mutate||void 0===mutate)&&(geojson=clone(geojson)),coordEach(geojson,function(pointCoords){var newCoords=getCoords(rhumbDestination(pointCoords,distance,direction,{units:units}));pointCoords[0]=newCoords[0],pointCoords[1]=newCoords[1],zTranslation&&3===pointCoords.length&&(pointCoords[2]+=zTranslation)}),geojson;
}














function ab(segment){
var start=segment[0],
end=segment[1];
return[end[0]-start[0],end[1]-start[1]];
}









function crossProduct(v1,v2){
return v1[0]*v2[1]-v2[0]*v1[1];
}









function add(v1,v2){
return[v1[0]+v2[0],v1[1]+v2[1]];
}









function sub(v1,v2){
return[v1[0]-v2[0],v1[1]-v2[1]];
}









function scalarMult(s,v){
return[s*v[0],s*v[1]];
}









function intersectSegments(a,b){
var p=a[0],
r=ab(a),
q=b[0],
s=ab(b),

cross=crossProduct(r,s),
qmp=sub(q,p),
numerator=crossProduct(qmp,s),
t=numerator/cross,
intersection=add(p,scalarMult(t,r));
return intersection;
}









function isParallel(a,b){
var r=ab(a),
s=ab(b);
return 0===crossProduct(r,s);
}









function intersection(a,b){return!
isParallel(a,b)&&
intersectSegments(a,b);
}



















function lineOffset(geojson,distance,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var units=options.units;


if(!geojson)throw new Error("geojson is required");
if(void 0===distance||null===distance||isNaN(distance))throw new Error("distance is required");

var type=getType(geojson),
properties=geojson.properties;

switch(type){
case"LineString":
return lineOffsetFeature(geojson,distance,units);
case"MultiLineString":
var coords=[];



return flattenEach(geojson,function(feature$$1){coords.push(lineOffsetFeature(feature$$1,distance,units).geometry.coordinates)}),multiLineString(coords,properties);
default:
throw new Error("geometry "+type+" is not supported");}

}










function lineOffsetFeature(line,distance,units){
var segments=[],
offsetDegrees=lengthToDegrees(distance,units),
coords=getCoords(line),
finalCoords=[];



























return coords.forEach(function(currentCoords,index){if(index!==coords.length-1){var segment=processSegment(currentCoords,coords[index+1],offsetDegrees);if(segments.push(segment),0<index){var seg2Coords=segments[index-1],intersects=intersection(segment,seg2Coords);!1!==intersects&&(seg2Coords[1]=intersects,segment[0]=intersects),finalCoords.push(seg2Coords[0]),index===coords.length-2&&(finalCoords.push(segment[0]),finalCoords.push(segment[1]))}2===coords.length&&(finalCoords.push(segment[0]),finalCoords.push(segment[1]))}}),lineString(finalCoords,line.properties);
}











function processSegment(point1,point2,offset){
var L=_Mathsqrt((point1[0]-point2[0])*(point1[0]-point2[0])+(point1[1]-point2[1])*(point1[1]-point2[1])),

out1x=point1[0]+offset*(point2[1]-point1[1])/L,
out2x=point2[0]+offset*(point2[1]-point1[1])/L,
out1y=point1[1]+offset*(point1[0]-point2[0])/L,
out2y=point2[1]+offset*(point1[0]-point2[0])/L;
return[[out1x,out1y],[out2x,out2y]];
}















function orientationIndex(p1,p2,q){
var dx1=p2[0]-p1[0],
dy1=p2[1]-p1[1],
dx2=q[0]-p2[0],
dy2=q[1]-p2[1];

return _Mathsign(dx1*dy2-dx2*dy1);
}










function envelopeIsEqual(env1,env2){
var envX1=env1.geometry.coordinates.map(function(c){return c[0]}),
envY1=env1.geometry.coordinates.map(function(c){return c[1]}),
envX2=env2.geometry.coordinates.map(function(c){return c[0]}),
envY2=env2.geometry.coordinates.map(function(c){return c[1]});

return _Mathmax(null,envX1)===_Mathmax(null,envX2)&&
_Mathmax(null,envY1)===_Mathmax(null,envY2)&&
_Mathmin(null,envX1)===_Mathmin(null,envX2)&&
_Mathmin(null,envY1)===_Mathmin(null,envY2);
}












function envelopeContains(self,env){
return env.geometry.coordinates[0].every(function(c){return booleanPointInPolygon(point(c),self)});
}








function coordinatesEqual(coord1,coord2){
return coord1[0]===coord2[0]&&coord1[1]===coord2[1];
}




































































































































































































































































































































































































function validateGeoJson(geoJson){
if(!geoJson)
throw new Error("No geojson passed");

if("FeatureCollection"!==geoJson.type&&
"GeometryCollection"!==geoJson.type&&
"MultiLineString"!==geoJson.type&&
"LineString"!==geoJson.type&&
"Feature"!==geoJson.type)

throw new Error("Invalid input type '"+geoJson.type+"'. Geojson must be FeatureCollection, GeometryCollection, LineString, MultiLineString or Feature");
}
























































































































































































































































































































































function polygonize$1(geoJson){
var graph=Graph.fromGeoJson(geoJson);


graph.deleteDangles(),


graph.deleteCutEdges();


var holes=[],
shells=[];

















return graph.getEdgeRings().filter(function(edgeRing){return edgeRing.isValid()}).forEach(function(edgeRing){edgeRing.isHole()?holes.push(edgeRing):shells.push(edgeRing)}),holes.forEach(function(hole){EdgeRing.findEdgeRingContaining(hole,shells)&&shells.push(hole)}),featureCollection(shells.map(function(shell){return shell.toPolygon()}));
}















function booleanDisjoint(feature1,feature2){
var boolean;






return flattenEach(feature1,function(flatten1){flattenEach(feature2,function(flatten2){return!1!==boolean&&void(boolean=disjoint(flatten1.geometry,flatten2.geometry))})}),boolean;
}









function disjoint(geom1,geom2){
switch(geom1.type){
case"Point":
switch(geom2.type){
case"Point":
return!compareCoords$1(geom1.coordinates,geom2.coordinates);
case"LineString":
return!isPointOnLine$1(geom2,geom1);
case"Polygon":
return!booleanPointInPolygon(geom1,geom2);}


break;
case"LineString":
switch(geom2.type){
case"Point":
return!isPointOnLine$1(geom1,geom2);
case"LineString":
return!isLineOnLine$1(geom1,geom2);
case"Polygon":
return!isLineInPoly$1(geom2,geom1);}


break;
case"Polygon":
switch(geom2.type){
case"Point":
return!booleanPointInPolygon(geom2,geom1);
case"LineString":
return!isLineInPoly$1(geom1,geom2);
case"Polygon":
return!isPolyInPoly$1(geom2,geom1);}}


}


function isPointOnLine$1(lineString,point){
for(var i=0;i<lineString.coordinates.length-1;i++)
if(isPointOnLineSegment$2(lineString.coordinates[i],lineString.coordinates[i+1],point.coordinates))
return!0;


return!1;
}

function isLineOnLine$1(lineString1,lineString2){
var doLinesIntersect=lineIntersect(lineString1,lineString2);return!!(
0<doLinesIntersect.features.length);



}

function isLineInPoly$1(polygon,lineString){
var doLinesIntersect=lineIntersect(lineString,polygonToLine(polygon));return!!(
0<doLinesIntersect.features.length);



}











function isPolyInPoly$1(feature1,feature2){
for(var i=0;i<feature1.coordinates[0].length;i++)
if(booleanPointInPolygon(feature1.coordinates[0][i],feature2))
return!0;


for(var i2=0;i2<feature2.coordinates[0].length;i2++)
if(booleanPointInPolygon(feature2.coordinates[0][i2],feature1))
return!0;


return!1;
}

function isPointOnLineSegment$2(LineSegmentStart,LineSegmentEnd,Point){
var dxc=Point[0]-LineSegmentStart[0],
dyc=Point[1]-LineSegmentStart[1],
dxl=LineSegmentEnd[0]-LineSegmentStart[0],
dyl=LineSegmentEnd[1]-LineSegmentStart[1],
cross=dxc*dyl-dyc*dxl;return!(
0!=cross)&&(


_Mathabs(dxl)>=_Mathabs(dyl)?
0<dxl?
LineSegmentStart[0]<=Point[0]&&Point[0]<=LineSegmentEnd[0]:

LineSegmentEnd[0]<=Point[0]&&Point[0]<=LineSegmentStart[0]:

0<dyl?
LineSegmentStart[1]<=Point[1]&&Point[1]<=LineSegmentEnd[1]:

LineSegmentEnd[1]<=Point[1]&&Point[1]<=LineSegmentStart[1]);

}









function compareCoords$1(pair1,pair2){
return pair1[0]===pair2[0]&&pair1[1]===pair2[1];
}


















function booleanContains(feature1,feature2){
var type1=getType(feature1),
type2=getType(feature2),
geom1=getGeom(feature1),
geom2=getGeom(feature2),
coords1=getCoords(feature1),
coords2=getCoords(feature2);

switch(type1){
case"Point":
switch(type2){
case"Point":
return compareCoords$2(coords1,coords2);
default:
throw new Error("feature2 "+type2+" geometry not supported");}

case"MultiPoint":
switch(type2){
case"Point":
return isPointInMultiPoint$1(geom1,geom2);
case"MultiPoint":
return isMultiPointInMultiPoint$1(geom1,geom2);
default:
throw new Error("feature2 "+type2+" geometry not supported");}

case"LineString":
switch(type2){
case"Point":
return booleanPointOnLine(geom2,geom1,{ignoreEndVertices:!0});
case"LineString":
return isLineOnLine$2(geom1,geom2);
case"MultiPoint":
return isMultiPointOnLine$1(geom1,geom2);
default:
throw new Error("feature2 "+type2+" geometry not supported");}

case"Polygon":
switch(type2){
case"Point":
return booleanPointInPolygon(geom2,geom1,{ignoreBoundary:!0});
case"LineString":
return isLineInPoly$2(geom1,geom2);
case"Polygon":
return isPolyInPoly$2(geom1,geom2);
case"MultiPoint":
return isMultiPointInPoly$1(geom1,geom2);
default:
throw new Error("feature2 "+type2+" geometry not supported");}

default:
throw new Error("feature1 "+type1+" geometry not supported");}

}

function isPointInMultiPoint$1(multiPoint,point){
var
output=!1,i;
for(i=0;i<multiPoint.coordinates.length;i++)
if(compareCoords$2(multiPoint.coordinates[i],point.coordinates)){
output=!0;
break;
}

return output;
}

function isMultiPointInMultiPoint$1(multiPoint1,multiPoint2){
for(var i=0,
matchFound;i<multiPoint2.coordinates.length;i++){matchFound=!1;
for(var i2=0;i2<multiPoint1.coordinates.length;i2++)
if(compareCoords$2(multiPoint2.coordinates[i],multiPoint1.coordinates[i2])){
matchFound=!0;
break;
}

if(!matchFound)
return!1;

}
return!0;
}


function isMultiPointOnLine$1(lineString,multiPoint){

for(var haveFoundInteriorPoint=!1,i=0;i<multiPoint.coordinates.length;i++)



if(booleanPointOnLine(multiPoint.coordinates[i],lineString,{ignoreEndVertices:!0})&&(haveFoundInteriorPoint=!0),!booleanPointOnLine(multiPoint.coordinates[i],lineString))
return!1;return!!


haveFoundInteriorPoint;



}

function isMultiPointInPoly$1(polygon,multiPoint){
for(var i=0;i<multiPoint.coordinates.length;i++)
if(!booleanPointInPolygon(multiPoint.coordinates[i],polygon,{ignoreBoundary:!0}))
return!1;


return!0;
}

function isLineOnLine$2(lineString1,lineString2){

for(var haveFoundInteriorPoint=!1,i=0;i<lineString2.coordinates.length;i++)



if(booleanPointOnLine({type:"Point",coordinates:lineString2.coordinates[i]},lineString1,{ignoreEndVertices:!0})&&(haveFoundInteriorPoint=!0),!booleanPointOnLine({type:"Point",coordinates:lineString2.coordinates[i]},lineString1,{ignoreEndVertices:!1}))
return!1;


return haveFoundInteriorPoint;
}

function isLineInPoly$2(polygon,linestring){
var output=!1,
i=0,

polyBbox=bbox(polygon),
lineBbox=bbox(linestring);
if(!doBBoxOverlap$1(polyBbox,lineBbox))
return!1;

for(i;i<linestring.coordinates.length-1;i++){
var midPoint=getMidpoint$1(linestring.coordinates[i],linestring.coordinates[i+1]);
if(booleanPointInPolygon({type:"Point",coordinates:midPoint},polygon,{ignoreBoundary:!0})){
output=!0;
break;
}
}
return output;
}










function isPolyInPoly$2(feature1,feature2){
var poly1Bbox=bbox(feature1),
poly2Bbox=bbox(feature2);
if(!doBBoxOverlap$1(poly1Bbox,poly2Bbox))
return!1;

for(var i=0;i<feature2.coordinates[0].length;i++)
if(!booleanPointInPolygon(feature2.coordinates[0][i],feature1))
return!1;


return!0;
}

function doBBoxOverlap$1(bbox1,bbox2){return!(
bbox1[0]>bbox2[0])&&!(
bbox1[2]<bbox2[2])&&!(
bbox1[1]>bbox2[1])&&!(
bbox1[3]<bbox2[3]);

}









function compareCoords$2(pair1,pair2){
return pair1[0]===pair2[0]&&pair1[1]===pair2[1];
}

function getMidpoint$1(pair1,pair2){
return[(pair1[0]+pair2[0])/2,(pair1[1]+pair2[1])/2];
}



















function booleanCrosses(feature1,feature2){
var type1=getType(feature1),
type2=getType(feature2),
geom1=getGeom(feature1),
geom2=getGeom(feature2);

switch(type1){
case"MultiPoint":
switch(type2){
case"LineString":
return doMultiPointAndLineStringCross(geom1,geom2);
case"Polygon":
return doesMultiPointCrossPoly(geom1,geom2);
default:
throw new Error("feature2 "+type2+" geometry not supported");}

case"LineString":
switch(type2){
case"MultiPoint":
return doMultiPointAndLineStringCross(geom2,geom1);
case"LineString":
return doLineStringsCross(geom1,geom2);
case"Polygon":
return doLineStringAndPolygonCross(geom1,geom2);
default:
throw new Error("feature2 "+type2+" geometry not supported");}

case"Polygon":
switch(type2){
case"MultiPoint":
return doesMultiPointCrossPoly(geom2,geom1);
case"LineString":
return doLineStringAndPolygonCross(geom2,geom1);
default:
throw new Error("feature2 "+type2+" geometry not supported");}

default:
throw new Error("feature1 "+type1+" geometry not supported");}

}

function doMultiPointAndLineStringCross(multiPoint$$1,lineString$$1){for(
var foundIntPoint=!1,
foundExtPoint=!1,
pointLength=multiPoint$$1.coordinates.length,
i=0;
i<pointLength&&!foundIntPoint&&!foundExtPoint;){
for(var i2=0,
incEndVertices;i2<lineString$$1.coordinates.length-1;i2++)incEndVertices=!0,(
0===i2||i2===lineString$$1.coordinates.length-2)&&(
incEndVertices=!1),

isPointOnLineSegment$3(lineString$$1.coordinates[i2],lineString$$1.coordinates[i2+1],multiPoint$$1.coordinates[i],incEndVertices)?
foundIntPoint=!0:

foundExtPoint=!0;


i++;
}
return foundIntPoint&&foundExtPoint;
}

function doLineStringsCross(lineString1,lineString2){
var doLinesIntersect=lineIntersect(lineString1,lineString2);
if(0<doLinesIntersect.features.length)
for(var i=0;i<lineString1.coordinates.length-1;i++)
for(var i2=0,
incEndVertices;i2<lineString2.coordinates.length-1;i2++)



if(incEndVertices=!0,(0===i2||i2===lineString2.coordinates.length-2)&&(incEndVertices=!1),isPointOnLineSegment$3(lineString1.coordinates[i],lineString1.coordinates[i+1],lineString2.coordinates[i2],incEndVertices))
return!0;




return!1;
}

function doLineStringAndPolygonCross(lineString$$1,polygon$$1){
var doLinesIntersect=lineIntersect(lineString$$1,polygonToLine(polygon$$1));return!!(
0<doLinesIntersect.features.length);



}

function doesMultiPointCrossPoly(multiPoint$$1,polygon$$1){for(
var foundIntPoint=!1,
foundExtPoint=!1,
pointLength=multiPoint$$1.coordinates[0].length,
i=0;
i<pointLength&&foundIntPoint&&foundExtPoint;)
booleanPointInPolygon(point(multiPoint$$1.coordinates[0][i]),polygon$$1)?
foundIntPoint=!0:

foundExtPoint=!0,

i++;


return foundExtPoint&&foundExtPoint;
}













function isPointOnLineSegment$3(lineSegmentStart,lineSegmentEnd,pt,incEnd){
var dxc=pt[0]-lineSegmentStart[0],
dyc=pt[1]-lineSegmentStart[1],
dxl=lineSegmentEnd[0]-lineSegmentStart[0],
dyl=lineSegmentEnd[1]-lineSegmentStart[1],
cross=dxc*dyl-dyc*dxl;return!(
0!=cross)&&(


incEnd?
_Mathabs(dxl)>=_Mathabs(dyl)?
0<dxl?lineSegmentStart[0]<=pt[0]&&pt[0]<=lineSegmentEnd[0]:lineSegmentEnd[0]<=pt[0]&&pt[0]<=lineSegmentStart[0]:

0<dyl?lineSegmentStart[1]<=pt[1]&&pt[1]<=lineSegmentEnd[1]:lineSegmentEnd[1]<=pt[1]&&pt[1]<=lineSegmentStart[1]:

_Mathabs(dxl)>=_Mathabs(dyl)?
0<dxl?lineSegmentStart[0]<pt[0]&&pt[0]<lineSegmentEnd[0]:lineSegmentEnd[0]<pt[0]&&pt[0]<lineSegmentStart[0]:

0<dyl?lineSegmentStart[1]<pt[1]&&pt[1]<lineSegmentEnd[1]:lineSegmentEnd[1]<pt[1]&&pt[1]<lineSegmentStart[1]);

}


















































































































































































function explode$2(g){
return g.coordinates.map(function(part){
return{
type:g.type.replace("Multi",""),
coordinates:part};
});
}

function sameLength(g1,g2){
return g1.hasOwnProperty("coordinates")?
g1.coordinates.length===g2.coordinates.length:
g1.length===g2.length;
}







































































































function objectComparator(obj1,obj2){
return deepEqual_1(obj1,obj2,{strict:!0});
}






















function booleanOverlap(feature1,feature2){

if(!feature1)throw new Error("feature1 is required");
if(!feature2)throw new Error("feature2 is required");
var type1=getType(feature1),
type2=getType(feature2);
if(type1!==type2)throw new Error("features must be of the same type");
if("Point"===type1)throw new Error("Point geometry not supported");


var equality=new geojsonEquality({precision:6});
if(equality.compare(feature1,feature2))return!1;

var overlap=0;

switch(type1){
case"MultiPoint":
var coords1=coordAll(feature1),
coords2=coordAll(feature2);
coords1.forEach(function(coord1){
coords2.forEach(function(coord2){
coord1[0]===coord2[0]&&coord1[1]===coord2[1]&&overlap++;
});
});
break;

case"LineString":
case"MultiLineString":
segmentEach(feature1,function(segment1){
segmentEach(feature2,function(segment2){
lineOverlap(segment1,segment2).features.length&&overlap++;
});
});
break;

case"Polygon":
case"MultiPolygon":
segmentEach(feature1,function(segment1){
segmentEach(feature2,function(segment2){
lineIntersect(segment1,segment2).features.length&&overlap++;
});
});}



return 0<overlap;
}



















function booleanEqual(feature1,feature2){

if(!feature1)throw new Error("feature1 is required");
if(!feature2)throw new Error("feature2 is required");
var type1=getType(feature1),
type2=getType(feature2);
if(type1!==type2)return!1;

var equality=new geojsonEquality({precision:6});
return equality.compare(cleanCoords(feature1),cleanCoords(feature2));
}




















































































































































































































































































































































































































































































































































































































































































































































































































































































































































































function clustersDbscan(points$$1,maxDistance,options){


if(options=options||{},"object"!=typeof options)throw new Error("options is invalid");
var minPoints=options.minPoints,
units=options.units;



if(collectionOf(points$$1,"Point","Input must contain Points"),null===maxDistance||void 0===maxDistance)throw new Error("maxDistance is required");
if(!(0<_Mathsign(maxDistance)))throw new Error("Invalid maxDistance");
if(!(void 0===minPoints||null===minPoints||0<_Mathsign(minPoints)))throw new Error("Invalid minPoints");


points$$1=clone(points$$1,!0),


minPoints=minPoints||3;


var dbscan=new lib.DBSCAN,
clusteredIds=dbscan.run(coordAll(points$$1),convertLength(maxDistance,units),minPoints,distance),


clusterId=-1;




















return clusteredIds.forEach(function(clusterIds){clusterId++,clusterIds.forEach(function(idx){var clusterPoint=points$$1.features[idx];clusterPoint.properties||(clusterPoint.properties={}),clusterPoint.properties.cluster=clusterId,clusterPoint.properties.dbscan="core"})}),dbscan.noise.forEach(function(noiseId){var noisePoint=points$$1.features[noiseId];noisePoint.properties||(noisePoint.properties={}),noisePoint.properties.dbscan=noisePoint.properties.cluster?"edge":"noise"}),points$$1;
}






















































































































































function init(len,val,v){
v=v||[];
for(var i=0;i<len;i++)
v[i]=val;
return v;
}

function skmeans(data,k,initial,maxit){
var ks=[],
old=[],
idxs=[],
dist=[],
conv=!1,
it=maxit||MAX,
len=data.length,
vlen=data[0].length,
multi=0<vlen,
count=[];

if(!initial)for(
var _idxs={},

idx;ks.length<k;)idx=_Mathfloor(Math.random()*len),
_idxs[idx]||(
_idxs[idx]=!0,
ks.push(data[idx]));else



ks="kmrand"==initial?kmrand(data,k):
"kmpp"==initial?
kmpp(data,k):

initial;


do{

init(k,0,count);


for(var i=0;i<len;i++){


for(var min=Infinity,_idx=0,j=0,

dist;j<k;j++)dist=multi?eudist(data[i],ks[j]):_Mathabs(data[i]-ks[j]),
dist<=min&&(
min=dist,
_idx=j);


idxs[i]=_idx,
count[_idx]++;
}




for(var sum=[],old=[],_j=0;_j<k;_j++)

sum[_j]=multi?init(vlen,0,sum[_j]):0,
old[_j]=ks[_j];



if(multi){
for(var _j2=0;_j2<k;_j2++)
ks[_j2]=[];

for(var _i=0;_i<len;_i++)







for(var _idx2=idxs[_i],vsum=sum[_idx2],vect=data[_i],h=0;h<vlen;h++)
vsum[h]+=vect[h];



conv=!0;
for(var _j3=0;_j3<k;_j3++){









for(var ksj=ks[_j3],sumj=sum[_j3],oldj=old[_j3],cj=count[_j3],_h=0;_h<vlen;_h++)
ksj[_h]=sumj[_h]/cj||0;



if(conv)
for(var _h2=0;_h2<vlen;_h2++)
if(oldj[_h2]!=ksj[_h2]){
conv=!1;
break;
}


}
}else

{

for(var _i2=0,
_idx3;_i2<len;_i2++)_idx3=idxs[_i2],
sum[_idx3]+=data[_i2];


for(var _j4=0;_j4<k;_j4++)
ks[_j4]=sum[_j4]/count[_j4]||0;


conv=!0;
for(var _j5=0;_j5<k;_j5++)
if(old[_j5]!=ks[_j5]){
conv=!1;
break;
}

}

conv=conv||0>=--it;
}while(!conv);

return{
it:MAX-it,
k:k,
idxs:idxs,
centroids:ks};

}
























function clustersKmeans(points,options){


if(options=options||{},"object"!=typeof options)throw new Error("options is invalid");
var numberOfClusters=options.numberOfClusters,
mutate=options.mutate;


collectionOf(points,"Point","Input must contain Points");


var count=points.features.length;
numberOfClusters=numberOfClusters||_Mathround(_Mathsqrt(count/2)),



numberOfClusters>count&&(numberOfClusters=count),(


!1===mutate||void 0===mutate)&&(points=clone(points,!0));


var data=coordAll(points),


initialCentroids=data.slice(0,numberOfClusters),


skmeansResult=main(data,numberOfClusters,initialCentroids),


centroids={};











return skmeansResult.centroids.forEach(function(coord,idx){centroids[idx]=coord}),featureEach(points,function(point,index){var clusterId=skmeansResult.idxs[index];point.properties.cluster=clusterId,point.properties.centroid=centroids[clusterId]}),points;
}















function booleanParallel(line1,line2){

if(!line1)throw new Error("line1 is required");
if(!line2)throw new Error("line2 is required");
var type1=getType$1(line1,"line1");
if("LineString"!==type1)throw new Error("line1 must be a LineString");
var type2=getType$1(line2,"line2");
if("LineString"!==type2)throw new Error("line2 must be a LineString");




for(var segments1=lineSegment(cleanCoords(line1)).features,segments2=lineSegment(cleanCoords(line2)).features,i=0,
segment1,

segment2;i<segments1.length&&(segment1=segments1[i].geometry.coordinates,!!segments2[i]);i++)
if(segment2=segments2[i].geometry.coordinates,!isParallel$1(segment1,segment2))return!1;

return!0;
}










function isParallel$1(segment1,segment2){
var slope1=bearingToAzimuth(rhumbBearing(segment1[0],segment1[1])),
slope2=bearingToAzimuth(rhumbBearing(segment2[0],segment2[1]));
return slope1===slope2;
}










function getType$1(geojson,name){
if(geojson.geometry&&geojson.geometry.type)return geojson.geometry.type;
if(geojson.type)return geojson.type;
throw new Error("Invalid GeoJSON object for "+name);
}








function pathTo(node){for(
var curr=node,
path=[];
curr.parent;)
path.unshift(curr),
curr=curr.parent;

return path;
}

function getHeap(){
return new BinaryHeap(function(node){
return node.f;
});
}


































































































































function Graph$1(gridIn,options){
options=options||{},
this.nodes=[],
this.diagonal=!!options.diagonal,
this.grid=[];
for(var x=0;x<gridIn.length;x++){
this.grid[x]=[];

for(var y=0,row=gridIn[x],
node;y<row.length;y++)node=new GridNode(x,y,row[y]),
this.grid[x][y]=node,
this.nodes.push(node);

}
this.init();
}





















































































function GridNode(x,y,weight){
this.x=x,
this.y=y,
this.weight=weight;
}

















function BinaryHeap(scoreFunction){
this.content=[],
this.scoreFunction=scoreFunction;
}











































































































































function shortestPath(start,end,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var resolution=options.resolution,
minDistance=options.minDistance,
obstacles=options.obstacles||featureCollection([]);


if(!start)throw new Error("start is required");
if(!end)throw new Error("end is required");
if(resolution&&!isNumber(resolution)||0>=resolution)throw new Error("options.resolution must be a number, greater than 0");
if(minDistance)throw new Error("options.minDistance is not yet implemented");


var startCoord=getCoord(start),
endCoord=getCoord(end);




switch(start=point(startCoord),end=point(endCoord),getType(obstacles)){
case"FeatureCollection":
if(0===obstacles.features.length)return lineString([startCoord,endCoord]);
break;
case"Polygon":
obstacles=featureCollection([feature(getGeom(obstacles))]);
break;
default:
throw new Error("invalid obstacles");}



var collection=obstacles;
collection.features.push(start),
collection.features.push(end);
var box=bbox(transformScale(bboxPolygon(bbox(collection)),1.15));
if(!resolution){
var width=distance([box[0],box[1]],[box[2],box[1]],options);
resolution=width/100;
}
collection.features.pop(),
collection.features.pop();for(

var west=box[0],
south=box[1],
east=box[2],
north=box[3],

xFraction=resolution/distance([west,south],[east,south],options),
cellWidth=xFraction*(east-west),
yFraction=resolution/distance([west,south],[west,north],options),
cellHeight=yFraction*(north-south),

bboxHorizontalSide=east-west,
bboxVerticalSide=north-south,
columns=_Mathfloor(bboxHorizontalSide/cellWidth),
rows=_Mathfloor(bboxVerticalSide/cellHeight),

deltaX=(bboxHorizontalSide-columns*cellWidth)/2,
deltaY=(bboxVerticalSide-rows*cellHeight)/2,



pointMatrix=[],
matrix=[],

closestToStart=[],
closestToEnd=[],
minDistStart=Infinity,
minDistEnd=Infinity,
currentY=north-deltaY,
r=0;
currentY>=south;){for(

var matrixRow=[],
pointMatrixRow=[],
currentX=west+deltaX,
c=0;
currentX<=east;){
var pt=point([currentX,currentY]),
isInsideObstacle=isInside$1(pt,obstacles);

matrixRow.push(isInsideObstacle?0:1),


pointMatrixRow.push(currentX+"|"+currentY);

var distStart=distance(pt,start);

!isInsideObstacle&&distStart<minDistStart&&(
minDistStart=distStart,
closestToStart={x:c,y:r});

var distEnd=distance(pt,end);

!isInsideObstacle&&distEnd<minDistEnd&&(
minDistEnd=distEnd,
closestToEnd={x:c,y:r}),

currentX+=cellWidth,
c++;
}
matrix.push(matrixRow),
pointMatrix.push(pointMatrixRow),
currentY-=cellHeight,
r++;
}




var graph=new Graph$1(matrix,{diagonal:!0}),
startOnMatrix=graph.grid[closestToStart.y][closestToStart.x],
endOnMatrix=graph.grid[closestToEnd.y][closestToEnd.x],
result=astar.search(graph,startOnMatrix,endOnMatrix),

path=[startCoord];



















return result.forEach(function(coord){var coords=pointMatrix[coord.x][coord.y].split("|");path.push([+coords[0],+coords[1]])}),path.push(endCoord),cleanCoords(lineString(path));
}









function isInside$1(pt,polygons$$1){
for(var i=0;i<polygons$$1.features.length;i++)
if(booleanPointInPolygon(pt,polygons$$1.features[i]))
return!0;


return!1;
}







function x(d){
return d[0];
}

function y(d){
return d[1];
}

function RedBlackTree(){
this._=null;
}

function RedBlackNode(node){
node.U=
node.C=
node.L=
node.R=
node.P=
node.N=null;
}





















































































































































































function RedBlackRotateLeft(tree,node){
var p=node,
q=node.R,
parent=p.U;

parent?
parent.L===p?parent.L=q:
parent.R=q:

tree._=q,


q.U=parent,
p.U=q,
p.R=q.L,
p.R&&(p.R.U=p),
q.L=p;
}

function RedBlackRotateRight(tree,node){
var p=node,
q=node.L,
parent=p.U;

parent?
parent.L===p?parent.L=q:
parent.R=q:

tree._=q,


q.U=parent,
p.U=q,
p.L=q.R,
p.L&&(p.L.U=p),
q.R=p;
}

function RedBlackFirst(node){for(;
node.L;)node=node.L;
return node;
}

function createEdge(left,right,v0,v1){
var edge=[null,null],
index=edges.push(edge)-1;






return edge.left=left,edge.right=right,v0&&setEdgeEnd(edge,left,right,v0),v1&&setEdgeEnd(edge,right,left,v1),cells[left.index].halfedges.push(index),cells[right.index].halfedges.push(index),edge;
}

function createBorderEdge(left,v0,v1){
var edge=[v0,v1];

return edge.left=left,edge;
}

function setEdgeEnd(edge,left,right,vertex){
edge[0]||edge[1]?



edge.left===right?
edge[1]=vertex:

edge[0]=vertex:(edge[0]=vertex,edge.left=left,edge.right=right);

}


function clipEdge(edge,x0,y0,x1,y1){
var a=edge[0],
b=edge[1],
ax=a[0],
ay=a[1],
bx=b[0],
by=b[1],
t0=0,
t1=1,
dx=bx-ax,
dy=by-ay,
r;


if(r=x0-ax,dx||!(0<r)){

if(r/=dx,0>dx){
if(r<t0)return;
r<t1&&(t1=r);
}else if(0<dx){
if(r>t1)return;
r>t0&&(t0=r);
}


if(r=x1-ax,dx||!(0>r)){

if(r/=dx,0>dx){
if(r>t1)return;
r>t0&&(t0=r);
}else if(0<dx){
if(r<t0)return;
r<t1&&(t1=r);
}


if(r=y0-ay,dy||!(0<r)){

if(r/=dy,0>dy){
if(r<t0)return;
r<t1&&(t1=r);
}else if(0<dy){
if(r>t1)return;
r>t0&&(t0=r);
}


if(r=y1-ay,dy||!(0>r)){

if(r/=dy,0>dy){
if(r>t1)return;
r>t0&&(t0=r);
}else if(0<dy){
if(r<t0)return;
r<t1&&(t1=r);
}return(

0<t0||1>t1?(

0<t0&&(edge[0]=[ax+t0*dx,ay+t0*dy]),
1>t1&&(edge[1]=[ax+t1*dx,ay+t1*dy]),!0):!0)}}}}

}

function connectEdge(edge,x0,y0,x1,y1){
var v1=edge[1];
if(v1)return!0;

var v0=edge[0],
left=edge.left,
right=edge.right,
lx=left[0],
ly=left[1],
rx=right[0],
ry=right[1],
fx=(lx+rx)/2,
fy=(ly+ry)/2,
fm,
fb;

if(ry===ly){
if(fx<x0||fx>=x1)return;
if(lx>rx){
if(!v0)v0=[fx,y0];else
if(v0[1]>=y1)return;
v1=[fx,y1];
}else{
if(!v0)v0=[fx,y1];else
if(v0[1]<y0)return;
v1=[fx,y0];
}
}else


if(fm=(lx-rx)/(ry-ly),fb=fy-fm*fx,-1>fm||1<fm){
if(lx>rx){
if(!v0)v0=[(y0-fb)/fm,y0];else
if(v0[1]>=y1)return;
v1=[(y1-fb)/fm,y1];
}else{
if(!v0)v0=[(y1-fb)/fm,y1];else
if(v0[1]<y0)return;
v1=[(y0-fb)/fm,y0];
}}else

if(ly<ry){
if(!v0)v0=[x0,fm*x0+fb];else
if(v0[0]>=x1)return;
v1=[x1,fm*x1+fb];
}else{
if(!v0)v0=[x1,fm*x1+fb];else
if(v0[0]<x0)return;
v1=[x0,fm*x0+fb];
}





return edge[0]=v0,edge[1]=v1,!0;
}

function clipEdges(x0,y0,x1,y1){for(
var i=edges.length,
edge;

i--;)
connectEdge(edge=edges[i],x0,y0,x1,y1)&&
clipEdge(edge,x0,y0,x1,y1)&&(
_Mathabs(edge[0][0]-edge[1][0])>epsilon||
_Mathabs(edge[0][1]-edge[1][1])>epsilon)||
delete edges[i];


}

function createCell(site){
return cells[site.index]={
site:site,
halfedges:[]};

}

function cellHalfedgeAngle(cell,edge){
var site=cell.site,
va=edge.left,
vb=edge.right;return(
site===vb&&(vb=va,va=site),
vb)?_Mathatan(vb[1]-va[1],vb[0]-va[0]):(
site===va?(va=edge[1],vb=edge[0]):(
va=edge[0],vb=edge[1]),
_Mathatan(va[0]-vb[0],vb[1]-va[1]));
}

function cellHalfedgeStart(cell,edge){
return edge[+(edge.left!==cell.site)];
}

function cellHalfedgeEnd(cell,edge){
return edge[+(edge.left===cell.site)];
}

function sortCellHalfedges(){
for(var i=0,n=cells.length,cell,halfedges,j,m;i<n;++i)
if((cell=cells[i])&&(m=(halfedges=cell.halfedges).length)){
var index=Array(m),
array=Array(m);
for(j=0;j<m;++j)index[j]=j,array[j]=cellHalfedgeAngle(cell,edges[halfedges[j]]);

for(index.sort(function(i,j){return array[j]-array[i]}),j=0;j<m;++j)array[j]=halfedges[index[j]];
for(j=0;j<m;++j)halfedges[j]=array[j];
}

}

function clipCells(x0,y0,x1,y1){
var nCells=cells.length,












cover=!0,iCell,cell,site,iHalfedge,halfedges,nHalfedges,start,startX,startY,end,endX,endY;

for(iCell=0;iCell<nCells;++iCell)
if(cell=cells[iCell]){for(
site=cell.site,
halfedges=cell.halfedges,
iHalfedge=halfedges.length;


iHalfedge--;)
edges[halfedges[iHalfedge]]||
halfedges.splice(iHalfedge,1);for(




iHalfedge=0,nHalfedges=halfedges.length;
iHalfedge<nHalfedges;)
end=cellHalfedgeEnd(cell,edges[halfedges[iHalfedge]]),endX=end[0],endY=end[1],
start=cellHalfedgeStart(cell,edges[halfedges[++iHalfedge%nHalfedges]]),startX=start[0],startY=start[1],(
_Mathabs(endX-startX)>epsilon||_Mathabs(endY-startY)>epsilon)&&(
halfedges.splice(iHalfedge,0,edges.push(createBorderEdge(site,end,
_Mathabs(endX-x0)<epsilon&&y1-endY>epsilon?[x0,_Mathabs(startX-x0)<epsilon?startY:y1]:
_Mathabs(endY-y1)<epsilon&&x1-endX>epsilon?[_Mathabs(startY-y1)<epsilon?startX:x1,y1]:
_Mathabs(endX-x1)<epsilon&&endY-y0>epsilon?[x1,_Mathabs(startX-x1)<epsilon?startY:y0]:
_Mathabs(endY-y0)<epsilon&&endX-x0>epsilon?[_Mathabs(startY-y0)<epsilon?startX:x0,y0]:
null))-1),
++nHalfedges);



nHalfedges&&(cover=!1);
}




if(cover){
var dc=Infinity,dx,dy,d2;

for(iCell=0,cover=null;iCell<nCells;++iCell)(
cell=cells[iCell])&&(
site=cell.site,
dx=site[0]-x0,
dy=site[1]-y0,
d2=dx*dx+dy*dy,
d2<dc&&(dc=d2,cover=cell));



if(cover){
var v00=[x0,y0],v01=[x0,y1],v11=[x1,y1],v10=[x1,y0];
cover.halfedges.push(
edges.push(createBorderEdge(site=cover.site,v00,v01))-1,
edges.push(createBorderEdge(site,v01,v11))-1,
edges.push(createBorderEdge(site,v11,v10))-1,
edges.push(createBorderEdge(site,v10,v00))-1);

}
}


for(iCell=0;iCell<nCells;++iCell)(
cell=cells[iCell])&&(
cell.halfedges.length||
delete cells[iCell]);



}





function Circle(){
RedBlackNode(this),
this.x=
this.y=
this.arc=
this.site=
this.cy=null;
}

function attachCircle(arc){
var lArc=arc.P,
rArc=arc.N;

if(lArc&&rArc){

var lSite=lArc.site,
cSite=arc.site,
rSite=rArc.site;

if(lSite!==rSite){

var bx=cSite[0],
by=cSite[1],
ax=lSite[0]-bx,
ay=lSite[1]-by,
cx=rSite[0]-bx,
cy=rSite[1]-by,

d=2*(ax*cy-ay*cx);
if(!(d>=-epsilon2)){

var ha=ax*ax+ay*ay,
hc=cx*cx+cy*cy,
x=(cy*ha-ay*hc)/d,
y=(ax*hc-cx*ha)/d,

circle=circlePool.pop()||new Circle;
circle.arc=arc,
circle.site=cSite,
circle.x=x+bx,
circle.y=(circle.cy=y+by)+_Mathsqrt(x*x+y*y),

arc.circle=circle;for(

var before=null,
node=circles._;

node;)
if(circle.y<node.y||circle.y===node.y&&circle.x<=node.x){
if(node.L)node=node.L;else
{before=node.P;break}}else

if(node.R)node=node.R;else
{before=node;break}



circles.insert(before,circle),
before||(firstCircle=circle)}}}
}

function detachCircle(arc){
var circle=arc.circle;
circle&&(
!circle.P&&(firstCircle=circle.N),
circles.remove(circle),
circlePool.push(circle),
RedBlackNode(circle),
arc.circle=null);

}



function Beach(){
RedBlackNode(this),
this.edge=
this.site=
this.circle=null;
}

function createBeach(site){
var beach=beachPool.pop()||new Beach;

return beach.site=site,beach;
}

function detachBeach(beach){
detachCircle(beach),
beaches.remove(beach),
beachPool.push(beach),
RedBlackNode(beach);
}

function removeBeach(beach){
var circle=beach.circle,
x=circle.x,
y=circle.cy,
vertex=[x,y],
previous=beach.P,
next=beach.N,
disappearing=[beach];

detachBeach(beach);for(

var lArc=previous;
lArc.circle&&
_Mathabs(x-lArc.circle.x)<epsilon&&
_Mathabs(y-lArc.circle.cy)<epsilon;)
previous=lArc.P,
disappearing.unshift(lArc),
detachBeach(lArc),
lArc=previous;


disappearing.unshift(lArc),
detachCircle(lArc);for(

var rArc=next;
rArc.circle&&
_Mathabs(x-rArc.circle.x)<epsilon&&
_Mathabs(y-rArc.circle.cy)<epsilon;)
next=rArc.N,
disappearing.push(rArc),
detachBeach(rArc),
rArc=next;


disappearing.push(rArc),
detachCircle(rArc);

var nArcs=disappearing.length,
iArc;
for(iArc=1;iArc<nArcs;++iArc)
rArc=disappearing[iArc],
lArc=disappearing[iArc-1],
setEdgeEnd(rArc.edge,lArc.site,rArc.site,vertex);


lArc=disappearing[0],
rArc=disappearing[nArcs-1],
rArc.edge=createEdge(lArc.site,rArc.site,null,vertex),

attachCircle(lArc),
attachCircle(rArc);
}

function addBeach(site){for(
var x=site[0],
directrix=site[1],




node=beaches._,lArc,rArc,dxl,dxr;

node;)

if(dxl=leftBreakPoint(node,directrix)-x,dxl>epsilon)node=node.L;else

if(dxr=x-rightBreakPoint(node,directrix),dxr>epsilon){
if(!node.R){
lArc=node;
break;
}
node=node.R;
}else{
dxl>-epsilon?(
lArc=node.P,
rArc=node):
dxr>-epsilon?(
lArc=node,
rArc=node.N):

lArc=rArc=node;

break;
}



createCell(site);
var newArc=createBeach(site);


if(beaches.insert(lArc,newArc),lArc||rArc){

if(lArc===rArc)






return detachCircle(lArc),rArc=createBeach(lArc.site),beaches.insert(newArc,rArc),newArc.edge=rArc.edge=createEdge(lArc.site,newArc.site),attachCircle(lArc),void attachCircle(rArc);


if(!rArc)

return void(newArc.edge=createEdge(lArc.site,newArc.site));



detachCircle(lArc),
detachCircle(rArc);

var lSite=lArc.site,
ax=lSite[0],
ay=lSite[1],
bx=site[0]-ax,
by=site[1]-ay,
rSite=rArc.site,
cx=rSite[0]-ax,
cy=rSite[1]-ay,
d=2*(bx*cy-by*cx),
hb=bx*bx+by*by,
hc=cx*cx+cy*cy,
vertex=[(cy*hb-by*hc)/d+ax,(bx*hc-cx*hb)/d+ay];

setEdgeEnd(rArc.edge,lSite,rSite,vertex),
newArc.edge=createEdge(lSite,site,null,vertex),
rArc.edge=createEdge(site,rSite,null,vertex),
attachCircle(lArc),
attachCircle(rArc)}
}

function leftBreakPoint(arc,directrix){
var site=arc.site,
rfocx=site[0],
rfocy=site[1],
pby2=rfocy-directrix;

if(!pby2)return rfocx;

var lArc=arc.P;
if(!lArc)return-Infinity;

site=lArc.site;
var lfocx=site[0],
lfocy=site[1],
plby2=lfocy-directrix;

if(!plby2)return lfocx;

var hl=lfocx-rfocx,
aby2=1/pby2-1/plby2,
b=hl/plby2;return(

aby2?(-b+_Mathsqrt(b*b-2*aby2*(hl*hl/(-2*plby2)-lfocy+plby2/2+rfocy-pby2/2)))/aby2+rfocx:

(rfocx+lfocx)/2);
}

function rightBreakPoint(arc,directrix){
var rArc=arc.N;
if(rArc)return leftBreakPoint(rArc,directrix);
var site=arc.site;
return site[1]===directrix?site[0]:Infinity;
}








function triangleArea(a,b,c){
return(a[0]-c[0])*(b[1]-a[1])-(a[0]-b[0])*(c[1]-a[1]);
}

function lexicographic(a,b){
return b[1]-a[1]||
b[0]-a[0];
}

function Diagram(sites,extent){
var site=sites.sort(lexicographic).pop(),
x,
y,
circle;for(

edges=[],
cells=Array(sites.length),
beaches=new RedBlackTree,
circles=new RedBlackTree;!0;)



if(circle=firstCircle,site&&(!circle||site[1]<circle.y||site[1]===circle.y&&site[0]<circle.x))(
site[0]!==x||site[1]!==y)&&(
addBeach(site),
x=site[0],y=site[1]),

site=sites.pop();else
if(circle)
removeBeach(circle.arc);else

break;





if(sortCellHalfedges(),extent){
var x0=+extent[0][0],
y0=+extent[0][1],
x1=+extent[1][0],
y1=+extent[1][1];
clipEdges(x0,y0,x1,y1),
clipCells(x0,y0,x1,y1);
}

this.edges=edges,
this.cells=cells,

beaches=
circles=
edges=
cells=null;
}






























































































































function coordsToPolygon(coords){


return coords=coords.slice(),coords.push(coords[0]),polygon([coords]);
}






















function voronoi$1(points$$1,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var bbox=options.bbox||[-180,-85,180,85];


if(!points$$1)throw new Error("points is required");
if(!Array.isArray(bbox))throw new Error("bbox is invalid");



return collectionOf(points$$1,"Point","points"),featureCollection(
voronoi().
x(function(feature$$1){return feature$$1.geometry.coordinates[0]}).
y(function(feature$$1){return feature$$1.geometry.coordinates[1]}).
extent([[bbox[0],bbox[1]],[bbox[2],bbox[3]]]).
polygons(points$$1.features).
map(coordsToPolygon));

}























function ellipse(center,xSemiAxis,ySemiAxis,options){

options=options||{};
var steps=options.steps||64,
units=options.units||"kilometers",
angle=options.angle||0,
pivot=options.pivot||center,
properties=options.properties||center.properties||{};


if(!center)throw new Error("center is required");
if(!xSemiAxis)throw new Error("xSemiAxis is required");
if(!ySemiAxis)throw new Error("ySemiAxis is required");
if(!isObject(options))throw new Error("options must be an object");
if(!isNumber(steps))throw new Error("steps must be a number");
if(!isNumber(angle))throw new Error("angle must be a number");

var centerCoords=getCoord(center);
if("degrees"===units)
var angleRad=degreesToRadians(angle);else

xSemiAxis=rhumbDestination(center,xSemiAxis,90,{units:units}),
ySemiAxis=rhumbDestination(center,ySemiAxis,0,{units:units}),
xSemiAxis=getCoord(xSemiAxis)[0]-centerCoords[0],
ySemiAxis=getCoord(ySemiAxis)[1]-centerCoords[1];



for(var coordinates=[],i=0;i<steps;i+=1){
var stepAngle=-360*i/steps,
x=xSemiAxis*ySemiAxis/_Mathsqrt(_Mathpow(ySemiAxis,2)+_Mathpow(xSemiAxis,2)*_Mathpow(getTanDeg(stepAngle),2)),
y=xSemiAxis*ySemiAxis/_Mathsqrt(_Mathpow(xSemiAxis,2)+_Mathpow(ySemiAxis,2)/_Mathpow(getTanDeg(stepAngle),2));



if(-90>stepAngle&&-270<=stepAngle&&(x=-x),-180>stepAngle&&-360<=stepAngle&&(y=-y),"degrees"===units){
var newx=x*_Mathcos(angleRad)+y*_Mathsin(angleRad),
newy=y*_Mathcos(angleRad)-x*_Mathsin(angleRad);
x=newx,
y=newy;
}

coordinates.push([x+centerCoords[0],y+centerCoords[1]]);
}return(
coordinates.push(coordinates[0]),
"degrees"===units?
polygon([coordinates],properties):

transformRotate(polygon([coordinates],properties),angle,{pivot:pivot}));

}








function getTanDeg(deg){
var rad=deg*_MathPI/180;
return _Mathtan(rad);
}

























function centerMean(geojson,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var properties=options.properties,
weightTerm=options.weight;


if(!geojson)throw new Error("geojson is required");

var sumXs=0,
sumYs=0,
sumNs=0;













return geomEach(geojson,function(geom,featureIndex,properties){var weight=properties[weightTerm];if(weight=void 0===weight||null===weight?1:weight,!isNumber(weight))throw new Error("weight value must be a number for feature index "+featureIndex);weight=+weight,0<weight&&coordEach(geom,function(coord){sumXs+=coord[0]*weight,sumYs+=coord[1]*weight,sumNs+=weight})}),point([sumXs/sumNs,sumYs/sumNs],properties);
}





















































function centerMedian(features,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var counter=options.counter||10;
if(!isNumber(counter))throw new Error("counter must be a number");
var weightTerm=options.weight,


meanCenter=centerMean(features,{weight:options.weight}),


centroids=featureCollection([]);








return featureEach(features,function(feature$$1){centroids.features.push(centroid(feature$$1,{weight:feature$$1.properties[weightTerm]}))}),centroids.properties={tolerance:options.tolerance,medianCandidates:[]},findMedian(meanCenter.geometry.coordinates,[0,0],centroids,counter);
}











function findMedian(candidateMedian,previousCandidate,centroids,counter){
var tolerance=centroids.properties.tolerance||1e-3,
candidateXsum=0,
candidateYsum=0,
kSum=0,
centroidCount=0;















if(featureEach(centroids,function(theCentroid){var weightValue=theCentroid.properties.weight,weight=void 0===weightValue||null===weightValue?1:weightValue;if(weight=+weight,!isNumber(weight))throw new Error("weight value must be a number");if(0<weight){centroidCount+=1;var distanceFromCandidate=weight*distance(theCentroid,candidateMedian);0==distanceFromCandidate&&(distanceFromCandidate=1);var k=weight/distanceFromCandidate;candidateXsum+=theCentroid.geometry.coordinates[0]*k,candidateYsum+=theCentroid.geometry.coordinates[1]*k,kSum+=k}}),1>centroidCount)throw new Error("no features to measure");
var candidateX=candidateXsum/kSum,
candidateY=candidateYsum/kSum;return(
1==centroidCount||0===counter||_Mathabs(candidateX-previousCandidate[0])<tolerance&&_Mathabs(candidateY-previousCandidate[1])<tolerance?
point([candidateX,candidateY],{medianCandidates:centroids.properties.medianCandidates}):(

centroids.properties.medianCandidates.push([candidateX,candidateY]),
findMedian([candidateX,candidateY],candidateMedian,centroids,counter-1)));

}







































function standardDeviationalEllipse(points$$1,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var steps=options.steps||64,
weightTerm=options.weight,
properties=options.properties||{};


if(!isNumber(steps))throw new Error("steps must be a number");
if(!isObject(properties))throw new Error("properties must be a number");


var numberOfFeatures=coordAll(points$$1).length,
meanCenter=centerMean(points$$1,{weight:weightTerm}),








xDeviationSquaredSum=0,
yDeviationSquaredSum=0,
xyDeviationSum=0;

featureEach(points$$1,function(point$$1){
var weight=point$$1.properties[weightTerm]||1,
deviation=getDeviations(getCoords(point$$1),getCoords(meanCenter));
xDeviationSquaredSum+=_Mathpow(deviation.x,2)*weight,
yDeviationSquaredSum+=_Mathpow(deviation.y,2)*weight,
xyDeviationSum+=deviation.x*deviation.y*weight;
});

var bigA=xDeviationSquaredSum-yDeviationSquaredSum,
bigB=_Mathsqrt(_Mathpow(bigA,2)+4*_Mathpow(xyDeviationSum,2)),
bigC=2*xyDeviationSum,
theta=_Mathatan2((bigA+bigB)/bigC),
thetaDeg=180*theta/_MathPI,




sigmaXsum=0,
sigmaYsum=0,
weightsum=0;
featureEach(points$$1,function(point$$1){
var weight=point$$1.properties[weightTerm]||1,
deviation=getDeviations(getCoords(point$$1),getCoords(meanCenter));
sigmaXsum+=_Mathpow(deviation.x*_Mathcos(theta)-deviation.y*_Mathsin(theta),2)*weight,
sigmaYsum+=_Mathpow(deviation.x*_Mathsin(theta)+deviation.y*_Mathcos(theta),2)*weight,
weightsum+=weight;
});

var sigmaX=_Mathsqrt(2*sigmaXsum/weightsum),
sigmaY=_Mathsqrt(2*sigmaYsum/weightsum),

theEllipse=ellipse(meanCenter,sigmaX,sigmaY,{units:"degrees",angle:thetaDeg,steps:steps,properties:properties}),
pointsWithinEllipse=pointsWithinPolygon(points$$1,featureCollection([theEllipse])),
standardDeviationalEllipseProperties={
meanCenterCoordinates:getCoords(meanCenter),
semiMajorAxis:sigmaX,
semiMinorAxis:sigmaY,
numberOfFeatures:numberOfFeatures,
angle:thetaDeg,
percentageWithinEllipse:100*coordAll(pointsWithinEllipse).length/numberOfFeatures};



return theEllipse.properties.standardDeviationalEllipse=standardDeviationalEllipseProperties,theEllipse;
}









function getDeviations(coordinates,center){
return{
x:coordinates[0]-center[0],
y:coordinates[1]-center[1]};

}











function randomPosition(bbox){

if(isObject(bbox)&&(bbox=bbox.bbox),bbox&&!Array.isArray(bbox))throw new Error("bbox is invalid");return(
bbox?coordInBBox(bbox):
[lon(),lat()]);
}













function randomPoint(count,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var bbox=options.bbox;(
void 0===count||null===count)&&(count=1);


for(var features=[],i=0;i<count;i++)
features.push(point(randomPosition(bbox)));

return featureCollection(features);
}















function randomPolygon(count,options){



























function sumOffsets(cur,index,arr){
arr[index]=0<index?cur+arr[index-1]:cur;
}

function scaleOffsets(cur){
cur=2*cur*_MathPI/circle_offsets[circle_offsets.length-1];
var radial_scaler=Math.random();
vertices.push([
radial_scaler*max_radial_length*_Mathsin(cur),
radial_scaler*max_radial_length*_Mathcos(cur)]);

}if(options=options||{},!isObject(options))throw new Error("options is invalid");var bbox=options.bbox,num_vertices=options.num_vertices,max_radial_length=options.max_radial_length;(void 0===count||null===count)&&(count=1),isNumber(num_vertices)||(num_vertices=10),isNumber(max_radial_length)||(max_radial_length=10);for(var features=[],i=0;i<count;i++){var vertices=[],circle_offsets=Array.apply(null,Array(num_vertices+1)).map(Math.random);circle_offsets.forEach(sumOffsets),circle_offsets.forEach(scaleOffsets),vertices[vertices.length-1]=vertices[0],vertices=vertices.map(vertexToCoordinate(randomPosition(bbox))),features.push(polygon([vertices]))}

return featureCollection(features);
}
















function randomLineString(count,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var bbox=options.bbox,
num_vertices=options.num_vertices,
max_length=options.max_length,
max_rotation=options.max_rotation;(
void 0===count||null===count)&&(count=1),(


!isNumber(num_vertices)||2>num_vertices)&&(num_vertices=10),
isNumber(max_length)||(max_length=1e-4),
isNumber(max_rotation)||(max_rotation=_MathPI/8);


for(var features=[],i=0;i<count;i++){


for(var startingPoint=randomPosition(bbox),vertices=[startingPoint],j=0;j<num_vertices-1;j++){
var priorAngle=0===j?
2*Math.random()*_MathPI:
_Mathtan(
(vertices[j][1]-vertices[j-1][1])/(
vertices[j][0]-vertices[j-1][0])),

angle=priorAngle+2*((Math.random()-0.5)*max_rotation),
distance=Math.random()*max_length;
vertices.push([
vertices[j][0]+distance*_Mathcos(angle),
vertices[j][1]+distance*_Mathsin(angle)]);

}
features.push(lineString(vertices));
}

return featureCollection(features);
}

function vertexToCoordinate(hub){
return function(cur){return[cur[0]+hub[0],cur[1]+hub[1]]};
}

function rnd(){return Math.random()-0.5}
function lon(){return 360*rnd()}
function lat(){return 180*rnd()}

function coordInBBox(bbox){
return[
Math.random()*(bbox[2]-bbox[0])+bbox[0],
Math.random()*(bbox[3]-bbox[1])+bbox[1]];
}








































function getCluster(geojson,filter){

if(!geojson)throw new Error("geojson is required");
if("FeatureCollection"!==geojson.type)throw new Error("geojson must be a FeatureCollection");
if(void 0===filter||null===filter)throw new Error("filter is required");


var features=[];



return featureEach(geojson,function(feature$$1){applyFilter(feature$$1.properties,filter)&&features.push(feature$$1)}),featureCollection(features);
}


















































function clusterEach(geojson,property,callback){

if(!geojson)throw new Error("geojson is required");
if("FeatureCollection"!==geojson.type)throw new Error("geojson must be a FeatureCollection");
if(void 0===property||null===property)throw new Error("property is required");




for(var bins=createBins(geojson,property),values=Object.keys(bins),index=0;index<values.length;index++){



for(var value=values[index],bin=bins[value],features=[],i=0;i<bin.length;i++)
features.push(geojson.features[bin[i]]);

callback(featureCollection(features),value,index);
}
}

































































function clusterReduce(geojson,property,callback,initialValue){
var previousValue=initialValue;




return clusterEach(geojson,property,function(cluster,clusterValue,currentIndex){previousValue=0===currentIndex&&void 0===initialValue?cluster:callback(previousValue,cluster,clusterValue,currentIndex)}),previousValue;
}


















function createBins(geojson,property){
var bins={};









return featureEach(geojson,function(feature$$1,i){var properties=feature$$1.properties||{};if(properties.hasOwnProperty(property)){var value=properties[property];bins.hasOwnProperty(value)?bins[value].push(i):bins[value]=[i]}}),bins;
}









function applyFilter(properties,filter){
if(properties===void 0)return!1;
var filterType=typeof filter;


if("number"==filterType||"string"==filterType)return properties.hasOwnProperty(filter);

if(Array.isArray(filter)){
for(var i=0;i<filter.length;i++)
if(!applyFilter(properties,filter[i]))return!1;

return!0;

}
return propertiesContainsFilter(properties,filter);

}














function propertiesContainsFilter(properties,filter){

for(var keys=Object.keys(filter),i=0,
key;i<keys.length;i++)
if(key=keys[i],properties[key]!==filter[key])return!1;

return!0;
}












function filterProperties(properties,keys){
if(!keys)return{};
if(!keys.length)return{};


for(var newProperties={},i=0,
key;i<keys.length;i++)key=keys[i],
properties.hasOwnProperty(key)&&(newProperties[key]=properties[key]);

return newProperties;
}













































































































function Serializable(){}




























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































function NoSuchElementException(message){
this.message=message||"";
}






















































































































































































































































































































































































































































































































































































































































































function OperationNotSupported(message){
this.message=message||"";
}














function Set(){}


















































































































































































function colorOf(p){return null===p?BLACK:p.color}
function parentOf(p){return null===p?null:p.parent}
function setColor(p,c){null!==p&&(p.color=c)}
function leftOf(p){return null===p?null:p.left}
function rightOf(p){return null===p?null:p.right}








function TreeMap(){




this.root_=null,




this.size_=0;
}










































































































































































































































function SortedSet(){}










function TreeSet(){




this.array_=[],

arguments[0]instanceof Collection&&
this.addAll(arguments[0]);

}




















































































































































































































































































































































































































































































































































































































































































































































function PrintStream(){}

function StringReader(){}



function ByteArrayOutputStream(){}

function IOException(){}

function LineNumberReader(){}









































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































function EmptyStackException(message){
this.message=message||"";
}














function Stack(){




this.array_=[];
}
































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































function difference(polygon1,polygon2){
var geom1=getGeom(polygon1),
geom2=getGeom(polygon2),
properties=polygon1.properties||{};




if(geom1=removeEmptyPolygon(geom1),geom2=removeEmptyPolygon(geom2),!geom1)return null;
if(!geom2)return feature(geom1,properties);


var reader=new GeoJSONReader,
a=reader.read(geom1),
b=reader.read(geom2),
differenced=OverlayOp.difference(a,b);
if(differenced.isEmpty())return null;
var writer=new GeoJSONWriter,
geom=writer.write(differenced);

return feature(geom,properties);
}








function removeEmptyPolygon(geom){
switch(geom.type){
case"Polygon":return(
1<area$1(geom)?geom:
null);
case"MultiPolygon":
var coordinates=[];



if(flattenEach(geom,function(feature$$1){1<area$1(feature$$1)&&coordinates.push(feature$$1.geometry.coordinates)}),coordinates.length)return{type:"MultiPolygon",coordinates:coordinates};}

}












function Adder(){
this.reset();
}




















function add$1(adder,a,b){
var x=adder.s=a+b,
bv=x-a,
av=x-bv;
adder.t=a-av+(b-bv);
}

























function acos(x){
return 1<x?0:-1>x?pi:Math.acos(x);
}

function asin(x){
return 1<x?halfPi:-1>x?-halfPi:_Mathasin(x);
}

function noop(){}

function streamGeometry(geometry,stream){
geometry&&streamGeometryType.hasOwnProperty(geometry.type)&&
streamGeometryType[geometry.type](geometry,stream);

}











































function streamLine(coordinates,stream,closed){
var i=-1,n=coordinates.length-closed,coordinate;for(
stream.lineStart();
++i<n;)coordinate=coordinates[i],stream.point(coordinate[0],coordinate[1],coordinate[2]);
stream.lineEnd();
}

function streamPolygon(coordinates,stream){
var i=-1,n=coordinates.length;for(
stream.polygonStart();
++i<n;)streamLine(coordinates[i],stream,1);
stream.polygonEnd();
}













function spherical(cartesian){
return[atan2(cartesian[1],cartesian[0]),asin(cartesian[2])];
}

function cartesian(spherical){
var lambda=spherical[0],phi=spherical[1],cosPhi=cos(phi);
return[cosPhi*cos(lambda),cosPhi*sin(lambda),sin(phi)];
}

function cartesianDot(a,b){
return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
}

function cartesianCross(a,b){
return[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
}


function cartesianAddInPlace(a,b){
a[0]+=b[0],a[1]+=b[1],a[2]+=b[2];
}

function cartesianScale(vector,k){
return[vector[0]*k,vector[1]*k,vector[2]*k];
}


function cartesianNormalizeInPlace(d){
var l=sqrt(d[0]*d[0]+d[1]*d[1]+d[2]*d[2]);
d[0]/=l,d[1]/=l,d[2]/=l;
}
















function rotationIdentity(lambda,phi){
return[lambda>pi?lambda-tau:lambda<-pi?lambda+tau:lambda,phi];
}



function rotateRadians(deltaLambda,deltaPhi,deltaGamma){
return(deltaLambda%=tau)?deltaPhi||deltaGamma?compose(rotationLambda(deltaLambda),rotationPhiGamma(deltaPhi,deltaGamma)):
rotationLambda(deltaLambda):
deltaPhi||deltaGamma?rotationPhiGamma(deltaPhi,deltaGamma):
rotationIdentity;
}

function forwardRotationLambda(deltaLambda){
return function(lambda,phi){
return lambda+=deltaLambda,[lambda>pi?lambda-tau:lambda<-pi?lambda+tau:lambda,phi];
};
}

function rotationLambda(deltaLambda){
var rotation=forwardRotationLambda(deltaLambda);

return rotation.invert=forwardRotationLambda(-deltaLambda),rotation;
}

function rotationPhiGamma(deltaPhi,deltaGamma){





function rotation(lambda,phi){
var cosPhi=cos(phi),
x=cos(lambda)*cosPhi,
y=sin(lambda)*cosPhi,
z=sin(phi),
k=z*cosDeltaPhi+x*sinDeltaPhi;
return[
atan2(y*cosDeltaGamma-k*sinDeltaGamma,x*cosDeltaPhi-z*sinDeltaPhi),
asin(k*cosDeltaGamma+y*sinDeltaGamma)];

}var cosDeltaPhi=cos(deltaPhi),sinDeltaPhi=sin(deltaPhi),cosDeltaGamma=cos(deltaGamma),sinDeltaGamma=sin(deltaGamma);













return rotation.invert=function(lambda,phi){var cosPhi=cos(phi),x=cos(lambda)*cosPhi,y=sin(lambda)*cosPhi,z=sin(phi),k=z*cosDeltaGamma-y*sinDeltaGamma;return[atan2(y*cosDeltaGamma+z*sinDeltaGamma,x*cosDeltaPhi+k*sinDeltaPhi),asin(k*cosDeltaPhi-x*sinDeltaPhi)]},rotation;
}


















function circleStream(stream,radius,delta,direction,t0,t1){
if(delta){
var cosRadius=cos(radius),
sinRadius=sin(radius),
step=direction*delta;
null==t0?(
t0=radius+direction*tau,
t1=radius-step/2):(

t0=circleRadius(cosRadius,t0),
t1=circleRadius(cosRadius,t1),(
0<direction?t0<t1:t0>t1)&&(t0+=direction*tau));

for(var t=t0,point;0<direction?t>t1:t<t1;t-=step)
point=spherical([cosRadius,-sinRadius*cos(t),-sinRadius*sin(t)]),
stream.point(point[0],point[1])}

}


function circleRadius(cosRadius,point){
point=cartesian(point),point[0]-=cosRadius,
cartesianNormalizeInPlace(point);
var radius=acos(-point[1]);
return((0>-point[2]?-radius:radius)+tau-epsilon$1)%tau;
}
























































































function Intersection(point,points,other,entry){
this.x=point,
this.z=points,
this.o=other,
this.e=entry,
this.v=!1,
this.n=this.p=null;
}













































































function link(array){
if(n=array.length){for(
var
i=0,
a=array[0],n,
b;
++i<n;)
a.n=b=array[i],
b.p=a,
a=b;

a.n=b=array[0],
b.p=a}
}































function ascendingComparator(f){
return function(d,x){
return ascending(f(d),x);
};
}































function clipExtent(x0,y0,x1,y1){

function visible(x,y){
return x0<=x&&x<=x1&&y0<=y&&y<=y1;
}

function interpolate(from,to,direction,stream){
var a=0,a1=0;
if(null==from||
(a=corner(from,direction))!==(a1=corner(to,direction))||
0>comparePoint(from,to)^0<direction)
do stream.point(0==a||3==a?x0:x1,1<a?y1:y0);while(
(a=(a+direction+4)%4)!=a1);else

stream.point(to[0],to[1]);

}

function corner(p,direction){
return abs(p[0]-x0)<epsilon$1?0<direction?0:3:
abs(p[0]-x1)<epsilon$1?0<direction?2:1:
abs(p[1]-y0)<epsilon$1?0<direction?1:0:
0<direction?3:2;
}

function compareIntersection(a,b){
return comparePoint(a.x,b.x);
}

function comparePoint(a,b){
var ca=corner(a,1),
cb=corner(b,1);
return ca===cb?
0===ca?b[1]-a[1]:
1===ca?a[0]-b[0]:
2===ca?a[1]-b[1]:
b[0]-a[0]:ca-cb;
}

return function(stream){


















function point(x,y){
visible(x,y)&&activeStream.point(x,y);
}

function polygonInside(){


for(var winding=0,i=0,n=polygon.length;i<n;++i)
for(var ring=polygon[i],j=1,m=ring.length,point=ring[0],b0=point[0],b1=point[1],a0,a1;j<m;++j)
a0=b0,a1=b1,point=ring[j],b0=point[0],b1=point[1],
a1<=y1?b1>y1&&(b0-a0)*(y1-a1)>(b1-a1)*(x0-a0)&&++winding:
b1<=y1&&(b0-a0)*(y1-a1)<(b1-a1)*(x0-a0)&&--winding;



return winding;
}


function polygonStart(){
activeStream=bufferStream,segments=[],polygon=[],clean=!0;
}

function polygonEnd(){
var startInside=polygonInside(),
cleanInside=clean&&startInside,
visible=(segments=merge$1(segments)).length;(
cleanInside||visible)&&(
stream.polygonStart(),
cleanInside&&(
stream.lineStart(),
interpolate(null,null,1,stream),
stream.lineEnd()),

visible&&
clipPolygon$1(segments,compareIntersection,startInside,interpolate,stream),

stream.polygonEnd()),

activeStream=stream,segments=polygon=ring=null;
}

function lineStart(){
clipStream.point=linePoint,
polygon&&polygon.push(ring=[]),
first=!0,
v_=!1,
x_=y_=NaN;
}




function lineEnd(){
segments&&(
linePoint(x__,y__),
v__&&v_&&bufferStream.rejoin(),
segments.push(bufferStream.result())),

clipStream.point=point,
v_&&activeStream.lineEnd();
}

function linePoint(x,y){
var v=visible(x,y);

if(polygon&&ring.push([x,y]),first)
x__=x,y__=y,v__=v,
first=!1,
v&&(
activeStream.lineStart(),
activeStream.point(x,y));else


if(v&&v_)activeStream.point(x,y);else
{
var a=[x_=_Mathmax(clipMin,_Mathmin(clipMax,x_)),y_=_Mathmax(clipMin,_Mathmin(clipMax,y_))],
b=[x=_Mathmax(clipMin,_Mathmin(clipMax,x)),y=_Mathmax(clipMin,_Mathmin(clipMax,y))];
clipLine(a,b,x0,y0,x1,y1)?(
!v_&&(
activeStream.lineStart(),
activeStream.point(a[0],a[1])),

activeStream.point(b[0],b[1]),
!v&&activeStream.lineEnd(),
clean=!1):
v&&(
activeStream.lineStart(),
activeStream.point(x,y),
clean=!1);

}

x_=x,y_=y,v_=v;
}var activeStream=stream,bufferStream=clipBuffer(),clipStream={point:point,lineStart:lineStart,lineEnd:lineEnd,polygonStart:polygonStart,polygonEnd:polygonEnd},segments,polygon,ring,x__,y__,v__,x_,y_,v_,first,clean;

return clipStream;
};
}





























































































function boundsPoint$1(x,y){
x<x0$2&&(x0$2=x),
x>x1&&(x1=x),
y<y0$2&&(y0$2=y),
y>y1&&(y1=y);
}


























































































































function validSegment(segment){
return 1<segment.length;
}



function compareIntersection(a,b){
return(0>(a=a.x)[0]?a[1]-halfPi-epsilon$1:halfPi-a[1])-(
0>(b=b.x)[0]?b[1]-halfPi-epsilon$1:halfPi-b[1]);
}











function clipAntimeridianLine(stream){
var lambda0=NaN,
phi0=NaN,
sign0=NaN,
clean;

return{
lineStart:function(){
stream.lineStart(),
clean=1;
},
point:function(lambda1,phi1){
var sign1=0<lambda1?pi:-pi,
delta=abs(lambda1-lambda0);
abs(delta-pi)<epsilon$1?(
stream.point(lambda0,phi0=0<(phi0+phi1)/2?halfPi:-halfPi),
stream.point(sign0,phi0),
stream.lineEnd(),
stream.lineStart(),
stream.point(sign1,phi0),
stream.point(lambda1,phi0),
clean=0):
sign0!==sign1&&delta>=pi&&(
abs(lambda0-sign0)<epsilon$1&&(lambda0-=sign0*epsilon$1),
abs(lambda1-sign1)<epsilon$1&&(lambda1-=sign1*epsilon$1),
phi0=clipAntimeridianIntersect(lambda0,phi0,lambda1,phi1),
stream.point(sign0,phi0),
stream.lineEnd(),
stream.lineStart(),
stream.point(sign1,phi0),
clean=0),

stream.point(lambda0=lambda1,phi0=phi1),
sign0=sign1;
},
lineEnd:function(){
stream.lineEnd(),
lambda0=phi0=NaN;
},
clean:function(){
return 2-clean;
}};

}

function clipAntimeridianIntersect(lambda0,phi0,lambda1,phi1){
var

sinLambda0Lambda1=sin(lambda0-lambda1),cosPhi0,cosPhi1;
return abs(sinLambda0Lambda1)>epsilon$1?
atan((sin(phi0)*(cosPhi1=cos(phi1))*sin(lambda1)-
sin(phi1)*(cosPhi0=cos(phi0))*sin(lambda0))/(
cosPhi0*cosPhi1*sinLambda0Lambda1)):
(phi0+phi1)/2;
}

function clipAntimeridianInterpolate(from,to,direction,stream){
var phi;
if(null==from)
phi=direction*halfPi,
stream.point(-pi,phi),
stream.point(0,phi),
stream.point(pi,phi),
stream.point(pi,0),
stream.point(pi,-phi),
stream.point(0,-phi),
stream.point(-pi,-phi),
stream.point(-pi,0),
stream.point(-pi,phi);else
if(abs(from[0]-to[0])>epsilon$1){
var lambda=from[0]<to[0]?pi:-pi;
phi=direction*lambda/2,
stream.point(-lambda,phi),
stream.point(0,phi),
stream.point(lambda,phi);
}else
stream.point(to[0],to[1]);

}

















































































































































































function transformer(methods){
return function(stream){
var s=new TransformStream;
for(var key in methods)s[key]=methods[key];

return s.stream=stream,s;
};
}

function TransformStream(){}











function fitExtent(projection,extent,object){
var w=extent[1][0]-extent[0][0],
h=extent[1][1]-extent[0][1],
clip=projection.clipExtent&&projection.clipExtent();

projection.
scale(150).
translate([0,0]),

null!=clip&&projection.clipExtent(null),

geoStream(object,projection.stream(boundsStream$1));

var b=boundsStream$1.result(),
k=_Mathmin(w/(b[1][0]-b[0][0]),h/(b[1][1]-b[0][1])),
x=+extent[0][0]+(w-k*(b[1][0]+b[0][0]))/2,
y=+extent[0][1]+(h-k*(b[1][1]+b[0][1]))/2;



return null!=clip&&projection.clipExtent(clip),projection.
scale(150*k).
translate([x,y]);
}

function fitSize(projection,size,object){
return fitExtent(projection,[[0,0],size],object);
}








function resampleNone(project){
return transformer({
point:function(x,y){
x=project(x,y),
this.stream.point(x[0],x[1]);
}});

}

function resample$1(project,delta2){

function resampleLineTo(x0,y0,lambda0,a0,b0,c0,x1,y1,lambda1,a1,b1,c1,depth,stream){
var dx=x1-x0,
dy=y1-y0,
d2=dx*dx+dy*dy;
if(d2>4*delta2&&depth--){
var a=a0+a1,
b=b0+b1,
c=c0+c1,
m=sqrt(a*a+b*b+c*c),
phi2=asin(c/=m),
lambda2=abs(abs(c)-1)<epsilon$1||abs(lambda0-lambda1)<epsilon$1?(lambda0+lambda1)/2:atan2(b,a),
p=project(lambda2,phi2),
x2=p[0],
y2=p[1],
dx2=x2-x0,
dy2=y2-y0,
dz=dy*dx2-dx*dy2;(
dz*dz/d2>delta2||
0.3<abs((dx*dx2+dy*dy2)/d2-0.5)||
a0*a1+b0*b1+c0*c1<cosMinDistance)&&(
resampleLineTo(x0,y0,lambda0,a0,b0,c0,x2,y2,lambda2,a/=m,b/=m,c,depth,stream),
stream.point(x2,y2),
resampleLineTo(x2,y2,lambda2,a,b,c,x1,y1,lambda1,a1,b1,c1,depth,stream));

}
}
return function(stream){











function point(x,y){
x=project(x,y),
stream.point(x[0],x[1]);
}

function lineStart(){
x0=NaN,
resampleStream.point=linePoint,
stream.lineStart();
}

function linePoint(lambda,phi){
var c=cartesian([lambda,phi]),p=project(lambda,phi);
resampleLineTo(x0,y0,lambda0,a0,b0,c0,x0=p[0],y0=p[1],lambda0=lambda,a0=c[0],b0=c[1],c0=c[2],maxDepth,stream),
stream.point(x0,y0);
}

function lineEnd(){
resampleStream.point=point,
stream.lineEnd();
}

function ringStart(){
lineStart(),
resampleStream.point=ringPoint,
resampleStream.lineEnd=ringEnd;
}

function ringPoint(lambda,phi){
linePoint(lambda00=lambda,phi),x00=x0,y00=y0,a00=a0,b00=b0,c00=c0,
resampleStream.point=linePoint;
}

function ringEnd(){
resampleLineTo(x0,y0,lambda0,a0,b0,c0,x00,y00,lambda00,a00,b00,c00,maxDepth,stream),
resampleStream.lineEnd=lineEnd,
lineEnd();
}var resampleStream={point:point,lineStart:lineStart,lineEnd:lineEnd,polygonStart:function(){stream.polygonStart(),resampleStream.lineStart=ringStart},polygonEnd:function(){stream.polygonEnd(),resampleStream.lineStart=lineStart}},lambda00,x00,y00,a00,b00,c00,lambda0,x0,y0,a0,b0,c0;

return resampleStream;
};
}







function projection(project){
return projectionMutator(function(){return project})();
}

function projectionMutator(projectAt){











function projection(point){

return point=projectRotate(point[0]*radians,point[1]*radians),[point[0]*k+dx,dy-point[1]*k];
}

function invert(point){

return point=projectRotate.invert((point[0]-dx)/k,(dy-point[1])/k),point&&[point[0]*degrees,point[1]*degrees];
}

function projectTransform(x,y){
return x=project(x,y),[x[0]*k+dx,dy-x[1]*k];
}









































function recenter(){
projectRotate=compose(rotate=rotateRadians(deltaLambda,deltaPhi,deltaGamma),project);
var center=project(lambda,phi);


return dx=x-center[0]*k,dy=y+center[1]*k,reset();
}

function reset(){

return cache=cacheStream=null,projection;
}var k=150,x=480,y=250,lambda=0,phi=0,deltaLambda=0,deltaPhi=0,deltaGamma=0,theta=null,preclip=clipAntimeridian,x0=null,postclip=identity$2,delta2=0.5,projectResample=resample(projectTransform,delta2),project,dx,dy,rotate,projectRotate,y0,x1,y1,cache,cacheStream;

return projection.stream=function(stream){return cache&&cacheStream===stream?cache:cache=transformRadians(preclip(rotate,projectResample(postclip(cacheStream=stream))))},projection.clipAngle=function(_){return arguments.length?(preclip=+_?clipCircle(theta=_*radians,6*radians):(theta=null,clipAntimeridian),reset()):theta*degrees},projection.clipExtent=function(_){return arguments.length?(postclip=null==_?(x0=y0=x1=y1=null,identity$2):clipExtent(x0=+_[0][0],y0=+_[0][1],x1=+_[1][0],y1=+_[1][1]),reset()):null==x0?null:[[x0,y0],[x1,y1]]},projection.scale=function(_){return arguments.length?(k=+_,recenter()):k},projection.translate=function(_){return arguments.length?(x=+_[0],y=+_[1],recenter()):[x,y]},projection.center=function(_){return arguments.length?(lambda=_[0]%360*radians,phi=_[1]%360*radians,recenter()):[lambda*degrees,phi*degrees]},projection.rotate=function(_){return arguments.length?(deltaLambda=_[0]%360*radians,deltaPhi=_[1]%360*radians,deltaGamma=2<_.length?_[2]%360*radians:0,recenter()):[deltaLambda*degrees,deltaPhi*degrees,deltaGamma*degrees]},projection.precision=function(_){return arguments.length?(projectResample=resample(projectTransform,delta2=_*_),reset()):sqrt(delta2)},projection.fitExtent=function(extent$$1,object){return fitExtent(projection,extent$$1,object)},projection.fitSize=function(size,object){return fitSize(projection,size,object)},function(){


return project=projectAt.apply(this,arguments),projection.invert=project.invert&&invert,recenter();
};
}

function mercatorRaw(lambda,phi){
return[lambda,log(tan((halfPi+phi)/2))];
}





function mercatorProjection(project){























function reclip(){
var k=pi*scale(),
t=m(rotation(m.rotate()).invert([0,0]));
return clipExtent(null==x0?
[[t[0]-k,t[1]-k],[t[0]+k,t[1]+k]]:project===mercatorRaw?
[[_Mathmax(t[0]-k,x0),y0],[_Mathmin(t[0]+k,x1),y1]]:
[[x0,_Mathmax(t[1]-k,y0)],[x1,_Mathmin(t[1]+k,y1)]]);
}var m=projection(project),center=m.center,scale=m.scale,translate=m.translate,clipExtent=m.clipExtent,x0=null,y0,x1,y1;

return m.scale=function(_){return arguments.length?(scale(_),reclip()):scale()},m.translate=function(_){return arguments.length?(translate(_),reclip()):translate()},m.center=function(_){return arguments.length?(center(_),reclip()):center()},m.clipExtent=function(_){return arguments.length?(null==_?x0=y0=x1=y1=null:(x0=+_[0][0],y0=+_[0][1],x1=+_[1][0],y1=+_[1][1]),reclip()):null==x0?null:[[x0,y0],[x1,y1]]},reclip();
}

function transverseMercatorRaw(lambda,phi){
return[log(tan((halfPi+phi)/2)),-lambda];
}













































function buffer$1(geojson,radius,options){

options=options||{};
var units=options.units,
steps=options.steps||64;


if(!geojson)throw new Error("geojson is required");
if("object"!=typeof options)throw new Error("options must be an object");
if("number"!=typeof steps)throw new Error("steps must be an number");


if(void 0===radius)throw new Error("radius is required");
if(0>=steps)throw new Error("steps must be greater than 0");


steps=steps||64,
units=units||"kilometers";

var results=[];
switch(geojson.type){
case"GeometryCollection":




return geomEach(geojson,function(geometry$$1){var buffered=bufferFeature(geometry$$1,radius,units,steps);buffered&&results.push(buffered)}),featureCollection(results);
case"FeatureCollection":








return featureEach(geojson,function(feature$$1){var multiBuffered=bufferFeature(feature$$1,radius,units,steps);multiBuffered&&featureEach(multiBuffered,function(buffered){buffered&&results.push(buffered)})}),featureCollection(results);}

return bufferFeature(geojson,radius,units,steps);
}











function bufferFeature(geojson,radius,units,steps){
var properties=geojson.properties||{},
geometry$$1="Feature"===geojson.type?geojson.geometry:geojson;


if("GeometryCollection"===geometry$$1.type){
var results=[];




return geomEach(geojson,function(geometry$$1){var buffered=bufferFeature(geometry$$1,radius,units,steps);buffered&&results.push(buffered)}),featureCollection(results);
}


var
bbox$$1=bbox(geojson),
needsTransverseMercator=50<bbox$$1[1]&&50<bbox$$1[3],projected;


projected=needsTransverseMercator?{
type:geometry$$1.type,
coordinates:projectCoords(geometry$$1.coordinates,defineProjection(geometry$$1))}:


toMercator(geometry$$1);



var reader=new GeoJSONReader,
geom=reader.read(projected),
distance=radiansToLength(lengthToRadians(radius,units),"meters"),
buffered=BufferOp.bufferOp(geom,distance),
writer=new GeoJSONWriter;



if(buffered=writer.write(buffered),!coordsIsNaN(buffered.coordinates)){


var result;









return result=needsTransverseMercator?{type:buffered.type,coordinates:unprojectCoords(buffered.coordinates,defineProjection(geometry$$1))}:toWgs84(buffered),result.geometry?result:feature(result,properties)}
}








function coordsIsNaN(coords){return(
Array.isArray(coords[0])?coordsIsNaN(coords[0]):
isNaN(coords[0]));
}









function projectCoords(coords,proj){return(
"object"==typeof coords[0]?
coords.map(function(coord){
return projectCoords(coord,proj);
}):proj(coords));
}









function unprojectCoords(coords,proj){return(
"object"==typeof coords[0]?
coords.map(function(coord){
return unprojectCoords(coord,proj);
}):proj.invert(coords));
}








function defineProjection(geojson){
var coords=center(geojson).geometry.coordinates.reverse(),
rotate=coords.map(function(coord){return-coord});
return geoTransverseMercator().
center(coords).
rotate(rotate).
scale(earthRadius);
}




























function union(){



for(var reader=new GeoJSONReader,result=reader.read(JSON.stringify(arguments[0].geometry)),i=1;i<arguments.length;i++)
result=UnionOp.union(result,reader.read(JSON.stringify(arguments[i].geometry)));


var writer=new GeoJSONWriter;


return result=writer.write(result),{
type:"Feature",
geometry:result,
properties:arguments[0].properties};

}


































function intersect$2(poly1,poly2){
var geom1=getGeom(poly1),
geom2=getGeom(poly2);





if(4>cleanCoords(truncate(geom2,{precision:4})).coordinates[0].length)return null;
if(4>cleanCoords(truncate(geom1,{precision:4})).coordinates[0].length)return null;

var reader=new GeoJSONReader,
a=reader.read(truncate(geom1)),
b=reader.read(truncate(geom2)),
intersection=OverlayOp.intersection(a,b);


if(intersection.isEmpty())return null;

var writer=new GeoJSONWriter,
geom=writer.write(intersection);
return feature(geom);
}



















function _getClosest(item,array,getDiff){
var closest,
diff;

if(!Array.isArray(array))
throw new Error("Get closest expects an array as second argument");











return array.forEach(function(comparedItem,comparedItemIndex){var thisDiff=getDiff(comparedItem,item);0<=thisDiff&&("undefined"==typeof diff||thisDiff<diff)&&(diff=thisDiff,closest=comparedItemIndex)}),closest;
}

























function closestGreaterNumber(item,array){
return _getClosest(item,array,function(comparedItem,item){
return comparedItem-item;
});
}

























































function dissolve$1(featureCollection$$1,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");
var propertyName=options.propertyName;


collectionOf(featureCollection$$1,"Polygon","dissolve");


var fc=clone(featureCollection$$1),
features=fc.features,

originalIndexOfItemsRemoved=[];

features.forEach(function(f,i){
f.properties.origIndexPosition=i;
});
var tree=geojsonRbush();


for(var i in tree.load(fc),features){
var polygon$$1=features[i],

featureChanged=!1;











































if(tree.search(polygon$$1).features.forEach(function(potentialMatchingFeature){polygon$$1=features[i];var matchFeaturePosition=potentialMatchingFeature.properties.origIndexPosition;if(0<originalIndexOfItemsRemoved.length&&0!==matchFeaturePosition)if(matchFeaturePosition>originalIndexOfItemsRemoved[originalIndexOfItemsRemoved.length-1])matchFeaturePosition-=originalIndexOfItemsRemoved.length;else{var closestNumber$$1=closestGreaterNumber(matchFeaturePosition,originalIndexOfItemsRemoved);0!==closestNumber$$1&&(matchFeaturePosition-=closestNumber$$1)}if(matchFeaturePosition!==+i){var matchFeature=features[matchFeaturePosition];matchFeature&&polygon$$1&&(void 0===propertyName||matchFeature.properties[propertyName]===polygon$$1.properties[propertyName])&&booleanOverlap(polygon$$1,matchFeature)&&ringsIntersect(polygon$$1,matchFeature)&&(features[i]=union(polygon$$1,matchFeature),originalIndexOfItemsRemoved.push(potentialMatchingFeature.properties.origIndexPosition),originalIndexOfItemsRemoved.sort(function(a,b){return a-b}),tree.remove(potentialMatchingFeature),features.splice(matchFeaturePosition,1),polygon$$1.properties.origIndexPosition=i,tree.remove(polygon$$1,function(a,b){return a.properties.origIndexPosition===b.properties.origIndexPosition}),featureChanged=!0)}}),featureChanged){
if(!polygon$$1)continue;
polygon$$1.properties.origIndexPosition=i,
tree.insert(polygon$$1),
i--;
}
}






return features.forEach(function(f){delete f.properties.origIndexPosition,delete f.bbox}),fc;
}

function ringsIntersect(poly1,poly2){
var line1=lineString(coordAll(poly1)),
line2=lineString(coordAll(poly2)),
points$$1=lineIntersect(line1,line2).features;
return 0<points$$1.length;
}


























function hexGrid(bbox,cellSide,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");

var properties=options.properties||{},
triangles=options.triangles,
mask=options.mask;


if(null===cellSide||void 0===cellSide)throw new Error("cellSide is required");
if(!isNumber(cellSide))throw new Error("cellSide is invalid");
if(!bbox)throw new Error("bbox is required");
if(!Array.isArray(bbox))throw new Error("bbox must be array");
if(4!==bbox.length)throw new Error("bbox must contain 4 numbers");
if(mask&&-1===["Polygon","MultiPolygon"].indexOf(getType(mask)))throw new Error("options.mask must be a (Multi)Polygon");

var west=bbox[0],
south=bbox[1],
east=bbox[2],
north=bbox[3],
centerY=(south+north)/2,
centerX=(west+east)/2,


xFraction=2*cellSide/distance([west,centerY],[east,centerY],options),
cellWidth=xFraction*(east-west),
yFraction=2*cellSide/distance([centerX,south],[centerX,north],options),
cellHeight=yFraction*(north-south),
radius=cellWidth/2,

hex_width=2*radius,
hex_height=1.7320508075688772/2*cellHeight,

box_width=east-west,
box_height=north-south,

x_interval=3/4*hex_width,
y_interval=hex_height,


x_span=(box_width-hex_width)/(hex_width-radius/2),
x_count=_Mathfloor(x_span),

x_adjust=(x_count*x_interval-radius/2-box_width)/2-radius/2+x_interval/2,


y_count=_Mathfloor((box_height-hex_height)/hex_height),

y_adjust=(box_height-y_count*hex_height)/2,

hasOffsetY=y_count*hex_height-box_height>hex_height/2;
hasOffsetY&&(
y_adjust-=hex_height/4);





for(var cosines=[],sines=[],i=0,
angle;6>i;i++)angle=2*_MathPI/6*i,
cosines.push(_Mathcos(angle)),
sines.push(_Mathsin(angle));



for(var results=[],x=0;x<=x_count;x++)
for(var y=0,

isOdd;y<=y_count;y++)
if(isOdd=1==x%2,!(0===y&&isOdd)&&!(
0===y&&hasOffsetY)){

var center_x=x*x_interval+west-x_adjust,
center_y=y*y_interval+south+y_adjust;





if(isOdd&&(center_y-=hex_height/2),!0===triangles)
hexTriangles(
[center_x,center_y],
cellWidth/2,
cellHeight/2,
properties,
cosines,
sines).forEach(function(triangle){
mask?
intersect$2(mask,triangle)&&results.push(triangle):

results.push(triangle);

});else
{
var hex=hexagon(
[center_x,center_y],
cellWidth/2,
cellHeight/2,
properties,
cosines,
sines);

mask?
intersect$2(mask,hex)&&results.push(hex):

results.push(hex);

}}



return featureCollection(results);
}













function hexagon(center,rx,ry,properties,cosines,sines){

for(var vertices=[],i=0;6>i;i++){
var x=center[0]+rx*cosines[i],
y=center[1]+ry*sines[i];
vertices.push([x,y]);
}


return vertices.push(vertices[0].slice()),polygon([vertices],properties);
}













function hexTriangles(center,rx,ry,properties,cosines,sines){

for(var triangles=[],i=0,
vertices;6>i;i++)vertices=[],
vertices.push(center),
vertices.push([
center[0]+rx*cosines[i],
center[1]+ry*sines[i]]),

vertices.push([
center[0]+rx*cosines[(i+1)%6],
center[1]+ry*sines[(i+1)%6]]),

vertices.push(center),
triangles.push(polygon([vertices],properties));

return triangles;
}

















function mask(polygon$$1,mask){

var maskPolygon=createMask(mask),


separated=separatePolygons(polygon$$1),
polygonOuters=separated[0],
polygonInners=separated[1];


polygonOuters=unionPolygons(polygonOuters),
polygonInners=unionPolygons(polygonInners);


var masked=buildMask(maskPolygon,polygonOuters,polygonInners);
return masked;
}










function buildMask(maskPolygon,polygonOuters,polygonInners){
var coordinates=[];









return coordinates.push(maskPolygon.geometry.coordinates[0]),flattenEach(polygonOuters,function(feature$$1){coordinates.push(feature$$1.geometry.coordinates[0])}),flattenEach(polygonInners,function(feature$$1){coordinates.push(feature$$1.geometry.coordinates[0])}),polygon(coordinates);
}








function separatePolygons(poly){
var outers=[],
inners=[];









return flattenEach(poly,function(feature$$1){var coordinates=feature$$1.geometry.coordinates,featureOuter=coordinates[0],featureInner=coordinates.slice(1);outers.push(polygon([featureOuter])),featureInner.forEach(function(inner){inners.push(polygon([inner]))})}),[featureCollection(outers),featureCollection(inners)];
}








function createMask(mask){
var world=[[[180,90],[-180,90],[-180,-90],[180,-90],[180,90]]],
coordinates=mask&&mask.geometry.coordinates||world;
return polygon(coordinates);
}








function unionPolygons(polygons$$1){
if(1>=polygons$$1.features.length)return polygons$$1;

var tree=createIndex(polygons$$1),
results=[],
removed={};

































return flattenEach(polygons$$1,function(currentFeature,currentIndex){if(removed[currentIndex])return!0;for(tree.remove({index:currentIndex},filterByIndex),removed[currentIndex]=!0;!0;){var bbox$$1=bbox(currentFeature),search=tree.search({minX:bbox$$1[0],minY:bbox$$1[1],maxX:bbox$$1[2],maxY:bbox$$1[3]});if(0<search.length){var polys=search.map(function(item){return removed[item.index]=!0,tree.remove({index:item.index},filterByIndex),item.geojson});polys.push(currentFeature),currentFeature=union.apply(this,polys)}if(0===search.length)break}results.push(currentFeature)}),featureCollection(results);
}









function filterByIndex(a,b){
return a.index===b.index;
}








function createIndex(features){
var tree=rbush_1(),
load=[];












return flattenEach(features,function(feature$$1,index){var bbox$$1=bbox(feature$$1);load.push({minX:bbox$$1[0],minY:bbox$$1[1],maxX:bbox$$1[2],maxY:bbox$$1[3],geojson:feature$$1,index:index})}),tree.load(load),tree;
}






















function squareGrid(bbox,cellSide,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");

var properties=options.properties,
mask=options.mask,


results=[];


if(null===cellSide||void 0===cellSide)throw new Error("cellSide is required");
if(!isNumber(cellSide))throw new Error("cellSide is invalid");
if(!bbox)throw new Error("bbox is required");
if(!Array.isArray(bbox))throw new Error("bbox must be array");
if(4!==bbox.length)throw new Error("bbox must contain 4 numbers");
if(mask&&-1===["Polygon","MultiPolygon"].indexOf(getType(mask)))throw new Error("options.mask must be a (Multi)Polygon");























for(var west=bbox[0],south=bbox[1],east=bbox[2],north=bbox[3],xFraction=cellSide/distance([west,south],[east,south],options),cellWidth=xFraction*(east-west),yFraction=cellSide/distance([west,south],[west,north],options),cellHeight=yFraction*(north-south),bboxWidth=east-west,bboxHeight=north-south,columns=_Mathfloor(bboxWidth/cellWidth),rows=_Mathfloor(bboxHeight/cellHeight),deltaX=(bboxWidth-columns*cellWidth)/2,deltaY=(bboxHeight-rows*cellHeight)/2,currentX=west+deltaX,column=0,
currentY;column<columns;column++){currentY=south+deltaY;
for(var row=0,
cellPoly;row<rows;row++)cellPoly=polygon([[
[currentX,currentY],
[currentX,currentY+cellHeight],
[currentX+cellWidth,currentY+cellHeight],
[currentX+cellWidth,currentY],
[currentX,currentY]]],
properties),
mask?
intersect$2(mask,cellPoly)&&results.push(cellPoly):

results.push(cellPoly),


currentY+=cellHeight;

currentX+=cellWidth;
}
return featureCollection(results);
}






















function triangleGrid(bbox,cellSide,options){


if(options=options||{},!isObject(options))throw new Error("options is invalid");

var properties=options.properties,
mask=options.mask,


results=[];


if(null===cellSide||void 0===cellSide)throw new Error("cellSide is required");
if(!isNumber(cellSide))throw new Error("cellSide is invalid");
if(!bbox)throw new Error("bbox is required");
if(!Array.isArray(bbox))throw new Error("bbox must be array");
if(4!==bbox.length)throw new Error("bbox must contain 4 numbers");
if(mask&&-1===["Polygon","MultiPolygon"].indexOf(getType(mask)))throw new Error("options.mask must be a (Multi)Polygon");for(


var xFraction=cellSide/distance([bbox[0],bbox[1]],[bbox[2],bbox[1]],options),
cellWidth=xFraction*(bbox[2]-bbox[0]),
yFraction=cellSide/distance([bbox[0],bbox[1]],[bbox[0],bbox[3]],options),
cellHeight=yFraction*(bbox[3]-bbox[1]),

xi=0,
currentX=bbox[0];
currentX<=bbox[2];){for(
var yi=0,
currentY=bbox[1];
currentY<=bbox[3];){
var cellTriangle1=null,
cellTriangle2=null;

0==xi%2&&0==yi%2?(
cellTriangle1=polygon([[
[currentX,currentY],
[currentX,currentY+cellHeight],
[currentX+cellWidth,currentY],
[currentX,currentY]]],
properties),
cellTriangle2=polygon([[
[currentX,currentY+cellHeight],
[currentX+cellWidth,currentY+cellHeight],
[currentX+cellWidth,currentY],
[currentX,currentY+cellHeight]]],
properties)):
0==xi%2&&1==yi%2?(
cellTriangle1=polygon([[
[currentX,currentY],
[currentX+cellWidth,currentY+cellHeight],
[currentX+cellWidth,currentY],
[currentX,currentY]]],
properties),
cellTriangle2=polygon([[
[currentX,currentY],
[currentX,currentY+cellHeight],
[currentX+cellWidth,currentY+cellHeight],
[currentX,currentY]]],
properties)):
0==yi%2&&1==xi%2?(
cellTriangle1=polygon([[
[currentX,currentY],
[currentX,currentY+cellHeight],
[currentX+cellWidth,currentY+cellHeight],
[currentX,currentY]]],
properties),
cellTriangle2=polygon([[
[currentX,currentY],
[currentX+cellWidth,currentY+cellHeight],
[currentX+cellWidth,currentY],
[currentX,currentY]]],
properties)):
1==yi%2&&1==xi%2&&(
cellTriangle1=polygon([[
[currentX,currentY],
[currentX,currentY+cellHeight],
[currentX+cellWidth,currentY],
[currentX,currentY]]],
properties),
cellTriangle2=polygon([[
[currentX,currentY+cellHeight],
[currentX+cellWidth,currentY+cellHeight],
[currentX+cellWidth,currentY],
[currentX,currentY+cellHeight]]],
properties)),

mask?(
intersect$2(mask,cellTriangle1)&&results.push(cellTriangle1),
intersect$2(mask,cellTriangle2)&&results.push(cellTriangle2)):(

results.push(cellTriangle1),
results.push(cellTriangle2)),


currentY+=cellHeight,
yi++;
}
xi++,
currentX+=cellWidth;
}
return featureCollection(results);
}


























function interpolate$1(points$$1,cellSize,options){


if(options=options||{},"object"!=typeof options)throw new Error("options is invalid");
var gridType=options.gridType,
property=options.property,
weight=options.weight;


if(!points$$1)throw new Error("points is required");

if(collectionOf(points$$1,"Point","input must contain Points"),!cellSize)throw new Error("cellSize is required");
if(void 0!==weight&&"number"!=typeof weight)throw new Error("weight must be a number");


property=property||"elevation",
gridType=gridType||"square",
weight=weight||1;

var box=bbox(points$$1),
grid;
switch(gridType){
case"point":
case"points":
grid=pointGrid(box,cellSize,options);
break;
case"square":
case"squares":
grid=squareGrid(box,cellSize,options);
break;
case"hex":
case"hexes":
grid=hexGrid(box,cellSize,options);
break;
case"triangle":
case"triangles":
grid=triangleGrid(box,cellSize,options);
break;
default:
throw new Error("invalid gridType");}

var results=[];






















return featureEach(grid,function(gridFeature){var zw=0,sw=0;featureEach(points$$1,function(point$$1){var gridPoint="point"===gridType?gridFeature:centroid(gridFeature),d=distance(gridPoint,point$$1,options),zValue;if(void 0!==property&&(zValue=point$$1.properties[property]),void 0===zValue&&(zValue=point$$1.geometry.coordinates[2]),void 0===zValue)throw new Error("zValue is missing");0===d&&(zw=zValue);var w=1/_Mathpow(d,weight);sw+=w,zw+=w*zValue});var newFeature=clone(gridFeature);newFeature.properties[property]=zw/sw,results.push(newFeature)}),featureCollection(results);
}var _Mathtrunc=Math.trunc,_NumberisNaN=Number.isNaN,_NumberparseFloat=Number.parseFloat,_NumberisFinite=Number.isFinite,_NumberMAX_VALUE=Number.MAX_VALUE,_Mathsign=Math.sign,_NumberisInteger=Number.isInteger,_Mathatan2=Math.atan,_Mathtan=Math.tan,_Mathasin=Math.asin,_MathLN=Math.LN2,_Mathatan=Math.atan2,_Mathcos=Math.cos,_Mathsin=Math.sin,_Mathceil=Math.ceil,_Mathmin=Math.min,_Mathmax=Math.max,_Mathfloor=Math.floor,_Mathsqrt=Math.sqrt,_Mathexp=Math.exp,_Mathlog=Math.log,_Mathabs=Math.abs,_MathPI=Math.PI,_Mathround=Math.round,_Mathpow=Math.pow,earthRadius=6371008.8,factors={meters:earthRadius,metres:earthRadius,millimeters:1e3*earthRadius,millimetres:1e3*earthRadius,centimeters:100*earthRadius,centimetres:100*earthRadius,kilometers:earthRadius/1e3,kilometres:earthRadius/1e3,miles:earthRadius/1609.344,nauticalmiles:earthRadius/1852,inches:39.37*earthRadius,yards:earthRadius/1.0936,feet:3.28084*earthRadius,radians:1,degrees:earthRadius/111325},unitsFactors={meters:1,metres:1,millimeters:1e3,millimetres:1e3,centimeters:100,centimetres:100,kilometers:1/1e3,kilometres:1/1e3,miles:1/1609.344,nauticalmiles:1/1852,inches:39.37,yards:1/1.0936,feet:3.28084,radians:1/earthRadius,degrees:1/111325},areaFactors={meters:1,metres:1,millimeters:1e6,millimetres:1e6,centimeters:1e4,centimetres:1e4,kilometers:1e-6,kilometres:1e-6,acres:2.47105e-4,miles:3.86e-7,yards:1.195990046,feet:10.763910417,inches:1550.003100006},main_es$1=Object.freeze({earthRadius:earthRadius,factors:factors,unitsFactors:unitsFactors,areaFactors:areaFactors,feature:feature,geometry:geometry,point:point,points:points,polygon:polygon,polygons:polygons,lineString:lineString,lineStrings:lineStrings,featureCollection:featureCollection,multiLineString:multiLineString,multiPoint:multiPoint,multiPolygon:multiPolygon,geometryCollection:geometryCollection,round:round,radiansToLength:radiansToLength,lengthToRadians:lengthToRadians,lengthToDegrees:lengthToDegrees,bearingToAzimuth:bearingToAzimuth,radiansToDegrees:radiansToDegrees,degreesToRadians:degreesToRadians,convertLength:convertLength,convertArea:convertArea,isNumber:isNumber,isObject:isObject,validateBBox:validateBBox,validateId:validateId,radians2degrees:radians2degrees,degrees2radians:degrees2radians,distanceToDegrees:distanceToDegrees,distanceToRadians:distanceToRadians,radiansToDistance:radiansToDistance,bearingToAngle:bearingToAngle,convertDistance:convertDistance}),main_es=Object.freeze({coordEach:coordEach,coordReduce:coordReduce,propEach:propEach,propReduce:propReduce,featureEach:featureEach,featureReduce:featureReduce,coordAll:coordAll,geomEach:geomEach,geomReduce:geomReduce,flattenEach:flattenEach,flattenReduce:flattenReduce,segmentEach:segmentEach,segmentReduce:segmentReduce,lineEach:lineEach,lineReduce:lineReduce}),main_es$2=Object.freeze({getCoord:getCoord,getCoords:getCoords,containsNumber:containsNumber,geojsonType:geojsonType,featureOf:featureOf,collectionOf:collectionOf,getGeom:getGeom,getGeomType:getGeomType,getType:getType}),defaultSettings={successCallback:null,verbose:!1},settings={},quickselect=partialSort,rbush_1=rbush;rbush.prototype={all:function(){return this._all(this.data,[])},search:function(bbox){var node=this.data,result=[],toBBox=this.toBBox;if(!intersects$1(bbox,node))return result;for(var nodesToSearch=[],i,len,child,childBBox;node;){for(i=0,len=node.children.length;i<len;i++)child=node.children[i],childBBox=node.leaf?toBBox(child):child,intersects$1(bbox,childBBox)&&(node.leaf?result.push(child):contains(bbox,childBBox)?this._all(child,result):nodesToSearch.push(child));node=nodesToSearch.pop()}return result},collides:function(bbox){var node=this.data,toBBox=this.toBBox;if(!intersects$1(bbox,node))return!1;for(var nodesToSearch=[],i,len,child,childBBox;node;){for(i=0,len=node.children.length;i<len;i++)if(child=node.children[i],childBBox=node.leaf?toBBox(child):child,intersects$1(bbox,childBBox)){if(node.leaf||contains(bbox,childBBox))return!0;nodesToSearch.push(child)}node=nodesToSearch.pop()}return!1},load:function(data){if(!(data&&data.length))return this;if(data.length<this._minEntries){for(var i=0,len=data.length;i<len;i++)this.insert(data[i]);return this}var node=this._build(data.slice(),0,data.length-1,0);if(!this.data.children.length)this.data=node;else if(this.data.height===node.height)this._splitRoot(this.data,node);else{if(this.data.height<node.height){var tmpNode=this.data;this.data=node,node=tmpNode}this._insert(node,this.data.height-node.height-1,!0)}return this},insert:function(item){return item&&this._insert(item,this.data.height-1),this},clear:function(){return this.data=createNode([]),this},remove:function(item,equalsFn){if(!item)return this;for(var node=this.data,bbox=this.toBBox(item),path=[],indexes=[],i,parent,index,goingUp;node||path.length;){if(node||(node=path.pop(),parent=path[path.length-1],i=indexes.pop(),goingUp=!0),node.leaf&&(index=findItem(item,node.children,equalsFn),-1!==index))return node.children.splice(index,1),path.push(node),this._condense(path),this;goingUp||node.leaf||!contains(node,bbox)?parent?(i++,node=parent.children[i],goingUp=!1):node=null:(path.push(node),indexes.push(i),i=0,parent=node,node=node.children[0])}return this},toBBox:function(item){return item},compareMinX:compareNodeMinX,compareMinY:compareNodeMinY,toJSON:function(){return this.data},fromJSON:function(data){return this.data=data,this},_all:function(node,result){for(var nodesToSearch=[];node;)node.leaf?result.push.apply(result,node.children):nodesToSearch.push.apply(nodesToSearch,node.children),node=nodesToSearch.pop();return result},_build:function(items,left,right,height){var N=right-left+1,M=this._maxEntries,node;if(N<=M)return node=createNode(items.slice(left,right+1)),calcBBox(node,this.toBBox),node;height||(height=_Mathceil(_Mathlog(N)/_Mathlog(M)),M=_Mathceil(N/_Mathpow(M,height-1))),node=createNode([]),node.leaf=!1,node.height=height;var N2=_Mathceil(N/M),N1=N2*_Mathceil(_Mathsqrt(M)),i,j,right2,right3;for(multiSelect(items,left,right,N1,this.compareMinX),i=left;i<=right;i+=N1)for(right2=_Mathmin(i+N1-1,right),multiSelect(items,i,right2,N2,this.compareMinY),j=i;j<=right2;j+=N2)right3=_Mathmin(j+N2-1,right2),node.children.push(this._build(items,j,right3,height-1));return calcBBox(node,this.toBBox),node},_chooseSubtree:function(bbox,node,level,path){for(var i,len,child,targetNode,area,enlargement,minArea,minEnlargement;path.push(node),!(node.leaf||path.length-1===level);){for(minArea=minEnlargement=Infinity,i=0,len=node.children.length;i<len;i++)child=node.children[i],area=bboxArea(child),enlargement=enlargedArea(bbox,child)-area,enlargement<minEnlargement?(minEnlargement=enlargement,minArea=area<minArea?area:minArea,targetNode=child):enlargement===minEnlargement&&area<minArea&&(minArea=area,targetNode=child);node=targetNode||node.children[0]}return node},_insert:function(item,level,isNode){var toBBox=this.toBBox,bbox=isNode?item:toBBox(item),insertPath=[],node=this._chooseSubtree(bbox,this.data,level,insertPath);for(node.children.push(item),extend(node,bbox);0<=level&&insertPath[level].children.length>this._maxEntries;)this._split(insertPath,level),level--;this._adjustParentBBoxes(bbox,insertPath,level)},_split:function(insertPath,level){var node=insertPath[level],M=node.children.length,m=this._minEntries;this._chooseSplitAxis(node,m,M);var splitIndex=this._chooseSplitIndex(node,m,M),newNode=createNode(node.children.splice(splitIndex,node.children.length-splitIndex));newNode.height=node.height,newNode.leaf=node.leaf,calcBBox(node,this.toBBox),calcBBox(newNode,this.toBBox),level?insertPath[level-1].children.push(newNode):this._splitRoot(node,newNode)},_splitRoot:function(node,newNode){this.data=createNode([node,newNode]),this.data.height=node.height+1,this.data.leaf=!1,calcBBox(this.data,this.toBBox)},_chooseSplitIndex:function(node,m,M){var i,bbox1,bbox2,overlap,area,minOverlap,minArea,index;for(minOverlap=minArea=Infinity,i=m;i<=M-m;i++)bbox1=distBBox(node,0,i,this.toBBox),bbox2=distBBox(node,i,M,this.toBBox),overlap=intersectionArea(bbox1,bbox2),area=bboxArea(bbox1)+bboxArea(bbox2),overlap<minOverlap?(minOverlap=overlap,index=i,minArea=area<minArea?area:minArea):overlap===minOverlap&&area<minArea&&(minArea=area,index=i);return index},_chooseSplitAxis:function(node,m,M){var compareMinX=node.leaf?this.compareMinX:compareNodeMinX,compareMinY=node.leaf?this.compareMinY:compareNodeMinY,xMargin=this._allDistMargin(node,m,M,compareMinX),yMargin=this._allDistMargin(node,m,M,compareMinY);xMargin<yMargin&&node.children.sort(compareMinX)},_allDistMargin:function(node,m,M,compare){node.children.sort(compare);var toBBox=this.toBBox,leftBBox=distBBox(node,0,m,toBBox),rightBBox=distBBox(node,M-m,M,toBBox),margin=bboxMargin(leftBBox)+bboxMargin(rightBBox),i,child;for(i=m;i<M-m;i++)child=node.children[i],extend(leftBBox,node.leaf?toBBox(child):child),margin+=bboxMargin(leftBBox);for(i=M-m-1;i>=m;i--)child=node.children[i],extend(rightBBox,node.leaf?toBBox(child):child),margin+=bboxMargin(rightBBox);return margin},_adjustParentBBoxes:function(bbox,path,level){for(var i=level;0<=i;i--)extend(path[i],bbox)},_condense:function(path){for(var i=path.length-1,siblings;0<=i;i--)0===path[i].children.length?0<i?(siblings=path[i-1].children,siblings.splice(siblings.indexOf(path[i]),1)):this.clear():calcBBox(path[i],this.toBBox)},_initFormat:function(format){var compareArr=["return a"," - b",";"];this.compareMinX=new Function("a","b",compareArr.join(format[0])),this.compareMinY=new Function("a","b",compareArr.join(format[1])),this.toBBox=new Function("a","return {minX: a"+format[0]+", minY: a"+format[1]+", maxX: a"+format[2]+", maxY: a"+format[3]+"};")}};var twoProduct_1=twoProduct,SPLITTER=134217729,robustSum=linearExpansionSum,twoSum=fastTwoSum,robustScale=scaleLinearExpansion,robustDiff=robustSubtract,orientation_1=createCommonjsModule(function(module){function cofactor(m,c){for(var result=Array(m.length-1),i=1,r;i<m.length;++i){r=result[i-1]=Array(m.length-1);for(var j=0,k=0;j<m.length;++j)j!==c&&(r[k++]=m[i][j])}return result}function matrix(n){for(var result=Array(n),i=0;i<n;++i){result[i]=Array(n);for(var j=0;j<n;++j)result[i][j]=["m",j,"[",n-i-1,"]"].join("")}return result}function sign(n){return 1&n?"-":""}function generateSum(expr){if(1===expr.length)return expr[0];if(2===expr.length)return["sum(",expr[0],",",expr[1],")"].join("");var m=expr.length>>1;return["sum(",generateSum(expr.slice(0,m)),",",generateSum(expr.slice(m)),")"].join("")}function determinant(m){if(2===m.length)return[["sum(prod(",m[0][0],",",m[1][1],"),prod(-",m[0][1],",",m[1][0],"))"].join("")];for(var expr=[],i=0;i<m.length;++i)expr.push(["scale(",generateSum(determinant(cofactor(m,i))),",",sign(i),m[0][i],")"].join(""));return expr}function orientation(n){for(var pos=[],neg=[],m=matrix(n),args=[],i=0;i<n;++i)0==(1&i)?pos.push.apply(pos,determinant(cofactor(m,i))):neg.push.apply(neg,determinant(cofactor(m,i))),args.push("m"+i);var posExpr=generateSum(pos),negExpr=generateSum(neg),funcName="orientation"+n+"Exact",code=["function ",funcName,"(",args.join(),"){var p=",posExpr,",n=",negExpr,",d=sub(p,n);return d[d.length-1];};return ",funcName].join(""),proc=new Function("sum","prod","scale","sub",code);return proc(robustSum,twoProduct_1,robustScale,robustDiff)}function slowOrient(args){var proc=CACHED[args.length];return proc||(proc=CACHED[args.length]=orientation(args.length)),proc.apply(void 0,args)}function generateOrientationProc(){for(;CACHED.length<=NUM_EXPAND;)CACHED.push(orientation(CACHED.length));for(var args=[],procArgs=["slow"],i=0;i<=NUM_EXPAND;++i)args.push("a"+i),procArgs.push("o"+i);for(var code=["function getOrientation(",args.join(),"){switch(arguments.length){case 0:case 1:return 0;"],i=2;i<=NUM_EXPAND;++i)code.push("case ",i,":return o",i,"(",args.slice(0,i).join(),");");code.push("}var s=new Array(arguments.length);for(var i=0;i<arguments.length;++i){s[i]=arguments[i]};return slow(s);}return getOrientation"),procArgs.push(code.join(""));var proc=Function.apply(void 0,procArgs);module.exports=proc.apply(void 0,[slowOrient].concat(CACHED));for(var i=0;i<=NUM_EXPAND;++i)module.exports[i]=CACHED[i]}var NUM_EXPAND=5,EPSILON=1.1102230246251565e-16,ERRBOUND3=(3+16*EPSILON)*EPSILON,ERRBOUND4=(7+56*EPSILON)*EPSILON,orientation3Exact=orientation(3),orientation4Exact=orientation(4),CACHED=[function orientation0(){return 0},function orientation1(){return 0},function orientation2(a,b){return b[0]-a[0]},function orientation3(a,b,c){var l=(a[1]-c[1])*(b[0]-c[0]),r=(a[0]-c[0])*(b[1]-c[1]),det=l-r,s;if(0<l){if(0>=r)return det;s=l+r}else if(0>l){if(0<=r)return det;s=-(l+r)}else return det;var tol=ERRBOUND3*s;return det>=tol||det<=-tol?det:orientation3Exact(a,b,c)},function orientation4(a,b,c,d){var adx=a[0]-d[0],bdx=b[0]-d[0],cdx=c[0]-d[0],ady=a[1]-d[1],bdy=b[1]-d[1],cdy=c[1]-d[1],adz=a[2]-d[2],bdz=b[2]-d[2],cdz=c[2]-d[2],bdxcdy=bdx*cdy,cdxbdy=cdx*bdy,cdxady=cdx*ady,adxcdy=adx*cdy,adxbdy=adx*bdy,bdxady=bdx*ady,det=adz*(bdxcdy-cdxbdy)+bdz*(cdxady-adxcdy)+cdz*(adxbdy-bdxady),permanent=(_Mathabs(bdxcdy)+_Mathabs(cdxbdy))*_Mathabs(adz)+(_Mathabs(cdxady)+_Mathabs(adxcdy))*_Mathabs(bdz)+(_Mathabs(adxbdy)+_Mathabs(bdxady))*_Mathabs(cdz),tol=ERRBOUND4*permanent;return det>tol||-det>tol?det:orientation4Exact(a,b,c,d)}];generateOrientationProc()}),monotoneConvexHull2d=monotoneConvexHull2D,orient$1=orientation_1[3],tinyqueue=TinyQueue,default_1$1=TinyQueue;TinyQueue.prototype={push:function(item){this.data.push(item),this.length++,this._up(this.length-1)},pop:function(){if(0!==this.length){var top=this.data[0];return this.length--,0<this.length&&(this.data[0]=this.data[this.length],this._down(0)),this.data.pop(),top}},peek:function(){return this.data[0]},_up:function(pos){for(var data=this.data,compare=this.compare,item=data[pos];0<pos;){var parent=pos-1>>1,current=data[parent];if(0<=compare(item,current))break;data[pos]=current,pos=parent}data[pos]=item},_down:function(pos){for(var data=this.data,compare=this.compare,halfLength=this.length>>1,item=data[pos];pos<halfLength;){var left=(pos<<1)+1,right=left+1,best=data[left];if(right<this.length&&0>compare(data[right],best)&&(left=right,best=data[right]),0<=compare(best,item))break;data[pos]=best,pos=left}data[pos]=item}},tinyqueue.default=default_1$1;var pointInPolygon=function(point,vs){for(var x=point[0],y=point[1],inside=!1,i=0,j=vs.length-1;i<vs.length;j=i++){var xi=vs[i][0],yi=vs[i][1],xj=vs[j][0],yj=vs[j][1],intersect=yi>y!=yj>y&&x<(xj-xi)*(y-yi)/(yj-yi)+xi;intersect&&(inside=!inside)}return inside},orient=orientation_1[3],concaveman_1=concaveman,default_1=concaveman;concaveman_1.default=default_1;var identity=function(x){return x},transform=function(transform){if(null==transform)return identity;var kx=transform.scale[0],ky=transform.scale[1],dx=transform.translate[0],dy=transform.translate[1],x0,y0;return function(input,i){i||(x0=y0=0);var j=2,n=input.length,output=Array(n);for(output[0]=(x0+=input[0])*kx+dx,output[1]=(y0+=input[1])*ky+dy;j<n;)output[j]=input[j],++j;return output}},reverse=function(array,n){for(var j=array.length,i=j-n,t;i<--j;)t=array[i],array[i++]=array[j],array[j]=t},stitch=function(topology,arcs){function ends(i){var arc=topology.arcs[0>i?~i:i],p0=arc[0],p1;return topology.transform?(p1=[0,0],arc.forEach(function(dp){p1[0]+=dp[0],p1[1]+=dp[1]})):p1=arc[arc.length-1],0>i?[p1,p0]:[p0,p1]}function flush(fragmentByEnd,fragmentByStart){for(var k in fragmentByEnd){var f=fragmentByEnd[k];delete fragmentByStart[f.start],delete f.start,delete f.end,f.forEach(function(i){stitchedArcs[0>i?~i:i]=1}),fragments.push(f)}}var stitchedArcs={},fragmentByStart={},fragmentByEnd={},fragments=[],emptyIndex=-1;return arcs.forEach(function(i,j){var arc=topology.arcs[0>i?~i:i],t;!(3>arc.length)||arc[1][0]||arc[1][1]||(t=arcs[++emptyIndex],arcs[emptyIndex]=i,arcs[j]=t)}),arcs.forEach(function(i){var e=ends(i),start=e[0],end=e[1],f,g;if(f=fragmentByEnd[start]){if(delete fragmentByEnd[f.end],f.push(i),f.end=end,g=fragmentByStart[end]){delete fragmentByStart[g.start];var fg=g==f?f:f.concat(g);fragmentByStart[fg.start=f.start]=fragmentByEnd[fg.end=g.end]=fg}else fragmentByStart[f.start]=fragmentByEnd[f.end]=f;}else if(!(f=fragmentByStart[end]))f=[i],fragmentByStart[f.start=start]=fragmentByEnd[f.end=end]=f;else if(delete fragmentByStart[f.start],f.unshift(i),f.start=start,g=fragmentByEnd[start]){delete fragmentByEnd[g.end];var gf=g===f?f:g.concat(f);fragmentByStart[gf.start=g.start]=fragmentByEnd[gf.end=f.end]=gf}else fragmentByStart[f.start]=fragmentByEnd[f.end]=f}),flush(fragmentByEnd,fragmentByStart),flush(fragmentByStart,fragmentByEnd),arcs.forEach(function(i){stitchedArcs[0>i?~i:i]||fragments.push([i])}),fragments},merge=function(topology){return object(topology,mergeArcs.apply(this,arguments))},bounds=function(objects){function boundGeometry(geometry){null!=geometry&&boundGeometryType.hasOwnProperty(geometry.type)&&boundGeometryType[geometry.type](geometry)}function boundPoint(coordinates){var x=coordinates[0],y=coordinates[1];x<x0&&(x0=x),x>x1&&(x1=x),y<y0&&(y0=y),y>y1&&(y1=y)}function boundLine(coordinates){coordinates.forEach(boundPoint)}function boundMultiLine(coordinates){coordinates.forEach(boundLine)}var x0=Infinity,y0=Infinity,x1=-Infinity,y1=-Infinity,boundGeometryType={GeometryCollection:function(o){o.geometries.forEach(boundGeometry)},Point:function(o){boundPoint(o.coordinates)},MultiPoint:function(o){o.coordinates.forEach(boundPoint)},LineString:function(o){boundLine(o.arcs)},MultiLineString:function(o){o.arcs.forEach(boundLine)},Polygon:function(o){o.arcs.forEach(boundLine)},MultiPolygon:function(o){o.arcs.forEach(boundMultiLine)}};for(var key in objects)boundGeometry(objects[key]);return x1>=x0&&y1>=y0?[x0,y0,x1,y1]:void 0},hashset=function(size,hash,equal,type,empty){function add(value){for(var index=hash(value)&mask,match=store[index],collisions=0;match!=empty;){if(equal(match,value))return!0;if(++collisions>=size)throw new Error("full hashset");match=store[index=index+1&mask]}return store[index]=value,!0}function has(value){for(var index=hash(value)&mask,match=store[index],collisions=0;match!=empty;){if(equal(match,value))return!0;if(++collisions>=size)break;match=store[index=index+1&mask]}return!1}function values(){for(var values=[],i=0,n=store.length,match;i<n;++i)match=store[i],match!=empty&&values.push(match);return values}3===arguments.length&&(type=Array,empty=null);for(var store=new type(size=1<<_Mathmax(4,_Mathceil(_Mathlog(size)/_MathLN))),mask=size-1,i=0;i<size;++i)store[i]=empty;return{add:add,has:has,values:values}},hashmap=function(size,hash,equal,keyType,keyEmpty,valueType){function set(key,value){for(var index=hash(key)&mask,matchKey=keystore[index],collisions=0;matchKey!=keyEmpty;){if(equal(matchKey,key))return valstore[index]=value;if(++collisions>=size)throw new Error("full hashmap");matchKey=keystore[index=index+1&mask]}return keystore[index]=key,valstore[index]=value,value}function maybeSet(key,value){for(var index=hash(key)&mask,matchKey=keystore[index],collisions=0;matchKey!=keyEmpty;){if(equal(matchKey,key))return valstore[index];if(++collisions>=size)throw new Error("full hashmap");matchKey=keystore[index=index+1&mask]}return keystore[index]=key,valstore[index]=value,value}function get(key,missingValue){for(var index=hash(key)&mask,matchKey=keystore[index],collisions=0;matchKey!=keyEmpty;){if(equal(matchKey,key))return valstore[index];if(++collisions>=size)break;matchKey=keystore[index=index+1&mask]}return missingValue}function keys(){for(var keys=[],i=0,n=keystore.length,matchKey;i<n;++i)matchKey=keystore[i],matchKey!=keyEmpty&&keys.push(matchKey);return keys}3===arguments.length&&(keyType=valueType=Array,keyEmpty=null);for(var keystore=new keyType(size=1<<_Mathmax(4,_Mathceil(_Mathlog(size)/_MathLN))),valstore=new valueType(size),mask=size-1,i=0;i<size;++i)keystore[i]=keyEmpty;return{set:set,maybeSet:maybeSet,get:get,keys:keys}},equalPoint=function(pointA,pointB){return pointA[0]===pointB[0]&&pointA[1]===pointB[1]},buffer=new ArrayBuffer(16),floats=new Float64Array(buffer),uints=new Uint32Array(buffer),hashPoint=function(point){floats[0]=point[0],floats[1]=point[1];var hash=uints[0]^uints[1];return hash=hash<<5^hash>>7^uints[2]^uints[3],2147483647&hash},join=function(topology){function sequence(i,previousIndex,currentIndex,nextIndex){if(visitedByIndex[currentIndex]!==i){visitedByIndex[currentIndex]=i;var leftIndex=leftByIndex[currentIndex];if(0<=leftIndex){var rightIndex=rightByIndex[currentIndex];(leftIndex!==previousIndex||rightIndex!==nextIndex)&&(leftIndex!==nextIndex||rightIndex!==previousIndex)&&(++junctionCount,junctionByIndex[currentIndex]=1)}else leftByIndex[currentIndex]=previousIndex,rightByIndex[currentIndex]=nextIndex}}function index(){for(var indexByPoint=hashmap(1.4*coordinates.length,hashIndex,equalIndex,Int32Array,-1,Int32Array),indexes=new Int32Array(coordinates.length),i=0,n=coordinates.length;i<n;++i)indexes[i]=indexByPoint.maybeSet(i,i);return indexes}function hashIndex(i){return hashPoint(coordinates[i])}function equalIndex(i,j){return equalPoint(coordinates[i],coordinates[j])}var coordinates=topology.coordinates,lines=topology.lines,rings=topology.rings,indexes=index(),visitedByIndex=new Int32Array(coordinates.length),leftByIndex=new Int32Array(coordinates.length),rightByIndex=new Int32Array(coordinates.length),junctionByIndex=new Int8Array(coordinates.length),junctionCount=0,i,n,previousIndex,currentIndex,nextIndex;for(i=0,n=coordinates.length;i<n;++i)visitedByIndex[i]=leftByIndex[i]=rightByIndex[i]=-1;for(i=0,n=lines.length;i<n;++i){var line=lines[i],lineStart=line[0],lineEnd=line[1];for(currentIndex=indexes[lineStart],nextIndex=indexes[++lineStart],++junctionCount,junctionByIndex[currentIndex]=1;++lineStart<=lineEnd;)sequence(i,previousIndex=currentIndex,currentIndex=nextIndex,nextIndex=indexes[lineStart]);++junctionCount,junctionByIndex[nextIndex]=1}for(i=0,n=coordinates.length;i<n;++i)visitedByIndex[i]=-1;for(i=0,n=rings.length;i<n;++i){var ring=rings[i],ringStart=ring[0]+1,ringEnd=ring[1];for(previousIndex=indexes[ringEnd-1],currentIndex=indexes[ringStart-1],nextIndex=indexes[ringStart],sequence(i,previousIndex,currentIndex,nextIndex);++ringStart<=ringEnd;)sequence(i,previousIndex=currentIndex,currentIndex=nextIndex,nextIndex=indexes[ringStart])}visitedByIndex=leftByIndex=rightByIndex=null;var junctionByPoint=hashset(1.4*junctionCount,hashPoint,equalPoint),j;for(i=0,n=coordinates.length;i<n;++i)junctionByIndex[j=indexes[i]]&&junctionByPoint.add(coordinates[j]);return junctionByPoint},cut=function(topology){var junctions=join(topology),coordinates=topology.coordinates,lines=topology.lines,rings=topology.rings,next,i,n;for(i=0,n=lines.length;i<n;++i)for(var line=lines[i],lineMid=line[0],lineEnd=line[1];++lineMid<lineEnd;)junctions.has(coordinates[lineMid])&&(next={0:lineMid,1:line[1]},line[1]=lineMid,line=line.next=next);for(i=0,n=rings.length;i<n;++i)for(var ring=rings[i],ringStart=ring[0],ringMid=ringStart,ringEnd=ring[1],ringFixed=junctions.has(coordinates[ringStart]);++ringMid<ringEnd;)junctions.has(coordinates[ringMid])&&(ringFixed?(next={0:ringMid,1:ring[1]},ring[1]=ringMid,ring=ring.next=next):(rotateArray(coordinates,ringStart,ringEnd,ringEnd-ringMid),coordinates[ringEnd]=coordinates[ringStart],ringFixed=!0,ringMid=ringStart));return topology},dedup$1=function(topology){function dedupLine(arc){var startPoint,endPoint,startArcs,startArc,endArcs,endArc,i,n;if(startArcs=arcsByEnd.get(startPoint=coordinates[arc[0]]))for(i=0,n=startArcs.length;i<n;++i)if(startArc=startArcs[i],equalLine(startArc,arc))return arc[0]=startArc[0],void(arc[1]=startArc[1]);if(endArcs=arcsByEnd.get(endPoint=coordinates[arc[1]]))for(i=0,n=endArcs.length;i<n;++i)if(endArc=endArcs[i],reverseEqualLine(endArc,arc))return arc[1]=endArc[0],void(arc[0]=endArc[1]);startArcs?startArcs.push(arc):arcsByEnd.set(startPoint,[arc]),endArcs?endArcs.push(arc):arcsByEnd.set(endPoint,[arc]),arcs.push(arc)}function dedupRing(arc){var endPoint,endArcs,endArc,i,n;if(endArcs=arcsByEnd.get(endPoint=coordinates[arc[0]]))for(i=0,n=endArcs.length;i<n;++i){if(endArc=endArcs[i],equalRing(endArc,arc))return arc[0]=endArc[0],void(arc[1]=endArc[1]);if(reverseEqualRing(endArc,arc))return arc[0]=endArc[1],void(arc[1]=endArc[0])}if(endArcs=arcsByEnd.get(endPoint=coordinates[arc[0]+findMinimumOffset(arc)]))for(i=0,n=endArcs.length;i<n;++i){if(endArc=endArcs[i],equalRing(endArc,arc))return arc[0]=endArc[0],void(arc[1]=endArc[1]);if(reverseEqualRing(endArc,arc))return arc[0]=endArc[1],void(arc[1]=endArc[0])}endArcs?endArcs.push(arc):arcsByEnd.set(endPoint,[arc]),arcs.push(arc)}function equalLine(arcA,arcB){var ia=arcA[0],ib=arcB[0],ja=arcA[1],jb=arcB[1];if(ia-ja!=ib-jb)return!1;for(;ia<=ja;++ia,++ib)if(!equalPoint(coordinates[ia],coordinates[ib]))return!1;return!0}function reverseEqualLine(arcA,arcB){var ia=arcA[0],ib=arcB[0],ja=arcA[1],jb=arcB[1];if(ia-ja!=ib-jb)return!1;for(;ia<=ja;++ia,--jb)if(!equalPoint(coordinates[ia],coordinates[jb]))return!1;return!0}function equalRing(arcA,arcB){var ia=arcA[0],ib=arcB[0],ja=arcA[1],jb=arcB[1],n=ja-ia;if(n!=jb-ib)return!1;for(var ka=findMinimumOffset(arcA),kb=findMinimumOffset(arcB),i=0;i<n;++i)if(!equalPoint(coordinates[ia+(i+ka)%n],coordinates[ib+(i+kb)%n]))return!1;return!0}function reverseEqualRing(arcA,arcB){var ia=arcA[0],ib=arcB[0],ja=arcA[1],jb=arcB[1],n=ja-ia;if(n!=jb-ib)return!1;for(var ka=findMinimumOffset(arcA),kb=n-findMinimumOffset(arcB),i=0;i<n;++i)if(!equalPoint(coordinates[ia+(i+ka)%n],coordinates[jb-(i+kb)%n]))return!1;return!0}function findMinimumOffset(arc){for(var start=arc[0],end=arc[1],mid=start,minimum=mid,minimumPoint=coordinates[mid];++mid<end;){var point=coordinates[mid];(point[0]<minimumPoint[0]||point[0]===minimumPoint[0]&&point[1]<minimumPoint[1])&&(minimum=mid,minimumPoint=point)}return minimum-start}var coordinates=topology.coordinates,lines=topology.lines,rings=topology.rings,arcCount=lines.length+rings.length,line,ring,i,n;for(delete topology.lines,delete topology.rings,(i=0,n=lines.length);i<n;++i)for(line=lines[i];line=line.next;)++arcCount;for(i=0,n=rings.length;i<n;++i)for(ring=rings[i];ring=ring.next;)++arcCount;var arcsByEnd=hashmap(1.4*(2*arcCount),hashPoint,equalPoint),arcs=topology.arcs=[];for(i=0,n=lines.length;i<n;++i){line=lines[i];do dedupLine(line);while(line=line.next)}for(i=0,n=rings.length;i<n;++i)if(ring=rings[i],ring.next)do dedupLine(ring);while(ring=ring.next);else dedupRing(ring);return topology},delta=function(arcs){for(var i=-1,n=arcs.length;++i<n;){for(var arc=arcs[i],j=0,k=1,m=arc.length,point=arc[0],x0=point[0],y0=point[1],x1,y1;++j<m;)point=arc[j],x1=point[0],y1=point[1],(x1!==x0||y1!==y0)&&(arc[k++]=[x1-x0,y1-y0],x0=x1,y0=y1);1==k&&(arc[k++]=[0,0]),arc.length=k}return arcs},extract=function(objects){function extractGeometry(geometry){geometry&&extractGeometryType.hasOwnProperty(geometry.type)&&extractGeometryType[geometry.type](geometry)}function extractLine(line){for(var i=0,n=line.length;i<n;++i)coordinates[++index]=line[i];var arc={0:index-n+1,1:index};return lines.push(arc),arc}function extractRing(ring){for(var i=0,n=ring.length;i<n;++i)coordinates[++index]=ring[i];var arc={0:index-n+1,1:index};return rings.push(arc),arc}function extractMultiRing(rings){return rings.map(extractRing)}var index=-1,lines=[],rings=[],coordinates=[],extractGeometryType={GeometryCollection:function(o){o.geometries.forEach(extractGeometry)},LineString:function(o){o.arcs=extractLine(o.arcs)},MultiLineString:function(o){o.arcs=o.arcs.map(extractLine)},Polygon:function(o){o.arcs=o.arcs.map(extractRing)},MultiPolygon:function(o){o.arcs=o.arcs.map(extractMultiRing)}};for(var key in objects)extractGeometry(objects[key]);return{type:"Topology",coordinates:coordinates,lines:lines,rings:rings,objects:objects}},geometry$1=function(inputs){var outputs={},key;for(key in inputs)outputs[key]=geomifyObject(inputs[key]);return outputs},prequantize=function(objects,bbox,n){function quantizePoint(input){return[_Mathround((input[0]-x0)*kx),_Mathround((input[1]-y0)*ky)]}function quantizePoints(input,m){for(var i=-1,j=0,n=input.length,output=Array(n),pi,px,py,x,y;++i<n;)pi=input[i],x=_Mathround((pi[0]-x0)*kx),y=_Mathround((pi[1]-y0)*ky),(x!==px||y!==py)&&(output[j++]=[px=x,py=y]);for(output.length=j;j<m;)j=output.push([output[0][0],output[0][1]]);return output}function quantizeLine(input){return quantizePoints(input,2)}function quantizeRing(input){return quantizePoints(input,4)}function quantizePolygon(input){return input.map(quantizeRing)}function quantizeGeometry(o){null!=o&&quantizeGeometryType.hasOwnProperty(o.type)&&quantizeGeometryType[o.type](o)}var x0=bbox[0],y0=bbox[1],x1=bbox[2],y1=bbox[3],kx=x1-x0?(n-1)/(x1-x0):1,ky=y1-y0?(n-1)/(y1-y0):1,quantizeGeometryType={GeometryCollection:function(o){o.geometries.forEach(quantizeGeometry)},Point:function(o){o.coordinates=quantizePoint(o.coordinates)},MultiPoint:function(o){o.coordinates=o.coordinates.map(quantizePoint)},LineString:function(o){o.arcs=quantizeLine(o.arcs)},MultiLineString:function(o){o.arcs=o.arcs.map(quantizeLine)},Polygon:function(o){o.arcs=quantizePolygon(o.arcs)},MultiPolygon:function(o){o.arcs=o.arcs.map(quantizePolygon)}};for(var key in objects)quantizeGeometry(objects[key]);return{scale:[1/kx,1/ky],translate:[x0,y0]}},topology=function(objects,quantization){function indexGeometry(geometry){geometry&&indexGeometryType.hasOwnProperty(geometry.type)&&indexGeometryType[geometry.type](geometry)}function indexArcs(arc){var indexes=[];do{var index=indexByArc.get(arc);indexes.push(arc[0]<arc[1]?index:~index)}while(arc=arc.next);return indexes}function indexMultiArcs(arcs){return arcs.map(indexArcs)}var bbox=bounds(objects=geometry$1(objects)),transform=0<quantization&&bbox&&prequantize(objects,bbox,quantization),topology=dedup$1(cut(extract(objects))),coordinates=topology.coordinates,indexByArc=hashmap(1.4*topology.arcs.length,hashArc,equalArc);objects=topology.objects,topology.bbox=bbox,topology.arcs=topology.arcs.map(function(arc,i){return indexByArc.set(arc,i),coordinates.slice(arc[0],arc[1]+1)}),delete topology.coordinates,coordinates=null;var indexGeometryType={GeometryCollection:function(o){o.geometries.forEach(indexGeometry)},LineString:function(o){o.arcs=indexArcs(o.arcs)},MultiLineString:function(o){o.arcs=o.arcs.map(indexArcs)},Polygon:function(o){o.arcs=o.arcs.map(indexArcs)},MultiPolygon:function(o){o.arcs=o.arcs.map(indexMultiArcs)}};for(var key in objects)indexGeometry(objects[key]);return transform&&(topology.transform=transform,topology.arcs=delta(topology.arcs)),topology},Spline=function(options){this.points=options.points||[],this.duration=options.duration||1e4,this.sharpness=options.sharpness||0.85,this.centers=[],this.controls=[],this.stepLength=options.stepLength||60,this.length=this.points.length,this.delay=0;for(var i=0;i<this.length;i++)this.points[i].z=this.points[i].z||0;for(var i=0;i<this.length-1;i++){var p1=this.points[i],p2=this.points[i+1];this.centers.push({x:(p1.x+p2.x)/2,y:(p1.y+p2.y)/2,z:(p1.z+p2.z)/2})}this.controls.push([this.points[0],this.points[0]]);for(var i=0;i<this.centers.length-1;i++){var p1=this.centers[i],p2=this.centers[i+1],dx=this.points[i+1].x-(this.centers[i].x+this.centers[i+1].x)/2,dy=this.points[i+1].y-(this.centers[i].y+this.centers[i+1].y)/2,dz=this.points[i+1].z-(this.centers[i].y+this.centers[i+1].z)/2;this.controls.push([{x:(1-this.sharpness)*this.points[i+1].x+this.sharpness*(this.centers[i].x+dx),y:(1-this.sharpness)*this.points[i+1].y+this.sharpness*(this.centers[i].y+dy),z:(1-this.sharpness)*this.points[i+1].z+this.sharpness*(this.centers[i].z+dz)},{x:(1-this.sharpness)*this.points[i+1].x+this.sharpness*(this.centers[i+1].x+dx),y:(1-this.sharpness)*this.points[i+1].y+this.sharpness*(this.centers[i+1].y+dy),z:(1-this.sharpness)*this.points[i+1].z+this.sharpness*(this.centers[i+1].z+dz)}])}return this.controls.push([this.points[this.length-1],this.points[this.length-1]]),this.steps=this.cacheSteps(this.stepLength),this};Spline.prototype.cacheSteps=function(mindist){var steps=[],laststep=this.pos(0);steps.push(0);for(var t=0;t<this.duration;t+=10){var step=this.pos(t),dist=_Mathsqrt((step.x-laststep.x)*(step.x-laststep.x)+(step.y-laststep.y)*(step.y-laststep.y)+(step.z-laststep.z)*(step.z-laststep.z));dist>mindist&&(steps.push(t),laststep=step)}return steps},Spline.prototype.vector=function(t){var p1=this.pos(t+10),p2=this.pos(t-10);return{angle:180*_Mathatan(p1.y-p2.y,p1.x-p2.x)/3.14,speed:_Mathsqrt((p2.x-p1.x)*(p2.x-p1.x)+(p2.y-p1.y)*(p2.y-p1.y)+(p2.z-p1.z)*(p2.z-p1.z))}},Spline.prototype.pos=function(time){function bezier(t,p1,c1,c2,p2){var B=function(t){var t2=t*t,t3=t2*t;return[t3,3*t2*(1-t),3*t*(1-t)*(1-t),(1-t)*(1-t)*(1-t)]},b=B(t),pos={x:p2.x*b[0]+c2.x*b[1]+c1.x*b[2]+p1.x*b[3],y:p2.y*b[0]+c2.y*b[1]+c1.y*b[2]+p1.y*b[3],z:p2.z*b[0]+c2.z*b[1]+c1.z*b[2]+p1.z*b[3]};return pos}var t=time-this.delay;0>t&&(t=0),t>this.duration&&(t=this.duration-1);var t2=t/this.duration;if(1<=t2)return this.points[this.length-1];var n=_Mathfloor((this.points.length-1)*t2),t1=(this.length-1)*t2-n;return bezier(t1,this.points[n],this.controls[n][1],this.controls[n+1][0],this.points[n+1])};var earcut_1=earcut,default_1$2=earcut;earcut.deviation=function(data,holeIndices,dim,triangles){var hasHoles=holeIndices&&holeIndices.length,outerLen=hasHoles?holeIndices[0]*dim:data.length,polygonArea=_Mathabs(signedArea(data,0,outerLen,dim));if(hasHoles)for(var i=0,len=holeIndices.length;i<len;i++){var start=holeIndices[i]*dim,end=i<len-1?holeIndices[i+1]*dim:data.length;polygonArea-=_Mathabs(signedArea(data,start,end,dim))}var trianglesArea=0;for(i=0;i<triangles.length;i+=3){var a=triangles[i]*dim,b=triangles[i+1]*dim,c=triangles[i+2]*dim;trianglesArea+=_Mathabs((data[a]-data[c])*(data[b+1]-data[a+1])-(data[a]-data[b])*(data[c+1]-data[a+1]))}return 0===polygonArea&&0===trianglesArea?0:_Mathabs((trianglesArea-polygonArea)/polygonArea)},earcut.flatten=function(data){for(var dim=data[0][0].length,result={vertices:[],holes:[],dimensions:dim},holeIndex=0,i=0;i<data.length;i++){for(var j=0;j<data[i].length;j++)for(var d=0;d<dim;d++)result.vertices.push(data[i][j][d]);0<i&&(holeIndex+=data[i-1].length,result.holes.push(holeIndex))}return result},earcut_1.default=default_1$2,rbush$4.prototype={all:function(){return this._all(this.data,[])},search:function(bbox){var node=this.data,result=[],toBBox=this.toBBox;if(!intersects$4(bbox,node))return result;for(var nodesToSearch=[],i,len,child,childBBox;node;){for(i=0,len=node.children.length;i<len;i++)child=node.children[i],childBBox=node.leaf?toBBox(child):child,intersects$4(bbox,childBBox)&&(node.leaf?result.push(child):contains$1(bbox,childBBox)?this._all(child,result):nodesToSearch.push(child));node=nodesToSearch.pop()}return result},collides:function(bbox){var node=this.data,toBBox=this.toBBox;if(!intersects$4(bbox,node))return!1;for(var nodesToSearch=[],i,len,child,childBBox;node;){for(i=0,len=node.children.length;i<len;i++)if(child=node.children[i],childBBox=node.leaf?toBBox(child):child,intersects$4(bbox,childBBox)){if(node.leaf||contains$1(bbox,childBBox))return!0;nodesToSearch.push(child)}node=nodesToSearch.pop()}return!1},load:function(data){if(!(data&&data.length))return this;if(data.length<this._minEntries){for(var i=0,len=data.length;i<len;i++)this.insert(data[i]);return this}var node=this._build(data.slice(),0,data.length-1,0);if(!this.data.children.length)this.data=node;else if(this.data.height===node.height)this._splitRoot(this.data,node);else{if(this.data.height<node.height){var tmpNode=this.data;this.data=node,node=tmpNode}this._insert(node,this.data.height-node.height-1,!0)}return this},insert:function(item){return item&&this._insert(item,this.data.height-1),this},clear:function(){return this.data=createNode$1([]),this},remove:function(item,equalsFn){if(!item)return this;for(var node=this.data,bbox=this.toBBox(item),path=[],indexes=[],i,parent,index,goingUp;node||path.length;){if(node||(node=path.pop(),parent=path[path.length-1],i=indexes.pop(),goingUp=!0),node.leaf&&(index=findItem$1(item,node.children,equalsFn),-1!==index))return node.children.splice(index,1),path.push(node),this._condense(path),this;goingUp||node.leaf||!contains$1(node,bbox)?parent?(i++,node=parent.children[i],goingUp=!1):node=null:(path.push(node),indexes.push(i),i=0,parent=node,node=node.children[0])}return this},toBBox:function(item){return item},compareMinX:compareNodeMinX$1,compareMinY:compareNodeMinY$1,toJSON:function(){return this.data},fromJSON:function(data){return this.data=data,this},_all:function(node,result){for(var nodesToSearch=[];node;)node.leaf?result.push.apply(result,node.children):nodesToSearch.push.apply(nodesToSearch,node.children),node=nodesToSearch.pop();return result},_build:function(items,left,right,height){var N=right-left+1,M=this._maxEntries,node;if(N<=M)return node=createNode$1(items.slice(left,right+1)),calcBBox$1(node,this.toBBox),node;height||(height=_Mathceil(_Mathlog(N)/_Mathlog(M)),M=_Mathceil(N/_Mathpow(M,height-1))),node=createNode$1([]),node.leaf=!1,node.height=height;var N2=_Mathceil(N/M),N1=N2*_Mathceil(_Mathsqrt(M)),i,j,right2,right3;for(multiSelect$1(items,left,right,N1,this.compareMinX),i=left;i<=right;i+=N1)for(right2=_Mathmin(i+N1-1,right),multiSelect$1(items,i,right2,N2,this.compareMinY),j=i;j<=right2;j+=N2)right3=_Mathmin(j+N2-1,right2),node.children.push(this._build(items,j,right3,height-1));return calcBBox$1(node,this.toBBox),node},_chooseSubtree:function(bbox,node,level,path){for(var i,len,child,targetNode,area,enlargement,minArea,minEnlargement;path.push(node),!(node.leaf||path.length-1===level);){for(minArea=minEnlargement=Infinity,i=0,len=node.children.length;i<len;i++)child=node.children[i],area=bboxArea$1(child),enlargement=enlargedArea$1(bbox,child)-area,enlargement<minEnlargement?(minEnlargement=enlargement,minArea=area<minArea?area:minArea,targetNode=child):enlargement===minEnlargement&&area<minArea&&(minArea=area,targetNode=child);node=targetNode||node.children[0]}return node},_insert:function(item,level,isNode){var toBBox=this.toBBox,bbox=isNode?item:toBBox(item),insertPath=[],node=this._chooseSubtree(bbox,this.data,level,insertPath);for(node.children.push(item),extend$1(node,bbox);0<=level&&insertPath[level].children.length>this._maxEntries;)this._split(insertPath,level),level--;this._adjustParentBBoxes(bbox,insertPath,level)},_split:function(insertPath,level){var node=insertPath[level],M=node.children.length,m=this._minEntries;this._chooseSplitAxis(node,m,M);var splitIndex=this._chooseSplitIndex(node,m,M),newNode=createNode$1(node.children.splice(splitIndex,node.children.length-splitIndex));newNode.height=node.height,newNode.leaf=node.leaf,calcBBox$1(node,this.toBBox),calcBBox$1(newNode,this.toBBox),level?insertPath[level-1].children.push(newNode):this._splitRoot(node,newNode)},_splitRoot:function(node,newNode){this.data=createNode$1([node,newNode]),this.data.height=node.height+1,this.data.leaf=!1,calcBBox$1(this.data,this.toBBox)},_chooseSplitIndex:function(node,m,M){var i,bbox1,bbox2,overlap,area,minOverlap,minArea,index;for(minOverlap=minArea=Infinity,i=m;i<=M-m;i++)bbox1=distBBox$1(node,0,i,this.toBBox),bbox2=distBBox$1(node,i,M,this.toBBox),overlap=intersectionArea$1(bbox1,bbox2),area=bboxArea$1(bbox1)+bboxArea$1(bbox2),overlap<minOverlap?(minOverlap=overlap,index=i,minArea=area<minArea?area:minArea):overlap===minOverlap&&area<minArea&&(minArea=area,index=i);return index},_chooseSplitAxis:function(node,m,M){var compareMinX=node.leaf?this.compareMinX:compareNodeMinX$1,compareMinY=node.leaf?this.compareMinY:compareNodeMinY$1,xMargin=this._allDistMargin(node,m,M,compareMinX),yMargin=this._allDistMargin(node,m,M,compareMinY);xMargin<yMargin&&node.children.sort(compareMinX)},_allDistMargin:function(node,m,M,compare){node.children.sort(compare);var toBBox=this.toBBox,leftBBox=distBBox$1(node,0,m,toBBox),rightBBox=distBBox$1(node,M-m,M,toBBox),margin=bboxMargin$1(leftBBox)+bboxMargin$1(rightBBox),i,child;for(i=m;i<M-m;i++)child=node.children[i],extend$1(leftBBox,node.leaf?toBBox(child):child),margin+=bboxMargin$1(leftBBox);for(i=M-m-1;i>=m;i--)child=node.children[i],extend$1(rightBBox,node.leaf?toBBox(child):child),margin+=bboxMargin$1(rightBBox);return margin},_adjustParentBBoxes:function(bbox,path,level){for(var i=level;0<=i;i--)extend$1(path[i],bbox)},_condense:function(path){for(var i=path.length-1,siblings;0<=i;i--)0===path[i].children.length?0<i?(siblings=path[i-1].children,siblings.splice(siblings.indexOf(path[i]),1)):this.clear():calcBBox$1(path[i],this.toBBox)},_initFormat:function(format){var compareArr=["return a"," - b",";"];this.compareMinX=new Function("a","b",compareArr.join(format[0])),this.compareMinY=new Function("a","b",compareArr.join(format[1])),this.toBBox=new Function("a","return {minX: a"+format[0]+", minY: a"+format[1]+", maxX: a"+format[2]+", maxY: a"+format[3]+"};")}};var main_es$3=Object.freeze({toMercator:toMercator,toWgs84:toWgs84}),RADIUS=6378137,isects=function(feature$$1,filterFn,useSpatialIndex){function ifIsectAddToOutput(ring0,edge0,ring1,edge1){var start0=coord[ring0][edge0],end0=coord[ring0][edge0+1],start1=coord[ring1][edge1],end1=coord[ring1][edge1+1],isect=intersect(start0,end0,start1,end1);if(null!==isect){var frac0,frac1;if(frac0=end0[0]===start0[0]?(isect[1]-start0[1])/(end0[1]-start0[1]):(isect[0]-start0[0])/(end0[0]-start0[0]),frac1=end1[0]===start1[0]?(isect[1]-start1[1])/(end1[1]-start1[1]):(isect[0]-start1[0])/(end1[0]-start1[0]),!(1<=frac0||0>=frac0||1<=frac1||0>=frac1)){var key=isect,unique=!seen[key];unique&&(seen[key]=!0),filterFn?output.push(filterFn(isect,ring0,edge0,start0,end0,frac0,ring1,edge1,start1,end1,frac1,unique)):output.push(isect)}}}function rbushTreeItem(ring,edge){var start=coord[ring][edge],end=coord[ring][edge+1],minX,maxX,minY,maxY;return start[0]<end[0]?(minX=start[0],maxX=end[0]):(minX=end[0],maxX=start[0]),start[1]<end[1]?(minY=start[1],maxY=end[1]):(minY=end[1],maxY=start[1]),{minX:minX,minY:minY,maxX:maxX,maxY:maxY,ring:ring,edge:edge}}if("Polygon"!==feature$$1.geometry.type)throw new Error("The input feature must be a Polygon");void 0===useSpatialIndex&&(useSpatialIndex=1);var coord=feature$$1.geometry.coordinates,output=[],seen={};if(useSpatialIndex){for(var allEdgesAsRbushTreeItems=[],ring0=0;ring0<coord.length;ring0++)for(var edge0=0;edge0<coord[ring0].length-1;edge0++)allEdgesAsRbushTreeItems.push(rbushTreeItem(ring0,edge0));var tree=rbush_1();tree.load(allEdgesAsRbushTreeItems)}for(var ringA=0;ringA<coord.length;ringA++)for(var edgeA=0;edgeA<coord[ringA].length-1;edgeA++)if(useSpatialIndex){var bboxOverlaps=tree.search(rbushTreeItem(ringA,edgeA));bboxOverlaps.forEach(function(bboxIsect){var ring1=bboxIsect.ring,edge1=bboxIsect.edge;ifIsectAddToOutput(ringA,edgeA,ring1,edge1)})}else for(var ring1=0;ring1<coord.length;ring1++)for(var edge1=0;edge1<coord[ring1].length-1;edge1++)ifIsectAddToOutput(ringA,edgeA,ring1,edge1);return filterFn||(output={type:"Feature",geometry:{type:"MultiPoint",coordinates:output}}),output},simplepolygon=function(feature$$1){function determineParents(){for(var featuresWithoutParent=[],i=0;i<output.features.length;i++)-1==output.features[i].properties.parent&&featuresWithoutParent.push(i);if(1<featuresWithoutParent.length)for(var i=0;i<featuresWithoutParent.length;i++){for(var parent=-1,parentArea=Infinity,j=0;j<output.features.length;j++)featuresWithoutParent[i]!=j&&booleanPointInPolygon(output.features[featuresWithoutParent[i]].geometry.coordinates[0][0],output.features[j],{ignoreBoundary:!0})&&area$1(output.features[j])<parentArea&&(parent=j);output.features[featuresWithoutParent[i]].properties.parent=parent}}function setNetWinding(){for(var i=0;i<output.features.length;i++)if(-1==output.features[i].properties.parent){var netWinding=output.features[i].properties.winding;output.features[i].properties.netWinding=netWinding,setNetWindingOfChildren(i,netWinding)}}function setNetWindingOfChildren(parent,ParentNetWinding){for(var i=0;i<output.features.length;i++)if(output.features[i].properties.parent==parent){var netWinding=ParentNetWinding+output.features[i].properties.winding;output.features[i].properties.netWinding=netWinding,setNetWindingOfChildren(i,netWinding)}}if("Feature"!=feature$$1.type)throw new Error("The input must a geojson object of type Feature");if(void 0===feature$$1.geometry||null==feature$$1.geometry)throw new Error("The input must a geojson object with a non-empty geometry");if("Polygon"!=feature$$1.geometry.type)throw new Error("The input must be a geojson Polygon");for(var numRings=feature$$1.geometry.coordinates.length,vertices=[],i=0,ring;i<numRings;i++)ring=feature$$1.geometry.coordinates[i],equalArrays(ring[0],ring[ring.length-1])||ring.push(ring[0]),vertices.push.apply(vertices,ring.slice(0,ring.length-1));if(!isUnique(vertices))throw new Error("The input polygon may not have duplicate vertices (except for the first and last vertex of each ring)");var numvertices=vertices.length,selfIsectsData=isects(feature$$1,function filterFn(isect,ring0,edge0,start0,end0,frac0,ring1,edge1,start1,end1,frac1,unique){return[isect,ring0,edge0,start0,end0,frac0,ring1,edge1,start1,end1,frac1,unique]}),numSelfIsect=selfIsectsData.length;if(0==numSelfIsect){for(var outputFeatureArray=[],i=0;i<numRings;i++)outputFeatureArray.push(polygon([feature$$1.geometry.coordinates[i]],{parent:-1,winding:windingOfRing(feature$$1.geometry.coordinates[i])}));var output=featureCollection(outputFeatureArray);return determineParents(),setNetWinding(),output}for(var pseudoVtxListByRingAndEdge=[],isectList=[],i=0;i<numRings;i++){pseudoVtxListByRingAndEdge.push([]);for(var j=0;j<feature$$1.geometry.coordinates[i].length-1;j++)pseudoVtxListByRingAndEdge[i].push([new PseudoVtx(feature$$1.geometry.coordinates[i][(j+1).modulo(feature$$1.geometry.coordinates[i].length-1)],1,[i,j],[i,(j+1).modulo(feature$$1.geometry.coordinates[i].length-1)],void 0)]),isectList.push(new Isect(feature$$1.geometry.coordinates[i][j],[i,(j-1).modulo(feature$$1.geometry.coordinates[i].length-1)],[i,j],void 0,void 0,!1,!0))}for(var i=0;i<numSelfIsect;i++)pseudoVtxListByRingAndEdge[selfIsectsData[i][1]][selfIsectsData[i][2]].push(new PseudoVtx(selfIsectsData[i][0],selfIsectsData[i][5],[selfIsectsData[i][1],selfIsectsData[i][2]],[selfIsectsData[i][6],selfIsectsData[i][7]],void 0)),selfIsectsData[i][11]&&isectList.push(new Isect(selfIsectsData[i][0],[selfIsectsData[i][1],selfIsectsData[i][2]],[selfIsectsData[i][6],selfIsectsData[i][7]],void 0,void 0,!0,!0));for(var numIsect=isectList.length,i=0;i<pseudoVtxListByRingAndEdge.length;i++)for(var j=0;j<pseudoVtxListByRingAndEdge[i].length;j++)pseudoVtxListByRingAndEdge[i][j].sort(function(a,b){return a.param<b.param?-1:1});for(var allIsectsAsIsectRbushTreeItem=[],i=0;i<numIsect;i++)allIsectsAsIsectRbushTreeItem.push({minX:isectList[i].coord[0],minY:isectList[i].coord[1],maxX:isectList[i].coord[0],maxY:isectList[i].coord[1],index:i});var isectRbushTree=rbush_1();isectRbushTree.load(allIsectsAsIsectRbushTreeItem);for(var i=0;i<pseudoVtxListByRingAndEdge.length;i++)for(var j=0;j<pseudoVtxListByRingAndEdge[i].length;j++)for(var k=0;k<pseudoVtxListByRingAndEdge[i][j].length;k++){var coordToFind;coordToFind=k==pseudoVtxListByRingAndEdge[i][j].length-1?pseudoVtxListByRingAndEdge[i][(j+1).modulo(feature$$1.geometry.coordinates[i].length-1)][0].coord:pseudoVtxListByRingAndEdge[i][j][k+1].coord;var IsectRbushTreeItemFound=isectRbushTree.search({minX:coordToFind[0],minY:coordToFind[1],maxX:coordToFind[0],maxY:coordToFind[1]})[0];pseudoVtxListByRingAndEdge[i][j][k].nxtIsectAlongEdgeIn=IsectRbushTreeItemFound.index}for(var i=0;i<pseudoVtxListByRingAndEdge.length;i++)for(var j=0;j<pseudoVtxListByRingAndEdge[i].length;j++)for(var k=0;k<pseudoVtxListByRingAndEdge[i][j].length;k++){var coordToFind=pseudoVtxListByRingAndEdge[i][j][k].coord,IsectRbushTreeItemFound=isectRbushTree.search({minX:coordToFind[0],minY:coordToFind[1],maxX:coordToFind[0],maxY:coordToFind[1]})[0],l=IsectRbushTreeItemFound.index;l<numvertices?isectList[l].nxtIsectAlongRingAndEdge2=pseudoVtxListByRingAndEdge[i][j][k].nxtIsectAlongEdgeIn:equalArrays(isectList[l].ringAndEdge1,pseudoVtxListByRingAndEdge[i][j][k].ringAndEdgeIn)?isectList[l].nxtIsectAlongRingAndEdge1=pseudoVtxListByRingAndEdge[i][j][k].nxtIsectAlongEdgeIn:isectList[l].nxtIsectAlongRingAndEdge2=pseudoVtxListByRingAndEdge[i][j][k].nxtIsectAlongEdgeIn}for(var queue=[],i=0,j=0,leftIsect;j<numRings;j++){leftIsect=i;for(var k=0;k<feature$$1.geometry.coordinates[j].length-1;k++)isectList[i].coord[0]<isectList[leftIsect].coord[0]&&(leftIsect=i),i++;for(var isectAfterLeftIsect=isectList[leftIsect].nxtIsectAlongRingAndEdge2,k=0;k<isectList.length;k++)if(isectList[k].nxtIsectAlongRingAndEdge1==leftIsect||isectList[k].nxtIsectAlongRingAndEdge2==leftIsect){var isectBeforeLeftIsect=k;break}var windingAtIsect=isConvex([isectList[isectBeforeLeftIsect].coord,isectList[leftIsect].coord,isectList[isectAfterLeftIsect].coord],!0)?1:-1;queue.push({isect:leftIsect,parent:-1,winding:windingAtIsect})}queue.sort(function(a,b){return isectList[a.isect].coord>isectList[b.isect].coord?-1:1});for(var outputFeatureArray=[];0<queue.length;){var popped=queue.pop(),startIsect=popped.isect,currentOutputRingParent=popped.parent,currentOutputRingWinding=popped.winding,currentOutputRing=outputFeatureArray.length,currentOutputRingCoords=[isectList[startIsect].coord],currentIsect=startIsect;if(isectList[startIsect].ringAndEdge1Walkable)var walkingRingAndEdge=isectList[startIsect].ringAndEdge1,nxtIsect=isectList[startIsect].nxtIsectAlongRingAndEdge1;else var walkingRingAndEdge=isectList[startIsect].ringAndEdge2,nxtIsect=isectList[startIsect].nxtIsectAlongRingAndEdge2;for(;!equalArrays(isectList[startIsect].coord,isectList[nxtIsect].coord);){currentOutputRingCoords.push(isectList[nxtIsect].coord);for(var nxtIsectInQueue=void 0,i=0;i<queue.length;i++)if(queue[i].isect==nxtIsect){nxtIsectInQueue=i;break}if(void 0!=nxtIsectInQueue&&queue.splice(nxtIsectInQueue,1),equalArrays(walkingRingAndEdge,isectList[nxtIsect].ringAndEdge1)){if(walkingRingAndEdge=isectList[nxtIsect].ringAndEdge2,isectList[nxtIsect].ringAndEdge2Walkable=!1,isectList[nxtIsect].ringAndEdge1Walkable){var pushing={isect:nxtIsect};isConvex([isectList[currentIsect].coord,isectList[nxtIsect].coord,isectList[isectList[nxtIsect].nxtIsectAlongRingAndEdge2].coord],1==currentOutputRingWinding)?(pushing.parent=currentOutputRingParent,pushing.winding=-currentOutputRingWinding):(pushing.parent=currentOutputRing,pushing.winding=currentOutputRingWinding),queue.push(pushing)}currentIsect=nxtIsect,nxtIsect=isectList[nxtIsect].nxtIsectAlongRingAndEdge2}else{if(walkingRingAndEdge=isectList[nxtIsect].ringAndEdge1,isectList[nxtIsect].ringAndEdge1Walkable=!1,isectList[nxtIsect].ringAndEdge2Walkable){var pushing={isect:nxtIsect};isConvex([isectList[currentIsect].coord,isectList[nxtIsect].coord,isectList[isectList[nxtIsect].nxtIsectAlongRingAndEdge1].coord],1==currentOutputRingWinding)?(pushing.parent=currentOutputRingParent,pushing.winding=-currentOutputRingWinding):(pushing.parent=currentOutputRing,pushing.winding=currentOutputRingWinding),queue.push(pushing)}currentIsect=nxtIsect,nxtIsect=isectList[nxtIsect].nxtIsectAlongRingAndEdge1}}currentOutputRingCoords.push(isectList[nxtIsect].coord),outputFeatureArray.push(polygon([currentOutputRingCoords],{index:currentOutputRing,parent:currentOutputRingParent,winding:currentOutputRingWinding,netWinding:void 0}))}var output=featureCollection(outputFeatureArray);return determineParents(),setNetWinding(),output},PseudoVtx=function(coord,param,ringAndEdgeIn,ringAndEdgeOut,nxtIsectAlongEdgeIn){this.coord=coord,this.param=param,this.ringAndEdgeIn=ringAndEdgeIn,this.ringAndEdgeOut=ringAndEdgeOut,this.nxtIsectAlongEdgeIn=nxtIsectAlongEdgeIn},Isect=function(coord,ringAndEdge1,ringAndEdge2,nxtIsectAlongRingAndEdge1,nxtIsectAlongRingAndEdge2,ringAndEdge1Walkable,ringAndEdge2Walkable){this.coord=coord,this.ringAndEdge1=ringAndEdge1,this.ringAndEdge2=ringAndEdge2,this.nxtIsectAlongRingAndEdge1=nxtIsectAlongRingAndEdge1,this.nxtIsectAlongRingAndEdge2=nxtIsectAlongRingAndEdge2,this.ringAndEdge1Walkable=ringAndEdge1Walkable,this.ringAndEdge2Walkable=ringAndEdge2Walkable};Number.prototype.modulo=function(n){return(this%n+n)%n};var D2R=_MathPI/180,R2D=180/_MathPI,Coord=function(lon,lat){this.lon=lon,this.lat=lat,this.x=D2R*lon,this.y=D2R*lat};Coord.prototype.view=function(){return(this.lon+"").slice(0,4)+","+(this.lat+"").slice(0,4)},Coord.prototype.antipode=function(){var anti_lat=-1*this.lat,anti_lon=0>this.lon?180+this.lon:-1*(180-this.lon);return new Coord(anti_lon,anti_lat)};var LineString=function(){this.coords=[],this.length=0};LineString.prototype.move_to=function(coord){this.length++,this.coords.push(coord)};var Arc=function(properties){this.properties=properties||{},this.geometries=[]};Arc.prototype.json=function(){if(0>=this.geometries.length)return{geometry:{type:"LineString",coordinates:null},type:"Feature",properties:this.properties};if(1===this.geometries.length)return{geometry:{type:"LineString",coordinates:this.geometries[0].coords},type:"Feature",properties:this.properties};for(var multiline=[],i=0;i<this.geometries.length;i++)multiline.push(this.geometries[i].coords);return{geometry:{type:"MultiLineString",coordinates:multiline},type:"Feature",properties:this.properties}},Arc.prototype.wkt=function(){for(var wkt_string="",wkt="LINESTRING(",collect=function(c){wkt+=c[0]+" "+c[1]+","},i=0;i<this.geometries.length;i++){if(0===this.geometries[i].coords.length)return"LINESTRING(empty)";var coords=this.geometries[i].coords;coords.forEach(collect),wkt_string+=wkt.substring(0,wkt.length-1)+")"}return wkt_string};var GreatCircle=function(start,end,properties){if(!start||void 0===start.x||void 0===start.y)throw new Error("GreatCircle constructor expects two args: start and end objects with x and y properties");if(!end||void 0===end.x||void 0===end.y)throw new Error("GreatCircle constructor expects two args: start and end objects with x and y properties");this.start=new Coord(start.x,start.y),this.end=new Coord(end.x,end.y),this.properties=properties||{};var w=this.start.x-this.end.x,h=this.start.y-this.end.y,z=_Mathpow(_Mathsin(h/2),2)+_Mathcos(this.start.y)*_Mathcos(this.end.y)*_Mathpow(_Mathsin(w/2),2);if(this.g=2*_Mathasin(_Mathsqrt(z)),this.g===_MathPI)throw new Error("it appears "+start.view()+" and "+end.view()+" are 'antipodal', e.g diametrically opposite, thus there is no single route but rather infinite");else if(isNaN(this.g))throw new Error("could not calculate great circle between "+start+" and "+end)};GreatCircle.prototype.interpolate=function(f){var A=_Mathsin((1-f)*this.g)/_Mathsin(this.g),B=_Mathsin(f*this.g)/_Mathsin(this.g),x=A*_Mathcos(this.start.y)*_Mathcos(this.start.x)+B*_Mathcos(this.end.y)*_Mathcos(this.end.x),y=A*_Mathcos(this.start.y)*_Mathsin(this.start.x)+B*_Mathcos(this.end.y)*_Mathsin(this.end.x),z=A*_Mathsin(this.start.y)+B*_Mathsin(this.end.y),lat=R2D*_Mathatan(z,_Mathsqrt(_Mathpow(x,2)+_Mathpow(y,2))),lon=R2D*_Mathatan(y,x);return[lon,lat]},GreatCircle.prototype.Arc=function(npoints,options){var first_pass=[];if(!npoints||2>=npoints)first_pass.push([this.start.lon,this.start.lat]),first_pass.push([this.end.lon,this.end.lat]);else for(var delta=1/(npoints-1),i=0;i<npoints;++i){var step=delta*i,pair=this.interpolate(step);first_pass.push(pair)}for(var bHasBigDiff=!1,dfMaxSmallDiffLong=0,dfDateLineOffset=options&&options.offset?options.offset:10,dfLeftBorderX=180-dfDateLineOffset,dfRightBorderX=-180+dfDateLineOffset,dfDiffSpace=360-dfDateLineOffset,j=1;j<first_pass.length;++j){var dfPrevX=first_pass[j-1][0],dfX=first_pass[j][0],dfDiffLong=_Mathabs(dfX-dfPrevX);dfDiffLong>dfDiffSpace&&(dfX>dfLeftBorderX&&dfPrevX<dfRightBorderX||dfPrevX>dfLeftBorderX&&dfX<dfRightBorderX)?bHasBigDiff=!0:dfDiffLong>dfMaxSmallDiffLong&&(dfMaxSmallDiffLong=dfDiffLong)}var poMulti=[];if(bHasBigDiff&&dfMaxSmallDiffLong<dfDateLineOffset){var poNewLS=[];poMulti.push(poNewLS);for(var k=0,dfX0;k<first_pass.length;++k)if(dfX0=parseFloat(first_pass[k][0]),0<k&&_Mathabs(dfX0-first_pass[k-1][0])>dfDiffSpace){var dfX1=parseFloat(first_pass[k-1][0]),dfY1=parseFloat(first_pass[k-1][1]),dfX2=parseFloat(first_pass[k][0]),dfY2=parseFloat(first_pass[k][1]);if(-180<dfX1&&dfX1<dfRightBorderX&&180===dfX2&&k+1<first_pass.length&&-180<first_pass[k-1][0]&&first_pass[k-1][0]<dfRightBorderX){poNewLS.push([-180,first_pass[k][1]]),k++,poNewLS.push([first_pass[k][0],first_pass[k][1]]);continue}else if(dfX1>dfLeftBorderX&&180>dfX1&&-180===dfX2&&k+1<first_pass.length&&first_pass[k-1][0]>dfLeftBorderX&&180>first_pass[k-1][0]){poNewLS.push([180,first_pass[k][1]]),k++,poNewLS.push([first_pass[k][0],first_pass[k][1]]);continue}if(dfX1<dfRightBorderX&&dfX2>dfLeftBorderX){var tmpX=dfX1;dfX1=dfX2,dfX2=tmpX;var tmpY=dfY1;dfY1=dfY2,dfY2=tmpY}if(dfX1>dfLeftBorderX&&dfX2<dfRightBorderX&&(dfX2+=360),180>=dfX1&&180<=dfX2&&dfX1<dfX2){var dfRatio=(180-dfX1)/(dfX2-dfX1),dfY=dfRatio*dfY2+(1-dfRatio)*dfY1;poNewLS.push([first_pass[k-1][0]>dfLeftBorderX?180:-180,dfY]),poNewLS=[],poNewLS.push([first_pass[k-1][0]>dfLeftBorderX?-180:180,dfY]),poMulti.push(poNewLS)}else poNewLS=[],poMulti.push(poNewLS);poNewLS.push([dfX0,first_pass[k][1]])}else poNewLS.push([first_pass[k][0],first_pass[k][1]])}else{var poNewLS0=[];poMulti.push(poNewLS0);for(var l=0;l<first_pass.length;++l)poNewLS0.push([first_pass[l][0],first_pass[l][1]])}for(var arc=new Arc(this.properties),m=0,line;m<poMulti.length;++m){line=new LineString,arc.geometries.push(line);for(var points=poMulti[m],j0=0;j0<points.length;++j0)line.move_to(points[j0])}return arc};var lineclip_1=lineclip;lineclip.polyline=lineclip,lineclip.polygon=polygonclip;var pSlice=Array.prototype.slice,defaultSettings$1={successCallback:null,verbose:!1,polygons:!1},settings$1={},Node0=64,Node1=16,Node2=4,Node3=1,isoBandNextXTL=[],isoBandNextYTL=[],isoBandNextOTL=[],isoBandNextXTR=[],isoBandNextYTR=[],isoBandNextOTR=[],isoBandNextXRT=[],isoBandNextYRT=[],isoBandNextORT=[],isoBandNextXRB=[],isoBandNextYRB=[],isoBandNextORB=[],isoBandNextXBL=[],isoBandNextYBL=[],isoBandNextOBL=[],isoBandNextXBR=[],isoBandNextYBR=[],isoBandNextOBR=[],isoBandNextXLT=[],isoBandNextYLT=[],isoBandNextOLT=[],isoBandNextXLB=[],isoBandNextYLB=[],isoBandNextOLB=[];isoBandNextXRT[85]=isoBandNextXRB[85]=-1,isoBandNextYRT[85]=isoBandNextYRB[85]=0,isoBandNextORT[85]=isoBandNextORB[85]=1,isoBandNextXLT[85]=isoBandNextXLB[85]=1,isoBandNextYLT[85]=isoBandNextYLB[85]=0,isoBandNextOLT[85]=isoBandNextOLB[85]=1,isoBandNextXTL[85]=isoBandNextXTR[85]=0,isoBandNextYTL[85]=isoBandNextYTR[85]=-1,isoBandNextOTL[85]=isoBandNextOBL[85]=0,isoBandNextXBR[85]=isoBandNextXBL[85]=0,isoBandNextYBR[85]=isoBandNextYBL[85]=1,isoBandNextOTR[85]=isoBandNextOBR[85]=1,isoBandNextXLB[1]=isoBandNextXLB[169]=0,isoBandNextYLB[1]=isoBandNextYLB[169]=-1,isoBandNextOLB[1]=isoBandNextOLB[169]=0,isoBandNextXBL[1]=isoBandNextXBL[169]=-1,isoBandNextYBL[1]=isoBandNextYBL[169]=0,isoBandNextOBL[1]=isoBandNextOBL[169]=0,isoBandNextXRB[4]=isoBandNextXRB[166]=0,isoBandNextYRB[4]=isoBandNextYRB[166]=-1,isoBandNextORB[4]=isoBandNextORB[166]=1,isoBandNextXBR[4]=isoBandNextXBR[166]=1,isoBandNextYBR[4]=isoBandNextYBR[166]=0,isoBandNextOBR[4]=isoBandNextOBR[166]=0,isoBandNextXRT[16]=isoBandNextXRT[154]=0,isoBandNextYRT[16]=isoBandNextYRT[154]=1,isoBandNextORT[16]=isoBandNextORT[154]=1,isoBandNextXTR[16]=isoBandNextXTR[154]=1,isoBandNextYTR[16]=isoBandNextYTR[154]=0,isoBandNextOTR[16]=isoBandNextOTR[154]=1,isoBandNextXLT[64]=isoBandNextXLT[106]=0,isoBandNextYLT[64]=isoBandNextYLT[106]=1,isoBandNextOLT[64]=isoBandNextOLT[106]=0,isoBandNextXTL[64]=isoBandNextXTL[106]=-1,isoBandNextYTL[64]=isoBandNextYTL[106]=0,isoBandNextOTL[64]=isoBandNextOTL[106]=1,isoBandNextXLT[2]=isoBandNextXLT[168]=0,isoBandNextYLT[2]=isoBandNextYLT[168]=-1,isoBandNextOLT[2]=isoBandNextOLT[168]=1,isoBandNextXLB[2]=isoBandNextXLB[168]=0,isoBandNextYLB[2]=isoBandNextYLB[168]=-1,isoBandNextOLB[2]=isoBandNextOLB[168]=0,isoBandNextXBL[2]=isoBandNextXBL[168]=-1,isoBandNextYBL[2]=isoBandNextYBL[168]=0,isoBandNextOBL[2]=isoBandNextOBL[168]=0,isoBandNextXBR[2]=isoBandNextXBR[168]=-1,isoBandNextYBR[2]=isoBandNextYBR[168]=0,isoBandNextOBR[2]=isoBandNextOBR[168]=1,isoBandNextXRT[8]=isoBandNextXRT[162]=0,isoBandNextYRT[8]=isoBandNextYRT[162]=-1,isoBandNextORT[8]=isoBandNextORT[162]=0,isoBandNextXRB[8]=isoBandNextXRB[162]=0,isoBandNextYRB[8]=isoBandNextYRB[162]=-1,isoBandNextORB[8]=isoBandNextORB[162]=1,isoBandNextXBL[8]=isoBandNextXBL[162]=1,isoBandNextYBL[8]=isoBandNextYBL[162]=0,isoBandNextOBL[8]=isoBandNextOBL[162]=1,isoBandNextXBR[8]=isoBandNextXBR[162]=1,isoBandNextYBR[8]=isoBandNextYBR[162]=0,isoBandNextOBR[8]=isoBandNextOBR[162]=0,isoBandNextXRT[32]=isoBandNextXRT[138]=0,isoBandNextYRT[32]=isoBandNextYRT[138]=1,isoBandNextORT[32]=isoBandNextORT[138]=1,isoBandNextXRB[32]=isoBandNextXRB[138]=0,isoBandNextYRB[32]=isoBandNextYRB[138]=1,isoBandNextORB[32]=isoBandNextORB[138]=0,isoBandNextXTL[32]=isoBandNextXTL[138]=1,isoBandNextYTL[32]=isoBandNextYTL[138]=0,isoBandNextOTL[32]=isoBandNextOTL[138]=0,isoBandNextXTR[32]=isoBandNextXTR[138]=1,isoBandNextYTR[32]=isoBandNextYTR[138]=0,isoBandNextOTR[32]=isoBandNextOTR[138]=1,isoBandNextXLB[128]=isoBandNextXLB[42]=0,isoBandNextYLB[128]=isoBandNextYLB[42]=1,isoBandNextOLB[128]=isoBandNextOLB[42]=1,isoBandNextXLT[128]=isoBandNextXLT[42]=0,isoBandNextYLT[128]=isoBandNextYLT[42]=1,isoBandNextOLT[128]=isoBandNextOLT[42]=0,isoBandNextXTL[128]=isoBandNextXTL[42]=-1,isoBandNextYTL[128]=isoBandNextYTL[42]=0,isoBandNextOTL[128]=isoBandNextOTL[42]=1,isoBandNextXTR[128]=isoBandNextXTR[42]=-1,isoBandNextYTR[128]=isoBandNextYTR[42]=0,isoBandNextOTR[128]=isoBandNextOTR[42]=0,isoBandNextXRB[5]=isoBandNextXRB[165]=-1,isoBandNextYRB[5]=isoBandNextYRB[165]=0,isoBandNextORB[5]=isoBandNextORB[165]=0,isoBandNextXLB[5]=isoBandNextXLB[165]=1,isoBandNextYLB[5]=isoBandNextYLB[165]=0,isoBandNextOLB[5]=isoBandNextOLB[165]=0,isoBandNextXBR[20]=isoBandNextXBR[150]=0,isoBandNextYBR[20]=isoBandNextYBR[150]=1,isoBandNextOBR[20]=isoBandNextOBR[150]=1,isoBandNextXTR[20]=isoBandNextXTR[150]=0,isoBandNextYTR[20]=isoBandNextYTR[150]=-1,isoBandNextOTR[20]=isoBandNextOTR[150]=1,isoBandNextXRT[80]=isoBandNextXRT[90]=-1,isoBandNextYRT[80]=isoBandNextYRT[90]=0,isoBandNextORT[80]=isoBandNextORT[90]=1,isoBandNextXLT[80]=isoBandNextXLT[90]=1,isoBandNextYLT[80]=isoBandNextYLT[90]=0,isoBandNextOLT[80]=isoBandNextOLT[90]=1,isoBandNextXBL[65]=isoBandNextXBL[105]=0,isoBandNextYBL[65]=isoBandNextYBL[105]=1,isoBandNextOBL[65]=isoBandNextOBL[105]=0,isoBandNextXTL[65]=isoBandNextXTL[105]=0,isoBandNextYTL[65]=isoBandNextYTL[105]=-1,isoBandNextOTL[65]=isoBandNextOTL[105]=0,isoBandNextXRT[160]=isoBandNextXRT[10]=-1,isoBandNextYRT[160]=isoBandNextYRT[10]=0,isoBandNextORT[160]=isoBandNextORT[10]=1,isoBandNextXRB[160]=isoBandNextXRB[10]=-1,isoBandNextYRB[160]=isoBandNextYRB[10]=0,isoBandNextORB[160]=isoBandNextORB[10]=0,isoBandNextXLB[160]=isoBandNextXLB[10]=1,isoBandNextYLB[160]=isoBandNextYLB[10]=0,isoBandNextOLB[160]=isoBandNextOLB[10]=0,isoBandNextXLT[160]=isoBandNextXLT[10]=1,isoBandNextYLT[160]=isoBandNextYLT[10]=0,isoBandNextOLT[160]=isoBandNextOLT[10]=1,isoBandNextXBR[130]=isoBandNextXBR[40]=0,isoBandNextYBR[130]=isoBandNextYBR[40]=1,isoBandNextOBR[130]=isoBandNextOBR[40]=1,isoBandNextXBL[130]=isoBandNextXBL[40]=0,isoBandNextYBL[130]=isoBandNextYBL[40]=1,isoBandNextOBL[130]=isoBandNextOBL[40]=0,isoBandNextXTL[130]=isoBandNextXTL[40]=0,isoBandNextYTL[130]=isoBandNextYTL[40]=-1,isoBandNextOTL[130]=isoBandNextOTL[40]=0,isoBandNextXTR[130]=isoBandNextXTR[40]=0,isoBandNextYTR[130]=isoBandNextYTR[40]=-1,isoBandNextOTR[130]=isoBandNextOTR[40]=1,isoBandNextXRB[37]=isoBandNextXRB[133]=0,isoBandNextYRB[37]=isoBandNextYRB[133]=1,isoBandNextORB[37]=isoBandNextORB[133]=1,isoBandNextXLB[37]=isoBandNextXLB[133]=0,isoBandNextYLB[37]=isoBandNextYLB[133]=1,isoBandNextOLB[37]=isoBandNextOLB[133]=0,isoBandNextXTL[37]=isoBandNextXTL[133]=-1,isoBandNextYTL[37]=isoBandNextYTL[133]=0,isoBandNextOTL[37]=isoBandNextOTL[133]=0,isoBandNextXTR[37]=isoBandNextXTR[133]=1,isoBandNextYTR[37]=isoBandNextYTR[133]=0,isoBandNextOTR[37]=isoBandNextOTR[133]=0,isoBandNextXBR[148]=isoBandNextXBR[22]=-1,isoBandNextYBR[148]=isoBandNextYBR[22]=0,isoBandNextOBR[148]=isoBandNextOBR[22]=0,isoBandNextXLB[148]=isoBandNextXLB[22]=0,isoBandNextYLB[148]=isoBandNextYLB[22]=-1,isoBandNextOLB[148]=isoBandNextOLB[22]=1,isoBandNextXLT[148]=isoBandNextXLT[22]=0,isoBandNextYLT[148]=isoBandNextYLT[22]=1,isoBandNextOLT[148]=isoBandNextOLT[22]=1,isoBandNextXTR[148]=isoBandNextXTR[22]=-1,isoBandNextYTR[148]=isoBandNextYTR[22]=0,isoBandNextOTR[148]=isoBandNextOTR[22]=1,isoBandNextXRT[82]=isoBandNextXRT[88]=0,isoBandNextYRT[82]=isoBandNextYRT[88]=-1,isoBandNextORT[82]=isoBandNextORT[88]=1,isoBandNextXBR[82]=isoBandNextXBR[88]=1,isoBandNextYBR[82]=isoBandNextYBR[88]=0,isoBandNextOBR[82]=isoBandNextOBR[88]=1,isoBandNextXBL[82]=isoBandNextXBL[88]=-1,isoBandNextYBL[82]=isoBandNextYBL[88]=0,isoBandNextOBL[82]=isoBandNextOBL[88]=1,isoBandNextXLT[82]=isoBandNextXLT[88]=0,isoBandNextYLT[82]=isoBandNextYLT[88]=-1,isoBandNextOLT[82]=isoBandNextOLT[88]=0,isoBandNextXRT[73]=isoBandNextXRT[97]=0,isoBandNextYRT[73]=isoBandNextYRT[97]=1,isoBandNextORT[73]=isoBandNextORT[97]=0,isoBandNextXRB[73]=isoBandNextXRB[97]=0,isoBandNextYRB[73]=isoBandNextYRB[97]=-1,isoBandNextORB[73]=isoBandNextORB[97]=0,isoBandNextXBL[73]=isoBandNextXBL[97]=1,isoBandNextYBL[73]=isoBandNextYBL[97]=0,isoBandNextOBL[73]=isoBandNextOBL[97]=0,isoBandNextXTL[73]=isoBandNextXTL[97]=1,isoBandNextYTL[73]=isoBandNextYTL[97]=0,isoBandNextOTL[73]=isoBandNextOTL[97]=1,isoBandNextXRT[145]=isoBandNextXRT[25]=0,isoBandNextYRT[145]=isoBandNextYRT[25]=-1,isoBandNextORT[145]=isoBandNextORT[25]=0,isoBandNextXBL[145]=isoBandNextXBL[25]=1,isoBandNextYBL[145]=isoBandNextYBL[25]=0,isoBandNextOBL[145]=isoBandNextOBL[25]=1,isoBandNextXLB[145]=isoBandNextXLB[25]=0,isoBandNextYLB[145]=isoBandNextYLB[25]=1,isoBandNextOLB[145]=isoBandNextOLB[25]=1,isoBandNextXTR[145]=isoBandNextXTR[25]=-1,isoBandNextYTR[145]=isoBandNextYTR[25]=0,isoBandNextOTR[145]=isoBandNextOTR[25]=0,isoBandNextXRB[70]=isoBandNextXRB[100]=0,isoBandNextYRB[70]=isoBandNextYRB[100]=1,isoBandNextORB[70]=isoBandNextORB[100]=0,isoBandNextXBR[70]=isoBandNextXBR[100]=-1,isoBandNextYBR[70]=isoBandNextYBR[100]=0,isoBandNextOBR[70]=isoBandNextOBR[100]=1,isoBandNextXLT[70]=isoBandNextXLT[100]=0,isoBandNextYLT[70]=isoBandNextYLT[100]=-1,isoBandNextOLT[70]=isoBandNextOLT[100]=1,isoBandNextXTL[70]=isoBandNextXTL[100]=1,isoBandNextYTL[70]=isoBandNextYTL[100]=0,isoBandNextOTL[70]=isoBandNextOTL[100]=0,isoBandNextXRB[101]=isoBandNextXRB[69]=0,isoBandNextYRB[101]=isoBandNextYRB[69]=1,isoBandNextORB[101]=isoBandNextORB[69]=0,isoBandNextXTL[101]=isoBandNextXTL[69]=1,isoBandNextYTL[101]=isoBandNextYTL[69]=0,isoBandNextOTL[101]=isoBandNextOTL[69]=0,isoBandNextXLB[149]=isoBandNextXLB[21]=0,isoBandNextYLB[149]=isoBandNextYLB[21]=1,isoBandNextOLB[149]=isoBandNextOLB[21]=1,isoBandNextXTR[149]=isoBandNextXTR[21]=-1,isoBandNextYTR[149]=isoBandNextYTR[21]=0,isoBandNextOTR[149]=isoBandNextOTR[21]=0,isoBandNextXBR[86]=isoBandNextXBR[84]=-1,isoBandNextYBR[86]=isoBandNextYBR[84]=0,isoBandNextOBR[86]=isoBandNextOBR[84]=1,isoBandNextXLT[86]=isoBandNextXLT[84]=0,isoBandNextYLT[86]=isoBandNextYLT[84]=-1,isoBandNextOLT[86]=isoBandNextOLT[84]=1,isoBandNextXRT[89]=isoBandNextXRT[81]=0,isoBandNextYRT[89]=isoBandNextYRT[81]=-1,isoBandNextORT[89]=isoBandNextORT[81]=0,isoBandNextXBL[89]=isoBandNextXBL[81]=1,isoBandNextYBL[89]=isoBandNextYBL[81]=0,isoBandNextOBL[89]=isoBandNextOBL[81]=1,isoBandNextXRT[96]=isoBandNextXRT[74]=0,isoBandNextYRT[96]=isoBandNextYRT[74]=1,isoBandNextORT[96]=isoBandNextORT[74]=0,isoBandNextXRB[96]=isoBandNextXRB[74]=-1,isoBandNextYRB[96]=isoBandNextYRB[74]=0,isoBandNextORB[96]=isoBandNextORB[74]=1,isoBandNextXLT[96]=isoBandNextXLT[74]=1,isoBandNextYLT[96]=isoBandNextYLT[74]=0,isoBandNextOLT[96]=isoBandNextOLT[74]=0,isoBandNextXTL[96]=isoBandNextXTL[74]=1,isoBandNextYTL[96]=isoBandNextYTL[74]=0,isoBandNextOTL[96]=isoBandNextOTL[74]=1,isoBandNextXRT[24]=isoBandNextXRT[146]=0,isoBandNextYRT[24]=isoBandNextYRT[146]=-1,isoBandNextORT[24]=isoBandNextORT[146]=1,isoBandNextXBR[24]=isoBandNextXBR[146]=1,isoBandNextYBR[24]=isoBandNextYBR[146]=0,isoBandNextOBR[24]=isoBandNextOBR[146]=1,isoBandNextXBL[24]=isoBandNextXBL[146]=0,isoBandNextYBL[24]=isoBandNextYBL[146]=1,isoBandNextOBL[24]=isoBandNextOBL[146]=1,isoBandNextXTR[24]=isoBandNextXTR[146]=0,isoBandNextYTR[24]=isoBandNextYTR[146]=-1,isoBandNextOTR[24]=isoBandNextOTR[146]=0,isoBandNextXRB[6]=isoBandNextXRB[164]=-1,isoBandNextYRB[6]=isoBandNextYRB[164]=0,isoBandNextORB[6]=isoBandNextORB[164]=1,isoBandNextXBR[6]=isoBandNextXBR[164]=-1,isoBandNextYBR[6]=isoBandNextYBR[164]=0,isoBandNextOBR[6]=isoBandNextOBR[164]=0,isoBandNextXLB[6]=isoBandNextXLB[164]=0,isoBandNextYLB[6]=isoBandNextYLB[164]=-1,isoBandNextOLB[6]=isoBandNextOLB[164]=1,isoBandNextXLT[6]=isoBandNextXLT[164]=1,isoBandNextYLT[6]=isoBandNextYLT[164]=0,isoBandNextOLT[6]=isoBandNextOLT[164]=0,isoBandNextXBL[129]=isoBandNextXBL[41]=0,isoBandNextYBL[129]=isoBandNextYBL[41]=1,isoBandNextOBL[129]=isoBandNextOBL[41]=1,isoBandNextXLB[129]=isoBandNextXLB[41]=0,isoBandNextYLB[129]=isoBandNextYLB[41]=1,isoBandNextOLB[129]=isoBandNextOLB[41]=0,isoBandNextXTL[129]=isoBandNextXTL[41]=-1,isoBandNextYTL[129]=isoBandNextYTL[41]=0,isoBandNextOTL[129]=isoBandNextOTL[41]=0,isoBandNextXTR[129]=isoBandNextXTR[41]=0,isoBandNextYTR[129]=isoBandNextYTR[41]=-1,isoBandNextOTR[129]=isoBandNextOTR[41]=0,isoBandNextXBR[66]=isoBandNextXBR[104]=0,isoBandNextYBR[66]=isoBandNextYBR[104]=1,isoBandNextOBR[66]=isoBandNextOBR[104]=0,isoBandNextXBL[66]=isoBandNextXBL[104]=-1,isoBandNextYBL[66]=isoBandNextYBL[104]=0,isoBandNextOBL[66]=isoBandNextOBL[104]=1,isoBandNextXLT[66]=isoBandNextXLT[104]=0,isoBandNextYLT[66]=isoBandNextYLT[104]=-1,isoBandNextOLT[66]=isoBandNextOLT[104]=0,isoBandNextXTL[66]=isoBandNextXTL[104]=0,isoBandNextYTL[66]=isoBandNextYTL[104]=-1,isoBandNextOTL[66]=isoBandNextOTL[104]=1,isoBandNextXRT[144]=isoBandNextXRT[26]=-1,isoBandNextYRT[144]=isoBandNextYRT[26]=0,isoBandNextORT[144]=isoBandNextORT[26]=0,isoBandNextXLB[144]=isoBandNextXLB[26]=1,isoBandNextYLB[144]=isoBandNextYLB[26]=0,isoBandNextOLB[144]=isoBandNextOLB[26]=1,isoBandNextXLT[144]=isoBandNextXLT[26]=0,isoBandNextYLT[144]=isoBandNextYLT[26]=1,isoBandNextOLT[144]=isoBandNextOLT[26]=1,isoBandNextXTR[144]=isoBandNextXTR[26]=-1,isoBandNextYTR[144]=isoBandNextYTR[26]=0,isoBandNextOTR[144]=isoBandNextOTR[26]=1,isoBandNextXRB[36]=isoBandNextXRB[134]=0,isoBandNextYRB[36]=isoBandNextYRB[134]=1,isoBandNextORB[36]=isoBandNextORB[134]=1,isoBandNextXBR[36]=isoBandNextXBR[134]=0,isoBandNextYBR[36]=isoBandNextYBR[134]=1,isoBandNextOBR[36]=isoBandNextOBR[134]=0,isoBandNextXTL[36]=isoBandNextXTL[134]=0,isoBandNextYTL[36]=isoBandNextYTL[134]=-1,isoBandNextOTL[36]=isoBandNextOTL[134]=1,isoBandNextXTR[36]=isoBandNextXTR[134]=1,isoBandNextYTR[36]=isoBandNextYTR[134]=0,isoBandNextOTR[36]=isoBandNextOTR[134]=0,isoBandNextXRT[9]=isoBandNextXRT[161]=-1,isoBandNextYRT[9]=isoBandNextYRT[161]=0,isoBandNextORT[9]=isoBandNextORT[161]=0,isoBandNextXRB[9]=isoBandNextXRB[161]=0,isoBandNextYRB[9]=isoBandNextYRB[161]=-1,isoBandNextORB[9]=isoBandNextORB[161]=0,isoBandNextXBL[9]=isoBandNextXBL[161]=1,isoBandNextYBL[9]=isoBandNextYBL[161]=0,isoBandNextOBL[9]=isoBandNextOBL[161]=0,isoBandNextXLB[9]=isoBandNextXLB[161]=1,isoBandNextYLB[9]=isoBandNextYLB[161]=0,isoBandNextOLB[9]=isoBandNextOLB[161]=1,isoBandNextXRT[136]=0,isoBandNextYRT[136]=1,isoBandNextORT[136]=1,isoBandNextXRB[136]=0,isoBandNextYRB[136]=1,isoBandNextORB[136]=0,isoBandNextXBR[136]=-1,isoBandNextYBR[136]=0,isoBandNextOBR[136]=1,isoBandNextXBL[136]=-1,isoBandNextYBL[136]=0,isoBandNextOBL[136]=0,isoBandNextXLB[136]=0,isoBandNextYLB[136]=-1,isoBandNextOLB[136]=0,isoBandNextXLT[136]=0,isoBandNextYLT[136]=-1,isoBandNextOLT[136]=1,isoBandNextXTL[136]=1,isoBandNextYTL[136]=0,isoBandNextOTL[136]=0,isoBandNextXTR[136]=1,isoBandNextYTR[136]=0,isoBandNextOTR[136]=1,isoBandNextXRT[34]=0,isoBandNextYRT[34]=-1,isoBandNextORT[34]=0,isoBandNextXRB[34]=0,isoBandNextYRB[34]=-1,isoBandNextORB[34]=1,isoBandNextXBR[34]=1,isoBandNextYBR[34]=0,isoBandNextOBR[34]=0,isoBandNextXBL[34]=1,isoBandNextYBL[34]=0,isoBandNextOBL[34]=1,isoBandNextXLB[34]=0,isoBandNextYLB[34]=1,isoBandNextOLB[34]=1,isoBandNextXLT[34]=0,isoBandNextYLT[34]=1,isoBandNextOLT[34]=0,isoBandNextXTL[34]=-1,isoBandNextYTL[34]=0,isoBandNextOTL[34]=1,isoBandNextXTR[34]=-1,isoBandNextYTR[34]=0,isoBandNextOTR[34]=0,isoBandNextXRT[35]=0,isoBandNextYRT[35]=1,isoBandNextORT[35]=1,isoBandNextXRB[35]=0,isoBandNextYRB[35]=-1,isoBandNextORB[35]=1,isoBandNextXBR[35]=1,isoBandNextYBR[35]=0,isoBandNextOBR[35]=0,isoBandNextXBL[35]=-1,isoBandNextYBL[35]=0,isoBandNextOBL[35]=0,isoBandNextXLB[35]=0,isoBandNextYLB[35]=-1,isoBandNextOLB[35]=0,isoBandNextXLT[35]=0,isoBandNextYLT[35]=1,isoBandNextOLT[35]=0,isoBandNextXTL[35]=-1,isoBandNextYTL[35]=0,isoBandNextOTL[35]=1,isoBandNextXTR[35]=1,isoBandNextYTR[35]=0,isoBandNextOTR[35]=1,isoBandNextXRT[153]=0,isoBandNextYRT[153]=1,isoBandNextORT[153]=1,isoBandNextXBL[153]=-1,isoBandNextYBL[153]=0,isoBandNextOBL[153]=0,isoBandNextXLB[153]=0,isoBandNextYLB[153]=-1,isoBandNextOLB[153]=0,isoBandNextXTR[153]=1,isoBandNextYTR[153]=0,isoBandNextOTR[153]=1,isoBandNextXRB[102]=0,isoBandNextYRB[102]=-1,isoBandNextORB[102]=1,isoBandNextXBR[102]=1,isoBandNextYBR[102]=0,isoBandNextOBR[102]=0,isoBandNextXLT[102]=0,isoBandNextYLT[102]=1,isoBandNextOLT[102]=0,isoBandNextXTL[102]=-1,isoBandNextYTL[102]=0,isoBandNextOTL[102]=1,isoBandNextXRT[155]=0,isoBandNextYRT[155]=-1,isoBandNextORT[155]=0,isoBandNextXBL[155]=1,isoBandNextYBL[155]=0,isoBandNextOBL[155]=1,isoBandNextXLB[155]=0,isoBandNextYLB[155]=1,isoBandNextOLB[155]=1,isoBandNextXTR[155]=-1,isoBandNextYTR[155]=0,isoBandNextOTR[155]=0,isoBandNextXRB[103]=0,isoBandNextYRB[103]=1,isoBandNextORB[103]=0,isoBandNextXBR[103]=-1,isoBandNextYBR[103]=0,isoBandNextOBR[103]=1,isoBandNextXLT[103]=0,isoBandNextYLT[103]=-1,isoBandNextOLT[103]=1,isoBandNextXTL[103]=1,isoBandNextYTL[103]=0,isoBandNextOTL[103]=0,isoBandNextXRT[152]=0,isoBandNextYRT[152]=1,isoBandNextORT[152]=1,isoBandNextXBR[152]=-1,isoBandNextYBR[152]=0,isoBandNextOBR[152]=1,isoBandNextXBL[152]=-1,isoBandNextYBL[152]=0,isoBandNextOBL[152]=0,isoBandNextXLB[152]=0,isoBandNextYLB[152]=-1,isoBandNextOLB[152]=0,isoBandNextXLT[152]=0,isoBandNextYLT[152]=-1,isoBandNextOLT[152]=1,isoBandNextXTR[152]=1,isoBandNextYTR[152]=0,isoBandNextOTR[152]=1,isoBandNextXRT[156]=0,isoBandNextYRT[156]=-1,isoBandNextORT[156]=1,isoBandNextXBR[156]=1,isoBandNextYBR[156]=0,isoBandNextOBR[156]=1,isoBandNextXBL[156]=-1,isoBandNextYBL[156]=0,isoBandNextOBL[156]=0,isoBandNextXLB[156]=0,isoBandNextYLB[156]=-1,isoBandNextOLB[156]=0,isoBandNextXLT[156]=0,isoBandNextYLT[156]=1,isoBandNextOLT[156]=1,isoBandNextXTR[156]=-1,isoBandNextYTR[156]=0,isoBandNextOTR[156]=1,isoBandNextXRT[137]=0,isoBandNextYRT[137]=1,isoBandNextORT[137]=1,isoBandNextXRB[137]=0,isoBandNextYRB[137]=1,isoBandNextORB[137]=0,isoBandNextXBL[137]=-1,isoBandNextYBL[137]=0,isoBandNextOBL[137]=0,isoBandNextXLB[137]=0,isoBandNextYLB[137]=-1,isoBandNextOLB[137]=0,isoBandNextXTL[137]=1,isoBandNextYTL[137]=0,isoBandNextOTL[137]=0,isoBandNextXTR[137]=1,isoBandNextYTR[137]=0,isoBandNextOTR[137]=1,isoBandNextXRT[139]=0,isoBandNextYRT[139]=1,isoBandNextORT[139]=1,isoBandNextXRB[139]=0,isoBandNextYRB[139]=-1,isoBandNextORB[139]=0,isoBandNextXBL[139]=1,isoBandNextYBL[139]=0,isoBandNextOBL[139]=0,isoBandNextXLB[139]=0,isoBandNextYLB[139]=1,isoBandNextOLB[139]=0,isoBandNextXTL[139]=-1,isoBandNextYTL[139]=0,isoBandNextOTL[139]=0,isoBandNextXTR[139]=1,isoBandNextYTR[139]=0,isoBandNextOTR[139]=1,isoBandNextXRT[98]=0,isoBandNextYRT[98]=-1,isoBandNextORT[98]=0,isoBandNextXRB[98]=0,isoBandNextYRB[98]=-1,isoBandNextORB[98]=1,isoBandNextXBR[98]=1,isoBandNextYBR[98]=0,isoBandNextOBR[98]=0,isoBandNextXBL[98]=1,isoBandNextYBL[98]=0,isoBandNextOBL[98]=1,isoBandNextXLT[98]=0,isoBandNextYLT[98]=1,isoBandNextOLT[98]=0,isoBandNextXTL[98]=-1,isoBandNextYTL[98]=0,isoBandNextOTL[98]=1,isoBandNextXRT[99]=0,isoBandNextYRT[99]=1,isoBandNextORT[99]=0,isoBandNextXRB[99]=0,isoBandNextYRB[99]=-1,isoBandNextORB[99]=1,isoBandNextXBR[99]=1,isoBandNextYBR[99]=0,isoBandNextOBR[99]=0,isoBandNextXBL[99]=-1,isoBandNextYBL[99]=0,isoBandNextOBL[99]=1,isoBandNextXLT[99]=0,isoBandNextYLT[99]=-1,isoBandNextOLT[99]=0,isoBandNextXTL[99]=1,isoBandNextYTL[99]=0,isoBandNextOTL[99]=1,isoBandNextXRB[38]=0,isoBandNextYRB[38]=-1,isoBandNextORB[38]=1,isoBandNextXBR[38]=1,isoBandNextYBR[38]=0,isoBandNextOBR[38]=0,isoBandNextXLB[38]=0,isoBandNextYLB[38]=1,isoBandNextOLB[38]=1,isoBandNextXLT[38]=0,isoBandNextYLT[38]=1,isoBandNextOLT[38]=0,isoBandNextXTL[38]=-1,isoBandNextYTL[38]=0,isoBandNextOTL[38]=1,isoBandNextXTR[38]=-1,isoBandNextYTR[38]=0,isoBandNextOTR[38]=0,isoBandNextXRB[39]=0,isoBandNextYRB[39]=1,isoBandNextORB[39]=1,isoBandNextXBR[39]=-1,isoBandNextYBR[39]=0,isoBandNextOBR[39]=0,isoBandNextXLB[39]=0,isoBandNextYLB[39]=-1,isoBandNextOLB[39]=1,isoBandNextXLT[39]=0,isoBandNextYLT[39]=1,isoBandNextOLT[39]=0,isoBandNextXTL[39]=-1,isoBandNextYTL[39]=0,isoBandNextOTL[39]=1,isoBandNextXTR[39]=1,isoBandNextYTR[39]=0,isoBandNextOTR[39]=0;var p00=function(cell){return[[cell.bottomleft,0],[0,0],[0,cell.leftbottom]]},p01=function(cell){return[[1,cell.rightbottom],[1,0],[cell.bottomright,0]]},p02=function(cell){return[[cell.topright,1],[1,1],[1,cell.righttop]]},p03=function(cell){return[[0,cell.lefttop],[0,1],[cell.topleft,1]]},p04=function(cell){return[[cell.bottomright,0],[cell.bottomleft,0],[0,cell.leftbottom],[0,cell.lefttop]]},p05=function(cell){return[[cell.bottomright,0],[cell.bottomleft,0],[1,cell.righttop],[1,cell.rightbottom]]},p06=function(cell){return[[1,cell.righttop],[1,cell.rightbottom],[cell.topleft,1],[cell.topright,1]]},p07=function(cell){return[[0,cell.leftbottom],[0,cell.lefttop],[cell.topleft,1],[cell.topright,1]]},p08=function(cell){return[[0,0],[0,cell.leftbottom],[1,cell.rightbottom],[1,0]]},p09=function(cell){return[[1,0],[cell.bottomright,0],[cell.topright,1],[1,1]]},p10=function(cell){return[[1,1],[1,cell.righttop],[0,cell.lefttop],[0,1]]},p11=function(cell){return[[cell.bottomleft,0],[0,0],[0,1],[cell.topleft,1]]},p12=function(cell){return[[1,cell.righttop],[1,cell.rightbottom],[0,cell.leftbottom],[0,cell.lefttop]]},p13=function(cell){return[[cell.topleft,1],[cell.topright,1],[cell.bottomright,0],[cell.bottomleft,0]]},p14=function(){return[[0,0],[0,1],[1,1],[1,0]]},p15=function(cell){return[[1,cell.rightbottom],[1,0],[0,0],[0,1],[cell.topleft,1]]},p16=function(cell){return[[cell.topright,1],[1,1],[1,0],[0,0],[0,cell.leftbottom]]},p17=function(cell){return[[1,0],[cell.bottomright,0],[0,cell.lefttop],[0,1],[1,1]]},p18=function(cell){return[[1,1],[1,cell.righttop],[cell.bottomleft,0],[0,0],[0,1]]},p19=function(cell){return[[1,cell.righttop],[1,cell.rightbottom],[0,cell.lefttop],[0,1],[cell.topleft,1]]},p20=function(cell){return[[1,1],[1,cell.righttop],[cell.bottomright,0],[cell.bottomleft,0],[cell.topright,1]]},p21=function(cell){return[[1,cell.rightbottom],[1,0],[cell.bottomright,0],[0,cell.leftbottom],[0,cell.lefttop]]},p22=function(cell){return[[cell.topright,1],[cell.bottomleft,0],[0,0],[0,cell.leftbottom],[cell.topleft,1]]},p23=function(cell){return[[cell.bottomright,0],[cell.bottomleft,0],[0,cell.lefttop],[0,1],[cell.topleft,1]]},p24=function(cell){return[[1,1],[1,cell.righttop],[0,cell.leftbottom],[0,cell.lefttop],[cell.topright,1]]},p25=function(cell){return[[1,cell.rightbottom],[1,0],[cell.bottomright,0],[cell.topleft,1],[cell.topright,1]]},p26=function(cell){return[[1,cell.righttop],[1,cell.rightbottom],[cell.bottomleft,0],[0,0],[0,cell.leftbottom]]},p27=function(cell){return[[1,cell.rightbottom],[1,0],[0,0],[0,cell.leftbottom],[cell.topleft,1],[cell.topright,1]]},p28=function(cell){return[[1,1],[1,0],[cell.bottomright,0],[0,cell.leftbottom],[0,cell.lefttop],[cell.topright,1]]},p29=function(cell){return[[1,1],[1,cell.righttop],[cell.bottomright,0],[cell.bottomleft,0],[0,cell.lefttop],[0,1]]},p30=function(cell){return[[1,cell.righttop],[1,cell.rightbottom],[cell.bottomleft,0],[0,0],[0,1],[cell.topleft,1]]},p31=function(cell){return[[1,1],[1,cell.righttop],[cell.bottomleft,0],[0,0],[0,cell.leftbottom],[cell.topright,1]]},p32=function(cell){return[[1,cell.rightbottom],[1,0],[cell.bottomright,0],[0,cell.lefttop],[0,1],[cell.topleft,1]]},p33=function(cell){return[[1,cell.righttop],[1,cell.rightbottom],[cell.bottomright,0],[cell.bottomleft,0],[0,cell.leftbottom],[0,cell.lefttop],[cell.topleft,1],[cell.topright,1]]},p34=function(cell){return[[1,1],[1,cell.righttop],[cell.bottomleft,0],[0,0],[0,cell.leftbottom],[cell.topright,1]]},p35=function(cell){return[[1,cell.rightbottom],[1,0],[cell.bottomright,0],[0,cell.lefttop],[0,1],[cell.topleft,1]]},p36=function(cell){return[[1,1],[1,cell.righttop],[cell.bottomright,0],[cell.bottomleft,0],[0,cell.leftbottom],[0,cell.lefttop],[cell.topright,1]]},p37=function(cell){return[[1,cell.righttop],[1,cell.rightbottom],[cell.bottomleft,0],[0,0],[0,cell.leftbottom],[cell.topleft,1],[cell.topright,1]]},p38=function(cell){return[[1,cell.righttop],[1,cell.rightbottom],[cell.bottomright,0],[cell.bottomleft,0],[0,cell.lefttop],[0,1],[cell.topleft,1]]},p39=function(cell){return[[1,cell.rightbottom],[1,0],[cell.bottomright,0],[0,cell.leftbottom],[0,cell.lefttop],[cell.topleft,1],[cell.topright,1]]},isoBandEdgeRT=[],isoBandEdgeRB=[],isoBandEdgeBR=[],isoBandEdgeBL=[],isoBandEdgeLB=[],isoBandEdgeLT=[],isoBandEdgeTL=[],isoBandEdgeTR=[];isoBandEdgeBL[1]=isoBandEdgeLB[1]=18,isoBandEdgeBL[169]=isoBandEdgeLB[169]=18,isoBandEdgeBR[4]=isoBandEdgeRB[4]=12,isoBandEdgeBR[166]=isoBandEdgeRB[166]=12,isoBandEdgeRT[16]=isoBandEdgeTR[16]=4,isoBandEdgeRT[154]=isoBandEdgeTR[154]=4,isoBandEdgeLT[64]=isoBandEdgeTL[64]=22,isoBandEdgeLT[106]=isoBandEdgeTL[106]=22,isoBandEdgeBR[2]=isoBandEdgeLT[2]=17,isoBandEdgeBL[2]=isoBandEdgeLB[2]=18,isoBandEdgeBR[168]=isoBandEdgeLT[168]=17,isoBandEdgeBL[168]=isoBandEdgeLB[168]=18,isoBandEdgeRT[8]=isoBandEdgeBL[8]=9,isoBandEdgeRB[8]=isoBandEdgeBR[8]=12,isoBandEdgeRT[162]=isoBandEdgeBL[162]=9,isoBandEdgeRB[162]=isoBandEdgeBR[162]=12,isoBandEdgeRT[32]=isoBandEdgeTR[32]=4,isoBandEdgeRB[32]=isoBandEdgeTL[32]=1,isoBandEdgeRT[138]=isoBandEdgeTR[138]=4,isoBandEdgeRB[138]=isoBandEdgeTL[138]=1,isoBandEdgeLB[128]=isoBandEdgeTR[128]=21,isoBandEdgeLT[128]=isoBandEdgeTL[128]=22,isoBandEdgeLB[42]=isoBandEdgeTR[42]=21,isoBandEdgeLT[42]=isoBandEdgeTL[42]=22,isoBandEdgeRB[5]=isoBandEdgeLB[5]=14,isoBandEdgeRB[165]=isoBandEdgeLB[165]=14,isoBandEdgeBR[20]=isoBandEdgeTR[20]=6,isoBandEdgeBR[150]=isoBandEdgeTR[150]=6,isoBandEdgeRT[80]=isoBandEdgeLT[80]=11,isoBandEdgeRT[90]=isoBandEdgeLT[90]=11,isoBandEdgeBL[65]=isoBandEdgeTL[65]=3,isoBandEdgeBL[105]=isoBandEdgeTL[105]=3,isoBandEdgeRT[160]=isoBandEdgeLT[160]=11,isoBandEdgeRB[160]=isoBandEdgeLB[160]=14,isoBandEdgeRT[10]=isoBandEdgeLT[10]=11,isoBandEdgeRB[10]=isoBandEdgeLB[10]=14,isoBandEdgeBR[130]=isoBandEdgeTR[130]=6,isoBandEdgeBL[130]=isoBandEdgeTL[130]=3,isoBandEdgeBR[40]=isoBandEdgeTR[40]=6,isoBandEdgeBL[40]=isoBandEdgeTL[40]=3,isoBandEdgeRB[101]=isoBandEdgeTL[101]=1,isoBandEdgeRB[69]=isoBandEdgeTL[69]=1,isoBandEdgeLB[149]=isoBandEdgeTR[149]=21,isoBandEdgeLB[21]=isoBandEdgeTR[21]=21,isoBandEdgeBR[86]=isoBandEdgeLT[86]=17,isoBandEdgeBR[84]=isoBandEdgeLT[84]=17,isoBandEdgeRT[89]=isoBandEdgeBL[89]=9,isoBandEdgeRT[81]=isoBandEdgeBL[81]=9,isoBandEdgeRT[96]=isoBandEdgeTL[96]=0,isoBandEdgeRB[96]=isoBandEdgeLT[96]=15,isoBandEdgeRT[74]=isoBandEdgeTL[74]=0,isoBandEdgeRB[74]=isoBandEdgeLT[74]=15,isoBandEdgeRT[24]=isoBandEdgeBR[24]=8,isoBandEdgeBL[24]=isoBandEdgeTR[24]=7,isoBandEdgeRT[146]=isoBandEdgeBR[146]=8,isoBandEdgeBL[146]=isoBandEdgeTR[146]=7,isoBandEdgeRB[6]=isoBandEdgeLT[6]=15,isoBandEdgeBR[6]=isoBandEdgeLB[6]=16,isoBandEdgeRB[164]=isoBandEdgeLT[164]=15,isoBandEdgeBR[164]=isoBandEdgeLB[164]=16,isoBandEdgeBL[129]=isoBandEdgeTR[129]=7,isoBandEdgeLB[129]=isoBandEdgeTL[129]=20,isoBandEdgeBL[41]=isoBandEdgeTR[41]=7,isoBandEdgeLB[41]=isoBandEdgeTL[41]=20,isoBandEdgeBR[66]=isoBandEdgeTL[66]=2,isoBandEdgeBL[66]=isoBandEdgeLT[66]=19,isoBandEdgeBR[104]=isoBandEdgeTL[104]=2,isoBandEdgeBL[104]=isoBandEdgeLT[104]=19,isoBandEdgeRT[144]=isoBandEdgeLB[144]=10,isoBandEdgeLT[144]=isoBandEdgeTR[144]=23,isoBandEdgeRT[26]=isoBandEdgeLB[26]=10,isoBandEdgeLT[26]=isoBandEdgeTR[26]=23,isoBandEdgeRB[36]=isoBandEdgeTR[36]=5,isoBandEdgeBR[36]=isoBandEdgeTL[36]=2,isoBandEdgeRB[134]=isoBandEdgeTR[134]=5,isoBandEdgeBR[134]=isoBandEdgeTL[134]=2,isoBandEdgeRT[9]=isoBandEdgeLB[9]=10,isoBandEdgeRB[9]=isoBandEdgeBL[9]=13,isoBandEdgeRT[161]=isoBandEdgeLB[161]=10,isoBandEdgeRB[161]=isoBandEdgeBL[161]=13,isoBandEdgeRB[37]=isoBandEdgeTR[37]=5,isoBandEdgeLB[37]=isoBandEdgeTL[37]=20,isoBandEdgeRB[133]=isoBandEdgeTR[133]=5,isoBandEdgeLB[133]=isoBandEdgeTL[133]=20,isoBandEdgeBR[148]=isoBandEdgeLB[148]=16,isoBandEdgeLT[148]=isoBandEdgeTR[148]=23,isoBandEdgeBR[22]=isoBandEdgeLB[22]=16,isoBandEdgeLT[22]=isoBandEdgeTR[22]=23,isoBandEdgeRT[82]=isoBandEdgeBR[82]=8,isoBandEdgeBL[82]=isoBandEdgeLT[82]=19,isoBandEdgeRT[88]=isoBandEdgeBR[88]=8,isoBandEdgeBL[88]=isoBandEdgeLT[88]=19,isoBandEdgeRT[73]=isoBandEdgeTL[73]=0,isoBandEdgeRB[73]=isoBandEdgeBL[73]=13,isoBandEdgeRT[97]=isoBandEdgeTL[97]=0,isoBandEdgeRB[97]=isoBandEdgeBL[97]=13,isoBandEdgeRT[145]=isoBandEdgeBL[145]=9,isoBandEdgeLB[145]=isoBandEdgeTR[145]=21,isoBandEdgeRT[25]=isoBandEdgeBL[25]=9,isoBandEdgeLB[25]=isoBandEdgeTR[25]=21,isoBandEdgeRB[70]=isoBandEdgeTL[70]=1,isoBandEdgeBR[70]=isoBandEdgeLT[70]=17,isoBandEdgeRB[100]=isoBandEdgeTL[100]=1,isoBandEdgeBR[100]=isoBandEdgeLT[100]=17,isoBandEdgeRT[34]=isoBandEdgeBL[34]=9,isoBandEdgeRB[34]=isoBandEdgeBR[34]=12,isoBandEdgeLB[34]=isoBandEdgeTR[34]=21,isoBandEdgeLT[34]=isoBandEdgeTL[34]=22,isoBandEdgeRT[136]=isoBandEdgeTR[136]=4,isoBandEdgeRB[136]=isoBandEdgeTL[136]=1,isoBandEdgeBR[136]=isoBandEdgeLT[136]=17,isoBandEdgeBL[136]=isoBandEdgeLB[136]=18,isoBandEdgeRT[35]=isoBandEdgeTR[35]=4,isoBandEdgeRB[35]=isoBandEdgeBR[35]=12,isoBandEdgeBL[35]=isoBandEdgeLB[35]=18,isoBandEdgeLT[35]=isoBandEdgeTL[35]=22,isoBandEdgeRT[153]=isoBandEdgeTR[153]=4,isoBandEdgeBL[153]=isoBandEdgeLB[153]=18,isoBandEdgeRB[102]=isoBandEdgeBR[102]=12,isoBandEdgeLT[102]=isoBandEdgeTL[102]=22,isoBandEdgeRT[155]=isoBandEdgeBL[155]=9,isoBandEdgeLB[155]=isoBandEdgeTR[155]=23,isoBandEdgeRB[103]=isoBandEdgeTL[103]=1,isoBandEdgeBR[103]=isoBandEdgeLT[103]=17,isoBandEdgeRT[152]=isoBandEdgeTR[152]=4,isoBandEdgeBR[152]=isoBandEdgeLT[152]=17,isoBandEdgeBL[152]=isoBandEdgeLB[152]=18,isoBandEdgeRT[156]=isoBandEdgeBR[156]=8,isoBandEdgeBL[156]=isoBandEdgeLB[156]=18,isoBandEdgeLT[156]=isoBandEdgeTR[156]=23,isoBandEdgeRT[137]=isoBandEdgeTR[137]=4,isoBandEdgeRB[137]=isoBandEdgeTL[137]=1,isoBandEdgeBL[137]=isoBandEdgeLB[137]=18,isoBandEdgeRT[139]=isoBandEdgeTR[139]=4,isoBandEdgeRB[139]=isoBandEdgeBL[139]=13,isoBandEdgeLB[139]=isoBandEdgeTL[139]=20,isoBandEdgeRT[98]=isoBandEdgeBL[98]=9,isoBandEdgeRB[98]=isoBandEdgeBR[98]=12,isoBandEdgeLT[98]=isoBandEdgeTL[98]=22,isoBandEdgeRT[99]=isoBandEdgeTL[99]=0,isoBandEdgeRB[99]=isoBandEdgeBR[99]=12,isoBandEdgeBL[99]=isoBandEdgeLT[99]=19,isoBandEdgeRB[38]=isoBandEdgeBR[38]=12,isoBandEdgeLB[38]=isoBandEdgeTR[38]=21,isoBandEdgeLT[38]=isoBandEdgeTL[38]=22,isoBandEdgeRB[39]=isoBandEdgeTR[39]=5,isoBandEdgeBR[39]=isoBandEdgeLB[39]=16,isoBandEdgeLT[39]=isoBandEdgeTL[39]=22;var polygon_table=[];polygon_table[1]=polygon_table[169]=p00,polygon_table[4]=polygon_table[166]=p01,polygon_table[16]=polygon_table[154]=p02,polygon_table[64]=polygon_table[106]=p03,polygon_table[168]=polygon_table[2]=p04,polygon_table[162]=polygon_table[8]=p05,polygon_table[138]=polygon_table[32]=p06,polygon_table[42]=polygon_table[128]=p07,polygon_table[5]=polygon_table[165]=p08,polygon_table[20]=polygon_table[150]=p09,polygon_table[80]=polygon_table[90]=p10,polygon_table[65]=polygon_table[105]=p11,polygon_table[160]=polygon_table[10]=p12,polygon_table[130]=polygon_table[40]=p13,polygon_table[85]=p14,polygon_table[101]=polygon_table[69]=p15,polygon_table[149]=polygon_table[21]=p16,polygon_table[86]=polygon_table[84]=p17,polygon_table[89]=polygon_table[81]=p18,polygon_table[96]=polygon_table[74]=p19,polygon_table[24]=polygon_table[146]=p20,polygon_table[6]=polygon_table[164]=p21,polygon_table[129]=polygon_table[41]=p22,polygon_table[66]=polygon_table[104]=p23,polygon_table[144]=polygon_table[26]=p24,polygon_table[36]=polygon_table[134]=p25,polygon_table[9]=polygon_table[161]=p26,polygon_table[37]=polygon_table[133]=p27,polygon_table[148]=polygon_table[22]=p28,polygon_table[82]=polygon_table[88]=p29,polygon_table[73]=polygon_table[97]=p30,polygon_table[145]=polygon_table[25]=p31,polygon_table[70]=polygon_table[100]=p32,polygon_table[34]=function(c){return[p07(c),p05(c)]},polygon_table[35]=p33,polygon_table[136]=function(c){return[p06(c),p04(c)]},polygon_table[153]=function(c){return[p02(c),p00(c)]},polygon_table[102]=function(c){return[p01(c),p03(c)]},polygon_table[155]=p34,polygon_table[103]=p35,polygon_table[152]=function(c){return[p02(c),p04(c)]},polygon_table[156]=p36,polygon_table[137]=function(c){return[p06(c),p00(c)]},polygon_table[139]=p37,polygon_table[98]=function(c){return[p05(c),p03(c)]},polygon_table[99]=p38,polygon_table[38]=function(c){return[p01(c),p07(c)]},polygon_table[39]=p39;var Node$1=function Node(coordinates){this.id=Node.buildId(coordinates),this.coordinates=coordinates,this.innerEdges=[],this.outerEdges=[],this.outerEdgesSorted=!1};Node$1.buildId=function buildId(coordinates){return coordinates.join(",")},Node$1.prototype.removeInnerEdge=function removeInnerEdge(edge){this.innerEdges=this.innerEdges.filter(function(e){return e.from.id!==edge.from.id})},Node$1.prototype.removeOuterEdge=function removeOuterEdge(edge){this.outerEdges=this.outerEdges.filter(function(e){return e.to.id!==edge.to.id})},Node$1.prototype.addOuterEdge=function addOuterEdge(edge){this.outerEdges.push(edge),this.outerEdgesSorted=!1},Node$1.prototype.sortOuterEdges=function sortOuterEdges(){var this$1=this;this.outerEdgesSorted||(this.outerEdges.sort(function(a,b){var aNode=a.to,bNode=b.to;if(0<=aNode.coordinates[0]-this$1.coordinates[0]&&0>bNode.coordinates[0]-this$1.coordinates[0])return 1;if(0>aNode.coordinates[0]-this$1.coordinates[0]&&0<=bNode.coordinates[0]-this$1.coordinates[0])return-1;if(0==aNode.coordinates[0]-this$1.coordinates[0]&&0==bNode.coordinates[0]-this$1.coordinates[0])return 0<=aNode.coordinates[1]-this$1.coordinates[1]||0<=bNode.coordinates[1]-this$1.coordinates[1]?aNode.coordinates[1]-bNode.coordinates[1]:bNode.coordinates[1]-aNode.coordinates[1];var det=orientationIndex(this$1.coordinates,aNode.coordinates,bNode.coordinates);if(0>det)return 1;if(0<det)return-1;var d1=_Mathpow(aNode.coordinates[0]-this$1.coordinates[0],2)+_Mathpow(aNode.coordinates[1]-this$1.coordinates[1],2),d2=_Mathpow(bNode.coordinates[0]-this$1.coordinates[0],2)+_Mathpow(bNode.coordinates[1]-this$1.coordinates[1],2);return d1-d2}),this.outerEdgesSorted=!0)},Node$1.prototype.getOuterEdges=function getOuterEdges(){return this.sortOuterEdges(),this.outerEdges},Node$1.prototype.getOuterEdge=function getOuterEdge(i){return this.sortOuterEdges(),this.outerEdges[i]},Node$1.prototype.addInnerEdge=function addInnerEdge(edge){this.innerEdges.push(edge)};var Edge=function Edge(from,to){this.from=from,this.to=to,this.next=void 0,this.label=void 0,this.symetric=void 0,this.ring=void 0,this.from.addOuterEdge(this),this.to.addInnerEdge(this)};Edge.prototype.getSymetric=function getSymetric(){return this.symetric||(this.symetric=new Edge(this.to,this.from),this.symetric.symetric=this),this.symetric},Edge.prototype.deleteEdge=function deleteEdge(){this.from.removeOuterEdge(this),this.to.removeInnerEdge(this)},Edge.prototype.isEqual=function isEqual(edge){return this.from.id===edge.from.id&&this.to.id===edge.to.id},Edge.prototype.toString=function toString(){return"Edge { "+this.from.id+" -> "+this.to.id+" }"},Edge.prototype.toLineString=function toLineString(){return lineString([this.from.coordinates,this.to.coordinates])},Edge.prototype.compareTo=function compareTo(edge){return orientationIndex(edge.from.coordinates,edge.to.coordinates,this.to.coordinates)};var EdgeRing=function EdgeRing(){this.edges=[],this.polygon=void 0,this.envelope=void 0},prototypeAccessors={length:{configurable:!0}};EdgeRing.prototype.push=function push(edge){this[this.edges.length]=edge,this.edges.push(edge),this.polygon=this.envelope=void 0},EdgeRing.prototype.get=function get(i){return this.edges[i]},prototypeAccessors.length.get=function(){return this.edges.length},EdgeRing.prototype.forEach=function forEach(f){this.edges.forEach(f)},EdgeRing.prototype.map=function map(f){return this.edges.map(f)},EdgeRing.prototype.some=function some(f){return this.edges.some(f)},EdgeRing.prototype.isValid=function isValid(){return!0},EdgeRing.prototype.isHole=function isHole(){var this$1=this,hiIndex=this.edges.reduce(function(high,edge,i){return edge.from.coordinates[1]>this$1.edges[high].from.coordinates[1]&&(high=i),high},0),iPrev=(0===hiIndex?this.length:hiIndex)-1,iNext=(hiIndex+1)%this.length,disc=orientationIndex(this.edges[iPrev].from.coordinates,this.edges[hiIndex].from.coordinates,this.edges[iNext].from.coordinates);return 0===disc?this.edges[iPrev].from.coordinates[0]>this.edges[iNext].from.coordinates[0]:0<disc},EdgeRing.prototype.toMultiPoint=function toMultiPoint(){return multiPoint(this.edges.map(function(edge){return edge.from.coordinates}))},EdgeRing.prototype.toPolygon=function toPolygon(){if(this.polygon)return this.polygon;var coordinates=this.edges.map(function(edge){return edge.from.coordinates});return coordinates.push(this.edges[0].from.coordinates),this.polygon=polygon([coordinates])},EdgeRing.prototype.getEnvelope=function getEnvelope(){return this.envelope?this.envelope:this.envelope=envelope(this.toPolygon())},EdgeRing.findEdgeRingContaining=function findEdgeRingContaining(testEdgeRing,shellList){var testEnvelope=testEdgeRing.getEnvelope(),minEnvelope,minShell;return shellList.forEach(function(shell){var tryEnvelope=shell.getEnvelope();if((minShell&&(minEnvelope=minShell.getEnvelope()),!envelopeIsEqual(tryEnvelope,testEnvelope))&&envelopeContains(tryEnvelope,testEnvelope)){var testPoint=testEdgeRing.map(function(edge){return edge.from.coordinates}).find(function(pt){return!shell.some(function(edge){return coordinatesEqual(pt,edge.from.coordinates)})});testPoint&&shell.inside(point(testPoint))&&(!minShell||envelopeContains(minEnvelope,tryEnvelope))&&(minShell=shell)}}),minShell},EdgeRing.prototype.inside=function inside(pt){return booleanPointInPolygon(pt,this.toPolygon())},Object.defineProperties(EdgeRing.prototype,prototypeAccessors);var Graph=function Graph(){this.edges=[],this.nodes={}};Graph.fromGeoJson=function fromGeoJson(geoJson){validateGeoJson(geoJson);var graph=new Graph;return flattenEach(geoJson,function(feature$$1){featureOf(feature$$1,"LineString","Graph::fromGeoJson"),coordReduce(feature$$1,function(prev,cur){if(prev){var start=graph.getNode(prev),end=graph.getNode(cur);graph.addEdge(start,end)}return cur})}),graph},Graph.prototype.getNode=function getNode(coordinates){var id=Node$1.buildId(coordinates),node=this.nodes[id];return node||(node=this.nodes[id]=new Node$1(coordinates)),node},Graph.prototype.addEdge=function addEdge(from,to){var edge=new Edge(from,to),symetricEdge=edge.getSymetric();this.edges.push(edge),this.edges.push(symetricEdge)},Graph.prototype.deleteDangles=function deleteDangles(){var this$1=this;Object.keys(this.nodes).map(function(id){return this$1.nodes[id]}).forEach(function(node){return this$1._removeIfDangle(node)})},Graph.prototype._removeIfDangle=function _removeIfDangle(node){var this$1=this;if(1>=node.innerEdges.length){var outerNodes=node.getOuterEdges().map(function(e){return e.to});this.removeNode(node),outerNodes.forEach(function(n){return this$1._removeIfDangle(n)})}},Graph.prototype.deleteCutEdges=function deleteCutEdges(){var this$1=this;this._computeNextCWEdges(),this._findLabeledEdgeRings(),this.edges.forEach(function(edge){edge.label===edge.symetric.label&&(this$1.removeEdge(edge.symetric),this$1.removeEdge(edge))})},Graph.prototype._computeNextCWEdges=function _computeNextCWEdges(node){var this$1=this;"undefined"==typeof node?Object.keys(this.nodes).forEach(function(id){return this$1._computeNextCWEdges(this$1.nodes[id])}):node.getOuterEdges().forEach(function(edge,i){node.getOuterEdge((0===i?node.getOuterEdges().length:i)-1).symetric.next=edge})},Graph.prototype._computeNextCCWEdges=function _computeNextCCWEdges(node,label){for(var edges=node.getOuterEdges(),i=edges.length-1,firstOutDE,prevInDE;0<=i;--i){var de=edges[i],sym=de.symetric,outDE=void 0,inDE=void 0;(de.label===label&&(outDE=de),sym.label===label&&(inDE=sym),outDE&&inDE)&&(inDE&&(prevInDE=inDE),outDE&&(prevInDE&&(prevInDE.next=outDE,prevInDE=void 0),!firstOutDE&&(firstOutDE=outDE)))}prevInDE&&(prevInDE.next=firstOutDE)},Graph.prototype._findLabeledEdgeRings=function _findLabeledEdgeRings(){var edgeRingStarts=[],label=0;return this.edges.forEach(function(edge){if(!(0<=edge.label)){edgeRingStarts.push(edge);var e=edge;do e.label=label,e=e.next;while(!edge.isEqual(e));label++}}),edgeRingStarts},Graph.prototype.getEdgeRings=function getEdgeRings(){var this$1=this;this._computeNextCWEdges(),this.edges.forEach(function(edge){edge.label=void 0}),this._findLabeledEdgeRings().forEach(function(edge){this$1._findIntersectionNodes(edge).forEach(function(node){this$1._computeNextCCWEdges(node,edge.label)})});var edgeRingList=[];return this.edges.forEach(function(edge){edge.ring||edgeRingList.push(this$1._findEdgeRing(edge))}),edgeRingList},Graph.prototype._findIntersectionNodes=function _findIntersectionNodes(startEdge){var intersectionNodes=[],edge=startEdge,loop=function(){var degree=0;edge.from.getOuterEdges().forEach(function(e){e.label===startEdge.label&&++degree}),1<degree&&intersectionNodes.push(edge.from),edge=edge.next};do loop();while(!startEdge.isEqual(edge));return intersectionNodes},Graph.prototype._findEdgeRing=function _findEdgeRing(startEdge){var edge=startEdge,edgeRing=new EdgeRing;do edgeRing.push(edge),edge.ring=edgeRing,edge=edge.next;while(!startEdge.isEqual(edge));return edgeRing},Graph.prototype.removeNode=function removeNode(node){var this$1=this;node.getOuterEdges().forEach(function(edge){return this$1.removeEdge(edge)}),node.innerEdges.forEach(function(edge){return this$1.removeEdge(edge)}),delete this.nodes[node.id]},Graph.prototype.removeEdge=function removeEdge(edge){this.edges=this.edges.filter(function(e){return!e.isEqual(edge)}),edge.deleteEdge()};var keys=createCommonjsModule(function(module,exports){function shim(obj){var keys=[];for(var key in obj)keys.push(key);return keys}exports=module.exports="function"==typeof Object.keys?Object.keys:shim,exports.shim=shim}),keys_1=keys.shim,is_arguments=createCommonjsModule(function(module,exports){function supported(object){return"[object Arguments]"==Object.prototype.toString.call(object)}function unsupported(object){return object&&"object"==typeof object&&"number"==typeof object.length&&Object.prototype.hasOwnProperty.call(object,"callee")&&!Object.prototype.propertyIsEnumerable.call(object,"callee")||!1}var supportsArgumentsClass="[object Arguments]"==function(){return Object.prototype.toString.call(arguments)}();exports=module.exports=supportsArgumentsClass?supported:unsupported,exports.supported=supported,exports.unsupported=unsupported}),is_arguments_1=is_arguments.supported,is_arguments_2=is_arguments.unsupported,deepEqual_1=createCommonjsModule(function(module){function isUndefinedOrNull(value){return null===value||value===void 0}function isBuffer(x){return x&&"object"==typeof x&&"number"==typeof x.length&&("function"!=typeof x.copy||"function"!=typeof x.slice?!1:0<x.length&&"number"!=typeof x[0]?!1:!0)}function objEquiv(a,b,opts){var i,key;if(isUndefinedOrNull(a)||isUndefinedOrNull(b))return!1;if(a.prototype!==b.prototype)return!1;if(is_arguments(a))return!!is_arguments(b)&&(a=pSlice.call(a),b=pSlice.call(b),deepEqual(a,b,opts));if(isBuffer(a)){if(!isBuffer(b))return!1;if(a.length!==b.length)return!1;for(i=0;i<a.length;i++)if(a[i]!==b[i])return!1;return!0}try{var ka=keys(a),kb=keys(b)}catch(e){return!1}if(ka.length!=kb.length)return!1;for(ka.sort(),kb.sort(),i=ka.length-1;0<=i;i--)if(ka[i]!=kb[i])return!1;for(i=ka.length-1;0<=i;i--)if(key=ka[i],!deepEqual(a[key],b[key],opts))return!1;return typeof a==typeof b}var pSlice=Array.prototype.slice,deepEqual=module.exports=function(actual,expected,opts){return opts||(opts={}),actual===expected||(actual instanceof Date&&expected instanceof Date?actual.getTime()===expected.getTime():actual&&expected&&("object"==typeof actual||"object"==typeof expected)?objEquiv(actual,expected,opts):opts.strict?actual===expected:actual==expected)}}),Equality=function(opt){this.precision=opt&&opt.precision?opt.precision:17,this.direction=opt&&opt.direction&&opt.direction,this.pseudoNode=opt&&opt.pseudoNode&&opt.pseudoNode,this.objectComparator=opt&&opt.objectComparator?opt.objectComparator:objectComparator};Equality.prototype.compare=function(g1,g2){if(g1.type!==g2.type||!sameLength(g1,g2))return!1;switch(g1.type){case"Point":return this.compareCoord(g1.coordinates,g2.coordinates);break;case"LineString":return this.compareLine(g1.coordinates,g2.coordinates,0,!1);break;case"Polygon":return this.comparePolygon(g1,g2);break;case"Feature":return this.compareFeature(g1,g2);default:if(0===g1.type.indexOf("Multi")){var context=this,g1s=explode$2(g1),g2s=explode$2(g2);return g1s.every(function(g1part){return this.some(function(g2part){return context.compare(g1part,g2part)})},g2s)}}return!1},Equality.prototype.compareCoord=function(c1,c2){if(c1.length!==c2.length)return!1;for(var i=0;i<c1.length;i++)if(c1[i].toFixed(this.precision)!==c2[i].toFixed(this.precision))return!1;return!0},Equality.prototype.compareLine=function(path1,path2,ind,isPoly){if(!sameLength(path1,path2))return!1;var p1=this.pseudoNode?path1:this.removePseudo(path1),p2=this.pseudoNode?path2:this.removePseudo(path2);if(!(isPoly&&!this.compareCoord(p1[0],p2[0])&&(p2=this.fixStartIndex(p2,p1),!p2))){var sameDirection=this.compareCoord(p1[ind],p2[ind]);return this.direction||sameDirection?this.comparePath(p1,p2):!!this.compareCoord(p1[ind],p2[p2.length-(1+ind)])&&this.comparePath(p1.slice().reverse(),p2)}},Equality.prototype.fixStartIndex=function(sourcePath,targetPath){for(var ind=-1,i=0,correctPath;i<sourcePath.length;i++)if(this.compareCoord(sourcePath[i],targetPath[0])){ind=i;break}return 0<=ind&&(correctPath=[].concat(sourcePath.slice(ind,sourcePath.length),sourcePath.slice(1,ind+1))),correctPath},Equality.prototype.comparePath=function(p1,p2){var cont=this;return p1.every(function(c,i){return cont.compareCoord(c,this[i])},p2)},Equality.prototype.comparePolygon=function(g1,g2){if(this.compareLine(g1.coordinates[0],g2.coordinates[0],1,!0)){var holes1=g1.coordinates.slice(1,g1.coordinates.length),holes2=g2.coordinates.slice(1,g2.coordinates.length),cont=this;return holes1.every(function(h1){return this.some(function(h2){return cont.compareLine(h1,h2,1,!0)})},holes2)}return!1},Equality.prototype.compareFeature=function(g1,g2){return g1.id===g2.id&&this.objectComparator(g1.properties,g2.properties)&&this.compareBBox(g1,g2)&&this.compare(g1.geometry,g2.geometry)},Equality.prototype.compareBBox=function(g1,g2){return!g1.bbox&&!g2.bbox||g1.bbox&&g2.bbox&&this.compareCoord(g1.bbox,g2.bbox)},Equality.prototype.removePseudo=function(path){return path};var geojsonEquality=Equality,DBSCAN_1=createCommonjsModule(function(module){function DBSCAN(dataset,epsilon,minPts,distanceFunction){this.dataset=[],this.epsilon=1,this.minPts=2,this.distance=this._euclideanDistance,this.clusters=[],this.noise=[],this._visited=[],this._assigned=[],this._datasetLength=0,this._init(dataset,epsilon,minPts,distanceFunction)}DBSCAN.prototype.run=function(dataset,epsilon,minPts,distanceFunction){this._init(dataset,epsilon,minPts,distanceFunction);for(var pointId=0;pointId<this._datasetLength;pointId++)if(1!==this._visited[pointId]){this._visited[pointId]=1;var neighbors=this._regionQuery(pointId);if(neighbors.length<this.minPts)this.noise.push(pointId);else{var clusterId=this.clusters.length;this.clusters.push([]),this._addToCluster(pointId,clusterId),this._expandCluster(clusterId,neighbors)}}return this.clusters},DBSCAN.prototype._init=function(dataset,epsilon,minPts,distance){if(dataset){if(!(dataset instanceof Array))throw Error("Dataset must be of type array, "+typeof dataset+" given");this.dataset=dataset,this.clusters=[],this.noise=[],this._datasetLength=dataset.length,this._visited=Array(this._datasetLength),this._assigned=Array(this._datasetLength)}epsilon&&(this.epsilon=epsilon),minPts&&(this.minPts=minPts),distance&&(this.distance=distance)},DBSCAN.prototype._expandCluster=function(clusterId,neighbors){for(var i=0,pointId2;i<neighbors.length;i++){if(pointId2=neighbors[i],1!==this._visited[pointId2]){this._visited[pointId2]=1;var neighbors2=this._regionQuery(pointId2);neighbors2.length>=this.minPts&&(neighbors=this._mergeArrays(neighbors,neighbors2))}1!==this._assigned[pointId2]&&this._addToCluster(pointId2,clusterId)}},DBSCAN.prototype._addToCluster=function(pointId,clusterId){this.clusters[clusterId].push(pointId),this._assigned[pointId]=1},DBSCAN.prototype._regionQuery=function(pointId){for(var neighbors=[],id=0,dist;id<this._datasetLength;id++)dist=this.distance(this.dataset[pointId],this.dataset[id]),dist<this.epsilon&&neighbors.push(id);return neighbors},DBSCAN.prototype._mergeArrays=function(a,b){for(var len=b.length,i=0,P;i<len;i++)P=b[i],0>a.indexOf(P)&&a.push(P);return a},DBSCAN.prototype._euclideanDistance=function(p,q){for(var sum=0,i=_Mathmin(p.length,q.length);i--;)sum+=(p[i]-q[i])*(p[i]-q[i]);return _Mathsqrt(sum)},module.exports&&(module.exports=DBSCAN)}),KMEANS_1=createCommonjsModule(function(module){function KMEANS(dataset,k,distance){this.k=3,this.dataset=[],this.assignments=[],this.centroids=[],this.init(dataset,k,distance)}KMEANS.prototype.init=function(dataset,k,distance){this.assignments=[],this.centroids=[],"undefined"!=typeof dataset&&(this.dataset=dataset),"undefined"!=typeof k&&(this.k=k),"undefined"!=typeof distance&&(this.distance=distance)},KMEANS.prototype.run=function(dataset,k){this.init(dataset,k);for(var len=this.dataset.length,i=0;i<this.k;i++)this.centroids[i]=this.randomCentroid();for(var change=!0;change;){change=this.assign();for(var centroidId=0;centroidId<this.k;centroidId++){for(var mean=Array(maxDim),count=0,dim=0;dim<maxDim;dim++)mean[dim]=0;for(var j=0,maxDim;j<len;j++)if(maxDim=this.dataset[j].length,centroidId===this.assignments[j]){for(var dim=0;dim<maxDim;dim++)mean[dim]+=this.dataset[j][dim];count++}if(0<count){for(var dim=0;dim<maxDim;dim++)mean[dim]/=count;this.centroids[centroidId]=mean}else this.centroids[centroidId]=this.randomCentroid(),change=!0}}return this.getClusters()},KMEANS.prototype.randomCentroid=function(){var maxId=this.dataset.length-1,centroid,id;do id=_Mathround(Math.random()*maxId),centroid=this.dataset[id];while(0<=this.centroids.indexOf(centroid));return centroid},KMEANS.prototype.assign=function(){for(var change=!1,len=this.dataset.length,i=0,closestCentroid;i<len;i++)closestCentroid=this.argmin(this.dataset[i],this.centroids,this.distance),closestCentroid!=this.assignments[i]&&(this.assignments[i]=closestCentroid,change=!0);return change},KMEANS.prototype.getClusters=function(){for(var clusters=Array(this.k),pointId=0,centroidId;pointId<this.assignments.length;pointId++)centroidId=this.assignments[pointId],"undefined"==typeof clusters[centroidId]&&(clusters[centroidId]=[]),clusters[centroidId].push(pointId);return clusters},KMEANS.prototype.argmin=function(point,set,f){for(var min=_NumberMAX_VALUE,arg=0,len=set.length,i=0,d;i<len;i++)d=f(point,set[i]),d<min&&(min=d,arg=i);return arg},KMEANS.prototype.distance=function(p,q){for(var sum=0,i=_Mathmin(p.length,q.length);i--;){var diff=p[i]-q[i];sum+=diff*diff}return _Mathsqrt(sum)},module.exports&&(module.exports=KMEANS)}),PriorityQueue_1=createCommonjsModule(function(module){function PriorityQueue(elements,priorities,sorting){this._queue=[],this._priorities=[],this._sorting="desc",this._init(elements,priorities,sorting)}PriorityQueue.prototype.insert=function(ele,priority){for(var indexToInsert=this._queue.length,index=indexToInsert;index--;){var priority2=this._priorities[index];"desc"===this._sorting?priority>priority2&&(indexToInsert=index):priority<priority2&&(indexToInsert=index)}this._insertAt(ele,priority,indexToInsert)},PriorityQueue.prototype.remove=function(ele){for(var index=this._queue.length;index--;){var ele2=this._queue[index];if(ele===ele2){this._queue.splice(index,1),this._priorities.splice(index,1);break}}},PriorityQueue.prototype.forEach=function(func){this._queue.forEach(func)},PriorityQueue.prototype.getElements=function(){return this._queue},PriorityQueue.prototype.getElementPriority=function(index){return this._priorities[index]},PriorityQueue.prototype.getPriorities=function(){return this._priorities},PriorityQueue.prototype.getElementsWithPriorities=function(){for(var result=[],i=0,l=this._queue.length;i<l;i++)result.push([this._queue[i],this._priorities[i]]);return result},PriorityQueue.prototype._init=function(elements,priorities,sorting){if(elements&&priorities){if(this._queue=[],this._priorities=[],elements.length!==priorities.length)throw new Error("Arrays must have the same length");for(var i=0;i<elements.length;i++)this.insert(elements[i],priorities[i])}sorting&&(this._sorting=sorting)},PriorityQueue.prototype._insertAt=function(ele,priority,index){this._queue.length===index?(this._queue.push(ele),this._priorities.push(priority)):(this._queue.splice(index,0,ele),this._priorities.splice(index,0,priority))},module.exports&&(module.exports=PriorityQueue)}),OPTICS_1=createCommonjsModule(function(module){function OPTICS(dataset,epsilon,minPts,distanceFunction){this.epsilon=1,this.minPts=1,this.distance=this._euclideanDistance,this._reachability=[],this._processed=[],this._coreDistance=0,this._orderedList=[],this._init(dataset,epsilon,minPts,distanceFunction)}if(module.exports)var PriorityQueue=PriorityQueue_1;OPTICS.prototype.run=function(dataset,epsilon,minPts,distanceFunction){this._init(dataset,epsilon,minPts,distanceFunction);for(var pointId=0,l=this.dataset.length;pointId<l;pointId++)if(1!==this._processed[pointId]){this._processed[pointId]=1,this.clusters.push([pointId]);var clusterId=this.clusters.length-1;this._orderedList.push(pointId);var priorityQueue=new PriorityQueue(null,null,"asc"),neighbors=this._regionQuery(pointId);this._distanceToCore(pointId)!==void 0&&(this._updateQueue(pointId,neighbors,priorityQueue),this._expandCluster(clusterId,priorityQueue))}return this.clusters},OPTICS.prototype.getReachabilityPlot=function(){for(var reachabilityPlot=[],i=0,l=this._orderedList.length;i<l;i++){var pointId=this._orderedList[i],distance=this._reachability[pointId];reachabilityPlot.push([pointId,distance])}return reachabilityPlot},OPTICS.prototype._init=function(dataset,epsilon,minPts,distance){if(dataset){if(!(dataset instanceof Array))throw Error("Dataset must be of type array, "+typeof dataset+" given");this.dataset=dataset,this.clusters=[],this._reachability=Array(this.dataset.length),this._processed=Array(this.dataset.length),this._coreDistance=0,this._orderedList=[]}epsilon&&(this.epsilon=epsilon),minPts&&(this.minPts=minPts),distance&&(this.distance=distance)},OPTICS.prototype._updateQueue=function(pointId,neighbors,queue){var self=this;this._coreDistance=this._distanceToCore(pointId),neighbors.forEach(function(pointId2){if(self._processed[pointId2]===void 0){var dist=self.distance(self.dataset[pointId],self.dataset[pointId2]),newReachableDistance=_Mathmax(self._coreDistance,dist);self._reachability[pointId2]===void 0?(self._reachability[pointId2]=newReachableDistance,queue.insert(pointId2,newReachableDistance)):newReachableDistance<self._reachability[pointId2]&&(self._reachability[pointId2]=newReachableDistance,queue.remove(pointId2),queue.insert(pointId2,newReachableDistance))}})},OPTICS.prototype._expandCluster=function(clusterId,queue){for(var queueElements=queue.getElements(),p=0,l=queueElements.length,pointId;p<l;p++)if(pointId=queueElements[p],void 0===this._processed[pointId]){var neighbors=this._regionQuery(pointId);this._processed[pointId]=1,this.clusters[clusterId].push(pointId),this._orderedList.push(pointId),void 0!==this._distanceToCore(pointId)&&(this._updateQueue(pointId,neighbors,queue),this._expandCluster(clusterId,queue))}},OPTICS.prototype._distanceToCore=function(pointId){for(var l=this.epsilon,coreDistCand=0,neighbors;coreDistCand<l;coreDistCand++)if(neighbors=this._regionQuery(pointId,coreDistCand),neighbors.length>=this.minPts)return coreDistCand},OPTICS.prototype._regionQuery=function(pointId,epsilon){epsilon=epsilon||this.epsilon;for(var neighbors=[],id=0,l=this.dataset.length;id<l;id++)this.distance(this.dataset[pointId],this.dataset[id])<epsilon&&neighbors.push(id);return neighbors},OPTICS.prototype._euclideanDistance=function(p,q){for(var sum=0,i=_Mathmin(p.length,q.length);i--;)sum+=(p[i]-q[i])*(p[i]-q[i]);return _Mathsqrt(sum)},module.exports&&(module.exports=OPTICS)}),lib=createCommonjsModule(function(module){module.exports&&(module.exports={DBSCAN:DBSCAN_1,KMEANS:KMEANS_1,OPTICS:OPTICS_1,PriorityQueue:PriorityQueue_1})}),lib_1=lib.DBSCAN,lib_2=lib.KMEANS,lib_3=lib.OPTICS,lib_4=lib.PriorityQueue,distance$2={eudist:function eudist(v1,v2,sqrt){for(var len=v1.length,sum=0,i=0,d;i<len;i++)d=(v1[i]||0)-(v2[i]||0),sum+=d*d;return sqrt?_Mathsqrt(sum):sum},mandist:function mandist(v1,v2,sqrt){for(var len=v1.length,sum=0,i=0;i<len;i++)sum+=_Mathabs((v1[i]||0)-(v2[i]||0));return sqrt?_Mathsqrt(sum):sum},dist:function dist(v1,v2,sqrt){var d=_Mathabs(v1-v2);return sqrt?d:d*d}},eudist$1=distance$2.eudist,dist$1=distance$2.dist,kinit={kmrand:function kmrand(data,k){for(var map={},ks=[],t=k<<2,len=data.length,multi=0<data[0].length;ks.length<k&&0<t--;){var d=data[_Mathfloor(Math.random()*len)],key=multi?d.join("_"):""+d;map[key]||(map[key]=!0,ks.push(d))}if(ks.length<k)throw new Error("Error initializating clusters");else return ks},kmpp:function kmpp(data,k){var distance=data[0].length?eudist$1:dist$1,ks=[],len=data.length,multi=0<data[0].length,c=data[_Mathfloor(Math.random()*len)],key=multi?c.join("_"):""+c;for(ks.push(c);ks.length<k;){for(var dists=[],lk=ks.length,dsum=0,prs=[],i=0,min;i<len;i++){min=Infinity;for(var j=0,_dist;j<lk;j++)_dist=distance(data[i],ks[j]),_dist<=min&&(min=_dist);dists[i]=min}for(var _i=0;_i<len;_i++)dsum+=dists[_i];for(var _i2=0;_i2<len;_i2++)prs[_i2]={i:_i2,v:data[_i2],pr:dists[_i2]/dsum,cs:0};prs.sort(function(a,b){return a.pr-b.pr}),prs[0].cs=prs[0].pr;for(var _i3=1;_i3<len;_i3++)prs[_i3].cs=prs[_i3-1].cs+prs[_i3].pr;for(var rnd=Math.random(),idx=0;idx<len-1&&prs[idx++].cs<rnd;);ks.push(prs[idx-1].v)}return ks}},eudist=distance$2.eudist,kmrand=kinit.kmrand,kmpp=kinit.kmpp,MAX=1e4,main=skmeans,astar={search:function(graph,start,end,options){graph.cleanDirty(),options=options||{};var heuristic=options.heuristic||astar.heuristics.manhattan,closest=options.closest||!1,openHeap=getHeap(),closestNode=start;for(start.h=heuristic(start,end),openHeap.push(start);0<openHeap.size();){var currentNode=openHeap.pop();if(currentNode===end)return pathTo(currentNode);currentNode.closed=!0;for(var neighbors=graph.neighbors(currentNode),i=0,il=neighbors.length,neighbor;i<il;++i)if(neighbor=neighbors[i],!(neighbor.closed||neighbor.isWall())){var gScore=currentNode.g+neighbor.getCost(currentNode),beenVisited=neighbor.visited;(!beenVisited||gScore<neighbor.g)&&(neighbor.visited=!0,neighbor.parent=currentNode,neighbor.h=neighbor.h||heuristic(neighbor,end),neighbor.g=gScore,neighbor.f=neighbor.g+neighbor.h,graph.markDirty(neighbor),closest&&(neighbor.h<closestNode.h||neighbor.h===closestNode.h&&neighbor.g<closestNode.g)&&(closestNode=neighbor),beenVisited?openHeap.rescoreElement(neighbor):openHeap.push(neighbor))}}return closest?pathTo(closestNode):[]},heuristics:{manhattan:function(pos0,pos1){var d1=_Mathabs(pos1.x-pos0.x),d2=_Mathabs(pos1.y-pos0.y);return d1+d2},diagonal:function(pos0,pos1){var D=1,D2=1.4142135623730951,d1=_Mathabs(pos1.x-pos0.x),d2=_Mathabs(pos1.y-pos0.y);return D*(d1+d2)+(D2-2*D)*_Mathmin(d1,d2)}},cleanNode:function(node){node.f=0,node.g=0,node.h=0,node.visited=!1,node.closed=!1,node.parent=null}};Graph$1.prototype.init=function(){this.dirtyNodes=[];for(var i=0;i<this.nodes.length;i++)astar.cleanNode(this.nodes[i])},Graph$1.prototype.cleanDirty=function(){for(var i=0;i<this.dirtyNodes.length;i++)astar.cleanNode(this.dirtyNodes[i]);this.dirtyNodes=[]},Graph$1.prototype.markDirty=function(node){this.dirtyNodes.push(node)},Graph$1.prototype.neighbors=function(node){var ret=[],x=node.x,y=node.y,grid=this.grid;return grid[x-1]&&grid[x-1][y]&&ret.push(grid[x-1][y]),grid[x+1]&&grid[x+1][y]&&ret.push(grid[x+1][y]),grid[x]&&grid[x][y-1]&&ret.push(grid[x][y-1]),grid[x]&&grid[x][y+1]&&ret.push(grid[x][y+1]),this.diagonal&&(grid[x-1]&&grid[x-1][y-1]&&ret.push(grid[x-1][y-1]),grid[x+1]&&grid[x+1][y-1]&&ret.push(grid[x+1][y-1]),grid[x-1]&&grid[x-1][y+1]&&ret.push(grid[x-1][y+1]),grid[x+1]&&grid[x+1][y+1]&&ret.push(grid[x+1][y+1])),ret},Graph$1.prototype.toString=function(){for(var graphString=[],nodes=this.grid,x=0,len=nodes.length,rowDebug,row,y,l;x<len;x++){for(rowDebug=[],row=nodes[x],(y=0,l=row.length);y<l;y++)rowDebug.push(row[y].weight);graphString.push(rowDebug.join(" "))}return graphString.join("\n")},GridNode.prototype.toString=function(){return"["+this.x+" "+this.y+"]"},GridNode.prototype.getCost=function(fromNeighbor){return fromNeighbor&&fromNeighbor.x!==this.x&&fromNeighbor.y!==this.y?1.41421*this.weight:this.weight},GridNode.prototype.isWall=function(){return 0===this.weight},BinaryHeap.prototype={push:function(element){this.content.push(element),this.sinkDown(this.content.length-1)},pop:function(){var result=this.content[0],end=this.content.pop();return 0<this.content.length&&(this.content[0]=end,this.bubbleUp(0)),result},remove:function(node){var i=this.content.indexOf(node),end=this.content.pop();i!==this.content.length-1&&(this.content[i]=end,this.scoreFunction(end)<this.scoreFunction(node)?this.sinkDown(i):this.bubbleUp(i))},size:function(){return this.content.length},rescoreElement:function(node){this.sinkDown(this.content.indexOf(node))},sinkDown:function(n){for(var element=this.content[n];0<n;){var parentN=(n+1>>1)-1,parent=this.content[parentN];if(this.scoreFunction(element)<this.scoreFunction(parent))this.content[parentN]=element,this.content[n]=parent,n=parentN;else break}},bubbleUp:function(n){for(var length=this.content.length,element=this.content[n],elemScore=this.scoreFunction(element);!0;){var child2N=n+1<<1,child1N=child2N-1,swap=null,child1Score;if(child1N<length){var child1=this.content[child1N];child1Score=this.scoreFunction(child1),child1Score<elemScore&&(swap=child1N)}if(child2N<length){var child2=this.content[child2N],child2Score=this.scoreFunction(child2);child2Score<(null===swap?elemScore:child1Score)&&(swap=child2N)}if(null!==swap)this.content[n]=this.content[swap],this.content[swap]=element,n=swap;else break}}};var constant=function(x){return function(){return x}};RedBlackTree.prototype={constructor:RedBlackTree,insert:function(after,node){var parent,grandpa,uncle;if(after){if(node.P=after,node.N=after.N,after.N&&(after.N.P=node),after.N=node,after.R){for(after=after.R;after.L;)after=after.L;after.L=node}else after.R=node;parent=after}else this._?(after=RedBlackFirst(this._),node.P=null,node.N=after,after.P=after.L=node,parent=after):(node.P=node.N=null,this._=node,parent=null);for(node.L=node.R=null,node.U=parent,node.C=!0,after=node;parent&&parent.C;)grandpa=parent.U,parent===grandpa.L?(uncle=grandpa.R,uncle&&uncle.C?(parent.C=uncle.C=!1,grandpa.C=!0,after=grandpa):(after===parent.R&&(RedBlackRotateLeft(this,parent),after=parent,parent=after.U),parent.C=!1,grandpa.C=!0,RedBlackRotateRight(this,grandpa))):(uncle=grandpa.L,uncle&&uncle.C?(parent.C=uncle.C=!1,grandpa.C=!0,after=grandpa):(after===parent.L&&(RedBlackRotateRight(this,parent),after=parent,parent=after.U),parent.C=!1,grandpa.C=!0,RedBlackRotateLeft(this,grandpa))),parent=after.U;this._.C=!1},remove:function(node){node.N&&(node.N.P=node.P),node.P&&(node.P.N=node.N),node.N=node.P=null;var parent=node.U,left=node.L,right=node.R,sibling,next,red;if(next=left?right?RedBlackFirst(right):left:right,parent?parent.L===node?parent.L=next:parent.R=next:this._=next,left&&right?(red=next.C,next.C=node.C,next.L=left,left.U=next,next===right?(next.U=parent,parent=next,node=next.R):(parent=next.U,next.U=node.U,node=next.R,parent.L=node,next.R=right,right.U=next)):(red=node.C,node=next),node&&(node.U=parent),!red){if(node&&node.C)return void(node.C=!1);do{if(node===this._)break;if(node===parent.L){if(sibling=parent.R,sibling.C&&(sibling.C=!1,parent.C=!0,RedBlackRotateLeft(this,parent),sibling=parent.R),sibling.L&&sibling.L.C||sibling.R&&sibling.R.C){sibling.R&&sibling.R.C||(sibling.L.C=!1,sibling.C=!0,RedBlackRotateRight(this,sibling),sibling=parent.R),sibling.C=parent.C,parent.C=sibling.R.C=!1,RedBlackRotateLeft(this,parent),node=this._;break}}else if(sibling=parent.L,sibling.C&&(sibling.C=!1,parent.C=!0,RedBlackRotateRight(this,parent),sibling=parent.L),sibling.L&&sibling.L.C||sibling.R&&sibling.R.C){sibling.L&&sibling.L.C||(sibling.R.C=!1,sibling.C=!0,RedBlackRotateLeft(this,sibling),sibling=parent.L),sibling.C=parent.C,parent.C=sibling.L.C=!1,RedBlackRotateRight(this,parent),node=this._;break}sibling.C=!0,node=parent,parent=parent.U}while(!node.C);node&&(node.C=!1)}}};var circlePool=[],beachPool=[],epsilon=1e-6,epsilon2=1e-12,firstCircle,beaches,cells,circles,edges;Diagram.prototype={constructor:Diagram,polygons:function(){var edges=this.edges;return this.cells.map(function(cell){var polygon=cell.halfedges.map(function(i){return cellHalfedgeStart(cell,edges[i])});return polygon.data=cell.site.data,polygon})},triangles:function(){var triangles=[],edges=this.edges;return this.cells.forEach(function(cell,i){if(m=(halfedges=cell.halfedges).length)for(var site=cell.site,j=-1,e1=edges[halfedges[m-1]],s1=e1.left===site?e1.right:e1.left,halfedges,m,s0;++j<m;)s0=s1,e1=edges[halfedges[j]],s1=e1.left===site?e1.right:e1.left,s0&&s1&&i<s0.index&&i<s1.index&&0>triangleArea(site,s0,s1)&&triangles.push([site.data,s0.data,s1.data])}),triangles},links:function(){return this.edges.filter(function(edge){return edge.right}).map(function(edge){return{source:edge.left.data,target:edge.right.data}})},find:function(x,y,radius){for(var that=this,i1=that._found||0,n=that.cells.length,i0,cell;!(cell=that.cells[i1]);)if(++i1>=n)return null;var dx=x-cell.site[0],dy=y-cell.site[1],d2=dx*dx+dy*dy;do cell=that.cells[i0=i1],i1=null,cell.halfedges.forEach(function(e){var edge=that.edges[e],v=edge.left;if(v!==cell.site&&v||(v=edge.right)){var vx=x-v[0],vy=y-v[1],v2=vx*vx+vy*vy;v2<d2&&(d2=v2,i1=v.index)}});while(null!==i1);return that._found=i0,null==radius||d2<=radius*radius?cell.site:null}};var voronoi=function(){function voronoi(data){return new Diagram(data.map(function(d,i){var s=[_Mathround(x$$1(d,i,data)/epsilon)*epsilon,_Mathround(y$$1(d,i,data)/epsilon)*epsilon];return s.index=i,s.data=d,s}),extent)}var x$$1=x,y$$1=y,extent=null;return voronoi.polygons=function(data){return voronoi(data).polygons()},voronoi.links=function(data){return voronoi(data).links()},voronoi.triangles=function(data){return voronoi(data).triangles()},voronoi.x=function(_){return arguments.length?(x$$1="function"==typeof _?_:constant(+_),voronoi):x$$1},voronoi.y=function(_){return arguments.length?(y$$1="function"==typeof _?_:constant(+_),voronoi):y$$1},voronoi.extent=function(_){return arguments.length?(extent=null==_?null:[[+_[0][0],+_[0][1]],[+_[1][0],+_[1][1]]],voronoi):extent&&[[extent[0][0],extent[0][1]],[extent[1][0],extent[1][1]]]},voronoi.size=function(_){return arguments.length?(extent=null==_?null:[[0,0],[+_[0],+_[1]]],voronoi):extent&&[extent[1][0]-extent[0][0],extent[1][1]-extent[0][1]]},voronoi},main_es$4=Object.freeze({randomPosition:randomPosition,randomPoint:randomPoint,randomPolygon:randomPolygon,randomLineString:randomLineString}),main_es$5=Object.freeze({getCluster:getCluster,clusterEach:clusterEach,clusterReduce:clusterReduce,createBins:createBins,applyFilter:applyFilter,propertiesContainsFilter:propertiesContainsFilter,filterProperties:filterProperties});"fill"in Array.prototype||Object.defineProperty(Array.prototype,"fill",{configurable:!0,value:function fill(value){if(this===void 0||null===this)throw new TypeError(this+" is not an object");var arrayLike=Object(this),length=_Mathmax(_Mathmin(arrayLike.length,9007199254740991),0)||0,relativeStart=1 in arguments?parseInt(+arguments[1],10)||0:0;relativeStart=0>relativeStart?_Mathmax(length+relativeStart,0):_Mathmin(relativeStart,length);var relativeEnd=2 in arguments&&arguments[2]!==void 0?parseInt(+arguments[2],10)||0:length;for(relativeEnd=0>relativeEnd?_Mathmax(length+arguments[2],0):_Mathmin(relativeEnd,length);relativeStart<relativeEnd;)arrayLike[relativeStart]=value,++relativeStart;return arrayLike},writable:!0}),_NumberisFinite=_NumberisFinite||function(value){return"number"==typeof value&&isFinite(value)},_NumberisInteger=_NumberisInteger||function(val){return"number"==typeof val&&isFinite(val)&&_Mathfloor(val)===val},_NumberparseFloat=_NumberparseFloat||parseFloat,_NumberisNaN=_NumberisNaN||function(value){return value!==value},_Mathtrunc=_Mathtrunc||function(x){return 0>x?_Mathceil(x):_Mathfloor(x)};var NumberUtil=function NumberUtil(){};NumberUtil.prototype.interfaces_=function interfaces_(){return[]},NumberUtil.prototype.getClass=function getClass(){return NumberUtil},NumberUtil.prototype.equalsWithTolerance=function equalsWithTolerance(x1,x2,tolerance){return _Mathabs(x1-x2)<=tolerance};var IllegalArgumentException=function IllegalArgumentException(){},Double=function Double(){},staticAccessors$1={MAX_VALUE:{configurable:!0}};Double.isNaN=function isNaN(n){return _NumberisNaN(n)},Double.doubleToLongBits=function doubleToLongBits(n){return n},Double.longBitsToDouble=function longBitsToDouble(n){return n},Double.isInfinite=function isInfinite(n){return!_NumberisFinite(n)},staticAccessors$1.MAX_VALUE.get=function(){return _NumberMAX_VALUE},Object.defineProperties(Double,staticAccessors$1);var Comparable=function Comparable(){},Clonable=function Clonable(){},Comparator=function Comparator(){},Coordinate=function Coordinate(){if(this.x=null,this.y=null,this.z=null,0===arguments.length)this.x=0,this.y=0,this.z=Coordinate.NULL_ORDINATE;else if(1===arguments.length){var c=arguments[0];this.x=c.x,this.y=c.y,this.z=c.z}else 2===arguments.length?(this.x=arguments[0],this.y=arguments[1],this.z=Coordinate.NULL_ORDINATE):3===arguments.length&&(this.x=arguments[0],this.y=arguments[1],this.z=arguments[2])},staticAccessors={DimensionalComparator:{configurable:!0},serialVersionUID:{configurable:!0},NULL_ORDINATE:{configurable:!0},X:{configurable:!0},Y:{configurable:!0},Z:{configurable:!0}};Coordinate.prototype.setOrdinate=function setOrdinate(ordinateIndex,value){switch(ordinateIndex){case Coordinate.X:this.x=value;break;case Coordinate.Y:this.y=value;break;case Coordinate.Z:this.z=value;break;default:throw new IllegalArgumentException("Invalid ordinate index: "+ordinateIndex);}},Coordinate.prototype.equals2D=function equals2D(){if(1===arguments.length){var other=arguments[0];return!(this.x!==other.x)&&!(this.y!==other.y)}if(2===arguments.length){var c=arguments[0],tolerance=arguments[1];return!!NumberUtil.equalsWithTolerance(this.x,c.x,tolerance)&&!!NumberUtil.equalsWithTolerance(this.y,c.y,tolerance)}},Coordinate.prototype.getOrdinate=function getOrdinate(ordinateIndex){switch(ordinateIndex){case Coordinate.X:return this.x;case Coordinate.Y:return this.y;case Coordinate.Z:return this.z;default:}throw new IllegalArgumentException("Invalid ordinate index: "+ordinateIndex)},Coordinate.prototype.equals3D=function equals3D(other){return this.x===other.x&&this.y===other.y&&(this.z===other.z||Double.isNaN(this.z))&&Double.isNaN(other.z)},Coordinate.prototype.equals=function equals(other){return!!(other instanceof Coordinate)&&this.equals2D(other)},Coordinate.prototype.equalInZ=function equalInZ(c,tolerance){return NumberUtil.equalsWithTolerance(this.z,c.z,tolerance)},Coordinate.prototype.compareTo=function compareTo(o){var other=o;return this.x<other.x?-1:this.x>other.x?1:this.y<other.y?-1:this.y>other.y?1:0},Coordinate.prototype.clone=function clone(){},Coordinate.prototype.copy=function copy(){return new Coordinate(this)},Coordinate.prototype.toString=function toString(){return"("+this.x+", "+this.y+", "+this.z+")"},Coordinate.prototype.distance3D=function distance3D(c){var dx=this.x-c.x,dy=this.y-c.y,dz=this.z-c.z;return _Mathsqrt(dx*dx+dy*dy+dz*dz)},Coordinate.prototype.distance=function distance(c){var dx=this.x-c.x,dy=this.y-c.y;return _Mathsqrt(dx*dx+dy*dy)},Coordinate.prototype.hashCode=function hashCode(){var result=17;return result=37*result+Coordinate.hashCode(this.x),result=37*result+Coordinate.hashCode(this.y),result},Coordinate.prototype.setCoordinate=function setCoordinate(other){this.x=other.x,this.y=other.y,this.z=other.z},Coordinate.prototype.interfaces_=function interfaces_(){return[Comparable,Clonable,Serializable]},Coordinate.prototype.getClass=function getClass(){return Coordinate},Coordinate.hashCode=function hashCode(){if(1===arguments.length){var x=arguments[0],f=Double.doubleToLongBits(x);return _Mathtrunc((f^f)>>>32)}},staticAccessors.DimensionalComparator.get=function(){return DimensionalComparator},staticAccessors.serialVersionUID.get=function(){return 6683108902428367000},staticAccessors.NULL_ORDINATE.get=function(){return Double.NaN},staticAccessors.X.get=function(){return 0},staticAccessors.Y.get=function(){return 1},staticAccessors.Z.get=function(){return 2},Object.defineProperties(Coordinate,staticAccessors);var DimensionalComparator=function DimensionalComparator(dimensionsToTest){if(this._dimensionsToTest=2,0===arguments.length);else if(1===arguments.length){var dimensionsToTest$1=arguments[0];if(2!==dimensionsToTest$1&&3!==dimensionsToTest$1)throw new IllegalArgumentException("only 2 or 3 dimensions may be specified");this._dimensionsToTest=dimensionsToTest$1}};DimensionalComparator.prototype.compare=function compare(o1,o2){var c1=o1,c2=o2,compX=DimensionalComparator.compare(c1.x,c2.x);if(0!==compX)return compX;var compY=DimensionalComparator.compare(c1.y,c2.y);if(0!==compY)return compY;if(2>=this._dimensionsToTest)return 0;var compZ=DimensionalComparator.compare(c1.z,c2.z);return compZ},DimensionalComparator.prototype.interfaces_=function interfaces_(){return[Comparator]},DimensionalComparator.prototype.getClass=function getClass(){return DimensionalComparator},DimensionalComparator.compare=function compare(a,b){return a<b?-1:a>b?1:Double.isNaN(a)?Double.isNaN(b)?0:-1:Double.isNaN(b)?1:0};var CoordinateSequenceFactory=function CoordinateSequenceFactory(){};CoordinateSequenceFactory.prototype.create=function create(){},CoordinateSequenceFactory.prototype.interfaces_=function interfaces_(){return[]},CoordinateSequenceFactory.prototype.getClass=function getClass(){return CoordinateSequenceFactory};var Location=function Location(){},staticAccessors$4={INTERIOR:{configurable:!0},BOUNDARY:{configurable:!0},EXTERIOR:{configurable:!0},NONE:{configurable:!0}};Location.prototype.interfaces_=function interfaces_(){return[]},Location.prototype.getClass=function getClass(){return Location},Location.toLocationSymbol=function toLocationSymbol(locationValue){switch(locationValue){case Location.EXTERIOR:return"e";case Location.BOUNDARY:return"b";case Location.INTERIOR:return"i";case Location.NONE:return"-";default:}throw new IllegalArgumentException("Unknown location value: "+locationValue)},staticAccessors$4.INTERIOR.get=function(){return 0},staticAccessors$4.BOUNDARY.get=function(){return 1},staticAccessors$4.EXTERIOR.get=function(){return 2},staticAccessors$4.NONE.get=function(){return-1},Object.defineProperties(Location,staticAccessors$4);var hasInterface=function(o,i){return o.interfaces_&&-1<o.interfaces_().indexOf(i)},MathUtil=function MathUtil(){},staticAccessors$5={LOG_10:{configurable:!0}};MathUtil.prototype.interfaces_=function interfaces_(){return[]},MathUtil.prototype.getClass=function getClass(){return MathUtil},MathUtil.log10=function log10(x){var ln=_Mathlog(x);return Double.isInfinite(ln)?ln:Double.isNaN(ln)?ln:ln/MathUtil.LOG_10},MathUtil.min=function min(v1,v2,v3,v4){var min=v1;return v2<min&&(min=v2),v3<min&&(min=v3),v4<min&&(min=v4),min},MathUtil.clamp=function clamp(){if("number"==typeof arguments[2]&&"number"==typeof arguments[0]&&"number"==typeof arguments[1]){var x=arguments[0],min=arguments[1],max=arguments[2];return x<min?min:x>max?max:x}if(_NumberisInteger(arguments[2])&&_NumberisInteger(arguments[0])&&_NumberisInteger(arguments[1])){var x$1=arguments[0],min$1=arguments[1],max$1=arguments[2];return x$1<min$1?min$1:x$1>max$1?max$1:x$1}},MathUtil.wrap=function wrap(index,max){return 0>index?max- -index%max:index%max},MathUtil.max=function max(){if(3===arguments.length){var v1=arguments[0],v2=arguments[1],v3=arguments[2],max=v1;return v2>max&&(max=v2),v3>max&&(max=v3),max}if(4===arguments.length){var v1$1=arguments[0],v2$1=arguments[1],v3$1=arguments[2],v4=arguments[3],max$1=v1$1;return v2$1>max$1&&(max$1=v2$1),v3$1>max$1&&(max$1=v3$1),v4>max$1&&(max$1=v4),max$1}},MathUtil.average=function average(x1,x2){return(x1+x2)/2},staticAccessors$5.LOG_10.get=function(){return 2.302585092994046},Object.defineProperties(MathUtil,staticAccessors$5);var StringBuffer=function StringBuffer(str){this.str=str};StringBuffer.prototype.append=function append(e){this.str+=e},StringBuffer.prototype.setCharAt=function setCharAt(i,c){this.str=this.str.substr(0,i)+c+this.str.substr(i+1)},StringBuffer.prototype.toString=function toString(e){return this.str};var Integer=function Integer(value){this.value=value};Integer.prototype.intValue=function intValue(){return this.value},Integer.prototype.compareTo=function compareTo(o){return this.value<o?-1:this.value>o?1:0},Integer.isNaN=function isNaN(n){return _NumberisNaN(n)};var Character=function Character(){};Character.isWhitespace=function isWhitespace(c){return 32>=c&&0<=c||127===c},Character.toUpperCase=function toUpperCase(c){return c.toUpperCase()};var DD=function DD(){if(this._hi=0,this._lo=0,0===arguments.length)this.init(0);else if(1===arguments.length){if("number"==typeof arguments[0]){var x=arguments[0];this.init(x)}else if(arguments[0]instanceof DD){var dd=arguments[0];this.init(dd)}else if("string"==typeof arguments[0]){var str=arguments[0];DD.call(this,DD.parse(str))}}else if(2===arguments.length){var hi=arguments[0],lo=arguments[1];this.init(hi,lo)}},staticAccessors$7={PI:{configurable:!0},TWO_PI:{configurable:!0},PI_2:{configurable:!0},E:{configurable:!0},NaN:{configurable:!0},EPS:{configurable:!0},SPLIT:{configurable:!0},MAX_PRINT_DIGITS:{configurable:!0},TEN:{configurable:!0},ONE:{configurable:!0},SCI_NOT_EXPONENT_CHAR:{configurable:!0},SCI_NOT_ZERO:{configurable:!0}};DD.prototype.le=function le(y){return(this._hi<y._hi||this._hi===y._hi)&&this._lo<=y._lo},DD.prototype.extractSignificantDigits=function extractSignificantDigits(insertDecimalPoint,magnitude){var y=this.abs(),mag=DD.magnitude(y._hi),scale=DD.TEN.pow(mag);y=y.divide(scale),y.gt(DD.TEN)?(y=y.divide(DD.TEN),mag+=1):y.lt(DD.ONE)&&(y=y.multiply(DD.TEN),mag-=1);for(var decimalPointPos=mag+1,buf=new StringBuffer,numDigits=DD.MAX_PRINT_DIGITS-1,i=0;i<=numDigits;i++){insertDecimalPoint&&i===decimalPointPos&&buf.append(".");var digit=_Mathtrunc(y._hi);if(0>digit)break;var rebiasBy10=!1,digitChar=0;9<digit?(rebiasBy10=!0,digitChar="9"):digitChar="0"+digit,buf.append(digitChar),y=y.subtract(DD.valueOf(digit)).multiply(DD.TEN),rebiasBy10&&y.selfAdd(DD.TEN);var continueExtractingDigits=!0,remMag=DD.magnitude(y._hi);if(0>remMag&&_Mathabs(remMag)>=numDigits-i&&(continueExtractingDigits=!1),!continueExtractingDigits)break}return magnitude[0]=mag,buf.toString()},DD.prototype.sqr=function sqr(){return this.multiply(this)},DD.prototype.doubleValue=function doubleValue(){return this._hi+this._lo},DD.prototype.subtract=function subtract(){if(arguments[0]instanceof DD){var y=arguments[0];return this.add(y.negate())}if("number"==typeof arguments[0]){var y$1=arguments[0];return this.add(-y$1)}},DD.prototype.equals=function equals(){if(1===arguments.length){var y=arguments[0];return this._hi===y._hi&&this._lo===y._lo}},DD.prototype.isZero=function isZero(){return 0===this._hi&&0===this._lo},DD.prototype.selfSubtract=function selfSubtract(){if(arguments[0]instanceof DD){var y=arguments[0];return this.isNaN()?this:this.selfAdd(-y._hi,-y._lo)}if("number"==typeof arguments[0]){var y$1=arguments[0];return this.isNaN()?this:this.selfAdd(-y$1,0)}},DD.prototype.getSpecialNumberString=function getSpecialNumberString(){return this.isZero()?"0.0":this.isNaN()?"NaN ":null},DD.prototype.min=function min(x){return this.le(x)?this:x},DD.prototype.selfDivide=function selfDivide(){if(1===arguments.length){if(arguments[0]instanceof DD){var y=arguments[0];return this.selfDivide(y._hi,y._lo)}if("number"==typeof arguments[0]){var y$1=arguments[0];return this.selfDivide(y$1,0)}}else if(2===arguments.length){var yhi=arguments[0],ylo=arguments[1],hc=null,tc=null,hy=null,ty=null,C=null,c=null,U=null,u=null;return C=this._hi/yhi,c=DD.SPLIT*C,hc=c-C,u=DD.SPLIT*yhi,hc=c-hc,tc=C-hc,hy=u-yhi,U=C*yhi,hy=u-hy,ty=yhi-hy,u=hc*hy-U+hc*ty+tc*hy+tc*ty,c=(this._hi-U-u+this._lo-C*ylo)/yhi,u=C+c,this._hi=u,this._lo=C-u+c,this}},DD.prototype.dump=function dump(){return"DD<"+this._hi+", "+this._lo+">"},DD.prototype.divide=function divide(){if(arguments[0]instanceof DD){var y=arguments[0],hc=null,tc=null,hy=null,ty=null,C=null,c=null,U=null,u=null;C=this._hi/y._hi,c=DD.SPLIT*C,hc=c-C,u=DD.SPLIT*y._hi,hc=c-hc,tc=C-hc,hy=u-y._hi,U=C*y._hi,hy=u-hy,ty=y._hi-hy,u=hc*hy-U+hc*ty+tc*hy+tc*ty,c=(this._hi-U-u+this._lo-C*y._lo)/y._hi,u=C+c;var zhi=u,zlo=C-u+c;return new DD(zhi,zlo)}if("number"==typeof arguments[0]){var y$1=arguments[0];return Double.isNaN(y$1)?DD.createNaN():DD.copy(this).selfDivide(y$1,0)}},DD.prototype.ge=function ge(y){return(this._hi>y._hi||this._hi===y._hi)&&this._lo>=y._lo},DD.prototype.pow=function pow(exp){if(0===exp)return DD.valueOf(1);var r=new DD(this),s=DD.valueOf(1),n=_Mathabs(exp);if(1<n)for(;0<n;)1==n%2&&s.selfMultiply(r),n/=2,0<n&&(r=r.sqr());else s=r;return 0>exp?s.reciprocal():s},DD.prototype.ceil=function ceil(){if(this.isNaN())return DD.NaN;var fhi=_Mathceil(this._hi),flo=0;return fhi===this._hi&&(flo=_Mathceil(this._lo)),new DD(fhi,flo)},DD.prototype.compareTo=function compareTo(o){var other=o;return this._hi<other._hi?-1:this._hi>other._hi?1:this._lo<other._lo?-1:this._lo>other._lo?1:0},DD.prototype.rint=function rint(){if(this.isNaN())return this;var plus5=this.add(0.5);return plus5.floor()},DD.prototype.setValue=function setValue(){if(arguments[0]instanceof DD){var value=arguments[0];return this.init(value),this}if("number"==typeof arguments[0]){var value$1=arguments[0];return this.init(value$1),this}},DD.prototype.max=function max(x){return this.ge(x)?this:x},DD.prototype.sqrt=function sqrt(){if(this.isZero())return DD.valueOf(0);if(this.isNegative())return DD.NaN;var x=1/_Mathsqrt(this._hi),ax=this._hi*x,axdd=DD.valueOf(ax),diffSq=this.subtract(axdd.sqr()),d2=diffSq._hi*(0.5*x);return axdd.add(d2)},DD.prototype.selfAdd=function selfAdd(){if(1===arguments.length){if(arguments[0]instanceof DD){var y=arguments[0];return this.selfAdd(y._hi,y._lo)}if("number"==typeof arguments[0]){var y$1=arguments[0],H=null,h=null,S=null,s=null,e=null,f=null;return S=this._hi+y$1,e=S-this._hi,s=S-e,s=y$1-e+(this._hi-s),f=s+this._lo,H=S+f,h=f+(S-H),this._hi=H+h,this._lo=h+(H-this._hi),this}}else if(2===arguments.length){var yhi=arguments[0],ylo=arguments[1],H$1=null,h$1=null,T=null,t=null,S$1=null,s$1=null,e$1=null,f$1=null;S$1=this._hi+yhi,T=this._lo+ylo,e$1=S$1-this._hi,f$1=T-this._lo,s$1=S$1-e$1,t=T-f$1,s$1=yhi-e$1+(this._hi-s$1),t=ylo-f$1+(this._lo-t),e$1=s$1+T,H$1=S$1+e$1,h$1=e$1+(S$1-H$1),e$1=t+h$1;var zhi=H$1+e$1,zlo=e$1+(H$1-zhi);return this._hi=zhi,this._lo=zlo,this}},DD.prototype.selfMultiply=function selfMultiply(){if(1===arguments.length){if(arguments[0]instanceof DD){var y=arguments[0];return this.selfMultiply(y._hi,y._lo)}if("number"==typeof arguments[0]){var y$1=arguments[0];return this.selfMultiply(y$1,0)}}else if(2===arguments.length){var yhi=arguments[0],ylo=arguments[1],hx=null,tx=null,hy=null,ty=null,C=null,c=null;C=DD.SPLIT*this._hi,hx=C-this._hi,c=DD.SPLIT*yhi,hx=C-hx,tx=this._hi-hx,hy=c-yhi,C=this._hi*yhi,hy=c-hy,ty=yhi-hy,c=hx*hy-C+hx*ty+tx*hy+tx*ty+(this._hi*ylo+this._lo*yhi);var zhi=C+c;hx=C-zhi;var zlo=c+hx;return this._hi=zhi,this._lo=zlo,this}},DD.prototype.selfSqr=function selfSqr(){return this.selfMultiply(this)},DD.prototype.floor=function floor(){if(this.isNaN())return DD.NaN;var fhi=_Mathfloor(this._hi),flo=0;return fhi===this._hi&&(flo=_Mathfloor(this._lo)),new DD(fhi,flo)},DD.prototype.negate=function negate(){return this.isNaN()?this:new DD(-this._hi,-this._lo)},DD.prototype.clone=function clone(){},DD.prototype.multiply=function multiply(){if(arguments[0]instanceof DD){var y=arguments[0];return y.isNaN()?DD.createNaN():DD.copy(this).selfMultiply(y)}if("number"==typeof arguments[0]){var y$1=arguments[0];return Double.isNaN(y$1)?DD.createNaN():DD.copy(this).selfMultiply(y$1,0)}},DD.prototype.isNaN=function isNaN(){return Double.isNaN(this._hi)},DD.prototype.intValue=function intValue(){return _Mathtrunc(this._hi)},DD.prototype.toString=function toString(){var mag=DD.magnitude(this._hi);return-3<=mag&&20>=mag?this.toStandardNotation():this.toSciNotation()},DD.prototype.toStandardNotation=function toStandardNotation(){var specialStr=this.getSpecialNumberString();if(null!==specialStr)return specialStr;var magnitude=[,].fill(null),sigDigits=this.extractSignificantDigits(!0,magnitude),decimalPointPos=magnitude[0]+1,num=sigDigits;if("."===sigDigits.charAt(0))num="0"+sigDigits;else if(0>decimalPointPos)num="0."+DD.stringOfChar("0",-decimalPointPos)+sigDigits;else if(-1===sigDigits.indexOf(".")){var numZeroes=decimalPointPos-sigDigits.length,zeroes=DD.stringOfChar("0",numZeroes);num=sigDigits+zeroes+".0"}return this.isNegative()?"-"+num:num},DD.prototype.reciprocal=function reciprocal(){var hc=null,tc=null,hy=null,ty=null,C=null,c=null,U=null,u=null;C=1/this._hi,c=DD.SPLIT*C,hc=c-C,u=DD.SPLIT*this._hi,hc=c-hc,tc=C-hc,hy=u-this._hi,U=C*this._hi,hy=u-hy,ty=this._hi-hy,u=hc*hy-U+hc*ty+tc*hy+tc*ty,c=(1-U-u-C*this._lo)/this._hi;var zhi=C+c,zlo=C-zhi+c;return new DD(zhi,zlo)},DD.prototype.toSciNotation=function toSciNotation(){if(this.isZero())return DD.SCI_NOT_ZERO;var specialStr=this.getSpecialNumberString();if(null!==specialStr)return specialStr;var magnitude=[,].fill(null),digits=this.extractSignificantDigits(!1,magnitude),expStr=DD.SCI_NOT_EXPONENT_CHAR+magnitude[0];if("0"===digits.charAt(0))throw new Error("Found leading zero: "+digits);var trailingDigits="";1<digits.length&&(trailingDigits=digits.substring(1));var digitsWithDecimal=digits.charAt(0)+"."+trailingDigits;return this.isNegative()?"-"+digitsWithDecimal+expStr:digitsWithDecimal+expStr},DD.prototype.abs=function abs(){return this.isNaN()?DD.NaN:this.isNegative()?this.negate():new DD(this)},DD.prototype.isPositive=function isPositive(){return(0<this._hi||0===this._hi)&&0<this._lo},DD.prototype.lt=function lt(y){return(this._hi<y._hi||this._hi===y._hi)&&this._lo<y._lo},DD.prototype.add=function add(){if(arguments[0]instanceof DD){var y=arguments[0];return DD.copy(this).selfAdd(y)}if("number"==typeof arguments[0]){var y$1=arguments[0];return DD.copy(this).selfAdd(y$1)}},DD.prototype.init=function init(){if(1===arguments.length){if("number"==typeof arguments[0]){var x=arguments[0];this._hi=x,this._lo=0}else if(arguments[0]instanceof DD){var dd=arguments[0];this._hi=dd._hi,this._lo=dd._lo}}else if(2===arguments.length){var hi=arguments[0],lo=arguments[1];this._hi=hi,this._lo=lo}},DD.prototype.gt=function gt(y){return(this._hi>y._hi||this._hi===y._hi)&&this._lo>y._lo},DD.prototype.isNegative=function isNegative(){return(0>this._hi||0===this._hi)&&0>this._lo},DD.prototype.trunc=function trunc(){return this.isNaN()?DD.NaN:this.isPositive()?this.floor():this.ceil()},DD.prototype.signum=function signum(){return 0<this._hi?1:0>this._hi?-1:0<this._lo?1:0>this._lo?-1:0},DD.prototype.interfaces_=function interfaces_(){return[Serializable,Comparable,Clonable]},DD.prototype.getClass=function getClass(){return DD},DD.sqr=function sqr(x){return DD.valueOf(x).selfMultiply(x)},DD.valueOf=function valueOf(){if("string"==typeof arguments[0]){var str=arguments[0];return DD.parse(str)}if("number"==typeof arguments[0]){var x=arguments[0];return new DD(x)}},DD.sqrt=function sqrt(x){return DD.valueOf(x).sqrt()},DD.parse=function parse(str){for(var i=0,strlen=str.length;Character.isWhitespace(str.charAt(i));)i++;var isNegative=!1;if(i<strlen){var signCh=str.charAt(i);("-"===signCh||"+"===signCh)&&(i++,"-"===signCh&&(isNegative=!0))}for(var val=new DD,numDigits=0,numBeforeDec=0,exp=0,ch;!(i>=strlen);){if(ch=str.charAt(i),i++,Character.isDigit(ch)){var d=ch-"0";val.selfMultiply(DD.TEN),val.selfAdd(d),numDigits++;continue}if("."===ch){numBeforeDec=numDigits;continue}if("e"===ch||"E"===ch){var expStr=str.substring(i);try{exp=Integer.parseInt(expStr)}catch(ex){if(ex instanceof Error)throw new Error("Invalid exponent "+expStr+" in string "+str);else throw ex}finally{}break}throw new Error("Unexpected character '"+ch+"' at position "+i+" in string "+str)}var val2=val,numDecPlaces=numDigits-numBeforeDec-exp;if(0==numDecPlaces)val2=val;else if(0<numDecPlaces){var scale=DD.TEN.pow(numDecPlaces);val2=val.divide(scale)}else if(0>numDecPlaces){var scale$1=DD.TEN.pow(-numDecPlaces);val2=val.multiply(scale$1)}return isNegative?val2.negate():val2},DD.createNaN=function createNaN(){return new DD(Double.NaN,Double.NaN)},DD.copy=function copy(dd){return new DD(dd)},DD.magnitude=function magnitude(x){var xAbs=_Mathabs(x),xLog10=_Mathlog(xAbs)/2.302585092994046,xMag=_Mathtrunc(_Mathfloor(xLog10)),xApprox=_Mathpow(10,xMag);return 10*xApprox<=xAbs&&(xMag+=1),xMag},DD.stringOfChar=function stringOfChar(ch,len){for(var buf=new StringBuffer,i=0;i<len;i++)buf.append(ch);return buf.toString()},staticAccessors$7.PI.get=function(){return new DD(3.141592653589793,1.2246467991473532e-16)},staticAccessors$7.TWO_PI.get=function(){return new DD(6.283185307179586,2.4492935982947064e-16)},staticAccessors$7.PI_2.get=function(){return new DD(1.5707963267948966,6.123233995736766e-17)},staticAccessors$7.E.get=function(){return new DD(2.718281828459045,1.4456468917292502e-16)},staticAccessors$7.NaN.get=function(){return new DD(Double.NaN,Double.NaN)},staticAccessors$7.EPS.get=function(){return 1.23259516440783e-32},staticAccessors$7.SPLIT.get=function(){return 134217729},staticAccessors$7.MAX_PRINT_DIGITS.get=function(){return 32},staticAccessors$7.TEN.get=function(){return DD.valueOf(10)},staticAccessors$7.ONE.get=function(){return DD.valueOf(1)},staticAccessors$7.SCI_NOT_EXPONENT_CHAR.get=function(){return"E"},staticAccessors$7.SCI_NOT_ZERO.get=function(){return"0.0E0"},Object.defineProperties(DD,staticAccessors$7);var CGAlgorithmsDD=function CGAlgorithmsDD(){},staticAccessors$6={DP_SAFE_EPSILON:{configurable:!0}};CGAlgorithmsDD.prototype.interfaces_=function interfaces_(){return[]},CGAlgorithmsDD.prototype.getClass=function getClass(){return CGAlgorithmsDD},CGAlgorithmsDD.orientationIndex=function orientationIndex(p1,p2,q){var index=CGAlgorithmsDD.orientationIndexFilter(p1,p2,q);if(1>=index)return index;var dx1=DD.valueOf(p2.x).selfAdd(-p1.x),dy1=DD.valueOf(p2.y).selfAdd(-p1.y),dx2=DD.valueOf(q.x).selfAdd(-p2.x),dy2=DD.valueOf(q.y).selfAdd(-p2.y);return dx1.selfMultiply(dy2).selfSubtract(dy1.selfMultiply(dx2)).signum()},CGAlgorithmsDD.signOfDet2x2=function signOfDet2x2(x1,y1,x2,y2){var det=x1.multiply(y2).selfSubtract(y1.multiply(x2));return det.signum()},CGAlgorithmsDD.intersection=function intersection(p1,p2,q1,q2){var denom1=DD.valueOf(q2.y).selfSubtract(q1.y).selfMultiply(DD.valueOf(p2.x).selfSubtract(p1.x)),denom2=DD.valueOf(q2.x).selfSubtract(q1.x).selfMultiply(DD.valueOf(p2.y).selfSubtract(p1.y)),denom=denom1.subtract(denom2),numx1=DD.valueOf(q2.x).selfSubtract(q1.x).selfMultiply(DD.valueOf(p1.y).selfSubtract(q1.y)),numx2=DD.valueOf(q2.y).selfSubtract(q1.y).selfMultiply(DD.valueOf(p1.x).selfSubtract(q1.x)),numx=numx1.subtract(numx2),fracP=numx.selfDivide(denom).doubleValue(),x=DD.valueOf(p1.x).selfAdd(DD.valueOf(p2.x).selfSubtract(p1.x).selfMultiply(fracP)).doubleValue(),numy1=DD.valueOf(p2.x).selfSubtract(p1.x).selfMultiply(DD.valueOf(p1.y).selfSubtract(q1.y)),numy2=DD.valueOf(p2.y).selfSubtract(p1.y).selfMultiply(DD.valueOf(p1.x).selfSubtract(q1.x)),numy=numy1.subtract(numy2),fracQ=numy.selfDivide(denom).doubleValue(),y=DD.valueOf(q1.y).selfAdd(DD.valueOf(q2.y).selfSubtract(q1.y).selfMultiply(fracQ)).doubleValue();return new Coordinate(x,y)},CGAlgorithmsDD.orientationIndexFilter=function orientationIndexFilter(pa,pb,pc){var detsum=null,detleft=(pa.x-pc.x)*(pb.y-pc.y),detright=(pa.y-pc.y)*(pb.x-pc.x),det=detleft-detright;if(0<detleft){if(0>=detright)return CGAlgorithmsDD.signum(det);detsum=detleft+detright}else if(0>detleft){if(0<=detright)return CGAlgorithmsDD.signum(det);detsum=-detleft-detright}else return CGAlgorithmsDD.signum(det);var errbound=CGAlgorithmsDD.DP_SAFE_EPSILON*detsum;return det>=errbound||-det>=errbound?CGAlgorithmsDD.signum(det):2},CGAlgorithmsDD.signum=function signum(x){return 0<x?1:0>x?-1:0},staticAccessors$6.DP_SAFE_EPSILON.get=function(){return 1e-15},Object.defineProperties(CGAlgorithmsDD,staticAccessors$6);var CoordinateSequence=function CoordinateSequence(){},staticAccessors$8={X:{configurable:!0},Y:{configurable:!0},Z:{configurable:!0},M:{configurable:!0}};staticAccessors$8.X.get=function(){return 0},staticAccessors$8.Y.get=function(){return 1},staticAccessors$8.Z.get=function(){return 2},staticAccessors$8.M.get=function(){return 3},CoordinateSequence.prototype.setOrdinate=function setOrdinate(index,ordinateIndex,value){},CoordinateSequence.prototype.size=function size(){},CoordinateSequence.prototype.getOrdinate=function getOrdinate(index,ordinateIndex){},CoordinateSequence.prototype.getCoordinate=function getCoordinate(){},CoordinateSequence.prototype.getCoordinateCopy=function getCoordinateCopy(i){},CoordinateSequence.prototype.getDimension=function getDimension(){},CoordinateSequence.prototype.getX=function getX(index){},CoordinateSequence.prototype.clone=function clone(){},CoordinateSequence.prototype.expandEnvelope=function expandEnvelope(env){},CoordinateSequence.prototype.copy=function copy(){},CoordinateSequence.prototype.getY=function getY(index){},CoordinateSequence.prototype.toCoordinateArray=function toCoordinateArray(){},CoordinateSequence.prototype.interfaces_=function interfaces_(){return[Clonable]},CoordinateSequence.prototype.getClass=function getClass(){return CoordinateSequence},Object.defineProperties(CoordinateSequence,staticAccessors$8);var Exception=function Exception(){},NotRepresentableException=function(Exception$$1){function NotRepresentableException(){Exception$$1.call(this,"Projective point not representable on the Cartesian plane.")}return Exception$$1&&(NotRepresentableException.__proto__=Exception$$1),NotRepresentableException.prototype=Object.create(Exception$$1&&Exception$$1.prototype),NotRepresentableException.prototype.constructor=NotRepresentableException,NotRepresentableException.prototype.interfaces_=function interfaces_(){return[]},NotRepresentableException.prototype.getClass=function getClass(){return NotRepresentableException},NotRepresentableException}(Exception),System=function System(){};System.arraycopy=function arraycopy(src,srcPos,dest,destPos,len){for(var c=0,i=srcPos;i<srcPos+len;i++)dest[destPos+c]=src[i],c++},System.getProperty=function getProperty(name){return{"line.separator":"\n"}[name]};var HCoordinate=function HCoordinate(){if(this.x=null,this.y=null,this.w=null,0===arguments.length)this.x=0,this.y=0,this.w=1;else if(1===arguments.length){var p=arguments[0];this.x=p.x,this.y=p.y,this.w=1}else if(2===arguments.length){if("number"==typeof arguments[0]&&"number"==typeof arguments[1]){var _x=arguments[0],_y=arguments[1];this.x=_x,this.y=_y,this.w=1}else if(arguments[0]instanceof HCoordinate&&arguments[1]instanceof HCoordinate){var p1=arguments[0],p2=arguments[1];this.x=p1.y*p2.w-p2.y*p1.w,this.y=p2.x*p1.w-p1.x*p2.w,this.w=p1.x*p2.y-p2.x*p1.y}else if(arguments[0]instanceof Coordinate&&arguments[1]instanceof Coordinate){var p1$1=arguments[0],p2$1=arguments[1];this.x=p1$1.y-p2$1.y,this.y=p2$1.x-p1$1.x,this.w=p1$1.x*p2$1.y-p2$1.x*p1$1.y}}else if(3===arguments.length){var _x$1=arguments[0],_y$1=arguments[1],_w=arguments[2];this.x=_x$1,this.y=_y$1,this.w=_w}else if(4===arguments.length){var p1$2=arguments[0],p2$2=arguments[1],q1=arguments[2],q2=arguments[3],px=p1$2.y-p2$2.y,py=p2$2.x-p1$2.x,pw=p1$2.x*p2$2.y-p2$2.x*p1$2.y,qx=q1.y-q2.y,qy=q2.x-q1.x,qw=q1.x*q2.y-q2.x*q1.y;this.x=py*qw-qy*pw,this.y=qx*pw-px*qw,this.w=px*qy-qx*py}};HCoordinate.prototype.getY=function getY(){var a=this.y/this.w;if(Double.isNaN(a)||Double.isInfinite(a))throw new NotRepresentableException;return a},HCoordinate.prototype.getX=function getX(){var a=this.x/this.w;if(Double.isNaN(a)||Double.isInfinite(a))throw new NotRepresentableException;return a},HCoordinate.prototype.getCoordinate=function getCoordinate(){var p=new Coordinate;return p.x=this.getX(),p.y=this.getY(),p},HCoordinate.prototype.interfaces_=function interfaces_(){return[]},HCoordinate.prototype.getClass=function getClass(){return HCoordinate},HCoordinate.intersection=function intersection(p1,p2,q1,q2){var px=p1.y-p2.y,py=p2.x-p1.x,pw=p1.x*p2.y-p2.x*p1.y,qx=q1.y-q2.y,qy=q2.x-q1.x,qw=q1.x*q2.y-q2.x*q1.y,x=py*qw-qy*pw,y=qx*pw-px*qw,w=px*qy-qx*py,xInt=x/w,yInt=y/w;if(Double.isNaN(xInt)||Double.isInfinite(xInt)||Double.isNaN(yInt)||Double.isInfinite(yInt))throw new NotRepresentableException;return new Coordinate(xInt,yInt)};var Envelope=function Envelope(){if(this._minx=null,this._maxx=null,this._miny=null,this._maxy=null,0===arguments.length)this.init();else if(1===arguments.length){if(arguments[0]instanceof Coordinate){var p=arguments[0];this.init(p.x,p.x,p.y,p.y)}else if(arguments[0]instanceof Envelope){var env=arguments[0];this.init(env)}}else if(2===arguments.length){var p1=arguments[0],p2=arguments[1];this.init(p1.x,p2.x,p1.y,p2.y)}else if(4===arguments.length){var x1=arguments[0],x2=arguments[1],y1=arguments[2],y2=arguments[3];this.init(x1,x2,y1,y2)}},staticAccessors$9={serialVersionUID:{configurable:!0}};Envelope.prototype.getArea=function getArea(){return this.getWidth()*this.getHeight()},Envelope.prototype.equals=function equals(other){if(!(other instanceof Envelope))return!1;var otherEnvelope=other;return this.isNull()?otherEnvelope.isNull():this._maxx===otherEnvelope.getMaxX()&&this._maxy===otherEnvelope.getMaxY()&&this._minx===otherEnvelope.getMinX()&&this._miny===otherEnvelope.getMinY()},Envelope.prototype.intersection=function intersection(env){if(this.isNull()||env.isNull()||!this.intersects(env))return new Envelope;var intMinX=this._minx>env._minx?this._minx:env._minx,intMinY=this._miny>env._miny?this._miny:env._miny,intMaxX=this._maxx<env._maxx?this._maxx:env._maxx,intMaxY=this._maxy<env._maxy?this._maxy:env._maxy;return new Envelope(intMinX,intMaxX,intMinY,intMaxY)},Envelope.prototype.isNull=function isNull(){return this._maxx<this._minx},Envelope.prototype.getMaxX=function getMaxX(){return this._maxx},Envelope.prototype.covers=function covers(){if(1===arguments.length){if(arguments[0]instanceof Coordinate){var p=arguments[0];return this.covers(p.x,p.y)}if(arguments[0]instanceof Envelope){var other=arguments[0];return this.isNull()||other.isNull()?!1:other.getMinX()>=this._minx&&other.getMaxX()<=this._maxx&&other.getMinY()>=this._miny&&other.getMaxY()<=this._maxy}}else if(2===arguments.length){var x=arguments[0],y=arguments[1];return!this.isNull()&&x>=this._minx&&x<=this._maxx&&y>=this._miny&&y<=this._maxy}},Envelope.prototype.intersects=function intersects(){if(1===arguments.length){if(arguments[0]instanceof Envelope){var other=arguments[0];return this.isNull()||other.isNull()?!1:!(other._minx>this._maxx||other._maxx<this._minx||other._miny>this._maxy||other._maxy<this._miny)}if(arguments[0]instanceof Coordinate){var p=arguments[0];return this.intersects(p.x,p.y)}}else if(2===arguments.length){var x=arguments[0],y=arguments[1];return!this.isNull()&&!(x>this._maxx||x<this._minx||y>this._maxy||y<this._miny)}},Envelope.prototype.getMinY=function getMinY(){return this._miny},Envelope.prototype.getMinX=function getMinX(){return this._minx},Envelope.prototype.expandToInclude=function expandToInclude(){if(1===arguments.length){if(arguments[0]instanceof Coordinate){var p=arguments[0];this.expandToInclude(p.x,p.y)}else if(arguments[0]instanceof Envelope){var other=arguments[0];if(other.isNull())return null;this.isNull()?(this._minx=other.getMinX(),this._maxx=other.getMaxX(),this._miny=other.getMinY(),this._maxy=other.getMaxY()):(other._minx<this._minx&&(this._minx=other._minx),other._maxx>this._maxx&&(this._maxx=other._maxx),other._miny<this._miny&&(this._miny=other._miny),other._maxy>this._maxy&&(this._maxy=other._maxy))}}else if(2===arguments.length){var x=arguments[0],y=arguments[1];this.isNull()?(this._minx=x,this._maxx=x,this._miny=y,this._maxy=y):(x<this._minx&&(this._minx=x),x>this._maxx&&(this._maxx=x),y<this._miny&&(this._miny=y),y>this._maxy&&(this._maxy=y))}},Envelope.prototype.minExtent=function minExtent(){if(this.isNull())return 0;var w=this.getWidth(),h=this.getHeight();return w<h?w:h},Envelope.prototype.getWidth=function getWidth(){return this.isNull()?0:this._maxx-this._minx},Envelope.prototype.compareTo=function compareTo(o){var env=o;if(this.isNull())return env.isNull()?0:-1;return env.isNull()?1:this._minx<env._minx?-1:this._minx>env._minx?1:this._miny<env._miny?-1:this._miny>env._miny?1:this._maxx<env._maxx?-1:this._maxx>env._maxx?1:this._maxy<env._maxy?-1:this._maxy>env._maxy?1:0},Envelope.prototype.translate=function translate(transX,transY){return this.isNull()?null:void this.init(this.getMinX()+transX,this.getMaxX()+transX,this.getMinY()+transY,this.getMaxY()+transY)},Envelope.prototype.toString=function toString(){return"Env["+this._minx+" : "+this._maxx+", "+this._miny+" : "+this._maxy+"]"},Envelope.prototype.setToNull=function setToNull(){this._minx=0,this._maxx=-1,this._miny=0,this._maxy=-1},Envelope.prototype.getHeight=function getHeight(){return this.isNull()?0:this._maxy-this._miny},Envelope.prototype.maxExtent=function maxExtent(){if(this.isNull())return 0;var w=this.getWidth(),h=this.getHeight();return w>h?w:h},Envelope.prototype.expandBy=function expandBy(){if(1===arguments.length){var distance=arguments[0];this.expandBy(distance,distance)}else if(2===arguments.length){var deltaX=arguments[0],deltaY=arguments[1];if(this.isNull())return null;this._minx-=deltaX,this._maxx+=deltaX,this._miny-=deltaY,this._maxy+=deltaY,(this._minx>this._maxx||this._miny>this._maxy)&&this.setToNull()}},Envelope.prototype.contains=function contains(){if(1===arguments.length){if(arguments[0]instanceof Envelope){var other=arguments[0];return this.covers(other)}if(arguments[0]instanceof Coordinate){var p=arguments[0];return this.covers(p)}}else if(2===arguments.length){var x=arguments[0],y=arguments[1];return this.covers(x,y)}},Envelope.prototype.centre=function centre(){return this.isNull()?null:new Coordinate((this.getMinX()+this.getMaxX())/2,(this.getMinY()+this.getMaxY())/2)},Envelope.prototype.init=function init(){if(0===arguments.length)this.setToNull();else if(1===arguments.length){if(arguments[0]instanceof Coordinate){var p=arguments[0];this.init(p.x,p.x,p.y,p.y)}else if(arguments[0]instanceof Envelope){var env=arguments[0];this._minx=env._minx,this._maxx=env._maxx,this._miny=env._miny,this._maxy=env._maxy}}else if(2===arguments.length){var p1=arguments[0],p2=arguments[1];this.init(p1.x,p2.x,p1.y,p2.y)}else if(4===arguments.length){var x1=arguments[0],x2=arguments[1],y1=arguments[2],y2=arguments[3];x1<x2?(this._minx=x1,this._maxx=x2):(this._minx=x2,this._maxx=x1),y1<y2?(this._miny=y1,this._maxy=y2):(this._miny=y2,this._maxy=y1)}},Envelope.prototype.getMaxY=function getMaxY(){return this._maxy},Envelope.prototype.distance=function distance(env){if(this.intersects(env))return 0;var dx=0;this._maxx<env._minx?dx=env._minx-this._maxx:this._minx>env._maxx&&(dx=this._minx-env._maxx);var dy=0;return this._maxy<env._miny?dy=env._miny-this._maxy:this._miny>env._maxy&&(dy=this._miny-env._maxy),0==dx?dy:0==dy?dx:_Mathsqrt(dx*dx+dy*dy)},Envelope.prototype.hashCode=function hashCode(){var result=17;return result=37*result+Coordinate.hashCode(this._minx),result=37*result+Coordinate.hashCode(this._maxx),result=37*result+Coordinate.hashCode(this._miny),result=37*result+Coordinate.hashCode(this._maxy),result},Envelope.prototype.interfaces_=function interfaces_(){return[Comparable,Serializable]},Envelope.prototype.getClass=function getClass(){return Envelope},Envelope.intersects=function intersects(){if(3===arguments.length){var p1=arguments[0],p2=arguments[1],q=arguments[2];return q.x>=(p1.x<p2.x?p1.x:p2.x)&&q.x<=(p1.x>p2.x?p1.x:p2.x)&&q.y>=(p1.y<p2.y?p1.y:p2.y)&&q.y<=(p1.y>p2.y?p1.y:p2.y)}if(4===arguments.length){var p1$1=arguments[0],p2$1=arguments[1],q1=arguments[2],q2=arguments[3],minq=_Mathmin(q1.x,q2.x),maxq=_Mathmax(q1.x,q2.x),minp=_Mathmin(p1$1.x,p2$1.x),maxp=_Mathmax(p1$1.x,p2$1.x);return!(minp>maxq)&&!(maxp<minq)&&(minq=_Mathmin(q1.y,q2.y),maxq=_Mathmax(q1.y,q2.y),minp=_Mathmin(p1$1.y,p2$1.y),maxp=_Mathmax(p1$1.y,p2$1.y),!(minp>maxq)&&!(maxp<minq))}},staticAccessors$9.serialVersionUID.get=function(){return 5873921885273102000},Object.defineProperties(Envelope,staticAccessors$9);var regExes={typeStr:/^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/,emptyTypeStr:/^\s*(\w+)\s*EMPTY\s*$/,spaces:/\s+/,parenComma:/\)\s*,\s*\(/,doubleParenComma:/\)\s*\)\s*,\s*\(\s*\(/,trimParens:/^\s*\(?(.*?)\)?\s*$/},WKTParser=function WKTParser(geometryFactory){this.geometryFactory=geometryFactory||new GeometryFactory};WKTParser.prototype.read=function read(wkt){var geometry,type,str;wkt=wkt.replace(/[\n\r]/g," ");var matches=regExes.typeStr.exec(wkt);if(-1!==wkt.search("EMPTY")&&(matches=regExes.emptyTypeStr.exec(wkt),matches[2]=void 0),matches&&(type=matches[1].toLowerCase(),str=matches[2],parse$1[type]&&(geometry=parse$1[type].apply(this,[str]))),void 0===geometry)throw new Error("Could not parse WKT "+wkt);return geometry},WKTParser.prototype.write=function write(geometry){return this.extractGeometry(geometry)},WKTParser.prototype.extractGeometry=function extractGeometry(geometry){var type=geometry.getGeometryType().toLowerCase();if(!extract$1[type])return null;var wktType=type.toUpperCase(),data;return data=geometry.isEmpty()?wktType+" EMPTY":wktType+"("+extract$1[type].apply(this,[geometry])+")",data};var extract$1={coordinate:function coordinate(coordinate$1){return coordinate$1.x+" "+coordinate$1.y},point:function point(point$1){return extract$1.coordinate.call(this,point$1._coordinates._coordinates[0])},multipoint:function multipoint(multipoint$1){for(var this$1=this,array=[],i=0,len=multipoint$1._geometries.length;i<len;++i)array.push("("+extract$1.point.apply(this$1,[multipoint$1._geometries[i]])+")");return array.join(",")},linestring:function linestring(linestring$1){for(var this$1=this,array=[],i=0,len=linestring$1._points._coordinates.length;i<len;++i)array.push(extract$1.coordinate.apply(this$1,[linestring$1._points._coordinates[i]]));return array.join(",")},linearring:function linearring(linearring$1){for(var this$1=this,array=[],i=0,len=linearring$1._points._coordinates.length;i<len;++i)array.push(extract$1.coordinate.apply(this$1,[linearring$1._points._coordinates[i]]));return array.join(",")},multilinestring:function multilinestring(multilinestring$1){for(var this$1=this,array=[],i=0,len=multilinestring$1._geometries.length;i<len;++i)array.push("("+extract$1.linestring.apply(this$1,[multilinestring$1._geometries[i]])+")");return array.join(",")},polygon:function polygon(polygon$1){var this$1=this,array=[];array.push("("+extract$1.linestring.apply(this,[polygon$1._shell])+")");for(var i=0,len=polygon$1._holes.length;i<len;++i)array.push("("+extract$1.linestring.apply(this$1,[polygon$1._holes[i]])+")");return array.join(",")},multipolygon:function multipolygon(multipolygon$1){for(var this$1=this,array=[],i=0,len=multipolygon$1._geometries.length;i<len;++i)array.push("("+extract$1.polygon.apply(this$1,[multipolygon$1._geometries[i]])+")");return array.join(",")},geometrycollection:function geometrycollection(collection){for(var this$1=this,array=[],i=0,len=collection._geometries.length;i<len;++i)array.push(this$1.extractGeometry(collection._geometries[i]));return array.join(",")}},parse$1={point:function point(str){if(str===void 0)return this.geometryFactory.createPoint();var coords=str.trim().split(regExes.spaces);return this.geometryFactory.createPoint(new Coordinate(_NumberparseFloat(coords[0]),_NumberparseFloat(coords[1])))},multipoint:function multipoint(str){var this$1=this;if(str===void 0)return this.geometryFactory.createMultiPoint();for(var points=str.trim().split(","),components=[],i=0,len=points.length,point;i<len;++i)point=points[i].replace(regExes.trimParens,"$1"),components.push(parse$1.point.apply(this$1,[point]));return this.geometryFactory.createMultiPoint(components)},linestring:function linestring(str){if(str===void 0)return this.geometryFactory.createLineString();for(var points=str.trim().split(","),components=[],i=0,len=points.length,coords;i<len;++i)coords=points[i].trim().split(regExes.spaces),components.push(new Coordinate(_NumberparseFloat(coords[0]),_NumberparseFloat(coords[1])));return this.geometryFactory.createLineString(components)},linearring:function linearring(str){if(str===void 0)return this.geometryFactory.createLinearRing();for(var points=str.trim().split(","),components=[],i=0,len=points.length,coords;i<len;++i)coords=points[i].trim().split(regExes.spaces),components.push(new Coordinate(_NumberparseFloat(coords[0]),_NumberparseFloat(coords[1])));return this.geometryFactory.createLinearRing(components)},multilinestring:function multilinestring(str){var this$1=this;if(str===void 0)return this.geometryFactory.createMultiLineString();for(var lines=str.trim().split(regExes.parenComma),components=[],i=0,len=lines.length,line;i<len;++i)line=lines[i].replace(regExes.trimParens,"$1"),components.push(parse$1.linestring.apply(this$1,[line]));return this.geometryFactory.createMultiLineString(components)},polygon:function polygon(str){var this$1=this;if(str===void 0)return this.geometryFactory.createPolygon();for(var rings=str.trim().split(regExes.parenComma),holes=[],i=0,len=rings.length,ring,linestring,linearring,shell;i<len;++i)ring=rings[i].replace(regExes.trimParens,"$1"),linestring=parse$1.linestring.apply(this$1,[ring]),linearring=this$1.geometryFactory.createLinearRing(linestring._points),0===i?shell=linearring:holes.push(linearring);return this.geometryFactory.createPolygon(shell,holes)},multipolygon:function multipolygon(str){var this$1=this;if(str===void 0)return this.geometryFactory.createMultiPolygon();for(var polygons=str.trim().split(regExes.doubleParenComma),components=[],i=0,len=polygons.length,polygon;i<len;++i)polygon=polygons[i].replace(regExes.trimParens,"$1"),components.push(parse$1.polygon.apply(this$1,[polygon]));return this.geometryFactory.createMultiPolygon(components)},geometrycollection:function geometrycollection(str){var this$1=this;if(str===void 0)return this.geometryFactory.createGeometryCollection();str=str.replace(/,\s*([A-Za-z])/g,"|$1");for(var wktArray=str.trim().split("|"),components=[],i=0,len=wktArray.length;i<len;++i)components.push(this$1.read(wktArray[i]));return this.geometryFactory.createGeometryCollection(components)}},WKTWriter=function WKTWriter(geometryFactory){this.parser=new WKTParser(geometryFactory)};WKTWriter.prototype.write=function write(geometry){return this.parser.write(geometry)},WKTWriter.toLineString=function toLineString(p0,p1){if(2!==arguments.length)throw new Error("Not implemented");return"LINESTRING ( "+p0.x+" "+p0.y+", "+p1.x+" "+p1.y+" )"};var RuntimeException=function(Error){function RuntimeException(message){Error.call(this,message),this.name="RuntimeException",this.message=message,this.stack=new Error().stack}return Error&&(RuntimeException.__proto__=Error),RuntimeException.prototype=Object.create(Error&&Error.prototype),RuntimeException.prototype.constructor=RuntimeException,RuntimeException}(Error),AssertionFailedException=function(RuntimeException$$1){function AssertionFailedException(){if(RuntimeException$$1.call(this),0===arguments.length)RuntimeException$$1.call(this);else if(1===arguments.length){var message=arguments[0];RuntimeException$$1.call(this,message)}}return RuntimeException$$1&&(AssertionFailedException.__proto__=RuntimeException$$1),AssertionFailedException.prototype=Object.create(RuntimeException$$1&&RuntimeException$$1.prototype),AssertionFailedException.prototype.constructor=AssertionFailedException,AssertionFailedException.prototype.interfaces_=function interfaces_(){return[]},AssertionFailedException.prototype.getClass=function getClass(){return AssertionFailedException},AssertionFailedException}(RuntimeException),Assert=function Assert(){};Assert.prototype.interfaces_=function interfaces_(){return[]},Assert.prototype.getClass=function getClass(){return Assert},Assert.shouldNeverReachHere=function shouldNeverReachHere(){if(0===arguments.length)Assert.shouldNeverReachHere(null);else if(1===arguments.length){var message=arguments[0];throw new AssertionFailedException("Should never reach here"+(null===message?"":": "+message))}},Assert.isTrue=function isTrue(){var assertion,message;if(1===arguments.length)assertion=arguments[0],Assert.isTrue(assertion,null);else if(2===arguments.length&&(assertion=arguments[0],message=arguments[1],!assertion))if(null===message)throw new AssertionFailedException;else throw new AssertionFailedException(message)},Assert.equals=function equals(){var expectedValue,actualValue,message;if(2===arguments.length)expectedValue=arguments[0],actualValue=arguments[1],Assert.equals(expectedValue,actualValue,null);else if(3===arguments.length&&(expectedValue=arguments[0],actualValue=arguments[1],message=arguments[2],!actualValue.equals(expectedValue)))throw new AssertionFailedException("Expected "+expectedValue+" but encountered "+actualValue+(null===message?"":": "+message))};var LineIntersector=function LineIntersector(){this._result=null,this._inputLines=[,,].fill().map(function(){return[,,]}),this._intPt=[,,].fill(null),this._intLineIndex=null,this._isProper=null,this._pa=null,this._pb=null,this._precisionModel=null,this._intPt[0]=new Coordinate,this._intPt[1]=new Coordinate,this._pa=this._intPt[0],this._pb=this._intPt[1],this._result=0},staticAccessors$10={DONT_INTERSECT:{configurable:!0},DO_INTERSECT:{configurable:!0},COLLINEAR:{configurable:!0},NO_INTERSECTION:{configurable:!0},POINT_INTERSECTION:{configurable:!0},COLLINEAR_INTERSECTION:{configurable:!0}};LineIntersector.prototype.getIndexAlongSegment=function getIndexAlongSegment(segmentIndex,intIndex){return this.computeIntLineIndex(),this._intLineIndex[segmentIndex][intIndex]},LineIntersector.prototype.getTopologySummary=function getTopologySummary(){var catBuf=new StringBuffer;return this.isEndPoint()&&catBuf.append(" endpoint"),this._isProper&&catBuf.append(" proper"),this.isCollinear()&&catBuf.append(" collinear"),catBuf.toString()},LineIntersector.prototype.computeIntersection=function computeIntersection(p1,p2,p3,p4){this._inputLines[0][0]=p1,this._inputLines[0][1]=p2,this._inputLines[1][0]=p3,this._inputLines[1][1]=p4,this._result=this.computeIntersect(p1,p2,p3,p4)},LineIntersector.prototype.getIntersectionNum=function getIntersectionNum(){return this._result},LineIntersector.prototype.computeIntLineIndex=function computeIntLineIndex(){if(0===arguments.length)null===this._intLineIndex&&(this._intLineIndex=[,,].fill().map(function(){return[,,]}),this.computeIntLineIndex(0),this.computeIntLineIndex(1));else if(1===arguments.length){var segmentIndex=arguments[0],dist0=this.getEdgeDistance(segmentIndex,0),dist1=this.getEdgeDistance(segmentIndex,1);dist0>dist1?(this._intLineIndex[segmentIndex][0]=0,this._intLineIndex[segmentIndex][1]=1):(this._intLineIndex[segmentIndex][0]=1,this._intLineIndex[segmentIndex][1]=0)}},LineIntersector.prototype.isProper=function isProper(){return this.hasIntersection()&&this._isProper},LineIntersector.prototype.setPrecisionModel=function setPrecisionModel(precisionModel){this._precisionModel=precisionModel},LineIntersector.prototype.isInteriorIntersection=function isInteriorIntersection(){var this$1=this;if(0===arguments.length)return!!this.isInteriorIntersection(0)||!!this.isInteriorIntersection(1);if(1===arguments.length){for(var inputLineIndex=arguments[0],i=0;i<this._result;i++)if(!(this$1._intPt[i].equals2D(this$1._inputLines[inputLineIndex][0])||this$1._intPt[i].equals2D(this$1._inputLines[inputLineIndex][1])))return!0;return!1}},LineIntersector.prototype.getIntersection=function getIntersection(intIndex){return this._intPt[intIndex]},LineIntersector.prototype.isEndPoint=function isEndPoint(){return this.hasIntersection()&&!this._isProper},LineIntersector.prototype.hasIntersection=function hasIntersection(){return this._result!==LineIntersector.NO_INTERSECTION},LineIntersector.prototype.getEdgeDistance=function getEdgeDistance(segmentIndex,intIndex){var dist=LineIntersector.computeEdgeDistance(this._intPt[intIndex],this._inputLines[segmentIndex][0],this._inputLines[segmentIndex][1]);return dist},LineIntersector.prototype.isCollinear=function isCollinear(){return this._result===LineIntersector.COLLINEAR_INTERSECTION},LineIntersector.prototype.toString=function toString(){return WKTWriter.toLineString(this._inputLines[0][0],this._inputLines[0][1])+" - "+WKTWriter.toLineString(this._inputLines[1][0],this._inputLines[1][1])+this.getTopologySummary()},LineIntersector.prototype.getEndpoint=function getEndpoint(segmentIndex,ptIndex){return this._inputLines[segmentIndex][ptIndex]},LineIntersector.prototype.isIntersection=function isIntersection(pt){for(var this$1=this,i=0;i<this._result;i++)if(this$1._intPt[i].equals2D(pt))return!0;return!1},LineIntersector.prototype.getIntersectionAlongSegment=function getIntersectionAlongSegment(segmentIndex,intIndex){return this.computeIntLineIndex(),this._intPt[this._intLineIndex[segmentIndex][intIndex]]},LineIntersector.prototype.interfaces_=function interfaces_(){return[]},LineIntersector.prototype.getClass=function getClass(){return LineIntersector},LineIntersector.computeEdgeDistance=function computeEdgeDistance(p,p0,p1){var dx=_Mathabs(p1.x-p0.x),dy=_Mathabs(p1.y-p0.y),dist=-1;if(p.equals(p0))dist=0;else if(p.equals(p1))dist=dx>dy?dx:dy;else{var pdx=_Mathabs(p.x-p0.x),pdy=_Mathabs(p.y-p0.y);dist=dx>dy?pdx:pdy,0!==dist||p.equals(p0)||(dist=_Mathmax(pdx,pdy))}return Assert.isTrue(0!==dist||p.equals(p0),"Bad distance calculation"),dist},LineIntersector.nonRobustComputeEdgeDistance=function nonRobustComputeEdgeDistance(p,p1,p2){var dx=p.x-p1.x,dy=p.y-p1.y,dist=_Mathsqrt(dx*dx+dy*dy);return Assert.isTrue(0!==dist||p.equals(p1),"Invalid distance calculation"),dist},staticAccessors$10.DONT_INTERSECT.get=function(){return 0},staticAccessors$10.DO_INTERSECT.get=function(){return 1},staticAccessors$10.COLLINEAR.get=function(){return 2},staticAccessors$10.NO_INTERSECTION.get=function(){return 0},staticAccessors$10.POINT_INTERSECTION.get=function(){return 1},staticAccessors$10.COLLINEAR_INTERSECTION.get=function(){return 2},Object.defineProperties(LineIntersector,staticAccessors$10);var RobustLineIntersector=function(LineIntersector$$1){function RobustLineIntersector(){LineIntersector$$1.apply(this,arguments)}return LineIntersector$$1&&(RobustLineIntersector.__proto__=LineIntersector$$1),RobustLineIntersector.prototype=Object.create(LineIntersector$$1&&LineIntersector$$1.prototype),RobustLineIntersector.prototype.constructor=RobustLineIntersector,RobustLineIntersector.prototype.isInSegmentEnvelopes=function isInSegmentEnvelopes(intPt){var env0=new Envelope(this._inputLines[0][0],this._inputLines[0][1]),env1=new Envelope(this._inputLines[1][0],this._inputLines[1][1]);return env0.contains(intPt)&&env1.contains(intPt)},RobustLineIntersector.prototype.computeIntersection=function computeIntersection(){if(3===arguments.length){var p=arguments[0],p1=arguments[1],p2=arguments[2];if(this._isProper=!1,Envelope.intersects(p1,p2,p)&&0===CGAlgorithms.orientationIndex(p1,p2,p)&&0===CGAlgorithms.orientationIndex(p2,p1,p))return this._isProper=!0,(p.equals(p1)||p.equals(p2))&&(this._isProper=!1),this._result=LineIntersector$$1.POINT_INTERSECTION,null;this._result=LineIntersector$$1.NO_INTERSECTION}else return LineIntersector$$1.prototype.computeIntersection.apply(this,arguments)},RobustLineIntersector.prototype.normalizeToMinimum=function normalizeToMinimum(n1,n2,n3,n4,normPt){normPt.x=this.smallestInAbsValue(n1.x,n2.x,n3.x,n4.x),normPt.y=this.smallestInAbsValue(n1.y,n2.y,n3.y,n4.y),n1.x-=normPt.x,n1.y-=normPt.y,n2.x-=normPt.x,n2.y-=normPt.y,n3.x-=normPt.x,n3.y-=normPt.y,n4.x-=normPt.x,n4.y-=normPt.y},RobustLineIntersector.prototype.safeHCoordinateIntersection=function safeHCoordinateIntersection(p1,p2,q1,q2){var intPt=null;try{intPt=HCoordinate.intersection(p1,p2,q1,q2)}catch(e){if(e instanceof NotRepresentableException)intPt=RobustLineIntersector.nearestEndpoint(p1,p2,q1,q2);else throw e}finally{}return intPt},RobustLineIntersector.prototype.intersection=function intersection(p1,p2,q1,q2){var intPt=this.intersectionWithNormalization(p1,p2,q1,q2);return this.isInSegmentEnvelopes(intPt)||(intPt=new Coordinate(RobustLineIntersector.nearestEndpoint(p1,p2,q1,q2))),null!==this._precisionModel&&this._precisionModel.makePrecise(intPt),intPt},RobustLineIntersector.prototype.smallestInAbsValue=function smallestInAbsValue(x1,x2,x3,x4){var x=x1,xabs=_Mathabs(x);return _Mathabs(x2)<xabs&&(x=x2,xabs=_Mathabs(x2)),_Mathabs(x3)<xabs&&(x=x3,xabs=_Mathabs(x3)),_Mathabs(x4)<xabs&&(x=x4),x},RobustLineIntersector.prototype.checkDD=function checkDD(p1,p2,q1,q2,intPt){var intPtDD=CGAlgorithmsDD.intersection(p1,p2,q1,q2),isIn=this.isInSegmentEnvelopes(intPtDD);System.out.println("DD in env = "+isIn+"  --------------------- "+intPtDD),1e-4<intPt.distance(intPtDD)&&System.out.println("Distance = "+intPt.distance(intPtDD))},RobustLineIntersector.prototype.intersectionWithNormalization=function intersectionWithNormalization(p1,p2,q1,q2){var n1=new Coordinate(p1),n2=new Coordinate(p2),n3=new Coordinate(q1),n4=new Coordinate(q2),normPt=new Coordinate;this.normalizeToEnvCentre(n1,n2,n3,n4,normPt);var intPt=this.safeHCoordinateIntersection(n1,n2,n3,n4);return intPt.x+=normPt.x,intPt.y+=normPt.y,intPt},RobustLineIntersector.prototype.computeCollinearIntersection=function computeCollinearIntersection(p1,p2,q1,q2){var p1q1p2=Envelope.intersects(p1,p2,q1),p1q2p2=Envelope.intersects(p1,p2,q2),q1p1q2=Envelope.intersects(q1,q2,p1),q1p2q2=Envelope.intersects(q1,q2,p2);return p1q1p2&&p1q2p2?(this._intPt[0]=q1,this._intPt[1]=q2,LineIntersector$$1.COLLINEAR_INTERSECTION):q1p1q2&&q1p2q2?(this._intPt[0]=p1,this._intPt[1]=p2,LineIntersector$$1.COLLINEAR_INTERSECTION):p1q1p2&&q1p1q2?(this._intPt[0]=q1,this._intPt[1]=p1,!q1.equals(p1)||p1q2p2||q1p2q2?LineIntersector$$1.COLLINEAR_INTERSECTION:LineIntersector$$1.POINT_INTERSECTION):p1q1p2&&q1p2q2?(this._intPt[0]=q1,this._intPt[1]=p2,!q1.equals(p2)||p1q2p2||q1p1q2?LineIntersector$$1.COLLINEAR_INTERSECTION:LineIntersector$$1.POINT_INTERSECTION):p1q2p2&&q1p1q2?(this._intPt[0]=q2,this._intPt[1]=p1,!q2.equals(p1)||p1q1p2||q1p2q2?LineIntersector$$1.COLLINEAR_INTERSECTION:LineIntersector$$1.POINT_INTERSECTION):p1q2p2&&q1p2q2?(this._intPt[0]=q2,this._intPt[1]=p2,!q2.equals(p2)||p1q1p2||q1p1q2?LineIntersector$$1.COLLINEAR_INTERSECTION:LineIntersector$$1.POINT_INTERSECTION):LineIntersector$$1.NO_INTERSECTION},RobustLineIntersector.prototype.normalizeToEnvCentre=function normalizeToEnvCentre(n00,n01,n10,n11,normPt){var minX0=n00.x<n01.x?n00.x:n01.x,minY0=n00.y<n01.y?n00.y:n01.y,maxX0=n00.x>n01.x?n00.x:n01.x,maxY0=n00.y>n01.y?n00.y:n01.y,minX1=n10.x<n11.x?n10.x:n11.x,minY1=n10.y<n11.y?n10.y:n11.y,maxX1=n10.x>n11.x?n10.x:n11.x,maxY1=n10.y>n11.y?n10.y:n11.y,intMinX=minX0>minX1?minX0:minX1,intMaxX=maxX0<maxX1?maxX0:maxX1,intMinY=minY0>minY1?minY0:minY1,intMaxY=maxY0<maxY1?maxY0:maxY1,intMidX=(intMinX+intMaxX)/2,intMidY=(intMinY+intMaxY)/2;normPt.x=intMidX,normPt.y=intMidY,n00.x-=normPt.x,n00.y-=normPt.y,n01.x-=normPt.x,n01.y-=normPt.y,n10.x-=normPt.x,n10.y-=normPt.y,n11.x-=normPt.x,n11.y-=normPt.y},RobustLineIntersector.prototype.computeIntersect=function computeIntersect(p1,p2,q1,q2){if(this._isProper=!1,!Envelope.intersects(p1,p2,q1,q2))return LineIntersector$$1.NO_INTERSECTION;var Pq1=CGAlgorithms.orientationIndex(p1,p2,q1),Pq2=CGAlgorithms.orientationIndex(p1,p2,q2);if(0<Pq1&&0<Pq2||0>Pq1&&0>Pq2)return LineIntersector$$1.NO_INTERSECTION;var Qp1=CGAlgorithms.orientationIndex(q1,q2,p1),Qp2=CGAlgorithms.orientationIndex(q1,q2,p2);if(0<Qp1&&0<Qp2||0>Qp1&&0>Qp2)return LineIntersector$$1.NO_INTERSECTION;var collinear=0===Pq1&&0===Pq2&&0===Qp1&&0===Qp2;return collinear?this.computeCollinearIntersection(p1,p2,q1,q2):(0===Pq1||0===Pq2||0===Qp1||0===Qp2?(this._isProper=!1,p1.equals2D(q1)||p1.equals2D(q2)?this._intPt[0]=p1:p2.equals2D(q1)||p2.equals2D(q2)?this._intPt[0]=p2:0===Pq1?this._intPt[0]=new Coordinate(q1):0===Pq2?this._intPt[0]=new Coordinate(q2):0===Qp1?this._intPt[0]=new Coordinate(p1):0===Qp2&&(this._intPt[0]=new Coordinate(p2))):(this._isProper=!0,this._intPt[0]=this.intersection(p1,p2,q1,q2)),LineIntersector$$1.POINT_INTERSECTION)},RobustLineIntersector.prototype.interfaces_=function interfaces_(){return[]},RobustLineIntersector.prototype.getClass=function getClass(){return RobustLineIntersector},RobustLineIntersector.nearestEndpoint=function nearestEndpoint(p1,p2,q1,q2){var nearestPt=p1,minDist=CGAlgorithms.distancePointLine(p1,q1,q2),dist=CGAlgorithms.distancePointLine(p2,q1,q2);return dist<minDist&&(minDist=dist,nearestPt=p2),dist=CGAlgorithms.distancePointLine(q1,p1,p2),dist<minDist&&(minDist=dist,nearestPt=q1),dist=CGAlgorithms.distancePointLine(q2,p1,p2),dist<minDist&&(minDist=dist,nearestPt=q2),nearestPt},RobustLineIntersector}(LineIntersector),RobustDeterminant=function RobustDeterminant(){};RobustDeterminant.prototype.interfaces_=function interfaces_(){return[]},RobustDeterminant.prototype.getClass=function getClass(){return RobustDeterminant},RobustDeterminant.orientationIndex=function orientationIndex(p1,p2,q){var dx1=p2.x-p1.x,dy1=p2.y-p1.y,dx2=q.x-p2.x,dy2=q.y-p2.y;return RobustDeterminant.signOfDet2x2(dx1,dy1,dx2,dy2)},RobustDeterminant.signOfDet2x2=function signOfDet2x2(x1,y1,x2,y2){var sign=null,swap=null,k=null;if(sign=1,0===x1||0===y2)return 0===y1||0===x2?0:0<y1?0<x2?-sign:sign:0<x2?sign:-sign;if(0===y1||0===x2)return 0<y2?0<x1?sign:-sign:0<x1?-sign:sign;if(0<y1?0<y2?y1<=y2||(sign=-sign,swap=x1,x1=x2,x2=swap,swap=y1,y1=y2,y2=swap):y1<=-y2?(sign=-sign,x2=-x2,y2=-y2):(swap=x1,x1=-x2,x2=swap,swap=y1,y1=-y2,y2=swap):0<y2?-y1<=y2?(sign=-sign,x1=-x1,y1=-y1):(swap=-x1,x1=x2,x2=swap,swap=-y1,y1=y2,y2=swap):y1>=y2?(x1=-x1,y1=-y1,x2=-x2,y2=-y2):(sign=-sign,swap=-x1,x1=-x2,x2=swap,swap=-y1,y1=-y2,y2=swap),0<x1){if(!(0<x2))return sign;if(x1<=x2);else return sign}else{if(0<x2)return-sign;if(x1>=x2)sign=-sign,x1=-x1,x2=-x2;else return-sign}for(;!0;){if(k=_Mathfloor(x2/x1),x2-=k*x1,y2-=k*y1,0>y2)return-sign;if(y2>y1)return sign;if(!(x1>x2+x2)){if(y1>y2+y2)return-sign;x2=x1-x2,y2=y1-y2,sign=-sign}else if(y1<y2+y2)return sign;if(0===y2)return 0===x2?0:-sign;if(0===x2)return sign;if(k=_Mathfloor(x1/x2),x1-=k*x2,y1-=k*y2,0>y1)return sign;if(y1>y2)return-sign;if(!(x2>x1+x1)){if(y2>y1+y1)return sign;x1=x2-x1,y1=y2-y1,sign=-sign}else if(y2<y1+y1)return-sign;if(0===y1)return 0===x1?0:sign;if(0===x1)return-sign}};var RayCrossingCounter=function RayCrossingCounter(){this._p=null,this._crossingCount=0,this._isPointOnSegment=!1;var p=arguments[0];this._p=p};RayCrossingCounter.prototype.countSegment=function countSegment(p1,p2){if(p1.x<this._p.x&&p2.x<this._p.x)return null;if(this._p.x===p2.x&&this._p.y===p2.y)return this._isPointOnSegment=!0,null;if(p1.y===this._p.y&&p2.y===this._p.y){var minx=p1.x,maxx=p2.x;return minx>maxx&&(minx=p2.x,maxx=p1.x),this._p.x>=minx&&this._p.x<=maxx&&(this._isPointOnSegment=!0),null}if(p1.y>this._p.y&&p2.y<=this._p.y||p2.y>this._p.y&&p1.y<=this._p.y){var x1=p1.x-this._p.x,y1=p1.y-this._p.y,x2=p2.x-this._p.x,y2=p2.y-this._p.y,xIntSign=RobustDeterminant.signOfDet2x2(x1,y1,x2,y2);if(0===xIntSign)return this._isPointOnSegment=!0,null;y2<y1&&(xIntSign=-xIntSign),0<xIntSign&&this._crossingCount++}},RayCrossingCounter.prototype.isPointInPolygon=function isPointInPolygon(){return this.getLocation()!==Location.EXTERIOR},RayCrossingCounter.prototype.getLocation=function getLocation(){return this._isPointOnSegment?Location.BOUNDARY:1==this._crossingCount%2?Location.INTERIOR:Location.EXTERIOR},RayCrossingCounter.prototype.isOnSegment=function isOnSegment(){return this._isPointOnSegment},RayCrossingCounter.prototype.interfaces_=function interfaces_(){return[]},RayCrossingCounter.prototype.getClass=function getClass(){return RayCrossingCounter},RayCrossingCounter.locatePointInRing=function locatePointInRing(){if(arguments[0]instanceof Coordinate&&hasInterface(arguments[1],CoordinateSequence)){for(var p=arguments[0],ring=arguments[1],counter=new RayCrossingCounter(p),p1=new Coordinate,p2=new Coordinate,i=1;i<ring.size();i++)if(ring.getCoordinate(i,p1),ring.getCoordinate(i-1,p2),counter.countSegment(p1,p2),counter.isOnSegment())return counter.getLocation();return counter.getLocation()}if(arguments[0]instanceof Coordinate&&arguments[1]instanceof Array){for(var p$1=arguments[0],ring$1=arguments[1],counter$1=new RayCrossingCounter(p$1),i$1=1;i$1<ring$1.length;i$1++){var p1$1=ring$1[i$1],p2$1=ring$1[i$1-1];if(counter$1.countSegment(p1$1,p2$1),counter$1.isOnSegment())return counter$1.getLocation()}return counter$1.getLocation()}};var CGAlgorithms=function CGAlgorithms(){},staticAccessors$3={CLOCKWISE:{configurable:!0},RIGHT:{configurable:!0},COUNTERCLOCKWISE:{configurable:!0},LEFT:{configurable:!0},COLLINEAR:{configurable:!0},STRAIGHT:{configurable:!0}};CGAlgorithms.prototype.interfaces_=function interfaces_(){return[]},CGAlgorithms.prototype.getClass=function getClass(){return CGAlgorithms},CGAlgorithms.orientationIndex=function orientationIndex(p1,p2,q){return CGAlgorithmsDD.orientationIndex(p1,p2,q)},CGAlgorithms.signedArea=function signedArea(){if(arguments[0]instanceof Array){var ring=arguments[0];if(3>ring.length)return 0;for(var sum=0,x0=ring[0].x,i=1;i<ring.length-1;i++){var x=ring[i].x-x0,y1=ring[i+1].y,y2=ring[i-1].y;sum+=x*(y2-y1)}return sum/2}if(hasInterface(arguments[0],CoordinateSequence)){var ring$1=arguments[0],n=ring$1.size();if(3>n)return 0;var p0=new Coordinate,p1=new Coordinate,p2=new Coordinate;ring$1.getCoordinate(0,p1),ring$1.getCoordinate(1,p2);var x0$1=p1.x;p2.x-=x0$1;for(var sum$1=0,i$1=1;i$1<n-1;i$1++)p0.y=p1.y,p1.x=p2.x,p1.y=p2.y,ring$1.getCoordinate(i$1+1,p2),p2.x-=x0$1,sum$1+=p1.x*(p0.y-p2.y);return sum$1/2}},CGAlgorithms.distanceLineLine=function distanceLineLine(A,B,C,D){if(A.equals(B))return CGAlgorithms.distancePointLine(A,C,D);if(C.equals(D))return CGAlgorithms.distancePointLine(D,A,B);var noIntersection=!1;if(!Envelope.intersects(A,B,C,D))noIntersection=!0;else{var denom=(B.x-A.x)*(D.y-C.y)-(B.y-A.y)*(D.x-C.x);if(0==denom)noIntersection=!0;else{var rNumb=(A.y-C.y)*(D.x-C.x)-(A.x-C.x)*(D.y-C.y),sNum=(A.y-C.y)*(B.x-A.x)-(A.x-C.x)*(B.y-A.y),s=sNum/denom,r=rNumb/denom;(0>r||1<r||0>s||1<s)&&(noIntersection=!0)}}return noIntersection?MathUtil.min(CGAlgorithms.distancePointLine(A,C,D),CGAlgorithms.distancePointLine(B,C,D),CGAlgorithms.distancePointLine(C,A,B),CGAlgorithms.distancePointLine(D,A,B)):0},CGAlgorithms.isPointInRing=function isPointInRing(p,ring){return CGAlgorithms.locatePointInRing(p,ring)!==Location.EXTERIOR},CGAlgorithms.computeLength=function computeLength(pts){var n=pts.size();if(1>=n)return 0;var len=0,p=new Coordinate;pts.getCoordinate(0,p);for(var x0=p.x,y0=p.y,i=1;i<n;i++){pts.getCoordinate(i,p);var x1=p.x,y1=p.y,dx=x1-x0,dy=y1-y0;len+=_Mathsqrt(dx*dx+dy*dy),x0=x1,y0=y1}return len},CGAlgorithms.isCCW=function isCCW(ring){var nPts=ring.length-1;if(3>nPts)throw new IllegalArgumentException("Ring has fewer than 4 points, so orientation cannot be determined");for(var hiPt=ring[0],hiIndex=0,i=1,p;i<=nPts;i++)p=ring[i],p.y>hiPt.y&&(hiPt=p,hiIndex=i);var iPrev=hiIndex;do--iPrev,0>iPrev&&(iPrev=nPts);while(ring[iPrev].equals2D(hiPt)&&iPrev!==hiIndex);var iNext=hiIndex;do iNext=(iNext+1)%nPts;while(ring[iNext].equals2D(hiPt)&&iNext!==hiIndex);var prev=ring[iPrev],next=ring[iNext];if(prev.equals2D(hiPt)||next.equals2D(hiPt)||prev.equals2D(next))return!1;var disc=CGAlgorithms.computeOrientation(prev,hiPt,next),isCCW=!1;return isCCW=0===disc?prev.x>next.x:0<disc,isCCW},CGAlgorithms.locatePointInRing=function locatePointInRing(p,ring){return RayCrossingCounter.locatePointInRing(p,ring)},CGAlgorithms.distancePointLinePerpendicular=function distancePointLinePerpendicular(p,A,B){var len2=(B.x-A.x)*(B.x-A.x)+(B.y-A.y)*(B.y-A.y),s=((A.y-p.y)*(B.x-A.x)-(A.x-p.x)*(B.y-A.y))/len2;return _Mathabs(s)*_Mathsqrt(len2)},CGAlgorithms.computeOrientation=function computeOrientation(p1,p2,q){return CGAlgorithms.orientationIndex(p1,p2,q)},CGAlgorithms.distancePointLine=function distancePointLine(){if(2===arguments.length){var p=arguments[0],line=arguments[1];if(0===line.length)throw new IllegalArgumentException("Line array must contain at least one vertex");for(var minDistance=p.distance(line[0]),i=0,dist;i<line.length-1;i++)dist=CGAlgorithms.distancePointLine(p,line[i],line[i+1]),dist<minDistance&&(minDistance=dist);return minDistance}if(3===arguments.length){var p$1=arguments[0],A=arguments[1],B=arguments[2];if(A.x===B.x&&A.y===B.y)return p$1.distance(A);var len2=(B.x-A.x)*(B.x-A.x)+(B.y-A.y)*(B.y-A.y),r=((p$1.x-A.x)*(B.x-A.x)+(p$1.y-A.y)*(B.y-A.y))/len2;if(0>=r)return p$1.distance(A);if(1<=r)return p$1.distance(B);var s=((A.y-p$1.y)*(B.x-A.x)-(A.x-p$1.x)*(B.y-A.y))/len2;return _Mathabs(s)*_Mathsqrt(len2)}},CGAlgorithms.isOnLine=function isOnLine(p,pt){for(var lineIntersector=new RobustLineIntersector,i=1;i<pt.length;i++){var p0=pt[i-1],p1=pt[i];if(lineIntersector.computeIntersection(p,p0,p1),lineIntersector.hasIntersection())return!0}return!1},staticAccessors$3.CLOCKWISE.get=function(){return-1},staticAccessors$3.RIGHT.get=function(){return CGAlgorithms.CLOCKWISE},staticAccessors$3.COUNTERCLOCKWISE.get=function(){return 1},staticAccessors$3.LEFT.get=function(){return CGAlgorithms.COUNTERCLOCKWISE},staticAccessors$3.COLLINEAR.get=function(){return 0},staticAccessors$3.STRAIGHT.get=function(){return CGAlgorithms.COLLINEAR},Object.defineProperties(CGAlgorithms,staticAccessors$3);var GeometryComponentFilter=function GeometryComponentFilter(){};GeometryComponentFilter.prototype.filter=function filter(geom){},GeometryComponentFilter.prototype.interfaces_=function interfaces_(){return[]},GeometryComponentFilter.prototype.getClass=function getClass(){return GeometryComponentFilter};var Geometry=function Geometry(){var factory=arguments[0];this._envelope=null,this._factory=null,this._SRID=null,this._userData=null,this._factory=factory,this._SRID=factory.getSRID()},staticAccessors$11={serialVersionUID:{configurable:!0},SORTINDEX_POINT:{configurable:!0},SORTINDEX_MULTIPOINT:{configurable:!0},SORTINDEX_LINESTRING:{configurable:!0},SORTINDEX_LINEARRING:{configurable:!0},SORTINDEX_MULTILINESTRING:{configurable:!0},SORTINDEX_POLYGON:{configurable:!0},SORTINDEX_MULTIPOLYGON:{configurable:!0},SORTINDEX_GEOMETRYCOLLECTION:{configurable:!0},geometryChangedFilter:{configurable:!0}};Geometry.prototype.isGeometryCollection=function isGeometryCollection(){return this.getSortIndex()===Geometry.SORTINDEX_GEOMETRYCOLLECTION},Geometry.prototype.getFactory=function getFactory(){return this._factory},Geometry.prototype.getGeometryN=function getGeometryN(n){return this},Geometry.prototype.getArea=function getArea(){return 0},Geometry.prototype.isRectangle=function isRectangle(){return!1},Geometry.prototype.equals=function equals(){if(arguments[0]instanceof Geometry){var g$1=arguments[0];return null!==g$1&&this.equalsTopo(g$1)}if(arguments[0]instanceof Object){var o=arguments[0];if(!(o instanceof Geometry))return!1;var g=o;return this.equalsExact(g)}},Geometry.prototype.equalsExact=function equalsExact(other){return this===other||this.equalsExact(other,0)},Geometry.prototype.geometryChanged=function geometryChanged(){this.apply(Geometry.geometryChangedFilter)},Geometry.prototype.geometryChangedAction=function geometryChangedAction(){this._envelope=null},Geometry.prototype.equalsNorm=function equalsNorm(g){return null!==g&&this.norm().equalsExact(g.norm())},Geometry.prototype.getLength=function getLength(){return 0},Geometry.prototype.getNumGeometries=function getNumGeometries(){return 1},Geometry.prototype.compareTo=function compareTo(){if(1===arguments.length){var o=arguments[0],other=o;return this.getSortIndex()===other.getSortIndex()?this.isEmpty()&&other.isEmpty()?0:this.isEmpty()?-1:other.isEmpty()?1:this.compareToSameClass(o):this.getSortIndex()-other.getSortIndex()}if(2===arguments.length){var other$1=arguments[0],comp=arguments[1];return this.getSortIndex()===other$1.getSortIndex()?this.isEmpty()&&other$1.isEmpty()?0:this.isEmpty()?-1:other$1.isEmpty()?1:this.compareToSameClass(other$1,comp):this.getSortIndex()-other$1.getSortIndex()}},Geometry.prototype.getUserData=function getUserData(){return this._userData},Geometry.prototype.getSRID=function getSRID(){return this._SRID},Geometry.prototype.getEnvelope=function getEnvelope(){return this.getFactory().toGeometry(this.getEnvelopeInternal())},Geometry.prototype.checkNotGeometryCollection=function checkNotGeometryCollection(g){if(g.getSortIndex()===Geometry.SORTINDEX_GEOMETRYCOLLECTION)throw new IllegalArgumentException("This method does not support GeometryCollection arguments")},Geometry.prototype.equal=function equal(a,b,tolerance){return 0===tolerance?a.equals(b):a.distance(b)<=tolerance},Geometry.prototype.norm=function norm(){var copy=this.copy();return copy.normalize(),copy},Geometry.prototype.getPrecisionModel=function getPrecisionModel(){return this._factory.getPrecisionModel()},Geometry.prototype.getEnvelopeInternal=function getEnvelopeInternal(){return null===this._envelope&&(this._envelope=this.computeEnvelopeInternal()),new Envelope(this._envelope)},Geometry.prototype.setSRID=function setSRID(SRID){this._SRID=SRID},Geometry.prototype.setUserData=function setUserData(userData){this._userData=userData},Geometry.prototype.compare=function compare(a,b){for(var i=a.iterator(),j=b.iterator();i.hasNext()&&j.hasNext();){var aElement=i.next(),bElement=j.next(),comparison=aElement.compareTo(bElement);if(0!==comparison)return comparison}return i.hasNext()?1:j.hasNext()?-1:0},Geometry.prototype.hashCode=function hashCode(){return this.getEnvelopeInternal().hashCode()},Geometry.prototype.isGeometryCollectionOrDerived=function isGeometryCollectionOrDerived(){return this.getSortIndex()===Geometry.SORTINDEX_GEOMETRYCOLLECTION||this.getSortIndex()===Geometry.SORTINDEX_MULTIPOINT||this.getSortIndex()===Geometry.SORTINDEX_MULTILINESTRING||this.getSortIndex()===Geometry.SORTINDEX_MULTIPOLYGON},Geometry.prototype.interfaces_=function interfaces_(){return[Clonable,Comparable,Serializable]},Geometry.prototype.getClass=function getClass(){return Geometry},Geometry.hasNonEmptyElements=function hasNonEmptyElements(geometries){for(var i=0;i<geometries.length;i++)if(!geometries[i].isEmpty())return!0;return!1},Geometry.hasNullElements=function hasNullElements(array){for(var i=0;i<array.length;i++)if(null===array[i])return!0;return!1},staticAccessors$11.serialVersionUID.get=function(){return 8763622679187377000},staticAccessors$11.SORTINDEX_POINT.get=function(){return 0},staticAccessors$11.SORTINDEX_MULTIPOINT.get=function(){return 1},staticAccessors$11.SORTINDEX_LINESTRING.get=function(){return 2},staticAccessors$11.SORTINDEX_LINEARRING.get=function(){return 3},staticAccessors$11.SORTINDEX_MULTILINESTRING.get=function(){return 4},staticAccessors$11.SORTINDEX_POLYGON.get=function(){return 5},staticAccessors$11.SORTINDEX_MULTIPOLYGON.get=function(){return 6},staticAccessors$11.SORTINDEX_GEOMETRYCOLLECTION.get=function(){return 7},staticAccessors$11.geometryChangedFilter.get=function(){return geometryChangedFilter},Object.defineProperties(Geometry,staticAccessors$11);var geometryChangedFilter=function geometryChangedFilter(){};geometryChangedFilter.interfaces_=function interfaces_(){return[GeometryComponentFilter]},geometryChangedFilter.filter=function filter(geom){geom.geometryChangedAction()};var CoordinateFilter=function CoordinateFilter(){};CoordinateFilter.prototype.filter=function filter(coord){},CoordinateFilter.prototype.interfaces_=function interfaces_(){return[]},CoordinateFilter.prototype.getClass=function getClass(){return CoordinateFilter};var BoundaryNodeRule=function BoundaryNodeRule(){},staticAccessors$12={Mod2BoundaryNodeRule:{configurable:!0},EndPointBoundaryNodeRule:{configurable:!0},MultiValentEndPointBoundaryNodeRule:{configurable:!0},MonoValentEndPointBoundaryNodeRule:{configurable:!0},MOD2_BOUNDARY_RULE:{configurable:!0},ENDPOINT_BOUNDARY_RULE:{configurable:!0},MULTIVALENT_ENDPOINT_BOUNDARY_RULE:{configurable:!0},MONOVALENT_ENDPOINT_BOUNDARY_RULE:{configurable:!0},OGC_SFS_BOUNDARY_RULE:{configurable:!0}};BoundaryNodeRule.prototype.isInBoundary=function isInBoundary(boundaryCount){},BoundaryNodeRule.prototype.interfaces_=function interfaces_(){return[]},BoundaryNodeRule.prototype.getClass=function getClass(){return BoundaryNodeRule},staticAccessors$12.Mod2BoundaryNodeRule.get=function(){return Mod2BoundaryNodeRule},staticAccessors$12.EndPointBoundaryNodeRule.get=function(){return EndPointBoundaryNodeRule},staticAccessors$12.MultiValentEndPointBoundaryNodeRule.get=function(){return MultiValentEndPointBoundaryNodeRule},staticAccessors$12.MonoValentEndPointBoundaryNodeRule.get=function(){return MonoValentEndPointBoundaryNodeRule},staticAccessors$12.MOD2_BOUNDARY_RULE.get=function(){return new Mod2BoundaryNodeRule},staticAccessors$12.ENDPOINT_BOUNDARY_RULE.get=function(){return new EndPointBoundaryNodeRule},staticAccessors$12.MULTIVALENT_ENDPOINT_BOUNDARY_RULE.get=function(){return new MultiValentEndPointBoundaryNodeRule},staticAccessors$12.MONOVALENT_ENDPOINT_BOUNDARY_RULE.get=function(){return new MonoValentEndPointBoundaryNodeRule},staticAccessors$12.OGC_SFS_BOUNDARY_RULE.get=function(){return BoundaryNodeRule.MOD2_BOUNDARY_RULE},Object.defineProperties(BoundaryNodeRule,staticAccessors$12);var Mod2BoundaryNodeRule=function Mod2BoundaryNodeRule(){};Mod2BoundaryNodeRule.prototype.isInBoundary=function isInBoundary(boundaryCount){return 1==boundaryCount%2},Mod2BoundaryNodeRule.prototype.interfaces_=function interfaces_(){return[BoundaryNodeRule]},Mod2BoundaryNodeRule.prototype.getClass=function getClass(){return Mod2BoundaryNodeRule};var EndPointBoundaryNodeRule=function EndPointBoundaryNodeRule(){};EndPointBoundaryNodeRule.prototype.isInBoundary=function isInBoundary(boundaryCount){return 0<boundaryCount},EndPointBoundaryNodeRule.prototype.interfaces_=function interfaces_(){return[BoundaryNodeRule]},EndPointBoundaryNodeRule.prototype.getClass=function getClass(){return EndPointBoundaryNodeRule};var MultiValentEndPointBoundaryNodeRule=function MultiValentEndPointBoundaryNodeRule(){};MultiValentEndPointBoundaryNodeRule.prototype.isInBoundary=function isInBoundary(boundaryCount){return 1<boundaryCount},MultiValentEndPointBoundaryNodeRule.prototype.interfaces_=function interfaces_(){return[BoundaryNodeRule]},MultiValentEndPointBoundaryNodeRule.prototype.getClass=function getClass(){return MultiValentEndPointBoundaryNodeRule};var MonoValentEndPointBoundaryNodeRule=function MonoValentEndPointBoundaryNodeRule(){};MonoValentEndPointBoundaryNodeRule.prototype.isInBoundary=function isInBoundary(boundaryCount){return 1===boundaryCount},MonoValentEndPointBoundaryNodeRule.prototype.interfaces_=function interfaces_(){return[BoundaryNodeRule]},MonoValentEndPointBoundaryNodeRule.prototype.getClass=function getClass(){return MonoValentEndPointBoundaryNodeRule};var Collection=function Collection(){};Collection.prototype.add=function add(){},Collection.prototype.addAll=function addAll(){},Collection.prototype.isEmpty=function isEmpty(){},Collection.prototype.iterator=function iterator(){},Collection.prototype.size=function size(){},Collection.prototype.toArray=function toArray(){},Collection.prototype.remove=function remove(){};var IndexOutOfBoundsException=function(Error){function IndexOutOfBoundsException(message){Error.call(this),this.message=message||""}Error&&(IndexOutOfBoundsException.__proto__=Error),IndexOutOfBoundsException.prototype=Object.create(Error&&Error.prototype),IndexOutOfBoundsException.prototype.constructor=IndexOutOfBoundsException;var staticAccessors={name:{configurable:!0}};staticAccessors.name.get=function(){return"IndexOutOfBoundsException"};try{Object.defineProperties(IndexOutOfBoundsException,staticAccessors)}catch(e){}return IndexOutOfBoundsException}(Error),Iterator=function Iterator(){};Iterator.prototype.hasNext=function hasNext(){},Iterator.prototype.next=function next(){},Iterator.prototype.remove=function remove(){};var List=function(Collection$$1){function List(){Collection$$1.apply(this,arguments)}return Collection$$1&&(List.__proto__=Collection$$1),List.prototype=Object.create(Collection$$1&&Collection$$1.prototype),List.prototype.constructor=List,List.prototype.get=function get(){},List.prototype.set=function set(){},List.prototype.isEmpty=function isEmpty(){},List}(Collection);NoSuchElementException.prototype=new Error,NoSuchElementException.prototype.name="NoSuchElementException";var ArrayList=function(List$$1){function ArrayList(){List$$1.call(this),this.array_=[],arguments[0]instanceof Collection&&this.addAll(arguments[0])}return List$$1&&(ArrayList.__proto__=List$$1),ArrayList.prototype=Object.create(List$$1&&List$$1.prototype),ArrayList.prototype.constructor=ArrayList,ArrayList.prototype.ensureCapacity=function ensureCapacity(){},ArrayList.prototype.interfaces_=function interfaces_(){return[List$$1,Collection]},ArrayList.prototype.add=function add(e){return 1===arguments.length?this.array_.push(e):this.array_.splice(arguments[0],arguments[1]),!0},ArrayList.prototype.clear=function clear(){this.array_=[]},ArrayList.prototype.addAll=function addAll(c){for(var this$1=this,i=c.iterator();i.hasNext();)this$1.add(i.next());return!0},ArrayList.prototype.set=function set(index,element){var oldElement=this.array_[index];return this.array_[index]=element,oldElement},ArrayList.prototype.iterator=function iterator(){return new Iterator_(this)},ArrayList.prototype.get=function get(index){if(0>index||index>=this.size())throw new IndexOutOfBoundsException;return this.array_[index]},ArrayList.prototype.isEmpty=function isEmpty(){return 0===this.array_.length},ArrayList.prototype.size=function size(){return this.array_.length},ArrayList.prototype.toArray=function toArray(){for(var this$1=this,array=[],i=0,len=this.array_.length;i<len;i++)array.push(this$1.array_[i]);return array},ArrayList.prototype.remove=function remove(o){for(var this$1=this,found=!1,i=0,len=this.array_.length;i<len;i++)if(this$1.array_[i]===o){this$1.array_.splice(i,1),found=!0;break}return found},ArrayList}(List),Iterator_=function(Iterator$$1){function Iterator_(arrayList){Iterator$$1.call(this),this.arrayList_=arrayList,this.position_=0}return Iterator$$1&&(Iterator_.__proto__=Iterator$$1),Iterator_.prototype=Object.create(Iterator$$1&&Iterator$$1.prototype),Iterator_.prototype.constructor=Iterator_,Iterator_.prototype.next=function next(){if(this.position_===this.arrayList_.size())throw new NoSuchElementException;return this.arrayList_.get(this.position_++)},Iterator_.prototype.hasNext=function hasNext(){return!!(this.position_<this.arrayList_.size())},Iterator_.prototype.set=function set(element){return this.arrayList_.set(this.position_-1,element)},Iterator_.prototype.remove=function remove(){this.arrayList_.remove(this.arrayList_.get(this.position_))},Iterator_}(Iterator),CoordinateList=function(ArrayList$$1){function CoordinateList(){if(ArrayList$$1.call(this),0===arguments.length);else if(1===arguments.length){var coord=arguments[0];this.ensureCapacity(coord.length),this.add(coord,!0)}else if(2===arguments.length){var coord$1=arguments[0],allowRepeated=arguments[1];this.ensureCapacity(coord$1.length),this.add(coord$1,allowRepeated)}}ArrayList$$1&&(CoordinateList.__proto__=ArrayList$$1),CoordinateList.prototype=Object.create(ArrayList$$1&&ArrayList$$1.prototype),CoordinateList.prototype.constructor=CoordinateList;var staticAccessors={coordArrayType:{configurable:!0}};return staticAccessors.coordArrayType.get=function(){return[].fill(null)},CoordinateList.prototype.getCoordinate=function getCoordinate(i){return this.get(i)},CoordinateList.prototype.addAll=function addAll(){var this$1=this;if(2===arguments.length){for(var coll=arguments[0],allowRepeated=arguments[1],isChanged=!1,i=coll.iterator();i.hasNext();)this$1.add(i.next(),allowRepeated),isChanged=!0;return isChanged}return ArrayList$$1.prototype.addAll.apply(this,arguments)},CoordinateList.prototype.clone=function clone(){for(var this$1=this,clone=ArrayList$$1.prototype.clone.call(this),i=0;i<this.size();i++)clone.add(i,this$1.get(i).copy());return clone},CoordinateList.prototype.toCoordinateArray=function toCoordinateArray(){return this.toArray(CoordinateList.coordArrayType)},CoordinateList.prototype.add=function add(){var this$1=this;if(1===arguments.length){var coord=arguments[0];ArrayList$$1.prototype.add.call(this,coord)}else if(2===arguments.length){if(arguments[0]instanceof Array&&"boolean"==typeof arguments[1]){var coord$1=arguments[0],allowRepeated=arguments[1];return this.add(coord$1,allowRepeated,!0),!0}if(arguments[0]instanceof Coordinate&&"boolean"==typeof arguments[1]){var coord$2=arguments[0],allowRepeated$1=arguments[1];if(!allowRepeated$1&&1<=this.size()){var last=this.get(this.size()-1);if(last.equals2D(coord$2))return null}ArrayList$$1.prototype.add.call(this,coord$2)}else if(arguments[0]instanceof Object&&"boolean"==typeof arguments[1]){var obj=arguments[0],allowRepeated$2=arguments[1];return this.add(obj,allowRepeated$2),!0}}else if(3===arguments.length){if("boolean"==typeof arguments[2]&&arguments[0]instanceof Array&&"boolean"==typeof arguments[1]){var coord$3=arguments[0],allowRepeated$3=arguments[1],direction=arguments[2];if(direction)for(var i$1=0;i$1<coord$3.length;i$1++)this$1.add(coord$3[i$1],allowRepeated$3);else for(var i$2=coord$3.length-1;0<=i$2;i$2--)this$1.add(coord$3[i$2],allowRepeated$3);return!0}if("boolean"==typeof arguments[2]&&_NumberisInteger(arguments[0])&&arguments[1]instanceof Coordinate){var i$3=arguments[0],coord$4=arguments[1],allowRepeated$4=arguments[2];if(!allowRepeated$4){var size=this.size();if(0<size){if(0<i$3){var prev=this.get(i$3-1);if(prev.equals2D(coord$4))return null}if(i$3<size){var next=this.get(i$3);if(next.equals2D(coord$4))return null}}}ArrayList$$1.prototype.add.call(this,i$3,coord$4)}}else if(4===arguments.length){var coord$5=arguments[0],allowRepeated$5=arguments[1],start=arguments[2],end=arguments[3],inc=1;start>end&&(inc=-1);for(var i=start;i!==end;i+=inc)this$1.add(coord$5[i],allowRepeated$5);return!0}},CoordinateList.prototype.closeRing=function closeRing(){0<this.size()&&this.add(new Coordinate(this.get(0)),!1)},CoordinateList.prototype.interfaces_=function interfaces_(){return[]},CoordinateList.prototype.getClass=function getClass(){return CoordinateList},Object.defineProperties(CoordinateList,staticAccessors),CoordinateList}(ArrayList),CoordinateArrays=function CoordinateArrays(){},staticAccessors$13={ForwardComparator:{configurable:!0},BidirectionalComparator:{configurable:!0},coordArrayType:{configurable:!0}};staticAccessors$13.ForwardComparator.get=function(){return ForwardComparator},staticAccessors$13.BidirectionalComparator.get=function(){return BidirectionalComparator},staticAccessors$13.coordArrayType.get=function(){return[].fill(null)},CoordinateArrays.prototype.interfaces_=function interfaces_(){return[]},CoordinateArrays.prototype.getClass=function getClass(){return CoordinateArrays},CoordinateArrays.isRing=function isRing(pts){return!(4>pts.length)&&!!pts[0].equals2D(pts[pts.length-1])},CoordinateArrays.ptNotInList=function ptNotInList(testPts,pts){for(var i=0,testPt;i<testPts.length;i++)if(testPt=testPts[i],0>CoordinateArrays.indexOf(testPt,pts))return testPt;return null},CoordinateArrays.scroll=function scroll(coordinates,firstCoordinate){var i=CoordinateArrays.indexOf(firstCoordinate,coordinates);if(0>i)return null;var newCoordinates=Array(coordinates.length).fill(null);System.arraycopy(coordinates,i,newCoordinates,0,coordinates.length-i),System.arraycopy(coordinates,0,newCoordinates,coordinates.length-i,i),System.arraycopy(newCoordinates,0,coordinates,0,coordinates.length)},CoordinateArrays.equals=function equals(){if(2===arguments.length){var coord1=arguments[0],coord2=arguments[1];if(coord1===coord2)return!0;if(null===coord1||null===coord2)return!1;if(coord1.length!==coord2.length)return!1;for(var i=0;i<coord1.length;i++)if(!coord1[i].equals(coord2[i]))return!1;return!0}if(3===arguments.length){var coord1$1=arguments[0],coord2$1=arguments[1],coordinateComparator=arguments[2];if(coord1$1===coord2$1)return!0;if(null===coord1$1||null===coord2$1)return!1;if(coord1$1.length!==coord2$1.length)return!1;for(var i$1=0;i$1<coord1$1.length;i$1++)if(0!==coordinateComparator.compare(coord1$1[i$1],coord2$1[i$1]))return!1;return!0}},CoordinateArrays.intersection=function intersection(coordinates,env){for(var coordList=new CoordinateList,i=0;i<coordinates.length;i++)env.intersects(coordinates[i])&&coordList.add(coordinates[i],!0);return coordList.toCoordinateArray()},CoordinateArrays.hasRepeatedPoints=function hasRepeatedPoints(coord){for(var i=1;i<coord.length;i++)if(coord[i-1].equals(coord[i]))return!0;return!1},CoordinateArrays.removeRepeatedPoints=function removeRepeatedPoints(coord){if(!CoordinateArrays.hasRepeatedPoints(coord))return coord;var coordList=new CoordinateList(coord,!1);return coordList.toCoordinateArray()},CoordinateArrays.reverse=function reverse(coord){for(var last=coord.length-1,mid=_Mathtrunc(last/2),i=0,tmp;i<=mid;i++)tmp=coord[i],coord[i]=coord[last-i],coord[last-i]=tmp},CoordinateArrays.removeNull=function removeNull(coord){for(var nonNull=0,i=0;i<coord.length;i++)null!==coord[i]&&nonNull++;var newCoord=Array(nonNull).fill(null);if(0==nonNull)return newCoord;for(var j=0,i$1=0;i$1<coord.length;i$1++)null!==coord[i$1]&&(newCoord[j++]=coord[i$1]);return newCoord},CoordinateArrays.copyDeep=function copyDeep(){if(1===arguments.length){for(var coordinates=arguments[0],copy=Array(coordinates.length).fill(null),i=0;i<coordinates.length;i++)copy[i]=new Coordinate(coordinates[i]);return copy}if(5===arguments.length)for(var src=arguments[0],srcStart=arguments[1],dest=arguments[2],destStart=arguments[3],length=arguments[4],i$1=0;i$1<length;i$1++)dest[destStart+i$1]=new Coordinate(src[srcStart+i$1])},CoordinateArrays.isEqualReversed=function isEqualReversed(pts1,pts2){for(var i=0;i<pts1.length;i++){var p1=pts1[i],p2=pts2[pts1.length-i-1];if(0!==p1.compareTo(p2))return!1}return!0},CoordinateArrays.envelope=function envelope(coordinates){for(var env=new Envelope,i=0;i<coordinates.length;i++)env.expandToInclude(coordinates[i]);return env},CoordinateArrays.toCoordinateArray=function toCoordinateArray(coordList){return coordList.toArray(CoordinateArrays.coordArrayType)},CoordinateArrays.atLeastNCoordinatesOrNothing=function atLeastNCoordinatesOrNothing(n,c){return c.length>=n?c:[]},CoordinateArrays.indexOf=function indexOf(coordinate,coordinates){for(var i=0;i<coordinates.length;i++)if(coordinate.equals(coordinates[i]))return i;return-1},CoordinateArrays.increasingDirection=function increasingDirection(pts){for(var i=0;i<_Mathtrunc(pts.length/2);i++){var j=pts.length-1-i,comp=pts[i].compareTo(pts[j]);if(0!==comp)return comp}return 1},CoordinateArrays.compare=function compare(pts1,pts2){for(var i=0;i<pts1.length&&i<pts2.length;){var compare=pts1[i].compareTo(pts2[i]);if(0!==compare)return compare;i++}return i<pts2.length?-1:i<pts1.length?1:0},CoordinateArrays.minCoordinate=function minCoordinate(coordinates){for(var minCoord=null,i=0;i<coordinates.length;i++)(null==minCoord||0<minCoord.compareTo(coordinates[i]))&&(minCoord=coordinates[i]);return minCoord},CoordinateArrays.extract=function extract(pts,start,end){start=MathUtil.clamp(start,0,pts.length),end=MathUtil.clamp(end,-1,pts.length);var npts=end-start+1;0>end&&(npts=0),start>=pts.length&&(npts=0),end<start&&(npts=0);var extractPts=Array(npts).fill(null);if(0==npts)return extractPts;for(var iPts=0,i=start;i<=end;i++)extractPts[iPts++]=pts[i];return extractPts},Object.defineProperties(CoordinateArrays,staticAccessors$13);var ForwardComparator=function ForwardComparator(){};ForwardComparator.prototype.compare=function compare(o1,o2){var pts1=o1,pts2=o2;return CoordinateArrays.compare(pts1,pts2)},ForwardComparator.prototype.interfaces_=function interfaces_(){return[Comparator]},ForwardComparator.prototype.getClass=function getClass(){return ForwardComparator};var BidirectionalComparator=function BidirectionalComparator(){};BidirectionalComparator.prototype.compare=function compare(o1,o2){var pts1=o1,pts2=o2;if(pts1.length<pts2.length)return-1;if(pts1.length>pts2.length)return 1;if(0===pts1.length)return 0;var forwardComp=CoordinateArrays.compare(pts1,pts2),isEqualRev=CoordinateArrays.isEqualReversed(pts1,pts2);return isEqualRev?0:forwardComp},BidirectionalComparator.prototype.OLDcompare=function OLDcompare(o1,o2){var pts1=o1,pts2=o2;if(pts1.length<pts2.length)return-1;if(pts1.length>pts2.length)return 1;if(0===pts1.length)return 0;for(var dir1=CoordinateArrays.increasingDirection(pts1),dir2=CoordinateArrays.increasingDirection(pts2),i1=0<dir1?0:pts1.length-1,i2=0<dir2?0:pts1.length-1,i=0,comparePt;i<pts1.length;i++){if(comparePt=pts1[i1].compareTo(pts2[i2]),0!==comparePt)return comparePt;i1+=dir1,i2+=dir2}return 0},BidirectionalComparator.prototype.interfaces_=function interfaces_(){return[Comparator]},BidirectionalComparator.prototype.getClass=function getClass(){return BidirectionalComparator};var Map$1=function Map(){};Map$1.prototype.get=function get(){},Map$1.prototype.put=function put(){},Map$1.prototype.size=function size(){},Map$1.prototype.values=function values(){},Map$1.prototype.entrySet=function entrySet(){};var SortedMap=function(Map){function SortedMap(){Map.apply(this,arguments)}return Map&&(SortedMap.__proto__=Map),SortedMap.prototype=Object.create(Map&&Map.prototype),SortedMap.prototype.constructor=SortedMap,SortedMap}(Map$1);OperationNotSupported.prototype=new Error,OperationNotSupported.prototype.name="OperationNotSupported",Set.prototype=new Collection,Set.prototype.contains=function(){};var HashSet=function(Set$$1){function HashSet(){Set$$1.call(this),this.array_=[],arguments[0]instanceof Collection&&this.addAll(arguments[0])}return Set$$1&&(HashSet.__proto__=Set$$1),HashSet.prototype=Object.create(Set$$1&&Set$$1.prototype),HashSet.prototype.constructor=HashSet,HashSet.prototype.contains=function contains(o){for(var this$1=this,i=0,len=this.array_.length,e;i<len;i++)if(e=this$1.array_[i],e===o)return!0;return!1},HashSet.prototype.add=function add(o){return!this.contains(o)&&(this.array_.push(o),!0)},HashSet.prototype.addAll=function addAll(c){for(var this$1=this,i=c.iterator();i.hasNext();)this$1.add(i.next());return!0},HashSet.prototype.remove=function remove(o){throw new Error},HashSet.prototype.size=function size(){return this.array_.length},HashSet.prototype.isEmpty=function isEmpty(){return 0===this.array_.length},HashSet.prototype.toArray=function toArray(){for(var this$1=this,array=[],i=0,len=this.array_.length;i<len;i++)array.push(this$1.array_[i]);return array},HashSet.prototype.iterator=function iterator(){return new Iterator_$1(this)},HashSet}(Set),Iterator_$1=function(Iterator$$1){function Iterator_(hashSet){Iterator$$1.call(this),this.hashSet_=hashSet,this.position_=0}return Iterator$$1&&(Iterator_.__proto__=Iterator$$1),Iterator_.prototype=Object.create(Iterator$$1&&Iterator$$1.prototype),Iterator_.prototype.constructor=Iterator_,Iterator_.prototype.next=function next(){if(this.position_===this.hashSet_.size())throw new NoSuchElementException;return this.hashSet_.array_[this.position_++]},Iterator_.prototype.hasNext=function hasNext(){return!!(this.position_<this.hashSet_.size())},Iterator_.prototype.remove=function remove(){throw new OperationNotSupported},Iterator_}(Iterator),BLACK=0,RED=1;TreeMap.prototype=new SortedMap,TreeMap.prototype.get=function(key){for(var p=this.root_;null!==p;){var cmp=key.compareTo(p.key);if(0>cmp)p=p.left;else if(0<cmp)p=p.right;else return p.value}return null},TreeMap.prototype.put=function(key,value){if(null===this.root_)return this.root_={key:key,value:value,left:null,right:null,parent:null,color:BLACK,getValue:function getValue(){return this.value},getKey:function getKey(){return this.key}},this.size_=1,null;var t=this.root_,parent,cmp;do if(parent=t,cmp=key.compareTo(t.key),0>cmp)t=t.left;else if(0<cmp)t=t.right;else{var oldValue=t.value;return t.value=value,oldValue}while(null!==t);var e={key:key,left:null,right:null,value:value,parent:parent,color:BLACK,getValue:function getValue(){return this.value},getKey:function getKey(){return this.key}};return 0>cmp?parent.left=e:parent.right=e,this.fixAfterInsertion(e),this.size_++,null},TreeMap.prototype.fixAfterInsertion=function(x){var this$1=this;for(x.color=RED;null!=x&&x!==this.root_&&x.parent.color===RED;)if(parentOf(x)===leftOf(parentOf(parentOf(x)))){var y=rightOf(parentOf(parentOf(x)));colorOf(y)===RED?(setColor(parentOf(x),BLACK),setColor(y,BLACK),setColor(parentOf(parentOf(x)),RED),x=parentOf(parentOf(x))):(x===rightOf(parentOf(x))&&(x=parentOf(x),this$1.rotateLeft(x)),setColor(parentOf(x),BLACK),setColor(parentOf(parentOf(x)),RED),this$1.rotateRight(parentOf(parentOf(x))))}else{var y$1=leftOf(parentOf(parentOf(x)));colorOf(y$1)===RED?(setColor(parentOf(x),BLACK),setColor(y$1,BLACK),setColor(parentOf(parentOf(x)),RED),x=parentOf(parentOf(x))):(x===leftOf(parentOf(x))&&(x=parentOf(x),this$1.rotateRight(x)),setColor(parentOf(x),BLACK),setColor(parentOf(parentOf(x)),RED),this$1.rotateLeft(parentOf(parentOf(x))))}this.root_.color=BLACK},TreeMap.prototype.values=function(){var arrayList=new ArrayList,p=this.getFirstEntry();if(null!==p)for(arrayList.add(p.value);null!==(p=TreeMap.successor(p));)arrayList.add(p.value);return arrayList},TreeMap.prototype.entrySet=function(){var hashSet=new HashSet,p=this.getFirstEntry();if(null!==p)for(hashSet.add(p);null!==(p=TreeMap.successor(p));)hashSet.add(p);return hashSet},TreeMap.prototype.rotateLeft=function(p){if(null!=p){var r=p.right;p.right=r.left,null!=r.left&&(r.left.parent=p),r.parent=p.parent,null===p.parent?this.root_=r:p.parent.left===p?p.parent.left=r:p.parent.right=r,r.left=p,p.parent=r}},TreeMap.prototype.rotateRight=function(p){if(null!=p){var l=p.left;p.left=l.right,null!=l.right&&(l.right.parent=p),l.parent=p.parent,null===p.parent?this.root_=l:p.parent.right===p?p.parent.right=l:p.parent.left=l,l.right=p,p.parent=l}},TreeMap.prototype.getFirstEntry=function(){var p=this.root_;if(null!=p)for(;null!=p.left;)p=p.left;return p},TreeMap.successor=function(t){if(null===t)return null;if(null!==t.right){for(var p=t.right;null!==p.left;)p=p.left;return p}for(var p$1=t.parent,ch=t;null!==p$1&&ch===p$1.right;)ch=p$1,p$1=p$1.parent;return p$1},TreeMap.prototype.size=function(){return this.size_};var Lineal=function Lineal(){};Lineal.prototype.interfaces_=function interfaces_(){return[]},Lineal.prototype.getClass=function getClass(){return Lineal},SortedSet.prototype=new Set,TreeSet.prototype=new SortedSet,TreeSet.prototype.contains=function(o){for(var this$1=this,i=0,len=this.array_.length,e;i<len;i++)if(e=this$1.array_[i],0===e.compareTo(o))return!0;return!1},TreeSet.prototype.add=function(o){var this$1=this;if(this.contains(o))return!1;for(var i=0,len=this.array_.length,e;i<len;i++)if(e=this$1.array_[i],1===e.compareTo(o))return this$1.array_.splice(i,0,o),!0;return this.array_.push(o),!0},TreeSet.prototype.addAll=function(c){for(var this$1=this,i=c.iterator();i.hasNext();)this$1.add(i.next());return!0},TreeSet.prototype.remove=function(e){throw new OperationNotSupported},TreeSet.prototype.size=function(){return this.array_.length},TreeSet.prototype.isEmpty=function(){return 0===this.array_.length},TreeSet.prototype.toArray=function(){for(var this$1=this,array=[],i=0,len=this.array_.length;i<len;i++)array.push(this$1.array_[i]);return array},TreeSet.prototype.iterator=function(){return new Iterator_$2(this)};var Iterator_$2=function(treeSet){this.treeSet_=treeSet,this.position_=0};Iterator_$2.prototype.next=function(){if(this.position_===this.treeSet_.size())throw new NoSuchElementException;return this.treeSet_.array_[this.position_++]},Iterator_$2.prototype.hasNext=function(){return!!(this.position_<this.treeSet_.size())},Iterator_$2.prototype.remove=function(){throw new OperationNotSupported};var Arrays=function Arrays(){};Arrays.sort=function sort(){var a=arguments[0],i,t,comparator,compare;if(1===arguments.length)compare=function(a,b){return a.compareTo(b)},a.sort(compare);else if(2===arguments.length)comparator=arguments[1],compare=function(a,b){return comparator.compare(a,b)},a.sort(compare);else if(3===arguments.length){t=a.slice(arguments[1],arguments[2]),t.sort();var r=a.slice(0,arguments[1]).concat(t,a.slice(arguments[2],a.length));for(a.splice(0,a.length),i=0;i<r.length;i++)a.push(r[i])}else if(4===arguments.length)for(t=a.slice(arguments[1],arguments[2]),comparator=arguments[3],compare=function(a,b){return comparator.compare(a,b)},t.sort(compare),r=a.slice(0,arguments[1]).concat(t,a.slice(arguments[2],a.length)),a.splice(0,a.length),i=0;i<r.length;i++)a.push(r[i])},Arrays.asList=function asList(array){for(var arrayList=new ArrayList,i=0,len=array.length;i<len;i++)arrayList.add(array[i]);return arrayList};var Dimension=function Dimension(){},staticAccessors$14={P:{configurable:!0},L:{configurable:!0},A:{configurable:!0},FALSE:{configurable:!0},TRUE:{configurable:!0},DONTCARE:{configurable:!0},SYM_FALSE:{configurable:!0},SYM_TRUE:{configurable:!0},SYM_DONTCARE:{configurable:!0},SYM_P:{configurable:!0},SYM_L:{configurable:!0},SYM_A:{configurable:!0}};staticAccessors$14.P.get=function(){return 0},staticAccessors$14.L.get=function(){return 1},staticAccessors$14.A.get=function(){return 2},staticAccessors$14.FALSE.get=function(){return-1},staticAccessors$14.TRUE.get=function(){return-2},staticAccessors$14.DONTCARE.get=function(){return-3},staticAccessors$14.SYM_FALSE.get=function(){return"F"},staticAccessors$14.SYM_TRUE.get=function(){return"T"},staticAccessors$14.SYM_DONTCARE.get=function(){return"*"},staticAccessors$14.SYM_P.get=function(){return"0"},staticAccessors$14.SYM_L.get=function(){return"1"},staticAccessors$14.SYM_A.get=function(){return"2"},Dimension.prototype.interfaces_=function interfaces_(){return[]},Dimension.prototype.getClass=function getClass(){return Dimension},Dimension.toDimensionSymbol=function toDimensionSymbol(dimensionValue){switch(dimensionValue){case Dimension.FALSE:return Dimension.SYM_FALSE;case Dimension.TRUE:return Dimension.SYM_TRUE;case Dimension.DONTCARE:return Dimension.SYM_DONTCARE;case Dimension.P:return Dimension.SYM_P;case Dimension.L:return Dimension.SYM_L;case Dimension.A:return Dimension.SYM_A;default:}throw new IllegalArgumentException("Unknown dimension value: "+dimensionValue)},Dimension.toDimensionValue=function toDimensionValue(dimensionSymbol){switch(Character.toUpperCase(dimensionSymbol)){case Dimension.SYM_FALSE:return Dimension.FALSE;case Dimension.SYM_TRUE:return Dimension.TRUE;case Dimension.SYM_DONTCARE:return Dimension.DONTCARE;case Dimension.SYM_P:return Dimension.P;case Dimension.SYM_L:return Dimension.L;case Dimension.SYM_A:return Dimension.A;default:}throw new IllegalArgumentException("Unknown dimension symbol: "+dimensionSymbol)},Object.defineProperties(Dimension,staticAccessors$14);var GeometryFilter=function GeometryFilter(){};GeometryFilter.prototype.filter=function filter(geom){},GeometryFilter.prototype.interfaces_=function interfaces_(){return[]},GeometryFilter.prototype.getClass=function getClass(){return GeometryFilter};var CoordinateSequenceFilter=function CoordinateSequenceFilter(){};CoordinateSequenceFilter.prototype.filter=function filter(seq,i){},CoordinateSequenceFilter.prototype.isDone=function isDone(){},CoordinateSequenceFilter.prototype.isGeometryChanged=function isGeometryChanged(){},CoordinateSequenceFilter.prototype.interfaces_=function interfaces_(){return[]},CoordinateSequenceFilter.prototype.getClass=function getClass(){return CoordinateSequenceFilter};var GeometryCollection=function(Geometry$$1){function GeometryCollection(geometries,factory){if(Geometry$$1.call(this,factory),this._geometries=geometries||[],Geometry$$1.hasNullElements(this._geometries))throw new IllegalArgumentException("geometries must not contain null elements")}Geometry$$1&&(GeometryCollection.__proto__=Geometry$$1),GeometryCollection.prototype=Object.create(Geometry$$1&&Geometry$$1.prototype),GeometryCollection.prototype.constructor=GeometryCollection;var staticAccessors={serialVersionUID:{configurable:!0}};return GeometryCollection.prototype.computeEnvelopeInternal=function computeEnvelopeInternal(){for(var this$1=this,envelope=new Envelope,i=0;i<this._geometries.length;i++)envelope.expandToInclude(this$1._geometries[i].getEnvelopeInternal());return envelope},GeometryCollection.prototype.getGeometryN=function getGeometryN(n){return this._geometries[n]},GeometryCollection.prototype.getSortIndex=function getSortIndex(){return Geometry$$1.SORTINDEX_GEOMETRYCOLLECTION},GeometryCollection.prototype.getCoordinates=function getCoordinates(){for(var this$1=this,coordinates=Array(this.getNumPoints()).fill(null),k=-1,i=0,childCoordinates;i<this._geometries.length;i++){childCoordinates=this$1._geometries[i].getCoordinates();for(var j=0;j<childCoordinates.length;j++)k++,coordinates[k]=childCoordinates[j]}return coordinates},GeometryCollection.prototype.getArea=function getArea(){for(var this$1=this,area=0,i=0;i<this._geometries.length;i++)area+=this$1._geometries[i].getArea();return area},GeometryCollection.prototype.equalsExact=function equalsExact(){var this$1=this;if(2===arguments.length){var other=arguments[0],tolerance=arguments[1];if(!this.isEquivalentClass(other))return!1;var otherCollection=other;if(this._geometries.length!==otherCollection._geometries.length)return!1;for(var i=0;i<this._geometries.length;i++)if(!this$1._geometries[i].equalsExact(otherCollection._geometries[i],tolerance))return!1;return!0}return Geometry$$1.prototype.equalsExact.apply(this,arguments)},GeometryCollection.prototype.normalize=function normalize(){for(var this$1=this,i=0;i<this._geometries.length;i++)this$1._geometries[i].normalize();Arrays.sort(this._geometries)},GeometryCollection.prototype.getCoordinate=function getCoordinate(){return this.isEmpty()?null:this._geometries[0].getCoordinate()},GeometryCollection.prototype.getBoundaryDimension=function getBoundaryDimension(){for(var this$1=this,dimension=Dimension.FALSE,i=0;i<this._geometries.length;i++)dimension=_Mathmax(dimension,this$1._geometries[i].getBoundaryDimension());return dimension},GeometryCollection.prototype.getDimension=function getDimension(){for(var this$1=this,dimension=Dimension.FALSE,i=0;i<this._geometries.length;i++)dimension=_Mathmax(dimension,this$1._geometries[i].getDimension());return dimension},GeometryCollection.prototype.getLength=function getLength(){for(var this$1=this,sum=0,i=0;i<this._geometries.length;i++)sum+=this$1._geometries[i].getLength();return sum},GeometryCollection.prototype.getNumPoints=function getNumPoints(){for(var this$1=this,numPoints=0,i=0;i<this._geometries.length;i++)numPoints+=this$1._geometries[i].getNumPoints();return numPoints},GeometryCollection.prototype.getNumGeometries=function getNumGeometries(){return this._geometries.length},GeometryCollection.prototype.reverse=function reverse(){for(var this$1=this,n=this._geometries.length,revGeoms=Array(n).fill(null),i=0;i<this._geometries.length;i++)revGeoms[i]=this$1._geometries[i].reverse();return this.getFactory().createGeometryCollection(revGeoms)},GeometryCollection.prototype.compareToSameClass=function compareToSameClass(){var this$1=this;if(1===arguments.length){var o=arguments[0],theseElements=new TreeSet(Arrays.asList(this._geometries)),otherElements=new TreeSet(Arrays.asList(o._geometries));return this.compare(theseElements,otherElements)}if(2===arguments.length){for(var o$1=arguments[0],comp=arguments[1],gc=o$1,n1=this.getNumGeometries(),n2=gc.getNumGeometries(),i=0;i<n1&&i<n2;){var thisGeom=this$1.getGeometryN(i),otherGeom=gc.getGeometryN(i),holeComp=thisGeom.compareToSameClass(otherGeom,comp);if(0!==holeComp)return holeComp;i++}return i<n1?1:i<n2?-1:0}},GeometryCollection.prototype.apply=function apply(){var this$1=this;if(hasInterface(arguments[0],CoordinateFilter))for(var filter=arguments[0],i=0;i<this._geometries.length;i++)this$1._geometries[i].apply(filter);else if(hasInterface(arguments[0],CoordinateSequenceFilter)){var filter$1=arguments[0];if(0===this._geometries.length)return null;for(var i$1=0;i$1<this._geometries.length&&(this$1._geometries[i$1].apply(filter$1),!filter$1.isDone());i$1++);filter$1.isGeometryChanged()&&this.geometryChanged()}else if(hasInterface(arguments[0],GeometryFilter)){var filter$2=arguments[0];filter$2.filter(this);for(var i$2=0;i$2<this._geometries.length;i$2++)this$1._geometries[i$2].apply(filter$2)}else if(hasInterface(arguments[0],GeometryComponentFilter)){var filter$3=arguments[0];filter$3.filter(this);for(var i$3=0;i$3<this._geometries.length;i$3++)this$1._geometries[i$3].apply(filter$3)}},GeometryCollection.prototype.getBoundary=function getBoundary(){return this.checkNotGeometryCollection(this),Assert.shouldNeverReachHere(),null},GeometryCollection.prototype.clone=function clone(){var this$1=this,gc=Geometry$$1.prototype.clone.call(this);gc._geometries=Array(this._geometries.length).fill(null);for(var i=0;i<this._geometries.length;i++)gc._geometries[i]=this$1._geometries[i].clone();return gc},GeometryCollection.prototype.getGeometryType=function getGeometryType(){return"GeometryCollection"},GeometryCollection.prototype.copy=function copy(){for(var this$1=this,geometries=Array(this._geometries.length).fill(null),i=0;i<geometries.length;i++)geometries[i]=this$1._geometries[i].copy();return new GeometryCollection(geometries,this._factory)},GeometryCollection.prototype.isEmpty=function isEmpty(){for(var this$1=this,i=0;i<this._geometries.length;i++)if(!this$1._geometries[i].isEmpty())return!1;return!0},GeometryCollection.prototype.interfaces_=function interfaces_(){return[]},GeometryCollection.prototype.getClass=function getClass(){return GeometryCollection},staticAccessors.serialVersionUID.get=function(){return-5694727726395021000},Object.defineProperties(GeometryCollection,staticAccessors),GeometryCollection}(Geometry),MultiLineString=function(GeometryCollection$$1){function MultiLineString(){GeometryCollection$$1.apply(this,arguments)}GeometryCollection$$1&&(MultiLineString.__proto__=GeometryCollection$$1),MultiLineString.prototype=Object.create(GeometryCollection$$1&&GeometryCollection$$1.prototype),MultiLineString.prototype.constructor=MultiLineString;var staticAccessors={serialVersionUID:{configurable:!0}};return MultiLineString.prototype.getSortIndex=function getSortIndex(){return Geometry.SORTINDEX_MULTILINESTRING},MultiLineString.prototype.equalsExact=function equalsExact(){if(2===arguments.length){var other=arguments[0],tolerance=arguments[1];return!!this.isEquivalentClass(other)&&GeometryCollection$$1.prototype.equalsExact.call(this,other,tolerance)}return GeometryCollection$$1.prototype.equalsExact.apply(this,arguments)},MultiLineString.prototype.getBoundaryDimension=function getBoundaryDimension(){return this.isClosed()?Dimension.FALSE:0},MultiLineString.prototype.isClosed=function isClosed(){var this$1=this;if(this.isEmpty())return!1;for(var i=0;i<this._geometries.length;i++)if(!this$1._geometries[i].isClosed())return!1;return!0},MultiLineString.prototype.getDimension=function getDimension(){return 1},MultiLineString.prototype.reverse=function reverse(){for(var this$1=this,nLines=this._geometries.length,revLines=Array(nLines).fill(null),i=0;i<this._geometries.length;i++)revLines[nLines-1-i]=this$1._geometries[i].reverse();return this.getFactory().createMultiLineString(revLines)},MultiLineString.prototype.getBoundary=function getBoundary(){return new BoundaryOp(this).getBoundary()},MultiLineString.prototype.getGeometryType=function getGeometryType(){return"MultiLineString"},MultiLineString.prototype.copy=function copy(){for(var this$1=this,lineStrings=Array(this._geometries.length).fill(null),i=0;i<lineStrings.length;i++)lineStrings[i]=this$1._geometries[i].copy();return new MultiLineString(lineStrings,this._factory)},MultiLineString.prototype.interfaces_=function interfaces_(){return[Lineal]},MultiLineString.prototype.getClass=function getClass(){return MultiLineString},staticAccessors.serialVersionUID.get=function(){return 8166665132445434000},Object.defineProperties(MultiLineString,staticAccessors),MultiLineString}(GeometryCollection),BoundaryOp=function BoundaryOp(){if(this._geom=null,this._geomFact=null,this._bnRule=null,this._endpointMap=null,1===arguments.length){var geom=arguments[0],bnRule=BoundaryNodeRule.MOD2_BOUNDARY_RULE;this._geom=geom,this._geomFact=geom.getFactory(),this._bnRule=bnRule}else if(2===arguments.length){var geom$1=arguments[0],bnRule$1=arguments[1];this._geom=geom$1,this._geomFact=geom$1.getFactory(),this._bnRule=bnRule$1}};BoundaryOp.prototype.boundaryMultiLineString=function boundaryMultiLineString(mLine){if(this._geom.isEmpty())return this.getEmptyMultiPoint();var bdyPts=this.computeBoundaryCoordinates(mLine);return 1===bdyPts.length?this._geomFact.createPoint(bdyPts[0]):this._geomFact.createMultiPointFromCoords(bdyPts)},BoundaryOp.prototype.getBoundary=function getBoundary(){return this._geom instanceof LineString$1?this.boundaryLineString(this._geom):this._geom instanceof MultiLineString?this.boundaryMultiLineString(this._geom):this._geom.getBoundary()},BoundaryOp.prototype.boundaryLineString=function boundaryLineString(line){if(this._geom.isEmpty())return this.getEmptyMultiPoint();if(line.isClosed()){var closedEndpointOnBoundary=this._bnRule.isInBoundary(2);return closedEndpointOnBoundary?line.getStartPoint():this._geomFact.createMultiPoint()}return this._geomFact.createMultiPoint([line.getStartPoint(),line.getEndPoint()])},BoundaryOp.prototype.getEmptyMultiPoint=function getEmptyMultiPoint(){return this._geomFact.createMultiPoint()},BoundaryOp.prototype.computeBoundaryCoordinates=function computeBoundaryCoordinates(mLine){var this$1=this,bdyPts=new ArrayList;this._endpointMap=new TreeMap;for(var i=0,line;i<mLine.getNumGeometries();i++)(line=mLine.getGeometryN(i),0!==line.getNumPoints())&&(this$1.addEndpoint(line.getCoordinateN(0)),this$1.addEndpoint(line.getCoordinateN(line.getNumPoints()-1)));for(var it=this._endpointMap.entrySet().iterator();it.hasNext();){var entry=it.next(),counter=entry.getValue(),valence=counter.count;this$1._bnRule.isInBoundary(valence)&&bdyPts.add(entry.getKey())}return CoordinateArrays.toCoordinateArray(bdyPts)},BoundaryOp.prototype.addEndpoint=function addEndpoint(pt){var counter=this._endpointMap.get(pt);null===counter&&(counter=new Counter,this._endpointMap.put(pt,counter)),counter.count++},BoundaryOp.prototype.interfaces_=function interfaces_(){return[]},BoundaryOp.prototype.getClass=function getClass(){return BoundaryOp},BoundaryOp.getBoundary=function getBoundary(){if(1===arguments.length){var g=arguments[0],bop=new BoundaryOp(g);return bop.getBoundary()}if(2===arguments.length){var g$1=arguments[0],bnRule=arguments[1],bop$1=new BoundaryOp(g$1,bnRule);return bop$1.getBoundary()}};var Counter=function Counter(){this.count=null};Counter.prototype.interfaces_=function interfaces_(){return[]},Counter.prototype.getClass=function getClass(){return Counter};var DecimalFormat=function DecimalFormat(){},StringUtil=function StringUtil(){},staticAccessors$15={NEWLINE:{configurable:!0},SIMPLE_ORDINATE_FORMAT:{configurable:!0}};StringUtil.prototype.interfaces_=function interfaces_(){return[]},StringUtil.prototype.getClass=function getClass(){return StringUtil},StringUtil.chars=function chars(c,n){for(var ch=Array(n).fill(null),i=0;i<n;i++)ch[i]=c;return ch+""},StringUtil.getStackTrace=function getStackTrace(){if(1===arguments.length){var t=arguments[0],os=new ByteArrayOutputStream,ps=new PrintStream(os);return t.printStackTrace(ps),os.toString()}if(2===arguments.length){for(var t$1=arguments[0],depth=arguments[1],stackTrace="",stringReader=new StringReader(StringUtil.getStackTrace(t$1)),lineNumberReader=new LineNumberReader(stringReader),i=0;i<depth;i++)try{stackTrace+=lineNumberReader.readLine()+StringUtil.NEWLINE}catch(e){if(e instanceof IOException)Assert.shouldNeverReachHere();else throw e}finally{}return stackTrace}},StringUtil.split=function split(s,separator){for(var separatorlen=separator.length,tokenList=new ArrayList,tmpString=""+s,pos=tmpString.indexOf(separator);0<=pos;){var token=tmpString.substring(0,pos);tokenList.add(token),tmpString=tmpString.substring(pos+separatorlen),pos=tmpString.indexOf(separator)}0<tmpString.length&&tokenList.add(tmpString);for(var res=Array(tokenList.size()).fill(null),i=0;i<res.length;i++)res[i]=tokenList.get(i);return res},StringUtil.toString=function toString(){if(1===arguments.length){var d=arguments[0];return StringUtil.SIMPLE_ORDINATE_FORMAT.format(d)}},StringUtil.spaces=function spaces(n){return StringUtil.chars(" ",n)},staticAccessors$15.NEWLINE.get=function(){return System.getProperty("line.separator")},staticAccessors$15.SIMPLE_ORDINATE_FORMAT.get=function(){return new DecimalFormat("0.#")},Object.defineProperties(StringUtil,staticAccessors$15);var CoordinateSequences=function CoordinateSequences(){};CoordinateSequences.prototype.interfaces_=function interfaces_(){return[]},CoordinateSequences.prototype.getClass=function getClass(){return CoordinateSequences},CoordinateSequences.copyCoord=function copyCoord(src,srcPos,dest,destPos){for(var minDim=_Mathmin(src.getDimension(),dest.getDimension()),dim=0;dim<minDim;dim++)dest.setOrdinate(destPos,dim,src.getOrdinate(srcPos,dim))},CoordinateSequences.isRing=function isRing(seq){var n=seq.size();return!(0!==n)||!(3>=n)&&seq.getOrdinate(0,CoordinateSequence.X)===seq.getOrdinate(n-1,CoordinateSequence.X)&&seq.getOrdinate(0,CoordinateSequence.Y)===seq.getOrdinate(n-1,CoordinateSequence.Y)},CoordinateSequences.isEqual=function isEqual(cs1,cs2){var cs1Size=cs1.size(),cs2Size=cs2.size();if(cs1Size!==cs2Size)return!1;for(var dim=_Mathmin(cs1.getDimension(),cs2.getDimension()),i=0;i<cs1Size;i++)for(var d=0;d<dim;d++){var v1=cs1.getOrdinate(i,d),v2=cs2.getOrdinate(i,d);if(cs1.getOrdinate(i,d)!==cs2.getOrdinate(i,d)&&!(Double.isNaN(v1)&&Double.isNaN(v2)))return!1}return!0},CoordinateSequences.extend=function extend(fact,seq,size){var newseq=fact.create(size,seq.getDimension()),n=seq.size();if(CoordinateSequences.copy(seq,0,newseq,0,n),0<n)for(var i=n;i<size;i++)CoordinateSequences.copy(seq,n-1,newseq,i,1);return newseq},CoordinateSequences.reverse=function reverse(seq){for(var last=seq.size()-1,mid=_Mathtrunc(last/2),i=0;i<=mid;i++)CoordinateSequences.swap(seq,i,last-i)},CoordinateSequences.swap=function swap(seq,i,j){if(i===j)return null;for(var dim=0,tmp;dim<seq.getDimension();dim++)tmp=seq.getOrdinate(i,dim),seq.setOrdinate(i,dim,seq.getOrdinate(j,dim)),seq.setOrdinate(j,dim,tmp)},CoordinateSequences.copy=function copy(src,srcPos,dest,destPos,length){for(var i=0;i<length;i++)CoordinateSequences.copyCoord(src,srcPos+i,dest,destPos+i)},CoordinateSequences.toString=function toString(){if(1===arguments.length){var cs=arguments[0],size=cs.size();if(0===size)return"()";var dim=cs.getDimension(),buf=new StringBuffer;buf.append("(");for(var i=0;i<size;i++){0<i&&buf.append(" ");for(var d=0;d<dim;d++)0<d&&buf.append(","),buf.append(StringUtil.toString(cs.getOrdinate(i,d)))}return buf.append(")"),buf.toString()}},CoordinateSequences.ensureValidRing=function ensureValidRing(fact,seq){var n=seq.size();if(0===n)return seq;if(3>=n)return CoordinateSequences.createClosedRing(fact,seq,4);var isClosed=seq.getOrdinate(0,CoordinateSequence.X)===seq.getOrdinate(n-1,CoordinateSequence.X)&&seq.getOrdinate(0,CoordinateSequence.Y)===seq.getOrdinate(n-1,CoordinateSequence.Y);return isClosed?seq:CoordinateSequences.createClosedRing(fact,seq,n+1)},CoordinateSequences.createClosedRing=function createClosedRing(fact,seq,size){var newseq=fact.create(size,seq.getDimension()),n=seq.size();CoordinateSequences.copy(seq,0,newseq,0,n);for(var i=n;i<size;i++)CoordinateSequences.copy(seq,0,newseq,i,1);return newseq};var LineString$1=function(Geometry$$1){function LineString(points,factory){Geometry$$1.call(this,factory),this._points=null,this.init(points)}Geometry$$1&&(LineString.__proto__=Geometry$$1),LineString.prototype=Object.create(Geometry$$1&&Geometry$$1.prototype),LineString.prototype.constructor=LineString;var staticAccessors={serialVersionUID:{configurable:!0}};return LineString.prototype.computeEnvelopeInternal=function computeEnvelopeInternal(){return this.isEmpty()?new Envelope:this._points.expandEnvelope(new Envelope)},LineString.prototype.isRing=function isRing(){return this.isClosed()&&this.isSimple()},LineString.prototype.getSortIndex=function getSortIndex(){return Geometry$$1.SORTINDEX_LINESTRING},LineString.prototype.getCoordinates=function getCoordinates(){return this._points.toCoordinateArray()},LineString.prototype.equalsExact=function equalsExact(){var this$1=this;if(2===arguments.length){var other=arguments[0],tolerance=arguments[1];if(!this.isEquivalentClass(other))return!1;var otherLineString=other;if(this._points.size()!==otherLineString._points.size())return!1;for(var i=0;i<this._points.size();i++)if(!this$1.equal(this$1._points.getCoordinate(i),otherLineString._points.getCoordinate(i),tolerance))return!1;return!0}return Geometry$$1.prototype.equalsExact.apply(this,arguments)},LineString.prototype.normalize=function normalize(){for(var this$1=this,i=0,j;i<_Mathtrunc(this._points.size()/2);i++)if(j=this$1._points.size()-1-i,!this$1._points.getCoordinate(i).equals(this$1._points.getCoordinate(j)))return 0<this$1._points.getCoordinate(i).compareTo(this$1._points.getCoordinate(j))&&CoordinateSequences.reverse(this$1._points),null},LineString.prototype.getCoordinate=function getCoordinate(){return this.isEmpty()?null:this._points.getCoordinate(0)},LineString.prototype.getBoundaryDimension=function getBoundaryDimension(){return this.isClosed()?Dimension.FALSE:0},LineString.prototype.isClosed=function isClosed(){return!this.isEmpty()&&this.getCoordinateN(0).equals2D(this.getCoordinateN(this.getNumPoints()-1))},LineString.prototype.getEndPoint=function getEndPoint(){return this.isEmpty()?null:this.getPointN(this.getNumPoints()-1)},LineString.prototype.getDimension=function getDimension(){return 1},LineString.prototype.getLength=function getLength(){return CGAlgorithms.computeLength(this._points)},LineString.prototype.getNumPoints=function getNumPoints(){return this._points.size()},LineString.prototype.reverse=function reverse(){var seq=this._points.copy();CoordinateSequences.reverse(seq);var revLine=this.getFactory().createLineString(seq);return revLine},LineString.prototype.compareToSameClass=function compareToSameClass(){var this$1=this;if(1===arguments.length){for(var o=arguments[0],line=o,i=0,j=0,comparison;i<this._points.size()&&j<line._points.size();){if(comparison=this$1._points.getCoordinate(i).compareTo(line._points.getCoordinate(j)),0!==comparison)return comparison;i++,j++}return i<this._points.size()?1:j<line._points.size()?-1:0}if(2===arguments.length){var o$1=arguments[0],comp=arguments[1],line$1=o$1;return comp.compare(this._points,line$1._points)}},LineString.prototype.apply=function apply(){var this$1=this;if(hasInterface(arguments[0],CoordinateFilter))for(var filter=arguments[0],i=0;i<this._points.size();i++)filter.filter(this$1._points.getCoordinate(i));else if(hasInterface(arguments[0],CoordinateSequenceFilter)){var filter$1=arguments[0];if(0===this._points.size())return null;for(var i$1=0;i$1<this._points.size()&&(filter$1.filter(this$1._points,i$1),!filter$1.isDone());i$1++);filter$1.isGeometryChanged()&&this.geometryChanged()}else if(hasInterface(arguments[0],GeometryFilter)){var filter$2=arguments[0];filter$2.filter(this)}else if(hasInterface(arguments[0],GeometryComponentFilter)){var filter$3=arguments[0];filter$3.filter(this)}},LineString.prototype.getBoundary=function getBoundary(){return new BoundaryOp(this).getBoundary()},LineString.prototype.isEquivalentClass=function isEquivalentClass(other){return other instanceof LineString},LineString.prototype.clone=function clone(){var ls=Geometry$$1.prototype.clone.call(this);return ls._points=this._points.clone(),ls},LineString.prototype.getCoordinateN=function getCoordinateN(n){return this._points.getCoordinate(n)},LineString.prototype.getGeometryType=function getGeometryType(){return"LineString"},LineString.prototype.copy=function copy(){return new LineString(this._points.copy(),this._factory)},LineString.prototype.getCoordinateSequence=function getCoordinateSequence(){return this._points},LineString.prototype.isEmpty=function isEmpty(){return 0===this._points.size()},LineString.prototype.init=function init(points){if(null===points&&(points=this.getFactory().getCoordinateSequenceFactory().create([])),1===points.size())throw new IllegalArgumentException("Invalid number of points in LineString (found "+points.size()+" - must be 0 or >= 2)");this._points=points},LineString.prototype.isCoordinate=function isCoordinate(pt){for(var this$1=this,i=0;i<this._points.size();i++)if(this$1._points.getCoordinate(i).equals(pt))return!0;return!1},LineString.prototype.getStartPoint=function getStartPoint(){return this.isEmpty()?null:this.getPointN(0)},LineString.prototype.getPointN=function getPointN(n){return this.getFactory().createPoint(this._points.getCoordinate(n))},LineString.prototype.interfaces_=function interfaces_(){return[Lineal]},LineString.prototype.getClass=function getClass(){return LineString},staticAccessors.serialVersionUID.get=function(){return 3110669828065365500},Object.defineProperties(LineString,staticAccessors),LineString}(Geometry),Puntal=function Puntal(){};Puntal.prototype.interfaces_=function interfaces_(){return[]},Puntal.prototype.getClass=function getClass(){return Puntal};var Point=function(Geometry$$1){function Point(coordinates,factory){Geometry$$1.call(this,factory),this._coordinates=coordinates||null,this.init(this._coordinates)}Geometry$$1&&(Point.__proto__=Geometry$$1),Point.prototype=Object.create(Geometry$$1&&Geometry$$1.prototype),Point.prototype.constructor=Point;var staticAccessors={serialVersionUID:{configurable:!0}};return Point.prototype.computeEnvelopeInternal=function computeEnvelopeInternal(){if(this.isEmpty())return new Envelope;var env=new Envelope;return env.expandToInclude(this._coordinates.getX(0),this._coordinates.getY(0)),env},Point.prototype.getSortIndex=function getSortIndex(){return Geometry$$1.SORTINDEX_POINT},Point.prototype.getCoordinates=function getCoordinates(){return this.isEmpty()?[]:[this.getCoordinate()]},Point.prototype.equalsExact=function equalsExact(){if(2===arguments.length){var other=arguments[0],tolerance=arguments[1];return!!this.isEquivalentClass(other)&&(this.isEmpty()&&other.isEmpty()||this.isEmpty()===other.isEmpty()&&this.equal(other.getCoordinate(),this.getCoordinate(),tolerance))}return Geometry$$1.prototype.equalsExact.apply(this,arguments)},Point.prototype.normalize=function normalize(){},Point.prototype.getCoordinate=function getCoordinate(){return 0===this._coordinates.size()?null:this._coordinates.getCoordinate(0)},Point.prototype.getBoundaryDimension=function getBoundaryDimension(){return Dimension.FALSE},Point.prototype.getDimension=function getDimension(){return 0},Point.prototype.getNumPoints=function getNumPoints(){return this.isEmpty()?0:1},Point.prototype.reverse=function reverse(){return this.copy()},Point.prototype.getX=function getX(){if(null===this.getCoordinate())throw new Error("getX called on empty Point");return this.getCoordinate().x},Point.prototype.compareToSameClass=function compareToSameClass(){if(1===arguments.length){var other=arguments[0],point$1=other;return this.getCoordinate().compareTo(point$1.getCoordinate())}if(2===arguments.length){var other$1=arguments[0],comp=arguments[1],point=other$1;return comp.compare(this._coordinates,point._coordinates)}},Point.prototype.apply=function apply(){if(hasInterface(arguments[0],CoordinateFilter)){var filter=arguments[0];if(this.isEmpty())return null;filter.filter(this.getCoordinate())}else if(hasInterface(arguments[0],CoordinateSequenceFilter)){var filter$1=arguments[0];if(this.isEmpty())return null;filter$1.filter(this._coordinates,0),filter$1.isGeometryChanged()&&this.geometryChanged()}else if(hasInterface(arguments[0],GeometryFilter)){var filter$2=arguments[0];filter$2.filter(this)}else if(hasInterface(arguments[0],GeometryComponentFilter)){var filter$3=arguments[0];filter$3.filter(this)}},Point.prototype.getBoundary=function getBoundary(){return this.getFactory().createGeometryCollection(null)},Point.prototype.clone=function clone(){var p=Geometry$$1.prototype.clone.call(this);return p._coordinates=this._coordinates.clone(),p},Point.prototype.getGeometryType=function getGeometryType(){return"Point"},Point.prototype.copy=function copy(){return new Point(this._coordinates.copy(),this._factory)},Point.prototype.getCoordinateSequence=function getCoordinateSequence(){return this._coordinates},Point.prototype.getY=function getY(){if(null===this.getCoordinate())throw new Error("getY called on empty Point");return this.getCoordinate().y},Point.prototype.isEmpty=function isEmpty(){return 0===this._coordinates.size()},Point.prototype.init=function init(coordinates){null===coordinates&&(coordinates=this.getFactory().getCoordinateSequenceFactory().create([])),Assert.isTrue(1>=coordinates.size()),this._coordinates=coordinates},Point.prototype.isSimple=function isSimple(){return!0},Point.prototype.interfaces_=function interfaces_(){return[Puntal]},Point.prototype.getClass=function getClass(){return Point},staticAccessors.serialVersionUID.get=function(){return 4902022702746615000},Object.defineProperties(Point,staticAccessors),Point}(Geometry),Polygonal=function Polygonal(){};Polygonal.prototype.interfaces_=function interfaces_(){return[]},Polygonal.prototype.getClass=function getClass(){return Polygonal};var Polygon=function(Geometry$$1){function Polygon(shell,holes,factory){if(Geometry$$1.call(this,factory),this._shell=null,this._holes=null,null===shell&&(shell=this.getFactory().createLinearRing()),null===holes&&(holes=[]),Geometry$$1.hasNullElements(holes))throw new IllegalArgumentException("holes must not contain null elements");if(shell.isEmpty()&&Geometry$$1.hasNonEmptyElements(holes))throw new IllegalArgumentException("shell is empty but holes are not");this._shell=shell,this._holes=holes}Geometry$$1&&(Polygon.__proto__=Geometry$$1),Polygon.prototype=Object.create(Geometry$$1&&Geometry$$1.prototype),Polygon.prototype.constructor=Polygon;var staticAccessors={serialVersionUID:{configurable:!0}};return Polygon.prototype.computeEnvelopeInternal=function computeEnvelopeInternal(){return this._shell.getEnvelopeInternal()},Polygon.prototype.getSortIndex=function getSortIndex(){return Geometry$$1.SORTINDEX_POLYGON},Polygon.prototype.getCoordinates=function getCoordinates(){var this$1=this;if(this.isEmpty())return[];for(var coordinates=Array(this.getNumPoints()).fill(null),k=-1,shellCoordinates=this._shell.getCoordinates(),x=0;x<shellCoordinates.length;x++)k++,coordinates[k]=shellCoordinates[x];for(var i=0,childCoordinates;i<this._holes.length;i++){childCoordinates=this$1._holes[i].getCoordinates();for(var j=0;j<childCoordinates.length;j++)k++,coordinates[k]=childCoordinates[j]}return coordinates},Polygon.prototype.getArea=function getArea(){var this$1=this,area=0;area+=_Mathabs(CGAlgorithms.signedArea(this._shell.getCoordinateSequence()));for(var i=0;i<this._holes.length;i++)area-=_Mathabs(CGAlgorithms.signedArea(this$1._holes[i].getCoordinateSequence()));return area},Polygon.prototype.isRectangle=function isRectangle(){if(0!==this.getNumInteriorRing())return!1;if(null===this._shell)return!1;if(5!==this._shell.getNumPoints())return!1;for(var seq=this._shell.getCoordinateSequence(),env=this.getEnvelopeInternal(),i=0,x;5>i;i++){if(x=seq.getX(i),x!==env.getMinX()&&x!==env.getMaxX())return!1;var y=seq.getY(i);if(y!==env.getMinY()&&y!==env.getMaxY())return!1}for(var prevX=seq.getX(0),prevY=seq.getY(0),i$1=1;4>=i$1;i$1++){var x$1=seq.getX(i$1),y$1=seq.getY(i$1),xChanged=x$1!==prevX,yChanged=y$1!==prevY;if(xChanged==yChanged)return!1;prevX=x$1,prevY=y$1}return!0},Polygon.prototype.equalsExact=function equalsExact(){var this$1=this;if(2===arguments.length){var other=arguments[0],tolerance=arguments[1];if(!this.isEquivalentClass(other))return!1;var otherPolygon=other,thisShell=this._shell,otherPolygonShell=otherPolygon._shell;if(!thisShell.equalsExact(otherPolygonShell,tolerance))return!1;if(this._holes.length!==otherPolygon._holes.length)return!1;for(var i=0;i<this._holes.length;i++)if(!this$1._holes[i].equalsExact(otherPolygon._holes[i],tolerance))return!1;return!0}return Geometry$$1.prototype.equalsExact.apply(this,arguments)},Polygon.prototype.normalize=function normalize(){var this$1=this;if(0===arguments.length){this.normalize(this._shell,!0);for(var i=0;i<this._holes.length;i++)this$1.normalize(this$1._holes[i],!1);Arrays.sort(this._holes)}else if(2===arguments.length){var ring=arguments[0],clockwise=arguments[1];if(ring.isEmpty())return null;var uniqueCoordinates=Array(ring.getCoordinates().length-1).fill(null);System.arraycopy(ring.getCoordinates(),0,uniqueCoordinates,0,uniqueCoordinates.length);var minCoordinate=CoordinateArrays.minCoordinate(ring.getCoordinates());CoordinateArrays.scroll(uniqueCoordinates,minCoordinate),System.arraycopy(uniqueCoordinates,0,ring.getCoordinates(),0,uniqueCoordinates.length),ring.getCoordinates()[uniqueCoordinates.length]=uniqueCoordinates[0],CGAlgorithms.isCCW(ring.getCoordinates())===clockwise&&CoordinateArrays.reverse(ring.getCoordinates())}},Polygon.prototype.getCoordinate=function getCoordinate(){return this._shell.getCoordinate()},Polygon.prototype.getNumInteriorRing=function getNumInteriorRing(){return this._holes.length},Polygon.prototype.getBoundaryDimension=function getBoundaryDimension(){return 1},Polygon.prototype.getDimension=function getDimension(){return 2},Polygon.prototype.getLength=function getLength(){var this$1=this,len=0;len+=this._shell.getLength();for(var i=0;i<this._holes.length;i++)len+=this$1._holes[i].getLength();return len},Polygon.prototype.getNumPoints=function getNumPoints(){for(var this$1=this,numPoints=this._shell.getNumPoints(),i=0;i<this._holes.length;i++)numPoints+=this$1._holes[i].getNumPoints();return numPoints},Polygon.prototype.reverse=function reverse(){var this$1=this,poly=this.copy();poly._shell=this._shell.copy().reverse(),poly._holes=Array(this._holes.length).fill(null);for(var i=0;i<this._holes.length;i++)poly._holes[i]=this$1._holes[i].copy().reverse();return poly},Polygon.prototype.convexHull=function convexHull(){return this.getExteriorRing().convexHull()},Polygon.prototype.compareToSameClass=function compareToSameClass(){var this$1=this;if(1===arguments.length){var o=arguments[0],thisShell=this._shell,otherShell=o._shell;return thisShell.compareToSameClass(otherShell)}if(2===arguments.length){var o$1=arguments[0],comp=arguments[1],poly=o$1,thisShell$1=this._shell,otherShell$1=poly._shell,shellComp=thisShell$1.compareToSameClass(otherShell$1,comp);if(0!==shellComp)return shellComp;for(var nHole1=this.getNumInteriorRing(),nHole2=poly.getNumInteriorRing(),i=0;i<nHole1&&i<nHole2;){var thisHole=this$1.getInteriorRingN(i),otherHole=poly.getInteriorRingN(i),holeComp=thisHole.compareToSameClass(otherHole,comp);if(0!==holeComp)return holeComp;i++}return i<nHole1?1:i<nHole2?-1:0}},Polygon.prototype.apply=function apply(filter){var this$1=this;if(hasInterface(filter,CoordinateFilter)){this._shell.apply(filter);for(var i$1=0;i$1<this._holes.length;i$1++)this$1._holes[i$1].apply(filter)}else if(hasInterface(filter,CoordinateSequenceFilter)){if(this._shell.apply(filter),!filter.isDone())for(var i$2=0;i$2<this._holes.length&&(this$1._holes[i$2].apply(filter),!filter.isDone());i$2++);filter.isGeometryChanged()&&this.geometryChanged()}else if(hasInterface(filter,GeometryFilter))filter.filter(this);else if(hasInterface(filter,GeometryComponentFilter)){filter.filter(this),this._shell.apply(filter);for(var i=0;i<this._holes.length;i++)this$1._holes[i].apply(filter)}},Polygon.prototype.getBoundary=function getBoundary(){var this$1=this;if(this.isEmpty())return this.getFactory().createMultiLineString();var rings=Array(this._holes.length+1).fill(null);rings[0]=this._shell;for(var i=0;i<this._holes.length;i++)rings[i+1]=this$1._holes[i];return 1>=rings.length?this.getFactory().createLinearRing(rings[0].getCoordinateSequence()):this.getFactory().createMultiLineString(rings)},Polygon.prototype.clone=function clone(){var this$1=this,poly=Geometry$$1.prototype.clone.call(this);poly._shell=this._shell.clone(),poly._holes=Array(this._holes.length).fill(null);for(var i=0;i<this._holes.length;i++)poly._holes[i]=this$1._holes[i].clone();return poly},Polygon.prototype.getGeometryType=function getGeometryType(){return"Polygon"},Polygon.prototype.copy=function copy(){for(var this$1=this,shell=this._shell.copy(),holes=Array(this._holes.length).fill(null),i=0;i<holes.length;i++)holes[i]=this$1._holes[i].copy();return new Polygon(shell,holes,this._factory)},Polygon.prototype.getExteriorRing=function getExteriorRing(){return this._shell},Polygon.prototype.isEmpty=function isEmpty(){return this._shell.isEmpty()},Polygon.prototype.getInteriorRingN=function getInteriorRingN(n){return this._holes[n]},Polygon.prototype.interfaces_=function interfaces_(){return[Polygonal]},Polygon.prototype.getClass=function getClass(){return Polygon},staticAccessors.serialVersionUID.get=function(){return-3494792200821764600},Object.defineProperties(Polygon,staticAccessors),Polygon}(Geometry),MultiPoint=function(GeometryCollection$$1){function MultiPoint(){GeometryCollection$$1.apply(this,arguments)}GeometryCollection$$1&&(MultiPoint.__proto__=GeometryCollection$$1),MultiPoint.prototype=Object.create(GeometryCollection$$1&&GeometryCollection$$1.prototype),MultiPoint.prototype.constructor=MultiPoint;var staticAccessors={serialVersionUID:{configurable:!0}};return MultiPoint.prototype.getSortIndex=function getSortIndex(){return Geometry.SORTINDEX_MULTIPOINT},MultiPoint.prototype.isValid=function isValid(){return!0},MultiPoint.prototype.equalsExact=function equalsExact(){if(2===arguments.length){var other=arguments[0],tolerance=arguments[1];return!!this.isEquivalentClass(other)&&GeometryCollection$$1.prototype.equalsExact.call(this,other,tolerance)}return GeometryCollection$$1.prototype.equalsExact.apply(this,arguments)},MultiPoint.prototype.getCoordinate=function getCoordinate(){if(1===arguments.length){var n=arguments[0];return this._geometries[n].getCoordinate()}return GeometryCollection$$1.prototype.getCoordinate.apply(this,arguments)},MultiPoint.prototype.getBoundaryDimension=function getBoundaryDimension(){return Dimension.FALSE},MultiPoint.prototype.getDimension=function getDimension(){return 0},MultiPoint.prototype.getBoundary=function getBoundary(){return this.getFactory().createGeometryCollection(null)},MultiPoint.prototype.getGeometryType=function getGeometryType(){return"MultiPoint"},MultiPoint.prototype.copy=function copy(){for(var this$1=this,points=Array(this._geometries.length).fill(null),i=0;i<points.length;i++)points[i]=this$1._geometries[i].copy();return new MultiPoint(points,this._factory)},MultiPoint.prototype.interfaces_=function interfaces_(){return[Puntal]},MultiPoint.prototype.getClass=function getClass(){return MultiPoint},staticAccessors.serialVersionUID.get=function(){return-8048474874175356000},Object.defineProperties(MultiPoint,staticAccessors),MultiPoint}(GeometryCollection),LinearRing=function(LineString$$1){function LinearRing(points,factory){points instanceof Coordinate&&factory instanceof GeometryFactory&&(points=factory.getCoordinateSequenceFactory().create(points)),LineString$$1.call(this,points,factory),this.validateConstruction()}LineString$$1&&(LinearRing.__proto__=LineString$$1),LinearRing.prototype=Object.create(LineString$$1&&LineString$$1.prototype),LinearRing.prototype.constructor=LinearRing;var staticAccessors={MINIMUM_VALID_SIZE:{configurable:!0},serialVersionUID:{configurable:!0}};return LinearRing.prototype.getSortIndex=function getSortIndex(){return Geometry.SORTINDEX_LINEARRING},LinearRing.prototype.getBoundaryDimension=function getBoundaryDimension(){return Dimension.FALSE},LinearRing.prototype.isClosed=function isClosed(){return!!this.isEmpty()||LineString$$1.prototype.isClosed.call(this)},LinearRing.prototype.reverse=function reverse(){var seq=this._points.copy();CoordinateSequences.reverse(seq);var rev=this.getFactory().createLinearRing(seq);return rev},LinearRing.prototype.validateConstruction=function validateConstruction(){if(!this.isEmpty()&&!LineString$$1.prototype.isClosed.call(this))throw new IllegalArgumentException("Points of LinearRing do not form a closed linestring");if(1<=this.getCoordinateSequence().size()&&this.getCoordinateSequence().size()<LinearRing.MINIMUM_VALID_SIZE)throw new IllegalArgumentException("Invalid number of points in LinearRing (found "+this.getCoordinateSequence().size()+" - must be 0 or >= 4)")},LinearRing.prototype.getGeometryType=function getGeometryType(){return"LinearRing"},LinearRing.prototype.copy=function copy(){return new LinearRing(this._points.copy(),this._factory)},LinearRing.prototype.interfaces_=function interfaces_(){return[]},LinearRing.prototype.getClass=function getClass(){return LinearRing},staticAccessors.MINIMUM_VALID_SIZE.get=function(){return 4},staticAccessors.serialVersionUID.get=function(){return-4261142084085851600},Object.defineProperties(LinearRing,staticAccessors),LinearRing}(LineString$1),MultiPolygon=function(GeometryCollection$$1){function MultiPolygon(){GeometryCollection$$1.apply(this,arguments)}GeometryCollection$$1&&(MultiPolygon.__proto__=GeometryCollection$$1),MultiPolygon.prototype=Object.create(GeometryCollection$$1&&GeometryCollection$$1.prototype),MultiPolygon.prototype.constructor=MultiPolygon;var staticAccessors={serialVersionUID:{configurable:!0}};return MultiPolygon.prototype.getSortIndex=function getSortIndex(){return Geometry.SORTINDEX_MULTIPOLYGON},MultiPolygon.prototype.equalsExact=function equalsExact(){if(2===arguments.length){var other=arguments[0],tolerance=arguments[1];return!!this.isEquivalentClass(other)&&GeometryCollection$$1.prototype.equalsExact.call(this,other,tolerance)}return GeometryCollection$$1.prototype.equalsExact.apply(this,arguments)},MultiPolygon.prototype.getBoundaryDimension=function getBoundaryDimension(){return 1},MultiPolygon.prototype.getDimension=function getDimension(){return 2},MultiPolygon.prototype.reverse=function reverse(){for(var this$1=this,n=this._geometries.length,revGeoms=Array(n).fill(null),i=0;i<this._geometries.length;i++)revGeoms[i]=this$1._geometries[i].reverse();return this.getFactory().createMultiPolygon(revGeoms)},MultiPolygon.prototype.getBoundary=function getBoundary(){var this$1=this;if(this.isEmpty())return this.getFactory().createMultiLineString();for(var allRings=new ArrayList,i=0;i<this._geometries.length;i++)for(var polygon=this$1._geometries[i],rings=polygon.getBoundary(),j=0;j<rings.getNumGeometries();j++)allRings.add(rings.getGeometryN(j));var allRingsArray=Array(allRings.size()).fill(null);return this.getFactory().createMultiLineString(allRings.toArray(allRingsArray))},MultiPolygon.prototype.getGeometryType=function getGeometryType(){return"MultiPolygon"},MultiPolygon.prototype.copy=function copy(){for(var this$1=this,polygons=Array(this._geometries.length).fill(null),i=0;i<polygons.length;i++)polygons[i]=this$1._geometries[i].copy();return new MultiPolygon(polygons,this._factory)},MultiPolygon.prototype.interfaces_=function interfaces_(){return[Polygonal]},MultiPolygon.prototype.getClass=function getClass(){return MultiPolygon},staticAccessors.serialVersionUID.get=function(){return-551033529766975900},Object.defineProperties(MultiPolygon,staticAccessors),MultiPolygon}(GeometryCollection),GeometryEditor=function GeometryEditor(factory){this._factory=factory||null,this._isUserDataCopied=!1},staticAccessors$16={NoOpGeometryOperation:{configurable:!0},CoordinateOperation:{configurable:!0},CoordinateSequenceOperation:{configurable:!0}};GeometryEditor.prototype.setCopyUserData=function setCopyUserData(isUserDataCopied){this._isUserDataCopied=isUserDataCopied},GeometryEditor.prototype.edit=function edit(geometry,operation){if(null===geometry)return null;var result=this.editInternal(geometry,operation);return this._isUserDataCopied&&result.setUserData(geometry.getUserData()),result},GeometryEditor.prototype.editInternal=function editInternal(geometry,operation){return(null===this._factory&&(this._factory=geometry.getFactory()),geometry instanceof GeometryCollection)?this.editGeometryCollection(geometry,operation):geometry instanceof Polygon?this.editPolygon(geometry,operation):geometry instanceof Point?operation.edit(geometry,this._factory):geometry instanceof LineString$1?operation.edit(geometry,this._factory):(Assert.shouldNeverReachHere("Unsupported Geometry class: "+geometry.getClass().getName()),null)},GeometryEditor.prototype.editGeometryCollection=function editGeometryCollection(collection,operation){for(var this$1=this,collectionForType=operation.edit(collection,this._factory),geometries=new ArrayList,i=0,geometry;i<collectionForType.getNumGeometries();i++)(geometry=this$1.edit(collectionForType.getGeometryN(i),operation),!(null===geometry||geometry.isEmpty()))&&geometries.add(geometry);return collectionForType.getClass()===MultiPoint?this._factory.createMultiPoint(geometries.toArray([])):collectionForType.getClass()===MultiLineString?this._factory.createMultiLineString(geometries.toArray([])):collectionForType.getClass()===MultiPolygon?this._factory.createMultiPolygon(geometries.toArray([])):this._factory.createGeometryCollection(geometries.toArray([]))},GeometryEditor.prototype.editPolygon=function editPolygon(polygon,operation){var this$1=this,newPolygon=operation.edit(polygon,this._factory);if(null===newPolygon&&(newPolygon=this._factory.createPolygon(null)),newPolygon.isEmpty())return newPolygon;var shell=this.edit(newPolygon.getExteriorRing(),operation);if(null===shell||shell.isEmpty())return this._factory.createPolygon();for(var holes=new ArrayList,i=0,hole;i<newPolygon.getNumInteriorRing();i++)(hole=this$1.edit(newPolygon.getInteriorRingN(i),operation),!(null===hole||hole.isEmpty()))&&holes.add(hole);return this._factory.createPolygon(shell,holes.toArray([]))},GeometryEditor.prototype.interfaces_=function interfaces_(){return[]},GeometryEditor.prototype.getClass=function getClass(){return GeometryEditor},GeometryEditor.GeometryEditorOperation=function GeometryEditorOperation(){},staticAccessors$16.NoOpGeometryOperation.get=function(){return NoOpGeometryOperation},staticAccessors$16.CoordinateOperation.get=function(){return CoordinateOperation},staticAccessors$16.CoordinateSequenceOperation.get=function(){return CoordinateSequenceOperation},Object.defineProperties(GeometryEditor,staticAccessors$16);var NoOpGeometryOperation=function NoOpGeometryOperation(){};NoOpGeometryOperation.prototype.edit=function edit(geometry,factory){return geometry},NoOpGeometryOperation.prototype.interfaces_=function interfaces_(){return[GeometryEditor.GeometryEditorOperation]},NoOpGeometryOperation.prototype.getClass=function getClass(){return NoOpGeometryOperation};var CoordinateOperation=function CoordinateOperation(){};CoordinateOperation.prototype.edit=function edit(geometry,factory){var coords=this.editCoordinates(geometry.getCoordinates(),geometry);return null===coords?geometry:geometry instanceof LinearRing?factory.createLinearRing(coords):geometry instanceof LineString$1?factory.createLineString(coords):geometry instanceof Point?0<coords.length?factory.createPoint(coords[0]):factory.createPoint():geometry},CoordinateOperation.prototype.interfaces_=function interfaces_(){return[GeometryEditor.GeometryEditorOperation]},CoordinateOperation.prototype.getClass=function getClass(){return CoordinateOperation};var CoordinateSequenceOperation=function CoordinateSequenceOperation(){};CoordinateSequenceOperation.prototype.edit=function edit(geometry,factory){return geometry instanceof LinearRing?factory.createLinearRing(this.edit(geometry.getCoordinateSequence(),geometry)):geometry instanceof LineString$1?factory.createLineString(this.edit(geometry.getCoordinateSequence(),geometry)):geometry instanceof Point?factory.createPoint(this.edit(geometry.getCoordinateSequence(),geometry)):geometry},CoordinateSequenceOperation.prototype.interfaces_=function interfaces_(){return[GeometryEditor.GeometryEditorOperation]},CoordinateSequenceOperation.prototype.getClass=function getClass(){return CoordinateSequenceOperation};var CoordinateArraySequence=function CoordinateArraySequence(){var this$1=this;if(this._dimension=3,this._coordinates=null,1===arguments.length){if(arguments[0]instanceof Array)this._coordinates=arguments[0],this._dimension=3;else if(_NumberisInteger(arguments[0])){var size=arguments[0];this._coordinates=Array(size).fill(null);for(var i=0;i<size;i++)this$1._coordinates[i]=new Coordinate}else if(hasInterface(arguments[0],CoordinateSequence)){var coordSeq=arguments[0];if(null===coordSeq)return this._coordinates=[].fill(null),null;this._dimension=coordSeq.getDimension(),this._coordinates=Array(coordSeq.size()).fill(null);for(var i$1=0;i$1<this._coordinates.length;i$1++)this$1._coordinates[i$1]=coordSeq.getCoordinateCopy(i$1)}}else if(2===arguments.length)if(arguments[0]instanceof Array&&_NumberisInteger(arguments[1])){var coordinates=arguments[0],dimension=arguments[1];this._coordinates=coordinates,this._dimension=dimension,null===coordinates&&(this._coordinates=[].fill(null))}else if(_NumberisInteger(arguments[0])&&_NumberisInteger(arguments[1])){var size$1=arguments[0],dimension$1=arguments[1];this._coordinates=Array(size$1).fill(null),this._dimension=dimension$1;for(var i$2=0;i$2<size$1;i$2++)this$1._coordinates[i$2]=new Coordinate}},staticAccessors$18={serialVersionUID:{configurable:!0}};CoordinateArraySequence.prototype.setOrdinate=function setOrdinate(index,ordinateIndex,value){switch(ordinateIndex){case CoordinateSequence.X:this._coordinates[index].x=value;break;case CoordinateSequence.Y:this._coordinates[index].y=value;break;case CoordinateSequence.Z:this._coordinates[index].z=value;break;default:throw new IllegalArgumentException("invalid ordinateIndex");}},CoordinateArraySequence.prototype.size=function size(){return this._coordinates.length},CoordinateArraySequence.prototype.getOrdinate=function getOrdinate(index,ordinateIndex){switch(ordinateIndex){case CoordinateSequence.X:return this._coordinates[index].x;case CoordinateSequence.Y:return this._coordinates[index].y;case CoordinateSequence.Z:return this._coordinates[index].z;default:}return Double.NaN},CoordinateArraySequence.prototype.getCoordinate=function getCoordinate(){if(1===arguments.length){var i=arguments[0];return this._coordinates[i]}if(2===arguments.length){var index=arguments[0],coord=arguments[1];coord.x=this._coordinates[index].x,coord.y=this._coordinates[index].y,coord.z=this._coordinates[index].z}},CoordinateArraySequence.prototype.getCoordinateCopy=function getCoordinateCopy(i){return new Coordinate(this._coordinates[i])},CoordinateArraySequence.prototype.getDimension=function getDimension(){return this._dimension},CoordinateArraySequence.prototype.getX=function getX(index){return this._coordinates[index].x},CoordinateArraySequence.prototype.clone=function clone(){for(var this$1=this,cloneCoordinates=Array(this.size()).fill(null),i=0;i<this._coordinates.length;i++)cloneCoordinates[i]=this$1._coordinates[i].clone();return new CoordinateArraySequence(cloneCoordinates,this._dimension)},CoordinateArraySequence.prototype.expandEnvelope=function expandEnvelope(env){for(var this$1=this,i=0;i<this._coordinates.length;i++)env.expandToInclude(this$1._coordinates[i]);return env},CoordinateArraySequence.prototype.copy=function copy(){for(var this$1=this,cloneCoordinates=Array(this.size()).fill(null),i=0;i<this._coordinates.length;i++)cloneCoordinates[i]=this$1._coordinates[i].copy();return new CoordinateArraySequence(cloneCoordinates,this._dimension)},CoordinateArraySequence.prototype.toString=function toString(){var this$1=this;if(0<this._coordinates.length){var strBuf=new StringBuffer(17*this._coordinates.length);strBuf.append("("),strBuf.append(this._coordinates[0]);for(var i=1;i<this._coordinates.length;i++)strBuf.append(", "),strBuf.append(this$1._coordinates[i]);return strBuf.append(")"),strBuf.toString()}return"()"},CoordinateArraySequence.prototype.getY=function getY(index){return this._coordinates[index].y},CoordinateArraySequence.prototype.toCoordinateArray=function toCoordinateArray(){return this._coordinates},CoordinateArraySequence.prototype.interfaces_=function interfaces_(){return[CoordinateSequence,Serializable]},CoordinateArraySequence.prototype.getClass=function getClass(){return CoordinateArraySequence},staticAccessors$18.serialVersionUID.get=function(){return-915438501601840600},Object.defineProperties(CoordinateArraySequence,staticAccessors$18);var CoordinateArraySequenceFactory=function CoordinateArraySequenceFactory(){},staticAccessors$17={serialVersionUID:{configurable:!0},instanceObject:{configurable:!0}};CoordinateArraySequenceFactory.prototype.readResolve=function readResolve(){return CoordinateArraySequenceFactory.instance()},CoordinateArraySequenceFactory.prototype.create=function create(){if(1===arguments.length){if(arguments[0]instanceof Array){var coordinates=arguments[0];return new CoordinateArraySequence(coordinates)}if(hasInterface(arguments[0],CoordinateSequence)){var coordSeq=arguments[0];return new CoordinateArraySequence(coordSeq)}}else if(2===arguments.length){var size=arguments[0],dimension=arguments[1];return 3<dimension&&(dimension=3),2>dimension?new CoordinateArraySequence(size):new CoordinateArraySequence(size,dimension)}},CoordinateArraySequenceFactory.prototype.interfaces_=function interfaces_(){return[CoordinateSequenceFactory,Serializable]},CoordinateArraySequenceFactory.prototype.getClass=function getClass(){return CoordinateArraySequenceFactory},CoordinateArraySequenceFactory.instance=function instance(){return CoordinateArraySequenceFactory.instanceObject},staticAccessors$17.serialVersionUID.get=function(){return-4099577099607551500},staticAccessors$17.instanceObject.get=function(){return new CoordinateArraySequenceFactory},Object.defineProperties(CoordinateArraySequenceFactory,staticAccessors$17);var HashMap=function(MapInterface){function HashMap(){MapInterface.call(this),this.map_=new Map}return MapInterface&&(HashMap.__proto__=MapInterface),HashMap.prototype=Object.create(MapInterface&&MapInterface.prototype),HashMap.prototype.constructor=HashMap,HashMap.prototype.get=function get(key){return this.map_.get(key)||null},HashMap.prototype.put=function put(key,value){return this.map_.set(key,value),value},HashMap.prototype.values=function values(){for(var arrayList=new ArrayList,it=this.map_.values(),o=it.next();!o.done;)arrayList.add(o.value),o=it.next();return arrayList},HashMap.prototype.entrySet=function entrySet(){var hashSet=new HashSet;return this.map_.entries().forEach(function(entry){return hashSet.add(entry)}),hashSet},HashMap.prototype.size=function size(){return this.map_.size()},HashMap}(Map$1),PrecisionModel=function PrecisionModel(){if(this._modelType=null,this._scale=null,0===arguments.length)this._modelType=PrecisionModel.FLOATING;else if(1===arguments.length)if(arguments[0]instanceof Type){var modelType=arguments[0];this._modelType=modelType,modelType===PrecisionModel.FIXED&&this.setScale(1)}else if("number"==typeof arguments[0]){var scale=arguments[0];this._modelType=PrecisionModel.FIXED,this.setScale(scale)}else if(arguments[0]instanceof PrecisionModel){var pm=arguments[0];this._modelType=pm._modelType,this._scale=pm._scale}},staticAccessors$19={serialVersionUID:{configurable:!0},maximumPreciseValue:{configurable:!0}};PrecisionModel.prototype.equals=function equals(other){if(!(other instanceof PrecisionModel))return!1;var otherPrecisionModel=other;return this._modelType===otherPrecisionModel._modelType&&this._scale===otherPrecisionModel._scale},PrecisionModel.prototype.compareTo=function compareTo(o){var other=o,sigDigits=this.getMaximumSignificantDigits(),otherSigDigits=other.getMaximumSignificantDigits();return new Integer(sigDigits).compareTo(new Integer(otherSigDigits))},PrecisionModel.prototype.getScale=function getScale(){return this._scale},PrecisionModel.prototype.isFloating=function isFloating(){return this._modelType===PrecisionModel.FLOATING||this._modelType===PrecisionModel.FLOATING_SINGLE},PrecisionModel.prototype.getType=function getType(){return this._modelType},PrecisionModel.prototype.toString=function toString(){var description="UNKNOWN";return this._modelType===PrecisionModel.FLOATING?description="Floating":this._modelType===PrecisionModel.FLOATING_SINGLE?description="Floating-Single":this._modelType===PrecisionModel.FIXED&&(description="Fixed (Scale="+this.getScale()+")"),description},PrecisionModel.prototype.makePrecise=function makePrecise(){if("number"==typeof arguments[0]){var val=arguments[0];if(Double.isNaN(val))return val;if(this._modelType===PrecisionModel.FLOATING_SINGLE){var floatSingleVal=val;return floatSingleVal}return this._modelType===PrecisionModel.FIXED?_Mathround(val*this._scale)/this._scale:val}if(arguments[0]instanceof Coordinate){var coord=arguments[0];if(this._modelType===PrecisionModel.FLOATING)return null;coord.x=this.makePrecise(coord.x),coord.y=this.makePrecise(coord.y)}},PrecisionModel.prototype.getMaximumSignificantDigits=function getMaximumSignificantDigits(){var maxSigDigits=16;return this._modelType===PrecisionModel.FLOATING?maxSigDigits=16:this._modelType===PrecisionModel.FLOATING_SINGLE?maxSigDigits=6:this._modelType===PrecisionModel.FIXED&&(maxSigDigits=1+_Mathtrunc(_Mathceil(_Mathlog(this.getScale())/2.302585092994046))),maxSigDigits},PrecisionModel.prototype.setScale=function setScale(scale){this._scale=_Mathabs(scale)},PrecisionModel.prototype.interfaces_=function interfaces_(){return[Serializable,Comparable]},PrecisionModel.prototype.getClass=function getClass(){return PrecisionModel},PrecisionModel.mostPrecise=function mostPrecise(pm1,pm2){return 0<=pm1.compareTo(pm2)?pm1:pm2},staticAccessors$19.serialVersionUID.get=function(){return 7777263578777804000},staticAccessors$19.maximumPreciseValue.get=function(){return 9007199254740992},Object.defineProperties(PrecisionModel,staticAccessors$19);var Type=function Type(name){this._name=name||null,Type.nameToTypeMap.put(name,this)},staticAccessors$1$1={serialVersionUID:{configurable:!0},nameToTypeMap:{configurable:!0}};Type.prototype.readResolve=function readResolve(){return Type.nameToTypeMap.get(this._name)},Type.prototype.toString=function toString(){return this._name},Type.prototype.interfaces_=function interfaces_(){return[Serializable]},Type.prototype.getClass=function getClass(){return Type},staticAccessors$1$1.serialVersionUID.get=function(){return-5528602631731590000},staticAccessors$1$1.nameToTypeMap.get=function(){return new HashMap},Object.defineProperties(Type,staticAccessors$1$1),PrecisionModel.Type=Type,PrecisionModel.FIXED=new Type("FIXED"),PrecisionModel.FLOATING=new Type("FLOATING"),PrecisionModel.FLOATING_SINGLE=new Type("FLOATING SINGLE");var GeometryFactory=function GeometryFactory(){this._precisionModel=new PrecisionModel,this._SRID=0,this._coordinateSequenceFactory=GeometryFactory.getDefaultCoordinateSequenceFactory(),0===arguments.length||(1===arguments.length?hasInterface(arguments[0],CoordinateSequenceFactory)?this._coordinateSequenceFactory=arguments[0]:arguments[0]instanceof PrecisionModel&&(this._precisionModel=arguments[0]):2===arguments.length?(this._precisionModel=arguments[0],this._SRID=arguments[1]):3===arguments.length&&(this._precisionModel=arguments[0],this._SRID=arguments[1],this._coordinateSequenceFactory=arguments[2]))},staticAccessors$2={serialVersionUID:{configurable:!0}};GeometryFactory.prototype.toGeometry=function toGeometry(envelope){return envelope.isNull()?this.createPoint(null):envelope.getMinX()===envelope.getMaxX()&&envelope.getMinY()===envelope.getMaxY()?this.createPoint(new Coordinate(envelope.getMinX(),envelope.getMinY())):envelope.getMinX()===envelope.getMaxX()||envelope.getMinY()===envelope.getMaxY()?this.createLineString([new Coordinate(envelope.getMinX(),envelope.getMinY()),new Coordinate(envelope.getMaxX(),envelope.getMaxY())]):this.createPolygon(this.createLinearRing([new Coordinate(envelope.getMinX(),envelope.getMinY()),new Coordinate(envelope.getMinX(),envelope.getMaxY()),new Coordinate(envelope.getMaxX(),envelope.getMaxY()),new Coordinate(envelope.getMaxX(),envelope.getMinY()),new Coordinate(envelope.getMinX(),envelope.getMinY())]),null)},GeometryFactory.prototype.createLineString=function createLineString(coordinates){if(!coordinates)return new LineString$1(this.getCoordinateSequenceFactory().create([]),this);return coordinates instanceof Array?new LineString$1(this.getCoordinateSequenceFactory().create(coordinates),this):hasInterface(coordinates,CoordinateSequence)?new LineString$1(coordinates,this):void 0},GeometryFactory.prototype.createMultiLineString=function createMultiLineString(){if(0===arguments.length)return new MultiLineString(null,this);if(1===arguments.length){var lineStrings=arguments[0];return new MultiLineString(lineStrings,this)}},GeometryFactory.prototype.buildGeometry=function buildGeometry(geomList){for(var geomClass=null,isHeterogeneous=!1,hasGeometryCollection=!1,i=geomList.iterator();i.hasNext();){var geom=i.next(),partClass=geom.getClass();null==geomClass&&(geomClass=partClass),partClass!==geomClass&&(isHeterogeneous=!0),geom.isGeometryCollectionOrDerived()&&(hasGeometryCollection=!0)}if(null===geomClass)return this.createGeometryCollection();if(isHeterogeneous||hasGeometryCollection)return this.createGeometryCollection(GeometryFactory.toGeometryArray(geomList));var geom0=geomList.iterator().next(),isCollection=1<geomList.size();if(isCollection){if(geom0 instanceof Polygon)return this.createMultiPolygon(GeometryFactory.toPolygonArray(geomList));if(geom0 instanceof LineString$1)return this.createMultiLineString(GeometryFactory.toLineStringArray(geomList));if(geom0 instanceof Point)return this.createMultiPoint(GeometryFactory.toPointArray(geomList));Assert.shouldNeverReachHere("Unhandled class: "+geom0.getClass().getName())}return geom0},GeometryFactory.prototype.createMultiPointFromCoords=function createMultiPointFromCoords(coordinates){return this.createMultiPoint(null===coordinates?null:this.getCoordinateSequenceFactory().create(coordinates))},GeometryFactory.prototype.createPoint=function createPoint(){if(0===arguments.length)return this.createPoint(this.getCoordinateSequenceFactory().create([]));if(1===arguments.length){if(arguments[0]instanceof Coordinate){var coordinate=arguments[0];return this.createPoint(null===coordinate?null:this.getCoordinateSequenceFactory().create([coordinate]))}if(hasInterface(arguments[0],CoordinateSequence)){var coordinates=arguments[0];return new Point(coordinates,this)}}},GeometryFactory.prototype.getCoordinateSequenceFactory=function getCoordinateSequenceFactory(){return this._coordinateSequenceFactory},GeometryFactory.prototype.createPolygon=function createPolygon(){if(0===arguments.length)return new Polygon(null,null,this);if(1===arguments.length){if(hasInterface(arguments[0],CoordinateSequence)){var coordinates=arguments[0];return this.createPolygon(this.createLinearRing(coordinates))}if(arguments[0]instanceof Array){var coordinates$1=arguments[0];return this.createPolygon(this.createLinearRing(coordinates$1))}if(arguments[0]instanceof LinearRing){var shell=arguments[0];return this.createPolygon(shell,null)}}else if(2===arguments.length){var shell$1=arguments[0],holes=arguments[1];return new Polygon(shell$1,holes,this)}},GeometryFactory.prototype.getSRID=function getSRID(){return this._SRID},GeometryFactory.prototype.createGeometryCollection=function createGeometryCollection(){if(0===arguments.length)return new GeometryCollection(null,this);if(1===arguments.length){var geometries=arguments[0];return new GeometryCollection(geometries,this)}},GeometryFactory.prototype.createGeometry=function createGeometry(g){var editor=new GeometryEditor(this);return editor.edit(g,{edit:function(){if(2===arguments.length){var coordSeq=arguments[0];return this._coordinateSequenceFactory.create(coordSeq)}}})},GeometryFactory.prototype.getPrecisionModel=function getPrecisionModel(){return this._precisionModel},GeometryFactory.prototype.createLinearRing=function createLinearRing(){if(0===arguments.length)return this.createLinearRing(this.getCoordinateSequenceFactory().create([]));if(1===arguments.length){if(arguments[0]instanceof Array){var coordinates=arguments[0];return this.createLinearRing(null===coordinates?null:this.getCoordinateSequenceFactory().create(coordinates))}if(hasInterface(arguments[0],CoordinateSequence)){var coordinates$1=arguments[0];return new LinearRing(coordinates$1,this)}}},GeometryFactory.prototype.createMultiPolygon=function createMultiPolygon(){if(0===arguments.length)return new MultiPolygon(null,this);if(1===arguments.length){var polygons=arguments[0];return new MultiPolygon(polygons,this)}},GeometryFactory.prototype.createMultiPoint=function createMultiPoint(){var this$1=this;if(0===arguments.length)return new MultiPoint(null,this);if(1===arguments.length){if(arguments[0]instanceof Array){var point=arguments[0];return new MultiPoint(point,this)}if(arguments[0]instanceof Array){var coordinates=arguments[0];return this.createMultiPoint(null===coordinates?null:this.getCoordinateSequenceFactory().create(coordinates))}if(hasInterface(arguments[0],CoordinateSequence)){var coordinates$1=arguments[0];if(null===coordinates$1)return this.createMultiPoint([].fill(null));for(var points=Array(coordinates$1.size()).fill(null),i=0,ptSeq;i<coordinates$1.size();i++)ptSeq=this$1.getCoordinateSequenceFactory().create(1,coordinates$1.getDimension()),CoordinateSequences.copy(coordinates$1,i,ptSeq,0,1),points[i]=this$1.createPoint(ptSeq);return this.createMultiPoint(points)}}},GeometryFactory.prototype.interfaces_=function interfaces_(){return[Serializable]},GeometryFactory.prototype.getClass=function getClass(){return GeometryFactory},GeometryFactory.toMultiPolygonArray=function toMultiPolygonArray(multiPolygons){var multiPolygonArray=Array(multiPolygons.size()).fill(null);return multiPolygons.toArray(multiPolygonArray)},GeometryFactory.toGeometryArray=function toGeometryArray(geometries){if(null===geometries)return null;var geometryArray=Array(geometries.size()).fill(null);return geometries.toArray(geometryArray)},GeometryFactory.getDefaultCoordinateSequenceFactory=function getDefaultCoordinateSequenceFactory(){return CoordinateArraySequenceFactory.instance()},GeometryFactory.toMultiLineStringArray=function toMultiLineStringArray(multiLineStrings){var multiLineStringArray=Array(multiLineStrings.size()).fill(null);return multiLineStrings.toArray(multiLineStringArray)},GeometryFactory.toLineStringArray=function toLineStringArray(lineStrings){var lineStringArray=Array(lineStrings.size()).fill(null);return lineStrings.toArray(lineStringArray)},GeometryFactory.toMultiPointArray=function toMultiPointArray(multiPoints){var multiPointArray=Array(multiPoints.size()).fill(null);return multiPoints.toArray(multiPointArray)},GeometryFactory.toLinearRingArray=function toLinearRingArray(linearRings){var linearRingArray=Array(linearRings.size()).fill(null);return linearRings.toArray(linearRingArray)},GeometryFactory.toPointArray=function toPointArray(points){var pointArray=Array(points.size()).fill(null);return points.toArray(pointArray)},GeometryFactory.toPolygonArray=function toPolygonArray(polygons){var polygonArray=Array(polygons.size()).fill(null);return polygons.toArray(polygonArray)},GeometryFactory.createPointFromInternalCoord=function createPointFromInternalCoord(coord,exemplar){return exemplar.getPrecisionModel().makePrecise(coord),exemplar.getFactory().createPoint(coord)},staticAccessors$2.serialVersionUID.get=function(){return-6820524753094096000},Object.defineProperties(GeometryFactory,staticAccessors$2);var geometryTypes=["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon"],GeoJSONParser=function GeoJSONParser(geometryFactory){this.geometryFactory=geometryFactory||new GeometryFactory};GeoJSONParser.prototype.read=function read(json){var obj;obj="string"==typeof json?JSON.parse(json):json;var type=obj.type;if(!parse[type])throw new Error("Unknown GeoJSON type: "+obj.type);return-1===geometryTypes.indexOf(type)?"GeometryCollection"===type?parse[type].apply(this,[obj.geometries]):parse[type].apply(this,[obj]):parse[type].apply(this,[obj.coordinates])},GeoJSONParser.prototype.write=function write(geometry){var type=geometry.getGeometryType();if(!extract$1$1[type])throw new Error("Geometry is not supported");return extract$1$1[type].apply(this,[geometry])};var parse={Feature:function(obj){var feature={};for(var key in obj)feature[key]=obj[key];if(obj.geometry){var type=obj.geometry.type;if(!parse[type])throw new Error("Unknown GeoJSON type: "+obj.type);feature.geometry=this.read(obj.geometry)}return obj.bbox&&(feature.bbox=parse.bbox.apply(this,[obj.bbox])),feature},FeatureCollection:function(obj){var this$1=this,featureCollection={};if(obj.features){featureCollection.features=[];for(var i=0;i<obj.features.length;++i)featureCollection.features.push(this$1.read(obj.features[i]))}return obj.bbox&&(featureCollection.bbox=this.parse.bbox.apply(this,[obj.bbox])),featureCollection},coordinates:function(array){for(var coordinates=[],i=0,sub;i<array.length;++i)sub=array[i],coordinates.push(new Coordinate(sub[0],sub[1]));return coordinates},bbox:function(array){return this.geometryFactory.createLinearRing([new Coordinate(array[0],array[1]),new Coordinate(array[2],array[1]),new Coordinate(array[2],array[3]),new Coordinate(array[0],array[3]),new Coordinate(array[0],array[1])])},Point:function(array){var coordinate=new Coordinate(array[0],array[1]);return this.geometryFactory.createPoint(coordinate)},MultiPoint:function(array){for(var this$1=this,points=[],i=0;i<array.length;++i)points.push(parse.Point.apply(this$1,[array[i]]));return this.geometryFactory.createMultiPoint(points)},LineString:function(array){var coordinates=parse.coordinates.apply(this,[array]);return this.geometryFactory.createLineString(coordinates)},MultiLineString:function(array){for(var this$1=this,lineStrings=[],i=0;i<array.length;++i)lineStrings.push(parse.LineString.apply(this$1,[array[i]]));return this.geometryFactory.createMultiLineString(lineStrings)},Polygon:function(array){for(var this$1=this,shellCoordinates=parse.coordinates.apply(this,[array[0]]),shell=this.geometryFactory.createLinearRing(shellCoordinates),holes=[],i=1;i<array.length;++i){var hole=array[i],coordinates=parse.coordinates.apply(this$1,[hole]),linearRing=this$1.geometryFactory.createLinearRing(coordinates);holes.push(linearRing)}return this.geometryFactory.createPolygon(shell,holes)},MultiPolygon:function(array){for(var this$1=this,polygons=[],i=0,polygon;i<array.length;++i)polygon=array[i],polygons.push(parse.Polygon.apply(this$1,[polygon]));return this.geometryFactory.createMultiPolygon(polygons)},GeometryCollection:function(array){for(var this$1=this,geometries=[],i=0,geometry;i<array.length;++i)geometry=array[i],geometries.push(this$1.read(geometry));return this.geometryFactory.createGeometryCollection(geometries)}},extract$1$1={coordinate:function(coordinate){return[coordinate.x,coordinate.y]},Point:function(point){var array=extract$1$1.coordinate.apply(this,[point.getCoordinate()]);return{type:"Point",coordinates:array}},MultiPoint:function(multipoint){for(var this$1=this,array=[],i=0;i<multipoint._geometries.length;++i){var point=multipoint._geometries[i],geoJson=extract$1$1.Point.apply(this$1,[point]);array.push(geoJson.coordinates)}return{type:"MultiPoint",coordinates:array}},LineString:function(linestring){for(var this$1=this,array=[],coordinates=linestring.getCoordinates(),i=0,coordinate;i<coordinates.length;++i)coordinate=coordinates[i],array.push(extract$1$1.coordinate.apply(this$1,[coordinate]));return{type:"LineString",coordinates:array}},MultiLineString:function(multilinestring){for(var this$1=this,array=[],i=0;i<multilinestring._geometries.length;++i){var linestring=multilinestring._geometries[i],geoJson=extract$1$1.LineString.apply(this$1,[linestring]);array.push(geoJson.coordinates)}return{type:"MultiLineString",coordinates:array}},Polygon:function(polygon){var this$1=this,array=[],shellGeoJson=extract$1$1.LineString.apply(this,[polygon._shell]);array.push(shellGeoJson.coordinates);for(var i=0;i<polygon._holes.length;++i){var hole=polygon._holes[i],holeGeoJson=extract$1$1.LineString.apply(this$1,[hole]);array.push(holeGeoJson.coordinates)}return{type:"Polygon",coordinates:array}},MultiPolygon:function(multipolygon){for(var this$1=this,array=[],i=0;i<multipolygon._geometries.length;++i){var polygon=multipolygon._geometries[i],geoJson=extract$1$1.Polygon.apply(this$1,[polygon]);array.push(geoJson.coordinates)}return{type:"MultiPolygon",coordinates:array}},GeometryCollection:function(collection){for(var this$1=this,array=[],i=0;i<collection._geometries.length;++i){var geometry=collection._geometries[i],type=geometry.getGeometryType();array.push(extract$1$1[type].apply(this$1,[geometry]))}return{type:"GeometryCollection",geometries:array}}},GeoJSONReader=function GeoJSONReader(geometryFactory){this.geometryFactory=geometryFactory||new GeometryFactory,this.precisionModel=this.geometryFactory.getPrecisionModel(),this.parser=new GeoJSONParser(this.geometryFactory)};GeoJSONReader.prototype.read=function read(geoJson){var geometry=this.parser.read(geoJson);return this.precisionModel.getType()===PrecisionModel.FIXED&&this.reducePrecision(geometry),geometry},GeoJSONReader.prototype.reducePrecision=function reducePrecision(geometry){var this$1=this,i,len;if(geometry.coordinate)this.precisionModel.makePrecise(geometry.coordinate);else if(geometry.points)for(i=0,len=geometry.points.length;i<len;i++)this$1.precisionModel.makePrecise(geometry.points[i]);else if(geometry.geometries)for(i=0,len=geometry.geometries.length;i<len;i++)this$1.reducePrecision(geometry.geometries[i])};var GeoJSONWriter=function GeoJSONWriter(){this.parser=new GeoJSONParser(this.geometryFactory)};GeoJSONWriter.prototype.write=function write(geometry){return this.parser.write(geometry)};var Position=function Position(){},staticAccessors$20={ON:{configurable:!0},LEFT:{configurable:!0},RIGHT:{configurable:!0}};Position.prototype.interfaces_=function interfaces_(){return[]},Position.prototype.getClass=function getClass(){return Position},Position.opposite=function opposite(position){return position===Position.LEFT?Position.RIGHT:position===Position.RIGHT?Position.LEFT:position},staticAccessors$20.ON.get=function(){return 0},staticAccessors$20.LEFT.get=function(){return 1},staticAccessors$20.RIGHT.get=function(){return 2},Object.defineProperties(Position,staticAccessors$20),EmptyStackException.prototype=new Error,EmptyStackException.prototype.name="EmptyStackException",Stack.prototype=new List,Stack.prototype.add=function(e){return this.array_.push(e),!0},Stack.prototype.get=function(index){if(0>index||index>=this.size())throw new Error;return this.array_[index]},Stack.prototype.push=function(e){return this.array_.push(e),e},Stack.prototype.pop=function(e){if(0===this.array_.length)throw new EmptyStackException;return this.array_.pop()},Stack.prototype.peek=function(){if(0===this.array_.length)throw new EmptyStackException;return this.array_[this.array_.length-1]},Stack.prototype.empty=function(){return!(0!==this.array_.length)},Stack.prototype.isEmpty=function(){return this.empty()},Stack.prototype.search=function(o){return this.array_.indexOf(o)},Stack.prototype.size=function(){return this.array_.length},Stack.prototype.toArray=function(){for(var this$1=this,array=[],i=0,len=this.array_.length;i<len;i++)array.push(this$1.array_[i]);return array};var RightmostEdgeFinder=function RightmostEdgeFinder(){this._minIndex=-1,this._minCoord=null,this._minDe=null,this._orientedDe=null};RightmostEdgeFinder.prototype.getCoordinate=function getCoordinate(){return this._minCoord},RightmostEdgeFinder.prototype.getRightmostSide=function getRightmostSide(de,index){var side=this.getRightmostSideOfSegment(de,index);return 0>side&&(side=this.getRightmostSideOfSegment(de,index-1)),0>side&&(this._minCoord=null,this.checkForRightmostCoordinate(de)),side},RightmostEdgeFinder.prototype.findRightmostEdgeAtVertex=function findRightmostEdgeAtVertex(){var pts=this._minDe.getEdge().getCoordinates();Assert.isTrue(0<this._minIndex&&this._minIndex<pts.length,"rightmost point expected to be interior vertex of edge");var pPrev=pts[this._minIndex-1],pNext=pts[this._minIndex+1],orientation=CGAlgorithms.computeOrientation(this._minCoord,pNext,pPrev),usePrev=!1;pPrev.y<this._minCoord.y&&pNext.y<this._minCoord.y&&orientation===CGAlgorithms.COUNTERCLOCKWISE?usePrev=!0:pPrev.y>this._minCoord.y&&pNext.y>this._minCoord.y&&orientation===CGAlgorithms.CLOCKWISE&&(usePrev=!0),usePrev&&--this._minIndex},RightmostEdgeFinder.prototype.getRightmostSideOfSegment=function getRightmostSideOfSegment(de,i){var e=de.getEdge(),coord=e.getCoordinates();if(0>i||i+1>=coord.length)return-1;if(coord[i].y===coord[i+1].y)return-1;var pos=Position.LEFT;return coord[i].y<coord[i+1].y&&(pos=Position.RIGHT),pos},RightmostEdgeFinder.prototype.getEdge=function getEdge(){return this._orientedDe},RightmostEdgeFinder.prototype.checkForRightmostCoordinate=function checkForRightmostCoordinate(de){for(var this$1=this,coord=de.getEdge().getCoordinates(),i=0;i<coord.length-1;i++)(null===this$1._minCoord||coord[i].x>this$1._minCoord.x)&&(this$1._minDe=de,this$1._minIndex=i,this$1._minCoord=coord[i])},RightmostEdgeFinder.prototype.findRightmostEdgeAtNode=function findRightmostEdgeAtNode(){var node=this._minDe.getNode(),star=node.getEdges();this._minDe=star.getRightmostEdge(),this._minDe.isForward()||(this._minDe=this._minDe.getSym(),this._minIndex=this._minDe.getEdge().getCoordinates().length-1)},RightmostEdgeFinder.prototype.findEdge=function findEdge(dirEdgeList){for(var this$1=this,i=dirEdgeList.iterator(),de;i.hasNext();)(de=i.next(),!!de.isForward())&&this$1.checkForRightmostCoordinate(de);Assert.isTrue(0!==this._minIndex||this._minCoord.equals(this._minDe.getCoordinate()),"inconsistency in rightmost processing"),0===this._minIndex?this.findRightmostEdgeAtNode():this.findRightmostEdgeAtVertex(),this._orientedDe=this._minDe;var rightmostSide=this.getRightmostSide(this._minDe,this._minIndex);rightmostSide===Position.LEFT&&(this._orientedDe=this._minDe.getSym())},RightmostEdgeFinder.prototype.interfaces_=function interfaces_(){return[]},RightmostEdgeFinder.prototype.getClass=function getClass(){return RightmostEdgeFinder};var TopologyException=function(RuntimeException$$1){function TopologyException(msg,pt){RuntimeException$$1.call(this,TopologyException.msgWithCoord(msg,pt)),this.pt=pt?new Coordinate(pt):null,this.name="TopologyException"}return RuntimeException$$1&&(TopologyException.__proto__=RuntimeException$$1),TopologyException.prototype=Object.create(RuntimeException$$1&&RuntimeException$$1.prototype),TopologyException.prototype.constructor=TopologyException,TopologyException.prototype.getCoordinate=function getCoordinate(){return this.pt},TopologyException.prototype.interfaces_=function interfaces_(){return[]},TopologyException.prototype.getClass=function getClass(){return TopologyException},TopologyException.msgWithCoord=function msgWithCoord(msg,pt){return pt?msg:msg+" [ "+pt+" ]"},TopologyException}(RuntimeException),LinkedList=function LinkedList(){this.array_=[]};LinkedList.prototype.addLast=function addLast(e){this.array_.push(e)},LinkedList.prototype.removeFirst=function removeFirst(){return this.array_.shift()},LinkedList.prototype.isEmpty=function isEmpty(){return 0===this.array_.length};var BufferSubgraph=function BufferSubgraph(){this._finder=null,this._dirEdgeList=new ArrayList,this._nodes=new ArrayList,this._rightMostCoord=null,this._env=null,this._finder=new RightmostEdgeFinder};BufferSubgraph.prototype.clearVisitedEdges=function clearVisitedEdges(){for(var it=this._dirEdgeList.iterator(),de;it.hasNext();)de=it.next(),de.setVisited(!1)},BufferSubgraph.prototype.getRightmostCoordinate=function getRightmostCoordinate(){return this._rightMostCoord},BufferSubgraph.prototype.computeNodeDepth=function computeNodeDepth(n){for(var this$1=this,startEdge=null,i=n.getEdges().iterator(),de;i.hasNext();)if(de=i.next(),de.isVisited()||de.getSym().isVisited()){startEdge=de;break}if(null===startEdge)throw new TopologyException("unable to find edge to compute depths at "+n.getCoordinate());n.getEdges().computeDepths(startEdge);for(var i$1=n.getEdges().iterator(),de$1;i$1.hasNext();)de$1=i$1.next(),de$1.setVisited(!0),this$1.copySymDepths(de$1)},BufferSubgraph.prototype.computeDepth=function computeDepth(outsideDepth){this.clearVisitedEdges();var de=this._finder.getEdge();de.setEdgeDepths(Position.RIGHT,outsideDepth),this.copySymDepths(de),this.computeDepths(de)},BufferSubgraph.prototype.create=function create(node){this.addReachable(node),this._finder.findEdge(this._dirEdgeList),this._rightMostCoord=this._finder.getCoordinate()},BufferSubgraph.prototype.findResultEdges=function findResultEdges(){for(var it=this._dirEdgeList.iterator(),de;it.hasNext();)de=it.next(),1<=de.getDepth(Position.RIGHT)&&0>=de.getDepth(Position.LEFT)&&!de.isInteriorAreaEdge()&&de.setInResult(!0)},BufferSubgraph.prototype.computeDepths=function computeDepths(startEdge){var this$1=this,nodesVisited=new HashSet,nodeQueue=new LinkedList,startNode=startEdge.getNode();for(nodeQueue.addLast(startNode),nodesVisited.add(startNode),startEdge.setVisited(!0);!nodeQueue.isEmpty();){var n=nodeQueue.removeFirst();nodesVisited.add(n),this$1.computeNodeDepth(n);for(var i=n.getEdges().iterator();i.hasNext();){var de=i.next(),sym=de.getSym();if(!sym.isVisited()){var adjNode=sym.getNode();nodesVisited.contains(adjNode)||(nodeQueue.addLast(adjNode),nodesVisited.add(adjNode))}}}},BufferSubgraph.prototype.compareTo=function compareTo(o){var graph=o;return this._rightMostCoord.x<graph._rightMostCoord.x?-1:this._rightMostCoord.x>graph._rightMostCoord.x?1:0},BufferSubgraph.prototype.getEnvelope=function getEnvelope(){if(null===this._env){for(var edgeEnv=new Envelope,it=this._dirEdgeList.iterator();it.hasNext();)for(var dirEdge=it.next(),pts=dirEdge.getEdge().getCoordinates(),i=0;i<pts.length-1;i++)edgeEnv.expandToInclude(pts[i]);this._env=edgeEnv}return this._env},BufferSubgraph.prototype.addReachable=function addReachable(startNode){var this$1=this,nodeStack=new Stack;for(nodeStack.add(startNode);!nodeStack.empty();){var node=nodeStack.pop();this$1.add(node,nodeStack)}},BufferSubgraph.prototype.copySymDepths=function copySymDepths(de){var sym=de.getSym();sym.setDepth(Position.LEFT,de.getDepth(Position.RIGHT)),sym.setDepth(Position.RIGHT,de.getDepth(Position.LEFT))},BufferSubgraph.prototype.add=function add(node,nodeStack){var this$1=this;node.setVisited(!0),this._nodes.add(node);for(var i=node.getEdges().iterator(),de;i.hasNext();){de=i.next(),this$1._dirEdgeList.add(de);var sym=de.getSym(),symNode=sym.getNode();symNode.isVisited()||nodeStack.push(symNode)}},BufferSubgraph.prototype.getNodes=function getNodes(){return this._nodes},BufferSubgraph.prototype.getDirectedEdges=function getDirectedEdges(){return this._dirEdgeList},BufferSubgraph.prototype.interfaces_=function interfaces_(){return[Comparable]},BufferSubgraph.prototype.getClass=function getClass(){return BufferSubgraph};var TopologyLocation=function TopologyLocation(){var this$1=this;if(this.location=null,1===arguments.length){if(arguments[0]instanceof Array){var location=arguments[0];this.init(location.length)}else if(_NumberisInteger(arguments[0])){var on=arguments[0];this.init(1),this.location[Position.ON]=on}else if(arguments[0]instanceof TopologyLocation){var gl=arguments[0];if(this.init(gl.location.length),null!==gl)for(var i=0;i<this.location.length;i++)this$1.location[i]=gl.location[i]}}else if(3===arguments.length){var on$1=arguments[0],left=arguments[1],right=arguments[2];this.init(3),this.location[Position.ON]=on$1,this.location[Position.LEFT]=left,this.location[Position.RIGHT]=right}};TopologyLocation.prototype.setAllLocations=function setAllLocations(locValue){for(var this$1=this,i=0;i<this.location.length;i++)this$1.location[i]=locValue},TopologyLocation.prototype.isNull=function isNull(){for(var this$1=this,i=0;i<this.location.length;i++)if(this$1.location[i]!==Location.NONE)return!1;return!0},TopologyLocation.prototype.setAllLocationsIfNull=function setAllLocationsIfNull(locValue){for(var this$1=this,i=0;i<this.location.length;i++)this$1.location[i]===Location.NONE&&(this$1.location[i]=locValue)},TopologyLocation.prototype.isLine=function isLine(){return 1===this.location.length},TopologyLocation.prototype.merge=function merge(gl){var this$1=this;if(gl.location.length>this.location.length){var newLoc=[,,,].fill(null);newLoc[Position.ON]=this.location[Position.ON],newLoc[Position.LEFT]=Location.NONE,newLoc[Position.RIGHT]=Location.NONE,this.location=newLoc}for(var i=0;i<this.location.length;i++)this$1.location[i]===Location.NONE&&i<gl.location.length&&(this$1.location[i]=gl.location[i])},TopologyLocation.prototype.getLocations=function getLocations(){return this.location},TopologyLocation.prototype.flip=function flip(){if(1>=this.location.length)return null;var temp=this.location[Position.LEFT];this.location[Position.LEFT]=this.location[Position.RIGHT],this.location[Position.RIGHT]=temp},TopologyLocation.prototype.toString=function toString(){var buf=new StringBuffer;return 1<this.location.length&&buf.append(Location.toLocationSymbol(this.location[Position.LEFT])),buf.append(Location.toLocationSymbol(this.location[Position.ON])),1<this.location.length&&buf.append(Location.toLocationSymbol(this.location[Position.RIGHT])),buf.toString()},TopologyLocation.prototype.setLocations=function setLocations(on,left,right){this.location[Position.ON]=on,this.location[Position.LEFT]=left,this.location[Position.RIGHT]=right},TopologyLocation.prototype.get=function get(posIndex){return posIndex<this.location.length?this.location[posIndex]:Location.NONE},TopologyLocation.prototype.isArea=function isArea(){return 1<this.location.length},TopologyLocation.prototype.isAnyNull=function isAnyNull(){for(var this$1=this,i=0;i<this.location.length;i++)if(this$1.location[i]===Location.NONE)return!0;return!1},TopologyLocation.prototype.setLocation=function setLocation(){if(1===arguments.length){var locValue=arguments[0];this.setLocation(Position.ON,locValue)}else if(2===arguments.length){var locIndex=arguments[0],locValue$1=arguments[1];this.location[locIndex]=locValue$1}},TopologyLocation.prototype.init=function init(size){this.location=Array(size).fill(null),this.setAllLocations(Location.NONE)},TopologyLocation.prototype.isEqualOnSide=function isEqualOnSide(le,locIndex){return this.location[locIndex]===le.location[locIndex]},TopologyLocation.prototype.allPositionsEqual=function allPositionsEqual(loc){for(var this$1=this,i=0;i<this.location.length;i++)if(this$1.location[i]!==loc)return!1;return!0},TopologyLocation.prototype.interfaces_=function interfaces_(){return[]},TopologyLocation.prototype.getClass=function getClass(){return TopologyLocation};var Label=function Label(){if(this.elt=[,,].fill(null),1===arguments.length){if(_NumberisInteger(arguments[0])){var onLoc=arguments[0];this.elt[0]=new TopologyLocation(onLoc),this.elt[1]=new TopologyLocation(onLoc)}else if(arguments[0]instanceof Label){var lbl=arguments[0];this.elt[0]=new TopologyLocation(lbl.elt[0]),this.elt[1]=new TopologyLocation(lbl.elt[1])}}else if(2===arguments.length){var geomIndex=arguments[0],onLoc$1=arguments[1];this.elt[0]=new TopologyLocation(Location.NONE),this.elt[1]=new TopologyLocation(Location.NONE),this.elt[geomIndex].setLocation(onLoc$1)}else if(3===arguments.length){var onLoc$2=arguments[0],leftLoc=arguments[1],rightLoc=arguments[2];this.elt[0]=new TopologyLocation(onLoc$2,leftLoc,rightLoc),this.elt[1]=new TopologyLocation(onLoc$2,leftLoc,rightLoc)}else if(4===arguments.length){var geomIndex$1=arguments[0],onLoc$3=arguments[1],leftLoc$1=arguments[2],rightLoc$1=arguments[3];this.elt[0]=new TopologyLocation(Location.NONE,Location.NONE,Location.NONE),this.elt[1]=new TopologyLocation(Location.NONE,Location.NONE,Location.NONE),this.elt[geomIndex$1].setLocations(onLoc$3,leftLoc$1,rightLoc$1)}};Label.prototype.getGeometryCount=function getGeometryCount(){var count=0;return this.elt[0].isNull()||count++,this.elt[1].isNull()||count++,count},Label.prototype.setAllLocations=function setAllLocations(geomIndex,location){this.elt[geomIndex].setAllLocations(location)},Label.prototype.isNull=function isNull(geomIndex){return this.elt[geomIndex].isNull()},Label.prototype.setAllLocationsIfNull=function setAllLocationsIfNull(){if(1===arguments.length){var location=arguments[0];this.setAllLocationsIfNull(0,location),this.setAllLocationsIfNull(1,location)}else if(2===arguments.length){var geomIndex=arguments[0],location$1=arguments[1];this.elt[geomIndex].setAllLocationsIfNull(location$1)}},Label.prototype.isLine=function isLine(geomIndex){return this.elt[geomIndex].isLine()},Label.prototype.merge=function merge(lbl){for(var this$1=this,i=0;2>i;i++)null===this$1.elt[i]&&null!==lbl.elt[i]?this$1.elt[i]=new TopologyLocation(lbl.elt[i]):this$1.elt[i].merge(lbl.elt[i])},Label.prototype.flip=function flip(){this.elt[0].flip(),this.elt[1].flip()},Label.prototype.getLocation=function getLocation(){if(1===arguments.length){var geomIndex=arguments[0];return this.elt[geomIndex].get(Position.ON)}if(2===arguments.length){var geomIndex$1=arguments[0],posIndex=arguments[1];return this.elt[geomIndex$1].get(posIndex)}},Label.prototype.toString=function toString(){var buf=new StringBuffer;return null!==this.elt[0]&&(buf.append("A:"),buf.append(this.elt[0].toString())),null!==this.elt[1]&&(buf.append(" B:"),buf.append(this.elt[1].toString())),buf.toString()},Label.prototype.isArea=function isArea(){if(0===arguments.length)return this.elt[0].isArea()||this.elt[1].isArea();if(1===arguments.length){var geomIndex=arguments[0];return this.elt[geomIndex].isArea()}},Label.prototype.isAnyNull=function isAnyNull(geomIndex){return this.elt[geomIndex].isAnyNull()},Label.prototype.setLocation=function setLocation(){if(2===arguments.length){var geomIndex=arguments[0],location=arguments[1];this.elt[geomIndex].setLocation(Position.ON,location)}else if(3===arguments.length){var geomIndex$1=arguments[0],posIndex=arguments[1],location$1=arguments[2];this.elt[geomIndex$1].setLocation(posIndex,location$1)}},Label.prototype.isEqualOnSide=function isEqualOnSide(lbl,side){return this.elt[0].isEqualOnSide(lbl.elt[0],side)&&this.elt[1].isEqualOnSide(lbl.elt[1],side)},Label.prototype.allPositionsEqual=function allPositionsEqual(geomIndex,loc){return this.elt[geomIndex].allPositionsEqual(loc)},Label.prototype.toLine=function toLine(geomIndex){this.elt[geomIndex].isArea()&&(this.elt[geomIndex]=new TopologyLocation(this.elt[geomIndex].location[0]))},Label.prototype.interfaces_=function interfaces_(){return[]},Label.prototype.getClass=function getClass(){return Label},Label.toLineLabel=function toLineLabel(label){for(var lineLabel=new Label(Location.NONE),i=0;2>i;i++)lineLabel.setLocation(i,label.getLocation(i));return lineLabel};var EdgeRing$1=function EdgeRing(){this._startDe=null,this._maxNodeDegree=-1,this._edges=new ArrayList,this._pts=new ArrayList,this._label=new Label(Location.NONE),this._ring=null,this._isHole=null,this._shell=null,this._holes=new ArrayList,this._geometryFactory=null;var start=arguments[0],geometryFactory=arguments[1];this._geometryFactory=geometryFactory,this.computePoints(start),this.computeRing()};EdgeRing$1.prototype.computeRing=function computeRing(){var this$1=this;if(null!==this._ring)return null;for(var coord=Array(this._pts.size()).fill(null),i=0;i<this._pts.size();i++)coord[i]=this$1._pts.get(i);this._ring=this._geometryFactory.createLinearRing(coord),this._isHole=CGAlgorithms.isCCW(this._ring.getCoordinates())},EdgeRing$1.prototype.isIsolated=function isIsolated(){return 1===this._label.getGeometryCount()},EdgeRing$1.prototype.computePoints=function computePoints(start){var this$1=this;this._startDe=start;var de=start,isFirstEdge=!0;do{if(null===de)throw new TopologyException("Found null DirectedEdge");if(de.getEdgeRing()===this$1)throw new TopologyException("Directed Edge visited twice during ring-building at "+de.getCoordinate());this$1._edges.add(de);var label=de.getLabel();Assert.isTrue(label.isArea()),this$1.mergeLabel(label),this$1.addPoints(de.getEdge(),de.isForward(),isFirstEdge),isFirstEdge=!1,this$1.setEdgeRing(de,this$1),de=this$1.getNext(de)}while(de!==this._startDe)},EdgeRing$1.prototype.getLinearRing=function getLinearRing(){return this._ring},EdgeRing$1.prototype.getCoordinate=function getCoordinate(i){return this._pts.get(i)},EdgeRing$1.prototype.computeMaxNodeDegree=function computeMaxNodeDegree(){var this$1=this;this._maxNodeDegree=0;var de=this._startDe;do{var node=de.getNode(),degree=node.getEdges().getOutgoingDegree(this$1);degree>this$1._maxNodeDegree&&(this$1._maxNodeDegree=degree),de=this$1.getNext(de)}while(de!==this._startDe);this._maxNodeDegree*=2},EdgeRing$1.prototype.addPoints=function addPoints(edge,isForward,isFirstEdge){var this$1=this,edgePts=edge.getCoordinates();if(isForward){var startIndex=1;isFirstEdge&&(startIndex=0);for(var i=startIndex;i<edgePts.length;i++)this$1._pts.add(edgePts[i])}else{var startIndex$1=edgePts.length-2;isFirstEdge&&(startIndex$1=edgePts.length-1);for(var i$1=startIndex$1;0<=i$1;i$1--)this$1._pts.add(edgePts[i$1])}},EdgeRing$1.prototype.isHole=function isHole(){return this._isHole},EdgeRing$1.prototype.setInResult=function setInResult(){var de=this._startDe;do de.getEdge().setInResult(!0),de=de.getNext();while(de!==this._startDe)},EdgeRing$1.prototype.containsPoint=function containsPoint(p){var shell=this.getLinearRing(),env=shell.getEnvelopeInternal();if(!env.contains(p))return!1;if(!CGAlgorithms.isPointInRing(p,shell.getCoordinates()))return!1;for(var i=this._holes.iterator(),hole;i.hasNext();)if(hole=i.next(),hole.containsPoint(p))return!1;return!0},EdgeRing$1.prototype.addHole=function addHole(ring){this._holes.add(ring)},EdgeRing$1.prototype.isShell=function isShell(){return null===this._shell},EdgeRing$1.prototype.getLabel=function getLabel(){return this._label},EdgeRing$1.prototype.getEdges=function getEdges(){return this._edges},EdgeRing$1.prototype.getMaxNodeDegree=function getMaxNodeDegree(){return 0>this._maxNodeDegree&&this.computeMaxNodeDegree(),this._maxNodeDegree},EdgeRing$1.prototype.getShell=function getShell(){return this._shell},EdgeRing$1.prototype.mergeLabel=function mergeLabel(){if(1===arguments.length){var deLabel=arguments[0];this.mergeLabel(deLabel,0),this.mergeLabel(deLabel,1)}else if(2===arguments.length){var deLabel$1=arguments[0],geomIndex=arguments[1],loc=deLabel$1.getLocation(geomIndex,Position.RIGHT);if(loc===Location.NONE)return null;if(this._label.getLocation(geomIndex)===Location.NONE)return this._label.setLocation(geomIndex,loc),null}},EdgeRing$1.prototype.setShell=function setShell(shell){this._shell=shell,null!==shell&&shell.addHole(this)},EdgeRing$1.prototype.toPolygon=function toPolygon(geometryFactory){for(var this$1=this,holeLR=Array(this._holes.size()).fill(null),i=0;i<this._holes.size();i++)holeLR[i]=this$1._holes.get(i).getLinearRing();var poly=geometryFactory.createPolygon(this.getLinearRing(),holeLR);return poly},EdgeRing$1.prototype.interfaces_=function interfaces_(){return[]},EdgeRing$1.prototype.getClass=function getClass(){return EdgeRing$1};var MinimalEdgeRing=function(EdgeRing$$1){function MinimalEdgeRing(){var start=arguments[0],geometryFactory=arguments[1];EdgeRing$$1.call(this,start,geometryFactory)}return EdgeRing$$1&&(MinimalEdgeRing.__proto__=EdgeRing$$1),MinimalEdgeRing.prototype=Object.create(EdgeRing$$1&&EdgeRing$$1.prototype),MinimalEdgeRing.prototype.constructor=MinimalEdgeRing,MinimalEdgeRing.prototype.setEdgeRing=function setEdgeRing(de,er){de.setMinEdgeRing(er)},MinimalEdgeRing.prototype.getNext=function getNext(de){return de.getNextMin()},MinimalEdgeRing.prototype.interfaces_=function interfaces_(){return[]},MinimalEdgeRing.prototype.getClass=function getClass(){return MinimalEdgeRing},MinimalEdgeRing}(EdgeRing$1),MaximalEdgeRing=function(EdgeRing$$1){function MaximalEdgeRing(){var start=arguments[0],geometryFactory=arguments[1];EdgeRing$$1.call(this,start,geometryFactory)}return EdgeRing$$1&&(MaximalEdgeRing.__proto__=EdgeRing$$1),MaximalEdgeRing.prototype=Object.create(EdgeRing$$1&&EdgeRing$$1.prototype),MaximalEdgeRing.prototype.constructor=MaximalEdgeRing,MaximalEdgeRing.prototype.buildMinimalRings=function buildMinimalRings(){var this$1=this,minEdgeRings=new ArrayList,de=this._startDe;do{if(null===de.getMinEdgeRing()){var minEr=new MinimalEdgeRing(de,this$1._geometryFactory);minEdgeRings.add(minEr)}de=de.getNext()}while(de!==this._startDe);return minEdgeRings},MaximalEdgeRing.prototype.setEdgeRing=function setEdgeRing(de,er){de.setEdgeRing(er)},MaximalEdgeRing.prototype.linkDirectedEdgesForMinimalEdgeRings=function linkDirectedEdgesForMinimalEdgeRings(){var this$1=this,de=this._startDe;do{var node=de.getNode();node.getEdges().linkMinimalDirectedEdges(this$1),de=de.getNext()}while(de!==this._startDe)},MaximalEdgeRing.prototype.getNext=function getNext(de){return de.getNext()},MaximalEdgeRing.prototype.interfaces_=function interfaces_(){return[]},MaximalEdgeRing.prototype.getClass=function getClass(){return MaximalEdgeRing},MaximalEdgeRing}(EdgeRing$1),GraphComponent=function GraphComponent(){if(this._label=null,this._isInResult=!1,this._isCovered=!1,this._isCoveredSet=!1,this._isVisited=!1,0===arguments.length);else if(1===arguments.length){var label=arguments[0];this._label=label}};GraphComponent.prototype.setVisited=function setVisited(isVisited){this._isVisited=isVisited},GraphComponent.prototype.setInResult=function setInResult(isInResult){this._isInResult=isInResult},GraphComponent.prototype.isCovered=function isCovered(){return this._isCovered},GraphComponent.prototype.isCoveredSet=function isCoveredSet(){return this._isCoveredSet},GraphComponent.prototype.setLabel=function setLabel(label){this._label=label},GraphComponent.prototype.getLabel=function getLabel(){return this._label},GraphComponent.prototype.setCovered=function setCovered(isCovered){this._isCovered=isCovered,this._isCoveredSet=!0},GraphComponent.prototype.updateIM=function updateIM(im){Assert.isTrue(2<=this._label.getGeometryCount(),"found partial label"),this.computeIM(im)},GraphComponent.prototype.isInResult=function isInResult(){return this._isInResult},GraphComponent.prototype.isVisited=function isVisited(){return this._isVisited},GraphComponent.prototype.interfaces_=function interfaces_(){return[]},GraphComponent.prototype.getClass=function getClass(){return GraphComponent};var Node$2=function(GraphComponent$$1){function Node(){GraphComponent$$1.call(this),this._coord=null,this._edges=null;var coord=arguments[0],edges=arguments[1];this._coord=coord,this._edges=edges,this._label=new Label(0,Location.NONE)}return GraphComponent$$1&&(Node.__proto__=GraphComponent$$1),Node.prototype=Object.create(GraphComponent$$1&&GraphComponent$$1.prototype),Node.prototype.constructor=Node,Node.prototype.isIncidentEdgeInResult=function isIncidentEdgeInResult(){for(var it=this.getEdges().getEdges().iterator(),de;it.hasNext();)if(de=it.next(),de.getEdge().isInResult())return!0;return!1},Node.prototype.isIsolated=function isIsolated(){return 1===this._label.getGeometryCount()},Node.prototype.getCoordinate=function getCoordinate(){return this._coord},Node.prototype.print=function print(out){out.println("node "+this._coord+" lbl: "+this._label)},Node.prototype.computeIM=function computeIM(im){},Node.prototype.computeMergedLocation=function computeMergedLocation(label2,eltIndex){var loc=Location.NONE;if(loc=this._label.getLocation(eltIndex),!label2.isNull(eltIndex)){var nLoc=label2.getLocation(eltIndex);loc!==Location.BOUNDARY&&(loc=nLoc)}return loc},Node.prototype.setLabel=function setLabel(){if(2===arguments.length){var argIndex=arguments[0],onLocation=arguments[1];null===this._label?this._label=new Label(argIndex,onLocation):this._label.setLocation(argIndex,onLocation)}else return GraphComponent$$1.prototype.setLabel.apply(this,arguments)},Node.prototype.getEdges=function getEdges(){return this._edges},Node.prototype.mergeLabel=function mergeLabel(){var this$1=this;if(arguments[0]instanceof Node){var n=arguments[0];this.mergeLabel(n._label)}else if(arguments[0]instanceof Label)for(var label2=arguments[0],i=0;2>i;i++){var loc=this$1.computeMergedLocation(label2,i),thisLoc=this$1._label.getLocation(i);thisLoc===Location.NONE&&this$1._label.setLocation(i,loc)}},Node.prototype.add=function add(e){this._edges.insert(e),e.setNode(this)},Node.prototype.setLabelBoundary=function setLabelBoundary(argIndex){if(null===this._label)return null;var loc=Location.NONE;null!==this._label&&(loc=this._label.getLocation(argIndex));var newLoc=null;newLoc=loc===Location.BOUNDARY?Location.INTERIOR:loc===Location.INTERIOR?Location.BOUNDARY:Location.BOUNDARY,this._label.setLocation(argIndex,newLoc)},Node.prototype.interfaces_=function interfaces_(){return[]},Node.prototype.getClass=function getClass(){return Node},Node}(GraphComponent),NodeMap=function NodeMap(){this.nodeMap=new TreeMap,this.nodeFact=null;var nodeFact=arguments[0];this.nodeFact=nodeFact};NodeMap.prototype.find=function find(coord){return this.nodeMap.get(coord)},NodeMap.prototype.addNode=function addNode(){if(arguments[0]instanceof Coordinate){var coord=arguments[0],node=this.nodeMap.get(coord);return null===node&&(node=this.nodeFact.createNode(coord),this.nodeMap.put(coord,node)),node}if(arguments[0]instanceof Node$2){var n=arguments[0],node$1=this.nodeMap.get(n.getCoordinate());return null===node$1?(this.nodeMap.put(n.getCoordinate(),n),n):(node$1.mergeLabel(n),node$1)}},NodeMap.prototype.print=function print(out){for(var it=this.iterator(),n;it.hasNext();)n=it.next(),n.print(out)},NodeMap.prototype.iterator=function iterator(){return this.nodeMap.values().iterator()},NodeMap.prototype.values=function values(){return this.nodeMap.values()},NodeMap.prototype.getBoundaryNodes=function getBoundaryNodes(geomIndex){for(var bdyNodes=new ArrayList,i=this.iterator(),node;i.hasNext();)node=i.next(),node.getLabel().getLocation(geomIndex)===Location.BOUNDARY&&bdyNodes.add(node);return bdyNodes},NodeMap.prototype.add=function add(e){var p=e.getCoordinate(),n=this.addNode(p);n.add(e)},NodeMap.prototype.interfaces_=function interfaces_(){return[]},NodeMap.prototype.getClass=function getClass(){return NodeMap};var Quadrant=function Quadrant(){},staticAccessors$21={NE:{configurable:!0},NW:{configurable:!0},SW:{configurable:!0},SE:{configurable:!0}};Quadrant.prototype.interfaces_=function interfaces_(){return[]},Quadrant.prototype.getClass=function getClass(){return Quadrant},Quadrant.isNorthern=function isNorthern(quad){return quad===Quadrant.NE||quad===Quadrant.NW},Quadrant.isOpposite=function isOpposite(quad1,quad2){if(quad1===quad2)return!1;var diff=(quad1-quad2+4)%4;return!(2!=diff)},Quadrant.commonHalfPlane=function commonHalfPlane(quad1,quad2){if(quad1===quad2)return quad1;var diff=(quad1-quad2+4)%4;if(2==diff)return-1;var min=quad1<quad2?quad1:quad2,max=quad1>quad2?quad1:quad2;return 0==min&&3==max?3:min},Quadrant.isInHalfPlane=function isInHalfPlane(quad,halfPlane){return halfPlane===Quadrant.SE?quad===Quadrant.SE||quad===Quadrant.SW:quad===halfPlane||quad===halfPlane+1},Quadrant.quadrant=function quadrant(){if("number"==typeof arguments[0]&&"number"==typeof arguments[1]){var dx=arguments[0],dy=arguments[1];if(0===dx&&0===dy)throw new IllegalArgumentException("Cannot compute the quadrant for point ( "+dx+", "+dy+" )");return 0<=dx?0<=dy?Quadrant.NE:Quadrant.SE:0<=dy?Quadrant.NW:Quadrant.SW}if(arguments[0]instanceof Coordinate&&arguments[1]instanceof Coordinate){var p0=arguments[0],p1=arguments[1];if(p1.x===p0.x&&p1.y===p0.y)throw new IllegalArgumentException("Cannot compute the quadrant for two identical points "+p0);return p1.x>=p0.x?p1.y>=p0.y?Quadrant.NE:Quadrant.SE:p1.y>=p0.y?Quadrant.NW:Quadrant.SW}},staticAccessors$21.NE.get=function(){return 0},staticAccessors$21.NW.get=function(){return 1},staticAccessors$21.SW.get=function(){return 2},staticAccessors$21.SE.get=function(){return 3},Object.defineProperties(Quadrant,staticAccessors$21);var EdgeEnd=function EdgeEnd(){if(this._edge=null,this._label=null,this._node=null,this._p0=null,this._p1=null,this._dx=null,this._dy=null,this._quadrant=null,1===arguments.length){var edge=arguments[0];this._edge=edge}else if(3===arguments.length){var edge$1=arguments[0],p0=arguments[1],p1=arguments[2],label=null;this._edge=edge$1,this.init(p0,p1),this._label=label}else if(4===arguments.length){var edge$2=arguments[0],p0$1=arguments[1],p1$1=arguments[2],label$1=arguments[3];this._edge=edge$2,this.init(p0$1,p1$1),this._label=label$1}};EdgeEnd.prototype.compareDirection=function compareDirection(e){return this._dx===e._dx&&this._dy===e._dy?0:this._quadrant>e._quadrant?1:this._quadrant<e._quadrant?-1:CGAlgorithms.computeOrientation(e._p0,e._p1,this._p1)},EdgeEnd.prototype.getDy=function getDy(){return this._dy},EdgeEnd.prototype.getCoordinate=function getCoordinate(){return this._p0},EdgeEnd.prototype.setNode=function setNode(node){this._node=node},EdgeEnd.prototype.print=function print(out){var angle=_Mathatan(this._dy,this._dx),className=this.getClass().getName(),lastDotPos=className.lastIndexOf("."),name=className.substring(lastDotPos+1);out.print("  "+name+": "+this._p0+" - "+this._p1+" "+this._quadrant+":"+angle+"   "+this._label)},EdgeEnd.prototype.compareTo=function compareTo(obj){var e=obj;return this.compareDirection(e)},EdgeEnd.prototype.getDirectedCoordinate=function getDirectedCoordinate(){return this._p1},EdgeEnd.prototype.getDx=function getDx(){return this._dx},EdgeEnd.prototype.getLabel=function getLabel(){return this._label},EdgeEnd.prototype.getEdge=function getEdge(){return this._edge},EdgeEnd.prototype.getQuadrant=function getQuadrant(){return this._quadrant},EdgeEnd.prototype.getNode=function getNode(){return this._node},EdgeEnd.prototype.toString=function toString(){var angle=_Mathatan(this._dy,this._dx),className=this.getClass().getName(),lastDotPos=className.lastIndexOf("."),name=className.substring(lastDotPos+1);return"  "+name+": "+this._p0+" - "+this._p1+" "+this._quadrant+":"+angle+"   "+this._label},EdgeEnd.prototype.computeLabel=function computeLabel(boundaryNodeRule){},EdgeEnd.prototype.init=function init(p0,p1){this._p0=p0,this._p1=p1,this._dx=p1.x-p0.x,this._dy=p1.y-p0.y,this._quadrant=Quadrant.quadrant(this._dx,this._dy),Assert.isTrue(0!==this._dx||0!==this._dy,"EdgeEnd with identical endpoints found")},EdgeEnd.prototype.interfaces_=function interfaces_(){return[Comparable]},EdgeEnd.prototype.getClass=function getClass(){return EdgeEnd};var DirectedEdge=function(EdgeEnd$$1){function DirectedEdge(){var edge=arguments[0],isForward=arguments[1];if(EdgeEnd$$1.call(this,edge),this._isForward=null,this._isInResult=!1,this._isVisited=!1,this._sym=null,this._next=null,this._nextMin=null,this._edgeRing=null,this._minEdgeRing=null,this._depth=[0,-999,-999],this._isForward=isForward,isForward)this.init(edge.getCoordinate(0),edge.getCoordinate(1));else{var n=edge.getNumPoints()-1;this.init(edge.getCoordinate(n),edge.getCoordinate(n-1))}this.computeDirectedLabel()}return EdgeEnd$$1&&(DirectedEdge.__proto__=EdgeEnd$$1),DirectedEdge.prototype=Object.create(EdgeEnd$$1&&EdgeEnd$$1.prototype),DirectedEdge.prototype.constructor=DirectedEdge,DirectedEdge.prototype.getNextMin=function getNextMin(){return this._nextMin},DirectedEdge.prototype.getDepth=function getDepth(position){return this._depth[position]},DirectedEdge.prototype.setVisited=function setVisited(isVisited){this._isVisited=isVisited},DirectedEdge.prototype.computeDirectedLabel=function computeDirectedLabel(){this._label=new Label(this._edge.getLabel()),this._isForward||this._label.flip()},DirectedEdge.prototype.getNext=function getNext(){return this._next},DirectedEdge.prototype.setDepth=function setDepth(position,depthVal){if(-999!==this._depth[position]&&this._depth[position]!==depthVal)throw new TopologyException("assigned depths do not match",this.getCoordinate());this._depth[position]=depthVal},DirectedEdge.prototype.isInteriorAreaEdge=function isInteriorAreaEdge(){for(var this$1=this,isInteriorAreaEdge=!0,i=0;2>i;i++)this$1._label.isArea(i)&&this$1._label.getLocation(i,Position.LEFT)===Location.INTERIOR&&this$1._label.getLocation(i,Position.RIGHT)===Location.INTERIOR||(isInteriorAreaEdge=!1);return isInteriorAreaEdge},DirectedEdge.prototype.setNextMin=function setNextMin(nextMin){this._nextMin=nextMin},DirectedEdge.prototype.print=function print(out){EdgeEnd$$1.prototype.print.call(this,out),out.print(" "+this._depth[Position.LEFT]+"/"+this._depth[Position.RIGHT]),out.print(" ("+this.getDepthDelta()+")"),this._isInResult&&out.print(" inResult")},DirectedEdge.prototype.setMinEdgeRing=function setMinEdgeRing(minEdgeRing){this._minEdgeRing=minEdgeRing},DirectedEdge.prototype.isLineEdge=function isLineEdge(){var isLine=this._label.isLine(0)||this._label.isLine(1),isExteriorIfArea0=!this._label.isArea(0)||this._label.allPositionsEqual(0,Location.EXTERIOR),isExteriorIfArea1=!this._label.isArea(1)||this._label.allPositionsEqual(1,Location.EXTERIOR);return isLine&&isExteriorIfArea0&&isExteriorIfArea1},DirectedEdge.prototype.setEdgeRing=function setEdgeRing(edgeRing){this._edgeRing=edgeRing},DirectedEdge.prototype.getMinEdgeRing=function getMinEdgeRing(){return this._minEdgeRing},DirectedEdge.prototype.getDepthDelta=function getDepthDelta(){var depthDelta=this._edge.getDepthDelta();return this._isForward||(depthDelta=-depthDelta),depthDelta},DirectedEdge.prototype.setInResult=function setInResult(isInResult){this._isInResult=isInResult},DirectedEdge.prototype.getSym=function getSym(){return this._sym},DirectedEdge.prototype.isForward=function isForward(){return this._isForward},DirectedEdge.prototype.getEdge=function getEdge(){return this._edge},DirectedEdge.prototype.printEdge=function printEdge(out){this.print(out),out.print(" "),this._isForward?this._edge.print(out):this._edge.printReverse(out)},DirectedEdge.prototype.setSym=function setSym(de){this._sym=de},DirectedEdge.prototype.setVisitedEdge=function setVisitedEdge(isVisited){this.setVisited(isVisited),this._sym.setVisited(isVisited)},DirectedEdge.prototype.setEdgeDepths=function setEdgeDepths(position,depth){var depthDelta=this.getEdge().getDepthDelta();this._isForward||(depthDelta=-depthDelta);var directionFactor=1;position===Position.LEFT&&(directionFactor=-1);var oppositePos=Position.opposite(position),delta=depthDelta*directionFactor,oppositeDepth=depth+delta;this.setDepth(position,depth),this.setDepth(oppositePos,oppositeDepth)},DirectedEdge.prototype.getEdgeRing=function getEdgeRing(){return this._edgeRing},DirectedEdge.prototype.isInResult=function isInResult(){return this._isInResult},DirectedEdge.prototype.setNext=function setNext(next){this._next=next},DirectedEdge.prototype.isVisited=function isVisited(){return this._isVisited},DirectedEdge.prototype.interfaces_=function interfaces_(){return[]},DirectedEdge.prototype.getClass=function getClass(){return DirectedEdge},DirectedEdge.depthFactor=function depthFactor(currLocation,nextLocation){return currLocation===Location.EXTERIOR&&nextLocation===Location.INTERIOR?1:currLocation===Location.INTERIOR&&nextLocation===Location.EXTERIOR?-1:0},DirectedEdge}(EdgeEnd),NodeFactory=function NodeFactory(){};NodeFactory.prototype.createNode=function createNode(coord){return new Node$2(coord,null)},NodeFactory.prototype.interfaces_=function interfaces_(){return[]},NodeFactory.prototype.getClass=function getClass(){return NodeFactory};var PlanarGraph=function PlanarGraph(){if(this._edges=new ArrayList,this._nodes=null,this._edgeEndList=new ArrayList,0===arguments.length)this._nodes=new NodeMap(new NodeFactory());else if(1===arguments.length){var nodeFact=arguments[0];this._nodes=new NodeMap(nodeFact)}};PlanarGraph.prototype.printEdges=function printEdges(out){var this$1=this;out.println("Edges:");for(var i=0;i<this._edges.size();i++){out.println("edge "+i+":");var e=this$1._edges.get(i);e.print(out),e.eiList.print(out)}},PlanarGraph.prototype.find=function find(coord){return this._nodes.find(coord)},PlanarGraph.prototype.addNode=function addNode(){if(arguments[0]instanceof Node$2){var node=arguments[0];return this._nodes.addNode(node)}if(arguments[0]instanceof Coordinate){var coord=arguments[0];return this._nodes.addNode(coord)}},PlanarGraph.prototype.getNodeIterator=function getNodeIterator(){return this._nodes.iterator()},PlanarGraph.prototype.linkResultDirectedEdges=function linkResultDirectedEdges(){for(var nodeit=this._nodes.iterator(),node;nodeit.hasNext();)node=nodeit.next(),node.getEdges().linkResultDirectedEdges()},PlanarGraph.prototype.debugPrintln=function debugPrintln(o){System.out.println(o)},PlanarGraph.prototype.isBoundaryNode=function isBoundaryNode(geomIndex,coord){var node=this._nodes.find(coord);if(null===node)return!1;var label=node.getLabel();return null!==label&&label.getLocation(geomIndex)===Location.BOUNDARY},PlanarGraph.prototype.linkAllDirectedEdges=function linkAllDirectedEdges(){for(var nodeit=this._nodes.iterator(),node;nodeit.hasNext();)node=nodeit.next(),node.getEdges().linkAllDirectedEdges()},PlanarGraph.prototype.matchInSameDirection=function matchInSameDirection(p0,p1,ep0,ep1){return!!p0.equals(ep0)&&CGAlgorithms.computeOrientation(p0,p1,ep1)===CGAlgorithms.COLLINEAR&&Quadrant.quadrant(p0,p1)===Quadrant.quadrant(ep0,ep1)},PlanarGraph.prototype.getEdgeEnds=function getEdgeEnds(){return this._edgeEndList},PlanarGraph.prototype.debugPrint=function debugPrint(o){System.out.print(o)},PlanarGraph.prototype.getEdgeIterator=function getEdgeIterator(){return this._edges.iterator()},PlanarGraph.prototype.findEdgeInSameDirection=function findEdgeInSameDirection(p0,p1){for(var this$1=this,i=0;i<this._edges.size();i++){var e=this$1._edges.get(i),eCoord=e.getCoordinates();if(this$1.matchInSameDirection(p0,p1,eCoord[0],eCoord[1]))return e;if(this$1.matchInSameDirection(p0,p1,eCoord[eCoord.length-1],eCoord[eCoord.length-2]))return e}return null},PlanarGraph.prototype.insertEdge=function insertEdge(e){this._edges.add(e)},PlanarGraph.prototype.findEdgeEnd=function findEdgeEnd(e){for(var i=this.getEdgeEnds().iterator(),ee;i.hasNext();)if(ee=i.next(),ee.getEdge()===e)return ee;return null},PlanarGraph.prototype.addEdges=function addEdges(edgesToAdd){for(var this$1=this,it=edgesToAdd.iterator(),e;it.hasNext();){e=it.next(),this$1._edges.add(e);var de1=new DirectedEdge(e,!0),de2=new DirectedEdge(e,!1);de1.setSym(de2),de2.setSym(de1),this$1.add(de1),this$1.add(de2)}},PlanarGraph.prototype.add=function add(e){this._nodes.add(e),this._edgeEndList.add(e)},PlanarGraph.prototype.getNodes=function getNodes(){return this._nodes.values()},PlanarGraph.prototype.findEdge=function findEdge(p0,p1){for(var this$1=this,i=0;i<this._edges.size();i++){var e=this$1._edges.get(i),eCoord=e.getCoordinates();if(p0.equals(eCoord[0])&&p1.equals(eCoord[1]))return e}return null},PlanarGraph.prototype.interfaces_=function interfaces_(){return[]},PlanarGraph.prototype.getClass=function getClass(){return PlanarGraph},PlanarGraph.linkResultDirectedEdges=function linkResultDirectedEdges(nodes){for(var nodeit=nodes.iterator(),node;nodeit.hasNext();)node=nodeit.next(),node.getEdges().linkResultDirectedEdges()};var PolygonBuilder=function PolygonBuilder(){this._geometryFactory=null,this._shellList=new ArrayList;var geometryFactory=arguments[0];this._geometryFactory=geometryFactory};PolygonBuilder.prototype.sortShellsAndHoles=function sortShellsAndHoles(edgeRings,shellList,freeHoleList){for(var it=edgeRings.iterator(),er;it.hasNext();)er=it.next(),er.isHole()?freeHoleList.add(er):shellList.add(er)},PolygonBuilder.prototype.computePolygons=function computePolygons(shellList){for(var this$1=this,resultPolyList=new ArrayList,it=shellList.iterator();it.hasNext();){var er=it.next(),poly=er.toPolygon(this$1._geometryFactory);resultPolyList.add(poly)}return resultPolyList},PolygonBuilder.prototype.placeFreeHoles=function placeFreeHoles(shellList,freeHoleList){for(var this$1=this,it=freeHoleList.iterator(),hole;it.hasNext();)if(hole=it.next(),null===hole.getShell()){var shell=this$1.findEdgeRingContaining(hole,shellList);if(null===shell)throw new TopologyException("unable to assign hole to a shell",hole.getCoordinate(0));hole.setShell(shell)}},PolygonBuilder.prototype.buildMinimalEdgeRings=function buildMinimalEdgeRings(maxEdgeRings,shellList,freeHoleList){for(var this$1=this,edgeRings=new ArrayList,it=maxEdgeRings.iterator(),er;it.hasNext();)if(er=it.next(),2<er.getMaxNodeDegree()){er.linkDirectedEdgesForMinimalEdgeRings();var minEdgeRings=er.buildMinimalRings(),shell=this$1.findShell(minEdgeRings);null===shell?freeHoleList.addAll(minEdgeRings):(this$1.placePolygonHoles(shell,minEdgeRings),shellList.add(shell))}else edgeRings.add(er);return edgeRings},PolygonBuilder.prototype.containsPoint=function containsPoint(p){for(var it=this._shellList.iterator(),er;it.hasNext();)if(er=it.next(),er.containsPoint(p))return!0;return!1},PolygonBuilder.prototype.buildMaximalEdgeRings=function buildMaximalEdgeRings(dirEdges){for(var this$1=this,maxEdgeRings=new ArrayList,it=dirEdges.iterator(),de;it.hasNext();)if(de=it.next(),de.isInResult()&&de.getLabel().isArea()&&null===de.getEdgeRing()){var er=new MaximalEdgeRing(de,this$1._geometryFactory);maxEdgeRings.add(er),er.setInResult()}return maxEdgeRings},PolygonBuilder.prototype.placePolygonHoles=function placePolygonHoles(shell,minEdgeRings){for(var it=minEdgeRings.iterator(),er;it.hasNext();)er=it.next(),er.isHole()&&er.setShell(shell)},PolygonBuilder.prototype.getPolygons=function getPolygons(){var resultPolyList=this.computePolygons(this._shellList);return resultPolyList},PolygonBuilder.prototype.findEdgeRingContaining=function findEdgeRingContaining(testEr,shellList){for(var testRing=testEr.getLinearRing(),testEnv=testRing.getEnvelopeInternal(),testPt=testRing.getCoordinateN(0),minShell=null,minEnv=null,it=shellList.iterator();it.hasNext();){var tryShell=it.next(),tryRing=tryShell.getLinearRing(),tryEnv=tryRing.getEnvelopeInternal();null!=minShell&&(minEnv=minShell.getLinearRing().getEnvelopeInternal());var isContained=!1;tryEnv.contains(testEnv)&&CGAlgorithms.isPointInRing(testPt,tryRing.getCoordinates())&&(isContained=!0),isContained&&(null==minShell||minEnv.contains(tryEnv))&&(minShell=tryShell)}return minShell},PolygonBuilder.prototype.findShell=function findShell(minEdgeRings){for(var shellCount=0,shell=null,it=minEdgeRings.iterator(),er;it.hasNext();)er=it.next(),er.isHole()||(shell=er,shellCount++);return Assert.isTrue(1>=shellCount,"found two shells in MinimalEdgeRing list"),shell},PolygonBuilder.prototype.add=function add(){if(1===arguments.length){var graph=arguments[0];this.add(graph.getEdgeEnds(),graph.getNodes())}else if(2===arguments.length){var dirEdges=arguments[0],nodes=arguments[1];PlanarGraph.linkResultDirectedEdges(nodes);var maxEdgeRings=this.buildMaximalEdgeRings(dirEdges),freeHoleList=new ArrayList,edgeRings=this.buildMinimalEdgeRings(maxEdgeRings,this._shellList,freeHoleList);this.sortShellsAndHoles(edgeRings,this._shellList,freeHoleList),this.placeFreeHoles(this._shellList,freeHoleList)}},PolygonBuilder.prototype.interfaces_=function interfaces_(){return[]},PolygonBuilder.prototype.getClass=function getClass(){return PolygonBuilder};var Boundable=function Boundable(){};Boundable.prototype.getBounds=function getBounds(){},Boundable.prototype.interfaces_=function interfaces_(){return[]},Boundable.prototype.getClass=function getClass(){return Boundable};var ItemBoundable=function ItemBoundable(){this._bounds=null,this._item=null;var bounds=arguments[0],item=arguments[1];this._bounds=bounds,this._item=item};ItemBoundable.prototype.getItem=function getItem(){return this._item},ItemBoundable.prototype.getBounds=function getBounds(){return this._bounds},ItemBoundable.prototype.interfaces_=function interfaces_(){return[Boundable,Serializable]},ItemBoundable.prototype.getClass=function getClass(){return ItemBoundable};var PriorityQueue=function PriorityQueue(){this._size=null,this._items=null,this._size=0,this._items=new ArrayList,this._items.add(null)};PriorityQueue.prototype.poll=function poll(){if(this.isEmpty())return null;var minItem=this._items.get(1);return this._items.set(1,this._items.get(this._size)),this._size-=1,this.reorder(1),minItem},PriorityQueue.prototype.size=function size(){return this._size},PriorityQueue.prototype.reorder=function reorder(hole){for(var this$1=this,child=null,tmp=this._items.get(hole);2*hole<=this._size&&(child=2*hole,child!==this$1._size&&0>this$1._items.get(child+1).compareTo(this$1._items.get(child))&&child++,0>this$1._items.get(child).compareTo(tmp));hole=child)this$1._items.set(hole,this$1._items.get(child));this._items.set(hole,tmp)},PriorityQueue.prototype.clear=function clear(){this._size=0,this._items.clear()},PriorityQueue.prototype.isEmpty=function isEmpty(){return 0===this._size},PriorityQueue.prototype.add=function add(x){var this$1=this;this._items.add(null),this._size+=1;var hole=this._size;for(this._items.set(0,x);0>x.compareTo(this._items.get(_Mathtrunc(hole/2)));hole/=2)this$1._items.set(hole,this$1._items.get(_Mathtrunc(hole/2)));this._items.set(hole,x)},PriorityQueue.prototype.interfaces_=function interfaces_(){return[]},PriorityQueue.prototype.getClass=function getClass(){return PriorityQueue};var ItemVisitor=function ItemVisitor(){};ItemVisitor.prototype.visitItem=function visitItem(item){},ItemVisitor.prototype.interfaces_=function interfaces_(){return[]},ItemVisitor.prototype.getClass=function getClass(){return ItemVisitor};var SpatialIndex=function SpatialIndex(){};SpatialIndex.prototype.insert=function insert(itemEnv,item){},SpatialIndex.prototype.remove=function remove(itemEnv,item){},SpatialIndex.prototype.query=function query(){},SpatialIndex.prototype.interfaces_=function interfaces_(){return[]},SpatialIndex.prototype.getClass=function getClass(){return SpatialIndex};var AbstractNode=function AbstractNode(){if(this._childBoundables=new ArrayList,this._bounds=null,this._level=null,0===arguments.length);else if(1===arguments.length){var level=arguments[0];this._level=level}},staticAccessors$22={serialVersionUID:{configurable:!0}};AbstractNode.prototype.getLevel=function getLevel(){return this._level},AbstractNode.prototype.size=function size(){return this._childBoundables.size()},AbstractNode.prototype.getChildBoundables=function getChildBoundables(){return this._childBoundables},AbstractNode.prototype.addChildBoundable=function addChildBoundable(childBoundable){Assert.isTrue(null===this._bounds),this._childBoundables.add(childBoundable)},AbstractNode.prototype.isEmpty=function isEmpty(){return this._childBoundables.isEmpty()},AbstractNode.prototype.getBounds=function getBounds(){return null===this._bounds&&(this._bounds=this.computeBounds()),this._bounds},AbstractNode.prototype.interfaces_=function interfaces_(){return[Boundable,Serializable]},AbstractNode.prototype.getClass=function getClass(){return AbstractNode},staticAccessors$22.serialVersionUID.get=function(){return 6493722185909574000},Object.defineProperties(AbstractNode,staticAccessors$22);var Collections=function Collections(){};Collections.reverseOrder=function reverseOrder(){return{compare:function compare(a,b){return b.compareTo(a)}}},Collections.min=function min(l){return Collections.sort(l),l.get(0)},Collections.sort=function sort(l,c){var a=l.toArray();c?Arrays.sort(a,c):Arrays.sort(a);for(var i=l.iterator(),pos=0,alen=a.length;pos<alen;pos++)i.next(),i.set(a[pos])},Collections.singletonList=function singletonList(o){var arrayList=new ArrayList;return arrayList.add(o),arrayList};var BoundablePair=function BoundablePair(){this._boundable1=null,this._boundable2=null,this._distance=null,this._itemDistance=null;var boundable1=arguments[0],boundable2=arguments[1],itemDistance=arguments[2];this._boundable1=boundable1,this._boundable2=boundable2,this._itemDistance=itemDistance,this._distance=this.distance()};BoundablePair.prototype.expandToQueue=function expandToQueue(priQ,minDistance){var isComp1=BoundablePair.isComposite(this._boundable1),isComp2=BoundablePair.isComposite(this._boundable2);if(isComp1&&isComp2)return BoundablePair.area(this._boundable1)>BoundablePair.area(this._boundable2)?(this.expand(this._boundable1,this._boundable2,priQ,minDistance),null):(this.expand(this._boundable2,this._boundable1,priQ,minDistance),null);if(isComp1)return this.expand(this._boundable1,this._boundable2,priQ,minDistance),null;if(isComp2)return this.expand(this._boundable2,this._boundable1,priQ,minDistance),null;throw new IllegalArgumentException("neither boundable is composite")},BoundablePair.prototype.isLeaves=function isLeaves(){return!(BoundablePair.isComposite(this._boundable1)||BoundablePair.isComposite(this._boundable2))},BoundablePair.prototype.compareTo=function compareTo(o){var nd=o;return this._distance<nd._distance?-1:this._distance>nd._distance?1:0},BoundablePair.prototype.expand=function expand(bndComposite,bndOther,priQ,minDistance){for(var this$1=this,children=bndComposite.getChildBoundables(),i=children.iterator();i.hasNext();){var child=i.next(),bp=new BoundablePair(child,bndOther,this$1._itemDistance);bp.getDistance()<minDistance&&priQ.add(bp)}},BoundablePair.prototype.getBoundable=function getBoundable(i){return 0===i?this._boundable1:this._boundable2},BoundablePair.prototype.getDistance=function getDistance(){return this._distance},BoundablePair.prototype.distance=function distance(){return this.isLeaves()?this._itemDistance.distance(this._boundable1,this._boundable2):this._boundable1.getBounds().distance(this._boundable2.getBounds())},BoundablePair.prototype.interfaces_=function interfaces_(){return[Comparable]},BoundablePair.prototype.getClass=function getClass(){return BoundablePair},BoundablePair.area=function area(b){return b.getBounds().getArea()},BoundablePair.isComposite=function isComposite(item){return item instanceof AbstractNode};var AbstractSTRtree=function AbstractSTRtree(){if(this._root=null,this._built=!1,this._itemBoundables=new ArrayList,this._nodeCapacity=null,0===arguments.length){var nodeCapacity=AbstractSTRtree.DEFAULT_NODE_CAPACITY;this._nodeCapacity=nodeCapacity}else if(1===arguments.length){var nodeCapacity$1=arguments[0];Assert.isTrue(1<nodeCapacity$1,"Node capacity must be greater than 1"),this._nodeCapacity=nodeCapacity$1}},staticAccessors$23={IntersectsOp:{configurable:!0},serialVersionUID:{configurable:!0},DEFAULT_NODE_CAPACITY:{configurable:!0}};AbstractSTRtree.prototype.getNodeCapacity=function getNodeCapacity(){return this._nodeCapacity},AbstractSTRtree.prototype.lastNode=function lastNode(nodes){return nodes.get(nodes.size()-1)},AbstractSTRtree.prototype.size=function size(){var this$1=this;if(0===arguments.length)return this.isEmpty()?0:(this.build(),this.size(this._root));if(1===arguments.length){for(var node=arguments[0],size=0,i=node.getChildBoundables().iterator(),childBoundable;i.hasNext();)childBoundable=i.next(),childBoundable instanceof AbstractNode?size+=this$1.size(childBoundable):childBoundable instanceof ItemBoundable&&(size+=1);return size}},AbstractSTRtree.prototype.removeItem=function removeItem(node,item){for(var childToRemove=null,i=node.getChildBoundables().iterator(),childBoundable;i.hasNext();)childBoundable=i.next(),childBoundable instanceof ItemBoundable&&childBoundable.getItem()===item&&(childToRemove=childBoundable);return null!==childToRemove&&(node.getChildBoundables().remove(childToRemove),!0)},AbstractSTRtree.prototype.itemsTree=function itemsTree(){var this$1=this;if(0===arguments.length){this.build();var valuesTree=this.itemsTree(this._root);return null===valuesTree?new ArrayList:valuesTree}if(1===arguments.length){for(var node=arguments[0],valuesTreeForNode=new ArrayList,i=node.getChildBoundables().iterator(),childBoundable;i.hasNext();)if(childBoundable=i.next(),childBoundable instanceof AbstractNode){var valuesTreeForChild=this$1.itemsTree(childBoundable);null!==valuesTreeForChild&&valuesTreeForNode.add(valuesTreeForChild)}else childBoundable instanceof ItemBoundable?valuesTreeForNode.add(childBoundable.getItem()):Assert.shouldNeverReachHere();return 0>=valuesTreeForNode.size()?null:valuesTreeForNode}},AbstractSTRtree.prototype.insert=function insert(bounds,item){Assert.isTrue(!this._built,"Cannot insert items into an STR packed R-tree after it has been built."),this._itemBoundables.add(new ItemBoundable(bounds,item))},AbstractSTRtree.prototype.boundablesAtLevel=function boundablesAtLevel(){var this$1=this;if(1===arguments.length){var level=arguments[0],boundables=new ArrayList;return this.boundablesAtLevel(level,this._root,boundables),boundables}if(3===arguments.length){var level$1=arguments[0],top=arguments[1],boundables$1=arguments[2];if(Assert.isTrue(-2<level$1),top.getLevel()===level$1)return boundables$1.add(top),null;for(var i=top.getChildBoundables().iterator(),boundable;i.hasNext();)boundable=i.next(),boundable instanceof AbstractNode?this$1.boundablesAtLevel(level$1,boundable,boundables$1):(Assert.isTrue(boundable instanceof ItemBoundable),-1===level$1&&boundables$1.add(boundable));return null}},AbstractSTRtree.prototype.query=function query(){var this$1=this;if(1===arguments.length){var searchBounds=arguments[0];this.build();var matches=new ArrayList;return this.isEmpty()?matches:(this.getIntersectsOp().intersects(this._root.getBounds(),searchBounds)&&this.query(searchBounds,this._root,matches),matches)}if(2===arguments.length){var searchBounds$1=arguments[0],visitor=arguments[1];if(this.build(),this.isEmpty())return null;this.getIntersectsOp().intersects(this._root.getBounds(),searchBounds$1)&&this.query(searchBounds$1,this._root,visitor)}else if(3===arguments.length)if(hasInterface(arguments[2],ItemVisitor)&&arguments[0]instanceof Object&&arguments[1]instanceof AbstractNode)for(var searchBounds$2=arguments[0],node=arguments[1],visitor$1=arguments[2],childBoundables=node.getChildBoundables(),i=0,childBoundable;i<childBoundables.size();i++)(childBoundable=childBoundables.get(i),!!this$1.getIntersectsOp().intersects(childBoundable.getBounds(),searchBounds$2))&&(childBoundable instanceof AbstractNode?this$1.query(searchBounds$2,childBoundable,visitor$1):childBoundable instanceof ItemBoundable?visitor$1.visitItem(childBoundable.getItem()):Assert.shouldNeverReachHere());else if(hasInterface(arguments[2],List)&&arguments[0]instanceof Object&&arguments[1]instanceof AbstractNode)for(var searchBounds$3=arguments[0],node$1=arguments[1],matches$1=arguments[2],childBoundables$1=node$1.getChildBoundables(),i$1=0,childBoundable$1;i$1<childBoundables$1.size();i$1++)(childBoundable$1=childBoundables$1.get(i$1),!!this$1.getIntersectsOp().intersects(childBoundable$1.getBounds(),searchBounds$3))&&(childBoundable$1 instanceof AbstractNode?this$1.query(searchBounds$3,childBoundable$1,matches$1):childBoundable$1 instanceof ItemBoundable?matches$1.add(childBoundable$1.getItem()):Assert.shouldNeverReachHere())},AbstractSTRtree.prototype.build=function build(){return this._built?null:void(this._root=this._itemBoundables.isEmpty()?this.createNode(0):this.createHigherLevels(this._itemBoundables,-1),this._itemBoundables=null,this._built=!0)},AbstractSTRtree.prototype.getRoot=function getRoot(){return this.build(),this._root},AbstractSTRtree.prototype.remove=function remove(){var this$1=this;if(2===arguments.length){var searchBounds=arguments[0],item=arguments[1];return this.build(),!!this.getIntersectsOp().intersects(this._root.getBounds(),searchBounds)&&this.remove(searchBounds,this._root,item)}if(3===arguments.length){var searchBounds$1=arguments[0],node=arguments[1],item$1=arguments[2],found=this.removeItem(node,item$1);if(found)return!0;for(var childToPrune=null,i=node.getChildBoundables().iterator(),childBoundable;i.hasNext();)if((childBoundable=i.next(),!!this$1.getIntersectsOp().intersects(childBoundable.getBounds(),searchBounds$1))&&childBoundable instanceof AbstractNode&&(found=this$1.remove(searchBounds$1,childBoundable,item$1),found)){childToPrune=childBoundable;break}return null!==childToPrune&&childToPrune.getChildBoundables().isEmpty()&&node.getChildBoundables().remove(childToPrune),found}},AbstractSTRtree.prototype.createHigherLevels=function createHigherLevels(boundablesOfALevel,level){Assert.isTrue(!boundablesOfALevel.isEmpty());var parentBoundables=this.createParentBoundables(boundablesOfALevel,level+1);return 1===parentBoundables.size()?parentBoundables.get(0):this.createHigherLevels(parentBoundables,level+1)},AbstractSTRtree.prototype.depth=function depth(){var this$1=this;if(0===arguments.length)return this.isEmpty()?0:(this.build(),this.depth(this._root));if(1===arguments.length){for(var node=arguments[0],maxChildDepth=0,i=node.getChildBoundables().iterator(),childBoundable;i.hasNext();)if(childBoundable=i.next(),childBoundable instanceof AbstractNode){var childDepth=this$1.depth(childBoundable);childDepth>maxChildDepth&&(maxChildDepth=childDepth)}return maxChildDepth+1}},AbstractSTRtree.prototype.createParentBoundables=function createParentBoundables(childBoundables,newLevel){var this$1=this;Assert.isTrue(!childBoundables.isEmpty());var parentBoundables=new ArrayList;parentBoundables.add(this.createNode(newLevel));var sortedChildBoundables=new ArrayList(childBoundables);Collections.sort(sortedChildBoundables,this.getComparator());for(var i=sortedChildBoundables.iterator(),childBoundable;i.hasNext();)childBoundable=i.next(),this$1.lastNode(parentBoundables).getChildBoundables().size()===this$1.getNodeCapacity()&&parentBoundables.add(this$1.createNode(newLevel)),this$1.lastNode(parentBoundables).addChildBoundable(childBoundable);return parentBoundables},AbstractSTRtree.prototype.isEmpty=function isEmpty(){return this._built?this._root.isEmpty():this._itemBoundables.isEmpty()},AbstractSTRtree.prototype.interfaces_=function interfaces_(){return[Serializable]},AbstractSTRtree.prototype.getClass=function getClass(){return AbstractSTRtree},AbstractSTRtree.compareDoubles=function compareDoubles(a,b){return a>b?1:a<b?-1:0},staticAccessors$23.IntersectsOp.get=function(){return IntersectsOp},staticAccessors$23.serialVersionUID.get=function(){return-3886435814360241000},staticAccessors$23.DEFAULT_NODE_CAPACITY.get=function(){return 10},Object.defineProperties(AbstractSTRtree,staticAccessors$23);var IntersectsOp=function IntersectsOp(){},ItemDistance=function ItemDistance(){};ItemDistance.prototype.distance=function distance(item1,item2){},ItemDistance.prototype.interfaces_=function interfaces_(){return[]},ItemDistance.prototype.getClass=function getClass(){return ItemDistance};var STRtree=function(AbstractSTRtree$$1){function STRtree(nodeCapacity){nodeCapacity=nodeCapacity||STRtree.DEFAULT_NODE_CAPACITY,AbstractSTRtree$$1.call(this,nodeCapacity)}AbstractSTRtree$$1&&(STRtree.__proto__=AbstractSTRtree$$1),STRtree.prototype=Object.create(AbstractSTRtree$$1&&AbstractSTRtree$$1.prototype),STRtree.prototype.constructor=STRtree;var staticAccessors={STRtreeNode:{configurable:!0},serialVersionUID:{configurable:!0},xComparator:{configurable:!0},yComparator:{configurable:!0},intersectsOp:{configurable:!0},DEFAULT_NODE_CAPACITY:{configurable:!0}};return STRtree.prototype.createParentBoundablesFromVerticalSlices=function createParentBoundablesFromVerticalSlices(verticalSlices,newLevel){var this$1=this;Assert.isTrue(0<verticalSlices.length);for(var parentBoundables=new ArrayList,i=0;i<verticalSlices.length;i++)parentBoundables.addAll(this$1.createParentBoundablesFromVerticalSlice(verticalSlices[i],newLevel));return parentBoundables},STRtree.prototype.createNode=function createNode(level){return new STRtreeNode(level)},STRtree.prototype.size=function size(){return 0===arguments.length?AbstractSTRtree$$1.prototype.size.call(this):AbstractSTRtree$$1.prototype.size.apply(this,arguments)},STRtree.prototype.insert=function insert(){if(2===arguments.length){var itemEnv=arguments[0],item=arguments[1];if(itemEnv.isNull())return null;AbstractSTRtree$$1.prototype.insert.call(this,itemEnv,item)}else return AbstractSTRtree$$1.prototype.insert.apply(this,arguments)},STRtree.prototype.getIntersectsOp=function getIntersectsOp(){return STRtree.intersectsOp},STRtree.prototype.verticalSlices=function verticalSlices(childBoundables,sliceCount){for(var sliceCapacity=_Mathtrunc(_Mathceil(childBoundables.size()/sliceCount)),slices=Array(sliceCount).fill(null),i=childBoundables.iterator(),j=0;j<sliceCount;j++){slices[j]=new ArrayList;for(var boundablesAddedToSlice=0,childBoundable;i.hasNext()&&boundablesAddedToSlice<sliceCapacity;)childBoundable=i.next(),slices[j].add(childBoundable),boundablesAddedToSlice++}return slices},STRtree.prototype.query=function query(){if(1===arguments.length){var searchEnv=arguments[0];return AbstractSTRtree$$1.prototype.query.call(this,searchEnv)}if(2===arguments.length){var searchEnv$1=arguments[0],visitor=arguments[1];AbstractSTRtree$$1.prototype.query.call(this,searchEnv$1,visitor)}else if(3===arguments.length)if(hasInterface(arguments[2],ItemVisitor)&&arguments[0]instanceof Object&&arguments[1]instanceof AbstractNode){var searchBounds=arguments[0],node=arguments[1],visitor$1=arguments[2];AbstractSTRtree$$1.prototype.query.call(this,searchBounds,node,visitor$1)}else if(hasInterface(arguments[2],List)&&arguments[0]instanceof Object&&arguments[1]instanceof AbstractNode){var searchBounds$1=arguments[0],node$1=arguments[1],matches=arguments[2];AbstractSTRtree$$1.prototype.query.call(this,searchBounds$1,node$1,matches)}},STRtree.prototype.getComparator=function getComparator(){return STRtree.yComparator},STRtree.prototype.createParentBoundablesFromVerticalSlice=function createParentBoundablesFromVerticalSlice(childBoundables,newLevel){return AbstractSTRtree$$1.prototype.createParentBoundables.call(this,childBoundables,newLevel)},STRtree.prototype.remove=function remove(){if(2===arguments.length){var itemEnv=arguments[0],item=arguments[1];return AbstractSTRtree$$1.prototype.remove.call(this,itemEnv,item)}return AbstractSTRtree$$1.prototype.remove.apply(this,arguments)},STRtree.prototype.depth=function depth(){return 0===arguments.length?AbstractSTRtree$$1.prototype.depth.call(this):AbstractSTRtree$$1.prototype.depth.apply(this,arguments)},STRtree.prototype.createParentBoundables=function createParentBoundables(childBoundables,newLevel){Assert.isTrue(!childBoundables.isEmpty());var minLeafCount=_Mathtrunc(_Mathceil(childBoundables.size()/this.getNodeCapacity())),sortedChildBoundables=new ArrayList(childBoundables);Collections.sort(sortedChildBoundables,STRtree.xComparator);var verticalSlices=this.verticalSlices(sortedChildBoundables,_Mathtrunc(_Mathceil(_Mathsqrt(minLeafCount))));return this.createParentBoundablesFromVerticalSlices(verticalSlices,newLevel)},STRtree.prototype.nearestNeighbour=function nearestNeighbour(){if(1===arguments.length){if(hasInterface(arguments[0],ItemDistance)){var itemDist=arguments[0],bp=new BoundablePair(this.getRoot(),this.getRoot(),itemDist);return this.nearestNeighbour(bp)}if(arguments[0]instanceof BoundablePair){var initBndPair=arguments[0];return this.nearestNeighbour(initBndPair,Double.POSITIVE_INFINITY)}}else if(2===arguments.length){if(arguments[0]instanceof STRtree&&hasInterface(arguments[1],ItemDistance)){var tree=arguments[0],itemDist$1=arguments[1],bp$1=new BoundablePair(this.getRoot(),tree.getRoot(),itemDist$1);return this.nearestNeighbour(bp$1)}if(arguments[0]instanceof BoundablePair&&"number"==typeof arguments[1]){var initBndPair$1=arguments[0],maxDistance=arguments[1],distanceLowerBound=maxDistance,minPair=null,priQ=new PriorityQueue;for(priQ.add(initBndPair$1);!priQ.isEmpty()&&0<distanceLowerBound;){var bndPair=priQ.poll(),currentDistance=bndPair.getDistance();if(currentDistance>=distanceLowerBound)break;bndPair.isLeaves()?(distanceLowerBound=currentDistance,minPair=bndPair):bndPair.expandToQueue(priQ,distanceLowerBound)}return[minPair.getBoundable(0).getItem(),minPair.getBoundable(1).getItem()]}}else if(3===arguments.length){var env=arguments[0],item=arguments[1],itemDist$2=arguments[2],bnd=new ItemBoundable(env,item),bp$2=new BoundablePair(this.getRoot(),bnd,itemDist$2);return this.nearestNeighbour(bp$2)[0]}},STRtree.prototype.interfaces_=function interfaces_(){return[SpatialIndex,Serializable]},STRtree.prototype.getClass=function getClass(){return STRtree},STRtree.centreX=function centreX(e){return STRtree.avg(e.getMinX(),e.getMaxX())},STRtree.avg=function avg(a,b){return(a+b)/2},STRtree.centreY=function centreY(e){return STRtree.avg(e.getMinY(),e.getMaxY())},staticAccessors.STRtreeNode.get=function(){return STRtreeNode},staticAccessors.serialVersionUID.get=function(){return 259274702368956900},staticAccessors.xComparator.get=function(){return{interfaces_:function(){return[Comparator]},compare:function(o1,o2){return AbstractSTRtree$$1.compareDoubles(STRtree.centreX(o1.getBounds()),STRtree.centreX(o2.getBounds()))}}},staticAccessors.yComparator.get=function(){return{interfaces_:function(){return[Comparator]},compare:function(o1,o2){return AbstractSTRtree$$1.compareDoubles(STRtree.centreY(o1.getBounds()),STRtree.centreY(o2.getBounds()))}}},staticAccessors.intersectsOp.get=function(){return{interfaces_:function(){return[AbstractSTRtree$$1.IntersectsOp]},intersects:function(aBounds,bBounds){return aBounds.intersects(bBounds)}}},staticAccessors.DEFAULT_NODE_CAPACITY.get=function(){return 10},Object.defineProperties(STRtree,staticAccessors),STRtree}(AbstractSTRtree),STRtreeNode=function(AbstractNode$$1){function STRtreeNode(){var level=arguments[0];AbstractNode$$1.call(this,level)}return AbstractNode$$1&&(STRtreeNode.__proto__=AbstractNode$$1),STRtreeNode.prototype=Object.create(AbstractNode$$1&&AbstractNode$$1.prototype),STRtreeNode.prototype.constructor=STRtreeNode,STRtreeNode.prototype.computeBounds=function computeBounds(){for(var bounds=null,i=this.getChildBoundables().iterator(),childBoundable;i.hasNext();)childBoundable=i.next(),null==bounds?bounds=new Envelope(childBoundable.getBounds()):bounds.expandToInclude(childBoundable.getBounds());return bounds},STRtreeNode.prototype.interfaces_=function interfaces_(){return[]},STRtreeNode.prototype.getClass=function getClass(){return STRtreeNode},STRtreeNode}(AbstractNode),SegmentPointComparator=function SegmentPointComparator(){};SegmentPointComparator.prototype.interfaces_=function interfaces_(){return[]},SegmentPointComparator.prototype.getClass=function getClass(){return SegmentPointComparator},SegmentPointComparator.relativeSign=function relativeSign(x0,x1){return x0<x1?-1:x0>x1?1:0},SegmentPointComparator.compare=function compare(octant,p0,p1){if(p0.equals2D(p1))return 0;var xSign=SegmentPointComparator.relativeSign(p0.x,p1.x),ySign=SegmentPointComparator.relativeSign(p0.y,p1.y);switch(octant){case 0:return SegmentPointComparator.compareValue(xSign,ySign);case 1:return SegmentPointComparator.compareValue(ySign,xSign);case 2:return SegmentPointComparator.compareValue(ySign,-xSign);case 3:return SegmentPointComparator.compareValue(-xSign,ySign);case 4:return SegmentPointComparator.compareValue(-xSign,-ySign);case 5:return SegmentPointComparator.compareValue(-ySign,-xSign);case 6:return SegmentPointComparator.compareValue(-ySign,xSign);case 7:return SegmentPointComparator.compareValue(xSign,-ySign);default:}return Assert.shouldNeverReachHere("invalid octant value"),0},SegmentPointComparator.compareValue=function compareValue(compareSign0,compareSign1){return 0>compareSign0?-1:0<compareSign0?1:0>compareSign1?-1:0<compareSign1?1:0};var SegmentNode=function SegmentNode(){this._segString=null,this.coord=null,this.segmentIndex=null,this._segmentOctant=null,this._isInterior=null;var segString=arguments[0],coord=arguments[1],segmentIndex=arguments[2],segmentOctant=arguments[3];this._segString=segString,this.coord=new Coordinate(coord),this.segmentIndex=segmentIndex,this._segmentOctant=segmentOctant,this._isInterior=!coord.equals2D(segString.getCoordinate(segmentIndex))};SegmentNode.prototype.getCoordinate=function getCoordinate(){return this.coord},SegmentNode.prototype.print=function print(out){out.print(this.coord),out.print(" seg # = "+this.segmentIndex)},SegmentNode.prototype.compareTo=function compareTo(obj){var other=obj;return this.segmentIndex<other.segmentIndex?-1:this.segmentIndex>other.segmentIndex?1:this.coord.equals2D(other.coord)?0:SegmentPointComparator.compare(this._segmentOctant,this.coord,other.coord)},SegmentNode.prototype.isEndPoint=function isEndPoint(maxSegmentIndex){return 0!==this.segmentIndex||this._isInterior?!(this.segmentIndex!==maxSegmentIndex):!0},SegmentNode.prototype.isInterior=function isInterior(){return this._isInterior},SegmentNode.prototype.interfaces_=function interfaces_(){return[Comparable]},SegmentNode.prototype.getClass=function getClass(){return SegmentNode};var SegmentNodeList=function SegmentNodeList(){this._nodeMap=new TreeMap,this._edge=null;var edge=arguments[0];this._edge=edge};SegmentNodeList.prototype.getSplitCoordinates=function getSplitCoordinates(){var this$1=this,coordList=new CoordinateList;this.addEndpoints();for(var it=this.iterator(),eiPrev=it.next();it.hasNext();){var ei=it.next();this$1.addEdgeCoordinates(eiPrev,ei,coordList),eiPrev=ei}return coordList.toCoordinateArray()},SegmentNodeList.prototype.addCollapsedNodes=function addCollapsedNodes(){var this$1=this,collapsedVertexIndexes=new ArrayList;this.findCollapsesFromInsertedNodes(collapsedVertexIndexes),this.findCollapsesFromExistingVertices(collapsedVertexIndexes);for(var it=collapsedVertexIndexes.iterator(),vertexIndex;it.hasNext();)vertexIndex=it.next().intValue(),this$1.add(this$1._edge.getCoordinate(vertexIndex),vertexIndex)},SegmentNodeList.prototype.print=function print(out){out.println("Intersections:");for(var it=this.iterator(),ei;it.hasNext();)ei=it.next(),ei.print(out)},SegmentNodeList.prototype.findCollapsesFromExistingVertices=function findCollapsesFromExistingVertices(collapsedVertexIndexes){for(var this$1=this,i=0;i<this._edge.size()-2;i++){var p0=this$1._edge.getCoordinate(i),p2=this$1._edge.getCoordinate(i+2);p0.equals2D(p2)&&collapsedVertexIndexes.add(new Integer(i+1))}},SegmentNodeList.prototype.addEdgeCoordinates=function addEdgeCoordinates(ei0,ei1,coordList){var this$1=this,lastSegStartPt=this._edge.getCoordinate(ei1.segmentIndex),useIntPt1=ei1.isInterior()||!ei1.coord.equals2D(lastSegStartPt);coordList.add(new Coordinate(ei0.coord),!1);for(var i=ei0.segmentIndex+1;i<=ei1.segmentIndex;i++)coordList.add(this$1._edge.getCoordinate(i));useIntPt1&&coordList.add(new Coordinate(ei1.coord))},SegmentNodeList.prototype.iterator=function iterator(){return this._nodeMap.values().iterator()},SegmentNodeList.prototype.addSplitEdges=function addSplitEdges(edgeList){var this$1=this;this.addEndpoints(),this.addCollapsedNodes();for(var it=this.iterator(),eiPrev=it.next();it.hasNext();){var ei=it.next(),newEdge=this$1.createSplitEdge(eiPrev,ei);edgeList.add(newEdge),eiPrev=ei}},SegmentNodeList.prototype.findCollapseIndex=function findCollapseIndex(ei0,ei1,collapsedVertexIndex){if(!ei0.coord.equals2D(ei1.coord))return!1;var numVerticesBetween=ei1.segmentIndex-ei0.segmentIndex;return ei1.isInterior()||numVerticesBetween--,1==numVerticesBetween&&(collapsedVertexIndex[0]=ei0.segmentIndex+1,!0)},SegmentNodeList.prototype.findCollapsesFromInsertedNodes=function findCollapsesFromInsertedNodes(collapsedVertexIndexes){for(var this$1=this,collapsedVertexIndex=[,].fill(null),it=this.iterator(),eiPrev=it.next();it.hasNext();){var ei=it.next(),isCollapsed=this$1.findCollapseIndex(eiPrev,ei,collapsedVertexIndex);isCollapsed&&collapsedVertexIndexes.add(new Integer(collapsedVertexIndex[0])),eiPrev=ei}},SegmentNodeList.prototype.getEdge=function getEdge(){return this._edge},SegmentNodeList.prototype.addEndpoints=function addEndpoints(){var maxSegIndex=this._edge.size()-1;this.add(this._edge.getCoordinate(0),0),this.add(this._edge.getCoordinate(maxSegIndex),maxSegIndex)},SegmentNodeList.prototype.createSplitEdge=function createSplitEdge(ei0,ei1){var this$1=this,npts=ei1.segmentIndex-ei0.segmentIndex+2,lastSegStartPt=this._edge.getCoordinate(ei1.segmentIndex),useIntPt1=ei1.isInterior()||!ei1.coord.equals2D(lastSegStartPt);useIntPt1||npts--;var pts=Array(npts).fill(null),ipt=0;pts[ipt++]=new Coordinate(ei0.coord);for(var i=ei0.segmentIndex+1;i<=ei1.segmentIndex;i++)pts[ipt++]=this$1._edge.getCoordinate(i);return useIntPt1&&(pts[ipt]=new Coordinate(ei1.coord)),new NodedSegmentString(pts,this._edge.getData())},SegmentNodeList.prototype.add=function add(intPt,segmentIndex){var eiNew=new SegmentNode(this._edge,intPt,segmentIndex,this._edge.getSegmentOctant(segmentIndex)),ei=this._nodeMap.get(eiNew);return null===ei?(this._nodeMap.put(eiNew,eiNew),eiNew):(Assert.isTrue(ei.coord.equals2D(intPt),"Found equal nodes with different coordinates"),ei)},SegmentNodeList.prototype.checkSplitEdgesCorrectness=function checkSplitEdgesCorrectness(splitEdges){var edgePts=this._edge.getCoordinates(),split0=splitEdges.get(0),pt0=split0.getCoordinate(0);if(!pt0.equals2D(edgePts[0]))throw new RuntimeException("bad split edge start point at "+pt0);var splitn=splitEdges.get(splitEdges.size()-1),splitnPts=splitn.getCoordinates(),ptn=splitnPts[splitnPts.length-1];if(!ptn.equals2D(edgePts[edgePts.length-1]))throw new RuntimeException("bad split edge end point at "+ptn)},SegmentNodeList.prototype.interfaces_=function interfaces_(){return[]},SegmentNodeList.prototype.getClass=function getClass(){return SegmentNodeList};var Octant=function Octant(){};Octant.prototype.interfaces_=function interfaces_(){return[]},Octant.prototype.getClass=function getClass(){return Octant},Octant.octant=function octant(){if("number"==typeof arguments[0]&&"number"==typeof arguments[1]){var dx=arguments[0],dy=arguments[1];if(0===dx&&0===dy)throw new IllegalArgumentException("Cannot compute the octant for point ( "+dx+", "+dy+" )");var adx=_Mathabs(dx),ady=_Mathabs(dy);return 0<=dx?0<=dy?adx>=ady?0:1:adx>=ady?7:6:0<=dy?adx>=ady?3:2:adx>=ady?4:5}if(arguments[0]instanceof Coordinate&&arguments[1]instanceof Coordinate){var p0=arguments[0],p1=arguments[1],dx$1=p1.x-p0.x,dy$1=p1.y-p0.y;if(0==dx$1&&0==dy$1)throw new IllegalArgumentException("Cannot compute the octant for two identical points "+p0);return Octant.octant(dx$1,dy$1)}};var SegmentString=function SegmentString(){};SegmentString.prototype.getCoordinates=function getCoordinates(){},SegmentString.prototype.size=function size(){},SegmentString.prototype.getCoordinate=function getCoordinate(i){},SegmentString.prototype.isClosed=function isClosed(){},SegmentString.prototype.setData=function setData(data){},SegmentString.prototype.getData=function getData(){},SegmentString.prototype.interfaces_=function interfaces_(){return[]},SegmentString.prototype.getClass=function getClass(){return SegmentString};var NodableSegmentString=function NodableSegmentString(){};NodableSegmentString.prototype.addIntersection=function addIntersection(intPt,segmentIndex){},NodableSegmentString.prototype.interfaces_=function interfaces_(){return[SegmentString]},NodableSegmentString.prototype.getClass=function getClass(){return NodableSegmentString};var NodedSegmentString=function NodedSegmentString(){this._nodeList=new SegmentNodeList(this),this._pts=null,this._data=null;var pts=arguments[0],data=arguments[1];this._pts=pts,this._data=data};NodedSegmentString.prototype.getCoordinates=function getCoordinates(){return this._pts},NodedSegmentString.prototype.size=function size(){return this._pts.length},NodedSegmentString.prototype.getCoordinate=function getCoordinate(i){return this._pts[i]},NodedSegmentString.prototype.isClosed=function isClosed(){return this._pts[0].equals(this._pts[this._pts.length-1])},NodedSegmentString.prototype.getSegmentOctant=function getSegmentOctant(index){return index===this._pts.length-1?-1:this.safeOctant(this.getCoordinate(index),this.getCoordinate(index+1))},NodedSegmentString.prototype.setData=function setData(data){this._data=data},NodedSegmentString.prototype.safeOctant=function safeOctant(p0,p1){return p0.equals2D(p1)?0:Octant.octant(p0,p1)},NodedSegmentString.prototype.getData=function getData(){return this._data},NodedSegmentString.prototype.addIntersection=function addIntersection(){if(2===arguments.length){var intPt$1=arguments[0],segmentIndex=arguments[1];this.addIntersectionNode(intPt$1,segmentIndex)}else if(4===arguments.length){var li=arguments[0],segmentIndex$1=arguments[1],intIndex=arguments[3],intPt=new Coordinate(li.getIntersection(intIndex));this.addIntersection(intPt,segmentIndex$1)}},NodedSegmentString.prototype.toString=function toString(){return WKTWriter.toLineString(new CoordinateArraySequence(this._pts))},NodedSegmentString.prototype.getNodeList=function getNodeList(){return this._nodeList},NodedSegmentString.prototype.addIntersectionNode=function addIntersectionNode(intPt,segmentIndex){var normalizedSegmentIndex=segmentIndex,nextSegIndex=normalizedSegmentIndex+1;if(nextSegIndex<this._pts.length){var nextPt=this._pts[nextSegIndex];intPt.equals2D(nextPt)&&(normalizedSegmentIndex=nextSegIndex)}var ei=this._nodeList.add(intPt,normalizedSegmentIndex);return ei},NodedSegmentString.prototype.addIntersections=function addIntersections(li,segmentIndex,geomIndex){for(var this$1=this,i=0;i<li.getIntersectionNum();i++)this$1.addIntersection(li,segmentIndex,geomIndex,i)},NodedSegmentString.prototype.interfaces_=function interfaces_(){return[NodableSegmentString]},NodedSegmentString.prototype.getClass=function getClass(){return NodedSegmentString},NodedSegmentString.getNodedSubstrings=function getNodedSubstrings(){if(1===arguments.length){var segStrings=arguments[0],resultEdgelist=new ArrayList;return NodedSegmentString.getNodedSubstrings(segStrings,resultEdgelist),resultEdgelist}if(2===arguments.length)for(var segStrings$1=arguments[0],resultEdgelist$1=arguments[1],i=segStrings$1.iterator(),ss;i.hasNext();)ss=i.next(),ss.getNodeList().addSplitEdges(resultEdgelist$1)};var LineSegment=function LineSegment(){if(this.p0=null,this.p1=null,0===arguments.length)this.p0=new Coordinate,this.p1=new Coordinate;else if(1===arguments.length){var ls=arguments[0];this.p0=new Coordinate(ls.p0),this.p1=new Coordinate(ls.p1)}else if(2===arguments.length)this.p0=arguments[0],this.p1=arguments[1];else if(4===arguments.length){var x0=arguments[0],y0=arguments[1],x1=arguments[2],y1=arguments[3];this.p0=new Coordinate(x0,y0),this.p1=new Coordinate(x1,y1)}},staticAccessors$24={serialVersionUID:{configurable:!0}};LineSegment.prototype.minX=function minX(){return _Mathmin(this.p0.x,this.p1.x)},LineSegment.prototype.orientationIndex=function orientationIndex(){if(arguments[0]instanceof LineSegment){var seg=arguments[0],orient0=CGAlgorithms.orientationIndex(this.p0,this.p1,seg.p0),orient1=CGAlgorithms.orientationIndex(this.p0,this.p1,seg.p1);return 0<=orient0&&0<=orient1?_Mathmax(orient0,orient1):0>=orient0&&0>=orient1?_Mathmax(orient0,orient1):0}if(arguments[0]instanceof Coordinate){var p=arguments[0];return CGAlgorithms.orientationIndex(this.p0,this.p1,p)}},LineSegment.prototype.toGeometry=function toGeometry(geomFactory){return geomFactory.createLineString([this.p0,this.p1])},LineSegment.prototype.isVertical=function isVertical(){return this.p0.x===this.p1.x},LineSegment.prototype.equals=function equals(o){if(!(o instanceof LineSegment))return!1;var other=o;return this.p0.equals(other.p0)&&this.p1.equals(other.p1)},LineSegment.prototype.intersection=function intersection(line){var li=new RobustLineIntersector;return li.computeIntersection(this.p0,this.p1,line.p0,line.p1),li.hasIntersection()?li.getIntersection(0):null},LineSegment.prototype.project=function project(){if(arguments[0]instanceof Coordinate){var p=arguments[0];if(p.equals(this.p0)||p.equals(this.p1))return new Coordinate(p);var r=this.projectionFactor(p),coord=new Coordinate;return coord.x=this.p0.x+r*(this.p1.x-this.p0.x),coord.y=this.p0.y+r*(this.p1.y-this.p0.y),coord}if(arguments[0]instanceof LineSegment){var seg=arguments[0],pf0=this.projectionFactor(seg.p0),pf1=this.projectionFactor(seg.p1);if(1<=pf0&&1<=pf1)return null;if(0>=pf0&&0>=pf1)return null;var newp0=this.project(seg.p0);0>pf0&&(newp0=this.p0),1<pf0&&(newp0=this.p1);var newp1=this.project(seg.p1);return 0>pf1&&(newp1=this.p0),1<pf1&&(newp1=this.p1),new LineSegment(newp0,newp1)}},LineSegment.prototype.normalize=function normalize(){0>this.p1.compareTo(this.p0)&&this.reverse()},LineSegment.prototype.angle=function angle(){return _Mathatan(this.p1.y-this.p0.y,this.p1.x-this.p0.x)},LineSegment.prototype.getCoordinate=function getCoordinate(i){return 0===i?this.p0:this.p1},LineSegment.prototype.distancePerpendicular=function distancePerpendicular(p){return CGAlgorithms.distancePointLinePerpendicular(p,this.p0,this.p1)},LineSegment.prototype.minY=function minY(){return _Mathmin(this.p0.y,this.p1.y)},LineSegment.prototype.midPoint=function midPoint(){return LineSegment.midPoint(this.p0,this.p1)},LineSegment.prototype.projectionFactor=function projectionFactor(p){if(p.equals(this.p0))return 0;if(p.equals(this.p1))return 1;var dx=this.p1.x-this.p0.x,dy=this.p1.y-this.p0.y,len=dx*dx+dy*dy;if(0>=len)return Double.NaN;var r=((p.x-this.p0.x)*dx+(p.y-this.p0.y)*dy)/len;return r},LineSegment.prototype.closestPoints=function closestPoints(line){var intPt=this.intersection(line);if(null!==intPt)return[intPt,intPt];var closestPt=[,,].fill(null),minDistance=Double.MAX_VALUE,dist=null,close00=this.closestPoint(line.p0);minDistance=close00.distance(line.p0),closestPt[0]=close00,closestPt[1]=line.p0;var close01=this.closestPoint(line.p1);dist=close01.distance(line.p1),dist<minDistance&&(minDistance=dist,closestPt[0]=close01,closestPt[1]=line.p1);var close10=line.closestPoint(this.p0);dist=close10.distance(this.p0),dist<minDistance&&(minDistance=dist,closestPt[0]=this.p0,closestPt[1]=close10);var close11=line.closestPoint(this.p1);return dist=close11.distance(this.p1),dist<minDistance&&(minDistance=dist,closestPt[0]=this.p1,closestPt[1]=close11),closestPt},LineSegment.prototype.closestPoint=function closestPoint(p){var factor=this.projectionFactor(p);if(0<factor&&1>factor)return this.project(p);var dist0=this.p0.distance(p),dist1=this.p1.distance(p);return dist0<dist1?this.p0:this.p1},LineSegment.prototype.maxX=function maxX(){return _Mathmax(this.p0.x,this.p1.x)},LineSegment.prototype.getLength=function getLength(){return this.p0.distance(this.p1)},LineSegment.prototype.compareTo=function compareTo(o){var other=o,comp0=this.p0.compareTo(other.p0);return 0===comp0?this.p1.compareTo(other.p1):comp0},LineSegment.prototype.reverse=function reverse(){var temp=this.p0;this.p0=this.p1,this.p1=temp},LineSegment.prototype.equalsTopo=function equalsTopo(other){return this.p0.equals(other.p0)&&(this.p1.equals(other.p1)||this.p0.equals(other.p1))&&this.p1.equals(other.p0)},LineSegment.prototype.lineIntersection=function lineIntersection(line){try{var intPt=HCoordinate.intersection(this.p0,this.p1,line.p0,line.p1);return intPt}catch(ex){if(ex instanceof NotRepresentableException);else throw ex}finally{}return null},LineSegment.prototype.maxY=function maxY(){return _Mathmax(this.p0.y,this.p1.y)},LineSegment.prototype.pointAlongOffset=function pointAlongOffset(segmentLengthFraction,offsetDistance){var segx=this.p0.x+segmentLengthFraction*(this.p1.x-this.p0.x),segy=this.p0.y+segmentLengthFraction*(this.p1.y-this.p0.y),dx=this.p1.x-this.p0.x,dy=this.p1.y-this.p0.y,len=_Mathsqrt(dx*dx+dy*dy),ux=0,uy=0;if(0!==offsetDistance){if(0>=len)throw new Error("Cannot compute offset from zero-length line segment");ux=offsetDistance*dx/len,uy=offsetDistance*dy/len}var offsetx=segx-uy,offsety=segy+ux,coord=new Coordinate(offsetx,offsety);return coord},LineSegment.prototype.setCoordinates=function setCoordinates(){if(1===arguments.length){var ls=arguments[0];this.setCoordinates(ls.p0,ls.p1)}else if(2===arguments.length){var p0=arguments[0],p1=arguments[1];this.p0.x=p0.x,this.p0.y=p0.y,this.p1.x=p1.x,this.p1.y=p1.y}},LineSegment.prototype.segmentFraction=function segmentFraction(inputPt){var segFrac=this.projectionFactor(inputPt);return 0>segFrac?segFrac=0:(1<segFrac||Double.isNaN(segFrac))&&(segFrac=1),segFrac},LineSegment.prototype.toString=function toString(){return"LINESTRING( "+this.p0.x+" "+this.p0.y+", "+this.p1.x+" "+this.p1.y+")"},LineSegment.prototype.isHorizontal=function isHorizontal(){return this.p0.y===this.p1.y},LineSegment.prototype.distance=function distance(){if(arguments[0]instanceof LineSegment){var ls=arguments[0];return CGAlgorithms.distanceLineLine(this.p0,this.p1,ls.p0,ls.p1)}if(arguments[0]instanceof Coordinate){var p=arguments[0];return CGAlgorithms.distancePointLine(p,this.p0,this.p1)}},LineSegment.prototype.pointAlong=function pointAlong(segmentLengthFraction){var coord=new Coordinate;return coord.x=this.p0.x+segmentLengthFraction*(this.p1.x-this.p0.x),coord.y=this.p0.y+segmentLengthFraction*(this.p1.y-this.p0.y),coord},LineSegment.prototype.hashCode=function hashCode(){var bits0=Double.doubleToLongBits(this.p0.x);bits0^=31*Double.doubleToLongBits(this.p0.y);var hash0=_Mathtrunc(bits0)^_Mathtrunc(bits0>>32),bits1=Double.doubleToLongBits(this.p1.x);bits1^=31*Double.doubleToLongBits(this.p1.y);var hash1=_Mathtrunc(bits1)^_Mathtrunc(bits1>>32);return hash0^hash1},LineSegment.prototype.interfaces_=function interfaces_(){return[Comparable,Serializable]},LineSegment.prototype.getClass=function getClass(){return LineSegment},LineSegment.midPoint=function midPoint(p0,p1){return new Coordinate((p0.x+p1.x)/2,(p0.y+p1.y)/2)},staticAccessors$24.serialVersionUID.get=function(){return 3252005833466256400},Object.defineProperties(LineSegment,staticAccessors$24);var MonotoneChainOverlapAction=function MonotoneChainOverlapAction(){this.tempEnv1=new Envelope,this.tempEnv2=new Envelope,this._overlapSeg1=new LineSegment,this._overlapSeg2=new LineSegment};MonotoneChainOverlapAction.prototype.overlap=function overlap(){if(2===arguments.length);else if(4===arguments.length){var mc1=arguments[0],start1=arguments[1],mc2=arguments[2],start2=arguments[3];mc1.getLineSegment(start1,this._overlapSeg1),mc2.getLineSegment(start2,this._overlapSeg2),this.overlap(this._overlapSeg1,this._overlapSeg2)}},MonotoneChainOverlapAction.prototype.interfaces_=function interfaces_(){return[]},MonotoneChainOverlapAction.prototype.getClass=function getClass(){return MonotoneChainOverlapAction};var MonotoneChain=function MonotoneChain(){this._pts=null,this._start=null,this._end=null,this._env=null,this._context=null,this._id=null;var pts=arguments[0],start=arguments[1],end=arguments[2],context=arguments[3];this._pts=pts,this._start=start,this._end=end,this._context=context};MonotoneChain.prototype.getLineSegment=function getLineSegment(index,ls){ls.p0=this._pts[index],ls.p1=this._pts[index+1]},MonotoneChain.prototype.computeSelect=function computeSelect(searchEnv,start0,end0,mcs){var p0=this._pts[start0],p1=this._pts[end0];if(mcs.tempEnv1.init(p0,p1),1==end0-start0)return mcs.select(this,start0),null;if(!searchEnv.intersects(mcs.tempEnv1))return null;var mid=_Mathtrunc((start0+end0)/2);start0<mid&&this.computeSelect(searchEnv,start0,mid,mcs),mid<end0&&this.computeSelect(searchEnv,mid,end0,mcs)},MonotoneChain.prototype.getCoordinates=function getCoordinates(){for(var this$1=this,coord=Array(this._end-this._start+1).fill(null),index=0,i=this._start;i<=this._end;i++)coord[index++]=this$1._pts[i];return coord},MonotoneChain.prototype.computeOverlaps=function computeOverlaps(mc,mco){this.computeOverlapsInternal(this._start,this._end,mc,mc._start,mc._end,mco)},MonotoneChain.prototype.setId=function setId(id){this._id=id},MonotoneChain.prototype.select=function select(searchEnv,mcs){this.computeSelect(searchEnv,this._start,this._end,mcs)},MonotoneChain.prototype.getEnvelope=function getEnvelope(){if(null===this._env){var p0=this._pts[this._start],p1=this._pts[this._end];this._env=new Envelope(p0,p1)}return this._env},MonotoneChain.prototype.getEndIndex=function getEndIndex(){return this._end},MonotoneChain.prototype.getStartIndex=function getStartIndex(){return this._start},MonotoneChain.prototype.getContext=function getContext(){return this._context},MonotoneChain.prototype.getId=function getId(){return this._id},MonotoneChain.prototype.computeOverlapsInternal=function computeOverlapsInternal(start0,end0,mc,start1,end1,mco){var p00=this._pts[start0],p01=this._pts[end0],p10=mc._pts[start1],p11=mc._pts[end1];if(1==end0-start0&&1==end1-start1)return mco.overlap(this,start0,mc,start1),null;if(mco.tempEnv1.init(p00,p01),mco.tempEnv2.init(p10,p11),!mco.tempEnv1.intersects(mco.tempEnv2))return null;var mid0=_Mathtrunc((start0+end0)/2),mid1=_Mathtrunc((start1+end1)/2);start0<mid0&&(start1<mid1&&this.computeOverlapsInternal(start0,mid0,mc,start1,mid1,mco),mid1<end1&&this.computeOverlapsInternal(start0,mid0,mc,mid1,end1,mco)),mid0<end0&&(start1<mid1&&this.computeOverlapsInternal(mid0,end0,mc,start1,mid1,mco),mid1<end1&&this.computeOverlapsInternal(mid0,end0,mc,mid1,end1,mco))},MonotoneChain.prototype.interfaces_=function interfaces_(){return[]},MonotoneChain.prototype.getClass=function getClass(){return MonotoneChain};var MonotoneChainBuilder=function MonotoneChainBuilder(){};MonotoneChainBuilder.prototype.interfaces_=function interfaces_(){return[]},MonotoneChainBuilder.prototype.getClass=function getClass(){return MonotoneChainBuilder},MonotoneChainBuilder.getChainStartIndices=function getChainStartIndices(pts){var start=0,startIndexList=new ArrayList;startIndexList.add(new Integer(start));do{var last=MonotoneChainBuilder.findChainEnd(pts,start);startIndexList.add(new Integer(last)),start=last}while(start<pts.length-1);var startIndex=MonotoneChainBuilder.toIntArray(startIndexList);return startIndex},MonotoneChainBuilder.findChainEnd=function findChainEnd(pts,start){for(var safeStart=start;safeStart<pts.length-1&&pts[safeStart].equals2D(pts[safeStart+1]);)safeStart++;if(safeStart>=pts.length-1)return pts.length-1;for(var chainQuad=Quadrant.quadrant(pts[safeStart],pts[safeStart+1]),last=start+1;last<pts.length;){if(!pts[last-1].equals2D(pts[last])){var quad=Quadrant.quadrant(pts[last-1],pts[last]);if(quad!==chainQuad)break}last++}return last-1},MonotoneChainBuilder.getChains=function getChains(){if(1===arguments.length){var pts=arguments[0];return MonotoneChainBuilder.getChains(pts,null)}if(2===arguments.length){for(var pts$1=arguments[0],context=arguments[1],mcList=new ArrayList,startIndex=MonotoneChainBuilder.getChainStartIndices(pts$1),i=0,mc;i<startIndex.length-1;i++)mc=new MonotoneChain(pts$1,startIndex[i],startIndex[i+1],context),mcList.add(mc);return mcList}},MonotoneChainBuilder.toIntArray=function toIntArray(list){for(var array=Array(list.size()).fill(null),i=0;i<array.length;i++)array[i]=list.get(i).intValue();return array};var Noder=function Noder(){};Noder.prototype.computeNodes=function computeNodes(segStrings){},Noder.prototype.getNodedSubstrings=function getNodedSubstrings(){},Noder.prototype.interfaces_=function interfaces_(){return[]},Noder.prototype.getClass=function getClass(){return Noder};var SinglePassNoder=function SinglePassNoder(){if(this._segInt=null,0===arguments.length);else if(1===arguments.length){var segInt=arguments[0];this.setSegmentIntersector(segInt)}};SinglePassNoder.prototype.setSegmentIntersector=function setSegmentIntersector(segInt){this._segInt=segInt},SinglePassNoder.prototype.interfaces_=function interfaces_(){return[Noder]},SinglePassNoder.prototype.getClass=function getClass(){return SinglePassNoder};var MCIndexNoder=function(SinglePassNoder$$1){function MCIndexNoder(si){si?SinglePassNoder$$1.call(this,si):SinglePassNoder$$1.call(this),this._monoChains=new ArrayList,this._index=new STRtree,this._idCounter=0,this._nodedSegStrings=null,this._nOverlaps=0}SinglePassNoder$$1&&(MCIndexNoder.__proto__=SinglePassNoder$$1),MCIndexNoder.prototype=Object.create(SinglePassNoder$$1&&SinglePassNoder$$1.prototype),MCIndexNoder.prototype.constructor=MCIndexNoder;var staticAccessors={SegmentOverlapAction:{configurable:!0}};return MCIndexNoder.prototype.getMonotoneChains=function getMonotoneChains(){return this._monoChains},MCIndexNoder.prototype.getNodedSubstrings=function getNodedSubstrings(){return NodedSegmentString.getNodedSubstrings(this._nodedSegStrings)},MCIndexNoder.prototype.getIndex=function getIndex(){return this._index},MCIndexNoder.prototype.add=function add(segStr){for(var this$1=this,segChains=MonotoneChainBuilder.getChains(segStr.getCoordinates(),segStr),i=segChains.iterator(),mc;i.hasNext();)mc=i.next(),mc.setId(this$1._idCounter++),this$1._index.insert(mc.getEnvelope(),mc),this$1._monoChains.add(mc)},MCIndexNoder.prototype.computeNodes=function computeNodes(inputSegStrings){var this$1=this;this._nodedSegStrings=inputSegStrings;for(var i=inputSegStrings.iterator();i.hasNext();)this$1.add(i.next());this.intersectChains()},MCIndexNoder.prototype.intersectChains=function intersectChains(){for(var this$1=this,overlapAction=new SegmentOverlapAction(this._segInt),i=this._monoChains.iterator();i.hasNext();)for(var queryChain=i.next(),overlapChains=this$1._index.query(queryChain.getEnvelope()),j=overlapChains.iterator(),testChain;j.hasNext();)if(testChain=j.next(),testChain.getId()>queryChain.getId()&&(queryChain.computeOverlaps(testChain,overlapAction),this$1._nOverlaps++),this$1._segInt.isDone())return null},MCIndexNoder.prototype.interfaces_=function interfaces_(){return[]},MCIndexNoder.prototype.getClass=function getClass(){return MCIndexNoder},staticAccessors.SegmentOverlapAction.get=function(){return SegmentOverlapAction},Object.defineProperties(MCIndexNoder,staticAccessors),MCIndexNoder}(SinglePassNoder),SegmentOverlapAction=function(MonotoneChainOverlapAction$$1){function SegmentOverlapAction(){MonotoneChainOverlapAction$$1.call(this),this._si=null;var si=arguments[0];this._si=si}return MonotoneChainOverlapAction$$1&&(SegmentOverlapAction.__proto__=MonotoneChainOverlapAction$$1),SegmentOverlapAction.prototype=Object.create(MonotoneChainOverlapAction$$1&&MonotoneChainOverlapAction$$1.prototype),SegmentOverlapAction.prototype.constructor=SegmentOverlapAction,SegmentOverlapAction.prototype.overlap=function overlap(){if(4===arguments.length){var mc1=arguments[0],start1=arguments[1],mc2=arguments[2],start2=arguments[3],ss1=mc1.getContext(),ss2=mc2.getContext();this._si.processIntersections(ss1,start1,ss2,start2)}else return MonotoneChainOverlapAction$$1.prototype.overlap.apply(this,arguments)},SegmentOverlapAction.prototype.interfaces_=function interfaces_(){return[]},SegmentOverlapAction.prototype.getClass=function getClass(){return SegmentOverlapAction},SegmentOverlapAction}(MonotoneChainOverlapAction),BufferParameters=function BufferParameters(){if(this._quadrantSegments=BufferParameters.DEFAULT_QUADRANT_SEGMENTS,this._endCapStyle=BufferParameters.CAP_ROUND,this._joinStyle=BufferParameters.JOIN_ROUND,this._mitreLimit=BufferParameters.DEFAULT_MITRE_LIMIT,this._isSingleSided=!1,this._simplifyFactor=BufferParameters.DEFAULT_SIMPLIFY_FACTOR,0===arguments.length);else if(1===arguments.length){var quadrantSegments=arguments[0];this.setQuadrantSegments(quadrantSegments)}else if(2===arguments.length){var quadrantSegments$1=arguments[0],endCapStyle=arguments[1];this.setQuadrantSegments(quadrantSegments$1),this.setEndCapStyle(endCapStyle)}else if(4===arguments.length){var quadrantSegments$2=arguments[0],endCapStyle$1=arguments[1],joinStyle=arguments[2],mitreLimit=arguments[3];this.setQuadrantSegments(quadrantSegments$2),this.setEndCapStyle(endCapStyle$1),this.setJoinStyle(joinStyle),this.setMitreLimit(mitreLimit)}},staticAccessors$25={CAP_ROUND:{configurable:!0},CAP_FLAT:{configurable:!0},CAP_SQUARE:{configurable:!0},JOIN_ROUND:{configurable:!0},JOIN_MITRE:{configurable:!0},JOIN_BEVEL:{configurable:!0},DEFAULT_QUADRANT_SEGMENTS:{configurable:!0},DEFAULT_MITRE_LIMIT:{configurable:!0},DEFAULT_SIMPLIFY_FACTOR:{configurable:!0}};BufferParameters.prototype.getEndCapStyle=function getEndCapStyle(){return this._endCapStyle},BufferParameters.prototype.isSingleSided=function isSingleSided(){return this._isSingleSided},BufferParameters.prototype.setQuadrantSegments=function setQuadrantSegments(quadSegs){this._quadrantSegments=quadSegs,0===this._quadrantSegments&&(this._joinStyle=BufferParameters.JOIN_BEVEL),0>this._quadrantSegments&&(this._joinStyle=BufferParameters.JOIN_MITRE,this._mitreLimit=_Mathabs(this._quadrantSegments)),0>=quadSegs&&(this._quadrantSegments=1),this._joinStyle!==BufferParameters.JOIN_ROUND&&(this._quadrantSegments=BufferParameters.DEFAULT_QUADRANT_SEGMENTS)},BufferParameters.prototype.getJoinStyle=function getJoinStyle(){return this._joinStyle},BufferParameters.prototype.setJoinStyle=function setJoinStyle(joinStyle){this._joinStyle=joinStyle},BufferParameters.prototype.setSimplifyFactor=function setSimplifyFactor(simplifyFactor){this._simplifyFactor=0>simplifyFactor?0:simplifyFactor},BufferParameters.prototype.getSimplifyFactor=function getSimplifyFactor(){return this._simplifyFactor},BufferParameters.prototype.getQuadrantSegments=function getQuadrantSegments(){return this._quadrantSegments},BufferParameters.prototype.setEndCapStyle=function setEndCapStyle(endCapStyle){this._endCapStyle=endCapStyle},BufferParameters.prototype.getMitreLimit=function getMitreLimit(){return this._mitreLimit},BufferParameters.prototype.setMitreLimit=function setMitreLimit(mitreLimit){this._mitreLimit=mitreLimit},BufferParameters.prototype.setSingleSided=function setSingleSided(isSingleSided){this._isSingleSided=isSingleSided},BufferParameters.prototype.interfaces_=function interfaces_(){return[]},BufferParameters.prototype.getClass=function getClass(){return BufferParameters},BufferParameters.bufferDistanceError=function bufferDistanceError(quadSegs){var alpha=_MathPI/2/quadSegs;return 1-_Mathcos(alpha/2)},staticAccessors$25.CAP_ROUND.get=function(){return 1},staticAccessors$25.CAP_FLAT.get=function(){return 2},staticAccessors$25.CAP_SQUARE.get=function(){return 3},staticAccessors$25.JOIN_ROUND.get=function(){return 1},staticAccessors$25.JOIN_MITRE.get=function(){return 2},staticAccessors$25.JOIN_BEVEL.get=function(){return 3},staticAccessors$25.DEFAULT_QUADRANT_SEGMENTS.get=function(){return 8},staticAccessors$25.DEFAULT_MITRE_LIMIT.get=function(){return 5},staticAccessors$25.DEFAULT_SIMPLIFY_FACTOR.get=function(){return 0.01},Object.defineProperties(BufferParameters,staticAccessors$25);var BufferInputLineSimplifier=function BufferInputLineSimplifier(inputLine){this._distanceTol=null,this._isDeleted=null,this._angleOrientation=CGAlgorithms.COUNTERCLOCKWISE,this._inputLine=inputLine||null},staticAccessors$26={INIT:{configurable:!0},DELETE:{configurable:!0},KEEP:{configurable:!0},NUM_PTS_TO_CHECK:{configurable:!0}};BufferInputLineSimplifier.prototype.isDeletable=function isDeletable(i0,i1,i2,distanceTol){var p0=this._inputLine[i0],p1=this._inputLine[i1],p2=this._inputLine[i2];return!!this.isConcave(p0,p1,p2)&&!!this.isShallow(p0,p1,p2,distanceTol)&&this.isShallowSampled(p0,p1,i0,i2,distanceTol)},BufferInputLineSimplifier.prototype.deleteShallowConcavities=function deleteShallowConcavities(){for(var this$1=this,index=1,midIndex=this.findNextNonDeletedIndex(index),lastIndex=this.findNextNonDeletedIndex(midIndex),isChanged=!1;lastIndex<this._inputLine.length;){var isMiddleVertexDeleted=!1;this$1.isDeletable(index,midIndex,lastIndex,this$1._distanceTol)&&(this$1._isDeleted[midIndex]=BufferInputLineSimplifier.DELETE,isMiddleVertexDeleted=!0,isChanged=!0),index=isMiddleVertexDeleted?lastIndex:midIndex,midIndex=this$1.findNextNonDeletedIndex(index),lastIndex=this$1.findNextNonDeletedIndex(midIndex)}return isChanged},BufferInputLineSimplifier.prototype.isShallowConcavity=function isShallowConcavity(p0,p1,p2,distanceTol){var orientation=CGAlgorithms.computeOrientation(p0,p1,p2),isAngleToSimplify=orientation===this._angleOrientation;if(!isAngleToSimplify)return!1;var dist=CGAlgorithms.distancePointLine(p1,p0,p2);return dist<distanceTol},BufferInputLineSimplifier.prototype.isShallowSampled=function isShallowSampled(p0,p2,i0,i2,distanceTol){var this$1=this,inc=_Mathtrunc((i2-i0)/BufferInputLineSimplifier.NUM_PTS_TO_CHECK);0>=inc&&(inc=1);for(var i=i0;i<i2;i+=inc)if(!this$1.isShallow(p0,p2,this$1._inputLine[i],distanceTol))return!1;return!0},BufferInputLineSimplifier.prototype.isConcave=function isConcave(p0,p1,p2){var orientation=CGAlgorithms.computeOrientation(p0,p1,p2),isConcave=orientation===this._angleOrientation;return isConcave},BufferInputLineSimplifier.prototype.simplify=function simplify(distanceTol){var this$1=this;this._distanceTol=_Mathabs(distanceTol),0>distanceTol&&(this._angleOrientation=CGAlgorithms.CLOCKWISE),this._isDeleted=Array(this._inputLine.length).fill(null);var isChanged=!1;do isChanged=this$1.deleteShallowConcavities();while(isChanged);return this.collapseLine()},BufferInputLineSimplifier.prototype.findNextNonDeletedIndex=function findNextNonDeletedIndex(index){for(var next=index+1;next<this._inputLine.length&&this._isDeleted[next]===BufferInputLineSimplifier.DELETE;)next++;return next},BufferInputLineSimplifier.prototype.isShallow=function isShallow(p0,p1,p2,distanceTol){var dist=CGAlgorithms.distancePointLine(p1,p0,p2);return dist<distanceTol},BufferInputLineSimplifier.prototype.collapseLine=function collapseLine(){for(var this$1=this,coordList=new CoordinateList,i=0;i<this._inputLine.length;i++)this$1._isDeleted[i]!==BufferInputLineSimplifier.DELETE&&coordList.add(this$1._inputLine[i]);return coordList.toCoordinateArray()},BufferInputLineSimplifier.prototype.interfaces_=function interfaces_(){return[]},BufferInputLineSimplifier.prototype.getClass=function getClass(){return BufferInputLineSimplifier},BufferInputLineSimplifier.simplify=function simplify(inputLine,distanceTol){var simp=new BufferInputLineSimplifier(inputLine);return simp.simplify(distanceTol)},staticAccessors$26.INIT.get=function(){return 0},staticAccessors$26.DELETE.get=function(){return 1},staticAccessors$26.KEEP.get=function(){return 1},staticAccessors$26.NUM_PTS_TO_CHECK.get=function(){return 10},Object.defineProperties(BufferInputLineSimplifier,staticAccessors$26);var OffsetSegmentString=function OffsetSegmentString(){this._ptList=null,this._precisionModel=null,this._minimimVertexDistance=0,this._ptList=new ArrayList},staticAccessors$28={COORDINATE_ARRAY_TYPE:{configurable:!0}};OffsetSegmentString.prototype.getCoordinates=function getCoordinates(){var coord=this._ptList.toArray(OffsetSegmentString.COORDINATE_ARRAY_TYPE);return coord},OffsetSegmentString.prototype.setPrecisionModel=function setPrecisionModel(precisionModel){this._precisionModel=precisionModel},OffsetSegmentString.prototype.addPt=function addPt(pt){var bufPt=new Coordinate(pt);return this._precisionModel.makePrecise(bufPt),this.isRedundant(bufPt)?null:void this._ptList.add(bufPt)},OffsetSegmentString.prototype.revere=function revere(){},OffsetSegmentString.prototype.addPts=function addPts(pt,isForward){var this$1=this;if(isForward)for(var i=0;i<pt.length;i++)this$1.addPt(pt[i]);else for(var i$1=pt.length-1;0<=i$1;i$1--)this$1.addPt(pt[i$1])},OffsetSegmentString.prototype.isRedundant=function isRedundant(pt){if(1>this._ptList.size())return!1;var lastPt=this._ptList.get(this._ptList.size()-1),ptDist=pt.distance(lastPt);return!!(ptDist<this._minimimVertexDistance)},OffsetSegmentString.prototype.toString=function toString(){var fact=new GeometryFactory,line=fact.createLineString(this.getCoordinates());return line.toString()},OffsetSegmentString.prototype.closeRing=function closeRing(){if(1>this._ptList.size())return null;var startPt=new Coordinate(this._ptList.get(0)),lastPt=this._ptList.get(this._ptList.size()-1);return startPt.equals(lastPt)?null:void this._ptList.add(startPt)},OffsetSegmentString.prototype.setMinimumVertexDistance=function setMinimumVertexDistance(minimimVertexDistance){this._minimimVertexDistance=minimimVertexDistance},OffsetSegmentString.prototype.interfaces_=function interfaces_(){return[]},OffsetSegmentString.prototype.getClass=function getClass(){return OffsetSegmentString},staticAccessors$28.COORDINATE_ARRAY_TYPE.get=function(){return[].fill(null)},Object.defineProperties(OffsetSegmentString,staticAccessors$28);var Angle=function Angle(){},staticAccessors$29={PI_TIMES_2:{configurable:!0},PI_OVER_2:{configurable:!0},PI_OVER_4:{configurable:!0},COUNTERCLOCKWISE:{configurable:!0},CLOCKWISE:{configurable:!0},NONE:{configurable:!0}};Angle.prototype.interfaces_=function interfaces_(){return[]},Angle.prototype.getClass=function getClass(){return Angle},Angle.toDegrees=function toDegrees(radians){return 180*radians/_MathPI},Angle.normalize=function normalize(angle){for(;angle>_MathPI;)angle-=Angle.PI_TIMES_2;for(;angle<=-_MathPI;)angle+=Angle.PI_TIMES_2;return angle},Angle.angle=function angle(){if(1===arguments.length){var p=arguments[0];return _Mathatan(p.y,p.x)}if(2===arguments.length){var p0=arguments[0],p1=arguments[1],dx=p1.x-p0.x,dy=p1.y-p0.y;return _Mathatan(dy,dx)}},Angle.isAcute=function isAcute(p0,p1,p2){var dx0=p0.x-p1.x,dy0=p0.y-p1.y,dx1=p2.x-p1.x,dy1=p2.y-p1.y,dotprod=dx0*dx1+dy0*dy1;return 0<dotprod},Angle.isObtuse=function isObtuse(p0,p1,p2){var dx0=p0.x-p1.x,dy0=p0.y-p1.y,dx1=p2.x-p1.x,dy1=p2.y-p1.y,dotprod=dx0*dx1+dy0*dy1;return 0>dotprod},Angle.interiorAngle=function interiorAngle(p0,p1,p2){var anglePrev=Angle.angle(p1,p0),angleNext=Angle.angle(p1,p2);return _Mathabs(angleNext-anglePrev)},Angle.normalizePositive=function normalizePositive(angle){if(0>angle){for(;0>angle;)angle+=Angle.PI_TIMES_2;angle>=Angle.PI_TIMES_2&&(angle=0)}else{for(;angle>=Angle.PI_TIMES_2;)angle-=Angle.PI_TIMES_2;0>angle&&(angle=0)}return angle},Angle.angleBetween=function angleBetween(tip1,tail,tip2){var a1=Angle.angle(tail,tip1),a2=Angle.angle(tail,tip2);return Angle.diff(a1,a2)},Angle.diff=function diff(ang1,ang2){var delAngle=null;return delAngle=ang1<ang2?ang2-ang1:ang1-ang2,delAngle>_MathPI&&(delAngle=2*_MathPI-delAngle),delAngle},Angle.toRadians=function toRadians(angleDegrees){return angleDegrees*_MathPI/180},Angle.getTurn=function getTurn(ang1,ang2){var crossproduct=_Mathsin(ang2-ang1);return 0<crossproduct?Angle.COUNTERCLOCKWISE:0>crossproduct?Angle.CLOCKWISE:Angle.NONE},Angle.angleBetweenOriented=function angleBetweenOriented(tip1,tail,tip2){var a1=Angle.angle(tail,tip1),a2=Angle.angle(tail,tip2),angDel=a2-a1;return angDel<=-_MathPI?angDel+Angle.PI_TIMES_2:angDel>_MathPI?angDel-Angle.PI_TIMES_2:angDel},staticAccessors$29.PI_TIMES_2.get=function(){return 2*_MathPI},staticAccessors$29.PI_OVER_2.get=function(){return _MathPI/2},staticAccessors$29.PI_OVER_4.get=function(){return _MathPI/4},staticAccessors$29.COUNTERCLOCKWISE.get=function(){return CGAlgorithms.COUNTERCLOCKWISE},staticAccessors$29.CLOCKWISE.get=function(){return CGAlgorithms.CLOCKWISE},staticAccessors$29.NONE.get=function(){return CGAlgorithms.COLLINEAR},Object.defineProperties(Angle,staticAccessors$29);var OffsetSegmentGenerator=function OffsetSegmentGenerator(){this._maxCurveSegmentError=0,this._filletAngleQuantum=null,this._closingSegLengthFactor=1,this._segList=null,this._distance=0,this._precisionModel=null,this._bufParams=null,this._li=null,this._s0=null,this._s1=null,this._s2=null,this._seg0=new LineSegment,this._seg1=new LineSegment,this._offset0=new LineSegment,this._offset1=new LineSegment,this._side=0,this._hasNarrowConcaveAngle=!1;var precisionModel=arguments[0],bufParams=arguments[1],distance=arguments[2];this._precisionModel=precisionModel,this._bufParams=bufParams,this._li=new RobustLineIntersector,this._filletAngleQuantum=_MathPI/2/bufParams.getQuadrantSegments(),8<=bufParams.getQuadrantSegments()&&bufParams.getJoinStyle()===BufferParameters.JOIN_ROUND&&(this._closingSegLengthFactor=OffsetSegmentGenerator.MAX_CLOSING_SEG_LEN_FACTOR),this.init(distance)},staticAccessors$27={OFFSET_SEGMENT_SEPARATION_FACTOR:{configurable:!0},INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR:{configurable:!0},CURVE_VERTEX_SNAP_DISTANCE_FACTOR:{configurable:!0},MAX_CLOSING_SEG_LEN_FACTOR:{configurable:!0}};OffsetSegmentGenerator.prototype.addNextSegment=function addNextSegment(p,addStartPoint){if(this._s0=this._s1,this._s1=this._s2,this._s2=p,this._seg0.setCoordinates(this._s0,this._s1),this.computeOffsetSegment(this._seg0,this._side,this._distance,this._offset0),this._seg1.setCoordinates(this._s1,this._s2),this.computeOffsetSegment(this._seg1,this._side,this._distance,this._offset1),this._s1.equals(this._s2))return null;var orientation=CGAlgorithms.computeOrientation(this._s0,this._s1,this._s2),outsideTurn=orientation===CGAlgorithms.CLOCKWISE&&this._side===Position.LEFT||orientation===CGAlgorithms.COUNTERCLOCKWISE&&this._side===Position.RIGHT;0===orientation?this.addCollinear(addStartPoint):outsideTurn?this.addOutsideTurn(orientation,addStartPoint):this.addInsideTurn(orientation,addStartPoint)},OffsetSegmentGenerator.prototype.addLineEndCap=function addLineEndCap(p0,p1){var seg=new LineSegment(p0,p1),offsetL=new LineSegment;this.computeOffsetSegment(seg,Position.LEFT,this._distance,offsetL);var offsetR=new LineSegment;this.computeOffsetSegment(seg,Position.RIGHT,this._distance,offsetR);var dx=p1.x-p0.x,dy=p1.y-p0.y,angle=_Mathatan(dy,dx);switch(this._bufParams.getEndCapStyle()){case BufferParameters.CAP_ROUND:this._segList.addPt(offsetL.p1),this.addFilletArc(p1,angle+_MathPI/2,angle-_MathPI/2,CGAlgorithms.CLOCKWISE,this._distance),this._segList.addPt(offsetR.p1);break;case BufferParameters.CAP_FLAT:this._segList.addPt(offsetL.p1),this._segList.addPt(offsetR.p1);break;case BufferParameters.CAP_SQUARE:var squareCapSideOffset=new Coordinate;squareCapSideOffset.x=_Mathabs(this._distance)*_Mathcos(angle),squareCapSideOffset.y=_Mathabs(this._distance)*_Mathsin(angle);var squareCapLOffset=new Coordinate(offsetL.p1.x+squareCapSideOffset.x,offsetL.p1.y+squareCapSideOffset.y),squareCapROffset=new Coordinate(offsetR.p1.x+squareCapSideOffset.x,offsetR.p1.y+squareCapSideOffset.y);this._segList.addPt(squareCapLOffset),this._segList.addPt(squareCapROffset);break;default:}},OffsetSegmentGenerator.prototype.getCoordinates=function getCoordinates(){var pts=this._segList.getCoordinates();return pts},OffsetSegmentGenerator.prototype.addMitreJoin=function addMitreJoin(p,offset0,offset1,distance){var isMitreWithinLimit=!0,intPt=null;try{intPt=HCoordinate.intersection(offset0.p0,offset0.p1,offset1.p0,offset1.p1);var mitreRatio=0>=distance?1:intPt.distance(p)/_Mathabs(distance);mitreRatio>this._bufParams.getMitreLimit()&&(isMitreWithinLimit=!1)}catch(ex){if(ex instanceof NotRepresentableException)intPt=new Coordinate(0,0),isMitreWithinLimit=!1;else throw ex}finally{}isMitreWithinLimit?this._segList.addPt(intPt):this.addLimitedMitreJoin(offset0,offset1,distance,this._bufParams.getMitreLimit())},OffsetSegmentGenerator.prototype.addFilletCorner=function addFilletCorner(p,p0,p1,direction,radius){var dx0=p0.x-p.x,dy0=p0.y-p.y,startAngle=_Mathatan(dy0,dx0),dx1=p1.x-p.x,dy1=p1.y-p.y,endAngle=_Mathatan(dy1,dx1);direction===CGAlgorithms.CLOCKWISE?startAngle<=endAngle&&(startAngle+=2*_MathPI):startAngle>=endAngle&&(startAngle-=2*_MathPI),this._segList.addPt(p0),this.addFilletArc(p,startAngle,endAngle,direction,radius),this._segList.addPt(p1)},OffsetSegmentGenerator.prototype.addOutsideTurn=function addOutsideTurn(orientation,addStartPoint){return this._offset0.p1.distance(this._offset1.p0)<this._distance*OffsetSegmentGenerator.OFFSET_SEGMENT_SEPARATION_FACTOR?(this._segList.addPt(this._offset0.p1),null):void(this._bufParams.getJoinStyle()===BufferParameters.JOIN_MITRE?this.addMitreJoin(this._s1,this._offset0,this._offset1,this._distance):this._bufParams.getJoinStyle()===BufferParameters.JOIN_BEVEL?this.addBevelJoin(this._offset0,this._offset1):(addStartPoint&&this._segList.addPt(this._offset0.p1),this.addFilletCorner(this._s1,this._offset0.p1,this._offset1.p0,orientation,this._distance),this._segList.addPt(this._offset1.p0)))},OffsetSegmentGenerator.prototype.createSquare=function createSquare(p){this._segList.addPt(new Coordinate(p.x+this._distance,p.y+this._distance)),this._segList.addPt(new Coordinate(p.x+this._distance,p.y-this._distance)),this._segList.addPt(new Coordinate(p.x-this._distance,p.y-this._distance)),this._segList.addPt(new Coordinate(p.x-this._distance,p.y+this._distance)),this._segList.closeRing()},OffsetSegmentGenerator.prototype.addSegments=function addSegments(pt,isForward){this._segList.addPts(pt,isForward)},OffsetSegmentGenerator.prototype.addFirstSegment=function addFirstSegment(){this._segList.addPt(this._offset1.p0)},OffsetSegmentGenerator.prototype.addLastSegment=function addLastSegment(){this._segList.addPt(this._offset1.p1)},OffsetSegmentGenerator.prototype.initSideSegments=function initSideSegments(s1,s2,side){this._s1=s1,this._s2=s2,this._side=side,this._seg1.setCoordinates(s1,s2),this.computeOffsetSegment(this._seg1,side,this._distance,this._offset1)},OffsetSegmentGenerator.prototype.addLimitedMitreJoin=function addLimitedMitreJoin(offset0,offset1,distance,mitreLimit){var basePt=this._seg0.p1,ang0=Angle.angle(basePt,this._seg0.p0),angDiff=Angle.angleBetweenOriented(this._seg0.p0,basePt,this._seg1.p1),angDiffHalf=angDiff/2,midAng=Angle.normalize(ang0+angDiffHalf),mitreMidAng=Angle.normalize(midAng+_MathPI),mitreDist=mitreLimit*distance,bevelDelta=mitreDist*_Mathabs(_Mathsin(angDiffHalf)),bevelHalfLen=distance-bevelDelta,bevelMidX=basePt.x+mitreDist*_Mathcos(mitreMidAng),bevelMidY=basePt.y+mitreDist*_Mathsin(mitreMidAng),bevelMidPt=new Coordinate(bevelMidX,bevelMidY),mitreMidLine=new LineSegment(basePt,bevelMidPt),bevelEndLeft=mitreMidLine.pointAlongOffset(1,bevelHalfLen),bevelEndRight=mitreMidLine.pointAlongOffset(1,-bevelHalfLen);this._side===Position.LEFT?(this._segList.addPt(bevelEndLeft),this._segList.addPt(bevelEndRight)):(this._segList.addPt(bevelEndRight),this._segList.addPt(bevelEndLeft))},OffsetSegmentGenerator.prototype.computeOffsetSegment=function computeOffsetSegment(seg,side,distance,offset){var sideSign=side===Position.LEFT?1:-1,dx=seg.p1.x-seg.p0.x,dy=seg.p1.y-seg.p0.y,len=_Mathsqrt(dx*dx+dy*dy),ux=sideSign*distance*dx/len,uy=sideSign*distance*dy/len;offset.p0.x=seg.p0.x-uy,offset.p0.y=seg.p0.y+ux,offset.p1.x=seg.p1.x-uy,offset.p1.y=seg.p1.y+ux},OffsetSegmentGenerator.prototype.addFilletArc=function addFilletArc(p,startAngle,endAngle,direction,radius){var this$1=this,directionFactor=direction===CGAlgorithms.CLOCKWISE?-1:1,totalAngle=_Mathabs(startAngle-endAngle),nSegs=_Mathtrunc(totalAngle/this._filletAngleQuantum+0.5);if(1>nSegs)return null;for(var initAngle=0,currAngleInc=totalAngle/nSegs,currAngle=initAngle,pt=new Coordinate;currAngle<totalAngle;){var angle=startAngle+directionFactor*currAngle;pt.x=p.x+radius*_Mathcos(angle),pt.y=p.y+radius*_Mathsin(angle),this$1._segList.addPt(pt),currAngle+=currAngleInc}},OffsetSegmentGenerator.prototype.addInsideTurn=function addInsideTurn(orientation,addStartPoint){if(this._li.computeIntersection(this._offset0.p0,this._offset0.p1,this._offset1.p0,this._offset1.p1),this._li.hasIntersection())this._segList.addPt(this._li.getIntersection(0));else if(this._hasNarrowConcaveAngle=!0,this._offset0.p1.distance(this._offset1.p0)<this._distance*OffsetSegmentGenerator.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR)this._segList.addPt(this._offset0.p1);else{if(this._segList.addPt(this._offset0.p1),0<this._closingSegLengthFactor){var mid0=new Coordinate((this._closingSegLengthFactor*this._offset0.p1.x+this._s1.x)/(this._closingSegLengthFactor+1),(this._closingSegLengthFactor*this._offset0.p1.y+this._s1.y)/(this._closingSegLengthFactor+1));this._segList.addPt(mid0);var mid1=new Coordinate((this._closingSegLengthFactor*this._offset1.p0.x+this._s1.x)/(this._closingSegLengthFactor+1),(this._closingSegLengthFactor*this._offset1.p0.y+this._s1.y)/(this._closingSegLengthFactor+1));this._segList.addPt(mid1)}else this._segList.addPt(this._s1);this._segList.addPt(this._offset1.p0)}},OffsetSegmentGenerator.prototype.createCircle=function createCircle(p){var pt=new Coordinate(p.x+this._distance,p.y);this._segList.addPt(pt),this.addFilletArc(p,0,2*_MathPI,-1,this._distance),this._segList.closeRing()},OffsetSegmentGenerator.prototype.addBevelJoin=function addBevelJoin(offset0,offset1){this._segList.addPt(offset0.p1),this._segList.addPt(offset1.p0)},OffsetSegmentGenerator.prototype.init=function init(distance){this._distance=distance,this._maxCurveSegmentError=distance*(1-_Mathcos(this._filletAngleQuantum/2)),this._segList=new OffsetSegmentString,this._segList.setPrecisionModel(this._precisionModel),this._segList.setMinimumVertexDistance(distance*OffsetSegmentGenerator.CURVE_VERTEX_SNAP_DISTANCE_FACTOR)},OffsetSegmentGenerator.prototype.addCollinear=function addCollinear(addStartPoint){this._li.computeIntersection(this._s0,this._s1,this._s1,this._s2);var numInt=this._li.getIntersectionNum();2<=numInt&&(this._bufParams.getJoinStyle()===BufferParameters.JOIN_BEVEL||this._bufParams.getJoinStyle()===BufferParameters.JOIN_MITRE?(addStartPoint&&this._segList.addPt(this._offset0.p1),this._segList.addPt(this._offset1.p0)):this.addFilletCorner(this._s1,this._offset0.p1,this._offset1.p0,CGAlgorithms.CLOCKWISE,this._distance))},OffsetSegmentGenerator.prototype.closeRing=function closeRing(){this._segList.closeRing()},OffsetSegmentGenerator.prototype.hasNarrowConcaveAngle=function hasNarrowConcaveAngle(){return this._hasNarrowConcaveAngle},OffsetSegmentGenerator.prototype.interfaces_=function interfaces_(){return[]},OffsetSegmentGenerator.prototype.getClass=function getClass(){return OffsetSegmentGenerator},staticAccessors$27.OFFSET_SEGMENT_SEPARATION_FACTOR.get=function(){return 1e-3},staticAccessors$27.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR.get=function(){return 1e-3},staticAccessors$27.CURVE_VERTEX_SNAP_DISTANCE_FACTOR.get=function(){return 1e-6},staticAccessors$27.MAX_CLOSING_SEG_LEN_FACTOR.get=function(){return 80},Object.defineProperties(OffsetSegmentGenerator,staticAccessors$27);var OffsetCurveBuilder=function OffsetCurveBuilder(){this._distance=0,this._precisionModel=null,this._bufParams=null;var precisionModel=arguments[0],bufParams=arguments[1];this._precisionModel=precisionModel,this._bufParams=bufParams};OffsetCurveBuilder.prototype.getOffsetCurve=function getOffsetCurve(inputPts,distance){if(this._distance=distance,0===distance)return null;var isRightSide=0>distance,posDistance=_Mathabs(distance),segGen=this.getSegGen(posDistance);1>=inputPts.length?this.computePointCurve(inputPts[0],segGen):this.computeOffsetCurve(inputPts,isRightSide,segGen);var curvePts=segGen.getCoordinates();return isRightSide&&CoordinateArrays.reverse(curvePts),curvePts},OffsetCurveBuilder.prototype.computeSingleSidedBufferCurve=function computeSingleSidedBufferCurve(inputPts,isRightSide,segGen){var distTol=this.simplifyTolerance(this._distance);if(isRightSide){segGen.addSegments(inputPts,!0);var simp2=BufferInputLineSimplifier.simplify(inputPts,-distTol),n2=simp2.length-1;segGen.initSideSegments(simp2[n2],simp2[n2-1],Position.LEFT),segGen.addFirstSegment();for(var i=n2-2;0<=i;i--)segGen.addNextSegment(simp2[i],!0)}else{segGen.addSegments(inputPts,!1);var simp1=BufferInputLineSimplifier.simplify(inputPts,distTol),n1=simp1.length-1;segGen.initSideSegments(simp1[0],simp1[1],Position.LEFT),segGen.addFirstSegment();for(var i$1=2;i$1<=n1;i$1++)segGen.addNextSegment(simp1[i$1],!0)}segGen.addLastSegment(),segGen.closeRing()},OffsetCurveBuilder.prototype.computeRingBufferCurve=function computeRingBufferCurve(inputPts,side,segGen){var distTol=this.simplifyTolerance(this._distance);side===Position.RIGHT&&(distTol=-distTol);var simp=BufferInputLineSimplifier.simplify(inputPts,distTol),n=simp.length-1;segGen.initSideSegments(simp[n-1],simp[0],side);for(var i=1,addStartPoint;i<=n;i++)addStartPoint=1!==i,segGen.addNextSegment(simp[i],addStartPoint);segGen.closeRing()},OffsetCurveBuilder.prototype.computeLineBufferCurve=function computeLineBufferCurve(inputPts,segGen){var distTol=this.simplifyTolerance(this._distance),simp1=BufferInputLineSimplifier.simplify(inputPts,distTol),n1=simp1.length-1;segGen.initSideSegments(simp1[0],simp1[1],Position.LEFT);for(var i=2;i<=n1;i++)segGen.addNextSegment(simp1[i],!0);segGen.addLastSegment(),segGen.addLineEndCap(simp1[n1-1],simp1[n1]);var simp2=BufferInputLineSimplifier.simplify(inputPts,-distTol),n2=simp2.length-1;segGen.initSideSegments(simp2[n2],simp2[n2-1],Position.LEFT);for(var i$1=n2-2;0<=i$1;i$1--)segGen.addNextSegment(simp2[i$1],!0);segGen.addLastSegment(),segGen.addLineEndCap(simp2[1],simp2[0]),segGen.closeRing()},OffsetCurveBuilder.prototype.computePointCurve=function computePointCurve(pt,segGen){switch(this._bufParams.getEndCapStyle()){case BufferParameters.CAP_ROUND:segGen.createCircle(pt);break;case BufferParameters.CAP_SQUARE:segGen.createSquare(pt);break;default:}},OffsetCurveBuilder.prototype.getLineCurve=function getLineCurve(inputPts,distance){if(this._distance=distance,0>distance&&!this._bufParams.isSingleSided())return null;if(0===distance)return null;var posDistance=_Mathabs(distance),segGen=this.getSegGen(posDistance);if(1>=inputPts.length)this.computePointCurve(inputPts[0],segGen);else if(this._bufParams.isSingleSided()){var isRightSide=0>distance;this.computeSingleSidedBufferCurve(inputPts,isRightSide,segGen)}else this.computeLineBufferCurve(inputPts,segGen);var lineCoord=segGen.getCoordinates();return lineCoord},OffsetCurveBuilder.prototype.getBufferParameters=function getBufferParameters(){return this._bufParams},OffsetCurveBuilder.prototype.simplifyTolerance=function simplifyTolerance(bufDistance){return bufDistance*this._bufParams.getSimplifyFactor()},OffsetCurveBuilder.prototype.getRingCurve=function getRingCurve(inputPts,side,distance){if(this._distance=distance,2>=inputPts.length)return this.getLineCurve(inputPts,distance);if(0===distance)return OffsetCurveBuilder.copyCoordinates(inputPts);var segGen=this.getSegGen(distance);return this.computeRingBufferCurve(inputPts,side,segGen),segGen.getCoordinates()},OffsetCurveBuilder.prototype.computeOffsetCurve=function computeOffsetCurve(inputPts,isRightSide,segGen){var distTol=this.simplifyTolerance(this._distance);if(isRightSide){var simp2=BufferInputLineSimplifier.simplify(inputPts,-distTol),n2=simp2.length-1;segGen.initSideSegments(simp2[n2],simp2[n2-1],Position.LEFT),segGen.addFirstSegment();for(var i=n2-2;0<=i;i--)segGen.addNextSegment(simp2[i],!0)}else{var simp1=BufferInputLineSimplifier.simplify(inputPts,distTol),n1=simp1.length-1;segGen.initSideSegments(simp1[0],simp1[1],Position.LEFT),segGen.addFirstSegment();for(var i$1=2;i$1<=n1;i$1++)segGen.addNextSegment(simp1[i$1],!0)}segGen.addLastSegment()},OffsetCurveBuilder.prototype.getSegGen=function getSegGen(distance){return new OffsetSegmentGenerator(this._precisionModel,this._bufParams,distance)},OffsetCurveBuilder.prototype.interfaces_=function interfaces_(){return[]},OffsetCurveBuilder.prototype.getClass=function getClass(){return OffsetCurveBuilder},OffsetCurveBuilder.copyCoordinates=function copyCoordinates(pts){for(var copy=Array(pts.length).fill(null),i=0;i<copy.length;i++)copy[i]=new Coordinate(pts[i]);return copy};var SubgraphDepthLocater=function SubgraphDepthLocater(){this._subgraphs=null,this._seg=new LineSegment,this._cga=new CGAlgorithms;var subgraphs=arguments[0];this._subgraphs=subgraphs},staticAccessors$30={DepthSegment:{configurable:!0}};SubgraphDepthLocater.prototype.findStabbedSegments=function findStabbedSegments(){var this$1=this;if(1===arguments.length){for(var stabbingRayLeftPt=arguments[0],stabbedSegments=new ArrayList,i=this._subgraphs.iterator();i.hasNext();){var bsg=i.next(),env=bsg.getEnvelope();stabbingRayLeftPt.y<env.getMinY()||stabbingRayLeftPt.y>env.getMaxY()||this$1.findStabbedSegments(stabbingRayLeftPt,bsg.getDirectedEdges(),stabbedSegments)}return stabbedSegments}if(3===arguments.length)if(hasInterface(arguments[2],List)&&arguments[0]instanceof Coordinate&&arguments[1]instanceof DirectedEdge)for(var stabbingRayLeftPt$1=arguments[0],dirEdge=arguments[1],stabbedSegments$1=arguments[2],pts=dirEdge.getEdge().getCoordinates(),i$1=0;i$1<pts.length-1;i$1++){this$1._seg.p0=pts[i$1],this$1._seg.p1=pts[i$1+1],this$1._seg.p0.y>this$1._seg.p1.y&&this$1._seg.reverse();var maxx=_Mathmax(this$1._seg.p0.x,this$1._seg.p1.x);if(!(maxx<stabbingRayLeftPt$1.x)&&!this$1._seg.isHorizontal()&&!(stabbingRayLeftPt$1.y<this$1._seg.p0.y||stabbingRayLeftPt$1.y>this$1._seg.p1.y)&&CGAlgorithms.computeOrientation(this$1._seg.p0,this$1._seg.p1,stabbingRayLeftPt$1)!==CGAlgorithms.RIGHT){var depth=dirEdge.getDepth(Position.LEFT);this$1._seg.p0.equals(pts[i$1])||(depth=dirEdge.getDepth(Position.RIGHT));var ds=new DepthSegment(this$1._seg,depth);stabbedSegments$1.add(ds)}}else if(hasInterface(arguments[2],List)&&arguments[0]instanceof Coordinate&&hasInterface(arguments[1],List))for(var stabbingRayLeftPt$2=arguments[0],dirEdges=arguments[1],stabbedSegments$2=arguments[2],i$2=dirEdges.iterator(),de;i$2.hasNext();)(de=i$2.next(),!!de.isForward())&&this$1.findStabbedSegments(stabbingRayLeftPt$2,de,stabbedSegments$2)},SubgraphDepthLocater.prototype.getDepth=function getDepth(p){var stabbedSegments=this.findStabbedSegments(p);if(0===stabbedSegments.size())return 0;var ds=Collections.min(stabbedSegments);return ds._leftDepth},SubgraphDepthLocater.prototype.interfaces_=function interfaces_(){return[]},SubgraphDepthLocater.prototype.getClass=function getClass(){return SubgraphDepthLocater},staticAccessors$30.DepthSegment.get=function(){return DepthSegment},Object.defineProperties(SubgraphDepthLocater,staticAccessors$30);var DepthSegment=function DepthSegment(){this._upwardSeg=null,this._leftDepth=null;var seg=arguments[0],depth=arguments[1];this._upwardSeg=new LineSegment(seg),this._leftDepth=depth};DepthSegment.prototype.compareTo=function compareTo(obj){var other=obj;if(this._upwardSeg.minX()>=other._upwardSeg.maxX())return 1;if(this._upwardSeg.maxX()<=other._upwardSeg.minX())return-1;var orientIndex=this._upwardSeg.orientationIndex(other._upwardSeg);return 0===orientIndex?(orientIndex=-1*other._upwardSeg.orientationIndex(this._upwardSeg),0===orientIndex?this._upwardSeg.compareTo(other._upwardSeg):orientIndex):orientIndex},DepthSegment.prototype.compareX=function compareX(seg0,seg1){var compare0=seg0.p0.compareTo(seg1.p0);return 0===compare0?seg0.p1.compareTo(seg1.p1):compare0},DepthSegment.prototype.toString=function toString(){return this._upwardSeg.toString()},DepthSegment.prototype.interfaces_=function interfaces_(){return[Comparable]},DepthSegment.prototype.getClass=function getClass(){return DepthSegment};var Triangle$1=function Triangle(p0,p1,p2){this.p0=p0||null,this.p1=p1||null,this.p2=p2||null};Triangle$1.prototype.area=function area(){return Triangle$1.area(this.p0,this.p1,this.p2)},Triangle$1.prototype.signedArea=function signedArea(){return Triangle$1.signedArea(this.p0,this.p1,this.p2)},Triangle$1.prototype.interpolateZ=function interpolateZ(p){if(null===p)throw new IllegalArgumentException("Supplied point is null.");return Triangle$1.interpolateZ(p,this.p0,this.p1,this.p2)},Triangle$1.prototype.longestSideLength=function longestSideLength(){return Triangle$1.longestSideLength(this.p0,this.p1,this.p2)},Triangle$1.prototype.isAcute=function isAcute(){return Triangle$1.isAcute(this.p0,this.p1,this.p2)},Triangle$1.prototype.circumcentre=function circumcentre(){return Triangle$1.circumcentre(this.p0,this.p1,this.p2)},Triangle$1.prototype.area3D=function area3D(){return Triangle$1.area3D(this.p0,this.p1,this.p2)},Triangle$1.prototype.centroid=function centroid(){return Triangle$1.centroid(this.p0,this.p1,this.p2)},Triangle$1.prototype.inCentre=function inCentre(){return Triangle$1.inCentre(this.p0,this.p1,this.p2)},Triangle$1.prototype.interfaces_=function interfaces_(){return[]},Triangle$1.prototype.getClass=function getClass(){return Triangle$1},Triangle$1.area=function area(a,b,c){return _Mathabs(((c.x-a.x)*(b.y-a.y)-(b.x-a.x)*(c.y-a.y))/2)},Triangle$1.signedArea=function signedArea(a,b,c){return((c.x-a.x)*(b.y-a.y)-(b.x-a.x)*(c.y-a.y))/2},Triangle$1.det=function det(m00,m01,m10,m11){return m00*m11-m01*m10},Triangle$1.interpolateZ=function interpolateZ(p,v0,v1,v2){var x0=v0.x,y0=v0.y,a=v1.x-x0,b=v2.x-x0,c=v1.y-y0,d=v2.y-y0,det=a*d-b*c,dx=p.x-x0,dy=p.y-y0,t=(d*dx-b*dy)/det,u=(-c*dx+a*dy)/det,z=v0.z+t*(v1.z-v0.z)+u*(v2.z-v0.z);return z},Triangle$1.longestSideLength=function longestSideLength(a,b,c){var lenAB=a.distance(b),lenBC=b.distance(c),lenCA=c.distance(a),maxLen=lenAB;return lenBC>maxLen&&(maxLen=lenBC),lenCA>maxLen&&(maxLen=lenCA),maxLen},Triangle$1.isAcute=function isAcute(a,b,c){return!!Angle.isAcute(a,b,c)&&!!Angle.isAcute(b,c,a)&&!!Angle.isAcute(c,a,b)},Triangle$1.circumcentre=function circumcentre(a,b,c){var cx=c.x,cy=c.y,ax=a.x-cx,ay=a.y-cy,bx=b.x-cx,by=b.y-cy,denom=2*Triangle$1.det(ax,ay,bx,by),numx=Triangle$1.det(ay,ax*ax+ay*ay,by,bx*bx+by*by),numy=Triangle$1.det(ax,ax*ax+ay*ay,bx,bx*bx+by*by),ccx=cx-numx/denom,ccy=cy+numy/denom;return new Coordinate(ccx,ccy)},Triangle$1.perpendicularBisector=function perpendicularBisector(a,b){var dx=b.x-a.x,dy=b.y-a.y,l1=new HCoordinate(a.x+dx/2,a.y+dy/2,1),l2=new HCoordinate(a.x-dy+dx/2,a.y+dx+dy/2,1);return new HCoordinate(l1,l2)},Triangle$1.angleBisector=function angleBisector(a,b,c){var len0=b.distance(a),len2=b.distance(c),frac=len0/(len0+len2),dx=c.x-a.x,dy=c.y-a.y,splitPt=new Coordinate(a.x+frac*dx,a.y+frac*dy);return splitPt},Triangle$1.area3D=function area3D(a,b,c){var ux=b.x-a.x,uy=b.y-a.y,uz=b.z-a.z,vx=c.x-a.x,vy=c.y-a.y,vz=c.z-a.z,crossx=uy*vz-uz*vy,crossy=uz*vx-ux*vz,crossz=ux*vy-uy*vx,absSq=crossx*crossx+crossy*crossy+crossz*crossz,area3D=_Mathsqrt(absSq)/2;return area3D},Triangle$1.centroid=function centroid(a,b,c){var x=(a.x+b.x+c.x)/3,y=(a.y+b.y+c.y)/3;return new Coordinate(x,y)},Triangle$1.inCentre=function inCentre(a,b,c){var len0=b.distance(c),len1=a.distance(c),len2=a.distance(b),circum=len0+len1+len2,inCentreX=(len0*a.x+len1*b.x+len2*c.x)/circum,inCentreY=(len0*a.y+len1*b.y+len2*c.y)/circum;return new Coordinate(inCentreX,inCentreY)};var OffsetCurveSetBuilder=function OffsetCurveSetBuilder(){this._inputGeom=null,this._distance=null,this._curveBuilder=null,this._curveList=new ArrayList;var inputGeom=arguments[0],distance=arguments[1],curveBuilder=arguments[2];this._inputGeom=inputGeom,this._distance=distance,this._curveBuilder=curveBuilder};OffsetCurveSetBuilder.prototype.addPoint=function addPoint(p){if(0>=this._distance)return null;var coord=p.getCoordinates(),curve=this._curveBuilder.getLineCurve(coord,this._distance);this.addCurve(curve,Location.EXTERIOR,Location.INTERIOR)},OffsetCurveSetBuilder.prototype.addPolygon=function addPolygon(p){var this$1=this,offsetDistance=this._distance,offsetSide=Position.LEFT;0>this._distance&&(offsetDistance=-this._distance,offsetSide=Position.RIGHT);var shell=p.getExteriorRing(),shellCoord=CoordinateArrays.removeRepeatedPoints(shell.getCoordinates());if(0>this._distance&&this.isErodedCompletely(shell,this._distance))return null;if(0>=this._distance&&3>shellCoord.length)return null;this.addPolygonRing(shellCoord,offsetDistance,offsetSide,Location.EXTERIOR,Location.INTERIOR);for(var i=0;i<p.getNumInteriorRing();i++){var hole=p.getInteriorRingN(i),holeCoord=CoordinateArrays.removeRepeatedPoints(hole.getCoordinates());0<this$1._distance&&this$1.isErodedCompletely(hole,-this$1._distance)||this$1.addPolygonRing(holeCoord,offsetDistance,Position.opposite(offsetSide),Location.INTERIOR,Location.EXTERIOR)}},OffsetCurveSetBuilder.prototype.isTriangleErodedCompletely=function isTriangleErodedCompletely(triangleCoord,bufferDistance){var tri=new Triangle$1(triangleCoord[0],triangleCoord[1],triangleCoord[2]),inCentre=tri.inCentre(),distToCentre=CGAlgorithms.distancePointLine(inCentre,tri.p0,tri.p1);return distToCentre<_Mathabs(bufferDistance)},OffsetCurveSetBuilder.prototype.addLineString=function addLineString(line){if(0>=this._distance&&!this._curveBuilder.getBufferParameters().isSingleSided())return null;var coord=CoordinateArrays.removeRepeatedPoints(line.getCoordinates()),curve=this._curveBuilder.getLineCurve(coord,this._distance);this.addCurve(curve,Location.EXTERIOR,Location.INTERIOR)},OffsetCurveSetBuilder.prototype.addCurve=function addCurve(coord,leftLoc,rightLoc){if(null===coord||2>coord.length)return null;var e=new NodedSegmentString(coord,new Label(0,Location.BOUNDARY,leftLoc,rightLoc));this._curveList.add(e)},OffsetCurveSetBuilder.prototype.getCurves=function getCurves(){return this.add(this._inputGeom),this._curveList},OffsetCurveSetBuilder.prototype.addPolygonRing=function addPolygonRing(coord,offsetDistance,side,cwLeftLoc,cwRightLoc){if(0===offsetDistance&&coord.length<LinearRing.MINIMUM_VALID_SIZE)return null;var leftLoc=cwLeftLoc,rightLoc=cwRightLoc;coord.length>=LinearRing.MINIMUM_VALID_SIZE&&CGAlgorithms.isCCW(coord)&&(leftLoc=cwRightLoc,rightLoc=cwLeftLoc,side=Position.opposite(side));var curve=this._curveBuilder.getRingCurve(coord,side,offsetDistance);this.addCurve(curve,leftLoc,rightLoc)},OffsetCurveSetBuilder.prototype.add=function add(g){return g.isEmpty()?null:void(g instanceof Polygon?this.addPolygon(g):g instanceof LineString$1?this.addLineString(g):g instanceof Point?this.addPoint(g):g instanceof MultiPoint?this.addCollection(g):g instanceof MultiLineString?this.addCollection(g):g instanceof MultiPolygon?this.addCollection(g):g instanceof GeometryCollection&&this.addCollection(g))},OffsetCurveSetBuilder.prototype.isErodedCompletely=function isErodedCompletely(ring,bufferDistance){var ringCoord=ring.getCoordinates();if(4>ringCoord.length)return 0>bufferDistance;if(4===ringCoord.length)return this.isTriangleErodedCompletely(ringCoord,bufferDistance);var env=ring.getEnvelopeInternal(),envMinDimension=_Mathmin(env.getHeight(),env.getWidth());return 0>bufferDistance&&2*_Mathabs(bufferDistance)>envMinDimension},OffsetCurveSetBuilder.prototype.addCollection=function addCollection(gc){for(var this$1=this,i=0,g;i<gc.getNumGeometries();i++)g=gc.getGeometryN(i),this$1.add(g)},OffsetCurveSetBuilder.prototype.interfaces_=function interfaces_(){return[]},OffsetCurveSetBuilder.prototype.getClass=function getClass(){return OffsetCurveSetBuilder};var PointOnGeometryLocator=function PointOnGeometryLocator(){};PointOnGeometryLocator.prototype.locate=function locate(p){},PointOnGeometryLocator.prototype.interfaces_=function interfaces_(){return[]},PointOnGeometryLocator.prototype.getClass=function getClass(){return PointOnGeometryLocator};var GeometryCollectionIterator=function GeometryCollectionIterator(){this._parent=null,this._atStart=null,this._max=null,this._index=null,this._subcollectionIterator=null;var parent=arguments[0];this._parent=parent,this._atStart=!0,this._index=0,this._max=parent.getNumGeometries()};GeometryCollectionIterator.prototype.next=function next(){if(this._atStart)return this._atStart=!1,GeometryCollectionIterator.isAtomic(this._parent)&&this._index++,this._parent;if(null!==this._subcollectionIterator){if(this._subcollectionIterator.hasNext())return this._subcollectionIterator.next();this._subcollectionIterator=null}if(this._index>=this._max)throw new NoSuchElementException;var obj=this._parent.getGeometryN(this._index++);return obj instanceof GeometryCollection?(this._subcollectionIterator=new GeometryCollectionIterator(obj),this._subcollectionIterator.next()):obj},GeometryCollectionIterator.prototype.remove=function remove(){throw new Error(this.getClass().getName())},GeometryCollectionIterator.prototype.hasNext=function hasNext(){if(this._atStart)return!0;if(null!==this._subcollectionIterator){if(this._subcollectionIterator.hasNext())return!0;this._subcollectionIterator=null}return!(this._index>=this._max)},GeometryCollectionIterator.prototype.interfaces_=function interfaces_(){return[Iterator]},GeometryCollectionIterator.prototype.getClass=function getClass(){return GeometryCollectionIterator},GeometryCollectionIterator.isAtomic=function isAtomic(geom){return!(geom instanceof GeometryCollection)};var SimplePointInAreaLocator=function SimplePointInAreaLocator(){this._geom=null;var geom=arguments[0];this._geom=geom};SimplePointInAreaLocator.prototype.locate=function locate(p){return SimplePointInAreaLocator.locate(p,this._geom)},SimplePointInAreaLocator.prototype.interfaces_=function interfaces_(){return[PointOnGeometryLocator]},SimplePointInAreaLocator.prototype.getClass=function getClass(){return SimplePointInAreaLocator},SimplePointInAreaLocator.isPointInRing=function isPointInRing(p,ring){return!!ring.getEnvelopeInternal().intersects(p)&&CGAlgorithms.isPointInRing(p,ring.getCoordinates())},SimplePointInAreaLocator.containsPointInPolygon=function containsPointInPolygon(p,poly){if(poly.isEmpty())return!1;var shell=poly.getExteriorRing();if(!SimplePointInAreaLocator.isPointInRing(p,shell))return!1;for(var i=0,hole;i<poly.getNumInteriorRing();i++)if(hole=poly.getInteriorRingN(i),SimplePointInAreaLocator.isPointInRing(p,hole))return!1;return!0},SimplePointInAreaLocator.containsPoint=function containsPoint(p,geom){if(geom instanceof Polygon)return SimplePointInAreaLocator.containsPointInPolygon(p,geom);if(geom instanceof GeometryCollection)for(var geomi=new GeometryCollectionIterator(geom),g2;geomi.hasNext();)if(g2=geomi.next(),g2!==geom&&SimplePointInAreaLocator.containsPoint(p,g2))return!0;return!1},SimplePointInAreaLocator.locate=function locate(p,geom){return geom.isEmpty()?Location.EXTERIOR:SimplePointInAreaLocator.containsPoint(p,geom)?Location.INTERIOR:Location.EXTERIOR};var EdgeEndStar=function EdgeEndStar(){this._edgeMap=new TreeMap,this._edgeList=null,this._ptInAreaLocation=[Location.NONE,Location.NONE]};EdgeEndStar.prototype.getNextCW=function getNextCW(ee){this.getEdges();var i=this._edgeList.indexOf(ee),iNextCW=i-1;return 0===i&&(iNextCW=this._edgeList.size()-1),this._edgeList.get(iNextCW)},EdgeEndStar.prototype.propagateSideLabels=function propagateSideLabels(geomIndex){for(var startLoc=Location.NONE,it=this.iterator();it.hasNext();){var e=it.next(),label=e.getLabel();label.isArea(geomIndex)&&label.getLocation(geomIndex,Position.LEFT)!==Location.NONE&&(startLoc=label.getLocation(geomIndex,Position.LEFT))}if(startLoc===Location.NONE)return null;for(var currLoc=startLoc,it$1=this.iterator();it$1.hasNext();){var e$1=it$1.next(),label$1=e$1.getLabel();if(label$1.getLocation(geomIndex,Position.ON)===Location.NONE&&label$1.setLocation(geomIndex,Position.ON,currLoc),label$1.isArea(geomIndex)){var leftLoc=label$1.getLocation(geomIndex,Position.LEFT),rightLoc=label$1.getLocation(geomIndex,Position.RIGHT);if(rightLoc!==Location.NONE){if(rightLoc!==currLoc)throw new TopologyException("side location conflict",e$1.getCoordinate());leftLoc===Location.NONE&&Assert.shouldNeverReachHere("found single null side (at "+e$1.getCoordinate()+")"),currLoc=leftLoc}else Assert.isTrue(label$1.getLocation(geomIndex,Position.LEFT)===Location.NONE,"found single null side"),label$1.setLocation(geomIndex,Position.RIGHT,currLoc),label$1.setLocation(geomIndex,Position.LEFT,currLoc)}}},EdgeEndStar.prototype.getCoordinate=function getCoordinate(){var it=this.iterator();if(!it.hasNext())return null;var e=it.next();return e.getCoordinate()},EdgeEndStar.prototype.print=function print(out){System.out.println("EdgeEndStar:   "+this.getCoordinate());for(var it=this.iterator(),e;it.hasNext();)e=it.next(),e.print(out)},EdgeEndStar.prototype.isAreaLabelsConsistent=function isAreaLabelsConsistent(geomGraph){return this.computeEdgeEndLabels(geomGraph.getBoundaryNodeRule()),this.checkAreaLabelsConsistent(0)},EdgeEndStar.prototype.checkAreaLabelsConsistent=function checkAreaLabelsConsistent(geomIndex){var edges=this.getEdges();if(0>=edges.size())return!0;var lastEdgeIndex=edges.size()-1,startLabel=edges.get(lastEdgeIndex).getLabel(),startLoc=startLabel.getLocation(geomIndex,Position.LEFT);Assert.isTrue(startLoc!==Location.NONE,"Found unlabelled area edge");for(var currLoc=startLoc,it=this.iterator();it.hasNext();){var e=it.next(),label=e.getLabel();Assert.isTrue(label.isArea(geomIndex),"Found non-area edge");var leftLoc=label.getLocation(geomIndex,Position.LEFT),rightLoc=label.getLocation(geomIndex,Position.RIGHT);if(leftLoc===rightLoc)return!1;if(rightLoc!==currLoc)return!1;currLoc=leftLoc}return!0},EdgeEndStar.prototype.findIndex=function findIndex(eSearch){var this$1=this;this.iterator();for(var i=0,e;i<this._edgeList.size();i++)if(e=this$1._edgeList.get(i),e===eSearch)return i;return-1},EdgeEndStar.prototype.iterator=function iterator(){return this.getEdges().iterator()},EdgeEndStar.prototype.getEdges=function getEdges(){return null===this._edgeList&&(this._edgeList=new ArrayList(this._edgeMap.values())),this._edgeList},EdgeEndStar.prototype.getLocation=function getLocation(geomIndex,p,geom){return this._ptInAreaLocation[geomIndex]===Location.NONE&&(this._ptInAreaLocation[geomIndex]=SimplePointInAreaLocator.locate(p,geom[geomIndex].getGeometry())),this._ptInAreaLocation[geomIndex]},EdgeEndStar.prototype.toString=function toString(){var buf=new StringBuffer;buf.append("EdgeEndStar:   "+this.getCoordinate()),buf.append("\n");for(var it=this.iterator(),e;it.hasNext();)e=it.next(),buf.append(e),buf.append("\n");return buf.toString()},EdgeEndStar.prototype.computeEdgeEndLabels=function computeEdgeEndLabels(boundaryNodeRule){for(var it=this.iterator(),ee;it.hasNext();)ee=it.next(),ee.computeLabel(boundaryNodeRule)},EdgeEndStar.prototype.computeLabelling=function computeLabelling(geomGraph){var this$1=this;this.computeEdgeEndLabels(geomGraph[0].getBoundaryNodeRule()),this.propagateSideLabels(0),this.propagateSideLabels(1);for(var hasDimensionalCollapseEdge=[!1,!1],it=this.iterator();it.hasNext();)for(var e=it.next(),label=e.getLabel(),geomi=0;2>geomi;geomi++)label.isLine(geomi)&&label.getLocation(geomi)===Location.BOUNDARY&&(hasDimensionalCollapseEdge[geomi]=!0);for(var it$1=this.iterator();it$1.hasNext();)for(var e$1=it$1.next(),label$1=e$1.getLabel(),geomi$1=0;2>geomi$1;geomi$1++)if(label$1.isAnyNull(geomi$1)){var loc=Location.NONE;if(hasDimensionalCollapseEdge[geomi$1])loc=Location.EXTERIOR;else{var p=e$1.getCoordinate();loc=this$1.getLocation(geomi$1,p,geomGraph)}label$1.setAllLocationsIfNull(geomi$1,loc)}},EdgeEndStar.prototype.getDegree=function getDegree(){return this._edgeMap.size()},EdgeEndStar.prototype.insertEdgeEnd=function insertEdgeEnd(e,obj){this._edgeMap.put(e,obj),this._edgeList=null},EdgeEndStar.prototype.interfaces_=function interfaces_(){return[]},EdgeEndStar.prototype.getClass=function getClass(){return EdgeEndStar};var DirectedEdgeStar=function(EdgeEndStar$$1){function DirectedEdgeStar(){EdgeEndStar$$1.call(this),this._resultAreaEdgeList=null,this._label=null,this._SCANNING_FOR_INCOMING=1,this._LINKING_TO_OUTGOING=2}return EdgeEndStar$$1&&(DirectedEdgeStar.__proto__=EdgeEndStar$$1),DirectedEdgeStar.prototype=Object.create(EdgeEndStar$$1&&EdgeEndStar$$1.prototype),DirectedEdgeStar.prototype.constructor=DirectedEdgeStar,DirectedEdgeStar.prototype.linkResultDirectedEdges=function linkResultDirectedEdges(){var this$1=this;this.getResultAreaEdges();for(var firstOut=null,incoming=null,state=this._SCANNING_FOR_INCOMING,i=0;i<this._resultAreaEdgeList.size();i++){var nextOut=this$1._resultAreaEdgeList.get(i),nextIn=nextOut.getSym();if(nextOut.getLabel().isArea())switch(null==firstOut&&nextOut.isInResult()&&(firstOut=nextOut),state){case this$1._SCANNING_FOR_INCOMING:if(!nextIn.isInResult())continue;incoming=nextIn,state=this$1._LINKING_TO_OUTGOING;break;case this$1._LINKING_TO_OUTGOING:if(!nextOut.isInResult())continue;incoming.setNext(nextOut),state=this$1._SCANNING_FOR_INCOMING;break;default:}}if(state===this._LINKING_TO_OUTGOING){if(null===firstOut)throw new TopologyException("no outgoing dirEdge found",this.getCoordinate());Assert.isTrue(firstOut.isInResult(),"unable to link last incoming dirEdge"),incoming.setNext(firstOut)}},DirectedEdgeStar.prototype.insert=function insert(ee){var de=ee;this.insertEdgeEnd(de,de)},DirectedEdgeStar.prototype.getRightmostEdge=function getRightmostEdge(){var edges=this.getEdges(),size=edges.size();if(1>size)return null;var de0=edges.get(0);if(1===size)return de0;var deLast=edges.get(size-1),quad0=de0.getQuadrant(),quad1=deLast.getQuadrant();return Quadrant.isNorthern(quad0)&&Quadrant.isNorthern(quad1)?de0:Quadrant.isNorthern(quad0)||Quadrant.isNorthern(quad1)?0===de0.getDy()?0===deLast.getDy()?(Assert.shouldNeverReachHere("found two horizontal edges incident on node"),null):deLast:de0:deLast},DirectedEdgeStar.prototype.print=function print(out){System.out.println("DirectedEdgeStar: "+this.getCoordinate());for(var it=this.iterator(),de;it.hasNext();)de=it.next(),out.print("out "),de.print(out),out.println(),out.print("in "),de.getSym().print(out),out.println()},DirectedEdgeStar.prototype.getResultAreaEdges=function getResultAreaEdges(){var this$1=this;if(null!==this._resultAreaEdgeList)return this._resultAreaEdgeList;this._resultAreaEdgeList=new ArrayList;for(var it=this.iterator(),de;it.hasNext();)de=it.next(),(de.isInResult()||de.getSym().isInResult())&&this$1._resultAreaEdgeList.add(de);return this._resultAreaEdgeList},DirectedEdgeStar.prototype.updateLabelling=function updateLabelling(nodeLabel){for(var it=this.iterator();it.hasNext();){var de=it.next(),label=de.getLabel();label.setAllLocationsIfNull(0,nodeLabel.getLocation(0)),label.setAllLocationsIfNull(1,nodeLabel.getLocation(1))}},DirectedEdgeStar.prototype.linkAllDirectedEdges=function linkAllDirectedEdges(){var this$1=this;this.getEdges();for(var prevOut=null,firstIn=null,i=this._edgeList.size()-1;0<=i;i--){var nextOut=this$1._edgeList.get(i),nextIn=nextOut.getSym();null==firstIn&&(firstIn=nextIn),null!=prevOut&&nextIn.setNext(prevOut),prevOut=nextOut}firstIn.setNext(prevOut)},DirectedEdgeStar.prototype.computeDepths=function computeDepths(){var this$1=this;if(1===arguments.length){var de=arguments[0],edgeIndex=this.findIndex(de),startDepth=de.getDepth(Position.LEFT),targetLastDepth=de.getDepth(Position.RIGHT),nextDepth=this.computeDepths(edgeIndex+1,this._edgeList.size(),startDepth),lastDepth=this.computeDepths(0,edgeIndex,nextDepth);if(lastDepth!==targetLastDepth)throw new TopologyException("depth mismatch at "+de.getCoordinate())}else if(3===arguments.length){for(var startIndex=arguments[0],endIndex=arguments[1],startDepth$1=arguments[2],currDepth=startDepth$1,i=startIndex,nextDe;i<endIndex;i++)nextDe=this$1._edgeList.get(i),nextDe.setEdgeDepths(Position.RIGHT,currDepth),currDepth=nextDe.getDepth(Position.LEFT);return currDepth}},DirectedEdgeStar.prototype.mergeSymLabels=function mergeSymLabels(){for(var it=this.iterator();it.hasNext();){var de=it.next(),label=de.getLabel();label.merge(de.getSym().getLabel())}},DirectedEdgeStar.prototype.linkMinimalDirectedEdges=function linkMinimalDirectedEdges(er){for(var this$1=this,firstOut=null,incoming=null,state=this._SCANNING_FOR_INCOMING,i=this._resultAreaEdgeList.size()-1;0<=i;i--){var nextOut=this$1._resultAreaEdgeList.get(i),nextIn=nextOut.getSym();switch(null==firstOut&&nextOut.getEdgeRing()===er&&(firstOut=nextOut),state){case this$1._SCANNING_FOR_INCOMING:if(nextIn.getEdgeRing()!==er)continue;incoming=nextIn,state=this$1._LINKING_TO_OUTGOING;break;case this$1._LINKING_TO_OUTGOING:if(nextOut.getEdgeRing()!==er)continue;incoming.setNextMin(nextOut),state=this$1._SCANNING_FOR_INCOMING;break;default:}}state===this._LINKING_TO_OUTGOING&&(Assert.isTrue(null!==firstOut,"found null for first outgoing dirEdge"),Assert.isTrue(firstOut.getEdgeRing()===er,"unable to link last incoming dirEdge"),incoming.setNextMin(firstOut))},DirectedEdgeStar.prototype.getOutgoingDegree=function getOutgoingDegree(){if(0===arguments.length){for(var degree=0,it=this.iterator(),de;it.hasNext();)de=it.next(),de.isInResult()&&degree++;return degree}if(1===arguments.length){for(var er=arguments[0],degree$1=0,it$1=this.iterator(),de$1;it$1.hasNext();)de$1=it$1.next(),de$1.getEdgeRing()===er&&degree$1++;return degree$1}},DirectedEdgeStar.prototype.getLabel=function getLabel(){return this._label},DirectedEdgeStar.prototype.findCoveredLineEdges=function findCoveredLineEdges(){for(var startLoc=Location.NONE,it=this.iterator();it.hasNext();){var nextOut=it.next(),nextIn=nextOut.getSym();if(!nextOut.isLineEdge()){if(nextOut.isInResult()){startLoc=Location.INTERIOR;break}if(nextIn.isInResult()){startLoc=Location.EXTERIOR;break}}}if(startLoc===Location.NONE)return null;for(var currLoc=startLoc,it$1=this.iterator();it$1.hasNext();){var nextOut$1=it$1.next(),nextIn$1=nextOut$1.getSym();nextOut$1.isLineEdge()?nextOut$1.getEdge().setCovered(currLoc===Location.INTERIOR):(nextOut$1.isInResult()&&(currLoc=Location.EXTERIOR),nextIn$1.isInResult()&&(currLoc=Location.INTERIOR))}},DirectedEdgeStar.prototype.computeLabelling=function computeLabelling(geom){var this$1=this;EdgeEndStar$$1.prototype.computeLabelling.call(this,geom),this._label=new Label(Location.NONE);for(var it=this.iterator();it.hasNext();)for(var ee=it.next(),e=ee.getEdge(),eLabel=e.getLabel(),i=0,eLoc;2>i;i++)eLoc=eLabel.getLocation(i),(eLoc===Location.INTERIOR||eLoc===Location.BOUNDARY)&&this$1._label.setLocation(i,Location.INTERIOR)},DirectedEdgeStar.prototype.interfaces_=function interfaces_(){return[]},DirectedEdgeStar.prototype.getClass=function getClass(){return DirectedEdgeStar},DirectedEdgeStar}(EdgeEndStar),OverlayNodeFactory=function(NodeFactory$$1){function OverlayNodeFactory(){NodeFactory$$1.apply(this,arguments)}return NodeFactory$$1&&(OverlayNodeFactory.__proto__=NodeFactory$$1),OverlayNodeFactory.prototype=Object.create(NodeFactory$$1&&NodeFactory$$1.prototype),OverlayNodeFactory.prototype.constructor=OverlayNodeFactory,OverlayNodeFactory.prototype.createNode=function createNode(coord){return new Node$2(coord,new DirectedEdgeStar())},OverlayNodeFactory.prototype.interfaces_=function interfaces_(){return[]},OverlayNodeFactory.prototype.getClass=function getClass(){return OverlayNodeFactory},OverlayNodeFactory}(NodeFactory),OrientedCoordinateArray=function OrientedCoordinateArray(){this._pts=null,this._orientation=null;var pts=arguments[0];this._pts=pts,this._orientation=OrientedCoordinateArray.orientation(pts)};OrientedCoordinateArray.prototype.compareTo=function compareTo(o1){var oca=o1,comp=OrientedCoordinateArray.compareOriented(this._pts,this._orientation,oca._pts,oca._orientation);return comp},OrientedCoordinateArray.prototype.interfaces_=function interfaces_(){return[Comparable]},OrientedCoordinateArray.prototype.getClass=function getClass(){return OrientedCoordinateArray},OrientedCoordinateArray.orientation=function orientation(pts){return 1===CoordinateArrays.increasingDirection(pts)},OrientedCoordinateArray.compareOriented=function compareOriented(pts1,orientation1,pts2,orientation2){for(var dir1=orientation1?1:-1,dir2=orientation2?1:-1,limit1=orientation1?pts1.length:-1,limit2=orientation2?pts2.length:-1,i1=orientation1?0:pts1.length-1,i2=orientation2?0:pts2.length-1;!0;){var compPt=pts1[i1].compareTo(pts2[i2]);if(0!==compPt)return compPt;i1+=dir1,i2+=dir2;var done1=i1===limit1,done2=i2===limit2;if(done1&&!done2)return-1;if(!done1&&done2)return 1;if(done1&&done2)return 0}};var EdgeList=function EdgeList(){this._edges=new ArrayList,this._ocaMap=new TreeMap};EdgeList.prototype.print=function print(out){var this$1=this;out.print("MULTILINESTRING ( ");for(var j=0,e;j<this._edges.size();j++){e=this$1._edges.get(j),0<j&&out.print(","),out.print("(");for(var pts=e.getCoordinates(),i=0;i<pts.length;i++)0<i&&out.print(","),out.print(pts[i].x+" "+pts[i].y);out.println(")")}out.print(")  ")},EdgeList.prototype.addAll=function addAll(edgeColl){for(var this$1=this,i=edgeColl.iterator();i.hasNext();)this$1.add(i.next())},EdgeList.prototype.findEdgeIndex=function findEdgeIndex(e){for(var this$1=this,i=0;i<this._edges.size();i++)if(this$1._edges.get(i).equals(e))return i;return-1},EdgeList.prototype.iterator=function iterator(){return this._edges.iterator()},EdgeList.prototype.getEdges=function getEdges(){return this._edges},EdgeList.prototype.get=function get(i){return this._edges.get(i)},EdgeList.prototype.findEqualEdge=function findEqualEdge(e){var oca=new OrientedCoordinateArray(e.getCoordinates()),matchEdge=this._ocaMap.get(oca);return matchEdge},EdgeList.prototype.add=function add(e){this._edges.add(e);var oca=new OrientedCoordinateArray(e.getCoordinates());this._ocaMap.put(oca,e)},EdgeList.prototype.interfaces_=function interfaces_(){return[]},EdgeList.prototype.getClass=function getClass(){return EdgeList};var SegmentIntersector=function SegmentIntersector(){};SegmentIntersector.prototype.processIntersections=function processIntersections(e0,segIndex0,e1,segIndex1){},SegmentIntersector.prototype.isDone=function isDone(){},SegmentIntersector.prototype.interfaces_=function interfaces_(){return[]},SegmentIntersector.prototype.getClass=function getClass(){return SegmentIntersector};var IntersectionAdder=function IntersectionAdder(){this._hasIntersection=!1,this._hasProper=!1,this._hasProperInterior=!1,this._hasInterior=!1,this._properIntersectionPoint=null,this._li=null,this._isSelfIntersection=null,this.numIntersections=0,this.numInteriorIntersections=0,this.numProperIntersections=0,this.numTests=0;var li=arguments[0];this._li=li};IntersectionAdder.prototype.isTrivialIntersection=function isTrivialIntersection(e0,segIndex0,e1,segIndex1){if(e0===e1&&1===this._li.getIntersectionNum()){if(IntersectionAdder.isAdjacentSegments(segIndex0,segIndex1))return!0;if(e0.isClosed()){var maxSegIndex=e0.size()-1;if(0===segIndex0&&segIndex1===maxSegIndex||0===segIndex1&&segIndex0===maxSegIndex)return!0}}return!1},IntersectionAdder.prototype.getProperIntersectionPoint=function getProperIntersectionPoint(){return this._properIntersectionPoint},IntersectionAdder.prototype.hasProperInteriorIntersection=function hasProperInteriorIntersection(){return this._hasProperInterior},IntersectionAdder.prototype.getLineIntersector=function getLineIntersector(){return this._li},IntersectionAdder.prototype.hasProperIntersection=function hasProperIntersection(){return this._hasProper},IntersectionAdder.prototype.processIntersections=function processIntersections(e0,segIndex0,e1,segIndex1){if(e0===e1&&segIndex0===segIndex1)return null;this.numTests++;var p00=e0.getCoordinates()[segIndex0],p01=e0.getCoordinates()[segIndex0+1],p10=e1.getCoordinates()[segIndex1],p11=e1.getCoordinates()[segIndex1+1];this._li.computeIntersection(p00,p01,p10,p11),this._li.hasIntersection()&&(this.numIntersections++,this._li.isInteriorIntersection()&&(this.numInteriorIntersections++,this._hasInterior=!0),!this.isTrivialIntersection(e0,segIndex0,e1,segIndex1)&&(this._hasIntersection=!0,e0.addIntersections(this._li,segIndex0,0),e1.addIntersections(this._li,segIndex1,1),this._li.isProper()&&(this.numProperIntersections++,this._hasProper=!0,this._hasProperInterior=!0)))},IntersectionAdder.prototype.hasIntersection=function hasIntersection(){return this._hasIntersection},IntersectionAdder.prototype.isDone=function isDone(){return!1},IntersectionAdder.prototype.hasInteriorIntersection=function hasInteriorIntersection(){return this._hasInterior},IntersectionAdder.prototype.interfaces_=function interfaces_(){return[SegmentIntersector]},IntersectionAdder.prototype.getClass=function getClass(){return IntersectionAdder},IntersectionAdder.isAdjacentSegments=function isAdjacentSegments(i1,i2){return 1===_Mathabs(i1-i2)};var EdgeIntersection=function EdgeIntersection(){this.coord=null,this.segmentIndex=null,this.dist=null;var coord=arguments[0],segmentIndex=arguments[1],dist=arguments[2];this.coord=new Coordinate(coord),this.segmentIndex=segmentIndex,this.dist=dist};EdgeIntersection.prototype.getSegmentIndex=function getSegmentIndex(){return this.segmentIndex},EdgeIntersection.prototype.getCoordinate=function getCoordinate(){return this.coord},EdgeIntersection.prototype.print=function print(out){out.print(this.coord),out.print(" seg # = "+this.segmentIndex),out.println(" dist = "+this.dist)},EdgeIntersection.prototype.compareTo=function compareTo(obj){var other=obj;return this.compare(other.segmentIndex,other.dist)},EdgeIntersection.prototype.isEndPoint=function isEndPoint(maxSegmentIndex){return 0===this.segmentIndex&&0===this.dist||!(this.segmentIndex!==maxSegmentIndex)},EdgeIntersection.prototype.toString=function toString(){return this.coord+" seg # = "+this.segmentIndex+" dist = "+this.dist},EdgeIntersection.prototype.getDistance=function getDistance(){return this.dist},EdgeIntersection.prototype.compare=function compare(segmentIndex,dist){return this.segmentIndex<segmentIndex?-1:this.segmentIndex>segmentIndex?1:this.dist<dist?-1:this.dist>dist?1:0},EdgeIntersection.prototype.interfaces_=function interfaces_(){return[Comparable]},EdgeIntersection.prototype.getClass=function getClass(){return EdgeIntersection};var EdgeIntersectionList=function EdgeIntersectionList(){this._nodeMap=new TreeMap,this.edge=null;var edge=arguments[0];this.edge=edge};EdgeIntersectionList.prototype.print=function print(out){out.println("Intersections:");for(var it=this.iterator(),ei;it.hasNext();)ei=it.next(),ei.print(out)},EdgeIntersectionList.prototype.iterator=function iterator(){return this._nodeMap.values().iterator()},EdgeIntersectionList.prototype.addSplitEdges=function addSplitEdges(edgeList){var this$1=this;this.addEndpoints();for(var it=this.iterator(),eiPrev=it.next();it.hasNext();){var ei=it.next(),newEdge=this$1.createSplitEdge(eiPrev,ei);edgeList.add(newEdge),eiPrev=ei}},EdgeIntersectionList.prototype.addEndpoints=function addEndpoints(){var maxSegIndex=this.edge.pts.length-1;this.add(this.edge.pts[0],0,0),this.add(this.edge.pts[maxSegIndex],maxSegIndex,0)},EdgeIntersectionList.prototype.createSplitEdge=function createSplitEdge(ei0,ei1){var this$1=this,npts=ei1.segmentIndex-ei0.segmentIndex+2,lastSegStartPt=this.edge.pts[ei1.segmentIndex],useIntPt1=0<ei1.dist||!ei1.coord.equals2D(lastSegStartPt);useIntPt1||npts--;var pts=Array(npts).fill(null),ipt=0;pts[ipt++]=new Coordinate(ei0.coord);for(var i=ei0.segmentIndex+1;i<=ei1.segmentIndex;i++)pts[ipt++]=this$1.edge.pts[i];return useIntPt1&&(pts[ipt]=ei1.coord),new Edge$1(pts,new Label(this.edge._label))},EdgeIntersectionList.prototype.add=function add(intPt,segmentIndex,dist){var eiNew=new EdgeIntersection(intPt,segmentIndex,dist),ei=this._nodeMap.get(eiNew);return null===ei?(this._nodeMap.put(eiNew,eiNew),eiNew):ei},EdgeIntersectionList.prototype.isIntersection=function isIntersection(pt){for(var it=this.iterator(),ei;it.hasNext();)if(ei=it.next(),ei.coord.equals(pt))return!0;return!1},EdgeIntersectionList.prototype.interfaces_=function interfaces_(){return[]},EdgeIntersectionList.prototype.getClass=function getClass(){return EdgeIntersectionList};var MonotoneChainIndexer=function MonotoneChainIndexer(){};MonotoneChainIndexer.prototype.getChainStartIndices=function getChainStartIndices(pts){var this$1=this,start=0,startIndexList=new ArrayList;startIndexList.add(new Integer(start));do{var last=this$1.findChainEnd(pts,start);startIndexList.add(new Integer(last)),start=last}while(start<pts.length-1);var startIndex=MonotoneChainIndexer.toIntArray(startIndexList);return startIndex},MonotoneChainIndexer.prototype.findChainEnd=function findChainEnd(pts,start){for(var chainQuad=Quadrant.quadrant(pts[start],pts[start+1]),last=start+1;last<pts.length;){var quad=Quadrant.quadrant(pts[last-1],pts[last]);if(quad!==chainQuad)break;last++}return last-1},MonotoneChainIndexer.prototype.interfaces_=function interfaces_(){return[]},MonotoneChainIndexer.prototype.getClass=function getClass(){return MonotoneChainIndexer},MonotoneChainIndexer.toIntArray=function toIntArray(list){for(var array=Array(list.size()).fill(null),i=0;i<array.length;i++)array[i]=list.get(i).intValue();return array};var MonotoneChainEdge=function MonotoneChainEdge(){this.e=null,this.pts=null,this.startIndex=null,this.env1=new Envelope,this.env2=new Envelope;var e=arguments[0];this.e=e,this.pts=e.getCoordinates();var mcb=new MonotoneChainIndexer;this.startIndex=mcb.getChainStartIndices(this.pts)};MonotoneChainEdge.prototype.getCoordinates=function getCoordinates(){return this.pts},MonotoneChainEdge.prototype.getMaxX=function getMaxX(chainIndex){var x1=this.pts[this.startIndex[chainIndex]].x,x2=this.pts[this.startIndex[chainIndex+1]].x;return x1>x2?x1:x2},MonotoneChainEdge.prototype.getMinX=function getMinX(chainIndex){var x1=this.pts[this.startIndex[chainIndex]].x,x2=this.pts[this.startIndex[chainIndex+1]].x;return x1<x2?x1:x2},MonotoneChainEdge.prototype.computeIntersectsForChain=function computeIntersectsForChain(){if(4===arguments.length){var chainIndex0=arguments[0],mce=arguments[1],chainIndex1=arguments[2],si=arguments[3];this.computeIntersectsForChain(this.startIndex[chainIndex0],this.startIndex[chainIndex0+1],mce,mce.startIndex[chainIndex1],mce.startIndex[chainIndex1+1],si)}else if(6===arguments.length){var start0=arguments[0],end0=arguments[1],mce$1=arguments[2],start1=arguments[3],end1=arguments[4],ei=arguments[5],p00=this.pts[start0],p01=this.pts[end0],p10=mce$1.pts[start1],p11=mce$1.pts[end1];if(1==end0-start0&&1==end1-start1)return ei.addIntersections(this.e,start0,mce$1.e,start1),null;if(this.env1.init(p00,p01),this.env2.init(p10,p11),!this.env1.intersects(this.env2))return null;var mid0=_Mathtrunc((start0+end0)/2),mid1=_Mathtrunc((start1+end1)/2);start0<mid0&&(start1<mid1&&this.computeIntersectsForChain(start0,mid0,mce$1,start1,mid1,ei),mid1<end1&&this.computeIntersectsForChain(start0,mid0,mce$1,mid1,end1,ei)),mid0<end0&&(start1<mid1&&this.computeIntersectsForChain(mid0,end0,mce$1,start1,mid1,ei),mid1<end1&&this.computeIntersectsForChain(mid0,end0,mce$1,mid1,end1,ei))}},MonotoneChainEdge.prototype.getStartIndexes=function getStartIndexes(){return this.startIndex},MonotoneChainEdge.prototype.computeIntersects=function computeIntersects(mce,si){for(var this$1=this,i=0;i<this.startIndex.length-1;i++)for(var j=0;j<mce.startIndex.length-1;j++)this$1.computeIntersectsForChain(i,mce,j,si)},MonotoneChainEdge.prototype.interfaces_=function interfaces_(){return[]},MonotoneChainEdge.prototype.getClass=function getClass(){return MonotoneChainEdge};var Depth=function Depth(){var this$1=this;this._depth=[,,].fill().map(function(){return[,,,]});for(var i=0;2>i;i++)for(var j=0;3>j;j++)this$1._depth[i][j]=Depth.NULL_VALUE},staticAccessors$31={NULL_VALUE:{configurable:!0}};Depth.prototype.getDepth=function getDepth(geomIndex,posIndex){return this._depth[geomIndex][posIndex]},Depth.prototype.setDepth=function setDepth(geomIndex,posIndex,depthValue){this._depth[geomIndex][posIndex]=depthValue},Depth.prototype.isNull=function isNull(){var this$1=this;if(0===arguments.length){for(var i=0;2>i;i++)for(var j=0;3>j;j++)if(this$1._depth[i][j]!==Depth.NULL_VALUE)return!1;return!0}if(1===arguments.length){var geomIndex=arguments[0];return this._depth[geomIndex][1]===Depth.NULL_VALUE}if(2===arguments.length){var geomIndex$1=arguments[0],posIndex=arguments[1];return this._depth[geomIndex$1][posIndex]===Depth.NULL_VALUE}},Depth.prototype.normalize=function normalize(){for(var this$1=this,i=0;2>i;i++)if(!this$1.isNull(i)){var minDepth=this$1._depth[i][1];this$1._depth[i][2]<minDepth&&(minDepth=this$1._depth[i][2]),0>minDepth&&(minDepth=0);for(var j=1,newValue;3>j;j++)newValue=0,this$1._depth[i][j]>minDepth&&(newValue=1),this$1._depth[i][j]=newValue}},Depth.prototype.getDelta=function getDelta(geomIndex){return this._depth[geomIndex][Position.RIGHT]-this._depth[geomIndex][Position.LEFT]},Depth.prototype.getLocation=function getLocation(geomIndex,posIndex){return 0>=this._depth[geomIndex][posIndex]?Location.EXTERIOR:Location.INTERIOR},Depth.prototype.toString=function toString(){return"A: "+this._depth[0][1]+","+this._depth[0][2]+" B: "+this._depth[1][1]+","+this._depth[1][2]},Depth.prototype.add=function add(){var this$1=this;if(1===arguments.length)for(var lbl=arguments[0],i=0;2>i;i++)for(var j=1,loc;3>j;j++)loc=lbl.getLocation(i,j),(loc===Location.EXTERIOR||loc===Location.INTERIOR)&&(this$1.isNull(i,j)?this$1._depth[i][j]=Depth.depthAtLocation(loc):this$1._depth[i][j]+=Depth.depthAtLocation(loc));else if(3===arguments.length){var geomIndex=arguments[0],posIndex=arguments[1],location=arguments[2];location===Location.INTERIOR&&this._depth[geomIndex][posIndex]++}},Depth.prototype.interfaces_=function interfaces_(){return[]},Depth.prototype.getClass=function getClass(){return Depth},Depth.depthAtLocation=function depthAtLocation(location){return location===Location.EXTERIOR?0:location===Location.INTERIOR?1:Depth.NULL_VALUE},staticAccessors$31.NULL_VALUE.get=function(){return-1},Object.defineProperties(Depth,staticAccessors$31);var Edge$1=function(GraphComponent$$1){function Edge(){if(GraphComponent$$1.call(this),this.pts=null,this._env=null,this.eiList=new EdgeIntersectionList(this),this._name=null,this._mce=null,this._isIsolated=!0,this._depth=new Depth,this._depthDelta=0,1===arguments.length){var pts=arguments[0];Edge.call(this,pts,null)}else if(2===arguments.length){var pts$1=arguments[0],label=arguments[1];this.pts=pts$1,this._label=label}}return GraphComponent$$1&&(Edge.__proto__=GraphComponent$$1),Edge.prototype=Object.create(GraphComponent$$1&&GraphComponent$$1.prototype),Edge.prototype.constructor=Edge,Edge.prototype.getDepth=function getDepth(){return this._depth},Edge.prototype.getCollapsedEdge=function getCollapsedEdge(){var newPts=[,,].fill(null);newPts[0]=this.pts[0],newPts[1]=this.pts[1];var newe=new Edge(newPts,Label.toLineLabel(this._label));return newe},Edge.prototype.isIsolated=function isIsolated(){return this._isIsolated},Edge.prototype.getCoordinates=function getCoordinates(){return this.pts},Edge.prototype.setIsolated=function setIsolated(isIsolated){this._isIsolated=isIsolated},Edge.prototype.setName=function setName(name){this._name=name},Edge.prototype.equals=function equals(o){var this$1=this;if(!(o instanceof Edge))return!1;var e=o;if(this.pts.length!==e.pts.length)return!1;for(var isEqualForward=!0,isEqualReverse=!0,iRev=this.pts.length,i=0;i<this.pts.length;i++)if(this$1.pts[i].equals2D(e.pts[i])||(isEqualForward=!1),this$1.pts[i].equals2D(e.pts[--iRev])||(isEqualReverse=!1),!isEqualForward&&!isEqualReverse)return!1;return!0},Edge.prototype.getCoordinate=function getCoordinate(){if(0===arguments.length)return 0<this.pts.length?this.pts[0]:null;if(1===arguments.length){var i=arguments[0];return this.pts[i]}},Edge.prototype.print=function print(out){var this$1=this;out.print("edge "+this._name+": "),out.print("LINESTRING (");for(var i=0;i<this.pts.length;i++)0<i&&out.print(","),out.print(this$1.pts[i].x+" "+this$1.pts[i].y);out.print(")  "+this._label+" "+this._depthDelta)},Edge.prototype.computeIM=function computeIM(im){Edge.updateIM(this._label,im)},Edge.prototype.isCollapsed=function isCollapsed(){return!!this._label.isArea()&&3===this.pts.length&&!!this.pts[0].equals(this.pts[2])},Edge.prototype.isClosed=function isClosed(){return this.pts[0].equals(this.pts[this.pts.length-1])},Edge.prototype.getMaximumSegmentIndex=function getMaximumSegmentIndex(){return this.pts.length-1},Edge.prototype.getDepthDelta=function getDepthDelta(){return this._depthDelta},Edge.prototype.getNumPoints=function getNumPoints(){return this.pts.length},Edge.prototype.printReverse=function printReverse(out){var this$1=this;out.print("edge "+this._name+": ");for(var i=this.pts.length-1;0<=i;i--)out.print(this$1.pts[i]+" ");out.println("")},Edge.prototype.getMonotoneChainEdge=function getMonotoneChainEdge(){return null===this._mce&&(this._mce=new MonotoneChainEdge(this)),this._mce},Edge.prototype.getEnvelope=function getEnvelope(){var this$1=this;if(null===this._env){this._env=new Envelope;for(var i=0;i<this.pts.length;i++)this$1._env.expandToInclude(this$1.pts[i])}return this._env},Edge.prototype.addIntersection=function addIntersection(li,segmentIndex,geomIndex,intIndex){var intPt=new Coordinate(li.getIntersection(intIndex)),normalizedSegmentIndex=segmentIndex,dist=li.getEdgeDistance(geomIndex,intIndex),nextSegIndex=normalizedSegmentIndex+1;if(nextSegIndex<this.pts.length){var nextPt=this.pts[nextSegIndex];intPt.equals2D(nextPt)&&(normalizedSegmentIndex=nextSegIndex,dist=0)}this.eiList.add(intPt,normalizedSegmentIndex,dist)},Edge.prototype.toString=function toString(){var this$1=this,buf=new StringBuffer;buf.append("edge "+this._name+": "),buf.append("LINESTRING (");for(var i=0;i<this.pts.length;i++)0<i&&buf.append(","),buf.append(this$1.pts[i].x+" "+this$1.pts[i].y);return buf.append(")  "+this._label+" "+this._depthDelta),buf.toString()},Edge.prototype.isPointwiseEqual=function isPointwiseEqual(e){var this$1=this;if(this.pts.length!==e.pts.length)return!1;for(var i=0;i<this.pts.length;i++)if(!this$1.pts[i].equals2D(e.pts[i]))return!1;return!0},Edge.prototype.setDepthDelta=function setDepthDelta(depthDelta){this._depthDelta=depthDelta},Edge.prototype.getEdgeIntersectionList=function getEdgeIntersectionList(){return this.eiList},Edge.prototype.addIntersections=function addIntersections(li,segmentIndex,geomIndex){for(var this$1=this,i=0;i<li.getIntersectionNum();i++)this$1.addIntersection(li,segmentIndex,geomIndex,i)},Edge.prototype.interfaces_=function interfaces_(){return[]},Edge.prototype.getClass=function getClass(){return Edge},Edge.updateIM=function updateIM(){if(2===arguments.length){var label=arguments[0],im=arguments[1];im.setAtLeastIfValid(label.getLocation(0,Position.ON),label.getLocation(1,Position.ON),1),label.isArea()&&(im.setAtLeastIfValid(label.getLocation(0,Position.LEFT),label.getLocation(1,Position.LEFT),2),im.setAtLeastIfValid(label.getLocation(0,Position.RIGHT),label.getLocation(1,Position.RIGHT),2))}else return GraphComponent$$1.prototype.updateIM.apply(this,arguments)},Edge}(GraphComponent),BufferBuilder=function BufferBuilder(bufParams){this._workingPrecisionModel=null,this._workingNoder=null,this._geomFact=null,this._graph=null,this._edgeList=new EdgeList,this._bufParams=bufParams||null};BufferBuilder.prototype.setWorkingPrecisionModel=function setWorkingPrecisionModel(pm){this._workingPrecisionModel=pm},BufferBuilder.prototype.insertUniqueEdge=function insertUniqueEdge(e){var existingEdge=this._edgeList.findEqualEdge(e);if(null!==existingEdge){var existingLabel=existingEdge.getLabel(),labelToMerge=e.getLabel();existingEdge.isPointwiseEqual(e)||(labelToMerge=new Label(e.getLabel()),labelToMerge.flip()),existingLabel.merge(labelToMerge);var mergeDelta=BufferBuilder.depthDelta(labelToMerge),existingDelta=existingEdge.getDepthDelta(),newDelta=existingDelta+mergeDelta;existingEdge.setDepthDelta(newDelta)}else this._edgeList.add(e),e.setDepthDelta(BufferBuilder.depthDelta(e.getLabel()))},BufferBuilder.prototype.buildSubgraphs=function buildSubgraphs(subgraphList,polyBuilder){for(var processedGraphs=new ArrayList,i=subgraphList.iterator();i.hasNext();){var subgraph=i.next(),p=subgraph.getRightmostCoordinate(),locater=new SubgraphDepthLocater(processedGraphs),outsideDepth=locater.getDepth(p);subgraph.computeDepth(outsideDepth),subgraph.findResultEdges(),processedGraphs.add(subgraph),polyBuilder.add(subgraph.getDirectedEdges(),subgraph.getNodes())}},BufferBuilder.prototype.createSubgraphs=function createSubgraphs(graph){for(var subgraphList=new ArrayList,i=graph.getNodes().iterator(),node;i.hasNext();)if(node=i.next(),!node.isVisited()){var subgraph=new BufferSubgraph;subgraph.create(node),subgraphList.add(subgraph)}return Collections.sort(subgraphList,Collections.reverseOrder()),subgraphList},BufferBuilder.prototype.createEmptyResultGeometry=function createEmptyResultGeometry(){var emptyGeom=this._geomFact.createPolygon();return emptyGeom},BufferBuilder.prototype.getNoder=function getNoder(precisionModel){if(null!==this._workingNoder)return this._workingNoder;var noder=new MCIndexNoder,li=new RobustLineIntersector;return li.setPrecisionModel(precisionModel),noder.setSegmentIntersector(new IntersectionAdder(li)),noder},BufferBuilder.prototype.buffer=function buffer(g,distance){var precisionModel=this._workingPrecisionModel;null===precisionModel&&(precisionModel=g.getPrecisionModel()),this._geomFact=g.getFactory();var curveBuilder=new OffsetCurveBuilder(precisionModel,this._bufParams),curveSetBuilder=new OffsetCurveSetBuilder(g,distance,curveBuilder),bufferSegStrList=curveSetBuilder.getCurves();if(0>=bufferSegStrList.size())return this.createEmptyResultGeometry();this.computeNodedEdges(bufferSegStrList,precisionModel),this._graph=new PlanarGraph(new OverlayNodeFactory()),this._graph.addEdges(this._edgeList.getEdges());var subgraphList=this.createSubgraphs(this._graph),polyBuilder=new PolygonBuilder(this._geomFact);this.buildSubgraphs(subgraphList,polyBuilder);var resultPolyList=polyBuilder.getPolygons();if(0>=resultPolyList.size())return this.createEmptyResultGeometry();var resultGeom=this._geomFact.buildGeometry(resultPolyList);return resultGeom},BufferBuilder.prototype.computeNodedEdges=function computeNodedEdges(bufferSegStrList,precisionModel){var this$1=this,noder=this.getNoder(precisionModel);noder.computeNodes(bufferSegStrList);for(var nodedSegStrings=noder.getNodedSubstrings(),i=nodedSegStrings.iterator();i.hasNext();){var segStr=i.next(),pts=segStr.getCoordinates();if(!(2===pts.length&&pts[0].equals2D(pts[1]))){var oldLabel=segStr.getData(),edge=new Edge$1(segStr.getCoordinates(),new Label(oldLabel));this$1.insertUniqueEdge(edge)}}},BufferBuilder.prototype.setNoder=function setNoder(noder){this._workingNoder=noder},BufferBuilder.prototype.interfaces_=function interfaces_(){return[]},BufferBuilder.prototype.getClass=function getClass(){return BufferBuilder},BufferBuilder.depthDelta=function depthDelta(label){var lLoc=label.getLocation(0,Position.LEFT),rLoc=label.getLocation(0,Position.RIGHT);if(lLoc===Location.INTERIOR&&rLoc===Location.EXTERIOR)return 1;return lLoc===Location.EXTERIOR&&rLoc===Location.INTERIOR?-1:0},BufferBuilder.convertSegStrings=function convertSegStrings(it){for(var fact=new GeometryFactory,lines=new ArrayList;it.hasNext();){var ss=it.next(),line=fact.createLineString(ss.getCoordinates());lines.add(line)}return fact.buildGeometry(lines)};var ScaledNoder=function ScaledNoder(){if(this._noder=null,this._scaleFactor=null,this._offsetX=null,this._offsetY=null,this._isScaled=!1,2===arguments.length){var noder=arguments[0],scaleFactor=arguments[1];this._noder=noder,this._scaleFactor=scaleFactor,this._offsetX=0,this._offsetY=0,this._isScaled=!this.isIntegerPrecision()}else if(4===arguments.length){var noder$1=arguments[0],scaleFactor$1=arguments[1],offsetX=arguments[2],offsetY=arguments[3];this._noder=noder$1,this._scaleFactor=scaleFactor$1,this._offsetX=offsetX,this._offsetY=offsetY,this._isScaled=!this.isIntegerPrecision()}};ScaledNoder.prototype.rescale=function rescale(){var this$1=this;if(hasInterface(arguments[0],Collection))for(var segStrings=arguments[0],i=segStrings.iterator(),ss;i.hasNext();)ss=i.next(),this$1.rescale(ss.getCoordinates());else if(arguments[0]instanceof Array){for(var pts=arguments[0],i$1=0;i$1<pts.length;i$1++)pts[i$1].x=pts[i$1].x/this$1._scaleFactor+this$1._offsetX,pts[i$1].y=pts[i$1].y/this$1._scaleFactor+this$1._offsetY;2===pts.length&&pts[0].equals2D(pts[1])&&System.out.println(pts)}},ScaledNoder.prototype.scale=function scale(){var this$1=this;if(hasInterface(arguments[0],Collection)){for(var segStrings=arguments[0],nodedSegmentStrings=new ArrayList,i=segStrings.iterator(),ss;i.hasNext();)ss=i.next(),nodedSegmentStrings.add(new NodedSegmentString(this$1.scale(ss.getCoordinates()),ss.getData()));return nodedSegmentStrings}if(arguments[0]instanceof Array){for(var pts=arguments[0],roundPts=Array(pts.length).fill(null),i$1=0;i$1<pts.length;i$1++)roundPts[i$1]=new Coordinate(_Mathround((pts[i$1].x-this$1._offsetX)*this$1._scaleFactor),_Mathround((pts[i$1].y-this$1._offsetY)*this$1._scaleFactor),pts[i$1].z);var roundPtsNoDup=CoordinateArrays.removeRepeatedPoints(roundPts);return roundPtsNoDup}},ScaledNoder.prototype.isIntegerPrecision=function isIntegerPrecision(){return 1===this._scaleFactor},ScaledNoder.prototype.getNodedSubstrings=function getNodedSubstrings(){var splitSS=this._noder.getNodedSubstrings();return this._isScaled&&this.rescale(splitSS),splitSS},ScaledNoder.prototype.computeNodes=function computeNodes(inputSegStrings){var intSegStrings=inputSegStrings;this._isScaled&&(intSegStrings=this.scale(inputSegStrings)),this._noder.computeNodes(intSegStrings)},ScaledNoder.prototype.interfaces_=function interfaces_(){return[Noder]},ScaledNoder.prototype.getClass=function getClass(){return ScaledNoder};var NodingValidator=function NodingValidator(){this._li=new RobustLineIntersector,this._segStrings=null;var segStrings=arguments[0];this._segStrings=segStrings},staticAccessors$33={fact:{configurable:!0}};NodingValidator.prototype.checkEndPtVertexIntersections=function checkEndPtVertexIntersections(){var this$1=this;if(0===arguments.length)for(var i=this._segStrings.iterator();i.hasNext();){var ss=i.next(),pts=ss.getCoordinates();this$1.checkEndPtVertexIntersections(pts[0],this$1._segStrings),this$1.checkEndPtVertexIntersections(pts[pts.length-1],this$1._segStrings)}else if(2===arguments.length)for(var testPt=arguments[0],segStrings=arguments[1],i$1=segStrings.iterator();i$1.hasNext();)for(var ss$1=i$1.next(),pts$1=ss$1.getCoordinates(),j=1;j<pts$1.length-1;j++)if(pts$1[j].equals(testPt))throw new RuntimeException("found endpt/interior pt intersection at index "+j+" :pt "+testPt)},NodingValidator.prototype.checkInteriorIntersections=function checkInteriorIntersections(){var this$1=this;if(0===arguments.length)for(var i=this._segStrings.iterator(),ss0;i.hasNext();){ss0=i.next();for(var j=this._segStrings.iterator(),ss1;j.hasNext();)ss1=j.next(),this$1.checkInteriorIntersections(ss0,ss1)}else if(2===arguments.length)for(var ss0$1=arguments[0],ss1$1=arguments[1],pts0=ss0$1.getCoordinates(),pts1=ss1$1.getCoordinates(),i0=0;i0<pts0.length-1;i0++)for(var i1=0;i1<pts1.length-1;i1++)this$1.checkInteriorIntersections(ss0$1,i0,ss1$1,i1);else if(4===arguments.length){var e0=arguments[0],segIndex0=arguments[1],e1=arguments[2],segIndex1=arguments[3];if(e0===e1&&segIndex0===segIndex1)return null;var p00=e0.getCoordinates()[segIndex0],p01=e0.getCoordinates()[segIndex0+1],p10=e1.getCoordinates()[segIndex1],p11=e1.getCoordinates()[segIndex1+1];if(this._li.computeIntersection(p00,p01,p10,p11),this._li.hasIntersection()&&(this._li.isProper()||this.hasInteriorIntersection(this._li,p00,p01)||this.hasInteriorIntersection(this._li,p10,p11)))throw new RuntimeException("found non-noded intersection at "+p00+"-"+p01+" and "+p10+"-"+p11)}},NodingValidator.prototype.checkValid=function checkValid(){this.checkEndPtVertexIntersections(),this.checkInteriorIntersections(),this.checkCollapses()},NodingValidator.prototype.checkCollapses=function checkCollapses(){var this$1=this;if(0===arguments.length)for(var i=this._segStrings.iterator(),ss;i.hasNext();)ss=i.next(),this$1.checkCollapses(ss);else if(1===arguments.length)for(var ss$1=arguments[0],pts=ss$1.getCoordinates(),i$1=0;i$1<pts.length-2;i$1++)this$1.checkCollapse(pts[i$1],pts[i$1+1],pts[i$1+2])},NodingValidator.prototype.hasInteriorIntersection=function hasInteriorIntersection(li,p0,p1){for(var i=0,intPt;i<li.getIntersectionNum();i++)if(intPt=li.getIntersection(i),!(intPt.equals(p0)||intPt.equals(p1)))return!0;return!1},NodingValidator.prototype.checkCollapse=function checkCollapse(p0,p1,p2){if(p0.equals(p2))throw new RuntimeException("found non-noded collapse at "+NodingValidator.fact.createLineString([p0,p1,p2]))},NodingValidator.prototype.interfaces_=function interfaces_(){return[]},NodingValidator.prototype.getClass=function getClass(){return NodingValidator},staticAccessors$33.fact.get=function(){return new GeometryFactory},Object.defineProperties(NodingValidator,staticAccessors$33);var HotPixel=function HotPixel(){this._li=null,this._pt=null,this._originalPt=null,this._ptScaled=null,this._p0Scaled=null,this._p1Scaled=null,this._scaleFactor=null,this._minx=null,this._maxx=null,this._miny=null,this._maxy=null,this._corner=[,,,,].fill(null),this._safeEnv=null;var pt=arguments[0],scaleFactor=arguments[1],li=arguments[2];if(this._originalPt=pt,this._pt=pt,this._scaleFactor=scaleFactor,this._li=li,0>=scaleFactor)throw new IllegalArgumentException("Scale factor must be non-zero");1!==scaleFactor&&(this._pt=new Coordinate(this.scale(pt.x),this.scale(pt.y)),this._p0Scaled=new Coordinate,this._p1Scaled=new Coordinate),this.initCorners(this._pt)},staticAccessors$34={SAFE_ENV_EXPANSION_FACTOR:{configurable:!0}};HotPixel.prototype.intersectsScaled=function intersectsScaled(p0,p1){var segMinx=_Mathmin(p0.x,p1.x),segMaxx=_Mathmax(p0.x,p1.x),segMiny=_Mathmin(p0.y,p1.y),segMaxy=_Mathmax(p0.y,p1.y),isOutsidePixelEnv=this._maxx<segMinx||this._minx>segMaxx||this._maxy<segMiny||this._miny>segMaxy;if(isOutsidePixelEnv)return!1;var intersects=this.intersectsToleranceSquare(p0,p1);return Assert.isTrue(!(isOutsidePixelEnv&&intersects),"Found bad envelope test"),intersects},HotPixel.prototype.initCorners=function initCorners(pt){var tolerance=0.5;this._minx=pt.x-tolerance,this._maxx=pt.x+tolerance,this._miny=pt.y-tolerance,this._maxy=pt.y+tolerance,this._corner[0]=new Coordinate(this._maxx,this._maxy),this._corner[1]=new Coordinate(this._minx,this._maxy),this._corner[2]=new Coordinate(this._minx,this._miny),this._corner[3]=new Coordinate(this._maxx,this._miny)},HotPixel.prototype.intersects=function intersects(p0,p1){return 1===this._scaleFactor?this.intersectsScaled(p0,p1):(this.copyScaled(p0,this._p0Scaled),this.copyScaled(p1,this._p1Scaled),this.intersectsScaled(this._p0Scaled,this._p1Scaled))},HotPixel.prototype.scale=function scale(val){return _Mathround(val*this._scaleFactor)},HotPixel.prototype.getCoordinate=function getCoordinate(){return this._originalPt},HotPixel.prototype.copyScaled=function copyScaled(p,pScaled){pScaled.x=this.scale(p.x),pScaled.y=this.scale(p.y)},HotPixel.prototype.getSafeEnvelope=function getSafeEnvelope(){if(null===this._safeEnv){var safeTolerance=HotPixel.SAFE_ENV_EXPANSION_FACTOR/this._scaleFactor;this._safeEnv=new Envelope(this._originalPt.x-safeTolerance,this._originalPt.x+safeTolerance,this._originalPt.y-safeTolerance,this._originalPt.y+safeTolerance)}return this._safeEnv},HotPixel.prototype.intersectsPixelClosure=function intersectsPixelClosure(p0,p1){return!(this._li.computeIntersection(p0,p1,this._corner[0],this._corner[1]),!this._li.hasIntersection())||!(this._li.computeIntersection(p0,p1,this._corner[1],this._corner[2]),!this._li.hasIntersection())||!(this._li.computeIntersection(p0,p1,this._corner[2],this._corner[3]),!this._li.hasIntersection())||(this._li.computeIntersection(p0,p1,this._corner[3],this._corner[0]),!!this._li.hasIntersection())},HotPixel.prototype.intersectsToleranceSquare=function intersectsToleranceSquare(p0,p1){var intersectsLeft=!1,intersectsBottom=!1;return!(this._li.computeIntersection(p0,p1,this._corner[0],this._corner[1]),!this._li.isProper())||!(this._li.computeIntersection(p0,p1,this._corner[1],this._corner[2]),!this._li.isProper())||!(this._li.hasIntersection()&&(intersectsLeft=!0),this._li.computeIntersection(p0,p1,this._corner[2],this._corner[3]),!this._li.isProper())||(this._li.hasIntersection()&&(intersectsBottom=!0),this._li.computeIntersection(p0,p1,this._corner[3],this._corner[0]),!!this._li.isProper()||intersectsLeft&&intersectsBottom||!!p0.equals(this._pt)||!!p1.equals(this._pt))},HotPixel.prototype.addSnappedNode=function addSnappedNode(segStr,segIndex){var p0=segStr.getCoordinate(segIndex),p1=segStr.getCoordinate(segIndex+1);return!!this.intersects(p0,p1)&&(segStr.addIntersection(this.getCoordinate(),segIndex),!0)},HotPixel.prototype.interfaces_=function interfaces_(){return[]},HotPixel.prototype.getClass=function getClass(){return HotPixel},staticAccessors$34.SAFE_ENV_EXPANSION_FACTOR.get=function(){return 0.75},Object.defineProperties(HotPixel,staticAccessors$34);var MonotoneChainSelectAction=function MonotoneChainSelectAction(){this.tempEnv1=new Envelope,this.selectedSegment=new LineSegment};MonotoneChainSelectAction.prototype.select=function select(){if(1===arguments.length);else if(2===arguments.length){var mc=arguments[0],startIndex=arguments[1];mc.getLineSegment(startIndex,this.selectedSegment),this.select(this.selectedSegment)}},MonotoneChainSelectAction.prototype.interfaces_=function interfaces_(){return[]},MonotoneChainSelectAction.prototype.getClass=function getClass(){return MonotoneChainSelectAction};var MCIndexPointSnapper=function MCIndexPointSnapper(){this._index=null;var index=arguments[0];this._index=index},staticAccessors$35={HotPixelSnapAction:{configurable:!0}};MCIndexPointSnapper.prototype.snap=function snap(){if(1===arguments.length){var hotPixel=arguments[0];return this.snap(hotPixel,null,-1)}if(3===arguments.length){var hotPixel$1=arguments[0],parentEdge=arguments[1],hotPixelVertexIndex=arguments[2],pixelEnv=hotPixel$1.getSafeEnvelope(),hotPixelSnapAction=new HotPixelSnapAction(hotPixel$1,parentEdge,hotPixelVertexIndex);return this._index.query(pixelEnv,{interfaces_:function(){return[ItemVisitor]},visitItem:function(item){var testChain=item;testChain.select(pixelEnv,hotPixelSnapAction)}}),hotPixelSnapAction.isNodeAdded()}},MCIndexPointSnapper.prototype.interfaces_=function interfaces_(){return[]},MCIndexPointSnapper.prototype.getClass=function getClass(){return MCIndexPointSnapper},staticAccessors$35.HotPixelSnapAction.get=function(){return HotPixelSnapAction},Object.defineProperties(MCIndexPointSnapper,staticAccessors$35);var HotPixelSnapAction=function(MonotoneChainSelectAction$$1){function HotPixelSnapAction(){MonotoneChainSelectAction$$1.call(this),this._hotPixel=null,this._parentEdge=null,this._hotPixelVertexIndex=null,this._isNodeAdded=!1;var hotPixel=arguments[0],parentEdge=arguments[1],hotPixelVertexIndex=arguments[2];this._hotPixel=hotPixel,this._parentEdge=parentEdge,this._hotPixelVertexIndex=hotPixelVertexIndex}return MonotoneChainSelectAction$$1&&(HotPixelSnapAction.__proto__=MonotoneChainSelectAction$$1),HotPixelSnapAction.prototype=Object.create(MonotoneChainSelectAction$$1&&MonotoneChainSelectAction$$1.prototype),HotPixelSnapAction.prototype.constructor=HotPixelSnapAction,HotPixelSnapAction.prototype.isNodeAdded=function isNodeAdded(){return this._isNodeAdded},HotPixelSnapAction.prototype.select=function select(){if(2===arguments.length){var mc=arguments[0],startIndex=arguments[1],ss=mc.getContext();if(null!==this._parentEdge&&ss===this._parentEdge&&startIndex===this._hotPixelVertexIndex)return null;this._isNodeAdded=this._hotPixel.addSnappedNode(ss,startIndex)}else return MonotoneChainSelectAction$$1.prototype.select.apply(this,arguments)},HotPixelSnapAction.prototype.interfaces_=function interfaces_(){return[]},HotPixelSnapAction.prototype.getClass=function getClass(){return HotPixelSnapAction},HotPixelSnapAction}(MonotoneChainSelectAction),InteriorIntersectionFinderAdder=function InteriorIntersectionFinderAdder(){this._li=null,this._interiorIntersections=null;var li=arguments[0];this._li=li,this._interiorIntersections=new ArrayList};InteriorIntersectionFinderAdder.prototype.processIntersections=function processIntersections(e0,segIndex0,e1,segIndex1){var this$1=this;if(e0===e1&&segIndex0===segIndex1)return null;var p00=e0.getCoordinates()[segIndex0],p01=e0.getCoordinates()[segIndex0+1],p10=e1.getCoordinates()[segIndex1],p11=e1.getCoordinates()[segIndex1+1];if(this._li.computeIntersection(p00,p01,p10,p11),this._li.hasIntersection()&&this._li.isInteriorIntersection()){for(var intIndex=0;intIndex<this._li.getIntersectionNum();intIndex++)this$1._interiorIntersections.add(this$1._li.getIntersection(intIndex));e0.addIntersections(this._li,segIndex0,0),e1.addIntersections(this._li,segIndex1,1)}},InteriorIntersectionFinderAdder.prototype.isDone=function isDone(){return!1},InteriorIntersectionFinderAdder.prototype.getInteriorIntersections=function getInteriorIntersections(){return this._interiorIntersections},InteriorIntersectionFinderAdder.prototype.interfaces_=function interfaces_(){return[SegmentIntersector]},InteriorIntersectionFinderAdder.prototype.getClass=function getClass(){return InteriorIntersectionFinderAdder};var MCIndexSnapRounder=function MCIndexSnapRounder(){this._pm=null,this._li=null,this._scaleFactor=null,this._noder=null,this._pointSnapper=null,this._nodedSegStrings=null;var pm=arguments[0];this._pm=pm,this._li=new RobustLineIntersector,this._li.setPrecisionModel(pm),this._scaleFactor=pm.getScale()};MCIndexSnapRounder.prototype.checkCorrectness=function checkCorrectness(inputSegmentStrings){var resultSegStrings=NodedSegmentString.getNodedSubstrings(inputSegmentStrings),nv=new NodingValidator(resultSegStrings);try{nv.checkValid()}catch(ex){if(ex instanceof Exception)ex.printStackTrace();else throw ex}finally{}},MCIndexSnapRounder.prototype.getNodedSubstrings=function getNodedSubstrings(){return NodedSegmentString.getNodedSubstrings(this._nodedSegStrings)},MCIndexSnapRounder.prototype.snapRound=function snapRound(segStrings,li){var intersections=this.findInteriorIntersections(segStrings,li);this.computeIntersectionSnaps(intersections),this.computeVertexSnaps(segStrings)},MCIndexSnapRounder.prototype.findInteriorIntersections=function findInteriorIntersections(segStrings,li){var intFinderAdder=new InteriorIntersectionFinderAdder(li);return this._noder.setSegmentIntersector(intFinderAdder),this._noder.computeNodes(segStrings),intFinderAdder.getInteriorIntersections()},MCIndexSnapRounder.prototype.computeVertexSnaps=function computeVertexSnaps(){var this$1=this;if(hasInterface(arguments[0],Collection))for(var edges=arguments[0],i0=edges.iterator(),edge0;i0.hasNext();)edge0=i0.next(),this$1.computeVertexSnaps(edge0);else if(arguments[0]instanceof NodedSegmentString)for(var e=arguments[0],pts0=e.getCoordinates(),i=0;i<pts0.length;i++){var hotPixel=new HotPixel(pts0[i],this$1._scaleFactor,this$1._li),isNodeAdded=this$1._pointSnapper.snap(hotPixel,e,i);isNodeAdded&&e.addIntersection(pts0[i],i)}},MCIndexSnapRounder.prototype.computeNodes=function computeNodes(inputSegmentStrings){this._nodedSegStrings=inputSegmentStrings,this._noder=new MCIndexNoder,this._pointSnapper=new MCIndexPointSnapper(this._noder.getIndex()),this.snapRound(inputSegmentStrings,this._li)},MCIndexSnapRounder.prototype.computeIntersectionSnaps=function computeIntersectionSnaps(snapPts){for(var this$1=this,it=snapPts.iterator();it.hasNext();){var snapPt=it.next(),hotPixel=new HotPixel(snapPt,this$1._scaleFactor,this$1._li);this$1._pointSnapper.snap(hotPixel)}},MCIndexSnapRounder.prototype.interfaces_=function interfaces_(){return[Noder]},MCIndexSnapRounder.prototype.getClass=function getClass(){return MCIndexSnapRounder};var BufferOp=function BufferOp(){if(this._argGeom=null,this._distance=null,this._bufParams=new BufferParameters,this._resultGeometry=null,this._saveException=null,1===arguments.length){var g=arguments[0];this._argGeom=g}else if(2===arguments.length){var g$1=arguments[0],bufParams=arguments[1];this._argGeom=g$1,this._bufParams=bufParams}},staticAccessors$32={CAP_ROUND:{configurable:!0},CAP_BUTT:{configurable:!0},CAP_FLAT:{configurable:!0},CAP_SQUARE:{configurable:!0},MAX_PRECISION_DIGITS:{configurable:!0}};BufferOp.prototype.bufferFixedPrecision=function bufferFixedPrecision(fixedPM){var noder=new ScaledNoder(new MCIndexSnapRounder(new PrecisionModel(1)),fixedPM.getScale()),bufBuilder=new BufferBuilder(this._bufParams);bufBuilder.setWorkingPrecisionModel(fixedPM),bufBuilder.setNoder(noder),this._resultGeometry=bufBuilder.buffer(this._argGeom,this._distance)},BufferOp.prototype.bufferReducedPrecision=function bufferReducedPrecision(){var this$1=this;if(0===arguments.length){for(var precDigits=BufferOp.MAX_PRECISION_DIGITS;0<=precDigits;precDigits--){try{this$1.bufferReducedPrecision(precDigits)}catch(ex){if(ex instanceof TopologyException)this$1._saveException=ex;else throw ex}finally{}if(null!==this$1._resultGeometry)return null}throw this._saveException}else if(1===arguments.length){var precisionDigits=arguments[0],sizeBasedScaleFactor=BufferOp.precisionScaleFactor(this._argGeom,this._distance,precisionDigits),fixedPM=new PrecisionModel(sizeBasedScaleFactor);this.bufferFixedPrecision(fixedPM)}},BufferOp.prototype.computeGeometry=function computeGeometry(){if(this.bufferOriginalPrecision(),null!==this._resultGeometry)return null;var argPM=this._argGeom.getFactory().getPrecisionModel();argPM.getType()===PrecisionModel.FIXED?this.bufferFixedPrecision(argPM):this.bufferReducedPrecision()},BufferOp.prototype.setQuadrantSegments=function setQuadrantSegments(quadrantSegments){this._bufParams.setQuadrantSegments(quadrantSegments)},BufferOp.prototype.bufferOriginalPrecision=function bufferOriginalPrecision(){try{var bufBuilder=new BufferBuilder(this._bufParams);this._resultGeometry=bufBuilder.buffer(this._argGeom,this._distance)}catch(ex){if(ex instanceof RuntimeException)this._saveException=ex;else throw ex}finally{}},BufferOp.prototype.getResultGeometry=function getResultGeometry(distance){return this._distance=distance,this.computeGeometry(),this._resultGeometry},BufferOp.prototype.setEndCapStyle=function setEndCapStyle(endCapStyle){this._bufParams.setEndCapStyle(endCapStyle)},BufferOp.prototype.interfaces_=function interfaces_(){return[]},BufferOp.prototype.getClass=function getClass(){return BufferOp},BufferOp.bufferOp=function bufferOp(){if(2===arguments.length){var g=arguments[0],distance=arguments[1],gBuf=new BufferOp(g),geomBuf=gBuf.getResultGeometry(distance);return geomBuf}if(3===arguments.length){if(_NumberisInteger(arguments[2])&&arguments[0]instanceof Geometry&&"number"==typeof arguments[1]){var g$1=arguments[0],distance$1=arguments[1],quadrantSegments=arguments[2],bufOp=new BufferOp(g$1);bufOp.setQuadrantSegments(quadrantSegments);var geomBuf$1=bufOp.getResultGeometry(distance$1);return geomBuf$1}if(arguments[2]instanceof BufferParameters&&arguments[0]instanceof Geometry&&"number"==typeof arguments[1]){var g$2=arguments[0],distance$2=arguments[1],params=arguments[2],bufOp$1=new BufferOp(g$2,params),geomBuf$2=bufOp$1.getResultGeometry(distance$2);return geomBuf$2}}else if(4===arguments.length){var g$3=arguments[0],distance$3=arguments[1],quadrantSegments$1=arguments[2],endCapStyle=arguments[3],bufOp$2=new BufferOp(g$3);bufOp$2.setQuadrantSegments(quadrantSegments$1),bufOp$2.setEndCapStyle(endCapStyle);var geomBuf$3=bufOp$2.getResultGeometry(distance$3);return geomBuf$3}},BufferOp.precisionScaleFactor=function precisionScaleFactor(g,distance,maxPrecisionDigits){var env=g.getEnvelopeInternal(),envMax=MathUtil.max(_Mathabs(env.getMaxX()),_Mathabs(env.getMaxY()),_Mathabs(env.getMinX()),_Mathabs(env.getMinY())),expandByDistance=0<distance?distance:0,bufEnvMax=envMax+2*expandByDistance,bufEnvPrecisionDigits=_Mathtrunc(_Mathlog(bufEnvMax)/2.302585092994046+1),minUnitLog10=maxPrecisionDigits-bufEnvPrecisionDigits,scaleFactor=_Mathpow(10,minUnitLog10);return scaleFactor},staticAccessors$32.CAP_ROUND.get=function(){return BufferParameters.CAP_ROUND},staticAccessors$32.CAP_BUTT.get=function(){return BufferParameters.CAP_FLAT},staticAccessors$32.CAP_FLAT.get=function(){return BufferParameters.CAP_FLAT},staticAccessors$32.CAP_SQUARE.get=function(){return BufferParameters.CAP_SQUARE},staticAccessors$32.MAX_PRECISION_DIGITS.get=function(){return 12},Object.defineProperties(BufferOp,staticAccessors$32);var PointPairDistance=function PointPairDistance(){this._pt=[new Coordinate,new Coordinate],this._distance=Double.NaN,this._isNull=!0};PointPairDistance.prototype.getCoordinates=function getCoordinates(){return this._pt},PointPairDistance.prototype.getCoordinate=function getCoordinate(i){return this._pt[i]},PointPairDistance.prototype.setMinimum=function setMinimum(){if(1===arguments.length){var ptDist=arguments[0];this.setMinimum(ptDist._pt[0],ptDist._pt[1])}else if(2===arguments.length){var p0=arguments[0],p1=arguments[1];if(this._isNull)return this.initialize(p0,p1),null;var dist=p0.distance(p1);dist<this._distance&&this.initialize(p0,p1,dist)}},PointPairDistance.prototype.initialize=function initialize(){if(0===arguments.length)this._isNull=!0;else if(2===arguments.length){var p0=arguments[0],p1=arguments[1];this._pt[0].setCoordinate(p0),this._pt[1].setCoordinate(p1),this._distance=p0.distance(p1),this._isNull=!1}else if(3===arguments.length){var p0$1=arguments[0],p1$1=arguments[1],distance=arguments[2];this._pt[0].setCoordinate(p0$1),this._pt[1].setCoordinate(p1$1),this._distance=distance,this._isNull=!1}},PointPairDistance.prototype.getDistance=function getDistance(){return this._distance},PointPairDistance.prototype.setMaximum=function setMaximum(){if(1===arguments.length){var ptDist=arguments[0];this.setMaximum(ptDist._pt[0],ptDist._pt[1])}else if(2===arguments.length){var p0=arguments[0],p1=arguments[1];if(this._isNull)return this.initialize(p0,p1),null;var dist=p0.distance(p1);dist>this._distance&&this.initialize(p0,p1,dist)}},PointPairDistance.prototype.interfaces_=function interfaces_(){return[]},PointPairDistance.prototype.getClass=function getClass(){return PointPairDistance};var DistanceToPointFinder=function DistanceToPointFinder(){};DistanceToPointFinder.prototype.interfaces_=function interfaces_(){return[]},DistanceToPointFinder.prototype.getClass=function getClass(){return DistanceToPointFinder},DistanceToPointFinder.computeDistance=function computeDistance(){if(arguments[2]instanceof PointPairDistance&&arguments[0]instanceof LineString$1&&arguments[1]instanceof Coordinate)for(var line=arguments[0],pt=arguments[1],ptDist=arguments[2],coords=line.getCoordinates(),tempSegment=new LineSegment,i=0;i<coords.length-1;i++){tempSegment.setCoordinates(coords[i],coords[i+1]);var closestPt=tempSegment.closestPoint(pt);ptDist.setMinimum(closestPt,pt)}else if(arguments[2]instanceof PointPairDistance&&arguments[0]instanceof Polygon&&arguments[1]instanceof Coordinate){var poly=arguments[0],pt$1=arguments[1],ptDist$1=arguments[2];DistanceToPointFinder.computeDistance(poly.getExteriorRing(),pt$1,ptDist$1);for(var i$1=0;i$1<poly.getNumInteriorRing();i$1++)DistanceToPointFinder.computeDistance(poly.getInteriorRingN(i$1),pt$1,ptDist$1)}else if(arguments[2]instanceof PointPairDistance&&arguments[0]instanceof Geometry&&arguments[1]instanceof Coordinate){var geom=arguments[0],pt$2=arguments[1],ptDist$2=arguments[2];if(geom instanceof LineString$1)DistanceToPointFinder.computeDistance(geom,pt$2,ptDist$2);else if(geom instanceof Polygon)DistanceToPointFinder.computeDistance(geom,pt$2,ptDist$2);else if(geom instanceof GeometryCollection)for(var gc=geom,i$2=0,g;i$2<gc.getNumGeometries();i$2++)g=gc.getGeometryN(i$2),DistanceToPointFinder.computeDistance(g,pt$2,ptDist$2);else ptDist$2.setMinimum(geom.getCoordinate(),pt$2)}else if(arguments[2]instanceof PointPairDistance&&arguments[0]instanceof LineSegment&&arguments[1]instanceof Coordinate){var segment=arguments[0],pt$3=arguments[1],ptDist$3=arguments[2],closestPt$1=segment.closestPoint(pt$3);ptDist$3.setMinimum(closestPt$1,pt$3)}};var BufferCurveMaximumDistanceFinder=function BufferCurveMaximumDistanceFinder(inputGeom){this._maxPtDist=new PointPairDistance,this._inputGeom=inputGeom||null},staticAccessors$36={MaxPointDistanceFilter:{configurable:!0},MaxMidpointDistanceFilter:{configurable:!0}};BufferCurveMaximumDistanceFinder.prototype.computeMaxMidpointDistance=function computeMaxMidpointDistance(curve){var distFilter=new MaxMidpointDistanceFilter(this._inputGeom);curve.apply(distFilter),this._maxPtDist.setMaximum(distFilter.getMaxPointDistance())},BufferCurveMaximumDistanceFinder.prototype.computeMaxVertexDistance=function computeMaxVertexDistance(curve){var distFilter=new MaxPointDistanceFilter(this._inputGeom);curve.apply(distFilter),this._maxPtDist.setMaximum(distFilter.getMaxPointDistance())},BufferCurveMaximumDistanceFinder.prototype.findDistance=function findDistance(bufferCurve){return this.computeMaxVertexDistance(bufferCurve),this.computeMaxMidpointDistance(bufferCurve),this._maxPtDist.getDistance()},BufferCurveMaximumDistanceFinder.prototype.getDistancePoints=function getDistancePoints(){return this._maxPtDist},BufferCurveMaximumDistanceFinder.prototype.interfaces_=function interfaces_(){return[]},BufferCurveMaximumDistanceFinder.prototype.getClass=function getClass(){return BufferCurveMaximumDistanceFinder},staticAccessors$36.MaxPointDistanceFilter.get=function(){return MaxPointDistanceFilter},staticAccessors$36.MaxMidpointDistanceFilter.get=function(){return MaxMidpointDistanceFilter},Object.defineProperties(BufferCurveMaximumDistanceFinder,staticAccessors$36);var MaxPointDistanceFilter=function MaxPointDistanceFilter(geom){this._maxPtDist=new PointPairDistance,this._minPtDist=new PointPairDistance,this._geom=geom||null};MaxPointDistanceFilter.prototype.filter=function filter(pt){this._minPtDist.initialize(),DistanceToPointFinder.computeDistance(this._geom,pt,this._minPtDist),this._maxPtDist.setMaximum(this._minPtDist)},MaxPointDistanceFilter.prototype.getMaxPointDistance=function getMaxPointDistance(){return this._maxPtDist},MaxPointDistanceFilter.prototype.interfaces_=function interfaces_(){return[CoordinateFilter]},MaxPointDistanceFilter.prototype.getClass=function getClass(){return MaxPointDistanceFilter};var MaxMidpointDistanceFilter=function MaxMidpointDistanceFilter(geom){this._maxPtDist=new PointPairDistance,this._minPtDist=new PointPairDistance,this._geom=geom||null};MaxMidpointDistanceFilter.prototype.filter=function filter(seq,index){if(0===index)return null;var p0=seq.getCoordinate(index-1),p1=seq.getCoordinate(index),midPt=new Coordinate((p0.x+p1.x)/2,(p0.y+p1.y)/2);this._minPtDist.initialize(),DistanceToPointFinder.computeDistance(this._geom,midPt,this._minPtDist),this._maxPtDist.setMaximum(this._minPtDist)},MaxMidpointDistanceFilter.prototype.isDone=function isDone(){return!1},MaxMidpointDistanceFilter.prototype.isGeometryChanged=function isGeometryChanged(){return!1},MaxMidpointDistanceFilter.prototype.getMaxPointDistance=function getMaxPointDistance(){return this._maxPtDist},MaxMidpointDistanceFilter.prototype.interfaces_=function interfaces_(){return[CoordinateSequenceFilter]},MaxMidpointDistanceFilter.prototype.getClass=function getClass(){return MaxMidpointDistanceFilter};var PolygonExtracter=function PolygonExtracter(comps){this._comps=comps||null};PolygonExtracter.prototype.filter=function filter(geom){geom instanceof Polygon&&this._comps.add(geom)},PolygonExtracter.prototype.interfaces_=function interfaces_(){return[GeometryFilter]},PolygonExtracter.prototype.getClass=function getClass(){return PolygonExtracter},PolygonExtracter.getPolygons=function getPolygons(){if(1===arguments.length){var geom=arguments[0];return PolygonExtracter.getPolygons(geom,new ArrayList)}if(2===arguments.length){var geom$1=arguments[0],list=arguments[1];return geom$1 instanceof Polygon?list.add(geom$1):geom$1 instanceof GeometryCollection&&geom$1.apply(new PolygonExtracter(list)),list}};var LinearComponentExtracter=function LinearComponentExtracter(){if(this._lines=null,this._isForcedToLineString=!1,1===arguments.length){var lines=arguments[0];this._lines=lines}else if(2===arguments.length){var lines$1=arguments[0],isForcedToLineString=arguments[1];this._lines=lines$1,this._isForcedToLineString=isForcedToLineString}};LinearComponentExtracter.prototype.filter=function filter(geom){if(this._isForcedToLineString&&geom instanceof LinearRing){var line=geom.getFactory().createLineString(geom.getCoordinateSequence());return this._lines.add(line),null}geom instanceof LineString$1&&this._lines.add(geom)},LinearComponentExtracter.prototype.setForceToLineString=function setForceToLineString(isForcedToLineString){this._isForcedToLineString=isForcedToLineString},LinearComponentExtracter.prototype.interfaces_=function interfaces_(){return[GeometryComponentFilter]},LinearComponentExtracter.prototype.getClass=function getClass(){return LinearComponentExtracter},LinearComponentExtracter.getGeometry=function getGeometry(){if(1===arguments.length){var geom=arguments[0];return geom.getFactory().buildGeometry(LinearComponentExtracter.getLines(geom))}if(2===arguments.length){var geom$1=arguments[0],forceToLineString=arguments[1];return geom$1.getFactory().buildGeometry(LinearComponentExtracter.getLines(geom$1,forceToLineString))}},LinearComponentExtracter.getLines=function getLines(){if(1===arguments.length){var geom=arguments[0];return LinearComponentExtracter.getLines(geom,!1)}if(2===arguments.length){if(hasInterface(arguments[0],Collection)&&hasInterface(arguments[1],Collection)){for(var geoms=arguments[0],lines$1=arguments[1],i=geoms.iterator(),g;i.hasNext();)g=i.next(),LinearComponentExtracter.getLines(g,lines$1);return lines$1}if(arguments[0]instanceof Geometry&&"boolean"==typeof arguments[1]){var geom$1=arguments[0],forceToLineString=arguments[1],lines=new ArrayList;return geom$1.apply(new LinearComponentExtracter(lines,forceToLineString)),lines}if(arguments[0]instanceof Geometry&&hasInterface(arguments[1],Collection)){var geom$2=arguments[0],lines$2=arguments[1];return geom$2 instanceof LineString$1?lines$2.add(geom$2):geom$2.apply(new LinearComponentExtracter(lines$2)),lines$2}}else if(3===arguments.length){if("boolean"==typeof arguments[2]&&hasInterface(arguments[0],Collection)&&hasInterface(arguments[1],Collection)){for(var geoms$1=arguments[0],lines$3=arguments[1],forceToLineString$1=arguments[2],i$1=geoms$1.iterator(),g$1;i$1.hasNext();)g$1=i$1.next(),LinearComponentExtracter.getLines(g$1,lines$3,forceToLineString$1);return lines$3}if("boolean"==typeof arguments[2]&&arguments[0]instanceof Geometry&&hasInterface(arguments[1],Collection)){var geom$3=arguments[0],lines$4=arguments[1],forceToLineString$2=arguments[2];return geom$3.apply(new LinearComponentExtracter(lines$4,forceToLineString$2)),lines$4}}};var PointLocator=function PointLocator(){if(this._boundaryRule=BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE,this._isIn=null,this._numBoundaries=null,0===arguments.length);else if(1===arguments.length){var boundaryRule=arguments[0];if(null===boundaryRule)throw new IllegalArgumentException("Rule must be non-null");this._boundaryRule=boundaryRule}};PointLocator.prototype.locateInternal=function locateInternal(){var this$1=this;if(arguments[0]instanceof Coordinate&&arguments[1]instanceof Polygon){var p=arguments[0],poly=arguments[1];if(poly.isEmpty())return Location.EXTERIOR;var shell=poly.getExteriorRing(),shellLoc=this.locateInPolygonRing(p,shell);if(shellLoc===Location.EXTERIOR)return Location.EXTERIOR;if(shellLoc===Location.BOUNDARY)return Location.BOUNDARY;for(var i=0;i<poly.getNumInteriorRing();i++){var hole=poly.getInteriorRingN(i),holeLoc=this$1.locateInPolygonRing(p,hole);if(holeLoc===Location.INTERIOR)return Location.EXTERIOR;if(holeLoc===Location.BOUNDARY)return Location.BOUNDARY}return Location.INTERIOR}if(arguments[0]instanceof Coordinate&&arguments[1]instanceof LineString$1){var p$1=arguments[0],l=arguments[1];if(!l.getEnvelopeInternal().intersects(p$1))return Location.EXTERIOR;var pt=l.getCoordinates();return!l.isClosed()&&(p$1.equals(pt[0])||p$1.equals(pt[pt.length-1]))?Location.BOUNDARY:CGAlgorithms.isOnLine(p$1,pt)?Location.INTERIOR:Location.EXTERIOR}if(arguments[0]instanceof Coordinate&&arguments[1]instanceof Point){var p$2=arguments[0],pt$1=arguments[1],ptCoord=pt$1.getCoordinate();return ptCoord.equals2D(p$2)?Location.INTERIOR:Location.EXTERIOR}},PointLocator.prototype.locateInPolygonRing=function locateInPolygonRing(p,ring){return ring.getEnvelopeInternal().intersects(p)?CGAlgorithms.locatePointInRing(p,ring.getCoordinates()):Location.EXTERIOR},PointLocator.prototype.intersects=function intersects(p,geom){return this.locate(p,geom)!==Location.EXTERIOR},PointLocator.prototype.updateLocationInfo=function updateLocationInfo(loc){loc===Location.INTERIOR&&(this._isIn=!0),loc===Location.BOUNDARY&&this._numBoundaries++},PointLocator.prototype.computeLocation=function computeLocation(p,geom){var this$1=this;if(geom instanceof Point&&this.updateLocationInfo(this.locateInternal(p,geom)),geom instanceof LineString$1)this.updateLocationInfo(this.locateInternal(p,geom));else if(geom instanceof Polygon)this.updateLocationInfo(this.locateInternal(p,geom));else if(geom instanceof MultiLineString)for(var ml=geom,i=0,l;i<ml.getNumGeometries();i++)l=ml.getGeometryN(i),this$1.updateLocationInfo(this$1.locateInternal(p,l));else if(geom instanceof MultiPolygon)for(var mpoly=geom,i$1=0,poly;i$1<mpoly.getNumGeometries();i$1++)poly=mpoly.getGeometryN(i$1),this$1.updateLocationInfo(this$1.locateInternal(p,poly));else if(geom instanceof GeometryCollection)for(var geomi=new GeometryCollectionIterator(geom),g2;geomi.hasNext();)g2=geomi.next(),g2!==geom&&this$1.computeLocation(p,g2)},PointLocator.prototype.locate=function locate(p,geom){return geom.isEmpty()?Location.EXTERIOR:geom instanceof LineString$1?this.locateInternal(p,geom):geom instanceof Polygon?this.locateInternal(p,geom):(this._isIn=!1,this._numBoundaries=0,this.computeLocation(p,geom),this._boundaryRule.isInBoundary(this._numBoundaries)?Location.BOUNDARY:0<this._numBoundaries||this._isIn?Location.INTERIOR:Location.EXTERIOR)},PointLocator.prototype.interfaces_=function interfaces_(){return[]},PointLocator.prototype.getClass=function getClass(){return PointLocator};var GeometryLocation=function GeometryLocation(){if(this._component=null,this._segIndex=null,this._pt=null,2===arguments.length){var component=arguments[0],pt=arguments[1];GeometryLocation.call(this,component,GeometryLocation.INSIDE_AREA,pt)}else if(3===arguments.length){var component$1=arguments[0],segIndex=arguments[1],pt$1=arguments[2];this._component=component$1,this._segIndex=segIndex,this._pt=pt$1}},staticAccessors$38={INSIDE_AREA:{configurable:!0}};GeometryLocation.prototype.isInsideArea=function isInsideArea(){return this._segIndex===GeometryLocation.INSIDE_AREA},GeometryLocation.prototype.getCoordinate=function getCoordinate(){return this._pt},GeometryLocation.prototype.getGeometryComponent=function getGeometryComponent(){return this._component},GeometryLocation.prototype.getSegmentIndex=function getSegmentIndex(){return this._segIndex},GeometryLocation.prototype.interfaces_=function interfaces_(){return[]},GeometryLocation.prototype.getClass=function getClass(){return GeometryLocation},staticAccessors$38.INSIDE_AREA.get=function(){return-1},Object.defineProperties(GeometryLocation,staticAccessors$38);var PointExtracter=function PointExtracter(pts){this._pts=pts||null};PointExtracter.prototype.filter=function filter(geom){geom instanceof Point&&this._pts.add(geom)},PointExtracter.prototype.interfaces_=function interfaces_(){return[GeometryFilter]},PointExtracter.prototype.getClass=function getClass(){return PointExtracter},PointExtracter.getPoints=function getPoints(){if(1===arguments.length){var geom=arguments[0];return geom instanceof Point?Collections.singletonList(geom):PointExtracter.getPoints(geom,new ArrayList)}if(2===arguments.length){var geom$1=arguments[0],list=arguments[1];return geom$1 instanceof Point?list.add(geom$1):geom$1 instanceof GeometryCollection&&geom$1.apply(new PointExtracter(list)),list}};var ConnectedElementLocationFilter=function ConnectedElementLocationFilter(){this._locations=null;var locations=arguments[0];this._locations=locations};ConnectedElementLocationFilter.prototype.filter=function filter(geom){(geom instanceof Point||geom instanceof LineString$1||geom instanceof Polygon)&&this._locations.add(new GeometryLocation(geom,0,geom.getCoordinate()))},ConnectedElementLocationFilter.prototype.interfaces_=function interfaces_(){return[GeometryFilter]},ConnectedElementLocationFilter.prototype.getClass=function getClass(){return ConnectedElementLocationFilter},ConnectedElementLocationFilter.getLocations=function getLocations(geom){var locations=new ArrayList;return geom.apply(new ConnectedElementLocationFilter(locations)),locations};var DistanceOp=function DistanceOp(){if(this._geom=null,this._terminateDistance=0,this._ptLocator=new PointLocator,this._minDistanceLocation=null,this._minDistance=Double.MAX_VALUE,2===arguments.length){var g0=arguments[0],g1=arguments[1];this._geom=[g0,g1],this._terminateDistance=0}else if(3===arguments.length){var g0$1=arguments[0],g1$1=arguments[1],terminateDistance=arguments[2];this._geom=[,,].fill(null),this._geom[0]=g0$1,this._geom[1]=g1$1,this._terminateDistance=terminateDistance}};DistanceOp.prototype.computeContainmentDistance=function computeContainmentDistance(){var this$1=this;if(0===arguments.length){var locPtPoly=[,,].fill(null);if(this.computeContainmentDistance(0,locPtPoly),this._minDistance<=this._terminateDistance)return null;this.computeContainmentDistance(1,locPtPoly)}else if(2===arguments.length){var polyGeomIndex=arguments[0],locPtPoly$1=arguments[1],locationsIndex=1-polyGeomIndex,polys=PolygonExtracter.getPolygons(this._geom[polyGeomIndex]);if(0<polys.size()){var insideLocs=ConnectedElementLocationFilter.getLocations(this._geom[locationsIndex]);if(this.computeContainmentDistance(insideLocs,polys,locPtPoly$1),this._minDistance<=this._terminateDistance)return this._minDistanceLocation[locationsIndex]=locPtPoly$1[0],this._minDistanceLocation[polyGeomIndex]=locPtPoly$1[1],null}}else if(3===arguments.length)if(arguments[2]instanceof Array&&hasInterface(arguments[0],List)&&hasInterface(arguments[1],List))for(var locs=arguments[0],polys$1=arguments[1],locPtPoly$2=arguments[2],i=0,loc;i<locs.size();i++){loc=locs.get(i);for(var j=0;j<polys$1.size();j++)if(this$1.computeContainmentDistance(loc,polys$1.get(j),locPtPoly$2),this$1._minDistance<=this$1._terminateDistance)return null}else if(arguments[2]instanceof Array&&arguments[0]instanceof GeometryLocation&&arguments[1]instanceof Polygon){var ptLoc=arguments[0],poly=arguments[1],locPtPoly$3=arguments[2],pt=ptLoc.getCoordinate();if(Location.EXTERIOR!==this._ptLocator.locate(pt,poly))return this._minDistance=0,locPtPoly$3[0]=ptLoc,locPtPoly$3[1]=new GeometryLocation(poly,pt),null}},DistanceOp.prototype.computeMinDistanceLinesPoints=function computeMinDistanceLinesPoints(lines,points,locGeom){for(var this$1=this,i=0,line;i<lines.size();i++){line=lines.get(i);for(var j=0,pt;j<points.size();j++)if(pt=points.get(j),this$1.computeMinDistance(line,pt,locGeom),this$1._minDistance<=this$1._terminateDistance)return null}},DistanceOp.prototype.computeFacetDistance=function computeFacetDistance(){var locGeom=[,,].fill(null),lines0=LinearComponentExtracter.getLines(this._geom[0]),lines1=LinearComponentExtracter.getLines(this._geom[1]),pts0=PointExtracter.getPoints(this._geom[0]),pts1=PointExtracter.getPoints(this._geom[1]);return(this.computeMinDistanceLines(lines0,lines1,locGeom),this.updateMinDistance(locGeom,!1),this._minDistance<=this._terminateDistance)?null:(locGeom[0]=null,locGeom[1]=null,this.computeMinDistanceLinesPoints(lines0,pts1,locGeom),this.updateMinDistance(locGeom,!1),this._minDistance<=this._terminateDistance)?null:(locGeom[0]=null,locGeom[1]=null,this.computeMinDistanceLinesPoints(lines1,pts0,locGeom),this.updateMinDistance(locGeom,!0),this._minDistance<=this._terminateDistance?null:void(locGeom[0]=null,locGeom[1]=null,this.computeMinDistancePoints(pts0,pts1,locGeom),this.updateMinDistance(locGeom,!1)))},DistanceOp.prototype.nearestLocations=function nearestLocations(){return this.computeMinDistance(),this._minDistanceLocation},DistanceOp.prototype.updateMinDistance=function updateMinDistance(locGeom,flip){return null===locGeom[0]?null:void(flip?(this._minDistanceLocation[0]=locGeom[1],this._minDistanceLocation[1]=locGeom[0]):(this._minDistanceLocation[0]=locGeom[0],this._minDistanceLocation[1]=locGeom[1]))},DistanceOp.prototype.nearestPoints=function nearestPoints(){this.computeMinDistance();var nearestPts=[this._minDistanceLocation[0].getCoordinate(),this._minDistanceLocation[1].getCoordinate()];return nearestPts},DistanceOp.prototype.computeMinDistance=function computeMinDistance(){var this$1=this;if(0===arguments.length){if(null!==this._minDistanceLocation)return null;if(this._minDistanceLocation=[,,].fill(null),this.computeContainmentDistance(),this._minDistance<=this._terminateDistance)return null;this.computeFacetDistance()}else if(3===arguments.length)if(arguments[2]instanceof Array&&arguments[0]instanceof LineString$1&&arguments[1]instanceof Point){var line=arguments[0],pt=arguments[1],locGeom=arguments[2];if(line.getEnvelopeInternal().distance(pt.getEnvelopeInternal())>this._minDistance)return null;for(var coord0=line.getCoordinates(),coord=pt.getCoordinate(),i=0,dist;i<coord0.length-1;i++){if(dist=CGAlgorithms.distancePointLine(coord,coord0[i],coord0[i+1]),dist<this$1._minDistance){this$1._minDistance=dist;var seg=new LineSegment(coord0[i],coord0[i+1]),segClosestPoint=seg.closestPoint(coord);locGeom[0]=new GeometryLocation(line,i,segClosestPoint),locGeom[1]=new GeometryLocation(pt,0,coord)}if(this$1._minDistance<=this$1._terminateDistance)return null}}else if(arguments[2]instanceof Array&&arguments[0]instanceof LineString$1&&arguments[1]instanceof LineString$1){var line0=arguments[0],line1=arguments[1],locGeom$1=arguments[2];if(line0.getEnvelopeInternal().distance(line1.getEnvelopeInternal())>this._minDistance)return null;for(var coord0$1=line0.getCoordinates(),coord1=line1.getCoordinates(),i$1=0;i$1<coord0$1.length-1;i$1++)for(var j=0,dist$1;j<coord1.length-1;j++){if(dist$1=CGAlgorithms.distanceLineLine(coord0$1[i$1],coord0$1[i$1+1],coord1[j],coord1[j+1]),dist$1<this$1._minDistance){this$1._minDistance=dist$1;var seg0=new LineSegment(coord0$1[i$1],coord0$1[i$1+1]),seg1=new LineSegment(coord1[j],coord1[j+1]),closestPt=seg0.closestPoints(seg1);locGeom$1[0]=new GeometryLocation(line0,i$1,closestPt[0]),locGeom$1[1]=new GeometryLocation(line1,j,closestPt[1])}if(this$1._minDistance<=this$1._terminateDistance)return null}}},DistanceOp.prototype.computeMinDistancePoints=function computeMinDistancePoints(points0,points1,locGeom){for(var this$1=this,i=0,pt0;i<points0.size();i++){pt0=points0.get(i);for(var j=0;j<points1.size();j++){var pt1=points1.get(j),dist=pt0.getCoordinate().distance(pt1.getCoordinate());if(dist<this$1._minDistance&&(this$1._minDistance=dist,locGeom[0]=new GeometryLocation(pt0,0,pt0.getCoordinate()),locGeom[1]=new GeometryLocation(pt1,0,pt1.getCoordinate())),this$1._minDistance<=this$1._terminateDistance)return null}}},DistanceOp.prototype.distance=function distance(){if(null===this._geom[0]||null===this._geom[1])throw new IllegalArgumentException("null geometries are not supported");return this._geom[0].isEmpty()||this._geom[1].isEmpty()?0:(this.computeMinDistance(),this._minDistance)},DistanceOp.prototype.computeMinDistanceLines=function computeMinDistanceLines(lines0,lines1,locGeom){for(var this$1=this,i=0,line0;i<lines0.size();i++){line0=lines0.get(i);for(var j=0,line1;j<lines1.size();j++)if(line1=lines1.get(j),this$1.computeMinDistance(line0,line1,locGeom),this$1._minDistance<=this$1._terminateDistance)return null}},DistanceOp.prototype.interfaces_=function interfaces_(){return[]},DistanceOp.prototype.getClass=function getClass(){return DistanceOp},DistanceOp.distance=function distance(g0,g1){var distOp=new DistanceOp(g0,g1);return distOp.distance()},DistanceOp.isWithinDistance=function isWithinDistance(g0,g1,distance){var distOp=new DistanceOp(g0,g1,distance);return distOp.distance()<=distance},DistanceOp.nearestPoints=function nearestPoints(g0,g1){var distOp=new DistanceOp(g0,g1);return distOp.nearestPoints()};var PointPairDistance$2=function PointPairDistance(){this._pt=[new Coordinate,new Coordinate],this._distance=Double.NaN,this._isNull=!0};PointPairDistance$2.prototype.getCoordinates=function getCoordinates(){return this._pt},PointPairDistance$2.prototype.getCoordinate=function getCoordinate(i){return this._pt[i]},PointPairDistance$2.prototype.setMinimum=function setMinimum(){if(1===arguments.length){var ptDist=arguments[0];this.setMinimum(ptDist._pt[0],ptDist._pt[1])}else if(2===arguments.length){var p0=arguments[0],p1=arguments[1];if(this._isNull)return this.initialize(p0,p1),null;var dist=p0.distance(p1);dist<this._distance&&this.initialize(p0,p1,dist)}},PointPairDistance$2.prototype.initialize=function initialize(){if(0===arguments.length)this._isNull=!0;else if(2===arguments.length){var p0=arguments[0],p1=arguments[1];this._pt[0].setCoordinate(p0),this._pt[1].setCoordinate(p1),this._distance=p0.distance(p1),this._isNull=!1}else if(3===arguments.length){var p0$1=arguments[0],p1$1=arguments[1],distance=arguments[2];this._pt[0].setCoordinate(p0$1),this._pt[1].setCoordinate(p1$1),this._distance=distance,this._isNull=!1}},PointPairDistance$2.prototype.toString=function toString(){return WKTWriter.toLineString(this._pt[0],this._pt[1])},PointPairDistance$2.prototype.getDistance=function getDistance(){return this._distance},PointPairDistance$2.prototype.setMaximum=function setMaximum(){if(1===arguments.length){var ptDist=arguments[0];this.setMaximum(ptDist._pt[0],ptDist._pt[1])}else if(2===arguments.length){var p0=arguments[0],p1=arguments[1];if(this._isNull)return this.initialize(p0,p1),null;var dist=p0.distance(p1);dist>this._distance&&this.initialize(p0,p1,dist)}},PointPairDistance$2.prototype.interfaces_=function interfaces_(){return[]},PointPairDistance$2.prototype.getClass=function getClass(){return PointPairDistance$2};var DistanceToPoint=function DistanceToPoint(){};DistanceToPoint.prototype.interfaces_=function interfaces_(){return[]},DistanceToPoint.prototype.getClass=function getClass(){return DistanceToPoint},DistanceToPoint.computeDistance=function computeDistance(){if(arguments[2]instanceof PointPairDistance$2&&arguments[0]instanceof LineString$1&&arguments[1]instanceof Coordinate)for(var line=arguments[0],pt=arguments[1],ptDist=arguments[2],tempSegment=new LineSegment,coords=line.getCoordinates(),i=0;i<coords.length-1;i++){tempSegment.setCoordinates(coords[i],coords[i+1]);var closestPt=tempSegment.closestPoint(pt);ptDist.setMinimum(closestPt,pt)}else if(arguments[2]instanceof PointPairDistance$2&&arguments[0]instanceof Polygon&&arguments[1]instanceof Coordinate){var poly=arguments[0],pt$1=arguments[1],ptDist$1=arguments[2];DistanceToPoint.computeDistance(poly.getExteriorRing(),pt$1,ptDist$1);for(var i$1=0;i$1<poly.getNumInteriorRing();i$1++)DistanceToPoint.computeDistance(poly.getInteriorRingN(i$1),pt$1,ptDist$1)}else if(arguments[2]instanceof PointPairDistance$2&&arguments[0]instanceof Geometry&&arguments[1]instanceof Coordinate){var geom=arguments[0],pt$2=arguments[1],ptDist$2=arguments[2];if(geom instanceof LineString$1)DistanceToPoint.computeDistance(geom,pt$2,ptDist$2);else if(geom instanceof Polygon)DistanceToPoint.computeDistance(geom,pt$2,ptDist$2);else if(geom instanceof GeometryCollection)for(var gc=geom,i$2=0,g;i$2<gc.getNumGeometries();i$2++)g=gc.getGeometryN(i$2),DistanceToPoint.computeDistance(g,pt$2,ptDist$2);else ptDist$2.setMinimum(geom.getCoordinate(),pt$2)}else if(arguments[2]instanceof PointPairDistance$2&&arguments[0]instanceof LineSegment&&arguments[1]instanceof Coordinate){var segment=arguments[0],pt$3=arguments[1],ptDist$3=arguments[2],closestPt$1=segment.closestPoint(pt$3);ptDist$3.setMinimum(closestPt$1,pt$3)}};var DiscreteHausdorffDistance=function DiscreteHausdorffDistance(){this._g0=null,this._g1=null,this._ptDist=new PointPairDistance$2,this._densifyFrac=0;var g0=arguments[0],g1=arguments[1];this._g0=g0,this._g1=g1},staticAccessors$39={MaxPointDistanceFilter:{configurable:!0},MaxDensifiedByFractionDistanceFilter:{configurable:!0}};DiscreteHausdorffDistance.prototype.getCoordinates=function getCoordinates(){return this._ptDist.getCoordinates()},DiscreteHausdorffDistance.prototype.setDensifyFraction=function setDensifyFraction(densifyFrac){if(1<densifyFrac||0>=densifyFrac)throw new IllegalArgumentException("Fraction is not in range (0.0 - 1.0]");this._densifyFrac=densifyFrac},DiscreteHausdorffDistance.prototype.compute=function compute(g0,g1){this.computeOrientedDistance(g0,g1,this._ptDist),this.computeOrientedDistance(g1,g0,this._ptDist)},DiscreteHausdorffDistance.prototype.distance=function distance(){return this.compute(this._g0,this._g1),this._ptDist.getDistance()},DiscreteHausdorffDistance.prototype.computeOrientedDistance=function computeOrientedDistance(discreteGeom,geom,ptDist){var distFilter=new MaxPointDistanceFilter$1(geom);if(discreteGeom.apply(distFilter),ptDist.setMaximum(distFilter.getMaxPointDistance()),0<this._densifyFrac){var fracFilter=new MaxDensifiedByFractionDistanceFilter(geom,this._densifyFrac);discreteGeom.apply(fracFilter),ptDist.setMaximum(fracFilter.getMaxPointDistance())}},DiscreteHausdorffDistance.prototype.orientedDistance=function orientedDistance(){return this.computeOrientedDistance(this._g0,this._g1,this._ptDist),this._ptDist.getDistance()},DiscreteHausdorffDistance.prototype.interfaces_=function interfaces_(){return[]},DiscreteHausdorffDistance.prototype.getClass=function getClass(){return DiscreteHausdorffDistance},DiscreteHausdorffDistance.distance=function distance(){if(2===arguments.length){var g0=arguments[0],g1=arguments[1],dist=new DiscreteHausdorffDistance(g0,g1);return dist.distance()}if(3===arguments.length){var g0$1=arguments[0],g1$1=arguments[1],densifyFrac=arguments[2],dist$1=new DiscreteHausdorffDistance(g0$1,g1$1);return dist$1.setDensifyFraction(densifyFrac),dist$1.distance()}},staticAccessors$39.MaxPointDistanceFilter.get=function(){return MaxPointDistanceFilter$1},staticAccessors$39.MaxDensifiedByFractionDistanceFilter.get=function(){return MaxDensifiedByFractionDistanceFilter},Object.defineProperties(DiscreteHausdorffDistance,staticAccessors$39);var MaxPointDistanceFilter$1=function MaxPointDistanceFilter(){this._maxPtDist=new PointPairDistance$2,this._minPtDist=new PointPairDistance$2,this._euclideanDist=new DistanceToPoint,this._geom=null;var geom=arguments[0];this._geom=geom};MaxPointDistanceFilter$1.prototype.filter=function filter(pt){this._minPtDist.initialize(),DistanceToPoint.computeDistance(this._geom,pt,this._minPtDist),this._maxPtDist.setMaximum(this._minPtDist)},MaxPointDistanceFilter$1.prototype.getMaxPointDistance=function getMaxPointDistance(){return this._maxPtDist},MaxPointDistanceFilter$1.prototype.interfaces_=function interfaces_(){return[CoordinateFilter]},MaxPointDistanceFilter$1.prototype.getClass=function getClass(){return MaxPointDistanceFilter$1};var MaxDensifiedByFractionDistanceFilter=function MaxDensifiedByFractionDistanceFilter(){this._maxPtDist=new PointPairDistance$2,this._minPtDist=new PointPairDistance$2,this._geom=null,this._numSubSegs=0;var geom=arguments[0],fraction=arguments[1];this._geom=geom,this._numSubSegs=_Mathtrunc(_Mathround(1/fraction))};MaxDensifiedByFractionDistanceFilter.prototype.filter=function filter(seq,index){var this$1=this;if(0===index)return null;for(var p0=seq.getCoordinate(index-1),p1=seq.getCoordinate(index),delx=(p1.x-p0.x)/this._numSubSegs,dely=(p1.y-p0.y)/this._numSubSegs,i=0;i<this._numSubSegs;i++){var x=p0.x+i*delx,y=p0.y+i*dely,pt=new Coordinate(x,y);this$1._minPtDist.initialize(),DistanceToPoint.computeDistance(this$1._geom,pt,this$1._minPtDist),this$1._maxPtDist.setMaximum(this$1._minPtDist)}},MaxDensifiedByFractionDistanceFilter.prototype.isDone=function isDone(){return!1},MaxDensifiedByFractionDistanceFilter.prototype.isGeometryChanged=function isGeometryChanged(){return!1},MaxDensifiedByFractionDistanceFilter.prototype.getMaxPointDistance=function getMaxPointDistance(){return this._maxPtDist},MaxDensifiedByFractionDistanceFilter.prototype.interfaces_=function interfaces_(){return[CoordinateSequenceFilter]},MaxDensifiedByFractionDistanceFilter.prototype.getClass=function getClass(){return MaxDensifiedByFractionDistanceFilter};var BufferDistanceValidator=function BufferDistanceValidator(input,bufDistance,result){this._minValidDistance=null,this._maxValidDistance=null,this._minDistanceFound=null,this._maxDistanceFound=null,this._isValid=!0,this._errMsg=null,this._errorLocation=null,this._errorIndicator=null,this._input=input||null,this._bufDistance=bufDistance||null,this._result=result||null},staticAccessors$37={VERBOSE:{configurable:!0},MAX_DISTANCE_DIFF_FRAC:{configurable:!0}};BufferDistanceValidator.prototype.checkMaximumDistance=function checkMaximumDistance(input,bufCurve,maxDist){var haus=new DiscreteHausdorffDistance(bufCurve,input);if(haus.setDensifyFraction(0.25),this._maxDistanceFound=haus.orientedDistance(),this._maxDistanceFound>maxDist){this._isValid=!1;var pts=haus.getCoordinates();this._errorLocation=pts[1],this._errorIndicator=input.getFactory().createLineString(pts),this._errMsg="Distance between buffer curve and input is too large ("+this._maxDistanceFound+" at "+WKTWriter.toLineString(pts[0],pts[1])+")"}},BufferDistanceValidator.prototype.isValid=function isValid(){var posDistance=_Mathabs(this._bufDistance),distDelta=BufferDistanceValidator.MAX_DISTANCE_DIFF_FRAC*posDistance;return!(this._minValidDistance=posDistance-distDelta,this._maxValidDistance=posDistance+distDelta,!(this._input.isEmpty()||this._result.isEmpty()))||(0<this._bufDistance?this.checkPositiveValid():this.checkNegativeValid(),BufferDistanceValidator.VERBOSE&&System.out.println("Min Dist= "+this._minDistanceFound+"  err= "+(1-this._minDistanceFound/this._bufDistance)+"  Max Dist= "+this._maxDistanceFound+"  err= "+(this._maxDistanceFound/this._bufDistance-1)),this._isValid)},BufferDistanceValidator.prototype.checkNegativeValid=function checkNegativeValid(){if(!(this._input instanceof Polygon||this._input instanceof MultiPolygon||this._input instanceof GeometryCollection))return null;var inputCurve=this.getPolygonLines(this._input);return this.checkMinimumDistance(inputCurve,this._result,this._minValidDistance),this._isValid?void this.checkMaximumDistance(inputCurve,this._result,this._maxValidDistance):null},BufferDistanceValidator.prototype.getErrorIndicator=function getErrorIndicator(){return this._errorIndicator},BufferDistanceValidator.prototype.checkMinimumDistance=function checkMinimumDistance(g1,g2,minDist){var distOp=new DistanceOp(g1,g2,minDist);if(this._minDistanceFound=distOp.distance(),this._minDistanceFound<minDist){this._isValid=!1;var pts=distOp.nearestPoints();this._errorLocation=distOp.nearestPoints()[1],this._errorIndicator=g1.getFactory().createLineString(pts),this._errMsg="Distance between buffer curve and input is too small ("+this._minDistanceFound+" at "+WKTWriter.toLineString(pts[0],pts[1])+" )"}},BufferDistanceValidator.prototype.checkPositiveValid=function checkPositiveValid(){var bufCurve=this._result.getBoundary();return this.checkMinimumDistance(this._input,bufCurve,this._minValidDistance),this._isValid?void this.checkMaximumDistance(this._input,bufCurve,this._maxValidDistance):null},BufferDistanceValidator.prototype.getErrorLocation=function getErrorLocation(){return this._errorLocation},BufferDistanceValidator.prototype.getPolygonLines=function getPolygonLines(g){for(var lines=new ArrayList,lineExtracter=new LinearComponentExtracter(lines),polys=PolygonExtracter.getPolygons(g),i=polys.iterator(),poly;i.hasNext();)poly=i.next(),poly.apply(lineExtracter);return g.getFactory().buildGeometry(lines)},BufferDistanceValidator.prototype.getErrorMessage=function getErrorMessage(){return this._errMsg},BufferDistanceValidator.prototype.interfaces_=function interfaces_(){return[]},BufferDistanceValidator.prototype.getClass=function getClass(){return BufferDistanceValidator},staticAccessors$37.VERBOSE.get=function(){return!1},staticAccessors$37.MAX_DISTANCE_DIFF_FRAC.get=function(){return 0.012},Object.defineProperties(BufferDistanceValidator,staticAccessors$37);var BufferResultValidator=function BufferResultValidator(input,distance,result){this._isValid=!0,this._errorMsg=null,this._errorLocation=null,this._errorIndicator=null,this._input=input||null,this._distance=distance||null,this._result=result||null},staticAccessors$40={VERBOSE:{configurable:!0},MAX_ENV_DIFF_FRAC:{configurable:!0}};BufferResultValidator.prototype.isValid=function isValid(){return(this.checkPolygonal(),!this._isValid)?this._isValid:(this.checkExpectedEmpty(),!this._isValid)?this._isValid:(this.checkEnvelope(),!this._isValid)?this._isValid:(this.checkArea(),!this._isValid)?this._isValid:(this.checkDistance(),this._isValid)},BufferResultValidator.prototype.checkEnvelope=function checkEnvelope(){if(0>this._distance)return null;var padding=this._distance*BufferResultValidator.MAX_ENV_DIFF_FRAC;0==padding&&(padding=1e-3);var expectedEnv=new Envelope(this._input.getEnvelopeInternal());expectedEnv.expandBy(this._distance);var bufEnv=new Envelope(this._result.getEnvelopeInternal());bufEnv.expandBy(padding),bufEnv.contains(expectedEnv)||(this._isValid=!1,this._errorMsg="Buffer envelope is incorrect",this._errorIndicator=this._input.getFactory().toGeometry(bufEnv)),this.report("Envelope")},BufferResultValidator.prototype.checkDistance=function checkDistance(){var distValid=new BufferDistanceValidator(this._input,this._distance,this._result);distValid.isValid()||(this._isValid=!1,this._errorMsg=distValid.getErrorMessage(),this._errorLocation=distValid.getErrorLocation(),this._errorIndicator=distValid.getErrorIndicator()),this.report("Distance")},BufferResultValidator.prototype.checkArea=function checkArea(){var inputArea=this._input.getArea(),resultArea=this._result.getArea();0<this._distance&&inputArea>resultArea&&(this._isValid=!1,this._errorMsg="Area of positive buffer is smaller than input",this._errorIndicator=this._result),0>this._distance&&inputArea<resultArea&&(this._isValid=!1,this._errorMsg="Area of negative buffer is larger than input",this._errorIndicator=this._result),this.report("Area")},BufferResultValidator.prototype.checkPolygonal=function checkPolygonal(){this._result instanceof Polygon||this._result instanceof MultiPolygon||(this._isValid=!1),this._errorMsg="Result is not polygonal",this._errorIndicator=this._result,this.report("Polygonal")},BufferResultValidator.prototype.getErrorIndicator=function getErrorIndicator(){return this._errorIndicator},BufferResultValidator.prototype.getErrorLocation=function getErrorLocation(){return this._errorLocation},BufferResultValidator.prototype.checkExpectedEmpty=function checkExpectedEmpty(){return 2<=this._input.getDimension()?null:0<this._distance?null:void(!this._result.isEmpty()&&(this._isValid=!1,this._errorMsg="Result is non-empty",this._errorIndicator=this._result),this.report("ExpectedEmpty"))},BufferResultValidator.prototype.report=function report(checkName){return BufferResultValidator.VERBOSE?void System.out.println("Check "+checkName+": "+(this._isValid?"passed":"FAILED")):null},BufferResultValidator.prototype.getErrorMessage=function getErrorMessage(){return this._errorMsg},BufferResultValidator.prototype.interfaces_=function interfaces_(){return[]},BufferResultValidator.prototype.getClass=function getClass(){return BufferResultValidator},BufferResultValidator.isValidMsg=function isValidMsg(g,distance,result){var validator=new BufferResultValidator(g,distance,result);return validator.isValid()?null:validator.getErrorMessage()},BufferResultValidator.isValid=function isValid(g,distance,result){var validator=new BufferResultValidator(g,distance,result);return!!validator.isValid()},staticAccessors$40.VERBOSE.get=function(){return!1},staticAccessors$40.MAX_ENV_DIFF_FRAC.get=function(){return 0.012},Object.defineProperties(BufferResultValidator,staticAccessors$40);var BasicSegmentString=function BasicSegmentString(){this._pts=null,this._data=null;var pts=arguments[0],data=arguments[1];this._pts=pts,this._data=data};BasicSegmentString.prototype.getCoordinates=function getCoordinates(){return this._pts},BasicSegmentString.prototype.size=function size(){return this._pts.length},BasicSegmentString.prototype.getCoordinate=function getCoordinate(i){return this._pts[i]},BasicSegmentString.prototype.isClosed=function isClosed(){return this._pts[0].equals(this._pts[this._pts.length-1])},BasicSegmentString.prototype.getSegmentOctant=function getSegmentOctant(index){return index===this._pts.length-1?-1:Octant.octant(this.getCoordinate(index),this.getCoordinate(index+1))},BasicSegmentString.prototype.setData=function setData(data){this._data=data},BasicSegmentString.prototype.getData=function getData(){return this._data},BasicSegmentString.prototype.toString=function toString(){return WKTWriter.toLineString(new CoordinateArraySequence(this._pts))},BasicSegmentString.prototype.interfaces_=function interfaces_(){return[SegmentString]},BasicSegmentString.prototype.getClass=function getClass(){return BasicSegmentString};var InteriorIntersectionFinder=function InteriorIntersectionFinder(){this._findAllIntersections=!1,this._isCheckEndSegmentsOnly=!1,this._li=null,this._interiorIntersection=null,this._intSegments=null,this._intersections=new ArrayList,this._intersectionCount=0,this._keepIntersections=!0;var li=arguments[0];this._li=li,this._interiorIntersection=null};InteriorIntersectionFinder.prototype.getInteriorIntersection=function getInteriorIntersection(){return this._interiorIntersection},InteriorIntersectionFinder.prototype.setCheckEndSegmentsOnly=function setCheckEndSegmentsOnly(isCheckEndSegmentsOnly){this._isCheckEndSegmentsOnly=isCheckEndSegmentsOnly},InteriorIntersectionFinder.prototype.getIntersectionSegments=function getIntersectionSegments(){return this._intSegments},InteriorIntersectionFinder.prototype.count=function count(){return this._intersectionCount},InteriorIntersectionFinder.prototype.getIntersections=function getIntersections(){return this._intersections},InteriorIntersectionFinder.prototype.setFindAllIntersections=function setFindAllIntersections(findAllIntersections){this._findAllIntersections=findAllIntersections},InteriorIntersectionFinder.prototype.setKeepIntersections=function setKeepIntersections(keepIntersections){this._keepIntersections=keepIntersections},InteriorIntersectionFinder.prototype.processIntersections=function processIntersections(e0,segIndex0,e1,segIndex1){if(!this._findAllIntersections&&this.hasIntersection())return null;if(e0===e1&&segIndex0===segIndex1)return null;if(this._isCheckEndSegmentsOnly){var isEndSegPresent=this.isEndSegment(e0,segIndex0)||this.isEndSegment(e1,segIndex1);if(!isEndSegPresent)return null}var p00=e0.getCoordinates()[segIndex0],p01=e0.getCoordinates()[segIndex0+1],p10=e1.getCoordinates()[segIndex1],p11=e1.getCoordinates()[segIndex1+1];this._li.computeIntersection(p00,p01,p10,p11),this._li.hasIntersection()&&this._li.isInteriorIntersection()&&(this._intSegments=[,,,,].fill(null),this._intSegments[0]=p00,this._intSegments[1]=p01,this._intSegments[2]=p10,this._intSegments[3]=p11,this._interiorIntersection=this._li.getIntersection(0),this._keepIntersections&&this._intersections.add(this._interiorIntersection),this._intersectionCount++)},InteriorIntersectionFinder.prototype.isEndSegment=function isEndSegment(segStr,index){return!(0!==index)||!!(index>=segStr.size()-2)},InteriorIntersectionFinder.prototype.hasIntersection=function hasIntersection(){return null!==this._interiorIntersection},InteriorIntersectionFinder.prototype.isDone=function isDone(){return!this._findAllIntersections&&null!==this._interiorIntersection},InteriorIntersectionFinder.prototype.interfaces_=function interfaces_(){return[SegmentIntersector]},InteriorIntersectionFinder.prototype.getClass=function getClass(){return InteriorIntersectionFinder},InteriorIntersectionFinder.createAllIntersectionsFinder=function createAllIntersectionsFinder(li){var finder=new InteriorIntersectionFinder(li);return finder.setFindAllIntersections(!0),finder},InteriorIntersectionFinder.createAnyIntersectionFinder=function createAnyIntersectionFinder(li){return new InteriorIntersectionFinder(li)},InteriorIntersectionFinder.createIntersectionCounter=function createIntersectionCounter(li){var finder=new InteriorIntersectionFinder(li);return finder.setFindAllIntersections(!0),finder.setKeepIntersections(!1),finder};var FastNodingValidator=function FastNodingValidator(){this._li=new RobustLineIntersector,this._segStrings=null,this._findAllIntersections=!1,this._segInt=null,this._isValid=!0;var segStrings=arguments[0];this._segStrings=segStrings};FastNodingValidator.prototype.execute=function execute(){return null===this._segInt?void this.checkInteriorIntersections():null},FastNodingValidator.prototype.getIntersections=function getIntersections(){return this._segInt.getIntersections()},FastNodingValidator.prototype.isValid=function isValid(){return this.execute(),this._isValid},FastNodingValidator.prototype.setFindAllIntersections=function setFindAllIntersections(findAllIntersections){this._findAllIntersections=findAllIntersections},FastNodingValidator.prototype.checkInteriorIntersections=function checkInteriorIntersections(){this._isValid=!0,this._segInt=new InteriorIntersectionFinder(this._li),this._segInt.setFindAllIntersections(this._findAllIntersections);var noder=new MCIndexNoder;if(noder.setSegmentIntersector(this._segInt),noder.computeNodes(this._segStrings),this._segInt.hasIntersection())return this._isValid=!1,null},FastNodingValidator.prototype.checkValid=function checkValid(){if(this.execute(),!this._isValid)throw new TopologyException(this.getErrorMessage(),this._segInt.getInteriorIntersection())},FastNodingValidator.prototype.getErrorMessage=function getErrorMessage(){if(this._isValid)return"no intersections found";var intSegs=this._segInt.getIntersectionSegments();return"found non-noded intersection between "+WKTWriter.toLineString(intSegs[0],intSegs[1])+" and "+WKTWriter.toLineString(intSegs[2],intSegs[3])},FastNodingValidator.prototype.interfaces_=function interfaces_(){return[]},FastNodingValidator.prototype.getClass=function getClass(){return FastNodingValidator},FastNodingValidator.computeIntersections=function computeIntersections(segStrings){var nv=new FastNodingValidator(segStrings);return nv.setFindAllIntersections(!0),nv.isValid(),nv.getIntersections()};var EdgeNodingValidator=function EdgeNodingValidator(){this._nv=null;var edges=arguments[0];this._nv=new FastNodingValidator(EdgeNodingValidator.toSegmentStrings(edges))};EdgeNodingValidator.prototype.checkValid=function checkValid(){this._nv.checkValid()},EdgeNodingValidator.prototype.interfaces_=function interfaces_(){return[]},EdgeNodingValidator.prototype.getClass=function getClass(){return EdgeNodingValidator},EdgeNodingValidator.toSegmentStrings=function toSegmentStrings(edges){for(var segStrings=new ArrayList,i=edges.iterator(),e;i.hasNext();)e=i.next(),segStrings.add(new BasicSegmentString(e.getCoordinates(),e));return segStrings},EdgeNodingValidator.checkValid=function checkValid(edges){var validator=new EdgeNodingValidator(edges);validator.checkValid()};var GeometryCollectionMapper=function GeometryCollectionMapper(mapOp){this._mapOp=mapOp};GeometryCollectionMapper.prototype.map=function map(gc){for(var this$1=this,mapped=new ArrayList,i=0,g;i<gc.getNumGeometries();i++)g=this$1._mapOp.map(gc.getGeometryN(i)),g.isEmpty()||mapped.add(g);return gc.getFactory().createGeometryCollection(GeometryFactory.toGeometryArray(mapped))},GeometryCollectionMapper.prototype.interfaces_=function interfaces_(){return[]},GeometryCollectionMapper.prototype.getClass=function getClass(){return GeometryCollectionMapper},GeometryCollectionMapper.map=function map(gc,op){var mapper=new GeometryCollectionMapper(op);return mapper.map(gc)};var LineBuilder=function LineBuilder(){this._op=null,this._geometryFactory=null,this._ptLocator=null,this._lineEdgesList=new ArrayList,this._resultLineList=new ArrayList;var op=arguments[0],geometryFactory=arguments[1],ptLocator=arguments[2];this._op=op,this._geometryFactory=geometryFactory,this._ptLocator=ptLocator};LineBuilder.prototype.collectLines=function collectLines(opCode){for(var this$1=this,it=this._op.getGraph().getEdgeEnds().iterator(),de;it.hasNext();)de=it.next(),this$1.collectLineEdge(de,opCode,this$1._lineEdgesList),this$1.collectBoundaryTouchEdge(de,opCode,this$1._lineEdgesList)},LineBuilder.prototype.labelIsolatedLine=function labelIsolatedLine(e,targetIndex){var loc=this._ptLocator.locate(e.getCoordinate(),this._op.getArgGeometry(targetIndex));e.getLabel().setLocation(targetIndex,loc)},LineBuilder.prototype.build=function build(opCode){return this.findCoveredLineEdges(),this.collectLines(opCode),this.buildLines(opCode),this._resultLineList},LineBuilder.prototype.collectLineEdge=function collectLineEdge(de,opCode,edges){var label=de.getLabel(),e=de.getEdge();de.isLineEdge()&&!de.isVisited()&&OverlayOp.isResultOfOp(label,opCode)&&!e.isCovered()&&(edges.add(e),de.setVisitedEdge(!0))},LineBuilder.prototype.findCoveredLineEdges=function findCoveredLineEdges(){for(var this$1=this,nodeit=this._op.getGraph().getNodes().iterator(),node;nodeit.hasNext();)node=nodeit.next(),node.getEdges().findCoveredLineEdges();for(var it=this._op.getGraph().getEdgeEnds().iterator();it.hasNext();){var de=it.next(),e=de.getEdge();if(de.isLineEdge()&&!e.isCoveredSet()){var isCovered=this$1._op.isCoveredByA(de.getCoordinate());e.setCovered(isCovered)}}},LineBuilder.prototype.labelIsolatedLines=function labelIsolatedLines(edgesList){for(var this$1=this,it=edgesList.iterator();it.hasNext();){var e=it.next(),label=e.getLabel();e.isIsolated()&&(label.isNull(0)?this$1.labelIsolatedLine(e,0):this$1.labelIsolatedLine(e,1))}},LineBuilder.prototype.buildLines=function buildLines(opCode){for(var this$1=this,it=this._lineEdgesList.iterator();it.hasNext();){var e=it.next(),line=this$1._geometryFactory.createLineString(e.getCoordinates());this$1._resultLineList.add(line),e.setInResult(!0)}},LineBuilder.prototype.collectBoundaryTouchEdge=function collectBoundaryTouchEdge(de,opCode,edges){var label=de.getLabel();return de.isLineEdge()?null:de.isVisited()?null:de.isInteriorAreaEdge()?null:de.getEdge().isInResult()?null:void(Assert.isTrue(!(de.isInResult()||de.getSym().isInResult())||!de.getEdge().isInResult()),OverlayOp.isResultOfOp(label,opCode)&&opCode===OverlayOp.INTERSECTION&&(edges.add(de.getEdge()),de.setVisitedEdge(!0)))},LineBuilder.prototype.interfaces_=function interfaces_(){return[]},LineBuilder.prototype.getClass=function getClass(){return LineBuilder};var PointBuilder=function PointBuilder(){this._op=null,this._geometryFactory=null,this._resultPointList=new ArrayList;var op=arguments[0],geometryFactory=arguments[1];this._op=op,this._geometryFactory=geometryFactory};PointBuilder.prototype.filterCoveredNodeToPoint=function filterCoveredNodeToPoint(n){var coord=n.getCoordinate();if(!this._op.isCoveredByLA(coord)){var pt=this._geometryFactory.createPoint(coord);this._resultPointList.add(pt)}},PointBuilder.prototype.extractNonCoveredResultNodes=function extractNonCoveredResultNodes(opCode){for(var this$1=this,nodeit=this._op.getGraph().getNodes().iterator(),n;nodeit.hasNext();)if((n=nodeit.next(),!n.isInResult())&&!n.isIncidentEdgeInResult()&&(0===n.getEdges().getDegree()||opCode===OverlayOp.INTERSECTION)){var label=n.getLabel();OverlayOp.isResultOfOp(label,opCode)&&this$1.filterCoveredNodeToPoint(n)}},PointBuilder.prototype.build=function build(opCode){return this.extractNonCoveredResultNodes(opCode),this._resultPointList},PointBuilder.prototype.interfaces_=function interfaces_(){return[]},PointBuilder.prototype.getClass=function getClass(){return PointBuilder};var GeometryTransformer=function GeometryTransformer(){this._inputGeom=null,this._factory=null,this._pruneEmptyGeometry=!0,this._preserveGeometryCollectionType=!0,this._preserveCollections=!1,this._preserveType=!1};GeometryTransformer.prototype.transformPoint=function transformPoint(geom,parent){return this._factory.createPoint(this.transformCoordinates(geom.getCoordinateSequence(),geom))},GeometryTransformer.prototype.transformPolygon=function transformPolygon(geom,parent){var this$1=this,isAllValidLinearRings=!0,shell=this.transformLinearRing(geom.getExteriorRing(),geom);(null===shell||!(shell instanceof LinearRing)||shell.isEmpty())&&(isAllValidLinearRings=!1);for(var holes=new ArrayList,i=0,hole;i<geom.getNumInteriorRing();i++)(hole=this$1.transformLinearRing(geom.getInteriorRingN(i),geom),!(null===hole||hole.isEmpty()))&&(hole instanceof LinearRing||(isAllValidLinearRings=!1),holes.add(hole));if(isAllValidLinearRings)return this._factory.createPolygon(shell,holes.toArray([]));var components=new ArrayList;return null!==shell&&components.add(shell),components.addAll(holes),this._factory.buildGeometry(components)},GeometryTransformer.prototype.createCoordinateSequence=function createCoordinateSequence(coords){return this._factory.getCoordinateSequenceFactory().create(coords)},GeometryTransformer.prototype.getInputGeometry=function getInputGeometry(){return this._inputGeom},GeometryTransformer.prototype.transformMultiLineString=function transformMultiLineString(geom,parent){for(var this$1=this,transGeomList=new ArrayList,i=0,transformGeom;i<geom.getNumGeometries();i++)(transformGeom=this$1.transformLineString(geom.getGeometryN(i),geom),null!==transformGeom)&&(transformGeom.isEmpty()||transGeomList.add(transformGeom));return this._factory.buildGeometry(transGeomList)},GeometryTransformer.prototype.transformCoordinates=function transformCoordinates(coords,parent){return this.copy(coords)},GeometryTransformer.prototype.transformLineString=function transformLineString(geom,parent){return this._factory.createLineString(this.transformCoordinates(geom.getCoordinateSequence(),geom))},GeometryTransformer.prototype.transformMultiPoint=function transformMultiPoint(geom,parent){for(var this$1=this,transGeomList=new ArrayList,i=0,transformGeom;i<geom.getNumGeometries();i++)(transformGeom=this$1.transformPoint(geom.getGeometryN(i),geom),null!==transformGeom)&&(transformGeom.isEmpty()||transGeomList.add(transformGeom));return this._factory.buildGeometry(transGeomList)},GeometryTransformer.prototype.transformMultiPolygon=function transformMultiPolygon(geom,parent){for(var this$1=this,transGeomList=new ArrayList,i=0,transformGeom;i<geom.getNumGeometries();i++)(transformGeom=this$1.transformPolygon(geom.getGeometryN(i),geom),null!==transformGeom)&&(transformGeom.isEmpty()||transGeomList.add(transformGeom));return this._factory.buildGeometry(transGeomList)},GeometryTransformer.prototype.copy=function copy(seq){return seq.copy()},GeometryTransformer.prototype.transformGeometryCollection=function transformGeometryCollection(geom,parent){for(var this$1=this,transGeomList=new ArrayList,i=0,transformGeom;i<geom.getNumGeometries();i++)(transformGeom=this$1.transform(geom.getGeometryN(i)),null!==transformGeom)&&(this$1._pruneEmptyGeometry&&transformGeom.isEmpty()||transGeomList.add(transformGeom));return this._preserveGeometryCollectionType?this._factory.createGeometryCollection(GeometryFactory.toGeometryArray(transGeomList)):this._factory.buildGeometry(transGeomList)},GeometryTransformer.prototype.transform=function transform(inputGeom){if(this._inputGeom=inputGeom,this._factory=inputGeom.getFactory(),inputGeom instanceof Point)return this.transformPoint(inputGeom,null);if(inputGeom instanceof MultiPoint)return this.transformMultiPoint(inputGeom,null);if(inputGeom instanceof LinearRing)return this.transformLinearRing(inputGeom,null);if(inputGeom instanceof LineString$1)return this.transformLineString(inputGeom,null);if(inputGeom instanceof MultiLineString)return this.transformMultiLineString(inputGeom,null);if(inputGeom instanceof Polygon)return this.transformPolygon(inputGeom,null);if(inputGeom instanceof MultiPolygon)return this.transformMultiPolygon(inputGeom,null);if(inputGeom instanceof GeometryCollection)return this.transformGeometryCollection(inputGeom,null);throw new IllegalArgumentException("Unknown Geometry subtype: "+inputGeom.getClass().getName())},GeometryTransformer.prototype.transformLinearRing=function transformLinearRing(geom,parent){var seq=this.transformCoordinates(geom.getCoordinateSequence(),geom);if(null===seq)return this._factory.createLinearRing(null);var seqSize=seq.size();return 0<seqSize&&4>seqSize&&!this._preserveType?this._factory.createLineString(seq):this._factory.createLinearRing(seq)},GeometryTransformer.prototype.interfaces_=function interfaces_(){return[]},GeometryTransformer.prototype.getClass=function getClass(){return GeometryTransformer};var LineStringSnapper=function LineStringSnapper(){if(this._snapTolerance=0,this._srcPts=null,this._seg=new LineSegment,this._allowSnappingToSourceVertices=!1,this._isClosed=!1,arguments[0]instanceof LineString$1&&"number"==typeof arguments[1]){var srcLine=arguments[0],snapTolerance=arguments[1];LineStringSnapper.call(this,srcLine.getCoordinates(),snapTolerance)}else if(arguments[0]instanceof Array&&"number"==typeof arguments[1]){var srcPts=arguments[0],snapTolerance$1=arguments[1];this._srcPts=srcPts,this._isClosed=LineStringSnapper.isClosed(srcPts),this._snapTolerance=snapTolerance$1}};LineStringSnapper.prototype.snapVertices=function snapVertices(srcCoords,snapPts){for(var this$1=this,end=this._isClosed?srcCoords.size()-1:srcCoords.size(),i=0;i<end;i++){var srcPt=srcCoords.get(i),snapVert=this$1.findSnapForVertex(srcPt,snapPts);null!==snapVert&&(srcCoords.set(i,new Coordinate(snapVert)),0===i&&this$1._isClosed&&srcCoords.set(srcCoords.size()-1,new Coordinate(snapVert)))}},LineStringSnapper.prototype.findSnapForVertex=function findSnapForVertex(pt,snapPts){for(var this$1=this,i=0;i<snapPts.length;i++){if(pt.equals2D(snapPts[i]))return null;if(pt.distance(snapPts[i])<this$1._snapTolerance)return snapPts[i]}return null},LineStringSnapper.prototype.snapTo=function snapTo(snapPts){var coordList=new CoordinateList(this._srcPts);this.snapVertices(coordList,snapPts),this.snapSegments(coordList,snapPts);var newPts=coordList.toCoordinateArray();return newPts},LineStringSnapper.prototype.snapSegments=function snapSegments(srcCoords,snapPts){var this$1=this;if(0===snapPts.length)return null;var distinctPtCount=snapPts.length;snapPts[0].equals2D(snapPts[snapPts.length-1])&&(distinctPtCount=snapPts.length-1);for(var i=0;i<distinctPtCount;i++){var snapPt=snapPts[i],index=this$1.findSegmentIndexToSnap(snapPt,srcCoords);0<=index&&srcCoords.add(index+1,new Coordinate(snapPt),!1)}},LineStringSnapper.prototype.findSegmentIndexToSnap=function findSegmentIndexToSnap(snapPt,srcCoords){for(var this$1=this,minDist=Double.MAX_VALUE,snapIndex=-1,i=0;i<srcCoords.size()-1;i++){if(this$1._seg.p0=srcCoords.get(i),this$1._seg.p1=srcCoords.get(i+1),this$1._seg.p0.equals2D(snapPt)||this$1._seg.p1.equals2D(snapPt))if(this$1._allowSnappingToSourceVertices)continue;else return-1;var dist=this$1._seg.distance(snapPt);dist<this$1._snapTolerance&&dist<minDist&&(minDist=dist,snapIndex=i)}return snapIndex},LineStringSnapper.prototype.setAllowSnappingToSourceVertices=function setAllowSnappingToSourceVertices(allowSnappingToSourceVertices){this._allowSnappingToSourceVertices=allowSnappingToSourceVertices},LineStringSnapper.prototype.interfaces_=function interfaces_(){return[]},LineStringSnapper.prototype.getClass=function getClass(){return LineStringSnapper},LineStringSnapper.isClosed=function isClosed(pts){return!(1>=pts.length)&&pts[0].equals2D(pts[pts.length-1])};var GeometrySnapper=function GeometrySnapper(srcGeom){this._srcGeom=srcGeom||null},staticAccessors$41={SNAP_PRECISION_FACTOR:{configurable:!0}};GeometrySnapper.prototype.snapTo=function snapTo(snapGeom,snapTolerance){var snapPts=this.extractTargetCoordinates(snapGeom),snapTrans=new SnapTransformer(snapTolerance,snapPts);return snapTrans.transform(this._srcGeom)},GeometrySnapper.prototype.snapToSelf=function snapToSelf(snapTolerance,cleanResult){var snapPts=this.extractTargetCoordinates(this._srcGeom),snapTrans=new SnapTransformer(snapTolerance,snapPts,!0),snappedGeom=snapTrans.transform(this._srcGeom),result=snappedGeom;return cleanResult&&hasInterface(result,Polygonal)&&(result=snappedGeom.buffer(0)),result},GeometrySnapper.prototype.computeSnapTolerance=function computeSnapTolerance(ringPts){var minSegLen=this.computeMinimumSegmentLength(ringPts),snapTol=minSegLen/10;return snapTol},GeometrySnapper.prototype.extractTargetCoordinates=function extractTargetCoordinates(g){for(var ptSet=new TreeSet,pts=g.getCoordinates(),i=0;i<pts.length;i++)ptSet.add(pts[i]);return ptSet.toArray([].fill(null))},GeometrySnapper.prototype.computeMinimumSegmentLength=function computeMinimumSegmentLength(pts){for(var minSegLen=Double.MAX_VALUE,i=0,segLen;i<pts.length-1;i++)segLen=pts[i].distance(pts[i+1]),segLen<minSegLen&&(minSegLen=segLen);return minSegLen},GeometrySnapper.prototype.interfaces_=function interfaces_(){return[]},GeometrySnapper.prototype.getClass=function getClass(){return GeometrySnapper},GeometrySnapper.snap=function snap(g0,g1,snapTolerance){var snapGeom=[,,].fill(null),snapper0=new GeometrySnapper(g0);snapGeom[0]=snapper0.snapTo(g1,snapTolerance);var snapper1=new GeometrySnapper(g1);return snapGeom[1]=snapper1.snapTo(snapGeom[0],snapTolerance),snapGeom},GeometrySnapper.computeOverlaySnapTolerance=function computeOverlaySnapTolerance(){if(1===arguments.length){var g=arguments[0],snapTolerance=GeometrySnapper.computeSizeBasedSnapTolerance(g),pm=g.getPrecisionModel();if(pm.getType()===PrecisionModel.FIXED){var fixedSnapTol=2*(1/pm.getScale())/1.415;fixedSnapTol>snapTolerance&&(snapTolerance=fixedSnapTol)}return snapTolerance}if(2===arguments.length){var g0=arguments[0],g1=arguments[1];return _Mathmin(GeometrySnapper.computeOverlaySnapTolerance(g0),GeometrySnapper.computeOverlaySnapTolerance(g1))}},GeometrySnapper.computeSizeBasedSnapTolerance=function computeSizeBasedSnapTolerance(g){var env=g.getEnvelopeInternal(),minDimension=_Mathmin(env.getHeight(),env.getWidth()),snapTol=minDimension*GeometrySnapper.SNAP_PRECISION_FACTOR;return snapTol},GeometrySnapper.snapToSelf=function snapToSelf(geom,snapTolerance,cleanResult){var snapper0=new GeometrySnapper(geom);return snapper0.snapToSelf(snapTolerance,cleanResult)},staticAccessors$41.SNAP_PRECISION_FACTOR.get=function(){return 1e-9},Object.defineProperties(GeometrySnapper,staticAccessors$41);var SnapTransformer=function(GeometryTransformer$$1){function SnapTransformer(snapTolerance,snapPts,isSelfSnap){GeometryTransformer$$1.call(this),this._snapTolerance=snapTolerance||null,this._snapPts=snapPts||null,this._isSelfSnap=void 0!==isSelfSnap&&isSelfSnap}return GeometryTransformer$$1&&(SnapTransformer.__proto__=GeometryTransformer$$1),SnapTransformer.prototype=Object.create(GeometryTransformer$$1&&GeometryTransformer$$1.prototype),SnapTransformer.prototype.constructor=SnapTransformer,SnapTransformer.prototype.snapLine=function snapLine(srcPts,snapPts){var snapper=new LineStringSnapper(srcPts,this._snapTolerance);return snapper.setAllowSnappingToSourceVertices(this._isSelfSnap),snapper.snapTo(snapPts)},SnapTransformer.prototype.transformCoordinates=function transformCoordinates(coords,parent){var srcPts=coords.toCoordinateArray(),newPts=this.snapLine(srcPts,this._snapPts);return this._factory.getCoordinateSequenceFactory().create(newPts)},SnapTransformer.prototype.interfaces_=function interfaces_(){return[]},SnapTransformer.prototype.getClass=function getClass(){return SnapTransformer},SnapTransformer}(GeometryTransformer),CommonBits=function CommonBits(){this._isFirst=!0,this._commonMantissaBitsCount=53,this._commonBits=0,this._commonSignExp=null};CommonBits.prototype.getCommon=function getCommon(){return Double.longBitsToDouble(this._commonBits)},CommonBits.prototype.add=function add(num){var numBits=Double.doubleToLongBits(num);if(this._isFirst)return this._commonBits=numBits,this._commonSignExp=CommonBits.signExpBits(this._commonBits),this._isFirst=!1,null;var numSignExp=CommonBits.signExpBits(numBits);return numSignExp===this._commonSignExp?void(this._commonMantissaBitsCount=CommonBits.numCommonMostSigMantissaBits(this._commonBits,numBits),this._commonBits=CommonBits.zeroLowerBits(this._commonBits,64-(12+this._commonMantissaBitsCount))):(this._commonBits=0,null)},CommonBits.prototype.toString=function toString(){if(1===arguments.length){var bits=arguments[0],x=Double.longBitsToDouble(bits),numStr=Double.toBinaryString(bits),padStr="0000000000000000000000000000000000000000000000000000000000000000"+numStr,bitStr=padStr.substring(padStr.length-64),str=bitStr.substring(0,1)+"  "+bitStr.substring(1,12)+"(exp) "+bitStr.substring(12)+" [ "+x+" ]";return str}},CommonBits.prototype.interfaces_=function interfaces_(){return[]},CommonBits.prototype.getClass=function getClass(){return CommonBits},CommonBits.getBit=function getBit(bits,i){var mask=1<<i;return 0==(bits&mask)?0:1},CommonBits.signExpBits=function signExpBits(num){return num>>52},CommonBits.zeroLowerBits=function zeroLowerBits(bits,nBits){var invMask=(1<<nBits)-1,mask=~invMask,zeroed=bits&mask;return zeroed},CommonBits.numCommonMostSigMantissaBits=function numCommonMostSigMantissaBits(num1,num2){for(var count=0,i=52;0<=i;i--){if(CommonBits.getBit(num1,i)!==CommonBits.getBit(num2,i))return count;count++}return 52};var CommonBitsRemover=function CommonBitsRemover(){this._commonCoord=null,this._ccFilter=new CommonCoordinateFilter},staticAccessors$42={CommonCoordinateFilter:{configurable:!0},Translater:{configurable:!0}};CommonBitsRemover.prototype.addCommonBits=function addCommonBits(geom){var trans=new Translater(this._commonCoord);geom.apply(trans),geom.geometryChanged()},CommonBitsRemover.prototype.removeCommonBits=function removeCommonBits(geom){if(0===this._commonCoord.x&&0===this._commonCoord.y)return geom;var invCoord=new Coordinate(this._commonCoord);invCoord.x=-invCoord.x,invCoord.y=-invCoord.y;var trans=new Translater(invCoord);return geom.apply(trans),geom.geometryChanged(),geom},CommonBitsRemover.prototype.getCommonCoordinate=function getCommonCoordinate(){return this._commonCoord},CommonBitsRemover.prototype.add=function add(geom){geom.apply(this._ccFilter),this._commonCoord=this._ccFilter.getCommonCoordinate()},CommonBitsRemover.prototype.interfaces_=function interfaces_(){return[]},CommonBitsRemover.prototype.getClass=function getClass(){return CommonBitsRemover},staticAccessors$42.CommonCoordinateFilter.get=function(){return CommonCoordinateFilter},staticAccessors$42.Translater.get=function(){return Translater},Object.defineProperties(CommonBitsRemover,staticAccessors$42);var CommonCoordinateFilter=function CommonCoordinateFilter(){this._commonBitsX=new CommonBits,this._commonBitsY=new CommonBits};CommonCoordinateFilter.prototype.filter=function filter(coord){this._commonBitsX.add(coord.x),this._commonBitsY.add(coord.y)},CommonCoordinateFilter.prototype.getCommonCoordinate=function getCommonCoordinate(){return new Coordinate(this._commonBitsX.getCommon(),this._commonBitsY.getCommon())},CommonCoordinateFilter.prototype.interfaces_=function interfaces_(){return[CoordinateFilter]},CommonCoordinateFilter.prototype.getClass=function getClass(){return CommonCoordinateFilter};var Translater=function Translater(){this.trans=null;var trans=arguments[0];this.trans=trans};Translater.prototype.filter=function filter(seq,i){var xp=seq.getOrdinate(i,0)+this.trans.x,yp=seq.getOrdinate(i,1)+this.trans.y;seq.setOrdinate(i,0,xp),seq.setOrdinate(i,1,yp)},Translater.prototype.isDone=function isDone(){return!1},Translater.prototype.isGeometryChanged=function isGeometryChanged(){return!0},Translater.prototype.interfaces_=function interfaces_(){return[CoordinateSequenceFilter]},Translater.prototype.getClass=function getClass(){return Translater};var SnapOverlayOp=function SnapOverlayOp(g1,g2){this._geom=[,,].fill(null),this._snapTolerance=null,this._cbr=null,this._geom[0]=g1,this._geom[1]=g2,this.computeSnapTolerance()};SnapOverlayOp.prototype.selfSnap=function selfSnap(geom){var snapper0=new GeometrySnapper(geom),snapGeom=snapper0.snapTo(geom,this._snapTolerance);return snapGeom},SnapOverlayOp.prototype.removeCommonBits=function removeCommonBits(geom){this._cbr=new CommonBitsRemover,this._cbr.add(geom[0]),this._cbr.add(geom[1]);var remGeom=[,,].fill(null);return remGeom[0]=this._cbr.removeCommonBits(geom[0].copy()),remGeom[1]=this._cbr.removeCommonBits(geom[1].copy()),remGeom},SnapOverlayOp.prototype.prepareResult=function prepareResult(geom){return this._cbr.addCommonBits(geom),geom},SnapOverlayOp.prototype.getResultGeometry=function getResultGeometry(opCode){var prepGeom=this.snap(this._geom),result=OverlayOp.overlayOp(prepGeom[0],prepGeom[1],opCode);return this.prepareResult(result)},SnapOverlayOp.prototype.checkValid=function checkValid(g){g.isValid()||System.out.println("Snapped geometry is invalid")},SnapOverlayOp.prototype.computeSnapTolerance=function computeSnapTolerance(){this._snapTolerance=GeometrySnapper.computeOverlaySnapTolerance(this._geom[0],this._geom[1])},SnapOverlayOp.prototype.snap=function snap(geom){var remGeom=this.removeCommonBits(geom),snapGeom=GeometrySnapper.snap(remGeom[0],remGeom[1],this._snapTolerance);return snapGeom},SnapOverlayOp.prototype.interfaces_=function interfaces_(){return[]},SnapOverlayOp.prototype.getClass=function getClass(){return SnapOverlayOp},SnapOverlayOp.overlayOp=function overlayOp(g0,g1,opCode){var op=new SnapOverlayOp(g0,g1);return op.getResultGeometry(opCode)},SnapOverlayOp.union=function union(g0,g1){return SnapOverlayOp.overlayOp(g0,g1,OverlayOp.UNION)},SnapOverlayOp.intersection=function intersection(g0,g1){return SnapOverlayOp.overlayOp(g0,g1,OverlayOp.INTERSECTION)},SnapOverlayOp.symDifference=function symDifference(g0,g1){return SnapOverlayOp.overlayOp(g0,g1,OverlayOp.SYMDIFFERENCE)},SnapOverlayOp.difference=function difference(g0,g1){return SnapOverlayOp.overlayOp(g0,g1,OverlayOp.DIFFERENCE)};var SnapIfNeededOverlayOp=function SnapIfNeededOverlayOp(g1,g2){this._geom=[,,].fill(null),this._geom[0]=g1,this._geom[1]=g2};SnapIfNeededOverlayOp.prototype.getResultGeometry=function getResultGeometry(opCode){var result=null,isSuccess=!1,savedException=null;try{result=OverlayOp.overlayOp(this._geom[0],this._geom[1],opCode);var isValid=!0;isSuccess=!0}catch(ex){if(ex instanceof RuntimeException)savedException=ex;else throw ex}finally{}if(!isSuccess)try{result=SnapOverlayOp.overlayOp(this._geom[0],this._geom[1],opCode)}catch(ex){if(ex instanceof RuntimeException)throw savedException;else throw ex}finally{}return result},SnapIfNeededOverlayOp.prototype.interfaces_=function interfaces_(){return[]},SnapIfNeededOverlayOp.prototype.getClass=function getClass(){return SnapIfNeededOverlayOp},SnapIfNeededOverlayOp.overlayOp=function overlayOp(g0,g1,opCode){var op=new SnapIfNeededOverlayOp(g0,g1);return op.getResultGeometry(opCode)},SnapIfNeededOverlayOp.union=function union(g0,g1){return SnapIfNeededOverlayOp.overlayOp(g0,g1,OverlayOp.UNION)},SnapIfNeededOverlayOp.intersection=function intersection(g0,g1){return SnapIfNeededOverlayOp.overlayOp(g0,g1,OverlayOp.INTERSECTION)},SnapIfNeededOverlayOp.symDifference=function symDifference(g0,g1){return SnapIfNeededOverlayOp.overlayOp(g0,g1,OverlayOp.SYMDIFFERENCE)},SnapIfNeededOverlayOp.difference=function difference(g0,g1){return SnapIfNeededOverlayOp.overlayOp(g0,g1,OverlayOp.DIFFERENCE)};var MonotoneChain$2=function MonotoneChain(){this.mce=null,this.chainIndex=null;var mce=arguments[0],chainIndex=arguments[1];this.mce=mce,this.chainIndex=chainIndex};MonotoneChain$2.prototype.computeIntersections=function computeIntersections(mc,si){this.mce.computeIntersectsForChain(this.chainIndex,mc.mce,mc.chainIndex,si)},MonotoneChain$2.prototype.interfaces_=function interfaces_(){return[]},MonotoneChain$2.prototype.getClass=function getClass(){return MonotoneChain$2};var SweepLineEvent=function SweepLineEvent(){if(this._label=null,this._xValue=null,this._eventType=null,this._insertEvent=null,this._deleteEventIndex=null,this._obj=null,2===arguments.length){var x=arguments[0],insertEvent=arguments[1];this._eventType=SweepLineEvent.DELETE,this._xValue=x,this._insertEvent=insertEvent}else if(3===arguments.length){var label=arguments[0],x$1=arguments[1],obj=arguments[2];this._eventType=SweepLineEvent.INSERT,this._label=label,this._xValue=x$1,this._obj=obj}},staticAccessors$43={INSERT:{configurable:!0},DELETE:{configurable:!0}};SweepLineEvent.prototype.isDelete=function isDelete(){return this._eventType===SweepLineEvent.DELETE},SweepLineEvent.prototype.setDeleteEventIndex=function setDeleteEventIndex(deleteEventIndex){this._deleteEventIndex=deleteEventIndex},SweepLineEvent.prototype.getObject=function getObject(){return this._obj},SweepLineEvent.prototype.compareTo=function compareTo(o){var pe=o;return this._xValue<pe._xValue?-1:this._xValue>pe._xValue?1:this._eventType<pe._eventType?-1:this._eventType>pe._eventType?1:0},SweepLineEvent.prototype.getInsertEvent=function getInsertEvent(){return this._insertEvent},SweepLineEvent.prototype.isInsert=function isInsert(){return this._eventType===SweepLineEvent.INSERT},SweepLineEvent.prototype.isSameLabel=function isSameLabel(ev){return null!==this._label&&this._label===ev._label},SweepLineEvent.prototype.getDeleteEventIndex=function getDeleteEventIndex(){return this._deleteEventIndex},SweepLineEvent.prototype.interfaces_=function interfaces_(){return[Comparable]},SweepLineEvent.prototype.getClass=function getClass(){return SweepLineEvent},staticAccessors$43.INSERT.get=function(){return 1},staticAccessors$43.DELETE.get=function(){return 2},Object.defineProperties(SweepLineEvent,staticAccessors$43);var EdgeSetIntersector=function EdgeSetIntersector(){};EdgeSetIntersector.prototype.interfaces_=function interfaces_(){return[]},EdgeSetIntersector.prototype.getClass=function getClass(){return EdgeSetIntersector};var SegmentIntersector$2=function SegmentIntersector(){this._hasIntersection=!1,this._hasProper=!1,this._hasProperInterior=!1,this._properIntersectionPoint=null,this._li=null,this._includeProper=null,this._recordIsolated=null,this._isSelfIntersection=null,this._numIntersections=0,this.numTests=0,this._bdyNodes=null,this._isDone=!1,this._isDoneWhenProperInt=!1;var li=arguments[0],includeProper=arguments[1],recordIsolated=arguments[2];this._li=li,this._includeProper=includeProper,this._recordIsolated=recordIsolated};SegmentIntersector$2.prototype.isTrivialIntersection=function isTrivialIntersection(e0,segIndex0,e1,segIndex1){if(e0===e1&&1===this._li.getIntersectionNum()){if(SegmentIntersector$2.isAdjacentSegments(segIndex0,segIndex1))return!0;if(e0.isClosed()){var maxSegIndex=e0.getNumPoints()-1;if(0===segIndex0&&segIndex1===maxSegIndex||0===segIndex1&&segIndex0===maxSegIndex)return!0}}return!1},SegmentIntersector$2.prototype.getProperIntersectionPoint=function getProperIntersectionPoint(){return this._properIntersectionPoint},SegmentIntersector$2.prototype.setIsDoneIfProperInt=function setIsDoneIfProperInt(isDoneWhenProperInt){this._isDoneWhenProperInt=isDoneWhenProperInt},SegmentIntersector$2.prototype.hasProperInteriorIntersection=function hasProperInteriorIntersection(){return this._hasProperInterior},SegmentIntersector$2.prototype.isBoundaryPointInternal=function isBoundaryPointInternal(li,bdyNodes){for(var i=bdyNodes.iterator();i.hasNext();){var node=i.next(),pt=node.getCoordinate();if(li.isIntersection(pt))return!0}return!1},SegmentIntersector$2.prototype.hasProperIntersection=function hasProperIntersection(){return this._hasProper},SegmentIntersector$2.prototype.hasIntersection=function hasIntersection(){return this._hasIntersection},SegmentIntersector$2.prototype.isDone=function isDone(){return this._isDone},SegmentIntersector$2.prototype.isBoundaryPoint=function isBoundaryPoint(li,bdyNodes){return null!==bdyNodes&&(!!this.isBoundaryPointInternal(li,bdyNodes[0])||!!this.isBoundaryPointInternal(li,bdyNodes[1]))},SegmentIntersector$2.prototype.setBoundaryNodes=function setBoundaryNodes(bdyNodes0,bdyNodes1){this._bdyNodes=[,,].fill(null),this._bdyNodes[0]=bdyNodes0,this._bdyNodes[1]=bdyNodes1},SegmentIntersector$2.prototype.addIntersections=function addIntersections(e0,segIndex0,e1,segIndex1){if(e0===e1&&segIndex0===segIndex1)return null;this.numTests++;var p00=e0.getCoordinates()[segIndex0],p01=e0.getCoordinates()[segIndex0+1],p10=e1.getCoordinates()[segIndex1],p11=e1.getCoordinates()[segIndex1+1];this._li.computeIntersection(p00,p01,p10,p11),this._li.hasIntersection()&&(this._recordIsolated&&(e0.setIsolated(!1),e1.setIsolated(!1)),this._numIntersections++,!this.isTrivialIntersection(e0,segIndex0,e1,segIndex1)&&(this._hasIntersection=!0,(this._includeProper||!this._li.isProper())&&(e0.addIntersections(this._li,segIndex0,0),e1.addIntersections(this._li,segIndex1,1)),this._li.isProper()&&(this._properIntersectionPoint=this._li.getIntersection(0).copy(),this._hasProper=!0,this._isDoneWhenProperInt&&(this._isDone=!0),!this.isBoundaryPoint(this._li,this._bdyNodes)&&(this._hasProperInterior=!0))))},SegmentIntersector$2.prototype.interfaces_=function interfaces_(){return[]},SegmentIntersector$2.prototype.getClass=function getClass(){return SegmentIntersector$2},SegmentIntersector$2.isAdjacentSegments=function isAdjacentSegments(i1,i2){return 1===_Mathabs(i1-i2)};var SimpleMCSweepLineIntersector=function(EdgeSetIntersector$$1){function SimpleMCSweepLineIntersector(){EdgeSetIntersector$$1.call(this),this.events=new ArrayList,this.nOverlaps=null}return EdgeSetIntersector$$1&&(SimpleMCSweepLineIntersector.__proto__=EdgeSetIntersector$$1),SimpleMCSweepLineIntersector.prototype=Object.create(EdgeSetIntersector$$1&&EdgeSetIntersector$$1.prototype),SimpleMCSweepLineIntersector.prototype.constructor=SimpleMCSweepLineIntersector,SimpleMCSweepLineIntersector.prototype.prepareEvents=function prepareEvents(){var this$1=this;Collections.sort(this.events);for(var i=0,ev;i<this.events.size();i++)ev=this$1.events.get(i),ev.isDelete()&&ev.getInsertEvent().setDeleteEventIndex(i)},SimpleMCSweepLineIntersector.prototype.computeIntersections=function computeIntersections(){var this$1=this;if(1===arguments.length){var si=arguments[0];this.nOverlaps=0,this.prepareEvents();for(var i=0,ev;i<this.events.size()&&(ev=this$1.events.get(i),ev.isInsert()&&this$1.processOverlaps(i,ev.getDeleteEventIndex(),ev,si),!si.isDone());i++);}else if(3===arguments.length)if(arguments[2]instanceof SegmentIntersector$2&&hasInterface(arguments[0],List)&&hasInterface(arguments[1],List)){var edges0=arguments[0],edges1=arguments[1],si$1=arguments[2];this.addEdges(edges0,edges0),this.addEdges(edges1,edges1),this.computeIntersections(si$1)}else if("boolean"==typeof arguments[2]&&hasInterface(arguments[0],List)&&arguments[1]instanceof SegmentIntersector$2){var edges=arguments[0],si$2=arguments[1],testAllSegments=arguments[2];testAllSegments?this.addEdges(edges,null):this.addEdges(edges),this.computeIntersections(si$2)}},SimpleMCSweepLineIntersector.prototype.addEdge=function addEdge(edge,edgeSet){for(var this$1=this,mce=edge.getMonotoneChainEdge(),startIndex=mce.getStartIndexes(),i=0;i<startIndex.length-1;i++){var mc=new MonotoneChain$2(mce,i),insertEvent=new SweepLineEvent(edgeSet,mce.getMinX(i),mc);this$1.events.add(insertEvent),this$1.events.add(new SweepLineEvent(mce.getMaxX(i),insertEvent))}},SimpleMCSweepLineIntersector.prototype.processOverlaps=function processOverlaps(start,end,ev0,si){for(var this$1=this,mc0=ev0.getObject(),i=start,ev1;i<end;i++)if(ev1=this$1.events.get(i),ev1.isInsert()){var mc1=ev1.getObject();ev0.isSameLabel(ev1)||(mc0.computeIntersections(mc1,si),this$1.nOverlaps++)}},SimpleMCSweepLineIntersector.prototype.addEdges=function addEdges(){var this$1=this;if(1===arguments.length)for(var edges=arguments[0],i=edges.iterator(),edge;i.hasNext();)edge=i.next(),this$1.addEdge(edge,edge);else if(2===arguments.length)for(var edges$1=arguments[0],edgeSet=arguments[1],i$1=edges$1.iterator(),edge$1;i$1.hasNext();)edge$1=i$1.next(),this$1.addEdge(edge$1,edgeSet)},SimpleMCSweepLineIntersector.prototype.interfaces_=function interfaces_(){return[]},SimpleMCSweepLineIntersector.prototype.getClass=function getClass(){return SimpleMCSweepLineIntersector},SimpleMCSweepLineIntersector}(EdgeSetIntersector),IntervalRTreeNode=function IntervalRTreeNode(){this._min=Double.POSITIVE_INFINITY,this._max=Double.NEGATIVE_INFINITY},staticAccessors$45={NodeComparator:{configurable:!0}};IntervalRTreeNode.prototype.getMin=function getMin(){return this._min},IntervalRTreeNode.prototype.intersects=function intersects(queryMin,queryMax){return this._min>queryMax||this._max<queryMin?!1:!0},IntervalRTreeNode.prototype.getMax=function getMax(){return this._max},IntervalRTreeNode.prototype.toString=function toString(){return WKTWriter.toLineString(new Coordinate(this._min,0),new Coordinate(this._max,0))},IntervalRTreeNode.prototype.interfaces_=function interfaces_(){return[]},IntervalRTreeNode.prototype.getClass=function getClass(){return IntervalRTreeNode},staticAccessors$45.NodeComparator.get=function(){return NodeComparator},Object.defineProperties(IntervalRTreeNode,staticAccessors$45);var NodeComparator=function NodeComparator(){};NodeComparator.prototype.compare=function compare(o1,o2){var n1=o1,n2=o2,mid1=(n1._min+n1._max)/2,mid2=(n2._min+n2._max)/2;return mid1<mid2?-1:mid1>mid2?1:0},NodeComparator.prototype.interfaces_=function interfaces_(){return[Comparator]},NodeComparator.prototype.getClass=function getClass(){return NodeComparator};var IntervalRTreeLeafNode=function(IntervalRTreeNode$$1){function IntervalRTreeLeafNode(){IntervalRTreeNode$$1.call(this),this._item=null;var min=arguments[0],max=arguments[1],item=arguments[2];this._min=min,this._max=max,this._item=item}return IntervalRTreeNode$$1&&(IntervalRTreeLeafNode.__proto__=IntervalRTreeNode$$1),IntervalRTreeLeafNode.prototype=Object.create(IntervalRTreeNode$$1&&IntervalRTreeNode$$1.prototype),IntervalRTreeLeafNode.prototype.constructor=IntervalRTreeLeafNode,IntervalRTreeLeafNode.prototype.query=function query(queryMin,queryMax,visitor){return this.intersects(queryMin,queryMax)?void visitor.visitItem(this._item):null},IntervalRTreeLeafNode.prototype.interfaces_=function interfaces_(){return[]},IntervalRTreeLeafNode.prototype.getClass=function getClass(){return IntervalRTreeLeafNode},IntervalRTreeLeafNode}(IntervalRTreeNode),IntervalRTreeBranchNode=function(IntervalRTreeNode$$1){function IntervalRTreeBranchNode(){IntervalRTreeNode$$1.call(this),this._node1=null,this._node2=null;var n1=arguments[0],n2=arguments[1];this._node1=n1,this._node2=n2,this.buildExtent(this._node1,this._node2)}return IntervalRTreeNode$$1&&(IntervalRTreeBranchNode.__proto__=IntervalRTreeNode$$1),IntervalRTreeBranchNode.prototype=Object.create(IntervalRTreeNode$$1&&IntervalRTreeNode$$1.prototype),IntervalRTreeBranchNode.prototype.constructor=IntervalRTreeBranchNode,IntervalRTreeBranchNode.prototype.buildExtent=function buildExtent(n1,n2){this._min=_Mathmin(n1._min,n2._min),this._max=_Mathmax(n1._max,n2._max)},IntervalRTreeBranchNode.prototype.query=function query(queryMin,queryMax,visitor){return this.intersects(queryMin,queryMax)?void(null!==this._node1&&this._node1.query(queryMin,queryMax,visitor),null!==this._node2&&this._node2.query(queryMin,queryMax,visitor)):null},IntervalRTreeBranchNode.prototype.interfaces_=function interfaces_(){return[]},IntervalRTreeBranchNode.prototype.getClass=function getClass(){return IntervalRTreeBranchNode},IntervalRTreeBranchNode}(IntervalRTreeNode),SortedPackedIntervalRTree=function SortedPackedIntervalRTree(){this._leaves=new ArrayList,this._root=null,this._level=0};SortedPackedIntervalRTree.prototype.buildTree=function buildTree(){var this$1=this;Collections.sort(this._leaves,new IntervalRTreeNode.NodeComparator);for(var src=this._leaves,temp=null,dest=new ArrayList;!0;){if(this$1.buildLevel(src,dest),1===dest.size())return dest.get(0);temp=src,src=dest,dest=temp}},SortedPackedIntervalRTree.prototype.insert=function insert(min,max,item){if(null!==this._root)throw new Error("Index cannot be added to once it has been queried");this._leaves.add(new IntervalRTreeLeafNode(min,max,item))},SortedPackedIntervalRTree.prototype.query=function query(min,max,visitor){this.init(),this._root.query(min,max,visitor)},SortedPackedIntervalRTree.prototype.buildRoot=function buildRoot(){return null===this._root?void(this._root=this.buildTree()):null},SortedPackedIntervalRTree.prototype.printNode=function printNode(node){System.out.println(WKTWriter.toLineString(new Coordinate(node._min,this._level),new Coordinate(node._max,this._level)))},SortedPackedIntervalRTree.prototype.init=function init(){return null===this._root?void this.buildRoot():null},SortedPackedIntervalRTree.prototype.buildLevel=function buildLevel(src,dest){this._level++,dest.clear();for(var i=0;i<src.size();i+=2){var n1=src.get(i),n2=i+1<src.size()?src.get(i):null;if(null===n2)dest.add(n1);else{var node=new IntervalRTreeBranchNode(src.get(i),src.get(i+1));dest.add(node)}}},SortedPackedIntervalRTree.prototype.interfaces_=function interfaces_(){return[]},SortedPackedIntervalRTree.prototype.getClass=function getClass(){return SortedPackedIntervalRTree};var ArrayListVisitor=function ArrayListVisitor(){this._items=new ArrayList};ArrayListVisitor.prototype.visitItem=function visitItem(item){this._items.add(item)},ArrayListVisitor.prototype.getItems=function getItems(){return this._items},ArrayListVisitor.prototype.interfaces_=function interfaces_(){return[ItemVisitor]},ArrayListVisitor.prototype.getClass=function getClass(){return ArrayListVisitor};var IndexedPointInAreaLocator=function IndexedPointInAreaLocator(){this._index=null;var g=arguments[0];if(!hasInterface(g,Polygonal))throw new IllegalArgumentException("Argument must be Polygonal");this._index=new IntervalIndexedGeometry(g)},staticAccessors$44={SegmentVisitor:{configurable:!0},IntervalIndexedGeometry:{configurable:!0}};IndexedPointInAreaLocator.prototype.locate=function locate(p){var rcc=new RayCrossingCounter(p),visitor=new SegmentVisitor(rcc);return this._index.query(p.y,p.y,visitor),rcc.getLocation()},IndexedPointInAreaLocator.prototype.interfaces_=function interfaces_(){return[PointOnGeometryLocator]},IndexedPointInAreaLocator.prototype.getClass=function getClass(){return IndexedPointInAreaLocator},staticAccessors$44.SegmentVisitor.get=function(){return SegmentVisitor},staticAccessors$44.IntervalIndexedGeometry.get=function(){return IntervalIndexedGeometry},Object.defineProperties(IndexedPointInAreaLocator,staticAccessors$44);var SegmentVisitor=function SegmentVisitor(){this._counter=null;var counter=arguments[0];this._counter=counter};SegmentVisitor.prototype.visitItem=function visitItem(item){var seg=item;this._counter.countSegment(seg.getCoordinate(0),seg.getCoordinate(1))},SegmentVisitor.prototype.interfaces_=function interfaces_(){return[ItemVisitor]},SegmentVisitor.prototype.getClass=function getClass(){return SegmentVisitor};var IntervalIndexedGeometry=function IntervalIndexedGeometry(){this._index=new SortedPackedIntervalRTree;var geom=arguments[0];this.init(geom)};IntervalIndexedGeometry.prototype.init=function init(geom){for(var this$1=this,lines=LinearComponentExtracter.getLines(geom),i=lines.iterator();i.hasNext();){var line=i.next(),pts=line.getCoordinates();this$1.addLine(pts)}},IntervalIndexedGeometry.prototype.addLine=function addLine(pts){for(var this$1=this,i=1;i<pts.length;i++){var seg=new LineSegment(pts[i-1],pts[i]),min=_Mathmin(seg.p0.y,seg.p1.y),max=_Mathmax(seg.p0.y,seg.p1.y);this$1._index.insert(min,max,seg)}},IntervalIndexedGeometry.prototype.query=function query(){if(2===arguments.length){var min=arguments[0],max=arguments[1],visitor=new ArrayListVisitor;return this._index.query(min,max,visitor),visitor.getItems()}if(3===arguments.length){var min$1=arguments[0],max$1=arguments[1],visitor$1=arguments[2];this._index.query(min$1,max$1,visitor$1)}},IntervalIndexedGeometry.prototype.interfaces_=function interfaces_(){return[]},IntervalIndexedGeometry.prototype.getClass=function getClass(){return IntervalIndexedGeometry};var GeometryGraph=function(PlanarGraph$$1){function GeometryGraph(){if(PlanarGraph$$1.call(this),this._parentGeom=null,this._lineEdgeMap=new HashMap,this._boundaryNodeRule=null,this._useBoundaryDeterminationRule=!0,this._argIndex=null,this._boundaryNodes=null,this._hasTooFewPoints=!1,this._invalidPoint=null,this._areaPtLocator=null,this._ptLocator=new PointLocator,2===arguments.length){var argIndex=arguments[0],parentGeom=arguments[1],boundaryNodeRule=BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE;this._argIndex=argIndex,this._parentGeom=parentGeom,this._boundaryNodeRule=boundaryNodeRule,null!==parentGeom&&this.add(parentGeom)}else if(3===arguments.length){var argIndex$1=arguments[0],parentGeom$1=arguments[1],boundaryNodeRule$1=arguments[2];this._argIndex=argIndex$1,this._parentGeom=parentGeom$1,this._boundaryNodeRule=boundaryNodeRule$1,null!==parentGeom$1&&this.add(parentGeom$1)}}return PlanarGraph$$1&&(GeometryGraph.__proto__=PlanarGraph$$1),GeometryGraph.prototype=Object.create(PlanarGraph$$1&&PlanarGraph$$1.prototype),GeometryGraph.prototype.constructor=GeometryGraph,GeometryGraph.prototype.insertBoundaryPoint=function insertBoundaryPoint(argIndex,coord){var n=this._nodes.addNode(coord),lbl=n.getLabel(),boundaryCount=1,loc=Location.NONE;loc=lbl.getLocation(argIndex,Position.ON),loc===Location.BOUNDARY&&boundaryCount++;var newLoc=GeometryGraph.determineBoundary(this._boundaryNodeRule,boundaryCount);lbl.setLocation(argIndex,newLoc)},GeometryGraph.prototype.computeSelfNodes=function computeSelfNodes(){if(2===arguments.length){var li=arguments[0],computeRingSelfNodes=arguments[1];return this.computeSelfNodes(li,computeRingSelfNodes,!1)}if(3===arguments.length){var li$1=arguments[0],computeRingSelfNodes$1=arguments[1],isDoneIfProperInt=arguments[2],si=new SegmentIntersector$2(li$1,!0,!1);si.setIsDoneIfProperInt(isDoneIfProperInt);var esi=this.createEdgeSetIntersector(),isRings=this._parentGeom instanceof LinearRing||this._parentGeom instanceof Polygon||this._parentGeom instanceof MultiPolygon,computeAllSegments=computeRingSelfNodes$1||!isRings;return esi.computeIntersections(this._edges,si,computeAllSegments),this.addSelfIntersectionNodes(this._argIndex),si}},GeometryGraph.prototype.computeSplitEdges=function computeSplitEdges(edgelist){for(var i=this._edges.iterator(),e;i.hasNext();)e=i.next(),e.eiList.addSplitEdges(edgelist)},GeometryGraph.prototype.computeEdgeIntersections=function computeEdgeIntersections(g,li,includeProper){var si=new SegmentIntersector$2(li,includeProper,!0);si.setBoundaryNodes(this.getBoundaryNodes(),g.getBoundaryNodes());var esi=this.createEdgeSetIntersector();return esi.computeIntersections(this._edges,g._edges,si),si},GeometryGraph.prototype.getGeometry=function getGeometry(){return this._parentGeom},GeometryGraph.prototype.getBoundaryNodeRule=function getBoundaryNodeRule(){return this._boundaryNodeRule},GeometryGraph.prototype.hasTooFewPoints=function hasTooFewPoints(){return this._hasTooFewPoints},GeometryGraph.prototype.addPoint=function addPoint(){if(arguments[0]instanceof Point){var p=arguments[0],coord=p.getCoordinate();this.insertPoint(this._argIndex,coord,Location.INTERIOR)}else if(arguments[0]instanceof Coordinate){var pt=arguments[0];this.insertPoint(this._argIndex,pt,Location.INTERIOR)}},GeometryGraph.prototype.addPolygon=function addPolygon(p){var this$1=this;this.addPolygonRing(p.getExteriorRing(),Location.EXTERIOR,Location.INTERIOR);for(var i=0,hole;i<p.getNumInteriorRing();i++)hole=p.getInteriorRingN(i),this$1.addPolygonRing(hole,Location.INTERIOR,Location.EXTERIOR)},GeometryGraph.prototype.addEdge=function addEdge(e){this.insertEdge(e);var coord=e.getCoordinates();this.insertPoint(this._argIndex,coord[0],Location.BOUNDARY),this.insertPoint(this._argIndex,coord[coord.length-1],Location.BOUNDARY)},GeometryGraph.prototype.addLineString=function addLineString(line){var coord=CoordinateArrays.removeRepeatedPoints(line.getCoordinates());if(2>coord.length)return this._hasTooFewPoints=!0,this._invalidPoint=coord[0],null;var e=new Edge$1(coord,new Label(this._argIndex,Location.INTERIOR));this._lineEdgeMap.put(line,e),this.insertEdge(e),Assert.isTrue(2<=coord.length,"found LineString with single point"),this.insertBoundaryPoint(this._argIndex,coord[0]),this.insertBoundaryPoint(this._argIndex,coord[coord.length-1])},GeometryGraph.prototype.getInvalidPoint=function getInvalidPoint(){return this._invalidPoint},GeometryGraph.prototype.getBoundaryPoints=function getBoundaryPoints(){for(var coll=this.getBoundaryNodes(),pts=Array(coll.size()).fill(null),i=0,it=coll.iterator(),node;it.hasNext();)node=it.next(),pts[i++]=node.getCoordinate().copy();return pts},GeometryGraph.prototype.getBoundaryNodes=function getBoundaryNodes(){return null===this._boundaryNodes&&(this._boundaryNodes=this._nodes.getBoundaryNodes(this._argIndex)),this._boundaryNodes},GeometryGraph.prototype.addSelfIntersectionNode=function addSelfIntersectionNode(argIndex,coord,loc){return this.isBoundaryNode(argIndex,coord)?null:void(loc===Location.BOUNDARY&&this._useBoundaryDeterminationRule?this.insertBoundaryPoint(argIndex,coord):this.insertPoint(argIndex,coord,loc))},GeometryGraph.prototype.addPolygonRing=function addPolygonRing(lr,cwLeft,cwRight){if(lr.isEmpty())return null;var coord=CoordinateArrays.removeRepeatedPoints(lr.getCoordinates());if(4>coord.length)return this._hasTooFewPoints=!0,this._invalidPoint=coord[0],null;var left=cwLeft,right=cwRight;CGAlgorithms.isCCW(coord)&&(left=cwRight,right=cwLeft);var e=new Edge$1(coord,new Label(this._argIndex,Location.BOUNDARY,left,right));this._lineEdgeMap.put(lr,e),this.insertEdge(e),this.insertPoint(this._argIndex,coord[0],Location.BOUNDARY)},GeometryGraph.prototype.insertPoint=function insertPoint(argIndex,coord,onLocation){var n=this._nodes.addNode(coord),lbl=n.getLabel();null===lbl?n._label=new Label(argIndex,onLocation):lbl.setLocation(argIndex,onLocation)},GeometryGraph.prototype.createEdgeSetIntersector=function createEdgeSetIntersector(){return new SimpleMCSweepLineIntersector},GeometryGraph.prototype.addSelfIntersectionNodes=function addSelfIntersectionNodes(argIndex){for(var this$1=this,i=this._edges.iterator();i.hasNext();)for(var e=i.next(),eLoc=e.getLabel().getLocation(argIndex),eiIt=e.eiList.iterator(),ei;eiIt.hasNext();)ei=eiIt.next(),this$1.addSelfIntersectionNode(argIndex,ei.coord,eLoc)},GeometryGraph.prototype.add=function add(){if(1===arguments.length){var g=arguments[0];if(g.isEmpty())return null;if(g instanceof MultiPolygon&&(this._useBoundaryDeterminationRule=!1),g instanceof Polygon)this.addPolygon(g);else if(g instanceof LineString$1)this.addLineString(g);else if(g instanceof Point)this.addPoint(g);else if(g instanceof MultiPoint)this.addCollection(g);else if(g instanceof MultiLineString)this.addCollection(g);else if(g instanceof MultiPolygon)this.addCollection(g);else if(g instanceof GeometryCollection)this.addCollection(g);else throw new Error(g.getClass().getName())}else return PlanarGraph$$1.prototype.add.apply(this,arguments)},GeometryGraph.prototype.addCollection=function addCollection(gc){for(var this$1=this,i=0,g;i<gc.getNumGeometries();i++)g=gc.getGeometryN(i),this$1.add(g)},GeometryGraph.prototype.locate=function locate(pt){return hasInterface(this._parentGeom,Polygonal)&&50<this._parentGeom.getNumGeometries()?(null===this._areaPtLocator&&(this._areaPtLocator=new IndexedPointInAreaLocator(this._parentGeom)),this._areaPtLocator.locate(pt)):this._ptLocator.locate(pt,this._parentGeom)},GeometryGraph.prototype.findEdge=function findEdge(){if(1===arguments.length){var line=arguments[0];return this._lineEdgeMap.get(line)}return PlanarGraph$$1.prototype.findEdge.apply(this,arguments)},GeometryGraph.prototype.interfaces_=function interfaces_(){return[]},GeometryGraph.prototype.getClass=function getClass(){return GeometryGraph},GeometryGraph.determineBoundary=function determineBoundary(boundaryNodeRule,boundaryCount){return boundaryNodeRule.isInBoundary(boundaryCount)?Location.BOUNDARY:Location.INTERIOR},GeometryGraph}(PlanarGraph),GeometryGraphOp=function GeometryGraphOp(){if(this._li=new RobustLineIntersector,this._resultPrecisionModel=null,this._arg=null,1===arguments.length){var g0=arguments[0];this.setComputationPrecision(g0.getPrecisionModel()),this._arg=[,].fill(null),this._arg[0]=new GeometryGraph(0,g0)}else if(2===arguments.length){var g0$1=arguments[0],g1=arguments[1],boundaryNodeRule=BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE;0<=g0$1.getPrecisionModel().compareTo(g1.getPrecisionModel())?this.setComputationPrecision(g0$1.getPrecisionModel()):this.setComputationPrecision(g1.getPrecisionModel()),this._arg=[,,].fill(null),this._arg[0]=new GeometryGraph(0,g0$1,boundaryNodeRule),this._arg[1]=new GeometryGraph(1,g1,boundaryNodeRule)}else if(3===arguments.length){var g0$2=arguments[0],g1$1=arguments[1],boundaryNodeRule$1=arguments[2];0<=g0$2.getPrecisionModel().compareTo(g1$1.getPrecisionModel())?this.setComputationPrecision(g0$2.getPrecisionModel()):this.setComputationPrecision(g1$1.getPrecisionModel()),this._arg=[,,].fill(null),this._arg[0]=new GeometryGraph(0,g0$2,boundaryNodeRule$1),this._arg[1]=new GeometryGraph(1,g1$1,boundaryNodeRule$1)}};GeometryGraphOp.prototype.getArgGeometry=function getArgGeometry(i){return this._arg[i].getGeometry()},GeometryGraphOp.prototype.setComputationPrecision=function setComputationPrecision(pm){this._resultPrecisionModel=pm,this._li.setPrecisionModel(this._resultPrecisionModel)},GeometryGraphOp.prototype.interfaces_=function interfaces_(){return[]},GeometryGraphOp.prototype.getClass=function getClass(){return GeometryGraphOp};var GeometryMapper=function GeometryMapper(){};GeometryMapper.prototype.interfaces_=function interfaces_(){return[]},GeometryMapper.prototype.getClass=function getClass(){return GeometryMapper},GeometryMapper.map=function map(){if(arguments[0]instanceof Geometry&&hasInterface(arguments[1],GeometryMapper.MapOp)){for(var geom=arguments[0],op=arguments[1],mapped=new ArrayList,i=0,g;i<geom.getNumGeometries();i++)g=op.map(geom.getGeometryN(i)),null!==g&&mapped.add(g);return geom.getFactory().buildGeometry(mapped)}if(hasInterface(arguments[0],Collection)&&hasInterface(arguments[1],GeometryMapper.MapOp)){for(var geoms=arguments[0],op$1=arguments[1],mapped$1=new ArrayList,i$1=geoms.iterator();i$1.hasNext();){var g$1=i$1.next(),gr=op$1.map(g$1);null!==gr&&mapped$1.add(gr)}return mapped$1}},GeometryMapper.MapOp=function MapOp(){};var OverlayOp=function(GeometryGraphOp){function OverlayOp(){var g0=arguments[0],g1=arguments[1];GeometryGraphOp.call(this,g0,g1),this._ptLocator=new PointLocator,this._geomFact=null,this._resultGeom=null,this._graph=null,this._edgeList=new EdgeList,this._resultPolyList=new ArrayList,this._resultLineList=new ArrayList,this._resultPointList=new ArrayList,this._graph=new PlanarGraph(new OverlayNodeFactory()),this._geomFact=g0.getFactory()}return GeometryGraphOp&&(OverlayOp.__proto__=GeometryGraphOp),OverlayOp.prototype=Object.create(GeometryGraphOp&&GeometryGraphOp.prototype),OverlayOp.prototype.constructor=OverlayOp,OverlayOp.prototype.insertUniqueEdge=function insertUniqueEdge(e){var existingEdge=this._edgeList.findEqualEdge(e);if(null!==existingEdge){var existingLabel=existingEdge.getLabel(),labelToMerge=e.getLabel();existingEdge.isPointwiseEqual(e)||(labelToMerge=new Label(e.getLabel()),labelToMerge.flip());var depth=existingEdge.getDepth();depth.isNull()&&depth.add(existingLabel),depth.add(labelToMerge),existingLabel.merge(labelToMerge)}else this._edgeList.add(e)},OverlayOp.prototype.getGraph=function getGraph(){return this._graph},OverlayOp.prototype.cancelDuplicateResultEdges=function cancelDuplicateResultEdges(){for(var it=this._graph.getEdgeEnds().iterator();it.hasNext();){var de=it.next(),sym=de.getSym();de.isInResult()&&sym.isInResult()&&(de.setInResult(!1),sym.setInResult(!1))}},OverlayOp.prototype.isCoveredByLA=function isCoveredByLA(coord){return!!this.isCovered(coord,this._resultLineList)||!!this.isCovered(coord,this._resultPolyList)},OverlayOp.prototype.computeGeometry=function computeGeometry(resultPointList,resultLineList,resultPolyList,opcode){var geomList=new ArrayList;return geomList.addAll(resultPointList),geomList.addAll(resultLineList),geomList.addAll(resultPolyList),geomList.isEmpty()?OverlayOp.createEmptyResult(opcode,this._arg[0].getGeometry(),this._arg[1].getGeometry(),this._geomFact):this._geomFact.buildGeometry(geomList)},OverlayOp.prototype.mergeSymLabels=function mergeSymLabels(){for(var nodeit=this._graph.getNodes().iterator(),node;nodeit.hasNext();)node=nodeit.next(),node.getEdges().mergeSymLabels()},OverlayOp.prototype.isCovered=function isCovered(coord,geomList){for(var this$1=this,it=geomList.iterator();it.hasNext();){var geom=it.next(),loc=this$1._ptLocator.locate(coord,geom);if(loc!==Location.EXTERIOR)return!0}return!1},OverlayOp.prototype.replaceCollapsedEdges=function replaceCollapsedEdges(){for(var newEdges=new ArrayList,it=this._edgeList.iterator(),e;it.hasNext();)e=it.next(),e.isCollapsed()&&(it.remove(),newEdges.add(e.getCollapsedEdge()));this._edgeList.addAll(newEdges)},OverlayOp.prototype.updateNodeLabelling=function updateNodeLabelling(){for(var nodeit=this._graph.getNodes().iterator();nodeit.hasNext();){var node=nodeit.next(),lbl=node.getEdges().getLabel();node.getLabel().merge(lbl)}},OverlayOp.prototype.getResultGeometry=function getResultGeometry(overlayOpCode){return this.computeOverlay(overlayOpCode),this._resultGeom},OverlayOp.prototype.insertUniqueEdges=function insertUniqueEdges(edges){for(var this$1=this,i=edges.iterator(),e;i.hasNext();)e=i.next(),this$1.insertUniqueEdge(e)},OverlayOp.prototype.computeOverlay=function computeOverlay(opCode){this.copyPoints(0),this.copyPoints(1),this._arg[0].computeSelfNodes(this._li,!1),this._arg[1].computeSelfNodes(this._li,!1),this._arg[0].computeEdgeIntersections(this._arg[1],this._li,!0);var baseSplitEdges=new ArrayList;this._arg[0].computeSplitEdges(baseSplitEdges),this._arg[1].computeSplitEdges(baseSplitEdges),this.insertUniqueEdges(baseSplitEdges),this.computeLabelsFromDepths(),this.replaceCollapsedEdges(),EdgeNodingValidator.checkValid(this._edgeList.getEdges()),this._graph.addEdges(this._edgeList.getEdges()),this.computeLabelling(),this.labelIncompleteNodes(),this.findResultAreaEdges(opCode),this.cancelDuplicateResultEdges();var polyBuilder=new PolygonBuilder(this._geomFact);polyBuilder.add(this._graph),this._resultPolyList=polyBuilder.getPolygons();var lineBuilder=new LineBuilder(this,this._geomFact,this._ptLocator);this._resultLineList=lineBuilder.build(opCode);var pointBuilder=new PointBuilder(this,this._geomFact,this._ptLocator);this._resultPointList=pointBuilder.build(opCode),this._resultGeom=this.computeGeometry(this._resultPointList,this._resultLineList,this._resultPolyList,opCode)},OverlayOp.prototype.labelIncompleteNode=function labelIncompleteNode(n,targetIndex){var loc=this._ptLocator.locate(n.getCoordinate(),this._arg[targetIndex].getGeometry());n.getLabel().setLocation(targetIndex,loc)},OverlayOp.prototype.copyPoints=function copyPoints(argIndex){for(var this$1=this,i=this._arg[argIndex].getNodeIterator();i.hasNext();){var graphNode=i.next(),newNode=this$1._graph.addNode(graphNode.getCoordinate());newNode.setLabel(argIndex,graphNode.getLabel().getLocation(argIndex))}},OverlayOp.prototype.findResultAreaEdges=function findResultAreaEdges(opCode){for(var it=this._graph.getEdgeEnds().iterator();it.hasNext();){var de=it.next(),label=de.getLabel();label.isArea()&&!de.isInteriorAreaEdge()&&OverlayOp.isResultOfOp(label.getLocation(0,Position.RIGHT),label.getLocation(1,Position.RIGHT),opCode)&&de.setInResult(!0)}},OverlayOp.prototype.computeLabelsFromDepths=function computeLabelsFromDepths(){for(var it=this._edgeList.iterator();it.hasNext();){var e=it.next(),lbl=e.getLabel(),depth=e.getDepth();if(!depth.isNull()){depth.normalize();for(var i=0;2>i;i++)lbl.isNull(i)||!lbl.isArea()||depth.isNull(i)||(0===depth.getDelta(i)?lbl.toLine(i):(Assert.isTrue(!depth.isNull(i,Position.LEFT),"depth of LEFT side has not been initialized"),lbl.setLocation(i,Position.LEFT,depth.getLocation(i,Position.LEFT)),Assert.isTrue(!depth.isNull(i,Position.RIGHT),"depth of RIGHT side has not been initialized"),lbl.setLocation(i,Position.RIGHT,depth.getLocation(i,Position.RIGHT))))}}},OverlayOp.prototype.computeLabelling=function computeLabelling(){for(var this$1=this,nodeit=this._graph.getNodes().iterator(),node;nodeit.hasNext();)node=nodeit.next(),node.getEdges().computeLabelling(this$1._arg);this.mergeSymLabels(),this.updateNodeLabelling()},OverlayOp.prototype.labelIncompleteNodes=function labelIncompleteNodes(){for(var this$1=this,ni=this._graph.getNodes().iterator();ni.hasNext();){var n=ni.next(),label=n.getLabel();n.isIsolated()&&(label.isNull(0)?this$1.labelIncompleteNode(n,0):this$1.labelIncompleteNode(n,1)),n.getEdges().updateLabelling(label)}},OverlayOp.prototype.isCoveredByA=function isCoveredByA(coord){return!!this.isCovered(coord,this._resultPolyList)},OverlayOp.prototype.interfaces_=function interfaces_(){return[]},OverlayOp.prototype.getClass=function getClass(){return OverlayOp},OverlayOp}(GeometryGraphOp);OverlayOp.overlayOp=function(geom0,geom1,opCode){var gov=new OverlayOp(geom0,geom1),geomOv=gov.getResultGeometry(opCode);return geomOv},OverlayOp.intersection=function(g,other){if(g.isEmpty()||other.isEmpty())return OverlayOp.createEmptyResult(OverlayOp.INTERSECTION,g,other,g.getFactory());if(g.isGeometryCollection()){var g2=other;return GeometryCollectionMapper.map(g,{interfaces_:function(){return[GeometryMapper.MapOp]},map:function(g){return g.intersection(g2)}})}return g.checkNotGeometryCollection(g),g.checkNotGeometryCollection(other),SnapIfNeededOverlayOp.overlayOp(g,other,OverlayOp.INTERSECTION)},OverlayOp.symDifference=function(g,other){if(g.isEmpty()||other.isEmpty()){if(g.isEmpty()&&other.isEmpty())return OverlayOp.createEmptyResult(OverlayOp.SYMDIFFERENCE,g,other,g.getFactory());if(g.isEmpty())return other.copy();if(other.isEmpty())return g.copy()}return g.checkNotGeometryCollection(g),g.checkNotGeometryCollection(other),SnapIfNeededOverlayOp.overlayOp(g,other,OverlayOp.SYMDIFFERENCE)},OverlayOp.resultDimension=function(opCode,g0,g1){var dim0=g0.getDimension(),dim1=g1.getDimension(),resultDimension=-1;switch(opCode){case OverlayOp.INTERSECTION:resultDimension=_Mathmin(dim0,dim1);break;case OverlayOp.UNION:resultDimension=_Mathmax(dim0,dim1);break;case OverlayOp.DIFFERENCE:resultDimension=dim0;break;case OverlayOp.SYMDIFFERENCE:resultDimension=_Mathmax(dim0,dim1);break;default:}return resultDimension},OverlayOp.createEmptyResult=function(overlayOpCode,a,b,geomFact){var result=null;switch(OverlayOp.resultDimension(overlayOpCode,a,b)){case-1:result=geomFact.createGeometryCollection([].fill(null));break;case 0:result=geomFact.createPoint();break;case 1:result=geomFact.createLineString();break;case 2:result=geomFact.createPolygon();break;default:}return result},OverlayOp.difference=function(g,other){return g.isEmpty()?OverlayOp.createEmptyResult(OverlayOp.DIFFERENCE,g,other,g.getFactory()):other.isEmpty()?g.copy():(g.checkNotGeometryCollection(g),g.checkNotGeometryCollection(other),SnapIfNeededOverlayOp.overlayOp(g,other,OverlayOp.DIFFERENCE))},OverlayOp.isResultOfOp=function(){if(2===arguments.length){var label=arguments[0],opCode=arguments[1],loc0=label.getLocation(0),loc1=label.getLocation(1);return OverlayOp.isResultOfOp(loc0,loc1,opCode)}if(3===arguments.length){var loc0$1=arguments[0],loc1$1=arguments[1],overlayOpCode=arguments[2];switch(loc0$1===Location.BOUNDARY&&(loc0$1=Location.INTERIOR),loc1$1===Location.BOUNDARY&&(loc1$1=Location.INTERIOR),overlayOpCode){case OverlayOp.INTERSECTION:return loc0$1===Location.INTERIOR&&loc1$1===Location.INTERIOR;case OverlayOp.UNION:return loc0$1===Location.INTERIOR||loc1$1===Location.INTERIOR;case OverlayOp.DIFFERENCE:return loc0$1===Location.INTERIOR&&loc1$1!==Location.INTERIOR;case OverlayOp.SYMDIFFERENCE:return loc0$1===Location.INTERIOR&&loc1$1!==Location.INTERIOR||loc0$1!==Location.INTERIOR&&loc1$1===Location.INTERIOR;default:}return!1}},OverlayOp.INTERSECTION=1,OverlayOp.UNION=2,OverlayOp.DIFFERENCE=3,OverlayOp.SYMDIFFERENCE=4;var FuzzyPointLocator=function FuzzyPointLocator(){this._g=null,this._boundaryDistanceTolerance=null,this._linework=null,this._ptLocator=new PointLocator,this._seg=new LineSegment;var g=arguments[0],boundaryDistanceTolerance=arguments[1];this._g=g,this._boundaryDistanceTolerance=boundaryDistanceTolerance,this._linework=this.extractLinework(g)};FuzzyPointLocator.prototype.isWithinToleranceOfBoundary=function isWithinToleranceOfBoundary(pt){for(var this$1=this,i=0;i<this._linework.getNumGeometries();i++)for(var line=this$1._linework.getGeometryN(i),seq=line.getCoordinateSequence(),j=0;j<seq.size()-1;j++){seq.getCoordinate(j,this$1._seg.p0),seq.getCoordinate(j+1,this$1._seg.p1);var dist=this$1._seg.distance(pt);if(dist<=this$1._boundaryDistanceTolerance)return!0}return!1},FuzzyPointLocator.prototype.getLocation=function getLocation(pt){return this.isWithinToleranceOfBoundary(pt)?Location.BOUNDARY:this._ptLocator.locate(pt,this._g)},FuzzyPointLocator.prototype.extractLinework=function extractLinework(g){var extracter=new PolygonalLineworkExtracter;g.apply(extracter);var linework=extracter.getLinework(),lines=GeometryFactory.toLineStringArray(linework);return g.getFactory().createMultiLineString(lines)},FuzzyPointLocator.prototype.interfaces_=function interfaces_(){return[]},FuzzyPointLocator.prototype.getClass=function getClass(){return FuzzyPointLocator};var PolygonalLineworkExtracter=function PolygonalLineworkExtracter(){this._linework=null,this._linework=new ArrayList};PolygonalLineworkExtracter.prototype.getLinework=function getLinework(){return this._linework},PolygonalLineworkExtracter.prototype.filter=function filter(g){var this$1=this;if(g instanceof Polygon){var poly=g;this._linework.add(poly.getExteriorRing());for(var i=0;i<poly.getNumInteriorRing();i++)this$1._linework.add(poly.getInteriorRingN(i))}},PolygonalLineworkExtracter.prototype.interfaces_=function interfaces_(){return[GeometryFilter]},PolygonalLineworkExtracter.prototype.getClass=function getClass(){return PolygonalLineworkExtracter};var OffsetPointGenerator=function OffsetPointGenerator(){this._g=null,this._doLeft=!0,this._doRight=!0;var g=arguments[0];this._g=g};OffsetPointGenerator.prototype.extractPoints=function extractPoints(line,offsetDistance,offsetPts){for(var this$1=this,pts=line.getCoordinates(),i=0;i<pts.length-1;i++)this$1.computeOffsetPoints(pts[i],pts[i+1],offsetDistance,offsetPts)},OffsetPointGenerator.prototype.setSidesToGenerate=function setSidesToGenerate(doLeft,doRight){this._doLeft=doLeft,this._doRight=doRight},OffsetPointGenerator.prototype.getPoints=function getPoints(offsetDistance){for(var this$1=this,offsetPts=new ArrayList,lines=LinearComponentExtracter.getLines(this._g),i=lines.iterator(),line;i.hasNext();)line=i.next(),this$1.extractPoints(line,offsetDistance,offsetPts);return offsetPts},OffsetPointGenerator.prototype.computeOffsetPoints=function computeOffsetPoints(p0,p1,offsetDistance,offsetPts){var dx=p1.x-p0.x,dy=p1.y-p0.y,len=_Mathsqrt(dx*dx+dy*dy),ux=offsetDistance*dx/len,uy=offsetDistance*dy/len,midX=(p1.x+p0.x)/2,midY=(p1.y+p0.y)/2;if(this._doLeft){var offsetLeft=new Coordinate(midX-uy,midY+ux);offsetPts.add(offsetLeft)}if(this._doRight){var offsetRight=new Coordinate(midX+uy,midY-ux);offsetPts.add(offsetRight)}},OffsetPointGenerator.prototype.interfaces_=function interfaces_(){return[]},OffsetPointGenerator.prototype.getClass=function getClass(){return OffsetPointGenerator};var OverlayResultValidator=function OverlayResultValidator(){this._geom=null,this._locFinder=null,this._location=[,,,].fill(null),this._invalidLocation=null,this._boundaryDistanceTolerance=OverlayResultValidator.TOLERANCE,this._testCoords=new ArrayList;var a=arguments[0],b=arguments[1],result=arguments[2];this._boundaryDistanceTolerance=OverlayResultValidator.computeBoundaryDistanceTolerance(a,b),this._geom=[a,b,result],this._locFinder=[new FuzzyPointLocator(this._geom[0],this._boundaryDistanceTolerance),new FuzzyPointLocator(this._geom[1],this._boundaryDistanceTolerance),new FuzzyPointLocator(this._geom[2],this._boundaryDistanceTolerance)]},staticAccessors$46={TOLERANCE:{configurable:!0}};OverlayResultValidator.prototype.reportResult=function reportResult(overlayOp,location,expectedInterior){System.out.println("Overlay result invalid - A:"+Location.toLocationSymbol(location[0])+" B:"+Location.toLocationSymbol(location[1])+" expected:"+(expectedInterior?"i":"e")+" actual:"+Location.toLocationSymbol(location[2]))},OverlayResultValidator.prototype.isValid=function isValid(overlayOp){this.addTestPts(this._geom[0]),this.addTestPts(this._geom[1]);var isValid=this.checkValid(overlayOp);return isValid},OverlayResultValidator.prototype.checkValid=function checkValid(){var this$1=this;if(1===arguments.length){for(var overlayOp=arguments[0],i=0,pt;i<this._testCoords.size();i++)if(pt=this$1._testCoords.get(i),!this$1.checkValid(overlayOp,pt))return this$1._invalidLocation=pt,!1;return!0}if(2===arguments.length){var overlayOp$1=arguments[0],pt$1=arguments[1];return this._location[0]=this._locFinder[0].getLocation(pt$1),this._location[1]=this._locFinder[1].getLocation(pt$1),this._location[2]=this._locFinder[2].getLocation(pt$1),!!OverlayResultValidator.hasLocation(this._location,Location.BOUNDARY)||this.isValidResult(overlayOp$1,this._location)}},OverlayResultValidator.prototype.addTestPts=function addTestPts(g){var ptGen=new OffsetPointGenerator(g);this._testCoords.addAll(ptGen.getPoints(5*this._boundaryDistanceTolerance))},OverlayResultValidator.prototype.isValidResult=function isValidResult(overlayOp,location){var expectedInterior=OverlayOp.isResultOfOp(location[0],location[1],overlayOp),resultInInterior=location[2]===Location.INTERIOR,isValid=!(expectedInterior^resultInInterior);return isValid||this.reportResult(overlayOp,location,expectedInterior),isValid},OverlayResultValidator.prototype.getInvalidLocation=function getInvalidLocation(){return this._invalidLocation},OverlayResultValidator.prototype.interfaces_=function interfaces_(){return[]},OverlayResultValidator.prototype.getClass=function getClass(){return OverlayResultValidator},OverlayResultValidator.hasLocation=function hasLocation(location,loc){for(var i=0;3>i;i++)if(location[i]===loc)return!0;return!1},OverlayResultValidator.computeBoundaryDistanceTolerance=function computeBoundaryDistanceTolerance(g0,g1){return _Mathmin(GeometrySnapper.computeSizeBasedSnapTolerance(g0),GeometrySnapper.computeSizeBasedSnapTolerance(g1))},OverlayResultValidator.isValid=function isValid(a,b,overlayOp,result){var validator=new OverlayResultValidator(a,b,result);return validator.isValid(overlayOp)},staticAccessors$46.TOLERANCE.get=function(){return 1e-6},Object.defineProperties(OverlayResultValidator,staticAccessors$46);var GeometryCombiner=function GeometryCombiner(geoms){this._geomFactory=null,this._skipEmpty=!1,this._inputGeoms=null,this._geomFactory=GeometryCombiner.extractFactory(geoms),this._inputGeoms=geoms};GeometryCombiner.prototype.extractElements=function extractElements(geom,elems){var this$1=this;if(null===geom)return null;for(var i=0,elemGeom;i<geom.getNumGeometries();i++)(elemGeom=geom.getGeometryN(i),!(this$1._skipEmpty&&elemGeom.isEmpty()))&&elems.add(elemGeom)},GeometryCombiner.prototype.combine=function combine(){for(var this$1=this,elems=new ArrayList,i=this._inputGeoms.iterator(),g;i.hasNext();)g=i.next(),this$1.extractElements(g,elems);return 0===elems.size()?null===this._geomFactory?null:this._geomFactory.createGeometryCollection(null):this._geomFactory.buildGeometry(elems)},GeometryCombiner.prototype.interfaces_=function interfaces_(){return[]},GeometryCombiner.prototype.getClass=function getClass(){return GeometryCombiner},GeometryCombiner.combine=function combine(){if(1===arguments.length){var geoms=arguments[0],combiner=new GeometryCombiner(geoms);return combiner.combine()}if(2===arguments.length){var g0=arguments[0],g1=arguments[1],combiner$1=new GeometryCombiner(GeometryCombiner.createList(g0,g1));return combiner$1.combine()}if(3===arguments.length){var g0$1=arguments[0],g1$1=arguments[1],g2=arguments[2],combiner$2=new GeometryCombiner(GeometryCombiner.createList(g0$1,g1$1,g2));return combiner$2.combine()}},GeometryCombiner.extractFactory=function extractFactory(geoms){return geoms.isEmpty()?null:geoms.iterator().next().getFactory()},GeometryCombiner.createList=function createList(){if(2===arguments.length){var obj0=arguments[0],obj1=arguments[1],list=new ArrayList;return list.add(obj0),list.add(obj1),list}if(3===arguments.length){var obj0$1=arguments[0],obj1$1=arguments[1],obj2=arguments[2],list$1=new ArrayList;return list$1.add(obj0$1),list$1.add(obj1$1),list$1.add(obj2),list$1}};var CascadedPolygonUnion=function CascadedPolygonUnion(){this._inputPolys=null,this._geomFactory=null;var polys=arguments[0];this._inputPolys=polys,null===this._inputPolys&&(this._inputPolys=new ArrayList)},staticAccessors$47={STRTREE_NODE_CAPACITY:{configurable:!0}};CascadedPolygonUnion.prototype.reduceToGeometries=function reduceToGeometries(geomTree){for(var this$1=this,geoms=new ArrayList,i=geomTree.iterator();i.hasNext();){var o=i.next(),geom=null;hasInterface(o,List)?geom=this$1.unionTree(o):o instanceof Geometry&&(geom=o),geoms.add(geom)}return geoms},CascadedPolygonUnion.prototype.extractByEnvelope=function extractByEnvelope(env,geom,disjointGeoms){for(var intersectingGeoms=new ArrayList,i=0,elem;i<geom.getNumGeometries();i++)elem=geom.getGeometryN(i),elem.getEnvelopeInternal().intersects(env)?intersectingGeoms.add(elem):disjointGeoms.add(elem);return this._geomFactory.buildGeometry(intersectingGeoms)},CascadedPolygonUnion.prototype.unionOptimized=function unionOptimized(g0,g1){var g0Env=g0.getEnvelopeInternal(),g1Env=g1.getEnvelopeInternal();if(!g0Env.intersects(g1Env)){var combo=GeometryCombiner.combine(g0,g1);return combo}if(1>=g0.getNumGeometries()&&1>=g1.getNumGeometries())return this.unionActual(g0,g1);var commonEnv=g0Env.intersection(g1Env);return this.unionUsingEnvelopeIntersection(g0,g1,commonEnv)},CascadedPolygonUnion.prototype.union=function union(){if(null===this._inputPolys)throw new Error("union() method cannot be called twice");if(this._inputPolys.isEmpty())return null;this._geomFactory=this._inputPolys.iterator().next().getFactory();for(var index=new STRtree(CascadedPolygonUnion.STRTREE_NODE_CAPACITY),i=this._inputPolys.iterator(),item;i.hasNext();)item=i.next(),index.insert(item.getEnvelopeInternal(),item);this._inputPolys=null;var itemTree=index.itemsTree(),unionAll=this.unionTree(itemTree);return unionAll},CascadedPolygonUnion.prototype.binaryUnion=function binaryUnion(){if(1===arguments.length){var geoms=arguments[0];return this.binaryUnion(geoms,0,geoms.size())}if(3===arguments.length){var geoms$1=arguments[0],start=arguments[1],end=arguments[2];if(1>=end-start){var g0=CascadedPolygonUnion.getGeometry(geoms$1,start);return this.unionSafe(g0,null)}if(2==end-start)return this.unionSafe(CascadedPolygonUnion.getGeometry(geoms$1,start),CascadedPolygonUnion.getGeometry(geoms$1,start+1));var mid=_Mathtrunc((end+start)/2),g0$1=this.binaryUnion(geoms$1,start,mid),g1=this.binaryUnion(geoms$1,mid,end);return this.unionSafe(g0$1,g1)}},CascadedPolygonUnion.prototype.repeatedUnion=function repeatedUnion(geoms){for(var union=null,i=geoms.iterator(),g;i.hasNext();)g=i.next(),union=null==union?g.copy():union.union(g);return union},CascadedPolygonUnion.prototype.unionSafe=function unionSafe(g0,g1){return null===g0&&null===g1?null:null===g0?g1.copy():null===g1?g0.copy():this.unionOptimized(g0,g1)},CascadedPolygonUnion.prototype.unionActual=function unionActual(g0,g1){return CascadedPolygonUnion.restrictToPolygons(g0.union(g1))},CascadedPolygonUnion.prototype.unionTree=function unionTree(geomTree){var geoms=this.reduceToGeometries(geomTree),union=this.binaryUnion(geoms);return union},CascadedPolygonUnion.prototype.unionUsingEnvelopeIntersection=function unionUsingEnvelopeIntersection(g0,g1,common){var disjointPolys=new ArrayList,g0Int=this.extractByEnvelope(common,g0,disjointPolys),g1Int=this.extractByEnvelope(common,g1,disjointPolys),union=this.unionActual(g0Int,g1Int);disjointPolys.add(union);var overallUnion=GeometryCombiner.combine(disjointPolys);return overallUnion},CascadedPolygonUnion.prototype.bufferUnion=function bufferUnion(){if(1===arguments.length){var geoms=arguments[0],factory=geoms.get(0).getFactory(),gColl=factory.buildGeometry(geoms),unionAll=gColl.buffer(0);return unionAll}if(2===arguments.length){var g0=arguments[0],g1=arguments[1],factory$1=g0.getFactory(),gColl$1=factory$1.createGeometryCollection([g0,g1]),unionAll$1=gColl$1.buffer(0);return unionAll$1}},CascadedPolygonUnion.prototype.interfaces_=function interfaces_(){return[]},CascadedPolygonUnion.prototype.getClass=function getClass(){return CascadedPolygonUnion},CascadedPolygonUnion.restrictToPolygons=function restrictToPolygons(g){if(hasInterface(g,Polygonal))return g;var polygons=PolygonExtracter.getPolygons(g);return 1===polygons.size()?polygons.get(0):g.getFactory().createMultiPolygon(GeometryFactory.toPolygonArray(polygons))},CascadedPolygonUnion.getGeometry=function getGeometry(list,index){return index>=list.size()?null:list.get(index)},CascadedPolygonUnion.union=function union(polys){var op=new CascadedPolygonUnion(polys);return op.union()},staticAccessors$47.STRTREE_NODE_CAPACITY.get=function(){return 4},Object.defineProperties(CascadedPolygonUnion,staticAccessors$47);var UnionOp=function UnionOp(){};UnionOp.prototype.interfaces_=function interfaces_(){return[]},UnionOp.prototype.getClass=function getClass(){return UnionOp},UnionOp.union=function union(g,other){if(g.isEmpty()||other.isEmpty()){if(g.isEmpty()&&other.isEmpty())return OverlayOp.createEmptyResult(OverlayOp.UNION,g,other,g.getFactory());if(g.isEmpty())return other.copy();if(other.isEmpty())return g.copy()}return g.checkNotGeometryCollection(g),g.checkNotGeometryCollection(other),SnapIfNeededOverlayOp.overlayOp(g,other,OverlayOp.UNION)};var adder=function(){return new Adder};Adder.prototype={constructor:Adder,reset:function(){this.s=this.t=0},add:function(y){add$1(temp,y,this.t),add$1(this,temp.s,this.s),this.s?this.t+=temp.t:this.s=temp.t},valueOf:function(){return this.s}};var temp=new Adder,epsilon$1=1e-6,pi=_MathPI,halfPi=pi/2,quarterPi=pi/4,tau=2*pi,degrees=180/pi,radians=pi/180,abs=_Mathabs,atan=_Mathatan2,atan2=_Mathatan,cos=_Mathcos,exp=_Mathexp,log=_Mathlog,sin=_Mathsin,sqrt=_Mathsqrt,tan=_Mathtan,streamObjectType={Feature:function(object,stream){streamGeometry(object.geometry,stream)},FeatureCollection:function(object,stream){for(var features=object.features,i=-1,n=features.length;++i<n;)streamGeometry(features[i].geometry,stream)}},streamGeometryType={Sphere:function(object,stream){stream.sphere()},Point:function(object,stream){object=object.coordinates,stream.point(object[0],object[1],object[2])},MultiPoint:function(object,stream){for(var coordinates=object.coordinates,i=-1,n=coordinates.length;++i<n;)object=coordinates[i],stream.point(object[0],object[1],object[2])},LineString:function(object,stream){streamLine(object.coordinates,stream,0)},MultiLineString:function(object,stream){for(var coordinates=object.coordinates,i=-1,n=coordinates.length;++i<n;)streamLine(coordinates[i],stream,0)},Polygon:function(object,stream){streamPolygon(object.coordinates,stream)},MultiPolygon:function(object,stream){for(var coordinates=object.coordinates,i=-1,n=coordinates.length;++i<n;)streamPolygon(coordinates[i],stream)},GeometryCollection:function(object,stream){for(var geometries=object.geometries,i=-1,n=geometries.length;++i<n;)streamGeometry(geometries[i],stream)}},geoStream=function(object,stream){object&&streamObjectType.hasOwnProperty(object.type)?streamObjectType[object.type](object,stream):streamGeometry(object,stream)},areaRingSum=adder(),areaSum=adder(),deltaSum=adder(),compose=function(a,b){function compose(x,y){return x=a(x,y),b(x[0],x[1])}return a.invert&&b.invert&&(compose.invert=function(x,y){return x=b.invert(x,y),x&&a.invert(x[0],x[1])}),compose};rotationIdentity.invert=rotationIdentity;var rotation=function(rotate){function forward(coordinates){return coordinates=rotate(coordinates[0]*radians,coordinates[1]*radians),coordinates[0]*=degrees,coordinates[1]*=degrees,coordinates}return rotate=rotateRadians(rotate[0]*radians,rotate[1]*radians,2<rotate.length?rotate[2]*radians:0),forward.invert=function(coordinates){return coordinates=rotate.invert(coordinates[0]*radians,coordinates[1]*radians),coordinates[0]*=degrees,coordinates[1]*=degrees,coordinates},forward},clipBuffer=function(){var lines=[],line;return{point:function(x,y){line.push([x,y])},lineStart:function(){lines.push(line=[])},lineEnd:noop,rejoin:function(){1<lines.length&&lines.push(lines.pop().concat(lines.shift()))},result:function(){var result=lines;return lines=[],line=null,result}}},clipLine=function(a,b,x0,y0,x1,y1){var ax=a[0],ay=a[1],bx=b[0],by=b[1],t0=0,t1=1,dx=bx-ax,dy=by-ay,r;if(r=x0-ax,dx||!(0<r)){if(r/=dx,0>dx){if(r<t0)return;r<t1&&(t1=r)}else if(0<dx){if(r>t1)return;r>t0&&(t0=r)}if(r=x1-ax,dx||!(0>r)){if(r/=dx,0>dx){if(r>t1)return;r>t0&&(t0=r)}else if(0<dx){if(r<t0)return;r<t1&&(t1=r)}if(r=y0-ay,dy||!(0<r)){if(r/=dy,0>dy){if(r<t0)return;r<t1&&(t1=r)}else if(0<dy){if(r>t1)return;r>t0&&(t0=r)}if(r=y1-ay,dy||!(0>r)){if(r/=dy,0>dy){if(r>t1)return;r>t0&&(t0=r)}else if(0<dy){if(r<t0)return;r<t1&&(t1=r)}return 0<t0&&(a[0]=ax+t0*dx,a[1]=ay+t0*dy),1>t1&&(b[0]=ax+t1*dx,b[1]=ay+t1*dy),!0}}}}},pointEqual=function(a,b){return abs(a[0]-b[0])<epsilon$1&&abs(a[1]-b[1])<epsilon$1},clipPolygon$1=function(segments,compareIntersection,startInside,interpolate,stream){var subject=[],clip=[],i,n;if(segments.forEach(function(segment){if(!(0>=(n=segment.length-1))){var p0=segment[0],p1=segment[n],n,x;if(pointEqual(p0,p1)){for(stream.lineStart(),i=0;i<n;++i)stream.point((p0=segment[i])[0],p0[1]);return void stream.lineEnd()}subject.push(x=new Intersection(p0,segment,null,!0)),clip.push(x.o=new Intersection(p0,null,x,!1)),subject.push(x=new Intersection(p1,segment,null,!1)),clip.push(x.o=new Intersection(p1,null,x,!0))}}),!!subject.length){for(clip.sort(compareIntersection),link(subject),link(clip),(i=0,n=clip.length);i<n;++i)clip[i].e=startInside=!startInside;for(var start=subject[0],points,point;1;){for(var current=start,isSubject=!0;current.v;)if((current=current.n)===start)return;points=current.z,stream.lineStart();do{if(current.v=current.o.v=!0,current.e){if(isSubject)for(i=0,n=points.length;i<n;++i)stream.point((point=points[i])[0],point[1]);else interpolate(current.x,current.n.x,1,stream);current=current.n}else{if(isSubject)for(points=current.p.z,i=points.length-1;0<=i;--i)stream.point((point=points[i])[0],point[1]);else interpolate(current.x,current.p.x,-1,stream);current=current.p}current=current.o,points=current.z,isSubject=!isSubject}while(!current.v);stream.lineEnd()}}},ascending=function(a,b){return a<b?-1:a>b?1:a>=b?0:NaN},bisector=function(compare){return 1===compare.length&&(compare=ascendingComparator(compare)),{left:function(a,x,lo,hi){for(null==lo&&(lo=0),null==hi&&(hi=a.length);lo<hi;){var mid=lo+hi>>>1;0>compare(a[mid],x)?lo=mid+1:hi=mid}return lo},right:function(a,x,lo,hi){for(null==lo&&(lo=0),null==hi&&(hi=a.length);lo<hi;){var mid=lo+hi>>>1;0<compare(a[mid],x)?hi=mid:lo=mid+1}return lo}}},ascendingBisect=bisector(ascending),merge$1=function(arrays){for(var n=arrays.length,i=-1,j=0,m,merged,array;++i<n;)j+=arrays[i].length;for(merged=Array(j);0<=--n;)for(array=arrays[n],m=array.length;0<=--m;)merged[--j]=array[m];return merged},clipMax=1e9,clipMin=-clipMax,sum$1=adder(),polygonContains=function(polygon,point){var lambda=point[0],phi=point[1],normal=[sin(lambda),-cos(lambda),0],angle=0,winding=0;sum$1.reset();for(var i=0,n=polygon.length;i<n;++i)if(m=(ring=polygon[i]).length)for(var point0=ring[m-1],lambda0=point0[0],phi0=point0[1]/2+quarterPi,sinPhi0=sin(phi0),cosPhi0=cos(phi0),j=0,ring,m;j<m;++j,lambda0=lambda1,sinPhi0=sinPhi1,cosPhi0=cosPhi1,point0=point1){var point1=ring[j],lambda1=point1[0],phi1=point1[1]/2+quarterPi,sinPhi1=sin(phi1),cosPhi1=cos(phi1),delta=lambda1-lambda0,sign=0<=delta?1:-1,absDelta=sign*delta,antimeridian=absDelta>pi,k=sinPhi0*sinPhi1;if(sum$1.add(atan2(k*sign*sin(absDelta),cosPhi0*cosPhi1+k*cos(absDelta))),angle+=antimeridian?delta+sign*tau:delta,antimeridian^lambda0>=lambda^lambda1>=lambda){var arc=cartesianCross(cartesian(point0),cartesian(point1));cartesianNormalizeInPlace(arc);var intersection=cartesianCross(normal,arc);cartesianNormalizeInPlace(intersection);var phiArc=(antimeridian^0<=delta?-1:1)*asin(intersection[2]);(phi>phiArc||phi===phiArc&&(arc[0]||arc[1]))&&(winding+=antimeridian^0<=delta?1:-1)}}return(angle<-epsilon$1||angle<epsilon$1&&sum$1<-epsilon$1)^1&winding},lengthSum=adder(),identity$2=function(x){return x},areaSum$1=adder(),areaRingSum$1=adder(),x0$2=Infinity,y0$2=x0$2,x1=-x0$2,y1=x1,boundsStream$1={point:boundsPoint$1,lineStart:noop,lineEnd:noop,polygonStart:noop,polygonEnd:noop,result:function(){var bounds=[[x0$2,y0$2],[x1,y1]];return x1=y1=-(y0$2=x0$2=Infinity),bounds}},lengthSum$1=adder(),clip=function(pointVisible,clipLine,interpolate,start){return function(rotate,sink){function point(lambda,phi){var point=rotate(lambda,phi);pointVisible(lambda=point[0],phi=point[1])&&sink.point(lambda,phi)}function pointLine(lambda,phi){var point=rotate(lambda,phi);line.point(point[0],point[1])}function lineStart(){clip.point=pointLine,line.lineStart()}function lineEnd(){clip.point=point,line.lineEnd()}function pointRing(lambda,phi){ring.push([lambda,phi]);var point=rotate(lambda,phi);ringSink.point(point[0],point[1])}function ringStart(){ringSink.lineStart(),ring=[]}function ringEnd(){pointRing(ring[0][0],ring[0][1]),ringSink.lineEnd();var clean=ringSink.clean(),ringSegments=ringBuffer.result(),n=ringSegments.length,i,m,segment,point;if(ring.pop(),polygon.push(ring),ring=null,!!n){if(1&clean){if(segment=ringSegments[0],0<(m=segment.length-1)){for(polygonStarted||(sink.polygonStart(),polygonStarted=!0),sink.lineStart(),i=0;i<m;++i)sink.point((point=segment[i])[0],point[1]);sink.lineEnd()}return}1<n&&2&clean&&ringSegments.push(ringSegments.pop().concat(ringSegments.shift())),segments.push(ringSegments.filter(validSegment))}}var line=clipLine(sink),rotatedStart=rotate.invert(start[0],start[1]),ringBuffer=clipBuffer(),ringSink=clipLine(ringBuffer),polygonStarted=!1,clip={point:point,lineStart:lineStart,lineEnd:lineEnd,polygonStart:function(){clip.point=pointRing,clip.lineStart=ringStart,clip.lineEnd=ringEnd,segments=[],polygon=[]},polygonEnd:function(){clip.point=point,clip.lineStart=lineStart,clip.lineEnd=lineEnd,segments=merge$1(segments);var startInside=polygonContains(polygon,rotatedStart);segments.length?(!polygonStarted&&(sink.polygonStart(),polygonStarted=!0),clipPolygon$1(segments,compareIntersection,startInside,interpolate,sink)):startInside&&(!polygonStarted&&(sink.polygonStart(),polygonStarted=!0),sink.lineStart(),interpolate(null,null,1,sink),sink.lineEnd()),polygonStarted&&(sink.polygonEnd(),polygonStarted=!1),segments=polygon=null},sphere:function(){sink.polygonStart(),sink.lineStart(),interpolate(null,null,1,sink),sink.lineEnd(),sink.polygonEnd()}},polygon,segments,ring;return clip}},clipAntimeridian=clip(function(){return!0},clipAntimeridianLine,clipAntimeridianInterpolate,[-pi,-halfPi]),clipCircle=function(radius,delta){function interpolate(from,to,direction,stream){circleStream(stream,radius,delta,direction,from,to)}function visible(lambda,phi){return cos(lambda)*cos(phi)>cr}function clipLine(stream){var point0,c0,v0,v00,clean;return{lineStart:function(){v00=v0=!1,clean=1},point:function(lambda,phi){var point1=[lambda,phi],v=visible(lambda,phi),c=smallRadius?v?0:code(lambda,phi):v?code(lambda+(0>lambda?pi:-pi),phi):0,point2;if(!point0&&(v00=v0=v)&&stream.lineStart(),v!==v0&&(point2=intersect(point0,point1),(!point2||pointEqual(point0,point2)||pointEqual(point1,point2))&&(point1[0]+=epsilon$1,point1[1]+=epsilon$1,v=visible(point1[0],point1[1]))),v!==v0)clean=0,v?(stream.lineStart(),point2=intersect(point1,point0),stream.point(point2[0],point2[1])):(point2=intersect(point0,point1),stream.point(point2[0],point2[1]),stream.lineEnd()),point0=point2;else if(notHemisphere&&point0&&smallRadius^v){var t;!(c&c0)&&(t=intersect(point1,point0,!0))&&(clean=0,smallRadius?(stream.lineStart(),stream.point(t[0][0],t[0][1]),stream.point(t[1][0],t[1][1]),stream.lineEnd()):(stream.point(t[1][0],t[1][1]),stream.lineEnd(),stream.lineStart(),stream.point(t[0][0],t[0][1])))}!v||point0&&pointEqual(point0,point1)||stream.point(point1[0],point1[1]),point0=point1,v0=v,c0=c},lineEnd:function(){v0&&stream.lineEnd(),point0=null},clean:function(){return clean|(v00&&v0)<<1}}}function intersect(a,b,two){var pa=cartesian(a),pb=cartesian(b),n1=[1,0,0],n2=cartesianCross(pa,pb),n2n2=cartesianDot(n2,n2),n1n2=n2[0],determinant=n2n2-n1n2*n1n2;if(!determinant)return!two&&a;var c1=cr*n2n2/determinant,c2=-cr*n1n2/determinant,n1xn2=cartesianCross(n1,n2),A=cartesianScale(n1,c1),B=cartesianScale(n2,c2);cartesianAddInPlace(A,B);var u=n1xn2,w=cartesianDot(A,u),uu=cartesianDot(u,u),t2=w*w-uu*(cartesianDot(A,A)-1);if(!(0>t2)){var t=sqrt(t2),q=cartesianScale(u,(-w-t)/uu);if(cartesianAddInPlace(q,A),q=spherical(q),!two)return q;var lambda0=a[0],lambda1=b[0],phi0=a[1],phi1=b[1],z;lambda1<lambda0&&(z=lambda0,lambda0=lambda1,lambda1=z);var delta=lambda1-lambda0,polar=abs(delta-pi)<epsilon$1,meridian=polar||delta<epsilon$1;if(!polar&&phi1<phi0&&(z=phi0,phi0=phi1,phi1=z),meridian?polar?0<phi0+phi1^q[1]<(abs(q[0]-lambda0)<epsilon$1?phi0:phi1):phi0<=q[1]&&q[1]<=phi1:delta>pi^(lambda0<=q[0]&&q[0]<=lambda1)){var q1=cartesianScale(u,(-w+t)/uu);return cartesianAddInPlace(q1,A),[q,spherical(q1)]}}}function code(lambda,phi){var r=smallRadius?radius:pi-radius,code=0;return lambda<-r?code|=1:lambda>r&&(code|=2),phi<-r?code|=4:phi>r&&(code|=8),code}var cr=cos(radius),smallRadius=0<cr,notHemisphere=abs(cr)>epsilon$1;return clip(visible,clipLine,interpolate,smallRadius?[0,-radius]:[-pi,radius-pi])};TransformStream.prototype={constructor:TransformStream,point:function(x,y){this.stream.point(x,y)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};var maxDepth=16,cosMinDistance=cos(30*radians),resample=function(project,delta2){return+delta2?resample$1(project,delta2):resampleNone(project)},transformRadians=transformer({point:function(x,y){this.stream.point(x*radians,y*radians)}});mercatorRaw.invert=function(x,y){return[x,2*atan(exp(y))-halfPi]},transverseMercatorRaw.invert=function(x,y){return[-y,2*atan(exp(x))-halfPi]};var geoTransverseMercator=function(){var m=mercatorProjection(transverseMercatorRaw),center=m.center,rotate=m.rotate;return m.center=function(_){return arguments.length?center([-_[1],_[0]]):(_=center(),[_[1],-_[0]])},m.rotate=function(_){return arguments.length?rotate([_[0],_[1],2<_.length?_[2]+90:90]):(_=rotate(),[_[0],_[1],_[2]-90])},rotate([0,0,90]).scale(159.155)};









exports.projection=main_es$3,
exports.random=main_es$4,
exports.clusters=main_es$5,
exports.helpers=main_es$1,
exports.invariant=main_es$2,
exports.meta=main_es,
exports.isolines=isolines,
exports.convex=convex,
exports.pointsWithinPolygon=pointsWithinPolygon,
exports.concave=concave,
exports.collect=collect,
exports.flip=flip,
exports.simplify=simplify,
exports.bezierSpline=bezier,
exports.tag=tag,
exports.sample=sample,
exports.envelope=envelope,
exports.square=square,
exports.circle=circle,
exports.midpoint=midpoint,
exports.center=center,
exports.centerOfMass=centerOfMass,
exports.centroid=centroid,
exports.combine=combine,
exports.distance=distance,
exports.explode=explode,
exports.bbox=bbox,
exports.tesselate=tesselate,
exports.bboxPolygon=bboxPolygon,
exports.booleanPointInPolygon=booleanPointInPolygon,
exports.nearestPoint=nearestPoint,
exports.nearestPointOnLine=nearestPointOnLine,
exports.nearestPointToLine=nearestPointToLine,
exports.planepoint=planepoint,
exports.tin=tin,
exports.bearing=bearing,
exports.destination=destination,
exports.kinks=kinks,
exports.pointOnFeature=pointOnFeature,
exports.area=area$1,
exports.along=along,
exports.length=length,
exports.lineSlice=lineSlice,
exports.lineSliceAlong=lineSliceAlong,
exports.pointGrid=pointGrid,
exports.truncate=truncate,
exports.flatten=flatten,
exports.lineIntersect=lineIntersect,
exports.lineChunk=lineChunk,
exports.unkinkPolygon=unkinkPolygon,
exports.greatCircle=greatCircle,
exports.lineSegment=lineSegment,
exports.lineSplit=lineSplit,
exports.lineArc=lineArc,
exports.polygonToLine=polygonToLine,
exports.lineToPolygon=lineToPolygon,
exports.bboxClip=bboxClip,
exports.lineOverlap=lineOverlap,
exports.sector=sector,
exports.rhumbBearing=rhumbBearing,
exports.rhumbDistance=rhumbDistance,
exports.rhumbDestination=rhumbDestination,
exports.polygonTangents=polygonTangents,
exports.rewind=rewind,
exports.isobands=isobands,
exports.transformRotate=transformRotate,
exports.transformScale=transformScale,
exports.transformTranslate=transformTranslate,
exports.lineOffset=lineOffset,
exports.polygonize=polygonize$1,
exports.booleanDisjoint=booleanDisjoint,
exports.booleanContains=booleanContains,
exports.booleanCrosses=booleanCrosses,
exports.booleanClockwise=booleanClockwise,
exports.booleanOverlap=booleanOverlap,
exports.booleanPointOnLine=booleanPointOnLine,
exports.booleanEqual=booleanEqual,
exports.booleanWithin=booleanWithin,
exports.clone=clone,
exports.cleanCoords=cleanCoords,
exports.clustersDbscan=clustersDbscan,
exports.clustersKmeans=clustersKmeans,
exports.pointToLineDistance=pointToLineDistance,
exports.booleanParallel=booleanParallel,
exports.shortestPath=shortestPath,
exports.voronoi=voronoi$1,
exports.ellipse=ellipse,
exports.centerMean=centerMean,
exports.centerMedian=centerMedian,
exports.standardDeviationalEllipse=standardDeviationalEllipse,
exports.difference=difference,
exports.buffer=buffer$1,
exports.union=union,
exports.intersect=intersect$2,
exports.dissolve=dissolve$1,
exports.hexGrid=hexGrid,
exports.mask=mask,
exports.squareGrid=squareGrid,
exports.triangleGrid=triangleGrid,
exports.interpolate=interpolate$1,
exports.pointOnSurface=pointOnFeature,
exports.polygonToLineString=polygonToLine,
exports.lineStringToPolygon=lineToPolygon,
exports.inside=booleanPointInPolygon,
exports.within=pointsWithinPolygon,
exports.bezier=bezier,
exports.nearest=nearestPoint,
exports.pointOnLine=nearestPointOnLine,
exports.lineDistance=length,
exports.radians2degrees=radiansToDegrees,
exports.degrees2radians=degreesToRadians,
exports.distanceToDegrees=lengthToDegrees,
exports.distanceToRadians=lengthToRadians,
exports.radiansToDistance=radiansToLength,
exports.bearingToAngle=bearingToAzimuth,
exports.convertDistance=convertLength,
exports.toMercator=toMercator,
exports.toWgs84=toWgs84,
exports.randomPosition=randomPosition,
exports.randomPoint=randomPoint,
exports.randomPolygon=randomPolygon,
exports.randomLineString=randomLineString,
exports.getCluster=getCluster,
exports.clusterEach=clusterEach,
exports.clusterReduce=clusterReduce,
exports.createBins=createBins,
exports.applyFilter=applyFilter,
exports.propertiesContainsFilter=propertiesContainsFilter,
exports.filterProperties=filterProperties,
exports.earthRadius=earthRadius,
exports.factors=factors,
exports.unitsFactors=unitsFactors,
exports.areaFactors=areaFactors,
exports.feature=feature,
exports.geometry=geometry,
exports.point=point,
exports.points=points,
exports.polygon=polygon,
exports.polygons=polygons,
exports.lineString=lineString,
exports.lineStrings=lineStrings,
exports.featureCollection=featureCollection,
exports.multiLineString=multiLineString,
exports.multiPoint=multiPoint,
exports.multiPolygon=multiPolygon,
exports.geometryCollection=geometryCollection,
exports.round=round,
exports.radiansToLength=radiansToLength,
exports.lengthToRadians=lengthToRadians,
exports.lengthToDegrees=lengthToDegrees,
exports.bearingToAzimuth=bearingToAzimuth,
exports.radiansToDegrees=radiansToDegrees,
exports.degreesToRadians=degreesToRadians,
exports.convertLength=convertLength,
exports.convertArea=convertArea,
exports.isNumber=isNumber,
exports.isObject=isObject,
exports.validateBBox=validateBBox,
exports.validateId=validateId,
exports.getCoord=getCoord,
exports.getCoords=getCoords,
exports.containsNumber=containsNumber,
exports.geojsonType=geojsonType,
exports.featureOf=featureOf,
exports.collectionOf=collectionOf,
exports.getGeom=getGeom,
exports.getGeomType=getGeomType,
exports.getType=getType,
exports.coordEach=coordEach,
exports.coordReduce=coordReduce,
exports.propEach=propEach,
exports.propReduce=propReduce,
exports.featureEach=featureEach,
exports.featureReduce=featureReduce,
exports.coordAll=coordAll,
exports.geomEach=geomEach,
exports.geomReduce=geomReduce,
exports.flattenEach=flattenEach,
exports.flattenReduce=flattenReduce,
exports.segmentEach=segmentEach,
exports.segmentReduce=segmentReduce,
exports.lineEach=lineEach,
exports.lineReduce=lineReduce,

Object.defineProperty(exports,"__esModule",{value:!0});

});

}).call(this,require("--console--"));
},{"--console--":6}]},{},[10])(10);
});