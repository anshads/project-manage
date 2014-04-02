jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("view.LrBCard", {

	onInit : function() {
		this.getView().addEventDelegate({
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onBeforeShow : jQuery.proxy(function(evt) {
				this.onBeforeShow(evt);
			}, this)
		});
	},
	
	onBeforeShow : function(evt) {
		if (evt.data.context) {
			this.getView().setBindingContext(evt.data.context, "lr");
		} 
	}, 
	
	back : function(evt) {
		sap.ui.getCore().getEventBus().publish("nav", "back", {});
	},
	
	sendMessage : function(evt) {
		sap.m.MessageToast.show('Message Send');
	},
	
	addToContacts : function(evt) {
		sap.m.MessageToast.show('Added to Contacts');
	}
});


-----------------------------------------------------
Add Customer 		--> id, customer_id, name, address, contact_person_one, contact_person_two, email, phone, 					  mobile, website, status
Issue Proposal 		--> 
Issue Invoice 		--> 
Accept Payment      -->
Add Project 		--> id, title, customer_id, start_date, expected_testing_date, expected_delivery_date, 						lead_id, status
Add Department 		--> id, department_name
Add Designation 	--> id, designation_name
Add Role 			--> id, role_name
Add Employee 		--> id, emp_id, name, address, email, mobile, department, designation, work_location, 						join_date, status 
Relieve Employee    --> id, employee_id, releiving_date, reason, last_working_day
Assign Project 		--> id, project_id, developer_id, role, start_date
Assign Task 		--> id, task_id, title, description, link, project_id, attachment,employee_id, start_date, 					   deadline_date, closed_date, status
Process Task 		--> 
Bug Priority        --> id, priority_name, type
Issue Bug 			--> id, priority, title, description, attachment, to, cc, task_id, status, reported_date, 					  reported_by, closed_by
Fix Bug 			--> 
Deliver Project 	--> 
Close Invoice 		--> 
Close Payment       -->
Time Tracker 		--> id, employee_id, task_id, date, start_time, end_time, description
-----------------------------------------------------
Customers, Employees, Projects, Proposals, Invoices, Payments, Tasks, Issues, Log

HR 
	- Employees 
	- Customers 
	- Time Tracker

Finance
	- Payments 
	- Receipts
	- Account
	- Proposals
	- Invoices

Services
    - Projects 
    - Tasks 
    - Issues 
