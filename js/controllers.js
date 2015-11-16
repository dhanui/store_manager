var storeControllers = angular.module("storeControllers", []);

storeControllers.controller("ProductListController", ["$scope", "productFactory", function ($scope, productFactory) {
	$scope.products = productFactory.getAllProducts();

	$scope.predicate = "id";
	$scope.order = function (predicate) {
		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.predicate = predicate;
	};
}]);

storeControllers.controller("ProductNewController", ["$scope", "$location", "productFactory", function ($scope, $location, productFactory) {
	$scope.product = {};

	$scope.submit = function (product) {
		productFactory.createProduct(product);

		$location.path("/products");
	};
}]);

storeControllers.controller("ProductEditController", ["$scope", "$routeParams", "$location", "productFactory", function ($scope, $routeParams, $location, productFactory) {
	$scope.product = productFactory.getProduct($routeParams.product_id);

	$scope.submit = function (product) {
		productFactory.updateProduct(product);

		$location.path("/products");
	};
}]);

storeControllers.controller("CustomerListController", ["$scope", "customerFactory", function ($scope, customerFactory) {
	$scope.customers = customerFactory.getAllCustomers();

	$scope.predicate = "id";
	$scope.order = function (predicate) {
		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.predicate = predicate;
	};
}]);

storeControllers.controller("CustomerNewController", ["$scope", "$location", "customerFactory", function ($scope, $location, customerFactory) {
	$scope.customer = {};

	$scope.submit = function (customer) {
		customerFactory.createCustomer(customer);

		$location.path("/customers");
	};
}]);

storeControllers.controller("CustomerEditController", ["$scope", "$routeParams", "$location", "customerFactory", function ($scope, $routeParams, $location, customerFactory) {
	$scope.customer = customerFactory.getCustomer($routeParams.customer_id);

	$scope.submit = function (customer) {
		customerFactory.updateCustomer(customer);

		$location.path("/customers");
	};
}]);

storeControllers.controller("CreditNewController", ["$scope", "$location", "productFactory", "customerFactory", "creditFactory", function ($scope, $location, productFactory, customerFactory, creditFactory) {
	$scope.credit = {
		products: [{quantity: 1}],
		total_price: 0,
		purchase_date: Date.now(),
	};

	$scope.customers = customerFactory.getAllCustomers();
	$scope.products = productFactory.getAllProducts();

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
		creditFactory.createCredit(credit);

		$location.path("/customers/" + credit.customer_id + "/credits/" + credit.id);
	};
}]);

storeControllers.controller("CustomerCreditListController", ["$scope", "$routeParams", "creditFactory", function ($scope, $routeParams, creditFactory) {
  $scope.customer_credits = creditFactory.getAllCustomerCredits($routeParams.customer_id);

  $scope.predicate = "id";
  $scope.order = function (predicate) {
		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.predicate = predicate;
	};
}]);

storeControllers.controller("CustomerCreditDetailController", ["$scope", "$routeParams", "customerFactory", "creditFactory", function ($scope, $routeParams, customerFactory, creditFactory) {
	$scope.customer = customerFactory.getCustomer($routeParams.customer_id);
	$scope.credit = creditFactory.getCredit($routeParams.credit_id);

	$scope.toggle_payment = function (credit) {
		creditFactory.updateCredit(credit);
	};
}]);

storeControllers.controller("SupplyEditController", ["$scope", "$location", "productFactory", function ($scope, $location, productFactory) {
	$scope.items = [{quantity: 0}];
	$scope.products = productFactory.getAllProducts();

	$scope.add_product = function (items) {
		items.push({quantity: 0});
	};

	$scope.submit = function (items) {
		productFactory.updateProductQuantities(items);

		$location.path("/products");
	};
}]);
