var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.checkStringArgs=function(a,c,b){if(null==a)throw new TypeError("The 'this' value for String.prototype."+b+" must not be null or undefined");if(c instanceof RegExp)throw new TypeError("First argument to String.prototype."+b+" must not be a regular expression");return a+""};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;$jscomp.FORCE_POLYFILL_PROMISE=!1;$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,b){if(a==Array.prototype||a==Object.prototype)return a;a[c]=b.value;return a};$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var c=0;c<a.length;++c){var b=a[c];if(b&&b.Math==Math)return b}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,c){var b=$jscomp.propertyToPolyfillSymbol[c];if(null==b)return a[c];b=a[b];return void 0!==b?b:a[c]};$jscomp.polyfill=function(a,c,b,d){c&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,c,b,d):$jscomp.polyfillUnisolated(a,c,b,d))};$jscomp.polyfillUnisolated=function(a,c,b,d){b=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];if(!(e in b))return;b=b[e]}a=a[a.length-1];d=b[a];c=c(d);c!=d&&null!=c&&$jscomp.defineProperty(b,a,{configurable:!0,writable:!0,value:c})};$jscomp.polyfillIsolated=function(a,c,b,d){var e=a.split(".");a=1===e.length;d=e[0];d=!a&&d in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var f=0;f<e.length-1;f++){var g=e[f];if(!(g in d))return;d=d[g]}e=e[e.length-1];b=$jscomp.IS_SYMBOL_NATIVE&&"es6"===b?d[e]:null;c=c(b);null!=c&&(a?$jscomp.defineProperty($jscomp.polyfills,e,{configurable:!0,writable:!0,value:c}):c!==b&&(void 0===$jscomp.propertyToPolyfillSymbol[e]&&(b=1E9*Math.random()>>>0,$jscomp.propertyToPolyfillSymbol[e]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(e):$jscomp.POLYFILL_PREFIX+b+"$"+e),$jscomp.defineProperty(d,$jscomp.propertyToPolyfillSymbol[e],{configurable:!0,writable:!0,value:c})))};$jscomp.polyfill("String.prototype.startsWith",function(a){return a?a:function(c,b){var d=$jscomp.checkStringArgs(this,c,"startsWith");c+="";var e=d.length,f=c.length;b=Math.max(0,Math.min(b|0,d.length));for(var g=0;g<f&&b<e;)if(d[b++]!=c[g++])return!1;return g>=f}},"es6","es3");function createSound(a,c,b){c=void 0===c?{}:c;b=void 0===b?null:b;var d={src:[a]};"html5"in c||(useHtml5Mode=a.startsWith("http://")&&!a.startsWith("http://tienganhmoingay.com")||a.startsWith("https://")&&!a.startsWith("http://tienganhmoingay.com")?!0:!1,d.html5=useHtml5Mode);"preload"in c||(d.preload=!0);d=Object.assign({},d,c);null!=b&&(d.sprite=b);a=new Howl(d);a.once("load",function(){});return a}function preloadSoundFile(a){createSound(a,{preload:!0})}
function playSound(a,c){var b=c=void 0===c?{}:c;c=void 0===b.options?{}:b.options;var d=void 0===b.spritesOptions?null:b.spritesOptions;b=void 0===b.callbacks?{}:b.callbacks;if(null!=d){var e=d.sprite;d=d.keys[0]}else e=d=null;sound=createSound(a,c,e);a=void 0===b.beforePlayFunc?null:b.beforePlayFunc;c=void 0===b.onFinishFunc?null:b.onFinishFunc;if(null!=a)if("loaded"!=sound.state())sound.on("load",a);else a();sound.on("playerror",function(){sound.once("unlock",function(){sound.play()})});soundId=null!=d?sound.play(d):sound.play();if(null!=c)sound.on("end",c,soundId);return[sound,soundId]}function playSoundWithSpeed(a,c){playSound(a,{options:{rate:c}})}function playSoundWithLoop(a,c){c=void 0===c?3:c;var b=0,d=new Howl({src:[a],loop:!0,autoplay:!0,onend:function(){b++;b===c-1&&d.loop(!1)}})}
function playAudioInDuration(a,c,b,d,e){e=void 0===e?{rate:1,format:["mp3"]}:e;optionsAndCallbacks={spritesOptions:{sprite:{target:[c,b,void 0===d?!1:d]},keys:["target"]},options:e};playSound(a,optionsAndCallbacks)};