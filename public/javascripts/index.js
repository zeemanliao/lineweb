/*
$(document).ready(function($) {
	init();
		*/
    
  //}(document));
$(document).ready(function($) {
var Events = {
	event : {},
on : function(eventName, fn) {
	if (!(eventName in this.event)) {
		this.event[eventName] = [];
	}
	this.event[eventName].push(fn);

},
emit : function(eventName, data) {
	if (!(eventName in this.event)) {
		console.log('eventName:%s not defined', eventName);
	} else {
		this.event[eventName].forEach(
			function (fun, idx, array) {
				fun(data);
			});

		}
	}
}

var IDList = {
	signFrame:"login-frame",
	userFrame:"user-frame",
	userName:"user-name",
	userPhoto:"user-photo"
};

var UIObject = function(id) {
	this.id = id;
}
UIObject.prototype.show = function() {
	$('#'+this.id).show();
};
UIObject.prototype.hide = function() {
	$('#'+this.id).hide();
}

function init() {
	
	Events.on("user", function(user) {
		console.log(user);
			$("#"+IDList.userPhoto).attr("src", user.photo);
			$("#"+IDList.userName).text(user.username);

		});	
}

var loginUI = {
	Sign:new UIObject(IDList.signFrame),
	User:new UIObject(IDList.userFrame)
};
init();
/*
  (function(d) {
	  
		$.get('/users/me', {accessid:3333}, function(user,state) {
			
		if (!user){

			loginUI.Sign.show();
			loginUI.User.hide();
			
		} else {
			
			Events.emit("user",user);
			loginUI.Sign.hide();
			loginUI.User.show();
		}
	    });
	})(document);
  });

*/