jQuery.sap.declare("Application");
jQuery.sap.require("sap.ui.app.Application");

sap.ui.app.Application.extend("Application", {

	init : function() {
		
		// set global models
		var imgModel = new sap.ui.model.json.JSONModel("model/img.json");
		var lrModel = new sap.ui.model.json.JSONModel("model/leaveRequest.json");
		var poModel = new sap.ui.model.json.JSONModel("model/purchaseOrder.json");
		var numberModel = new sap.ui.model.json.JSONModel("model/number.json");
		var analyticsModel = new sap.ui.model.json.JSONModel("model/analytics.json");

		//For internationlization purpose
		var oMyResourceModel = new sap.ui.model.resource.ResourceModel({ bundleUrl: "i18n/i18n.properties", bundleLocale: "en_US" });
		sap.ui.getCore().setModel(oMyResourceModel, "i18n");

		sap.ui.getCore().setModel(analyticsModel, "anl");
		sap.ui.getCore().setModel(imgModel, "img");
		sap.ui.getCore().setModel(lrModel, "lr");
		sap.ui.getCore().setModel(poModel, "po");
		sap.ui.getCore().setModel(numberModel, "number");
	},

	main : function() {
		
		// create app view and put to html root element
		var root = this.getRoot();
		sap.ui.jsview("app", "view.App").placeAt(root);
	}
});