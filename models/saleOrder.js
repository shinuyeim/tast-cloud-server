'use strict';

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SaleOrderSchema = new Schema({
    date: { type: Date, default: new Date(), required: true },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    //merchandises: { type: Schema.Types.ObjectId, ref: 'Merchandise' },
    saleOrderItem: { type: Schema.Types.ObjectId, ref: 'PurchaseOrderItem' },  //每个销售订单的Item
    //amounts: { type: Number, min: 0, default: 0 },
    //prices: { type: Number, default: 0 },
})

module.exports = mongoose.model('SaleOrder', SaleOrderSchema);