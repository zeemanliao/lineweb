'use strict';

module.exports = function(app) {
    let Storage = app.Storage;
    let game = app.locals.game;
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
                res.json(game.cfg);
                break;
            default:
                if (req.params.info in game.cfg) {
                    res.json(game.cfg[req.params.info]);
                } else {
                    res.sendStatus(404);
                }
                break;
        }
    }
};
