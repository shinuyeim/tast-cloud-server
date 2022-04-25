'use strict';

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

// 每一张进货单的单条目录，一张进货单可以有多个Item
const PurchaseOrderItemSchema = new Schema({
    //date: { type: Date, default: new Date(), required: true },
    purchaseOrder: { type: Schema.Types.ObjectId, ref: 'PurchaseOrder', require: true },    //订单（与订单绑定）
    merchandises: { type: Schema.Types.ObjectId, ref: 'Merchandise', require: true },       //商品
    amounts: { type: Number, min: 0, default: 0 },                           // 单个商品数量
    price: { type: Number, default: 0 },                                     //单个商品单价
    //    totalprices: { type: Number, default: 0 },                         //单个商品总价
})

module.exports = mongoose.model('PurchaseOrderItem', PurchaseOrderItemSchema);