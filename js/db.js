var JsonDB = require("node-json-db");

function DB() {
	var db = new JsonDB("data", false, false);

	var getObjectsPath = function (model) {
		return "/" + model;
	};

	var getObjectPath = function (model, id) {
		return "/" + model + "[" + (id - 1) + "]";
	};

	var getNewObjectId = function (model) {
		try {
			var objects = db.getData(getObjectsPath(model));
			return objects.length + 1;
		} catch (error) {
			return 1;
		}
	};

	this.insertObject = function (model, data) {
		data.id = getNewObjectId(model);

		return this.updateObject(model, data);
	};

	this.insertAndSaveObject = function (model, data) {
		this.insertObject(model, data);
		this.saveObjects();

		return data;
	}

	this.updateObject = function (model, data) {
    db.push(getObjectPath(model, data.id), data);

		return data;
	};

	this.updateAndSaveObject = function (model, data) {
		this.updateObject(model, data);
		this.saveObjects();

		return data;
	}

	this.saveObjects = function () {
		db.save();
	}

	this.getObjects = function (model) {
		try {
			var data = db.getData(getObjectsPath(model));
			// Remove "$$hashKey" attributes to prevent ngRepeat dupes error
			for (var i = 0; i < data.length; i++) {
				delete data[i].$$hashKey;
			}

			return data;
		} catch (error) {
			return [];
		}
	};

	this.getObject = function (model, id) {
		try {
			return db.getData(getObjectPath(model, id));
		} catch (error) {
			return undefined;
		}
	};
}

module.exports = DB;
