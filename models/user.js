'use strict';

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_name: {
        type: String,
        required: true,
        match: /^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){4,19}$/,
        unique: true
    },
    password: {
        type: String, required: true,
        set(val) {
            return require('bcryptjs').hashSync(val, 10)
        }
    },
    register_date: { type: Date, default: new Date() },
    role: { type: Number, max: 2, min: 0, required: true, default: 2 } //角色：0代表Admin，1代表Merchant，2代表Customer
})

module.exports = mongoose.model('User', UserSchema);