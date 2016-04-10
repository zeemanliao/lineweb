require.config({
	shim: {
		"jquery": { exports: "jQuery"},
		bootstrap:{
			deps: ["jquery"],
			exports: "$.fn.transition"
		},
		"ie10-viewport-hack" : {
			deps : ["jquery"]
		}
	},
    paths: {
        jquery: '/assets/js/jquery-1.12.1.min',
        bootstrap : '/dist/js/bootstrap.min',
        "ie10-viewport-hack" : '/assets/js/ie10-viewport-bug-workaround',
        "ie-emulation-modes":'/assets/ie-emulation-modes-warning',
        "socket.io":'/socket.io/socket.io',
        "util":'/javascripts/util'
    }
});

require(['jquery','socket.io','util','bootstrap','ie10-viewport-hack','ie-emulation-modes'
	], function($, io, util){
	
  var limitMessage = 10;
  var routes = [];
$("#btnChat").bind( "click", function() {
  var msg = $('#msg').val();
  console.log('you send message:%s', msg);
  if (msg) {

    socket.emit('chat', {message:msg});
  }
});
  

  function showOnline(data) {
    if (!data)
      return;
    if (!data.users)
      return;

  	showOnlineUsers(data.users);
  }

  function showMessage(data) {
  	var photo = $('#user-photo').prop('src');
    if (!data)
      return;
    if (!data.message)
      return;

    var msg = getContent(
        data.name,
        data.photo,
        data.message,
        data.tim,
        data.photo === photo
      );
    
    if ($('#chatMessage').children().length >= limitMessage){
      $('#chatMessage li:last-child').remove();
    }
    $('#chatMessage').prepend(msg);
  }

  function getContent(name, photo, message, tim, isSelf)
  {

    var rl = '';
    var a1 = '';
    var a2 = '';
    if (isSelf) {
    	rl = 'right';
      a1 = getChatBody('right', message, util.TimeToString(tim));
      a2 = getChatInfo('right', photo, name);
    } else {
    	rl = 'left';
      a1 = getChatInfo('left', photo, name);
      a2 = getChatBody('left', message, util.TimeToString(tim));
    }

   return '    <li class=\"media\" '+rl+'><div class="div-' + rl + '">' +
          a1 +
          a2 +
          '    </div></li>';
  }
  function getChatBody(rl, message, tim) {
      return  '        <div class=\"media-body\">' +
          '            <div class=\"media\">' +
          '                <div class=\"media-body chat-message '+rl+'\">' +
          message +
          '<br />                   <small class=\"text-muted\">' + tim + '</small>' +
          '                </div>' +
          '            </div>' +
          '        </div>';
  }
  function getChatInfo(rl, photo, name) {
    return '        <div class=\"media-' + rl + '\">' +
          '                <span class=\"pull-left text-center\" href=\"#\">' +
          '                    <img class=\"media-object img-rounded\" src=\"' + photo + '\" />' +
          '                    <br />' +
          '                    <span class=\"chat-name\">' + name + '</span>' +
          '                </span>' +
          '        </div>';
  }
  function showOnlineUsers(users) {
  	$('#chat-user-list').empty();
  	for (var i in users) {
  		var user = users[i];
  		$('#chat-user-list').prepend(getOnlineUser(user));
  	}
  }

  function getOnlineUser(user) {
  	var mi = getDiffTime(new Date().getTime(), user.last);
  	return '              <li class="media">' +
              '    ' +
              '        <div class="media">' +
              '            <a class="pull-left" href="#">' +
              '                <img class="media-object img-circle" style="max-height:40px;" src="'+ user.photo +'" />' +
              '            </a>' +
              '            <div class="media-body" >' +
              '                <h5>' + user.name +'</h5>' +
              '               <small class="text-muted">Active From ' + mi + '</small>' +
              '            </div>' +
              '        </div>' +
              '    ' +
              '</li>';
  }

  function getDiffTime(t1, t2) {
  	var t = (t1 - t2)/1000;
  	var hours = parseInt( t / 3600 ) % 24;
	var minutes = parseInt( t / 60 ) % 60;
	var seconds = t % 60;

	var hours = (hours < 10 ? "0" + hours : hours);
	var minutes = (minutes < 10 ? "0" + minutes : minutes);
	if (hours =='00') {
		hours = '';
	} else {
		hours += 'h';
	}
	if (minutes =='00') {
		minutes = '';
	} else {
		minutes += 'm';
	}
	if (hours == '' && minutes =='' )
		hours = "Now";
  	return hours + minutes;
  }
  routes.push(showMessage);
  routes.push(showOnline);

  var socket = io.connect();
  socket.on('chat', function (data) {
  
    for(i in routes) {
      routes[i](data);
    }
 
  });



});