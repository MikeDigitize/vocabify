!function(n){var e={};function t(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:r})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)t.d(r,o,function(e){return n[e]}.bind(null,o));return r},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=1)}([function(n,e,t){"use strict";t.d(e,"e",(function(){return r})),t.d(e,"a",(function(){return o})),t.d(e,"d",(function(){return u})),t.d(e,"c",(function(){return i})),t.d(e,"b",(function(){return c})),t.d(e,"h",(function(){return a})),t.d(e,"j",(function(){return s})),t.d(e,"i",(function(){return l})),t.d(e,"g",(function(){return _})),t.d(e,"f",(function(){return g}));const r="__VOCABIFY_WORD__",o="__VOCABIFY_DEFINITION__",u="__VOCABIFY_SAVED_ITEMS__",i="Choose a word",c="Find a definiton",f="SET_SELECTED_TEXT",d="GET_SELECTED_TEXT";function a(){return new Promise((function(n){chrome.runtime.sendMessage({action:d},(function(e){n(e.data)}))}))}function s(n,e){return new Promise((function(t){let r={};r[n]=e,chrome.storage.sync.set(r,(function(){t(e)}))}))}function l(n){return new Promise((function(e){chrome.storage.sync.get([`${n}`],(function(n){e(n)}))}))}function _(){let n=window.getSelection().toString();return!(n.length>400||n.length<2)&&{action:f,data:n}}const g=function(){let n="";return{onNewSelectedText(e){e.action===f&&(n=e.data)},onRequestForSelectedText(e,t){e.action===d&&""!==n&&(t({data:n}),n="")}}}()},function(n,e,t){"use strict";t.r(e);var r=t(0);chrome.runtime.onConnect.addListener((function(n){n.onMessage.addListener(r.f.onNewSelectedText)})),chrome.runtime.onMessage.addListener((function(n,e,t){r.f.onRequestForSelectedText(n,t)}))}]);