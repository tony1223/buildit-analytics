/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/resource/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15);


/***/ },

/***/ 15:
/***/ function(module, exports) {

	var datas = [
	  {
	    "itemID": "1",
	    "icon": "",
	    "name": "金屬",
	    "costTime": 1,
	    "cashCost": "1",
	    "level": "1",
	    "price": "10",
	    "pricePerMinute": "10",
	    "store": "工廠"
	  },
	  {
	    "itemID": "2",
	    "icon": "",
	    "name": "木材",
	    "costTime": 3,
	    "cashCost": "2",
	    "level": "2",
	    "price": "20",
	    "pricePerMinute": "6.67",
	    "store": "工廠"
	  },
	  {
	    "itemID": "3",
	    "icon": "",
	    "name": "塑膠",
	    "costTime": 9,
	    "cashCost": "5",
	    "level": "5",
	    "price": "25",
	    "pricePerMinute": "2.78",
	    "store": "工廠"
	  },
	  {
	    "itemID": "4",
	    "icon": "",
	    "name": "種子",
	    "costTime": 20,
	    "cashCost": "9",
	    "level": "7",
	    "price": "30",
	    "pricePerMinute": "1.5",
	    "store": "工廠"
	  },
	  {
	    "itemID": "5",
	    "icon": "",
	    "name": "礦產",
	    "costTime": 30,
	    "cashCost": "12",
	    "level": "11",
	    "price": 40,
	    "pricePerMinute": "1.33",
	    "store": "工廠"
	  },
	  {
	    "itemID": "6",
	    "icon": "",
	    "name": "化學物品",
	    "costTime": "120",
	    "cashCost": "28",
	    "level": "13",
	    "price": 60,
	    "pricePerMinute": "0.5",
	    "store": "工廠"
	  },
	  {
	    "itemID": "7",
	    "icon": "",
	    "name": "布料",
	    "costTime": 180,
	    "cashCost": "36",
	    "level": "15",
	    "price": 90,
	    "pricePerMinute": "0.5",
	    "store": "工廠"
	  },
	  {
	    "itemID": "8",
	    "icon": "",
	    "name": "糖和香料",
	    "costTime": 240,
	    "cashCost": "44",
	    "level": "17",
	    "price": 110,
	    "pricePerMinute": "0.46",
	    "store": "工廠"
	  },
	  {
	    "itemID": "9",
	    "icon": "",
	    "name": "玻璃",
	    "costTime": 300,
	    "cashCost": "52",
	    "level": "19",
	    "price": 120,
	    "pricePerMinute": "0.4",
	    "store": "工廠"
	  },
	  {
	    "itemID": "10",
	    "icon": "",
	    "name": "動物飼料",
	    "costTime": 360,
	    "cashCost": "六十",
	    "level": "23",
	    "price": 140,
	    "pricePerMinute": "0.39",
	    "store": "工廠"
	  },
	  {
	    "itemID": "11",
	    "icon": "",
	    "name": "電子元件",
	    "costTime": 420,
	    "cashCost": "65",
	    "level": "29",
	    "price": 160,
	    "pricePerMinute": "0.38",
	    "store": "工廠"
	  }
	];

	module.exports =  datas;


/***/ }

/******/ });