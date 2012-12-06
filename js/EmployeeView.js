var EmployeeView = function(employee){

	this.initialize = function(){
		this.el = $('<div/>');
		this.el.on('click', '.add-location-btn', this.addLocation);
	};

	this.render = function(){
		this.el.html(EmployeeView.template(employee));
		return this;
	};

	this.addLocation = function(event) {
		event.preventDefault();
		console.log('addLocation');
		navigator.geolocation.getCurrentPosition(
			function(position) {
				$('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
			},
			function() {
				if(navigator.notification){
					navigator.notification.alert('Error getting location', null, 'Info', 'OK');
					console.log('Using navigator.notification alert function');
				}else{
					alert("Info: Error getting location");
					console.log('Using the default browser alert function');
				}
			},
			{ enableHighAccuracy: true });
		return false;
	};	

	this.initialize();
}

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());