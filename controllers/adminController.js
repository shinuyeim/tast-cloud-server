var Admin = require('../models/admin');
const User = require('../models/user');
const validator = require('express-validator');
var async = require('async');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const user_controller = require('./userController');

// Display list of all admins.
exports.admin_list = (req, res, next) => {
    // res.send("GET admin/all not complete!");
    const { limit = 20, offset = 0 } = req.query;

    async.parallel({
        total_count: function (callback) {
            Admin.countDocuments().exec(callback)
        },
        list_admins: function (callback) {
            Admin.find({}, { user: 0 })
                .sort({ 'user_name': 'ascending' })
                .skip(Number(offset))
                .limit(Number(limit))
                .exec(callback)
        },
    }, function (err, result) {
        if (err) { return next(err); }
        // Successful, so render.
        res.status(200).json({
            metadata: {
                Total: result.total_count,
                Limit: Number(limit),
                LimitOffset: Number(offset),
                ReturnedRows: result.list_admins.length,
            },
            data: result.list_admins,
        })
    }
    )
}

exports.admin_delete = (req, res, next) => {

    if (req.auth.privilege !== 0) {
        return res.status(403).send({
            message: "Not enough permissions"
        })
    }

    const admin_id = req.params.id;
    Admin.findById(admin_id).then(async (existedAdmin) => {
        if (!existedAdmin) { return res.status(204).send(); }
        await User.findByIdAndRemove(existedAdmin.user);
        await existedAdmin.remove();
        res.status(204).send();
    });
}

exports.admin_create = [
    // Validate fields.
    validator.body('user_name').not().isEmpty().trim().withMessage('user_name must be specified.').isLength({ max: 20 }).trim().withMessage(' length error.').escape(),
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
                role: 0
            }
            user_controller.user_create(userdata, function (err, userid) {
                if (err) { return next(err); }
                // Create Admin object with escaped and trimmed data
                const admin = new Admin(
                    {
                        user: userid,
                        privilege: 1,
                    }
                );
                // Save admin.
                admin.save(async function (err) {
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
]

exports.admin_login = [

    validator.body('user_name').not().isEmpty().trim().withMessage('user_name must be specified.').isLength({ max: 20 }).trim().withMessage(' length exceed.').escape(),
    validator.body('password').not().isEmpty().trim().withMessage('password must be specified.').isLength({ max: 16 }).trim().withMessage(' length exceed.').escape(),


    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validator.validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            return res.status(422).send(errors);
        }

        Admin.findOne({ user_name: req.body.user_name }).then(
            (existedAdmin) => {
                if (!existedAdmin) {
                    return res.status(422).send({
                        massage: "this user not existed!"
                    })
                }

                const isPasswordValid = require('bcryptjs').compareSync(
                    req.body.password,
                    existedAdmin.password
                )
                if (!isPasswordValid) {
                    return res.status(422).send({
                        massage: "password not valid!"
                    })
                }
                const token = jwt.sign({ id: String(existedAdmin._id) }, SECRET, { expiresIn: '7d' });
                res.status(200).send(token);
            }
        )
    }
]

exports.admin_update = [
    // Validate fields.
    validator.body('_id').not().exists().withMessage('Can not update _id'),
    validator.body('user').not().exists().withMessage('Can not update user'),
    validator.body('privilege').not().exists().withMessage('Can not update privilege'),
    validator.body('name').if((value, { req }) => req.body.name).not().isEmpty().trim().withMessage('name must be specified.').isLength({ max: 20 }).trim().withMessage(' length exceed.').escape(),
    validator.body('city').if((value, { req }) => req.body.city).not().isEmpty().trim().withMessage('city must be specified.').isLength({ max: 60 }).trim().withMessage(' length exceed.').escape(),

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
            const admin = {
                name: req.body.name,
                city: req.body.city
            }
            Admin.findByIdAndUpdate(req.params.id, admin, {}, function (err) {
                if (err) { return next(err); }
                // Successful 
                res.status(200).send();
            });
        }

    }
]

exports.admin_detail = (req, res, next) => {

    Admin.findById(req.params.id).populate('user').exec((err, existedAdmin) => {
        if (err) { return next(err) }

        if (!existedAdmin) {
            return res.status(422).send({
                message: "Admin not found!"
            })
        } 3

        const resData = {
            "_id": existedAdmin._id,
            "name": existedAdmin.name,
            "privilege": existedAdmin.privilege,
            "city": existedAdmin.city,
            "user_name": existedAdmin.user.user_name,
            "register_date": existedAdmin.user.register_date,
        }
        return res.status(200).send(resData);
    });
}

exports.admin_profile = (req, res, next) => {
    Admin.findById(req.auth.adminid).populate('user').exec((err, existedAdmin) => {
        if (err) { return next(err) }

        if (!existedAdmin) {
            return res.status(422).send({
                message: "Admin not found!"
            })
        }

        const resData = {
            "_id": existedAdmin._id,
            "name": existedAdmin.name,
            "privilege": existedAdmin.privilege,
            "city": existedAdmin.city,
            "user_name": existedAdmin.user.user_name,
            "register_date": existedAdmin.user.register_date
        }

        return res.status(200).send(resData);
    });
}

