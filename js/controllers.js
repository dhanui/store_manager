var apotekApp = angular.module("apotekApp", []);
var JsobDB = require("node-json-db");
var db = new JsobDB("data", false, false);

apotekApp.controller("ProductListController", function($scope) {
	$scope.products = db.getData("/products");
	
	$scope.orderProp = "id";
});
