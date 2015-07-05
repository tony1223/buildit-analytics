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
/******/ 	__webpack_require__.p = "http://localhost:9090/resource/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(16);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	/*globals window __webpack_hash__ */
	if(false) {
		var lastData;
		var upToDate = function upToDate() {
			return lastData.indexOf(__webpack_hash__) >= 0;
		};
		var check = function check() {
			module.hot.check(true, function(err, updatedModules) {
				if(err) {
					if(module.hot.status() in {abort: 1, fail: 1}) {
						console.warn("[HMR] Cannot apply update. Need to do a full reload!");
						console.warn("[HMR] " + err.stack || err.message);
						window.location.reload();
					} else {
						console.warn("[HMR] Update failed: " + err.stack || err.message);
					}
					return;
				}

				if(!updatedModules) {
					console.warn("[HMR] Cannot find update. Need to do a full reload!");
					console.warn("[HMR] (Probably because of restarting the webpack-dev-server)");
					window.location.reload();
					return;
				}

				if(!upToDate()) {
					check();
				}

				require("./log-apply-result")(updatedModules, updatedModules);

				if(upToDate()) {
					console.log("[HMR] App is up to date.");
				}

			});
		};
		var addEventListener = window.addEventListener ? function(eventName, listener) {
			window.addEventListener(eventName, listener, false);
		} : function (eventName, listener) {
			window.attachEvent("on" + eventName, listener);
		};
		addEventListener("message", function(event) {
			if(typeof event.data === "string" && event.data.indexOf("webpackHotUpdate") === 0) {
				lastData = event.data;
				if(!upToDate() && module.hot.status() === "idle") {
					console.log("[HMR] Checking for updates on the server...");
					check();
				}
			}
		});
		console.log("[HMR] Waiting for update signal from WDS...");
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled.");
	}


/***/ },

/***/ 16:
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