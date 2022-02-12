var Merchant = require('../models/merchant');
const User = require('../models/user');
const validator = require('express-validator');
var async = require('async');
// const jwt = require('jsonwebtoken');
// const SECRET = process.env.SECRET;

const user_controller = require('./userController');

// Handle Merchant create on POST.
exports.merchant_create = [

    // Validate fields.
    validator.body('user_name').not().isEmpty().trim().withMessage('user_name must be specified.').isLength({ max: 20 }).trim().withMessage(' length error.').escape(),
    validator.body('password').not().isEmpty().trim().withMessage('password must be specified.').isLength({ min: 6, max: 16 }).trim().withMessage(' length error.').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validator.validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            return res.status(422).send(errors);
        }
        else {
            // Data from form is valid
            const merchantdata = {
                user_name: req.body.user_name,
                password: req.body.password,
                role: 1
            }
            user_controller.user_create(merchantdata, function (err, userid) {
                if (err) { return next(err); }
                // Create Merchant object with escaped and trimmed data
                const merchant = new Merchant(
                    {
                        user: userid,
                        name: req.body.name,
                        phone: req.body.phone,
                        introduction: req.body.introduction
                    }
                );
                // Save merchant.
                merchant.save(async function (err) {
                    if (err) {
                        await User.findByIdAndRemove(userid);
                        return next(err);
                    }
                    // Successful - redirect to new admin record.
                    res.status(201).send();
                });
            })

        }
    }
];

exports.merchant_update = [
    // Validate fields.
    validator.body('_id').not().exists().withMessage('Can not update _id'),
    validator.body('name').if((value, { req }) => req.body.name).not().isEmpty().trim().withMessage('name must be specified.').isLength({ max: 20 }).trim().withMessage(' length exceed.').escape(),
    validator.body('address').if((value, { req }) => req.body.address).not().isEmpty().trim().withMessage('address must be specified.').isLength({ max: 60 }).trim().withMessage(' length exceed.').escape(),
    validator.body('phone').if((value, { req }) => req.body.phone).isMobilePhone(['zh-CN']).trim().escape(),
    validator.body('introduction').if((value, { req }) => req.body.introduction).isLength({ max: 200 }).trim().withMessage(' length exceed.').escape(),
    validator.body('delivery_cost').if((value, { req }) => req.body.delivery_cost).isFloat({ min: 0, max: 999 }).escape(),
    validator.body('min_delivery_price').if((value, { req }) => req.body.min_delivery_price).isFloat({ min: 0, max: 9999 }).escape(),
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
            const merchant = {
                name: req.body.name,
                address: req.body.address,
                phone: req.body.phone,
                introduction: req.body.introduction,
                delivery_cost: req.body.delivery_cost,
                min_delivery_price: req.body.min_delivery_price
            }
            Merchant.findByIdAndUpdate(req.params.id, merchant, {}, function (err) {
                if (err) {
                    return next(err);
                }
                // Successful 
                res.status(200).send();
            });
        }
    }
];

// Display list of all merchants.
exports.merchant_list = function (req, res, next) {
    const { limit = 20, offset = 0 } = req.query;

    async.parallel({
        total_count: function (callback) {
            Merchant.countDocuments().exec(callback)
        },
        list_merchants: function (callback) {
            Merchant.find()
                .sort({ 'register_date': 'descending' })
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
                ReturnedRows: result.list_merchants.length
            },
            data: result.list_merchants
        })
    }
    )

};

exports.merchant_info = function (req, res, next) {

    Merchant.findById(req.params.id).populate('user').exec((err, existedMerchant) => {
        if (err) { return next(err) }

        if (!existedMerchant) {
            return res.status(422).send({
                message: "Merchant not found!"
            })
        }

        const resData = {
            "_id": existedMerchant._id,
            "name": existedMerchant.name,
            "address": existedMerchant.address,
            "phone": existedMerchant.phone,
            "introduction": existedMerchant.introduction,
            "delivery_cost": existedMerchant.delivery_cost,
            "min_delivery_price": existedMerchant.min_delivery_price,
            "user_name": existedMerchant.user.user_name,
            "register_date": existedMerchant.user.register_date,
        }
        return res.status(200).send(resData);
    });
    const merchant_id = req.params.id;
};

exports.merchant_delete = function (req, res, next) {

    const merchant_id = req.params.id;

    Merchant.findById(merchant_id).then(async (existedMerchant) => {
        if (!existedMerchant) { return res.status(204).send(); }
        await User.findByIdAndRemove(existedMerchant.user);
        await existedMerchant.remove();
        res.status(204).send();
    })
}