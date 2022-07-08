const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        trim: true,
        required: true,
    }
});

UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

module.exports = mongoose.model('User', UserSchema);