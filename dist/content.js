!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=33)}({1:function(e,t,n){"use strict";n.d(t,"g",(function(){return r})),n.d(t,"a",(function(){return o})),n.d(t,"e",(function(){return i})),n.d(t,"d",(function(){return u})),n.d(t,"c",(function(){return c})),n.d(t,"f",(function(){return d})),n.d(t,"b",(function(){return f}));const r="__VOCABIFY_WORD__",o="__VOCABIFY_DEFINITION__",i="__VOCABIFY_SAVED_ITEMS__",u="Choose a word",c="Find a definiton",d="SET_SELECTED_TEXT",f="GET_SELECTED_TEXT"},2:function(e,t,n){"use strict";n.d(t,"p",(function(){return o})),n.d(t,"e",(function(){return i})),n.d(t,"f",(function(){return u})),n.d(t,"k",(function(){return c})),n.d(t,"j",(function(){return d})),n.d(t,"h",(function(){return f})),n.d(t,"i",(function(){return a})),n.d(t,"b",(function(){return s})),n.d(t,"n",(function(){return w})),n.d(t,"o",(function(){return m})),n.d(t,"c",(function(){return p})),n.d(t,"a",(function(){return g})),n.d(t,"g",(function(){return h})),n.d(t,"d",(function(){return y})),n.d(t,"r",(function(){return T})),n.d(t,"q",(function(){return _})),n.d(t,"l",(function(){return v})),n.d(t,"m",(function(){return x}));var r=n(1);function o(e,t){return new Promise((function(n){let r={};r[e]=t,chrome.storage.sync.set(r,(function(){n(t)}))}))}function i(e){return new Promise((function(t){chrome.storage.sync.get([`${e}`],(function(e){t(e)}))}))}function u(e){return e===r.d||e===r.c}function c(e){return e.length>=2}function d(e){return e.length<=400}function f(e){return 0===Object.keys(e).length}function a(e){return 0===e.length}function s({word:e,definition:t,items:n}){let r={word:e,definition:t};return n.concat(r)}function l({type:e,originalText:t,newText:n,items:r}){return r.map((function(r){return r[e]===t&&(r[e]=n),r}))}async function w({key:e,items:t,callback:n}){return await n(e,t)}function m(e,t){e.textContent=t}function p(e){if(!e.length)return!1;return`${e[0].toUpperCase()}${e.substring(1,e.length)}`}function g(e){if(!e.length)return!1;return"."===e.charAt(e.length-1)?e:`${e}.`}function h(e,t){return e.some((function(e){return e.word.toUpperCase()===t.toUpperCase()}))}function y(e,t){switch(e){case"":return[];default:let n=new RegExp(`^${e}`,"i");return function(e){return e.sort((e,t)=>e.word.localeCompare(t.word))}(t.filter(e=>n.test(e.word)))}}async function T({originalText:e,newText:t,dispatcher:n,currentItems:u}){if(h(u,t))n({type:"on-word-edit",state:{success:!1,newText:t}});else{let c;c=void 0!==window.chrome&&void 0!==window.chrome.storage?(c=await i(r.e))[r.e]:window[r.e],u=l({type:"word",originalText:e,newText:p(t),items:u}),c=l({type:"word",originalText:e,newText:p(t),items:c}),void 0!==window.chrome&&void 0!==window.chrome.storage?await o(r.e,c):window[r.e]=c,console.log("---update word: current and total items---"),console.log("updated current items",u),console.log("totalItems",c),n({type:"on-word-edit",state:{items:u,success:!0}})}}async function _({originalText:e,newText:t,dispatcher:n,currentItems:u}){let c;c=void 0!==window.chrome&&void 0!==window.chrome.storage?(c=await i(r.e))[r.e]:window[r.e],u=l({type:"definition",originalText:e,newText:g(p(t)),items:u}),c=l({type:"definition",originalText:e,newText:g(p(t)),items:c}),void 0!==window.chrome&&void 0!==window.chrome.storage?await o(r.e,c):window[r.e]=c,console.log("---update definition: current and total items---"),console.log("updated current items",u),console.log("totalItems",c),n({type:"on-definition-edit",state:{items:u}})}function v(e,t){return t.filter(t=>t.word.toUpperCase()!==e.toUpperCase())}async function x({wordToDelete:e,currentItems:t,dispatcher:n}){let u;u=v(e,u=void 0!==window.chrome&&void 0!==window.chrome.storage?(u=await i(r.e))[r.e]:window[r.e]),t=v(e,t),void 0!==window.chrome&&void 0!==window.chrome.storage?await o(r.e,u):window[r.e]=u,n({type:"on-delete-item-response",state:{delete:!0,wordToDelete:e,currentItems:t}})}},33:function(e,t,n){"use strict";n.r(t);var r=n(2),o=n(1);!function(e){document.addEventListener("click",(function(){let t=function(){let e=window.getSelection().toString();return!(!Object(r.j)(e)||!Object(r.k)(e))&&{action:o.f,data:e}}();t&&e.postMessage(t)}))}(chrome.runtime.connect({name:"vocabify"}))}});