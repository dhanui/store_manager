var apotekControllers = angular.module("apotekControllers", []);
var JsobDB = require("node-json-db");
var db = new JsobDB("data", false, false);

apotekControllers.controller("ProductListController", ["$scope", function($scope) {
	$scope.products = getProducts();
	
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
			id: new_id,
			name: $scope.name,
			price: parseInt($scope.price),
			quantity: parseInt($scope.quantity)
		});
		db.save();
		
		$location.path("/products");
	};
}]);

apotekControllers.controller("CustomerListController", ["$scope", function($scope) {
	$scope.customers = getCustomers();
	
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
			id: new_id,
			name: $scope.name,
			address: $scope.address,
			phone_number: $scope.phone_number
		});
		db.save();
		
		$location.path("/customers");
	};
}]);

apotekControllers.controller("CreditNewController", ["$scope", "$location", function($scope, $location) {
	$scope.customers = getObjects("customers");
	$scope.products = getObjects("products");
	$scope.item = []
	
	$scope.submit = function() {
		var credit_id = getNewObjectId("credits");
		insertObject("credits", {
			id: credit_id,
			customer_id: $scope.customer_id
		});
		
		for (var i = 0; i < $scope.item.length; i++) {
			insertObject("credit_items", {
				id: getNewObjectId("credit_items"),
				credit_id: credit_id,
				product_id: $scope.item[i].product_id,
				quantity: $scope.item[0].quantity
			});
		}
		
		$location.path("/products");
	}
}]);

function getNewObjectId(model) {
	try {
		var objects = db.getData("/" + model);
		return objects.length + 1
	} catch (error) {
		return 1
	}
}

function insertObject(model, data) {
	db.push("/" + model + "[" + (data.id - 1) + "]", data);
	db.save();
}

function getObjects(model) {
	try {
		return db.getData("/" + model)
	} catch (error) {
		return []
	}
}

function getProducts() {
	try {
		return db.getData("/products");
	} catch(error) {
		return [];
	}
}

function getCustomers() {
	try {
		return db.getData("/customers");
	} catch(error) {
		return [];
	}
}
