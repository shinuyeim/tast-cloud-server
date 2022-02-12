const Customer = require('../models/customer');
const User = require('../models/user');
const validator = require('express-validator');
var async = require('async');

const user_controller = require('./userController');

exports.customer_create = [
    // Validate fields.
    validator.body('user_name').not().isEmpty().trim().withMessage('user_name must be specified.').isLength({ max: 20 }).trim().withMessage(' length error.').escape(),
    validator.body('name').isLength({ max: 20 }).trim().withMessage(' length error.').escape(),
    validator.body('password').not().isEmpty().trim().withMessage('password must be specified.').isLength({ min: 6, max: 16 }).trim().withMessage(' length error.').escape(),

    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validator.validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            return res.status(422).send(errors);
        }
        else {
            // Data from form is valid.
            const userdata = {
                user_name: req.body.user_name,
                password: req.body.password,
                role: 2
            }
            user_controller.user_create(userdata, function (err, userid) {
                if (err) { return next(err); }
                // Create Customer object with escaped and trimmed data
                const customer = new Customer(
                    {
                        user: userid,
                        name: req.body.name,
                        phone: req.body.phone,
                        address: req.body.address
                    }
                );
                // Save customer.
                customer.save(async function (err) {
                    if (err) {
                        await User.findByIdAndRemove(userid);
                        return next(err);
                    }
                    // Successful - redirect to new customer record.
                    res.status(201).send();
                });
            })
        }
    }
];

exports.customer_update = [
    // Validate fields.
    // TODO: name :"" 会使name变为空
    validator.body('name').if((value, { req }) => req.body.name).not().isEmpty().trim().isLength({ max: 20 }).trim().withMessage(' length exceed.').escape(),
    validator.body('phone').if((value, { req }) => req.body.phone).isMobilePhone(['zh-CN']).trim().escape(),
    validator.body('address').if((value, { req }) => req.body.address).isLength({ max: 60 }).trim().withMessage(' length exceed.').escape(),

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
            const customer = {
                name: req.body.name,
                phone: req.body.phone,
                address: req.body.address
            }
            console.log(customer);
            // { "omitUndefined": true } 忽略未定义的属性
            Customer.findByIdAndUpdate(req.params.id, customer, { "omitUndefined": true }, function (err) {
                if (err) {
                    return next(err);
                }
                // Successful 
                res.status(200).send();
            });
        }
    }
];

exports.customer_list = function (req, res, next) {
    const { limit = 20, offset = 0 } = req.query;

    async.parallel({
        total_count: function (callback) {
            Customer.countDocuments().exec(callback)
        },
        list_Customers: function (callback) {
            Customer.find()
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
                ReturnedRows: result.list_Customers.length
            },
            data: result.list_Customers
        })
    }
    )

};

exports.customer_info = function (req, res, next) {

    Customer.findById(req.params.id).exec((err, existedCustomer) => {
        if (err) { return next(err) }

        if (!existedCustomer) {
            return res.status(422).send({
                message: "Customer not found!"
            })
        }

        const resData = {
            "name": existedCustomer.name,
            "phone": existedCustomer.phone,
            "address": existedCustomer.address
        }
        return res.status(200).send(resData);
    });
};

exports.customer_delete = function (req, res, next) {

    //老版本，只能删除商家，不能删除user
    //Customer.findByIdAndRemove(req.params.id, function (err) {
    //    if (err) { return next(err); }
    // Successful 
    //    res.status(204).send();
    //});

    const customer_id = req.params.id;

    Customer.findById(customer_id).then(async (existedCustomer) => {
        if (!existedCustomer) { return res.status(204).send(); }
        await User.findByIdAndRemove(existedCustomer.user);
        await existedCustomer.remove();
        res.status(204).send();
    })
}

