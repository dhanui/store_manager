var angular = require("angular");
var angularRoute = require("angular-route");
var factories = require("./factories");
var controllers = require("./controllers");

var storeApp = angular.module("storeApp", [
	"ngRoute",
	"storeControllers",
	"storeFactories"
]);

storeApp.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "partials/welcome.html",
		controller: "WelcomeController"
	}).when("/products", {
		templateUrl: "partials/product-list.html",
		controller: "ProductListController"
	}).when("/products/new", {
		templateUrl: "partials/product-form.html",
		controller: "ProductNewController"
	}).when("/products/:product_id", {
		templateUrl: "partials/product-form.html",
		controller: "ProductEditController"
	}).when("/supplies/edit", {
		templateUrl: "partials/supply-form.html",
		controller: "SupplyEditController"
	}).when("/customers", {
		templateUrl: "partials/customer-list.html",
		controller: "CustomerListController"
	}).when("/customers/new", {
		templateUrl: "partials/customer-form.html",
		controller: "CustomerNewController"
	}).when("/customers/:customer_id", {
		templateUrl: "partials/customer-form.html",
		controller: "CustomerEditController"
	}).when("/credits/new", {
		templateUrl: "partials/credit-form.html",
		controller: "CreditNewController"
	}).when("/customers/:customer_id/credits", {
    templateUrl: "partials/customer-credit-list.html",
    controller: "CustomerCreditListController"
  }).when("/customers/:customer_id/credits/:credit_id", {
		templateUrl: "partials/customer-credit-detail.html",
		controller: "CustomerCreditDetailController"
	}).when("/settings", {
		templateUrl: "partials/setting-form.html",
		controller: "SettingEditController"
	}).otherwise({
		redirectTo: "/products"
	});
}]);
