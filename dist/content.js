!function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=28)}({1:function(t,n,e){"use strict";e.d(n,"g",(function(){return r})),e.d(n,"a",(function(){return o})),e.d(n,"e",(function(){return i})),e.d(n,"d",(function(){return u})),e.d(n,"c",(function(){return c})),e.d(n,"f",(function(){return d})),e.d(n,"b",(function(){return f}));const r="__VOCABIFY_WORD__",o="__VOCABIFY_DEFINITION__",i="__VOCABIFY_SAVED_ITEMS__",u="Choose a word",c="Find a definiton",d="SET_SELECTED_TEXT",f="GET_SELECTED_TEXT"},2:function(t,n,e){"use strict";e.d(n,"n",(function(){return o})),e.d(n,"e",(function(){return i})),e.d(n,"f",(function(){return u})),e.d(n,"k",(function(){return c})),e.d(n,"j",(function(){return d})),e.d(n,"h",(function(){return f})),e.d(n,"i",(function(){return a})),e.d(n,"b",(function(){return s})),e.d(n,"l",(function(){return w})),e.d(n,"m",(function(){return m})),e.d(n,"c",(function(){return g})),e.d(n,"a",(function(){return p})),e.d(n,"g",(function(){return y})),e.d(n,"d",(function(){return T})),e.d(n,"p",(function(){return h})),e.d(n,"o",(function(){return _}));var r=e(1);function o(t,n){return new Promise((function(e){let r={};r[t]=n,chrome.storage.sync.set(r,(function(){e(n)}))}))}function i(t){return new Promise((function(n){chrome.storage.sync.get([`${t}`],(function(t){n(t)}))}))}function u(t){return t===r.d||t===r.c}function c(t){return t.length>=2}function d(t){return t.length<=400}function f(t){return 0===Object.keys(t).length}function a(t){return 0===t.length}function s({word:t,definition:n,items:e}){let r={word:t,definition:n};return e.concat(r)}function l({type:t,originalText:n,newText:e,items:r}){return r.map((function(r){return r[t]===n&&(r[t]=e),r}))}async function w({key:t,items:n,callback:e}){return await e(t,n)}function m(t,n){t.textContent=n}function g(t){if(!t.length)return!1;return`${t[0].toUpperCase()}${t.substring(1,t.length)}`}function p(t){if(!t.length)return!1;return"."===t.charAt(t.length-1)?t:`${t}.`}function y(t,n){return t.some((function(t){return t.word.toUpperCase()===n.toUpperCase()}))}function T(t,n){switch(t){case"":return[];default:let e=new RegExp(`^${t}`,"i");return function(t){return t.sort((t,n)=>t.word.localeCompare(n.word))}(n.filter(t=>e.test(t.word)))}}async function h({originalText:t,newText:n,dispatcher:e,currentItems:u}){if(y(u,n))e({type:"on-word-edit",state:{success:!1,newText:n}});else{let c;c=void 0!==window.chrome&&void 0!==window.chrome.storage?(c=await i(r.e))[r.e]:window[r.e],u=l({type:"word",originalText:t,newText:g(n),items:u}),c=l({type:"word",originalText:t,newText:g(n),items:c}),void 0!==window.chrome&&void 0!==window.chrome.storage?await o(r.e,c):window[r.e]=c,console.log("---update word: current and total items---"),console.log("updated current items",u),console.log("totalItems",c),e({type:"on-word-edit",state:{items:u,success:!0}})}}async function _({originalText:t,newText:n,dispatcher:e,currentItems:u}){let c;c=void 0!==window.chrome&&void 0!==window.chrome.storage?(c=await i(r.e))[r.e]:window[r.e],u=l({type:"definition",originalText:t,newText:p(g(n)),items:u}),c=l({type:"definition",originalText:t,newText:p(g(n)),items:c}),void 0!==window.chrome&&void 0!==window.chrome.storage?await o(r.e,c):window[r.e]=c,console.log("---update definition: current and total items---"),console.log("updated current items",u),console.log("totalItems",c),e({type:"on-definition-edit",state:{items:u}})}},28:function(t,n,e){"use strict";e.r(n);var r=e(2),o=e(1);!function(t){document.addEventListener("click",(function(){let n=function(){let t=window.getSelection().toString();return!(!Object(r.j)(t)||!Object(r.k)(t))&&{action:o.f,data:t}}();n&&t.postMessage(n)}))}(chrome.runtime.connect({name:"vocabify"}))}});