!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=32)}({1:function(e,t,n){"use strict";n.d(t,"g",(function(){return r})),n.d(t,"a",(function(){return o})),n.d(t,"e",(function(){return u})),n.d(t,"d",(function(){return i})),n.d(t,"c",(function(){return c})),n.d(t,"f",(function(){return f})),n.d(t,"b",(function(){return d}));const r="__VOCABIFY_WORD__",o="__VOCABIFY_DEFINITION__",u="__VOCABIFY_SAVED_ITEMS__",i="Choose a word",c="Find a definiton",f="SET_SELECTED_TEXT",d="GET_SELECTED_TEXT"},32:function(e,t,n){"use strict";n.r(t);var r=n(1);const o=function(){let e="";return{onNewSelectedText:t=>(t.action===r.f&&(e=t.data),e),onRequestForSelectedText:(t,n)=>(t.action===r.b&&""!==e&&(n({data:e}),e=""),e)}}();let{onNewSelectedText:u,onRequestForSelectedText:i}=o;chrome.runtime.onConnect.addListener((function(e){e.onMessage.addListener(u)})),chrome.runtime.onMessage.addListener((function(e,t,n){i(e,n)}))}});