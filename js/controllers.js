var apotekControllers = angular.module("apotekControllers", []);
var JsobDB = require("node-json-db");
var db = new JsobDB("data", false, false);

apotekControllers.controller("ProductListController", ["$scope", function($scope) {
	$scope.products = getObjects("products");
	
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
	$scope.customers = getObjects("customers");
	
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
	$scope.ids = [0]
	$scope.items = []
	
	$scope.add_product = function() {
		$scope.ids.push($scope.ids[$scope.ids.length - 1] + 1);
	}
	
	$scope.submit = function() {
		var credit_id = getNewObjectId("credits");
		updateOrInsertObject("credits", {
			id: credit_id,
			customer_id: $scope.customer_id
		});
		
		for (var i = 0; i < $scope.items.length; i++) {
			var product = getObject("products", $scope.items[i].product_id);
			product.quantity -= $scope.items[i].quantity;
			updateOrInsertObject("products", product);
			
			updateOrInsertObject("credit_items", {
				id: getNewObjectId("credit_items"),
				credit_id: credit_id,
				product_id: $scope.items[i].product_id,
				quantity: $scope.items[i].quantity
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

function updateOrInsertObject(model, data) {
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

function getObject(model, id) {
	try {
		return db.getData("/" + model + "[" + (id - 1) + "]");
	} catch (error) {
		return undefined;
	}
}
