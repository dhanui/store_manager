var JsonDB = require("node-json-db");
var db = new JsonDB("data", false, false);

function getNewObjectId(model) {
	try {
		var objects = db.getData("/" + model);
		return objects.length + 1;
	} catch (error) {
		return 1;
	}
}

function updateOrInsertObject(model, data) {
	db.push("/" + model + "[" + (data.id - 1) + "]", data);
	db.save();
}

function getObjects(model) {
	try {
		return db.getData("/" + model);
	} catch (error) {
		return [];
	}
}

function getObject(model, id) {
	try {
		return db.getData("/" + model + "[" + (id - 1) + "]");
	} catch (error) {
		return undefined;
	}
}
