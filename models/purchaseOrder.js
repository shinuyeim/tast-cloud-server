'use strict';

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

//进货单
const PurchaseOrderSchema = new Schema({
    date: { type: Date, default: new Date(), required: true },                     //订单日期
    wholesaler: { type: Schema.Types.ObjectId, ref: 'Wholesaler' },                // 批发商
    //    merchandises: { type: Schema.Types.ObjectId, ref: 'Merchandise' },       // 商品
    purchaseOrderItem: { type: Schema.Types.ObjectId, ref: 'PurchaseOrderItem' },  //每个订单的Item
    //    totalamounts: { type: Number, min: 0, default: 0 },                      // 总数
    //    totalprices: { type: Number, default: 0 },                               // 总价
})

module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);