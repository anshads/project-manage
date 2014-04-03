sap.ui.controller("view.OperationsHome", {

	// Init Home view
	onInit : function() {
	},

	// Home Tile Press
	homeTilePress: function(evt) {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
			id: "Home"
		});
	},

	// Employees Tile Press
	employeeTilePress: function(evt) {

	},

	// Leave Request Tile Press
	lrRequestTilePress: function(evt) {
		var bus = sap.ui.getCore().getEventBus();
		var data;
		bus.publish("nav", "to", { 
			id : "SplitAppLr"
		});
	},

	// Customer Tile Press
	customerTilePress: function(evt) {

	},

	// Time Tracker Tile Press
	trTilePress: function(evt) {

	}
	
});