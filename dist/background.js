/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_background_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/background-utils */ "./src/utils/background-utils.js");

let {
  onNewSelectedText,
  onRequestForSelectedText
} = _utils_background_utils__WEBPACK_IMPORTED_MODULE_0__["backgroundUtils"];
/**
 * Stores any highlighted text from the web page in the closure of the backgroundUtils object,
 * regardless of whether the user requests it.
 * This way the text is pre-stored and ready to send
 * via the onMessage handler below
 */

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(onNewSelectedText);
});
/**
 * Waits for the user to request the highlighted text 
 * and sends it to the popup
 */

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  onRequestForSelectedText(msg, sendResponse);
});

/***/ }),

/***/ "./src/utils/background-utils.js":
/*!***************************************!*\
  !*** ./src/utils/background-utils.js ***!
  \***************************************/
/*! exports provided: backgroundUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backgroundUtils", function() { return backgroundUtils; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/utils/constants.js");

const backgroundUtils = function () {
  let selectedText = '';
  return {
    onNewSelectedText(msg) {
      if (msg.action === _constants__WEBPACK_IMPORTED_MODULE_0__["__VOCABIFY_SET_SELECTED_TEXT__"]) {
        selectedText = msg.data;
      }

      return selectedText;
    },

    onRequestForSelectedText(msg, callback) {
      if (msg.action === _constants__WEBPACK_IMPORTED_MODULE_0__["__VOCABIFY_GET_SELECTED_TEXT__"] && selectedText !== '') {
        callback({
          data: selectedText
        });
        selectedText = '';
      }

      return selectedText;
    }

  };
}();

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/*! exports provided: __VOCABIFY_WORD__, __VOCABIFY_DEFINITION__, __VOCABIFY_SAVED_ITEMS__, __VOCABIFY_NO_WORD_SELECTED__, __VOCABIFY_NO_DEFINITION_SELECTED__, __VOCABIFY_NO_SAVED_ITEMS__, __VOCABIFY_SET_SELECTED_TEXT__, __VOCABIFY_GET_SELECTED_TEXT__ */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__VOCABIFY_WORD__", function() { return __VOCABIFY_WORD__; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__VOCABIFY_DEFINITION__", function() { return __VOCABIFY_DEFINITION__; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__VOCABIFY_SAVED_ITEMS__", function() { return __VOCABIFY_SAVED_ITEMS__; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__VOCABIFY_NO_WORD_SELECTED__", function() { return __VOCABIFY_NO_WORD_SELECTED__; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__VOCABIFY_NO_DEFINITION_SELECTED__", function() { return __VOCABIFY_NO_DEFINITION_SELECTED__; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__VOCABIFY_NO_SAVED_ITEMS__", function() { return __VOCABIFY_NO_SAVED_ITEMS__; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__VOCABIFY_SET_SELECTED_TEXT__", function() { return __VOCABIFY_SET_SELECTED_TEXT__; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__VOCABIFY_GET_SELECTED_TEXT__", function() { return __VOCABIFY_GET_SELECTED_TEXT__; });
const __VOCABIFY_WORD__ = '__VOCABIFY_WORD__';
const __VOCABIFY_DEFINITION__ = '__VOCABIFY_DEFINITION__';
const __VOCABIFY_SAVED_ITEMS__ = '__VOCABIFY_SAVED_ITEMS__';
const __VOCABIFY_NO_WORD_SELECTED__ = 'Choose a word';
const __VOCABIFY_NO_DEFINITION_SELECTED__ = 'Find a definiton';
const __VOCABIFY_NO_SAVED_ITEMS__ = 'Find a definiton';
const __VOCABIFY_SET_SELECTED_TEXT__ = 'SET_SELECTED_TEXT';
const __VOCABIFY_GET_SELECTED_TEXT__ = 'GET_SELECTED_TEXT';

/***/ })

/******/ });