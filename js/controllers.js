var angular = require("angular");
var factories = require("./factories");

var storeControllers = angular.module("storeControllers", []);

var compareNames = function (a, b) {
	if (a.name < b.name) {
		return -1;
	}
	if (a.name > b.name) {
		return 1;
	}
	return 0;
};

var order = function (scope, predicate) {
	scope.reverse = (scope.predicate === predicate) ? !scope.reverse : false;
	scope.predicate = predicate;
};

storeControllers.controller("WelcomeController", ["$rootScope", "$scope", "$location", "settingFactory", function ($rootScope, $scope, $location, settingFactory) {
	$rootScope.settings = settingFactory.getSettings() || {};

	if (Object.keys($rootScope.settings).length != 0) {
		$location.path("/products");
	}

	$scope.submit = function (settings) {
		settingFactory.saveSettings(settings);
		$rootScope.settings = settings;
		$location.path("/products");
	};
}]);

storeControllers.controller("SettingEditController", ["$rootScope", "$scope", "settingFactory", function ($rootScope, $scope, settingFactory) {
	$scope.submit = function (settings) {
		settingFactory.saveSettings(settings);
		$rootScope.settings = settings;
	};
}]);

storeControllers.controller("ProductListController", ["$scope", "productFactory", function ($scope, productFactory) {
	$scope.products = productFactory.getAllProducts();

	$scope.predicate = "id";
	$scope.order = function (predicate) {
		order($scope, predicate);
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
		order($scope, predicate);
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

	$scope.customers = customerFactory.getAllCustomers().sort(compareNames);
	$scope.products = productFactory.getAllProducts().filter(function (element, index, array) {
		return element.quantity > 0;
	}).sort(compareNames);

	$scope.update_total_price = function (credit) {
		credit.total_price = credit.products.reduce(function (previousValue, element, index, array) {
			return previousValue + (element.price * element.quantity || 0);
		}, 0);
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

		$scope.update_total_price(credit);
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
		order($scope, predicate);
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
	$scope.products = productFactory.getAllProducts().sort(compareNames);

	$scope.add_product = function (items) {
		items.push({});
	};

	$scope.remove_product = function (items, index) {
		items.splice(index, 1);
	};

	$scope.update_product = function (item) {
		var product = $scope.products.filter(function (element, index, array) {
			return element.id == item.id;
		})[0];

		item.max = product.quantity;
	};

	$scope.submit = function (items) {
		productFactory.updateProductQuantities(items);

		$location.path("/products");
	};
}]);
