const SaleOrder = require('../models/saleOrder');

// const Merchandise = require('../models/merchandise');
// const Customer = require('../models/customer');

const validator = require('express-validator');
var async = require('async');

exports.saleOrder_create = function (req, res, next) {

    // Create SaleOrder object with escaped and trimmed data
    const saleOrder = new SaleOrder(
        {

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
    // TODO: name :"" 会使name变为空
    validator.body('customer').not().exists().withMessage('Can not update customer'),
    validator.body('merchandises').not().exists().withMessage('Can not update merchandises'),
    validator.body('amounts').if((value, { req }) => req.body.amounts).isFloat({ min: 0 }).trim().withMessage('amounts must be a number greater 0.').trim().escape(),
    validator.body('price').if((value, { req }) => req.body.price).isFloat({ min: 0 }).trim().withMessage('price must be a number greater 0.').trim().escape(),
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
                amounts: req.body.amounts,
                prices: req.body.prices
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
            // "name": existedSaleOrder.merchandise.name,
            // "price": existedSaleOrder.merchandise.price,
            // "specs": existedSaleOrder.merchandise.specs,
            // "productionDate": existedSaleOrder.merchandise.productionDate,
            // "shelfLife": existedSaleOrder.merchandise.shelfLife,
            // "manufacturer": existedSaleOrder.merchandise.manufacturer,
            "date": existedSaleOrder.date,
            "amounts": existedSaleOrder.amounts,
            "prices": existedSaleOrder.prices,
            // TODO: name冲突
            // "name":existedSaleOrder.customer.name,
            // "phone": existedSaleOrder.customer.phone,
            // "address": existedSaleOrder.customer.address
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