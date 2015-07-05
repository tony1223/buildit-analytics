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

	module.exports = __webpack_require__(16);


/***/ },

/***/ 16:
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

/******/ });