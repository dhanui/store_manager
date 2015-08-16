var apotekApp = angular.module("apotekApp", []);

apotekApp.controller("ProductListController", function($scope) {
	$scope.products = [
		{
			"id": 1,
			"name": "Obat batuk",
			"price": 10000,
			"quantity": 50
		},
		{
			"id": 2,
			"name": "Obat pilek",
			"price": 9000,
			"quantity": 75
		}
	];
	
	$scope.orderProp = "id";
});
