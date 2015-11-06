var apotekControllers = angular.module("apotekControllers", []);
var db = new DB();

apotekControllers.controller("ProductListController", ["$scope", function($scope) {
	$scope.products = db.getObjects("products");
	
	$scope.predicate = "id";
	$scope.order = function(predicate) {
		$scope.reverse = ($scope.predicate === predicate) ? ! $scope.reverse : false;
		$scope.predicate = predicate;
	};
}]);

apotekControllers.controller("ProductNewController", ["$scope", "$location", function($scope, $location) {
	$scope.submit = function() {
		db.insertObject("products", {
			name: $scope.name,
			price: parseInt($scope.price),
			quantity: parseInt($scope.quantity)
		});
		
		$location.path("/products");
	};
}]);

apotekControllers.controller("CustomerListController", ["$scope", function($scope) {
	$scope.customers = db.getObjects("customers");
	
	$scope.predicate = "id";
	$scope.order = function(predicate) {
		$scope.reverse = ($scope.predicate === predicate) ? ! $scope.reverse : false;
		$scope.predicate = predicate;
	};
}]);

apotekControllers.controller("CustomerNewController", ["$scope", "$location", function($scope, $location) {
	$scope.submit = function() {
		db.insertObject("customers", {
			name: $scope.name,
			address: $scope.address,
			phone_number: $scope.phone_number
		});
		
		$location.path("/customers");
	};
}]);

apotekControllers.controller("CreditNewController", ["$scope", "$location", function($scope, $location) {
	$scope.customers = db.getObjects("customers");
	$scope.products = db.getObjects("products");
	$scope.ids = [0];
	$scope.items = [];
	
	$scope.add_product = function() {
		$scope.ids.push($scope.ids[$scope.ids.length - 1] + 1);
	};
	
	$scope.submit = function() {
		var credit = {
            customer_id: $scope.customer_id,
            products: []
        };
		
		for (var i = 0; i < $scope.items.length; i++) {
			var product = db.getObject("products", $scope.items[i].product_id);
			product.quantity -= $scope.items[i].quantity;
			db.updateObject("products", product);
            
            credit.products.push({
                name: product.name,
                price: product.price,
                quantity: $scope.items[i].quantity
            });
		}
        
        db.insertObject("credits", credit);
		
		$location.path("/products");
	};
}]);
