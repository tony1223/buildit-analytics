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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var cx = __webpack_require__(3);
	var util = __webpack_require__(4);

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
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(5);

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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(6)


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(7);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var asap = __webpack_require__(8);

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
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Promise = __webpack_require__(7);

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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Promise = __webpack_require__(7);

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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//This file contains the ES6 extensions to the core Promises/A+ API

	var Promise = __webpack_require__(7);
	var asap = __webpack_require__(8);

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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// This file contains then/promise specific extensions that are only useful
	// for node.js interop

	var Promise = __webpack_require__(7);
	var asap = __webpack_require__(13);

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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	// rawAsap provides everything we need except exception management.
	var rawAsap = __webpack_require__(8);
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


/***/ }
/******/ ]);