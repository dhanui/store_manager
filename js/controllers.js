var storeControllers = angular.module("storeControllers", []);
var db = new DB();

storeControllers.controller("ProductListController", ["$scope", function ($scope) {
	$scope.products = db.getObjects("products");

	$scope.predicate = "id";
	$scope.order = function (predicate) {
		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.predicate = predicate;
	};
}]);

storeControllers.controller("ProductNewController", ["$scope", "$location", function ($scope, $location) {
	$scope.product = {};

	$scope.submit = function (product) {
		db.insertAndSaveObject("products", product);

		$location.path("/products");
	};
}]);

storeControllers.controller("ProductEditController", ["$scope", "$routeParams", "$location", function ($scope, $routeParams, $location) {
	$scope.product = db.getObject("products", parseInt($routeParams.product_id));

	$scope.submit = function (product) {
		db.updateAndSaveObject("products", product);

		$location.path("/products");
	};
}]);

storeControllers.controller("CustomerListController", ["$scope", function ($scope) {
	$scope.customers = db.getObjects("customers");

	$scope.predicate = "id";
	$scope.order = function (predicate) {
		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.predicate = predicate;
	};
}]);

storeControllers.controller("CustomerNewController", ["$scope", "$location", function ($scope, $location) {
	$scope.customer = {};

	$scope.submit = function (customer) {
		db.insertAndSaveObject("customers", customer);

		$location.path("/customers");
	};
}]);

storeControllers.controller("CustomerEditController", ["$scope", "$routeParams", "$location", function ($scope, $routeParams, $location) {
	$scope.customer = db.getObject("customers", parseInt($routeParams.customer_id));

	$scope.submit = function (customer) {
		db.updateAndSaveObject("customers", customer);

		$location.path("/customers");
	};
}]);

storeControllers.controller("CreditNewController", ["$scope", "$location", function ($scope, $location) {
	$scope.credit = {
		products: [{quantity: 1}],
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

		$location.path("/customers/" + credit.customer_id + "/credits/" + credit.id);
	};
}]);

storeControllers.controller("CustomerCreditListController", ["$scope", "$routeParams", function ($scope, $routeParams) {
  var credits = db.getObjects("credits");
  $scope.customer_credits = credits.filter(function (element, index, array) {
    return element.customer_id == parseInt($routeParams.customer_id);
  });

  $scope.predicate = "id";
  $scope.order = function (predicate) {
		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.predicate = predicate;
	};
}]);

storeControllers.controller("CustomerCreditDetailController", ["$scope", "$routeParams", function ($scope, $routeParams) {
	$scope.customer = db.getObject("customers", parseInt($routeParams.customer_id));
	$scope.credit = db.getObject("credits", parseInt($routeParams.credit_id));

	$scope.toggle_payment = function (credit) {
		db.updateObject("credits", credit);
	};
}]);

storeControllers.controller("SupplyEditController", ["$scope", "$location", function ($scope, $location) {
	$scope.items = [{quantity: 0}];
	$scope.products = db.getObjects("products");

	$scope.add_product = function (items) {
		items.push({quantity: 0});
	};

	$scope.submit = function (items) {
		for (var i = 0; i < items.length; i++) {
			var product = $scope.products.filter(function (element, index, array) {
				return element.id === parseInt(items[i].id);
			})[0];

			product.quantity += items[i].quantity;
			db.updateObject("products", product);
		}

		db.saveObjects();

		$location.path("/products");
	};
}]);
