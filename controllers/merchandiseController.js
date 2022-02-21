const Merchandise = require('../models/merchandise');
const validator = require('express-validator');
var async = require('async');

// Handle merchandise create on POST.
exports.merchandise_create = [

    // Validate fields.
    validator.body('name').not().isEmpty().trim().withMessage('name must be specified.').isLength({ max: 20 }).trim().withMessage(' length error.').escape(),
    validator.body('price').not().isEmpty().isFloat({ min: 0, max: 99999 }).withMessage('price must be a number between 0~99999.').trim().escape(),

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
            const merchandise = new Merchandise({
                name: req.body.name,
                price: req.body.price,
                qrcode: req.body.qrcode,
                merchant: req.auth.merchantid
            });
            // Save merchandise.
            merchandise.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new admin record.
                res.status(201).send();
            });
        }
    }
];

exports.merchandise_update = [
    // Validate fields.
    validator.body('name').if((value, { req }) => req.body.name).not().isEmpty().trim().withMessage('name must be specified.').isLength({ max: 20 }).trim().withMessage(' length exceed.').escape(),
    validator.body('price').if((value, { req }) => req.body.price).isFloat({ min: 0, max: 99999 }).trim().withMessage('price must be a number between 0~99999.').trim().escape(),
    validator.body('specs').if((value, { req }) => req.body.specs).isLength({ max: 1 }).trim().escape(),
    validator.body('productionDate').if((value, { req }) => req.body.productionDate).trim().escape(),
    validator.body('shelfLife').if((value, { req }) => req.body.shelfLife).isFloat({ min: 0, max: 20 }).escape(),
    validator.body('manufacturer').if((value, { req }) => req.body.manufacturer).isLength({ max: 40 }).trim().withMessage('manufacturer must be a number between 0~40.').escape(),
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
            const merchandise = {
                name: req.body.name,
                price: req.body.price,
                specs: req.body.specs,
                productionDate: req.body.productionDate,
                shelfLife: req.body.shelfLife,
                manufacturer: req.body.manufacturer
            }
            Merchandise.findByIdAndUpdate(req.params.id, merchandise, { "omitUndefined": true }, function (err) {
                if (err) {
                    return next(err);
                }
                // Successful 
                res.status(200).send();
            });
        }
    }
];

exports.merchandise_list = function (req, res, next) {
    const { limit = 20, offset = 0 } = req.query;

    async.parallel({
        total_count: function (callback) {
            Merchandise.countDocuments().exec(callback)
        },
        list_Merchandises: function (callback) {
            Merchandise.find()
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
                ReturnedRows: result.list_Merchandises.length
            },
            data: result.list_Merchandises
        })
    }
    )

};

exports.merchandise_info = function (req, res, next) {

    Merchandise.findById(req.params.id).exec((err, existedMerchandise) => {
        if (err) { return next(err) }

        if (!existedMerchandise) {
            return res.status(422).send({
                message: "Merchandise not found!"
            })
        }

        const resData = {
            "name": existedMerchandise.name,
            "price": existedMerchandise.price,
            "specs": existedMerchandise.specs,
            "productionDate": existedMerchandise.productionDate,
            "shelfLife": existedMerchandise.shelfLife,
            "manufacturer": existedMerchandise.manufacturer
        }
        return res.status(200).send(resData);
    });
    //const merchandise_id = req.params.id;
};

exports.merchandise_delete = function (req, res, next) {

    //const Merchandise_id = req.params.id;

    Merchandise.findByIdAndRemove(req.params.id, function (err) {
        if (err) { return next(err); }
        // Successful 
        res.status(204).send();
    })
}


