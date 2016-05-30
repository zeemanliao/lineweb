'use strict';

module.exports = function(app) {
    let Storage = app.Storage;
    return {
        "get": {
            "path": "/",
            "fun": get
        }
    };

    function get(req, res) {
        Storage.EPAs.find({}, function(err, datas) {
            if (err) {
                return res.json({ err: err });
            }
            if (!datas) {
                return res.send(404);
            }
            res.json(datas);
        });
    };

};
