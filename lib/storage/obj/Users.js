module.exports = {
    name: { type: String },
    id: { type: String, unique: true },
    email: { type: String },
    photo: { type: String },
    source: {
        site: { type: String },
        name: { type: String },
        id: { type: String },
        photo: { type: String }
    },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    login_at: { type: Date, default: Date.now }
};
