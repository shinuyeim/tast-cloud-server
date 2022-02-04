var User = require('../models/user');
const validator = require('express-validator');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

exports.user_create = (data, callback) => {
    // Data from form is valid.
    User.countDocuments({ user_name: data.user_name }).then(
        (existUserCount) => {
            if (existUserCount > 0) {
                return callback({
                    status: 422,
                    massage: "user_name existed!",
                });
            }

            // Create User object with escaped and trimmed data
            const user = new User(
                {
                    user_name: data.user_name,
                    password: data.password,
                    role: data.role,
                }
            );

            // Save user.
            user.save(function (err) {
                if (err) { return callback(err); }
                // Successful - redirect to new user record.
                return callback(null, user._id);
            });
        }
    )
}

exports.user_login = [

    validator.body('user_name').not().isEmpty().trim().withMessage('user_name must be specified.').isLength({ min: 5, max: 20 }).trim().withMessage(' length exceed.').escape(),
    validator.body('password').not().isEmpty().trim().withMessage('password must be specified.').isLength({ min: 6, max: 16 }).trim().withMessage(' length exceed.').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validator.validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            return res.status(422).send(errors);
        }

        User.findOne({ user_name: req.body.user_name }).then(
            (existedUser) => {
                if (!existedUser) {
                    return res.status(422).send({
                        massage: "this user not existed!"
                    })
                }

                const isPasswordValid = require('bcryptjs').compareSync(
                    req.body.password,
                    existedUser.password
                )
                if (!isPasswordValid) {
                    return res.status(422).send({
                        massage: "password not valid!"
                    })
                }
                const token = jwt.sign({ id: String(existedUser._id) }, SECRET, { expiresIn: '7d' });
                res.status(200).send(token);
            }
        )
    }
]

exports.user_update = [
    // Validate fields.
    validator.body('password').not().isEmpty().trim().withMessage('password must be specified.').isLength({ min: 6, max: 16 }).trim().withMessage(' length error.').escape(),
    validator.body('new_password').if((value, { req }) => req.body.new_password).not().isEmpty().trim().withMessage('password must be specified.').isLength({ min: 6, max: 16 }).trim().withMessage(' length error.').escape(),

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
            const id = req.params.id;

            if (id !== req.auth.userid) {
                return res.status(403).send({
                    massage: "No enough permissions!"
                })
            }

            User.findById(id)
                .then((existedUser) => {
                    if (!existedUser) {
                        return res.status(422).send({
                            massage: "user to update not existed!"
                        })
                    }

                    const isPasswordValid = require('bcryptjs').compareSync(
                        req.body.password,
                        existedUser.password
                    )
                    if (!isPasswordValid) {
                        return res.status(422).send({
                            massage: "password not valid!"
                        })
                    }

                })
                .then(() => {
                    const user = {};
                    if (undefined !== req.body.new_password) { Object.assign(user, { "password": req.body.new_password }) }

                    User.findByIdAndUpdate(id, user, { "omitUndefined": true }, function (err) {
                        if (err) { return next(err); }
                        // Successful
                        return res.status(200).send();
                    });
                })
        }
    }
]