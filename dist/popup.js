!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=27)}({1:function(t,e,n){"use strict";n.d(e,"g",(function(){return i})),n.d(e,"a",(function(){return o})),n.d(e,"e",(function(){return r})),n.d(e,"d",(function(){return a})),n.d(e,"c",(function(){return c})),n.d(e,"f",(function(){return s})),n.d(e,"b",(function(){return u}));const i="__VOCABIFY_WORD__",o="__VOCABIFY_DEFINITION__",r="__VOCABIFY_SAVED_ITEMS__",a="Choose a word",c="Find a definiton",s="SET_SELECTED_TEXT",u="GET_SELECTED_TEXT"},2:function(t,e,n){"use strict";n.d(e,"n",(function(){return o})),n.d(e,"e",(function(){return r})),n.d(e,"f",(function(){return a})),n.d(e,"k",(function(){return c})),n.d(e,"j",(function(){return s})),n.d(e,"h",(function(){return u})),n.d(e,"i",(function(){return l})),n.d(e,"b",(function(){return f})),n.d(e,"l",(function(){return _})),n.d(e,"m",(function(){return p})),n.d(e,"c",(function(){return m})),n.d(e,"a",(function(){return h})),n.d(e,"g",(function(){return y})),n.d(e,"d",(function(){return b})),n.d(e,"p",(function(){return E})),n.d(e,"o",(function(){return O}));var i=n(1);function o(t,e){return new Promise((function(n){let i={};i[t]=e,chrome.storage.sync.set(i,(function(){n(e)}))}))}function r(t){return new Promise((function(e){chrome.storage.sync.get([`${t}`],(function(t){e(t)}))}))}function a(t){return t===i.d||t===i.c}function c(t){return t.length>=2}function s(t){return t.length<=400}function u(t){return 0===Object.keys(t).length}function l(t){return 0===t.length}function f({word:t,definition:e,items:n}){let i={word:t,definition:e};return n.concat(i)}function d({type:t,originalText:e,newText:n,items:i}){return i.map((function(i){return i[t]===e&&(i[t]=n),i}))}async function _({key:t,items:e,callback:n}){return await n(t,e)}function p(t,e){t.textContent=e}function m(t){if(!t.length)return!1;return`${t[0].toUpperCase()}${t.substring(1,t.length)}`}function h(t){if(!t.length)return!1;return"."===t.charAt(t.length-1)?t:`${t}.`}function y(t,e){return t.some((function(t){return t.word.toUpperCase()===e.toUpperCase()}))}function b(t,e){switch(t){case"":return[];default:let n=new RegExp(`^${t}`,"i");return function(t){return t.sort((t,e)=>t.word.localeCompare(e.word))}(e.filter(t=>n.test(t.word)))}}async function E({originalText:t,newText:e,dispatcher:n,items:r}){if(y(r,e))n({type:"on-word-edit",state:{items:r,success:!1,newText:e}});else{let a;r=d({type:"word",originalText:t,newText:m(e),items:r}),a=void 0!==window.chrome&&void 0!==window.chrome.storage?await o(i.e,r):a&&Object.keys(a).length?a[i.e]:r,console.log("updated items",a),n({type:"on-word-edit",state:{items:a,success:!0}})}}async function O({originalText:t,newText:e,dispatcher:n,items:r}){let a;r=d({type:"definition",originalText:t,newText:h(m(e)),items:r}),a=void 0!==window.chrome&&void 0!==window.chrome.storage?await o(i.e,r):a&&Object.keys(a).length?a[i.e]:r,console.log("updated definition",a),n({type:"on-definition-edit",state:{items:a}})}},27:function(t,e,n){"use strict";n.r(e);var i=n(2),o=n(1);function r(){return new Promise((function(t){chrome.runtime.sendMessage({action:o.b},(function(e){t(e.data)}))}))}function a({response:t,key:e,fallback:n}){return t=Object(i.h)(t)||Object(i.i)(t[e])?n:t[e]}const c=function(){let t=!1;return{setEditState(e=!0){t=e},onFocus(){this.setEditState()},async onBlur({text:e,key:n,element:o,fallback:r,callback:a}){return!!t&&(this.setEditState(!1),!Object(i.f)(e)&&Object(i.k)(e)&&Object(i.j)(e)?await a(n,e):(o.textContent=r,await a(n,"")))}}}();
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */var s=function(t,e){return(s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};function u(t,e){function n(){this.constructor=t}s(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}var l=function(){return(l=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};function f(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var i,o,r=n.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(i=r.next()).done;)a.push(i.value)}catch(t){o={error:t}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(o)throw o.error}}return a}
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var d=function(){function t(t){void 0===t&&(t={}),this.adapter_=t}return Object.defineProperty(t,"cssClasses",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"strings",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"numbers",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"defaultAdapter",{get:function(){return{}},enumerable:!0,configurable:!0}),t.prototype.init=function(){},t.prototype.destroy=function(){},t}(),_=function(){function t(t,e){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];this.root_=t,this.initialize.apply(this,function(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(f(arguments[e]));return t}(n)),this.foundation_=void 0===e?this.getDefaultFoundation():e,this.foundation_.init(),this.initialSyncWithDOM()}return t.attachTo=function(e){return new t(e,new d({}))},t.prototype.initialize=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]},t.prototype.getDefaultFoundation=function(){throw new Error("Subclasses must override getDefaultFoundation to return a properly configured foundation class")},t.prototype.initialSyncWithDOM=function(){},t.prototype.destroy=function(){this.foundation_.destroy()},t.prototype.listen=function(t,e,n){this.root_.addEventListener(t,e,n)},t.prototype.unlisten=function(t,e,n){this.root_.removeEventListener(t,e,n)},t.prototype.emit=function(t,e,n){var i;void 0===n&&(n=!1),"function"==typeof CustomEvent?i=new CustomEvent(t,{bubbles:n,detail:e}):(i=document.createEvent("CustomEvent")).initCustomEvent(t,n,!1,e),this.root_.dispatchEvent(i)},t}();
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function p(t,e){if(t.closest)return t.closest(e);for(var n=t;n;){if(m(n,e))return n;n=n.parentElement}return null}function m(t,e){return(t.matches||t.webkitMatchesSelector||t.msMatchesSelector).call(t,e)}
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var h={CLOSING:"mdc-snackbar--closing",OPEN:"mdc-snackbar--open",OPENING:"mdc-snackbar--opening"},y={ACTION_SELECTOR:".mdc-snackbar__action",ARIA_LIVE_LABEL_TEXT_ATTR:"data-mdc-snackbar-label-text",CLOSED_EVENT:"MDCSnackbar:closed",CLOSING_EVENT:"MDCSnackbar:closing",DISMISS_SELECTOR:".mdc-snackbar__dismiss",LABEL_SELECTOR:".mdc-snackbar__label",OPENED_EVENT:"MDCSnackbar:opened",OPENING_EVENT:"MDCSnackbar:opening",REASON_ACTION:"action",REASON_DISMISS:"dismiss",SURFACE_SELECTOR:".mdc-snackbar__surface"},b={DEFAULT_AUTO_DISMISS_TIMEOUT_MS:5e3,INDETERMINATE:-1,MAX_AUTO_DISMISS_TIMEOUT_MS:1e4,MIN_AUTO_DISMISS_TIMEOUT_MS:4e3,SNACKBAR_ANIMATION_CLOSE_TIME_MS:75,SNACKBAR_ANIMATION_OPEN_TIME_MS:150,ARIA_LIVE_DELAY_MS:1e3},E=h.OPENING,O=h.OPEN,T=h.CLOSING,g=y.REASON_ACTION,S=y.REASON_DISMISS,C=function(t){function e(n){var i=t.call(this,l({},e.defaultAdapter,n))||this;return i.isOpen_=!1,i.animationFrame_=0,i.animationTimer_=0,i.autoDismissTimer_=0,i.autoDismissTimeoutMs_=b.DEFAULT_AUTO_DISMISS_TIMEOUT_MS,i.closeOnEscape_=!0,i}return u(e,t),Object.defineProperty(e,"cssClasses",{get:function(){return h},enumerable:!0,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return y},enumerable:!0,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return b},enumerable:!0,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{addClass:function(){},announce:function(){},notifyClosed:function(){},notifyClosing:function(){},notifyOpened:function(){},notifyOpening:function(){},removeClass:function(){}}},enumerable:!0,configurable:!0}),e.prototype.destroy=function(){this.clearAutoDismissTimer_(),cancelAnimationFrame(this.animationFrame_),this.animationFrame_=0,clearTimeout(this.animationTimer_),this.animationTimer_=0,this.adapter_.removeClass(E),this.adapter_.removeClass(O),this.adapter_.removeClass(T)},e.prototype.open=function(){var t=this;this.clearAutoDismissTimer_(),this.isOpen_=!0,this.adapter_.notifyOpening(),this.adapter_.removeClass(T),this.adapter_.addClass(E),this.adapter_.announce(),this.runNextAnimationFrame_((function(){t.adapter_.addClass(O),t.animationTimer_=setTimeout((function(){var e=t.getTimeoutMs();t.handleAnimationTimerEnd_(),t.adapter_.notifyOpened(),e!==b.INDETERMINATE&&(t.autoDismissTimer_=setTimeout((function(){t.close(S)}),e))}),b.SNACKBAR_ANIMATION_OPEN_TIME_MS)}))},e.prototype.close=function(t){var e=this;void 0===t&&(t=""),this.isOpen_&&(cancelAnimationFrame(this.animationFrame_),this.animationFrame_=0,this.clearAutoDismissTimer_(),this.isOpen_=!1,this.adapter_.notifyClosing(t),this.adapter_.addClass(h.CLOSING),this.adapter_.removeClass(h.OPEN),this.adapter_.removeClass(h.OPENING),clearTimeout(this.animationTimer_),this.animationTimer_=setTimeout((function(){e.handleAnimationTimerEnd_(),e.adapter_.notifyClosed(t)}),b.SNACKBAR_ANIMATION_CLOSE_TIME_MS))},e.prototype.isOpen=function(){return this.isOpen_},e.prototype.getTimeoutMs=function(){return this.autoDismissTimeoutMs_},e.prototype.setTimeoutMs=function(t){var e=b.MIN_AUTO_DISMISS_TIMEOUT_MS,n=b.MAX_AUTO_DISMISS_TIMEOUT_MS,i=b.INDETERMINATE;if(!(t===b.INDETERMINATE||t<=n&&t>=e))throw new Error("\n        timeoutMs must be an integer in the range "+e+"–"+n+"\n        (or "+i+" to disable), but got '"+t+"'");this.autoDismissTimeoutMs_=t},e.prototype.getCloseOnEscape=function(){return this.closeOnEscape_},e.prototype.setCloseOnEscape=function(t){this.closeOnEscape_=t},e.prototype.handleKeyDown=function(t){("Escape"===t.key||27===t.keyCode)&&this.getCloseOnEscape()&&this.close(S)},e.prototype.handleActionButtonClick=function(t){this.close(g)},e.prototype.handleActionIconClick=function(t){this.close(S)},e.prototype.clearAutoDismissTimer_=function(){clearTimeout(this.autoDismissTimer_),this.autoDismissTimer_=0},e.prototype.handleAnimationTimerEnd_=function(){this.animationTimer_=0,this.adapter_.removeClass(h.OPENING),this.adapter_.removeClass(h.CLOSING)},e.prototype.runNextAnimationFrame_=function(t){var e=this;cancelAnimationFrame(this.animationFrame_),this.animationFrame_=requestAnimationFrame((function(){e.animationFrame_=0,clearTimeout(e.animationTimer_),e.animationTimer_=setTimeout(t,0)}))},e}(d),v=b.ARIA_LIVE_DELAY_MS,A=y.ARIA_LIVE_LABEL_TEXT_ATTR;function I(t,e){void 0===e&&(e=t);var n=t.getAttribute("aria-live"),i=e.textContent.trim();i&&n&&(t.setAttribute("aria-live","off"),e.textContent="",e.innerHTML='<span style="display: inline-block; width: 0; height: 1px;">&nbsp;</span>',e.setAttribute(A,i),setTimeout((function(){t.setAttribute("aria-live",n),e.removeAttribute(A),e.textContent=i}),v))}
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var w=y.SURFACE_SELECTOR,M=y.LABEL_SELECTOR,k=y.ACTION_SELECTOR,j=y.DISMISS_SELECTOR,N=y.OPENING_EVENT,D=y.OPENED_EVENT,L=y.CLOSING_EVENT,x=y.CLOSED_EVENT,P=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return u(e,t),e.attachTo=function(t){return new e(t)},e.prototype.initialize=function(t){void 0===t&&(t=function(){return I}),this.announce_=t()},e.prototype.initialSyncWithDOM=function(){var t=this;this.surfaceEl_=this.root_.querySelector(w),this.labelEl_=this.root_.querySelector(M),this.actionEl_=this.root_.querySelector(k),this.handleKeyDown_=function(e){return t.foundation_.handleKeyDown(e)},this.handleSurfaceClick_=function(e){var n=e.target;t.isActionButton_(n)?t.foundation_.handleActionButtonClick(e):t.isActionIcon_(n)&&t.foundation_.handleActionIconClick(e)},this.registerKeyDownHandler_(this.handleKeyDown_),this.registerSurfaceClickHandler_(this.handleSurfaceClick_)},e.prototype.destroy=function(){t.prototype.destroy.call(this),this.deregisterKeyDownHandler_(this.handleKeyDown_),this.deregisterSurfaceClickHandler_(this.handleSurfaceClick_)},e.prototype.open=function(){this.foundation_.open()},e.prototype.close=function(t){void 0===t&&(t=""),this.foundation_.close(t)},e.prototype.getDefaultFoundation=function(){var t=this;return new C({addClass:function(e){return t.root_.classList.add(e)},announce:function(){return t.announce_(t.labelEl_)},notifyClosed:function(e){return t.emit(x,e?{reason:e}:{})},notifyClosing:function(e){return t.emit(L,e?{reason:e}:{})},notifyOpened:function(){return t.emit(D,{})},notifyOpening:function(){return t.emit(N,{})},removeClass:function(e){return t.root_.classList.remove(e)}})},Object.defineProperty(e.prototype,"timeoutMs",{get:function(){return this.foundation_.getTimeoutMs()},set:function(t){this.foundation_.setTimeoutMs(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"closeOnEscape",{get:function(){return this.foundation_.getCloseOnEscape()},set:function(t){this.foundation_.setCloseOnEscape(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isOpen",{get:function(){return this.foundation_.isOpen()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"labelText",{get:function(){return this.labelEl_.textContent},set:function(t){this.labelEl_.textContent=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"actionButtonText",{get:function(){return this.actionEl_.textContent},set:function(t){this.actionEl_.textContent=t},enumerable:!0,configurable:!0}),e.prototype.registerKeyDownHandler_=function(t){this.listen("keydown",t)},e.prototype.deregisterKeyDownHandler_=function(t){this.unlisten("keydown",t)},e.prototype.registerSurfaceClickHandler_=function(t){this.surfaceEl_.addEventListener("click",t)},e.prototype.deregisterSurfaceClickHandler_=function(t){this.surfaceEl_.removeEventListener("click",t)},e.prototype.isActionButton_=function(t){return Boolean(p(t,k))},e.prototype.isActionIcon_=function(t){return Boolean(p(t,j))},e}(_);const R=document.getElementById("word"),B=document.getElementById("definition"),F=new P(document.querySelector(".mdc-snackbar")),U=document.querySelector(".mdc-snackbar__action"),V=document.querySelector(".mdc-snackbar__label");U.addEventListener("click",t=>F.close()),document.getElementById("getWord").addEventListener("click",(function(){r().then((async function(t){let e=Object(i.c)(t.trim());await Object(i.n)(o.g,e),Object(i.m)(R,e)}))})),document.getElementById("getDefinition").addEventListener("click",(function(){r().then((async function(t){let e=Object(i.a)(Object(i.c)(t.trim()));await Object(i.n)(o.a,e),Object(i.m)(B,e)}))})),document.getElementById("vocabify").addEventListener("click",(function(){chrome.runtime.openOptionsPage()})),document.getElementById("save").addEventListener("click",(async function(){let t=await Object(i.e)(o.g),e=await Object(i.e)(o.a);if(Object(i.h)(t)||Object(i.i)(t[o.g])||!Object(i.j)(t[o.g])||!Object(i.k)(t[o.g]))return Object(i.m)(V,"Be sure to choose a word first before saving!"),void F.open();if(Object(i.h)(e)||Object(i.i)(e[o.a])||!Object(i.j)(e[o.a])||!Object(i.k)(e[o.a]))return Object(i.m)(V,"Be sure to choose a definition first before saving!"),void F.open();let n=a({response:await Object(i.e)(o.e),key:o.e,fallback:[]});if(Object(i.g)(n,t[o.g]))return Object(i.m)(V,`${t[o.g]} already exists in Vocabify, save cancelled!`),void F.open();let r=Object(i.b)({word:t[o.g],definition:e[o.a],items:n});await Object(i.l)({key:o.e,items:r,callback:i.n}),Object(i.m)(V,`${t[o.g]} successfully saved to Vocabify!`),F.open(),await async function({word:t,definition:e,callback:n}){await n(o.g,""),await n(o.a,""),Object(i.m)(t,o.d),Object(i.m)(e,o.c)}({word:R,definition:B,callback:i.n})})),R.addEventListener("input",c.setEditState),B.addEventListener("input",c.setEditState),R.addEventListener("blur",(async function(){await c.onBlur({text:R.textContent,key:o.g,element:R,fallback:o.d,callback:i.n})})),B.addEventListener("blur",(async function(){await c.onBlur({text:B.textContent,key:o.a,element:B,fallback:o.c,callback:i.n})})),async function(){let t=await Object(i.e)(o.g),e=await Object(i.e)(o.a),n=a({response:t,key:o.g,fallback:o.d}),r=a({response:e,key:o.a,fallback:o.c});Object(i.m)(R,n),Object(i.m)(B,r)}()}});