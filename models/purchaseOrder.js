'use strict';

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PurchaseOrderSchema = new Schema({
    date: { type: Date, default: new Date(), required: true },
    wholesaler: { type: Schema.Types.ObjectId, ref: 'Wholesaler' },
    merchandises: { type: Schema.Types.ObjectId, ref: 'Merchandise' },
    amounts: { type: Number, min: 0, default: 0 },
    prices: { type: Number, default: 0 },
})

module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);