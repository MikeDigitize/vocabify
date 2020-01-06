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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/content.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/content.js":
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_content_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/content-utils */ "./src/utils/content-utils.js");

/**
 * Creates a port to connect the web page to Vocabify background script
 */

const port = Object(_utils_content_utils__WEBPACK_IMPORTED_MODULE_0__["getChromePort"])();
/**
 * Waits for text to be highlighted in web page and then sends it to the background script
 */

Object(_utils_content_utils__WEBPACK_IMPORTED_MODULE_0__["listenForHighlightedText"])(port);

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

/***/ }),

/***/ "./src/utils/content-utils.js":
/*!************************************!*\
  !*** ./src/utils/content-utils.js ***!
  \************************************/
/*! exports provided: getChromePort, getHighlightedTextFromActiveTab, listenForHighlightedText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getChromePort", function() { return getChromePort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHighlightedTextFromActiveTab", function() { return getHighlightedTextFromActiveTab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listenForHighlightedText", function() { return listenForHighlightedText; });
/* harmony import */ var _utils_general_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/general-utils */ "./src/utils/general-utils.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.js");


function getChromePort() {
  const port = chrome.runtime.connect({
    name: 'vocabify'
  });
  return port;
}
function getHighlightedTextFromActiveTab() {
  let highlighted = window.getSelection().toString();

  if (!Object(_utils_general_utils__WEBPACK_IMPORTED_MODULE_0__["isFourHundredCharactersOrLess"])(highlighted) || !Object(_utils_general_utils__WEBPACK_IMPORTED_MODULE_0__["isTwoCharactersOrMore"])(highlighted)) {
    return false;
  }

  return {
    action: _utils_constants__WEBPACK_IMPORTED_MODULE_1__["__VOCABIFY_SET_SELECTED_TEXT__"],
    data: highlighted
  };
}
function listenForHighlightedText(port) {
  document.addEventListener('click', function () {
    let result = getHighlightedTextFromActiveTab();

    if (result) {
      port.postMessage(result);
    }
  });
}

/***/ }),

/***/ "./src/utils/general-utils.js":
/*!************************************!*\
  !*** ./src/utils/general-utils.js ***!
  \************************************/
/*! exports provided: setVocabifyData, getVocabifyData, isDefaultText, isTwoCharactersOrMore, isFourHundredCharactersOrLess, isEmptyObject, isEmptyString, addToItems, saveItem, setPlaceholderText, toEmptyString, capitaliseFirstLetter, addFullStop, isDuplicateWord */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setVocabifyData", function() { return setVocabifyData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVocabifyData", function() { return getVocabifyData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDefaultText", function() { return isDefaultText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTwoCharactersOrMore", function() { return isTwoCharactersOrMore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFourHundredCharactersOrLess", function() { return isFourHundredCharactersOrLess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmptyObject", function() { return isEmptyObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmptyString", function() { return isEmptyString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addToItems", function() { return addToItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveItem", function() { return saveItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPlaceholderText", function() { return setPlaceholderText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toEmptyString", function() { return toEmptyString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "capitaliseFirstLetter", function() { return capitaliseFirstLetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addFullStop", function() { return addFullStop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDuplicateWord", function() { return isDuplicateWord; });
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.js");

function setVocabifyData(key, value) {
  return new Promise(function (resolve) {
    let store = {};
    store[key] = value;
    chrome.storage.sync.set(store, function () {
      resolve(value);
    });
  });
}
function getVocabifyData(key) {
  return new Promise(function (resolve) {
    chrome.storage.sync.get([`${key}`], function (response) {
      resolve(response);
    });
  });
}
function isDefaultText(text) {
  return text === _utils_constants__WEBPACK_IMPORTED_MODULE_0__["__VOCABIFY_NO_WORD_SELECTED__"] || text === _utils_constants__WEBPACK_IMPORTED_MODULE_0__["__VOCABIFY_NO_DEFINITION_SELECTED__"];
}
function isTwoCharactersOrMore(text) {
  return text.length >= 2;
}
function isFourHundredCharactersOrLess(text) {
  return text.length <= 400;
}
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}
function isEmptyString(str) {
  return str.length === 0;
}
function addToItems({
  word,
  definition,
  items
}) {
  let item = {
    word,
    definition
  };
  return items.concat(item);
}
async function saveItem({
  key,
  items,
  callback
}) {
  return await callback(key, items);
}
function setPlaceholderText(placeholder, text) {
  placeholder.textContent = text;
}
function toEmptyString(str) {
  str = '';
  return str;
}
function capitaliseFirstLetter(str) {
  if (!str.length) {
    return false;
  }

  const firstLetter = str[0];
  return `${firstLetter.toUpperCase()}${str.substring(1, str.length)}`;
}
function addFullStop(str) {
  if (!str.length) {
    return false;
  }

  const lastChar = str.charAt(str.length - 1);

  if (lastChar === '.') {
    return str;
  }

  return `${str}.`;
}
function isDuplicateWord(savedItems, word) {
  let isPresent = savedItems.some(function (item) {
    return item.word.toUpperCase() === word.toUpperCase();
  });
  return isPresent;
}

/***/ })

/******/ });