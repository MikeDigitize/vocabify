!function(n){var t={};function e(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=n,e.c=t,e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:r})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var o in n)e.d(r,o,function(t){return n[t]}.bind(null,o));return r},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=28)}({1:function(n,t,e){"use strict";e.d(t,"g",(function(){return r})),e.d(t,"a",(function(){return o})),e.d(t,"e",(function(){return i})),e.d(t,"d",(function(){return u})),e.d(t,"c",(function(){return c})),e.d(t,"f",(function(){return f})),e.d(t,"b",(function(){return d}));const r="__VOCABIFY_WORD__",o="__VOCABIFY_DEFINITION__",i="__VOCABIFY_SAVED_ITEMS__",u="Choose a word",c="Find a definiton",f="SET_SELECTED_TEXT",d="GET_SELECTED_TEXT"},2:function(n,t,e){"use strict";e.d(t,"n",(function(){return o})),e.d(t,"e",(function(){return i})),e.d(t,"f",(function(){return u})),e.d(t,"k",(function(){return c})),e.d(t,"j",(function(){return f})),e.d(t,"h",(function(){return d})),e.d(t,"i",(function(){return s})),e.d(t,"b",(function(){return a})),e.d(t,"l",(function(){return p})),e.d(t,"m",(function(){return g})),e.d(t,"c",(function(){return w})),e.d(t,"a",(function(){return m})),e.d(t,"g",(function(){return y})),e.d(t,"d",(function(){return _})),e.d(t,"p",(function(){return h})),e.d(t,"o",(function(){return b}));var r=e(1);function o(n,t){return new Promise((function(e){let r={};r[n]=t,chrome.storage.sync.set(r,(function(){e(t)}))}))}function i(n){return new Promise((function(t){chrome.storage.sync.get([`${n}`],(function(n){t(n)}))}))}function u(n){return n===r.d||n===r.c}function c(n){return n.length>=2}function f(n){return n.length<=400}function d(n){return 0===Object.keys(n).length}function s(n){return 0===n.length}function a({word:n,definition:t,items:e}){let r={word:n,definition:t};return e.concat(r)}function l({type:n,originalText:t,newText:e,items:r}){return r.map((function(r){return r[n]===t&&(r[n]=e),r}))}async function p({key:n,items:t,callback:e}){return await e(n,t)}function g(n,t){n.textContent=t}function w(n){if(!n.length)return!1;return`${n[0].toUpperCase()}${n.substring(1,n.length)}`}function m(n){if(!n.length)return!1;return"."===n.charAt(n.length-1)?n:`${n}.`}function y(n,t){return n.some((function(n){return n.word.toUpperCase()===t.toUpperCase()}))}function _(n,t){switch(n){case"":return[];default:let e=new RegExp(`^${n}`,"i");return function(n){return n.sort((n,t)=>n.word.localeCompare(t.word))}(t.filter(n=>e.test(n.word)))}}async function h({originalText:n,newText:t,dispatcher:e,items:i}){if(y(i,t))e({type:"on-word-edit",state:{items:i,success:!1,newText:t}});else{let u;i=l({type:"word",originalText:n,newText:w(t),items:i}),u=void 0!==window.chrome&&void 0!==window.chrome.storage?await o(r.e,i):u&&Object.keys(u).length?u[r.e]:i,console.log("updated items",u),e({type:"on-word-edit",state:{items:u,success:!0}})}}async function b({originalText:n,newText:t,dispatcher:e,items:i}){let u;i=l({type:"definition",originalText:n,newText:m(w(t)),items:i}),u=void 0!==window.chrome&&void 0!==window.chrome.storage?await o(r.e,i):u&&Object.keys(u).length?u[r.e]:i,console.log("updated definition",u),e({type:"on-definition-edit",state:{items:u}})}},28:function(n,t,e){"use strict";e.r(t);var r=e(2),o=e(1);!function(n){document.addEventListener("click",(function(){let t=function(){let n=window.getSelection().toString();return!(!Object(r.j)(n)||!Object(r.k)(n))&&{action:o.f,data:n}}();t&&n.postMessage(t)}))}(chrome.runtime.connect({name:"vocabify"}))}});