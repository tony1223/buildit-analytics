var React = require('react');
var cx = require("classnames");

var materialDatas = require("./material");
var MaterialTable = require("./MaterialTable.jsx");
var storeDatas = require("./store_items");

React.render((
	<div className="container">
	    <MaterialTable storeItems={storeDatas} materials={materialDatas} />
 	</div>
),document.getElementById("react-root"));
