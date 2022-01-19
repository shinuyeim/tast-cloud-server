'use strict';

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WholesalerSchema = new Schema({
    name: { type: String, minlength: 1, maxlength: 20, required: true, unique: true },
    phone: { type: String, minlength:5, maxlength: 11 },//联系方式
    address: { type: String, maxlength: 60 },//地址
})

module.exports = mongoose.model('Wholesaler', WholesalerSchema);
