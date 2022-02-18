'use strict';

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MerchandiseSchema = new Schema({
	name: { type: String, maxlength: 20, required: true },
	price: { type: Number, min: 0, max: 99999, required: true },//价格
	specs: { type: String, enmu: ['盒', '瓶', '袋'] },//规格
	productionDate: { type: Date },//生产日期  
	shelfLife: { type: Number, min: 0, max: 20, default: 2 },//保质期
	manufacturer: { type: String, maxlength: 40 }, //制造商
	qrcode: { type: String },
	merchant: { type: Schema.Types.ObjectId, ref: 'Merchant', required: true }  //商品创建者
})

module.exports = mongoose.model('Merchandise', MerchandiseSchema);
