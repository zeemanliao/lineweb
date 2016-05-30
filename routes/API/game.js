'use strict';
let gameCfg = require('../../game.json');

module.exports = function(app) {
    let Storage = app.Storage;

    return {
        "get": {
            "path": "/",
            "args": ["info"],
            "fun": get
        }
    };

    function get(req, res) {
        switch (req.params.info) {
            case 'all':
                res.json(gameCfg);
                break;
            default:
                if (req.params.info in gameCfg) {
                    res.json(gameCfg[req.params.info]);
                } else {
                    res.sendStatus(404);
                }
                break;
        }
    }
};
