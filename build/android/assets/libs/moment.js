;(function(global,factory){
"object"==typeof exports&&"undefined"!=typeof module?module.exports=factory():
"function"==typeof define&&define.amd?define(factory):
global.moment=factory();
})(global,function(){'use strict';var _Mathround=






























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































Math.round,_Mathabs=Math.abs,_Mathmin=Math.min,_Mathfloor=Math.floor,_Mathceil=Math.ceil;function utils_hooks__hooks(){return hookCallback.apply(null,arguments)}function setHookCallback(callback){hookCallback=callback}function isArray(input){return"[object Array]"===Object.prototype.toString.call(input)}function isDate(input){return input instanceof Date||"[object Date]"===Object.prototype.toString.call(input)}function map(arr,fn){var res=[],i;for(i=0;i<arr.length;++i)res.push(fn(arr[i],i));return res}function hasOwnProp(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function extend(a,b){for(var i in b)hasOwnProp(b,i)&&(a[i]=b[i]);return hasOwnProp(b,"toString")&&(a.toString=b.toString),hasOwnProp(b,"valueOf")&&(a.valueOf=b.valueOf),a}function create_utc__createUTC(input,format,locale,strict){return createLocalOrUTC(input,format,locale,strict,!0).utc()}function defaultParsingFlags(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function getParsingFlags(m){return null==m._pf&&(m._pf=defaultParsingFlags()),m._pf}function valid__isValid(m){if(null==m._isValid){var flags=getParsingFlags(m);m._isValid=!isNaN(m._d.getTime())&&0>flags.overflow&&!flags.empty&&!flags.invalidMonth&&!flags.invalidWeekday&&!flags.nullInput&&!flags.invalidFormat&&!flags.userInvalidated,m._strict&&(m._isValid=m._isValid&&0===flags.charsLeftOver&&0===flags.unusedTokens.length&&void 0===flags.bigHour)}return m._isValid}function valid__createInvalid(flags){var m=create_utc__createUTC(NaN);return null==flags?getParsingFlags(m).userInvalidated=!0:extend(getParsingFlags(m),flags),m}function isUndefined(input){return void 0===input}function copyConfig(to,from){var i,prop,val;if(isUndefined(from._isAMomentObject)||(to._isAMomentObject=from._isAMomentObject),isUndefined(from._i)||(to._i=from._i),isUndefined(from._f)||(to._f=from._f),isUndefined(from._l)||(to._l=from._l),isUndefined(from._strict)||(to._strict=from._strict),isUndefined(from._tzm)||(to._tzm=from._tzm),isUndefined(from._isUTC)||(to._isUTC=from._isUTC),isUndefined(from._offset)||(to._offset=from._offset),isUndefined(from._pf)||(to._pf=getParsingFlags(from)),isUndefined(from._locale)||(to._locale=from._locale),0<momentProperties.length)for(i in momentProperties)prop=momentProperties[i],val=from[prop],isUndefined(val)||(to[prop]=val);return to}function Moment(config){copyConfig(this,config),this._d=new Date(null==config._d?NaN:config._d.getTime()),!1===updateInProgress&&(updateInProgress=!0,utils_hooks__hooks.updateOffset(this),updateInProgress=!1)}function isMoment(obj){return obj instanceof Moment||null!=obj&&null!=obj._isAMomentObject}function absFloor(number){return 0>number?_Mathceil(number):_Mathfloor(number)}function toInt(argumentForCoercion){var coercedNumber=+argumentForCoercion,value=0;return 0!=coercedNumber&&isFinite(coercedNumber)&&(value=absFloor(coercedNumber)),value}function compareArrays(array1,array2,dontConvert){var len=_Mathmin(array1.length,array2.length),lengthDiff=_Mathabs(array1.length-array2.length),diffs=0,i;for(i=0;i<len;i++)(dontConvert&&array1[i]!==array2[i]||!dontConvert&&toInt(array1[i])!==toInt(array2[i]))&&diffs++;return diffs+lengthDiff}function Locale(){}function normalizeLocale(key){return key?key.toLowerCase().replace("_","-"):key}function chooseLocale(names){for(var i=0,j,next,locale,split;i<names.length;){for(split=normalizeLocale(names[i]).split("-"),j=split.length,next=normalizeLocale(names[i+1]),next=next?next.split("-"):null;0<j;){if(locale=loadLocale(split.slice(0,j).join("-")),locale)return locale;if(next&&next.length>=j&&compareArrays(split,next,!0)>=j-1)break;j--}i++}return null}function loadLocale(name){var oldLocale=null;if(!locales[name]&&"undefined"!=typeof module&&module&&module.exports)try{oldLocale=globalLocale._abbr,require("./locale/"+name),locale_locales__getSetGlobalLocale(oldLocale)}catch(e){}return locales[name]}function locale_locales__getSetGlobalLocale(key,values){var data;return key&&(data=isUndefined(values)?locale_locales__getLocale(key):defineLocale(key,values),data&&(globalLocale=data)),globalLocale._abbr}function defineLocale(name,values){return null===values?(delete locales[name],null):(values.abbr=name,locales[name]=locales[name]||new Locale,locales[name].set(values),locale_locales__getSetGlobalLocale(name),locales[name])}function locale_locales__getLocale(key){var locale;if(key&&key._locale&&key._locale._abbr&&(key=key._locale._abbr),!key)return globalLocale;if(!isArray(key)){if(locale=loadLocale(key),locale)return locale;key=[key]}return chooseLocale(key)}function addUnitAlias(unit,shorthand){var lowerCase=unit.toLowerCase();aliases[lowerCase]=aliases[lowerCase+"s"]=aliases[shorthand]=unit}function normalizeUnits(units){return"string"==typeof units?aliases[units]||aliases[units.toLowerCase()]:void 0}function normalizeObjectUnits(inputObject){var normalizedInput={},normalizedProp,prop;for(prop in inputObject)hasOwnProp(inputObject,prop)&&(normalizedProp=normalizeUnits(prop),normalizedProp&&(normalizedInput[normalizedProp]=inputObject[prop]));return normalizedInput}function isFunction(input){return input instanceof Function||"[object Function]"===Object.prototype.toString.call(input)}function makeGetSet(unit,keepTime){return function(value){return null==value?get_set__get(this,unit):(get_set__set(this,unit,value),utils_hooks__hooks.updateOffset(this,keepTime),this)}}function get_set__get(mom,unit){return mom.isValid()?mom._d["get"+(mom._isUTC?"UTC":"")+unit]():NaN}function get_set__set(mom,unit,value){mom.isValid()&&mom._d["set"+(mom._isUTC?"UTC":"")+unit](value)}function getSet(units,value){var unit;if("object"==typeof units)for(unit in units)this.set(unit,units[unit]);else if(units=normalizeUnits(units),isFunction(this[units]))return this[units](value);return this}function zeroFill(number,targetLength,forceSign){var _Mathpow=Math.pow,_Mathmax=Math.max,absNumber=""+_Mathabs(number),zerosToFill=targetLength-absNumber.length,sign=0<=number;return(sign?forceSign?"+":"":"-")+_Mathpow(10,_Mathmax(0,zerosToFill)).toString().substr(1)+absNumber}function addFormatToken(token,padded,ordinal,callback){var func=callback;"string"==typeof callback&&(func=function(){return this[callback]()}),token&&(formatTokenFunctions[token]=func),padded&&(formatTokenFunctions[padded[0]]=function(){return zeroFill(func.apply(this,arguments),padded[1],padded[2])}),ordinal&&(formatTokenFunctions[ordinal]=function(){return this.localeData().ordinal(func.apply(this,arguments),token)})}function removeFormattingTokens(input){return input.match(/\[[\s\S]/)?input.replace(/^\[|\]$/g,""):input.replace(/\\/g,"")}function makeFormatFunction(format){var array=format.match(formattingTokens),i,length;for(i=0,length=array.length;i<length;i++)array[i]=formatTokenFunctions[array[i]]?formatTokenFunctions[array[i]]:removeFormattingTokens(array[i]);return function(mom){var output="";for(i=0;i<length;i++)output+=array[i]instanceof Function?array[i].call(mom,format):array[i];return output}}function formatMoment(m,format){return m.isValid()?(format=expandFormat(format,m.localeData()),formatFunctions[format]=formatFunctions[format]||makeFormatFunction(format),formatFunctions[format](m)):m.localeData().invalidDate()}function expandFormat(format,locale){function replaceLongDateFormatTokens(input){return locale.longDateFormat(input)||input}var i=5;for(localFormattingTokens.lastIndex=0;0<=i&&localFormattingTokens.test(format);)format=format.replace(localFormattingTokens,replaceLongDateFormatTokens),localFormattingTokens.lastIndex=0,i-=1;return format}function addRegexToken(token,regex,strictRegex){regexes[token]=isFunction(regex)?regex:function(isStrict,localeData){return isStrict&&strictRegex?strictRegex:regex}}function getParseRegexForToken(token,config){return hasOwnProp(regexes,token)?regexes[token](config._strict,config._locale):new RegExp(unescapeFormat(token))}function unescapeFormat(s){return regexEscape(s.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(matched,p1,p2,p3,p4){return p1||p2||p3||p4}))}function regexEscape(s){return s.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function addParseToken(token,callback){var func=callback,i;for("string"==typeof token&&(token=[token]),"number"==typeof callback&&(func=function(input,array){array[callback]=toInt(input)}),i=0;i<token.length;i++)tokens[token[i]]=func}function addWeekParseToken(token,callback){addParseToken(token,function(input,array,config,token){config._w=config._w||{},callback(input,config._w,config,token)})}function addTimeToArrayFromToken(token,input,config){null!=input&&hasOwnProp(tokens,token)&&tokens[token](input,config._a,config,token)}function daysInMonth(year,month){return new Date(Date.UTC(year,month+1,0)).getUTCDate()}function localeMonths(m,format){return isArray(this._months)?this._months[m.month()]:this._months[MONTHS_IN_FORMAT.test(format)?"format":"standalone"][m.month()]}function localeMonthsShort(m,format){return isArray(this._monthsShort)?this._monthsShort[m.month()]:this._monthsShort[MONTHS_IN_FORMAT.test(format)?"format":"standalone"][m.month()]}function localeMonthsParse(monthName,format,strict){var i,mom,regex;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),i=0;12>i;i++){if(mom=create_utc__createUTC([2e3,i]),strict&&!this._longMonthsParse[i]&&(this._longMonthsParse[i]=new RegExp("^"+this.months(mom,"").replace(".","")+"$","i"),this._shortMonthsParse[i]=new RegExp("^"+this.monthsShort(mom,"").replace(".","")+"$","i")),strict||this._monthsParse[i]||(regex="^"+this.months(mom,"")+"|^"+this.monthsShort(mom,""),this._monthsParse[i]=new RegExp(regex.replace(".",""),"i")),strict&&"MMMM"===format&&this._longMonthsParse[i].test(monthName))return i;if(strict&&"MMM"===format&&this._shortMonthsParse[i].test(monthName))return i;if(!strict&&this._monthsParse[i].test(monthName))return i}}function setMonth(mom,value){var dayOfMonth;return mom.isValid()?"string"==typeof value&&(value=mom.localeData().monthsParse(value),"number"!=typeof value)?mom:(dayOfMonth=_Mathmin(mom.date(),daysInMonth(mom.year(),value)),mom._d["set"+(mom._isUTC?"UTC":"")+"Month"](value,dayOfMonth),mom):mom}function getSetMonth(value){return null==value?get_set__get(this,"Month"):(setMonth(this,value),utils_hooks__hooks.updateOffset(this,!0),this)}function getDaysInMonth(){return daysInMonth(this.year(),this.month())}function monthsShortRegex(isStrict){return this._monthsParseExact?(hasOwnProp(this,"_monthsRegex")||computeMonthsParse.call(this),isStrict?this._monthsShortStrictRegex:this._monthsShortRegex):this._monthsShortStrictRegex&&isStrict?this._monthsShortStrictRegex:this._monthsShortRegex}function monthsRegex(isStrict){return this._monthsParseExact?(hasOwnProp(this,"_monthsRegex")||computeMonthsParse.call(this),isStrict?this._monthsStrictRegex:this._monthsRegex):this._monthsStrictRegex&&isStrict?this._monthsStrictRegex:this._monthsRegex}function computeMonthsParse(){function cmpLenRev(a,b){return b.length-a.length}var shortPieces=[],longPieces=[],mixedPieces=[],i,mom;for(i=0;12>i;i++)mom=create_utc__createUTC([2e3,i]),shortPieces.push(this.monthsShort(mom,"")),longPieces.push(this.months(mom,"")),mixedPieces.push(this.months(mom,"")),mixedPieces.push(this.monthsShort(mom,""));for(shortPieces.sort(cmpLenRev),longPieces.sort(cmpLenRev),mixedPieces.sort(cmpLenRev),i=0;12>i;i++)shortPieces[i]=regexEscape(shortPieces[i]),longPieces[i]=regexEscape(longPieces[i]),mixedPieces[i]=regexEscape(mixedPieces[i]);this._monthsRegex=new RegExp("^("+mixedPieces.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+longPieces.join("|")+")$","i"),this._monthsShortStrictRegex=new RegExp("^("+shortPieces.join("|")+")$","i")}function checkOverflow(m){var a=m._a,overflow;return a&&-2===getParsingFlags(m).overflow&&(overflow=0>a[1]||11<a[1]?1:1>a[2]||a[2]>daysInMonth(a[0],a[1])?2:0>a[3]||24<a[3]||24===a[3]&&(0!==a[4]||0!==a[5]||0!==a[6])?3:0>a[4]||59<a[4]?4:0>a[5]||59<a[5]?5:0>a[6]||999<a[6]?6:-1,getParsingFlags(m)._overflowDayOfYear&&(0>overflow||2<overflow)&&(overflow=2),getParsingFlags(m)._overflowWeeks&&-1===overflow&&(overflow=7),getParsingFlags(m)._overflowWeekday&&-1===overflow&&(overflow=8),getParsingFlags(m).overflow=overflow),m}function warn(msg){!1===utils_hooks__hooks.suppressDeprecationWarnings&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+msg)}function deprecate(msg,fn){var firstTime=!0;return extend(function(){return firstTime&&(warn(msg+"\nArguments: "+Array.prototype.slice.call(arguments).join(", ")+"\n"+new Error().stack),firstTime=!1),fn.apply(this,arguments)},fn)}function deprecateSimple(name,msg){deprecations[name]||(warn(msg),deprecations[name]=!0)}function configFromISO(config){var string=config._i,match=extendedIsoRegex.exec(string)||basicIsoRegex.exec(string),i,l,allowTime,dateFormat,timeFormat,tzFormat;if(match){for(getParsingFlags(config).iso=!0,i=0,l=isoDates.length;i<l;i++)if(isoDates[i][1].exec(match[1])){dateFormat=isoDates[i][0],allowTime=!1!==isoDates[i][2];break}if(null==dateFormat)return void(config._isValid=!1);if(match[3]){for(i=0,l=isoTimes.length;i<l;i++)if(isoTimes[i][1].exec(match[3])){timeFormat=(match[2]||" ")+isoTimes[i][0];break}if(null==timeFormat)return void(config._isValid=!1)}if(!allowTime&&null!=timeFormat)return void(config._isValid=!1);if(match[4])if(tzRegex.exec(match[4]))tzFormat="Z";else return void(config._isValid=!1);config._f=dateFormat+(timeFormat||"")+(tzFormat||""),configFromStringAndFormat(config)}else config._isValid=!1}function configFromString(config){var matched=aspNetJsonRegex.exec(config._i);return null===matched?void(configFromISO(config),!1===config._isValid&&(delete config._isValid,utils_hooks__hooks.createFromInputFallback(config))):void(config._d=new Date(+matched[1]))}function createDate(y,m,d,h,M,s,ms){var date=new Date(y,m,d,h,M,s,ms);return 100>y&&0<=y&&isFinite(date.getFullYear())&&date.setFullYear(y),date}function createUTCDate(y){var date=new Date(Date.UTC.apply(null,arguments));return 100>y&&0<=y&&isFinite(date.getUTCFullYear())&&date.setUTCFullYear(y),date}function daysInYear(year){return isLeapYear(year)?366:365}function isLeapYear(year){return 0==year%4&&0!=year%100||0==year%400}function getIsLeapYear(){return isLeapYear(this.year())}function firstWeekOffset(year,dow,doy){var fwd=7+dow-doy,fwdlw=(7+createUTCDate(year,0,fwd).getUTCDay()-dow)%7;return-fwdlw+fwd-1}function dayOfYearFromWeeks(year,week,weekday,dow,doy){var localWeekday=(7+weekday-dow)%7,weekOffset=firstWeekOffset(year,dow,doy),dayOfYear=1+7*(week-1)+localWeekday+weekOffset,resYear,resDayOfYear;return 0>=dayOfYear?(resYear=year-1,resDayOfYear=daysInYear(resYear)+dayOfYear):dayOfYear>daysInYear(year)?(resYear=year+1,resDayOfYear=dayOfYear-daysInYear(year)):(resYear=year,resDayOfYear=dayOfYear),{year:resYear,dayOfYear:resDayOfYear}}function weekOfYear(mom,dow,doy){var weekOffset=firstWeekOffset(mom.year(),dow,doy),week=_Mathfloor((mom.dayOfYear()-weekOffset-1)/7)+1,resWeek,resYear;return 1>week?(resYear=mom.year()-1,resWeek=week+weeksInYear(resYear,dow,doy)):week>weeksInYear(mom.year(),dow,doy)?(resWeek=week-weeksInYear(mom.year(),dow,doy),resYear=mom.year()+1):(resYear=mom.year(),resWeek=week),{week:resWeek,year:resYear}}function weeksInYear(year,dow,doy){var weekOffset=firstWeekOffset(year,dow,doy),weekOffsetNext=firstWeekOffset(year+1,dow,doy);return(daysInYear(year)-weekOffset+weekOffsetNext)/7}function defaults(a,b,c){return null==a?null==b?c:b:a}function currentDateArray(config){var nowValue=new Date(utils_hooks__hooks.now());return config._useUTC?[nowValue.getUTCFullYear(),nowValue.getUTCMonth(),nowValue.getUTCDate()]:[nowValue.getFullYear(),nowValue.getMonth(),nowValue.getDate()]}function configFromArray(config){var input=[],i,date,currentDate,yearToUse;if(!config._d){for(currentDate=currentDateArray(config),config._w&&null==config._a[2]&&null==config._a[1]&&dayOfYearFromWeekInfo(config),config._dayOfYear&&(yearToUse=defaults(config._a[0],currentDate[0]),config._dayOfYear>daysInYear(yearToUse)&&(getParsingFlags(config)._overflowDayOfYear=!0),date=createUTCDate(yearToUse,0,config._dayOfYear),config._a[1]=date.getUTCMonth(),config._a[2]=date.getUTCDate()),i=0;3>i&&null==config._a[i];++i)config._a[i]=input[i]=currentDate[i];for(;7>i;i++)config._a[i]=input[i]=null==config._a[i]?2===i?1:0:config._a[i];24===config._a[3]&&0===config._a[4]&&0===config._a[5]&&0===config._a[6]&&(config._nextDay=!0,config._a[3]=0),config._d=(config._useUTC?createUTCDate:createDate).apply(null,input),null!=config._tzm&&config._d.setUTCMinutes(config._d.getUTCMinutes()-config._tzm),config._nextDay&&(config._a[3]=24)}}function dayOfYearFromWeekInfo(config){var w,weekYear,week,weekday,dow,doy,temp,weekdayOverflow;w=config._w,null!=w.GG||null!=w.W||null!=w.E?(dow=1,doy=4,weekYear=defaults(w.GG,config._a[0],weekOfYear(local__createLocal(),1,4).year),week=defaults(w.W,1),weekday=defaults(w.E,1),(1>weekday||7<weekday)&&(weekdayOverflow=!0)):(dow=config._locale._week.dow,doy=config._locale._week.doy,weekYear=defaults(w.gg,config._a[0],weekOfYear(local__createLocal(),dow,doy).year),week=defaults(w.w,1),null==w.d?null==w.e?weekday=dow:(weekday=w.e+dow,(0>w.e||6<w.e)&&(weekdayOverflow=!0)):(weekday=w.d,(0>weekday||6<weekday)&&(weekdayOverflow=!0))),1>week||week>weeksInYear(weekYear,dow,doy)?getParsingFlags(config)._overflowWeeks=!0:null==weekdayOverflow?(temp=dayOfYearFromWeeks(weekYear,week,weekday,dow,doy),config._a[0]=temp.year,config._dayOfYear=temp.dayOfYear):getParsingFlags(config)._overflowWeekday=!0}function configFromStringAndFormat(config){if(config._f===utils_hooks__hooks.ISO_8601)return void configFromISO(config);config._a=[],getParsingFlags(config).empty=!0;var string=""+config._i,stringLength=string.length,totalParsedInputLength=0,i,parsedInput,tokens,token,skipped;for(tokens=expandFormat(config._f,config._locale).match(formattingTokens)||[],i=0;i<tokens.length;i++)token=tokens[i],parsedInput=(string.match(getParseRegexForToken(token,config))||[])[0],parsedInput&&(skipped=string.substr(0,string.indexOf(parsedInput)),0<skipped.length&&getParsingFlags(config).unusedInput.push(skipped),string=string.slice(string.indexOf(parsedInput)+parsedInput.length),totalParsedInputLength+=parsedInput.length),formatTokenFunctions[token]?(parsedInput?getParsingFlags(config).empty=!1:getParsingFlags(config).unusedTokens.push(token),addTimeToArrayFromToken(token,parsedInput,config)):config._strict&&!parsedInput&&getParsingFlags(config).unusedTokens.push(token);getParsingFlags(config).charsLeftOver=stringLength-totalParsedInputLength,0<string.length&&getParsingFlags(config).unusedInput.push(string),!0===getParsingFlags(config).bigHour&&12>=config._a[3]&&0<config._a[3]&&(getParsingFlags(config).bigHour=void 0),config._a[3]=meridiemFixWrap(config._locale,config._a[3],config._meridiem),configFromArray(config),checkOverflow(config)}function meridiemFixWrap(locale,hour,meridiem){var isPm;return null==meridiem?hour:null==locale.meridiemHour?null==locale.isPM?hour:(isPm=locale.isPM(meridiem),isPm&&12>hour&&(hour+=12),isPm||12!==hour||(hour=0),hour):locale.meridiemHour(hour,meridiem)}function configFromStringAndArray(config){var tempConfig,bestMoment,scoreToBeat,i,currentScore;if(0===config._f.length)return getParsingFlags(config).invalidFormat=!0,void(config._d=new Date(NaN));for(i=0;i<config._f.length;i++)(currentScore=0,tempConfig=copyConfig({},config),null!=config._useUTC&&(tempConfig._useUTC=config._useUTC),tempConfig._f=config._f[i],configFromStringAndFormat(tempConfig),!!valid__isValid(tempConfig))&&(currentScore+=getParsingFlags(tempConfig).charsLeftOver,currentScore+=10*getParsingFlags(tempConfig).unusedTokens.length,getParsingFlags(tempConfig).score=currentScore,(null==scoreToBeat||currentScore<scoreToBeat)&&(scoreToBeat=currentScore,bestMoment=tempConfig));extend(config,bestMoment||tempConfig)}function configFromObject(config){if(!config._d){var i=normalizeObjectUnits(config._i);config._a=map([i.year,i.month,i.day||i.date,i.hour,i.minute,i.second,i.millisecond],function(obj){return obj&&parseInt(obj,10)}),configFromArray(config)}}function createFromConfig(config){var res=new Moment(checkOverflow(prepareConfig(config)));return res._nextDay&&(res.add(1,"d"),res._nextDay=void 0),res}function prepareConfig(config){var input=config._i,format=config._f;return(config._locale=config._locale||locale_locales__getLocale(config._l),null===input||void 0===format&&""===input)?valid__createInvalid({nullInput:!0}):("string"==typeof input&&(config._i=input=config._locale.preparse(input)),isMoment(input))?new Moment(checkOverflow(input)):(isArray(format)?configFromStringAndArray(config):format?configFromStringAndFormat(config):isDate(input)?config._d=input:configFromInput(config),valid__isValid(config)||(config._d=null),config)}function configFromInput(config){var input=config._i;void 0===input?config._d=new Date(utils_hooks__hooks.now()):isDate(input)?config._d=new Date(+input):"string"==typeof input?configFromString(config):isArray(input)?(config._a=map(input.slice(0),function(obj){return parseInt(obj,10)}),configFromArray(config)):"object"==typeof input?configFromObject(config):"number"==typeof input?config._d=new Date(input):utils_hooks__hooks.createFromInputFallback(config)}function createLocalOrUTC(input,format,locale,strict,isUTC){var c={};return"boolean"==typeof locale&&(strict=locale,locale=void 0),c._isAMomentObject=!0,c._useUTC=c._isUTC=isUTC,c._l=locale,c._i=input,c._f=format,c._strict=strict,createFromConfig(c)}function local__createLocal(input,format,locale,strict){return createLocalOrUTC(input,format,locale,strict,!1)}function pickBy(fn,moments){var res,i;if(1===moments.length&&isArray(moments[0])&&(moments=moments[0]),!moments.length)return local__createLocal();for(res=moments[0],i=1;i<moments.length;++i)(!moments[i].isValid()||moments[i][fn](res))&&(res=moments[i]);return res}function min(){var args=[].slice.call(arguments,0);return pickBy("isBefore",args)}function max(){var args=[].slice.call(arguments,0);return pickBy("isAfter",args)}function Duration(duration){var normalizedInput=normalizeObjectUnits(duration),years=normalizedInput.year||0,quarters=normalizedInput.quarter||0,months=normalizedInput.month||0,weeks=normalizedInput.week||0,days=normalizedInput.day||0,hours=normalizedInput.hour||0,minutes=normalizedInput.minute||0,seconds=normalizedInput.second||0,milliseconds=normalizedInput.millisecond||0;this._milliseconds=+milliseconds+1e3*seconds+6e4*minutes+36e5*hours,this._days=+days+7*weeks,this._months=+months+3*quarters+12*years,this._data={},this._locale=locale_locales__getLocale(),this._bubble()}function isDuration(obj){return obj instanceof Duration}function offset(token,separator){addFormatToken(token,0,0,function(){var offset=this.utcOffset(),sign="+";return 0>offset&&(offset=-offset,sign="-"),sign+zeroFill(~~(offset/60),2)+separator+zeroFill(~~offset%60,2)})}function offsetFromString(matcher,string){var matches=(string||"").match(matcher)||[],chunk=matches[matches.length-1]||[],parts=(chunk+"").match(chunkOffset)||["-",0,0],minutes=+(60*parts[1])+toInt(parts[2]);return"+"===parts[0]?minutes:-minutes}function cloneWithOffset(input,model){var res,diff;return model._isUTC?(res=model.clone(),diff=(isMoment(input)||isDate(input)?+input:+local__createLocal(input))-+res,res._d.setTime(+res._d+diff),utils_hooks__hooks.updateOffset(res,!1),res):local__createLocal(input).local()}function getDateOffset(m){return 15*-_Mathround(m._d.getTimezoneOffset()/15);
}



















function getSetOffset(input,keepLocalTime){
var offset=this._offset||0,
localAdjust;return(
this.isValid()?


null==input?
























this._isUTC?offset:getDateOffset(this):("string"==typeof input?input=offsetFromString(matchShortOffset,input):16>_Mathabs(input)&&(input*=60),!this._isUTC&&keepLocalTime&&(localAdjust=getDateOffset(this)),this._offset=input,this._isUTC=!0,null!=localAdjust&&this.add(localAdjust,"m"),offset!==input&&(!keepLocalTime||this._changeInProgress?add_subtract__addSubtract(this,create__createDuration(input-offset,"m"),1,!1):!this._changeInProgress&&(this._changeInProgress=!0,utils_hooks__hooks.updateOffset(this,!0),this._changeInProgress=null)),this):null==input?NaN:this);

}

function getSetZone(input,keepLocalTime){return(
null==input?








-this.utcOffset():("string"!=typeof input&&(input=-input),this.utcOffset(input,keepLocalTime),this));

}

function setOffsetToUTC(keepLocalTime){
return this.utcOffset(0,keepLocalTime);
}

function setOffsetToLocal(keepLocalTime){








return this._isUTC&&(this.utcOffset(0,keepLocalTime),this._isUTC=!1,keepLocalTime&&this.subtract(getDateOffset(this),"m")),this;
}

function setOffsetToParsedOffset(){





return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(offsetFromString(matchOffset,this._i)),this;
}

function hasAlignedHourOffset(input){return!!
this.isValid()&&(


input=input?local__createLocal(input).utcOffset():0,

0==(this.utcOffset()-input)%60);
}

function isDaylightSavingTime(){
return(
this.utcOffset()>this.clone().month(0).utcOffset()||
this.utcOffset()>this.clone().month(5).utcOffset());

}

function isDaylightSavingTimeShifted(){
if(!isUndefined(this._isDSTShifted))
return this._isDSTShifted;


var c={};




if(copyConfig(c,this),c=prepareConfig(c),c._a){
var other=c._isUTC?create_utc__createUTC(c._a):local__createLocal(c._a);
this._isDSTShifted=this.isValid()&&
0<compareArrays(c._a,other.toArray());
}else
this._isDSTShifted=!1;


return this._isDSTShifted;
}

function isLocal(){
return!!this.isValid()&&!this._isUTC;
}

function isUtcOffset(){
return!!this.isValid()&&this._isUTC;
}

function isUtc(){
return!!this.isValid()&&this._isUTC&&0===this._offset;
}








function create__createDuration(input,key){
var duration=input,

match=null,
sign,
ret,
diffRes;



















































return isDuration(input)?duration={ms:input._milliseconds,d:input._days,M:input._months}:"number"==typeof input?(duration={},key?duration[key]=input:duration.milliseconds=input):(match=aspNetRegex.exec(input))?(sign="-"===match[1]?-1:1,duration={y:0,d:toInt(match[2])*sign,h:toInt(match[3])*sign,m:toInt(match[4])*sign,s:toInt(match[5])*sign,ms:toInt(match[6])*sign}):(match=isoRegex.exec(input))?(sign="-"===match[1]?-1:1,duration={y:parseIso(match[2],sign),M:parseIso(match[3],sign),d:parseIso(match[4],sign),h:parseIso(match[5],sign),m:parseIso(match[6],sign),s:parseIso(match[7],sign),w:parseIso(match[8],sign)}):null==duration?duration={}:"object"==typeof duration&&("from"in duration||"to"in duration)&&(diffRes=momentsDifference(local__createLocal(duration.from),local__createLocal(duration.to)),duration={},duration.ms=diffRes.milliseconds,duration.M=diffRes.months),ret=new Duration(duration),isDuration(input)&&hasOwnProp(input,"_locale")&&(ret._locale=input._locale),ret;
}



function parseIso(inp,sign){



var res=inp&&parseFloat(inp.replace(",","."));

return(isNaN(res)?0:res)*sign;
}

function positiveMomentsDifference(base,other){
var res={milliseconds:0,months:0};









return res.months=other.month()-base.month()+12*(other.year()-base.year()),base.clone().add(res.months,"M").isAfter(other)&&--res.months,res.milliseconds=+other-+base.clone().add(res.months,"M"),res;
}

function momentsDifference(base,other){
var res;return(
base.isValid()&&other.isValid()?(



other=cloneWithOffset(other,base),
base.isBefore(other)?
res=positiveMomentsDifference(base,other):(

res=positiveMomentsDifference(other,base),
res.milliseconds=-res.milliseconds,
res.months=-res.months),


res):{milliseconds:0,months:0});
}


function createAdder(direction,name){
return function(val,period){
var dur,tmp;









return null===period||isNaN(+period)||(deprecateSimple(name,"moment()."+name+"(period, number) is deprecated. Please use moment()."+name+"(number, period)."),tmp=val,val=period,period=tmp),val="string"==typeof val?+val:val,dur=create__createDuration(val,period),add_subtract__addSubtract(this,dur,direction),this;
};
}

function add_subtract__addSubtract(mom,duration,isAdding,updateOffset){
var milliseconds=duration._milliseconds,
days=duration._days,
months=duration._months;

mom.isValid()&&(




updateOffset=null==updateOffset||updateOffset,

milliseconds&&
mom._d.setTime(+mom._d+milliseconds*isAdding),

days&&
get_set__set(mom,"Date",get_set__get(mom,"Date")+days*isAdding),

months&&
setMonth(mom,get_set__get(mom,"Month")+months*isAdding),

updateOffset&&
utils_hooks__hooks.updateOffset(mom,days||months));

}




function moment_calendar__calendar(time,formats){var


now=time||local__createLocal(),
sod=cloneWithOffset(now,this).startOf("day"),
diff=this.diff(sod,"days",!0),
format=-6>diff?"sameElse":
-1>diff?"lastWeek":
0>diff?"lastDay":
1>diff?"sameDay":
2>diff?"nextDay":
7>diff?"nextWeek":"sameElse",

output=formats&&(isFunction(formats[format])?formats[format]():formats[format]);

return this.format(output||this.localeData().calendar(format,this,local__createLocal(now)));
}

function clone(){
return new Moment(this);
}

function isAfter(input,units){
var localInput=isMoment(input)?input:local__createLocal(input);return!!(
this.isValid()&&localInput.isValid())&&(


units=normalizeUnits(isUndefined(units)?"millisecond":units),
"millisecond"===units?
+this>+localInput:

+localInput<+this.clone().startOf(units));

}

function isBefore(input,units){
var localInput=isMoment(input)?input:local__createLocal(input);return!!(
this.isValid()&&localInput.isValid())&&(


units=normalizeUnits(isUndefined(units)?"millisecond":units),
"millisecond"===units?
+this<+localInput:

+this.clone().endOf(units)<+localInput);

}

function isBetween(from,to,units){
return this.isAfter(from,units)&&this.isBefore(to,units);
}

function isSame(input,units){
var localInput=isMoment(input)?input:local__createLocal(input),
inputMs;return!!(
this.isValid()&&localInput.isValid())&&(


units=normalizeUnits(units||"millisecond"),
"millisecond"===units?
+this==+localInput:(

inputMs=+localInput,
+this.clone().startOf(units)<=inputMs&&inputMs<=+this.clone().endOf(units)));

}

function isSameOrAfter(input,units){
return this.isSame(input,units)||this.isAfter(input,units);
}

function isSameOrBefore(input,units){
return this.isSame(input,units)||this.isBefore(input,units);
}

function diff(input,units,asFloat){
var that,
zoneDelta,
delta,output;return(

this.isValid()?(



that=cloneWithOffset(input,this),

!that.isValid())?
NaN:(


zoneDelta=6e4*(that.utcOffset()-this.utcOffset()),

units=normalizeUnits(units),

"year"===units||"month"===units||"quarter"===units?(
output=monthDiff(this,that),
"quarter"===units?
output/=3:
"year"===units&&(
output/=12)):(


delta=this-that,
output="second"===units?delta/1e3:
"minute"===units?delta/6e4:
"hour"===units?delta/36e5:
"day"===units?(delta-zoneDelta)/864e5:
"week"===units?(delta-zoneDelta)/6048e5:
delta),

asFloat?output:absFloor(output)):NaN);
}

function monthDiff(a,b){

var wholeMonthDiff=12*(b.year()-a.year())+(b.month()-a.month()),

anchor=a.clone().add(wholeMonthDiff,"months"),
anchor2,adjust;











return 0>b-anchor?(anchor2=a.clone().add(wholeMonthDiff-1,"months"),adjust=(b-anchor)/(anchor-anchor2)):(anchor2=a.clone().add(wholeMonthDiff+1,"months"),adjust=(b-anchor)/(anchor2-anchor)),-(wholeMonthDiff+adjust);
}



function toString(){
return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}

function moment_format__toISOString(){
var m=this.clone().utc();return(
0<m.year()&&9999>=m.year()?
isFunction(Date.prototype.toISOString)?

this.toDate().toISOString():

formatMoment(m,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):


formatMoment(m,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]"));

}

function moment_format__format(inputString){
var output=formatMoment(this,inputString||utils_hooks__hooks.defaultFormat);
return this.localeData().postformat(output);
}

function from(time,withoutSuffix){return(
this.isValid()&&(
isMoment(time)&&time.isValid()||
local__createLocal(time).isValid())?
create__createDuration({to:this,from:time}).locale(this.locale()).humanize(!withoutSuffix):

this.localeData().invalidDate());

}

function fromNow(withoutSuffix){
return this.from(local__createLocal(),withoutSuffix);
}

function to(time,withoutSuffix){return(
this.isValid()&&(
isMoment(time)&&time.isValid()||
local__createLocal(time).isValid())?
create__createDuration({from:this,to:time}).locale(this.locale()).humanize(!withoutSuffix):

this.localeData().invalidDate());

}

function toNow(withoutSuffix){
return this.to(local__createLocal(),withoutSuffix);
}




function locale(key){
var newLocaleData;return(

void 0===key?
this._locale._abbr:(

newLocaleData=locale_locales__getLocale(key),
null!=newLocaleData&&(
this._locale=newLocaleData),

this));

}












function localeData(){
return this._locale;
}

function startOf(units){



switch(units=normalizeUnits(units),units){
case"year":
this.month(0);

case"quarter":
case"month":
this.date(1);

case"week":
case"isoWeek":
case"day":
this.hours(0);

case"hour":
this.minutes(0);

case"minute":
this.seconds(0);

case"second":
this.milliseconds(0);}















return"week"===units&&this.weekday(0),"isoWeek"===units&&this.isoWeekday(1),"quarter"===units&&this.month(3*_Mathfloor(this.month()/3)),this;
}

function endOf(units){return(
units=normalizeUnits(units),
void 0===units||"millisecond"===units?
this:

this.startOf(units).add(1,"isoWeek"===units?"week":units).subtract(1,"ms"));
}

function to_type__valueOf(){
return+this._d-6e4*(this._offset||0);
}

function unix(){
return _Mathfloor(+this/1e3);
}

function toDate(){
return this._offset?new Date(+this):this._d;
}

function toArray(){
var m=this;
return[m.year(),m.month(),m.date(),m.hour(),m.minute(),m.second(),m.millisecond()];
}

function toObject(){
var m=this;
return{
years:m.year(),
months:m.month(),
date:m.date(),
hours:m.hours(),
minutes:m.minutes(),
seconds:m.seconds(),
milliseconds:m.milliseconds()};

}

function toJSON(){

return this.isValid()?this.toISOString():"null";
}

function moment_valid__isValid(){
return valid__isValid(this);
}

function parsingFlags(){
return extend({},getParsingFlags(this));
}

function invalidAt(){
return getParsingFlags(this).overflow;
}

function creationData(){
return{
input:this._i,
format:this._f,
locale:this._locale,
isUTC:this._isUTC,
strict:this._strict};

}











function addWeekYearFormatToken(token,getter){
addFormatToken(0,[token,token.length],0,getter);
}
































function getSetWeekYear(input){
return getSetWeekYearHelper.call(this,
input,
this.week(),
this.weekday(),
this.localeData()._week.dow,
this.localeData()._week.doy);
}

function getSetISOWeekYear(input){
return getSetWeekYearHelper.call(this,
input,this.isoWeek(),this.isoWeekday(),1,4);
}

function getISOWeeksInYear(){
return weeksInYear(this.year(),1,4);
}

function getWeeksInYear(){
var weekInfo=this.localeData()._week;
return weeksInYear(this.year(),weekInfo.dow,weekInfo.doy);
}

function getSetWeekYearHelper(input,week,weekday,dow,doy){
var weeksTarget;return(
null==input?
weekOfYear(this,dow,doy).year:(

weeksTarget=weeksInYear(input,dow,doy),
week>weeksTarget&&(
week=weeksTarget),

setWeekAll.call(this,input,week,weekday,dow,doy)));

}

function setWeekAll(weekYear,week,weekday,dow,doy){
var dayOfYearData=dayOfYearFromWeeks(weekYear,week,weekday,dow,doy),
date=createUTCDate(dayOfYearData.year,0,dayOfYearData.dayOfYear);





return this.year(date.getUTCFullYear()),this.month(date.getUTCMonth()),this.date(date.getUTCDate()),this;
}


















function getSetQuarter(input){
return null==input?_Mathceil((this.month()+1)/3):this.month(3*(input-1)+this.month()%3);
}


























function localeWeek(mom){
return weekOfYear(mom,this._week.dow,this._week.doy).week;
}






function localeFirstDayOfWeek(){
return this._week.dow;
}

function localeFirstDayOfYear(){
return this._week.doy;
}



function getSetWeek(input){
var week=this.localeData().week(this);
return null==input?week:this.add(7*(input-week),"d");
}

function getSetISOWeek(input){
var week=weekOfYear(this,1,4).week;
return null==input?week:this.add(7*(input-week),"d");
}












































































function parseWeekday(input,locale){return(
"string"==typeof input?



isNaN(input)?(



input=locale.weekdaysParse(input),
"number"==typeof input?
input:


null):parseInt(input,10):input);
}




function localeWeekdays(m,format){
return isArray(this._weekdays)?this._weekdays[m.day()]:
this._weekdays[this._weekdays.isFormat.test(format)?"format":"standalone"][m.day()];
}


function localeWeekdaysShort(m){
return this._weekdaysShort[m.day()];
}


function localeWeekdaysMin(m){
return this._weekdaysMin[m.day()];
}

function localeWeekdaysParse(weekdayName,format,strict){
var i,mom,regex;








for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),i=0;7>i;i++){













if(mom=local__createLocal([2e3,1]).day(i),strict&&!this._fullWeekdaysParse[i]&&(this._fullWeekdaysParse[i]=new RegExp("^"+this.weekdays(mom,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[i]=new RegExp("^"+this.weekdaysShort(mom,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[i]=new RegExp("^"+this.weekdaysMin(mom,"").replace(".",".?")+"$","i")),this._weekdaysParse[i]||(regex="^"+this.weekdays(mom,"")+"|^"+this.weekdaysShort(mom,"")+"|^"+this.weekdaysMin(mom,""),this._weekdaysParse[i]=new RegExp(regex.replace(".",""),"i")),strict&&"dddd"===format&&this._fullWeekdaysParse[i].test(weekdayName))
return i;
if(strict&&"ddd"===format&&this._shortWeekdaysParse[i].test(weekdayName))
return i;
if(strict&&"dd"===format&&this._minWeekdaysParse[i].test(weekdayName))
return i;
if(!strict&&this._weekdaysParse[i].test(weekdayName))
return i;

}
}



function getSetDayOfWeek(input){
if(!this.isValid())
return null==input?NaN:this;

var day=this._isUTC?this._d.getUTCDay():this._d.getDay();return(
null==input?



day:(input=parseWeekday(input,this.localeData()),this.add(input-day,"d")));

}

function getSetLocaleDayOfWeek(input){
if(!this.isValid())
return null==input?NaN:this;

var weekday=(this.day()+7-this.localeData()._week.dow)%7;
return null==input?weekday:this.add(input-weekday,"d");
}

function getSetISODayOfWeek(input){return(
this.isValid()?





null==input?this.day()||7:this.day(this.day()%7?input:input-7):null==input?NaN:this);
}





















function getSetDayOfYear(input){
var dayOfYear=_Mathround((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;
return null==input?dayOfYear:this.add(input-dayOfYear,"d");
}



function hFormat(){
return this.hours()%12||12;
}






















function meridiem(token,lowercase){
addFormatToken(token,0,0,function(){
return this.localeData().meridiem(this.hours(),this.minutes(),lowercase);
});
}










function matchMeridiem(isStrict,locale){
return locale._meridiemParse;
}



















































function localeIsPM(input){


return"p"===(input+"").toLowerCase().charAt(0);
}


function localeMeridiem(hours,minutes,isLower){return(
11<hours?
isLower?"pm":"PM":

isLower?"am":"AM");

}




























































































function parseMs(input,array){
array[6]=toInt(1e3*("0."+input));
}















function getZoneAbbr(){
return this._isUTC?"UTC":"";
}

function getZoneName(){
return this._isUTC?"Coordinated Universal Time":"";
}










































































































function moment_moment__createUnix(input){
return local__createLocal(1e3*input);
}

function moment_moment__createInZone(){
return local__createLocal.apply(null,arguments).parseZone();
}










function locale_calendar__calendar(key,mom,now){
var output=this._calendar[key];
return isFunction(output)?output.call(mom,now):output;
}










function longDateFormat(key){
var format=this._longDateFormat[key],
formatUpper=this._longDateFormat[key.toUpperCase()];return(

format||!formatUpper?
format:(


this._longDateFormat[key]=formatUpper.replace(/MMMM|MM|DD|dddd/g,function(val){
return val.slice(1);
}),

this._longDateFormat[key]));
}



function invalidDate(){
return this._invalidDate;
}




function ordinal(number){
return this._ordinal.replace("%d",number);
}

function preParsePostFormat(string){
return string;
}

















function relative__relativeTime(number,withoutSuffix,string,isFuture){
var output=this._relativeTime[string];
return isFunction(output)?
output(number,withoutSuffix,string,isFuture):
output.replace(/%d/i,number);
}

function pastFuture(diff,output){
var format=this._relativeTime[0<diff?"future":"past"];
return isFunction(format)?format(output):format.replace(/%s/i,output);
}

function locale_set__set(config){
var prop,i;
for(i in config)
prop=config[i],
isFunction(prop)?
this[i]=prop:

this["_"+i]=prop;




this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source);
}


















































function lists__get(format,index,field,setter){var
locale=locale_locales__getLocale(),
utc=create_utc__createUTC().set(setter,index);
return locale[field](utc,format);
}

function list(format,index,field,count,setter){







if("number"==typeof format&&(index=format,format=void 0),format=format||"",null!=index)
return lists__get(format,index,field,setter);var



out=[],i;
for(i=0;i<count;i++)
out[i]=lists__get(format,i,field,setter);

return out;
}

function lists__listMonths(format,index){
return list(format,index,"months",12,"month");
}

function lists__listMonthsShort(format,index){
return list(format,index,"monthsShort",12,"month");
}

function lists__listWeekdays(format,index){
return list(format,index,"weekdays",7,"day");
}

function lists__listWeekdaysShort(format,index){
return list(format,index,"weekdaysShort",7,"day");
}

function lists__listWeekdaysMin(format,index){
return list(format,index,"weekdaysMin",7,"day");
}



















function duration_abs__abs(){
var data=this._data;












return this._milliseconds=mathAbs(this._milliseconds),this._days=mathAbs(this._days),this._months=mathAbs(this._months),data.milliseconds=mathAbs(data.milliseconds),data.seconds=mathAbs(data.seconds),data.minutes=mathAbs(data.minutes),data.hours=mathAbs(data.hours),data.months=mathAbs(data.months),data.years=mathAbs(data.years),this;
}

function duration_add_subtract__addSubtract(duration,input,value,direction){
var other=create__createDuration(input,value);





return duration._milliseconds+=direction*other._milliseconds,duration._days+=direction*other._days,duration._months+=direction*other._months,duration._bubble();
}


function duration_add_subtract__add(input,value){
return duration_add_subtract__addSubtract(this,input,value,1);
}


function duration_add_subtract__subtract(input,value){
return duration_add_subtract__addSubtract(this,input,value,-1);
}

function absCeil(number){return(
0>number?
_Mathfloor(number):

_Mathceil(number));

}

function bubble(){var
milliseconds=this._milliseconds,
days=this._days,
months=this._months,
data=this._data,
seconds,minutes,hours,years,monthsFromDays;






































return 0<=milliseconds&&0<=days&&0<=months||0>=milliseconds&&0>=days&&0>=months||(milliseconds+=864e5*absCeil(monthsToDays(months)+days),days=0,months=0),data.milliseconds=milliseconds%1e3,seconds=absFloor(milliseconds/1e3),data.seconds=seconds%60,minutes=absFloor(seconds/60),data.minutes=minutes%60,hours=absFloor(minutes/60),data.hours=hours%24,days+=absFloor(hours/24),monthsFromDays=absFloor(daysToMonths(days)),months+=monthsFromDays,days-=absCeil(monthsToDays(monthsFromDays)),years=absFloor(months/12),months%=12,data.days=days,data.months=months,data.years=years,this;
}

function daysToMonths(days){


return 4800*days/146097;
}

function monthsToDays(months){

return 146097*months/4800;
}

function as(units){var


milliseconds=this._milliseconds,days,months;



if(units=normalizeUnits(units),"month"===units||"year"===units)


return days=this._days+milliseconds/864e5,months=this._months+daysToMonths(days),"month"===units?months:months/12;



switch(days=this._days+_Mathround(monthsToDays(this._months)),units){
case"week":return days/7+milliseconds/6048e5;
case"day":return days+milliseconds/864e5;
case"hour":return 24*days+milliseconds/36e5;
case"minute":return 1440*days+milliseconds/6e4;
case"second":return 86400*days+milliseconds/1e3;

case"millisecond":return _Mathfloor(864e5*days)+milliseconds;
default:throw new Error("Unknown unit "+units);}


}


function duration_as__valueOf(){
return(
this._milliseconds+
864e5*this._days+
2592e6*(this._months%12)+
31536e6*toInt(this._months/12));

}

function makeAs(alias){
return function(){
return this.as(alias);
};
}










function duration_get__get(units){

return units=normalizeUnits(units),this[units+"s"]();
}

function makeGetter(name){
return function(){
return this._data[name];
};
}









function weeks(){
return absFloor(this.days()/7);
}











function substituteTimeAgo(string,number,withoutSuffix,isFuture,locale){
return locale.relativeTime(number||1,!!withoutSuffix,string,isFuture);
}

function duration_humanize__relativeTime(posNegDuration,withoutSuffix,locale){var
duration=create__createDuration(posNegDuration).abs(),
seconds=round(duration.as("s")),
minutes=round(duration.as("m")),
hours=round(duration.as("h")),
days=round(duration.as("d")),
months=round(duration.as("M")),
years=round(duration.as("y")),

a=seconds<thresholds.s&&["s",seconds]||
1>=minutes&&["m"]||
minutes<thresholds.m&&["mm",minutes]||
1>=hours&&["h"]||
hours<thresholds.h&&["hh",hours]||
1>=days&&["d"]||
days<thresholds.d&&["dd",days]||
1>=months&&["M"]||
months<thresholds.M&&["MM",months]||
1>=years&&["y"]||["yy",years];




return a[2]=withoutSuffix,a[3]=0<+posNegDuration,a[4]=locale,substituteTimeAgo.apply(null,a);
}


function duration_humanize__getSetRelativeTimeThreshold(threshold,limit){return(
void 0!==thresholds[threshold]&&(


void 0===limit?
thresholds[threshold]:(

thresholds[threshold]=limit,!0)));

}

function humanize(withSuffix){var
locale=this.localeData(),
output=duration_humanize__relativeTime(this,!withSuffix,locale);





return withSuffix&&(output=locale.pastFuture(+this,output)),locale.postformat(output);
}



function iso_string__toISOString(){var







seconds=iso_string__abs(this._milliseconds)/1e3,
days=iso_string__abs(this._days),
months=iso_string__abs(this._months),
minutes,hours,years;


minutes=absFloor(seconds/60),
hours=absFloor(minutes/60),
seconds%=60,
minutes%=60,


years=absFloor(months/12),
months%=12;var



Y=years,
M=months,
D=days,
h=hours,
m=minutes,
s=seconds,
total=this.asSeconds();return(

total?





(0>total?"-":"")+
"P"+(
Y?Y+"Y":"")+(
M?M+"M":"")+(
D?D+"D":"")+(
h||m||s?"T":"")+(
h?h+"H":"")+(
m?m+"M":"")+(
s?s+"S":""):"P0D");
}























































































































































































































































































































































































































































































































































































function be__plural(word,num){
var forms=word.split("_");
return 1==num%10&&11!=num%100?forms[0]:2<=num%10&&4>=num%10&&(10>num%100||20<=num%100)?forms[1]:forms[2];
}
function be__relativeTimeWithPlural(number,withoutSuffix,key){
var format={
mm:withoutSuffix?"\u0445\u0432\u0456\u043B\u0456\u043D\u0430_\u0445\u0432\u0456\u043B\u0456\u043D\u044B_\u0445\u0432\u0456\u043B\u0456\u043D":"\u0445\u0432\u0456\u043B\u0456\u043D\u0443_\u0445\u0432\u0456\u043B\u0456\u043D\u044B_\u0445\u0432\u0456\u043B\u0456\u043D",
hh:withoutSuffix?"\u0433\u0430\u0434\u0437\u0456\u043D\u0430_\u0433\u0430\u0434\u0437\u0456\u043D\u044B_\u0433\u0430\u0434\u0437\u0456\u043D":"\u0433\u0430\u0434\u0437\u0456\u043D\u0443_\u0433\u0430\u0434\u0437\u0456\u043D\u044B_\u0433\u0430\u0434\u0437\u0456\u043D",
dd:"\u0434\u0437\u0435\u043D\u044C_\u0434\u043D\u0456_\u0434\u0437\u0451\u043D",
MM:"\u043C\u0435\u0441\u044F\u0446_\u043C\u0435\u0441\u044F\u0446\u044B_\u043C\u0435\u0441\u044F\u0446\u0430\u045E",
yy:"\u0433\u043E\u0434_\u0433\u0430\u0434\u044B_\u0433\u0430\u0434\u043E\u045E"};return(

"m"===key?
withoutSuffix?"\u0445\u0432\u0456\u043B\u0456\u043D\u0430":"\u0445\u0432\u0456\u043B\u0456\u043D\u0443":

"h"===key?
withoutSuffix?"\u0433\u0430\u0434\u0437\u0456\u043D\u0430":"\u0433\u0430\u0434\u0437\u0456\u043D\u0443":


number+" "+be__plural(format[key],+number));

}



























































































































































































































































































































































































function relativeTimeWithMutation(number,withoutSuffix,key){
var format={
mm:"munutenn",
MM:"miz",
dd:"devezh"};

return number+" "+mutation(format[key],number);
}
function specialMutationForYears(number){
switch(lastNumber(number)){
case 1:
case 3:
case 4:
case 5:
case 9:
return number+" bloaz";
default:
return number+" vloaz";}

}
function lastNumber(number){return(
9<number?
lastNumber(number%10):

number);
}
function mutation(text,number){return(
2===number?
softMutation(text):

text);
}
function softMutation(text){
var mutationTable={
m:"v",
b:"v",
d:"z"};return(

void 0===mutationTable[text.charAt(0)]?
text:

mutationTable[text.charAt(0)]+text.substring(1));
}






















































function bs__translate(number,withoutSuffix,key){
var result=number+" ";return(

"m"===key?
withoutSuffix?"jedna minuta":"jedne minute":
"mm"===key?(

result+=1===number?"minuta":
2===number||3===number||4===number?
"minute":

"minuta",

result):
"h"===key?
withoutSuffix?"jedan sat":"jednog sata":
"hh"===key?(

result+=1===number?"sat":
2===number||3===number||4===number?
"sata":

"sati",

result):
"dd"===key?(

result+=1===number?"dan":

"dana",

result):
"MM"===key?(

result+=1===number?"mjesec":
2===number||3===number||4===number?
"mjeseca":

"mjeseci",

result):
"yy"===key?(

result+=1===number?"godina":
2===number||3===number||4===number?
"godine":

"godina",

result):void 0);

}



















































































































































function cs__plural(n){
return 1<n&&5>n&&1!=~~(n/10);
}
function cs__translate(number,withoutSuffix,key,isFuture){
var result=number+" ";
switch(key){
case"s":
return withoutSuffix||isFuture?"p\xE1r sekund":"p\xE1r sekundami";
case"m":
return withoutSuffix?"minuta":isFuture?"minutu":"minutou";
case"mm":return(
withoutSuffix||isFuture?
result+(cs__plural(number)?"minuty":"minut"):

result+"minutami");

break;
case"h":
return withoutSuffix?"hodina":isFuture?"hodinu":"hodinou";
case"hh":return(
withoutSuffix||isFuture?
result+(cs__plural(number)?"hodiny":"hodin"):

result+"hodinami");

break;
case"d":
return withoutSuffix||isFuture?"den":"dnem";
case"dd":return(
withoutSuffix||isFuture?
result+(cs__plural(number)?"dny":"dn\xED"):

result+"dny");

break;
case"M":
return withoutSuffix||isFuture?"m\u011Bs\xEDc":"m\u011Bs\xEDcem";
case"MM":return(
withoutSuffix||isFuture?
result+(cs__plural(number)?"m\u011Bs\xEDce":"m\u011Bs\xEDc\u016F"):

result+"m\u011Bs\xEDci");

break;
case"y":
return withoutSuffix||isFuture?"rok":"rokem";
case"yy":return(
withoutSuffix||isFuture?
result+(cs__plural(number)?"roky":"let"):

result+"lety");}



}



















































































































































































































































































function de_at__processRelativeTime(number,withoutSuffix,key,isFuture){
var format={
m:["eine Minute","einer Minute"],
h:["eine Stunde","einer Stunde"],
d:["ein Tag","einem Tag"],
dd:[number+" Tage",number+" Tagen"],
M:["ein Monat","einem Monat"],
MM:[number+" Monate",number+" Monaten"],
y:["ein Jahr","einem Jahr"],
yy:[number+" Jahre",number+" Jahren"]};

return withoutSuffix?format[key][0]:format[key][1];
}




















































function de__processRelativeTime(number,withoutSuffix,key,isFuture){
var format={
m:["eine Minute","einer Minute"],
h:["eine Stunde","einer Stunde"],
d:["ein Tag","einem Tag"],
dd:[number+" Tage",number+" Tagen"],
M:["ein Monat","einem Monat"],
MM:[number+" Monate",number+" Monaten"],
y:["ein Jahr","einem Jahr"],
yy:[number+" Jahre",number+" Jahren"]};

return withoutSuffix?format[key][0]:format[key][1];
}


















































































































































































































































































































































































































































































































































































































































function et__processRelativeTime(number,withoutSuffix,key,isFuture){
var format={
s:["m\xF5ne sekundi","m\xF5ni sekund","paar sekundit"],
m:["\xFChe minuti","\xFCks minut"],
mm:[number+" minuti",number+" minutit"],
h:["\xFChe tunni","tund aega","\xFCks tund"],
hh:[number+" tunni",number+" tundi"],
d:["\xFChe p\xE4eva","\xFCks p\xE4ev"],
M:["kuu aja","kuu aega","\xFCks kuu"],
MM:[number+" kuu",number+" kuud"],
y:["\xFChe aasta","aasta","\xFCks aasta"],
yy:[number+" aasta",number+" aastat"]};return(

withoutSuffix?
format[key][2]?format[key][2]:format[key][1]:

isFuture?format[key][0]:format[key][1]);
}










































































































































































































function fi__translate(number,withoutSuffix,key,isFuture){
var result="";
switch(key){
case"s":
return isFuture?"muutaman sekunnin":"muutama sekunti";
case"m":
return isFuture?"minuutin":"minuutti";
case"mm":
result=isFuture?"minuutin":"minuuttia";
break;
case"h":
return isFuture?"tunnin":"tunti";
case"hh":
result=isFuture?"tunnin":"tuntia";
break;
case"d":
return isFuture?"p\xE4iv\xE4n":"p\xE4iv\xE4";
case"dd":
result=isFuture?"p\xE4iv\xE4n":"p\xE4iv\xE4\xE4";
break;
case"M":
return isFuture?"kuukauden":"kuukausi";
case"MM":
result=isFuture?"kuukauden":"kuukautta";
break;
case"y":
return isFuture?"vuoden":"vuosi";
case"yy":
result=isFuture?"vuoden":"vuotta";}



return result=verbalNumber(number,isFuture)+" "+result,result;
}
function verbalNumber(number,isFuture){
return 10>number?isFuture?numbersFuture[number]:numbersPast[number]:number;
}
















































































































































































































































































































































































































































































































































































































































function hr__translate(number,withoutSuffix,key){
var result=number+" ";return(

"m"===key?
withoutSuffix?"jedna minuta":"jedne minute":
"mm"===key?(

result+=1===number?"minuta":
2===number||3===number||4===number?
"minute":

"minuta",

result):
"h"===key?
withoutSuffix?"jedan sat":"jednog sata":
"hh"===key?(

result+=1===number?"sat":
2===number||3===number||4===number?
"sata":

"sati",

result):
"dd"===key?(

result+=1===number?"dan":

"dana",

result):
"MM"===key?(

result+=1===number?"mjesec":
2===number||3===number||4===number?
"mjeseca":

"mjeseci",

result):
"yy"===key?(

result+=1===number?"godina":
2===number||3===number||4===number?
"godine":

"godina",

result):void 0);

}

















































































function hu__translate(number,withoutSuffix,key,isFuture){
var num=number,
suffix;return(

"s"===key?
isFuture||withoutSuffix?"n\xE9h\xE1ny m\xE1sodperc":"n\xE9h\xE1ny m\xE1sodperce":
"m"===key?
"egy"+(isFuture||withoutSuffix?" perc":" perce"):
"mm"===key?
num+(isFuture||withoutSuffix?" perc":" perce"):
"h"===key?
"egy"+(isFuture||withoutSuffix?" \xF3ra":" \xF3r\xE1ja"):
"hh"===key?
num+(isFuture||withoutSuffix?" \xF3ra":" \xF3r\xE1ja"):
"d"===key?
"egy"+(isFuture||withoutSuffix?" nap":" napja"):
"dd"===key?
num+(isFuture||withoutSuffix?" nap":" napja"):
"M"===key?
"egy"+(isFuture||withoutSuffix?" h\xF3nap":" h\xF3napja"):
"MM"===key?
num+(isFuture||withoutSuffix?" h\xF3nap":" h\xF3napja"):
"y"===key?
"egy"+(isFuture||withoutSuffix?" \xE9v":" \xE9ve"):
"yy"===key?
num+(isFuture||withoutSuffix?" \xE9v":" \xE9ve"):

"");
}
function week(isFuture){
return(isFuture?"":"[m\xFAlt] ")+"["+weekEndings[this.day()]+"] LT[-kor]";
}





























































































































































































































function is__plural(n){return!(
11!=n%100)||

1!=n%10;



}
function is__translate(number,withoutSuffix,key,isFuture){
var result=number+" ";return(

"s"===key?
withoutSuffix||isFuture?"nokkrar sek\xFAndur":"nokkrum sek\xFAndum":
"m"===key?
withoutSuffix?"m\xEDn\xFAta":"m\xEDn\xFAtu":
"mm"===key?
is__plural(number)?
result+(withoutSuffix||isFuture?"m\xEDn\xFAtur":"m\xEDn\xFAtum"):
withoutSuffix?
result+"m\xEDn\xFAta":

result+"m\xEDn\xFAtu":
"hh"===key?
is__plural(number)?
result+(withoutSuffix||isFuture?"klukkustundir":"klukkustundum"):

result+"klukkustund":
"d"===key?
withoutSuffix?
"dagur":

isFuture?"dag":"degi":
"dd"===key?
is__plural(number)?
withoutSuffix?
result+"dagar":

result+(isFuture?"daga":"d\xF6gum"):
withoutSuffix?
result+"dagur":

result+(isFuture?"dag":"degi"):
"M"===key?
withoutSuffix?
"m\xE1nu\xF0ur":

isFuture?"m\xE1nu\xF0":"m\xE1nu\xF0i":
"MM"===key?
is__plural(number)?
withoutSuffix?
result+"m\xE1nu\xF0ir":

result+(isFuture?"m\xE1nu\xF0i":"m\xE1nu\xF0um"):
withoutSuffix?
result+"m\xE1nu\xF0ur":

result+(isFuture?"m\xE1nu\xF0":"m\xE1nu\xF0i"):
"y"===key?
withoutSuffix||isFuture?"\xE1r":"\xE1ri":
"yy"===key?
is__plural(number)?
result+(withoutSuffix||isFuture?"\xE1r":"\xE1rum"):

result+(withoutSuffix||isFuture?"\xE1r":"\xE1ri"):void 0);

}













































































































































































































































































































































































































































































































function lb__processRelativeTime(number,withoutSuffix,key,isFuture){
var format={
m:["eng Minutt","enger Minutt"],
h:["eng Stonn","enger Stonn"],
d:["een Dag","engem Dag"],
M:["ee Mount","engem Mount"],
y:["ee Joer","engem Joer"]};

return withoutSuffix?format[key][0]:format[key][1];
}
function processFutureTime(string){
var number=string.substr(0,string.indexOf(" "));return(
eifelerRegelAppliesToNumber(number)?
"a "+string:

"an "+string);
}
function processPastTime(string){
var number=string.substr(0,string.indexOf(" "));return(
eifelerRegelAppliesToNumber(number)?
"viru "+string:

"virun "+string);
}







function eifelerRegelAppliesToNumber(number){

if(number=parseInt(number,10),isNaN(number))
return!1;

if(0>number)

return!0;
if(10>number)return!!(

4<=number&&7>=number);



if(100>number){

var lastDigit=number%10,firstDigit=number/10;return(
0==lastDigit?
eifelerRegelAppliesToNumber(firstDigit):

eifelerRegelAppliesToNumber(lastDigit));
}if(1e4>number){for(;

10<=number;)
number/=10;

return eifelerRegelAppliesToNumber(number);
}


return number/=1e3,eifelerRegelAppliesToNumber(number);

}

































































































































function translateSeconds(number,withoutSuffix,key,isFuture){return(
withoutSuffix?
"kelios sekund\u0117s":

isFuture?"keli\u0173 sekund\u017Ei\u0173":"kelias sekundes");

}
function translateSingular(number,withoutSuffix,key,isFuture){
return withoutSuffix?forms(key)[0]:isFuture?forms(key)[1]:forms(key)[2];
}
function special(number){
return 0==number%10||10<number&&20>number;
}
function forms(key){
return lt__units[key].split("_");
}
function lt__translate(number,withoutSuffix,key,isFuture){
var result=number+" ";return(
1===number?
result+translateSingular(number,withoutSuffix,key[0],isFuture):
withoutSuffix?
result+(special(number)?forms(key)[1]:forms(key)[0]):

isFuture?
result+forms(key)[1]:

result+(special(number)?forms(key)[1]:forms(key)[2]));


}














































































function lv__format(forms,number,withoutSuffix){return(
withoutSuffix?

1==number%10&&11!==number?forms[2]:forms[3]:



1==number%10&&11!==number?forms[0]:forms[1]);

}
function lv__relativeTimeWithPlural(number,withoutSuffix,key){
return number+" "+lv__format(lv__units[key],number,withoutSuffix);
}
function relativeTimeWithSingular(number,withoutSuffix,key){
return lv__format(lv__units[key],number,withoutSuffix);
}
function relativeSeconds(number,withoutSuffix){
return withoutSuffix?"da\u017Eas sekundes":"da\u017E\u0101m sekund\u0113m";
}

























































































































































































































































































































function relativeTimeMr(number,withoutSuffix,string,isFuture)
{
var output="";






























return withoutSuffix?"s"===string?output="\u0915\u093E\u0939\u0940 \u0938\u0947\u0915\u0902\u0926":"m"===string?output="\u090F\u0915 \u092E\u093F\u0928\u093F\u091F":"mm"===string?output="%d \u092E\u093F\u0928\u093F\u091F\u0947":"h"===string?output="\u090F\u0915 \u0924\u093E\u0938":"hh"===string?output="%d \u0924\u093E\u0938":"d"===string?output="\u090F\u0915 \u0926\u093F\u0935\u0938":"dd"===string?output="%d \u0926\u093F\u0935\u0938":"M"===string?output="\u090F\u0915 \u092E\u0939\u093F\u0928\u093E":"MM"===string?output="%d \u092E\u0939\u093F\u0928\u0947":"y"===string?output="\u090F\u0915 \u0935\u0930\u094D\u0937":"yy"===string?output="%d \u0935\u0930\u094D\u0937\u0947":void 0:"s"===string?output="\u0915\u093E\u0939\u0940 \u0938\u0947\u0915\u0902\u0926\u093E\u0902":"m"===string?output="\u090F\u0915\u093E \u092E\u093F\u0928\u093F\u091F\u093E":"mm"===string?output="%d \u092E\u093F\u0928\u093F\u091F\u093E\u0902":"h"===string?output="\u090F\u0915\u093E \u0924\u093E\u0938\u093E":"hh"===string?output="%d \u0924\u093E\u0938\u093E\u0902":"d"===string?output="\u090F\u0915\u093E \u0926\u093F\u0935\u0938\u093E":"dd"===string?output="%d \u0926\u093F\u0935\u0938\u093E\u0902":"M"===string?output="\u090F\u0915\u093E \u092E\u0939\u093F\u0928\u094D\u092F\u093E":"MM"===string?output="%d \u092E\u0939\u093F\u0928\u094D\u092F\u093E\u0902":"y"===string?output="\u090F\u0915\u093E \u0935\u0930\u094D\u0937\u093E":"yy"===string?output="%d \u0935\u0930\u094D\u0937\u093E\u0902":void 0,output.replace(/%d/i,number);
}





































































































































































































































































































































































































































































































































































































function pl__plural(n){
return 5>n%10&&1<n%10&&1!=~~(n/10)%10;
}
function pl__translate(number,withoutSuffix,key){
var result=number+" ";return(

"m"===key?
withoutSuffix?"minuta":"minut\u0119":
"mm"===key?
result+(pl__plural(number)?"minuty":"minut"):
"h"===key?
withoutSuffix?"godzina":"godzin\u0119":
"hh"===key?
result+(pl__plural(number)?"godziny":"godzin"):
"MM"===key?
result+(pl__plural(number)?"miesi\u0105ce":"miesi\u0119cy"):
"yy"===key?
result+(pl__plural(number)?"lata":"lat"):void 0);

}















































































































































































function ro__relativeTimeWithPlural(number,withoutSuffix,key){
var format={
mm:"minute",
hh:"ore",
dd:"zile",
MM:"luni",
yy:"ani"},

separator=" ";



return(20<=number%100||100<=number&&0==number%100)&&(separator=" de "),number+separator+format[key];
}

















































function ru__plural(word,num){
var forms=word.split("_");
return 1==num%10&&11!=num%100?forms[0]:2<=num%10&&4>=num%10&&(10>num%100||20<=num%100)?forms[1]:forms[2];
}
function ru__relativeTimeWithPlural(number,withoutSuffix,key){
var format={
mm:withoutSuffix?"\u043C\u0438\u043D\u0443\u0442\u0430_\u043C\u0438\u043D\u0443\u0442\u044B_\u043C\u0438\u043D\u0443\u0442":"\u043C\u0438\u043D\u0443\u0442\u0443_\u043C\u0438\u043D\u0443\u0442\u044B_\u043C\u0438\u043D\u0443\u0442",
hh:"\u0447\u0430\u0441_\u0447\u0430\u0441\u0430_\u0447\u0430\u0441\u043E\u0432",
dd:"\u0434\u0435\u043D\u044C_\u0434\u043D\u044F_\u0434\u043D\u0435\u0439",
MM:"\u043C\u0435\u0441\u044F\u0446_\u043C\u0435\u0441\u044F\u0446\u0430_\u043C\u0435\u0441\u044F\u0446\u0435\u0432",
yy:"\u0433\u043E\u0434_\u0433\u043E\u0434\u0430_\u043B\u0435\u0442"};return(

"m"===key?
withoutSuffix?"\u043C\u0438\u043D\u0443\u0442\u0430":"\u043C\u0438\u043D\u0443\u0442\u0443":


number+" "+ru__plural(format[key],+number));

}



















































































































































































































































function sk__plural(n){
return 1<n&&5>n;
}
function sk__translate(number,withoutSuffix,key,isFuture){
var result=number+" ";
switch(key){
case"s":
return withoutSuffix||isFuture?"p\xE1r sek\xFAnd":"p\xE1r sekundami";
case"m":
return withoutSuffix?"min\xFAta":isFuture?"min\xFAtu":"min\xFAtou";
case"mm":return(
withoutSuffix||isFuture?
result+(sk__plural(number)?"min\xFAty":"min\xFAt"):

result+"min\xFAtami");

break;
case"h":
return withoutSuffix?"hodina":isFuture?"hodinu":"hodinou";
case"hh":return(
withoutSuffix||isFuture?
result+(sk__plural(number)?"hodiny":"hod\xEDn"):

result+"hodinami");

break;
case"d":
return withoutSuffix||isFuture?"de\u0148":"d\u0148om";
case"dd":return(
withoutSuffix||isFuture?
result+(sk__plural(number)?"dni":"dn\xED"):

result+"d\u0148ami");

break;
case"M":
return withoutSuffix||isFuture?"mesiac":"mesiacom";
case"MM":return(
withoutSuffix||isFuture?
result+(sk__plural(number)?"mesiace":"mesiacov"):

result+"mesiacmi");

break;
case"y":
return withoutSuffix||isFuture?"rok":"rokom";
case"yy":return(
withoutSuffix||isFuture?
result+(sk__plural(number)?"roky":"rokov"):

result+"rokmi");}



}

















































































function sl__processRelativeTime(number,withoutSuffix,key,isFuture){
var result=number+" ";return(

"s"===key?
withoutSuffix||isFuture?"nekaj sekund":"nekaj sekundami":
"m"===key?
withoutSuffix?"ena minuta":"eno minuto":
"mm"===key?(

result+=1===number?withoutSuffix?"minuta":"minuto":
2===number?
withoutSuffix||isFuture?"minuti":"minutama":
5>number?
withoutSuffix||isFuture?"minute":"minutami":

withoutSuffix||isFuture?"minut":"minutami",

result):
"h"===key?
withoutSuffix?"ena ura":"eno uro":
"hh"===key?(

result+=1===number?withoutSuffix?"ura":"uro":
2===number?
withoutSuffix||isFuture?"uri":"urama":
5>number?
withoutSuffix||isFuture?"ure":"urami":

withoutSuffix||isFuture?"ur":"urami",

result):
"d"===key?
withoutSuffix||isFuture?"en dan":"enim dnem":
"dd"===key?(

result+=1===number?withoutSuffix||isFuture?"dan":"dnem":
2===number?
withoutSuffix||isFuture?"dni":"dnevoma":

withoutSuffix||isFuture?"dni":"dnevi",

result):
"M"===key?
withoutSuffix||isFuture?"en mesec":"enim mesecem":
"MM"===key?(

result+=1===number?withoutSuffix||isFuture?"mesec":"mesecem":
2===number?
withoutSuffix||isFuture?"meseca":"mesecema":
5>number?
withoutSuffix||isFuture?"mesece":"meseci":

withoutSuffix||isFuture?"mesecev":"meseci",

result):
"y"===key?
withoutSuffix||isFuture?"eno leto":"enim letom":
"yy"===key?(

result+=1===number?withoutSuffix||isFuture?"leto":"letom":
2===number?
withoutSuffix||isFuture?"leti":"letoma":
5>number?
withoutSuffix||isFuture?"leta":"leti":

withoutSuffix||isFuture?"let":"leti",

result):void 0);

}
































































































































































































































































































































































































































































































































































































































































































































































function translateFuture(output){
var time=output;







return time=-1===output.indexOf("jaj")?-1===output.indexOf("jar")?-1===output.indexOf("DIS")?time+" pIq":time.slice(0,-3)+"nem":time.slice(0,-3)+"waQ":time.slice(0,-3)+"leS",time;
}

function translatePast(output){
var time=output;







return time=-1===output.indexOf("jaj")?-1===output.indexOf("jar")?-1===output.indexOf("DIS")?time+" ret":time.slice(0,-3)+"ben":time.slice(0,-3)+"wen":time.slice(0,-3)+"Hu\u2019",time;
}

function tlh__translate(number,withoutSuffix,string,isFuture){
var numberNoun=numberAsNoun(number);return(

"mm"===string?
numberNoun+" tup":
"hh"===string?
numberNoun+" rep":
"dd"===string?
numberNoun+" jaj":
"MM"===string?
numberNoun+" jar":
"yy"===string?
numberNoun+" DIS":void 0);

}

function numberAsNoun(number){
var hundred=_Mathfloor(number%1e3/100),
ten=_Mathfloor(number%100/10),
one=number%10,
word="";









return 0<hundred&&(word+=numbersNouns[hundred]+"vatlh"),0<ten&&(word+=(""==word?"":" ")+numbersNouns[ten]+"maH"),0<one&&(word+=(""==word?"":" ")+numbersNouns[one]),""==word?"pagh":word;
}
























































































































































































function tzl__processRelativeTime(number,withoutSuffix,key,isFuture){
var format={
s:["viensas secunds","'iensas secunds"],
m:["'n m\xEDut","'iens m\xEDut"],
mm:[number+" m\xEDuts",""+number+" m\xEDuts"],
h:["'n \xFEora","'iensa \xFEora"],
hh:[number+" \xFEoras",""+number+" \xFEoras"],
d:["'n ziua","'iensa ziua"],
dd:[number+" ziuas",""+number+" ziuas"],
M:["'n mes","'iens mes"],
MM:[number+" mesen",""+number+" mesen"],
y:["'n ar","'iens ar"],
yy:[number+" ars",""+number+" ars"]};

return isFuture?format[key][0]:withoutSuffix?format[key][0]:format[key][1];
}




































































































function uk__plural(word,num){
var forms=word.split("_");
return 1==num%10&&11!=num%100?forms[0]:2<=num%10&&4>=num%10&&(10>num%100||20<=num%100)?forms[1]:forms[2];
}
function uk__relativeTimeWithPlural(number,withoutSuffix,key){
var format={
mm:withoutSuffix?"\u0445\u0432\u0438\u043B\u0438\u043D\u0430_\u0445\u0432\u0438\u043B\u0438\u043D\u0438_\u0445\u0432\u0438\u043B\u0438\u043D":"\u0445\u0432\u0438\u043B\u0438\u043D\u0443_\u0445\u0432\u0438\u043B\u0438\u043D\u0438_\u0445\u0432\u0438\u043B\u0438\u043D",
hh:withoutSuffix?"\u0433\u043E\u0434\u0438\u043D\u0430_\u0433\u043E\u0434\u0438\u043D\u0438_\u0433\u043E\u0434\u0438\u043D":"\u0433\u043E\u0434\u0438\u043D\u0443_\u0433\u043E\u0434\u0438\u043D\u0438_\u0433\u043E\u0434\u0438\u043D",
dd:"\u0434\u0435\u043D\u044C_\u0434\u043D\u0456_\u0434\u043D\u0456\u0432",
MM:"\u043C\u0456\u0441\u044F\u0446\u044C_\u043C\u0456\u0441\u044F\u0446\u0456_\u043C\u0456\u0441\u044F\u0446\u0456\u0432",
yy:"\u0440\u0456\u043A_\u0440\u043E\u043A\u0438_\u0440\u043E\u043A\u0456\u0432"};return(

"m"===key?
withoutSuffix?"\u0445\u0432\u0438\u043B\u0438\u043D\u0430":"\u0445\u0432\u0438\u043B\u0438\u043D\u0443":

"h"===key?
withoutSuffix?"\u0433\u043E\u0434\u0438\u043D\u0430":"\u0433\u043E\u0434\u0438\u043D\u0443":


number+" "+uk__plural(format[key],+number));

}
function weekdaysCaseReplace(m,format){
var weekdays={
nominative:["\u043D\u0435\u0434\u0456\u043B\u044F","\u043F\u043E\u043D\u0435\u0434\u0456\u043B\u043E\u043A","\u0432\u0456\u0432\u0442\u043E\u0440\u043E\u043A","\u0441\u0435\u0440\u0435\u0434\u0430","\u0447\u0435\u0442\u0432\u0435\u0440","\u043F\u2019\u044F\u0442\u043D\u0438\u0446\u044F","\u0441\u0443\u0431\u043E\u0442\u0430"],
accusative:["\u043D\u0435\u0434\u0456\u043B\u044E","\u043F\u043E\u043D\u0435\u0434\u0456\u043B\u043E\u043A","\u0432\u0456\u0432\u0442\u043E\u0440\u043E\u043A","\u0441\u0435\u0440\u0435\u0434\u0443","\u0447\u0435\u0442\u0432\u0435\u0440","\u043F\u2019\u044F\u0442\u043D\u0438\u0446\u044E","\u0441\u0443\u0431\u043E\u0442\u0443"],
genitive:["\u043D\u0435\u0434\u0456\u043B\u0456","\u043F\u043E\u043D\u0435\u0434\u0456\u043B\u043A\u0430","\u0432\u0456\u0432\u0442\u043E\u0440\u043A\u0430","\u0441\u0435\u0440\u0435\u0434\u0438","\u0447\u0435\u0442\u0432\u0435\u0440\u0433\u0430","\u043F\u2019\u044F\u0442\u043D\u0438\u0446\u0456","\u0441\u0443\u0431\u043E\u0442\u0438"]},

nounCase=/(\[[ВвУу]\]) ?dddd/.test(format)?
"accusative":
/\[?(?:минулої|наступної)? ?\] ?dddd/.test(format)?
"genitive":
"nominative";
return weekdays[nounCase][m.day()];
}
function processHoursFunction(str){
return function(){
return str+"\u043E"+(11===this.hours()?"\u0431":"")+"] LT";
};
}var momentProperties=utils_hooks__hooks.momentProperties=[],updateInProgress=!1,locales={},aliases={},formattingTokens=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,localFormattingTokens=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,formatFunctions={},formatTokenFunctions={},match1=/\d/,match2=/\d\d/,match3=/\d{3}/,match4=/\d{4}/,match6=/[+-]?\d{6}/,match1to2=/\d\d?/,match3to4=/\d\d\d\d?/,match5to6=/\d\d\d\d\d\d?/,match1to3=/\d{1,3}/,match1to4=/\d{1,4}/,match1to6=/[+-]?\d{1,6}/,matchUnsigned=/\d+/,matchSigned=/[+-]?\d+/,matchOffset=/Z|[+-]\d\d:?\d\d/gi,matchShortOffset=/Z|[+-]\d\d(?::?\d\d)?/gi,matchTimestamp=/[+-]?\d+(\.\d{1,3})?/,matchWord=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,regexes={},tokens={},YEAR=0,MONTH=1,DATE=2,HOUR=3,MINUTE=4,SECOND=5,MILLISECOND=6,WEEK=7,WEEKDAY=8,hookCallback,globalLocale;addFormatToken("M",["MM",2],"Mo",function(){return this.month()+1}),addFormatToken("MMM",0,0,function(format){return this.localeData().monthsShort(this,format)}),addFormatToken("MMMM",0,0,function(format){return this.localeData().months(this,format)}),addUnitAlias("month","M"),addRegexToken("M",match1to2),addRegexToken("MM",match1to2,match2),addRegexToken("MMM",function(isStrict,locale){return locale.monthsShortRegex(isStrict)}),addRegexToken("MMMM",function(isStrict,locale){return locale.monthsRegex(isStrict)}),addParseToken(["M","MM"],function(input,array){array[MONTH]=toInt(input)-1}),addParseToken(["MMM","MMMM"],function(input,array,config,token){var month=config._locale.monthsParse(input,token,config._strict);null==month?getParsingFlags(config).invalidMonth=input:array[MONTH]=month});var MONTHS_IN_FORMAT=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,defaultLocaleMonths=["January","February","March","April","May","June","July","August","September","October","November","December"],defaultLocaleMonthsShort=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],defaultMonthsShortRegex=matchWord,defaultMonthsRegex=matchWord,deprecations={};utils_hooks__hooks.suppressDeprecationWarnings=!1;var extendedIsoRegex=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,basicIsoRegex=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,tzRegex=/Z|[+-]\d\d(?::?\d\d)?/,isoDates=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],isoTimes=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],aspNetJsonRegex=/^\/?Date\((\-?\d+)/i;utils_hooks__hooks.createFromInputFallback=deprecate("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(config){config._d=new Date(config._i+(config._useUTC?" UTC":""))}),addFormatToken("Y",0,0,function(){var y=this.year();return 9999>=y?""+y:"+"+y}),addFormatToken(0,["YY",2],0,function(){return this.year()%100}),addFormatToken(0,["YYYY",4],0,"year"),addFormatToken(0,["YYYYY",5],0,"year"),addFormatToken(0,["YYYYYY",6,!0],0,"year"),addUnitAlias("year","y"),addRegexToken("Y",matchSigned),addRegexToken("YY",match1to2,match2),addRegexToken("YYYY",match1to4,match4),addRegexToken("YYYYY",match1to6,match6),addRegexToken("YYYYYY",match1to6,match6),addParseToken(["YYYYY","YYYYYY"],YEAR),addParseToken("YYYY",function(input,array){array[YEAR]=2===input.length?utils_hooks__hooks.parseTwoDigitYear(input):toInt(input)}),addParseToken("YY",function(input,array){array[YEAR]=utils_hooks__hooks.parseTwoDigitYear(input)}),addParseToken("Y",function(input,array){array[YEAR]=parseInt(input,10)}),utils_hooks__hooks.parseTwoDigitYear=function(input){return toInt(input)+(68<toInt(input)?1900:2e3)};var getSetYear=makeGetSet("FullYear",!1);utils_hooks__hooks.ISO_8601=function(){};var prototypeMin=deprecate("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var other=local__createLocal.apply(null,arguments);return this.isValid()&&other.isValid()?other<this?this:other:valid__createInvalid()}),prototypeMax=deprecate("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var other=local__createLocal.apply(null,arguments);return this.isValid()&&other.isValid()?other>this?this:other:valid__createInvalid()}),now=function(){return Date.now?Date.now():+new Date};offset("Z",":"),offset("ZZ",""),addRegexToken("Z",matchShortOffset),addRegexToken("ZZ",matchShortOffset),addParseToken(["Z","ZZ"],function(input,array,config){config._useUTC=!0,config._tzm=offsetFromString(matchShortOffset,input)});var chunkOffset=/([\+\-]|\d\d)/gi;utils_hooks__hooks.updateOffset=function(){};var aspNetRegex=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,isoRegex=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;create__createDuration.fn=Duration.prototype;var add_subtract__add=createAdder(1,"add"),add_subtract__subtract=createAdder(-1,"subtract");utils_hooks__hooks.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";var lang=deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(key){return void 0===key?this.localeData():this.locale(key)});addFormatToken(0,["gg",2],0,function(){return this.weekYear()%100}),addFormatToken(0,["GG",2],0,function(){return this.isoWeekYear()%100}),addWeekYearFormatToken("gggg","weekYear"),addWeekYearFormatToken("ggggg","weekYear"),addWeekYearFormatToken("GGGG","isoWeekYear"),addWeekYearFormatToken("GGGGG","isoWeekYear"),addUnitAlias("weekYear","gg"),addUnitAlias("isoWeekYear","GG"),addRegexToken("G",matchSigned),addRegexToken("g",matchSigned),addRegexToken("GG",match1to2,match2),addRegexToken("gg",match1to2,match2),addRegexToken("GGGG",match1to4,match4),addRegexToken("gggg",match1to4,match4),addRegexToken("GGGGG",match1to6,match6),addRegexToken("ggggg",match1to6,match6),addWeekParseToken(["gggg","ggggg","GGGG","GGGGG"],function(input,week,config,token){week[token.substr(0,2)]=toInt(input)}),addWeekParseToken(["gg","GG"],function(input,week,config,token){week[token]=utils_hooks__hooks.parseTwoDigitYear(input)}),addFormatToken("Q",0,"Qo","quarter"),addUnitAlias("quarter","Q"),addRegexToken("Q",match1),addParseToken("Q",function(input,array){array[MONTH]=3*(toInt(input)-1)}),addFormatToken("w",["ww",2],"wo","week"),addFormatToken("W",["WW",2],"Wo","isoWeek"),addUnitAlias("week","w"),addUnitAlias("isoWeek","W"),addRegexToken("w",match1to2),addRegexToken("ww",match1to2,match2),addRegexToken("W",match1to2),addRegexToken("WW",match1to2,match2),addWeekParseToken(["w","ww","W","WW"],function(input,week,config,token){week[token.substr(0,1)]=toInt(input)});var defaultLocaleWeek={dow:0,doy:6};addFormatToken("D",["DD",2],"Do","date"),addUnitAlias("date","D"),addRegexToken("D",match1to2),addRegexToken("DD",match1to2,match2),addRegexToken("Do",function(isStrict,locale){return isStrict?locale._ordinalParse:locale._ordinalParseLenient}),addParseToken(["D","DD"],DATE),addParseToken("Do",function(input,array){array[DATE]=toInt(input.match(match1to2)[0],10)});var getSetDayOfMonth=makeGetSet("Date",!0);addFormatToken("d",0,"do","day"),addFormatToken("dd",0,0,function(format){return this.localeData().weekdaysMin(this,format)}),addFormatToken("ddd",0,0,function(format){return this.localeData().weekdaysShort(this,format)}),addFormatToken("dddd",0,0,function(format){return this.localeData().weekdays(this,format)}),addFormatToken("e",0,0,"weekday"),addFormatToken("E",0,0,"isoWeekday"),addUnitAlias("day","d"),addUnitAlias("weekday","e"),addUnitAlias("isoWeekday","E"),addRegexToken("d",match1to2),addRegexToken("e",match1to2),addRegexToken("E",match1to2),addRegexToken("dd",matchWord),addRegexToken("ddd",matchWord),addRegexToken("dddd",matchWord),addWeekParseToken(["dd","ddd","dddd"],function(input,week,config,token){var weekday=config._locale.weekdaysParse(input,token,config._strict);null==weekday?getParsingFlags(config).invalidWeekday=input:week.d=weekday}),addWeekParseToken(["d","e","E"],function(input,week,config,token){week[token]=toInt(input)});var defaultLocaleWeekdays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],defaultLocaleWeekdaysShort=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],defaultLocaleWeekdaysMin=["Su","Mo","Tu","We","Th","Fr","Sa"];addFormatToken("DDD",["DDDD",3],"DDDo","dayOfYear"),addUnitAlias("dayOfYear","DDD"),addRegexToken("DDD",match1to3),addRegexToken("DDDD",match3),addParseToken(["DDD","DDDD"],function(input,array,config){config._dayOfYear=toInt(input)}),addFormatToken("H",["HH",2],0,"hour"),addFormatToken("h",["hh",2],0,hFormat),addFormatToken("hmm",0,0,function(){return""+hFormat.apply(this)+zeroFill(this.minutes(),2)}),addFormatToken("hmmss",0,0,function(){return""+hFormat.apply(this)+zeroFill(this.minutes(),2)+zeroFill(this.seconds(),2)}),addFormatToken("Hmm",0,0,function(){return""+this.hours()+zeroFill(this.minutes(),2)}),addFormatToken("Hmmss",0,0,function(){return""+this.hours()+zeroFill(this.minutes(),2)+zeroFill(this.seconds(),2)}),meridiem("a",!0),meridiem("A",!1),addUnitAlias("hour","h"),addRegexToken("a",matchMeridiem),addRegexToken("A",matchMeridiem),addRegexToken("H",match1to2),addRegexToken("h",match1to2),addRegexToken("HH",match1to2,match2),addRegexToken("hh",match1to2,match2),addRegexToken("hmm",match3to4),addRegexToken("hmmss",match5to6),addRegexToken("Hmm",match3to4),addRegexToken("Hmmss",match5to6),addParseToken(["H","HH"],HOUR),addParseToken(["a","A"],function(input,array,config){config._isPm=config._locale.isPM(input),config._meridiem=input}),addParseToken(["h","hh"],function(input,array,config){array[HOUR]=toInt(input),getParsingFlags(config).bigHour=!0}),addParseToken("hmm",function(input,array,config){var pos=input.length-2;array[HOUR]=toInt(input.substr(0,pos)),array[MINUTE]=toInt(input.substr(pos)),getParsingFlags(config).bigHour=!0}),addParseToken("hmmss",function(input,array,config){var pos1=input.length-4,pos2=input.length-2;array[HOUR]=toInt(input.substr(0,pos1)),array[MINUTE]=toInt(input.substr(pos1,2)),array[SECOND]=toInt(input.substr(pos2)),getParsingFlags(config).bigHour=!0}),addParseToken("Hmm",function(input,array,config){var pos=input.length-2;array[HOUR]=toInt(input.substr(0,pos)),array[MINUTE]=toInt(input.substr(pos))}),addParseToken("Hmmss",function(input,array,config){var pos1=input.length-4,pos2=input.length-2;array[HOUR]=toInt(input.substr(0,pos1)),array[MINUTE]=toInt(input.substr(pos1,2)),array[SECOND]=toInt(input.substr(pos2))});var defaultLocaleMeridiemParse=/[ap]\.?m?\.?/i,getSetHour=makeGetSet("Hours",!0);addFormatToken("m",["mm",2],0,"minute"),addUnitAlias("minute","m"),addRegexToken("m",match1to2),addRegexToken("mm",match1to2,match2),addParseToken(["m","mm"],MINUTE);var getSetMinute=makeGetSet("Minutes",!1);addFormatToken("s",["ss",2],0,"second"),addUnitAlias("second","s"),addRegexToken("s",match1to2),addRegexToken("ss",match1to2,match2),addParseToken(["s","ss"],SECOND);var getSetSecond=makeGetSet("Seconds",!1);addFormatToken("S",0,0,function(){return~~(this.millisecond()/100)}),addFormatToken(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),addFormatToken(0,["SSS",3],0,"millisecond"),addFormatToken(0,["SSSS",4],0,function(){return 10*this.millisecond()}),addFormatToken(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),addFormatToken(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),addFormatToken(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),addFormatToken(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),addFormatToken(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),addUnitAlias("millisecond","ms"),addRegexToken("S",match1to3,match1),addRegexToken("SS",match1to3,match2),addRegexToken("SSS",match1to3,match3);var token;for(token="SSSS";9>=token.length;token+="S")addRegexToken(token,matchUnsigned);for(token="S";9>=token.length;token+="S")addParseToken(token,parseMs);var getSetMillisecond=makeGetSet("Milliseconds",!1);addFormatToken("z",0,0,"zoneAbbr"),addFormatToken("zz",0,0,"zoneName");var momentPrototype__proto=Moment.prototype;momentPrototype__proto.add=add_subtract__add,momentPrototype__proto.calendar=moment_calendar__calendar,momentPrototype__proto.clone=clone,momentPrototype__proto.diff=diff,momentPrototype__proto.endOf=endOf,momentPrototype__proto.format=moment_format__format,momentPrototype__proto.from=from,momentPrototype__proto.fromNow=fromNow,momentPrototype__proto.to=to,momentPrototype__proto.toNow=toNow,momentPrototype__proto.get=getSet,momentPrototype__proto.invalidAt=invalidAt,momentPrototype__proto.isAfter=isAfter,momentPrototype__proto.isBefore=isBefore,momentPrototype__proto.isBetween=isBetween,momentPrototype__proto.isSame=isSame,momentPrototype__proto.isSameOrAfter=isSameOrAfter,momentPrototype__proto.isSameOrBefore=isSameOrBefore,momentPrototype__proto.isValid=moment_valid__isValid,momentPrototype__proto.lang=lang,momentPrototype__proto.locale=locale,momentPrototype__proto.localeData=localeData,momentPrototype__proto.max=prototypeMax,momentPrototype__proto.min=prototypeMin,momentPrototype__proto.parsingFlags=parsingFlags,momentPrototype__proto.set=getSet,momentPrototype__proto.startOf=startOf,momentPrototype__proto.subtract=add_subtract__subtract,momentPrototype__proto.toArray=toArray,momentPrototype__proto.toObject=toObject,momentPrototype__proto.toDate=toDate,momentPrototype__proto.toISOString=moment_format__toISOString,momentPrototype__proto.toJSON=toJSON,momentPrototype__proto.toString=toString,momentPrototype__proto.unix=unix,momentPrototype__proto.valueOf=to_type__valueOf,momentPrototype__proto.creationData=creationData,momentPrototype__proto.year=getSetYear,momentPrototype__proto.isLeapYear=getIsLeapYear,momentPrototype__proto.weekYear=getSetWeekYear,momentPrototype__proto.isoWeekYear=getSetISOWeekYear,momentPrototype__proto.quarter=momentPrototype__proto.quarters=getSetQuarter,momentPrototype__proto.month=getSetMonth,momentPrototype__proto.daysInMonth=getDaysInMonth,momentPrototype__proto.week=momentPrototype__proto.weeks=getSetWeek,momentPrototype__proto.isoWeek=momentPrototype__proto.isoWeeks=getSetISOWeek,momentPrototype__proto.weeksInYear=getWeeksInYear,momentPrototype__proto.isoWeeksInYear=getISOWeeksInYear,momentPrototype__proto.date=getSetDayOfMonth,momentPrototype__proto.day=momentPrototype__proto.days=getSetDayOfWeek,momentPrototype__proto.weekday=getSetLocaleDayOfWeek,momentPrototype__proto.isoWeekday=getSetISODayOfWeek,momentPrototype__proto.dayOfYear=getSetDayOfYear,momentPrototype__proto.hour=momentPrototype__proto.hours=getSetHour,momentPrototype__proto.minute=momentPrototype__proto.minutes=getSetMinute,momentPrototype__proto.second=momentPrototype__proto.seconds=getSetSecond,momentPrototype__proto.millisecond=momentPrototype__proto.milliseconds=getSetMillisecond,momentPrototype__proto.utcOffset=getSetOffset,momentPrototype__proto.utc=setOffsetToUTC,momentPrototype__proto.local=setOffsetToLocal,momentPrototype__proto.parseZone=setOffsetToParsedOffset,momentPrototype__proto.hasAlignedHourOffset=hasAlignedHourOffset,momentPrototype__proto.isDST=isDaylightSavingTime,momentPrototype__proto.isDSTShifted=isDaylightSavingTimeShifted,momentPrototype__proto.isLocal=isLocal,momentPrototype__proto.isUtcOffset=isUtcOffset,momentPrototype__proto.isUtc=isUtc,momentPrototype__proto.isUTC=isUtc,momentPrototype__proto.zoneAbbr=getZoneAbbr,momentPrototype__proto.zoneName=getZoneName,momentPrototype__proto.dates=deprecate("dates accessor is deprecated. Use date instead.",getSetDayOfMonth),momentPrototype__proto.months=deprecate("months accessor is deprecated. Use month instead",getSetMonth),momentPrototype__proto.years=deprecate("years accessor is deprecated. Use year instead",getSetYear),momentPrototype__proto.zone=deprecate("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",getSetZone);var momentPrototype=momentPrototype__proto,defaultCalendar={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},defaultLongDateFormat={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},defaultInvalidDate="Invalid date",defaultOrdinal="%d",defaultOrdinalParse=/\d{1,2}/,defaultRelativeTime={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},prototype__proto=Locale.prototype;prototype__proto._calendar=defaultCalendar,prototype__proto.calendar=locale_calendar__calendar,prototype__proto._longDateFormat=defaultLongDateFormat,prototype__proto.longDateFormat=longDateFormat,prototype__proto._invalidDate=defaultInvalidDate,prototype__proto.invalidDate=invalidDate,prototype__proto._ordinal=defaultOrdinal,prototype__proto.ordinal=ordinal,prototype__proto._ordinalParse=defaultOrdinalParse,prototype__proto.preparse=preParsePostFormat,prototype__proto.postformat=preParsePostFormat,prototype__proto._relativeTime=defaultRelativeTime,prototype__proto.relativeTime=relative__relativeTime,prototype__proto.pastFuture=pastFuture,prototype__proto.set=locale_set__set,prototype__proto.months=localeMonths,prototype__proto._months=defaultLocaleMonths,prototype__proto.monthsShort=localeMonthsShort,prototype__proto._monthsShort=defaultLocaleMonthsShort,prototype__proto.monthsParse=localeMonthsParse,prototype__proto._monthsRegex=defaultMonthsRegex,prototype__proto.monthsRegex=monthsRegex,prototype__proto._monthsShortRegex=defaultMonthsShortRegex,prototype__proto.monthsShortRegex=monthsShortRegex,prototype__proto.week=localeWeek,prototype__proto._week=defaultLocaleWeek,prototype__proto.firstDayOfYear=localeFirstDayOfYear,prototype__proto.firstDayOfWeek=localeFirstDayOfWeek,prototype__proto.weekdays=localeWeekdays,prototype__proto._weekdays=defaultLocaleWeekdays,prototype__proto.weekdaysMin=localeWeekdaysMin,prototype__proto._weekdaysMin=defaultLocaleWeekdaysMin,prototype__proto.weekdaysShort=localeWeekdaysShort,prototype__proto._weekdaysShort=defaultLocaleWeekdaysShort,prototype__proto.weekdaysParse=localeWeekdaysParse,prototype__proto.isPM=localeIsPM,prototype__proto._meridiemParse=defaultLocaleMeridiemParse,prototype__proto.meridiem=localeMeridiem,locale_locales__getSetGlobalLocale("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(number){var b=number%10,output=1===toInt(number%100/10)?"th":1==b?"st":2==b?"nd":3==b?"rd":"th";return number+output}}),utils_hooks__hooks.lang=deprecate("moment.lang is deprecated. Use moment.locale instead.",locale_locales__getSetGlobalLocale),utils_hooks__hooks.langData=deprecate("moment.langData is deprecated. Use moment.localeData instead.",locale_locales__getLocale);var mathAbs=_Mathabs,asMilliseconds=makeAs("ms"),asSeconds=makeAs("s"),asMinutes=makeAs("m"),asHours=makeAs("h"),asDays=makeAs("d"),asWeeks=makeAs("w"),asMonths=makeAs("M"),asYears=makeAs("y"),milliseconds=makeGetter("milliseconds"),seconds=makeGetter("seconds"),minutes=makeGetter("minutes"),hours=makeGetter("hours"),days=makeGetter("days"),duration_get__months=makeGetter("months"),years=makeGetter("years"),round=_Mathround,thresholds={s:45,m:45,h:22,d:26,M:11},iso_string__abs=_Mathabs,duration_prototype__proto=Duration.prototype;duration_prototype__proto.abs=duration_abs__abs,duration_prototype__proto.add=duration_add_subtract__add,duration_prototype__proto.subtract=duration_add_subtract__subtract,duration_prototype__proto.as=as,duration_prototype__proto.asMilliseconds=asMilliseconds,duration_prototype__proto.asSeconds=asSeconds,duration_prototype__proto.asMinutes=asMinutes,duration_prototype__proto.asHours=asHours,duration_prototype__proto.asDays=asDays,duration_prototype__proto.asWeeks=asWeeks,duration_prototype__proto.asMonths=asMonths,duration_prototype__proto.asYears=asYears,duration_prototype__proto.valueOf=duration_as__valueOf,duration_prototype__proto._bubble=bubble,duration_prototype__proto.get=duration_get__get,duration_prototype__proto.milliseconds=milliseconds,duration_prototype__proto.seconds=seconds,duration_prototype__proto.minutes=minutes,duration_prototype__proto.hours=hours,duration_prototype__proto.days=days,duration_prototype__proto.weeks=weeks,duration_prototype__proto.months=duration_get__months,duration_prototype__proto.years=years,duration_prototype__proto.humanize=humanize,duration_prototype__proto.toISOString=iso_string__toISOString,duration_prototype__proto.toString=iso_string__toISOString,duration_prototype__proto.toJSON=iso_string__toISOString,duration_prototype__proto.locale=locale,duration_prototype__proto.localeData=localeData,duration_prototype__proto.toIsoString=deprecate("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",iso_string__toISOString),duration_prototype__proto.lang=lang,addFormatToken("X",0,0,"unix"),addFormatToken("x",0,0,"valueOf"),addRegexToken("x",matchSigned),addRegexToken("X",matchTimestamp),addParseToken("X",function(input,array,config){config._d=new Date(1e3*parseFloat(input,10))}),addParseToken("x",function(input,array,config){config._d=new Date(toInt(input))});;utils_hooks__hooks.version="2.11.2",setHookCallback(local__createLocal),utils_hooks__hooks.fn=momentPrototype,utils_hooks__hooks.min=min,utils_hooks__hooks.max=max,utils_hooks__hooks.now=now,utils_hooks__hooks.utc=create_utc__createUTC,utils_hooks__hooks.unix=moment_moment__createUnix,utils_hooks__hooks.months=lists__listMonths,utils_hooks__hooks.isDate=isDate,utils_hooks__hooks.locale=locale_locales__getSetGlobalLocale,utils_hooks__hooks.invalid=valid__createInvalid,utils_hooks__hooks.duration=create__createDuration,utils_hooks__hooks.isMoment=isMoment,utils_hooks__hooks.weekdays=lists__listWeekdays,utils_hooks__hooks.parseZone=moment_moment__createInZone,utils_hooks__hooks.localeData=locale_locales__getLocale,utils_hooks__hooks.isDuration=isDuration,utils_hooks__hooks.monthsShort=lists__listMonthsShort,utils_hooks__hooks.weekdaysMin=lists__listWeekdaysMin,utils_hooks__hooks.defineLocale=defineLocale,utils_hooks__hooks.weekdaysShort=lists__listWeekdaysShort,utils_hooks__hooks.normalizeUnits=normalizeUnits,utils_hooks__hooks.relativeTimeThreshold=duration_humanize__getSetRelativeTimeThreshold,utils_hooks__hooks.prototype=momentPrototype;var moment__default=utils_hooks__hooks,af=moment__default.defineLocale("af",{months:["Januarie","Februarie","Maart","April","Mei","Junie","Julie","Augustus","September","Oktober","November","Desember"],monthsShort:["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Des"],weekdays:["Sondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrydag","Saterdag"],weekdaysShort:["Son","Maa","Din","Woe","Don","Vry","Sat"],weekdaysMin:["So","Ma","Di","Wo","Do","Vr","Sa"],meridiemParse:/vm|nm/i,isPM:function(input){return /^nm$/i.test(input)},meridiem:function(hours,minutes,isLower){return 12>hours?isLower?"vm":"VM":isLower?"nm":"NM"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Vandag om] LT",nextDay:"[M\xF4re om] LT",nextWeek:"dddd [om] LT",lastDay:"[Gister om] LT",lastWeek:"[Laas] dddd [om] LT",sameElse:"L"},relativeTime:{future:"oor %s",past:"%s gelede",s:"'n paar sekondes",m:"'n minuut",mm:"%d minute",h:"'n uur",hh:"%d ure",d:"'n dag",dd:"%d dae",M:"'n maand",MM:"%d maande",y:"'n jaar",yy:"%d jaar"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(number){return number+(1===number||8===number||20<=number?"ste":"de")},week:{dow:1,doy:4}}),ar_ma=moment__default.defineLocale("ar-ma",{months:["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648\u0632","\u063A\u0634\u062A","\u0634\u062A\u0646\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0646\u0628\u0631","\u062F\u062C\u0646\u0628\u0631"],monthsShort:["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648\u0632","\u063A\u0634\u062A","\u0634\u062A\u0646\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0646\u0628\u0631","\u062F\u062C\u0646\u0628\u0631"],weekdays:["\u0627\u0644\u0623\u062D\u062F","\u0627\u0644\u0625\u062A\u0646\u064A\u0646","\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621","\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621","\u0627\u0644\u062E\u0645\u064A\u0633","\u0627\u0644\u062C\u0645\u0639\u0629","\u0627\u0644\u0633\u0628\u062A"],weekdaysShort:["\u0627\u062D\u062F","\u0627\u062A\u0646\u064A\u0646","\u062B\u0644\u0627\u062B\u0627\u0621","\u0627\u0631\u0628\u0639\u0627\u0621","\u062E\u0645\u064A\u0633","\u062C\u0645\u0639\u0629","\u0633\u0628\u062A"],weekdaysMin:["\u062D","\u0646","\u062B","\u0631","\u062E","\u062C","\u0633"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u0627\u0644\u064A\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063A\u062F\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0641\u064A %s",past:"\u0645\u0646\u0630 %s",s:"\u062B\u0648\u0627\u0646",m:"\u062F\u0642\u064A\u0642\u0629",mm:"%d \u062F\u0642\u0627\u0626\u0642",h:"\u0633\u0627\u0639\u0629",hh:"%d \u0633\u0627\u0639\u0627\u062A",d:"\u064A\u0648\u0645",dd:"%d \u0623\u064A\u0627\u0645",M:"\u0634\u0647\u0631",MM:"%d \u0623\u0634\u0647\u0631",y:"\u0633\u0646\u0629",yy:"%d \u0633\u0646\u0648\u0627\u062A"},week:{dow:6,doy:12}}),ar_sa__symbolMap={1:"\u0661",2:"\u0662",3:"\u0663",4:"\u0664",5:"\u0665",6:"\u0666",7:"\u0667",8:"\u0668",9:"\u0669",0:"\u0660"},ar_sa__numberMap={"١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","٠":"0"},ar_sa=moment__default.defineLocale("ar-sa",{months:["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],monthsShort:["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],weekdays:["\u0627\u0644\u0623\u062D\u062F","\u0627\u0644\u0625\u062B\u0646\u064A\u0646","\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621","\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621","\u0627\u0644\u062E\u0645\u064A\u0633","\u0627\u0644\u062C\u0645\u0639\u0629","\u0627\u0644\u0633\u0628\u062A"],weekdaysShort:["\u0623\u062D\u062F","\u0625\u062B\u0646\u064A\u0646","\u062B\u0644\u0627\u062B\u0627\u0621","\u0623\u0631\u0628\u0639\u0627\u0621","\u062E\u0645\u064A\u0633","\u062C\u0645\u0639\u0629","\u0633\u0628\u062A"],weekdaysMin:["\u062D","\u0646","\u062B","\u0631","\u062E","\u062C","\u0633"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/ص|م/,isPM:function(input){return"\u0645"===input},meridiem:function(hour,minute,isLower){return 12>hour?"\u0635":"\u0645"},calendar:{sameDay:"[\u0627\u0644\u064A\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063A\u062F\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0641\u064A %s",past:"\u0645\u0646\u0630 %s",s:"\u062B\u0648\u0627\u0646",m:"\u062F\u0642\u064A\u0642\u0629",mm:"%d \u062F\u0642\u0627\u0626\u0642",h:"\u0633\u0627\u0639\u0629",hh:"%d \u0633\u0627\u0639\u0627\u062A",d:"\u064A\u0648\u0645",dd:"%d \u0623\u064A\u0627\u0645",M:"\u0634\u0647\u0631",MM:"%d \u0623\u0634\u0647\u0631",y:"\u0633\u0646\u0629",yy:"%d \u0633\u0646\u0648\u0627\u062A"},preparse:function(string){return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g,function(match){return ar_sa__numberMap[match]}).replace(/،/g,",")},postformat:function(string){return string.replace(/\d/g,function(match){return ar_sa__symbolMap[match]}).replace(/,/g,"\u060C")},week:{dow:6,doy:12}}),ar_tn=moment__default.defineLocale("ar-tn",{months:["\u062C\u0627\u0646\u0641\u064A","\u0641\u064A\u0641\u0631\u064A","\u0645\u0627\u0631\u0633","\u0623\u0641\u0631\u064A\u0644","\u0645\u0627\u064A","\u062C\u0648\u0627\u0646","\u062C\u0648\u064A\u0644\u064A\u0629","\u0623\u0648\u062A","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],monthsShort:["\u062C\u0627\u0646\u0641\u064A","\u0641\u064A\u0641\u0631\u064A","\u0645\u0627\u0631\u0633","\u0623\u0641\u0631\u064A\u0644","\u0645\u0627\u064A","\u062C\u0648\u0627\u0646","\u062C\u0648\u064A\u0644\u064A\u0629","\u0623\u0648\u062A","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"],weekdays:["\u0627\u0644\u0623\u062D\u062F","\u0627\u0644\u0625\u062B\u0646\u064A\u0646","\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621","\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621","\u0627\u0644\u062E\u0645\u064A\u0633","\u0627\u0644\u062C\u0645\u0639\u0629","\u0627\u0644\u0633\u0628\u062A"],weekdaysShort:["\u0623\u062D\u062F","\u0625\u062B\u0646\u064A\u0646","\u062B\u0644\u0627\u062B\u0627\u0621","\u0623\u0631\u0628\u0639\u0627\u0621","\u062E\u0645\u064A\u0633","\u062C\u0645\u0639\u0629","\u0633\u0628\u062A"],weekdaysMin:["\u062D","\u0646","\u062B","\u0631","\u062E","\u062C","\u0633"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u0627\u0644\u064A\u0648\u0645 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063A\u062F\u0627 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0644\u0649 \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0641\u064A %s",past:"\u0645\u0646\u0630 %s",s:"\u062B\u0648\u0627\u0646",m:"\u062F\u0642\u064A\u0642\u0629",mm:"%d \u062F\u0642\u0627\u0626\u0642",h:"\u0633\u0627\u0639\u0629",hh:"%d \u0633\u0627\u0639\u0627\u062A",d:"\u064A\u0648\u0645",dd:"%d \u0623\u064A\u0627\u0645",M:"\u0634\u0647\u0631",MM:"%d \u0623\u0634\u0647\u0631",y:"\u0633\u0646\u0629",yy:"%d \u0633\u0646\u0648\u0627\u062A"},week:{dow:1,doy:4}}),ar__symbolMap={1:"\u0661",2:"\u0662",3:"\u0663",4:"\u0664",5:"\u0665",6:"\u0666",7:"\u0667",8:"\u0668",9:"\u0669",0:"\u0660"},ar__numberMap={"١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","٠":"0"},pluralForm=function(n){return 0===n?0:1===n?1:2===n?2:3<=n%100&&10>=n%100?3:11<=n%100?4:5},plurals={s:["\u0623\u0642\u0644 \u0645\u0646 \u062B\u0627\u0646\u064A\u0629","\u062B\u0627\u0646\u064A\u0629 \u0648\u0627\u062D\u062F\u0629",["\u062B\u0627\u0646\u064A\u062A\u0627\u0646","\u062B\u0627\u0646\u064A\u062A\u064A\u0646"],"%d \u062B\u0648\u0627\u0646","%d \u062B\u0627\u0646\u064A\u0629","%d \u062B\u0627\u0646\u064A\u0629"],m:["\u0623\u0642\u0644 \u0645\u0646 \u062F\u0642\u064A\u0642\u0629","\u062F\u0642\u064A\u0642\u0629 \u0648\u0627\u062D\u062F\u0629",["\u062F\u0642\u064A\u0642\u062A\u0627\u0646","\u062F\u0642\u064A\u0642\u062A\u064A\u0646"],"%d \u062F\u0642\u0627\u0626\u0642","%d \u062F\u0642\u064A\u0642\u0629","%d \u062F\u0642\u064A\u0642\u0629"],h:["\u0623\u0642\u0644 \u0645\u0646 \u0633\u0627\u0639\u0629","\u0633\u0627\u0639\u0629 \u0648\u0627\u062D\u062F\u0629",["\u0633\u0627\u0639\u062A\u0627\u0646","\u0633\u0627\u0639\u062A\u064A\u0646"],"%d \u0633\u0627\u0639\u0627\u062A","%d \u0633\u0627\u0639\u0629","%d \u0633\u0627\u0639\u0629"],d:["\u0623\u0642\u0644 \u0645\u0646 \u064A\u0648\u0645","\u064A\u0648\u0645 \u0648\u0627\u062D\u062F",["\u064A\u0648\u0645\u0627\u0646","\u064A\u0648\u0645\u064A\u0646"],"%d \u0623\u064A\u0627\u0645","%d \u064A\u0648\u0645\u064B\u0627","%d \u064A\u0648\u0645"],M:["\u0623\u0642\u0644 \u0645\u0646 \u0634\u0647\u0631","\u0634\u0647\u0631 \u0648\u0627\u062D\u062F",["\u0634\u0647\u0631\u0627\u0646","\u0634\u0647\u0631\u064A\u0646"],"%d \u0623\u0634\u0647\u0631","%d \u0634\u0647\u0631\u0627","%d \u0634\u0647\u0631"],y:["\u0623\u0642\u0644 \u0645\u0646 \u0639\u0627\u0645","\u0639\u0627\u0645 \u0648\u0627\u062D\u062F",["\u0639\u0627\u0645\u0627\u0646","\u0639\u0627\u0645\u064A\u0646"],"%d \u0623\u0639\u0648\u0627\u0645","%d \u0639\u0627\u0645\u064B\u0627","%d \u0639\u0627\u0645"]},pluralize=function(u){return function(number,withoutSuffix,string,isFuture){var f=pluralForm(number),str=plurals[u][pluralForm(number)];return 2===f&&(str=str[withoutSuffix?0:1]),str.replace(/%d/i,number)}},ar__months=["\u0643\u0627\u0646\u0648\u0646 \u0627\u0644\u062B\u0627\u0646\u064A \u064A\u0646\u0627\u064A\u0631","\u0634\u0628\u0627\u0637 \u0641\u0628\u0631\u0627\u064A\u0631","\u0622\u0630\u0627\u0631 \u0645\u0627\u0631\u0633","\u0646\u064A\u0633\u0627\u0646 \u0623\u0628\u0631\u064A\u0644","\u0623\u064A\u0627\u0631 \u0645\u0627\u064A\u0648","\u062D\u0632\u064A\u0631\u0627\u0646 \u064A\u0648\u0646\u064A\u0648","\u062A\u0645\u0648\u0632 \u064A\u0648\u0644\u064A\u0648","\u0622\u0628 \u0623\u063A\u0633\u0637\u0633","\u0623\u064A\u0644\u0648\u0644 \u0633\u0628\u062A\u0645\u0628\u0631","\u062A\u0634\u0631\u064A\u0646 \u0627\u0644\u0623\u0648\u0644 \u0623\u0643\u062A\u0648\u0628\u0631","\u062A\u0634\u0631\u064A\u0646 \u0627\u0644\u062B\u0627\u0646\u064A \u0646\u0648\u0641\u0645\u0628\u0631","\u0643\u0627\u0646\u0648\u0646 \u0627\u0644\u0623\u0648\u0644 \u062F\u064A\u0633\u0645\u0628\u0631"],ar=moment__default.defineLocale("ar",{months:ar__months,monthsShort:ar__months,weekdays:["\u0627\u0644\u0623\u062D\u062F","\u0627\u0644\u0625\u062B\u0646\u064A\u0646","\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621","\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621","\u0627\u0644\u062E\u0645\u064A\u0633","\u0627\u0644\u062C\u0645\u0639\u0629","\u0627\u0644\u0633\u0628\u062A"],weekdaysShort:["\u0623\u062D\u062F","\u0625\u062B\u0646\u064A\u0646","\u062B\u0644\u0627\u062B\u0627\u0621","\u0623\u0631\u0628\u0639\u0627\u0621","\u062E\u0645\u064A\u0633","\u062C\u0645\u0639\u0629","\u0633\u0628\u062A"],weekdaysMin:["\u062D","\u0646","\u062B","\u0631","\u062E","\u062C","\u0633"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/\u200FM/\u200FYYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/ص|م/,isPM:function(input){return"\u0645"===input},meridiem:function(hour,minute,isLower){return 12>hour?"\u0635":"\u0645"},calendar:{sameDay:"[\u0627\u0644\u064A\u0648\u0645 \u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextDay:"[\u063A\u062F\u064B\u0627 \u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",nextWeek:"dddd [\u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastDay:"[\u0623\u0645\u0633 \u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",lastWeek:"dddd [\u0639\u0646\u062F \u0627\u0644\u0633\u0627\u0639\u0629] LT",sameElse:"L"},relativeTime:{future:"\u0628\u0639\u062F %s",past:"\u0645\u0646\u0630 %s",s:pluralize("s"),m:pluralize("m"),mm:pluralize("m"),h:pluralize("h"),hh:pluralize("h"),d:pluralize("d"),dd:pluralize("d"),M:pluralize("M"),MM:pluralize("M"),y:pluralize("y"),yy:pluralize("y")},preparse:function(string){return string.replace(/\u200f/g,"").replace(/[١٢٣٤٥٦٧٨٩٠]/g,function(match){return ar__numberMap[match]}).replace(/،/g,",")},postformat:function(string){return string.replace(/\d/g,function(match){return ar__symbolMap[match]}).replace(/,/g,"\u060C")},week:{dow:6,doy:12}}),az__suffixes={1:"-inci",5:"-inci",8:"-inci",70:"-inci",80:"-inci",2:"-nci",7:"-nci",20:"-nci",50:"-nci",3:"-\xFCnc\xFC",4:"-\xFCnc\xFC",100:"-\xFCnc\xFC",6:"-nc\u0131",9:"-uncu",10:"-uncu",30:"-uncu",60:"-\u0131nc\u0131",90:"-\u0131nc\u0131"},az=moment__default.defineLocale("az",{months:["yanvar","fevral","mart","aprel","may","iyun","iyul","avqust","sentyabr","oktyabr","noyabr","dekabr"],monthsShort:["yan","fev","mar","apr","may","iyn","iyl","avq","sen","okt","noy","dek"],weekdays:["Bazar","Bazar ert\u0259si","\xC7\u0259r\u015F\u0259nb\u0259 ax\u015Fam\u0131","\xC7\u0259r\u015F\u0259nb\u0259","C\xFCm\u0259 ax\u015Fam\u0131","C\xFCm\u0259","\u015E\u0259nb\u0259"],weekdaysShort:["Baz","BzE","\xC7Ax","\xC7\u0259r","CAx","C\xFCm","\u015E\u0259n"],weekdaysMin:["Bz","BE","\xC7A","\xC7\u0259","CA","C\xFC","\u015E\u0259"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[bug\xFCn saat] LT",nextDay:"[sabah saat] LT",nextWeek:"[g\u0259l\u0259n h\u0259ft\u0259] dddd [saat] LT",lastDay:"[d\xFCn\u0259n] LT",lastWeek:"[ke\xE7\u0259n h\u0259ft\u0259] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s \u0259vv\u0259l",s:"birne\xE7\u0259 saniyy\u0259",m:"bir d\u0259qiq\u0259",mm:"%d d\u0259qiq\u0259",h:"bir saat",hh:"%d saat",d:"bir g\xFCn",dd:"%d g\xFCn",M:"bir ay",MM:"%d ay",y:"bir il",yy:"%d il"},meridiemParse:/gecə|səhər|gündüz|axşam/,isPM:function(input){return /^(gündüz|axşam)$/.test(input)},meridiem:function(hour,minute,isLower){return 4>hour?"gec\u0259":12>hour?"s\u0259h\u0259r":17>hour?"g\xFCnd\xFCz":"ax\u015Fam"},ordinalParse:/\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,ordinal:function(number){if(0===number)return number+"-\u0131nc\u0131";var a=number%10,b=number%100-a,c=100<=number?100:null;return number+(az__suffixes[a]||az__suffixes[b]||az__suffixes[c])},week:{dow:1,doy:7}}),be=moment__default.defineLocale("be",{months:{format:["\u0441\u0442\u0443\u0434\u0437\u0435\u043D\u044F","\u043B\u044E\u0442\u0430\u0433\u0430","\u0441\u0430\u043A\u0430\u0432\u0456\u043A\u0430","\u043A\u0440\u0430\u0441\u0430\u0432\u0456\u043A\u0430","\u0442\u0440\u0430\u045E\u043D\u044F","\u0447\u044D\u0440\u0432\u0435\u043D\u044F","\u043B\u0456\u043F\u0435\u043D\u044F","\u0436\u043D\u0456\u045E\u043D\u044F","\u0432\u0435\u0440\u0430\u0441\u043D\u044F","\u043A\u0430\u0441\u0442\u0440\u044B\u0447\u043D\u0456\u043A\u0430","\u043B\u0456\u0441\u0442\u0430\u043F\u0430\u0434\u0430","\u0441\u043D\u0435\u0436\u043D\u044F"],standalone:["\u0441\u0442\u0443\u0434\u0437\u0435\u043D\u044C","\u043B\u044E\u0442\u044B","\u0441\u0430\u043A\u0430\u0432\u0456\u043A","\u043A\u0440\u0430\u0441\u0430\u0432\u0456\u043A","\u0442\u0440\u0430\u0432\u0435\u043D\u044C","\u0447\u044D\u0440\u0432\u0435\u043D\u044C","\u043B\u0456\u043F\u0435\u043D\u044C","\u0436\u043D\u0456\u0432\u0435\u043D\u044C","\u0432\u0435\u0440\u0430\u0441\u0435\u043D\u044C","\u043A\u0430\u0441\u0442\u0440\u044B\u0447\u043D\u0456\u043A","\u043B\u0456\u0441\u0442\u0430\u043F\u0430\u0434","\u0441\u043D\u0435\u0436\u0430\u043D\u044C"]},monthsShort:["\u0441\u0442\u0443\u0434","\u043B\u044E\u0442","\u0441\u0430\u043A","\u043A\u0440\u0430\u0441","\u0442\u0440\u0430\u0432","\u0447\u044D\u0440\u0432","\u043B\u0456\u043F","\u0436\u043D\u0456\u0432","\u0432\u0435\u0440","\u043A\u0430\u0441\u0442","\u043B\u0456\u0441\u0442","\u0441\u043D\u0435\u0436"],weekdays:{format:["\u043D\u044F\u0434\u0437\u0435\u043B\u044E","\u043F\u0430\u043D\u044F\u0434\u0437\u0435\u043B\u0430\u043A","\u0430\u045E\u0442\u043E\u0440\u0430\u043A","\u0441\u0435\u0440\u0430\u0434\u0443","\u0447\u0430\u0446\u0432\u0435\u0440","\u043F\u044F\u0442\u043D\u0456\u0446\u0443","\u0441\u0443\u0431\u043E\u0442\u0443"],standalone:["\u043D\u044F\u0434\u0437\u0435\u043B\u044F","\u043F\u0430\u043D\u044F\u0434\u0437\u0435\u043B\u0430\u043A","\u0430\u045E\u0442\u043E\u0440\u0430\u043A","\u0441\u0435\u0440\u0430\u0434\u0430","\u0447\u0430\u0446\u0432\u0435\u0440","\u043F\u044F\u0442\u043D\u0456\u0446\u0430","\u0441\u0443\u0431\u043E\u0442\u0430"],isFormat:/\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/},weekdaysShort:["\u043D\u0434","\u043F\u043D","\u0430\u0442","\u0441\u0440","\u0447\u0446","\u043F\u0442","\u0441\u0431"],weekdaysMin:["\u043D\u0434","\u043F\u043D","\u0430\u0442","\u0441\u0440","\u0447\u0446","\u043F\u0442","\u0441\u0431"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY \u0433.",LLL:"D MMMM YYYY \u0433., HH:mm",LLLL:"dddd, D MMMM YYYY \u0433., HH:mm"},calendar:{sameDay:"[\u0421\u0451\u043D\u043D\u044F \u045E] LT",nextDay:"[\u0417\u0430\u045E\u0442\u0440\u0430 \u045E] LT",lastDay:"[\u0423\u0447\u043E\u0440\u0430 \u045E] LT",nextWeek:function(){return"[\u0423] dddd [\u045E] LT"},lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return"[\u0423 \u043C\u0456\u043D\u0443\u043B\u0443\u044E] dddd [\u045E] LT";case 1:case 2:case 4:return"[\u0423 \u043C\u0456\u043D\u0443\u043B\u044B] dddd [\u045E] LT";}},sameElse:"L"},relativeTime:{future:"\u043F\u0440\u0430\u0437 %s",past:"%s \u0442\u0430\u043C\u0443",s:"\u043D\u0435\u043A\u0430\u043B\u044C\u043A\u0456 \u0441\u0435\u043A\u0443\u043D\u0434",m:be__relativeTimeWithPlural,mm:be__relativeTimeWithPlural,h:be__relativeTimeWithPlural,hh:be__relativeTimeWithPlural,d:"\u0434\u0437\u0435\u043D\u044C",dd:be__relativeTimeWithPlural,M:"\u043C\u0435\u0441\u044F\u0446",MM:be__relativeTimeWithPlural,y:"\u0433\u043E\u0434",yy:be__relativeTimeWithPlural},meridiemParse:/ночы|раніцы|дня|вечара/,isPM:function(input){return /^(дня|вечара)$/.test(input)},meridiem:function(hour,minute,isLower){return 4>hour?"\u043D\u043E\u0447\u044B":12>hour?"\u0440\u0430\u043D\u0456\u0446\u044B":17>hour?"\u0434\u043D\u044F":"\u0432\u0435\u0447\u0430\u0440\u0430"},ordinalParse:/\d{1,2}-(і|ы|га)/,ordinal:function(number,period){return"M"===period||"d"===period||"DDD"===period||"w"===period||"W"===period?(2==number%10||3==number%10)&&12!=number%100&&13!=number%100?number+"-\u0456":number+"-\u044B":"D"===period?number+"-\u0433\u0430":number},week:{dow:1,doy:7}}),bg=moment__default.defineLocale("bg",{months:["\u044F\u043D\u0443\u0430\u0440\u0438","\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438","\u043C\u0430\u0440\u0442","\u0430\u043F\u0440\u0438\u043B","\u043C\u0430\u0439","\u044E\u043D\u0438","\u044E\u043B\u0438","\u0430\u0432\u0433\u0443\u0441\u0442","\u0441\u0435\u043F\u0442\u0435\u043C\u0432\u0440\u0438","\u043E\u043A\u0442\u043E\u043C\u0432\u0440\u0438","\u043D\u043E\u0435\u043C\u0432\u0440\u0438","\u0434\u0435\u043A\u0435\u043C\u0432\u0440\u0438"],monthsShort:["\u044F\u043D\u0440","\u0444\u0435\u0432","\u043C\u0430\u0440","\u0430\u043F\u0440","\u043C\u0430\u0439","\u044E\u043D\u0438","\u044E\u043B\u0438","\u0430\u0432\u0433","\u0441\u0435\u043F","\u043E\u043A\u0442","\u043D\u043E\u0435","\u0434\u0435\u043A"],weekdays:["\u043D\u0435\u0434\u0435\u043B\u044F","\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u043D\u0438\u043A","\u0432\u0442\u043E\u0440\u043D\u0438\u043A","\u0441\u0440\u044F\u0434\u0430","\u0447\u0435\u0442\u0432\u044A\u0440\u0442\u044A\u043A","\u043F\u0435\u0442\u044A\u043A","\u0441\u044A\u0431\u043E\u0442\u0430"],weekdaysShort:["\u043D\u0435\u0434","\u043F\u043E\u043D","\u0432\u0442\u043E","\u0441\u0440\u044F","\u0447\u0435\u0442","\u043F\u0435\u0442","\u0441\u044A\u0431"],weekdaysMin:["\u043D\u0434","\u043F\u043D","\u0432\u0442","\u0441\u0440","\u0447\u0442","\u043F\u0442","\u0441\u0431"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[\u0414\u043D\u0435\u0441 \u0432] LT",nextDay:"[\u0423\u0442\u0440\u0435 \u0432] LT",nextWeek:"dddd [\u0432] LT",lastDay:"[\u0412\u0447\u0435\u0440\u0430 \u0432] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[\u0412 \u0438\u0437\u043C\u0438\u043D\u0430\u043B\u0430\u0442\u0430] dddd [\u0432] LT";case 1:case 2:case 4:case 5:return"[\u0412 \u0438\u0437\u043C\u0438\u043D\u0430\u043B\u0438\u044F] dddd [\u0432] LT";}},sameElse:"L"},relativeTime:{future:"\u0441\u043B\u0435\u0434 %s",past:"\u043F\u0440\u0435\u0434\u0438 %s",s:"\u043D\u044F\u043A\u043E\u043B\u043A\u043E \u0441\u0435\u043A\u0443\u043D\u0434\u0438",m:"\u043C\u0438\u043D\u0443\u0442\u0430",mm:"%d \u043C\u0438\u043D\u0443\u0442\u0438",h:"\u0447\u0430\u0441",hh:"%d \u0447\u0430\u0441\u0430",d:"\u0434\u0435\u043D",dd:"%d \u0434\u043D\u0438",M:"\u043C\u0435\u0441\u0435\u0446",MM:"%d \u043C\u0435\u0441\u0435\u0446\u0430",y:"\u0433\u043E\u0434\u0438\u043D\u0430",yy:"%d \u0433\u043E\u0434\u0438\u043D\u0438"},ordinalParse:/\d{1,2}-(ев|ен|ти|ви|ри|ми)/,ordinal:function(number){var lastDigit=number%10,last2Digits=number%100;return 0===number?number+"-\u0435\u0432":0==last2Digits?number+"-\u0435\u043D":10<last2Digits&&20>last2Digits?number+"-\u0442\u0438":1==lastDigit?number+"-\u0432\u0438":2==lastDigit?number+"-\u0440\u0438":7==lastDigit||8==lastDigit?number+"-\u043C\u0438":number+"-\u0442\u0438"},week:{dow:1,doy:7}}),bn__symbolMap={1:"\u09E7",2:"\u09E8",3:"\u09E9",4:"\u09EA",5:"\u09EB",6:"\u09EC",7:"\u09ED",8:"\u09EE",9:"\u09EF",0:"\u09E6"},bn__numberMap={"১":"1","২":"2","৩":"3","৪":"4","৫":"5","৬":"6","৭":"7","৮":"8","৯":"9","০":"0"},bn=moment__default.defineLocale("bn",{months:["\u099C\u09BE\u09A8\u09C1\u09DF\u09BE\u09B0\u09C0","\u09AB\u09C7\u09AC\u09C1\u09DF\u09BE\u09B0\u09C0","\u09AE\u09BE\u09B0\u09CD\u099A","\u098F\u09AA\u09CD\u09B0\u09BF\u09B2","\u09AE\u09C7","\u099C\u09C1\u09A8","\u099C\u09C1\u09B2\u09BE\u0987","\u0985\u0997\u09BE\u09B8\u09CD\u099F","\u09B8\u09C7\u09AA\u09CD\u099F\u09C7\u09AE\u09CD\u09AC\u09B0","\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09B0","\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09B0","\u09A1\u09BF\u09B8\u09C7\u09AE\u09CD\u09AC\u09B0"],monthsShort:["\u099C\u09BE\u09A8\u09C1","\u09AB\u09C7\u09AC","\u09AE\u09BE\u09B0\u09CD\u099A","\u098F\u09AA\u09B0","\u09AE\u09C7","\u099C\u09C1\u09A8","\u099C\u09C1\u09B2","\u0985\u0997","\u09B8\u09C7\u09AA\u09CD\u099F","\u0985\u0995\u09CD\u099F\u09CB","\u09A8\u09AD","\u09A1\u09BF\u09B8\u09C7\u09AE\u09CD"],weekdays:["\u09B0\u09AC\u09BF\u09AC\u09BE\u09B0","\u09B8\u09CB\u09AE\u09AC\u09BE\u09B0","\u09AE\u0999\u09CD\u0997\u09B2\u09AC\u09BE\u09B0","\u09AC\u09C1\u09A7\u09AC\u09BE\u09B0","\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09CD\u09A4\u09BF\u09AC\u09BE\u09B0","\u09B6\u09C1\u0995\u09CD\u09B0\u09AC\u09BE\u09B0","\u09B6\u09A8\u09BF\u09AC\u09BE\u09B0"],weekdaysShort:["\u09B0\u09AC\u09BF","\u09B8\u09CB\u09AE","\u09AE\u0999\u09CD\u0997\u09B2","\u09AC\u09C1\u09A7","\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09CD\u09A4\u09BF","\u09B6\u09C1\u0995\u09CD\u09B0","\u09B6\u09A8\u09BF"],weekdaysMin:["\u09B0\u09AC","\u09B8\u09AE","\u09AE\u0999\u09CD\u0997","\u09AC\u09C1","\u09AC\u09CD\u09B0\u09BF\u09B9","\u09B6\u09C1","\u09B6\u09A8\u09BF"],longDateFormat:{LT:"A h:mm \u09B8\u09AE\u09DF",LTS:"A h:mm:ss \u09B8\u09AE\u09DF",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm \u09B8\u09AE\u09DF",LLLL:"dddd, D MMMM YYYY, A h:mm \u09B8\u09AE\u09DF"},calendar:{sameDay:"[\u0986\u099C] LT",nextDay:"[\u0986\u0997\u09BE\u09AE\u09C0\u0995\u09BE\u09B2] LT",nextWeek:"dddd, LT",lastDay:"[\u0997\u09A4\u0995\u09BE\u09B2] LT",lastWeek:"[\u0997\u09A4] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u09AA\u09B0\u09C7",past:"%s \u0986\u0997\u09C7",s:"\u0995\u09DF\u09C7\u0995 \u09B8\u09C7\u0995\u09C7\u09A8\u09CD\u09A1",m:"\u098F\u0995 \u09AE\u09BF\u09A8\u09BF\u099F",mm:"%d \u09AE\u09BF\u09A8\u09BF\u099F",h:"\u098F\u0995 \u0998\u09A8\u09CD\u099F\u09BE",hh:"%d \u0998\u09A8\u09CD\u099F\u09BE",d:"\u098F\u0995 \u09A6\u09BF\u09A8",dd:"%d \u09A6\u09BF\u09A8",M:"\u098F\u0995 \u09AE\u09BE\u09B8",MM:"%d \u09AE\u09BE\u09B8",y:"\u098F\u0995 \u09AC\u099B\u09B0",yy:"%d \u09AC\u099B\u09B0"},preparse:function(string){return string.replace(/[১২৩৪৫৬৭৮৯০]/g,function(match){return bn__numberMap[match]})},postformat:function(string){return string.replace(/\d/g,function(match){return bn__symbolMap[match]})},meridiemParse:/রাত|সকাল|দুপুর|বিকাল|রাত/,isPM:function(input){return /^(দুপুর|বিকাল|রাত)$/.test(input)},meridiem:function(hour,minute,isLower){return 4>hour?"\u09B0\u09BE\u09A4":10>hour?"\u09B8\u0995\u09BE\u09B2":17>hour?"\u09A6\u09C1\u09AA\u09C1\u09B0":20>hour?"\u09AC\u09BF\u0995\u09BE\u09B2":"\u09B0\u09BE\u09A4"},week:{dow:0,doy:6}}),bo__symbolMap={1:"\u0F21",2:"\u0F22",3:"\u0F23",4:"\u0F24",5:"\u0F25",6:"\u0F26",7:"\u0F27",8:"\u0F28",9:"\u0F29",0:"\u0F20"},bo__numberMap={"༡":"1","༢":"2","༣":"3","༤":"4","༥":"5","༦":"6","༧":"7","༨":"8","༩":"9","༠":"0"},bo=moment__default.defineLocale("bo",{months:["\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0F44\u0F0B\u0F54\u0F7C","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F42\u0F49\u0F72\u0F66\u0F0B\u0F54","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F42\u0F66\u0F74\u0F58\u0F0B\u0F54","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F5E\u0F72\u0F0B\u0F54","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F63\u0F94\u0F0B\u0F54","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0FB2\u0F74\u0F42\u0F0B\u0F54","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F51\u0F74\u0F53\u0F0B\u0F54","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F62\u0F92\u0FB1\u0F51\u0F0B\u0F54","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0F42\u0F74\u0F0B\u0F54","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F54","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F42\u0F45\u0F72\u0F42\u0F0B\u0F54","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F42\u0F49\u0F72\u0F66\u0F0B\u0F54"],monthsShort:["\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0F44\u0F0B\u0F54\u0F7C","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F42\u0F49\u0F72\u0F66\u0F0B\u0F54","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F42\u0F66\u0F74\u0F58\u0F0B\u0F54","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F5E\u0F72\u0F0B\u0F54","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F63\u0F94\u0F0B\u0F54","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0FB2\u0F74\u0F42\u0F0B\u0F54","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F51\u0F74\u0F53\u0F0B\u0F54","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F62\u0F92\u0FB1\u0F51\u0F0B\u0F54","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0F42\u0F74\u0F0B\u0F54","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F54","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F42\u0F45\u0F72\u0F42\u0F0B\u0F54","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F42\u0F49\u0F72\u0F66\u0F0B\u0F54"],weekdays:["\u0F42\u0F5F\u0F60\u0F0B\u0F49\u0F72\u0F0B\u0F58\u0F0B","\u0F42\u0F5F\u0F60\u0F0B\u0F5F\u0FB3\u0F0B\u0F56\u0F0B","\u0F42\u0F5F\u0F60\u0F0B\u0F58\u0F72\u0F42\u0F0B\u0F51\u0F58\u0F62\u0F0B","\u0F42\u0F5F\u0F60\u0F0B\u0F63\u0FB7\u0F42\u0F0B\u0F54\u0F0B","\u0F42\u0F5F\u0F60\u0F0B\u0F55\u0F74\u0F62\u0F0B\u0F56\u0F74","\u0F42\u0F5F\u0F60\u0F0B\u0F54\u0F0B\u0F66\u0F44\u0F66\u0F0B","\u0F42\u0F5F\u0F60\u0F0B\u0F66\u0FA4\u0F7A\u0F53\u0F0B\u0F54\u0F0B"],weekdaysShort:["\u0F49\u0F72\u0F0B\u0F58\u0F0B","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B","\u0F58\u0F72\u0F42\u0F0B\u0F51\u0F58\u0F62\u0F0B","\u0F63\u0FB7\u0F42\u0F0B\u0F54\u0F0B","\u0F55\u0F74\u0F62\u0F0B\u0F56\u0F74","\u0F54\u0F0B\u0F66\u0F44\u0F66\u0F0B","\u0F66\u0FA4\u0F7A\u0F53\u0F0B\u0F54\u0F0B"],weekdaysMin:["\u0F49\u0F72\u0F0B\u0F58\u0F0B","\u0F5F\u0FB3\u0F0B\u0F56\u0F0B","\u0F58\u0F72\u0F42\u0F0B\u0F51\u0F58\u0F62\u0F0B","\u0F63\u0FB7\u0F42\u0F0B\u0F54\u0F0B","\u0F55\u0F74\u0F62\u0F0B\u0F56\u0F74","\u0F54\u0F0B\u0F66\u0F44\u0F66\u0F0B","\u0F66\u0FA4\u0F7A\u0F53\u0F0B\u0F54\u0F0B"],longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm",LLLL:"dddd, D MMMM YYYY, A h:mm"},calendar:{sameDay:"[\u0F51\u0F72\u0F0B\u0F62\u0F72\u0F44] LT",nextDay:"[\u0F66\u0F44\u0F0B\u0F49\u0F72\u0F53] LT",nextWeek:"[\u0F56\u0F51\u0F74\u0F53\u0F0B\u0F55\u0FB2\u0F42\u0F0B\u0F62\u0F97\u0F7A\u0F66\u0F0B\u0F58], LT",lastDay:"[\u0F41\u0F0B\u0F66\u0F44] LT",lastWeek:"[\u0F56\u0F51\u0F74\u0F53\u0F0B\u0F55\u0FB2\u0F42\u0F0B\u0F58\u0F50\u0F60\u0F0B\u0F58] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0F63\u0F0B",past:"%s \u0F66\u0F94\u0F53\u0F0B\u0F63",s:"\u0F63\u0F58\u0F0B\u0F66\u0F44",m:"\u0F66\u0F90\u0F62\u0F0B\u0F58\u0F0B\u0F42\u0F45\u0F72\u0F42",mm:"%d \u0F66\u0F90\u0F62\u0F0B\u0F58",h:"\u0F46\u0F74\u0F0B\u0F5A\u0F7C\u0F51\u0F0B\u0F42\u0F45\u0F72\u0F42",hh:"%d \u0F46\u0F74\u0F0B\u0F5A\u0F7C\u0F51",d:"\u0F49\u0F72\u0F53\u0F0B\u0F42\u0F45\u0F72\u0F42",dd:"%d \u0F49\u0F72\u0F53\u0F0B",M:"\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F42\u0F45\u0F72\u0F42",MM:"%d \u0F5F\u0FB3\u0F0B\u0F56",y:"\u0F63\u0F7C\u0F0B\u0F42\u0F45\u0F72\u0F42",yy:"%d \u0F63\u0F7C"},preparse:function(string){return string.replace(/[༡༢༣༤༥༦༧༨༩༠]/g,function(match){return bo__numberMap[match]})},postformat:function(string){return string.replace(/\d/g,function(match){return bo__symbolMap[match]})},meridiemParse:/མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,isPM:function(input){return /^(ཉིན་གུང|དགོང་དག|མཚན་མོ)$/.test(input)},meridiem:function(hour,minute,isLower){return 4>hour?"\u0F58\u0F5A\u0F53\u0F0B\u0F58\u0F7C":10>hour?"\u0F5E\u0F7C\u0F42\u0F66\u0F0B\u0F40\u0F66":17>hour?"\u0F49\u0F72\u0F53\u0F0B\u0F42\u0F74\u0F44":20>hour?"\u0F51\u0F42\u0F7C\u0F44\u0F0B\u0F51\u0F42":"\u0F58\u0F5A\u0F53\u0F0B\u0F58\u0F7C"},week:{dow:0,doy:6}}),br=moment__default.defineLocale("br",{months:["Genver","C'hwevrer","Meurzh","Ebrel","Mae","Mezheven","Gouere","Eost","Gwengolo","Here","Du","Kerzu"],monthsShort:["Gen","C'hwe","Meu","Ebr","Mae","Eve","Gou","Eos","Gwe","Her","Du","Ker"],weekdays:["Sul","Lun","Meurzh","Merc'her","Yaou","Gwener","Sadorn"],weekdaysShort:["Sul","Lun","Meu","Mer","Yao","Gwe","Sad"],weekdaysMin:["Su","Lu","Me","Mer","Ya","Gw","Sa"],longDateFormat:{LT:"h[e]mm A",LTS:"h[e]mm:ss A",L:"DD/MM/YYYY",LL:"D [a viz] MMMM YYYY",LLL:"D [a viz] MMMM YYYY h[e]mm A",LLLL:"dddd, D [a viz] MMMM YYYY h[e]mm A"},calendar:{sameDay:"[Hiziv da] LT",nextDay:"[Warc'hoazh da] LT",nextWeek:"dddd [da] LT",lastDay:"[Dec'h da] LT",lastWeek:"dddd [paset da] LT",sameElse:"L"},relativeTime:{future:"a-benn %s",past:"%s 'zo",s:"un nebeud segondenno\xF9",m:"ur vunutenn",mm:relativeTimeWithMutation,h:"un eur",hh:"%d eur",d:"un devezh",dd:relativeTimeWithMutation,M:"ur miz",MM:relativeTimeWithMutation,y:"ur bloaz",yy:specialMutationForYears},ordinalParse:/\d{1,2}(añ|vet)/,ordinal:function(number){var output=1===number?"a\xF1":"vet";return number+output},week:{dow:1,doy:4}}),bs=moment__default.defineLocale("bs",{months:["januar","februar","mart","april","maj","juni","juli","august","septembar","oktobar","novembar","decembar"],monthsShort:["jan.","feb.","mar.","apr.","maj.","jun.","jul.","aug.","sep.","okt.","nov.","dec."],weekdays:["nedjelja","ponedjeljak","utorak","srijeda","\u010Detvrtak","petak","subota"],weekdaysShort:["ned.","pon.","uto.","sri.","\u010Det.","pet.","sub."],weekdaysMin:["ne","po","ut","sr","\u010De","pe","su"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT";}},lastDay:"[ju\u010Der u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[pro\u0161lu] dddd [u] LT";case 6:return"[pro\u0161le] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[pro\u0161li] dddd [u] LT";}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",m:bs__translate,mm:bs__translate,h:bs__translate,hh:bs__translate,d:"dan",dd:bs__translate,M:"mjesec",MM:bs__translate,y:"godinu",yy:bs__translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),ca=moment__default.defineLocale("ca",{months:["gener","febrer","mar\xE7","abril","maig","juny","juliol","agost","setembre","octubre","novembre","desembre"],monthsShort:["gen.","febr.","mar.","abr.","mai.","jun.","jul.","ag.","set.","oct.","nov.","des."],weekdays:["diumenge","dilluns","dimarts","dimecres","dijous","divendres","dissabte"],weekdaysShort:["dg.","dl.","dt.","dc.","dj.","dv.","ds."],weekdaysMin:["Dg","Dl","Dt","Dc","Dj","Dv","Ds"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd D MMMM YYYY H:mm"},calendar:{sameDay:function(){return"[avui a "+(1===this.hours()?"la":"les")+"] LT"},nextDay:function(){return"[dem\xE0 a "+(1===this.hours()?"la":"les")+"] LT"},nextWeek:function(){return"dddd [a "+(1===this.hours()?"la":"les")+"] LT"},lastDay:function(){return"[ahir a "+(1===this.hours()?"la":"les")+"] LT"},lastWeek:function(){return"[el] dddd [passat a "+(1===this.hours()?"la":"les")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"fa %s",s:"uns segons",m:"un minut",mm:"%d minuts",h:"una hora",hh:"%d hores",d:"un dia",dd:"%d dies",M:"un mes",MM:"%d mesos",y:"un any",yy:"%d anys"},ordinalParse:/\d{1,2}(r|n|t|è|a)/,ordinal:function(number,period){var output=1===number?"r":2===number?"n":3===number?"r":4===number?"t":"\xE8";return("w"===period||"W"===period)&&(output="a"),number+output},week:{dow:1,doy:4}}),cs__months=["leden","\xFAnor","b\u0159ezen","duben","kv\u011Bten","\u010Derven","\u010Dervenec","srpen","z\xE1\u0159\xED","\u0159\xEDjen","listopad","prosinec"],cs__monthsShort=["led","\xFAno","b\u0159e","dub","kv\u011B","\u010Dvn","\u010Dvc","srp","z\xE1\u0159","\u0159\xEDj","lis","pro"],cs=moment__default.defineLocale("cs",{months:cs__months,monthsShort:cs__monthsShort,monthsParse:function(months,monthsShort){var _monthsParse=[],i;for(i=0;12>i;i++)_monthsParse[i]=new RegExp("^"+months[i]+"$|^"+monthsShort[i]+"$","i");return _monthsParse}(cs__months,cs__monthsShort),shortMonthsParse:function(monthsShort){var _shortMonthsParse=[],i;for(i=0;12>i;i++)_shortMonthsParse[i]=new RegExp("^"+monthsShort[i]+"$","i");return _shortMonthsParse}(cs__monthsShort),longMonthsParse:function(months){var _longMonthsParse=[],i;for(i=0;12>i;i++)_longMonthsParse[i]=new RegExp("^"+months[i]+"$","i");return _longMonthsParse}(cs__months),weekdays:["ned\u011Ble","pond\u011Bl\xED","\xFAter\xFD","st\u0159eda","\u010Dtvrtek","p\xE1tek","sobota"],weekdaysShort:["ne","po","\xFAt","st","\u010Dt","p\xE1","so"],weekdaysMin:["ne","po","\xFAt","st","\u010Dt","p\xE1","so"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm"},calendar:{sameDay:"[dnes v] LT",nextDay:"[z\xEDtra v] LT",nextWeek:function(){switch(this.day()){case 0:return"[v ned\u011Bli v] LT";case 1:case 2:return"[v] dddd [v] LT";case 3:return"[ve st\u0159edu v] LT";case 4:return"[ve \u010Dtvrtek v] LT";case 5:return"[v p\xE1tek v] LT";case 6:return"[v sobotu v] LT";}},lastDay:"[v\u010Dera v] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulou ned\u011Bli v] LT";case 1:case 2:return"[minul\xE9] dddd [v] LT";case 3:return"[minulou st\u0159edu v] LT";case 4:case 5:return"[minul\xFD] dddd [v] LT";case 6:return"[minulou sobotu v] LT";}},sameElse:"L"},relativeTime:{future:"za %s",past:"p\u0159ed %s",s:cs__translate,m:cs__translate,mm:cs__translate,h:cs__translate,hh:cs__translate,d:cs__translate,dd:cs__translate,M:cs__translate,MM:cs__translate,y:cs__translate,yy:cs__translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),cv=moment__default.defineLocale("cv",{months:["\u043A\u04D1\u0440\u043B\u0430\u0447","\u043D\u0430\u0440\u04D1\u0441","\u043F\u0443\u0448","\u0430\u043A\u0430","\u043C\u0430\u0439","\u04AB\u04D7\u0440\u0442\u043C\u0435","\u0443\u0442\u04D1","\u04AB\u0443\u0440\u043B\u0430","\u0430\u0432\u04D1\u043D","\u044E\u043F\u0430","\u0447\u04F3\u043A","\u0440\u0430\u0448\u0442\u0430\u0432"],monthsShort:["\u043A\u04D1\u0440","\u043D\u0430\u0440","\u043F\u0443\u0448","\u0430\u043A\u0430","\u043C\u0430\u0439","\u04AB\u04D7\u0440","\u0443\u0442\u04D1","\u04AB\u0443\u0440","\u0430\u0432\u043D","\u044E\u043F\u0430","\u0447\u04F3\u043A","\u0440\u0430\u0448"],weekdays:["\u0432\u044B\u0440\u0441\u0430\u0440\u043D\u0438\u043A\u0443\u043D","\u0442\u0443\u043D\u0442\u0438\u043A\u0443\u043D","\u044B\u0442\u043B\u0430\u0440\u0438\u043A\u0443\u043D","\u044E\u043D\u043A\u0443\u043D","\u043A\u04D7\u04AB\u043D\u0435\u0440\u043D\u0438\u043A\u0443\u043D","\u044D\u0440\u043D\u0435\u043A\u0443\u043D","\u0448\u04D1\u043C\u0430\u0442\u043A\u0443\u043D"],weekdaysShort:["\u0432\u044B\u0440","\u0442\u0443\u043D","\u044B\u0442\u043B","\u044E\u043D","\u043A\u04D7\u04AB","\u044D\u0440\u043D","\u0448\u04D1\u043C"],weekdaysMin:["\u0432\u0440","\u0442\u043D","\u044B\u0442","\u044E\u043D","\u043A\u04AB","\u044D\u0440","\u0448\u043C"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"YYYY [\u04AB\u0443\u043B\u0445\u0438] MMMM [\u0443\u0439\u04D1\u0445\u04D7\u043D] D[-\u043C\u04D7\u0448\u04D7]",LLL:"YYYY [\u04AB\u0443\u043B\u0445\u0438] MMMM [\u0443\u0439\u04D1\u0445\u04D7\u043D] D[-\u043C\u04D7\u0448\u04D7], HH:mm",LLLL:"dddd, YYYY [\u04AB\u0443\u043B\u0445\u0438] MMMM [\u0443\u0439\u04D1\u0445\u04D7\u043D] D[-\u043C\u04D7\u0448\u04D7], HH:mm"},calendar:{sameDay:"[\u041F\u0430\u044F\u043D] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",nextDay:"[\u042B\u0440\u0430\u043D] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",lastDay:"[\u04D6\u043D\u0435\u0440] LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",nextWeek:"[\u04AA\u0438\u0442\u0435\u0441] dddd LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",lastWeek:"[\u0418\u0440\u0442\u043D\u04D7] dddd LT [\u0441\u0435\u0445\u0435\u0442\u0440\u0435]",sameElse:"L"},relativeTime:{future:function(output){var affix=/сехет$/i.exec(output)?"\u0440\u0435\u043D":/ҫул$/i.exec(output)?"\u0442\u0430\u043D":"\u0440\u0430\u043D";return output+affix},past:"%s \u043A\u0430\u044F\u043B\u043B\u0430",s:"\u043F\u04D7\u0440-\u0438\u043A \u04AB\u0435\u043A\u043A\u0443\u043D\u0442",m:"\u043F\u04D7\u0440 \u043C\u0438\u043D\u0443\u0442",mm:"%d \u043C\u0438\u043D\u0443\u0442",h:"\u043F\u04D7\u0440 \u0441\u0435\u0445\u0435\u0442",hh:"%d \u0441\u0435\u0445\u0435\u0442",d:"\u043F\u04D7\u0440 \u043A\u0443\u043D",dd:"%d \u043A\u0443\u043D",M:"\u043F\u04D7\u0440 \u0443\u0439\u04D1\u0445",MM:"%d \u0443\u0439\u04D1\u0445",y:"\u043F\u04D7\u0440 \u04AB\u0443\u043B",yy:"%d \u04AB\u0443\u043B"},ordinalParse:/\d{1,2}-мӗш/,ordinal:"%d-\u043C\u04D7\u0448",week:{dow:1,doy:7}}),cy=moment__default.defineLocale("cy",{months:["Ionawr","Chwefror","Mawrth","Ebrill","Mai","Mehefin","Gorffennaf","Awst","Medi","Hydref","Tachwedd","Rhagfyr"],monthsShort:["Ion","Chwe","Maw","Ebr","Mai","Meh","Gor","Aws","Med","Hyd","Tach","Rhag"],weekdays:["Dydd Sul","Dydd Llun","Dydd Mawrth","Dydd Mercher","Dydd Iau","Dydd Gwener","Dydd Sadwrn"],weekdaysShort:["Sul","Llun","Maw","Mer","Iau","Gwe","Sad"],weekdaysMin:["Su","Ll","Ma","Me","Ia","Gw","Sa"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Heddiw am] LT",nextDay:"[Yfory am] LT",nextWeek:"dddd [am] LT",lastDay:"[Ddoe am] LT",lastWeek:"dddd [diwethaf am] LT",sameElse:"L"},relativeTime:{future:"mewn %s",past:"%s yn \xF4l",s:"ychydig eiliadau",m:"munud",mm:"%d munud",h:"awr",hh:"%d awr",d:"diwrnod",dd:"%d diwrnod",M:"mis",MM:"%d mis",y:"blwyddyn",yy:"%d flynedd"},ordinalParse:/\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,ordinal:function(number){var b=number,output="",lookup=["","af","il","ydd","ydd","ed","ed","ed","fed","fed","fed","eg","fed","eg","eg","fed","eg","eg","fed","eg","fed"];return 20<b?40===b||50===b||60===b||80===b||100===b?output="fed":output="ain":0<b&&(output=lookup[b]),number+output},week:{dow:1,doy:4}}),da=moment__default.defineLocale("da",{months:["januar","februar","marts","april","maj","juni","juli","august","september","oktober","november","december"],monthsShort:["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"],weekdays:["s\xF8ndag","mandag","tirsdag","onsdag","torsdag","fredag","l\xF8rdag"],weekdaysShort:["s\xF8n","man","tir","ons","tor","fre","l\xF8r"],weekdaysMin:["s\xF8","ma","ti","on","to","fr","l\xF8"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd [d.] D. MMMM YYYY HH:mm"},calendar:{sameDay:"[I dag kl.] LT",nextDay:"[I morgen kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[I g\xE5r kl.] LT",lastWeek:"[sidste] dddd [kl] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"%s siden",s:"f\xE5 sekunder",m:"et minut",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dage",M:"en m\xE5ned",MM:"%d m\xE5neder",y:"et \xE5r",yy:"%d \xE5r"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),de_at=moment__default.defineLocale("de-at",{months:["J\xE4nner","Februar","M\xE4rz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],monthsShort:["J\xE4n.","Febr.","Mrz.","Apr.","Mai","Jun.","Jul.","Aug.","Sept.","Okt.","Nov.","Dez."],weekdays:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],weekdaysShort:["So.","Mo.","Di.","Mi.","Do.","Fr.","Sa."],weekdaysMin:["So","Mo","Di","Mi","Do","Fr","Sa"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd, D. MMMM YYYY HH:mm"},calendar:{sameDay:"[heute um] LT [Uhr]",sameElse:"L",nextDay:"[morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:de_at__processRelativeTime,mm:"%d Minuten",h:de_at__processRelativeTime,hh:"%d Stunden",d:de_at__processRelativeTime,dd:de_at__processRelativeTime,M:de_at__processRelativeTime,MM:de_at__processRelativeTime,y:de_at__processRelativeTime,yy:de_at__processRelativeTime},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),de=moment__default.defineLocale("de",{months:["Januar","Februar","M\xE4rz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],monthsShort:["Jan.","Febr.","Mrz.","Apr.","Mai","Jun.","Jul.","Aug.","Sept.","Okt.","Nov.","Dez."],weekdays:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],weekdaysShort:["So.","Mo.","Di.","Mi.","Do.","Fr.","Sa."],weekdaysMin:["So","Mo","Di","Mi","Do","Fr","Sa"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY HH:mm",LLLL:"dddd, D. MMMM YYYY HH:mm"},calendar:{sameDay:"[heute um] LT [Uhr]",sameElse:"L",nextDay:"[morgen um] LT [Uhr]",nextWeek:"dddd [um] LT [Uhr]",lastDay:"[gestern um] LT [Uhr]",lastWeek:"[letzten] dddd [um] LT [Uhr]"},relativeTime:{future:"in %s",past:"vor %s",s:"ein paar Sekunden",m:de__processRelativeTime,mm:"%d Minuten",h:de__processRelativeTime,hh:"%d Stunden",d:de__processRelativeTime,dd:de__processRelativeTime,M:de__processRelativeTime,MM:de__processRelativeTime,y:de__processRelativeTime,yy:de__processRelativeTime},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),dv__months=["\u0796\u07AC\u0782\u07AA\u0787\u07A6\u0783\u07A9","\u078A\u07AC\u0784\u07B0\u0783\u07AA\u0787\u07A6\u0783\u07A9","\u0789\u07A7\u0783\u07A8\u0797\u07AA","\u0787\u07AD\u0795\u07B0\u0783\u07A9\u078D\u07AA","\u0789\u07AD","\u0796\u07AB\u0782\u07B0","\u0796\u07AA\u078D\u07A6\u0787\u07A8","\u0787\u07AF\u078E\u07A6\u0790\u07B0\u0793\u07AA","\u0790\u07AC\u0795\u07B0\u0793\u07AC\u0789\u07B0\u0784\u07A6\u0783\u07AA","\u0787\u07AE\u0786\u07B0\u0793\u07AF\u0784\u07A6\u0783\u07AA","\u0782\u07AE\u0788\u07AC\u0789\u07B0\u0784\u07A6\u0783\u07AA","\u0791\u07A8\u0790\u07AC\u0789\u07B0\u0784\u07A6\u0783\u07AA"],dv__weekdays=["\u0787\u07A7\u078B\u07A8\u0787\u07B0\u078C\u07A6","\u0780\u07AF\u0789\u07A6","\u0787\u07A6\u0782\u07B0\u078E\u07A7\u0783\u07A6","\u0784\u07AA\u078B\u07A6","\u0784\u07AA\u0783\u07A7\u0790\u07B0\u078A\u07A6\u078C\u07A8","\u0780\u07AA\u0786\u07AA\u0783\u07AA","\u0780\u07AE\u0782\u07A8\u0780\u07A8\u0783\u07AA"],dv=moment__default.defineLocale("dv",{months:dv__months,monthsShort:dv__months,weekdays:dv__weekdays,weekdaysShort:dv__weekdays,weekdaysMin:["\u0787\u07A7\u078B\u07A8","\u0780\u07AF\u0789\u07A6","\u0787\u07A6\u0782\u07B0","\u0784\u07AA\u078B\u07A6","\u0784\u07AA\u0783\u07A7","\u0780\u07AA\u0786\u07AA","\u0780\u07AE\u0782\u07A8"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"D/M/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},meridiemParse:/މކ|މފ/,isPM:function(input){return""===input},meridiem:function(hour,minute,isLower){return 12>hour?"\u0789\u0786":"\u0789\u078A"},calendar:{sameDay:"[\u0789\u07A8\u0787\u07A6\u078B\u07AA] LT",nextDay:"[\u0789\u07A7\u078B\u07A6\u0789\u07A7] LT",nextWeek:"dddd LT",lastDay:"[\u0787\u07A8\u0787\u07B0\u0794\u07AC] LT",lastWeek:"[\u078A\u07A7\u0787\u07A8\u078C\u07AA\u0788\u07A8] dddd LT",sameElse:"L"},relativeTime:{future:"\u078C\u07AC\u0783\u07AD\u078E\u07A6\u0787\u07A8 %s",past:"\u0786\u07AA\u0783\u07A8\u0782\u07B0 %s",s:"\u0790\u07A8\u0786\u07AA\u0782\u07B0\u078C\u07AA\u0786\u07AE\u0785\u07AC\u0787\u07B0",m:"\u0789\u07A8\u0782\u07A8\u0793\u07AC\u0787\u07B0",mm:"\u0789\u07A8\u0782\u07A8\u0793\u07AA %d",h:"\u078E\u07A6\u0791\u07A8\u0787\u07A8\u0783\u07AC\u0787\u07B0",hh:"\u078E\u07A6\u0791\u07A8\u0787\u07A8\u0783\u07AA %d",d:"\u078B\u07AA\u0788\u07A6\u0780\u07AC\u0787\u07B0",dd:"\u078B\u07AA\u0788\u07A6\u0790\u07B0 %d",M:"\u0789\u07A6\u0780\u07AC\u0787\u07B0",MM:"\u0789\u07A6\u0790\u07B0 %d",y:"\u0787\u07A6\u0780\u07A6\u0783\u07AC\u0787\u07B0",yy:"\u0787\u07A6\u0780\u07A6\u0783\u07AA %d"},preparse:function(string){return string.replace(/،/g,",")},postformat:function(string){return string.replace(/,/g,"\u060C")},week:{dow:7,doy:12}}),el=moment__default.defineLocale("el",{monthsNominativeEl:["\u0399\u03B1\u03BD\u03BF\u03C5\u03AC\u03C1\u03B9\u03BF\u03C2","\u03A6\u03B5\u03B2\u03C1\u03BF\u03C5\u03AC\u03C1\u03B9\u03BF\u03C2","\u039C\u03AC\u03C1\u03C4\u03B9\u03BF\u03C2","\u0391\u03C0\u03C1\u03AF\u03BB\u03B9\u03BF\u03C2","\u039C\u03AC\u03B9\u03BF\u03C2","\u0399\u03BF\u03CD\u03BD\u03B9\u03BF\u03C2","\u0399\u03BF\u03CD\u03BB\u03B9\u03BF\u03C2","\u0391\u03CD\u03B3\u03BF\u03C5\u03C3\u03C4\u03BF\u03C2","\u03A3\u03B5\u03C0\u03C4\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2","\u039F\u03BA\u03C4\u03CE\u03B2\u03C1\u03B9\u03BF\u03C2","\u039D\u03BF\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2","\u0394\u03B5\u03BA\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2"],monthsGenitiveEl:["\u0399\u03B1\u03BD\u03BF\u03C5\u03B1\u03C1\u03AF\u03BF\u03C5","\u03A6\u03B5\u03B2\u03C1\u03BF\u03C5\u03B1\u03C1\u03AF\u03BF\u03C5","\u039C\u03B1\u03C1\u03C4\u03AF\u03BF\u03C5","\u0391\u03C0\u03C1\u03B9\u03BB\u03AF\u03BF\u03C5","\u039C\u03B1\u0390\u03BF\u03C5","\u0399\u03BF\u03C5\u03BD\u03AF\u03BF\u03C5","\u0399\u03BF\u03C5\u03BB\u03AF\u03BF\u03C5","\u0391\u03C5\u03B3\u03BF\u03CD\u03C3\u03C4\u03BF\u03C5","\u03A3\u03B5\u03C0\u03C4\u03B5\u03BC\u03B2\u03C1\u03AF\u03BF\u03C5","\u039F\u03BA\u03C4\u03C9\u03B2\u03C1\u03AF\u03BF\u03C5","\u039D\u03BF\u03B5\u03BC\u03B2\u03C1\u03AF\u03BF\u03C5","\u0394\u03B5\u03BA\u03B5\u03BC\u03B2\u03C1\u03AF\u03BF\u03C5"],months:function(momentToFormat,format){return /D/.test(format.substring(0,format.indexOf("MMMM")))?this._monthsGenitiveEl[momentToFormat.month()]:this._monthsNominativeEl[momentToFormat.month()]},monthsShort:["\u0399\u03B1\u03BD","\u03A6\u03B5\u03B2","\u039C\u03B1\u03C1","\u0391\u03C0\u03C1","\u039C\u03B1\u03CA","\u0399\u03BF\u03C5\u03BD","\u0399\u03BF\u03C5\u03BB","\u0391\u03C5\u03B3","\u03A3\u03B5\u03C0","\u039F\u03BA\u03C4","\u039D\u03BF\u03B5","\u0394\u03B5\u03BA"],weekdays:["\u039A\u03C5\u03C1\u03B9\u03B1\u03BA\u03AE","\u0394\u03B5\u03C5\u03C4\u03AD\u03C1\u03B1","\u03A4\u03C1\u03AF\u03C4\u03B7","\u03A4\u03B5\u03C4\u03AC\u03C1\u03C4\u03B7","\u03A0\u03AD\u03BC\u03C0\u03C4\u03B7","\u03A0\u03B1\u03C1\u03B1\u03C3\u03BA\u03B5\u03C5\u03AE","\u03A3\u03AC\u03B2\u03B2\u03B1\u03C4\u03BF"],weekdaysShort:["\u039A\u03C5\u03C1","\u0394\u03B5\u03C5","\u03A4\u03C1\u03B9","\u03A4\u03B5\u03C4","\u03A0\u03B5\u03BC","\u03A0\u03B1\u03C1","\u03A3\u03B1\u03B2"],weekdaysMin:["\u039A\u03C5","\u0394\u03B5","\u03A4\u03C1","\u03A4\u03B5","\u03A0\u03B5","\u03A0\u03B1","\u03A3\u03B1"],meridiem:function(hours,minutes,isLower){return 11<hours?isLower?"\u03BC\u03BC":"\u039C\u039C":isLower?"\u03C0\u03BC":"\u03A0\u039C"},isPM:function(input){return"\u03BC"===(input+"").toLowerCase()[0]},meridiemParse:/[ΠΜ]\.?Μ?\.?/i,longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendarEl:{sameDay:"[\u03A3\u03AE\u03BC\u03B5\u03C1\u03B1 {}] LT",nextDay:"[\u0391\u03CD\u03C1\u03B9\u03BF {}] LT",nextWeek:"dddd [{}] LT",lastDay:"[\u03A7\u03B8\u03B5\u03C2 {}] LT",lastWeek:function(){switch(this.day()){case 6:return"[\u03C4\u03BF \u03C0\u03C1\u03BF\u03B7\u03B3\u03BF\u03CD\u03BC\u03B5\u03BD\u03BF] dddd [{}] LT";default:return"[\u03C4\u03B7\u03BD \u03C0\u03C1\u03BF\u03B7\u03B3\u03BF\u03CD\u03BC\u03B5\u03BD\u03B7] dddd [{}] LT";}},sameElse:"L"},calendar:function(key,mom){var output=this._calendarEl[key],hours=mom&&mom.hours();return isFunction(output)&&(output=output.apply(mom)),output.replace("{}",1==hours%12?"\u03C3\u03C4\u03B7":"\u03C3\u03C4\u03B9\u03C2")},relativeTime:{future:"\u03C3\u03B5 %s",past:"%s \u03C0\u03C1\u03B9\u03BD",s:"\u03BB\u03AF\u03B3\u03B1 \u03B4\u03B5\u03C5\u03C4\u03B5\u03C1\u03CC\u03BB\u03B5\u03C0\u03C4\u03B1",m:"\u03AD\u03BD\u03B1 \u03BB\u03B5\u03C0\u03C4\u03CC",mm:"%d \u03BB\u03B5\u03C0\u03C4\u03AC",h:"\u03BC\u03AF\u03B1 \u03CE\u03C1\u03B1",hh:"%d \u03CE\u03C1\u03B5\u03C2",d:"\u03BC\u03AF\u03B1 \u03BC\u03AD\u03C1\u03B1",dd:"%d \u03BC\u03AD\u03C1\u03B5\u03C2",M:"\u03AD\u03BD\u03B1\u03C2 \u03BC\u03AE\u03BD\u03B1\u03C2",MM:"%d \u03BC\u03AE\u03BD\u03B5\u03C2",y:"\u03AD\u03BD\u03B1\u03C2 \u03C7\u03C1\u03CC\u03BD\u03BF\u03C2",yy:"%d \u03C7\u03C1\u03CC\u03BD\u03B9\u03B1"},ordinalParse:/\d{1,2}η/,ordinal:"%d\u03B7",week:{dow:1,doy:4}}),en_au=moment__default.defineLocale("en-au",{months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],weekdaysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(number){var b=number%10,output=1==~~(number%100/10)?"th":1==b?"st":2==b?"nd":3==b?"rd":"th";return number+output},week:{dow:1,doy:4}}),en_ca=moment__default.defineLocale("en-ca",{months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],weekdaysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"YYYY-MM-DD",LL:"D MMMM, YYYY",LLL:"D MMMM, YYYY h:mm A",LLLL:"dddd, D MMMM, YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(number){var b=number%10,output=1==~~(number%100/10)?"th":1==b?"st":2==b?"nd":3==b?"rd":"th";return number+output}}),en_gb=moment__default.defineLocale("en-gb",{months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],weekdaysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(number){var b=number%10,output=1==~~(number%100/10)?"th":1==b?"st":2==b?"nd":3==b?"rd":"th";return number+output},week:{dow:1,doy:4}}),en_ie=moment__default.defineLocale("en-ie",{months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],weekdaysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(number){var b=number%10,output=1==~~(number%100/10)?"th":1==b?"st":2==b?"nd":3==b?"rd":"th";return number+output},week:{dow:1,doy:4}}),en_nz=moment__default.defineLocale("en-nz",{months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],weekdaysMin:["Su","Mo","Tu","We","Th","Fr","Sa"],longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinalParse:/\d{1,2}(st|nd|rd|th)/,ordinal:function(number){var b=number%10,output=1==~~(number%100/10)?"th":1==b?"st":2==b?"nd":3==b?"rd":"th";return number+output},week:{dow:1,doy:4}}),eo=moment__default.defineLocale("eo",{months:["januaro","februaro","marto","aprilo","majo","junio","julio","a\u016Dgusto","septembro","oktobro","novembro","decembro"],monthsShort:["jan","feb","mar","apr","maj","jun","jul","a\u016Dg","sep","okt","nov","dec"],weekdays:["Diman\u0109o","Lundo","Mardo","Merkredo","\u0134a\u016Ddo","Vendredo","Sabato"],weekdaysShort:["Dim","Lun","Mard","Merk","\u0134a\u016D","Ven","Sab"],weekdaysMin:["Di","Lu","Ma","Me","\u0134a","Ve","Sa"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D[-an de] MMMM, YYYY",LLL:"D[-an de] MMMM, YYYY HH:mm",LLLL:"dddd, [la] D[-an de] MMMM, YYYY HH:mm"},meridiemParse:/[ap]\.t\.m/i,isPM:function(input){return"p"===input.charAt(0).toLowerCase()},meridiem:function(hours,minutes,isLower){return 11<hours?isLower?"p.t.m.":"P.T.M.":isLower?"a.t.m.":"A.T.M."},calendar:{sameDay:"[Hodia\u016D je] LT",nextDay:"[Morga\u016D je] LT",nextWeek:"dddd [je] LT",lastDay:"[Hiera\u016D je] LT",lastWeek:"[pasinta] dddd [je] LT",sameElse:"L"},relativeTime:{future:"je %s",past:"anta\u016D %s",s:"sekundoj",m:"minuto",mm:"%d minutoj",h:"horo",hh:"%d horoj",d:"tago",dd:"%d tagoj",M:"monato",MM:"%d monatoj",y:"jaro",yy:"%d jaroj"},ordinalParse:/\d{1,2}a/,ordinal:"%da",week:{dow:1,doy:7}}),monthsShortDot=["ene.","feb.","mar.","abr.","may.","jun.","jul.","ago.","sep.","oct.","nov.","dic."],es__monthsShort=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],es=moment__default.defineLocale("es",{months:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],monthsShort:function(m,format){return /-MMM-/.test(format)?es__monthsShort[m.month()]:monthsShortDot[m.month()]},weekdays:["domingo","lunes","martes","mi\xE9rcoles","jueves","viernes","s\xE1bado"],weekdaysShort:["dom.","lun.","mar.","mi\xE9.","jue.","vie.","s\xE1b."],weekdaysMin:["do","lu","ma","mi","ju","vi","s\xE1"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY H:mm",LLLL:"dddd, D [de] MMMM [de] YYYY H:mm"},calendar:{sameDay:function(){return"[hoy a la"+(1===this.hours()?"":"s")+"] LT"},nextDay:function(){return"[ma\xF1ana a la"+(1===this.hours()?"":"s")+"] LT"},nextWeek:function(){return"dddd [a la"+(1===this.hours()?"":"s")+"] LT"},lastDay:function(){return"[ayer a la"+(1===this.hours()?"":"s")+"] LT"},lastWeek:function(){return"[el] dddd [pasado a la"+(1===this.hours()?"":"s")+"] LT"},sameElse:"L"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un d\xEDa",dd:"%d d\xEDas",M:"un mes",MM:"%d meses",y:"un a\xF1o",yy:"%d a\xF1os"},ordinalParse:/\d{1,2}º/,ordinal:"%d\xBA",week:{dow:1,doy:4}}),et=moment__default.defineLocale("et",{months:["jaanuar","veebruar","m\xE4rts","aprill","mai","juuni","juuli","august","september","oktoober","november","detsember"],monthsShort:["jaan","veebr","m\xE4rts","apr","mai","juuni","juuli","aug","sept","okt","nov","dets"],weekdays:["p\xFChap\xE4ev","esmasp\xE4ev","teisip\xE4ev","kolmap\xE4ev","neljap\xE4ev","reede","laup\xE4ev"],weekdaysShort:["P","E","T","K","N","R","L"],weekdaysMin:["P","E","T","K","N","R","L"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[T\xE4na,] LT",nextDay:"[Homme,] LT",nextWeek:"[J\xE4rgmine] dddd LT",lastDay:"[Eile,] LT",lastWeek:"[Eelmine] dddd LT",sameElse:"L"},relativeTime:{future:"%s p\xE4rast",past:"%s tagasi",s:et__processRelativeTime,m:et__processRelativeTime,mm:et__processRelativeTime,h:et__processRelativeTime,hh:et__processRelativeTime,d:et__processRelativeTime,dd:"%d p\xE4eva",M:et__processRelativeTime,MM:et__processRelativeTime,y:et__processRelativeTime,yy:et__processRelativeTime},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),eu=moment__default.defineLocale("eu",{months:["urtarrila","otsaila","martxoa","apirila","maiatza","ekaina","uztaila","abuztua","iraila","urria","azaroa","abendua"],monthsShort:["urt.","ots.","mar.","api.","mai.","eka.","uzt.","abu.","ira.","urr.","aza.","abe."],weekdays:["igandea","astelehena","asteartea","asteazkena","osteguna","ostirala","larunbata"],weekdaysShort:["ig.","al.","ar.","az.","og.","ol.","lr."],weekdaysMin:["ig","al","ar","az","og","ol","lr"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY[ko] MMMM[ren] D[a]",LLL:"YYYY[ko] MMMM[ren] D[a] HH:mm",LLLL:"dddd, YYYY[ko] MMMM[ren] D[a] HH:mm",l:"YYYY-M-D",ll:"YYYY[ko] MMM D[a]",lll:"YYYY[ko] MMM D[a] HH:mm",llll:"ddd, YYYY[ko] MMM D[a] HH:mm"},calendar:{sameDay:"[gaur] LT[etan]",nextDay:"[bihar] LT[etan]",nextWeek:"dddd LT[etan]",lastDay:"[atzo] LT[etan]",lastWeek:"[aurreko] dddd LT[etan]",sameElse:"L"},relativeTime:{future:"%s barru",past:"duela %s",s:"segundo batzuk",m:"minutu bat",mm:"%d minutu",h:"ordu bat",hh:"%d ordu",d:"egun bat",dd:"%d egun",M:"hilabete bat",MM:"%d hilabete",y:"urte bat",yy:"%d urte"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),fa__symbolMap={1:"\u06F1",2:"\u06F2",3:"\u06F3",4:"\u06F4",5:"\u06F5",6:"\u06F6",7:"\u06F7",8:"\u06F8",9:"\u06F9",0:"\u06F0"},fa__numberMap={"۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","۰":"0"},fa=moment__default.defineLocale("fa",{months:["\u0698\u0627\u0646\u0648\u06CC\u0647","\u0641\u0648\u0631\u06CC\u0647","\u0645\u0627\u0631\u0633","\u0622\u0648\u0631\u06CC\u0644","\u0645\u0647","\u0698\u0648\u0626\u0646","\u0698\u0648\u0626\u06CC\u0647","\u0627\u0648\u062A","\u0633\u067E\u062A\u0627\u0645\u0628\u0631","\u0627\u06A9\u062A\u0628\u0631","\u0646\u0648\u0627\u0645\u0628\u0631","\u062F\u0633\u0627\u0645\u0628\u0631"],monthsShort:["\u0698\u0627\u0646\u0648\u06CC\u0647","\u0641\u0648\u0631\u06CC\u0647","\u0645\u0627\u0631\u0633","\u0622\u0648\u0631\u06CC\u0644","\u0645\u0647","\u0698\u0648\u0626\u0646","\u0698\u0648\u0626\u06CC\u0647","\u0627\u0648\u062A","\u0633\u067E\u062A\u0627\u0645\u0628\u0631","\u0627\u06A9\u062A\u0628\u0631","\u0646\u0648\u0627\u0645\u0628\u0631","\u062F\u0633\u0627\u0645\u0628\u0631"],weekdays:["\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647","\u062F\u0648\u0634\u0646\u0628\u0647","\u0633\u0647\u200C\u0634\u0646\u0628\u0647","\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647","\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647","\u062C\u0645\u0639\u0647","\u0634\u0646\u0628\u0647"],weekdaysShort:["\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647","\u062F\u0648\u0634\u0646\u0628\u0647","\u0633\u0647\u200C\u0634\u0646\u0628\u0647","\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647","\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647","\u062C\u0645\u0639\u0647","\u0634\u0646\u0628\u0647"],weekdaysMin:["\u06CC","\u062F","\u0633","\u0686","\u067E","\u062C","\u0634"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},meridiemParse:/قبل از ظهر|بعد از ظهر/,isPM:function(input){return /بعد از ظهر/.test(input)},meridiem:function(hour,minute,isLower){return 12>hour?"\u0642\u0628\u0644 \u0627\u0632 \u0638\u0647\u0631":"\u0628\u0639\u062F \u0627\u0632 \u0638\u0647\u0631"},calendar:{sameDay:"[\u0627\u0645\u0631\u0648\u0632 \u0633\u0627\u0639\u062A] LT",nextDay:"[\u0641\u0631\u062F\u0627 \u0633\u0627\u0639\u062A] LT",nextWeek:"dddd [\u0633\u0627\u0639\u062A] LT",lastDay:"[\u062F\u06CC\u0631\u0648\u0632 \u0633\u0627\u0639\u062A] LT",lastWeek:"dddd [\u067E\u06CC\u0634] [\u0633\u0627\u0639\u062A] LT",sameElse:"L"},relativeTime:{future:"\u062F\u0631 %s",past:"%s \u067E\u06CC\u0634",s:"\u0686\u0646\u062F\u06CC\u0646 \u062B\u0627\u0646\u06CC\u0647",m:"\u06CC\u06A9 \u062F\u0642\u06CC\u0642\u0647",mm:"%d \u062F\u0642\u06CC\u0642\u0647",h:"\u06CC\u06A9 \u0633\u0627\u0639\u062A",hh:"%d \u0633\u0627\u0639\u062A",d:"\u06CC\u06A9 \u0631\u0648\u0632",dd:"%d \u0631\u0648\u0632",M:"\u06CC\u06A9 \u0645\u0627\u0647",MM:"%d \u0645\u0627\u0647",y:"\u06CC\u06A9 \u0633\u0627\u0644",yy:"%d \u0633\u0627\u0644"},preparse:function(string){return string.replace(/[۰-۹]/g,function(match){return fa__numberMap[match]}).replace(/،/g,",")},postformat:function(string){return string.replace(/\d/g,function(match){return fa__symbolMap[match]}).replace(/,/g,"\u060C")},ordinalParse:/\d{1,2}م/,ordinal:"%d\u0645",week:{dow:6,doy:12}}),numbersPast=["nolla","yksi","kaksi","kolme","nelj\xE4","viisi","kuusi","seitsem\xE4n","kahdeksan","yhdeks\xE4n"],numbersFuture=["nolla","yhden","kahden","kolmen","nelj\xE4n","viiden","kuuden",numbersPast[7],numbersPast[8],numbersPast[9]],fi=moment__default.defineLocale("fi",{months:["tammikuu","helmikuu","maaliskuu","huhtikuu","toukokuu","kes\xE4kuu","hein\xE4kuu","elokuu","syyskuu","lokakuu","marraskuu","joulukuu"],monthsShort:["tammi","helmi","maalis","huhti","touko","kes\xE4","hein\xE4","elo","syys","loka","marras","joulu"],weekdays:["sunnuntai","maanantai","tiistai","keskiviikko","torstai","perjantai","lauantai"],weekdaysShort:["su","ma","ti","ke","to","pe","la"],weekdaysMin:["su","ma","ti","ke","to","pe","la"],longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"Do MMMM[ta] YYYY",LLL:"Do MMMM[ta] YYYY, [klo] HH.mm",LLLL:"dddd, Do MMMM[ta] YYYY, [klo] HH.mm",l:"D.M.YYYY",ll:"Do MMM YYYY",lll:"Do MMM YYYY, [klo] HH.mm",llll:"ddd, Do MMM YYYY, [klo] HH.mm"},calendar:{sameDay:"[t\xE4n\xE4\xE4n] [klo] LT",nextDay:"[huomenna] [klo] LT",nextWeek:"dddd [klo] LT",lastDay:"[eilen] [klo] LT",lastWeek:"[viime] dddd[na] [klo] LT",sameElse:"L"},relativeTime:{future:"%s p\xE4\xE4st\xE4",past:"%s sitten",s:fi__translate,m:fi__translate,mm:fi__translate,h:fi__translate,hh:fi__translate,d:fi__translate,dd:fi__translate,M:fi__translate,MM:fi__translate,y:fi__translate,yy:fi__translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),fo=moment__default.defineLocale("fo",{months:["januar","februar","mars","apr\xEDl","mai","juni","juli","august","september","oktober","november","desember"],monthsShort:["jan","feb","mar","apr","mai","jun","jul","aug","sep","okt","nov","des"],weekdays:["sunnudagur","m\xE1nadagur","t\xFDsdagur","mikudagur","h\xF3sdagur","fr\xEDggjadagur","leygardagur"],weekdaysShort:["sun","m\xE1n","t\xFDs","mik","h\xF3s","fr\xED","ley"],weekdaysMin:["su","m\xE1","t\xFD","mi","h\xF3","fr","le"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D. MMMM, YYYY HH:mm"},calendar:{sameDay:"[\xCD dag kl.] LT",nextDay:"[\xCD morgin kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[\xCD gj\xE1r kl.] LT",lastWeek:"[s\xED\xF0stu] dddd [kl] LT",sameElse:"L"},relativeTime:{future:"um %s",past:"%s s\xED\xF0ani",s:"f\xE1 sekund",m:"ein minutt",mm:"%d minuttir",h:"ein t\xEDmi",hh:"%d t\xEDmar",d:"ein dagur",dd:"%d dagar",M:"ein m\xE1na\xF0i",MM:"%d m\xE1na\xF0ir",y:"eitt \xE1r",yy:"%d \xE1r"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),fr_ca=moment__default.defineLocale("fr-ca",{months:["janvier","f\xE9vrier","mars","avril","mai","juin","juillet","ao\xFBt","septembre","octobre","novembre","d\xE9cembre"],monthsShort:["janv.","f\xE9vr.","mars","avr.","mai","juin","juil.","ao\xFBt","sept.","oct.","nov.","d\xE9c."],weekdays:["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],weekdaysShort:["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],weekdaysMin:["Di","Lu","Ma","Me","Je","Ve","Sa"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd'hui \xE0] LT",nextDay:"[Demain \xE0] LT",nextWeek:"dddd [\xE0] LT",lastDay:"[Hier \xE0] LT",lastWeek:"dddd [dernier \xE0] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinalParse:/\d{1,2}(er|e)/,ordinal:function(number){return number+(1===number?"er":"e")}}),fr_ch=moment__default.defineLocale("fr-ch",{months:["janvier","f\xE9vrier","mars","avril","mai","juin","juillet","ao\xFBt","septembre","octobre","novembre","d\xE9cembre"],monthsShort:["janv.","f\xE9vr.","mars","avr.","mai","juin","juil.","ao\xFBt","sept.","oct.","nov.","d\xE9c."],weekdays:["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],weekdaysShort:["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],weekdaysMin:["Di","Lu","Ma","Me","Je","Ve","Sa"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd'hui \xE0] LT",nextDay:"[Demain \xE0] LT",nextWeek:"dddd [\xE0] LT",lastDay:"[Hier \xE0] LT",lastWeek:"dddd [dernier \xE0] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinalParse:/\d{1,2}(er|e)/,ordinal:function(number){return number+(1===number?"er":"e")},week:{dow:1,doy:4}}),fr=moment__default.defineLocale("fr",{months:["janvier","f\xE9vrier","mars","avril","mai","juin","juillet","ao\xFBt","septembre","octobre","novembre","d\xE9cembre"],monthsShort:["janv.","f\xE9vr.","mars","avr.","mai","juin","juil.","ao\xFBt","sept.","oct.","nov.","d\xE9c."],weekdays:["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],weekdaysShort:["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],weekdaysMin:["Di","Lu","Ma","Me","Je","Ve","Sa"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Aujourd'hui \xE0] LT",nextDay:"[Demain \xE0] LT",nextWeek:"dddd [\xE0] LT",lastDay:"[Hier \xE0] LT",lastWeek:"dddd [dernier \xE0] LT",sameElse:"L"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinalParse:/\d{1,2}(er|)/,ordinal:function(number){return number+(1===number?"er":"")},week:{dow:1,doy:4}}),fy__monthsShortWithDots=["jan.","feb.","mrt.","apr.","mai","jun.","jul.","aug.","sep.","okt.","nov.","des."],fy__monthsShortWithoutDots=["jan","feb","mrt","apr","mai","jun","jul","aug","sep","okt","nov","des"],fy=moment__default.defineLocale("fy",{months:["jannewaris","febrewaris","maart","april","maaie","juny","july","augustus","septimber","oktober","novimber","desimber"],monthsShort:function(m,format){return /-MMM-/.test(format)?fy__monthsShortWithoutDots[m.month()]:fy__monthsShortWithDots[m.month()]},weekdays:["snein","moandei","tiisdei","woansdei","tongersdei","freed","sneon"],weekdaysShort:["si.","mo.","ti.","wo.","to.","fr.","so."],weekdaysMin:["Si","Mo","Ti","Wo","To","Fr","So"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[hjoed om] LT",nextDay:"[moarn om] LT",nextWeek:"dddd [om] LT",lastDay:"[juster om] LT",lastWeek:"[\xF4fr\xFBne] dddd [om] LT",sameElse:"L"},relativeTime:{future:"oer %s",past:"%s lyn",s:"in pear sekonden",m:"ien min\xFAt",mm:"%d minuten",h:"ien oere",hh:"%d oeren",d:"ien dei",dd:"%d dagen",M:"ien moanne",MM:"%d moannen",y:"ien jier",yy:"%d jierren"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(number){return number+(1===number||8===number||20<=number?"ste":"de")},week:{dow:1,doy:4}}),gd__months=["Am Faoilleach","An Gearran","Am M\xE0rt","An Giblean","An C\xE8itean","An t-\xD2gmhios","An t-Iuchar","An L\xF9nastal","An t-Sultain","An D\xE0mhair","An t-Samhain","An D\xF9bhlachd"],gd__monthsShort=["Faoi","Gear","M\xE0rt","Gibl","C\xE8it","\xD2gmh","Iuch","L\xF9n","Sult","D\xE0mh","Samh","D\xF9bh"],gd__weekdays=["Did\xF2mhnaich","Diluain","Dim\xE0irt","Diciadain","Diardaoin","Dihaoine","Disathairne"],weekdaysShort=["Did","Dil","Dim","Dic","Dia","Dih","Dis"],weekdaysMin=["D\xF2","Lu","M\xE0","Ci","Ar","Ha","Sa"],gd=moment__default.defineLocale("gd",{months:gd__months,monthsShort:gd__monthsShort,monthsParseExact:!0,weekdays:gd__weekdays,weekdaysShort:weekdaysShort,weekdaysMin:weekdaysMin,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[An-diugh aig] LT",nextDay:"[A-m\xE0ireach aig] LT",nextWeek:"dddd [aig] LT",lastDay:"[An-d\xE8 aig] LT",lastWeek:"dddd [seo chaidh] [aig] LT",sameElse:"L"},relativeTime:{future:"ann an %s",past:"bho chionn %s",s:"beagan diogan",m:"mionaid",mm:"%d mionaidean",h:"uair",hh:"%d uairean",d:"latha",dd:"%d latha",M:"m\xECos",MM:"%d m\xECosan",y:"bliadhna",yy:"%d bliadhna"},ordinalParse:/\d{1,2}(d|na|mh)/,ordinal:function(number){var output=1===number?"d":2==number%10?"na":"mh";return number+output},week:{dow:1,doy:4}}),gl=moment__default.defineLocale("gl",{months:["Xaneiro","Febreiro","Marzo","Abril","Maio","Xu\xF1o","Xullo","Agosto","Setembro","Outubro","Novembro","Decembro"],monthsShort:["Xan.","Feb.","Mar.","Abr.","Mai.","Xu\xF1.","Xul.","Ago.","Set.","Out.","Nov.","Dec."],weekdays:["Domingo","Luns","Martes","M\xE9rcores","Xoves","Venres","S\xE1bado"],weekdaysShort:["Dom.","Lun.","Mar.","M\xE9r.","Xov.","Ven.","S\xE1b."],weekdaysMin:["Do","Lu","Ma","M\xE9","Xo","Ve","S\xE1"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd D MMMM YYYY H:mm"},calendar:{sameDay:function(){return"[hoxe "+(1===this.hours()?"\xE1":"\xE1s")+"] LT"},nextDay:function(){return"[ma\xF1\xE1 "+(1===this.hours()?"\xE1":"\xE1s")+"] LT"},nextWeek:function(){return"dddd ["+(1===this.hours()?"a":"\xE1s")+"] LT"},lastDay:function(){return"[onte "+(1===this.hours()?"a":"\xE1")+"] LT"},lastWeek:function(){return"[o] dddd [pasado "+(1===this.hours()?"a":"\xE1s")+"] LT"},sameElse:"L"},relativeTime:{future:function(str){return"uns segundos"===str?"nuns segundos":"en "+str},past:"hai %s",s:"uns segundos",m:"un minuto",mm:"%d minutos",h:"unha hora",hh:"%d horas",d:"un d\xEDa",dd:"%d d\xEDas",M:"un mes",MM:"%d meses",y:"un ano",yy:"%d anos"},ordinalParse:/\d{1,2}º/,ordinal:"%d\xBA",week:{dow:1,doy:7}}),he=moment__default.defineLocale("he",{months:["\u05D9\u05E0\u05D5\u05D0\u05E8","\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8","\u05DE\u05E8\u05E5","\u05D0\u05E4\u05E8\u05D9\u05DC","\u05DE\u05D0\u05D9","\u05D9\u05D5\u05E0\u05D9","\u05D9\u05D5\u05DC\u05D9","\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8","\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8","\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8","\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8","\u05D3\u05E6\u05DE\u05D1\u05E8"],monthsShort:["\u05D9\u05E0\u05D5\u05F3","\u05E4\u05D1\u05E8\u05F3","\u05DE\u05E8\u05E5","\u05D0\u05E4\u05E8\u05F3","\u05DE\u05D0\u05D9","\u05D9\u05D5\u05E0\u05D9","\u05D9\u05D5\u05DC\u05D9","\u05D0\u05D5\u05D2\u05F3","\u05E1\u05E4\u05D8\u05F3","\u05D0\u05D5\u05E7\u05F3","\u05E0\u05D5\u05D1\u05F3","\u05D3\u05E6\u05DE\u05F3"],weekdays:["\u05E8\u05D0\u05E9\u05D5\u05DF","\u05E9\u05E0\u05D9","\u05E9\u05DC\u05D9\u05E9\u05D9","\u05E8\u05D1\u05D9\u05E2\u05D9","\u05D7\u05DE\u05D9\u05E9\u05D9","\u05E9\u05D9\u05E9\u05D9","\u05E9\u05D1\u05EA"],weekdaysShort:["\u05D0\u05F3","\u05D1\u05F3","\u05D2\u05F3","\u05D3\u05F3","\u05D4\u05F3","\u05D5\u05F3","\u05E9\u05F3"],weekdaysMin:["\u05D0","\u05D1","\u05D2","\u05D3","\u05D4","\u05D5","\u05E9"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [\u05D1]MMMM YYYY",LLL:"D [\u05D1]MMMM YYYY HH:mm",LLLL:"dddd, D [\u05D1]MMMM YYYY HH:mm",l:"D/M/YYYY",ll:"D MMM YYYY",lll:"D MMM YYYY HH:mm",llll:"ddd, D MMM YYYY HH:mm"},calendar:{sameDay:"[\u05D4\u05D9\u05D5\u05DD \u05D1\u05BE]LT",nextDay:"[\u05DE\u05D7\u05E8 \u05D1\u05BE]LT",nextWeek:"dddd [\u05D1\u05E9\u05E2\u05D4] LT",lastDay:"[\u05D0\u05EA\u05DE\u05D5\u05DC \u05D1\u05BE]LT",lastWeek:"[\u05D1\u05D9\u05D5\u05DD] dddd [\u05D4\u05D0\u05D7\u05E8\u05D5\u05DF \u05D1\u05E9\u05E2\u05D4] LT",sameElse:"L"},relativeTime:{future:"\u05D1\u05E2\u05D5\u05D3 %s",past:"\u05DC\u05E4\u05E0\u05D9 %s",s:"\u05DE\u05E1\u05E4\u05E8 \u05E9\u05E0\u05D9\u05D5\u05EA",m:"\u05D3\u05E7\u05D4",mm:"%d \u05D3\u05E7\u05D5\u05EA",h:"\u05E9\u05E2\u05D4",hh:function(number){return 2===number?"\u05E9\u05E2\u05EA\u05D9\u05D9\u05DD":number+" \u05E9\u05E2\u05D5\u05EA"},d:"\u05D9\u05D5\u05DD",dd:function(number){return 2===number?"\u05D9\u05D5\u05DE\u05D9\u05D9\u05DD":number+" \u05D9\u05DE\u05D9\u05DD"},M:"\u05D7\u05D5\u05D3\u05E9",MM:function(number){return 2===number?"\u05D7\u05D5\u05D3\u05E9\u05D9\u05D9\u05DD":number+" \u05D7\u05D5\u05D3\u05E9\u05D9\u05DD"},y:"\u05E9\u05E0\u05D4",yy:function(number){return 2===number?"\u05E9\u05E0\u05EA\u05D9\u05D9\u05DD":0==number%10&&10!==number?number+" \u05E9\u05E0\u05D4":number+" \u05E9\u05E0\u05D9\u05DD"}}}),hi__symbolMap={1:"\u0967",2:"\u0968",3:"\u0969",4:"\u096A",5:"\u096B",6:"\u096C",7:"\u096D",8:"\u096E",9:"\u096F",0:"\u0966"},hi__numberMap={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"},hi=moment__default.defineLocale("hi",{months:["\u091C\u0928\u0935\u0930\u0940","\u092B\u093C\u0930\u0935\u0930\u0940","\u092E\u093E\u0930\u094D\u091A","\u0905\u092A\u094D\u0930\u0948\u0932","\u092E\u0908","\u091C\u0942\u0928","\u091C\u0941\u0932\u093E\u0908","\u0905\u0917\u0938\u094D\u0924","\u0938\u093F\u0924\u092E\u094D\u092C\u0930","\u0905\u0915\u094D\u091F\u0942\u092C\u0930","\u0928\u0935\u092E\u094D\u092C\u0930","\u0926\u093F\u0938\u092E\u094D\u092C\u0930"],monthsShort:["\u091C\u0928.","\u092B\u093C\u0930.","\u092E\u093E\u0930\u094D\u091A","\u0905\u092A\u094D\u0930\u0948.","\u092E\u0908","\u091C\u0942\u0928","\u091C\u0941\u0932.","\u0905\u0917.","\u0938\u093F\u0924.","\u0905\u0915\u094D\u091F\u0942.","\u0928\u0935.","\u0926\u093F\u0938."],weekdays:["\u0930\u0935\u093F\u0935\u093E\u0930","\u0938\u094B\u092E\u0935\u093E\u0930","\u092E\u0902\u0917\u0932\u0935\u093E\u0930","\u092C\u0941\u0927\u0935\u093E\u0930","\u0917\u0941\u0930\u0942\u0935\u093E\u0930","\u0936\u0941\u0915\u094D\u0930\u0935\u093E\u0930","\u0936\u0928\u093F\u0935\u093E\u0930"],weekdaysShort:["\u0930\u0935\u093F","\u0938\u094B\u092E","\u092E\u0902\u0917\u0932","\u092C\u0941\u0927","\u0917\u0941\u0930\u0942","\u0936\u0941\u0915\u094D\u0930","\u0936\u0928\u093F"],weekdaysMin:["\u0930","\u0938\u094B","\u092E\u0902","\u092C\u0941","\u0917\u0941","\u0936\u0941","\u0936"],longDateFormat:{LT:"A h:mm \u092C\u091C\u0947",LTS:"A h:mm:ss \u092C\u091C\u0947",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm \u092C\u091C\u0947",LLLL:"dddd, D MMMM YYYY, A h:mm \u092C\u091C\u0947"},calendar:{sameDay:"[\u0906\u091C] LT",nextDay:"[\u0915\u0932] LT",nextWeek:"dddd, LT",lastDay:"[\u0915\u0932] LT",lastWeek:"[\u092A\u093F\u091B\u0932\u0947] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u092E\u0947\u0902",past:"%s \u092A\u0939\u0932\u0947",s:"\u0915\u0941\u091B \u0939\u0940 \u0915\u094D\u0937\u0923",m:"\u090F\u0915 \u092E\u093F\u0928\u091F",mm:"%d \u092E\u093F\u0928\u091F",h:"\u090F\u0915 \u0918\u0902\u091F\u093E",hh:"%d \u0918\u0902\u091F\u0947",d:"\u090F\u0915 \u0926\u093F\u0928",dd:"%d \u0926\u093F\u0928",M:"\u090F\u0915 \u092E\u0939\u0940\u0928\u0947",MM:"%d \u092E\u0939\u0940\u0928\u0947",y:"\u090F\u0915 \u0935\u0930\u094D\u0937",yy:"%d \u0935\u0930\u094D\u0937"},preparse:function(string){return string.replace(/[१२३४५६७८९०]/g,function(match){return hi__numberMap[match]})},postformat:function(string){return string.replace(/\d/g,function(match){return hi__symbolMap[match]})},meridiemParse:/रात|सुबह|दोपहर|शाम/,meridiemHour:function(hour,meridiem){return(12===hour&&(hour=0),"\u0930\u093E\u0924"===meridiem)?4>hour?hour:hour+12:"\u0938\u0941\u092C\u0939"===meridiem?hour:"\u0926\u094B\u092A\u0939\u0930"===meridiem?10<=hour?hour:hour+12:"\u0936\u093E\u092E"===meridiem?hour+12:void 0},meridiem:function(hour,minute,isLower){return 4>hour?"\u0930\u093E\u0924":10>hour?"\u0938\u0941\u092C\u0939":17>hour?"\u0926\u094B\u092A\u0939\u0930":20>hour?"\u0936\u093E\u092E":"\u0930\u093E\u0924"},week:{dow:0,doy:6}}),hr=moment__default.defineLocale("hr",{months:{format:["sije\u010Dnja","velja\u010De","o\u017Eujka","travnja","svibnja","lipnja","srpnja","kolovoza","rujna","listopada","studenoga","prosinca"],standalone:["sije\u010Danj","velja\u010Da","o\u017Eujak","travanj","svibanj","lipanj","srpanj","kolovoz","rujan","listopad","studeni","prosinac"]},monthsShort:["sij.","velj.","o\u017Eu.","tra.","svi.","lip.","srp.","kol.","ruj.","lis.","stu.","pro."],weekdays:["nedjelja","ponedjeljak","utorak","srijeda","\u010Detvrtak","petak","subota"],weekdaysShort:["ned.","pon.","uto.","sri.","\u010Det.","pet.","sub."],weekdaysMin:["ne","po","ut","sr","\u010De","pe","su"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT";}},lastDay:"[ju\u010Der u] LT",lastWeek:function(){switch(this.day()){case 0:case 3:return"[pro\u0161lu] dddd [u] LT";case 6:return"[pro\u0161le] [subote] [u] LT";case 1:case 2:case 4:case 5:return"[pro\u0161li] dddd [u] LT";}},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"par sekundi",m:hr__translate,mm:hr__translate,h:hr__translate,hh:hr__translate,d:"dan",dd:hr__translate,M:"mjesec",MM:hr__translate,y:"godinu",yy:hr__translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),weekEndings=["vas\xE1rnap","h\xE9tf\u0151n","kedden","szerd\xE1n","cs\xFCt\xF6rt\xF6k\xF6n","p\xE9nteken","szombaton"],hu=moment__default.defineLocale("hu",{months:["janu\xE1r","febru\xE1r","m\xE1rcius","\xE1prilis","m\xE1jus","j\xFAnius","j\xFAlius","augusztus","szeptember","okt\xF3ber","november","december"],monthsShort:["jan","feb","m\xE1rc","\xE1pr","m\xE1j","j\xFAn","j\xFAl","aug","szept","okt","nov","dec"],weekdays:["vas\xE1rnap","h\xE9tf\u0151","kedd","szerda","cs\xFCt\xF6rt\xF6k","p\xE9ntek","szombat"],weekdaysShort:["vas","h\xE9t","kedd","sze","cs\xFCt","p\xE9n","szo"],weekdaysMin:["v","h","k","sze","cs","p","szo"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"YYYY.MM.DD.",LL:"YYYY. MMMM D.",LLL:"YYYY. MMMM D. H:mm",LLLL:"YYYY. MMMM D., dddd H:mm"},meridiemParse:/de|du/i,isPM:function(input){return"u"===input.charAt(1).toLowerCase()},meridiem:function(hours,minutes,isLower){return 12>hours?!0===isLower?"de":"DE":!0===isLower?"du":"DU"},calendar:{sameDay:"[ma] LT[-kor]",nextDay:"[holnap] LT[-kor]",nextWeek:function(){return week.call(this,!0)},lastDay:"[tegnap] LT[-kor]",lastWeek:function(){return week.call(this,!1)},sameElse:"L"},relativeTime:{future:"%s m\xFAlva",past:"%s",s:hu__translate,m:hu__translate,mm:hu__translate,h:hu__translate,hh:hu__translate,d:hu__translate,dd:hu__translate,M:hu__translate,MM:hu__translate,y:hu__translate,yy:hu__translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),hy_am=moment__default.defineLocale("hy-am",{months:{format:["\u0570\u0578\u0582\u0576\u057E\u0561\u0580\u056B","\u0583\u0565\u057F\u0580\u057E\u0561\u0580\u056B","\u0574\u0561\u0580\u057F\u056B","\u0561\u057A\u0580\u056B\u056C\u056B","\u0574\u0561\u0575\u056B\u057D\u056B","\u0570\u0578\u0582\u0576\u056B\u057D\u056B","\u0570\u0578\u0582\u056C\u056B\u057D\u056B","\u0585\u0563\u0578\u057D\u057F\u0578\u057D\u056B","\u057D\u0565\u057A\u057F\u0565\u0574\u0562\u0565\u0580\u056B","\u0570\u0578\u056F\u057F\u0565\u0574\u0562\u0565\u0580\u056B","\u0576\u0578\u0575\u0565\u0574\u0562\u0565\u0580\u056B","\u0564\u0565\u056F\u057F\u0565\u0574\u0562\u0565\u0580\u056B"],standalone:["\u0570\u0578\u0582\u0576\u057E\u0561\u0580","\u0583\u0565\u057F\u0580\u057E\u0561\u0580","\u0574\u0561\u0580\u057F","\u0561\u057A\u0580\u056B\u056C","\u0574\u0561\u0575\u056B\u057D","\u0570\u0578\u0582\u0576\u056B\u057D","\u0570\u0578\u0582\u056C\u056B\u057D","\u0585\u0563\u0578\u057D\u057F\u0578\u057D","\u057D\u0565\u057A\u057F\u0565\u0574\u0562\u0565\u0580","\u0570\u0578\u056F\u057F\u0565\u0574\u0562\u0565\u0580","\u0576\u0578\u0575\u0565\u0574\u0562\u0565\u0580","\u0564\u0565\u056F\u057F\u0565\u0574\u0562\u0565\u0580"]},monthsShort:["\u0570\u0576\u057E","\u0583\u057F\u0580","\u0574\u0580\u057F","\u0561\u057A\u0580","\u0574\u0575\u057D","\u0570\u0576\u057D","\u0570\u056C\u057D","\u0585\u0563\u057D","\u057D\u057A\u057F","\u0570\u056F\u057F","\u0576\u0574\u0562","\u0564\u056F\u057F"],weekdays:["\u056F\u056B\u0580\u0561\u056F\u056B","\u0565\u0580\u056F\u0578\u0582\u0577\u0561\u0562\u0569\u056B","\u0565\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056B","\u0579\u0578\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056B","\u0570\u056B\u0576\u0563\u0577\u0561\u0562\u0569\u056B","\u0578\u0582\u0580\u0562\u0561\u0569","\u0577\u0561\u0562\u0561\u0569"],weekdaysShort:["\u056F\u0580\u056F","\u0565\u0580\u056F","\u0565\u0580\u0584","\u0579\u0580\u0584","\u0570\u0576\u0563","\u0578\u0582\u0580\u0562","\u0577\u0562\u0569"],weekdaysMin:["\u056F\u0580\u056F","\u0565\u0580\u056F","\u0565\u0580\u0584","\u0579\u0580\u0584","\u0570\u0576\u0563","\u0578\u0582\u0580\u0562","\u0577\u0562\u0569"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY \u0569.",LLL:"D MMMM YYYY \u0569., HH:mm",LLLL:"dddd, D MMMM YYYY \u0569., HH:mm"},calendar:{sameDay:"[\u0561\u0575\u057D\u0585\u0580] LT",nextDay:"[\u057E\u0561\u0572\u0568] LT",lastDay:"[\u0565\u0580\u0565\u056F] LT",nextWeek:function(){return"dddd [\u0585\u0580\u0568 \u056A\u0561\u0574\u0568] LT"},lastWeek:function(){return"[\u0561\u0576\u0581\u0561\u056E] dddd [\u0585\u0580\u0568 \u056A\u0561\u0574\u0568] LT"},sameElse:"L"},relativeTime:{future:"%s \u0570\u0565\u057F\u0578",past:"%s \u0561\u057C\u0561\u057B",s:"\u0574\u056B \u0584\u0561\u0576\u056B \u057E\u0561\u0575\u0580\u056F\u0575\u0561\u0576",m:"\u0580\u0578\u057A\u0565",mm:"%d \u0580\u0578\u057A\u0565",h:"\u056A\u0561\u0574",hh:"%d \u056A\u0561\u0574",d:"\u0585\u0580",dd:"%d \u0585\u0580",M:"\u0561\u0574\u056B\u057D",MM:"%d \u0561\u0574\u056B\u057D",y:"\u057F\u0561\u0580\u056B",yy:"%d \u057F\u0561\u0580\u056B"},meridiemParse:/գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,isPM:function(input){return /^(ցերեկվա|երեկոյան)$/.test(input)},meridiem:function(hour){return 4>hour?"\u0563\u056B\u0577\u0565\u0580\u057E\u0561":12>hour?"\u0561\u057C\u0561\u057E\u0578\u057F\u057E\u0561":17>hour?"\u0581\u0565\u0580\u0565\u056F\u057E\u0561":"\u0565\u0580\u0565\u056F\u0578\u0575\u0561\u0576"},ordinalParse:/\d{1,2}|\d{1,2}-(ին|րդ)/,ordinal:function(number,period){return"DDD"===period||"w"===period||"W"===period||"DDDo"===period?1===number?number+"-\u056B\u0576":number+"-\u0580\u0564":number},week:{dow:1,doy:7}}),id=moment__default.defineLocale("id",{months:["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],monthsShort:["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"],weekdays:["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"],weekdaysShort:["Min","Sen","Sel","Rab","Kam","Jum","Sab"],weekdaysMin:["Mg","Sn","Sl","Rb","Km","Jm","Sb"],longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|siang|sore|malam/,meridiemHour:function(hour,meridiem){return(12===hour&&(hour=0),"pagi"===meridiem)?hour:"siang"===meridiem?11<=hour?hour:hour+12:"sore"===meridiem||"malam"===meridiem?hour+12:void 0},meridiem:function(hours,minutes,isLower){return 11>hours?"pagi":15>hours?"siang":19>hours?"sore":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Besok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kemarin pukul] LT",lastWeek:"dddd [lalu pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lalu",s:"beberapa detik",m:"semenit",mm:"%d menit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}}),is=moment__default.defineLocale("is",{months:["jan\xFAar","febr\xFAar","mars","apr\xEDl","ma\xED","j\xFAn\xED","j\xFAl\xED","\xE1g\xFAst","september","okt\xF3ber","n\xF3vember","desember"],monthsShort:["jan","feb","mar","apr","ma\xED","j\xFAn","j\xFAl","\xE1g\xFA","sep","okt","n\xF3v","des"],weekdays:["sunnudagur","m\xE1nudagur","\xFEri\xF0judagur","mi\xF0vikudagur","fimmtudagur","f\xF6studagur","laugardagur"],weekdaysShort:["sun","m\xE1n","\xFEri","mi\xF0","fim","f\xF6s","lau"],weekdaysMin:["Su","M\xE1","\xDEr","Mi","Fi","F\xF6","La"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] H:mm",LLLL:"dddd, D. MMMM YYYY [kl.] H:mm"},calendar:{sameDay:"[\xED dag kl.] LT",nextDay:"[\xE1 morgun kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[\xED g\xE6r kl.] LT",lastWeek:"[s\xED\xF0asta] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"eftir %s",past:"fyrir %s s\xED\xF0an",s:is__translate,m:is__translate,mm:is__translate,h:"klukkustund",hh:is__translate,d:is__translate,dd:is__translate,M:is__translate,MM:is__translate,y:is__translate,yy:is__translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),it=moment__default.defineLocale("it",{months:["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"],monthsShort:["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"],weekdays:["Domenica","Luned\xEC","Marted\xEC","Mercoled\xEC","Gioved\xEC","Venerd\xEC","Sabato"],weekdaysShort:["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],weekdaysMin:["Do","Lu","Ma","Me","Gi","Ve","Sa"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Oggi alle] LT",nextDay:"[Domani alle] LT",nextWeek:"dddd [alle] LT",lastDay:"[Ieri alle] LT",lastWeek:function(){switch(this.day()){case 0:return"[la scorsa] dddd [alle] LT";default:return"[lo scorso] dddd [alle] LT";}},sameElse:"L"},relativeTime:{future:function(s){return(/^[0-9].+$/.test(s)?"tra":"in")+" "+s},past:"%s fa",s:"alcuni secondi",m:"un minuto",mm:"%d minuti",h:"un'ora",hh:"%d ore",d:"un giorno",dd:"%d giorni",M:"un mese",MM:"%d mesi",y:"un anno",yy:"%d anni"},ordinalParse:/\d{1,2}º/,ordinal:"%d\xBA",week:{dow:1,doy:4}}),ja=moment__default.defineLocale("ja",{months:["1\u6708","2\u6708","3\u6708","4\u6708","5\u6708","6\u6708","7\u6708","8\u6708","9\u6708","10\u6708","11\u6708","12\u6708"],monthsShort:["1\u6708","2\u6708","3\u6708","4\u6708","5\u6708","6\u6708","7\u6708","8\u6708","9\u6708","10\u6708","11\u6708","12\u6708"],weekdays:["\u65E5\u66DC\u65E5","\u6708\u66DC\u65E5","\u706B\u66DC\u65E5","\u6C34\u66DC\u65E5","\u6728\u66DC\u65E5","\u91D1\u66DC\u65E5","\u571F\u66DC\u65E5"],weekdaysShort:["\u65E5","\u6708","\u706B","\u6C34","\u6728","\u91D1","\u571F"],weekdaysMin:["\u65E5","\u6708","\u706B","\u6C34","\u6728","\u91D1","\u571F"],longDateFormat:{LT:"Ah\u6642m\u5206",LTS:"Ah\u6642m\u5206s\u79D2",L:"YYYY/MM/DD",LL:"YYYY\u5E74M\u6708D\u65E5",LLL:"YYYY\u5E74M\u6708D\u65E5Ah\u6642m\u5206",LLLL:"YYYY\u5E74M\u6708D\u65E5Ah\u6642m\u5206 dddd"},meridiemParse:/午前|午後/i,isPM:function(input){return"\u5348\u5F8C"===input},meridiem:function(hour,minute,isLower){return 12>hour?"\u5348\u524D":"\u5348\u5F8C"},calendar:{sameDay:"[\u4ECA\u65E5] LT",nextDay:"[\u660E\u65E5] LT",nextWeek:"[\u6765\u9031]dddd LT",lastDay:"[\u6628\u65E5] LT",lastWeek:"[\u524D\u9031]dddd LT",sameElse:"L"},relativeTime:{future:"%s\u5F8C",past:"%s\u524D",s:"\u6570\u79D2",m:"1\u5206",mm:"%d\u5206",h:"1\u6642\u9593",hh:"%d\u6642\u9593",d:"1\u65E5",dd:"%d\u65E5",M:"1\u30F6\u6708",MM:"%d\u30F6\u6708",y:"1\u5E74",yy:"%d\u5E74"}}),jv=moment__default.defineLocale("jv",{months:["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","Nopember","Desember"],monthsShort:["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nop","Des"],weekdays:["Minggu","Senen","Seloso","Rebu","Kemis","Jemuwah","Septu"],weekdaysShort:["Min","Sen","Sel","Reb","Kem","Jem","Sep"],weekdaysMin:["Mg","Sn","Sl","Rb","Km","Jm","Sp"],longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/enjing|siyang|sonten|ndalu/,meridiemHour:function(hour,meridiem){return(12===hour&&(hour=0),"enjing"===meridiem)?hour:"siyang"===meridiem?11<=hour?hour:hour+12:"sonten"===meridiem||"ndalu"===meridiem?hour+12:void 0},meridiem:function(hours,minutes,isLower){return 11>hours?"enjing":15>hours?"siyang":19>hours?"sonten":"ndalu"},calendar:{sameDay:"[Dinten puniko pukul] LT",nextDay:"[Mbenjang pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kala wingi pukul] LT",lastWeek:"dddd [kepengker pukul] LT",sameElse:"L"},relativeTime:{future:"wonten ing %s",past:"%s ingkang kepengker",s:"sawetawis detik",m:"setunggal menit",mm:"%d menit",h:"setunggal jam",hh:"%d jam",d:"sedinten",dd:"%d dinten",M:"sewulan",MM:"%d wulan",y:"setaun",yy:"%d taun"},week:{dow:1,doy:7}}),ka=moment__default.defineLocale("ka",{months:{standalone:["\u10D8\u10D0\u10DC\u10D5\u10D0\u10E0\u10D8","\u10D7\u10D4\u10D1\u10D4\u10E0\u10D5\u10D0\u10DA\u10D8","\u10DB\u10D0\u10E0\u10E2\u10D8","\u10D0\u10DE\u10E0\u10D8\u10DA\u10D8","\u10DB\u10D0\u10D8\u10E1\u10D8","\u10D8\u10D5\u10DC\u10D8\u10E1\u10D8","\u10D8\u10D5\u10DA\u10D8\u10E1\u10D8","\u10D0\u10D2\u10D5\u10D8\u10E1\u10E2\u10DD","\u10E1\u10D4\u10E5\u10E2\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8","\u10DD\u10E5\u10E2\u10DD\u10DB\u10D1\u10D4\u10E0\u10D8","\u10DC\u10DD\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8","\u10D3\u10D4\u10D9\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8"],format:["\u10D8\u10D0\u10DC\u10D5\u10D0\u10E0\u10E1","\u10D7\u10D4\u10D1\u10D4\u10E0\u10D5\u10D0\u10DA\u10E1","\u10DB\u10D0\u10E0\u10E2\u10E1","\u10D0\u10DE\u10E0\u10D8\u10DA\u10D8\u10E1","\u10DB\u10D0\u10D8\u10E1\u10E1","\u10D8\u10D5\u10DC\u10D8\u10E1\u10E1","\u10D8\u10D5\u10DA\u10D8\u10E1\u10E1","\u10D0\u10D2\u10D5\u10D8\u10E1\u10E2\u10E1","\u10E1\u10D4\u10E5\u10E2\u10D4\u10DB\u10D1\u10D4\u10E0\u10E1","\u10DD\u10E5\u10E2\u10DD\u10DB\u10D1\u10D4\u10E0\u10E1","\u10DC\u10DD\u10D4\u10DB\u10D1\u10D4\u10E0\u10E1","\u10D3\u10D4\u10D9\u10D4\u10DB\u10D1\u10D4\u10E0\u10E1"]},monthsShort:["\u10D8\u10D0\u10DC","\u10D7\u10D4\u10D1","\u10DB\u10D0\u10E0","\u10D0\u10DE\u10E0","\u10DB\u10D0\u10D8","\u10D8\u10D5\u10DC","\u10D8\u10D5\u10DA","\u10D0\u10D2\u10D5","\u10E1\u10D4\u10E5","\u10DD\u10E5\u10E2","\u10DC\u10DD\u10D4","\u10D3\u10D4\u10D9"],weekdays:{standalone:["\u10D9\u10D5\u10D8\u10E0\u10D0","\u10DD\u10E0\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8","\u10E1\u10D0\u10DB\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8","\u10DD\u10D7\u10EE\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8","\u10EE\u10E3\u10D7\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8","\u10DE\u10D0\u10E0\u10D0\u10E1\u10D9\u10D4\u10D5\u10D8","\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8"],format:["\u10D9\u10D5\u10D8\u10E0\u10D0\u10E1","\u10DD\u10E0\u10E8\u10D0\u10D1\u10D0\u10D7\u10E1","\u10E1\u10D0\u10DB\u10E8\u10D0\u10D1\u10D0\u10D7\u10E1","\u10DD\u10D7\u10EE\u10E8\u10D0\u10D1\u10D0\u10D7\u10E1","\u10EE\u10E3\u10D7\u10E8\u10D0\u10D1\u10D0\u10D7\u10E1","\u10DE\u10D0\u10E0\u10D0\u10E1\u10D9\u10D4\u10D5\u10E1","\u10E8\u10D0\u10D1\u10D0\u10D7\u10E1"],isFormat:/(წინა|შემდეგ)/},weekdaysShort:["\u10D9\u10D5\u10D8","\u10DD\u10E0\u10E8","\u10E1\u10D0\u10DB","\u10DD\u10D7\u10EE","\u10EE\u10E3\u10D7","\u10DE\u10D0\u10E0","\u10E8\u10D0\u10D1"],weekdaysMin:["\u10D9\u10D5","\u10DD\u10E0","\u10E1\u10D0","\u10DD\u10D7","\u10EE\u10E3","\u10DE\u10D0","\u10E8\u10D0"],longDateFormat:{LT:"h:mm A",LTS:"h:mm:ss A",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY h:mm A",LLLL:"dddd, D MMMM YYYY h:mm A"},calendar:{sameDay:"[\u10D3\u10E6\u10D4\u10E1] LT[-\u10D6\u10D4]",nextDay:"[\u10EE\u10D5\u10D0\u10DA] LT[-\u10D6\u10D4]",lastDay:"[\u10D2\u10E3\u10E8\u10D8\u10DC] LT[-\u10D6\u10D4]",nextWeek:"[\u10E8\u10D4\u10DB\u10D3\u10D4\u10D2] dddd LT[-\u10D6\u10D4]",lastWeek:"[\u10EC\u10D8\u10DC\u10D0] dddd LT-\u10D6\u10D4",sameElse:"L"},relativeTime:{future:function(s){return /(წამი|წუთი|საათი|წელი)/.test(s)?s.replace(/ი$/,"\u10E8\u10D8"):s+"\u10E8\u10D8"},past:function(s){return /(წამი|წუთი|საათი|დღე|თვე)/.test(s)?s.replace(/(ი|ე)$/,"\u10D8\u10E1 \u10EC\u10D8\u10DC"):/წელი/.test(s)?s.replace(/წელი$/,"\u10EC\u10DA\u10D8\u10E1 \u10EC\u10D8\u10DC"):void 0},s:"\u10E0\u10D0\u10DB\u10D3\u10D4\u10DC\u10D8\u10DB\u10D4 \u10EC\u10D0\u10DB\u10D8",m:"\u10EC\u10E3\u10D7\u10D8",mm:"%d \u10EC\u10E3\u10D7\u10D8",h:"\u10E1\u10D0\u10D0\u10D7\u10D8",hh:"%d \u10E1\u10D0\u10D0\u10D7\u10D8",d:"\u10D3\u10E6\u10D4",dd:"%d \u10D3\u10E6\u10D4",M:"\u10D7\u10D5\u10D4",MM:"%d \u10D7\u10D5\u10D4",y:"\u10EC\u10D4\u10DA\u10D8",yy:"%d \u10EC\u10D4\u10DA\u10D8"},ordinalParse:/0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,ordinal:function(number){return 0===number?number:1===number?number+"-\u10DA\u10D8":20>number||100>=number&&0==number%20||0==number%100?"\u10DB\u10D4-"+number:number+"-\u10D4"},week:{dow:1,doy:7}}),kk__suffixes={0:"-\u0448\u0456",1:"-\u0448\u0456",2:"-\u0448\u0456",3:"-\u0448\u0456",4:"-\u0448\u0456",5:"-\u0448\u0456",6:"-\u0448\u044B",7:"-\u0448\u0456",8:"-\u0448\u0456",9:"-\u0448\u044B",10:"-\u0448\u044B",20:"-\u0448\u044B",30:"-\u0448\u044B",40:"-\u0448\u044B",50:"-\u0448\u0456",60:"-\u0448\u044B",70:"-\u0448\u0456",80:"-\u0448\u0456",90:"-\u0448\u044B",100:"-\u0448\u0456"},kk=moment__default.defineLocale("kk",{months:["\u049A\u0430\u04A3\u0442\u0430\u0440","\u0410\u049B\u043F\u0430\u043D","\u041D\u0430\u0443\u0440\u044B\u0437","\u0421\u04D9\u0443\u0456\u0440","\u041C\u0430\u043C\u044B\u0440","\u041C\u0430\u0443\u0441\u044B\u043C","\u0428\u0456\u043B\u0434\u0435","\u0422\u0430\u043C\u044B\u0437","\u049A\u044B\u0440\u043A\u04AF\u0439\u0435\u043A","\u049A\u0430\u0437\u0430\u043D","\u049A\u0430\u0440\u0430\u0448\u0430","\u0416\u0435\u043B\u0442\u043E\u049B\u0441\u0430\u043D"],monthsShort:["\u049A\u0430\u04A3","\u0410\u049B\u043F","\u041D\u0430\u0443","\u0421\u04D9\u0443","\u041C\u0430\u043C","\u041C\u0430\u0443","\u0428\u0456\u043B","\u0422\u0430\u043C","\u049A\u044B\u0440","\u049A\u0430\u0437","\u049A\u0430\u0440","\u0416\u0435\u043B"],weekdays:["\u0416\u0435\u043A\u0441\u0435\u043D\u0431\u0456","\u0414\u04AF\u0439\u0441\u0435\u043D\u0431\u0456","\u0421\u0435\u0439\u0441\u0435\u043D\u0431\u0456","\u0421\u04D9\u0440\u0441\u0435\u043D\u0431\u0456","\u0411\u0435\u0439\u0441\u0435\u043D\u0431\u0456","\u0416\u04B1\u043C\u0430","\u0421\u0435\u043D\u0431\u0456"],weekdaysShort:["\u0416\u0435\u043A","\u0414\u04AF\u0439","\u0421\u0435\u0439","\u0421\u04D9\u0440","\u0411\u0435\u0439","\u0416\u04B1\u043C","\u0421\u0435\u043D"],weekdaysMin:["\u0416\u043A","\u0414\u0439","\u0421\u0439","\u0421\u0440","\u0411\u0439","\u0416\u043C","\u0421\u043D"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u0411\u04AF\u0433\u0456\u043D \u0441\u0430\u0493\u0430\u0442] LT",nextDay:"[\u0415\u0440\u0442\u0435\u04A3 \u0441\u0430\u0493\u0430\u0442] LT",nextWeek:"dddd [\u0441\u0430\u0493\u0430\u0442] LT",lastDay:"[\u041A\u0435\u0448\u0435 \u0441\u0430\u0493\u0430\u0442] LT",lastWeek:"[\u04E8\u0442\u043A\u0435\u043D \u0430\u043F\u0442\u0430\u043D\u044B\u04A3] dddd [\u0441\u0430\u0493\u0430\u0442] LT",sameElse:"L"},relativeTime:{future:"%s \u0456\u0448\u0456\u043D\u0434\u0435",past:"%s \u0431\u04B1\u0440\u044B\u043D",s:"\u0431\u0456\u0440\u043D\u0435\u0448\u0435 \u0441\u0435\u043A\u0443\u043D\u0434",m:"\u0431\u0456\u0440 \u043C\u0438\u043D\u0443\u0442",mm:"%d \u043C\u0438\u043D\u0443\u0442",h:"\u0431\u0456\u0440 \u0441\u0430\u0493\u0430\u0442",hh:"%d \u0441\u0430\u0493\u0430\u0442",d:"\u0431\u0456\u0440 \u043A\u04AF\u043D",dd:"%d \u043A\u04AF\u043D",M:"\u0431\u0456\u0440 \u0430\u0439",MM:"%d \u0430\u0439",y:"\u0431\u0456\u0440 \u0436\u044B\u043B",yy:"%d \u0436\u044B\u043B"},ordinalParse:/\d{1,2}-(ші|шы)/,ordinal:function(number){var a=number%10,b=100<=number?100:null;return number+(kk__suffixes[number]||kk__suffixes[a]||kk__suffixes[b])},week:{dow:1,doy:7}}),km=moment__default.defineLocale("km",{months:["\u1798\u1780\u179A\u17B6","\u1780\u17BB\u1798\u17D2\u1797\u17C8","\u1798\u17B7\u1793\u17B6","\u1798\u17C1\u179F\u17B6","\u17A7\u179F\u1797\u17B6","\u1798\u17B7\u1790\u17BB\u1793\u17B6","\u1780\u1780\u17D2\u1780\u178A\u17B6","\u179F\u17B8\u17A0\u17B6","\u1780\u1789\u17D2\u1789\u17B6","\u178F\u17BB\u179B\u17B6","\u179C\u17B7\u1785\u17D2\u1786\u17B7\u1780\u17B6","\u1792\u17D2\u1793\u17BC"],monthsShort:["\u1798\u1780\u179A\u17B6","\u1780\u17BB\u1798\u17D2\u1797\u17C8","\u1798\u17B7\u1793\u17B6","\u1798\u17C1\u179F\u17B6","\u17A7\u179F\u1797\u17B6","\u1798\u17B7\u1790\u17BB\u1793\u17B6","\u1780\u1780\u17D2\u1780\u178A\u17B6","\u179F\u17B8\u17A0\u17B6","\u1780\u1789\u17D2\u1789\u17B6","\u178F\u17BB\u179B\u17B6","\u179C\u17B7\u1785\u17D2\u1786\u17B7\u1780\u17B6","\u1792\u17D2\u1793\u17BC"],weekdays:["\u17A2\u17B6\u1791\u17B7\u178F\u17D2\u1799","\u1785\u17D0\u1793\u17D2\u1791","\u17A2\u1784\u17D2\u1782\u17B6\u179A","\u1796\u17BB\u1792","\u1796\u17D2\u179A\u17A0\u179F\u17D2\u1794\u178F\u17B7\u17CD","\u179F\u17BB\u1780\u17D2\u179A","\u179F\u17C5\u179A\u17CD"],weekdaysShort:["\u17A2\u17B6\u1791\u17B7\u178F\u17D2\u1799","\u1785\u17D0\u1793\u17D2\u1791","\u17A2\u1784\u17D2\u1782\u17B6\u179A","\u1796\u17BB\u1792","\u1796\u17D2\u179A\u17A0\u179F\u17D2\u1794\u178F\u17B7\u17CD","\u179F\u17BB\u1780\u17D2\u179A","\u179F\u17C5\u179A\u17CD"],weekdaysMin:["\u17A2\u17B6\u1791\u17B7\u178F\u17D2\u1799","\u1785\u17D0\u1793\u17D2\u1791","\u17A2\u1784\u17D2\u1782\u17B6\u179A","\u1796\u17BB\u1792","\u1796\u17D2\u179A\u17A0\u179F\u17D2\u1794\u178F\u17B7\u17CD","\u179F\u17BB\u1780\u17D2\u179A","\u179F\u17C5\u179A\u17CD"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u1790\u17D2\u1784\u17C3\u1793\u17C1\u17C7 \u1798\u17C9\u17C4\u1784] LT",nextDay:"[\u179F\u17D2\u17A2\u17C2\u1780 \u1798\u17C9\u17C4\u1784] LT",nextWeek:"dddd [\u1798\u17C9\u17C4\u1784] LT",lastDay:"[\u1798\u17D2\u179F\u17B7\u179B\u1798\u17B7\u1789 \u1798\u17C9\u17C4\u1784] LT",lastWeek:"dddd [\u179F\u1794\u17D2\u178F\u17B6\u17A0\u17CD\u1798\u17BB\u1793] [\u1798\u17C9\u17C4\u1784] LT",sameElse:"L"},relativeTime:{future:"%s\u1791\u17C0\u178F",past:"%s\u1798\u17BB\u1793",s:"\u1794\u17C9\u17BB\u1793\u17D2\u1798\u17B6\u1793\u179C\u17B7\u1793\u17B6\u1791\u17B8",m:"\u1798\u17BD\u1799\u1793\u17B6\u1791\u17B8",mm:"%d \u1793\u17B6\u1791\u17B8",h:"\u1798\u17BD\u1799\u1798\u17C9\u17C4\u1784",hh:"%d \u1798\u17C9\u17C4\u1784",d:"\u1798\u17BD\u1799\u1790\u17D2\u1784\u17C3",dd:"%d \u1790\u17D2\u1784\u17C3",M:"\u1798\u17BD\u1799\u1781\u17C2",MM:"%d \u1781\u17C2",y:"\u1798\u17BD\u1799\u1786\u17D2\u1793\u17B6\u17C6",yy:"%d \u1786\u17D2\u1793\u17B6\u17C6"},week:{dow:1,doy:4}}),ko=moment__default.defineLocale("ko",{months:["1\uC6D4","2\uC6D4","3\uC6D4","4\uC6D4","5\uC6D4","6\uC6D4","7\uC6D4","8\uC6D4","9\uC6D4","10\uC6D4","11\uC6D4","12\uC6D4"],monthsShort:["1\uC6D4","2\uC6D4","3\uC6D4","4\uC6D4","5\uC6D4","6\uC6D4","7\uC6D4","8\uC6D4","9\uC6D4","10\uC6D4","11\uC6D4","12\uC6D4"],weekdays:["\uC77C\uC694\uC77C","\uC6D4\uC694\uC77C","\uD654\uC694\uC77C","\uC218\uC694\uC77C","\uBAA9\uC694\uC77C","\uAE08\uC694\uC77C","\uD1A0\uC694\uC77C"],weekdaysShort:["\uC77C","\uC6D4","\uD654","\uC218","\uBAA9","\uAE08","\uD1A0"],weekdaysMin:["\uC77C","\uC6D4","\uD654","\uC218","\uBAA9","\uAE08","\uD1A0"],longDateFormat:{LT:"A h\uC2DC m\uBD84",LTS:"A h\uC2DC m\uBD84 s\uCD08",L:"YYYY.MM.DD",LL:"YYYY\uB144 MMMM D\uC77C",LLL:"YYYY\uB144 MMMM D\uC77C A h\uC2DC m\uBD84",LLLL:"YYYY\uB144 MMMM D\uC77C dddd A h\uC2DC m\uBD84"},calendar:{sameDay:"\uC624\uB298 LT",nextDay:"\uB0B4\uC77C LT",nextWeek:"dddd LT",lastDay:"\uC5B4\uC81C LT",lastWeek:"\uC9C0\uB09C\uC8FC dddd LT",sameElse:"L"},relativeTime:{future:"%s \uD6C4",past:"%s \uC804",s:"\uBA87\uCD08",ss:"%d\uCD08",m:"\uC77C\uBD84",mm:"%d\uBD84",h:"\uD55C\uC2DC\uAC04",hh:"%d\uC2DC\uAC04",d:"\uD558\uB8E8",dd:"%d\uC77C",M:"\uD55C\uB2EC",MM:"%d\uB2EC",y:"\uC77C\uB144",yy:"%d\uB144"},ordinalParse:/\d{1,2}일/,ordinal:"%d\uC77C",meridiemParse:/오전|오후/,isPM:function(token){return"\uC624\uD6C4"===token},meridiem:function(hour,minute,isUpper){return 12>hour?"\uC624\uC804":"\uC624\uD6C4"}}),lb=moment__default.defineLocale("lb",{months:["Januar","Februar","M\xE4erz","Abr\xEBll","Mee","Juni","Juli","August","September","Oktober","November","Dezember"],monthsShort:["Jan.","Febr.","Mrz.","Abr.","Mee","Jun.","Jul.","Aug.","Sept.","Okt.","Nov.","Dez."],weekdays:["Sonndeg","M\xE9indeg","D\xEBnschdeg","M\xEBttwoch","Donneschdeg","Freideg","Samschdeg"],weekdaysShort:["So.","M\xE9.","D\xEB.","M\xEB.","Do.","Fr.","Sa."],weekdaysMin:["So","M\xE9","D\xEB","M\xEB","Do","Fr","Sa"],longDateFormat:{LT:"H:mm [Auer]",LTS:"H:mm:ss [Auer]",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm [Auer]",LLLL:"dddd, D. MMMM YYYY H:mm [Auer]"},calendar:{sameDay:"[Haut um] LT",sameElse:"L",nextDay:"[Muer um] LT",nextWeek:"dddd [um] LT",lastDay:"[G\xEBschter um] LT",lastWeek:function(){switch(this.day()){case 2:case 4:return"[Leschten] dddd [um] LT";default:return"[Leschte] dddd [um] LT";}}},relativeTime:{future:processFutureTime,past:processPastTime,s:"e puer Sekonnen",m:lb__processRelativeTime,mm:"%d Minutten",h:lb__processRelativeTime,hh:"%d Stonnen",d:lb__processRelativeTime,dd:"%d Deeg",M:lb__processRelativeTime,MM:"%d M\xE9int",y:lb__processRelativeTime,yy:"%d Joer"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),lo=moment__default.defineLocale("lo",{months:["\u0EA1\u0EB1\u0E87\u0E81\u0EAD\u0E99","\u0E81\u0EB8\u0EA1\u0E9E\u0EB2","\u0EA1\u0EB5\u0E99\u0EB2","\u0EC0\u0EA1\u0EAA\u0EB2","\u0E9E\u0EB6\u0E94\u0EAA\u0EB0\u0E9E\u0EB2","\u0EA1\u0EB4\u0E96\u0EB8\u0E99\u0EB2","\u0E81\u0ECD\u0EA5\u0EB0\u0E81\u0EBB\u0E94","\u0EAA\u0EB4\u0E87\u0EAB\u0EB2","\u0E81\u0EB1\u0E99\u0E8D\u0EB2","\u0E95\u0EB8\u0EA5\u0EB2","\u0E9E\u0EB0\u0E88\u0EB4\u0E81","\u0E97\u0EB1\u0E99\u0EA7\u0EB2"],monthsShort:["\u0EA1\u0EB1\u0E87\u0E81\u0EAD\u0E99","\u0E81\u0EB8\u0EA1\u0E9E\u0EB2","\u0EA1\u0EB5\u0E99\u0EB2","\u0EC0\u0EA1\u0EAA\u0EB2","\u0E9E\u0EB6\u0E94\u0EAA\u0EB0\u0E9E\u0EB2","\u0EA1\u0EB4\u0E96\u0EB8\u0E99\u0EB2","\u0E81\u0ECD\u0EA5\u0EB0\u0E81\u0EBB\u0E94","\u0EAA\u0EB4\u0E87\u0EAB\u0EB2","\u0E81\u0EB1\u0E99\u0E8D\u0EB2","\u0E95\u0EB8\u0EA5\u0EB2","\u0E9E\u0EB0\u0E88\u0EB4\u0E81","\u0E97\u0EB1\u0E99\u0EA7\u0EB2"],weekdays:["\u0EAD\u0EB2\u0E97\u0EB4\u0E94","\u0E88\u0EB1\u0E99","\u0EAD\u0EB1\u0E87\u0E84\u0EB2\u0E99","\u0E9E\u0EB8\u0E94","\u0E9E\u0EB0\u0EAB\u0EB1\u0E94","\u0EAA\u0EB8\u0E81","\u0EC0\u0EAA\u0EBB\u0EB2"],weekdaysShort:["\u0E97\u0EB4\u0E94","\u0E88\u0EB1\u0E99","\u0EAD\u0EB1\u0E87\u0E84\u0EB2\u0E99","\u0E9E\u0EB8\u0E94","\u0E9E\u0EB0\u0EAB\u0EB1\u0E94","\u0EAA\u0EB8\u0E81","\u0EC0\u0EAA\u0EBB\u0EB2"],weekdaysMin:["\u0E97","\u0E88","\u0EAD\u0E84","\u0E9E","\u0E9E\u0EAB","\u0EAA\u0E81","\u0EAA"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"\u0EA7\u0EB1\u0E99dddd D MMMM YYYY HH:mm"},meridiemParse:/ຕອນເຊົ້າ|ຕອນແລງ/,isPM:function(input){return"\u0E95\u0EAD\u0E99\u0EC1\u0EA5\u0E87"===input},meridiem:function(hour,minute,isLower){return 12>hour?"\u0E95\u0EAD\u0E99\u0EC0\u0E8A\u0EBB\u0EC9\u0EB2":"\u0E95\u0EAD\u0E99\u0EC1\u0EA5\u0E87"},calendar:{sameDay:"[\u0EA1\u0EB7\u0EC9\u0E99\u0EB5\u0EC9\u0EC0\u0EA7\u0EA5\u0EB2] LT",nextDay:"[\u0EA1\u0EB7\u0EC9\u0EAD\u0EB7\u0EC8\u0E99\u0EC0\u0EA7\u0EA5\u0EB2] LT",nextWeek:"[\u0EA7\u0EB1\u0E99]dddd[\u0EDC\u0EC9\u0EB2\u0EC0\u0EA7\u0EA5\u0EB2] LT",lastDay:"[\u0EA1\u0EB7\u0EC9\u0EA7\u0EB2\u0E99\u0E99\u0EB5\u0EC9\u0EC0\u0EA7\u0EA5\u0EB2] LT",lastWeek:"[\u0EA7\u0EB1\u0E99]dddd[\u0EC1\u0EA5\u0EC9\u0EA7\u0E99\u0EB5\u0EC9\u0EC0\u0EA7\u0EA5\u0EB2] LT",sameElse:"L"},relativeTime:{future:"\u0EAD\u0EB5\u0E81 %s",past:"%s\u0E9C\u0EC8\u0EB2\u0E99\u0EA1\u0EB2",s:"\u0E9A\u0ECD\u0EC8\u0EC0\u0E97\u0EBB\u0EC8\u0EB2\u0EC3\u0E94\u0EA7\u0EB4\u0E99\u0EB2\u0E97\u0EB5",m:"1 \u0E99\u0EB2\u0E97\u0EB5",mm:"%d \u0E99\u0EB2\u0E97\u0EB5",h:"1 \u0E8A\u0EBB\u0EC8\u0EA7\u0EC2\u0EA1\u0E87",hh:"%d \u0E8A\u0EBB\u0EC8\u0EA7\u0EC2\u0EA1\u0E87",d:"1 \u0EA1\u0EB7\u0EC9",dd:"%d \u0EA1\u0EB7\u0EC9",M:"1 \u0EC0\u0E94\u0EB7\u0EAD\u0E99",MM:"%d \u0EC0\u0E94\u0EB7\u0EAD\u0E99",y:"1 \u0E9B\u0EB5",yy:"%d \u0E9B\u0EB5"},ordinalParse:/(ທີ່)\d{1,2}/,ordinal:function(number){return"\u0E97\u0EB5\u0EC8"+number}}),lt__units={m:"minut\u0117_minut\u0117s_minut\u0119",mm:"minut\u0117s_minu\u010Di\u0173_minutes",h:"valanda_valandos_valand\u0105",hh:"valandos_valand\u0173_valandas",d:"diena_dienos_dien\u0105",dd:"dienos_dien\u0173_dienas",M:"m\u0117nuo_m\u0117nesio_m\u0117nes\u012F",MM:"m\u0117nesiai_m\u0117nesi\u0173_m\u0117nesius",y:"metai_met\u0173_metus",yy:"metai_met\u0173_metus"},lt=moment__default.defineLocale("lt",{months:{format:["sausio","vasario","kovo","baland\u017Eio","gegu\u017E\u0117s","bir\u017Eelio","liepos","rugpj\u016B\u010Dio","rugs\u0117jo","spalio","lapkri\u010Dio","gruod\u017Eio"],standalone:["sausis","vasaris","kovas","balandis","gegu\u017E\u0117","bir\u017Eelis","liepa","rugpj\u016Btis","rugs\u0117jis","spalis","lapkritis","gruodis"]},monthsShort:["sau","vas","kov","bal","geg","bir","lie","rgp","rgs","spa","lap","grd"],weekdays:{format:["sekmadien\u012F","pirmadien\u012F","antradien\u012F","tre\u010Diadien\u012F","ketvirtadien\u012F","penktadien\u012F","\u0161e\u0161tadien\u012F"],standalone:["sekmadienis","pirmadienis","antradienis","tre\u010Diadienis","ketvirtadienis","penktadienis","\u0161e\u0161tadienis"],isFormat:/dddd HH:mm/},weekdaysShort:["Sek","Pir","Ant","Tre","Ket","Pen","\u0160e\u0161"],weekdaysMin:["S","P","A","T","K","Pn","\u0160"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY [m.] MMMM D [d.]",LLL:"YYYY [m.] MMMM D [d.], HH:mm [val.]",LLLL:"YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",l:"YYYY-MM-DD",ll:"YYYY [m.] MMMM D [d.]",lll:"YYYY [m.] MMMM D [d.], HH:mm [val.]",llll:"YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"},calendar:{sameDay:"[\u0160iandien] LT",nextDay:"[Rytoj] LT",nextWeek:"dddd LT",lastDay:"[Vakar] LT",lastWeek:"[Pra\u0117jus\u012F] dddd LT",sameElse:"L"},relativeTime:{future:"po %s",past:"prie\u0161 %s",s:translateSeconds,m:translateSingular,mm:lt__translate,h:translateSingular,hh:lt__translate,d:translateSingular,dd:lt__translate,M:translateSingular,MM:lt__translate,y:translateSingular,yy:lt__translate},ordinalParse:/\d{1,2}-oji/,ordinal:function(number){return number+"-oji"},week:{dow:1,doy:4}}),lv__units={m:["min\u016Btes","min\u016Bt\u0113m","min\u016Bte","min\u016Btes"],mm:["min\u016Btes","min\u016Bt\u0113m","min\u016Bte","min\u016Btes"],h:["stundas","stund\u0101m","stunda","stundas"],hh:["stundas","stund\u0101m","stunda","stundas"],d:["dienas","dien\u0101m","diena","dienas"],dd:["dienas","dien\u0101m","diena","dienas"],M:["m\u0113ne\u0161a","m\u0113ne\u0161iem","m\u0113nesis","m\u0113ne\u0161i"],MM:["m\u0113ne\u0161a","m\u0113ne\u0161iem","m\u0113nesis","m\u0113ne\u0161i"],y:["gada","gadiem","gads","gadi"],yy:["gada","gadiem","gads","gadi"]},lv=moment__default.defineLocale("lv",{months:["janv\u0101ris","febru\u0101ris","marts","apr\u012Blis","maijs","j\u016Bnijs","j\u016Blijs","augusts","septembris","oktobris","novembris","decembris"],monthsShort:["jan","feb","mar","apr","mai","j\u016Bn","j\u016Bl","aug","sep","okt","nov","dec"],weekdays:["sv\u0113tdiena","pirmdiena","otrdiena","tre\u0161diena","ceturtdiena","piektdiena","sestdiena"],weekdaysShort:["Sv","P","O","T","C","Pk","S"],weekdaysMin:["Sv","P","O","T","C","Pk","S"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY.",LL:"YYYY. [gada] D. MMMM",LLL:"YYYY. [gada] D. MMMM, HH:mm",LLLL:"YYYY. [gada] D. MMMM, dddd, HH:mm"},calendar:{sameDay:"[\u0160odien pulksten] LT",nextDay:"[R\u012Bt pulksten] LT",nextWeek:"dddd [pulksten] LT",lastDay:"[Vakar pulksten] LT",lastWeek:"[Pag\u0101ju\u0161\u0101] dddd [pulksten] LT",sameElse:"L"},relativeTime:{future:"p\u0113c %s",past:"pirms %s",s:relativeSeconds,m:relativeTimeWithSingular,mm:lv__relativeTimeWithPlural,h:relativeTimeWithSingular,hh:lv__relativeTimeWithPlural,d:relativeTimeWithSingular,dd:lv__relativeTimeWithPlural,M:relativeTimeWithSingular,MM:lv__relativeTimeWithPlural,y:relativeTimeWithSingular,yy:lv__relativeTimeWithPlural},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),me__translator={words:{m:["jedan minut","jednog minuta"],mm:["minut","minuta","minuta"],h:["jedan sat","jednog sata"],hh:["sat","sata","sati"],dd:["dan","dana","dana"],MM:["mjesec","mjeseca","mjeseci"],yy:["godina","godine","godina"]},correctGrammaticalCase:function(number,wordKey){return 1===number?wordKey[0]:2<=number&&4>=number?wordKey[1]:wordKey[2]},translate:function(number,withoutSuffix,key){var wordKey=me__translator.words[key];return 1===key.length?withoutSuffix?wordKey[0]:wordKey[1]:number+" "+me__translator.correctGrammaticalCase(number,wordKey)}},me=moment__default.defineLocale("me",{months:["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar"],monthsShort:["jan.","feb.","mar.","apr.","maj","jun","jul","avg.","sep.","okt.","nov.","dec."],weekdays:["nedjelja","ponedjeljak","utorak","srijeda","\u010Detvrtak","petak","subota"],weekdaysShort:["ned.","pon.","uto.","sri.","\u010Det.","pet.","sub."],weekdaysMin:["ne","po","ut","sr","\u010De","pe","su"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sjutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedjelju] [u] LT";case 3:return"[u] [srijedu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT";}},lastDay:"[ju\u010De u] LT",lastWeek:function(){var lastWeekDays=["[pro\u0161le] [nedjelje] [u] LT","[pro\u0161log] [ponedjeljka] [u] LT","[pro\u0161log] [utorka] [u] LT","[pro\u0161le] [srijede] [u] LT","[pro\u0161log] [\u010Detvrtka] [u] LT","[pro\u0161log] [petka] [u] LT","[pro\u0161le] [subote] [u] LT"];return lastWeekDays[this.day()]},sameElse:"L"},relativeTime:{future:"za %s",past:"prije %s",s:"nekoliko sekundi",m:me__translator.translate,mm:me__translator.translate,h:me__translator.translate,hh:me__translator.translate,d:"dan",dd:me__translator.translate,M:"mjesec",MM:me__translator.translate,y:"godinu",yy:me__translator.translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),mk=moment__default.defineLocale("mk",{months:["\u0458\u0430\u043D\u0443\u0430\u0440\u0438","\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438","\u043C\u0430\u0440\u0442","\u0430\u043F\u0440\u0438\u043B","\u043C\u0430\u0458","\u0458\u0443\u043D\u0438","\u0458\u0443\u043B\u0438","\u0430\u0432\u0433\u0443\u0441\u0442","\u0441\u0435\u043F\u0442\u0435\u043C\u0432\u0440\u0438","\u043E\u043A\u0442\u043E\u043C\u0432\u0440\u0438","\u043D\u043E\u0435\u043C\u0432\u0440\u0438","\u0434\u0435\u043A\u0435\u043C\u0432\u0440\u0438"],monthsShort:["\u0458\u0430\u043D","\u0444\u0435\u0432","\u043C\u0430\u0440","\u0430\u043F\u0440","\u043C\u0430\u0458","\u0458\u0443\u043D","\u0458\u0443\u043B","\u0430\u0432\u0433","\u0441\u0435\u043F","\u043E\u043A\u0442","\u043D\u043E\u0435","\u0434\u0435\u043A"],weekdays:["\u043D\u0435\u0434\u0435\u043B\u0430","\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u043D\u0438\u043A","\u0432\u0442\u043E\u0440\u043D\u0438\u043A","\u0441\u0440\u0435\u0434\u0430","\u0447\u0435\u0442\u0432\u0440\u0442\u043E\u043A","\u043F\u0435\u0442\u043E\u043A","\u0441\u0430\u0431\u043E\u0442\u0430"],weekdaysShort:["\u043D\u0435\u0434","\u043F\u043E\u043D","\u0432\u0442\u043E","\u0441\u0440\u0435","\u0447\u0435\u0442","\u043F\u0435\u0442","\u0441\u0430\u0431"],weekdaysMin:["\u043De","\u043Fo","\u0432\u0442","\u0441\u0440","\u0447\u0435","\u043F\u0435","\u0441a"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"D.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[\u0414\u0435\u043D\u0435\u0441 \u0432\u043E] LT",nextDay:"[\u0423\u0442\u0440\u0435 \u0432\u043E] LT",nextWeek:"[\u0412\u043E] dddd [\u0432\u043E] LT",lastDay:"[\u0412\u0447\u0435\u0440\u0430 \u0432\u043E] LT",lastWeek:function(){switch(this.day()){case 0:case 3:case 6:return"[\u0418\u0437\u043C\u0438\u043D\u0430\u0442\u0430\u0442\u0430] dddd [\u0432\u043E] LT";case 1:case 2:case 4:case 5:return"[\u0418\u0437\u043C\u0438\u043D\u0430\u0442\u0438\u043E\u0442] dddd [\u0432\u043E] LT";}},sameElse:"L"},relativeTime:{future:"\u043F\u043E\u0441\u043B\u0435 %s",past:"\u043F\u0440\u0435\u0434 %s",s:"\u043D\u0435\u043A\u043E\u043B\u043A\u0443 \u0441\u0435\u043A\u0443\u043D\u0434\u0438",m:"\u043C\u0438\u043D\u0443\u0442\u0430",mm:"%d \u043C\u0438\u043D\u0443\u0442\u0438",h:"\u0447\u0430\u0441",hh:"%d \u0447\u0430\u0441\u0430",d:"\u0434\u0435\u043D",dd:"%d \u0434\u0435\u043D\u0430",M:"\u043C\u0435\u0441\u0435\u0446",MM:"%d \u043C\u0435\u0441\u0435\u0446\u0438",y:"\u0433\u043E\u0434\u0438\u043D\u0430",yy:"%d \u0433\u043E\u0434\u0438\u043D\u0438"},ordinalParse:/\d{1,2}-(ев|ен|ти|ви|ри|ми)/,ordinal:function(number){var lastDigit=number%10,last2Digits=number%100;return 0===number?number+"-\u0435\u0432":0==last2Digits?number+"-\u0435\u043D":10<last2Digits&&20>last2Digits?number+"-\u0442\u0438":1==lastDigit?number+"-\u0432\u0438":2==lastDigit?number+"-\u0440\u0438":7==lastDigit||8==lastDigit?number+"-\u043C\u0438":number+"-\u0442\u0438"},week:{dow:1,doy:7}}),ml=moment__default.defineLocale("ml",{months:["\u0D1C\u0D28\u0D41\u0D35\u0D30\u0D3F","\u0D2B\u0D46\u0D2C\u0D4D\u0D30\u0D41\u0D35\u0D30\u0D3F","\u0D2E\u0D3E\u0D7C\u0D1A\u0D4D\u0D1A\u0D4D","\u0D0F\u0D2A\u0D4D\u0D30\u0D3F\u0D7D","\u0D2E\u0D47\u0D2F\u0D4D","\u0D1C\u0D42\u0D7A","\u0D1C\u0D42\u0D32\u0D48","\u0D13\u0D17\u0D38\u0D4D\u0D31\u0D4D\u0D31\u0D4D","\u0D38\u0D46\u0D2A\u0D4D\u0D31\u0D4D\u0D31\u0D02\u0D2C\u0D7C","\u0D12\u0D15\u0D4D\u0D1F\u0D4B\u0D2C\u0D7C","\u0D28\u0D35\u0D02\u0D2C\u0D7C","\u0D21\u0D3F\u0D38\u0D02\u0D2C\u0D7C"],monthsShort:["\u0D1C\u0D28\u0D41.","\u0D2B\u0D46\u0D2C\u0D4D\u0D30\u0D41.","\u0D2E\u0D3E\u0D7C.","\u0D0F\u0D2A\u0D4D\u0D30\u0D3F.","\u0D2E\u0D47\u0D2F\u0D4D","\u0D1C\u0D42\u0D7A","\u0D1C\u0D42\u0D32\u0D48.","\u0D13\u0D17.","\u0D38\u0D46\u0D2A\u0D4D\u0D31\u0D4D\u0D31.","\u0D12\u0D15\u0D4D\u0D1F\u0D4B.","\u0D28\u0D35\u0D02.","\u0D21\u0D3F\u0D38\u0D02."],weekdays:["\u0D1E\u0D3E\u0D2F\u0D31\u0D3E\u0D34\u0D4D\u0D1A","\u0D24\u0D3F\u0D19\u0D4D\u0D15\u0D33\u0D3E\u0D34\u0D4D\u0D1A","\u0D1A\u0D4A\u0D35\u0D4D\u0D35\u0D3E\u0D34\u0D4D\u0D1A","\u0D2C\u0D41\u0D27\u0D28\u0D3E\u0D34\u0D4D\u0D1A","\u0D35\u0D4D\u0D2F\u0D3E\u0D34\u0D3E\u0D34\u0D4D\u0D1A","\u0D35\u0D46\u0D33\u0D4D\u0D33\u0D3F\u0D2F\u0D3E\u0D34\u0D4D\u0D1A","\u0D36\u0D28\u0D3F\u0D2F\u0D3E\u0D34\u0D4D\u0D1A"],weekdaysShort:["\u0D1E\u0D3E\u0D2F\u0D7C","\u0D24\u0D3F\u0D19\u0D4D\u0D15\u0D7E","\u0D1A\u0D4A\u0D35\u0D4D\u0D35","\u0D2C\u0D41\u0D27\u0D7B","\u0D35\u0D4D\u0D2F\u0D3E\u0D34\u0D02","\u0D35\u0D46\u0D33\u0D4D\u0D33\u0D3F","\u0D36\u0D28\u0D3F"],weekdaysMin:["\u0D1E\u0D3E","\u0D24\u0D3F","\u0D1A\u0D4A","\u0D2C\u0D41","\u0D35\u0D4D\u0D2F\u0D3E","\u0D35\u0D46","\u0D36"],longDateFormat:{LT:"A h:mm -\u0D28\u0D41",LTS:"A h:mm:ss -\u0D28\u0D41",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm -\u0D28\u0D41",LLLL:"dddd, D MMMM YYYY, A h:mm -\u0D28\u0D41"},calendar:{sameDay:"[\u0D07\u0D28\u0D4D\u0D28\u0D4D] LT",nextDay:"[\u0D28\u0D3E\u0D33\u0D46] LT",nextWeek:"dddd, LT",lastDay:"[\u0D07\u0D28\u0D4D\u0D28\u0D32\u0D46] LT",lastWeek:"[\u0D15\u0D34\u0D3F\u0D1E\u0D4D\u0D1E] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0D15\u0D34\u0D3F\u0D1E\u0D4D\u0D1E\u0D4D",past:"%s \u0D2E\u0D41\u0D7B\u0D2A\u0D4D",s:"\u0D05\u0D7D\u0D2A \u0D28\u0D3F\u0D2E\u0D3F\u0D37\u0D19\u0D4D\u0D19\u0D7E",m:"\u0D12\u0D30\u0D41 \u0D2E\u0D3F\u0D28\u0D3F\u0D31\u0D4D\u0D31\u0D4D",mm:"%d \u0D2E\u0D3F\u0D28\u0D3F\u0D31\u0D4D\u0D31\u0D4D",h:"\u0D12\u0D30\u0D41 \u0D2E\u0D23\u0D3F\u0D15\u0D4D\u0D15\u0D42\u0D7C",hh:"%d \u0D2E\u0D23\u0D3F\u0D15\u0D4D\u0D15\u0D42\u0D7C",d:"\u0D12\u0D30\u0D41 \u0D26\u0D3F\u0D35\u0D38\u0D02",dd:"%d \u0D26\u0D3F\u0D35\u0D38\u0D02",M:"\u0D12\u0D30\u0D41 \u0D2E\u0D3E\u0D38\u0D02",MM:"%d \u0D2E\u0D3E\u0D38\u0D02",y:"\u0D12\u0D30\u0D41 \u0D35\u0D7C\u0D37\u0D02",yy:"%d \u0D35\u0D7C\u0D37\u0D02"},meridiemParse:/രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,isPM:function(input){return /^(ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി)$/.test(input)},meridiem:function(hour,minute,isLower){return 4>hour?"\u0D30\u0D3E\u0D24\u0D4D\u0D30\u0D3F":12>hour?"\u0D30\u0D3E\u0D35\u0D3F\u0D32\u0D46":17>hour?"\u0D09\u0D1A\u0D4D\u0D1A \u0D15\u0D34\u0D3F\u0D1E\u0D4D\u0D1E\u0D4D":20>hour?"\u0D35\u0D48\u0D15\u0D41\u0D28\u0D4D\u0D28\u0D47\u0D30\u0D02":"\u0D30\u0D3E\u0D24\u0D4D\u0D30\u0D3F"}}),mr__symbolMap={1:"\u0967",2:"\u0968",3:"\u0969",4:"\u096A",5:"\u096B",6:"\u096C",7:"\u096D",8:"\u096E",9:"\u096F",0:"\u0966"},mr__numberMap={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"},mr=moment__default.defineLocale("mr",{months:["\u091C\u093E\u0928\u0947\u0935\u093E\u0930\u0940","\u092B\u0947\u092C\u094D\u0930\u0941\u0935\u093E\u0930\u0940","\u092E\u093E\u0930\u094D\u091A","\u090F\u092A\u094D\u0930\u093F\u0932","\u092E\u0947","\u091C\u0942\u0928","\u091C\u0941\u0932\u0948","\u0911\u0917\u0938\u094D\u091F","\u0938\u092A\u094D\u091F\u0947\u0902\u092C\u0930","\u0911\u0915\u094D\u091F\u094B\u092C\u0930","\u0928\u094B\u0935\u094D\u0939\u0947\u0902\u092C\u0930","\u0921\u093F\u0938\u0947\u0902\u092C\u0930"],monthsShort:["\u091C\u093E\u0928\u0947.","\u092B\u0947\u092C\u094D\u0930\u0941.","\u092E\u093E\u0930\u094D\u091A.","\u090F\u092A\u094D\u0930\u093F.","\u092E\u0947.","\u091C\u0942\u0928.","\u091C\u0941\u0932\u0948.","\u0911\u0917.","\u0938\u092A\u094D\u091F\u0947\u0902.","\u0911\u0915\u094D\u091F\u094B.","\u0928\u094B\u0935\u094D\u0939\u0947\u0902.","\u0921\u093F\u0938\u0947\u0902."],weekdays:["\u0930\u0935\u093F\u0935\u093E\u0930","\u0938\u094B\u092E\u0935\u093E\u0930","\u092E\u0902\u0917\u0933\u0935\u093E\u0930","\u092C\u0941\u0927\u0935\u093E\u0930","\u0917\u0941\u0930\u0942\u0935\u093E\u0930","\u0936\u0941\u0915\u094D\u0930\u0935\u093E\u0930","\u0936\u0928\u093F\u0935\u093E\u0930"],weekdaysShort:["\u0930\u0935\u093F","\u0938\u094B\u092E","\u092E\u0902\u0917\u0933","\u092C\u0941\u0927","\u0917\u0941\u0930\u0942","\u0936\u0941\u0915\u094D\u0930","\u0936\u0928\u093F"],weekdaysMin:["\u0930","\u0938\u094B","\u092E\u0902","\u092C\u0941","\u0917\u0941","\u0936\u0941","\u0936"],longDateFormat:{LT:"A h:mm \u0935\u093E\u091C\u0924\u093E",LTS:"A h:mm:ss \u0935\u093E\u091C\u0924\u093E",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm \u0935\u093E\u091C\u0924\u093E",LLLL:"dddd, D MMMM YYYY, A h:mm \u0935\u093E\u091C\u0924\u093E"},calendar:{sameDay:"[\u0906\u091C] LT",nextDay:"[\u0909\u0926\u094D\u092F\u093E] LT",nextWeek:"dddd, LT",lastDay:"[\u0915\u093E\u0932] LT",lastWeek:"[\u092E\u093E\u0917\u0940\u0932] dddd, LT",sameElse:"L"},relativeTime:{future:"%s\u092E\u0927\u094D\u092F\u0947",past:"%s\u092A\u0942\u0930\u094D\u0935\u0940",s:relativeTimeMr,m:relativeTimeMr,mm:relativeTimeMr,h:relativeTimeMr,hh:relativeTimeMr,d:relativeTimeMr,dd:relativeTimeMr,M:relativeTimeMr,MM:relativeTimeMr,y:relativeTimeMr,yy:relativeTimeMr},preparse:function(string){return string.replace(/[१२३४५६७८९०]/g,function(match){return mr__numberMap[match]})},postformat:function(string){return string.replace(/\d/g,function(match){return mr__symbolMap[match]})},meridiemParse:/रात्री|सकाळी|दुपारी|सायंकाळी/,meridiemHour:function(hour,meridiem){return(12===hour&&(hour=0),"\u0930\u093E\u0924\u094D\u0930\u0940"===meridiem)?4>hour?hour:hour+12:"\u0938\u0915\u093E\u0933\u0940"===meridiem?hour:"\u0926\u0941\u092A\u093E\u0930\u0940"===meridiem?10<=hour?hour:hour+12:"\u0938\u093E\u092F\u0902\u0915\u093E\u0933\u0940"===meridiem?hour+12:void 0},meridiem:function(hour,minute,isLower){return 4>hour?"\u0930\u093E\u0924\u094D\u0930\u0940":10>hour?"\u0938\u0915\u093E\u0933\u0940":17>hour?"\u0926\u0941\u092A\u093E\u0930\u0940":20>hour?"\u0938\u093E\u092F\u0902\u0915\u093E\u0933\u0940":"\u0930\u093E\u0924\u094D\u0930\u0940"},week:{dow:0,doy:6}}),ms_my=moment__default.defineLocale("ms-my",{months:["Januari","Februari","Mac","April","Mei","Jun","Julai","Ogos","September","Oktober","November","Disember"],monthsShort:["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ogs","Sep","Okt","Nov","Dis"],weekdays:["Ahad","Isnin","Selasa","Rabu","Khamis","Jumaat","Sabtu"],weekdaysShort:["Ahd","Isn","Sel","Rab","Kha","Jum","Sab"],weekdaysMin:["Ah","Is","Sl","Rb","Km","Jm","Sb"],longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|tengahari|petang|malam/,meridiemHour:function(hour,meridiem){return(12===hour&&(hour=0),"pagi"===meridiem)?hour:"tengahari"===meridiem?11<=hour?hour:hour+12:"petang"===meridiem||"malam"===meridiem?hour+12:void 0},meridiem:function(hours,minutes,isLower){return 11>hours?"pagi":15>hours?"tengahari":19>hours?"petang":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Esok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kelmarin pukul] LT",lastWeek:"dddd [lepas pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lepas",s:"beberapa saat",m:"seminit",mm:"%d minit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}}),locale_ms=moment__default.defineLocale("ms",{months:["Januari","Februari","Mac","April","Mei","Jun","Julai","Ogos","September","Oktober","November","Disember"],monthsShort:["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ogs","Sep","Okt","Nov","Dis"],weekdays:["Ahad","Isnin","Selasa","Rabu","Khamis","Jumaat","Sabtu"],weekdaysShort:["Ahd","Isn","Sel","Rab","Kha","Jum","Sab"],weekdaysMin:["Ah","Is","Sl","Rb","Km","Jm","Sb"],longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY [pukul] HH.mm",LLLL:"dddd, D MMMM YYYY [pukul] HH.mm"},meridiemParse:/pagi|tengahari|petang|malam/,meridiemHour:function(hour,meridiem){return(12===hour&&(hour=0),"pagi"===meridiem)?hour:"tengahari"===meridiem?11<=hour?hour:hour+12:"petang"===meridiem||"malam"===meridiem?hour+12:void 0},meridiem:function(hours,minutes,isLower){return 11>hours?"pagi":15>hours?"tengahari":19>hours?"petang":"malam"},calendar:{sameDay:"[Hari ini pukul] LT",nextDay:"[Esok pukul] LT",nextWeek:"dddd [pukul] LT",lastDay:"[Kelmarin pukul] LT",lastWeek:"dddd [lepas pukul] LT",sameElse:"L"},relativeTime:{future:"dalam %s",past:"%s yang lepas",s:"beberapa saat",m:"seminit",mm:"%d minit",h:"sejam",hh:"%d jam",d:"sehari",dd:"%d hari",M:"sebulan",MM:"%d bulan",y:"setahun",yy:"%d tahun"},week:{dow:1,doy:7}}),my__symbolMap={1:"\u1041",2:"\u1042",3:"\u1043",4:"\u1044",5:"\u1045",6:"\u1046",7:"\u1047",8:"\u1048",9:"\u1049",0:"\u1040"},my__numberMap={"၁":"1","၂":"2","၃":"3","၄":"4","၅":"5","၆":"6","၇":"7","၈":"8","၉":"9","၀":"0"},my=moment__default.defineLocale("my",{months:["\u1007\u1014\u103A\u1014\u101D\u102B\u101B\u102E","\u1016\u1031\u1016\u1031\u102C\u103A\u101D\u102B\u101B\u102E","\u1019\u1010\u103A","\u1027\u1015\u103C\u102E","\u1019\u1031","\u1007\u103D\u1014\u103A","\u1007\u1030\u101C\u102D\u102F\u1004\u103A","\u101E\u103C\u1002\u102F\u1010\u103A","\u1005\u1000\u103A\u1010\u1004\u103A\u1018\u102C","\u1021\u1031\u102C\u1000\u103A\u1010\u102D\u102F\u1018\u102C","\u1014\u102D\u102F\u101D\u1004\u103A\u1018\u102C","\u1012\u102E\u1007\u1004\u103A\u1018\u102C"],monthsShort:["\u1007\u1014\u103A","\u1016\u1031","\u1019\u1010\u103A","\u1015\u103C\u102E","\u1019\u1031","\u1007\u103D\u1014\u103A","\u101C\u102D\u102F\u1004\u103A","\u101E\u103C","\u1005\u1000\u103A","\u1021\u1031\u102C\u1000\u103A","\u1014\u102D\u102F","\u1012\u102E"],weekdays:["\u1010\u1014\u1004\u103A\u1039\u1002\u1014\u103D\u1031","\u1010\u1014\u1004\u103A\u1039\u101C\u102C","\u1021\u1004\u103A\u1039\u1002\u102B","\u1017\u102F\u1012\u1039\u1013\u101F\u1030\u1038","\u1000\u103C\u102C\u101E\u1015\u1010\u1031\u1038","\u101E\u1031\u102C\u1000\u103C\u102C","\u1005\u1014\u1031"],weekdaysShort:["\u1014\u103D\u1031","\u101C\u102C","\u1002\u102B","\u101F\u1030\u1038","\u1000\u103C\u102C","\u101E\u1031\u102C","\u1014\u1031"],weekdaysMin:["\u1014\u103D\u1031","\u101C\u102C","\u1002\u102B","\u101F\u1030\u1038","\u1000\u103C\u102C","\u101E\u1031\u102C","\u1014\u1031"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u101A\u1014\u1031.] LT [\u1019\u103E\u102C]",nextDay:"[\u1019\u1014\u1000\u103A\u1016\u103C\u1014\u103A] LT [\u1019\u103E\u102C]",nextWeek:"dddd LT [\u1019\u103E\u102C]",lastDay:"[\u1019\u1014\u1031.\u1000] LT [\u1019\u103E\u102C]",lastWeek:"[\u1015\u103C\u102E\u1038\u1001\u1032\u1037\u101E\u1031\u102C] dddd LT [\u1019\u103E\u102C]",sameElse:"L"},relativeTime:{future:"\u101C\u102C\u1019\u100A\u103A\u1037 %s \u1019\u103E\u102C",past:"\u101C\u103D\u1014\u103A\u1001\u1032\u1037\u101E\u1031\u102C %s \u1000",s:"\u1005\u1000\u1039\u1000\u1014\u103A.\u1021\u1014\u100A\u103A\u1038\u1004\u101A\u103A",m:"\u1010\u1005\u103A\u1019\u102D\u1014\u1005\u103A",mm:"%d \u1019\u102D\u1014\u1005\u103A",h:"\u1010\u1005\u103A\u1014\u102C\u101B\u102E",hh:"%d \u1014\u102C\u101B\u102E",d:"\u1010\u1005\u103A\u101B\u1000\u103A",dd:"%d \u101B\u1000\u103A",M:"\u1010\u1005\u103A\u101C",MM:"%d \u101C",y:"\u1010\u1005\u103A\u1014\u103E\u1005\u103A",yy:"%d \u1014\u103E\u1005\u103A"},preparse:function(string){return string.replace(/[၁၂၃၄၅၆၇၈၉၀]/g,function(match){return my__numberMap[match]})},postformat:function(string){return string.replace(/\d/g,function(match){return my__symbolMap[match]})},week:{dow:1,doy:4}}),nb=moment__default.defineLocale("nb",{months:["januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember"],monthsShort:["jan.","feb.","mars","april","mai","juni","juli","aug.","sep.","okt.","nov.","des."],weekdays:["s\xF8ndag","mandag","tirsdag","onsdag","torsdag","fredag","l\xF8rdag"],weekdaysShort:["s\xF8.","ma.","ti.","on.","to.","fr.","l\xF8."],weekdaysMin:["s\xF8","ma","ti","on","to","fr","l\xF8"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] HH:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"},calendar:{sameDay:"[i dag kl.] LT",nextDay:"[i morgen kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[i g\xE5r kl.] LT",lastWeek:"[forrige] dddd [kl.] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"for %s siden",s:"noen sekunder",m:"ett minutt",mm:"%d minutter",h:"en time",hh:"%d timer",d:"en dag",dd:"%d dager",M:"en m\xE5ned",MM:"%d m\xE5neder",y:"ett \xE5r",yy:"%d \xE5r"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),ne__symbolMap={1:"\u0967",2:"\u0968",3:"\u0969",4:"\u096A",5:"\u096B",6:"\u096C",7:"\u096D",8:"\u096E",9:"\u096F",0:"\u0966"},ne__numberMap={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"},ne=moment__default.defineLocale("ne",{months:["\u091C\u0928\u0935\u0930\u0940","\u092B\u0947\u092C\u094D\u0930\u0941\u0935\u0930\u0940","\u092E\u093E\u0930\u094D\u091A","\u0905\u092A\u094D\u0930\u093F\u0932","\u092E\u0908","\u091C\u0941\u0928","\u091C\u0941\u0932\u093E\u0908","\u0905\u0917\u0937\u094D\u091F","\u0938\u0947\u092A\u094D\u091F\u0947\u092E\u094D\u092C\u0930","\u0905\u0915\u094D\u091F\u094B\u092C\u0930","\u0928\u094B\u092D\u0947\u092E\u094D\u092C\u0930","\u0921\u093F\u0938\u0947\u092E\u094D\u092C\u0930"],monthsShort:["\u091C\u0928.","\u092B\u0947\u092C\u094D\u0930\u0941.","\u092E\u093E\u0930\u094D\u091A","\u0905\u092A\u094D\u0930\u093F.","\u092E\u0908","\u091C\u0941\u0928","\u091C\u0941\u0932\u093E\u0908.","\u0905\u0917.","\u0938\u0947\u092A\u094D\u091F.","\u0905\u0915\u094D\u091F\u094B.","\u0928\u094B\u092D\u0947.","\u0921\u093F\u0938\u0947."],weekdays:["\u0906\u0907\u0924\u092C\u093E\u0930","\u0938\u094B\u092E\u092C\u093E\u0930","\u092E\u0919\u094D\u0917\u0932\u092C\u093E\u0930","\u092C\u0941\u0927\u092C\u093E\u0930","\u092C\u093F\u0939\u093F\u092C\u093E\u0930","\u0936\u0941\u0915\u094D\u0930\u092C\u093E\u0930","\u0936\u0928\u093F\u092C\u093E\u0930"],weekdaysShort:["\u0906\u0907\u0924.","\u0938\u094B\u092E.","\u092E\u0919\u094D\u0917\u0932.","\u092C\u0941\u0927.","\u092C\u093F\u0939\u093F.","\u0936\u0941\u0915\u094D\u0930.","\u0936\u0928\u093F."],weekdaysMin:["\u0906.","\u0938\u094B.","\u092E\u0902.","\u092C\u0941.","\u092C\u093F.","\u0936\u0941.","\u0936."],longDateFormat:{LT:"A\u0915\u094B h:mm \u092C\u091C\u0947",LTS:"A\u0915\u094B h:mm:ss \u092C\u091C\u0947",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A\u0915\u094B h:mm \u092C\u091C\u0947",LLLL:"dddd, D MMMM YYYY, A\u0915\u094B h:mm \u092C\u091C\u0947"},preparse:function(string){return string.replace(/[१२३४५६७८९०]/g,function(match){return ne__numberMap[match]})},postformat:function(string){return string.replace(/\d/g,function(match){return ne__symbolMap[match]})},meridiemParse:/राति|बिहान|दिउँसो|साँझ/,meridiemHour:function(hour,meridiem){return(12===hour&&(hour=0),"\u0930\u093E\u0924\u093F"===meridiem)?4>hour?hour:hour+12:"\u092C\u093F\u0939\u093E\u0928"===meridiem?hour:"\u0926\u093F\u0909\u0901\u0938\u094B"===meridiem?10<=hour?hour:hour+12:"\u0938\u093E\u0901\u091D"===meridiem?hour+12:void 0},meridiem:function(hour,minute,isLower){return 3>hour?"\u0930\u093E\u0924\u093F":12>hour?"\u092C\u093F\u0939\u093E\u0928":16>hour?"\u0926\u093F\u0909\u0901\u0938\u094B":20>hour?"\u0938\u093E\u0901\u091D":"\u0930\u093E\u0924\u093F"},calendar:{sameDay:"[\u0906\u091C] LT",nextDay:"[\u092D\u094B\u0932\u093F] LT",nextWeek:"[\u0906\u0909\u0901\u0926\u094B] dddd[,] LT",lastDay:"[\u0939\u093F\u091C\u094B] LT",lastWeek:"[\u0917\u090F\u0915\u094B] dddd[,] LT",sameElse:"L"},relativeTime:{future:"%s\u092E\u093E",past:"%s \u0905\u0917\u093E\u0921\u093F",s:"\u0915\u0947\u0939\u0940 \u0915\u094D\u0937\u0923",m:"\u090F\u0915 \u092E\u093F\u0928\u0947\u091F",mm:"%d \u092E\u093F\u0928\u0947\u091F",h:"\u090F\u0915 \u0918\u0923\u094D\u091F\u093E",hh:"%d \u0918\u0923\u094D\u091F\u093E",d:"\u090F\u0915 \u0926\u093F\u0928",dd:"%d \u0926\u093F\u0928",M:"\u090F\u0915 \u092E\u0939\u093F\u0928\u093E",MM:"%d \u092E\u0939\u093F\u0928\u093E",y:"\u090F\u0915 \u092C\u0930\u094D\u0937",yy:"%d \u092C\u0930\u094D\u0937"},week:{dow:0,doy:6}}),nl__monthsShortWithDots=["jan.","feb.","mrt.","apr.","mei","jun.","jul.","aug.","sep.","okt.","nov.","dec."],nl__monthsShortWithoutDots=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],nl=moment__default.defineLocale("nl",{months:["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],monthsShort:function(m,format){return /-MMM-/.test(format)?nl__monthsShortWithoutDots[m.month()]:nl__monthsShortWithDots[m.month()]},weekdays:["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"],weekdaysShort:["zo.","ma.","di.","wo.","do.","vr.","za."],weekdaysMin:["Zo","Ma","Di","Wo","Do","Vr","Za"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD-MM-YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[vandaag om] LT",nextDay:"[morgen om] LT",nextWeek:"dddd [om] LT",lastDay:"[gisteren om] LT",lastWeek:"[afgelopen] dddd [om] LT",sameElse:"L"},relativeTime:{future:"over %s",past:"%s geleden",s:"een paar seconden",m:"\xE9\xE9n minuut",mm:"%d minuten",h:"\xE9\xE9n uur",hh:"%d uur",d:"\xE9\xE9n dag",dd:"%d dagen",M:"\xE9\xE9n maand",MM:"%d maanden",y:"\xE9\xE9n jaar",yy:"%d jaar"},ordinalParse:/\d{1,2}(ste|de)/,ordinal:function(number){return number+(1===number||8===number||20<=number?"ste":"de")},week:{dow:1,doy:4}}),nn=moment__default.defineLocale("nn",{months:["januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember"],monthsShort:["jan","feb","mar","apr","mai","jun","jul","aug","sep","okt","nov","des"],weekdays:["sundag","m\xE5ndag","tysdag","onsdag","torsdag","fredag","laurdag"],weekdaysShort:["sun","m\xE5n","tys","ons","tor","fre","lau"],weekdaysMin:["su","m\xE5","ty","on","to","fr","l\xF8"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY [kl.] H:mm",LLLL:"dddd D. MMMM YYYY [kl.] HH:mm"},calendar:{sameDay:"[I dag klokka] LT",nextDay:"[I morgon klokka] LT",nextWeek:"dddd [klokka] LT",lastDay:"[I g\xE5r klokka] LT",lastWeek:"[F\xF8reg\xE5ande] dddd [klokka] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"for %s sidan",s:"nokre sekund",m:"eit minutt",mm:"%d minutt",h:"ein time",hh:"%d timar",d:"ein dag",dd:"%d dagar",M:"ein m\xE5nad",MM:"%d m\xE5nader",y:"eit \xE5r",yy:"%d \xE5r"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),monthsNominative=["stycze\u0144","luty","marzec","kwiecie\u0144","maj","czerwiec","lipiec","sierpie\u0144","wrzesie\u0144","pa\u017Adziernik","listopad","grudzie\u0144"],monthsSubjective=["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","wrze\u015Bnia","pa\u017Adziernika","listopada","grudnia"],pl=moment__default.defineLocale("pl",{months:function(momentToFormat,format){return""===format?"("+monthsSubjective[momentToFormat.month()]+"|"+monthsNominative[momentToFormat.month()]+")":/D MMMM/.test(format)?monthsSubjective[momentToFormat.month()]:monthsNominative[momentToFormat.month()]},monthsShort:["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","pa\u017A","lis","gru"],weekdays:["niedziela","poniedzia\u0142ek","wtorek","\u015Broda","czwartek","pi\u0105tek","sobota"],weekdaysShort:["nie","pon","wt","\u015Br","czw","pt","sb"],weekdaysMin:["Nd","Pn","Wt","\u015Ar","Cz","Pt","So"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Dzi\u015B o] LT",nextDay:"[Jutro o] LT",nextWeek:"[W] dddd [o] LT",lastDay:"[Wczoraj o] LT",lastWeek:function(){switch(this.day()){case 0:return"[W zesz\u0142\u0105 niedziel\u0119 o] LT";case 3:return"[W zesz\u0142\u0105 \u015Brod\u0119 o] LT";case 6:return"[W zesz\u0142\u0105 sobot\u0119 o] LT";default:return"[W zesz\u0142y] dddd [o] LT";}},sameElse:"L"},relativeTime:{future:"za %s",past:"%s temu",s:"kilka sekund",m:pl__translate,mm:pl__translate,h:pl__translate,hh:pl__translate,d:"1 dzie\u0144",dd:"%d dni",M:"miesi\u0105c",MM:pl__translate,y:"rok",yy:pl__translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),pt_br=moment__default.defineLocale("pt-br",{months:["Janeiro","Fevereiro","Mar\xE7o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],monthsShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],weekdays:["Domingo","Segunda-Feira","Ter\xE7a-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","S\xE1bado"],weekdaysShort:["Dom","Seg","Ter","Qua","Qui","Sex","S\xE1b"],weekdaysMin:["Dom","2\xAA","3\xAA","4\xAA","5\xAA","6\xAA","S\xE1b"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY [\xE0s] HH:mm",LLLL:"dddd, D [de] MMMM [de] YYYY [\xE0s] HH:mm"},calendar:{sameDay:"[Hoje \xE0s] LT",nextDay:"[Amanh\xE3 \xE0s] LT",nextWeek:"dddd [\xE0s] LT",lastDay:"[Ontem \xE0s] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[\xDAltimo] dddd [\xE0s] LT":"[\xDAltima] dddd [\xE0s] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"%s atr\xE1s",s:"poucos segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um m\xEAs",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinalParse:/\d{1,2}º/,ordinal:"%d\xBA"}),pt=moment__default.defineLocale("pt",{months:["Janeiro","Fevereiro","Mar\xE7o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],monthsShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],weekdays:["Domingo","Segunda-Feira","Ter\xE7a-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","S\xE1bado"],weekdaysShort:["Dom","Seg","Ter","Qua","Qui","Sex","S\xE1b"],weekdaysMin:["Dom","2\xAA","3\xAA","4\xAA","5\xAA","6\xAA","S\xE1b"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY HH:mm",LLLL:"dddd, D [de] MMMM [de] YYYY HH:mm"},calendar:{sameDay:"[Hoje \xE0s] LT",nextDay:"[Amanh\xE3 \xE0s] LT",nextWeek:"dddd [\xE0s] LT",lastDay:"[Ontem \xE0s] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[\xDAltimo] dddd [\xE0s] LT":"[\xDAltima] dddd [\xE0s] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"h\xE1 %s",s:"segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um m\xEAs",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinalParse:/\d{1,2}º/,ordinal:"%d\xBA",week:{dow:1,doy:4}}),ro=moment__default.defineLocale("ro",{months:["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie"],monthsShort:["ian.","febr.","mart.","apr.","mai","iun.","iul.","aug.","sept.","oct.","nov.","dec."],weekdays:["duminic\u0103","luni","mar\u021Bi","miercuri","joi","vineri","s\xE2mb\u0103t\u0103"],weekdaysShort:["Dum","Lun","Mar","Mie","Joi","Vin","S\xE2m"],weekdaysMin:["Du","Lu","Ma","Mi","Jo","Vi","S\xE2"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY H:mm",LLLL:"dddd, D MMMM YYYY H:mm"},calendar:{sameDay:"[azi la] LT",nextDay:"[m\xE2ine la] LT",nextWeek:"dddd [la] LT",lastDay:"[ieri la] LT",lastWeek:"[fosta] dddd [la] LT",sameElse:"L"},relativeTime:{future:"peste %s",past:"%s \xEEn urm\u0103",s:"c\xE2teva secunde",m:"un minut",mm:ro__relativeTimeWithPlural,h:"o or\u0103",hh:ro__relativeTimeWithPlural,d:"o zi",dd:ro__relativeTimeWithPlural,M:"o lun\u0103",MM:ro__relativeTimeWithPlural,y:"un an",yy:ro__relativeTimeWithPlural},week:{dow:1,doy:7}}),monthsParse=[/^янв/i,/^фев/i,/^мар/i,/^апр/i,/^ма[й|я]/i,/^июн/i,/^июл/i,/^авг/i,/^сен/i,/^окт/i,/^ноя/i,/^дек/i],ru=moment__default.defineLocale("ru",{months:{format:["\u042F\u043D\u0432\u0430\u0440\u044F","\u0424\u0435\u0432\u0440\u0430\u043B\u044F","\u041C\u0430\u0440\u0442\u0430","\u0410\u043F\u0440\u0435\u043B\u044F","\u041C\u0430\u044F","\u0418\u044E\u043D\u044F","\u0418\u044E\u043B\u044F","\u0410\u0432\u0433\u0443\u0441\u0442\u0430","\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044F","\u041E\u043A\u0442\u044F\u0431\u0440\u044F","\u041D\u043E\u044F\u0431\u0440\u044F","\u0414\u0435\u043A\u0430\u0431\u0440\u044F"],standalone:["\u042F\u043D\u0432\u0430\u0440\u044C","\u0424\u0435\u0432\u0440\u0430\u043B\u044C","\u041C\u0430\u0440\u0442","\u0410\u043F\u0440\u0435\u043B\u044C","\u041C\u0430\u0439","\u0418\u044E\u043D\u044C","\u0418\u044E\u043B\u044C","\u0410\u0432\u0433\u0443\u0441\u0442","\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C","\u041E\u043A\u0442\u044F\u0431\u0440\u044C","\u041D\u043E\u044F\u0431\u0440\u044C","\u0414\u0435\u043A\u0430\u0431\u0440\u044C"]},monthsShort:{format:["\u044F\u043D\u0432","\u0444\u0435\u0432","\u043C\u0430\u0440","\u0430\u043F\u0440","\u043C\u0430\u044F","\u0438\u044E\u043D\u044F","\u0438\u044E\u043B\u044F","\u0430\u0432\u0433","\u0441\u0435\u043D","\u043E\u043A\u0442","\u043D\u043E\u044F","\u0434\u0435\u043A"],standalone:["\u044F\u043D\u0432","\u0444\u0435\u0432","\u043C\u0430\u0440\u0442","\u0430\u043F\u0440","\u043C\u0430\u0439","\u0438\u044E\u043D\u044C","\u0438\u044E\u043B\u044C","\u0430\u0432\u0433","\u0441\u0435\u043D","\u043E\u043A\u0442","\u043D\u043E\u044F","\u0434\u0435\u043A"]},weekdays:{standalone:["\u0412\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435","\u041F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A","\u0412\u0442\u043E\u0440\u043D\u0438\u043A","\u0421\u0440\u0435\u0434\u0430","\u0427\u0435\u0442\u0432\u0435\u0440\u0433","\u041F\u044F\u0442\u043D\u0438\u0446\u0430","\u0421\u0443\u0431\u0431\u043E\u0442\u0430"],format:["\u0412\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435","\u041F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A","\u0412\u0442\u043E\u0440\u043D\u0438\u043A","\u0421\u0440\u0435\u0434\u0443","\u0427\u0435\u0442\u0432\u0435\u0440\u0433","\u041F\u044F\u0442\u043D\u0438\u0446\u0443","\u0421\u0443\u0431\u0431\u043E\u0442\u0443"],isFormat:/\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/},weekdaysShort:["\u0412\u0441","\u041F\u043D","\u0412\u0442","\u0421\u0440","\u0427\u0442","\u041F\u0442","\u0421\u0431"],weekdaysMin:["\u0412\u0441","\u041F\u043D","\u0412\u0442","\u0421\u0440","\u0427\u0442","\u041F\u0442","\u0421\u0431"],monthsParse:monthsParse,longMonthsParse:monthsParse,shortMonthsParse:monthsParse,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY \u0433.",LLL:"D MMMM YYYY \u0433., HH:mm",LLLL:"dddd, D MMMM YYYY \u0433., HH:mm"},calendar:{sameDay:"[\u0421\u0435\u0433\u043E\u0434\u043D\u044F \u0432] LT",nextDay:"[\u0417\u0430\u0432\u0442\u0440\u0430 \u0432] LT",lastDay:"[\u0412\u0447\u0435\u0440\u0430 \u0432] LT",nextWeek:function(now){if(now.week()!==this.week())switch(this.day()){case 0:return"[\u0412 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0435] dddd [\u0432] LT";case 1:case 2:case 4:return"[\u0412 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439] dddd [\u0432] LT";case 3:case 5:case 6:return"[\u0412 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0443\u044E] dddd [\u0432] LT";}else return 2===this.day()?"[\u0412\u043E] dddd [\u0432] LT":"[\u0412] dddd [\u0432] LT"},lastWeek:function(now){if(now.week()!==this.week())switch(this.day()){case 0:return"[\u0412 \u043F\u0440\u043E\u0448\u043B\u043E\u0435] dddd [\u0432] LT";case 1:case 2:case 4:return"[\u0412 \u043F\u0440\u043E\u0448\u043B\u044B\u0439] dddd [\u0432] LT";case 3:case 5:case 6:return"[\u0412 \u043F\u0440\u043E\u0448\u043B\u0443\u044E] dddd [\u0432] LT";}else return 2===this.day()?"[\u0412\u043E] dddd [\u0432] LT":"[\u0412] dddd [\u0432] LT"},sameElse:"L"},relativeTime:{future:"\u0447\u0435\u0440\u0435\u0437 %s",past:"%s \u043D\u0430\u0437\u0430\u0434",s:"\u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0441\u0435\u043A\u0443\u043D\u0434",m:ru__relativeTimeWithPlural,mm:ru__relativeTimeWithPlural,h:"\u0447\u0430\u0441",hh:ru__relativeTimeWithPlural,d:"\u0434\u0435\u043D\u044C",dd:ru__relativeTimeWithPlural,M:"\u043C\u0435\u0441\u044F\u0446",MM:ru__relativeTimeWithPlural,y:"\u0433\u043E\u0434",yy:ru__relativeTimeWithPlural},meridiemParse:/ночи|утра|дня|вечера/i,isPM:function(input){return /^(дня|вечера)$/.test(input)},meridiem:function(hour,minute,isLower){return 4>hour?"\u043D\u043E\u0447\u0438":12>hour?"\u0443\u0442\u0440\u0430":17>hour?"\u0434\u043D\u044F":"\u0432\u0435\u0447\u0435\u0440\u0430"},ordinalParse:/\d{1,2}-(й|го|я)/,ordinal:function(number,period){return"M"===period||"d"===period||"DDD"===period?number+"-\u0439":"D"===period?number+"-\u0433\u043E":"w"===period||"W"===period?number+"-\u044F":number},week:{dow:1,doy:7}}),se=moment__default.defineLocale("se",{months:["o\u0111\u0111ajagem\xE1nnu","guovvam\xE1nnu","njuk\u010Dam\xE1nnu","cuo\u014Bom\xE1nnu","miessem\xE1nnu","geassem\xE1nnu","suoidnem\xE1nnu","borgem\xE1nnu","\u010Dak\u010Dam\xE1nnu","golggotm\xE1nnu","sk\xE1bmam\xE1nnu","juovlam\xE1nnu"],monthsShort:["o\u0111\u0111j","guov","njuk","cuo","mies","geas","suoi","borg","\u010Dak\u010D","golg","sk\xE1b","juov"],weekdays:["sotnabeaivi","vuoss\xE1rga","ma\u014B\u014Beb\xE1rga","gaskavahkku","duorastat","bearjadat","l\xE1vvardat"],weekdaysShort:["sotn","vuos","ma\u014B","gask","duor","bear","l\xE1v"],weekdaysMin:["s","v","m","g","d","b","L"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"MMMM D. [b.] YYYY",LLL:"MMMM D. [b.] YYYY [ti.] HH:mm",LLLL:"dddd, MMMM D. [b.] YYYY [ti.] HH:mm"},calendar:{sameDay:"[otne ti] LT",nextDay:"[ihttin ti] LT",nextWeek:"dddd [ti] LT",lastDay:"[ikte ti] LT",lastWeek:"[ovddit] dddd [ti] LT",sameElse:"L"},relativeTime:{future:"%s gea\u017Ees",past:"ma\u014Bit %s",s:"moadde sekunddat",m:"okta minuhta",mm:"%d minuhtat",h:"okta diimmu",hh:"%d diimmut",d:"okta beaivi",dd:"%d beaivvit",M:"okta m\xE1nnu",MM:"%d m\xE1nut",y:"okta jahki",yy:"%d jagit"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),si=moment__default.defineLocale("si",{months:["\u0DA2\u0DB1\u0DC0\u0DCF\u0DBB\u0DD2","\u0DB4\u0DD9\u0DB6\u0DBB\u0DC0\u0DCF\u0DBB\u0DD2","\u0DB8\u0DCF\u0DBB\u0DCA\u0DAD\u0DD4","\u0D85\u0DB4\u0DCA\u200D\u0DBB\u0DDA\u0DBD\u0DCA","\u0DB8\u0DD0\u0DBA\u0DD2","\u0DA2\u0DD6\u0DB1\u0DD2","\u0DA2\u0DD6\u0DBD\u0DD2","\u0D85\u0D9C\u0DDD\u0DC3\u0DCA\u0DAD\u0DD4","\u0DC3\u0DD0\u0DB4\u0DCA\u0DAD\u0DD0\u0DB8\u0DCA\u0DB6\u0DBB\u0DCA","\u0D94\u0D9A\u0DCA\u0DAD\u0DDD\u0DB6\u0DBB\u0DCA","\u0DB1\u0DDC\u0DC0\u0DD0\u0DB8\u0DCA\u0DB6\u0DBB\u0DCA","\u0DAF\u0DD9\u0DC3\u0DD0\u0DB8\u0DCA\u0DB6\u0DBB\u0DCA"],monthsShort:["\u0DA2\u0DB1","\u0DB4\u0DD9\u0DB6","\u0DB8\u0DCF\u0DBB\u0DCA","\u0D85\u0DB4\u0DCA","\u0DB8\u0DD0\u0DBA\u0DD2","\u0DA2\u0DD6\u0DB1\u0DD2","\u0DA2\u0DD6\u0DBD\u0DD2","\u0D85\u0D9C\u0DDD","\u0DC3\u0DD0\u0DB4\u0DCA","\u0D94\u0D9A\u0DCA","\u0DB1\u0DDC\u0DC0\u0DD0","\u0DAF\u0DD9\u0DC3\u0DD0"],weekdays:["\u0D89\u0DBB\u0DD2\u0DAF\u0DCF","\u0DC3\u0DB3\u0DD4\u0DAF\u0DCF","\u0D85\u0D9F\u0DC4\u0DBB\u0DD4\u0DC0\u0DCF\u0DAF\u0DCF","\u0DB6\u0DAF\u0DCF\u0DAF\u0DCF","\u0DB6\u0DCA\u200D\u0DBB\u0DC4\u0DC3\u0DCA\u0DB4\u0DAD\u0DD2\u0DB1\u0DCA\u0DAF\u0DCF","\u0DC3\u0DD2\u0D9A\u0DD4\u0DBB\u0DCF\u0DAF\u0DCF","\u0DC3\u0DD9\u0DB1\u0DC3\u0DD4\u0DBB\u0DCF\u0DAF\u0DCF"],weekdaysShort:["\u0D89\u0DBB\u0DD2","\u0DC3\u0DB3\u0DD4","\u0D85\u0D9F","\u0DB6\u0DAF\u0DCF","\u0DB6\u0DCA\u200D\u0DBB\u0DC4","\u0DC3\u0DD2\u0D9A\u0DD4","\u0DC3\u0DD9\u0DB1"],weekdaysMin:["\u0D89","\u0DC3","\u0D85","\u0DB6","\u0DB6\u0DCA\u200D\u0DBB","\u0DC3\u0DD2","\u0DC3\u0DD9"],longDateFormat:{LT:"a h:mm",LTS:"a h:mm:ss",L:"YYYY/MM/DD",LL:"YYYY MMMM D",LLL:"YYYY MMMM D, a h:mm",LLLL:"YYYY MMMM D [\u0DC0\u0DD0\u0DB1\u0DD2] dddd, a h:mm:ss"},calendar:{sameDay:"[\u0D85\u0DAF] LT[\u0DA7]",nextDay:"[\u0DC4\u0DD9\u0DA7] LT[\u0DA7]",nextWeek:"dddd LT[\u0DA7]",lastDay:"[\u0D8A\u0DBA\u0DDA] LT[\u0DA7]",lastWeek:"[\u0DB4\u0DC3\u0DD4\u0D9C\u0DD2\u0DBA] dddd LT[\u0DA7]",sameElse:"L"},relativeTime:{future:"%s\u0D9A\u0DD2\u0DB1\u0DCA",past:"%s\u0D9A\u0DA7 \u0DB4\u0DD9\u0DBB",s:"\u0DAD\u0DAD\u0DCA\u0DB4\u0DBB \u0D9A\u0DD2\u0DC4\u0DD2\u0DB4\u0DBA",m:"\u0DB8\u0DD2\u0DB1\u0DD2\u0DAD\u0DCA\u0DAD\u0DD4\u0DC0",mm:"\u0DB8\u0DD2\u0DB1\u0DD2\u0DAD\u0DCA\u0DAD\u0DD4 %d",h:"\u0DB4\u0DD0\u0DBA",hh:"\u0DB4\u0DD0\u0DBA %d",d:"\u0DAF\u0DD2\u0DB1\u0DBA",dd:"\u0DAF\u0DD2\u0DB1 %d",M:"\u0DB8\u0DCF\u0DC3\u0DBA",MM:"\u0DB8\u0DCF\u0DC3 %d",y:"\u0DC0\u0DC3\u0DBB",yy:"\u0DC0\u0DC3\u0DBB %d"},ordinalParse:/\d{1,2} වැනි/,ordinal:function(number){return number+" \u0DC0\u0DD0\u0DB1\u0DD2"},meridiem:function(hours,minutes,isLower){return 11<hours?isLower?"\u0DB4.\u0DC0.":"\u0DB4\u0DC3\u0DCA \u0DC0\u0DBB\u0DD4":isLower?"\u0DB4\u0DD9.\u0DC0.":"\u0DB4\u0DD9\u0DBB \u0DC0\u0DBB\u0DD4"}}),sk__months=["janu\xE1r","febru\xE1r","marec","apr\xEDl","m\xE1j","j\xFAn","j\xFAl","august","september","okt\xF3ber","november","december"],sk__monthsShort=["jan","feb","mar","apr","m\xE1j","j\xFAn","j\xFAl","aug","sep","okt","nov","dec"],sk=moment__default.defineLocale("sk",{months:sk__months,monthsShort:sk__monthsShort,weekdays:["nede\u013Ea","pondelok","utorok","streda","\u0161tvrtok","piatok","sobota"],weekdaysShort:["ne","po","ut","st","\u0161t","pi","so"],weekdaysMin:["ne","po","ut","st","\u0161t","pi","so"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm"},calendar:{sameDay:"[dnes o] LT",nextDay:"[zajtra o] LT",nextWeek:function(){switch(this.day()){case 0:return"[v nede\u013Eu o] LT";case 1:case 2:return"[v] dddd [o] LT";case 3:return"[v stredu o] LT";case 4:return"[vo \u0161tvrtok o] LT";case 5:return"[v piatok o] LT";case 6:return"[v sobotu o] LT";}},lastDay:"[v\u010Dera o] LT",lastWeek:function(){switch(this.day()){case 0:return"[minul\xFA nede\u013Eu o] LT";case 1:case 2:return"[minul\xFD] dddd [o] LT";case 3:return"[minul\xFA stredu o] LT";case 4:case 5:return"[minul\xFD] dddd [o] LT";case 6:return"[minul\xFA sobotu o] LT";}},sameElse:"L"},relativeTime:{future:"za %s",past:"pred %s",s:sk__translate,m:sk__translate,mm:sk__translate,h:sk__translate,hh:sk__translate,d:sk__translate,dd:sk__translate,M:sk__translate,MM:sk__translate,y:sk__translate,yy:sk__translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),sl=moment__default.defineLocale("sl",{months:["januar","februar","marec","april","maj","junij","julij","avgust","september","oktober","november","december"],monthsShort:["jan.","feb.","mar.","apr.","maj.","jun.","jul.","avg.","sep.","okt.","nov.","dec."],weekdays:["nedelja","ponedeljek","torek","sreda","\u010Detrtek","petek","sobota"],weekdaysShort:["ned.","pon.","tor.","sre.","\u010Det.","pet.","sob."],weekdaysMin:["ne","po","to","sr","\u010De","pe","so"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danes ob] LT",nextDay:"[jutri ob] LT",nextWeek:function(){switch(this.day()){case 0:return"[v] [nedeljo] [ob] LT";case 3:return"[v] [sredo] [ob] LT";case 6:return"[v] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[v] dddd [ob] LT";}},lastDay:"[v\u010Deraj ob] LT",lastWeek:function(){switch(this.day()){case 0:return"[prej\u0161njo] [nedeljo] [ob] LT";case 3:return"[prej\u0161njo] [sredo] [ob] LT";case 6:return"[prej\u0161njo] [soboto] [ob] LT";case 1:case 2:case 4:case 5:return"[prej\u0161nji] dddd [ob] LT";}},sameElse:"L"},relativeTime:{future:"\u010Dez %s",past:"pred %s",s:sl__processRelativeTime,m:sl__processRelativeTime,mm:sl__processRelativeTime,h:sl__processRelativeTime,hh:sl__processRelativeTime,d:sl__processRelativeTime,dd:sl__processRelativeTime,M:sl__processRelativeTime,MM:sl__processRelativeTime,y:sl__processRelativeTime,yy:sl__processRelativeTime},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),sq=moment__default.defineLocale("sq",{months:["Janar","Shkurt","Mars","Prill","Maj","Qershor","Korrik","Gusht","Shtator","Tetor","N\xEBntor","Dhjetor"],monthsShort:["Jan","Shk","Mar","Pri","Maj","Qer","Kor","Gus","Sht","Tet","N\xEBn","Dhj"],weekdays:["E Diel","E H\xEBn\xEB","E Mart\xEB","E M\xEBrkur\xEB","E Enjte","E Premte","E Shtun\xEB"],weekdaysShort:["Die","H\xEBn","Mar","M\xEBr","Enj","Pre","Sht"],weekdaysMin:["D","H","Ma","M\xEB","E","P","Sh"],meridiemParse:/PD|MD/,isPM:function(input){return"M"===input.charAt(0)},meridiem:function(hours,minutes,isLower){return 12>hours?"PD":"MD"},longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[Sot n\xEB] LT",nextDay:"[Nes\xEBr n\xEB] LT",nextWeek:"dddd [n\xEB] LT",lastDay:"[Dje n\xEB] LT",lastWeek:"dddd [e kaluar n\xEB] LT",sameElse:"L"},relativeTime:{future:"n\xEB %s",past:"%s m\xEB par\xEB",s:"disa sekonda",m:"nj\xEB minut\xEB",mm:"%d minuta",h:"nj\xEB or\xEB",hh:"%d or\xEB",d:"nj\xEB dit\xEB",dd:"%d dit\xEB",M:"nj\xEB muaj",MM:"%d muaj",y:"nj\xEB vit",yy:"%d vite"},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),sr_cyrl__translator={words:{m:["\u0458\u0435\u0434\u0430\u043D \u043C\u0438\u043D\u0443\u0442","\u0458\u0435\u0434\u043D\u0435 \u043C\u0438\u043D\u0443\u0442\u0435"],mm:["\u043C\u0438\u043D\u0443\u0442","\u043C\u0438\u043D\u0443\u0442\u0435","\u043C\u0438\u043D\u0443\u0442\u0430"],h:["\u0458\u0435\u0434\u0430\u043D \u0441\u0430\u0442","\u0458\u0435\u0434\u043D\u043E\u0433 \u0441\u0430\u0442\u0430"],hh:["\u0441\u0430\u0442","\u0441\u0430\u0442\u0430","\u0441\u0430\u0442\u0438"],dd:["\u0434\u0430\u043D","\u0434\u0430\u043D\u0430","\u0434\u0430\u043D\u0430"],MM:["\u043C\u0435\u0441\u0435\u0446","\u043C\u0435\u0441\u0435\u0446\u0430","\u043C\u0435\u0441\u0435\u0446\u0438"],yy:["\u0433\u043E\u0434\u0438\u043D\u0430","\u0433\u043E\u0434\u0438\u043D\u0435","\u0433\u043E\u0434\u0438\u043D\u0430"]},correctGrammaticalCase:function(number,wordKey){return 1===number?wordKey[0]:2<=number&&4>=number?wordKey[1]:wordKey[2]},translate:function(number,withoutSuffix,key){var wordKey=sr_cyrl__translator.words[key];return 1===key.length?withoutSuffix?wordKey[0]:wordKey[1]:number+" "+sr_cyrl__translator.correctGrammaticalCase(number,wordKey)}},sr_cyrl=moment__default.defineLocale("sr-cyrl",{months:["\u0458\u0430\u043D\u0443\u0430\u0440","\u0444\u0435\u0431\u0440\u0443\u0430\u0440","\u043C\u0430\u0440\u0442","\u0430\u043F\u0440\u0438\u043B","\u043C\u0430\u0458","\u0458\u0443\u043D","\u0458\u0443\u043B","\u0430\u0432\u0433\u0443\u0441\u0442","\u0441\u0435\u043F\u0442\u0435\u043C\u0431\u0430\u0440","\u043E\u043A\u0442\u043E\u0431\u0430\u0440","\u043D\u043E\u0432\u0435\u043C\u0431\u0430\u0440","\u0434\u0435\u0446\u0435\u043C\u0431\u0430\u0440"],monthsShort:["\u0458\u0430\u043D.","\u0444\u0435\u0431.","\u043C\u0430\u0440.","\u0430\u043F\u0440.","\u043C\u0430\u0458","\u0458\u0443\u043D","\u0458\u0443\u043B","\u0430\u0432\u0433.","\u0441\u0435\u043F.","\u043E\u043A\u0442.","\u043D\u043E\u0432.","\u0434\u0435\u0446."],weekdays:["\u043D\u0435\u0434\u0435\u0459\u0430","\u043F\u043E\u043D\u0435\u0434\u0435\u0459\u0430\u043A","\u0443\u0442\u043E\u0440\u0430\u043A","\u0441\u0440\u0435\u0434\u0430","\u0447\u0435\u0442\u0432\u0440\u0442\u0430\u043A","\u043F\u0435\u0442\u0430\u043A","\u0441\u0443\u0431\u043E\u0442\u0430"],weekdaysShort:["\u043D\u0435\u0434.","\u043F\u043E\u043D.","\u0443\u0442\u043E.","\u0441\u0440\u0435.","\u0447\u0435\u0442.","\u043F\u0435\u0442.","\u0441\u0443\u0431."],weekdaysMin:["\u043D\u0435","\u043F\u043E","\u0443\u0442","\u0441\u0440","\u0447\u0435","\u043F\u0435","\u0441\u0443"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[\u0434\u0430\u043D\u0430\u0441 \u0443] LT",nextDay:"[\u0441\u0443\u0442\u0440\u0430 \u0443] LT",nextWeek:function(){switch(this.day()){case 0:return"[\u0443] [\u043D\u0435\u0434\u0435\u0459\u0443] [\u0443] LT";case 3:return"[\u0443] [\u0441\u0440\u0435\u0434\u0443] [\u0443] LT";case 6:return"[\u0443] [\u0441\u0443\u0431\u043E\u0442\u0443] [\u0443] LT";case 1:case 2:case 4:case 5:return"[\u0443] dddd [\u0443] LT";}},lastDay:"[\u0458\u0443\u0447\u0435 \u0443] LT",lastWeek:function(){var lastWeekDays=["[\u043F\u0440\u043E\u0448\u043B\u0435] [\u043D\u0435\u0434\u0435\u0459\u0435] [\u0443] LT","[\u043F\u0440\u043E\u0448\u043B\u043E\u0433] [\u043F\u043E\u043D\u0435\u0434\u0435\u0459\u043A\u0430] [\u0443] LT","[\u043F\u0440\u043E\u0448\u043B\u043E\u0433] [\u0443\u0442\u043E\u0440\u043A\u0430] [\u0443] LT","[\u043F\u0440\u043E\u0448\u043B\u0435] [\u0441\u0440\u0435\u0434\u0435] [\u0443] LT","[\u043F\u0440\u043E\u0448\u043B\u043E\u0433] [\u0447\u0435\u0442\u0432\u0440\u0442\u043A\u0430] [\u0443] LT","[\u043F\u0440\u043E\u0448\u043B\u043E\u0433] [\u043F\u0435\u0442\u043A\u0430] [\u0443] LT","[\u043F\u0440\u043E\u0448\u043B\u0435] [\u0441\u0443\u0431\u043E\u0442\u0435] [\u0443] LT"];return lastWeekDays[this.day()]},sameElse:"L"},relativeTime:{future:"\u0437\u0430 %s",past:"\u043F\u0440\u0435 %s",s:"\u043D\u0435\u043A\u043E\u043B\u0438\u043A\u043E \u0441\u0435\u043A\u0443\u043D\u0434\u0438",m:sr_cyrl__translator.translate,mm:sr_cyrl__translator.translate,h:sr_cyrl__translator.translate,hh:sr_cyrl__translator.translate,d:"\u0434\u0430\u043D",dd:sr_cyrl__translator.translate,M:"\u043C\u0435\u0441\u0435\u0446",MM:sr_cyrl__translator.translate,y:"\u0433\u043E\u0434\u0438\u043D\u0443",yy:sr_cyrl__translator.translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),sr__translator={words:{m:["jedan minut","jedne minute"],mm:["minut","minute","minuta"],h:["jedan sat","jednog sata"],hh:["sat","sata","sati"],dd:["dan","dana","dana"],MM:["mesec","meseca","meseci"],yy:["godina","godine","godina"]},correctGrammaticalCase:function(number,wordKey){return 1===number?wordKey[0]:2<=number&&4>=number?wordKey[1]:wordKey[2]},translate:function(number,withoutSuffix,key){var wordKey=sr__translator.words[key];return 1===key.length?withoutSuffix?wordKey[0]:wordKey[1]:number+" "+sr__translator.correctGrammaticalCase(number,wordKey)}},sr=moment__default.defineLocale("sr",{months:["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar"],monthsShort:["jan.","feb.","mar.","apr.","maj","jun","jul","avg.","sep.","okt.","nov.","dec."],weekdays:["nedelja","ponedeljak","utorak","sreda","\u010Detvrtak","petak","subota"],weekdaysShort:["ned.","pon.","uto.","sre.","\u010Det.","pet.","sub."],weekdaysMin:["ne","po","ut","sr","\u010De","pe","su"],longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD. MM. YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd, D. MMMM YYYY H:mm"},calendar:{sameDay:"[danas u] LT",nextDay:"[sutra u] LT",nextWeek:function(){switch(this.day()){case 0:return"[u] [nedelju] [u] LT";case 3:return"[u] [sredu] [u] LT";case 6:return"[u] [subotu] [u] LT";case 1:case 2:case 4:case 5:return"[u] dddd [u] LT";}},lastDay:"[ju\u010De u] LT",lastWeek:function(){var lastWeekDays=["[pro\u0161le] [nedelje] [u] LT","[pro\u0161log] [ponedeljka] [u] LT","[pro\u0161log] [utorka] [u] LT","[pro\u0161le] [srede] [u] LT","[pro\u0161log] [\u010Detvrtka] [u] LT","[pro\u0161log] [petka] [u] LT","[pro\u0161le] [subote] [u] LT"];return lastWeekDays[this.day()]},sameElse:"L"},relativeTime:{future:"za %s",past:"pre %s",s:"nekoliko sekundi",m:sr__translator.translate,mm:sr__translator.translate,h:sr__translator.translate,hh:sr__translator.translate,d:"dan",dd:sr__translator.translate,M:"mesec",MM:sr__translator.translate,y:"godinu",yy:sr__translator.translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:7}}),sv=moment__default.defineLocale("sv",{months:["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"],monthsShort:["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"],weekdays:["s\xF6ndag","m\xE5ndag","tisdag","onsdag","torsdag","fredag","l\xF6rdag"],weekdaysShort:["s\xF6n","m\xE5n","tis","ons","tor","fre","l\xF6r"],weekdaysMin:["s\xF6","m\xE5","ti","on","to","fr","l\xF6"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[Idag] LT",nextDay:"[Imorgon] LT",lastDay:"[Ig\xE5r] LT",nextWeek:"[P\xE5] dddd LT",lastWeek:"[I] dddd[s] LT",sameElse:"L"},relativeTime:{future:"om %s",past:"f\xF6r %s sedan",s:"n\xE5gra sekunder",m:"en minut",mm:"%d minuter",h:"en timme",hh:"%d timmar",d:"en dag",dd:"%d dagar",M:"en m\xE5nad",MM:"%d m\xE5nader",y:"ett \xE5r",yy:"%d \xE5r"},ordinalParse:/\d{1,2}(e|a)/,ordinal:function(number){var b=number%10,output=1==~~(number%100/10)?"e":1==b?"a":2==b?"a":3==b?"e":"e";return number+output},week:{dow:1,doy:4}}),sw=moment__default.defineLocale("sw",{months:["Januari","Februari","Machi","Aprili","Mei","Juni","Julai","Agosti","Septemba","Oktoba","Novemba","Desemba"],monthsShort:["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ago","Sep","Okt","Nov","Des"],weekdays:["Jumapili","Jumatatu","Jumanne","Jumatano","Alhamisi","Ijumaa","Jumamosi"],weekdaysShort:["Jpl","Jtat","Jnne","Jtan","Alh","Ijm","Jmos"],weekdaysMin:["J2","J3","J4","J5","Al","Ij","J1"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[leo saa] LT",nextDay:"[kesho saa] LT",nextWeek:"[wiki ijayo] dddd [saat] LT",lastDay:"[jana] LT",lastWeek:"[wiki iliyopita] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s baadaye",past:"tokea %s",s:"hivi punde",m:"dakika moja",mm:"dakika %d",h:"saa limoja",hh:"masaa %d",d:"siku moja",dd:"masiku %d",M:"mwezi mmoja",MM:"miezi %d",y:"mwaka mmoja",yy:"miaka %d"},week:{dow:1,doy:7}}),ta__symbolMap={1:"\u0BE7",2:"\u0BE8",3:"\u0BE9",4:"\u0BEA",5:"\u0BEB",6:"\u0BEC",7:"\u0BED",8:"\u0BEE",9:"\u0BEF",0:"\u0BE6"},ta__numberMap={"௧":"1","௨":"2","௩":"3","௪":"4","௫":"5","௬":"6","௭":"7","௮":"8","௯":"9","௦":"0"},ta=moment__default.defineLocale("ta",{months:["\u0B9C\u0BA9\u0BB5\u0BB0\u0BBF","\u0BAA\u0BBF\u0BAA\u0BCD\u0BB0\u0BB5\u0BB0\u0BBF","\u0BAE\u0BBE\u0BB0\u0BCD\u0B9A\u0BCD","\u0B8F\u0BAA\u0BCD\u0BB0\u0BB2\u0BCD","\u0BAE\u0BC7","\u0B9C\u0BC2\u0BA9\u0BCD","\u0B9C\u0BC2\u0BB2\u0BC8","\u0B86\u0B95\u0BB8\u0BCD\u0B9F\u0BCD","\u0B9A\u0BC6\u0BAA\u0BCD\u0B9F\u0BC6\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD","\u0B85\u0B95\u0BCD\u0B9F\u0BC7\u0BBE\u0BAA\u0BB0\u0BCD","\u0BA8\u0BB5\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD","\u0B9F\u0BBF\u0B9A\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD"],monthsShort:["\u0B9C\u0BA9\u0BB5\u0BB0\u0BBF","\u0BAA\u0BBF\u0BAA\u0BCD\u0BB0\u0BB5\u0BB0\u0BBF","\u0BAE\u0BBE\u0BB0\u0BCD\u0B9A\u0BCD","\u0B8F\u0BAA\u0BCD\u0BB0\u0BB2\u0BCD","\u0BAE\u0BC7","\u0B9C\u0BC2\u0BA9\u0BCD","\u0B9C\u0BC2\u0BB2\u0BC8","\u0B86\u0B95\u0BB8\u0BCD\u0B9F\u0BCD","\u0B9A\u0BC6\u0BAA\u0BCD\u0B9F\u0BC6\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD","\u0B85\u0B95\u0BCD\u0B9F\u0BC7\u0BBE\u0BAA\u0BB0\u0BCD","\u0BA8\u0BB5\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD","\u0B9F\u0BBF\u0B9A\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD"],weekdays:["\u0B9E\u0BBE\u0BAF\u0BBF\u0BB1\u0BCD\u0BB1\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8","\u0BA4\u0BBF\u0B99\u0BCD\u0B95\u0B9F\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8","\u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8","\u0BAA\u0BC1\u0BA4\u0BA9\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8","\u0BB5\u0BBF\u0BAF\u0BBE\u0BB4\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8","\u0BB5\u0BC6\u0BB3\u0BCD\u0BB3\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8","\u0B9A\u0BA9\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB4\u0BAE\u0BC8"],weekdaysShort:["\u0B9E\u0BBE\u0BAF\u0BBF\u0BB1\u0BC1","\u0BA4\u0BBF\u0B99\u0BCD\u0B95\u0BB3\u0BCD","\u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD","\u0BAA\u0BC1\u0BA4\u0BA9\u0BCD","\u0BB5\u0BBF\u0BAF\u0BBE\u0BB4\u0BA9\u0BCD","\u0BB5\u0BC6\u0BB3\u0BCD\u0BB3\u0BBF","\u0B9A\u0BA9\u0BBF"],weekdaysMin:["\u0B9E\u0BBE","\u0BA4\u0BBF","\u0B9A\u0BC6","\u0BAA\u0BC1","\u0BB5\u0BBF","\u0BB5\u0BC6","\u0B9A"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, HH:mm",LLLL:"dddd, D MMMM YYYY, HH:mm"},calendar:{sameDay:"[\u0B87\u0BA9\u0BCD\u0BB1\u0BC1] LT",nextDay:"[\u0BA8\u0BBE\u0BB3\u0BC8] LT",nextWeek:"dddd, LT",lastDay:"[\u0BA8\u0BC7\u0BB1\u0BCD\u0BB1\u0BC1] LT",lastWeek:"[\u0B95\u0B9F\u0BA8\u0BCD\u0BA4 \u0BB5\u0BBE\u0BB0\u0BAE\u0BCD] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0B87\u0BB2\u0BCD",past:"%s \u0BAE\u0BC1\u0BA9\u0BCD",s:"\u0B92\u0BB0\u0BC1 \u0B9A\u0BBF\u0BB2 \u0BB5\u0BBF\u0BA8\u0BBE\u0B9F\u0BBF\u0B95\u0BB3\u0BCD",m:"\u0B92\u0BB0\u0BC1 \u0BA8\u0BBF\u0BAE\u0BBF\u0B9F\u0BAE\u0BCD",mm:"%d \u0BA8\u0BBF\u0BAE\u0BBF\u0B9F\u0B99\u0BCD\u0B95\u0BB3\u0BCD",h:"\u0B92\u0BB0\u0BC1 \u0BAE\u0BA3\u0BBF \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",hh:"%d \u0BAE\u0BA3\u0BBF \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",d:"\u0B92\u0BB0\u0BC1 \u0BA8\u0BBE\u0BB3\u0BCD",dd:"%d \u0BA8\u0BBE\u0B9F\u0BCD\u0B95\u0BB3\u0BCD",M:"\u0B92\u0BB0\u0BC1 \u0BAE\u0BBE\u0BA4\u0BAE\u0BCD",MM:"%d \u0BAE\u0BBE\u0BA4\u0B99\u0BCD\u0B95\u0BB3\u0BCD",y:"\u0B92\u0BB0\u0BC1 \u0BB5\u0BB0\u0BC1\u0B9F\u0BAE\u0BCD",yy:"%d \u0B86\u0BA3\u0BCD\u0B9F\u0BC1\u0B95\u0BB3\u0BCD"},ordinalParse:/\d{1,2}வது/,ordinal:function(number){return number+"\u0BB5\u0BA4\u0BC1"},preparse:function(string){return string.replace(/[௧௨௩௪௫௬௭௮௯௦]/g,function(match){return ta__numberMap[match]})},postformat:function(string){return string.replace(/\d/g,function(match){return ta__symbolMap[match]})},meridiemParse:/யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,meridiem:function(hour,minute,isLower){return 2>hour?" \u0BAF\u0BBE\u0BAE\u0BAE\u0BCD":6>hour?" \u0BB5\u0BC8\u0B95\u0BB1\u0BC8":10>hour?" \u0B95\u0BBE\u0BB2\u0BC8":14>hour?" \u0BA8\u0BA3\u0BCD\u0BAA\u0B95\u0BB2\u0BCD":18>hour?" \u0B8E\u0BB1\u0BCD\u0BAA\u0BBE\u0B9F\u0BC1":22>hour?" \u0BAE\u0BBE\u0BB2\u0BC8":" \u0BAF\u0BBE\u0BAE\u0BAE\u0BCD"},meridiemHour:function(hour,meridiem){return 12===hour&&(hour=0),"\u0BAF\u0BBE\u0BAE\u0BAE\u0BCD"===meridiem?2>hour?hour:hour+12:"\u0BB5\u0BC8\u0B95\u0BB1\u0BC8"===meridiem||"\u0B95\u0BBE\u0BB2\u0BC8"===meridiem?hour:"\u0BA8\u0BA3\u0BCD\u0BAA\u0B95\u0BB2\u0BCD"===meridiem?10<=hour?hour:hour+12:hour+12},week:{dow:0,doy:6}}),te=moment__default.defineLocale("te",{months:["\u0C1C\u0C28\u0C35\u0C30\u0C3F","\u0C2B\u0C3F\u0C2C\u0C4D\u0C30\u0C35\u0C30\u0C3F","\u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C3F","\u0C0F\u0C2A\u0C4D\u0C30\u0C3F\u0C32\u0C4D","\u0C2E\u0C47","\u0C1C\u0C42\u0C28\u0C4D","\u0C1C\u0C42\u0C32\u0C46\u0C56","\u0C06\u0C17\u0C38\u0C4D\u0C1F\u0C41","\u0C38\u0C46\u0C2A\u0C4D\u0C1F\u0C46\u0C02\u0C2C\u0C30\u0C4D","\u0C05\u0C15\u0C4D\u0C1F\u0C4B\u0C2C\u0C30\u0C4D","\u0C28\u0C35\u0C02\u0C2C\u0C30\u0C4D","\u0C21\u0C3F\u0C38\u0C46\u0C02\u0C2C\u0C30\u0C4D"],monthsShort:["\u0C1C\u0C28.","\u0C2B\u0C3F\u0C2C\u0C4D\u0C30.","\u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C3F","\u0C0F\u0C2A\u0C4D\u0C30\u0C3F.","\u0C2E\u0C47","\u0C1C\u0C42\u0C28\u0C4D","\u0C1C\u0C42\u0C32\u0C46\u0C56","\u0C06\u0C17.","\u0C38\u0C46\u0C2A\u0C4D.","\u0C05\u0C15\u0C4D\u0C1F\u0C4B.","\u0C28\u0C35.","\u0C21\u0C3F\u0C38\u0C46."],weekdays:["\u0C06\u0C26\u0C3F\u0C35\u0C3E\u0C30\u0C02","\u0C38\u0C4B\u0C2E\u0C35\u0C3E\u0C30\u0C02","\u0C2E\u0C02\u0C17\u0C33\u0C35\u0C3E\u0C30\u0C02","\u0C2C\u0C41\u0C27\u0C35\u0C3E\u0C30\u0C02","\u0C17\u0C41\u0C30\u0C41\u0C35\u0C3E\u0C30\u0C02","\u0C36\u0C41\u0C15\u0C4D\u0C30\u0C35\u0C3E\u0C30\u0C02","\u0C36\u0C28\u0C3F\u0C35\u0C3E\u0C30\u0C02"],weekdaysShort:["\u0C06\u0C26\u0C3F","\u0C38\u0C4B\u0C2E","\u0C2E\u0C02\u0C17\u0C33","\u0C2C\u0C41\u0C27","\u0C17\u0C41\u0C30\u0C41","\u0C36\u0C41\u0C15\u0C4D\u0C30","\u0C36\u0C28\u0C3F"],weekdaysMin:["\u0C06","\u0C38\u0C4B","\u0C2E\u0C02","\u0C2C\u0C41","\u0C17\u0C41","\u0C36\u0C41","\u0C36"],longDateFormat:{LT:"A h:mm",LTS:"A h:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm",LLLL:"dddd, D MMMM YYYY, A h:mm"},calendar:{sameDay:"[\u0C28\u0C47\u0C21\u0C41] LT",nextDay:"[\u0C30\u0C47\u0C2A\u0C41] LT",nextWeek:"dddd, LT",lastDay:"[\u0C28\u0C3F\u0C28\u0C4D\u0C28] LT",lastWeek:"[\u0C17\u0C24] dddd, LT",sameElse:"L"},relativeTime:{future:"%s \u0C32\u0C4B",past:"%s \u0C15\u0C4D\u0C30\u0C3F\u0C24\u0C02",s:"\u0C15\u0C4A\u0C28\u0C4D\u0C28\u0C3F \u0C15\u0C4D\u0C37\u0C23\u0C3E\u0C32\u0C41",m:"\u0C12\u0C15 \u0C28\u0C3F\u0C2E\u0C3F\u0C37\u0C02",mm:"%d \u0C28\u0C3F\u0C2E\u0C3F\u0C37\u0C3E\u0C32\u0C41",h:"\u0C12\u0C15 \u0C17\u0C02\u0C1F",hh:"%d \u0C17\u0C02\u0C1F\u0C32\u0C41",d:"\u0C12\u0C15 \u0C30\u0C4B\u0C1C\u0C41",dd:"%d \u0C30\u0C4B\u0C1C\u0C41\u0C32\u0C41",M:"\u0C12\u0C15 \u0C28\u0C46\u0C32",MM:"%d \u0C28\u0C46\u0C32\u0C32\u0C41",y:"\u0C12\u0C15 \u0C38\u0C02\u0C35\u0C24\u0C4D\u0C38\u0C30\u0C02",yy:"%d \u0C38\u0C02\u0C35\u0C24\u0C4D\u0C38\u0C30\u0C3E\u0C32\u0C41"},ordinalParse:/\d{1,2}వ/,ordinal:"%d\u0C35",meridiemParse:/రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,meridiemHour:function(hour,meridiem){return(12===hour&&(hour=0),"\u0C30\u0C3E\u0C24\u0C4D\u0C30\u0C3F"===meridiem)?4>hour?hour:hour+12:"\u0C09\u0C26\u0C2F\u0C02"===meridiem?hour:"\u0C2E\u0C27\u0C4D\u0C2F\u0C3E\u0C39\u0C4D\u0C28\u0C02"===meridiem?10<=hour?hour:hour+12:"\u0C38\u0C3E\u0C2F\u0C02\u0C24\u0C4D\u0C30\u0C02"===meridiem?hour+12:void 0},meridiem:function(hour,minute,isLower){return 4>hour?"\u0C30\u0C3E\u0C24\u0C4D\u0C30\u0C3F":10>hour?"\u0C09\u0C26\u0C2F\u0C02":17>hour?"\u0C2E\u0C27\u0C4D\u0C2F\u0C3E\u0C39\u0C4D\u0C28\u0C02":20>hour?"\u0C38\u0C3E\u0C2F\u0C02\u0C24\u0C4D\u0C30\u0C02":"\u0C30\u0C3E\u0C24\u0C4D\u0C30\u0C3F"},week:{dow:0,doy:6}}),th=moment__default.defineLocale("th",{months:["\u0E21\u0E01\u0E23\u0E32\u0E04\u0E21","\u0E01\u0E38\u0E21\u0E20\u0E32\u0E1E\u0E31\u0E19\u0E18\u0E4C","\u0E21\u0E35\u0E19\u0E32\u0E04\u0E21","\u0E40\u0E21\u0E29\u0E32\u0E22\u0E19","\u0E1E\u0E24\u0E29\u0E20\u0E32\u0E04\u0E21","\u0E21\u0E34\u0E16\u0E38\u0E19\u0E32\u0E22\u0E19","\u0E01\u0E23\u0E01\u0E0E\u0E32\u0E04\u0E21","\u0E2A\u0E34\u0E07\u0E2B\u0E32\u0E04\u0E21","\u0E01\u0E31\u0E19\u0E22\u0E32\u0E22\u0E19","\u0E15\u0E38\u0E25\u0E32\u0E04\u0E21","\u0E1E\u0E24\u0E28\u0E08\u0E34\u0E01\u0E32\u0E22\u0E19","\u0E18\u0E31\u0E19\u0E27\u0E32\u0E04\u0E21"],monthsShort:["\u0E21\u0E01\u0E23\u0E32","\u0E01\u0E38\u0E21\u0E20\u0E32","\u0E21\u0E35\u0E19\u0E32","\u0E40\u0E21\u0E29\u0E32","\u0E1E\u0E24\u0E29\u0E20\u0E32","\u0E21\u0E34\u0E16\u0E38\u0E19\u0E32","\u0E01\u0E23\u0E01\u0E0E\u0E32","\u0E2A\u0E34\u0E07\u0E2B\u0E32","\u0E01\u0E31\u0E19\u0E22\u0E32","\u0E15\u0E38\u0E25\u0E32","\u0E1E\u0E24\u0E28\u0E08\u0E34\u0E01\u0E32","\u0E18\u0E31\u0E19\u0E27\u0E32"],weekdays:["\u0E2D\u0E32\u0E17\u0E34\u0E15\u0E22\u0E4C","\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C","\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23","\u0E1E\u0E38\u0E18","\u0E1E\u0E24\u0E2B\u0E31\u0E2A\u0E1A\u0E14\u0E35","\u0E28\u0E38\u0E01\u0E23\u0E4C","\u0E40\u0E2A\u0E32\u0E23\u0E4C"],weekdaysShort:["\u0E2D\u0E32\u0E17\u0E34\u0E15\u0E22\u0E4C","\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C","\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23","\u0E1E\u0E38\u0E18","\u0E1E\u0E24\u0E2B\u0E31\u0E2A","\u0E28\u0E38\u0E01\u0E23\u0E4C","\u0E40\u0E2A\u0E32\u0E23\u0E4C"],weekdaysMin:["\u0E2D\u0E32.","\u0E08.","\u0E2D.","\u0E1E.","\u0E1E\u0E24.","\u0E28.","\u0E2A."],longDateFormat:{LT:"H \u0E19\u0E32\u0E2C\u0E34\u0E01\u0E32 m \u0E19\u0E32\u0E17\u0E35",LTS:"H \u0E19\u0E32\u0E2C\u0E34\u0E01\u0E32 m \u0E19\u0E32\u0E17\u0E35 s \u0E27\u0E34\u0E19\u0E32\u0E17\u0E35",L:"YYYY/MM/DD",LL:"D MMMM YYYY",LLL:"D MMMM YYYY \u0E40\u0E27\u0E25\u0E32 H \u0E19\u0E32\u0E2C\u0E34\u0E01\u0E32 m \u0E19\u0E32\u0E17\u0E35",LLLL:"\u0E27\u0E31\u0E19dddd\u0E17\u0E35\u0E48 D MMMM YYYY \u0E40\u0E27\u0E25\u0E32 H \u0E19\u0E32\u0E2C\u0E34\u0E01\u0E32 m \u0E19\u0E32\u0E17\u0E35"},meridiemParse:/ก่อนเที่ยง|หลังเที่ยง/,isPM:function(input){return"\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E17\u0E35\u0E48\u0E22\u0E07"===input},meridiem:function(hour,minute,isLower){return 12>hour?"\u0E01\u0E48\u0E2D\u0E19\u0E40\u0E17\u0E35\u0E48\u0E22\u0E07":"\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E17\u0E35\u0E48\u0E22\u0E07"},calendar:{sameDay:"[\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 \u0E40\u0E27\u0E25\u0E32] LT",nextDay:"[\u0E1E\u0E23\u0E38\u0E48\u0E07\u0E19\u0E35\u0E49 \u0E40\u0E27\u0E25\u0E32] LT",nextWeek:"dddd[\u0E2B\u0E19\u0E49\u0E32 \u0E40\u0E27\u0E25\u0E32] LT",lastDay:"[\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E27\u0E32\u0E19\u0E19\u0E35\u0E49 \u0E40\u0E27\u0E25\u0E32] LT",lastWeek:"[\u0E27\u0E31\u0E19]dddd[\u0E17\u0E35\u0E48\u0E41\u0E25\u0E49\u0E27 \u0E40\u0E27\u0E25\u0E32] LT",sameElse:"L"},relativeTime:{future:"\u0E2D\u0E35\u0E01 %s",past:"%s\u0E17\u0E35\u0E48\u0E41\u0E25\u0E49\u0E27",s:"\u0E44\u0E21\u0E48\u0E01\u0E35\u0E48\u0E27\u0E34\u0E19\u0E32\u0E17\u0E35",m:"1 \u0E19\u0E32\u0E17\u0E35",mm:"%d \u0E19\u0E32\u0E17\u0E35",h:"1 \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07",hh:"%d \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07",d:"1 \u0E27\u0E31\u0E19",dd:"%d \u0E27\u0E31\u0E19",M:"1 \u0E40\u0E14\u0E37\u0E2D\u0E19",MM:"%d \u0E40\u0E14\u0E37\u0E2D\u0E19",y:"1 \u0E1B\u0E35",yy:"%d \u0E1B\u0E35"}}),tl_ph=moment__default.defineLocale("tl-ph",{months:["Enero","Pebrero","Marso","Abril","Mayo","Hunyo","Hulyo","Agosto","Setyembre","Oktubre","Nobyembre","Disyembre"],monthsShort:["Ene","Peb","Mar","Abr","May","Hun","Hul","Ago","Set","Okt","Nob","Dis"],weekdays:["Linggo","Lunes","Martes","Miyerkules","Huwebes","Biyernes","Sabado"],weekdaysShort:["Lin","Lun","Mar","Miy","Huw","Biy","Sab"],weekdaysMin:["Li","Lu","Ma","Mi","Hu","Bi","Sab"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"MM/D/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY HH:mm",LLLL:"dddd, MMMM DD, YYYY HH:mm"},calendar:{sameDay:"[Ngayon sa] LT",nextDay:"[Bukas sa] LT",nextWeek:"dddd [sa] LT",lastDay:"[Kahapon sa] LT",lastWeek:"dddd [huling linggo] LT",sameElse:"L"},relativeTime:{future:"sa loob ng %s",past:"%s ang nakalipas",s:"ilang segundo",m:"isang minuto",mm:"%d minuto",h:"isang oras",hh:"%d oras",d:"isang araw",dd:"%d araw",M:"isang buwan",MM:"%d buwan",y:"isang taon",yy:"%d taon"},ordinalParse:/\d{1,2}/,ordinal:function(number){return number},week:{dow:1,doy:4}}),numbersNouns=["pagh","wa\u2019","cha\u2019","wej","loS","vagh","jav","Soch","chorgh","Hut"],tlh=moment__default.defineLocale("tlh",{months:["tera\u2019 jar wa\u2019","tera\u2019 jar cha\u2019","tera\u2019 jar wej","tera\u2019 jar loS","tera\u2019 jar vagh","tera\u2019 jar jav","tera\u2019 jar Soch","tera\u2019 jar chorgh","tera\u2019 jar Hut","tera\u2019 jar wa\u2019maH","tera\u2019 jar wa\u2019maH wa\u2019","tera\u2019 jar wa\u2019maH cha\u2019"],monthsShort:["jar wa\u2019","jar cha\u2019","jar wej","jar loS","jar vagh","jar jav","jar Soch","jar chorgh","jar Hut","jar wa\u2019maH","jar wa\u2019maH wa\u2019","jar wa\u2019maH cha\u2019"],weekdays:["lojmItjaj","DaSjaj","povjaj","ghItlhjaj","loghjaj","buqjaj","ghInjaj"],weekdaysShort:["lojmItjaj","DaSjaj","povjaj","ghItlhjaj","loghjaj","buqjaj","ghInjaj"],weekdaysMin:["lojmItjaj","DaSjaj","povjaj","ghItlhjaj","loghjaj","buqjaj","ghInjaj"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[DaHjaj] LT",nextDay:"[wa\u2019leS] LT",nextWeek:"LLL",lastDay:"[wa\u2019Hu\u2019] LT",lastWeek:"LLL",sameElse:"L"},relativeTime:{future:translateFuture,past:translatePast,s:"puS lup",m:"wa\u2019 tup",mm:tlh__translate,h:"wa\u2019 rep",hh:tlh__translate,d:"wa\u2019 jaj",dd:tlh__translate,M:"wa\u2019 jar",MM:tlh__translate,y:"wa\u2019 DIS",yy:tlh__translate},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),tr__suffixes={1:"'inci",5:"'inci",8:"'inci",70:"'inci",80:"'inci",2:"'nci",7:"'nci",20:"'nci",50:"'nci",3:"'\xFCnc\xFC",4:"'\xFCnc\xFC",100:"'\xFCnc\xFC",6:"'nc\u0131",9:"'uncu",10:"'uncu",30:"'uncu",60:"'\u0131nc\u0131",90:"'\u0131nc\u0131"},tr=moment__default.defineLocale("tr",{months:["Ocak","\u015Eubat","Mart","Nisan","May\u0131s","Haziran","Temmuz","A\u011Fustos","Eyl\xFCl","Ekim","Kas\u0131m","Aral\u0131k"],monthsShort:["Oca","\u015Eub","Mar","Nis","May","Haz","Tem","A\u011Fu","Eyl","Eki","Kas","Ara"],weekdays:["Pazar","Pazartesi","Sal\u0131","\xC7ar\u015Famba","Per\u015Fembe","Cuma","Cumartesi"],weekdaysShort:["Paz","Pts","Sal","\xC7ar","Per","Cum","Cts"],weekdaysMin:["Pz","Pt","Sa","\xC7a","Pe","Cu","Ct"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[bug\xFCn saat] LT",nextDay:"[yar\u0131n saat] LT",nextWeek:"[haftaya] dddd [saat] LT",lastDay:"[d\xFCn] LT",lastWeek:"[ge\xE7en hafta] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s \xF6nce",s:"birka\xE7 saniye",m:"bir dakika",mm:"%d dakika",h:"bir saat",hh:"%d saat",d:"bir g\xFCn",dd:"%d g\xFCn",M:"bir ay",MM:"%d ay",y:"bir y\u0131l",yy:"%d y\u0131l"},ordinalParse:/\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,ordinal:function(number){if(0===number)return number+"'\u0131nc\u0131";var a=number%10,b=number%100-a,c=100<=number?100:null;return number+(tr__suffixes[a]||tr__suffixes[b]||tr__suffixes[c])},week:{dow:1,doy:7}}),tzl=moment__default.defineLocale("tzl",{months:["Januar","Fevraglh","Mar\xE7","Avr\xEFu","Mai","G\xFCn","Julia","Guscht","Setemvar","Listop\xE4ts","Noemvar","Zecemvar"],monthsShort:["Jan","Fev","Mar","Avr","Mai","G\xFCn","Jul","Gus","Set","Lis","Noe","Zec"],weekdays:["S\xFAladi","L\xFAne\xE7i","Maitzi","M\xE1rcuri","Xh\xFAadi","Vi\xE9ner\xE7i","S\xE1turi"],weekdaysShort:["S\xFAl","L\xFAn","Mai","M\xE1r","Xh\xFA","Vi\xE9","S\xE1t"],weekdaysMin:["S\xFA","L\xFA","Ma","M\xE1","Xh","Vi","S\xE1"],longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"D. MMMM [dallas] YYYY",LLL:"D. MMMM [dallas] YYYY HH.mm",LLLL:"dddd, [li] D. MMMM [dallas] YYYY HH.mm"},meridiem:function(hours,minutes,isLower){return 11<hours?isLower?"d'o":"D'O":isLower?"d'a":"D'A"},calendar:{sameDay:"[oxhi \xE0] LT",nextDay:"[dem\xE0 \xE0] LT",nextWeek:"dddd [\xE0] LT",lastDay:"[ieiri \xE0] LT",lastWeek:"[s\xFCr el] dddd [lasteu \xE0] LT",sameElse:"L"},relativeTime:{future:"osprei %s",past:"ja%s",s:tzl__processRelativeTime,m:tzl__processRelativeTime,mm:tzl__processRelativeTime,h:tzl__processRelativeTime,hh:tzl__processRelativeTime,d:tzl__processRelativeTime,dd:tzl__processRelativeTime,M:tzl__processRelativeTime,MM:tzl__processRelativeTime,y:tzl__processRelativeTime,yy:tzl__processRelativeTime},ordinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}}),tzm_latn=moment__default.defineLocale("tzm-latn",{months:["innayr","br\u02E4ayr\u02E4","mar\u02E4s\u02E4","ibrir","mayyw","ywnyw","ywlywz","\u0263w\u0161t","\u0161wtanbir","kt\u02E4wbr\u02E4","nwwanbir","dwjnbir"],monthsShort:["innayr","br\u02E4ayr\u02E4","mar\u02E4s\u02E4","ibrir","mayyw","ywnyw","ywlywz","\u0263w\u0161t","\u0161wtanbir","kt\u02E4wbr\u02E4","nwwanbir","dwjnbir"],weekdays:["asamas","aynas","asinas","akras","akwas","asimwas","asi\u1E0Dyas"],weekdaysShort:["asamas","aynas","asinas","akras","akwas","asimwas","asi\u1E0Dyas"],weekdaysMin:["asamas","aynas","asinas","akras","akwas","asimwas","asi\u1E0Dyas"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[asdkh g] LT",nextDay:"[aska g] LT",nextWeek:"dddd [g] LT",lastDay:"[assant g] LT",lastWeek:"dddd [g] LT",sameElse:"L"},relativeTime:{future:"dadkh s yan %s",past:"yan %s",s:"imik",m:"minu\u1E0D",mm:"%d minu\u1E0D",h:"sa\u025Ba",hh:"%d tassa\u025Bin",d:"ass",dd:"%d ossan",M:"ayowr",MM:"%d iyyirn",y:"asgas",yy:"%d isgasn"},week:{dow:6,doy:12}}),tzm=moment__default.defineLocale("tzm",{months:["\u2D49\u2D4F\u2D4F\u2D30\u2D62\u2D54","\u2D31\u2D55\u2D30\u2D62\u2D55","\u2D4E\u2D30\u2D55\u2D5A","\u2D49\u2D31\u2D54\u2D49\u2D54","\u2D4E\u2D30\u2D62\u2D62\u2D53","\u2D62\u2D53\u2D4F\u2D62\u2D53","\u2D62\u2D53\u2D4D\u2D62\u2D53\u2D63","\u2D56\u2D53\u2D5B\u2D5C","\u2D5B\u2D53\u2D5C\u2D30\u2D4F\u2D31\u2D49\u2D54","\u2D3D\u2D5F\u2D53\u2D31\u2D55","\u2D4F\u2D53\u2D61\u2D30\u2D4F\u2D31\u2D49\u2D54","\u2D37\u2D53\u2D4A\u2D4F\u2D31\u2D49\u2D54"],monthsShort:["\u2D49\u2D4F\u2D4F\u2D30\u2D62\u2D54","\u2D31\u2D55\u2D30\u2D62\u2D55","\u2D4E\u2D30\u2D55\u2D5A","\u2D49\u2D31\u2D54\u2D49\u2D54","\u2D4E\u2D30\u2D62\u2D62\u2D53","\u2D62\u2D53\u2D4F\u2D62\u2D53","\u2D62\u2D53\u2D4D\u2D62\u2D53\u2D63","\u2D56\u2D53\u2D5B\u2D5C","\u2D5B\u2D53\u2D5C\u2D30\u2D4F\u2D31\u2D49\u2D54","\u2D3D\u2D5F\u2D53\u2D31\u2D55","\u2D4F\u2D53\u2D61\u2D30\u2D4F\u2D31\u2D49\u2D54","\u2D37\u2D53\u2D4A\u2D4F\u2D31\u2D49\u2D54"],weekdays:["\u2D30\u2D59\u2D30\u2D4E\u2D30\u2D59","\u2D30\u2D62\u2D4F\u2D30\u2D59","\u2D30\u2D59\u2D49\u2D4F\u2D30\u2D59","\u2D30\u2D3D\u2D54\u2D30\u2D59","\u2D30\u2D3D\u2D61\u2D30\u2D59","\u2D30\u2D59\u2D49\u2D4E\u2D61\u2D30\u2D59","\u2D30\u2D59\u2D49\u2D39\u2D62\u2D30\u2D59"],weekdaysShort:["\u2D30\u2D59\u2D30\u2D4E\u2D30\u2D59","\u2D30\u2D62\u2D4F\u2D30\u2D59","\u2D30\u2D59\u2D49\u2D4F\u2D30\u2D59","\u2D30\u2D3D\u2D54\u2D30\u2D59","\u2D30\u2D3D\u2D61\u2D30\u2D59","\u2D30\u2D59\u2D49\u2D4E\u2D61\u2D30\u2D59","\u2D30\u2D59\u2D49\u2D39\u2D62\u2D30\u2D59"],weekdaysMin:["\u2D30\u2D59\u2D30\u2D4E\u2D30\u2D59","\u2D30\u2D62\u2D4F\u2D30\u2D59","\u2D30\u2D59\u2D49\u2D4F\u2D30\u2D59","\u2D30\u2D3D\u2D54\u2D30\u2D59","\u2D30\u2D3D\u2D61\u2D30\u2D59","\u2D30\u2D59\u2D49\u2D4E\u2D61\u2D30\u2D59","\u2D30\u2D59\u2D49\u2D39\u2D62\u2D30\u2D59"],longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},calendar:{sameDay:"[\u2D30\u2D59\u2D37\u2D45 \u2D34] LT",nextDay:"[\u2D30\u2D59\u2D3D\u2D30 \u2D34] LT",nextWeek:"dddd [\u2D34] LT",lastDay:"[\u2D30\u2D5A\u2D30\u2D4F\u2D5C \u2D34] LT",lastWeek:"dddd [\u2D34] LT",sameElse:"L"},relativeTime:{future:"\u2D37\u2D30\u2D37\u2D45 \u2D59 \u2D62\u2D30\u2D4F %s",past:"\u2D62\u2D30\u2D4F %s",s:"\u2D49\u2D4E\u2D49\u2D3D",m:"\u2D4E\u2D49\u2D4F\u2D53\u2D3A",mm:"%d \u2D4E\u2D49\u2D4F\u2D53\u2D3A",h:"\u2D59\u2D30\u2D44\u2D30",hh:"%d \u2D5C\u2D30\u2D59\u2D59\u2D30\u2D44\u2D49\u2D4F",d:"\u2D30\u2D59\u2D59",dd:"%d o\u2D59\u2D59\u2D30\u2D4F",M:"\u2D30\u2D62o\u2D53\u2D54",MM:"%d \u2D49\u2D62\u2D62\u2D49\u2D54\u2D4F",y:"\u2D30\u2D59\u2D33\u2D30\u2D59",yy:"%d \u2D49\u2D59\u2D33\u2D30\u2D59\u2D4F"},week:{dow:6,doy:12}}),

uk=moment__default.defineLocale("uk",{
months:{
format:["\u0441\u0456\u0447\u043D\u044F","\u043B\u044E\u0442\u043E\u0433\u043E","\u0431\u0435\u0440\u0435\u0437\u043D\u044F","\u043A\u0432\u0456\u0442\u043D\u044F","\u0442\u0440\u0430\u0432\u043D\u044F","\u0447\u0435\u0440\u0432\u043D\u044F","\u043B\u0438\u043F\u043D\u044F","\u0441\u0435\u0440\u043F\u043D\u044F","\u0432\u0435\u0440\u0435\u0441\u043D\u044F","\u0436\u043E\u0432\u0442\u043D\u044F","\u043B\u0438\u0441\u0442\u043E\u043F\u0430\u0434\u0430","\u0433\u0440\u0443\u0434\u043D\u044F"],
standalone:["\u0441\u0456\u0447\u0435\u043D\u044C","\u043B\u044E\u0442\u0438\u0439","\u0431\u0435\u0440\u0435\u0437\u0435\u043D\u044C","\u043A\u0432\u0456\u0442\u0435\u043D\u044C","\u0442\u0440\u0430\u0432\u0435\u043D\u044C","\u0447\u0435\u0440\u0432\u0435\u043D\u044C","\u043B\u0438\u043F\u0435\u043D\u044C","\u0441\u0435\u0440\u043F\u0435\u043D\u044C","\u0432\u0435\u0440\u0435\u0441\u0435\u043D\u044C","\u0436\u043E\u0432\u0442\u0435\u043D\u044C","\u043B\u0438\u0441\u0442\u043E\u043F\u0430\u0434","\u0433\u0440\u0443\u0434\u0435\u043D\u044C"]},

monthsShort:["\u0441\u0456\u0447","\u043B\u044E\u0442","\u0431\u0435\u0440","\u043A\u0432\u0456\u0442","\u0442\u0440\u0430\u0432","\u0447\u0435\u0440\u0432","\u043B\u0438\u043F","\u0441\u0435\u0440\u043F","\u0432\u0435\u0440","\u0436\u043E\u0432\u0442","\u043B\u0438\u0441\u0442","\u0433\u0440\u0443\u0434"],
weekdays:weekdaysCaseReplace,
weekdaysShort:["\u043D\u0434","\u043F\u043D","\u0432\u0442","\u0441\u0440","\u0447\u0442","\u043F\u0442","\u0441\u0431"],
weekdaysMin:["\u043D\u0434","\u043F\u043D","\u0432\u0442","\u0441\u0440","\u0447\u0442","\u043F\u0442","\u0441\u0431"],
longDateFormat:{
LT:"HH:mm",
LTS:"HH:mm:ss",
L:"DD.MM.YYYY",
LL:"D MMMM YYYY \u0440.",
LLL:"D MMMM YYYY \u0440., HH:mm",
LLLL:"dddd, D MMMM YYYY \u0440., HH:mm"},

calendar:{
sameDay:processHoursFunction("[\u0421\u044C\u043E\u0433\u043E\u0434\u043D\u0456 "),
nextDay:processHoursFunction("[\u0417\u0430\u0432\u0442\u0440\u0430 "),
lastDay:processHoursFunction("[\u0412\u0447\u043E\u0440\u0430 "),
nextWeek:processHoursFunction("[\u0423] dddd ["),
lastWeek:function(){
switch(this.day()){
case 0:
case 3:
case 5:
case 6:
return processHoursFunction("[\u041C\u0438\u043D\u0443\u043B\u043E\u0457] dddd [").call(this);
case 1:
case 2:
case 4:
return processHoursFunction("[\u041C\u0438\u043D\u0443\u043B\u043E\u0433\u043E] dddd [").call(this);}

},
sameElse:"L"},

relativeTime:{
future:"\u0437\u0430 %s",
past:"%s \u0442\u043E\u043C\u0443",
s:"\u0434\u0435\u043A\u0456\u043B\u044C\u043A\u0430 \u0441\u0435\u043A\u0443\u043D\u0434",
m:uk__relativeTimeWithPlural,
mm:uk__relativeTimeWithPlural,
h:"\u0433\u043E\u0434\u0438\u043D\u0443",
hh:uk__relativeTimeWithPlural,
d:"\u0434\u0435\u043D\u044C",
dd:uk__relativeTimeWithPlural,
M:"\u043C\u0456\u0441\u044F\u0446\u044C",
MM:uk__relativeTimeWithPlural,
y:"\u0440\u0456\u043A",
yy:uk__relativeTimeWithPlural},


meridiemParse:/ночі|ранку|дня|вечора/,
isPM:function(input){
return /^(дня|вечора)$/.test(input);
},
meridiem:function(hour,minute,isLower){return(
4>hour?
"\u043D\u043E\u0447\u0456":
12>hour?
"\u0440\u0430\u043D\u043A\u0443":
17>hour?
"\u0434\u043D\u044F":

"\u0432\u0435\u0447\u043E\u0440\u0430");

},
ordinalParse:/\d{1,2}-(й|го)/,
ordinal:function(number,period){return(

"M"===period||
"d"===period||
"DDD"===period||
"w"===period||
"W"===period?
number+"-\u0439":
"D"===period?
number+"-\u0433\u043E":

number);

},
week:{
dow:1,
doy:7}}),







uz=moment__default.defineLocale("uz",{
months:["\u044F\u043D\u0432\u0430\u0440","\u0444\u0435\u0432\u0440\u0430\u043B","\u043C\u0430\u0440\u0442","\u0430\u043F\u0440\u0435\u043B","\u043C\u0430\u0439","\u0438\u044E\u043D","\u0438\u044E\u043B","\u0430\u0432\u0433\u0443\u0441\u0442","\u0441\u0435\u043D\u0442\u044F\u0431\u0440","\u043E\u043A\u0442\u044F\u0431\u0440","\u043D\u043E\u044F\u0431\u0440","\u0434\u0435\u043A\u0430\u0431\u0440"],
monthsShort:["\u044F\u043D\u0432","\u0444\u0435\u0432","\u043C\u0430\u0440","\u0430\u043F\u0440","\u043C\u0430\u0439","\u0438\u044E\u043D","\u0438\u044E\u043B","\u0430\u0432\u0433","\u0441\u0435\u043D","\u043E\u043A\u0442","\u043D\u043E\u044F","\u0434\u0435\u043A"],
weekdays:["\u042F\u043A\u0448\u0430\u043D\u0431\u0430","\u0414\u0443\u0448\u0430\u043D\u0431\u0430","\u0421\u0435\u0448\u0430\u043D\u0431\u0430","\u0427\u043E\u0440\u0448\u0430\u043D\u0431\u0430","\u041F\u0430\u0439\u0448\u0430\u043D\u0431\u0430","\u0416\u0443\u043C\u0430","\u0428\u0430\u043D\u0431\u0430"],
weekdaysShort:["\u042F\u043A\u0448","\u0414\u0443\u0448","\u0421\u0435\u0448","\u0427\u043E\u0440","\u041F\u0430\u0439","\u0416\u0443\u043C","\u0428\u0430\u043D"],
weekdaysMin:["\u042F\u043A","\u0414\u0443","\u0421\u0435","\u0427\u043E","\u041F\u0430","\u0416\u0443","\u0428\u0430"],
longDateFormat:{
LT:"HH:mm",
LTS:"HH:mm:ss",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY HH:mm",
LLLL:"D MMMM YYYY, dddd HH:mm"},

calendar:{
sameDay:"[\u0411\u0443\u0433\u0443\u043D \u0441\u043E\u0430\u0442] LT [\u0434\u0430]",
nextDay:"[\u042D\u0440\u0442\u0430\u0433\u0430] LT [\u0434\u0430]",
nextWeek:"dddd [\u043A\u0443\u043D\u0438 \u0441\u043E\u0430\u0442] LT [\u0434\u0430]",
lastDay:"[\u041A\u0435\u0447\u0430 \u0441\u043E\u0430\u0442] LT [\u0434\u0430]",
lastWeek:"[\u0423\u0442\u0433\u0430\u043D] dddd [\u043A\u0443\u043D\u0438 \u0441\u043E\u0430\u0442] LT [\u0434\u0430]",
sameElse:"L"},

relativeTime:{
future:"\u042F\u043A\u0438\u043D %s \u0438\u0447\u0438\u0434\u0430",
past:"\u0411\u0438\u0440 \u043D\u0435\u0447\u0430 %s \u043E\u043B\u0434\u0438\u043D",
s:"\u0444\u0443\u0440\u0441\u0430\u0442",
m:"\u0431\u0438\u0440 \u0434\u0430\u043A\u0438\u043A\u0430",
mm:"%d \u0434\u0430\u043A\u0438\u043A\u0430",
h:"\u0431\u0438\u0440 \u0441\u043E\u0430\u0442",
hh:"%d \u0441\u043E\u0430\u0442",
d:"\u0431\u0438\u0440 \u043A\u0443\u043D",
dd:"%d \u043A\u0443\u043D",
M:"\u0431\u0438\u0440 \u043E\u0439",
MM:"%d \u043E\u0439",
y:"\u0431\u0438\u0440 \u0439\u0438\u043B",
yy:"%d \u0439\u0438\u043B"},

week:{
dow:1,
doy:7}}),







vi=moment__default.defineLocale("vi",{
months:["th\xE1ng 1","th\xE1ng 2","th\xE1ng 3","th\xE1ng 4","th\xE1ng 5","th\xE1ng 6","th\xE1ng 7","th\xE1ng 8","th\xE1ng 9","th\xE1ng 10","th\xE1ng 11","th\xE1ng 12"],
monthsShort:["Th01","Th02","Th03","Th04","Th05","Th06","Th07","Th08","Th09","Th10","Th11","Th12"],
weekdays:["ch\u1EE7 nh\u1EADt","th\u1EE9 hai","th\u1EE9 ba","th\u1EE9 t\u01B0","th\u1EE9 n\u0103m","th\u1EE9 s\xE1u","th\u1EE9 b\u1EA3y"],
weekdaysShort:["CN","T2","T3","T4","T5","T6","T7"],
weekdaysMin:["CN","T2","T3","T4","T5","T6","T7"],
longDateFormat:{
LT:"HH:mm",
LTS:"HH:mm:ss",
L:"DD/MM/YYYY",
LL:"D MMMM [n\u0103m] YYYY",
LLL:"D MMMM [n\u0103m] YYYY HH:mm",
LLLL:"dddd, D MMMM [n\u0103m] YYYY HH:mm",
l:"DD/M/YYYY",
ll:"D MMM YYYY",
lll:"D MMM YYYY HH:mm",
llll:"ddd, D MMM YYYY HH:mm"},

calendar:{
sameDay:"[H\xF4m nay l\xFAc] LT",
nextDay:"[Ng\xE0y mai l\xFAc] LT",
nextWeek:"dddd [tu\u1EA7n t\u1EDBi l\xFAc] LT",
lastDay:"[H\xF4m qua l\xFAc] LT",
lastWeek:"dddd [tu\u1EA7n r\u1ED3i l\xFAc] LT",
sameElse:"L"},

relativeTime:{
future:"%s t\u1EDBi",
past:"%s tr\u01B0\u1EDBc",
s:"v\xE0i gi\xE2y",
m:"m\u1ED9t ph\xFAt",
mm:"%d ph\xFAt",
h:"m\u1ED9t gi\u1EDD",
hh:"%d gi\u1EDD",
d:"m\u1ED9t ng\xE0y",
dd:"%d ng\xE0y",
M:"m\u1ED9t th\xE1ng",
MM:"%d th\xE1ng",
y:"m\u1ED9t n\u0103m",
yy:"%d n\u0103m"},

ordinalParse:/\d{1,2}/,
ordinal:function(number){
return number;
},
week:{
dow:1,
doy:4}}),








zh_cn=moment__default.defineLocale("zh-cn",{
months:["\u4E00\u6708","\u4E8C\u6708","\u4E09\u6708","\u56DB\u6708","\u4E94\u6708","\u516D\u6708","\u4E03\u6708","\u516B\u6708","\u4E5D\u6708","\u5341\u6708","\u5341\u4E00\u6708","\u5341\u4E8C\u6708"],
monthsShort:["1\u6708","2\u6708","3\u6708","4\u6708","5\u6708","6\u6708","7\u6708","8\u6708","9\u6708","10\u6708","11\u6708","12\u6708"],
weekdays:["\u661F\u671F\u65E5","\u661F\u671F\u4E00","\u661F\u671F\u4E8C","\u661F\u671F\u4E09","\u661F\u671F\u56DB","\u661F\u671F\u4E94","\u661F\u671F\u516D"],
weekdaysShort:["\u5468\u65E5","\u5468\u4E00","\u5468\u4E8C","\u5468\u4E09","\u5468\u56DB","\u5468\u4E94","\u5468\u516D"],
weekdaysMin:["\u65E5","\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D"],
longDateFormat:{
LT:"Ah\u70B9mm\u5206",
LTS:"Ah\u70B9m\u5206s\u79D2",
L:"YYYY-MM-DD",
LL:"YYYY\u5E74MMMD\u65E5",
LLL:"YYYY\u5E74MMMD\u65E5Ah\u70B9mm\u5206",
LLLL:"YYYY\u5E74MMMD\u65E5ddddAh\u70B9mm\u5206",
l:"YYYY-MM-DD",
ll:"YYYY\u5E74MMMD\u65E5",
lll:"YYYY\u5E74MMMD\u65E5Ah\u70B9mm\u5206",
llll:"YYYY\u5E74MMMD\u65E5ddddAh\u70B9mm\u5206"},

meridiemParse:/凌晨|早上|上午|中午|下午|晚上/,
meridiemHour:function(hour,meridiem){return(
12===hour&&(
hour=0),

"\u51CC\u6668"===meridiem||"\u65E9\u4E0A"===meridiem||
"\u4E0A\u5348"===meridiem?
hour:
"\u4E0B\u5348"===meridiem||"\u665A\u4E0A"===meridiem?
hour+12:


11<=hour?hour:hour+12);

},
meridiem:function(hour,minute,isLower){
var hm=100*hour+minute;return(
600>hm?
"\u51CC\u6668":
900>hm?
"\u65E9\u4E0A":
1130>hm?
"\u4E0A\u5348":
1230>hm?
"\u4E2D\u5348":
1800>hm?
"\u4E0B\u5348":

"\u665A\u4E0A");

},
calendar:{
sameDay:function(){
return 0===this.minutes()?"[\u4ECA\u5929]Ah[\u70B9\u6574]":"[\u4ECA\u5929]LT";
},
nextDay:function(){
return 0===this.minutes()?"[\u660E\u5929]Ah[\u70B9\u6574]":"[\u660E\u5929]LT";
},
lastDay:function(){
return 0===this.minutes()?"[\u6628\u5929]Ah[\u70B9\u6574]":"[\u6628\u5929]LT";
},
nextWeek:function(){
var startOfWeek,prefix;


return startOfWeek=moment__default().startOf("week"),prefix=604800<=this.unix()-startOfWeek.unix()?"[\u4E0B]":"[\u672C]",0===this.minutes()?prefix+"dddAh\u70B9\u6574":prefix+"dddAh\u70B9mm";
},
lastWeek:function(){
var startOfWeek,prefix;


return startOfWeek=moment__default().startOf("week"),prefix=this.unix()<startOfWeek.unix()?"[\u4E0A]":"[\u672C]",0===this.minutes()?prefix+"dddAh\u70B9\u6574":prefix+"dddAh\u70B9mm";
},
sameElse:"LL"},

ordinalParse:/\d{1,2}(日|月|周)/,
ordinal:function(number,period){return(

"d"===period||
"D"===period||
"DDD"===period?
number+"\u65E5":
"M"===period?
number+"\u6708":
"w"===period||
"W"===period?
number+"\u5468":

number);

},
relativeTime:{
future:"%s\u5185",
past:"%s\u524D",
s:"\u51E0\u79D2",
m:"1 \u5206\u949F",
mm:"%d \u5206\u949F",
h:"1 \u5C0F\u65F6",
hh:"%d \u5C0F\u65F6",
d:"1 \u5929",
dd:"%d \u5929",
M:"1 \u4E2A\u6708",
MM:"%d \u4E2A\u6708",
y:"1 \u5E74",
yy:"%d \u5E74"},

week:{

dow:1,
doy:4}}),







zh_tw=moment__default.defineLocale("zh-tw",{
months:["\u4E00\u6708","\u4E8C\u6708","\u4E09\u6708","\u56DB\u6708","\u4E94\u6708","\u516D\u6708","\u4E03\u6708","\u516B\u6708","\u4E5D\u6708","\u5341\u6708","\u5341\u4E00\u6708","\u5341\u4E8C\u6708"],
monthsShort:["1\u6708","2\u6708","3\u6708","4\u6708","5\u6708","6\u6708","7\u6708","8\u6708","9\u6708","10\u6708","11\u6708","12\u6708"],
weekdays:["\u661F\u671F\u65E5","\u661F\u671F\u4E00","\u661F\u671F\u4E8C","\u661F\u671F\u4E09","\u661F\u671F\u56DB","\u661F\u671F\u4E94","\u661F\u671F\u516D"],
weekdaysShort:["\u9031\u65E5","\u9031\u4E00","\u9031\u4E8C","\u9031\u4E09","\u9031\u56DB","\u9031\u4E94","\u9031\u516D"],
weekdaysMin:["\u65E5","\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D"],
longDateFormat:{
LT:"Ah\u9EDEmm\u5206",
LTS:"Ah\u9EDEm\u5206s\u79D2",
L:"YYYY\u5E74MMMD\u65E5",
LL:"YYYY\u5E74MMMD\u65E5",
LLL:"YYYY\u5E74MMMD\u65E5Ah\u9EDEmm\u5206",
LLLL:"YYYY\u5E74MMMD\u65E5ddddAh\u9EDEmm\u5206",
l:"YYYY\u5E74MMMD\u65E5",
ll:"YYYY\u5E74MMMD\u65E5",
lll:"YYYY\u5E74MMMD\u65E5Ah\u9EDEmm\u5206",
llll:"YYYY\u5E74MMMD\u65E5ddddAh\u9EDEmm\u5206"},

meridiemParse:/早上|上午|中午|下午|晚上/,
meridiemHour:function(hour,meridiem){return(
12===hour&&(
hour=0),

"\u65E9\u4E0A"===meridiem||"\u4E0A\u5348"===meridiem)?
hour:
"\u4E2D\u5348"===meridiem?
11<=hour?hour:hour+12:
"\u4E0B\u5348"===meridiem||"\u665A\u4E0A"===meridiem?
hour+12:void 0;

},
meridiem:function(hour,minute,isLower){
var hm=100*hour+minute;return(
900>hm?
"\u65E9\u4E0A":
1130>hm?
"\u4E0A\u5348":
1230>hm?
"\u4E2D\u5348":
1800>hm?
"\u4E0B\u5348":

"\u665A\u4E0A");

},
calendar:{
sameDay:"[\u4ECA\u5929]LT",
nextDay:"[\u660E\u5929]LT",
nextWeek:"[\u4E0B]ddddLT",
lastDay:"[\u6628\u5929]LT",
lastWeek:"[\u4E0A]ddddLT",
sameElse:"L"},

ordinalParse:/\d{1,2}(日|月|週)/,
ordinal:function(number,period){return(

"d"===period||
"D"===period||
"DDD"===period?
number+"\u65E5":
"M"===period?
number+"\u6708":
"w"===period||
"W"===period?
number+"\u9031":

number);

},
relativeTime:{
future:"%s\u5167",
past:"%s\u524D",
s:"\u5E7E\u79D2",
m:"\u4E00\u5206\u9418",
mm:"%d\u5206\u9418",
h:"\u4E00\u5C0F\u6642",
hh:"%d\u5C0F\u6642",
d:"\u4E00\u5929",
dd:"%d\u5929",
M:"\u4E00\u500B\u6708",
MM:"%d\u500B\u6708",
y:"\u4E00\u5E74",
yy:"%d\u5E74"}}),



moment_with_locales=moment__default;


return moment_with_locales.locale("en"),moment_with_locales;

});