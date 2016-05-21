'use strict';
module.exports = function(app) {
    app.use(function(req, res, next) {
        if (req.user) {
            req.user.last = new Date().getTime();
        } else if (req.session.user) {
            req.user = req.session.user;
        }
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

    app.use(function(req, res) {
      res.status(404).format({
        html: function() {
          res.render('pages/status',{code:404});
        },
        json: function() {
          res.send({message:'Resource not found'});
        },
        xml:function() {
          res.write('<error>\n');
          res.write('<message>Resource not found</message>\n');
          res.end('</error>\n');
        },
        text:function() {
          res.send('Resource not found');
        }
      });
    });

}
