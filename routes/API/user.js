'use strict';
module.exports = function(app) {
    let model = app.Model;

    return {
        "get": {
            "path": "/",
            "args": ["id"],
            "fun": get
        }
    };

    function get(req, res) {

        if (!req.params.id) {
            res.sendStatus(404);
        }

        model.user.get(req.params.id, function(err, user) {
            if (err) {
                return res.json({ err: err });
            }
            if (!user) {
                return res.sendStatus(404);
            }
            res.json(user);
        });

    };

};
