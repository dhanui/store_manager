var apotekControllers = angular.module("apotekControllers", []);
var db = new DB();

apotekControllers.controller("ProductListController", ["$scope", function($scope) {
	$scope.products = db.getObjects("products");

	$scope.predicate = "id";
	$scope.order = function (predicate) {
		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.predicate = predicate;
	};
}]);

apotekControllers.controller("ProductNewController", ["$scope", "$location", function($scope, $location) {
	$scope.product = {};

	$scope.submit = function (product) {
		db.insertAndSaveObject("products", product);

		$location.path("/products");
	};
}]);

apotekControllers.controller("CustomerListController", ["$scope", function($scope) {
	$scope.customers = db.getObjects("customers");

	$scope.predicate = "id";
	$scope.order = function (predicate) {
		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.predicate = predicate;
	};
}]);

apotekControllers.controller("CustomerNewController", ["$scope", "$location", function($scope, $location) {
	$scope.customer = {};

	$scope.submit = function (customer) {
		db.insertAndSaveObject("customers", customer);

		$location.path("/customers");
	};
}]);

apotekControllers.controller("CreditNewController", ["$scope", "$location", function($scope, $location) {
	$scope.credit = {
		products: [],
		total_price: 0,
		purchase_date: Date.now(),
	};

	$scope.customers = db.getObjects("customers");
	$scope.products = db.getObjects("products");

	$scope.add_product = function (credit) {
		credit.products.push({quantity: 1});
	};

	$scope.update_product = function (item) {
		var product = $scope.products.filter(function (element, index, array) {
			return element.id === parseInt(item.id);
		})[0];

		item.name = product.name;
		item.price = product.price;
	};

	$scope.submit = function (credit) {
		for (var i = 0; i < credit.products.length; i++) {
			var product = $scope.products.filter(function (element, index, array) {
				return element.id === parseInt(credit.products[i].id);
			})[0];
			product.quantity -= credit.products[i].quantity;
			db.updateObject("products", product);

      credit.total_price += credit.products[i].price * credit.products[i].quantity;
		}

    db.insertObject("credits", credit);
		db.saveObjects();

		$location.path("/products");
	};
}]);

apotekControllers.controller("CustomerCreditListController", ["$scope", "$routeParams", function($scope, $routeParams) {
  var all_credits = db.getObjects("credits");
  $scope.customer_credits = all_credits.filter(function (element, index, array) {
    return element.customer_id == parseInt($routeParams.customer_id);
  });

  $scope.predicate = "id";
  $scope.order = function (predicate) {
		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.predicate = predicate;
	};
}]);

apotekControllers.controller("CustomerCreditDetailController", ["$scope", "$routeParams", function($scope, $routeParams) {
	$scope.customer = db.getObject("customers", parseInt($routeParams.customer_id));
	$scope.credit = db.getObject("credits", parseInt($routeParams.credit_id));

	$scope.toggle_payment = function () {
		db.updateObject("credits", $scope.credit);
	};
}]);
