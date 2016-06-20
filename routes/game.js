'use strict';
let express = require('express');
let router = express.Router();

module.exports = function(app) {

    router.get('/game', function(req, res) {
        if (req.user) {
            app.Model.game.login(req.user.id, (err, token) => {
                res.render('pages/game', { token: token });
            });
        } else {
            req.session.callBackUrl = req.url;
            res.render('pages/login');
        }
    });

    app.use('/', router);
};
