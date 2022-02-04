'use strict';

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    name: { type: String, maxlength: 20 },
    city: { type: String, maxlength: 60 },
    privilege: { type: Number, max: 1, min: 0, required: true, default: 1 } //权限：0代表超级管理员，1代表管理员
})


module.exports = mongoose.model('Admin', AdminSchema);