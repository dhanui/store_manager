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
	}).when("/credit/new", {
		templateUrl: "partials/credit-new.html",
		controller: "CreditNewController"
	}).otherwise({
		redirectTo: "/products"
	});
}]);
