'use strict';
class Model {
    constructor(app) {
        this.Storage = app.Storage;
    }
    get(id, callback) {
        let Storage = this.Storage;

    Storage.Users.findOne({ 'id': id },

        function(err, user) {
            callback(err, user);
        });
    }
    create(profile, callback) {
        let user = new this.Storage.Users();
        user.id = profile.source + '_' + profile.id;
        user.name = profile.displayName || profile.username;
        user.email = profile.email || '';
        user.photo = profile.photos[0].value;
        user.source.photo = profile.photos[0].value;
        user.source.name = profile.displayName || profile.username;
        user.source.id = profile.id;
        user.source.site = profile.source;

        user.save(function(err) {
            callback(err, user);
        });
    }

}

module.exports = Model;