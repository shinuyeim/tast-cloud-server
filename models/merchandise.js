'use strict';

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MerchandiseSchema = new Schema({
	name: { type: String, maxlength: 20, required: true },
	price: { type: Number, min: 0, max: 99999, required: true },//价格
	specs: { type: String, enmu: ['盒', '瓶', '袋'] },//规格
	productionDate: { type: Date },//生产日期  
	shelfLife: { type: Number, min: 0, max: 36, default: 12 },//保质期
	manufacturer: { type: String, maxlength: 40 }, //制造商
	qrcode: { type: String },
	//merchant: { type: Schema.Types.ObjectId, ref: 'Merchant'}  //商品创建者(商家)
	//merchant: { type: String}
})

module.exports = mongoose.model('Merchandise', MerchandiseSchema);
