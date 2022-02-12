'use strict';

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MerchantSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
	name: { type: String, maxlength: 20 },
	phone: { type: String, maxlength: 11 },
	introduction: { type: String, maxlength: 200 },
	address: { type: String, maxlength: 60 },
	delivery_cost: { type: Number, min: 0, max: 999, default: 0 },
	min_delivery_price: { type: Number, min: 0, max: 9999, default: 0 }
})

module.exports = mongoose.model('Merchant', MerchantSchema);
