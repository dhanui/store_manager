var apotekApp = angular.module("apotekApp", [
	"ngRoute",
	"apotekControllers"
]);

apotekApp.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/products", {
		templateUrl: "partials/product-list.html",
		controller: "ProductListController"
	}).when("/products/new", {
		templateUrl: "partials/product-new.html",
		controller: "ProductNewController"
	}).when("/customers", {
		templateUrl: "partials/customer-list.html",
		controller: "CustomerListController"
	}).when("/customers/new", {
		templateUrl: "partials/customer-new.html",
		controller: "CustomerNewController"
	}).when("/credits/new", {
		templateUrl: "partials/credit-new.html",
		controller: "CreditNewController"
	}).when("/customers/:customer_id/credits", {
        templateUrl: "partials/customer-credit-list.html",
        controller: "CustomerCreditListController"
    }).otherwise({
		redirectTo: "/products"
	});
}]);
