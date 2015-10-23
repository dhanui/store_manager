var apotekControllers = angular.module("apotekControllers", []);

apotekControllers.controller("ProductListController", ["$scope", function($scope) {
	$scope.products = getObjects("products");
	
	$scope.orderProp = "id";
}]);

apotekControllers.controller("ProductNewController", ["$scope", "$location", function($scope, $location) {
	$scope.submit = function() {
		updateOrInsertObject("products", {
			id: getNewObjectId("products"),
			name: $scope.name,
			price: parseInt($scope.price),
			quantity: parseInt($scope.quantity)
		})
		
		$location.path("/products");
	};
}]);

apotekControllers.controller("CustomerListController", ["$scope", function($scope) {
	$scope.customers = getObjects("customers");
	
	$scope.orderProp = "id";
}]);

apotekControllers.controller("CustomerNewController", ["$scope", "$location", function($scope, $location) {
	$scope.submit = function() {
		updateOrInsertObject("customers", {
			id: getNewObjectId("customers"),
			name: $scope.name,
			address: $scope.address,
			phone_number: $scope.phone_number
		})
		
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
