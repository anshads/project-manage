sap.ui.controller("view.FinanceHome", {

	// Init Home view
	onInit : function() {
	},

	// Home Tile Press
	homeTilePress: function(evt) {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
			id: "Home"
		});
	}

	
});