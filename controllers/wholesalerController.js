const Wholesaler = require('../models/wholesaler');
const validator = require('express-validator');
var async = require('async');

exports.wholesaler_create = [

    // Validate fields.
    validator.body('name').trim().isLength({ min: 1, max: 20 }).withMessage('length error').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validator.validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            return res.status(422).send(errors);
        }
        else {

            // Data from form is valid.
            const wholesaler = new Wholesaler({
                name: req.body.name,
            });
            // Save wholesaler.
            wholesaler.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new admin record.
                res.status(201).send();
            });
        }
    }
];

exports.wholesaler_update = [
    // Validate fields.
    validator.body('name').optional().trim().isLength({ min: 1, max: 20 }).withMessage('length error').escape(),
    validator.body('phone').optional().trim().isMobilePhone(['zh-CN']).escape(),
    validator.body('address').optional().trim().isLength({ max: 60 }).withMessage('length exceed').escape(),

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
            const wholesaler = {
                name: req.body.name,
                phone: req.body.phone,
                address: req.body.address
            }

            // findByIdAndUpdate ?????????id???????????????????????????????????????????????????????????????????????????????????????
            // { "omitUndefined": true } ????????????????????????
            Wholesaler.findByIdAndUpdate(req.params.id, wholesaler, { "omitUndefined": true }, function (err, doc) {
                if (err) { return next(err); }

                // note: ??????????????????????????????????????????????????????id??????????????????????????????err??????????????????????????????????????????????????????(document)???????????????
                if (null == doc) {
                    return res.status(422).send(
                        { msg: "doc not exist." }
                    )
                }

                // Successful 
                res.status(200).send();
            });
        }
    }
];

exports.wholesaler_list = function (req, res, next) {
    const { limit = 20, offset = 0 } = req.query;

    async.parallel({
        total_count: function (callback) {
            Wholesaler.countDocuments().exec(callback)
        },
        list_Wholesalers: function (callback) {
            Wholesaler.find()
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
                ReturnedRows: result.list_Wholesalers.length
            },
            data: result.list_Wholesalers
        })
    }
    )

};

exports.wholesaler_info = function (req, res, next) {

    Wholesaler.findById(req.params.id).exec((err, existedWholesaler) => {
        if (err) { return next(err) }

        if (!existedWholesaler) {
            return res.status(422).send({
                message: "Wholesaler not found!"
            })
        }

        const resData = {
            "name": existedWholesaler.name,
            "phone": existedWholesaler.phone,
            "address": existedWholesaler.address
        }
        return res.status(200).send(resData);
    });
};

exports.wholesaler_delete = function (req, res, next) {

    Wholesaler.findByIdAndRemove(req.params.id, function (err) {
        if (err) { return next(err); }
        // Successful 
        res.status(204).send();
    });
};

// exports.wholesaler_findName = function (req, res,next){
//     Wholesaler
// }
