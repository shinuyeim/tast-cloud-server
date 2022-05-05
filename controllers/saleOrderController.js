const SaleOrder = require('../models/saleOrder');

// const Merchandise = require('../models/merchandise');
// const Customer = require('../models/customer');

const validator = require('express-validator');
var async = require('async');

exports.saleOrder_create = function (req, res, next) {

    // Create SaleOrder object with escaped and trimmed data
    const saleOrder = new SaleOrder(
        {
            date: req.body.date
        }
    );

    // Save saleOrder.
    saleOrder.save(function (err) {
        if (err) { return next(err); }
        // Successful - redirect to new user record.
        res.status(201).send();
    });
};

exports.saleOrder_update = [
    // Validate fields.
    validator.body('customer').not().isEmpty().trim().withMessage('customer is empty').escape(),
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
            const saleOrder = {
                customer: req.body.customer
            }
            // { "omitUndefined": true } 忽略未定义的属性
            SaleOrder.findByIdAndUpdate(req.params.id, saleOrder, { "omitUndefined": true }, function (err) {
                if (err) {
                    return next(err);
                }
                // Successful 
                res.status(200).send();
            });
        }
    }
];

exports.saleOrder_list = function (req, res, next) {
    const { limit = 20, offset = 0 } = req.query;

    async.parallel({
        total_count: function (callback) {
            SaleOrder.countDocuments().exec(callback)
        },
        list_SaleOrders: function (callback) {
            SaleOrder.find()
                .sort({ 'name': 'descending' })
                .skip(Number(offset))
                .limit(Number(limit))
                .exec(callback)
        }
    }, function (err, result) {
        if (err) { return next(err); }
        res.status(200).json({
            metadata: {
                Total: result.total_count,
                Limit: Number(limit),
                LimitOffset: Number(offset),
                ReturnedRows: result.list_SaleOrders.length
            },
            data: result.list_SaleOrders
        })
    }
    )

};

exports.saleOrder_info = function (req, res, next) {

    SaleOrder.findById(req.params.id).exec((err, existedSaleOrder) => {
        if (err) { return next(err) }

        if (!existedSaleOrder) {
            return res.status(422).send({
                message: "SaleOrder not found!"
            })
        }

        const resData = {
            "customer": existedSaleOrder.customer,
            "date": existedSaleOrder.date
        }
        return res.status(200).send(resData);
    });
};

exports.saleOrder_delete = function (req, res, next) {

    SaleOrder.findByIdAndRemove(req.params.id, function (err) {
        if (err) { return next(err); }
        // Successful 
        res.status(204).send();
    });
};