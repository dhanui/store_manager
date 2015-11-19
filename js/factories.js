var angular = require("angular");
var DB = require("./db");

var storeFactories = angular.module("storeFactories", []);
var db = new DB();

storeFactories.factory("settingFactory", [function () {
  return {
    getSettings: function () {
      return db.getObject("settings", 1);
    },
    saveSettings: function (settings) {
      if (this.getSettings() == undefined) {
        return db.insertAndSaveObject("settings", settings);
      } else {
        return db.updateAndSaveObject("settings", settings);
      }
    }
  }
}]);

storeFactories.factory("productFactory", [function () {
  return {
    getAllProducts: function () {
      return db.getObjects("products");
    },
    createProduct: function (product) {
      return db.insertAndSaveObject("products", product);
    },
    getProduct: function (productId) {
      return db.getObject("products", parseInt(productId));
    },
    updateProduct: function (product) {
      return db.updateAndSaveObject("products", product);
    },
    updateProductQuantities: function (items) {
      var products = this.getAllProducts();
      for (var i = 0; i < items.length; i++) {
  			var product = products.filter(function (element, index, array) {
  				return element.id == items[i].id;
  			})[0];

  			product.quantity += items[i].quantity;
  			db.updateObject("products", product);
  		}

  		db.saveObjects();
    }
  };
}]);

storeFactories.factory("customerFactory", [function () {
  return {
    getAllCustomers: function () {
      return db.getObjects("customers");
    },
    createCustomer: function (customer) {
      return db.insertAndSaveObject("customers", customer);
    },
    getCustomer: function (customerId) {
      return db.getObject("customers", parseInt(customerId));
    },
    updateCustomer: function (customer) {
      return db.updateAndSaveObject("customers", customer);
    }
  }
}]);

storeFactories.factory("creditFactory", ["productFactory", function (productFactory) {
  return {
    createCredit: function (credit) {
      // Update products' quantities
      var products = productFactory.getAllProducts();

      for (var i = 0; i < credit.products.length; i++) {
  			var product = products.filter(function (element, index, array) {
          return element.id == credit.products[i].id;
        })[0];
  			product.quantity -= credit.products[i].quantity;
  			db.updateObject("products", product);
  		}

      db.insertObject("credits", credit);
  		return db.saveObjects();
    },
    getAllCustomerCredits: function (customerId) {
      return db.getObjects("credits").filter(function (element, index, array) {
        return element.customer_id == customerId;
      });
    },
    getCredit: function (creditId) {
      return db.getObject("credits", parseInt(creditId));
    },
    updateCredit: function (credit) {
      return db.updateAndSaveObject("credits", credit);
    }
  }
}]);
