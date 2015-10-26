function DB() {
	var JsonDB = require("node-json-db");
	var db = new JsonDB("data", false, false);
	
	var getObjectsPath = function (model) {
		return "/" + model
	}
	
	var getObjectPath = function (model, id) {
		return "/" + model + "[" + (id - 1) + "]"
	}
	
	var getNewObjectId = function (model) {
		try {
			var objects = db.getData(getObjectsPath(model));
			return objects.length + 1;
		} catch (error) {
			return 1;
		}
	}
	
	this.insertObject = function (model, data) {
		data.id = getNewObjectId(model);
		
		return updateObject(model, data);
	}
	
	this.updateObject = function (model, data) {
		db.push(getObjectPath(model, data.id), data);
		db.save();
		
		return data;
	}
	
	this.getObjects = function (model) {
		try {
			return db.getData(getObjectsPath(model));
		} catch (error) {
			return [];
		}
	}
	
	this.getObject = function (model, id) {
		try {
			return db.getData(getObjectPath(model, id));
		} catch (error) {
			return undefined;
		}
	}
}
