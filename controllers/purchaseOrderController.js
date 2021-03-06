const PurchaseOrder = require('../models/purchaseOrder');

// const Merchandise = require('../models/merchandise');
//const Wholesaler = require('../models/wholesaler');

const validator = require('express-validator');
var async = require('async');

// const merchandise_controller = require('./merchandiseController');
//const wholesaler_controller = require('./wholesalerController');

exports.purchaseOrder_create = function (req, res, next) {
    const purchaseOrder = new PurchaseOrder({
        date: req.body.date
    });
    //save purchaseOrder.
    purchaseOrder.save(function (err) {
        if (err) { return next(err); }
        // Successful - redirect to new admin record.
        res.status(201).send();
    });
}

exports.purchaseOrder_update = [
    // Validate fields.
    //validator.body('wholesaler').not().exists().withMessage('Can not update wholesaler'),
    validator.body('wholesaler').not().isEmpty().trim().withMessage('wholesaler is empty').escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.

        const errors = validator.validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            return res.status(422).send(errors);
        }
        else {
            // Data is valid. Update the record.
            const purchaseOrder = {
                wholesaler: req.body.wholesaler
            }
            // { "omitUndefined": true } 忽略未定义的属性
            PurchaseOrder.findByIdAndUpdate(req.params.id, purchaseOrder, { "omitUndefined": true }, function (err) {
                if (err) {
                    return next(err);
                }
                // Successful 
                res.status(200).send();
            });
        }
    }
];

exports.purchaseOrder_list = function (req, res, next) {
    const { limit = 20, offset = 0 } = req.query;

    async.parallel({
        total_count: function (callback) {
            PurchaseOrder.countDocuments().exec(callback)
        },
        list_PurchaseOrders: function (callback) {
            PurchaseOrder.find()
                .sort({ 'name': 'descending' })
                .skip(Number(offset))
                .limit(Number(limit))
                .exec(callback)
        },
        //添加一个根据订单ID里面的 wholesalerID 能查询到商家名称的函数
        wholesalerName: function (callback) {
            //如何通过进货单内的批发商ID找到批发商集合里面的批发商名称
            //find中输入查询条件 比如：detail.find({ age: 21 }, ...) 是在detail中找到所有age为21的条目
            PurchaseOrder.find({ wholesaler: '6268d5524b955c3138063c42' }).exec(callback)
        }

    }, function (err, result) {
        if (err) { return next(err); }
        res.status(200).json({
            metadata: {
                Total: result.total_count,
                Limit: Number(limit),
                LimitOffset: Number(offset),
                ReturnedRows: result.list_PurchaseOrders.length
            },
            data: result.list_PurchaseOrders,
            name: result.wholesalerName
        })
    }
    )

};

exports.purchaseOrder_info = function (req, res, next) {

    PurchaseOrder.findById(req.params.id).exec((err, existedPurchaseOrder) => {
        if (err) { return next(err) }

        if (!existedPurchaseOrder) {
            return res.status(422).send({
                message: "PurchaseOrder not found!"
            })
        }

        const resData = {
            "date": existedPurchaseOrder.date,
            "wholesaler": existedPurchaseOrder.wholesaler
        }
        return res.status(200).send(resData);
    });
};

exports.purchaseOrder_delete = function (req, res, next) {

    PurchaseOrder.findByIdAndRemove(req.params.id, function (err) {
        if (err) { return next(err); }
        // Successful 
        res.status(204).send();
    });
};