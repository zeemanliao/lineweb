'use strict';
class Model {
    constructor(app) {
        this.Storage = app.Storage;
    }
    getUser(source, profile, callback) {
        let Storage = this.Storage;

    Storage.Users.findOne({ 'source.site': source, 'source.id': profile.id },

        function(err, user) {
            callback(err, user);
        });
    }
    createUser(source, profile, callback) {
        let user = new this.Storage.Users();
        user.id = source + '_' + profile.id;
        user.name = profile.displayName || profile.username;
        user.email = profile.email || '';
        user.photo = profile.photos[0].value;
        user.source.photo = profile.photos[0].value;
        user.source.name = profile.displayName || profile.username;
        user.source.id = profile.id;
        user.source.site = source;

        user.save(function(err) {
            callback(err, user);
        });
    }

}

module.exports = Model;