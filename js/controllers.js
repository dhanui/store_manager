var apotekControllers = angular.module("apotekControllers", []);
var db = new DB();

apotekControllers.controller("ProductListController", ["$scope", function($scope) {
	$scope.products = db.getObjects("products");

	$scope.predicate = "id";
	$scope.order = function (predicate) {
		$scope.reverse = ($scope.predicate === predicate) ? ! $scope.reverse : false;
		$scope.predicate = predicate;
	};
}]);

apotekControllers.controller("ProductNewController", ["$scope", "$location", function($scope, $location) {
	$scope.submit = function () {
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
	$scope.order = function (predicate) {
		$scope.reverse = ($scope.predicate === predicate) ? ! $scope.reverse : false;
		$scope.predicate = predicate;
	};
}]);

apotekControllers.controller("CustomerNewController", ["$scope", "$location", function($scope, $location) {
	$scope.submit = function () {
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

	$scope.add_product = function () {
		$scope.ids.push($scope.ids[$scope.ids.length - 1] + 1);
	};

	$scope.submit = function () {
		var credit = {
            customer_id: parseInt($scope.customer_id),
            products: [],
            total_price: 0,
            purchase_date: Date.now(),
            paid: $scope.paid
        };

		for (var i = 0; i < $scope.items.length; i++) {
			var product = db.getObject("products", $scope.items[i].product_id);
			product.quantity -= $scope.items[i].quantity;
			db.updateObject("products", product);

            credit.products.push({
								id: product.id,
                name: product.name,
                price: product.price,
                quantity: $scope.items[i].quantity
            });
            credit.total_price += product.price * $scope.items[i].quantity;
		}

        db.insertObject("credits", credit);

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
		$scope.reverse = ($scope.predicate === predicate) ? ! $scope.reverse : false;
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
