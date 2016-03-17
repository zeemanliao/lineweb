  (function(d) {
$.get('/auth/users/me', {accessid:3333}, function(a,b,c) {
	console.log(a);
	console.log(b);
	console.log(c);
	if (!b){
		console.log('not login');
	} else {
		console.log(b);
	}
    });    
  }(document));
