module.exports = function(app) {
  app.use(function(req, res, next){
    if (req.user)
      req.user.last = new Date().getTime();
    res.locals.user = req.user;
    next();
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {

    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  } else {

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
  }

}