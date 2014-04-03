sap.ui.controller("view.Home", {

	// Init Home
	onInit : function() {
	},

	// HR tile Press
	hrTilePress: function(evt) {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
			id : "HrHome"
		});
	},

	// Services tile Press
	operationsTilePress: function(evt) {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
			id : "OperationsHome"
		});
	},

	// Finance Tile Press
	financeTilePress: function(evt) {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
			id : "FinanceHome"
		});
	}
});