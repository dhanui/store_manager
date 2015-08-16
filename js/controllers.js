var apotekControllers = angular.module("apotekControllers", []);
var JsobDB = require("node-json-db");
var db = new JsobDB("data", false, false);

apotekControllers.controller("ProductListController", function($scope) {
	$scope.products = db.getData("/products");
	
	$scope.orderProp = "id";
});
