'use strict';
let express = require('express');
let router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
    if (req.session.callBackUrl) {
        res.redirect(req.session.callBackUrl);
        req.session.callBackUrl = null;
    } else {
        res.render('pages/epa');
    }
});

router.get('/chat', function(req, res) {
    req.session.callBackUrl = req.url;
    res.render('pages/chat');
});


router.get('/epa', function(req, res) {
    req.session.callBackUrl = req.url;
    res.render('pages/epa');
});


router.get('/test', function(req, res) {
    req.session.callBackUrl = req.url;
    res.render('pages/test');
});

module.exports = router;
