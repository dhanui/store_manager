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
	$scope.title = "New Product";
	$scope.product = {};

	$scope.submit = function (product) {
		productFactory.createProduct(product);

		$location.path("/products");
	};
}]);

storeControllers.controller("ProductEditController", ["$scope", "$routeParams", "$location", "productFactory", function ($scope, $routeParams, $location, productFactory) {
	$scope.title = "Update Product";
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
	$scope.title = "New Customer";
	$scope.customer = {};

	$scope.submit = function (customer) {
		customerFactory.createCustomer(customer);

		$location.path("/customers");
	};
}]);

storeControllers.controller("CustomerEditController", ["$scope", "$routeParams", "$location", "customerFactory", function ($scope, $routeParams, $location, customerFactory) {
	$scope.title = "Update Customer";
	$scope.customer = customerFactory.getCustomer($routeParams.customer_id);

	$scope.submit = function (customer) {
		customerFactory.updateCustomer(customer);

		$location.path("/customers");
	};
}]);

storeControllers.controller("CreditNewController", ["$scope", "$location", "productFactory", "customerFactory", "creditFactory", function ($scope, $location, productFactory, customerFactory, creditFactory) {
	$scope.credit = {
		products: [{}],
		total_price: 0,
		purchase_date: Date.now(),
	};

	$scope.customers = customerFactory.getAllCustomers();
	$scope.products = productFactory.getAllProducts();

	var update_total_price = function (credit) {
		credit.total_price = credit.products.reduce(function (previousValue, element, index, array) {
			return previousValue + element.price * element.quantity;
		}, 0) || 0;
	}

	$scope.add_product = function (credit) {
		credit.products.push({});
	};

	$scope.update_product = function (credit, item) {
		var product = $scope.products.filter(function (element, index, array) {
			return element.id == item.id;
		})[0];

		item.name = product.name;
		item.price = product.price;
		item.max = product.quantity;

		update_total_price(credit);
	};

	$scope.remove_product = function (credit, index) {
		credit.products.splice(index, 1);
		update_total_price(credit);
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
	$scope.items = [{}];
	$scope.products = productFactory.getAllProducts();

	$scope.add_product = function (items) {
		items.push({});
	};

	$scope.submit = function (items) {
		productFactory.updateProductQuantities(items);

		$location.path("/products");
	};
}]);
