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
	}).otherwise({
		redirectTo: "/products"
	});
}]);
