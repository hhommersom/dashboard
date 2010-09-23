(function( $, undefined ) {

$.widget( "ui.dashboardmaster", {

	options: {
		projects: []
	},

	_create: function() {
		this.element
			.addClass( "ui-dashboard-master ui-widget" );

		this._initDraw();
		this._initHeartBeat();
	},

	destroy: function() {
		this.element
			.removeClass( "ui-dashboard-master ui-widget" );

		$.Widget.prototype.destroy.apply( this, arguments );
	},

	_setOption: function( key, value ) {
		if ( key === "projects" ) {
			this.options.projects = value;
		}

		$.Widget.prototype._setOption.apply( this, arguments );
	},

	_initDraw: function() {
		var self = this;
		this.element.empty();
		$("<h3/>").append("&nbsp;").appendTo(this.element);
		$.each(this.options.projects, function(index, value) {
			if (index < 4)
				$("<div class='row'/>").append(value).appendTo(self.element);
		});
	},

	_initHeartBeat: function() {
		if (!$(document).data("dashboard-heartbeat")) {
			$(document)
				.data("dashboard-heartbeat", true)
				.data("dashboard-heartbeat-enabled", true)
				.data("dashboard-project-index", this.options.length-1)
				.everyTime("5s", "heartbeat", this._heartBeatRotate)
				.everyTime("10s", "heartbeat", this._heartBeatProjects);
		}
	},

	_heartBeatRotate: function() {
		$(document).triggerHandler("dashboard-heartbeat-rotate");
	},

	_heartBeatProjects: function() {
		$(document).triggerHandler("dashboard-heartbeat-projects");
	}
});

$.extend( $.ui.dashboardmaster, {
	version: "1.8.4"
});

})( jQuery );
