var storeApp = angular.module("storeApp", [
	"ngRoute",
	"storeControllers"
]);

storeApp.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/products", {
		templateUrl: "partials/product-list.html",
		controller: "ProductListController"
	}).when("/products/new", {
		templateUrl: "partials/product-new.html",
		controller: "ProductNewController"
	}).when("/products/:product_id", {
		templateUrl: "partials/product-update.html",
		controller: "ProductUpdateController"
	}).when("/customers", {
		templateUrl: "partials/customer-list.html",
		controller: "CustomerListController"
	}).when("/customers/new", {
		templateUrl: "partials/customer-new.html",
		controller: "CustomerNewController"
	}).when("/customers/:customer_id", {
		templateUrl: "partials/customer-update.html",
		controller: "CustomerUpdateController"
	}).when("/credits/new", {
		templateUrl: "partials/credit-new.html",
		controller: "CreditNewController"
	}).when("/customers/:customer_id/credits", {
    templateUrl: "partials/customer-credit-list.html",
    controller: "CustomerCreditListController"
  }).when("/customers/:customer_id/credits/:credit_id", {
		templateUrl: "partials/customer-credit-detail.html",
		controller: "CustomerCreditDetailController"
	}).otherwise({
		redirectTo: "/products"
	});
}]);
