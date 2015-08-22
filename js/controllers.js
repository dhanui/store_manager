var apotekControllers = angular.module("apotekControllers", []);
var JsobDB = require("node-json-db");
var db = new JsobDB("data", false, false);

apotekControllers.controller("ProductListController", ["$scope", function($scope) {
	try {
		$scope.products = db.getData("/products");
	} catch(error) {
		$scope.products = [];
	}
	console.log($scope.products)
	
	$scope.orderProp = "id";
}]);

apotekControllers.controller("ProductNewController", ["$scope", "$location", function($scope, $location) {
	$scope.submit = function() {
		var new_id = 1;
		try {
			var products = db.getData("/products");
			
			if (products.length > 0) {
				new_id = products[products.length - 1].id + 1;
			}
		} catch(error) {
			new_id = 1;
		}
		
		db.push("/products[" + (new_id - 1) + "]", {
			id: parseInt(new_id),
			name: $scope.name,
			price: parseInt($scope.price),
			quantity: parseInt($scope.quantity)
		});
		db.save();
		
		$location.path("/products");
	};
}]);

apotekControllers.controller("CustomerListController", ["$scope", function($scope) {
	try {
		$scope.customers = db.getData("/customers");
	} catch(error) {
		$scope.customers = [];
	}
	console.log($scope.customers)
	
	$scope.orderProp = "id";
}]);

apotekControllers.controller("CustomerNewController", ["$scope", "$location", function($scope, $location) {
	$scope.submit = function() {
		var new_id = 1;
		try {
			var customers = db.getData("/customers");
			
			if (customers.length > 0) {
				new_id = customers[customers.length - 1].id + 1;
			}
		} catch(error) {
			new_id = 1;
		}
		
		db.push("/customers[" + (new_id - 1) + "]", {
			id: parseInt(new_id),
			name: $scope.name,
			address: $scope.address,
			phone_number: $scope.phone_number
		});
		db.save();
		
		$location.path("/customers");
	};
}]);
