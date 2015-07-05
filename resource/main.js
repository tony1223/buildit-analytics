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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(15);


/***/ },
/* 1 */
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);
	var cx = __webpack_require__(4);
	var util = __webpack_require__(5);

	var removeMoreNumbers = function removeMoreNumbers(num, points) {
	  return parseInt(num * Math.pow(10, points), 10) / Math.pow(10, points);
	};

	var getNeedProduceItems = function getNeedProduceItems(s, materialMap) {

	  var needProduceItems = [];
	  needProduceItems.push(s);

	  if (s.itemDetail) {
	    for (var k in s.itemDetail) {
	      var count = s.itemDetail[k];
	      for (var i = 0; i < count; ++i) {

	        if (materialMap[k].itemDetail) {
	          var child = getNeedProduceItems(materialMap[k], materialMap).items;
	          child.forEach(function (c) {
	            needProduceItems.push(c);
	          });
	        } else {
	          needProduceItems.push(materialMap[k]);
	        }
	      }
	    }
	  }
	  var map = {};
	  needProduceItems.forEach(function (s) {
	    map[s.name] = 1;
	  });

	  return {
	    items: needProduceItems,
	    sourceMap: map
	  };
	};

	var getProduceableItems = function getProduceableItems(item, materialMap) {

	  var items = [];
	  for (var k in materialMap) {
	    if (k != item.name && materialMap[k].producePath.sourceMap[item.name]) {
	      items.push(materialMap[k]);
	    }
	  }
	  return items;
	};
	var getRawTimeFromProduceItems = function getRawTimeFromProduceItems(items, slot) {
	  var base_time = 0;
	  var factorys = [];
	  items.forEach(function (item) {
	    if (item.store == "工廠") {
	      factorys.push(item);
	    } else {
	      base_time += parseInt(item.costTime, 10);
	    }
	  });

	  factorys.sort(function (f, f2) {
	    return parseInt(f2.costTime, 10) - parseInt(f.costTime, 10);
	  });

	  for (var i = 0; i < factorys.length; ++i) {
	    if (i % slot == 0) {
	      base_time += parseInt(factorys[i].costTime, 10);
	    }
	  }

	  return { count: factorys.length, time: base_time };
	};

	var resolve = function resolve(s, materialMap, slot) {
	  if (slot == null) {
	    slot = 20;
	  }
	  var detail = null;
	  if (s.itemDetail != null) {
	    var timeSum = parseInt(s.costTime, 10);
	    var rawprice = 0;
	    for (var k in s.itemDetail) {
	      var count = s.itemDetail[k];
	      if (materialMap[k].rawCostTime != null) {
	        timeSum += parseInt(materialMap[k].rawCostTime, 10) * count;
	      } else {
	        timeSum += resolve(materialMap[k], materialMap) * count;
	      }

	      if (materialMap[k].price != null) {
	        rawprice += materialMap[k].price * count;
	      }
	    }
	    s.rawPriceCost = rawprice;
	    s.rawCostTime = timeSum;
	  } else {
	    s.rawCostTime = parseInt(s.costTime, 10);
	    s.rawPriceCost = 0;
	  }

	  s.producePath = getNeedProduceItems(s, materialMap);

	  s.rawCostTimeWithConcurrent = getRawTimeFromProduceItems(s.producePath.items, slot);

	  s.addValuePerMinute = (s.price - s.rawPriceCost) / s.costTime;

	  s.handMadeValuePerMinute = s.price / s.rawCostTime;
	  s.handMadeValueConcurrentPerMinute = s.price / s.rawCostTimeWithConcurrent.time;
	  s.handMadeValueConcurrentSlots = s.rawCostTimeWithConcurrent.count;

	  materialMap[s.name].rawCostTime = s.rawCostTime;
	  return s.rawCostTime;
	};

	var MaterialRow = React.createClass({
	  displayName: "MaterialRow",

	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    var item = this.props.item;
	    var map = this.props.map;

	    var detail = null;
	    if (item.itemDetail != null) {
	      detail = React.createElement(
	        "tr",
	        null,
	        React.createElement(
	          "td",
	          { colSpan: "10" },
	          "原料：",
	          JSON.stringify(item.itemDetail),
	          ",",
	          React.createElement("br", null),
	          "材料展開:",
	          item.producePath.items.map(function (i) {
	            return i.name + " > ";
	          }),
	          React.createElement("br", null),
	          React.createElement("br", null),
	          "可以製作:",
	          item.produceableItems.length ? item.produceableItems.map(function (item) {
	            return React.createElement(
	              "div",
	              null,
	              item.name,
	              "  (加工 $",
	              removeMoreNumbers(item.addValuePerMinute, 3),
	              " , 自製 $",
	              removeMoreNumbers(item.handMadeValueConcurrentPerMinute, 3),
	              " )"
	            );
	          }) : "無"
	        )
	      );
	    } else {
	      item.rawCostTime = item.costTime;
	      detail = React.createElement(
	        "tr",
	        null,
	        React.createElement(
	          "td",
	          { colSpan: "10" },
	          React.createElement("br", null),
	          "可以製作:",
	          item.produceableItems.length ? item.produceableItems.map(function (item) {
	            return React.createElement(
	              "div",
	              null,
	              item.name,
	              "  (加工 $",
	              removeMoreNumbers(item.addValuePerMinute, 3),
	              " , 自製 $",
	              removeMoreNumbers(item.handMadeValueConcurrentPerMinute, 3),
	              " )"
	            );
	          }) : "無"
	        )
	      );
	    }

	    return React.createElement(
	      "tbody",
	      null,
	      React.createElement(
	        "tr",
	        null,
	        React.createElement(
	          "td",
	          { rowSpan: "2" },
	          item.store
	        ),
	        React.createElement(
	          "td",
	          { rowSpan: "2" },
	          item.name
	        ),
	        React.createElement(
	          "td",
	          null,
	          item.costTime,
	          "m"
	        ),
	        React.createElement(
	          "td",
	          null,
	          "$",
	          item.rawPriceCost
	        ),
	        React.createElement(
	          "td",
	          null,
	          item.rawCostTime,
	          "m (",
	          item.rawCostTimeWithConcurrent.time,
	          "m/",
	          item.handMadeValueConcurrentSlots,
	          "格 )"
	        ),
	        React.createElement(
	          "td",
	          null,
	          "$",
	          item.price
	        ),
	        React.createElement(
	          "td",
	          { className: cx({ item: true, "item-out": item.addValuePerMinute > item.handMadeValueConcurrentPerMinute }) },
	          "$",
	          removeMoreNumbers(item.addValuePerMinute, 3),
	          " ( ",
	          item.addValuePerMinute * item.costTime,
	          ") "
	        ),
	        React.createElement(
	          "td",
	          null,
	          "$",
	          removeMoreNumbers(item.handMadeValuePerMinute, 3)
	        ),
	        React.createElement(
	          "td",
	          null,
	          "$",
	          removeMoreNumbers(item.handMadeValueConcurrentPerMinute, 3)
	        ),
	        React.createElement(
	          "td",
	          null,
	          item.level
	        )
	      ),
	      detail
	    );
	  }
	});

	var MaterialTable = React.createClass({
	  displayName: "MaterialTable",

	  getInitialState: function getInitialState() {
	    return {
	      level: 25
	    };
	  },
	  filterLevel: function filterLevel(event) {
	    var level = parseInt(event.target.value, 10);

	    if (!level) {
	      level = 25;
	    }
	    this.setState({ level: level });
	  },
	  render: function render() {
	    var comp = this;

	    var materials = this.props.materials;
	    var store = this.props.storeItems;

	    var materialMap = {};
	    // materials.forEach(function(m){
	    //   materialMap[m.name] = m;
	    // });

	    store.forEach(function (s) {
	      console.log(s.name);
	      materialMap[s.name] = s;
	    });

	    store.forEach(function (s) {
	      resolve(s, materialMap);
	    });

	    store.forEach(function (s) {
	      s.produceableItems = getProduceableItems(s, materialMap);
	    });

	    store.sort(function (s1, s2) {
	      return s1.handMadeValueConcurrentPerMinute - s2.handMadeValueConcurrentPerMinute;
	    });
	    // var resolve = function(map,item){
	    //   if(item.itemDetail){
	    //     //do handle combination
	    //   }
	    //   item.cost_raw_time = item.
	    // };

	    var rendered_store = [];
	    var comp = this;
	    store.forEach(function (s) {
	      if (parseInt(s.level, 10) < comp.state.level) {
	        rendered_store.push(s);
	      }
	    });

	    var res = React.createElement(
	      "div",
	      null,
	      "等級:",
	      React.createElement("input", { type: "text", onChange: this.filterLevel, value: this.state.level }),
	      React.createElement(
	        "table",
	        { className: "table table-bordered col-sm-12" },
	        React.createElement(
	          "tbody",
	          null,
	          React.createElement(
	            "tr",
	            null,
	            React.createElement(
	              "td",
	              null,
	              "商店"
	            ),
	            React.createElement(
	              "td",
	              null,
	              "名稱"
	            ),
	            React.createElement(
	              "td",
	              null,
	              "加工時間（分鐘）"
	            ),
	            React.createElement(
	              "td",
	              null,
	              "原料購買成本"
	            ),
	            React.createElement(
	              "td",
	              null,
	              "原料總生產時間（分鐘）"
	            ),
	            React.createElement(
	              "td",
	              null,
	              "價錢"
	            ),
	            React.createElement(
	              "td",
	              null,
	              "加工獲利（分鐘）"
	            ),
	            React.createElement(
	              "td",
	              null,
	              "全程加工獲利（分鐘）"
	            ),
	            React.createElement(
	              "td",
	              null,
	              "全程且工廠同時生產下獲利（分鐘）"
	            ),
	            React.createElement(
	              "td",
	              null,
	              "需要等級"
	            )
	          )
	        ),
	        rendered_store.map(function (s) {
	          return React.createElement(MaterialRow, { map: materialMap, item: s, key: s.ID });
	        })
	      )
	    );
	    return res;
	  }
	});

	module.exports = MaterialTable;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/

	(function () {
		'use strict';

		function classNames () {

			var classes = '';

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if ('string' === argType || 'number' === argType) {
					classes += ' ' + arg;

				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);

				} else if ('object' === argType) {
					for (var key in arg) {
						if (arg.hasOwnProperty(key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}

			return classes.substr(1);
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true){
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}

	}());


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(6);

	var util = {
		base_url:function(str){
			if(str && str[0] == "/"){
				return str;
			}
			return "/"+str;
		},
		site_url:function(str){
			if(str && str[0] == "/"){
				return str;
			}
			return "/"+str;
		},
		asset_url:function(str){
			if(str && str[0] == "/"){
				return str;
			}
			return "/"+str;
		},
		format_date:function(d){
			var pad = function(num){
				if(num < 10){
					return "0"+num;
				}
				return num;
			};
			if(!isNaN(d)){
				d= new Date(d);
			}
			if(d.getTime){ //date
				return d.getFullYear()+"/"+ pad(d.getMonth()+1) 
					+"/" + pad(d.getDate())
					+" "+pad(d.getHours())
					+":"+pad(d.getMinutes())
					+":"+pad(d.getSeconds());
			}
		},
		watch:function(label){
			return function(d){
				console.log(label,d);
				return Promise.resolve(d);
			}
		},
		//analyticProvider.get_last_comment(null,1,200).then(function(comments){
		timeout:function(promise,time,timeout){
			var p = new Promise(function(ok,fail){
				var flag = false ,resolved = false;
				promise.then(function(datas){
					if(!resolved) {
						ok(datas);
					}
					flag = true;
				},fail);
				setTimeout(function(){
					if(!flag){
						resolved = true;
						timeout(ok);
					}
				},time);
			});
			return p;
		},
		each:function(ary,cb){
			if(ary == null){
				return true;
			}
			if(ary.forEach){
				ary.forEach(cb);
			}else{
				for(var i = 0; i < ary.length;++i){
					if(cb){ 
					  var r = cb(ary[i],i);
					  if(r === false){
					    break;
					  }
					}
				}
			}
		},
		combine:function(arrs){
			var out = [];
			this.each(arrs,function(){
				out.push.apply(out,ary);
			});
			return ary;
		},
		err:function(){
	  		return function(){
		    	console.log("fail:",message);
		    	console.log(arguments);
			};
		}
	};

	module.exports = util;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(7)


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(8);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var asap = __webpack_require__(9);

	function noop() {}

	// States:
	//
	// 0 - pending
	// 1 - fulfilled with _value
	// 2 - rejected with _value
	// 3 - adopted the state of another promise, _value
	//
	// once the state is no longer pending (0) it is immutable

	// All `_` prefixed properties will be reduced to `_{random number}`
	// at build time to obfuscate them and discourage their use.
	// We don't use symbols or Object.defineProperty to fully hide them
	// because the performance isn't good enough.


	// to avoid using try/catch inside critical functions, we
	// extract them to here.
	var LAST_ERROR = null;
	var IS_ERROR = {};
	function getThen(obj) {
	  try {
	    return obj.then;
	  } catch (ex) {
	    LAST_ERROR = ex;
	    return IS_ERROR;
	  }
	}

	function tryCallOne(fn, a) {
	  try {
	    return fn(a);
	  } catch (ex) {
	    LAST_ERROR = ex;
	    return IS_ERROR;
	  }
	}
	function tryCallTwo(fn, a, b) {
	  try {
	    fn(a, b);
	  } catch (ex) {
	    LAST_ERROR = ex;
	    return IS_ERROR;
	  }
	}

	module.exports = Promise;

	function Promise(fn) {
	  if (typeof this !== 'object') {
	    throw new TypeError('Promises must be constructed via new');
	  }
	  if (typeof fn !== 'function') {
	    throw new TypeError('not a function');
	  }
	  this._41 = 0;
	  this._86 = null;
	  this._17 = [];
	  if (fn === noop) return;
	  doResolve(fn, this);
	}
	Promise._1 = noop;

	Promise.prototype.then = function(onFulfilled, onRejected) {
	  if (this.constructor !== Promise) {
	    return safeThen(this, onFulfilled, onRejected);
	  }
	  var res = new Promise(noop);
	  handle(this, new Handler(onFulfilled, onRejected, res));
	  return res;
	};

	function safeThen(self, onFulfilled, onRejected) {
	  return new self.constructor(function (resolve, reject) {
	    var res = new Promise(noop);
	    res.then(resolve, reject);
	    handle(self, new Handler(onFulfilled, onRejected, res));
	  });
	};
	function handle(self, deferred) {
	  while (self._41 === 3) {
	    self = self._86;
	  }
	  if (self._41 === 0) {
	    self._17.push(deferred);
	    return;
	  }
	  asap(function() {
	    var cb = self._41 === 1 ? deferred.onFulfilled : deferred.onRejected;
	    if (cb === null) {
	      if (self._41 === 1) {
	        resolve(deferred.promise, self._86);
	      } else {
	        reject(deferred.promise, self._86);
	      }
	      return;
	    }
	    var ret = tryCallOne(cb, self._86);
	    if (ret === IS_ERROR) {
	      reject(deferred.promise, LAST_ERROR);
	    } else {
	      resolve(deferred.promise, ret);
	    }
	  });
	}
	function resolve(self, newValue) {
	  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
	  if (newValue === self) {
	    return reject(
	      self,
	      new TypeError('A promise cannot be resolved with itself.')
	    );
	  }
	  if (
	    newValue &&
	    (typeof newValue === 'object' || typeof newValue === 'function')
	  ) {
	    var then = getThen(newValue);
	    if (then === IS_ERROR) {
	      return reject(self, LAST_ERROR);
	    }
	    if (
	      then === self.then &&
	      newValue instanceof Promise
	    ) {
	      self._41 = 3;
	      self._86 = newValue;
	      finale(self);
	      return;
	    } else if (typeof then === 'function') {
	      doResolve(then.bind(newValue), self);
	      return;
	    }
	  }
	  self._41 = 1;
	  self._86 = newValue;
	  finale(self);
	}

	function reject(self, newValue) {
	  self._41 = 2;
	  self._86 = newValue;
	  finale(self);
	}
	function finale(self) {
	  for (var i = 0; i < self._17.length; i++) {
	    handle(self, self._17[i]);
	  }
	  self._17 = null;
	}

	function Handler(onFulfilled, onRejected, promise){
	  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
	  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
	  this.promise = promise;
	}

	/**
	 * Take a potentially misbehaving resolver function and make sure
	 * onFulfilled and onRejected are only called once.
	 *
	 * Makes no guarantees about asynchrony.
	 */
	function doResolve(fn, promise) {
	  var done = false;
	  var res = tryCallTwo(fn, function (value) {
	    if (done) return;
	    done = true;
	    resolve(promise, value);
	  }, function (reason) {
	    if (done) return;
	    done = true;
	    reject(promise, reason);
	  })
	  if (!done && res === IS_ERROR) {
	    done = true;
	    reject(promise, LAST_ERROR);
	  }
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	// Use the fastest means possible to execute a task in its own turn, with
	// priority over other events including IO, animation, reflow, and redraw
	// events in browsers.
	//
	// An exception thrown by a task will permanently interrupt the processing of
	// subsequent tasks. The higher level `asap` function ensures that if an
	// exception is thrown by a task, that the task queue will continue flushing as
	// soon as possible, but if you use `rawAsap` directly, you are responsible to
	// either ensure that no exceptions are thrown from your task, or to manually
	// call `rawAsap.requestFlush` if an exception is thrown.
	module.exports = rawAsap;
	function rawAsap(task) {
	    if (!queue.length) {
	        requestFlush();
	        flushing = true;
	    }
	    // Equivalent to push, but avoids a function call.
	    queue[queue.length] = task;
	}

	var queue = [];
	// Once a flush has been requested, no further calls to `requestFlush` are
	// necessary until the next `flush` completes.
	var flushing = false;
	// `requestFlush` is an implementation-specific method that attempts to kick
	// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
	// the event queue before yielding to the browser's own event loop.
	var requestFlush;
	// The position of the next task to execute in the task queue. This is
	// preserved between calls to `flush` so that it can be resumed if
	// a task throws an exception.
	var index = 0;
	// If a task schedules additional tasks recursively, the task queue can grow
	// unbounded. To prevent memory exhaustion, the task queue will periodically
	// truncate already-completed tasks.
	var capacity = 1024;

	// The flush function processes all tasks that have been scheduled with
	// `rawAsap` unless and until one of those tasks throws an exception.
	// If a task throws an exception, `flush` ensures that its state will remain
	// consistent and will resume where it left off when called again.
	// However, `flush` does not make any arrangements to be called again if an
	// exception is thrown.
	function flush() {
	    while (index < queue.length) {
	        var currentIndex = index;
	        // Advance the index before calling the task. This ensures that we will
	        // begin flushing on the next task the task throws an error.
	        index = index + 1;
	        queue[currentIndex].call();
	        // Prevent leaking memory for long chains of recursive calls to `asap`.
	        // If we call `asap` within tasks scheduled by `asap`, the queue will
	        // grow, but to avoid an O(n) walk for every task we execute, we don't
	        // shift tasks off the queue after they have been executed.
	        // Instead, we periodically shift 1024 tasks off the queue.
	        if (index > capacity) {
	            // Manually shift all values starting at the index back to the
	            // beginning of the queue.
	            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
	                queue[scan] = queue[scan + index];
	            }
	            queue.length -= index;
	            index = 0;
	        }
	    }
	    queue.length = 0;
	    index = 0;
	    flushing = false;
	}

	// `requestFlush` is implemented using a strategy based on data collected from
	// every available SauceLabs Selenium web driver worker at time of writing.
	// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

	// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
	// have WebKitMutationObserver but not un-prefixed MutationObserver.
	// Must use `global` instead of `window` to work in both frames and web
	// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.
	var BrowserMutationObserver = global.MutationObserver || global.WebKitMutationObserver;

	// MutationObservers are desirable because they have high priority and work
	// reliably everywhere they are implemented.
	// They are implemented in all modern browsers.
	//
	// - Android 4-4.3
	// - Chrome 26-34
	// - Firefox 14-29
	// - Internet Explorer 11
	// - iPad Safari 6-7.1
	// - iPhone Safari 7-7.1
	// - Safari 6-7
	if (typeof BrowserMutationObserver === "function") {
	    requestFlush = makeRequestCallFromMutationObserver(flush);

	// MessageChannels are desirable because they give direct access to the HTML
	// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
	// 11-12, and in web workers in many engines.
	// Although message channels yield to any queued rendering and IO tasks, they
	// would be better than imposing the 4ms delay of timers.
	// However, they do not work reliably in Internet Explorer or Safari.

	// Internet Explorer 10 is the only browser that has setImmediate but does
	// not have MutationObservers.
	// Although setImmediate yields to the browser's renderer, it would be
	// preferrable to falling back to setTimeout since it does not have
	// the minimum 4ms penalty.
	// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
	// Desktop to a lesser extent) that renders both setImmediate and
	// MessageChannel useless for the purposes of ASAP.
	// https://github.com/kriskowal/q/issues/396

	// Timers are implemented universally.
	// We fall back to timers in workers in most engines, and in foreground
	// contexts in the following browsers.
	// However, note that even this simple case requires nuances to operate in a
	// broad spectrum of browsers.
	//
	// - Firefox 3-13
	// - Internet Explorer 6-9
	// - iPad Safari 4.3
	// - Lynx 2.8.7
	} else {
	    requestFlush = makeRequestCallFromTimer(flush);
	}

	// `requestFlush` requests that the high priority event queue be flushed as
	// soon as possible.
	// This is useful to prevent an error thrown in a task from stalling the event
	// queue if the exception handled by Node.js’s
	// `process.on("uncaughtException")` or by a domain.
	rawAsap.requestFlush = requestFlush;

	// To request a high priority event, we induce a mutation observer by toggling
	// the text of a text node between "1" and "-1".
	function makeRequestCallFromMutationObserver(callback) {
	    var toggle = 1;
	    var observer = new BrowserMutationObserver(callback);
	    var node = document.createTextNode("");
	    observer.observe(node, {characterData: true});
	    return function requestCall() {
	        toggle = -toggle;
	        node.data = toggle;
	    };
	}

	// The message channel technique was discovered by Malte Ubl and was the
	// original foundation for this library.
	// http://www.nonblocking.io/2011/06/windownexttick.html

	// Safari 6.0.5 (at least) intermittently fails to create message ports on a
	// page's first load. Thankfully, this version of Safari supports
	// MutationObservers, so we don't need to fall back in that case.

	// function makeRequestCallFromMessageChannel(callback) {
	//     var channel = new MessageChannel();
	//     channel.port1.onmessage = callback;
	//     return function requestCall() {
	//         channel.port2.postMessage(0);
	//     };
	// }

	// For reasons explained above, we are also unable to use `setImmediate`
	// under any circumstances.
	// Even if we were, there is another bug in Internet Explorer 10.
	// It is not sufficient to assign `setImmediate` to `requestFlush` because
	// `setImmediate` must be called *by name* and therefore must be wrapped in a
	// closure.
	// Never forget.

	// function makeRequestCallFromSetImmediate(callback) {
	//     return function requestCall() {
	//         setImmediate(callback);
	//     };
	// }

	// Safari 6.0 has a problem where timers will get lost while the user is
	// scrolling. This problem does not impact ASAP because Safari 6.0 supports
	// mutation observers, so that implementation is used instead.
	// However, if we ever elect to use timers in Safari, the prevalent work-around
	// is to add a scroll event listener that calls for a flush.

	// `setTimeout` does not call the passed callback if the delay is less than
	// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
	// even then.

	function makeRequestCallFromTimer(callback) {
	    return function requestCall() {
	        // We dispatch a timeout with a specified delay of 0 for engines that
	        // can reliably accommodate that request. This will usually be snapped
	        // to a 4 milisecond delay, but once we're flushing, there's no delay
	        // between events.
	        var timeoutHandle = setTimeout(handleTimer, 0);
	        // However, since this timer gets frequently dropped in Firefox
	        // workers, we enlist an interval handle that will try to fire
	        // an event 20 times per second until it succeeds.
	        var intervalHandle = setInterval(handleTimer, 50);

	        function handleTimer() {
	            // Whichever timer succeeds will cancel both timers and
	            // execute the callback.
	            clearTimeout(timeoutHandle);
	            clearInterval(intervalHandle);
	            callback();
	        }
	    };
	}

	// This is for `asap.js` only.
	// Its name will be periodically randomized to break any code that depends on
	// its existence.
	rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

	// ASAP was originally a nextTick shim included in Q. This was factored out
	// into this ASAP package. It was later adapted to RSVP which made further
	// amendments. These decisions, particularly to marginalize MessageChannel and
	// to capture the MutationObserver implementation in a closure, were integrated
	// back into ASAP proper.
	// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Promise = __webpack_require__(8);

	module.exports = Promise;
	Promise.prototype.done = function (onFulfilled, onRejected) {
	  var self = arguments.length ? this.then.apply(this, arguments) : this;
	  self.then(null, function (err) {
	    setTimeout(function () {
	      throw err;
	    }, 0);
	  });
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Promise = __webpack_require__(8);

	module.exports = Promise;
	Promise.prototype['finally'] = function (f) {
	  return this.then(function (value) {
	    return Promise.resolve(f()).then(function () {
	      return value;
	    });
	  }, function (err) {
	    return Promise.resolve(f()).then(function () {
	      throw err;
	    });
	  });
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//This file contains the ES6 extensions to the core Promises/A+ API

	var Promise = __webpack_require__(8);
	var asap = __webpack_require__(9);

	module.exports = Promise;

	/* Static Functions */

	var TRUE = valuePromise(true);
	var FALSE = valuePromise(false);
	var NULL = valuePromise(null);
	var UNDEFINED = valuePromise(undefined);
	var ZERO = valuePromise(0);
	var EMPTYSTRING = valuePromise('');

	function valuePromise(value) {
	  var p = new Promise(Promise._1);
	  p._41 = 1;
	  p._86 = value;
	  return p;
	}
	Promise.resolve = function (value) {
	  if (value instanceof Promise) return value;

	  if (value === null) return NULL;
	  if (value === undefined) return UNDEFINED;
	  if (value === true) return TRUE;
	  if (value === false) return FALSE;
	  if (value === 0) return ZERO;
	  if (value === '') return EMPTYSTRING;

	  if (typeof value === 'object' || typeof value === 'function') {
	    try {
	      var then = value.then;
	      if (typeof then === 'function') {
	        return new Promise(then.bind(value));
	      }
	    } catch (ex) {
	      return new Promise(function (resolve, reject) {
	        reject(ex);
	      });
	    }
	  }
	  return valuePromise(value);
	};

	Promise.all = function (arr) {
	  var args = Array.prototype.slice.call(arr);

	  return new Promise(function (resolve, reject) {
	    if (args.length === 0) return resolve([]);
	    var remaining = args.length;
	    function res(i, val) {
	      if (val && (typeof val === 'object' || typeof val === 'function')) {
	        if (val instanceof Promise && val.then === Promise.prototype.then) {
	          while (val._41 === 3) {
	            val = val._86;
	          }
	          if (val._41 === 1) return res(i, val._86);
	          if (val._41 === 2) reject(val._86);
	          val.then(function (val) {
	            res(i, val);
	          }, reject);
	          return;
	        } else {
	          var then = val.then;
	          if (typeof then === 'function') {
	            var p = new Promise(then.bind(val));
	            p.then(function (val) {
	              res(i, val);
	            }, reject);
	            return;
	          }
	        }
	      }
	      args[i] = val;
	      if (--remaining === 0) {
	        resolve(args);
	      }
	    }
	    for (var i = 0; i < args.length; i++) {
	      res(i, args[i]);
	    }
	  });
	};

	Promise.reject = function (value) {
	  return new Promise(function (resolve, reject) {
	    reject(value);
	  });
	};

	Promise.race = function (values) {
	  return new Promise(function (resolve, reject) {
	    values.forEach(function(value){
	      Promise.resolve(value).then(resolve, reject);
	    });
	  });
	};

	/* Prototype Methods */

	Promise.prototype['catch'] = function (onRejected) {
	  return this.then(null, onRejected);
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// This file contains then/promise specific extensions that are only useful
	// for node.js interop

	var Promise = __webpack_require__(8);
	var asap = __webpack_require__(14);

	module.exports = Promise;

	/* Static Functions */

	Promise.denodeify = function (fn, argumentCount) {
	  argumentCount = argumentCount || Infinity;
	  return function () {
	    var self = this;
	    var args = Array.prototype.slice.call(arguments);
	    return new Promise(function (resolve, reject) {
	      while (args.length && args.length > argumentCount) {
	        args.pop();
	      }
	      args.push(function (err, res) {
	        if (err) reject(err);
	        else resolve(res);
	      })
	      var res = fn.apply(self, args);
	      if (res &&
	        (
	          typeof res === 'object' ||
	          typeof res === 'function'
	        ) &&
	        typeof res.then === 'function'
	      ) {
	        resolve(res);
	      }
	    })
	  }
	}
	Promise.nodeify = function (fn) {
	  return function () {
	    var args = Array.prototype.slice.call(arguments);
	    var callback =
	      typeof args[args.length - 1] === 'function' ? args.pop() : null;
	    var ctx = this;
	    try {
	      return fn.apply(this, arguments).nodeify(callback, ctx);
	    } catch (ex) {
	      if (callback === null || typeof callback == 'undefined') {
	        return new Promise(function (resolve, reject) {
	          reject(ex);
	        });
	      } else {
	        asap(function () {
	          callback.call(ctx, ex);
	        })
	      }
	    }
	  }
	}

	Promise.prototype.nodeify = function (callback, ctx) {
	  if (typeof callback != 'function') return this;

	  this.then(function (value) {
	    asap(function () {
	      callback.call(ctx, null, value);
	    });
	  }, function (err) {
	    asap(function () {
	      callback.call(ctx, err);
	    });
	  });
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	// rawAsap provides everything we need except exception management.
	var rawAsap = __webpack_require__(9);
	// RawTasks are recycled to reduce GC churn.
	var freeTasks = [];
	// We queue errors to ensure they are thrown in right order (FIFO).
	// Array-as-queue is good enough here, since we are just dealing with exceptions.
	var pendingErrors = [];
	var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

	function throwFirstError() {
	    if (pendingErrors.length) {
	        throw pendingErrors.shift();
	    }
	}

	/**
	 * Calls a task as soon as possible after returning, in its own event, with priority
	 * over other events like animation, reflow, and repaint. An error thrown from an
	 * event will not interrupt, nor even substantially slow down the processing of
	 * other events, but will be rather postponed to a lower priority event.
	 * @param {{call}} task A callable object, typically a function that takes no
	 * arguments.
	 */
	module.exports = asap;
	function asap(task) {
	    var rawTask;
	    if (freeTasks.length) {
	        rawTask = freeTasks.pop();
	    } else {
	        rawTask = new RawTask();
	    }
	    rawTask.task = task;
	    rawAsap(rawTask);
	}

	// We wrap tasks with recyclable task objects.  A task object implements
	// `call`, just like a function.
	function RawTask() {
	    this.task = null;
	}

	// The sole purpose of wrapping the task is to catch the exception and recycle
	// the task object after its single use.
	RawTask.prototype.call = function () {
	    try {
	        this.task.call();
	    } catch (error) {
	        if (asap.onerror) {
	            // This hook exists purely for testing purposes.
	            // Its name will be periodically randomized to break any code that
	            // depends on its existence.
	            asap.onerror(error);
	        } else {
	            // In a web browser, exceptions are not fatal. However, to avoid
	            // slowing down the queue of pending tasks, we rethrow the error in a
	            // lower priority turn.
	            pendingErrors.push(error);
	            requestErrorThrow();
	        }
	    } finally {
	        this.task = null;
	        freeTasks[freeTasks.length] = this;
	    }
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);
	var cx = __webpack_require__(4);

	var materialDatas = __webpack_require__(16);
	var MaterialTable = __webpack_require__(2);
	var storeDatas = __webpack_require__(17);

	React.render(React.createElement(
		"div",
		{ className: "container" },
		React.createElement(MaterialTable, { storeItems: storeDatas, materials: materialDatas })
	), document.getElementById("react-root"));

/***/ },
/* 16 */
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


/***/ },
/* 17 */
/***/ function(module, exports) {

	var data = [
	  {
	    "itemID": "1",
	    "icon": "",
	    "name": "金屬",
	    "costTime": "1",
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
	    "costTime": "3",
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
	    "costTime": "9",
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
	    "costTime": "20",
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
	    "costTime": "30",
	    "cashCost": "12",
	    "level": "11",
	    "price": "40",
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
	    "price": "60",
	    "pricePerMinute": "0.5",
	    "store": "工廠"
	  },
	  {
	    "itemID": "7",
	    "icon": "",
	    "name": "布料",
	    "costTime": "180",
	    "cashCost": "36",
	    "level": "15",
	    "price": "90",
	    "pricePerMinute": "0.5",
	    "store": "工廠"
	  },
	  {
	    "itemID": "8",
	    "icon": "",
	    "name": "糖和香料",
	    "costTime": "240",
	    "cashCost": "44",
	    "level": "17",
	    "price": "110",
	    "pricePerMinute": "0.46",
	    "store": "工廠"
	  },
	  {
	    "itemID": "9",
	    "icon": "",
	    "name": "玻璃",
	    "costTime": "300",
	    "cashCost": "52",
	    "level": "19",
	    "price": "120",
	    "pricePerMinute": "0.4",
	    "store": "工廠"
	  },
	  {
	    "itemID": "10",
	    "icon": "",
	    "name": "動物飼料",
	    "costTime": "360",
	    "cashCost": "六十",
	    "level": "23",
	    "price": "140",
	    "pricePerMinute": "0.39",
	    "store": "工廠"
	  },
	  {
	    "itemID": "11",
	    "icon": "",
	    "name": "電子元件",
	    "costTime": "420",
	    "cashCost": "65",
	    "level": "29",
	    "price": "160",
	    "pricePerMinute": "0.38",
	    "store": "工廠"
	  },
	  {
	    "ID": "釘子",
	    "store": "建材店",
	    "level": "1",
	    "name": "釘子",
	    "costTime": "5",
	    "costCash": "3",
	    "item": "金屬2",
	    "price": "80",
	    "costperminute": "-4",
	    "cost_all": "20",
	    "itemDetail": {
	      "金屬": 2
	    }
	  },
	  {
	    "ID": "木板",
	    "store": "建材店",
	    "level": "3",
	    "name": "木板",
	    "costTime": "30",
	    "costCash": "12",
	    "item": "木材2",
	    "price": "120",
	    "costperminute": "-9.33",
	    "cost_all": "40",
	    "itemDetail": {
	      "木材": 2
	    }
	  },
	  {
	    "ID": "磚塊",
	    "store": "建材店",
	    "level": "13",
	    "name": "磚塊",
	    "costTime": "20",
	    "costCash": "9",
	    "item": "礦產2",
	    "price": "190",
	    "costperminute": "6.83",
	    "cost_all": "80",
	    "itemDetail": {
	      "礦產": 2
	    }
	  },
	  {
	    "ID": "水泥",
	    "store": "建材店",
	    "level": "14",
	    "name": "水泥",
	    "costTime": "50",
	    "costCash": "17",
	    "item": "礦產2，化學物品1",
	    "price": "440",
	    "costperminute": "5.63",
	    "cost_all": "140",
	    "itemDetail": {
	      "礦產": 2,
	      "化學物品": 1
	    }
	  },
	  {
	    "ID": "膠水",
	    "store": "建材店",
	    "level": "15",
	    "name": "膠水",
	    "costTime": "60",
	    "costCash": "20",
	    "item": "塑膠1，化學物品2",
	    "price": "440",
	    "costperminute": "3.56",
	    "cost_all": "145",
	    "itemDetail": {
	      "塑膠": 1,
	      "化學物品": 2
	    }
	  },
	  {
	    "ID": "鎚子",
	    "store": "五金行",
	    "level": "4",
	    "name": "鎚子",
	    "costTime": "14",
	    "costCash": "7",
	    "item": "金屬1，木材1",
	    "price": "90",
	    "costperminute": "-10.24",
	    "cost_all": "30",
	    "itemDetail": {
	      "金屬": 1,
	      "木材": 1
	    }
	  },
	  {
	    "ID": "量尺",
	    "store": "五金行",
	    "level": "6",
	    "name": "量尺",
	    "costTime": "20",
	    "costCash": "9",
	    "item": "金屬1，塑膠1",
	    "price": "120",
	    "costperminute": "-6.78",
	    "cost_all": "35",
	    "itemDetail": {
	      "金屬": 1,
	      "塑膠": 1
	    }
	  },
	  {
	    "ID": "鏟子",
	    "store": "五金行",
	    "level": "9",
	    "name": "鏟子",
	    "costTime": "30",
	    "costCash": "12",
	    "item": "金屬1，塑膠1，木材1",
	    "price": "150",
	    "costperminute": "-14.44",
	    "cost_all": "55",
	    "itemDetail": {
	      "金屬": 1,
	      "塑膠": 1,
	      "木材": 1
	    }
	  },
	  {
	    "ID": "烹飪用具",
	    "store": "五金行",
	    "level": "17",
	    "name": "烹飪用具",
	    "costTime": "45",
	    "costCash": "16",
	    "item": "金屬2，塑膠2，木材2",
	    "price": "250",
	    "costperminute": "-33.33",
	    "cost_all": "65",
	    "itemDetail": {
	      "金屬": 2,
	      "塑膠": 2,
	      "木材": 2
	    }
	  },
	  {
	    "ID": "電鑽",
	    "store": "五金行",
	    "level": "30",
	    "name": "電鑽",
	    "costTime": "120",
	    "costCash": "28",
	    "item": "金屬2，塑膠2，電子元件1",
	    "price": "590",
	    "costperminute": "-21.02",
	    "cost_all": "230",
	    "itemDetail": {
	      "金屬": 2,
	      "塑膠": 2,
	      "電子元件": 1
	    }
	  },
	  {
	    "ID": "蔬菜",
	    "store": "菜市場",
	    "level": "8",
	    "name": "蔬菜",
	    "costTime": "20",
	    "costCash": "9",
	    "item": "種子2",
	    "price": "160",
	    "costperminute": "5",
	    "cost_all": "60",
	    "itemDetail": {
	      "種子": 2
	    }
	  },
	  {
	    "ID": "麵粉袋",
	    "store": "菜市場",
	    "level": "17",
	    "name": "麵粉袋",
	    "costTime": "30",
	    "costCash": "12",
	    "item": "種子2，布料2",
	    "price": "570",
	    "costperminute": "15",
	    "cost_all": "150",
	    "itemDetail": {
	      "種子": 2,
	      "布料": 2
	    }
	  },
	  {
	    "ID": "水果和莓果",
	    "store": "菜市場",
	    "level": "18",
	    "name": "水果和莓果",
	    "costTime": "90",
	    "costCash": "24",
	    "item": "種子2，樹苗1",
	    "price": "730",
	    "costperminute": "0.44",
	    "cost_all": "370",
	    "itemDetail": {
	      "種子": 2,
	      "樹苗": 1
	    }
	  },
	  {
	    "ID": "奶油",
	    "store": "菜市場",
	    "level": "23",
	    "name": "奶油",
	    "costTime": "75",
	    "costCash": "22",
	    "item": "動物飼料1",
	    "price": "440",
	    "costperminute": "5.48",
	    "cost_all": "140",
	    "itemDetail": {
	      "動物飼料": 1
	    }
	  },
	  {
	    "ID": "起司",
	    "store": "菜市場",
	    "level": "26",
	    "name": "起司",
	    "costTime": "105",
	    "costCash": "26",
	    "item": "動物飼料2",
	    "price": "660",
	    "costperminute": "5.51",
	    "cost_all": "280",
	    "itemDetail": {
	      "動物飼料": 2
	    }
	  },
	  {
	    "ID": "牛肉",
	    "store": "菜市場",
	    "level": "27",
	    "name": "牛肉",
	    "costTime": "150",
	    "costCash": "",
	    "item": "動物飼料3",
	    "price": "860",
	    "costperminute": "4.57",
	    "cost_all": "420",
	    "itemDetail": {
	      "動物飼料": 3
	    }
	  },
	  {
	    "ID": "椅子",
	    "store": "家具店",
	    "level": "10",
	    "name": "椅子",
	    "costTime": "20",
	    "costCash": "9",
	    "item": "木材2，釘子1，鎚子1",
	    "price": "300",
	    "costperminute": "-20.76",
	    "cost_all": "210",
	    "itemDetail": {
	      "木材": 2,
	      "釘子": 1,
	      "鎚子": 1
	    }
	  },
	  {
	    "ID": "桌子",
	    "store": "家具店",
	    "level": "16",
	    "name": "桌子",
	    "costTime": "30",
	    "costCash": "12",
	    "item": "釘子2，木板1，鎚子1",
	    "price": "500",
	    "costperminute": "-25.76",
	    "cost_all": "370",
	    "itemDetail": {
	      "釘子": 2,
	      "木板": 1,
	      "鎚子": 1
	    }
	  },
	  {
	    "ID": "居家布料",
	    "store": "家具店",
	    "level": "25",
	    "name": "居家布料",
	    "costTime": "75",
	    "costCash": "22",
	    "item": "布料2，量尺1",
	    "price": "610",
	    "costperminute": "1.13",
	    "cost_all": "300",
	    "itemDetail": {
	      "布料": 2,
	      "量尺": 1
	    }
	  },
	  {
	    "ID": "沙發",
	    "store": "家具店",
	    "level": "33",
	    "name": "沙發",
	    "costTime": "150",
	    "costCash": "32",
	    "item": "布料3，電鑽1，膠水1",
	    "price": "1810",
	    "costperminute": "-1.68",
	    "cost_all": "1300",
	    "itemDetail": {
	      "布料": 3,
	      "電鑽": 1,
	      "膠水": 1
	    }
	  },
	  {
	    "ID": "草",
	    "store": "園藝用品店",
	    "level": "14",
	    "name": "草",
	    "costTime": "30",
	    "costCash": "12",
	    "item": "種子1，鏟子1",
	    "price": "310",
	    "costperminute": "3.83",
	    "cost_all": "180",
	    "itemDetail": {
	      "種子": 1,
	      "鏟子": 1
	    }
	  },
	  {
	    "ID": "樹苗",
	    "store": "園藝用品店",
	    "level": "16",
	    "name": "樹苗",
	    "costTime": "90",
	    "costCash": "24",
	    "item": "種子2，鏟子1",
	    "price": "420",
	    "costperminute": "-3.33",
	    "cost_all": "210",
	    "itemDetail": {
	      "種子": 2,
	      "鏟子": 1
	    }
	  },
	  {
	    "ID": "戶外家具",
	    "store": "園藝用品店",
	    "level": "21",
	    "name": "戶外家具",
	    "costTime": "135",
	    "costCash": "30",
	    "item": "木板2，塑膠2，布料2",
	    "price": "820",
	    "costperminute": "-8.48",
	    "cost_all": "470",
	    "itemDetail": {
	      "木板": 2,
	      "塑膠": 2,
	      "布料": 2
	    }
	  },
	  {
	    "ID": "火槽",
	    "store": "園藝用品店",
	    "level": "28",
	    "name": "火槽",
	    "costTime": "240",
	    "costCash": "44",
	    "item": "磚塊2，鏟子1，水泥2",
	    "price": "1740",
	    "costperminute": "-34.35",
	    "cost_all": "1410",
	    "itemDetail": {
	      "磚塊": 2,
	      "鏟子": 1,
	      "水泥": 2
	    }
	  },
	  {
	    "ID": "花園地精",
	    "store": "園藝用品店",
	    "level": "34",
	    "name": "花園地精",
	    "costTime": "90",
	    "costCash": "",
	    "item": "水泥2，膠水1",
	    "price": "1600",
	    "costperminute": "-7.16",
	    "cost_all": "425",
	    "itemDetail": {
	      "水泥": 2,
	      "膠水": 1
	    }
	  },
	  {
	    "ID": "甜甜圈",
	    "store": "甜甜圈屋",
	    "level": "18",
	    "name": "甜甜圈",
	    "costTime": "45",
	    "costCash": "16",
	    "item": "麵粉袋1，糖和香料1",
	    "price": "950",
	    "costperminute": "1.65",
	    "cost_all": "680",
	    "itemDetail": {
	      "麵粉袋": 1,
	      "糖和香料": 1
	    }
	  },
	  {
	    "ID": "蔬果冰沙",
	    "store": "甜甜圈屋",
	    "level": "20",
	    "name": "蔬果冰沙",
	    "costTime": "30",
	    "costCash": "12",
	    "item": "蔬菜1，水果和莓果1",
	    "price": "1150",
	    "costperminute": "22.22",
	    "cost_all": "890",
	    "itemDetail": {
	      "蔬菜": 1,
	      "水果和莓果": 1
	    }
	  },
	  {
	    "ID": "圓麵包",
	    "store": "甜甜圈屋",
	    "level": "24",
	    "name": "圓麵包",
	    "costTime": "60",
	    "costCash": "20",
	    "item": "麵粉袋2，奶油1",
	    "price": "1840",
	    "costperminute": "-13.2",
	    "cost_all": "1870",
	    "itemDetail": {
	      "麵粉袋": 2,
	      "奶油": 1
	    }
	  },
	  {
	    "ID": "櫻桃起司蛋糕",
	    "store": "甜甜圈屋",
	    "level": "27",
	    "name": "櫻桃起司蛋糕",
	    "costTime": "90",
	    "costCash": "24",
	    "item": "麵粉袋1，水果和莓果1，起司1",
	    "price": "2240",
	    "costperminute": "-8.09",
	    "cost_all": "1960",
	    "itemDetail": {
	      "麵粉袋": 1,
	      "水果和莓果": 1,
	      "起司": 1
	    }
	  },
	  {
	    "ID": "優格冰淇淋",
	    "store": "甜甜圈屋",
	    "level": "28",
	    "name": "優格冰淇淋",
	    "costTime": "240",
	    "costCash": "44",
	    "item": "水果和莓果1，奶油1，糖和香料1",
	    "price": "1750",
	    "costperminute": "-7.14",
	    "cost_all": "1280",
	    "itemDetail": {
	      "水果和莓果": 1,
	      "奶油": 1,
	      "糖和香料": 1
	    }
	  },
	  {
	    "ID": "帽子",
	    "store": "服飾店",
	    "level": "19",
	    "name": "帽子",
	    "costTime": "60",
	    "costCash": "20",
	    "item": "布料2，量尺1",
	    "price": "600",
	    "costperminute": "3",
	    "cost_all": "300",
	    "itemDetail": {
	      "布料": 2,
	      "量尺": 1
	    }
	  },
	  {
	    "ID": "鞋子",
	    "store": "服飾店",
	    "level": "21",
	    "name": "鞋子",
	    "costTime": "75",
	    "costCash": "22",
	    "item": "布料2，塑膠1，膠水1",
	    "price": "980",
	    "costperminute": "-0.82",
	    "cost_all": "670",
	    "itemDetail": {
	      "布料": 2,
	      "塑膠": 1,
	      "膠水": 1
	    }
	  },
	  {
	    "ID": "手錶",
	    "store": "服飾店",
	    "level": "22",
	    "name": "手錶",
	    "costTime": "90",
	    "costCash": "24",
	    "item": "塑膠2，玻璃1，化學物品1",
	    "price": "580",
	    "costperminute": "-0.01",
	    "cost_all": "230",
	    "itemDetail": {
	      "塑膠": 2,
	      "玻璃": 1,
	      "化學物品": 1
	    }
	  },
	  {
	    "ID": "西裝",
	    "store": "服飾店",
	    "level": "32",
	    "name": "西裝",
	    "costTime": "210",
	    "costCash": "40",
	    "item": "布料3，量尺1，膠水1",
	    "price": "1170",
	    "costperminute": "-9.26",
	    "cost_all": "830",
	    "itemDetail": {
	      "布料": 3,
	      "量尺": 1,
	      "膠水": 1
	    }
	  },
	  {
	    "ID": "夾心冰餅",
	    "store": "速食餐廳",
	    "level": "25",
	    "name": "夾心冰餅",
	    "costTime": "14",
	    "costCash": "7",
	    "item": "圓麵包1，奶油1",
	    "price": "2560",
	    "costperminute": "146.32",
	    "cost_all": "2280",
	    "itemDetail": {
	      "圓麵包": 1,
	      "奶油": 1
	    }
	  },
	  {
	    "ID": "披薩",
	    "store": "速食餐廳",
	    "level": "28",
	    "name": "披薩",
	    "costTime": "24",
	    "costCash": "10",
	    "item": "麵粉袋1，起司1，牛肉1",
	    "price": "2560",
	    "costperminute": "76.07",
	    "cost_all": "2090",
	    "itemDetail": {
	      "麵粉袋": 1,
	      "起司": 1,
	      "牛肉": 1
	    }
	  },
	  {
	    "ID": "起司薯條",
	    "store": "速食餐廳",
	    "level": "33",
	    "name": "起司薯條",
	    "costTime": "20",
	    "costCash": "9",
	    "item": "蔬菜1，起司1",
	    "price": "1050",
	    "costperminute": "38.63",
	    "cost_all": "820",
	    "itemDetail": {
	      "蔬菜": 1,
	      "起司": 1
	    }
	  },
	  {
	    "ID": "瓶裝檸檬汁",
	    "store": "速食餐廳",
	    "level": "37",
	    "name": "瓶裝檸檬汁",
	    "costTime": "60",
	    "costCash": "20",
	    "item": "玻璃2，糖和香料2，水果和莓果1",
	    "price": "1690",
	    "costperminute": "18.34",
	    "cost_all": "1190",
	    "itemDetail": {
	      "玻璃": 2,
	      "糖和香料": 2,
	      "水果和莓果": 1
	    }
	  },
	  {
	    "ID": "冰箱",
	    "store": "家電用品店",
	    "level": "35",
	    "name": "冰箱",
	    "costTime": "210",
	    "costCash": "40",
	    "item": "塑膠2，化學物品2，電子元件2",
	    "price": "1060",
	    "costperminute": "-2.27",
	    "cost_all": "490",
	    "itemDetail": {
	      "塑膠": 2,
	      "化學物品": 2,
	      "電子元件": 2
	    }
	  },
	  {
	    "ID": "照明設備",
	    "store": "家電用品店",
	    "level": "36",
	    "name": "照明設備",
	    "costTime": "105",
	    "costCash": "26",
	    "item": "化學物品1，電子元件1，玻璃1",
	    "price": "890",
	    "costperminute": "7.2",
	    "cost_all": "340",
	    "itemDetail": {
	      "化學物品": 1,
	      "電子元件": 1,
	      "玻璃": 1
	    }
	  },
	  {
	    "ID": "電視機",
	    "store": "家電用品店",
	    "level": "38",
	    "name": "電視機",
	    "costTime": "150",
	    "costCash": "32",
	    "item": "塑膠2，玻璃2，電子元件2",
	    "price": "1280",
	    "costperminute": "1.42",
	    "cost_all": "610",
	    "itemDetail": {
	      "塑膠": 2,
	      "玻璃": 2,
	      "電子元件": 2
	    }
	  }
	];

	    // {
	    //     "ID": "漢堡",
	    //     "store": "速食餐廳",
	    //     "level": "31",
	    //     "name": "漢堡",
	    //     "costTime": "35",
	    //     "costCash": "13",
	    //     "item": "牛肉1，圓麵包1，烤肉架1",
	    //     "price": "3620",
	    //     "costperminute": "63.82",
	    //     "cost_all": "3230"
	    // },
	    // {
	    //     "ID": "烤肉架",
	    //     "store": "家電用品店",
	    //     "level": "29",
	    //     "name": "烤肉架",
	    //     "costTime": "165",
	    //     "costCash": "34",
	    //     "item": "金屬3，炒鍋1",
	    //     "price": "530",
	    //     "costperminute": "-32.34",
	    //     "cost_all": "280"
	    // },


	module.exports =  data;


/***/ }
/******/ ]);