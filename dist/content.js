!function(n){var t={};function e(r){if(t[r])return t[r].exports;var u=t[r]={i:r,l:!1,exports:{}};return n[r].call(u.exports,u,u.exports,e),u.l=!0,u.exports}e.m=n,e.c=t,e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:r})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var u in n)e.d(r,u,function(t){return n[t]}.bind(null,u));return r},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=2)}([function(n,t,e){"use strict";e.d(t,"e",(function(){return r})),e.d(t,"a",(function(){return u})),e.d(t,"d",(function(){return o})),e.d(t,"c",(function(){return c})),e.d(t,"b",(function(){return i})),e.d(t,"o",(function(){return d})),e.d(t,"n",(function(){return s})),e.d(t,"l",(function(){return l})),e.d(t,"m",(function(){return _})),e.d(t,"f",(function(){return y})),e.d(t,"r",(function(){return b})),e.d(t,"s",(function(){return g})),e.d(t,"u",(function(){return p})),e.d(t,"q",(function(){return m})),e.d(t,"i",(function(){return E})),e.d(t,"t",(function(){return S})),e.d(t,"k",(function(){return h})),e.d(t,"h",(function(){return O})),e.d(t,"j",(function(){return T})),e.d(t,"g",(function(){return w})),e.d(t,"p",(function(){return j}));const r="__VOCABIFY_WORD__",u="__VOCABIFY_DEFINITION__",o="__VOCABIFY_SAVED_ITEMS__",c="Choose a word",i="Find a definiton",f="SET_SELECTED_TEXT",a="GET_SELECTED_TEXT";function d(n){return n.length>=2}function s(n){return n.length<=400}function l(n){return 0===Object.keys(n).length}function _(n){return 0===n.length}function y(n,t){return t.concat(n)}async function b(n,t,e){return await e(n,t)}function g(n,t){n.textContent=t}function p(n){return"",""}async function m(n,t,e){await e(r,""),await e(u,""),g(n,c),g(t,i)}function E(){return new Promise((function(n){chrome.runtime.sendMessage({action:a},(function(t){n(t.data)}))}))}function S(n,t){return new Promise((function(e){let r={};r[n]=t,chrome.storage.sync.set(r,(function(){e(t)}))}))}function h(n){return new Promise((function(t){chrome.storage.sync.get([`${n}`],(function(n){t(n)}))}))}function O(){let n=window.getSelection().toString();return!(!s(n)||!d(n))&&{action:f,data:n}}function T({response:n,key:t,fallback:e}){return n=Object.keys(n).length&&""!==n[t]?n[t]:e}const w=function(){let n="";return{onNewSelectedText:t=>(t.action===f&&(n=t.data),n),onRequestForSelectedText:(t,e)=>(t.action===a&&""!==n&&(e({data:n}),n=""),n)}}(),j=function(){let n=!1;return{setEditState(t=!0){n=t},onFocus(){this.setEditState()},async onBlur(t,e,r,u,o){return!!n&&(this.setEditState(!1),!function(n){return n===c||n===i}(t)&&d(t)&&s(t)?await o(e,t):(r.textContent=u,await o(e,"")))}}}()},,function(n,t,e){"use strict";e.r(t);var r=e(0);const u=chrome.runtime.connect({name:"vocabify"});document.addEventListener("click",(function(){let n=Object(r.h)();n&&u.postMessage(n)}))}]);